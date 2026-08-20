# Cartra UI Update Plan (DESIGN.md)

**Status:** Plan only — no visual implementation in this PR.  
**Source of truth:** [`DESIGN.md`](../DESIGN.md) (installed via `npx getdesign@latest add cursor`, adapted for Cartra).  
**Governance:** All future UI work must read and follow `DESIGN.md` before writing UI (see `.cursor/rules/design-system.mdc`).

---

## Why this plan exists

Cartra’s live system (`packages/ui`) still encodes the older Retell-inspired direction: cool off-white, cobalt primary, navy CTAs, peach/navy statement panels, frosted cards with shadows, and heavier display weights. `DESIGN.md` defines a different system: warm cream canvas, warm ink, **single orange CTA voltage**, display at **weight 400**, **hairline-only depth**, and 80px section rhythm.

This plan maps that gap and sequences the work so tokens move first, then primitives, then pages — without breaking brand copy or the approved logo.

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

### Phase 1 — Token remap (`packages/ui`)

Single source: `packages/ui/src/styles/tokens.css` (+ `tailwind-preset.ts`).

1. Remap semantic CSS vars to DESIGN.md hex (or equivalent oklch):
   - `--c-bg` → canvas `#f7f7f4`
   - `--c-text` → ink `#26251e`
   - Body/muted/hairline tokens aligned to `colors.body`, `muted`, `hairline*`
   - `--c-accent` / primary CTA → `#f54e00` / `#d04200` (retire cobalt as primary)
2. Add timeline pastel tokens (scoped; unused until Phase 4 mockups).
3. Align radius scale to DESIGN.md (`md` 8px CTAs, `lg` 12px cards); stop using pill radius for primary buttons.
4. Align spacing with 4px base; expose `--space-section: 80px`.
5. Remove or neutralize shadow tokens/utilities used by components.

**Exit criteria:** Token file documents DESIGN.md mapping; no cobalt/navy/peach as required brand accents.

### Phase 2 — Primitive restyle (`packages/ui` CSS + components)

Update `components.css` and primitives without changing page IA:

1. **Button** — `primary` = orange CTA; add secondary (white + hairline); keep ghost as tertiary text. Height 40px, padding 10×18, radius 8px. No hover shadow.
2. **Display** — weight 400; tracking per size; drop bold section titles.
3. **Eyebrow** — uppercase caption tracking (`caption-uppercase`); ink/muted, not cobalt.
4. **Card** — default white + hairline; deprecate frosted blur and navy statement surfaces (or map navy → ink-inverted featured card only where needed).
5. **Body / LogoPill / Stat** — body color `#5a5852`; logo pills as soft surface-strong chips, not competing accents.
6. **Mesh** — remove from marketing pages or replace with cream-only `Surface` (no aurora mesh as brand floor).
7. Load **JetBrains Mono** for `.ds-code` / agent panes when introduced.

**Exit criteria:** Story-level primitives match DESIGN.md do/don’t (scarce orange, no shadows, weight 400 display).

### Phase 3 — Marketing surfaces (`apps/web`)

Order by traffic / SEO importance:

1. Homepage (`app/page.tsx`) — tokens via primitives; then hero composition (move stats / founder strip out of first viewport).
2. Shared chrome — `Navigation`, footer, global CTA bands.
3. Commercial landings — `CommercialLandingPage`, SEO pages (`ai-agent-development-company`, etc.).
4. Agent systems — list + `[slug]` + `AgentSystems`.
5. Supporting — FAQ, case studies, jeff, contact components.

**Rules while migrating:**

- Follow `DESIGN.md` component recipes (`hero-band`, `feature-card`, `cta-band`, `testimonial-card`).
- Do not invent a second accent.
- Preserve copy and logo per marketing context.
- Prefer one job per section; avoid card-for-decoration.

**Exit criteria:** Visual QA checklist pass on desktop + mobile breakpoints from DESIGN.md.

### Phase 4 — Signature agent visuals (optional, high impact)

Where Cartra shows how agents work:

1. Build light “agent pane” mockups (`ide-mockup-card` / `ide-pane` analogues) using cream-soft panes + JetBrains Mono.
2. Use timeline pastel pills **only** inside those visualizations.
3. Prefer real workflow UI over abstract illustration.

### Phase 5 — Cleanup & docs

1. Delete unused cobalt/navy/peach paths once pages no longer reference them.
2. Trim `.impeccable.md` aesthetic tables or replace with “see DESIGN.md”.
3. Update README / UI package docs to point at `DESIGN.md`.
4. Smoke: lint, typecheck, homepage + one SEO landing + one agent-system page.

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
