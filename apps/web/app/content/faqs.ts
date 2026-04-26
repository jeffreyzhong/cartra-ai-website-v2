export type FAQItem = {
  question: string;
  answer: string;
};

export const FAQS: FAQItem[] = [
  {
    question: 'What do we need to get started?',
    answer:
      "Getting started is simple. We begin with a free consultation call where we discuss your current processes and identify opportunities. If there are opportunities and we have capacity, we'll provide a detailed ROI projection and implementation plan.",
  },
  {
    question: 'How customizable are your agent systems?',
    answer:
      'Every agent system is built to order, fitted to your workflows, data structures, and business requirements. We build from the ground up to integrate with the stack you already run, rather than making you adapt to ours.',
  },
  {
    question: 'What are typical use cases?',
    answer:
      'It varies by industry, but we usually start with the most repetitive and time-consuming work inside your operation: data entry, document processing, email triage, reconciliation, and customer support flows that already have clear rules and clear volume.',
  },
  {
    question: 'Do we need in-house AI talent?',
    answer:
      "No. Our team handles all AI development, deployment, and maintenance. You don't need any in-house AI expertise. We provide full support and training for your team to work with the agents.",
  },
  {
    question: "How much of our team's time will this take?",
    answer:
      'Roughly fifteen hours across a six-week engagement, concentrated in the first two weeks of discovery. After launch, ongoing involvement is limited to monthly reviews unless you choose to expand scope.',
  },
  {
    question: 'What systems do you integrate with?',
    answer:
      'Salesforce, NetSuite, HubSpot, QuickBooks, SAP, Zendesk, Slack, Google Workspace, Microsoft 365, and most modern ERPs, CRMs, and helpdesks, plus any internal API or database your team can expose. If your stack has an integration surface, we can build against it.',
  },
  {
    question: 'How do you price engagements?',
    answer:
      'Engagements are scoped per agent system based on workflow complexity and integration depth. Most clients recover cost within the first ninety days of production. We share full pricing on the discovery call once we understand the scope.',
  },
  {
    question: 'What happens after launch?',
    answer:
      "You get a dedicated success manager, a live KPI dashboard tracking cost savings and time recovered, and ongoing optimization as your workflows evolve. We don't hand you an agent and walk away.",
  },
];
