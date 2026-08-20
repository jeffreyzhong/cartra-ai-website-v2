/**
 * Mesh — drifting ambient gradient layer (legacy cobalt + orange).
 *
 * Legacy Retell-inspired backdrop; DESIGN.md is canonical —
 * see docs/ui-design-plan.md.
 *
 * Position: fixed (covers viewport, scrolls with the user). Three radial
 * gradients with positions animated via @property-registered custom
 * properties. 78s drift cycle, alternates direction.
 *
 * Place once at the root of a `Surface`. Sits at z-index -1.
 *
 * @example
 *   <Surface>
 *     <Mesh />
 *     ...
 *   </Surface>
 */
export function Mesh() {
  return (
    <div
      aria-hidden
      className="ds-mesh"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: [
          'radial-gradient(1400px 800px at var(--ds-mesh-x1) var(--ds-mesh-y1), color-mix(in oklab, var(--c-accent) 22%, transparent), transparent 70%)',
          'radial-gradient(1100px 700px at var(--ds-mesh-x2) var(--ds-mesh-y2), color-mix(in oklab, var(--c-orange) 18%, transparent), transparent 65%)',
          'radial-gradient(900px 550px at var(--ds-mesh-x3) var(--ds-mesh-y3), color-mix(in oklab, var(--c-accent) 14%, transparent), transparent 65%)',
        ].join(','),
        animation: 'ds-mesh-drift 78s ease-in-out infinite alternate',
      }}
    />
  );
}
