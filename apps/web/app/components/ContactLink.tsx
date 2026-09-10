'use client';

import { trackEvent } from '../lib/analytics';
import { useConsultation } from './ConsultationProvider';

interface ContactLinkProps {
  className?: string;
}

export default function ContactLink({ className }: ContactLinkProps) {
  const open = useConsultation();
  const handleClick = () => {
    trackEvent('consultation_cta_click', {
      cta_location: 'footer_contact',
      cta_text: 'Contact',
    });

    open();
  };

  return (
    <button
      onClick={handleClick}
      aria-haspopup="dialog"
      className={className}
    >
      Contact
    </button>
  );
}

