import { type ReactNode } from 'react';

type Tone = 'accent' | 'muted' | 'soft';

type EyebrowProps = {
  tone?: Tone;
  withDot?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Eyebrow — caption-uppercase section label (DESIGN.md).
 *
 * Tones:
 *   accent → ink (optional leading dot)
 *   muted  → muted text (default for most sections)
 *   soft   → muted-soft
 */
export function Eyebrow({
  tone = 'muted',
  withDot,
  className = '',
  children,
}: EyebrowProps) {
  const showDot = withDot ?? tone === 'accent';
  return (
    <span className={`ds-eyebrow ds-eyebrow-${tone} ${className}`} data-with-dot={showDot}>
      {children}
    </span>
  );
}
