'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { HeroAgentAnimation } from '@repo/ui';

const DESKTOP_QUERY = '(min-width: 1024px)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

const getSnapshot = () => window.matchMedia(DESKTOP_QUERY).matches;
const getServerSnapshot = () => true;

type HeroPanelSlotProps = {
  placement: 'desktop' | 'mobile';
  className?: string;
};

/**
 * HeroPanelSlot — mounts the hero agent demo in exactly one place.
 *
 * Desktop: beside the hero copy. Below lg: after the explainer reel, so the
 * reel can peek above the fold. HeroAgentAnimation hard-codes its tab ids and
 * runs its own timers, so it must never mount twice.
 */
export default function HeroPanelSlot({ placement, className }: HeroPanelSlotProps) {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const active = placement === 'desktop' ? isDesktop : !isDesktop;
  const mountsAfterHydration = placement === 'mobile' && active;

  // The mobile slot is empty in the server HTML, so mounting it shifts every
  // section below. Re-land a direct /#anchor load once it has mounted.
  useEffect(() => {
    // Only for the initial load, not later breakpoint swaps.
    if (!mountsAfterHydration || !window.location.hash || performance.now() > 10000) return;
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (!target) return;
    const frame = requestAnimationFrame(() => target.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [mountsAfterHydration]);

  return active ? <HeroAgentAnimation className={className} /> : null;
}
