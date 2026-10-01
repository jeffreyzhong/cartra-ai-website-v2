import type { FAQItem } from './faqs';

/**
 * Content for /support. Copy rule: no em or en dashes anywhere in these
 * strings (they render on screen and in FAQPage JSON-LD).
 */

export const SUPPORT_EMAIL = 'team@cartra.ai';

/** Builds a `mailto:` link to the support inbox with an optional subject and body. */
export function supportMailto({ subject, body }: { subject?: string; body?: string } = {}) {
  const params = [
    subject ? `subject=${encodeURIComponent(subject)}` : null,
    body ? `body=${encodeURIComponent(body)}` : null,
  ].filter(Boolean);
  return `mailto:${SUPPORT_EMAIL}${params.length ? `?${params.join('&')}` : ''}`;
}

/* ─── Contact routes ──────────────────────────────────────── */

export type SupportRouteAction =
  | { type: 'email'; label: string; subject?: string }
  | { type: 'consultation'; label: string }
  | { type: 'link'; label: string; href: string };

export type SupportRoute = {
  id: 'clients' | 'prospects' | 'security';
  /** Who this route is for. Rendered as the eyebrow. */
  audience: string;
  title: string;
  description: string;
  actions: SupportRouteAction[];
};

/** The first route is the featured one (existing clients). */
export const SUPPORT_ROUTES: SupportRoute[] = [
  {
    id: 'clients',
    audience: 'Existing clients',
    title: 'Report an issue or request a change to a deployed agent.',
    description:
      "Email us, post in your engagement's shared Slack or Microsoft Teams channel if you have one, or go straight to your named point of contact.",
    actions: [{ type: 'link', label: 'What to include in a request', href: '#what-to-include' }],
  },
  {
    id: 'prospects',
    audience: 'Exploring a project',
    title: 'Start with a free consultation.',
    description:
      'Tell us about the workflow that costs your team the most time. We reply to new project inquiries within 2 business days.',
    actions: [{ type: 'consultation', label: 'Book a free consultation' }],
  },
  {
    id: 'security',
    audience: 'Security and privacy',
    title: 'Report a vulnerability or make a data request.',
    description:
      'Email us with a clear subject line, such as “Security” or “Privacy request”, so we can route and prioritize it.',
    actions: [
      { type: 'email', label: 'Email a security report', subject: 'Security' },
      { type: 'email', label: 'Email a privacy request', subject: 'Privacy request' },
      { type: 'link', label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

/* ─── Response-time targets ───────────────────────────────── */

export type ResponseTarget = {
  id: 'production' | 'standard' | 'new-project';
  request: string;
  detail: string;
  /** First-response target, split so the number can lead visually. */
  value: string;
  unit: string;
};

export const RESPONSE_TARGETS: ResponseTarget[] = [
  {
    id: 'production',
    request: 'Production issue',
    detail: 'A deployed agent is down, stuck, or producing wrong results in a live workflow.',
    value: '4',
    unit: 'business hours',
  },
  {
    id: 'standard',
    request: 'Standard requests and questions',
    detail: 'Changes, new workflows, access, billing, and how-to questions.',
    value: '1',
    unit: 'business day',
  },
  {
    id: 'new-project',
    request: 'New project inquiries',
    detail: 'Prospective clients scoping a first agent system.',
    value: '2',
    unit: 'business days',
  },
];

export const BUSINESS_HOURS = {
  days: 'Monday to Friday',
  hours: '9 a.m. to 6 p.m. Pacific Time',
  exceptions: 'excluding US holidays',
};

/* ─── What to include in a request ────────────────────────── */

export type RequestChecklistItem = {
  title: string;
  detail: string;
  /** Prompt lines for the prefilled email template. */
  prompts: string[];
};

export const REQUEST_CHECKLIST: RequestChecklistItem[] = [
  {
    title: 'Which agent or workflow',
    detail: 'Name the agent, or the process it runs, such as invoice intake or email triage.',
    prompts: ['Agent or workflow:'],
  },
  {
    title: 'What happened, and what you expected',
    detail: 'Put the actual result next to the one you expected. The gap is usually the diagnosis.',
    prompts: ['What happened:', 'What you expected:'],
  },
  {
    title: 'When it happened',
    detail: "Date and time, with your time zone. A rough window works if you don't have the exact minute.",
    prompts: ['When (date, time, time zone):'],
  },
  {
    title: 'Examples',
    detail: 'Record IDs, documents, or screenshots that show the problem. Redact sensitive data before you send them.',
    prompts: ['Examples (sensitive data redacted):'],
  },
  {
    title: 'Business impact and urgency',
    detail: 'Who is blocked, what it is costing, and how soon it needs a fix. This is how we set priority.',
    prompts: ['Business impact and urgency:'],
  },
];

/** `mailto:` link that opens a new support email with the checklist as prompts. */
export const SUPPORT_REQUEST_MAILTO = supportMailto({
  subject: 'Support request',
  body: `${REQUEST_CHECKLIST.flatMap((item) => item.prompts).join('\r\n\r\n')}\r\n`,
});

/* ─── Help FAQ (distinct from the sales FAQ on the home page) ─ */

export const SUPPORT_FAQS: FAQItem[] = [
  {
    question: 'How do I report an issue with a deployed agent?',
    answer:
      "Email team@cartra.ai or post in your engagement's shared channel, if you have one. Name the agent or workflow, describe what happened and what you expected, and say when it happened, with your time zone. If it is blocking a live process, say so in the first line so we can prioritize it.",
  },
  {
    question: 'How do I request a change or a new workflow?',
    answer:
      'Send it to your point of contact, your shared channel, or team@cartra.ai. Describe the outcome you want and the systems involved. We confirm whether it fits your current scope or needs a separate estimate before any work starts.',
  },
  {
    question: "How do we add or remove someone's access to an agent?",
    answer:
      'Agents work within the permissions of the tools they are built into, so most access changes happen in those systems and the agent follows. If an agent also has its own allowlist or service account, email us the person’s name, their role, and the change you need, and we will confirm when it is done. When someone leaves your company, tell us the same day.',
  },
  {
    question: 'What happens if an agent is unsure or makes a mistake?',
    answer:
      'Agents are designed with human review points for the decisions that matter. When an agent is not confident, it escalates the item to a person on your team instead of guessing. Agent actions are logged, so we can trace what happened, correct it, and adjust the logic so the same error does not repeat. If you spot a mistake, report it like any other issue.',
  },
  {
    question: 'Where is our data processed, and can we request an export or deletion?',
    answer:
      'It depends on your deployment. Agents work inside the systems you already run, and your point of contact can walk you through exactly where data is processed for yours. To request an export or deletion of data we hold, email team@cartra.ai with the subject line “Privacy request”. Our Privacy Policy explains how we handle personal data.',
  },
  {
    question: 'What if something urgent happens outside business hours?',
    answer:
      'Email team@cartra.ai with “Urgent” at the start of the subject line, and post in your shared channel if you have one. Response targets are measured in business hours unless your client agreement includes extended coverage, in which case the agreement applies.',
  },
  {
    question: 'How do I report a security vulnerability?',
    answer:
      'Email team@cartra.ai with “Security” in the subject line. Include what you found, the steps to reproduce it, and the potential impact. Please give us reasonable time to investigate and fix it before you disclose it publicly. Do not access, change, or keep data that is not yours, and do not disrupt service for others while testing. We will confirm we received your report.',
  },
  {
    question: 'Who do I contact about billing or an invoice?',
    answer:
      'Email team@cartra.ai with the invoice number in the subject line, and we will route it to the person who manages your account. Changes to billing contacts or payment details should come from an authorized contact at your company.',
  },
  {
    question: 'Is there a login for this website?',
    answer:
      'No. This site has no accounts, logins, or passwords to reset. Cartra agents run inside the tools your team already uses, such as your ERP, CRM, email, and document systems, so you sign in to those as usual. If a message asks you to sign in to a Cartra account, do not enter your credentials. Forward it to team@cartra.ai.',
  },
];
