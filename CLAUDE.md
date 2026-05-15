# Vivos Assurance Pro — Claude project rules

## Design System

Always read `DESIGN.md` before making any visual or UI decisions.
All font choices, colors, spacing, radius, motion, and aesthetic direction are defined there.
Do not deviate without explicit user approval. In QA mode, flag any code that does not match `DESIGN.md`.

## Stack

- Next.js 15 App Router, TypeScript strict, Tailwind, `@supabase/ssr`, Sentry, Stripe.
- Submodule: this `nextjs-app/` is a git submodule inside `assurance-pro/10-developpement/`.

## Conventions

- Composants React: function + hooks only.
- Imports: `@/*` aliases obligatoires (pas de relative `../../`).
- File naming: kebab-case (`user-profile.tsx`).
- Validation: zod côté serveur sur toutes API routes.
- SQL: Supabase client uniquement, jamais raw SQL côté client.
- No `any` sauf cas documenté en commentaire.

## SEO YMYL — Règle Ahrefs-First

**JAMAIS** créer/modifier une page produit ou guide sans valider vol/KD/CPC dans `kw_universe` Supabase d'abord. Les piliers prioritaires sont définis dans `src/app/sitemap.ts` (champ `priority`).

## Tests

- `npm run typecheck` + `npm run lint` + `npm run build` doivent passer avant tout commit final.
- Playwright e2e sur funnel devis critique. Vitest pour units.

## Branches

- `feature/*`, `fix/*`, `refactor/*` uniquement. Jamais de push direct sur `main`.
- Conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill tool as your FIRST action. Do NOT answer directly first.

- Design system, brand, refonte visuelle → `/design-consultation`
- Plan review design avant code → `/plan-design-review`
- Visual QA audit live, design polish → `/design-review`
- Bugs, errors, "why broken" → `/investigate`
- Ship, deploy, PR → `/ship`
- Architecture review plan → `/plan-eng-review`
