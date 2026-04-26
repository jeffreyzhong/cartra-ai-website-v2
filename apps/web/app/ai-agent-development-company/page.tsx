import type { Metadata } from 'next';
import CommercialLandingPage from '../components/CommercialLandingPage';
import { getCommercialPage } from '../content/commercial-pages';
import { createPageMetadata } from '../lib/seo';

const page = getCommercialPage('ai-agent-development-company');

export const metadata: Metadata = createPageMetadata({
  title: page!.seoTitle,
  description: page!.seoDescription,
  path: `/${page!.slug}`,
});

export default function AiAgentDevelopmentCompanyPage() {
  return <CommercialLandingPage page={page!} />;
}
