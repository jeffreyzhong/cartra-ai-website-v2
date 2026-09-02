'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@repo/ui';

const NODES = [
  { id: 'voice', label: 'Voice', kicker: 'Call', x: '18%', y: '28%' },
  { id: 'chat', label: 'Chat', kicker: 'Inbox', x: '82%', y: '28%' },
  { id: 'email', label: 'Email', kicker: 'Thread', x: '12%', y: '62%' },
  { id: 'docs', label: 'Documents', kicker: 'PDF', x: '88%', y: '62%' },
  { id: 'slack', label: 'Slack', kicker: 'Ops', x: '50%', y: '84%' },
] as const;

const LOG_LINES = [
  { text: '// work arriving from email + documents', muted: true },
  { text: '→ classify commercial invoice · 0.98', muted: false },
  { text: '→ match packing list · NetSuite PO-4412', muted: false },
  { text: '→ posted. exception queue: 0', muted: false },
] as const;

const PILL_CLASS = {
  thinking: 'agents-pill-thinking',
  read: 'agents-pill-read',
  edit: 'agents-pill-edit',
  done: 'agents-pill-done',
} as const;

const PILL_LABEL = {
  thinking: 'Thinking',
  read: 'Reading',
  edit: 'Editing',
  done: 'Done',
} as const;

type Pill = keyof typeof PILL_CLASS;

export default function AgentsHeroVisual() {
  const reducedMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState(0);
  const [pill, setPill] = useState<Pill>('thinking');
  const [visibleLines, setVisibleLines] = useState(1);

  useEffect(() => {
    if (reducedMotion) {
      setActiveNode(2);
      setPill('done');
      setVisibleLines(LOG_LINES.length);
      return undefined;
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

    const loop = () => {
      setActiveNode(0);
      setPill('thinking');
      setVisibleLines(1);

      NODES.forEach((_, index) => {
        schedule(() => setActiveNode(index), 700 + index * 900);
      });

      schedule(() => setPill('read'), 1800);
      schedule(() => setVisibleLines(2), 2200);
      schedule(() => setPill('edit'), 3800);
      schedule(() => setVisibleLines(3), 4200);
      schedule(() => setPill('done'), 6200);
      schedule(() => setVisibleLines(4), 6600);
      schedule(loop, 9800);
    };

    loop();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  return (
    <div className="agents-stage" aria-hidden>
      <div className="agents-stage-header">
        <span className="agents-stage-title">Cartra Agents · Platform</span>
        <span className="agents-live">
          <span className="agents-live-dot" />
          Live
        </span>
      </div>

      <div className="agents-hero-canvas">
        <svg className="agents-hero-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line className={`agents-hero-line ${activeNode >= 0 ? 'is-live' : ''}`} x1="18" y1="28" x2="50" y2="46" />
          <line className={`agents-hero-line ${activeNode >= 1 ? 'is-live' : ''}`} x1="82" y1="28" x2="50" y2="46" />
          <line className={`agents-hero-line ${activeNode >= 2 ? 'is-live' : ''}`} x1="12" y1="62" x2="50" y2="46" />
          <line className={`agents-hero-line ${activeNode >= 3 ? 'is-live' : ''}`} x1="88" y1="62" x2="50" y2="46" />
          <line className={`agents-hero-line ${activeNode >= 4 ? 'is-live' : ''}`} x1="50" y1="84" x2="50" y2="58" />
        </svg>

        {NODES.map((node, index) => (
          <div
            key={node.id}
            className={`agents-node ${index <= activeNode ? 'is-active' : ''}`}
            style={{ left: node.x, top: node.y }}
          >
            <span className="agents-node-kicker">{node.kicker}</span>
            <span className="agents-node-label">{node.label}</span>
          </div>
        ))}

        <div className="agents-hero-center">
          <div className="agents-hero-center-name">Customs document agent</div>
          <div className="agents-hero-center-meta">Running inside NetSuite · Slack · Outlook</div>
          <div className="agents-hero-pills">
            <span className={`agents-pill ${PILL_CLASS[pill]}`}>{PILL_LABEL[pill]}</span>
          </div>
        </div>
      </div>

      <div className="agents-hero-log agents-mono">
        {LOG_LINES.map((line, index) => (
          <span
            key={line.text}
            className={`agents-hero-log-line ${index < visibleLines ? 'is-visible' : ''} ${line.muted ? 'is-muted' : ''}`}
          >
            {line.text}
          </span>
        ))}
      </div>
    </div>
  );
}
