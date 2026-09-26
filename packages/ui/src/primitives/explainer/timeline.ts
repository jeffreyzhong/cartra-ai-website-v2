/**
 * Explainer reel timeline: the single timing source for all 30 seconds.
 *
 * The reel is scored to a 120bpm grid (one beat = 500ms); every hit lands on
 * a 16th note. Each entry below is one segment in absolute film time; the
 * engine turns them into Web Animations that share one 30s clock, so play,
 * pause, seek and loop move the whole film in lockstep.
 *
 * Motion vocabulary, one meaning each:
 *   TYPE  (scene 1)  40ms per character, manual work
 *   SLAM  (scene 2)  260ms snap, the agent's instant output
 *   RISE             masked reveal from below, information arriving
 *   EXIT             masked exit upward, done and moving on
 * Every exit and wipe travels upward, the same direction as the page scroll.
 */

import type { CaretPoint, Measurements } from './measure';

export const LOOP_MS = 30000;
export const POSTER_MS = 250;

export const SCENES = [
  { id: 'problem', label: 'Problem', from: 0, to: 6000 },
  { id: 'what', label: 'What we do', from: 6000, to: 12750 },
  { id: 'how', label: 'How it works', from: 12750, to: 21500 },
  { id: 'proof', label: 'Proof', from: 21500, to: 25500 },
  { id: 'brand', label: 'Cartra', from: 25500, to: 30000 },
] as const;

/**
 * Held frames per scene for the reduced-motion stepper (and paused chapter
 * jumps). Together they show every line of copy in the film.
 */
export const KEY_FRAMES_MS: readonly (readonly number[])[] = [
  [2600, 5560],
  [9000, 11500],
  [15250, 18000, 20900],
  [24500],
  [29000],
];

export function sceneAt(ms: number): number {
  const t = Math.min(Math.max(ms, 0), LOOP_MS - 1);
  return SCENES.findIndex((s) => t >= s.from && t < s.to);
}

const EASE = {
  snap: 'cubic-bezier(0.2, 0.9, 0.1, 1)',
  outSoft: 'cubic-bezier(0.16, 1, 0.3, 1)',
  in: 'cubic-bezier(0.7, 0, 0.84, 0)',
  wipe: 'cubic-bezier(0.76, 0, 0.24, 1)',
  flood: 'cubic-bezier(0.87, 0, 0.13, 1)',
  iris: 'cubic-bezier(0.7, 0, 0.3, 1)',
  travel: 'cubic-bezier(0.65, 0, 0.35, 1)',
  step: 'steps(1, end)',
  linear: 'linear',
} as const;

const TYPE_MS = 40;
const VERB_AT = [0, 500, 1000, 1500, 2000];
const HEADLINE_AT = [6125, 6250, 6375, 6500, 6625];
const RAIL_HEAD_SY = 4.5 / 8.2;
/** The caret lands on a slammed word once its 1.12 scale has mostly settled. */
const SLAM_SETTLE = 90;

const MASK_OFFSET = '0.45em';
const FROM_BELOW = `translateY(calc(100% + ${MASK_OFFSET}))`;
const TO_ABOVE = `translateY(calc(-100% - ${MASK_OFFSET}))`;
const REST = 'translateY(0)';
const FULL = 'inset(0% 0% 0% 0%)';

export type Palette = {
  ink: string;
  cream: string;
  muted: string;
  hairline: string;
  orange: string;
  orangeDeep: string;
};

export type Segment = {
  el: Element;
  keyframes: Keyframe[];
  at: number;
  duration: number;
  easing: string;
};

type Stop = { t: number; v: string | number; ease?: string };

/** Turns absolute-time stops into one 30s keyframe track. */
function stopsToKeyframes(prop: string, stops: Stop[]): Keyframe[] {
  const sorted = [...stops].sort((a, b) => a.t - b.t);
  if (sorted[0]!.t !== 0) sorted.unshift({ ...sorted[0]!, t: 0 });
  const last = sorted[sorted.length - 1]!;
  if (last.t !== LOOP_MS) sorted.push({ t: LOOP_MS, v: last.v });
  return sorted.map((s) => ({
    offset: s.t / LOOP_MS,
    [prop]: s.v,
    easing: s.ease ?? EASE.step,
  }));
}

