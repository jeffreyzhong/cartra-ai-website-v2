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
  Rise,
  Words,
  Button,
} from '@repo/ui';
import Navigation from '../components/Navigation';
import CalendlyButton from '../components/CalendlyButton';
import ContactLink from '../components/ContactLink';
import JsonLd from '../components/JsonLd';
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  createServiceJsonLd,
} from '../lib/seo';
import AgentsHeroVisual from './components/AgentsHeroVisual';
import WorkAutomationVisual from './components/WorkAutomationVisual';
import CustomerChannelVisual from './components/CustomerChannelVisual';
import EmployeeAssistVisual from './components/EmployeeAssistVisual';
import EnterpriseWorkPanel from './components/EnterpriseWorkPanel';
import LifecycleIcon from './components/LifecycleIcon';
import './agents.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Cartra Agents | Deploy AI Agents Anywhere Work Happens',
  description:
    'Cartra Agents engage customers, assist employees, and execute work across voice, chat, email, and documents — grounded in your procedures and deployed into the systems you already run.',
  path: '/agents',
});

const HEADLINE_WORDS = [
  { text: 'Deploy' },
  { text: 'agents' },
  { text: 'anywhere' },
  { text: 'work' },
  { text: 'happens' },
];

const TRANSFORM = [
  {
    title: 'Automate and improve work',
    body: 'Agents that do the work itself. Complete business processes, executed end to end, from the moment work arrives until it is resolved.',
    Visual: WorkAutomationVisual,
  },
  {
    title: 'Serve and grow customers',
    body: 'Agents engage customers across every channel, deliver faster and more effective service, and create new opportunities to drive revenue.',
    Visual: CustomerChannelVisual,
  },
  {
    title: 'Make employees more productive',
    body: "Agents work alongside your people, drawing on the organization's knowledge to answer questions, support decisions, and get tasks done.",
    Visual: EmployeeAssistVisual,
  },
] as const;

const PROBLEMS = [
  {
    href: '/case-studies',
    eyebrow: 'Logistics',
    title: 'Customs documents moved 50% faster for a U.S. freight forwarder',
    meta: '30% fewer manual-entry errors',
  },
  {
    href: '/agent-systems/procurement-vendor-ops',
    eyebrow: 'Manufacturing',
    title: 'Procurement coordinated across a $150M industrial manufacturer',
    meta: 'PO pipeline collapsed into one workflow',
  },
  {
    href: '/agent-systems/ap-intake-approval',
    eyebrow: 'Finance',
    title: 'AP intake resolved end-to-end, from vendor PDF to GL',
    meta: 'Approvals routed against policy',
  },
  {
    href: '/agent-systems/company-knowledge-base',
    eyebrow: 'Operations',
    title: 'Company knowledge unified for service, ops, and marketing',
    meta: 'One source of truth, queried in Slack',
  },
  {
    href: '/agent-systems/ar-reconciliation',
    eyebrow: 'Finance',
    title: 'AR matched across bank, ERP, and remittance before it ages',
    meta: 'Exceptions flagged before collections',
  },
] as const;

const LIFECYCLE = [
  {
    icon: 'workspaces' as const,
    title: 'Workspaces',
    body: 'Teams, projects, and business units each get their own space — without mixing permissions or production traffic.',
  },
  {
    icon: 'versioning' as const,
    title: 'Versioning',
    body: 'Every change is tracked. Roll back to any version, anytime, including the prompts, tools, and routing around it.',
  },
  {
    icon: 'catalog' as const,
    title: 'Catalog',
    body: 'Build an agent once, reuse it everywhere. Skills, tools, and eval sets travel with it.',
  },
  {
    icon: 'permissions' as const,
    title: 'Permissions',
    body: 'Decide who can build, edit, and ship, down to the resource. Agents inherit the access your stack already enforces.',
  },
  {
    icon: 'skills' as const,
    title: 'Reusable skills',
    body: 'Package a specific procedure once, then reuse it across any agent that needs it.',
  },
  {
    icon: 'a2a' as const,
    title: 'Agent-to-agent',
    body: 'Hand work between agents — intake to exception to filing — without rebuilding the procedure each time.',
  },
  {
    icon: 'tags' as const,
    title: 'Tags',
    body: 'Automatically categorize every run and conversation so insights become searchable and measurable.',
  },
  {
    icon: 'ab' as const,
    title: 'A/B testing',
    body: 'Split traffic between two agent variants, pick the winner, and iterate on production data.',
  },
];

