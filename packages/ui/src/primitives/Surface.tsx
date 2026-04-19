import { type HTMLAttributes } from 'react';

type SurfaceProps = HTMLAttributes<HTMLDivElement>;

/**
 * Surface — outermost page wrapper. Establishes the warm-cool off-white
 * palette + isolation context so the drifting `Mesh` can sit at z-index -1
 * without escaping behind the document root.
 *
 * @example
 *   <Surface>
 *     <Mesh />
 *     <Navigation />
 *     <Section>...</Section>
 *   </Surface>
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
