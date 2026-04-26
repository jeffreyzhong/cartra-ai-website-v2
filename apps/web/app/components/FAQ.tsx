'use client';

import { useState } from 'react';
import { Card } from '@repo/ui';
import { FAQS } from '../content/faqs';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <Card key={index} surface="frosted">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between text-left min-h-[28px]"
              aria-expanded={isOpen}
            >
              <span
                className="font-display text-c-text pr-4"
                style={{ fontSize: '1.0625rem', fontWeight: 600, letterSpacing: '-0.01em', textWrap: 'balance' }}
              >
                {faq.question}
              </span>
              <span
                aria-hidden
                className="relative flex-shrink-0 inline-flex items-center justify-center w-6 h-6"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transitionProperty: 'transform',
                  transitionDuration: 'var(--duration-medium)',
                  transitionTimingFunction: 'var(--ease-out-soft)',
                }}
              >
                <svg
                  className="w-5 h-5 text-c-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div
              className="grid"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transitionProperty: 'grid-template-rows, opacity',
                transitionDuration: 'var(--duration-medium)',
                transitionTimingFunction: 'var(--ease-out-soft)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p
                  className="font-display mt-4 pt-4 text-c-text-muted"
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.55,
                    borderTop: '1px solid var(--c-border)',
                    textWrap: 'pretty',
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
