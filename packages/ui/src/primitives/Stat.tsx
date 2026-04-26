'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type StatItem = {
  value: number;
  inlineSuffix?: string; // glyph that scales with the number, e.g. "%"
  unit?: string;         // small word that sits beside, e.g. "weeks"
  label: string;
};

type CountUpProps = {
  value: number;
  startDelay?: number;
  duration?: number;
};

/**
 * CountUp — internal helper that animates a number from 0 to `value`
 * with cubic ease-out. Respects prefers-reduced-motion.
 */
function CountUp({ value, startDelay = 0, duration = 1500 }: CountUpProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }

    setDisplay(0);

    let raf = 0;
    let started = false;
    let startTime = 0;

    const tick = (now: number) => {
      if (!started) {
        startTime = now;
        started = true;
      }
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, startDelay, duration, reduced]);

  return <>{Math.round(display)}</>;
}

/**
 * Stat — single statistic with count-up number + optional unit + label.
 *
 * The number animates from 0 to its target value on mount with a
 * cubic ease-out curve. Use `startDelay` to coordinate with adjacent
 * stats; `StatGroup` handles staggering automatically.
 */
export function Stat({
  value,
  inlineSuffix,
  unit,
  label,
  startDelay = 0,
  duration = 1500,
}: StatItem & { startDelay?: number; duration?: number }) {
  return (
    <div className="ds-stat">
      <div className="ds-stat-value">
        <span className="ds-stat-num tabular-nums">
          <CountUp value={value} startDelay={startDelay} duration={duration} />
          {inlineSuffix}
        </span>
        {unit && <span className="ds-stat-unit">{unit}</span>}
      </div>
      <p className="ds-stat-label">{label}</p>
    </div>
  );
}

type StatGroupProps = {
  stats: StatItem[];
  /** Initial offset before the first stat begins counting (ms). */
  baseDelay?: number;
  /** Time between successive stats starting (ms). */
  stagger?: number;
  className?: string;
  children?: ReactNode;
};

/**
 * StatGroup — renders a row of `Stat` items inside a frosted card.
 * Coordinates the count-up choreography across stats.
 *
 * @example
 *   <StatGroup stats={[
 *     { value: 60, inlineSuffix: '%', label: 'avg cost reduction' },
 *     { value: 30, inlineSuffix: '%', label: 'fewer errors' },
 *     { value: 6, unit: 'weeks', label: 'avg deploy time' },
 *   ]} />
 */
export function StatGroup({
  stats,
  baseDelay = 720,
  stagger = 90,
  className = '',
}: StatGroupProps) {
  return (
    <div className={`ds-stats ${className}`}>
      {stats.map((stat, i) => (
        <Stat
          key={stat.label}
          {...stat}
          startDelay={baseDelay + i * stagger}
        />
      ))}
    </div>
  );
}
