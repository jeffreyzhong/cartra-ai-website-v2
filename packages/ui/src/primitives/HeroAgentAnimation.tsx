'use client';

import { useCallback, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { HeroWorkflowAgentDemo } from './hero/HeroWorkflowAgentDemo';
import { HeroVoiceAgentDemo } from './hero/HeroVoiceAgentDemo';

export type HeroAgentTab = 'workflow' | 'voice';

const TABS: { id: HeroAgentTab; label: string }[] = [
  { id: 'workflow', label: 'Workflow Agents' },
  { id: 'voice', label: 'Voice Agents' },
];

type HeroAgentAnimationProps = {
  className?: string;
};

/**
 * HeroAgentAnimation — tabbed product demos that auto-cycle after each full loop.
 * Scoped timeline pastels; hairline card only (DESIGN.md).
 */
export function HeroAgentAnimation({ className = '' }: HeroAgentAnimationProps) {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<HeroAgentTab>('workflow');
  const [cycleKey, setCycleKey] = useState(0);

  const handleCycleComplete = useCallback(() => {
    if (reducedMotion) return;

    setActiveTab((current) => (current === 'workflow' ? 'voice' : 'workflow'));
    setCycleKey((key) => key + 1);
  }, [reducedMotion]);

  const handleTabSelect = useCallback((tabId: HeroAgentTab) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    setCycleKey((key) => key + 1);
  }, [activeTab]);

  return (
    <div className={`ds-hero-agent-anim ${className}`.trim()}>
      <div className="ds-hero-agent-panel">
        <div className="ds-hero-agent-tabs" role="tablist" aria-label="Agent demos">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`hero-agent-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls="hero-agent-tabpanel"
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`ds-hero-agent-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => handleTabSelect(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          key={`${activeTab}-${cycleKey}`}
          id="hero-agent-tabpanel"
          role="tabpanel"
          aria-labelledby={`hero-agent-tab-${activeTab}`}
          className="ds-hero-agent-tabpanel"
        >
          {activeTab === 'workflow' ? (
            <HeroWorkflowAgentDemo onCycleComplete={handleCycleComplete} />
          ) : (
            <HeroVoiceAgentDemo onCycleComplete={handleCycleComplete} />
          )}
        </div>
      </div>
    </div>
  );
}
