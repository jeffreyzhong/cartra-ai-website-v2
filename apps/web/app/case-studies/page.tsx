import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Surface,
  Mesh,
  Section,
  Container,
  Display,
  Body,
  Eyebrow,
  Card,
} from '@repo/ui';
import Navigation from '../components/Navigation';
import CalendlyButton from '../components/CalendlyButton';
import SeoInternalLinks from '../components/SeoInternalLinks';
import JsonLd from '../components/JsonLd';
import { CASE_STUDIES } from '../content/case-studies';
import { getAgentSystem } from '../content/agent-systems';
import { absoluteUrl, createBreadcrumbJsonLd, createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'AI Agent Case Studies for Operations Teams | Cartra',
  description:
    'See how Cartra custom AI agent systems reduce manual errors, speed up document handling, and automate operational workflows.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/case-studies' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Cartra AI agent case studies',
          url: absoluteUrl('/case-studies'),
          mainEntity: CASE_STUDIES.map((study) => ({
            '@type': 'CreativeWork',
            name: study.headline,
            description: study.summary,
            industry: study.industry,
          })),
        }}
      />
      <Surface className="text-gray-900">
        <Mesh />
        <Navigation />
        <main>

        <Section padding="hero">
          <Container size="lg" className="text-center">
            <Eyebrow tone="accent" className="justify-center inline-flex">Case Studies</Eyebrow>
            <Display as="h1" size="xl" align="center" maxWidth="22ch" className="mt-5 mx-auto">
              Proof from operational AI agents in production.
            </Display>
            <Body size="lg" align="center" className="mt-8 mx-auto" maxWidth="60ch">
              See how Cartra agent systems reduce manual work, improve throughput, and give operations teams cleaner handoffs inside the tools they already use.
            </Body>
          </Container>
        </Section>

        <Section padding="tight">
          <Container size="xl">
            <div className="grid md:grid-cols-2 gap-6">
              {CASE_STUDIES.map((study) => {
                const agent = getAgentSystem(study.relatedAgentSlug);
                return (
                  <Card key={study.slug} surface="frosted" className="h-full">
                    <Eyebrow tone="accent">{study.industry}</Eyebrow>
                    <h2 className="font-display mt-3 text-c-text" style={{ fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                      {study.headline}
                    </h2>
                    <Body size="md" className="mt-4">{study.summary}</Body>
                    <div className="mt-6 space-y-2.5">
                      {study.results.map((result) => (
                        <p key={result} className="font-display text-c-text-muted flex gap-2.5" style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}>
                          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-c-accent" />
                          <span>{result}</span>
                        </p>
                      ))}
                    </div>
                    {agent && (
                      <Link
                        href={`/agent-systems/${agent.slug}`}
                        className="mt-6 inline-flex font-display text-c-accent"
                        style={{ fontSize: '0.8125rem', fontWeight: 600 }}
                      >
                        See related agent system →
                      </Link>
                    )}
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>

        <Section>
          <Container size="md" className="text-center">
            <Card surface="frosted" className="text-left md:text-center">
              <Eyebrow tone="muted" className="md:justify-center md:inline-flex">Build your own result</Eyebrow>
              <Display as="h2" size="md" align="center" className="mt-4 mx-auto" maxWidth="22ch">
                Start with the workflow costing you the most time.
              </Display>
              <Body size="md" align="center" className="mt-5 mx-auto" maxWidth="58ch">
                Book a 30-minute call and we will map the highest-leverage agent system for your operation.
              </Body>
              <div className="mt-8 flex justify-center">
                <CalendlyButton trailingIcon="→">Book a free consultation</CalendlyButton>
              </div>
            </Card>
          </Container>
        </Section>
        <SeoInternalLinks />
        </main>
      </Surface>
    </>
  );
}
