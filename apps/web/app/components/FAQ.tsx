'use client';

import { useState } from 'react';
import { Card } from '@repo/ui';

const faqs = [
  {
    question: 'What do we need to get started?',
    answer:
      "Getting started is simple. We begin with a free consultation call where we discuss your current processes and identify opportunities. If there are opportunities and we have capacity, we'll provide a detailed ROI projection and implementation plan.",
  },
  {
    question: 'How customizable are your agents?',
    answer:
      'Our AI agents are fully customized to your specific workflows, data structures, and business requirements. We build each agent from the ground up to integrate seamlessly with your existing tech stack.',
  },
  {
    question: 'What are typical use cases?',
    answer:
      'It depends on the industry, but we usually start with the most repetitive and time-consuming tasks in your company — data entry, document processing, email triage, customer support, and more.',
  },
  {
    question: 'Do we need in-house AI talent?',
    answer:
      "No. Our team handles all AI development, deployment, and maintenance. You don't need any in-house AI expertise. We provide full support and training for your team to work with the agents.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
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
