import Image from 'next/image';
import type { Metadata } from 'next';
import { Surface, Section, Container, Display, Body, Eyebrow, Card, Rise } from '@repo/ui';
import Navigation from '../components/Navigation';
import ConsultationButton from '../components/ConsultationButton';
import ContactCenter from '../components/ContactCenter';
import { createPageMetadata } from '../lib/seo';
import { FOUNDER } from '../content/founder';

/**
 * /30 — landing page for the QR code in Cartra's half-page ad in the Chinese
 * American CEO Organization's 30th anniversary brochure. A digital version of
 * the ad plus Jeff's direct contact card. Visits here are the ad's scans;
 * consultation requests sent from this page arrive tagged "Source page: /30".
 */

const ORG_EN = 'Chinese American CEO Organization';
const ORG_ZH = '美中工商协会';

const PRODUCTS = ['Voice agents', 'Automation agents', 'Company brains', 'Custom OpenClaw and Hermes agents'];

export const metadata: Metadata = {
  ...createPageMetadata({
    title: `Congratulations, ${ORG_EN} | Cartra AI`,
    description: `Cartra AI congratulates the ${ORG_EN} on 30 years. Custom AI agent deployments to power the next decade of your business.`,
    path: '/30',
  }),
  robots: { index: false, follow: false },
};

export default function ThirtyYearsPage() {
  return (
    <Surface>
      <Navigation />
      <main>
        <Section padding="hero">
          <Container size="lg">
            <p
              className="font-display text-c-text"
              style={{ fontSize: '0.9375rem', fontWeight: 500, letterSpacing: '-0.005em', lineHeight: 1.4 }}
            >
              Congratulations, {ORG_EN}{' '}
              <span lang="zh-Hans" className="whitespace-nowrap">
                {ORG_ZH}
              </span>
            </p>

            <Display as="h1" size="xl" className="mt-4" style={{ fontSize: 'clamp(2.75rem, 10vw, 5.5rem)' }}>
              To <span className="text-c-primary">30</span> more years.
            </Display>

            <Rise step={2}>
              <Body size="lg" className="mt-6" maxWidth="60ch">
                For 30 years, the {ORG_EN} has brought Chinese American entrepreneurs and business leaders
                together in cooperation, exchange, and friendship. Cartra AI is proud to celebrate with you as a
                Silver Sponsor.
              </Body>
            </Rise>

            <Rise step={3}>
              <Timeline />
            </Rise>
          </Container>
        </Section>

        <Section padding="tight">
          <Container size="lg">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-14 lg:items-start">
              <div>
                <Eyebrow tone="muted">What we build</Eyebrow>
                <Display as="h2" size="lg" className="mt-4" maxWidth="22ch">
                  Custom AI agent deployments to power the next decade of your business.
                </Display>
                <ul className="mt-7 flex flex-wrap items-center gap-2" aria-label="Products">
                  {PRODUCTS.map((product) => (
                    <li
                      key={product}
                      className="inline-flex items-center gap-2 rounded-full border border-c-border bg-c-surface-card px-3.5 py-1.5 font-display text-c-text"
                      style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '-0.005em' }}
                    >
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-c-primary" />
                      {product}
                    </li>
                  ))}
                  <li className="px-1.5 font-display text-c-body" style={{ fontSize: '0.875rem' }}>
                    and more
                  </li>
                </ul>
                <div className="mt-9">
                  <ConsultationButton eventLocation="caceo-30">Book a call</ConsultationButton>
                </div>
              </div>

              <Card>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-c-border">
                    <Image
                      src={FOUNDER.headshot}
                      alt={FOUNDER.name}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p
                      className="font-display text-c-text"
                      style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.015em' }}
                    >
                      {FOUNDER.name}
                    </p>
                    <p className="font-display text-c-body" style={{ fontSize: '0.875rem' }}>
                      {FOUNDER.title}, Cartra AI
                    </p>
                  </div>
                </div>
                <ContactCenter
                  email={FOUNDER.email}
                  wechatId={FOUNDER.wechatId}
                  wechatQr={FOUNDER.wechatQr}
                  whatsappQr={FOUNDER.whatsappQr}
                  whatsappUrl={FOUNDER.whatsappUrl}
                />
              </Card>
            </div>
          </Container>
        </Section>
      </main>
    </Surface>
  );
}

/** 1996 to 2056 with 2026 at the true midpoint: the org's 30 years, then the next 30. */
function Timeline() {
  return (
    <figure className="mt-12" aria-label={`Timeline: 30 years of the ${ORG_EN}, 1996 to 2026, and the next 30 years to 2056`}>
      <div
        className="flex items-end justify-between gap-6 font-display text-c-text"
        style={{ fontSize: '0.8125rem', fontWeight: 500, lineHeight: 1.35 }}
      >
        <span className="max-w-[60%]">30 years of the {ORG_EN}</span>
        <span className="shrink-0 text-right">The next 30</span>
      </div>
      <div className="relative mt-3 h-3" aria-hidden>
        <span className="absolute left-0 top-1/2 h-px w-1/2 -translate-y-1/2 bg-c-text" />
        <span className="absolute right-0 top-1/2 h-[3px] w-1/2 -translate-y-1/2 bg-c-primary" />
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-c-primary" />
      </div>
      <div className="mt-2 grid grid-cols-3 font-display tabular-nums" style={{ fontSize: '0.8125rem' }} aria-hidden>
        <span className="text-c-body">1996</span>
        <span className="text-center text-c-text" style={{ fontWeight: 500 }}>
          2026
        </span>
        <span className="text-right text-c-body">2056</span>
      </div>
    </figure>
  );
}
