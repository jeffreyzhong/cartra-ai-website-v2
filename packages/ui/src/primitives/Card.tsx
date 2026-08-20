import { type HTMLAttributes, type ReactNode } from 'react';

type Surface = 'default' | 'panel' | 'frosted' | 'featured' | 'navy';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  surface?: Surface;
  children: ReactNode;
};

/**
 * Card — white hairline container on cream canvas (DESIGN.md).
 *
 * Surfaces:
 *   default / panel / frosted → white card + 1px hairline (frosted is an alias)
 *   featured / navy           → ink-inverted featured card (use rarely)
 */
export function Card({
  surface = 'default',
  className = '',
  children,
  ...rest
}: CardProps) {
  const surfaceClass =
    surface === 'navy'
      ? 'ds-card-featured'
      : surface === 'featured'
        ? 'ds-card-featured'
        : surface === 'frosted' || surface === 'panel'
          ? `ds-card-${surface}`
          : 'ds-card-default';

  return (
    <div className={`ds-card ${surfaceClass} ${className}`} {...rest}>
      {children}
    </div>
  );
}
