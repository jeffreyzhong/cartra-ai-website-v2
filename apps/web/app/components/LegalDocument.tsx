import type { ReactNode } from 'react';
import { Surface, Section, Container, Display, Body, Eyebrow } from '@repo/ui';
import Navigation from './Navigation';
import JsonLd from './JsonLd';
import { createBreadcrumbJsonLd } from '../lib/seo';
import styles from './legal.module.css';

export type LegalSection = {
  /** URL fragment for deep links, e.g. `information-we-collect`. */
  id: string;
  title: string;
  /** Paragraphs, lists, and h3 subheads; styled by `.body` in legal.module.css. */
  content: ReactNode;
};

export type LegalDocumentContent = {
  /** ISO date, e.g. `2026-09-30`. */
  lastUpdated: string;
  summary: ReactNode;
  sections: LegalSection[];
};

type LegalDocumentProps = LegalDocumentContent & {
  title: string;
  path: string;
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function sectionNumber(index: number) {
  return String(index + 1).padStart(2, '0');
}

function TableOfContents({ sections }: { sections: LegalSection[] }) {
  return (
    <ol className={styles.toc}>
      {sections.map((section, index) => (
        <li key={section.id}>
          <a href={`#${section.id}`}>
            <span className={styles.tocNumber}>{sectionNumber(index)}</span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function LegalDocument({
  title,
  path,
  lastUpdated,
  summary,
  sections,
}: LegalDocumentProps) {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: title, path },
        ])}
      />
      <Surface>
        <Navigation />
        <main>
          <Section padding="hero">
            <Container size="xl">
              <Eyebrow tone="accent">Legal</Eyebrow>
              <Display as="h1" size="xl" className="mt-5">
                {title}
              </Display>
              <Body size="lg" className="mt-6" maxWidth="62ch">
                {summary}
              </Body>
              <p className={styles.meta}>
                Last updated <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
              </p>
            </Container>
          </Section>

          <Section padding="flush">
            <Container size="xl">
              <div className={styles.layout}>
                <nav aria-label="On this page" className={styles.aside}>
                  <div className={styles.asideInner}>
                    <Eyebrow tone="soft">On this page</Eyebrow>
                    <TableOfContents sections={sections} />
                  </div>
                </nav>

                <details className={styles.mobileToc}>
                  <summary>On this page</summary>
                  <TableOfContents sections={sections} />
                </details>

                <article className={styles.article}>
                  {sections.map((section, index) => (
                    <section
                      key={section.id}
                      id={section.id}
                      aria-labelledby={`${section.id}-heading`}
                      className={styles.section}
                    >
                      <h2 id={`${section.id}-heading`} className={styles.heading}>
                        <span className={styles.headingNumber} aria-hidden>
                          {sectionNumber(index)}
                        </span>
                        {section.title}
                      </h2>
                      <div className={styles.body}>{section.content}</div>
                    </section>
                  ))}
                </article>
              </div>
            </Container>
          </Section>
        </main>
      </Surface>
    </>
  );
}
