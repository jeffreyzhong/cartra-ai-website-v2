import type { Metadata } from 'next';
import { AGENT_SYSTEMS, type AgentSystem } from '../content/agent-systems';
import { FAQS, type FAQItem } from '../content/faqs';

export const SITE_URL = 'https://www.cartra.ai';
export const SITE_NAME = 'Cartra';
export const SITE_EMAIL = 'team@cartra.ai';
export const LOGO_PATH = '/cartra_geometric_logo_round.png';
export const OG_IMAGE_PATH = '/opengraph-image';

export const DEFAULT_DESCRIPTION =
  'Cartra designs custom AI agents for workflow automation, document processing, finance operations, and the operational systems your team already runs.';

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function pageTitle(title: string) {
  return title.includes('Cartra') ? title : `${title} | Cartra`;
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = path.startsWith('/') ? path : `/${path}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: 'Cartra custom AI agents for workflow automation',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}

export function createOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl(LOGO_PATH),
    email: SITE_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2261 Market Street STE 85777',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94114',
      addressCountry: 'US',
    },
  };
}

export function createWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: SITE_NAME,
    url: absoluteUrl('/'),
    publisher: {
      '@id': absoluteUrl('/#organization'),
    },
  };
}

export function createFaqPageJsonLd(faqs: FAQItem[] = FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createAgentServiceJsonLd(agent: AgentSystem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absoluteUrl(`/agent-systems/${agent.slug}#service`),
    name: agent.seoTitle,
    serviceType: agent.name,
    category: agent.category,
    description: agent.seoDescription,
    url: absoluteUrl(`/agent-systems/${agent.slug}`),
    provider: {
      '@id': absoluteUrl('/#organization'),
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Mid-market operations teams',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${agent.name} integrations`,
      itemListElement: agent.integrations.slice(0, 6).map((integration) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${agent.name} for ${integration}`,
        },
      })),
    },
  };
}

export function createServiceJsonLd({
  name,
  description,
  serviceType,
  path,
  category,
}: {
  name: string;
  description: string;
  serviceType: string;
  path: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absoluteUrl(`${path}#service`),
    name,
    serviceType,
    category,
    description,
    url: absoluteUrl(path),
    provider: {
      '@id': absoluteUrl('/#organization'),
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Mid-market operations teams',
    },
  };
}

export const SITEMAP_ROUTES = [
  '/',
  '/agent-systems',
  ...AGENT_SYSTEMS.map((agent) => `/agent-systems/${agent.slug}`),
  '/ai-agent-development-company',
  '/ai-automation-agency',
  '/ai-workflow-automation',
  '/case-studies',
];
