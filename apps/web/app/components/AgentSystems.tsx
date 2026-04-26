import Link from 'next/link';
import { Section, Container, Display, Body, Eyebrow, Card, Button } from '@repo/ui';
import { AGENT_SYSTEMS } from '../content/agent-systems';

export default function AgentSystems() {
  return (
    <Section id="agent-systems">
      <Container size="xl">
        <div className="text-center mb-14">
          <Eyebrow tone="muted" className="justify-center inline-flex">Agent Systems</Eyebrow>
          <Display as="h2" size="lg" align="center" className="mt-4 mx-auto" maxWidth="24ch">
            Productized agents for the workflows you run every day.
          </Display>
          <Body size="md" align="center" className="mt-5 mx-auto">
            Six patterns we deploy most often, each built to order for your stack. Pick the closest fit as a starting point. We tune the decision logic, integrations, and outputs to match how your team actually works.
          </Body>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENT_SYSTEMS.map((agent) => (
            <Link
              key={agent.slug}
              href={`/agent-systems/${agent.slug}`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-c-accent rounded-2xl"
            >
              <Card surface="frosted" className="h-full transition-transform group-hover:-translate-y-0.5 group-active:scale-[0.995]">
                <Eyebrow tone="accent">{agent.category}</Eyebrow>
                <h3
                  className="font-display mt-3 text-c-text"
                  style={{ fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2 }}
                >
                  {agent.name}
                </h3>
                <Body size="sm" className="mt-3">{agent.tagline}</Body>
                <span
                  className="mt-5 inline-flex items-center gap-1.5 font-display text-c-accent"
                  style={{ fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '-0.005em' }}
                >
                  See how it works
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button as="a" href="/agent-systems" variant="ghost" trailingIcon="→">
            Explore all AI agent systems
          </Button>
        </div>
      </Container>
    </Section>
  );
}
