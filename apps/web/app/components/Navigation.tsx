'use client';

import Link from 'next/link';
import Image from 'next/image';
import CalendlyButton from './CalendlyButton';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-3xl text-gray-900 font-heading">
            <Image 
              src="/cartra_geometric_logo_round_v2.png" 
              alt="Cartra Logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
            Cartra
          </Link>
          
          <CalendlyButton className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer">
            Contact
          </CalendlyButton>
        </div>
      </div>
    </nav>
  );
}

