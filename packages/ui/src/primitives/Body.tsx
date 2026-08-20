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
  default: 'var(--c-body)',
  muted: 'var(--c-body)',
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
 * Body — paragraph text (DESIGN.md body #5a5852).
 */
export function Body({
  size = 'md',
  tone = 'default',
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
