import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Surface,
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
import { AGENT_SYSTEMS } from '../content/agent-systems';
import { createBreadcrumbJsonLd, createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'AI Agent Systems for Business Operations | Cartra',
  description:
    'Explore custom AI agent systems Cartra deploys for document ops, procurement, finance operations, company knowledge bases, and sales ops.',
  path: '/agent-systems',
});

export default function AgentSystemsIndex() {
  return (
    <>
    <JsonLd
      data={createBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Agent Systems', path: '/agent-systems' },
      ])}
    />
    <Surface className="text-gray-900">
      <Navigation />
      <main>

      <Section padding="hero">
        <Container size="lg" className="text-center">
          <Eyebrow tone="muted" className="justify-center inline-flex">Agent Systems</Eyebrow>
          <Display as="h1" size="xl" align="center" maxWidth="22ch" className="mt-5 mx-auto">
            Productized agents, built to order for your stack.
          </Display>
          <Body size="lg" align="center" className="mt-8 mx-auto" maxWidth="60ch">
            These are the patterns we deploy most often. Each one replaces a
            specific workflow end-to-end, inside the tools your team already
            runs. Pick the closest fit as a starting point; we tune the
            decision logic, integrations, and outputs to match how your
            operation actually works.
          </Body>
        </Container>
      </Section>

      <Section padding="tight">
        <Container size="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AGENT_SYSTEMS.map((agent) => (
              <Link
                key={agent.slug}
                href={`/agent-systems/${agent.slug}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-c-accent rounded-2xl"
              >
                <Card className="h-full transition-colors group-hover:border-c-border-strong">
                  <Eyebrow tone="accent">{agent.category}</Eyebrow>
                  <h2
                    className="font-display mt-3 text-c-text"
                    style={{ fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2 }}
                  >
                    {agent.name}
                  </h2>
                  <Body size="sm" className="mt-3">{agent.tagline}</Body>
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 font-display text-c-accent"
                    style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.005em' }}
                  >
                    See how it works
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md" className="text-center">
          <Card className="text-left md:text-center">
            <div className="md:px-4">
              <Eyebrow tone="muted" className="md:justify-center md:inline-flex">Don&apos;t see yours?</Eyebrow>
              <Display as="h2" size="md" align="center" className="mt-4 mx-auto" maxWidth="22ch">
                Every engagement is custom. These are just starting points.
              </Display>
              <Body size="md" align="center" className="mt-5 mx-auto" maxWidth="58ch">
                If the workflow you have in mind isn&apos;t on this list, it
                probably still looks like one of these underneath. Book a
                30-minute call and we&apos;ll tell you.
              </Body>
              <div className="mt-8 flex justify-center">
                <CalendlyButton>Book a free consultation</CalendlyButton>
              </div>
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
