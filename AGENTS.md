# AGENTS.md

## Cursor Cloud specific instructions

This repo is a Turborepo monorepo (pnpm workspaces) whose only app is `apps/web`, a
static Next.js 16 / React 19 marketing website for Cartra AI. There is no backend,
database, or automated test suite.

### Services

- `apps/web` — the Next.js marketing site. Dev server runs on port 3000 (`next dev --port 3000`).

### Running / developing

- Standard commands are defined in the root `package.json` and `apps/web/package.json`; run them from the repo root:
  - Dev server: `pnpm dev` (Turborepo runs `web`'s `next dev` on http://localhost:3000)
  - Build: `pnpm build`
  - Lint: `pnpm lint` (ESLint, `--max-warnings 0`)
  - Types: `pnpm check-types` (`next typegen && tsc --noEmit`)
  - Full gate: `pnpm validate` (public-copy check + lint + types + build)

### Non-obvious notes

- `pnpm check:public-copy` (part of `pnpm validate`) is a custom guard in
  `apps/web/scripts/check-public-copy.mjs` that fails the build if marketing/SEO
  internals (e.g. Ahrefs, keyword-difficulty, CPC copy) leak into files under
  `apps/web/app` or `apps/web/public`. Keep such analytics language out of shipped copy.
- No secrets are required to run or build. `NEXT_PUBLIC_GA_MEASUREMENT_ID` and
  `NEXT_PUBLIC_GTM_ID` (used in `apps/web/app/components/Analytics.tsx`) are optional;
  analytics scripts are simply omitted when unset.
- Before touching brand/marketing/homepage/SEO copy, read `docs/marketing-context.md`
  (enforced by `.cursor/rules/brand-and-marketing-context.mdc`).
