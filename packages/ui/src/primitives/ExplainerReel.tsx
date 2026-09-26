'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { EXPLAINER_COPY, EXPLAINER_TRANSCRIPT } from './explainer/copy';
import { ReelEngine } from './explainer/engine';
import { measureReel } from './explainer/measure';
import { ReelStage } from './explainer/ReelStage';
import {
  KEY_FRAMES_MS,
  LOOP_MS,
  POSTER_MS,
  SCENES,
  buildTimeline,
  sceneAt,
  type Palette,
} from './explainer/timeline';

/** Anything in this set holds the film paused; it plays only when the set is empty. */
type HoldReason = 'poster' | 'offscreen' | 'hidden' | 'user' | 'done' | 'reduced';
type Status = 'playing' | 'paused' | 'done';

const MAX_LOOPS = 3;
const STOP_AT_MS = 29000;
const BOOT_HOLD_MS = 500;

/** Every held frame in film order, for stepping while paused. */
const FRAMES = KEY_FRAMES_MS.flatMap((frames, scene) =>
  frames.map((ms, i) => ({ scene, ms, i, of: frames.length })),
);

type ExplainerReelProps = {
  logoSrc: string;
  headingId?: string;
  className?: string;
};

function ensureEngine(ref: { current: ReelEngine | null }) {
  return (ref.current ??= new ReelEngine());
}

function readPalette(el: Element): Palette {
  const cs = getComputedStyle(el);
  const v = (name: string) => cs.getPropertyValue(name).trim();
  return {
    ink: v('--c-text'),
    cream: v('--c-bg'),
    muted: v('--c-text-muted'),
    hairline: v('--c-border'),
    orange: v('--c-primary'),
    orangeDeep: v('--c-primary-active'),
  };
}

/** Fonts drive the measured geometry; the logo is decoded ahead so its first frame is never blank. */
async function assetsReady(el: Element) {
  const logo = el.querySelector('img');
  // decode() can stall in background tabs; never let the logo block playback.
  const decode = Promise.race([
    logo?.decode().catch(() => undefined),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]);
  if ('fonts' in document) {
    const family = getComputedStyle(el).fontFamily;
    await Promise.all([
      document.fonts.load(`500 64px ${family}`),
      document.fonts.load(`600 64px ${family}`),
    ]).catch(() => undefined);
    await document.fonts.ready;
  }
  await decode;
}

/** Width of the first verb's text: changes only when the display face actually swaps. */
function glyphSignature(reel: Element): number {
  const node = reel.querySelector('[data-xp="v0"]')?.firstChild;
  if (!node) return 0;
  const range = document.createRange();
  range.selectNodeContents(node);
  const w = range.getBoundingClientRect().width;
  range.detach();
  return Math.round(w * 10) / 10;
}

function frameLabel(index: number) {
  const f = FRAMES[index]!;
  const scene = `Scene ${f.scene + 1} of ${SCENES.length}: ${SCENES[f.scene]!.label}`;
  return f.of > 1 ? `${scene}, part ${f.i + 1} of ${f.of}` : scene;
}

/**
 * ExplainerReel — the 30-second "Cartra in 30 seconds" film.
 *
 * Five scenes on a 120bpm grid, built from DOM + Web Animations (no video, no
 * dependencies). Server-renders a static poster frame; plays once the stage is
 * half in view, pauses offscreen, stops on the end card after three loops.
 * Reduced motion: nothing autoplays; Previous / Next step through held frames
 * that together show every line of copy.
 */
