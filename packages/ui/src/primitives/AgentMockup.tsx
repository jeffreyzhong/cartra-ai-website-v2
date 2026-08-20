type TimelineStage = 'thinking' | 'grep' | 'read' | 'edit' | 'done';

const DEFAULT_STAGES: { stage: TimelineStage; label: string }[] = [
  { stage: 'thinking', label: 'Thinking' },
  { stage: 'read', label: 'Reading' },
  { stage: 'edit', label: 'Editing' },
  { stage: 'done', label: 'Done' },
];

const DEFAULT_LINES = [
  { text: 'Intake vendor invoice PDF…', muted: true },
  { text: 'Extract line items → ERP fields', muted: false },
  { text: 'Route exception → AP owner', muted: false },
  { text: 'Posted. Cycle time −62%', muted: false },
];

type AgentMockupProps = {
  title?: string;
  className?: string;
};

/**
 * AgentMockup — CSS product visual for hero bands (DESIGN.md).
 * Timeline pastels are scoped inside this component only.
 */
export function AgentMockup({
  title = 'Agent system · AP intake',
  className = '',
}: AgentMockupProps) {
  return (
    <div className={`ds-agent-mockup ${className}`.trim()} aria-hidden>
      <div className="ds-agent-mockup-header">
        <span className="ds-agent-mockup-dot" />
        <span className="ds-agent-mockup-dot" />
        <span className="ds-agent-mockup-dot" />
        <span className="ds-agent-mockup-title">{title}</span>
      </div>
      <div className="ds-agent-mockup-body">
        <div className="ds-agent-pane">
          <div className="ds-agent-timeline">
            {DEFAULT_STAGES.map(({ stage, label }) => (
              <span
                key={stage}
                className={`ds-timeline-pill ds-timeline-pill-${stage}`}
              >
                {label}
              </span>
            ))}
          </div>
          <pre className="ds-agent-code">
            {DEFAULT_LINES.map((line) => (
              <span
                key={line.text}
                className={`ds-agent-code-line ${line.muted ? 'ds-agent-code-muted' : 'ds-agent-code-ink'}`}
              >
                {line.muted ? `// ${line.text}` : `→ ${line.text}`}
              </span>
            ))}
          </pre>
        </div>
        <div className="ds-agent-pane">
          <pre className="ds-agent-code">
            <span className="ds-agent-code-line ds-agent-code-muted">workflow.run</span>
            <span className="ds-agent-code-line ds-agent-code-ink">
              {'  '}status: complete
            </span>
            <span className="ds-agent-code-line ds-agent-code-ink">
              {'  '}systems: NetSuite, Slack
            </span>
            <span className="ds-agent-code-line ds-agent-code-ink">
              {'  '}exceptions: 0
            </span>
            <span className="ds-agent-code-line ds-agent-code-muted">
              {'  '}# human-in-the-loop: approval gate
            </span>
          </pre>
        </div>
      </div>
    </div>
  );
}