export function buildTimeline(
  els: Map<string, Element>,
  m: Measurements,
  c: Palette,
  opts: { segments: boolean },
): Segment[] {
  const out: Segment[] = [];
  const T = (name: string, at: number, duration: number, keyframes: Keyframe[], easing: string = EASE.linear) => {
    const el = els.get(name);
    if (el) out.push({ el, at, duration, keyframes, easing });
  };
  const rise = (name: string, at: number, duration = 420) =>
    T(name, at, duration, [{ transform: FROM_BELOW }, { transform: REST }], EASE.outSoft);
  const exit = (name: string, at: number, duration = 240) =>
    T(name, at, duration, [{ transform: REST }, { transform: TO_ABOVE }], EASE.in);
  const slam = (name: string, at: number) =>
    T(
      name,
      at,
      260,
      [
        { opacity: 0, transform: 'translateY(0.08em) scale(1.12)', offset: 0 },
        { opacity: 1, offset: 0.35 },
        { opacity: 1, transform: 'translateY(0) scale(1)', offset: 1 },
      ],
      EASE.snap,
    );
  const show = (name: string, at: number) => T(name, at, 1, [{ opacity: 0 }, { opacity: 1 }], EASE.step);
  const hide = (name: string, at: number) => T(name, at, 1, [{ opacity: 1 }, { opacity: 0 }], EASE.step);

  /* ── Scene 1 · The problem (0 – 6s) ─────────────────────────────── */

  // TYPE: each verb reveals one character per 40ms, first character on the beat.
  m.typed.forEach((word, i) => {
    const at = VERB_AT[i]!;
    const n = word.clips.length - 1;
    const duration = TYPE_MS * (n - 1) + 1;
    T(
      `v${i}`,
      at - 1,
      duration,
      word.clips.map((clip, k) => ({
        clipPath: clip,
        offset: k === 0 ? 0 : (1 + TYPE_MS * (k - 1)) / duration,
        easing: EASE.step,
      })),
    );
  });

  // Verbs leave by visual line: three lines in landscape, five in portrait.
  const verbExit = m.portrait ? [3000, 3040, 3080, 3120, 3160] : [3000, 3000, 3040, 3040, 3080];
  verbExit.forEach((at, i) => exit(`vm${i}`, at));

  rise('people', 3375);
  rise('stuck', 3750);

  // The handoff: the agent selects only the busywork, never the people.
  T('sel-bar', 5375, 160, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], EASE.snap);
  T(
    'sel-ink',
    5375,
    160,
    [{ clipPath: 'inset(-0.3em 0% -0.35em 100%)' }, { clipPath: 'inset(-0.3em -0.1em -0.35em 0%)' }],
    EASE.snap,
  );
  hide('sel-txt', 5535);
  T(
    'sel',
    5625,
    125,
    [
      { transform: 'scaleY(1)', opacity: 1 },
      { transform: 'scaleY(0)', opacity: 0 },
    ],
    EASE.in,
  );
  exit('people', 5750, 200);
  exit('stuck', 5790, 200);
  T('ink', 5750, 250, [{ clipPath: FULL }, { clipPath: 'inset(0% 0% 100% 0%)' }], EASE.wipe);

  /* ── Scene 2 · What we do (6 – 12.75s) ──────────────────────────── */

  HEADLINE_AT.forEach((at, i) => slam(`w${i}`, at));
  slam('w-tail', 6875);
  // Headline is fully gone by 9.34s, before the first objection lands at 9.375s.
  exit('head-1', 9100, 200);
  exit('head-2', 9140, 200);

  [9375, 9625, 9875].forEach((at, i) => slam(`no${i}`, at));
  [12125, 12175, 12225].forEach((at, i) => exit(`no${i}`, at));

  /* ── Scene 3 · How it works (12.75 – 21.5s) ─────────────────────── */

  T('rail', 12500, 250, [{ transform: 'scaleX(0) scaleY(1)' }, { transform: 'scaleX(1) scaleY(1)' }], EASE.outSoft);

  const STEP_AT = [12750, 15500, 18250];
  STEP_AT.forEach((at, i) => {
    rise(`step${i}`, at);
    T('odo', at, 300, [{ transform: `translateY(${1 - i}em)` }, { transform: `translateY(${-i}em)` }], EASE.outSoft);
    T(
      'rail-fill',
      at,
      380,
      [{ transform: `scaleX(${i / 3})` }, { transform: `scaleX(${(i + 1) / 3})` }],
      EASE.outSoft,
    );
    [0, 1].forEach((j) => {
      rise(`sup${i}-${j}`, at + 250 + 60 * j, 360);
      if (i < 2) exit(`sup${i}-${j}`, STEP_AT[i + 1]!);
    });
  });
  // Finished steps step back to muted, then snap to ink for a one-beat recap.
  T('stepc0', 15500, 240, [{ color: c.ink }, { color: c.muted }]);
  T('stepc1', 18250, 240, [{ color: c.ink }, { color: c.muted }]);
  T('stepc0', 20750, 150, [{ color: c.muted }, { color: c.ink }]);
  T('stepc1', 20750, 150, [{ color: c.muted }, { color: c.ink }]);

  // FLOOD: the finished rail floods the frame; the rail becomes the cost bar.
  const r = m.rail;
  const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;
  const railInset = `inset(${pct(r.y, m.height)} ${pct(m.width - r.x - r.w, m.width)} ${pct(
    m.height - r.y - r.h,
    m.height,
  )} ${pct(r.x, m.width)})`;
  show('orange', 21250);
  T('orange', 21250, 250, [{ clipPath: railInset }, { clipPath: FULL }], EASE.flood);
  // The rail turns into the cost bar only once the flood has swallowed it.
  show('rail-white', 21300);
  T('rail-track', 21300, 1, [{ backgroundColor: c.hairline }, { backgroundColor: c.orangeDeep }], EASE.step);
  T('rail', 21300, 200, [{ transform: 'scaleX(1) scaleY(1)' }, { transform: 'scaleX(1) scaleY(2.5)' }], EASE.flood);
  hide('how', 21500);

  /* ── Scene 4 · Proof (21.5 – 25.5s) ─────────────────────────────── */

  rise('stat', 21500, 300);
  // Number and picture are one gesture: same delay, duration and curve.
  T('num', 21625, 1000, [{ '--xp-n': 0 } as Keyframe, { '--xp-n': 60 } as Keyframe], EASE.outSoft);
  T('rail-fill', 21625, 1000, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.4)' }], EASE.outSoft);
  // LOCK: a 3% stamp, not a bounce.
  T('stat', 22625, 100, [{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(0) scale(1.03)' }], EASE.outSoft);
  T('stat', 22725, 160, [{ transform: 'translateY(0) scale(1.03)' }, { transform: 'translateY(0) scale(1)' }], EASE.travel);
  rise('stat-label', 22750, 400);
  T('rail', 24875, 200, [{ transform: 'scaleX(1) scaleY(2.5)' }, { transform: 'scaleX(0) scaleY(2.5)' }], EASE.in);
  exit('stat', 24750);
  exit('stat-label', 24790);

  // IRIS: the proof closes onto a logo-sized disc.
  const { cx, cy, r: lr } = m.logo;
  const irisFrom = Math.hypot(Math.max(cx, m.width - cx), Math.max(cy, m.height - cy)) + 2;
  T(
    'orange',
    25000,
    400,
    [
      { clipPath: `circle(${irisFrom.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)` },
      { clipPath: `circle(${lr.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)` },
    ],
    EASE.iris,
  );
  hide('orange', 25500);

  /* ── Scene 5 · Cartra (25.5 – 30s) ──────────────────────────────── */

  show('logo', 25500);
  T('disc', 25500, 300, [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], EASE.outSoft);
  T('logo-img', 25500, 300, [{ clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: FULL }], EASE.outSoft);
  T('ring', 25800, 150, [{ opacity: 0 }, { opacity: 1 }]);
  T(
    'wordmark',
    25750,
    420,
    [{ clipPath: 'inset(-0.3em 100% -0.3em 0%)' }, { clipPath: 'inset(-0.3em -0.3em -0.3em 0%)' }],
    EASE.outSoft,
  );
  T('wordmark-i', 25750, 420, [{ transform: 'translateX(-0.25em)' }, { transform: 'translateX(0)' }], EASE.outSoft);
  rise('tag0', 26125, 400);
  rise('tag1', m.portrait ? 26185 : 26125, 400);

  // LOOP SEAM: ink returns from below; the frame at 30s equals the frame at 0.
  T('ink-loop', 29750, 250, [{ clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: FULL }], EASE.wipe);

  /* ── The caret: one element, all 30 seconds ─────────────────────── */

  const P = (p: CaretPoint, sy = p.s) =>
    `translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px) scale(${p.s.toFixed(4)}, ${sy.toFixed(4)})`;
  const probe = (name: string) => m.probes[name] ?? { x: 0, y: 0, s: 1 };
  const railHead = (f: number) => {
    const h = m.caretH * RAIL_HEAD_SY;
    return `translate(${(r.x + f * r.w - m.caretW / 2).toFixed(2)}px, ${(r.y + r.h / 2 - h / 2).toFixed(
      2,
    )}px) scale(1, ${RAIL_HEAD_SY.toFixed(4)})`;
  };

  const home = m.typed[0]?.points[0] ?? probe('w-start');
  const move: Stop[] = [];
  m.typed.forEach((word, i) => {
    for (let k = 1; k < word.points.length; k++) {
      move.push({ t: VERB_AT[i]! + TYPE_MS * (k - 1), v: P(word.points[k]!) });
    }
  });
  move.push(
    { t: 4250, v: P(probe('sel-end')) },
    { t: 5625, v: P(probe('sel-start')) },
    { t: 5750, v: P(probe('sel-start')), ease: EASE.travel },
    { t: 6000, v: P(probe('w-start')) },
    ...HEADLINE_AT.map((t, i) => ({ t: t + SLAM_SETTLE, v: P(probe(`w${i}`)) })),
    { t: 6875 + SLAM_SETTLE, v: P(probe('w-tail')) },
    { t: 9375 + SLAM_SETTLE, v: P(probe('no0')) },
    { t: 9625 + SLAM_SETTLE, v: P(probe('no1')) },
    { t: 9875 + SLAM_SETTLE, v: P(probe('no2')), ease: EASE.step },
    { t: 12250, v: P(probe('no2')), ease: EASE.travel },
    { t: 12550, v: railHead(0) },
    { t: 12750, v: railHead(0), ease: EASE.outSoft },
    { t: 13130, v: railHead(1 / 3) },
    { t: 15500, v: railHead(1 / 3), ease: EASE.outSoft },
    { t: 15880, v: railHead(2 / 3) },
    { t: 18250, v: railHead(2 / 3), ease: EASE.outSoft },
    { t: 18630, v: railHead(1) },
    { t: 26750, v: P(probe('tag-end')) },
    { t: 29750, v: P(probe('tag-end')), ease: EASE.travel },
    { t: LOOP_MS, v: P(home) },
  );
  T('caret', 0, LOOP_MS, stopsToKeyframes('transform', move));

  // Cream while it belongs to the person; blinks only when idle or stuck.
  T(
    'caret-i',
    0,
    LOOP_MS,
    stopsToKeyframes('opacity', [
      { t: 0, v: 1 },
      { t: 2780, v: 0 },
      { t: 4250, v: 1 },
      { t: 4750, v: 0 },
      { t: 5250, v: 1 },
      { t: 9100, v: 0 },
      { t: 9375 + SLAM_SETTLE, v: 1 },
      { t: 21250, v: 1, ease: EASE.linear },
      { t: 21310, v: 0 },
      { t: 26750, v: 1 },
      { t: 27250, v: 0 },
      { t: 27750, v: 1 },
      { t: 28250, v: 0 },
      { t: 28750, v: 1 },
      { t: 29250, v: 0 },
      { t: 29750, v: 1 },
    ]),
  );
  T(
    'caret-i',
    0,
    LOOP_MS,
    stopsToKeyframes('transform', [
      { t: 0, v: 'scaleY(1)' },
      { t: 4250, v: 'scaleY(0)', ease: EASE.outSoft },
      { t: 4370, v: 'scaleY(1)' },
      { t: 26750, v: 'scaleY(0)', ease: EASE.outSoft },
      { t: 26900, v: 'scaleY(1)' },
    ]),
  );
  // Orange means the agent: it takes the cursor at 5.375s and leaves with
  // Cartra, turning cream only once the returning ink is under it. Colour
  // lives on a child so the caret's transform/opacity stay compositable.
  T('caret-c', 5375, 1, [{ backgroundColor: c.cream }, { backgroundColor: c.orange }], EASE.step);
  T('caret-c', 29950, 1, [{ backgroundColor: c.orange }, { backgroundColor: c.cream }], EASE.step);

  if (opts.segments) {
    SCENES.forEach((s, i) =>
      T(`seg${i}`, s.from, s.to - s.from, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }]),
    );
  }

  return out;
}
