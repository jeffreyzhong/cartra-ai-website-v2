import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  Surface,
  Section,
  Container,
  Display,
  Body,
  Eyebrow,
  Button,
  Card,
} from '@repo/ui';
import Navigation from '../components/Navigation';
import FAQ from '../components/FAQ';
import ConsultationButton from '../components/ConsultationButton';
import CopyButton from '../components/CopyButton';
import JsonLd from '../components/JsonLd';
import {
  BUSINESS_HOURS,
  REQUEST_CHECKLIST,
  RESPONSE_TARGETS,
  SUPPORT_EMAIL,
  SUPPORT_FAQS,
  SUPPORT_REQUEST_MAILTO,
  SUPPORT_ROUTES,
  supportMailto,
  type SupportRoute,
  type SupportRouteAction,
} from '../content/support';
import { createBreadcrumbJsonLd, createFaqPageJsonLd, createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Support and Help | Cartra',
  description:
    'Get help with a Cartra AI agent: where to send issues and change requests, response-time targets, what to include, and answers to common questions.',
  path: '/support',
});

const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-primary';

const TEXT_LINK = `inline-flex min-h-10 items-center font-display text-sm font-medium text-c-text underline decoration-c-border-strong underline-offset-4 transition-colors hover:decoration-current ${FOCUS_RING}`;

/** Caption-uppercase label for table headers and small definition terms. */
const CAPTION = 'font-display text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-c-body';

/** Shared two-column frame for the reference sections: intro left, content right. */
const SPLIT =
  'grid gap-10 border-t border-c-border pt-10 md:pt-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16';

const ON_THIS_PAGE = [
  { href: '#contact', label: 'Contact routes' },
  { href: '#response-times', label: 'Response times' },
  { href: '#what-to-include', label: 'What to include' },
  { href: '#faq', label: 'Common questions' },
];

/**
 * Section label. Uses the body tone rather than the muted eyebrow token,
 * which falls short of 4.5:1 contrast at caption size.
 */
function Label({ children }: { children: ReactNode }) {
  return (
    <Eyebrow tone="muted" className="text-c-body">
      {children}
    </Eyebrow>
  );
}

function RouteAction({ action }: { action: SupportRouteAction }) {
  switch (action.type) {
    case 'consultation':
      return (
        <ConsultationButton
          variant="secondary"
          trailingIcon="→"
          eventLocation="support_routes"
          className="min-h-10"
        >
          {action.label}
        </ConsultationButton>
      );
    case 'email':
      return (
        <a href={supportMailto({ subject: action.subject })} className={TEXT_LINK}>
          {action.label}
        </a>
      );
    case 'link':
      return action.href.startsWith('#') ? (
        <a href={action.href} className={TEXT_LINK}>
          {action.label}
        </a>
      ) : (
        <Link href={action.href} className={TEXT_LINK}>
          {action.label}
        </Link>
      );
  }
}

