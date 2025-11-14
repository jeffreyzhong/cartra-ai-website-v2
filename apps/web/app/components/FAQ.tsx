'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What do we need to get started?",
    answer: "Getting started is simple. We begin with a free consultation call where we discuss your current processes and identify opportunities. If there are opportunities, and we have capacity, we'll provide a detailed ROI projection and implementation plan."
  },
  {
    question: "How customizable are your agents?",
    answer: "Our AI agents are fully customized to your specific workflows, data structures, and business requirements. We build each agent from the ground up to integrate seamlessly with your existing tech stack."
  },
  // {
  //   question: "Are you compliant with our regulations?",
  //   answer: "Yes. We maintain SOC 2 Type II, ISO 27001, GDPR, CCPA, FERPA, and HIPAA-adjacent compliance standards. We can work with your legal team to ensure full compliance with industry-specific regulations."
  // },
  {
    question: "What are typical use cases?",
    answer: "It depends on the industry, but we usually start with the most repetitive and time consuming tasks in your company. Think data entry, document processing, email triaging, customer support, and more."
  },
  {
    question: "Do we need in-house AI talent?",
    answer: "No. Our team handles all AI development, deployment, and maintenance. You don't need any in-house AI expertise. We provide full support and training for your team to work with the agents."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between text-left"
          >
            <p className="text-lg pr-4 font-heading">{faq.question}</p>
            <svg
              className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

