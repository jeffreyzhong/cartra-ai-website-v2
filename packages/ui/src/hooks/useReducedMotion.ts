'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true if the user has requested reduced motion via OS settings.
 * Components that drive animation imperatively (e.g. requestAnimationFrame
 * count-ups) should call this hook and skip the animation when true.
 *
 * SSR-safe: returns `false` on initial render, then updates after mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
