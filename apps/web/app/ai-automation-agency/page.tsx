import type { Metadata } from 'next';
import CommercialLandingPage from '../components/CommercialLandingPage';
import { getCommercialPage } from '../content/commercial-pages';
import { createPageMetadata } from '../lib/seo';

const page = getCommercialPage('ai-automation-agency');

export const metadata: Metadata = createPageMetadata({
  title: page!.seoTitle,
  description: page!.seoDescription,
  path: `/${page!.slug}`,
});

export default function AiAutomationAgencyPage() {
  return <CommercialLandingPage page={page!} />;
}
