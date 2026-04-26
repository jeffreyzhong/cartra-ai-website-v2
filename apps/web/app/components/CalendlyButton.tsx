'use client';

import type { ReactNode } from 'react';
import { Button } from '@repo/ui';
import { trackEvent } from '../lib/analytics';

type CalendlyButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  trailingIcon?: ReactNode;
  className?: string;
  eventLocation?: string;
};

const CALENDLY_URL = 'https://calendly.com/jeff-cartra/discovery-call';

/**
 * Wraps the design system Button with the Calendly popup trigger.
 * Use this anywhere a "book a call" CTA is needed.
 */
export default function CalendlyButton({
  children,
  variant = 'primary',
  trailingIcon,
  className,
  eventLocation = 'site',
}: CalendlyButtonProps) {
  const handleClick = () => {
    trackEvent('consultation_cta_click', {
      cta_location: eventLocation,
      cta_text: typeof children === 'string' ? children : 'Calendly CTA',
    });

    if (typeof window !== 'undefined' && (window as unknown as { Calendly?: { initPopupWidget: (opts: { url: string }) => void } }).Calendly) {
      (window as unknown as { Calendly: { initPopupWidget: (opts: { url: string }) => void } }).Calendly.initPopupWidget({
        url: CALENDLY_URL,
      });
    }
  };

  return (
    <Button onClick={handleClick} variant={variant} trailingIcon={trailingIcon} className={className}>
      {children}
    </Button>
  );
}
