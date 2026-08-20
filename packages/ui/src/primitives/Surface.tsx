import { type HTMLAttributes } from 'react';

type SurfaceProps = HTMLAttributes<HTMLDivElement>;

/**
 * Surface — outermost page wrapper. Sets page background/text from tokens
 * (`--c-bg` / `--c-text`) and isolation so optional legacy `Mesh` can sit
 * at z-index -1. Visual target is cream canvas + ink from DESIGN.md
 * (token remap pending — see docs/ui-design-plan.md).
 *
 * @example
 *   <Surface>
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
