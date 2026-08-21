import {
  Surface,
  Section,
  Container,
  Display,
  Body,
  Eyebrow,
  Button,
  LogoPill,
  Card,
  StatGroup,
  Rise,
  Words,
  HeroAgentAnimation,
  type StatItem,
} from '@repo/ui';
import Navigation from './components/Navigation';
import FAQ from './components/FAQ';
import AgentSystems from './components/AgentSystems';
import CalendlyButton from './components/CalendlyButton';
import ContactLink from './components/ContactLink';
import SeoInternalLinks from './components/SeoInternalLinks';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import JsonLd from './components/JsonLd';
import { createFaqPageJsonLd, createPageMetadata } from './lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Custom AI Agents for Workflow Automation | Cartra',
  description:
    'Cartra builds custom AI agents for workflow automation, document processing, finance operations, and mid-market teams that need production systems in weeks.',
  path: '/',
});

const HEADLINE_WORDS = [
  { text: 'Custom' },
  { text: 'AI' },
  { text: 'agents' },
  { text: 'to' },
  { text: 'power' },
  { text: 'the' },
  { text: 'next' },
  { text: 'decade' },
  { text: 'of' },
  { text: 'your' },
  { text: 'business.' },
];

const HERO_STATS: StatItem[] = [
  { value: 60, inlineSuffix: '%', label: 'avg operational cost reduction' },
  { value: 30, inlineSuffix: '%', label: 'fewer manual errors' },
  { value: 6, unit: 'weeks', label: 'avg deploy time per agent system' },
];

function getQuarterAvailability() {
  const now = new Date();
  const month = now.getMonth();
  const quarter = Math.floor(month / 3) + 1;
  const year = now.getFullYear();
  const quarterStartMonth = (quarter - 1) * 3;
  const quarterStart = new Date(year, quarterStartMonth, 1);
  const quarterEnd = new Date(year, quarterStartMonth + 3, 1);
  const totalDays = (quarterEnd.getTime() - quarterStart.getTime()) / (1000 * 60 * 60 * 24);
  const daysElapsed = (now.getTime() - quarterStart.getTime()) / (1000 * 60 * 60 * 24);
  const progress = daysElapsed / totalDays;
  const spots = Math.max(2, Math.round(9 - 7 * progress));
  return { quarter, year, spots };
}

