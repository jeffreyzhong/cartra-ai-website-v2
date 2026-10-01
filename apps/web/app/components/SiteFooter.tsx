import Link from 'next/link';
import { Container } from '@repo/ui';
import ContactLink from './ContactLink';

const LINK_CLASS = 'inline-flex items-center h-8 hover:text-c-text transition-colors';

export default function SiteFooter() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--c-border)' }}>
      <Container size="2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
          <div>
            <p className="font-display text-c-text" style={{ fontSize: '1.25rem', fontWeight: 400, letterSpacing: '-0.02em' }}>
              Cartra AI
            </p>
            <div className="mt-3 text-sm text-c-text-muted font-display space-y-1">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                team@cartra.ai
              </p>
              <p className="flex items-start gap-2 pt-1">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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
                <Link href="/" className={LINK_CLASS}>Home</Link>
                <Link href="/agent-systems" className={LINK_CLASS}>Agent Systems</Link>
                <Link href="/case-studies" className={LINK_CLASS}>Case Studies</Link>
                <Link href="/support" className={LINK_CLASS}>Support</Link>
                <ContactLink className={`${LINK_CLASS} cursor-pointer`} />
              </div>
            </div>
            <div>
              <p className="text-c-text font-semibold">AI Services</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link href="/ai-agent-development-company" className={LINK_CLASS}>AI Agent Development Company</Link>
                <Link href="/ai-automation-agency" className={LINK_CLASS}>AI Automation Agency</Link>
                <Link href="/ai-workflow-automation" className={LINK_CLASS}>AI Workflow Automation</Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mt-10 pt-8 flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between text-sm font-display text-c-text-soft tabular-nums"
          style={{ borderTop: '1px solid var(--c-border)' }}
        >
          <p>&copy; {new Date().getFullYear()} Cartra. All rights reserved.</p>
          <nav aria-label="Legal" className="flex items-center gap-6">
            <Link href="/privacy" className={LINK_CLASS}>Privacy Policy</Link>
            <Link href="/terms" className={LINK_CLASS}>Terms of Use</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
