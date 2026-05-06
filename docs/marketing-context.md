# Cartra Marketing Context

This is the neutral, repo-owned source of truth for Cartra brand, marketing, and SEO context. It is not specific to any LLM or agent.

## Product Positioning

Cartra designs and deploys custom AI agents for mid-market operations teams. The agents run operational workflows on top of the software a team already uses, with a focus on measurable time savings, fewer manual errors, and production deployment in weeks.

Approved homepage hero:

> We transform your business with AI customized to how you work.

Approved homepage subheading:

> Cartra designs and deploys custom AI agents that run operational workflows on top of the software your team already uses. Multiply productivity, reduce manual work, and launch in weeks.

## Brand Assets

- Approved logo and favicon asset: `apps/web/public/cartra_geometric_logo_round.png`
- Do not replace, redraw, generate, or reinterpret the Cartra logo without explicit approval.
- It is fine to fix broken references to the approved asset. It is not fine to substitute a new visual mark.

## SEO Context

Ahrefs project:

- Project name: `Cartra`
- Project ID: `9741768`
- Target: `cartra.ai/`
- Protocol: `both`
- Mode: `subdomains`

Primary SEO pages:

- `/`
- `/agent-systems`
- `/agent-systems/customs-document-ops`
- `/agent-systems/procurement-vendor-ops`
- `/agent-systems/company-knowledge-base`
- `/agent-systems/ar-reconciliation`
- `/agent-systems/ap-intake-approval`
- `/agent-systems/sales-ops-hygiene`
- `/ai-agent-development-company`
- `/ai-automation-agency`
- `/ai-workflow-automation`
- `/case-studies`

Priority keywords:

- `cartra`
- `custom ai agents`
- `ai agent development company`
- `ai automation agency`
- `ai workflow automation`
- `document processing ai`
- `ai agents for logistics`

## SEO Operations

Live checks after deploy:

- `https://www.cartra.ai/robots.txt` should include `Sitemap: https://www.cartra.ai/sitemap.xml`.
- `https://www.cartra.ai/sitemap.xml` should return `200` and include all primary SEO pages.
- Ahrefs Site Audit data may lag production. Compare the latest crawl timestamp against the latest deployment before treating missing sitemap/canonical data as current.

When auditing with Ahrefs:

- Confirm the Cartra project target is `cartra.ai/`, protocol `both`, mode `subdomains`.
- Confirm the latest crawl happened after the deployment being evaluated.
- Confirm Page Explorer discovers sitemap URLs after a fresh crawl.
- If Ahrefs reports old titles, missing canonicals, or `is_in_sitemap: false`, first verify whether the crawl predates the current deployment.

## Implementation Preferences

- Preserve brand-led homepage copy unless explicitly asked to optimize copy for SEO.
- Keep SEO improvements in metadata, schema, internal links, and dedicated landing pages before making homepage copy feel keyword-stuffed.
- Favor the approved PNG logo for favicon/navigation unless a real brand-approved SVG is provided.

## Public Copy Safety

- Raw SEO research is planning input only. Do not render Ahrefs data, search-volume metrics, keyword difficulty, CPC, target-keyword labels, or research notes in public page UI.
- When removing exposed internal copy, replace it with context-specific customer-facing copy. Do not leave a page section hollow or abrupt.
- Keep draft status, future-content plans, outreach strategy, partner-mention notes, and content-brief language out of app-rendered pages.
- Metadata and schema may be SEO-aware, but visible text must read naturally to customers.
- Run `pnpm check:public-copy` before merging website-copy changes.
