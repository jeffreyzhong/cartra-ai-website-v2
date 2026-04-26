import Link from 'next/link';
import { notFound } from 'next/navigation';
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
import Navigation from '../../components/Navigation';
import CalendlyButton from '../../components/CalendlyButton';
import SeoInternalLinks from '../../components/SeoInternalLinks';
import JsonLd from '../../components/JsonLd';
import { AGENT_SYSTEMS, getAgentSystem } from '../../content/agent-systems';
import {
  createAgentServiceJsonLd,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from '../../lib/seo';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return AGENT_SYSTEMS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentSystem(slug);
  if (!agent) return {};
  return createPageMetadata({
    title: agent.seoTitle,
    description: agent.seoDescription,
    path: `/agent-systems/${agent.slug}`,
  });
}

export default async function AgentSystemDetail(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const agent = getAgentSystem(slug);
  if (!agent) notFound();

  return (
    <>
    <JsonLd
      data={createBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Agent Systems', path: '/agent-systems' },
        { name: agent.name, path: `/agent-systems/${agent.slug}` },
      ])}
    />
    <JsonLd data={createAgentServiceJsonLd(agent)} />
    <Surface className="text-gray-900">
      <Mesh />
      <Navigation />
      <main>

      <Section padding="hero">
        <Container size="lg" className="text-center">
          <Link
            href="/agent-systems"
            className="inline-flex items-center gap-1.5 font-display text-c-text-muted hover:text-c-text transition-colors"
            style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.005em' }}
          >
            <span aria-hidden>←</span> All agent systems
          </Link>
          <div className="mt-6">
            <Eyebrow tone="accent">{agent.category}</Eyebrow>
          </div>
          <Display as="h1" size="xl" align="center" maxWidth="22ch" className="mt-5 mx-auto">
            {agent.name}
          </Display>
          <Body size="lg" align="center" className="mt-8 mx-auto" maxWidth="58ch">
            {agent.tagline}
          </Body>
          <div className="mt-10 flex justify-center">
            <CalendlyButton trailingIcon="→">Book a free consultation</CalendlyButton>
          </div>
        </Container>
      </Section>

      {/* Problem */}
      <Section padding="tight">
        <Container size="md">
          <Eyebrow tone="muted">The problem</Eyebrow>
          <Display as="h2" size="md" className="mt-4" maxWidth="22ch">
            What this replaces.
          </Display>
          <Body size="lg" className="mt-6" maxWidth="60ch">
            {agent.problem}
          </Body>
        </Container>
      </Section>

      {/* How it works */}
      <Section>
        <Container size="xl">
          <div className="mb-12">
            <Eyebrow tone="muted">How it works</Eyebrow>
            <Display as="h2" size="md" className="mt-4" maxWidth="22ch">
              Inputs, decisions, outputs.
            </Display>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {(
              [
                { n: '01', label: 'Inputs', items: agent.howItWorks.inputs },
                { n: '02', label: 'Decisions', items: agent.howItWorks.decisions },
                { n: '03', label: 'Outputs', items: agent.howItWorks.outputs },
              ] as const
            ).map((col) => (
              <Card key={col.n} surface="frosted" className="h-full">
                <span
                  className="font-display text-c-orange tabular-nums"
                  style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em' }}
                >
                  {col.n}
                </span>
                <h3
                  className="font-display mt-3 text-c-text"
                  style={{ fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2 }}
                >
                  {col.label}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item, i) => (
                    <li
                      key={i}
                      className="font-display text-c-text-muted flex gap-2.5"
                      style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}
                    >
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-c-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Integrations */}
      <Section padding="tight">
        <Container size="md">
          <Eyebrow tone="muted">Integrations</Eyebrow>
          <Display as="h2" size="md" className="mt-4" maxWidth="24ch">
            Deploys into the stack you already run.
          </Display>
          <Body size="md" className="mt-5" maxWidth="60ch">
            No rip-and-replace. The agent operates inside your existing
            permissions and authentication, reading from and writing to the
            systems your team works in today.
          </Body>
          <div className="mt-8 flex flex-wrap gap-2">
            {agent.integrations.map((label) => (
              <span
                key={label}
                className="font-display text-c-text px-3 py-1.5 rounded-full"
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '-0.005em',
                  border: '1px solid var(--c-border)',
                  background: 'var(--c-surface)',
                }}
              >
                {label}
              </span>
            ))}
            <span
              className="font-display text-c-text-muted px-3 py-1.5 rounded-full"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '-0.005em',
                border: '1px dashed var(--c-border)',
              }}
            >
              …and your custom internal tools
            </span>
          </div>
        </Container>
      </Section>

      {/* Outcome */}
      <Section>
        <Container size="md">
          <Eyebrow tone="muted">What production looks like</Eyebrow>
          <Display as="h2" size="md" className="mt-4" maxWidth="22ch">
            The operating shift.
          </Display>
          <Body size="lg" className="mt-6" maxWidth="60ch">
            {agent.outcome}
          </Body>

          {agent.caseStudy && (
            <Card surface="navy" className="mt-10">
              <span
                className="font-display uppercase tracking-widest text-c-on-dark-muted"
                style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em' }}
              >
                Case study
              </span>
              <h3
                className="font-display mt-3"
                style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--c-on-dark)' }}
              >
                {agent.caseStudy.label}
              </h3>
              <Body size="md" tone="on-dark-muted" className="mt-3" maxWidth="60ch">
                {agent.caseStudy.result}
              </Body>
            </Card>
          )}
        </Container>
      </Section>

      {/* Final CTA */}
      <Section>
        <Container size="md" className="text-center">
          <Card surface="frosted" className="text-left md:text-center">
            <div className="md:px-4">
              <Eyebrow tone="muted" className="md:justify-center md:inline-flex">Get started</Eyebrow>
              <Display as="h2" size="md" align="center" className="mt-4 mx-auto" maxWidth="24ch">
                Let&apos;s see if this fits your operation.
              </Display>
              <Body size="md" align="center" className="mt-5 mx-auto" maxWidth="58ch">
                Book a 30-minute call. We&apos;ll walk through your current
                workflow, identify the highest-leverage starting point, and
                share a realistic ROI projection. No pitch, no pressure.
              </Body>
              <div className="mt-8 flex justify-center">
                <CalendlyButton trailingIcon="→">Book a free consultation</CalendlyButton>
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
