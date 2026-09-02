'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@repo/ui';

const TOOLS = [
  { group: 'Logic', glyph: '→', label: 'Trigger an agent' },
  { group: 'Actions', glyph: 'ƒ', label: 'Call a function' },
  { group: 'Actions', glyph: '▤', label: 'Read / write a table' },
  { group: 'Actions', glyph: '{}', label: 'Use an MCP tool' },
  { group: 'Actions', glyph: '✦', label: 'Use a model' },
] as const;

const RUN = [
  { label: 'Invoice PDF received', meta: 'inbox' },
  { label: 'Line items extracted', meta: '12 fields' },
  { label: 'Matched to PO-4412', meta: 'NetSuite' },
  { label: 'Posted to GL', meta: 'done' },
] as const;

type Phase = 'menu' | 'run';

export default function WorkAutomationVisual() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('menu');
  const [visibleTools, setVisibleTools] = useState(0);
  const [activeTool, setActiveTool] = useState(0);
  const [visibleRuns, setVisibleRuns] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setPhase('run');
      setVisibleTools(TOOLS.length);
      setActiveTool(0);
      setVisibleRuns(RUN.length);
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
      setPhase('menu');
      setVisibleTools(0);
      setActiveTool(-1);
      setVisibleRuns(0);

      TOOLS.forEach((_, index) => {
        schedule(() => setVisibleTools(index + 1), 280 + index * 220);
      });
      schedule(() => setActiveTool(0), 1600);
      schedule(() => {
        setPhase('run');
        setVisibleRuns(1);
      }, 2400);
      RUN.forEach((_, index) => {
        schedule(() => setVisibleRuns(index + 1), 2800 + index * 700);
      });
      schedule(loop, 7200);
    };

    loop();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  return (
    <div className="agents-card-visual">
      <div className="agents-stage-header">
        <span className="agents-stage-title">Manual run · Trigger</span>
        <span className={`agents-pill ${phase === 'run' ? 'agents-pill-done' : 'agents-pill-thinking'}`}>
          {phase === 'run' ? 'Running' : 'Idle'}
        </span>
      </div>
      {phase === 'menu' ? (
        <div className="agents-tool-menu">
          {TOOLS.map((tool, index) => {
            const showGroup = index === 0 || tool.group !== TOOLS[index - 1]?.group;
            return (
              <div key={tool.label}>
                {showGroup ? <div className="agents-tool-group">{tool.group}</div> : null}
                <div
                  className={`agents-tool-row ${index < visibleTools ? 'is-visible' : ''} ${index === activeTool ? 'is-active' : ''}`}
                >
                  <span className="agents-tool-glyph">{tool.glyph}</span>
                  {tool.label}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="agents-run-panel">
          {RUN.map((row, index) => (
            <div
              key={row.label}
              className={`agents-run-row ${index < visibleRuns ? 'is-visible' : ''}`}
            >
              <span className="agents-run-label">{row.label}</span>
              <span className="agents-run-meta">{row.meta}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
