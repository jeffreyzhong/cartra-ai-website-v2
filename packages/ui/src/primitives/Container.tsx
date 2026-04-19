import { type HTMLAttributes } from 'react';

const SIZES = {
  sm: 'max-w-2xl',   // 42rem — narrow content (FAQ, contact)
  md: 'max-w-3xl',   // 48rem — standard text content
  lg: 'max-w-5xl',   // 64rem — hero text + comfortable margins
  xl: 'max-w-6xl',   // 72rem — feature grids
  '2xl': 'max-w-7xl', // 80rem — full-width sections
} as const;

type Size = keyof typeof SIZES;

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: Size;
};

/**
 * Container — centered max-width wrapper. Inside a `Section`, sets the
 * effective content width.
 *
 * Sizes:
 *   sm  → 42rem (narrow text)
 *   md  → 48rem (standard text)
 *   lg  → 64rem (hero, default)
 *   xl  → 72rem (feature grids)
 *   2xl → 80rem (full-width sections)
 */
export function Container({
  size = 'lg',
  className = '',
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className={`${SIZES[size]} mx-auto ${className}`} {...rest}>
      {children}
    </div>
  );
}
