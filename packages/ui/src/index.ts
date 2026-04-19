/**
 * @repo/ui — Cartra Design System
 *
 * Public exports. Components import via:
 *   import { Button, Display, Section } from '@repo/ui';
 *
 * Apps must also import the stylesheet once (typically in their root
 * layout):
 *   import '@repo/ui/tokens.css';
 *   import '@repo/ui/motion.css';
 *   import '@repo/ui/components.css';
 *
 * And add the Tailwind preset to their tailwind.config:
 *   import dsPreset from '@repo/ui/tailwind-preset';
 *   export default { presets: [dsPreset], ... };
 */

// Layout primitives
export { Surface } from './primitives/Surface';
export { Mesh } from './primitives/Mesh';
export { Section } from './primitives/Section';
export { Container } from './primitives/Container';

// Text primitives
export { Display } from './primitives/Display';
export { Body } from './primitives/Body';
export { Eyebrow } from './primitives/Eyebrow';

// Interactive primitives
export { Button } from './primitives/Button';
export { LogoPill } from './primitives/LogoPill';

// Composition primitives
export { Card } from './primitives/Card';
export { Stat, StatGroup } from './primitives/Stat';
export type { StatItem } from './primitives/Stat';
export { Rise } from './primitives/Rise';
export { Words } from './primitives/Word';

// Hooks
export { useReducedMotion } from './hooks/useReducedMotion';
