import { type HTMLAttributes } from 'react';

const PAD = {
  hero: 'pt-32 md:pt-36 pb-20 md:pb-28',
  loose: 'py-24 md:py-32',
  default: 'py-20 md:py-24',
  tight: 'py-14 md:py-16',
} as const;

type Padding = keyof typeof PAD;

type SectionProps = HTMLAttributes<HTMLElement> & {
  padding?: Padding;
};

/**
 * Section — top-level page section with consistent vertical padding.
 *
 * Padding variants:
 *   hero    → extra top padding to clear the fixed nav
 *   loose   → generous spacing for headline-only sections (CTAs)
 *   default → standard content sections
 *   tight   → compact sections (between heavy content blocks)
 *
 * Wrap children in a `Container` to constrain content width.
 *
 * @example
 *   <Section id="results" padding="default">
 *     <Container size="xl">...</Container>
 *   </Section>
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
