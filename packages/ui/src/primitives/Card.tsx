import { type HTMLAttributes, type ReactNode } from 'react';

type Surface = 'frosted' | 'panel' | 'navy';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  surface?: Surface;
  children: ReactNode;
};

/**
 * Card — content container with consistent surface treatment.
 *
 * Surfaces:
 *   frosted → semi-transparent lavender with backdrop-blur (default —
 *             reads against the drifting Mesh as a frosted-glass card)
 *   panel   → solid surface tint, no blur (use when the card sits on a
 *             plain background where blur isn't needed)
 *   navy    → deep midnight navy panel with light text on dark
 *             (statement / "our solution" style emphasis)
 *
 * @example
 *   <Card surface="frosted">...</Card>
 *   <Card surface="navy">...</Card>
 */
export function Card({
  surface = 'frosted',
  className = '',
  children,
  ...rest
}: CardProps) {
  return (
    <div className={`ds-card ds-card-${surface} ${className}`} {...rest}>
      {children}
    </div>
  );
}
