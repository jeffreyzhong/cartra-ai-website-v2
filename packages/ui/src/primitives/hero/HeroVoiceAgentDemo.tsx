'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { WORKFLOW_CYCLE_MS } from './HeroWorkflowAgentDemo';

type Phase = 'call' | 'transcript' | 'tasks' | 'confirmed';
type TranscriptBeat = 0 | 1 | 2 | 3;
type TaskStatus = 'pending' | 'running' | 'completed';

type TaskRow = {
  id: string;
  label: string;
  detail: string;
};

const TASKS: TaskRow[] = [
  { id: 'calendar', label: 'Pull calendar', detail: 'Dr. Martinez' },
  { id: 'slot', label: 'Find open slot', detail: 'Tue · 2:30 PM' },
  { id: 'confirm', label: 'Send confirmation', detail: 'SMS + email' },
];

const PHASE_LABEL: Record<Phase, string> = {
  call: 'On call',
  transcript: 'Listening',
  tasks: 'Booking',
  confirmed: 'Confirmed',
};

const PHASE_PILL: Record<Phase, string> = {
  call: 'ds-hero-agent-pill-voice-call',
  transcript: 'ds-hero-agent-pill-voice-listen',
  tasks: 'ds-hero-agent-pill-voice-tasks',
  confirmed: 'ds-hero-agent-pill-voice-done',
};

type HeroVoiceAgentDemoProps = {
  onCycleComplete?: () => void;
};

/**
 * Voice Agents — inbound call loop: live transcript → task rows → appointment booked.
 * Inspired by beautifului.dev task rows + approval-card patterns.
 */
