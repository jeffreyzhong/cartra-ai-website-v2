'use client';

import { useEffect } from 'react';

export default function CalendlyScripts() {
  useEffect(() => {
    // Add Calendly CSS if not already added
    const linkId = 'calendly-widget-css';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  return null;
}

