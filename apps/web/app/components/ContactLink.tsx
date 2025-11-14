'use client';

interface ContactLinkProps {
  className?: string;
}

export default function ContactLink({ className }: ContactLinkProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({url: 'https://calendly.com/jeff-cartra/30min'});
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

