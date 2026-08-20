import { type ReactNode } from 'react';

type Tone = 'accent' | 'muted' | 'soft';

type EyebrowProps = {
  tone?: Tone;
  withDot?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Eyebrow — small uppercase tracked label, sits above headings to give
 * sections a category tag.
 *
 * Tones (legacy Retell-inspired tokens; DESIGN.md is canonical —
 * see docs/ui-design-plan.md):
 *   accent → legacy cobalt with a leading dot (default for prominent eyebrows)
 *   muted  → subtle text-soft, no dot (for trust labels and footnotes)
 *   soft   → very subtle, no dot
 *
 * @example
 *   <Eyebrow tone="muted">Founded by engineers from</Eyebrow>
 */
export function Eyebrow({
  tone = 'accent',
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
