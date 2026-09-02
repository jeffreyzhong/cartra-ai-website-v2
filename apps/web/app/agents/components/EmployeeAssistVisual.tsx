'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@repo/ui';

export default function EmployeeAssistVisual() {
  const reducedMotion = useReducedMotion();
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setBeat(3);
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
      setBeat(0);
      schedule(() => setBeat(1), 500);
      schedule(() => setBeat(2), 2200);
      schedule(() => setBeat(3), 4800);
      schedule(loop, 8200);
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
        <span className="agents-stage-title">Company agent · Slack</span>
        <span className={`agents-pill ${beat >= 3 ? 'agents-pill-grep' : 'agents-pill-edit'}`}>
          {beat >= 3 ? 'Answered' : 'Searching'}
        </span>
      </div>
      <div className="agents-chat-pane">
        <div className={`agents-msg is-user ${beat >= 1 ? 'is-visible' : ''}`}>
          <div className="agents-msg-role">Dana Cole · Ops</div>
          <p>
            @agent What is the exception path when a commercial invoice does not match the packing list?
          </p>
        </div>
        <div className={`agents-msg is-agent ${beat >= 2 ? 'is-visible' : ''}`}>
          <div className="agents-msg-role">Company agent</div>
          <p>
            Hold the filing. Flag quantity and value deltas over 2% to the broker, attach both PDFs, and wait for
            the AP owner in #customs-exceptions. SOP-14, last updated March.
          </p>
        </div>
        {beat >= 3 ? (
          <div className="agents-mini-row" style={{ opacity: 1 }}>
            <span className="agents-pill agents-pill-read">Read</span>
            <span>SOP-14 · SharePoint · 2 sources</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
