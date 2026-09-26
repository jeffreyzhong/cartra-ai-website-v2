/**
 * ReelEngine — turns timeline segments into Web Animations that share one
 * 30s clock.
 *
 * Tracks keep their own short active window (delay + duration, no endDelay),
 * so non-compositable properties sit idle outside their window. Chrome only
 * composites a target that has one animation per property, so an element's
 * transform (or opacity) segments are folded into a single 30s keyframed
 * track. Three rules keep the film frame-locked:
 *   1. Every track is persisted, so the browser never auto-removes a finished
 *      track that a later track on the same element overrides.
 *   2. Resuming sets one shared currentTime on everything, then plays only the
 *      tracks whose window has not ended; finished ones stay parked on their
 *      forwards fill (play() would auto-rewind them).
 *   3. The loop seeks everything back to 0 while running.
 */

import { LOOP_MS, type Segment } from './timeline';

const META_KEYS = new Set(['offset', 'easing', 'composite']);

function propsOf(keyframes: Keyframe[]): string[] {
  const props = new Set<string>();
  keyframes.forEach((kf) => Object.keys(kf).forEach((k) => !META_KEYS.has(k) && props.add(k)));
  return [...props];
}

type Track = { anim: Animation; end: number };

const COMPOSITABLE = ['transform', 'opacity'] as const;
const HOLD = 'steps(1, end)';

/** Resolves implicit keyframe offsets the way the Web Animations spec spaces them. */
function withOffsets(keyframes: Keyframe[]): Keyframe[] {
  const n = keyframes.length;
  const off = keyframes.map((k) => (typeof k.offset === 'number' ? k.offset : null));
  if (off[0] === null) off[0] = 0;
  if (n > 1 && off[n - 1] === null) off[n - 1] = 1;
  for (let i = 1; i < n; i++) {
    if (off[i] !== null) continue;
    let j = i;
    while (off[j] === null) j++;
    const a = off[i - 1]!;
    const b = off[j]!;
    for (let k = i; k < j; k++) off[k] = a + ((b - a) * (k - i + 1)) / (j - i + 1);
  }
  return keyframes.map((k, i) => ({ ...k, offset: off[i]! }));
}

/**
 * Folds every compositable property that has 2+ simple (two-keyframe,
 * non-overlapping) segments on one element into one 30s keyframed segment.
 * Holds between windows use step easing, which matches the original
 * first-track-fills-both / later-tracks-fill-forwards semantics exactly.
 */
function coalesce(segments: Segment[]): Segment[] {
  const byEl = new Map<Element, Segment[]>();
  segments.forEach((seg) => {
    const list = byEl.get(seg.el);
    if (list) list.push(seg);
    else byEl.set(seg.el, [seg]);
  });

  const folded = new Map<Segment, Set<string>>();
  const merged: Segment[] = [];

  byEl.forEach((list, el) => {
    for (const prop of COMPOSITABLE) {
      const touching = list.filter((seg) => seg.keyframes.some((k) => prop in k));
      if (touching.length < 2) continue;
      const parts = touching
        .map((seg) => {
          const kfs = withOffsets(seg.keyframes).filter((k) => prop in k);
          const simple =
            kfs.length === 2 && kfs[0]!.offset === 0 && kfs[1]!.offset === 1 && !kfs.some((k) => k.easing);
          return simple ? { seg, from: kfs[0]![prop], to: kfs[1]![prop] } : null;
        })
        .sort((a, b) => (a && b ? a.seg.at - b.seg.at : 0));
      if (parts.some((p) => !p)) continue;
      const ok = parts.every((p, i) => i === 0 || p!.seg.at >= parts[i - 1]!.seg.at + parts[i - 1]!.seg.duration);
      if (!ok) continue;

      const stops: { t: number; v: unknown; ease: string }[] = [];
      parts.forEach((p) => {
        stops.push({ t: p!.seg.at, v: p!.from, ease: p!.seg.easing });
        stops.push({ t: p!.seg.at + p!.seg.duration, v: p!.to, ease: HOLD });
        const owned = folded.get(p!.seg) ?? new Set<string>();
        owned.add(prop);
        folded.set(p!.seg, owned);
      });
      if (stops[0]!.t > 0) stops.unshift({ t: 0, v: stops[0]!.v, ease: HOLD });
      if (stops[stops.length - 1]!.t < LOOP_MS) stops.push({ t: LOOP_MS, v: stops[stops.length - 1]!.v, ease: HOLD });
      merged.push({
        el,
        at: 0,
        duration: LOOP_MS,
        easing: 'linear',
        keyframes: stops.map((st) => ({ offset: st.t / LOOP_MS, [prop]: st.v, easing: st.ease }) as Keyframe),
      });
    }
  });

  if (!folded.size) return segments;
  const rest: Segment[] = [];
  segments.forEach((seg) => {
    const gone = folded.get(seg);
    if (!gone) {
      rest.push(seg);
      return;
    }
    const keyframes = withOffsets(seg.keyframes)
      .map((k) => Object.fromEntries(Object.entries(k).filter(([key]) => !gone.has(key))) as Keyframe)
      .filter((k) => propsOf([k]).length > 0);
    if (keyframes.length) rest.push({ ...seg, keyframes });
  });
  return [...rest, ...merged];
}

