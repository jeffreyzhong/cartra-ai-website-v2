'use client';

import Link from 'next/link';
import Image from 'next/image';
import CalendlyButton from './CalendlyButton';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-c-bg/95 border-b border-c-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-c-text h-10 -my-1"
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

          <div className="flex items-center gap-6">
            <Link
              href="/#results"
              className="hidden md:inline-flex items-center h-10 font-display text-sm font-medium text-c-text-muted hover:text-c-text transition-colors"
            >
              Results
            </Link>
            <Link
              href="/agent-systems"
              className="hidden md:inline-flex items-center h-10 font-display text-sm font-medium text-c-text-muted hover:text-c-text transition-colors"
            >
              Agent Systems
            </Link>
            <Link
              href="/case-studies"
              className="hidden lg:inline-flex items-center h-10 font-display text-sm font-medium text-c-text-muted hover:text-c-text transition-colors"
            >
              Case Studies
            </Link>
            <Link
              href="/#process"
              className="hidden md:inline-flex items-center h-10 font-display text-sm font-medium text-c-text-muted hover:text-c-text transition-colors"
            >
              Process
            </Link>
            <Link
              href="/#faq"
              className="hidden md:inline-flex items-center h-10 font-display text-sm font-medium text-c-text-muted hover:text-c-text transition-colors"
            >
              FAQ
            </Link>
            <CalendlyButton trailingIcon="→">Book a call</CalendlyButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