export function ExplainerReel({ logoSrc, headingId = 'explainer-title', className = '' }: ExplainerReelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ReelEngine | null>(null);
  const holds = useRef(new Set<HoldReason>(['poster', 'offscreen']));
  const startedRef = useRef(false);
  const pendingSeekRef = useRef<number | null>(null);
  const builtFor = useRef({ w: 0, h: 0, glyphs: 0 });
  const loopRef = useRef(0);
  const sceneRef = useRef(0);
  const rafRef = useRef(0);

  const reducedMotion = useReducedMotion();
  const [scene, setScene] = useState(0);
  const [status, setStatus] = useState<Status>('paused');
  const [announcement, setAnnouncement] = useState('');

  const updateScene = useCallback((ms: number) => {
    const i = sceneAt(ms);
    if (i !== sceneRef.current) {
      sceneRef.current = i;
      setScene(i);
    }
  }, []);

  const refreshStatus = useCallback(() => {
    const h = holds.current;
    setStatus(h.has('done') ? 'done' : h.has('user') || h.has('reduced') || h.has('poster') ? 'paused' : 'playing');
  }, []);

  /** Measure the natural layout, then (re)create every track at `time`. */
  const build = useCallback((time: number, play: boolean) => {
    const stage = stageRef.current;
    const reel = reelRef.current;
    const root = rootRef.current;
    if (!stage || !reel || !root) return false;
    // A collapsed stage can't be measured; keep whatever is running.
    const { width, height } = stage.getBoundingClientRect();
    if (width < 1 || height < 1) return false;

    // Measurement needs the natural layout, so tracks come off first.
    const e = ensureEngine(engineRef);
    e.destroy();
    const m = measureReel(stage, reel);
    if (!m) return false;

    const els = new Map<string, Element>();
    root.querySelectorAll<HTMLElement>('[data-xp]').forEach((el) => els.set(el.dataset.xp as string, el));
    e.build(buildTimeline(els, m, readPalette(root), { segments: true }), time, play);
    builtFor.current = { w: width, h: height, glyphs: glyphSignature(reel) };
    reel.dataset.live = '';
    return true;
  }, []);

  const stopPolling = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  const finish = useCallback(() => {
    const e = engineRef.current;
    if (!e) return;
    holds.current.add('done');
    e.pause();
    e.seek(STOP_AT_MS);
    updateScene(STOP_AT_MS);
    stopPolling();
    refreshStatus();
  }, [refreshStatus, stopPolling, updateScene]);

  /** Scene index for the controls; one cheap read per frame, a render only on change. */
  const poll = useCallback(() => {
    const e = engineRef.current;
    if (!e?.built) {
      rafRef.current = 0;
      return;
    }
    const t = e.time;
    updateScene(t);
    if (loopRef.current >= MAX_LOOPS - 1 && t >= STOP_AT_MS) {
      finish();
      return;
    }
    rafRef.current = requestAnimationFrame(poll);
  }, [finish, updateScene]);

  const sync = useCallback(() => {
    const e = engineRef.current;
    if (!e?.built) {
      refreshStatus();
      return;
    }
    if (holds.current.size === 0) {
      e.play();
      if (!rafRef.current) rafRef.current = requestAnimationFrame(poll);
    } else {
      e.pause();
      stopPolling();
      updateScene(e.time);
    }
    refreshStatus();
  }, [poll, refreshStatus, stopPolling, updateScene]);

  const start = useCallback(
    async (at: number) => {
      if (startedRef.current || !reelRef.current) return;
      startedRef.current = true;
      await assetsReady(reelRef.current);
      // A chapter jump made while assets loaded wins over the default start.
      const t = pendingSeekRef.current ?? at;
      pendingSeekRef.current = null;
      if (!build(t, false)) {
        startedRef.current = false;
        return;
      }
      holds.current.delete('poster');
      updateScene(t);
      sync();
    },
    [build, sync, updateScene],
  );

  // Loop handling lives on the engine clock, so it survives throttled frames.
  useEffect(() => {
    const e = ensureEngine(engineRef);
    e.onLoopEnd = () => {
      loopRef.current += 1;
      if (loopRef.current >= MAX_LOOPS) {
        finish();
        return;
      }
      e.seek(0);
      sync();
    };
    return () => {
      e.onLoopEnd = null;
      e.destroy();
      stopPolling();
    };
  }, [finish, stopPolling, sync]);

  // Play only while at least half the stage is on screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === 'undefined') return;
    let boot: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const ratio = entry.intersectionRatio;
        if (ratio >= 0.5) {
          holds.current.delete('offscreen');
          if (!startedRef.current) {
            clearTimeout(boot);
            boot = setTimeout(() => void start(POSTER_MS), BOOT_HOLD_MS);
          } else {
            sync();
          }
        } else if (ratio < 0.25) {
          holds.current.add('offscreen');
          clearTimeout(boot);
          sync();
        }
      },
      { threshold: [0, 0.25, 0.5] },
    );
    io.observe(stage);
    return () => {
      clearTimeout(boot);
      io.disconnect();
    };
  }, [start, sync]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) holds.current.add('hidden');
      else holds.current.delete('hidden');
      sync();
    };
    if (document.hidden) holds.current.add('hidden');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [sync]);

  // Geometry is measured in px: rebuild (keeping time and play state) only when
  // the stage size or the display face's metrics actually change.
  useEffect(() => {
    const stage = stageRef.current;
    const reel = reelRef.current;
    if (!stage || !reel) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const rebuild = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const e = engineRef.current;
        if (!e?.built) return;
        const { width, height } = stage.getBoundingClientRect();
        const last = builtFor.current;
        const resized = Math.abs(width - last.w) > 0.5 || Math.abs(height - last.h) > 0.5;
        if (!resized && glyphSignature(reel) === last.glyphs) return;
        build(e.time, e.playing);
      }, 120);
    };
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(rebuild) : null;
    ro?.observe(stage);
    document.fonts?.addEventListener('loadingdone', rebuild);
    return () => {
      clearTimeout(timer);
      ro?.disconnect();
      document.fonts?.removeEventListener('loadingdone', rebuild);
    };
  }, [build]);

  // Reduced motion: never autoplay; park on the current scene's first held frame.
  useEffect(() => {
    if (reducedMotion) {
      holds.current.add('reduced');
      const e = engineRef.current;
      if (e?.built) {
        e.pause();
        e.seek(KEY_FRAMES_MS[sceneRef.current]![0]!);
        sync();
      } else if (!startedRef.current) {
        void start(KEY_FRAMES_MS[0]![0]!);
      } else {
        refreshStatus();
      }
    } else if (holds.current.delete('reduced')) {
      sync();
    }
  }, [reducedMotion, refreshStatus, start, sync]);

  // Frame review (local and preview deploys): ?xp=<seconds> seeks and holds that frame.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('xp');
    if (param === null) return;
    const ms = Math.min(Math.max(Number(param) * 1000 || 0, 0), LOOP_MS - 1);
    holds.current.add('user');
    void start(ms);
  }, [start]);

  const togglePlay = useCallback(() => {
    const h = holds.current;
    // Not started, or assets still loading: this press means "play".
    if (!startedRef.current || h.has('poster')) {
      h.delete('offscreen');
      h.delete('reduced');
      h.delete('user');
      if (!startedRef.current) void start(POSTER_MS);
      else refreshStatus();
      return;
    }
    if (h.has('done')) {
      h.delete('done');
      h.delete('user');
      loopRef.current = 0;
      engineRef.current?.seek(0);
    } else if (h.has('user') || h.has('reduced')) {
      h.delete('user');
      h.delete('reduced');
    } else {
      h.add('user');
    }
    sync();
  }, [refreshStatus, start, sync]);

  /** Seek to `ms`, or queue it if the engine hasn't been built yet. */
  const goTo = useCallback(
    (ms: number) => {
      const h = holds.current;
      if (h.has('done')) {
        h.delete('done');
        loopRef.current = 0;
      }
      const e = engineRef.current;
      if (!e?.built) {
        pendingSeekRef.current = ms;
        if (!startedRef.current) {
          h.delete('offscreen');
          void start(ms);
        }
        return;
      }
      e.seek(ms);
      updateScene(ms);
      sync();
    },
    [start, sync, updateScene],
  );

  // Paused by the viewer (or reduced motion). The end card is not "held":
  // navigating from it plays the chosen scene from its start.
  const isHeld = useCallback(() => holds.current.has('user') || holds.current.has('reduced'), []);

  const jump = useCallback(
    (i: number) => {
      const target = (i + SCENES.length) % SCENES.length;
      const held = isHeld();
      goTo(held ? KEY_FRAMES_MS[target]![0]! : SCENES[target]!.from);
      if (held) setAnnouncement(frameLabel(FRAMES.findIndex((f) => f.scene === target)));
    },
    [goTo, isHeld],
  );

  /** Previous / next held frame (reduced motion, or paused keyboard stepping). */
  const step = useCallback(
    (dir: 1 | -1) => {
      const t = engineRef.current?.built ? engineRef.current.time : (pendingSeekRef.current ?? 0);
      // Relative to the current time, so pausing between held frames never skips one.
      let next = -1;
      if (dir === 1) next = FRAMES.findIndex((f) => f.ms > t + 1);
      else FRAMES.forEach((f, i) => f.ms < t - 1 && (next = i));
      if (next === -1) next = dir === 1 ? 0 : FRAMES.length - 1;
      goTo(FRAMES[next]!.ms);
      setAnnouncement(frameLabel(next));
    },
    [goTo],
  );

  const onControlsKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const held = isHeld();
    const keys: Record<string, () => void> = {
      ArrowLeft: () => (held ? step(-1) : jump(sceneRef.current - 1)),
      ArrowRight: () => (held ? step(1) : jump(sceneRef.current + 1)),
      Home: () => jump(0),
      End: () => jump(SCENES.length - 1),
      k: togglePlay,
      K: togglePlay,
    };
    const action = keys[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  const toggleText = status === 'done' ? 'Replay' : status === 'paused' ? 'Play' : 'Pause';
  const toggleLabel = `${toggleText} the Cartra explainer`;

  return (
    <div ref={rootRef} className={`ds-xp ${className}`.trim()}>
      <div className="ds-xp-header">
        <h2 id={headingId} className="ds-xp-title">
          <span className="ds-eyebrow ds-eyebrow-muted">{EXPLAINER_COPY.eyebrow}</span>
        </h2>
      </div>

      <div ref={stageRef} className="ds-xp-stage" onClick={togglePlay}>
        <div ref={reelRef} className="ds-xp-reel" aria-hidden="true">
          <ReelStage logoSrc={logoSrc} />
        </div>
      </div>

      <div className="ds-xp-controls" onKeyDown={onControlsKey}>
        <button type="button" className="ds-btn ds-btn-secondary ds-xp-toggle" aria-label={toggleLabel} onClick={togglePlay}>
          <ToggleIcon status={status} />
          <span className="ds-xp-toggle-text">{toggleText}</span>
        </button>

        {reducedMotion && (
          <span className="ds-xp-steppers">
            <button type="button" className="ds-btn ds-btn-secondary ds-xp-step" aria-label="Previous frame" onClick={() => step(-1)}>
              <StepIcon dir={-1} />
            </button>
            <button type="button" className="ds-btn ds-btn-secondary ds-xp-step" aria-label="Next frame" onClick={() => step(1)}>
              <StepIcon dir={1} />
            </button>
          </span>
        )}

        <span className="ds-xp-now" aria-hidden="true">
          <span className="ds-xp-now-n">
            {scene + 1}/{SCENES.length}
          </span>
          <span className="ds-xp-now-label"> {SCENES[scene]!.label}</span>
        </span>

        <ol className="ds-xp-segs" aria-label="Scenes">
          {SCENES.map((s, i) => (
            <li key={s.id} style={{ flexGrow: s.to - s.from }}>
              <button
                type="button"
                className="ds-xp-seg"
                aria-label={`Scene ${i + 1} of ${SCENES.length}: ${s.label}`}
                aria-current={i === scene ? 'step' : undefined}
                onClick={() => jump(i)}
              >
                <span className="ds-xp-seg-track">
                  <span className="ds-xp-seg-fill" data-xp={`seg${i}`} />
                </span>
                <span className="ds-xp-seg-label">{s.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <ol className="sr-only">
        {EXPLAINER_TRANSCRIPT.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}

function ToggleIcon({ status }: { status: Status }) {
  if (status === 'playing') {
    return (
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        <rect x="3" y="2" width="3" height="10" rx="0.75" />
        <rect x="8" y="2" width="3" height="10" rx="0.75" />
      </svg>
    );
  }
  if (status === 'done') {
    return (
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.75 7a4.25 4.25 0 1 0 1.25-3" />
        <path d="M3.5 1.5v2.75h2.75" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <path d="M4 2.35v9.3a.6.6 0 0 0 .9.52l7.6-4.65a.6.6 0 0 0 0-1.04L4.9 1.83a.6.6 0 0 0-.9.52Z" />
    </svg>
  );
}

function StepIcon({ dir }: { dir: 1 | -1 }) {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 1 ? 'M5.5 3 9.5 7l-4 4' : 'M8.5 3 4.5 7l4 4'} />
    </svg>
  );
}
