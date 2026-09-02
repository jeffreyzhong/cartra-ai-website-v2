'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import CalendlyButton from './CalendlyButton';

function navClass(active: boolean, visibility = 'hidden md:inline-flex') {
  return `${visibility} items-center h-10 font-display text-sm font-medium transition-colors ${
    active ? 'text-c-text' : 'text-c-text-muted hover:text-c-text'
  }`;
}

export default function Navigation() {
  const pathname = usePathname();
  const onAgents = pathname === '/agents';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-c-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-c-text h-10 -my-1 justify-self-start"
            style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.02em' }}
          >
            <Image
              src="/cartra_geometric_logo_round.png"
              alt="Cartra Logo"
              width={28}
              height={28}
              className="object-contain rounded-full"
              style={{ outline: '1px solid var(--c-border)', outlineOffset: '-1px' }}
            />
            Cartra
          </Link>

          <div className="flex items-center gap-6 justify-self-center">
            <Link href="/agents" className={navClass(onAgents, 'inline-flex')}>
              Agents
            </Link>
            <Link href="/#results" className={navClass(false)}>
              Results
            </Link>
            <Link
              href="/agent-systems"
              className={navClass(pathname.startsWith('/agent-systems'))}
            >
              Agent Systems
            </Link>
            <Link
              href="/case-studies"
              className={navClass(pathname === '/case-studies', 'hidden lg:inline-flex')}
            >
              Case Studies
            </Link>
            <Link href="/#process" className={navClass(false)}>
              Process
            </Link>
            <Link
              href="/#faq"
              className={navClass(false, 'hidden lg:inline-flex')}
            >
              FAQ
            </Link>
          </div>

          <div className="flex items-center justify-self-end">
            <CalendlyButton>Book a call</CalendlyButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