/** Existing clients: the featured route, with the support inbox front and center. */
function PrimaryRoute({ route }: { route: SupportRoute }) {
  const production = RESPONSE_TARGETS.find((target) => target.id === 'production');

  return (
    <Card className="flex flex-col">
      <div className="flex flex-1 flex-col md:p-2">
        <Eyebrow tone="accent">{route.audience}</Eyebrow>
        <Display as="h3" size="md" className="mt-4" maxWidth="22ch">
          {route.title}
        </Display>
        <Body size="md" className="mt-4" maxWidth="54ch">
          {route.description}
        </Body>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-c-md border border-c-border bg-c-canvas-soft px-4 py-3 sm:px-5 sm:py-4">
          <a
            href={supportMailto()}
            className={`inline-flex min-h-10 items-center break-all font-display text-c-text underline decoration-c-border-strong decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-current ${FOCUS_RING}`}
            style={{ fontSize: 'clamp(1.375rem, 3.2vw, 1.75rem)', letterSpacing: '-0.02em', lineHeight: 1.25 }}
          >
            {SUPPORT_EMAIL}
          </a>
          <CopyButton
            value={SUPPORT_EMAIL}
            label="Copy email"
            className={`min-h-10 !text-c-body hover:!text-c-text ${FOCUS_RING}`}
          />
        </div>

        <div className="mt-auto pt-8">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-c-border pt-4">
            {production && (
              <p className="font-display text-sm text-c-body">
                Production issues: first response within{' '}
                <span className="whitespace-nowrap text-c-text tabular-nums">
                  {production.value} {production.unit}
                </span>
                .
              </p>
            )}
            {route.actions.map((action) => (
              <RouteAction key={action.label} action={action} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/** Prospects and security/privacy: lighter, hairline-divided entries. */
function SecondaryRoute({ route }: { route: SupportRoute }) {
  return (
    <div className="py-8 first:pt-0 last:pb-0">
      <Label>{route.audience}</Label>
      <h3
        className="mt-3 font-display text-c-text"
        style={{ fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.25, textWrap: 'balance' }}
      >
        {route.title}
      </h3>
      <Body size="md" className="mt-3">
        {route.description}
      </Body>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1">
        {route.actions.map((action) => (
          <RouteAction key={action.label} action={action} />
        ))}
      </div>
    </div>
  );
}

export default function SupportPage() {
  const [primaryRoute, ...otherRoutes] = SUPPORT_ROUTES;

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Support', path: '/support' },
        ])}
      />
      <JsonLd data={createFaqPageJsonLd(SUPPORT_FAQS)} />
      <Surface>
        <Navigation />
        <main>
          {/* Hero */}
          <Section padding="hero">
            <Container size="xl">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:items-end lg:gap-16">
                <div>
                  <Eyebrow tone="accent">Support</Eyebrow>
                  <Display as="h1" size="xl" className="mt-5">
                    How can we help?
                  </Display>
                  <Body size="lg" className="mt-6" maxWidth="54ch">
                    Report an issue, request a change, or ask a question. Here&apos;s where to send it,
                    what to include, and how quickly we respond.
                  </Body>
                </div>

                <nav aria-label="On this page">
                  <Label>On this page</Label>
                  <ul role="list" className="mt-3 border-t border-c-border">
                    {ON_THIS_PAGE.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className={`group flex min-h-11 items-center justify-between gap-4 border-b border-c-border font-display text-c-text ${FOCUS_RING}`}
                          style={{ fontSize: '0.9375rem', fontWeight: 500, letterSpacing: '-0.005em' }}
                        >
                          {item.label}
                          <span
                            aria-hidden
                            className="text-c-body transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
                          >
                            ↓
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Container>
          </Section>

          {/* Contact routes */}
          <Section id="contact" padding="tight" className="scroll-mt-16">
            <Container size="xl">
              <div className="border-t border-c-border pt-10 md:pt-12">
                <Label>Contact</Label>
                <Display as="h2" size="lg" className="mt-4" maxWidth="20ch">
                  Three routes. One team.
                </Display>
                <Body size="md" className="mt-4" maxWidth="56ch">
                  Pick the route that matches why you&apos;re here. Each one reaches the people who
                  design, build, and run Cartra agents.
                </Body>

                <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
                  {primaryRoute && <PrimaryRoute route={primaryRoute} />}
                  <div className="flex flex-col divide-y divide-c-border">
                    {otherRoutes.map((route) => (
                      <SecondaryRoute key={route.id} route={route} />
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {/* Response-time targets */}
          <Section id="response-times" padding="tight" className="scroll-mt-16">
            <Container size="xl">
              <div className={SPLIT}>
                <div>
                  <Label>Response times</Label>
                  <Display as="h2" size="lg" className="mt-4" maxWidth="16ch">
                    What to expect, and when.
                  </Display>
                  <Body size="md" className="mt-4">
                    These are targets for our first response, not for full resolution. If your signed
                    client agreement sets different service levels, the agreement takes precedence.
                  </Body>
                </div>

                <div className="overflow-hidden rounded-c-lg border border-c-border bg-c-surface-card">
                  <table className="w-full border-collapse text-left">
                    <caption className="sr-only">First response targets by type of request</caption>
                    <thead>
                      <tr className="border-b border-c-border">
                        <th scope="col" className={`${CAPTION} px-4 py-3 sm:px-6`}>
                          Request
                        </th>
                        <th scope="col" className={`${CAPTION} w-[40%] py-3 pl-4 pr-3 sm:w-[32%] sm:px-6`}>
                          First response<span className="hidden sm:inline"> within</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-c-border">
                      {RESPONSE_TARGETS.map((target) => (
                        <tr key={target.id}>
                          <th scope="row" className="px-4 py-5 align-top font-normal sm:px-6 sm:py-6">
                            <span
                              className="block font-display text-c-text"
                              style={{ fontSize: '1.0625rem', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3 }}
                            >
                              {target.request}
                            </span>
                            <span className="mt-1.5 block text-sm text-c-body" style={{ lineHeight: 1.5 }}>
                              {target.detail}
                            </span>
                          </th>
                          <td className="py-5 pl-4 pr-3 align-top sm:px-6 sm:py-6">
                            <span className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-1.5">
                              <span
                                className="font-display text-c-text tabular-nums"
                                style={{ fontSize: 'var(--text-display-md)', letterSpacing: '-0.02em', lineHeight: 1 }}
                              >
                                {target.value}
                              </span>
                              <span className="whitespace-nowrap font-display text-sm text-c-body">{target.unit}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <dl className="flex flex-col gap-1 border-t border-c-border bg-c-canvas-soft px-4 py-4 sm:flex-row sm:items-baseline sm:gap-4 sm:px-6">
                    <dt className={`${CAPTION} shrink-0`}>Business hours</dt>
                    <dd className="font-display text-sm text-c-text" style={{ lineHeight: 1.5 }}>
                      {BUSINESS_HOURS.days}, {BUSINESS_HOURS.hours}, {BUSINESS_HOURS.exceptions}.
                    </dd>
                  </dl>
                </div>
              </div>
            </Container>
          </Section>

          {/* What to include */}
          <Section id="what-to-include" padding="tight" className="scroll-mt-16">
            <Container size="xl">
              <div className={SPLIT}>
                <div>
                  <Label>Before you write</Label>
                  <Display as="h2" size="lg" className="mt-4" maxWidth="16ch">
                    What to include so we can help faster.
                  </Display>
                  <Body size="md" className="mt-4">
                    Five details answer most of our first questions. Send them up front and we start on
                    the fix, not the follow-up.
                  </Body>
                  <div className="mt-6">
                    <Button as="a" href={SUPPORT_REQUEST_MAILTO} variant="secondary" className="min-h-10">
                      Start an email with this checklist
                    </Button>
                    <p className="mt-3 font-display text-sm text-c-body">
                      Opens your mail app with these prompts filled in.
                    </p>
                  </div>
                </div>

                <ol role="list" className="divide-y divide-c-border">
                  {REQUEST_CHECKLIST.map((item, index) => (
                    <li
                      key={item.title}
                      className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-4 sm:py-6"
                    >
                      <span
                        aria-hidden
                        className="font-display text-c-body tabular-nums"
                        style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.04em', lineHeight: 1.75 }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p
                          className="font-display text-c-text"
                          style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.35 }}
                        >
                          {item.title}
                        </p>
                        <Body size="sm" className="mt-1.5" maxWidth="60ch">
                          {item.detail}
                        </Body>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Container>
          </Section>

          {/* Help FAQ */}
          <Section id="faq" padding="tight" className="scroll-mt-16">
            <Container size="xl">
              <div className={SPLIT}>
                <div>
                  <Label>Help</Label>
                  <Display as="h2" size="lg" className="mt-4" maxWidth="16ch">
                    Common questions.
                  </Display>
                  <Body size="md" className="mt-4">
                    Practical answers for teams running Cartra agents. Thinking about a first project?
                    The{' '}
                    <Link
                      href="/#faq"
                      className={`text-c-text underline decoration-c-border-strong underline-offset-4 hover:decoration-current ${FOCUS_RING}`}
                    >
                      home page FAQ
                    </Link>{' '}
                    covers scope, timing, and pricing.
                  </Body>
                </div>

                <FAQ items={SUPPORT_FAQS} />
              </div>
            </Container>
          </Section>

          {/* Closing CTA */}
          <Section>
            <Container size="md" className="text-center">
              <Card className="text-center">
                <div className="md:px-4">
                  <Label>Start a project</Label>
                  <Display as="h2" size="md" align="center" className="mt-4 mx-auto" maxWidth="22ch">
                    Bring us the workflow that costs you the most time.
                  </Display>
                  <Body size="md" align="center" className="mt-5 mx-auto" maxWidth="54ch">
                    Book a free 30-minute consultation. We&apos;ll map where an agent fits, what it would
                    take to build, and whether it&apos;s worth doing.
                  </Body>
                  <div className="mt-8 flex justify-center">
                    <ConsultationButton eventLocation="support_cta" className="min-h-10">
                      Book a free consultation
                    </ConsultationButton>
                  </div>
                </div>
              </Card>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 font-display text-sm text-c-body">
                <Link
                  href="/privacy"
                  className={`inline-flex min-h-10 items-center underline decoration-c-border-strong underline-offset-4 transition-colors hover:text-c-text hover:decoration-current ${FOCUS_RING}`}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className={`inline-flex min-h-10 items-center underline decoration-c-border-strong underline-offset-4 transition-colors hover:text-c-text hover:decoration-current ${FOCUS_RING}`}
                >
                  Terms of Use
                </Link>
              </div>
            </Container>
          </Section>
        </main>
      </Surface>
    </>
  );
}
