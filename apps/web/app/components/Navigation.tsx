'use client';

import Link from 'next/link';
import Image from 'next/image';
import CalendlyButton from './CalendlyButton';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-c-text h-10 -my-1 active:scale-[0.96] transition-transform"
            style={{ fontSize: '1.375rem', fontWeight: 600, letterSpacing: '-0.03em' }}
          >
            <Image
              src="/cartra_geometric_logo_round.png"
              alt="Cartra Logo"
              width={28}
              height={28}
              className="object-contain rounded-full"
              style={{ outline: '1px solid rgba(0, 0, 0, 0.1)', outlineOffset: '-1px' }}
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
