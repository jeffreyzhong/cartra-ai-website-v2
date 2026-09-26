/**
 * Glyph-geometry measurement for the explainer reel.
 *
 * Only two things depend on real text metrics: the typed-verb clip steps and
 * the caret path. Everything is read from the natural layout (no animations
 * applied), in px relative to the stage's top-left corner. The engine
 * re-measures whenever the stage resizes, so px values never go stale.
 */

/** A caret stop: top-left position plus uniform scale against the caret's base box. */
export type CaretPoint = { x: number; y: number; s: number };

export type TypedWord = {
  /** clip-path value with k characters visible, k = 0..n. */
  clips: string[];
  /** Caret position after k characters, k = 0..n. */
  points: CaretPoint[];
};

export type Rect = { x: number; y: number; w: number; h: number };

export type Measurements = {
  portrait: boolean;
  width: number;
  height: number;
  caretW: number;
  caretH: number;
  typed: TypedWord[];
  probes: Record<string, CaretPoint>;
  rail: Rect;
  logo: { cx: number; cy: number; r: number };
};

const HIDDEN_ALL = 'inset(-0.3em 100% -0.35em -0.2em)';
const SHOWN_ALL = 'inset(-0.3em -0.3em -0.35em -0.2em)';

export function measureReel(stage: HTMLElement, reel: HTMLElement): Measurements | null {
  const sr = stage.getBoundingClientRect();
  if (sr.width < 1 || sr.height < 1) return null;

  const q = (name: string) => reel.querySelector<HTMLElement>(`[data-xp="${name}"]`);
  const caret = q('caret-i');
  if (!caret) return null;
  const caretW = caret.offsetWidth;
  const caretH = caret.offsetHeight;
  if (!caretH) return null;

  const rel = (r: DOMRect): Rect => ({
    x: r.left - sr.left,
    y: r.top - sr.top,
    w: r.width,
    h: r.height,
  });

  const probes: Record<string, CaretPoint> = {};
  reel.querySelectorAll<HTMLElement>('[data-probe]').forEach((el) => {
    const r = rel(el.getBoundingClientRect());
    probes[el.dataset.probe as string] = { x: r.x, y: r.y, s: r.h / caretH };
  });

  const typed: TypedWord[] = [];
  const range = document.createRange();
  for (let i = 0; ; i++) {
    const word = q(`v${i}`);
    if (!word) break;
    const node = word.firstChild;
    const end = probes[`v${i}`];
    if (!node || node.nodeType !== Node.TEXT_NODE || !end) return null;

    const text = node.textContent ?? '';
    const wr = rel(word.getBoundingClientRect());
    range.setStart(node, 0);
    range.setEnd(node, text.length);
    const fullRight = range.getBoundingClientRect().right - sr.left;
    const gap = end.x - fullRight;

    const clips: string[] = [HIDDEN_ALL];
    const points: CaretPoint[] = [{ x: wr.x, y: end.y, s: end.s }];
    for (let k = 1; k <= text.length; k++) {
      range.setEnd(node, k);
      const right = range.getBoundingClientRect().right - sr.left;
      const inset = Math.max(0, (1 - (right - wr.x) / wr.w) * 100);
      clips.push(k === text.length ? SHOWN_ALL : `inset(-0.3em ${inset.toFixed(3)}% -0.35em -0.2em)`);
      points.push({ x: right + gap, y: end.y, s: end.s });
    }
    typed.push({ clips, points });
  }
  range.detach();

  const railEl = q('rail-track');
  const logoEl = q('logo');
  if (!railEl || !logoEl) return null;
  const lr = rel(logoEl.getBoundingClientRect());

  return {
    portrait: sr.width < sr.height,
    width: sr.width,
    height: sr.height,
    caretW,
    caretH,
    typed,
    probes,
    rail: rel(railEl.getBoundingClientRect()),
    logo: { cx: lr.x + lr.w / 2, cy: lr.y + lr.h / 2, r: lr.w / 2 },
  };
}
