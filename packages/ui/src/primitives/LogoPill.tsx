import { type HTMLAttributes, type ReactNode } from 'react';

type LogoPillProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

/**
 * LogoPill — small surface-tinted rounded rectangle, used to wrap
 * customer / partner logos so they read as a deliberate badge rather
 * than a naked SVG floating on the page.
 *
 * @example
 *   <LogoPill>
 *     <Image src="/META.svg" alt="Meta" width={96} height={22} className="h-[18px] w-auto" />
 *   </LogoPill>
 */
export function LogoPill({ className = '', children, ...rest }: LogoPillProps) {
  return (
    <span className={`ds-logo-pill ${className}`} {...rest}>
      {children}
    </span>
  );
}
