'use client';

import { useState } from 'react';

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
};

export default function CopyButton({
  value,
  label = 'Copy',
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable (older browsers / insecure contexts) — ignore.
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? `${label} copied` : `Copy ${value}`}
      className={`inline-flex items-center gap-1.5 rounded-full border border-c-border bg-white/60 px-2.5 py-1 font-display text-c-text-muted backdrop-blur-sm transition-colors hover:border-c-accent hover:text-c-accent active:scale-[0.97] ${className}`}
      style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '-0.005em' }}
    >
      {copied ? (
        <>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span aria-live="polite">Copied</span>
        </>
      ) : (
        <>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
