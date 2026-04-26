export type AgentSystem = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  problem: string;
  howItWorks: {
    inputs: string[];
    decisions: string[];
    outputs: string[];
  };
  integrations: string[];
  outcome: string;
  caseStudy?: {
    label: string;
    result: string;
  };
};

export const AGENT_SYSTEMS: AgentSystem[] = [
  {
    slug: 'customs-document-ops',
    name: 'Customs & Document Ops',
    category: 'Logistics',
    tagline:
      'Intake, extraction, classification, and ERP posting for freight and manufacturing documents.',
    seoTitle: 'AI Document Processing for Logistics | Cartra',
    seoDescription:
      'Automate customs documents, freight invoices, ERP posting, and exception queues with a custom AI agent system for logistics teams.',
    primaryKeyword: 'AI document processing for logistics',
    relatedKeywords: [
      'customs document automation',
      'freight document processing',
      'logistics AI agent',
    ],
    problem:
      "Freight forwarders, 3PLs, and manufacturers spend tens of thousands of analyst hours a year keying customs forms, bills of lading, commercial invoices, and packing lists into ERPs that weren't designed to accept them. Error rates are predictable, backlogs throttle throughput, and every growth phase pulls in another round of document hires.",
    howItWorks: {
      inputs: [
        'Emailed documents (PDFs, scans, HTML receipts)',
        'EDI feeds and partner file drops',
        'Shared inboxes and ticketing queues',
      ],
      decisions: [
        'Classify document type and route accordingly',
        'Extract line items with confidence scoring',
        'Reconcile against PO, shipment, and vendor records',
        'Route low-confidence items to a human reviewer',
      ],
      outputs: [
        'Normalized records posted to the ERP',
        'Customs filings generated and submitted',
        'Acknowledgment emails sent to partners',
        'Exception queues maintained in your ticketing system',
      ],
    },
    integrations: [
      'SAP',
      'Oracle NetSuite',
      'Microsoft Dynamics',
      'CargoWise',
      'Descartes',
      'Outlook',
      'Gmail',
      'Zendesk',
    ],
    outcome:
      'Document teams move from keying to exception handling. Throughput rises without new headcount, error rates drop immediately, and the agent keeps improving as its decision logic is tuned against live data.',
    caseStudy: {
      label: '8-figure U.S. freight forwarder',
      result:
        '30% fewer manual-entry errors, 50% faster document handling, and higher shipment volume absorbed with the same operations team.',
    },
  },
  {
    slug: 'procurement-vendor-ops',
    name: 'Procurement & Vendor Ops',
    category: 'Supply Chain',
    tagline:
      'Run the full PO pipeline end-to-end: requisition intake, vendor matching, approval routing, and ERP posting.',
    seoTitle: 'Procurement Workflow Automation AI Agent | Cartra',
    seoDescription:
      'Automate requisition intake, vendor matching, approval routing, and ERP posting with a custom procurement workflow AI agent.',
    primaryKeyword: 'procurement workflow automation',
    relatedKeywords: [
      'vendor ops automation',
      'purchase order automation',
      'procurement AI agent',
    ],
    problem:
      'Procurement teams live across a patchwork of requisition forms, vendor portals, spreadsheets, and inboxes. Approvals stall, duplicate POs get cut, and ops leaders lose days reconstructing where a given purchase actually stands, let alone forecasting spend with confidence.',
    howItWorks: {
      inputs: [
        'Requisition forms and intake tickets',
        'Vendor emails, quotes, and contracts',
        'Existing vendor master and approval policy',
        'Budget and category rules',
      ],
      decisions: [
        'Match requisitions to preferred vendors',
        'Enforce policy thresholds and spend limits',
        'Route approvals based on amount, category, and owner',
        'Flag duplicates and reconcile against received goods',
      ],
      outputs: [
        'Purchase orders created in the ERP',
        'Approval requests routed to the right owners',
        'Vendor confirmations sent automatically',
        'Live spend dashboards for ops and finance leadership',
      ],
    },
    integrations: [
      'SAP',
      'Oracle NetSuite',
      'Coupa',
      'Ariba',
      'QuickBooks',
      'DocuSign',
      'Slack',
      'Microsoft Teams',
    ],
    outcome:
      'Procurement stops spending its week reconstructing where a purchase stands. Requisitions move through approval in hours rather than days, duplicate POs disappear, and leadership gets a live view of spend it can actually trust.',
    caseStudy: {
      label: '$150M+ industrial manufacturer',
      result:
        'End-to-end PO pipeline collapsed into a single agent-driven workflow. Cross-department coordination that previously took days now resolves inside one coordinated flow.',
    },
  },
  {
    slug: 'company-knowledge-base',
    name: 'Company Knowledge Base',
    category: 'Cross-functional',
    tagline:
      'Unify product, ops, and policy documentation into a single agent-queried source of truth.',
    seoTitle: 'AI Company Knowledge Base Agent | Cartra',
    seoDescription:
      'Unify wikis, drives, tickets, and Slack threads into an AI company knowledge base that gives every team consistent answers.',
    primaryKeyword: 'AI company knowledge base',
    relatedKeywords: [
      'internal knowledge automation',
      'enterprise knowledge base AI',
      'company knowledge agent',
    ],
    problem:
      "Mid-market companies accumulate institutional knowledge in shared drives, wikis, PDFs, Slack threads, and the heads of senior employees. Onboarding is slow, customer-service answers drift out of sync, and ops and marketing teams repeat work that's already been done somewhere else in the company.",
    howItWorks: {
      inputs: [
        'Documents across Google Drive, SharePoint, Notion, and Confluence',
        'Help-desk history and resolved tickets',
        'Product spec files and internal wikis',
        'Slack and Teams channels (permissions respected end-to-end)',
      ],
      decisions: [
        'Classify and cluster content by topic and ownership',
        'Maintain a canonical answer map across sources',
        'Reconcile conflicting or outdated material',
        'Flag stale or out-of-policy content for review',
      ],
      outputs: [
        'A single queryable knowledge surface for every team',
        'Drafted responses for customer-service tickets',
        'Generated SOPs and onboarding guides',
        'Freshness signals routed to doc owners',
      ],
    },
    integrations: [
      'Google Drive',
      'SharePoint',
      'Notion',
      'Confluence',
      'Zendesk',
      'Intercom',
      'Slack',
      'Microsoft Teams',
    ],
    outcome:
      'Customer service, operations, and marketing all answer from the same canon. Onboarding compresses, resolution gets faster and more consistent, and the tribal knowledge locked in senior heads becomes an operating asset the whole company can query.',
    caseStudy: {
      label: '$150M+ industrial manufacturer',
      result:
        'Customer service, operations, and marketing now work from a single source of truth, collapsing weeks of tribal-knowledge searching into consistent, instant answers.',
    },
  },
  {
    slug: 'ar-reconciliation',
    name: 'AR Reconciliation',
    category: 'Finance Ops',
    tagline:
      'Match invoices to deposits across bank, ERP, and CRM. Flag exceptions before they age.',
    seoTitle: 'AR Reconciliation Automation AI Agent | Cartra',
    seoDescription:
      'Automate AR reconciliation across bank feeds, ERPs, remittance emails, and CRMs so finance teams close faster with fewer exceptions.',
    primaryKeyword: 'AR reconciliation automation',
    relatedKeywords: [
      'AI finance operations',
      'cash application automation',
      'accounts receivable AI agent',
    ],
    problem:
      "AR teams spend days each month matching bank deposits, customer payments, and invoices across systems that weren't designed to talk to each other. Exceptions age, collection calls get awkward, and cash application slows the close cycle that leadership is already impatient with.",
    howItWorks: {
      inputs: [
        'Bank feeds, ACH, and wire records',
        'Customer remittance emails and portal advices',
        'ERP AR ledger and open-invoice register',
        'CRM account data for fuzzy matching',
      ],
      decisions: [
        'Match deposits to open invoices across fuzzy identifiers',
        'Apply short-pay, overpayment, and write-off rules',
        'Detect duplicate or cancelled invoices',
        'Flag unmatched items for human review',
      ],
      outputs: [
        'Cash applied in the ERP automatically',
        'Reconciliation reports for finance leadership',
        'Collection queues prioritized by age and amount',
        'CRM accounts updated with live payment status',
      ],
    },
    integrations: [
      'Oracle NetSuite',
      'QuickBooks',
      'SAP',
      'Sage Intacct',
      'Salesforce',
      'HubSpot',
      'Plaid',
      'Stripe',
    ],
    outcome:
      'AR closes the month in hours rather than days. Cash application keeps pace with deposit volume, exceptions surface before they age into collections problems, and finance stops spending Monday mornings reconciling what the bank and the ERP disagree about.',
  },
  {
    slug: 'ap-intake-approval',
    name: 'AP Intake & Approval',
    category: 'Finance Ops',
    tagline:
      'Parse vendor invoices, match to POs, route approvals against policy, and post to the GL.',
    seoTitle: 'AP Invoice Intake Automation AI Agent | Cartra',
    seoDescription:
      'Automate AP invoice intake, PO matching, approval routing, duplicate checks, and GL posting with a custom finance AI agent.',
    primaryKeyword: 'AP invoice intake automation',
    relatedKeywords: [
      'approval workflow automation',
      'accounts payable AI agent',
      'invoice processing automation',
    ],
    problem:
      'Accounts payable runs on a torrent of emailed invoices, PDF attachments, and portal exports. Extraction is manual, approval chains are ambiguous, and late payments chew up vendor relationships and prompt-pay discounts that controllers know are on the table.',
    howItWorks: {
      inputs: [
        'Emailed invoices and vendor portal exports',
        'PO records and goods-received confirmations',
        'Contract terms and payment policy',
        'Existing vendor master and approver map',
      ],
      decisions: [
        'Extract and normalize invoice line items',
        'Match invoices to POs and receipts',
        'Check against budget, category, and policy',
        'Flag duplicates, price variance, and unauthorized vendors',
      ],
      outputs: [
        'Invoices posted to the GL automatically',
        'Approval requests routed to the right owners',
        'Payment runs queued for controller review',
        'Dashboards updated for controllers and CFOs',
      ],
    },
    integrations: [
      'Oracle NetSuite',
      'QuickBooks',
      'SAP',
      'Sage Intacct',
      'Bill.com',
      'Ramp',
      'DocuSign',
      'Slack',
    ],
    outcome:
      'Invoices move from inbox to GL in a fraction of the time. Approvals route to the right owners automatically, anomalous invoices get caught before they pay, and prompt-pay discounts stop getting left on the table.',
  },
  {
    slug: 'sales-ops-hygiene',
    name: 'Sales Ops Hygiene',
    category: 'Revenue Ops',
    tagline:
      'Enforce CRM data quality, dedupe accounts, flag stale opportunities, and keep the pipeline honest.',
    seoTitle: 'Sales Ops Automation AI Agent | Cartra',
    seoDescription:
      'Automate CRM hygiene, account deduplication, opportunity health checks, and pipeline risk reports with a sales ops AI agent.',
    primaryKeyword: 'sales ops automation',
    relatedKeywords: [
      'CRM hygiene automation',
      'RevOps AI agent',
      'pipeline data quality automation',
    ],
    problem:
      "RevOps leaders know the pipeline their CRM shows and the pipeline that actually exists are different numbers. Duplicate accounts, stale opportunities, missing contact data, and inconsistent stage definitions make forecasts fiction and rep productivity a guessing game that doesn't hold up in a QBR.",
    howItWorks: {
      inputs: [
        'CRM accounts, contacts, and opportunities',
        'Email and calendar activity',
        'Call and meeting logs',
        'Enrichment and marketing-automation data',
      ],
      decisions: [
        'Detect duplicates across fuzzy identifiers',
        'Classify opportunity health and stage fit',
        'Enforce stage-entry and exit criteria',
        'Reconcile contact data against enrichment sources',
      ],
      outputs: [
        'Merged and cleaned account and contact records',
        'Pipeline risks surfaced to front-line managers',
        'Forecast-quality indicators on each deal',
        'Weekly hygiene reports for RevOps leadership',
      ],
    },
    integrations: [
      'Salesforce',
      'HubSpot',
      'Pipedrive',
      'Gong',
      'Outreach',
      'Salesloft',
      'Clearbit',
      'ZoomInfo',
    ],
    outcome:
      "Forecasts start tracking actuals because the data underneath them is clean. Reps get their hours back from manual CRM maintenance, managers get earlier signal on stalled deals, and finance gets a number it can actually plan against.",
  },
];

export function getAgentSystem(slug: string): AgentSystem | undefined {
  return AGENT_SYSTEMS.find((a) => a.slug === slug);
}
