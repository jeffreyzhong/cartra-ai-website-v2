/**
 * Explainer reel copy. Every on-screen string lives here so the public-copy
 * check can scan one file (no em or en dashes allowed in user-facing copy).
 *
 * Industry agnostic by design: no domain nouns (invoices, shipments, claims).
 */

export const EXPLAINER_COPY = {
  eyebrow: 'Cartra in 30 seconds',
  problem: {
    verbs: ['Copy.', 'Paste.', 'Retype.', 'Chase.', 'Repeat.'],
    people: ['Your best', 'people.'],
    stuck: 'Stuck on',
    busywork: 'busywork.',
  },
  what: {
    headline: ['We', 'build', 'custom', 'AI', 'agents'],
    headlineTail: ['that do the', 'busywork.'],
    objections: [['No migration.'], ['No disruption.'], ['No AI team', 'needed.']],
  },
  how: {
    steps: [
      { n: '01', title: 'Discover & map.', support: ['Find your costliest', 'manual work.'] },
      { n: '02', title: 'Build & deploy.', support: ['Inside your', 'existing tools.'] },
      { n: '03', title: 'Launch & scale.', support: ['Measured live.', 'Replicated across teams.'] },
    ],
  },
  proof: {
    value: 60,
    label: ['lower operational costs,', 'on average.'],
  },
  brand: {
    name: 'Cartra',
    tagline: ['Power the next decade', 'of your business.'],
  },
} as const;

/** Plain-text transcript for screen readers, one entry per scene. */
export const EXPLAINER_TRANSCRIPT = [
  'Copy. Paste. Retype. Chase. Repeat. Your best people, stuck on busywork.',
  'We build custom AI agents that do the busywork. No migration. No disruption. No AI team needed.',
  'How it works. One: Discover and map. Find your costliest manual work. Two: Build and deploy, inside your existing tools. Three: Launch and scale. Measured live, replicated across teams.',
  '60% lower operational costs, on average.',
  'Cartra. Power the next decade of your business.',
] as const;
