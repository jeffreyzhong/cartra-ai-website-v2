import { type HTMLAttributes } from 'react';

const PAD = {
  hero: 'pt-32 md:pt-36 pb-10 md:pb-14',
  heroPeek:
    'pt-28 md:pt-36 pb-14 md:pb-10 [@media(max-width:1023px)_and_(max-height:700px)]:pb-8 [@media(min-width:1024px)_and_(max-height:820px)]:pt-24 [@media(min-width:1024px)_and_(max-height:820px)]:pb-6',
  loose: 'py-[var(--space-section)] md:py-24',
  default: 'py-[var(--space-section)]',
  tight: 'py-10 md:py-12',
  flush: 'pt-0 pb-10 md:pb-14',
} as const;

type Padding = keyof typeof PAD;

type SectionProps = HTMLAttributes<HTMLElement> & {
  padding?: Padding;
};

/**
 * Section — top-level page section with ~80px vertical rhythm (DESIGN.md).
 *
 * Padding variants:
 *   hero    → extra top padding to clear the fixed nav
 *   heroPeek → hero padding tuned so the next section peeks above the fold
 *   loose   → CTA / headline bands
 *   default → standard content sections (80px)
 *   tight   → compact between heavy blocks
 *   flush   → no top padding (sits directly under the section above)
 */
export function Section({
  padding = 'default',
  className = '',
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={`relative ${PAD[padding]} px-4 sm:px-6 lg:px-8 ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}
