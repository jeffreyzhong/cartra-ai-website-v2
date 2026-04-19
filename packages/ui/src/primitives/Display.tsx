import { type CSSProperties, type ReactNode } from 'react';

const SIZES = {
  xl: 'var(--text-display-xl)',
  lg: 'var(--text-display-lg)',
  md: 'var(--text-display-md)',
  sm: 'var(--text-display-sm)',
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
 * Display — large heading typography.
 *
 * Sizes (fluid via clamp):
 *   xl → headlines (max 4.5rem)
 *   lg → primary section headings (max 3.75rem)
 *   md → secondary headings (max 2.875rem)
 *   sm → tertiary (max 2.25rem)
 *
 * Wrap an emphasized word in `<em>` to get the orange underline treatment.
 *
 * @example
 *   <Display as="h1" size="lg">
 *     Transform your operations with AI that's <em>customized</em> to your business.
 *   </Display>
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
        textAlign: align,
        maxWidth,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