const PILLARS = [
  {
    eyebrow: 'Workflow',
    title: 'Workflow Agents',
    body: 'Execute the process itself — intake, match, route, post — inside the ERP and inboxes where the work already lives.',
    href: '/agent-systems',
    rows: ['Invoice PDF received', 'Matched to PO-4412', 'Posted · exception 0'],
  },
  {
    eyebrow: 'Voice & chat',
    title: 'Voice Agents',
    body: 'Engage customers on the phone and in chat, then finish the task: booking, tracking, confirmation.',
    href: '/agent-systems',
    rows: ['Inbound call · Maya Chen', 'Pull tracking · 8841', 'ETA Friday 2:40pm'],
  },
  {
    eyebrow: 'Knowledge',
    title: 'Knowledge Agents',
    body: 'Answer from the company’s actual procedures so ops, service, and new hires stop hunting across drives.',
    href: '/agent-systems/company-knowledge-base',
    rows: ['@agent exception path?', 'SOP-14 · SharePoint', 'Routed to #customs-exceptions'],
  },
] as const;

export default function AgentsPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Agents', path: '/agents' },
        ])}
      />
      <JsonLd
        data={createServiceJsonLd({
          name: 'Cartra Agents',
          description:
            'AI agents that engage customers, assist employees, and execute operational work across voice, chat, email, and documents.',
          serviceType: 'AI agent platform',
          path: '/agents',
          category: 'AI agents',
        })}
      />
      <Surface>
        <Navigation />
        <main>
          <Section padding="hero" className="overflow-hidden">
            <Container size="lg" className="text-center">
              <Rise step={1}>
                <Eyebrow tone="muted" className="justify-center inline-flex">
                  Cartra Agents
                </Eyebrow>
              </Rise>
              <Display as="h1" size="xl" align="center" maxWidth="16ch" className="mt-5 mx-auto">
                <Words words={HEADLINE_WORDS} />
              </Display>
              <Rise step={3}>
                <Body size="lg" align="center" className="mt-8 mx-auto" maxWidth="46ch">
                  Cartra agents engage customers, assist employees, and execute work.
                </Body>
              </Rise>
              <Rise step={5} className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <CalendlyButton eventLocation="agents_hero">Get in touch</CalendlyButton>
                <Button variant="ghost" as="a" href="#transform">
                  See how they work
                </Button>
              </Rise>
            </Container>
            <Container size="2xl" className="mt-14 md:mt-16">
              <Rise step={6}>
                <AgentsHeroVisual />
              </Rise>
            </Container>
          </Section>

          <Section id="transform">
            <Container size="xl">
              <div className="text-center mb-14">
                <Display as="h2" size="lg" align="center" className="mx-auto" maxWidth="16ch">
                  Transform the way you work
                </Display>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {TRANSFORM.map((item) => (
                  <Card key={item.title} className="agents-flush h-full">
                    <item.Visual />
                    <div className="agents-card-copy">
                      <h3
                        className="font-display text-c-text"
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.2,
                        }}
                      >
                        {item.title}
                      </h3>
                      <Body size="sm" className="mt-3">
                        {item.body}
                      </Body>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>
          </Section>

          <section
            id="enterprise"
            className="agents-enterprise-band relative py-[var(--space-section)] px-4 sm:px-6 lg:px-8"
          >
            <Container size="xl">
              <Display
                as="h2"
                size="lg"
                className="max-w-[16ch]"
                style={{ color: 'var(--c-on-dark)' }}
              >
                Built for real enterprise work
              </Display>
              <div className="mt-12">
                <EnterpriseWorkPanel />
              </div>
            </Container>
          </section>

          <Section id="problems">
            <Container size="xl">
              <div className="mb-10 md:mb-14">
                <Display as="h2" size="lg" maxWidth="18ch">
                  Solving the problems that move the business.
                </Display>
              </div>
              <div className="agents-rail">
                {PROBLEMS.map((problem) => (
                  <Link key={problem.title} href={problem.href} className="agents-rail-card">
                    <Eyebrow tone="muted">{problem.eyebrow}</Eyebrow>
                    <h3
                      className="font-display text-c-text mt-4"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.25,
                      }}
                    >
                      {problem.title}
                    </h3>
                    <p
                      className="mt-4 font-display text-c-text-muted"
                      style={{ fontSize: '0.875rem' }}
                    >
                      {problem.meta} ↗
                    </p>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>

          <Section id="lifecycle">
            <Container size="xl">
              <div className="text-center mb-14">
                <Display as="h2" size="lg" align="center" className="mx-auto" maxWidth="16ch">
                  Built for teams building at scale
                </Display>
                <Body size="md" align="center" className="mt-5 mx-auto" maxWidth="52ch">
                  Everything a team needs across the agent lifecycle, from first version to
                  testing, deployment, and improvement in production.
                </Body>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {LIFECYCLE.map((item) => (
                  <Card key={item.title} className="h-full">
                    <LifecycleIcon name={item.icon} />
                    <h3
                      className="font-display text-c-text mt-5"
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </h3>
                    <Body size="sm" className="mt-3">
                      {item.body}
                    </Body>
                  </Card>
                ))}
              </div>
            </Container>
          </Section>

          <Section id="platform">
            <Container size="xl">
              <div className="text-center mb-14">
                <Display as="h2" size="lg" align="center" className="mx-auto" maxWidth="18ch">
                  Transform the way you work on a unified platform
                </Display>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {PILLARS.map((pillar) => (
                  <Card key={pillar.title} className="agents-flush h-full flex flex-col">
                    <div className="agents-pillar-visual" aria-hidden>
                      {pillar.rows.map((row) => (
                        <div key={row} className="agents-mini-row">
                          {row}
                        </div>
                      ))}
                    </div>
                    <div className="agents-card-copy flex flex-col flex-1">
                      <Eyebrow tone="muted">{pillar.eyebrow}</Eyebrow>
                      <h3
                        className="font-display text-c-text mt-3"
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.2,
                        }}
                      >
                        {pillar.title}
                      </h3>
                      <Body size="sm" className="mt-3">
                        {pillar.body}
                      </Body>
                      <div className="mt-6">
                        <Button as="a" href={pillar.href} variant="secondary">
                          Explore
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>
          </Section>

          <Section id="contact">
            <Container size="md" className="text-center">
              <Eyebrow tone="muted" className="justify-center inline-flex">
                Get in touch
              </Eyebrow>
              <Display as="h2" size="lg" align="center" className="mt-5 mx-auto" maxWidth="16ch">
                Deploy agents where your work already happens.
              </Display>
              <Body size="md" align="center" className="mt-5 mx-auto">
                Book a 30-minute call. We will map a first agent onto a real workflow and tell
                you whether it is worth deploying.
              </Body>
              <div className="mt-8 flex justify-center">
                <CalendlyButton eventLocation="agents_cta">Get in touch</CalendlyButton>
              </div>
            </Container>
          </Section>
        </main>

        <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--c-border)' }}>
          <Container size="2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
              <div>
                <p
                  className="font-display text-c-text"
                  style={{ fontSize: '1.25rem', fontWeight: 400, letterSpacing: '-0.02em' }}
                >
                  Cartra AI
                </p>
                <div className="mt-3 text-sm text-c-text-muted font-display space-y-1">
                  <p>team@cartra.ai</p>
                  <p>
                    2261 Market Street
                    <br />
                    STE 85777
                    <br />
                    San Francisco, CA 94114
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 text-sm font-display text-c-text-muted">
                <div>
                  <p className="text-c-text font-semibold">Company</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Link href="/" className="inline-flex items-center h-8 hover:text-c-text transition-colors">
                      Home
                    </Link>
                    <Link href="/agents" className="inline-flex items-center h-8 hover:text-c-text transition-colors">
                      Agents
                    </Link>
                    <Link
                      href="/agent-systems"
                      className="inline-flex items-center h-8 hover:text-c-text transition-colors"
                    >
                      Agent Systems
                    </Link>
                    <Link
                      href="/case-studies"
                      className="inline-flex items-center h-8 hover:text-c-text transition-colors"
                    >
                      Case Studies
                    </Link>
                    <ContactLink className="inline-flex items-center h-8 hover:text-c-text transition-colors cursor-pointer" />
                  </div>
                </div>
                <div>
                  <p className="text-c-text font-semibold">AI Services</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Link
                      href="/ai-agent-development-company"
                      className="inline-flex items-center h-8 hover:text-c-text transition-colors"
                    >
                      AI Agent Development Company
                    </Link>
                    <Link
                      href="/ai-automation-agency"
                      className="inline-flex items-center h-8 hover:text-c-text transition-colors"
                    >
                      AI Automation Agency
                    </Link>
                    <Link
                      href="/ai-workflow-automation"
                      className="inline-flex items-center h-8 hover:text-c-text transition-colors"
                    >
                      AI Workflow Automation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mt-10 pt-8 text-center text-sm font-display text-c-text-soft tabular-nums"
              style={{ borderTop: '1px solid var(--c-border)' }}
            >
              <p>&copy; {new Date().getFullYear()} Cartra. All rights reserved.</p>
            </div>
          </Container>
        </footer>
      </Surface>
    </>
  );
}
