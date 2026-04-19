/**
 * Tailwind Preset for the Cartra Design System.
 *
 * Apps consuming `@repo/ui` should add this preset to their tailwind.config:
 *
 *   import dsPreset from '@repo/ui/tailwind-preset';
 *   export default { presets: [dsPreset], content: [...], ... };
 *
 * This exposes design tokens as Tailwind utilities so you can write
 * `text-c-text-muted` or `bg-c-surface` and they resolve to
 * `var(--c-text-muted)` etc. The CSS custom properties themselves
 * must be loaded separately via `import '@repo/ui/tokens.css'`.
 */

import type { Config } from 'tailwindcss';

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        'c-bg': 'var(--c-bg)',
        'c-surface': 'var(--c-surface)',
        'c-surface-2': 'var(--c-surface-2)',
        'c-text': 'var(--c-text)',
        'c-text-muted': 'var(--c-text-muted)',
        'c-text-soft': 'var(--c-text-soft)',
        'c-border': 'var(--c-border)',
        'c-border-strong': 'var(--c-border-strong)',
        'c-navy': 'var(--c-navy)',
        'c-navy-2': 'var(--c-navy-2)',
        'c-orange': 'var(--c-orange)',
        'c-orange-bright': 'var(--c-orange-bright)',
        'c-orange-ink': 'var(--c-orange-ink)',
        'c-accent': 'var(--c-accent)',
        'c-accent-ink': 'var(--c-accent-ink)',
        'c-accent-soft': 'var(--c-accent-soft)',
        'c-accent-wash': 'var(--c-accent-wash)',
        'c-on-dark': 'var(--c-on-dark)',
        'c-on-dark-muted': 'var(--c-on-dark-muted)',
        'c-on-dark-soft': 'var(--c-on-dark-soft)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Source Serif 4', 'Georgia', 'serif'],
      },
      borderRadius: {
        'c-sm': 'var(--radius-sm)',
        'c-md': 'var(--radius-md)',
        'c-lg': 'var(--radius-lg)',
        'c-xl': 'var(--radius-xl)',
        'c-pill': 'var(--radius-pill)',
      },
    },
  },
};

export default preset;
