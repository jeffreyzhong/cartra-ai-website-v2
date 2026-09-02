'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@repo/ui';

const FEATURES = [
  {
    id: 'channels',
    name: 'Across channels and modalities',
    body: 'Voice, chat, email, documents, and any other channel the work comes through. Agents work across all of them.',
  },
  {
    id: 'complexity',
    name: 'Handles real complexity',
    body: 'Multi-step procedures, exception paths, approvals, and the messy edge cases that break simple automation.',
  },
  {
    id: 'integrated',
    name: 'Fully integrated',
    body: 'Agents run inside the stack you already operate — ERP, CRM, email, Slack, and the custom tools around them.',
  },
  {
    id: 'knowledge',
    name: 'Grounded in organizational knowledge',
    body: 'SOPs, tariff rules, vendor lists, and tribal knowledge become the operating manual the agent actually follows.',
  },
  {
    id: 'tested',
    name: 'Tested before it ships',
    body: 'Evaluated against real historical cases before it touches production work. Failures route to a human, not a guess.',
  },
] as const;

type FeatureId = (typeof FEATURES)[number]['id'];

const SYSTEMS = [
  'NetSuite',
  'Salesforce',
  'Slack',
  'Outlook',
  'CargoWise',
  'QuickBooks',
  'SharePoint',
  'Zendesk',
];

const EVALS = [
  { name: 'Invoice matches PO', result: 'pass', meta: '48/50' },
  { name: 'Packing-list quantity check', result: 'pass', meta: '50/50' },
  { name: 'Broker exception routing', result: 'review', meta: '2 held' },
  { name: 'ERP posting schema', result: 'pass', meta: '50/50' },
] as const;

function ChannelsScene({ active }: { active: boolean }) {
  const channels = ['Voice', 'Chat', 'Email', 'Documents', 'Slack'];
  return (
    <div className="agents-chip-row">
      {channels.map((channel, index) => (
        <span
          key={channel}
          className={`agents-sys-chip ${active ? 'is-visible' : ''}`}
          style={{ animationDelay: `${index * 90}ms` }}
        >
          {channel}
        </span>
      ))}
    </div>
  );
}

function ComplexityScene() {
  return (
    <div className="agents-branch">
      <div className="agents-branch-node">Work arrives · commercial invoice + packing list</div>
      <div className="agents-branch-node">Classify documents · extract line items · score confidence</div>
      <div className="agents-branch-fork">
        <div className="agents-branch-node">
          <span className="agents-pill agents-pill-done">Post</span>
          <div style={{ marginTop: 8 }}>Match ≥ 98% · write to NetSuite</div>
        </div>
        <div className="agents-branch-node">
          <span className="agents-pill agents-pill-thinking">Exception</span>
          <div style={{ marginTop: 8 }}>Route to broker in Slack</div>
        </div>
      </div>
    </div>
  );
}

function IntegratedScene({ active }: { active: boolean }) {
  return (
    <div className="agents-chip-row">
      {SYSTEMS.map((system, index) => (
        <span
          key={system}
          className={`agents-sys-chip ${active ? 'is-visible' : ''}`}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {system}
        </span>
      ))}
    </div>
  );
}

function KnowledgeScene() {
  return (
    <div className="agents-run-panel">
      {[
        { label: 'SOP-14 Exception handling', meta: 'SharePoint' },
        { label: 'Preferred broker map', meta: 'Drive' },
        { label: 'Tariff notes · Q1', meta: 'Confluence' },
        { label: 'Vendor master aliases', meta: 'NetSuite' },
      ].map((row) => (
        <div key={row.label} className="agents-run-row is-visible">
          <span className="agents-run-label">{row.label}</span>
          <span className="agents-run-meta">{row.meta}</span>
        </div>
      ))}
    </div>
  );
}

function TestedScene() {
  return (
    <div style={{ padding: 20 }}>
      <div className="agents-stage-title" style={{ marginBottom: 12 }}>
        Eval set · 50 historical filings
      </div>
      {EVALS.map((row) => (
        <div key={row.name} className="agents-eval-row">
          <span>{row.name}</span>
          <span className={row.result === 'pass' ? 'agents-eval-pass' : 'agents-eval-review'}>
            {row.result}
          </span>
          <span className="agents-run-meta">{row.meta}</span>
        </div>
      ))}
    </div>
  );
}

function FeatureVisual({ id, active }: { id: FeatureId; active: boolean }) {
  switch (id) {
    case 'channels':
      return <ChannelsScene active={active} />;
    case 'complexity':
      return <ComplexityScene />;
    case 'integrated':
      return <IntegratedScene active={active} />;
    case 'knowledge':
      return <KnowledgeScene />;
    case 'tested':
      return <TestedScene />;
    default:
      return null;
  }
}

export default function EnterpriseWorkPanel() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<FeatureId>('channels');

  useEffect(() => {
    if (reducedMotion) return undefined;

    const id = window.setInterval(() => {
      setActive((current) => {
        const index = FEATURES.findIndex((feature) => feature.id === current);
        return FEATURES[(index + 1) % FEATURES.length]?.id ?? 'channels';
      });
    }, 5200);

    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const activeFeature = FEATURES.find((feature) => feature.id === active) ?? FEATURES[0];

  return (
    <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-14 items-start">
      <div>
        {FEATURES.map((feature) => {
          const isActive = feature.id === active;
          return (
            <button
              key={feature.id}
              type="button"
              className={`agents-feature-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setActive(feature.id)}
              aria-pressed={isActive}
            >
              <span className="agents-feature-name">{feature.name}</span>
              <span className="agents-feature-body">
                <p>{feature.body}</p>
              </span>
            </button>
          );
        })}
      </div>

      <div className="agents-enterprise-visual" aria-live="polite">
        <div className="agents-stage-header">
          <span className="agents-stage-title">{activeFeature.name}</span>
          <span className="agents-pill agents-pill-read">Live</span>
        </div>
        <FeatureVisual key={active} id={active} active />
      </div>
    </div>
  );
}
