export type CaseStudy = {
  slug: string;
  label: string;
  industry: string;
  headline: string;
  summary: string;
  results: string[];
  relatedAgentSlug: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'freight-forwarder-document-ops',
    label: '8-figure U.S. freight forwarder',
    industry: 'Logistics',
    headline: 'Customs document processing moved 50% faster without adding headcount.',
    summary:
      'Cartra automated customs filings, multi-ERP document workflows, and email triage for a freight operations team handling high document volume across customers and partners.',
    results: [
      '30% fewer manual-entry errors',
      '50% faster document handling',
      'Higher shipment volume absorbed by the same operations team',
    ],
    relatedAgentSlug: 'customs-document-ops',
  },
  {
    slug: 'industrial-manufacturer-procurement-knowledge',
    label: '$150M+ industrial manufacturer',
    industry: 'Manufacturing',
    headline: 'Procurement coordination collapsed from days into one agent-driven workflow.',
    summary:
      'Cartra automated the purchase-order pipeline and built a company knowledge base for customer service, operations, and marketing teams.',
    results: [
      'End-to-end PO workflow coordinated across departments',
      'Company knowledge unified into one source of truth',
      'Customer service and operations answers made faster and more consistent',
    ],
    relatedAgentSlug: 'procurement-vendor-ops',
  },
];
