import Link from 'next/link';
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
import Navigation from './Navigation';
import CalendlyButton from './CalendlyButton';
import SeoInternalLinks from './SeoInternalLinks';
import type { CommercialPage } from '../content/commercial-pages';
import { getAgentSystem } from '../content/agent-systems';
import JsonLd from './JsonLd';
import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createServiceJsonLd,
} from '../lib/seo';

export default function CommercialLandingPage({ page }: { page: CommercialPage }) {
  const relatedAgents = page.relatedAgentSlugs
    .map((slug) => getAgentSystem(slug))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: page.eyebrow, path: `/${page.slug}` },
        ])}
      />
      <JsonLd data={createFaqPageJsonLd(page.faqs)} />
      <JsonLd data={createServiceJsonLd({
        name: page.h1,
        description: page.seoDescription,
        serviceType: page.primaryKeyword,
        path: `/${page.slug}`,
        category: page.eyebrow,
      })} />
      <Surface className="text-gray-900">
        <Mesh />
        <Navigation />
        <main>

        <Section padding="hero">
          <Container size="lg" className="text-center">
            <Eyebrow tone="accent" className="justify-center inline-flex">{page.eyebrow}</Eyebrow>
            <Display as="h1" size="xl" align="center" maxWidth="22ch" className="mt-5 mx-auto">
              {page.h1}
            </Display>
            <Body size="lg" align="center" className="mt-8 mx-auto" maxWidth="60ch">
              {page.intro}
            </Body>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <CalendlyButton trailingIcon="→">Book a free consultation</CalendlyButton>
              <Link
                href="/agent-systems"
                className="inline-flex items-center h-11 px-4 font-display text-sm font-semibold text-c-text-muted hover:text-c-text transition-colors"
              >
                Browse agent systems
              </Link>
            </div>
          </Container>
        </Section>

        <Section padding="tight">
          <Container size="xl">
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { label: 'Search demand', value: page.ahrefs.volume },
                { label: 'Difficulty', value: page.ahrefs.difficulty },
                { label: 'Paid intent', value: page.ahrefs.cpc },
              ].map((stat) => (
                <Card key={stat.label} surface="frosted">
                  <Eyebrow tone="muted">{stat.label}</Eyebrow>
                  <p className="font-display mt-3 text-c-text" style={{ fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
                    {stat.value}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container size="xl">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
              <div>
                <Eyebrow tone="muted">Best fit</Eyebrow>
                <Display as="h2" size="md" className="mt-4" maxWidth="18ch">
                  Start where the manual cost is obvious.
                </Display>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {page.fit.map((item) => (
                  <Card key={item} surface="frosted">
                    <Body size="sm">{item}</Body>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section padding="tight">
          <Container size="xl">
            <div className="mb-10">
              <Eyebrow tone="muted">What we automate</Eyebrow>
              <Display as="h2" size="md" className="mt-4" maxWidth="24ch">
                Workflows built for real systems, not clean-room demos.
              </Display>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {page.workflows.map((workflow) => (
                <Card key={workflow} surface="frosted">
                  <Body size="sm">{workflow}</Body>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container size="xl">
            <div className="grid md:grid-cols-3 gap-5">
              {page.sections.map((section) => (
                <Card key={section.title} surface="frosted">
                  <h2 className="font-display text-c-text" style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {section.title}
                  </h2>
                  <Body size="sm" className="mt-3">{section.body}</Body>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section padding="tight">
          <Container size="md">
            <Card surface="navy">
              <Eyebrow tone="muted">Proof</Eyebrow>
              <Body size="lg" tone="on-dark-muted" className="mt-4" maxWidth="60ch">
                {page.proof}
              </Body>
            </Card>
          </Container>
        </Section>

        <Section>
          <Container size="xl">
            <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-10">
              <div>
                <Eyebrow tone="muted">Related agent systems</Eyebrow>
                <Display as="h2" size="md" className="mt-4" maxWidth="18ch">
                  Concrete starting points.
                </Display>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {relatedAgents.map((agent) => agent && (
                  <Link
                    key={agent.slug}
                    href={`/agent-systems/${agent.slug}`}
                    className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-c-accent rounded-2xl"
                  >
                    <Card surface="frosted" className="h-full transition-transform group-hover:-translate-y-0.5">
                      <Eyebrow tone="accent">{agent.category}</Eyebrow>
                      <h3 className="font-display mt-3 text-c-text" style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                        {agent.name}
                      </h3>
                      <Body size="sm" className="mt-3">{agent.tagline}</Body>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section padding="tight">
          <Container size="xl">
            <Eyebrow tone="muted">Common integrations</Eyebrow>
            <div className="mt-5 flex flex-wrap gap-2">
              {page.integrations.map((integration) => (
                <span
                  key={integration}
                  className="font-display text-c-text px-3 py-1.5 rounded-full"
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    border: '1px solid var(--c-border)',
                    background: 'var(--c-surface)',
                  }}
                >
                  {integration}
                </span>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container size="md">
            <div className="text-center mb-10">
              <Display as="h2" size="md" align="center" className="mx-auto" maxWidth="18ch">
                Frequently asked questions.
              </Display>
            </div>
            <div className="space-y-3">
              {page.faqs.map((faq) => (
                <Card key={faq.question} surface="frosted">
                  <h3 className="font-display text-c-text" style={{ fontSize: '1.0625rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
                    {faq.question}
                  </h3>
                  <Body size="sm" className="mt-3">{faq.answer}</Body>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container size="md" className="text-center">
            <Card surface="frosted" className="text-left md:text-center">
              <Eyebrow tone="muted" className="md:justify-center md:inline-flex">Get started</Eyebrow>
              <Display as="h2" size="md" align="center" className="mt-4 mx-auto" maxWidth="22ch">
                Find the first workflow worth automating.
              </Display>
              <Body size="md" align="center" className="mt-5 mx-auto" maxWidth="58ch">
                Book a 30-minute call and we will map your highest-cost manual workflow, estimate the return, and tell you whether an agent system is a fit.
              </Body>
              <div className="mt-8 flex justify-center">
                <CalendlyButton trailingIcon="→">Book a free consultation</CalendlyButton>
              </div>
            </Card>
          </Container>
        </Section>
        <SeoInternalLinks currentSlug={page.slug} />
        </main>
      </Surface>
    </>
  );
}
