'use client';

import { useState, type ReactNode } from 'react';
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
const CALENDLY_SCRIPT_ID = 'calendly-widget-js';
const CALENDLY_CSS_ID = 'calendly-widget-css';
const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_CSS_HREF = 'https://assets.calendly.com/assets/external/widget.css';

type CalendlyWindow = Window & {
  Calendly?: {
    initPopupWidget: (opts: { url: string }) => void;
  };
};

function loadCalendlyAssets() {
  if (typeof window === 'undefined') return Promise.resolve();

  if (!document.getElementById(CALENDLY_CSS_ID)) {
    const link = document.createElement('link');
    link.id = CALENDLY_CSS_ID;
    link.href = CALENDLY_CSS_HREF;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  const existing = document.getElementById(CALENDLY_SCRIPT_ID);
  if (existing) {
    return (window as CalendlyWindow).Calendly
      ? Promise.resolve()
      : new Promise<void>((resolve, reject) => {
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', () => reject(new Error('Calendly failed to load')), { once: true });
        });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.id = CALENDLY_SCRIPT_ID;
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Calendly failed to load'));
    document.body.appendChild(script);
  });
}

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
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    trackEvent('consultation_cta_click', {
      cta_location: eventLocation,
      cta_text: typeof children === 'string' ? children : 'Calendly CTA',
    });

    try {
      setIsLoading(true);
      await loadCalendlyAssets();
      const calendly = (window as CalendlyWindow).Calendly;
      if (!calendly) throw new Error('Calendly unavailable');
      calendly.initPopupWidget({
        url: CALENDLY_URL,
      });
    } catch {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      trailingIcon={trailingIcon}
      className={className}
      disabled={isLoading}
    >
      {children}
    </Button>
  );
}
