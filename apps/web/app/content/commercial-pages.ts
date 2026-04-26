import type { FAQItem } from './faqs';

export type CommercialPage = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  primaryKeyword: string;
  ahrefs: {
    volume: string;
    difficulty: string;
    cpc: string;
  };
  fit: string[];
  workflows: string[];
  proof: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  integrations: string[];
  relatedAgentSlugs: string[];
  faqs: FAQItem[];
};

export const COMMERCIAL_PAGES: CommercialPage[] = [
  {
    slug: 'ai-agent-development-company',
    seoTitle: 'AI Agent Development Company for Operations | Cartra',
    seoDescription:
      'Cartra is an AI agent development company building custom workflow automation systems for document ops, finance, procurement, and revenue teams.',
    eyebrow: 'AI Agent Development Company',
    h1: 'Custom AI agent development for operational workflows.',
    intro:
      'Cartra designs, builds, deploys, and maintains custom AI agents for mid-market companies that need production workflow automation inside the tools they already use.',
    primaryKeyword: 'ai agent development company',
    ahrefs: {
      volume: '1,100 US searches/mo',
      difficulty: 'KD 7',
      cpc: '$9 CPC',
    },
    fit: [
      'You have repetitive operational work with clear volume and clear rules.',
      'Your team lives across ERPs, CRMs, inboxes, spreadsheets, and portals.',
      'You need a production system, not another AI demo or prompt library.',
    ],
    workflows: [
      'Document intake, extraction, classification, and ERP posting',
      'Accounts payable and accounts receivable reconciliation',
      'Procurement, vendor operations, and approval routing',
      'Company knowledge bases and customer-service answer automation',
      'CRM hygiene, pipeline quality checks, and sales ops maintenance',
    ],
    proof:
      'Recent deployments cut manual-entry errors by 30%, moved document handling 50% faster, and collapsed multi-day procurement coordination into a single agent-driven workflow.',
    sections: [
      {
        title: 'Built around your operating model',
        body:
          'We map the workflow, identify the decision logic, connect to your systems, and build the agent around the constraints your team actually works inside.',
      },
      {
        title: 'Production deployment, not prototype handoff',
        body:
          'Each engagement includes monitoring, exception queues, KPI visibility, and ongoing optimization after launch so the system keeps improving against live data.',
      },
      {
        title: 'No platform migration required',
        body:
          'Agents operate inside Salesforce, NetSuite, SAP, HubSpot, QuickBooks, Microsoft 365, Google Workspace, Slack, Zendesk, and custom internal tools.',
      },
    ],
    integrations: ['Salesforce', 'NetSuite', 'SAP', 'HubSpot', 'QuickBooks', 'Slack', 'Zendesk', 'Microsoft 365'],
    relatedAgentSlugs: ['customs-document-ops', 'ap-intake-approval', 'sales-ops-hygiene'],
    faqs: [
      {
        question: 'What does an AI agent development company actually build?',
        answer:
          'For Cartra, it means building production agents that read inputs, apply business logic, take actions in your systems, route exceptions to humans, and report outcomes to leadership.',
      },
      {
        question: 'How long does a typical AI agent deployment take?',
        answer:
          'Most first agent systems launch in about six weeks, with discovery concentrated in the first two weeks and production tuning after launch.',
      },
      {
        question: 'Do we need our own AI team?',
        answer:
          'No. Cartra handles agent design, development, integrations, deployment, monitoring, and maintenance.',
      },
    ],
  },
  {
    slug: 'ai-automation-agency',
    seoTitle: 'AI Automation Agency for Mid-Market Operations | Cartra',
    seoDescription:
      'Cartra is an AI automation agency for mid-market operations teams, replacing manual document, finance, procurement, and CRM workflows.',
    eyebrow: 'AI Automation Agency',
    h1: 'An AI automation agency for the workflows slowing down your team.',
    intro:
      'Cartra helps mid-market operations teams replace repetitive manual work with custom AI automation that runs inside their existing systems.',
    primaryKeyword: 'ai automation agency',
    ahrefs: {
      volume: '1,900 US searches/mo',
      difficulty: 'KD 31',
      cpc: '$3 CPC',
    },
    fit: [
      'Your backlog comes from manual handoffs, not strategy gaps.',
      'You need automation across multiple tools, teams, and approval paths.',
      'You want an implementation partner that owns delivery and optimization.',
    ],
    workflows: [
      'Shared inbox triage and routing',
      'Invoice and customs document processing',
      'ERP, CRM, and help-desk updates',
      'Finance reconciliation and exception handling',
      'Approval workflows and policy enforcement',
    ],
    proof:
      'Cartra engagements focus on measurable operating leverage: lower error rates, faster processing, fewer manual touches, and dashboards that show time and cost recovered.',
    sections: [
      {
        title: 'Automation strategy tied to ROI',
        body:
          'We start by mapping your highest-cost workflows and estimating the operational return before building. The first deployment should have a clear business case.',
      },
      {
        title: 'Custom agents for messy business systems',
        body:
          'Most valuable workflows span inboxes, PDFs, ERPs, CRMs, spreadsheets, portals, and approvals. That is exactly where custom agent systems fit.',
      },
      {
        title: 'Launch with humans in the loop',
        body:
          'Agents automate confident work and route exceptions to reviewers, so your team gets leverage without losing control over edge cases.',
      },
    ],
    integrations: ['Outlook', 'Gmail', 'NetSuite', 'Salesforce', 'HubSpot', 'QuickBooks', 'Zendesk', 'Slack'],
    relatedAgentSlugs: ['procurement-vendor-ops', 'company-knowledge-base', 'ar-reconciliation'],
    faqs: [
      {
        question: 'How is Cartra different from a generic AI automation agency?',
        answer:
          'Cartra focuses on production agent systems for operational workflows, including integrations, exception handling, KPI dashboards, and ongoing optimization.',
      },
      {
        question: 'What should we automate first?',
        answer:
          'Start with high-volume, rule-heavy work that already has clear inputs and outputs: document processing, reconciliation, approvals, triage, or CRM hygiene.',
      },
      {
        question: 'Can you work with our existing tools?',
        answer:
          'Yes. The default approach is to deploy into your current stack rather than replacing it.',
      },
    ],
  },
  {
    slug: 'ai-workflow-automation',
    seoTitle: 'AI Workflow Automation for Operations Teams | Cartra',
    seoDescription:
      'Deploy AI workflow automation for document processing, finance ops, procurement, customer support, and CRM workflows without replacing your stack.',
    eyebrow: 'AI Workflow Automation',
    h1: 'AI workflow automation built into the systems you already run.',
    intro:
      'Cartra builds agent systems that take repetitive workflows from intake to decision to output, with human review only where judgment is actually needed.',
    primaryKeyword: 'ai workflow automation',
    ahrefs: {
      volume: '2,800 US searches/mo',
      difficulty: 'KD 49',
      cpc: '$0.70 CPC',
    },
    fit: [
      'Your workflow has repeated inputs, clear decision rules, and measurable outputs.',
      'The process touches several tools and creates manual re-entry.',
      'Leaders need visibility into throughput, exceptions, and cost recovered.',
    ],
    workflows: [
      'Classify and extract data from documents',
      'Check policy, PO, payment, or customer records',
      'Post approved updates into ERPs, CRMs, and ticketing systems',
      'Route exceptions to the right owner',
      'Produce dashboards, audit logs, and weekly operating reports',
    ],
    proof:
      'In production, the best first workflows often reduce manual handling time by 30-50% while giving operators cleaner queues and leadership better visibility.',
    sections: [
      {
        title: 'From intake to action',
        body:
          'The agent does not stop at extraction. It classifies the input, checks context, applies your rules, updates systems, and routes exceptions.',
      },
      {
        title: 'Works across operational departments',
        body:
          'The same pattern applies across logistics, finance, procurement, customer support, revenue operations, and internal knowledge workflows.',
      },
      {
        title: 'Measured from day one',
        body:
          'Every deployment includes performance monitoring so you can see cost savings, time recovered, accuracy, and exception trends live.',
      },
    ],
    integrations: ['SAP', 'NetSuite', 'Salesforce', 'HubSpot', 'Zendesk', 'Microsoft Teams', 'Slack', 'Google Workspace'],
    relatedAgentSlugs: ['customs-document-ops', 'ar-reconciliation', 'company-knowledge-base'],
    faqs: [
      {
        question: 'What is AI workflow automation?',
        answer:
          'AI workflow automation uses agents to read workflow inputs, apply decision logic, take action in business systems, and escalate exceptions to people.',
      },
      {
        question: 'Which workflows are best for AI automation?',
        answer:
          'The best first candidates have repeated volume, clear rules, expensive manual handling, and measurable outcomes such as time saved or errors reduced.',
      },
      {
        question: 'Can AI workflow automation stay within our approvals?',
        answer:
          'Yes. Cartra designs agents around your permissions, approval paths, exception queues, and audit requirements.',
      },
    ],
  },
];

export function getCommercialPage(slug: string) {
  return COMMERCIAL_PAGES.find((page) => page.slug === slug);
}
