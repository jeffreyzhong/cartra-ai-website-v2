import type { Metadata } from 'next';
import LegalDocument from '../components/LegalDocument';
import { TERMS_OF_USE } from '../content/terms-of-use';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Terms of Use | Cartra',
  description:
    'The terms that govern your use of the Cartra website and consultation form. Client engagements are covered by a separate signed agreement.',
  path: '/terms',
});

export default function TermsPage() {
  return <LegalDocument title="Terms of Use" path="/terms" {...TERMS_OF_USE} />;
}