export default function Home() {
  const { quarter, year, spots } = getQuarterAvailability();

  return (
    <>
    <JsonLd data={createFaqPageJsonLd()} />
    <Surface>
      <Navigation />
      <main>

      {/* Hero */}
      <Section
        id="home"
        padding="hero"
        className="overflow-hidden min-h-[calc(100svh-4rem)] flex items-center"
      >
        <Container size="2xl" className="w-full">
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-[minmax(0,36rem)_minmax(0,1fr)] xl:gap-12">
            <div className="flex flex-col items-start text-left min-w-0">
              <Display as="h1" size="xl" maxWidth="24ch">
                <Words words={HEADLINE_WORDS} />
              </Display>

              <Rise step={3} className="w-full">
                <Body size="lg" className="mt-8" maxWidth="52ch">
                  Don&apos;t fall behind in the AI era. Transform your company with AI
                  that&apos;s fully tailored to your specific operations and procedures.
                </Body>
              </Rise>

              <Rise
                step={5}
                className="mt-10 flex flex-wrap items-center justify-start gap-3"
              >
                <CalendlyButton>Book a free consultation</CalendlyButton>
                <Button variant="ghost" as="a" href="#process">See our process</Button>
              </Rise>
            </div>

            <HeroAgentAnimation className="hidden lg:flex w-full min-w-0 self-stretch" />
          </div>
        </Container>
      </Section>

      {/* Trust band — stats + founders (below first viewport) */}
      <Section padding="tight" id="trust-band">
        <Container size="lg" className="text-center">
          <StatGroup stats={HERO_STATS} />
          <div className="mt-12 max-w-lg mx-auto">
            <Eyebrow tone="muted" className="justify-center inline-flex">Founded by AI engineers from</Eyebrow>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
              <LogoPill>
                <Image src="/META.svg" alt="Meta" width={96} height={22} className="h-[18px] w-auto" />
              </LogoPill>
              <LogoPill>
                <Image src="/GOOG.svg" alt="Google" width={96} height={22} className="h-[18px] w-auto" />
              </LogoPill>
              <span className="font-display text-[0.8125rem] text-c-text-muted">
                who&apos;ve scaled products to billions of users.
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Wedge */}
      <Section padding="tight">
        <Container size="md" className="text-center">
          <Eyebrow tone="muted" className="justify-center inline-flex">What we build</Eyebrow>
          <Display as="h2" size="md" align="center" className="mt-4 mx-auto" maxWidth="22ch">
            Not a platform. Not a prompt. A production system your ops team can trust.
          </Display>
          <Body size="md" align="center" className="mt-5 mx-auto" maxWidth="58ch">
            Off-the-shelf AI gets you a demo. Agent systems built for your
            workflow, deployed into your stack, and maintained by our team
            get you an operating-leverage shift. That&apos;s what we build.
          </Body>
        </Container>
      </Section>

      {/* What Are AI Agents Section
      <FadeIn delay={800}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4 font-heading">
                The Digital-Employee Revolution.
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                If you&apos;ve heard about AI but aren&apos;t sure what it means for your business, you&apos;re not alone. Let us explain in plain terms.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
                <h3 className="text-2xl mb-4 font-heading">Think of an AI Agent as Your Digital Employee</h3>
                <p className="text-gray-700 mb-4">
                  An AI agent is like having a highly capable employee who never sleeps, never makes mistakes, and never asks for a raise. But instead of being a general-purpose worker, each agent is specifically trained to handle one type of task-perfectly.
                </p>
                <p className="text-gray-700">
                  Just like you might hire someone to handle your accounting, or someone else to manage customer service, an AI agent is built to excel at a specific job. The difference? It works 24/7, processes information instantly, and gets better over time-all while costing a fraction of a full-time employee.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-3 font-heading">They Understand Your Business</h4>
                  <p className="text-gray-600 text-sm">
                    Unlike generic AI tools, custom agents are built specifically for your workflows, your software, and your industry. They speak your language and understand your processes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-3 font-heading">They Work Around the Clock</h4>
                  <p className="text-gray-600 text-sm">
                    While your team sleeps, agents keep working. Process invoices overnight, respond to customer inquiries at 2 AM, or generate reports before your morning meeting-all automatically.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-3 font-heading">They Never Get Tired or Make Mistakes</h4>
                  <p className="text-gray-600 text-sm">
                    Human error costs money. An agent follows the same process perfectly every single time-no typos, no missed steps, no &quot;I forgot to do that.&quot; Consistency becomes your new normal.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h4 className="text-xl mb-3 font-heading">They Scale With You</h4>
                  <p className="text-gray-600 text-sm">
                    Need to process 10x more invoices next month? An agent handles it without breaking a sweat. No hiring, no training, no growing pains-just instant capacity when you need it.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 border border-green-200 p-8 rounded-lg">
                <h3 className="text-2xl mb-4 font-heading">Why Mid-Market Companies Need Custom Agents</h3>
                <p className="text-gray-700 mb-4">
                  You&apos;ve probably seen big tech companies using AI, but here&apos;s the thing: <strong>mid-market companies often benefit even more</strong>. Here&apos;s why:
                </p>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span><strong>You don&apos;t have enterprise budgets</strong> for massive IT teams, but you have the same operational challenges. Custom agents give you enterprise-level automation at a fraction of the cost.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span><strong>Every dollar counts.</strong> When you&apos;re growing, efficiency isn&apos;t nice-to-have-it&apos;s survival. Agents help you do more with your existing team and budget.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span><strong>You&apos;re competing with bigger players</strong> who have more resources. Agents level the playing field by automating tasks that would otherwise require hiring more people.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 font-bold">•</span>
                    <span><strong>Your processes are unique.</strong> Off-the-shelf software rarely fits perfectly. Custom agents are built specifically for how <em>you</em> work, not how some software company thinks you should work.</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-6">
                  The bottom line? AI agents aren&apos;t just for tech companies. They&apos;re for any company that wants to work smarter, reduce costs, and scale without the traditional constraints of headcount and operational overhead.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn> */}

      {/* Testimonials */}
      <Section id="results">
        <Container size="xl">
          <div className="text-center mb-14">
            <Eyebrow tone="muted" className="justify-center inline-flex">The Results</Eyebrow>
            <Display as="h2" size="lg" align="center" className="mt-4 mx-auto" maxWidth="18ch">
              Impact from day&nbsp;one.
            </Display>
            <Body size="md" align="center" className="mt-5 mx-auto">
              Agent systems are repeatable patterns, not one-off experiments. Here&apos;s how two of our clients put them into production, and what it unlocked.
            </Body>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card>
              <Eyebrow tone="accent">Customs &amp; Document Agent System</Eyebrow>
              <h3 className="font-display text-c-text mt-3" style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.015em' }}>
                8-figure U.S. freight forwarder
              </h3>
              <Body size="md" className="mt-3">
                Automated customs filings, multi-ERP document workflows, and a custom email-triage agent. Manual-entry errors fell 30%, document handling moved 50% faster, and the operations team absorbed higher shipment volume without a new hire.
              </Body>
              <Link
                href="/agent-systems/customs-document-ops"
                className="mt-5 inline-flex font-display text-c-primary"
                style={{ fontSize: '0.8125rem', fontWeight: 500 }}
              >
                See the customs document agent system →
              </Link>
            </Card>

            <Card>
              <Eyebrow tone="accent">Procurement &amp; Knowledge Agent System</Eyebrow>
              <h3 className="font-display text-c-text mt-3" style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.015em' }}>
                $150M+ industrial manufacturer
              </h3>
              <Body size="md" className="mt-3">
                Automated the end-to-end purchase-order pipeline and stood up a company-wide knowledge base now powering customer service, operations, and marketing from a single source of truth. Cross-department coordination collapsed into one agent-driven workflow.
              </Body>
              <Link
                href="/agent-systems/procurement-vendor-ops"
                className="mt-5 inline-flex font-display text-c-primary"
                style={{ fontSize: '0.8125rem', fontWeight: 500 }}
              >
                See the procurement agent system →
              </Link>
            </Card>
          </div>

          <Card surface="featured" className="mb-10">
            <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--c-on-dark)' }}>
              Engineering depth from Meta and Google.
            </h3>
            <Body size="md" tone="on-dark-muted" className="mt-3" maxWidth="60ch">
              Decades of combined experience scaling products to billions of users, brought to mid-market operational challenges at a fraction of enterprise pricing.
            </Body>
          </Card>

          <div className="text-center">
            <CalendlyButton trailingIcon="→">Learn how we can help</CalendlyButton>
          </div>
        </Container>
      </Section>

      {/* Agent Systems */}
      <AgentSystems />

      {/* Opportunity */}
      <Section id="opportunity">
        <Container size="xl">
          <div className="text-center mb-14">
            <Eyebrow tone="muted" className="justify-center inline-flex">The Opportunity</Eyebrow>
            <Display as="h2" size="lg" align="center" className="mt-4 mx-auto" maxWidth="22ch">
              What operating leverage actually looks like.
            </Display>
            <Body size="md" align="center" className="mt-5 mx-auto">
              Four shifts every client sees when agent systems move from pilot to production, each one grounded in a real deployment.
            </Body>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                n: '01',
                title: 'Headcount-neutral scale',
                body: 'The freight forwarder absorbed higher shipment volume without a single ops hire. Agent systems let you take on the next tier of customers without rebuilding your org chart.',
              },
              {
                n: '02',
                title: 'A lower error floor, permanently',
                body: 'The customs agent cut manual-entry errors by 30% on day one and keeps improving as its decision logic is tuned against live data. Compounding accuracy, not a one-time dip.',
              },
              {
                n: '03',
                title: 'Senior hours, returned',
                body: 'Your analysts, coordinators, and partners stop doing data entry, triage, and reconciliation. They go back to the judgment work you hired them for.',
              },
              {
                n: '04',
                title: 'One system of record, not twelve',
                body: 'The $150M manufacturer replaced a patchwork of spreadsheets, vendor portals, and inboxes with one coordinated workflow, and a knowledge base now serving ops, customer service, and marketing.',
              },
            ].map((item) => (
              <Card key={item.n}>
                <span className="font-display text-c-orange tabular-nums" style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                  {item.n}
                </span>
                <h3 className="font-display mt-4 text-c-text" style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                  {item.title}
                </h3>
                <Body size="sm" className="mt-3">{item.body}</Body>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services Section
      <FadeIn delay={1300}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">Services</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-heading">
              Example agents across<br />every cost sink
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From lead generation to customer support our AI agents are custom-built for your specific workflows, data, and industry requirements. These are just examples: let us build you what you need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h4 className="text-xl mb-2 font-heading">The AI Voice Agent</h4>
              <p className="text-gray-600 text-sm mb-4">Service Desks & Call Centers</p>
              <p className="text-gray-700 mb-4">
                Answers, triages, schedules, and resolves FAQs with 97% accuracy, cutting support spend up to 40% and recapturing missed revenue.
              </p>
              <p className="text-sm text-gray-500">Speech Recognition</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-xl mb-2 font-heading">The Outreach Agent</h4>
              <p className="text-gray-600 text-sm mb-4">Sales & Community Outreach</p>
              <p className="text-gray-700 mb-4">
                Mines public data, drafts context‑rich messages, and auto‑schedules follow‑ups, driving 5x reply rates and three times more qualified leads while remaining CAN‑SPAM compliant.
              </p>
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="text-sm text-gray-600 mb-2">Search Prospects</p>
                <h5 className="text-sm mb-1 font-heading">Define Target Criteria</h5>
                <p className="text-xs text-gray-500 mb-2">Natural language prospect targeting</p>
                <p className="text-xs text-gray-600 italic">product managers at fintech companies</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4 className="text-xl mb-2 font-heading">The Automation Agent</h4>
              <p className="text-gray-600 text-sm mb-4">Finance & Back office</p>
              <p className="text-gray-700">
                Reconciles invoices, cross‑checks GL accounts, and updates dashboards overnight, saving a media conglomerate $400k in 90 days and returning 15 to 20 staff hours each week.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-xl mb-2 font-heading">The Conversion Agent</h4>
              <p className="text-gray-600 text-sm mb-4">E-commerce & online portals</p>
              <p className="text-gray-700 mb-4">
                Engages hesitant shoppers in real time with smart recommendations and instant Q&A, lifting conversions up to 30% and average order value 25%.
              </p>
              <div className="flex gap-4 mt-4">
                <div className="text-sm">
                  <p className="text-gray-600">Avg Order Value</p>
                  <p className="text-green-600 font-semibold">+25%</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Revenue</p>
                  <p className="text-green-600 font-semibold">+30%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              href="#contact"
              className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
      </FadeIn> */}

      {/* Industries */}
      <Section id="industries">
        <Container size="xl">
          <div className="text-center mb-14">
            <Eyebrow tone="muted" className="justify-center inline-flex">The Market</Eyebrow>
            <Display as="h2" size="lg" align="center" className="mt-4 mx-auto" maxWidth="22ch">
              Built for the industries that run the real economy.
            </Display>
            <Body size="md" align="center" className="mt-5 mx-auto">
              The backbone industries: the ones that move goods, produce,
              insure, finance, and build. Each has its own workflows, regulators,
              and systems. We build for yours specifically.
            </Body>
          </div>

          <div className="mb-10 text-center">
            <Eyebrow tone="muted" className="justify-center inline-flex">Or start with a department</Eyebrow>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {['Finance Ops', 'Revenue Ops', 'Legal Ops', 'Supply Chain Ops'].map((label) => (
                <span
                  key={label}
                  className="font-display text-c-text-muted px-3 py-1.5 rounded-full"
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
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Logistics',
                body: 'Customs filings, freight documentation, multi-ERP reconciliation, and exception triage. The backbone of our freight-forwarder deployment.',
              },
              {
                title: 'Manufacturing',
                body: 'Purchase-order pipelines, supplier coordination, and company-wide knowledge bases that turn tribal knowledge into an operating asset.',
              },
              {
                title: 'Finance',
                body: 'Reconciliations, anomaly detection, and client-outreach workflows that strengthen compliance posture while freeing analysts from spreadsheet drudgery.',
              },
              {
                title: 'Healthcare',
                body: 'Prior-auth, intake, and clinical-documentation workflows handled inside HIPAA-ready deployments that respect existing EHR permissions.',
              },
              {
                title: 'Insurance',
                body: 'Policy review, fraud-signal detection, and claims-document extraction that compress cycle times without sacrificing accuracy.',
              },
              {
                title: 'Software',
                body: 'RevOps hygiene, renewal motions, and support-ticket triage built into your existing CRM and helpdesk. No new tooling to adopt.',
              },
              {
                title: 'Skilled Trades',
                body: 'Quoting, scheduling, invoicing, and field-to-office handoffs automated inside the dispatch and accounting systems your team already runs.',
              },
            ].map((item) => (
              <Card key={item.title}>
                <h3 className="font-display text-c-text" style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                  {item.title}
                </h3>
                <Body size="sm" className="mt-3">{item.body}</Body>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section id="process">
        <Container size="xl">
          <div className="text-center mb-14">
            <Eyebrow tone="muted" className="justify-center inline-flex">The Process</Eyebrow>
            <Display as="h2" size="lg" align="center" className="mt-4 mx-auto" maxWidth="20ch">
              From analysis to transformation in weeks.
            </Display>
          </div>

          <Card className="mb-10">
            <div className="md:flex md:items-start md:gap-8">
              <div className="shrink-0 md:w-48">
                <span className="font-display text-c-orange tabular-nums" style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                  00
                </span>
                <h3 className="font-display mt-3 text-c-text" style={{ fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  What we need from you
                </h3>
              </div>
              <Body size="md" className="mt-4 md:mt-0 md:flex-1">
                About fifteen hours of your team&apos;s time across six weeks, mostly in discovery and stakeholder reviews. No internal AI team required. No tooling migration.
              </Body>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-12">
            {[
              {
                n: '01',
                title: 'Discover & map',
                body: 'We meet with your team to identify your highest-cost manual processes. You receive a detailed ROI projection pinpointing exactly where to start for maximum immediate impact. No guesswork, just data-driven priorities.',
              },
              {
                n: '02',
                title: 'Build & deploy',
                body: 'Our engineers build custom agent systems that deploy into the stack you already run: Salesforce, NetSuite, HubSpot, QuickBooks, SAP, Zendesk, Slack, and custom internal tools. Zero platform migration. Zero workflow disruption.',
              },
              {
                n: '03',
                title: 'Launch & scale',
                body: 'Launch with real-time performance monitoring, a dedicated success manager, and an executive KPI dashboard. Watch cost savings, time recovered, and accuracy improvements live. Replicate successful automations across your organization.',
              },
            ].map((step) => (
              <div key={step.n}>
                <span className="font-display text-c-orange tabular-nums" style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                  {step.n}
                </span>
                <h3 className="font-display mt-3 text-c-text" style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {step.title}
                </h3>
                <Body size="md" className="mt-4">{step.body}</Body>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CalendlyButton trailingIcon="→">Talk to us</CalendlyButton>
          </div>
        </Container>
      </Section>

      {/* Security & Trust Section
      <FadeIn delay={1900}>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">Security & Trust</p>
            <h2 className="text-4xl md:text-5xl mb-4 font-heading">
              Enterprise-grade,<br />audit-ready.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We build our platform on a foundation of state-of-the-art security and privacy protocols, because we know your business data is your most valuable asset.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Your Data is Your Data.</h3>
              <p className="text-gray-600">
                We never use your data to train models. You retain full ownership, period. We sign MSAs and NDAs.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Secure Infrastructure</h3>
              <p className="text-gray-600">
                End‑to‑end encryption in transit and at rest meets or exceeds federal standards.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl mb-3 font-heading">Compliance Alignment</h3>
              <p className="text-gray-600">
                SOC 2 Type II, ISO 27001, GDPR, CCPA, FERPA, HIPAA‑adjacent data flows. You name it we have it.
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeIn> */}

      {/* Trust & Security */}
      <Section id="trust" padding="tight">
        <Container size="xl">
          <div className="text-center mb-10">
            <Eyebrow tone="muted" className="justify-center inline-flex">Trust &amp; Security</Eyebrow>
            <Display as="h2" size="md" align="center" className="mt-4 mx-auto" maxWidth="22ch">
              Built to pass your security review.
            </Display>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                n: '01',
                title: 'Your permissions, your data',
                body: 'Agents operate within existing user and role permissions. No shadow access, no data exfiltration, nothing your stack doesn\u2019t already allow.',
              },
              {
                n: '02',
                title: 'Enterprise-grade posture',
                body: 'SOC 2 Type II in progress. HIPAA-ready deployments available. GDPR-aligned by default. Signed MSAs and NDAs on every engagement.',
              },
              {
                n: '03',
                title: 'Owned by you',
                body: 'All prompts, logic, and training artifacts are your property. No lock-in, no vendor-held secrets, no data used to train third-party models.',
              },
            ].map((item) => (
              <div key={item.n}>
                <span className="font-display text-c-orange tabular-nums" style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                  {item.n}
                </span>
                <h3 className="font-display mt-3 text-c-text" style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                  {item.title}
                </h3>
                <Body size="sm" className="mt-3">{item.body}</Body>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Container size="md">
          <div className="text-center mb-12">
            <Display as="h2" size="lg" align="center" className="mx-auto" maxWidth="18ch">
              Frequently asked questions.
            </Display>
            <Body size="md" align="center" className="mt-5 mx-auto">
              Quick answers to the most common inquiries. For anything else, email us at{' '}
              <a href="mailto:team@cartra.ai" className="underline underline-offset-4 text-c-text hover:text-c-primary transition-colors">
                team@cartra.ai
              </a>{' '}
              or book a call.
            </Body>
          </div>

          <FAQ />
        </Container>
      </Section>

      {/* Final CTA */}
      <Section id="contact">
        <Container size="md" className="text-center">
          <Card className="text-left md:text-center">
            <div className="md:px-4">
              <Eyebrow tone="muted" className="md:justify-center md:inline-flex">Get Started</Eyebrow>
              <Display as="h3" size="md" align="center" className="mt-4 mx-auto" maxWidth="20ch">
                Let&apos;s get to know each other.
              </Display>
              <Body size="md" align="center" className="mt-5 mx-auto">
                Book a 30-minute no-strings-attached strategy call. We&apos;ll get acquainted, discuss your company&apos;s situation, and you&apos;ll walk away with actionable advice and insights. Completely free. No sales pitch, just genuine guidance you can use immediately.
              </Body>
              <div className="mt-8 flex justify-center">
                <CalendlyButton>Book a free consultation</CalendlyButton>
              </div>
            </div>
          </Card>
          <p className="mt-6 text-sm text-c-text-soft font-display tabular-nums">
            Limited availability. Accepting {spots} more client{spots !== 1 ? 's' : ''} in Q{quarter} {year}
          </p>
        </Container>
      </Section>
      <SeoInternalLinks />
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--c-border)' }}>
        <Container size="2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
            <div>
              <p className="font-display text-c-text" style={{ fontSize: '1.25rem', fontWeight: 400, letterSpacing: '-0.02em' }}>
                Cartra AI
              </p>
              <div className="mt-3 text-sm text-c-text-muted font-display space-y-1">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  team@cartra.ai
                </p>
                <p className="flex items-start gap-2 pt-1">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>2261 Market Street<br />STE 85777<br />San Francisco, CA 94114</span>
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 text-sm font-display text-c-text-muted">
              <div>
                <p className="text-c-text font-semibold">Company</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/" className="inline-flex items-center h-8 hover:text-c-text transition-colors">Home</Link>
                  <Link href="/agent-systems" className="inline-flex items-center h-8 hover:text-c-text transition-colors">Agent Systems</Link>
                  <Link href="/case-studies" className="inline-flex items-center h-8 hover:text-c-text transition-colors">Case Studies</Link>
                  <ContactLink className="inline-flex items-center h-8 hover:text-c-text transition-colors cursor-pointer" />
                </div>
              </div>
              <div>
                <p className="text-c-text font-semibold">AI Services</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/ai-agent-development-company" className="inline-flex items-center h-8 hover:text-c-text transition-colors">AI Agent Development Company</Link>
                  <Link href="/ai-automation-agency" className="inline-flex items-center h-8 hover:text-c-text transition-colors">AI Automation Agency</Link>
                  <Link href="/ai-workflow-automation" className="inline-flex items-center h-8 hover:text-c-text transition-colors">AI Workflow Automation</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 text-center text-sm font-display text-c-text-soft tabular-nums" style={{ borderTop: '1px solid var(--c-border)' }}>
            <p>&copy; {new Date().getFullYear()} Cartra. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </Surface>
    </>
  );
}
