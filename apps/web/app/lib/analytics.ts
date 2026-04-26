'use client';

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
};

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push({
    event: eventName,
    ...params,
  });
  analyticsWindow.gtag?.('event', eventName, params);
}