export class ReelEngine {
  private tracks: Track[] = [];
  private clock: Animation | null = null;
  private running = false;

  /** Called each time the clock reaches LOOP_MS. */
  onLoopEnd: (() => void) | null = null;

  get built() {
    return this.clock !== null;
  }

  get time(): number {
    const t = this.clock?.currentTime;
    return typeof t === 'number' ? Math.min(t, LOOP_MS) : 0;
  }

  get playing(): boolean {
    return this.built && this.running;
  }

  build(segments: Segment[], time: number, play: boolean) {
    this.destroy();

    // First track per (element, property) fills backwards to define the
    // pre-roll state; later tracks only fill forwards so they never override
    // earlier states before they start.
    const seen = new Map<Element, Set<string>>();
    for (const seg of coalesce(segments)) {
      const props = propsOf(seg.keyframes);
      let owned = seen.get(seg.el);
      if (!owned) seen.set(seg.el, (owned = new Set()));
      const fresh = props.every((p) => !owned!.has(p));
      props.forEach((p) => owned!.add(p));

      const anim = seg.el.animate(seg.keyframes, {
        delay: seg.at,
        duration: seg.duration,
        easing: seg.easing,
        fill: fresh ? 'both' : 'forwards',
      });
      anim.persist();
      anim.pause();
      this.tracks.push({ anim, end: seg.at + seg.duration });
    }

    const clock = new Animation(new KeyframeEffect(null, null, { duration: LOOP_MS, fill: 'both' }), document.timeline);
    clock.onfinish = () => this.onLoopEnd?.();
    clock.pause();
    this.clock = clock;

    this.apply(time, play);
  }

  /** Put every track at `ms`; while running, only unfinished windows advance. */
  private apply(ms: number, run: boolean) {
    const clock = this.clock;
    if (!clock) return;
    const t = Math.min(Math.max(ms, 0), LOOP_MS);
    this.running = run;
    for (const { anim, end } of this.tracks) {
      if (run && end > t) {
        anim.currentTime = t;
        anim.play();
      } else {
        anim.pause();
        anim.currentTime = t;
      }
    }
    if (run && t < LOOP_MS) {
      clock.currentTime = t;
      clock.play();
    } else {
      clock.pause();
      clock.currentTime = t;
    }
  }

  seek(ms: number) {
    this.apply(ms, this.running);
  }

  play() {
    if (!this.clock) return;
    this.apply(this.time >= LOOP_MS ? 0 : this.time, true);
  }

  pause() {
    if (!this.clock) return;
    this.apply(this.time, false);
  }

  destroy() {
    this.tracks.forEach(({ anim }) => anim.cancel());
    if (this.clock) {
      this.clock.onfinish = null;
      this.clock.cancel();
    }
    this.tracks = [];
    this.clock = null;
    this.running = false;
  }
}
