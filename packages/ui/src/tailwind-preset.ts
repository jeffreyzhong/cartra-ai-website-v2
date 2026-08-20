/**
 * Tailwind Preset for the Cartra Design System.
 *
 * Apps consuming `@repo/ui` should add this preset to their tailwind.config:
 *
 *   import dsPreset from '@repo/ui/tailwind-preset';
 *   export default { presets: [dsPreset], content: [...], ... };
 *
 * Visual source of truth: root DESIGN.md.
 */

import type { Config } from 'tailwindcss';

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        'c-bg': 'var(--c-bg)',
        'c-canvas-soft': 'var(--c-canvas-soft)',
        'c-surface': 'var(--c-surface)',
        'c-surface-2': 'var(--c-surface-2)',
        'c-surface-card': 'var(--c-surface-card)',
        'c-surface-strong': 'var(--c-surface-strong)',
        'c-text': 'var(--c-text)',
        'c-body': 'var(--c-body)',
        'c-text-muted': 'var(--c-text-muted)',
        'c-text-soft': 'var(--c-text-soft)',
        'c-border': 'var(--c-border)',
        'c-border-soft': 'var(--c-border-soft)',
        'c-border-strong': 'var(--c-border-strong)',
        'c-primary': 'var(--c-primary)',
        'c-primary-active': 'var(--c-primary-active)',
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
        'c-timeline-thinking': 'var(--c-timeline-thinking)',
        'c-timeline-grep': 'var(--c-timeline-grep)',
        'c-timeline-read': 'var(--c-timeline-read)',
        'c-timeline-edit': 'var(--c-timeline-edit)',
        'c-timeline-done': 'var(--c-timeline-done)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Source Serif 4', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'c-xs': 'var(--radius-xs)',
        'c-sm': 'var(--radius-sm)',
        'c-md': 'var(--radius-md)',
        'c-lg': 'var(--radius-lg)',
        'c-xl': 'var(--radius-xl)',
        'c-pill': 'var(--radius-pill)',
      },
      spacing: {
        section: 'var(--space-section)',
      },
    },
  },
};

export default preset;
