import { type CSSProperties, type ReactNode } from 'react';

const SIZES = {
  lg: 'var(--text-body-lg)',
  md: 'var(--text-body-md)',
  sm: 'var(--text-body-sm)',
  xs: 'var(--text-body-xs)',
} as const;

type Size = keyof typeof SIZES;
type Tone = 'default' | 'muted' | 'soft' | 'on-dark' | 'on-dark-muted';

const TONES: Record<Tone, string> = {
  default: 'var(--c-text)',
  muted: 'var(--c-text-muted)',
  soft: 'var(--c-text-soft)',
  'on-dark': 'var(--c-on-dark)',
  'on-dark-muted': 'var(--c-on-dark-muted)',
};

type BodyProps = {
  size?: Size;
  tone?: Tone;
  align?: 'left' | 'center' | 'right';
  maxWidth?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Body — paragraph text.
 *
 * Sizes:    lg / md / sm / xs (fixed rem, not fluid)
 * Tones:    default / muted / soft / on-dark / on-dark-muted
 *
 * Body text auto-caps line length at 52ch via the `.ds-body` class for
 * comfortable reading. Override with `maxWidth` if needed.
 */
export function Body({
  size = 'md',
  tone = 'muted',
  align = 'left',
  maxWidth,
  className = '',
  style,
  children,
}: BodyProps) {
  return (
    <p
      className={`ds-body ${className}`}
      style={{
        fontSize: SIZES[size],
        color: TONES[tone],
        textAlign: align,
        maxWidth,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