export function HeroVoiceAgentDemo({ onCycleComplete }: HeroVoiceAgentDemoProps) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('call');
  const [transcriptBeat, setTranscriptBeat] = useState<TranscriptBeat>(0);
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>(
    TASKS.map(() => 'pending'),
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [footnote, setFootnote] = useState('Connecting call…');

  useEffect(() => {
    if (reducedMotion) {
      setPhase('confirmed');
      setTranscriptBeat(3);
      setTaskStatuses(TASKS.map(() => 'completed'));
      setSelectedSlot('Tue · 2:30 PM');
      setFootnote('Avg. booking time · 42s');
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

    const setTaskStatus = (index: number, status: TaskStatus) => {
      setTaskStatuses((prev) => {
        const next = [...prev];
        next[index] = status;
        return next;
      });
    };

    const runCycle = () => {
      setPhase('call');
      setTranscriptBeat(0);
      setTaskStatuses(TASKS.map(() => 'pending'));
      setSelectedSlot(null);
      setFootnote('Connecting call…');

      schedule(() => {
        setPhase('transcript');
        setTranscriptBeat(1);
        setFootnote('Sarah Chen · returning patient');
      }, 900);

      schedule(() => setTranscriptBeat(2), 2100);

      schedule(() => {
        setTranscriptBeat(3);
        setFootnote('Parsing intent · schedule appointment');
      }, 3200);

      schedule(() => {
        setPhase('tasks');
        setTaskStatus(0, 'running');
        setFootnote('Checking provider availability…');
      }, 4200);

      schedule(() => {
        setTaskStatus(0, 'completed');
        setTaskStatus(1, 'running');
      }, 5100);

      schedule(() => {
        setTaskStatus(1, 'completed');
        setSelectedSlot('Tue · 2:30 PM');
        setTaskStatus(2, 'running');
        setFootnote('Sending confirmation…');
      }, 5900);

      schedule(() => {
        setTaskStatus(2, 'completed');
        setPhase('confirmed');
        setFootnote('Avg. booking time · 42s');
      }, 6800);

      schedule(() => {
        onCycleComplete?.();
      }, WORKFLOW_CYCLE_MS);
    };

    runCycle();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion, onCycleComplete]);

  const showCallerLine = transcriptBeat >= 1;
  const showThinking = transcriptBeat >= 2 && transcriptBeat < 3;
  const showAgentLine = transcriptBeat >= 3;
  const showTasks = phase === 'tasks' || phase === 'confirmed';
  const showConfirmed = phase === 'confirmed';

  return (
    <>
      <div className="ds-hero-agent-header">
        <span className="ds-hero-agent-title">Agent · Front desk</span>
        <span className={`ds-hero-agent-pill ${PHASE_PILL[phase]}`}>
          {PHASE_LABEL[phase]}
        </span>
      </div>

      <div className="ds-hero-agent-body">
        <div
          className={`ds-hero-agent-scene ${phase === 'call' ? 'is-active' : ''} has-metric`}
        >
          <div className="ds-hero-voice-call">
            <div className="ds-hero-voice-call-ring">
              <span className="ds-hero-voice-call-icon" aria-hidden>
                ◉
              </span>
              <div className="ds-hero-voice-call-meta">
                <span className="ds-hero-voice-call-label">Incoming call</span>
                <span className="ds-hero-voice-call-name">Sarah Chen</span>
              </div>
            </div>
            <div className="ds-hero-voice-wave" aria-hidden>
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div
          className={`ds-hero-agent-scene ${phase === 'transcript' ? 'is-active' : ''} has-metric`}
        >
          <div className="ds-hero-voice-transcript">
            {showCallerLine && (
              <div className="ds-hero-voice-line ds-hero-voice-line-caller is-visible">
                <span className="ds-hero-chat-role">Caller</span>
                <p>Hi, I&apos;d like to book a cleaning for next Tuesday.</p>
              </div>
            )}

            {showThinking && (
              <div className="ds-hero-chat-trace">
                <span className="ds-hero-chat-thinking-pill">Listening</span>
                <span className="ds-hero-chat-trace-detail">
                  Matching appointment type · dental cleaning
                </span>
              </div>
            )}

            {showAgentLine && (
              <div className="ds-hero-voice-line ds-hero-voice-line-agent is-visible">
                <span className="ds-hero-chat-role">Agent</span>
                <p>Sure — let me check Tuesday availability for you.</p>
              </div>
            )}
          </div>
        </div>

        <div
          className={`ds-hero-agent-scene ${showTasks && !showConfirmed ? 'is-active' : ''} has-metric`}
        >
          <p className="ds-hero-sop-label">Booking steps</p>
          <ul className="ds-hero-voice-task-list">
            {TASKS.map((task, index) => (
              <li
                key={task.id}
                className={`ds-hero-voice-task ${taskStatuses[index] !== 'pending' ? 'is-visible' : ''} is-${taskStatuses[index]}`}
              >
                <span className="ds-hero-voice-task-status" aria-hidden />
                <div className="ds-hero-voice-task-copy">
                  <span className="ds-hero-voice-task-label">{task.label}</span>
                  <span className="ds-hero-voice-task-detail">{task.detail}</span>
                </div>
                <span className="ds-hero-voice-task-badge">
                  {taskStatuses[index] === 'completed'
                    ? 'Done'
                    : taskStatuses[index] === 'running'
                      ? 'Running'
                      : 'Queued'}
                </span>
              </li>
            ))}
          </ul>

          {selectedSlot && (
            <div className="ds-hero-voice-slot is-visible">
              <span className="ds-hero-voice-slot-label">Suggested slot</span>
              <span className="ds-hero-voice-slot-value">{selectedSlot}</span>
            </div>
          )}
        </div>

        <div
          className={`ds-hero-agent-scene ${showConfirmed ? 'is-active' : ''} has-metric`}
        >
          <div className="ds-hero-voice-confirmed is-visible">
            <div className="ds-hero-voice-confirmed-head">
              <span className="ds-hero-voice-confirmed-badge">Booked</span>
              <span className="ds-hero-voice-confirmed-title">Appointment confirmed</span>
            </div>
            <dl className="ds-hero-voice-confirmed-details">
              <div>
                <dt>When</dt>
                <dd>Tuesday, Mar 18 · 2:30 PM</dd>
              </div>
              <div>
                <dt>Service</dt>
                <dd>Dental cleaning · 45 min</dd>
              </div>
              <div>
                <dt>Confirmation</dt>
                <dd>SMS sent to Sarah Chen</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="ds-hero-metric is-visible">
          <div className="ds-hero-metric-head">
            <span>Call duration</span>
            <span className="ds-hero-metric-value">
              {phase === 'confirmed' ? '0:42' : phase === 'call' ? '0:00' : '0:24'}
            </span>
          </div>
          <div className="ds-hero-metric-track">
            <div
              className="ds-hero-metric-fill"
              style={{
                width:
                  phase === 'confirmed'
                    ? '100%'
                    : phase === 'tasks'
                      ? '72%'
                      : phase === 'transcript'
                        ? '38%'
                        : '8%',
              }}
            />
          </div>
          <p className="ds-hero-metric-note">{footnote}</p>
        </div>
      </div>
    </>
  );
}
