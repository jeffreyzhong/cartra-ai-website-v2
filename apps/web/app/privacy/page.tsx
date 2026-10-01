import type { Metadata } from 'next';
import LegalDocument from '../components/LegalDocument';
import { PRIVACY_POLICY } from '../content/privacy-policy';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy Policy | Cartra',
  description:
    'How Cartra collects, uses, and protects personal information. We do not sell your data or use it to train general-purpose AI models.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return <LegalDocument title="Privacy Policy" path="/privacy" {...PRIVACY_POLICY} />;
}
