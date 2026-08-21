'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SOP_STEPS = [
  'Match invoice to purchase order',
  'Flag amount discrepancies',
  'Route exceptions to AP owner',
];

const TASKS = [
  'Parse vendor invoice',
  'Match PO line items',
  'Post to ERP',
];

type Phase = 'sop' | 'run' | 'learn';
type TaskState = 'pending' | 'running' | 'done';

const PHASE_LABEL: Record<Phase, string> = {
  sop: 'Customizing',
  run: 'Running',
  learn: 'Learning',
};

const PHASE_PILL: Record<Phase, string> = {
  sop: 'ds-hero-agent-pill-sop',
  run: 'ds-hero-agent-pill-run',
  learn: 'ds-hero-agent-pill-learn',
};

type HeroAgentAnimationProps = {
  className?: string;
};

function taskStatusLabel(state: TaskState): string {
  if (state === 'running') return 'Running';
  if (state === 'done') return 'Completed';
  return 'Pending';
}

/**
 * HeroAgentAnimation — loops SOP customization → first run → learned improvement.
 * Scoped timeline pastels; hairline card only (DESIGN.md).
 */
export function HeroAgentAnimation({ className = '' }: HeroAgentAnimationProps) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('sop');
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [taskStates, setTaskStates] = useState<TaskState[]>([
    'pending',
    'pending',
    'pending',
  ]);
  const [accuracy, setAccuracy] = useState(68);
  const [footnote, setFootnote] = useState('Applying your procedures…');

  useEffect(() => {
    if (reducedMotion) {
      setPhase('learn');
      setVisibleSteps(SOP_STEPS.length);
      setTaskStates(['done', 'done', 'done']);
      setAccuracy(94);
      setFootnote('12 runs · cycle time −38%');
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) fn();
        }, ms),
      );
    };

    const runCycle = () => {
      setPhase('sop');
      setVisibleSteps(0);
      setTaskStates(['pending', 'pending', 'pending']);
      setAccuracy(68);
      setFootnote('Applying your procedures…');

      SOP_STEPS.forEach((_, index) => {
        schedule(() => setVisibleSteps(index + 1), 350 + index * 420);
      });

      schedule(() => {
        setPhase('run');
        setFootnote('Run 1 · 3 exceptions flagged');
        setTaskStates(['running', 'pending', 'pending']);
      }, 3200);

      schedule(() => setTaskStates(['done', 'running', 'pending']), 3900);
      schedule(() => setTaskStates(['done', 'done', 'running']), 4600);
      schedule(() => {
        setTaskStates(['done', 'done', 'done']);
        setAccuracy(76);
      }, 5300);

      schedule(() => {
        setPhase('learn');
        setFootnote('12 runs · cycle time −38%');
        setAccuracy(82);
      }, 6200);

      schedule(() => setAccuracy(88), 6800);
      schedule(() => setAccuracy(94), 7400);

      schedule(runCycle, 10800);
    };

    runCycle();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  return (
    <div
      className={`ds-hero-agent-anim ${className}`.trim()}
      aria-hidden
    >
      <div className="ds-hero-agent-panel">
        <div className="ds-hero-agent-header">
          <span className="ds-hero-agent-title">Agent · AP intake</span>
          <span className={`ds-hero-agent-pill ${PHASE_PILL[phase]}`}>
            {PHASE_LABEL[phase]}
          </span>
        </div>

        <div className="ds-hero-agent-body">
          <div
            className={`ds-hero-agent-scene ${phase === 'sop' ? 'is-active' : ''}`}
          >
            <p className="ds-hero-sop-label">Your SOP</p>
            <ul className="ds-hero-sop-list">
              {SOP_STEPS.map((step, index) => (
                <li
                  key={step}
                  className={`ds-hero-sop-step ${index < visibleSteps ? 'is-visible' : ''}`}
                >
                  <span className="ds-hero-sop-index">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`ds-hero-agent-scene ${phase === 'run' || phase === 'learn' ? 'is-active' : ''}`}
          >
            <ul className="ds-hero-task-list">
              {TASKS.map((task, index) => {
                const state = taskStates[index] ?? 'pending';
                return (
                  <li key={task} className="ds-hero-task">
                    <span className={`ds-hero-task-dot ds-hero-task-dot--${state}`} />
                    <span className="ds-hero-task-name">{task}</span>
                    <span className={`ds-hero-task-status ds-hero-task-status--${state}`}>
                      {taskStatusLabel(state)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="ds-hero-metric">
            <div className="ds-hero-metric-head">
              <span>Accuracy</span>
              <span className="ds-hero-metric-value">{accuracy}%</span>
            </div>
            <div className="ds-hero-metric-track">
              <div
                className="ds-hero-metric-fill"
                style={{ width: `${accuracy}%` }}
              />
            </div>
            <p className="ds-hero-metric-note">{footnote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
