'use client';

import { trackEvent } from '../lib/analytics';

interface ContactLinkProps {
  className?: string;
}

export default function ContactLink({ className }: ContactLinkProps) {
  const handleClick = () => {
    trackEvent('consultation_cta_click', {
      cta_location: 'footer_contact',
      cta_text: 'Contact',
    });

    if (typeof window !== 'undefined' && (window as unknown as { Calendly?: { initPopupWidget: (opts: { url: string }) => void } }).Calendly) {
      (window as unknown as { Calendly: { initPopupWidget: (opts: { url: string }) => void } }).Calendly.initPopupWidget({
        url: 'https://calendly.com/jeff-cartra/discovery-call',
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      Contact
    </button>
  );
}

