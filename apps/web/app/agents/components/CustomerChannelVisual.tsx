'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@repo/ui';

const CHANNELS = ['Voice', 'Chat', 'Email'] as const;

type Channel = (typeof CHANNELS)[number];

export default function CustomerChannelVisual() {
  const reducedMotion = useReducedMotion();
  const [channel, setChannel] = useState<Channel>('Voice');
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setChannel('Email');
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
      setChannel('Voice');
      setBeat(0);
      schedule(() => setBeat(1), 700);
      schedule(() => setBeat(2), 2200);
      schedule(() => {
        setChannel('Chat');
        setBeat(1);
      }, 4000);
      schedule(() => setBeat(2), 5200);
      schedule(() => {
        setChannel('Email');
        setBeat(2);
      }, 6800);
      schedule(() => setBeat(3), 7600);
      schedule(loop, 9800);
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
        <span className="agents-stage-title">Customer thread</span>
        <span className={`agents-pill ${beat >= 3 ? 'agents-pill-done' : 'agents-pill-read'}`}>
          {beat >= 3 ? 'Resolved' : 'Live'}
        </span>
      </div>
      <div className="agents-channel-tabs" aria-hidden>
        {CHANNELS.map((item) => (
          <span
            key={item}
            className={`agents-channel-tab ${item === channel ? 'is-active' : ''}`}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="agents-chat-pane">
        {channel === 'Voice' ? (
          <>
            <div className={`agents-msg is-user ${beat >= 1 ? 'is-visible' : ''}`}>
              <div className="agents-msg-role">Inbound · Maya Chen</div>
              <div className="agents-wave" aria-hidden>
                <span /><span /><span /><span /><span /><span /><span />
              </div>
              <p>Where is shipment 8841 and can we still make Friday delivery?</p>
            </div>
            <div className={`agents-msg is-agent ${beat >= 2 ? 'is-visible' : ''}`}>
              <div className="agents-msg-role">Cartra agent</div>
              <p>8841 cleared customs at 06:14. ETA Friday 2:40pm. Confirmation sent to the consignee.</p>
            </div>
          </>
        ) : null}
        {channel === 'Chat' ? (
          <>
            <div className={`agents-msg is-user ${beat >= 1 ? 'is-visible' : ''}`}>
              <div className="agents-msg-role">Chat · Maya Chen</div>
              <p>Need the commercial invoice and the POD for 8841.</p>
            </div>
            <div className={`agents-msg is-agent ${beat >= 2 ? 'is-visible' : ''}`}>
              <div className="agents-msg-role">Cartra agent</div>
              <p>Attached both from CargoWise. POD signed 11:02. Copied your broker on the thread.</p>
            </div>
          </>
        ) : null}
        {channel === 'Email' ? (
          <>
            <div className={`agents-msg is-agent ${beat >= 2 ? 'is-visible' : ''}`}>
              <div className="agents-msg-role">Email · sent</div>
              <p>Shipment 8841 is on track for Friday. Invoice, POD, and tracking are in this thread.</p>
            </div>
            <div className={`agents-msg is-user ${beat >= 3 ? 'is-visible' : ''}`}>
              <div className="agents-msg-role">Maya Chen</div>
              <p>Received — thanks. Closing this out.</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
