'use client';

interface CalendlyButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function CalendlyButton({ children, className }: CalendlyButtonProps) {
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
      {children}
    </button>
  );
}

