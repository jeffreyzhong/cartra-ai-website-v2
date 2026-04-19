import { type HTMLAttributes, type ReactNode } from 'react';

type RiseProps = HTMLAttributes<HTMLDivElement> & {
  /** Stagger step (1 = first, 7 = last). Maps to a fixed delay schedule. */
  step?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  children: ReactNode;
};

/**
 * Rise — wrapper that fades a child up into view on mount, with a
 * staggered delay determined by `step`. Use to choreograph entrance
 * animations across hero sections (eyebrow → heading → body → CTAs).
 *
 * Steps map to fixed delays (80ms intervals starting at 80ms):
 *   1 → 80ms, 2 → 180ms, 3 → 280ms, 4 → 380ms,
 *   5 → 480ms, 6 → 560ms, 7 → 660ms
 *
 * Respects prefers-reduced-motion (skips the animation).
 *
 * @example
 *   <Rise step={1}><Display>...</Display></Rise>
 *   <Rise step={3}><Body>...</Body></Rise>
 *   <Rise step={5}><Button>...</Button></Rise>
 */
export function Rise({
  step = 1,
  className = '',
  children,
  ...rest
}: RiseProps) {
  return (
    <div className={`ds-rise ds-rise-${step} ${className}`} {...rest}>
      {children}
    </div>
  );
}
