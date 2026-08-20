# Cartra UI Update Plan (DESIGN.md)

**Status:** Implemented — live tokens, primitives, and marketing routes follow `DESIGN.md`.  
**Source of truth:** [`DESIGN.md`](../DESIGN.md) (installed via `npx getdesign@latest add cursor`, adapted for Cartra).  
**Governance:** All future UI work must read and follow `DESIGN.md` before writing UI (see `.cursor/rules/design-system.mdc`).

---

## Why this plan exists

Cartra’s design system in `packages/ui` and marketing surfaces in `apps/web` now follow `DESIGN.md`: warm cream canvas, warm ink, **single orange CTA voltage**, display at **weight 400**, **hairline-only depth**, and 80px section rhythm. This document records the migration that got us here.

---

## Doc roles (do not conflate)

| Doc | Role |
|---|---|
| `DESIGN.md` | **Visual** tokens, type, components, do/don’t — canonical for UI |
| `docs/marketing-context.md` | Positioning, approved copy, logo path, SEO |
| `.impeccable.md` | Audience, JTBD, brand personality — **visual sections superseded by DESIGN.md** |

---

## Current → target gap

### Color

| Concern | Current (`packages/ui` tokens) | Target (`DESIGN.md`) |
|---|---|---|
| Page floor | Cool `#FCFCFE` (`--c-bg`) | Warm cream `#f7f7f4` (`colors.canvas`) |
| Primary CTA | Navy fill (`--c-navy` on `.ds-btn-primary`) | Orange `#f54e00` (`colors.primary`) |
| Brand accent | Cobalt `#3E6AEF` (`--c-accent`) for eyebrows/links | Orange scarce; ink for secondary; no cobalt as brand voltage |
| Statement panels | Navy + peach color blocks | Drop as brand system; cream canvas + white cards + optional ink-inverted featured card |
| Borders / depth | Soft borders + drop shadows | 1px hairlines only; **no shadows** |
| Text | Navy-tinted `#1C2A44` | Warm ink `#26251e` / body `#5a5852` |

### Typography

| Concern | Current | Target |
|---|---|---|
| Display weight | 600 on `.ds-display` | **400** with negative tracking |
| Families | Geist + Source Serif 4 | Single sans (Geist/Inter as CursorGothic substitute); JetBrains Mono on code/agent panes |
| Scale | Fluid clamps up to ~4.5rem | Tokenized sizes (mega 72 → mobile 32; lg 36; etc.) |

### Components / layout

| Concern | Current | Target |
|---|---|---|
| Buttons | Primary navy + ghost; pill-ish radius | Primary orange 8px radius; secondary white + hairline; tertiary text |
| Cards | Frosted / panel / navy + blur + shadow | White card on cream, `rounded.lg` (12px), hairline border |
| Section rhythm | Mixed `py-10`–`py-28` | Prefer `{spacing.section}` **80px** |
| Atmosphere | `Mesh` gradient backdrop | Cream canvas; product/agent mockups as visual anchor — not mesh as brand signature |
| Hero | Brand + headline + body + CTAs + **stats + founder logos** in first viewport | Tighten toward brand + one headline + one sentence + CTA group + one dominant visual (stats/logos move below fold or into later bands) |

### Keep unchanged unless asked

- Approved logo asset and favicon path
- Homepage hero/subhead copy from `docs/marketing-context.md`
- SEO metadata, schema, analytics wiring
- Calendly / contact flows (restyle only)

---

## Implementation phases

### Phase 0 — Governance (this PR)

- [x] Install Cursor design kit → `DESIGN.md`
- [x] Cartra application notes in `DESIGN.md`
- [x] Cursor rule: future UI must follow `DESIGN.md`
- [x] This plan document
- [x] Mark `.impeccable.md` aesthetic sections as superseded (pointer to `DESIGN.md`)
- [x] Resolve directive conflicts: strip Retell/Ramp pixel mandates from `.impeccable.md`; mark `packages/ui` comments as legacy pending Phase 1–2

### Phase 1 — Token remap (`packages/ui`) — done

Single source: `packages/ui/src/styles/tokens.css` (+ `tailwind-preset.ts`).

1. [x] Remap semantic CSS vars to DESIGN.md hex
2. [x] Add timeline pastel tokens (used in AgentMockup)
3. [x] Align radius scale to DESIGN.md (`md` 8px CTAs, `lg` 12px cards)
4. [x] Align spacing with 4px base; `--space-section: 80px`
5. [x] Remove shadows from component styles

### Phase 2 — Primitive restyle (`packages/ui` CSS + components) — done

1. [x] Button — orange primary, secondary hairline, ghost tertiary
2. [x] Display — weight 400
3. [x] Eyebrow — caption-uppercase muted/ink
4. [x] Card — white hairline; featured ink inversion
5. [x] Body / LogoPill / Stat — body color + soft chips
6. [x] Mesh — no-op deprecated
7. [x] JetBrains Mono + AgentMockup

### Phase 3 — Marketing surfaces (`apps/web`) — done

1. [x] Homepage hero + AgentMockup; stats/logos below fold
2. [x] Navigation, FAQ, contact chrome
3. [x] CommercialLandingPage + SEO landings
4. [x] Agent systems list + detail + AgentSystems
5. [x] Case studies, jeff

### Phase 4 — Signature agent visuals — done

1. [x] AgentMockup with cream-soft panes + JetBrains Mono
2. [x] Timeline pastel pills scoped inside mockup only

### Phase 5 — Cleanup & docs

1. [x] Accent aliases point to primary; navy aliases to ink for featured only
2. [x] `.impeccable.md` aesthetics removed earlier
3. [x] This plan marked implemented
4. [ ] Smoke: lint, typecheck, key pages

---

## Risk & conflict notes

1. **Accent flip is highly visible** — navy/cobalt → orange will feel like a rebrand; ship tokens + buttons together so states stay coherent.
2. **`.impeccable.md` vs `DESIGN.md`** — agents must prefer `DESIGN.md` for pixels; keep impeccable for audience/tone only.
3. **Hero density** — current homepage packs stats into the first viewport; DESIGN.md + Cartra frontend composition rules both push those below the fold.
4. **Licensed type** — do not ship CursorGothic; Geist/Inter at 400 is the approved substitute.
5. **Third-party widgets** — Calendly/analytics chrome may not match orange; do not extract CTA color from those widgets (`DESIGN.md` Don’t).

---

## Suggested first implementation PR (after this plan)

1. Phase 1 token remap + Phase 2 Button/Display/Card/Eyebrow.  
2. Homepage + Navigation only.  
3. Visual diff + a11y contrast check on orange CTA vs cream.  
4. Follow-up PRs for remaining routes.

---

## Quick reference — non-negotiables from DESIGN.md

- Cream canvas, not pure white page floor.
- Orange `#f54e00` only for primary CTAs (scarce).
- Display weight **400**, never bold display.
- Hairlines only — **no drop shadows**.
- Timeline pastels only in agent visualizations.
- Read `DESIGN.md` before any UI change.
