import Link from 'next/link';
import { Body, Card, Container, Display, Eyebrow, Section } from '@repo/ui';
import { COMMERCIAL_PAGES } from '../content/commercial-pages';

type SeoInternalLinksProps = {
  currentSlug?: string;
  padding?: 'default' | 'tight';
};

export default function SeoInternalLinks({
  currentSlug,
  padding = 'tight',
}: SeoInternalLinksProps) {
  const pages = COMMERCIAL_PAGES.filter((page) => page.slug !== currentSlug);

  if (pages.length === 0) return null;

  return (
    <Section padding={padding}>
      <Container size="xl">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
          <div>
            <Eyebrow tone="muted">AI Services</Eyebrow>
            <Display
              as="h2"
              size="md"
              className="mt-4"
              maxWidth="20ch"
            >
              Explore the services behind the agent systems.
            </Display>
            <Body size="md" className="mt-5" maxWidth="54ch">
              Start with the service area closest to the workflow you want to
              improve, then follow the related agent systems for concrete
              examples.
            </Body>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-c-accent rounded-2xl"
              >
                <Card surface="frosted" className="h-full transition-transform group-hover:-translate-y-0.5 group-active:scale-[0.995]">
                  <Eyebrow tone="accent">Service</Eyebrow>
                  <h3
                    className="font-display mt-3 text-c-text"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      lineHeight: 1.2,
                    }}
                  >
                    {page.eyebrow}
                  </h3>
                  <Body size="sm" className="mt-3">{page.seoDescription}</Body>
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 font-display text-c-accent"
                    style={{ fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '-0.005em' }}
                  >
                    Learn more
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
