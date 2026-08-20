import { type CSSProperties, type ReactNode } from 'react';

const SIZES = {
  xl: 'var(--text-display-xl)',
  lg: 'var(--text-display-lg)',
  md: 'var(--text-display-md)',
  sm: 'var(--text-display-sm)',
} as const;

const TRACKING = {
  xl: 'var(--tracking-display-xl)',
  lg: 'var(--tracking-display-lg)',
  md: 'var(--tracking-display-md)',
  sm: 'var(--tracking-display-sm)',
} as const;

type Size = keyof typeof SIZES;

type DisplayProps = {
  as?: 'h1' | 'h2' | 'h3';
  size?: Size;
  align?: 'left' | 'center';
  maxWidth?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Display — large heading typography (DESIGN.md weight 400).
 *
 * Sizes (fluid via clamp):
 *   xl → homepage hero
 *   lg → section heads
 *   md → sub-section heads
 *   sm → card group titles
 */
export function Display({
  as: Tag = 'h1',
  size = 'lg',
  align = 'left',
  maxWidth,
  className = '',
  style,
  children,
}: DisplayProps) {
  return (
    <Tag
      className={`ds-display ${className}`}
      style={{
        fontSize: SIZES[size],
        letterSpacing: TRACKING[size],
        textAlign: align,
        maxWidth,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
