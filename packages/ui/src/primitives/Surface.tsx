import { type HTMLAttributes } from 'react';

type SurfaceProps = HTMLAttributes<HTMLDivElement>;

/**
 * Surface — outermost page wrapper. Cream canvas + ink from DESIGN.md tokens.
 */
export function Surface({ className = '', children, style, ...rest }: SurfaceProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--c-bg)',
        color: 'var(--c-text)',
        position: 'relative',
        isolation: 'isolate',
        minHeight: '100vh',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
