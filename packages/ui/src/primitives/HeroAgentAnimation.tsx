'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SOP_STEPS = [
  'Match invoice to purchase order',
  'Flag amount discrepancies',
  'Route exceptions to AP owner',
];

const CHAT_TOOLS = ['Read invoice.pdf', 'Match PO · NetSuite'];

type Phase = 'sop' | 'chat' | 'learn';
type ChatBeat = 0 | 1 | 2 | 3 | 4;

const PHASE_LABEL: Record<Phase, string> = {
  sop: 'Customizing',
  chat: 'In Slack',
  learn: 'Learning',
};

const PHASE_PILL: Record<Phase, string> = {
  sop: 'ds-hero-agent-pill-sop',
  chat: 'ds-hero-agent-pill-chat',
  learn: 'ds-hero-agent-pill-learn',
};

type HeroAgentAnimationProps = {
  className?: string;
};

/**
 * HeroAgentAnimation — loops SOP customization → chat thread → learned improvement.
 * Scoped timeline pastels; hairline card only (DESIGN.md).
 */
export function HeroAgentAnimation({ className = '' }: HeroAgentAnimationProps) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('sop');
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [chatBeat, setChatBeat] = useState<ChatBeat>(0);
  const [accuracy, setAccuracy] = useState(84);
  const [footnote, setFootnote] = useState('Applying your procedures…');

  useEffect(() => {
    if (reducedMotion) {
      setPhase('learn');
      setVisibleSteps(SOP_STEPS.length);
      setChatBeat(4);
      setAccuracy(99);
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
      setChatBeat(0);
      setAccuracy(84);
      setFootnote('Applying your procedures…');

      SOP_STEPS.forEach((_, index) => {
        schedule(() => setVisibleSteps(index + 1), 350 + index * 420);
      });

      schedule(() => {
        setPhase('chat');
        setChatBeat(1);
      }, 3200);

      schedule(() => setChatBeat(2), 3900);
      schedule(() => setChatBeat(3), 4500);
      schedule(() => setChatBeat(4), 5200);

      schedule(() => {
        setPhase('learn');
        setFootnote('12 runs · cycle time −38%');
        setAccuracy(90);
      }, 6800);

      schedule(() => setAccuracy(95), 7400);
      schedule(() => setAccuracy(99), 8000);

      schedule(runCycle, 11800);
    };

    runCycle();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  const showMetric = phase !== 'chat';
  const showThinking = chatBeat >= 1 && chatBeat < 4;
  const visibleTools = chatBeat >= 2 ? CHAT_TOOLS.slice(0, chatBeat - 1) : [];
  const showResponse = chatBeat >= 4;

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
            className={`ds-hero-agent-scene ${phase === 'sop' ? 'is-active' : ''} ${showMetric ? 'has-metric' : ''}`}
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
            className={`ds-hero-agent-scene ${phase === 'chat' ? 'is-active' : ''}`}
          >
            <div className="ds-hero-chat-thread">
              <div className="ds-hero-chat-user">
                <span className="ds-hero-chat-role">You</span>
                <p>Process this vendor invoice from Acme Supply.</p>
              </div>

              <div className="ds-hero-chat-agent">
                {showThinking && (
                  <div className="ds-hero-chat-trace">
                    <span className="ds-hero-chat-thinking-pill">Thinking</span>
                    <span className="ds-hero-chat-trace-detail">
                      Checking SOP rules for AP intake…
                    </span>
                  </div>
                )}

                {visibleTools.length > 0 && (
                  <div className="ds-hero-chat-tools">
                    {visibleTools.map((tool) => (
                      <span key={tool} className="ds-hero-chat-tool">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                {showResponse && (
                  <div className="ds-hero-chat-response is-visible">
                    <span className="ds-hero-chat-role">Agent</span>
                    <p>
                      Invoice matched to PO #4412. One discrepancy flagged and
                      routed to AP per your SOP.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`ds-hero-agent-scene ${phase === 'learn' ? 'is-active' : ''} has-metric`}
          >
            <ul className="ds-hero-learn-list">
              <li className="ds-hero-learn-row">
                <span className="ds-hero-learn-label">Runs completed</span>
                <span className="ds-hero-learn-value">12</span>
              </li>
              <li className="ds-hero-learn-row">
                <span className="ds-hero-learn-label">Exceptions caught</span>
                <span className="ds-hero-learn-value">38 → 4</span>
              </li>
              <li className="ds-hero-learn-row">
                <span className="ds-hero-learn-label">Cycle time</span>
                <span className="ds-hero-learn-value is-positive">−38%</span>
              </li>
            </ul>
          </div>

          <div className={`ds-hero-metric ${showMetric ? 'is-visible' : ''}`}>
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
