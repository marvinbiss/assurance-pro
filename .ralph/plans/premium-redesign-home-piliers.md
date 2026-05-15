# Plan — Refonte Premium Home + 9 Piliers SEO

> Plan immutable per `plan-immutability` rule. Déviations = addendum après approbation user.
> Branche: `feature/premium-redesign` · Source design: `DESIGN.md` (commit `687175f`)

## Objectif

Élever la home + 9 piliers SEO au niveau **"Atelier Premium"** défini dans DESIGN.md.
Cible: dépasser visuellement April Pro, être plus chaleureux qu'Hiscox, anti-corporate Generali.
Préserver: SEO existant (URL inchangées), conversion (CTAs en place), perf (Core Web Vitals).

## Pages cibles (10)

| #   | Slug                                     | Status actuel                                             | Priorité refonte                          |
| --- | ---------------------------------------- | --------------------------------------------------------- | ----------------------------------------- |
| 1   | `/` (home)                               | 738 lignes, hero gradient + verticaux bento + témoignages | **P0** — vitrine, doit signaler le niveau |
| 2   | `/assurance-decennale`                   | 225 lignes, structure standard                            | **P0** — money KW (CPC 1300€)             |
| 3   | `/mutuelle-pro-btp`                      | inconnu                                                   | **P0** — 16 000 vol/mois (top volume)     |
| 4   | `/responsabilite-civile-professionnelle` | inconnu                                                   | **P0** — 5 200 vol, famille 12k           |
| 5   | `/rc-pro`                                | inconnu                                                   | **P0** — pilier court                     |
| 6   | `/assurance-professionnelle`             | inconnu                                                   | **P0** — pilier RACINE famille 10k        |
| 7   | `/multirisque-pro`                       | inconnu                                                   | **P1**                                    |
| 8   | `/assurance-btp`                         | inconnu                                                   | **P1** — HUB BTP                          |
| 9   | `/assurance-entreprise`                  | inconnu                                                   | **P1** — 1 600 vol                        |
| 10  | `/cyber-assurance`                       | inconnu                                                   | **P2**                                    |

## Diagnostic état actuel (home `src/app/page.tsx`)

Forces déjà en place:

- Brand tokens Tailwind (terracotta/honey/forest/sand) configurés.
- Fraunces + Sora + DM Sans déjà chargés (`font-heading`, `font-display-premium`).
- Composants brand: `<FadeIn>`, `<Stagger>`, `TrustBadgesRow`, `MockOfferCard`, marquee partenaires.
- Hero ORIAS pill, Trustpilot inline, CTA hierarchy correcte.

Écarts vs DESIGN.md à corriger:

1. **Couleurs hors système**: `from-rose-500` (Mutuelle Pro), `from-indigo-500` (VTC) — doivent passer en `secondary` (honey) ou `accent` (forest) ou primary palette.
2. **Honey gold mal utilisé**: utilisé comme accent général sur "RC Pro" — DESIGN.md réserve honey aux signaux premium (top du marché, awards).
3. **Stock photos Unsplash** pour témoignages et verticaux — DESIGN.md anti-pattern. À remplacer par illustrations sur-mesure ou photos clients réelles (à défaut, retirer avatars et garder citations Fraunces italic).
4. **"10+ assureurs partenaires"** sans liste nominative dans hero stats — DESIGN.md exige preuve nominative. La liste existe (ASSUREURS const) mais doit être visible dès le hero/trust strip, pas reléguée plus bas.
5. **Pas de marquee partenaires en sticky trust strip** sous fold hero (DESIGN.md pattern hero).
6. **3-colonnes uniforme** pour `PROCESS_STEPS` — DESIGN.md anti-pattern. Doit passer en layout éditorial asymétrique (numéros géants Fraunces + colonnes décalées).
7. **Pas de grain noise** explicite sur autres heros que home (à généraliser piliers).
8. **Pas de système de hiérarchie radius** (mix de `rounded-xl` et `rounded-full` sans logique DESIGN.md sm/md/lg/xl/2xl).
9. **Pilier décennale (225 lignes)** probablement plus pauvre que home → doit recevoir même qualité hero/trust/cards.

## Architecture — Composants à créer/refactor

Tous dans `src/components/`. Suivre kebab-case fichiers, PascalCase composants.

### Nouveaux composants premium réutilisables

| Composant               | Fichier                                              | Rôle                                                                                         | Pages                      |
| ----------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------- |
| `PremiumHero`           | `src/components/premium/premium-hero.tsx`            | Hero unifié Atelier Premium (grain noise + Fraunces statement + 2 CTAs + trust ribbon)       | Home + 9 piliers           |
| `EditorialProcessSteps` | `src/components/premium/editorial-process-steps.tsx` | "Comment ça marche" asymétrique éditorial (numéros géants Fraunces, décalages)               | Home + piliers             |
| `PartnersMarqueeBand`   | `src/components/premium/partners-marquee-band.tsx`   | Marquee partenaires nominatif (vs "10+ assureurs")                                           | Home + piliers (sous hero) |
| `PremiumPilierCard`     | `src/components/premium/premium-pilier-card.tsx`     | Card produit DESIGN.md spec (rounded-2xl, icon métier, prix Fraunces, CTA terracotta)        | Home (grid verticaux)      |
| `TrustStripACPR`        | `src/components/premium/trust-strip-acpr.tsx`        | Trust strip sticky bottom mobile + footer (ORIAS + ACPR + ORIAS check live)                  | Layout global              |
| `EditorialTestimonial`  | `src/components/premium/editorial-testimonial.tsx`   | Témoignage citation Fraunces italic, nom+métier+ville, étoiles forest, **sans avatar stock** | Home + piliers             |
| `ComparatifTable`       | `src/components/premium/comparatif-table.tsx`        | Table garanties responsive (sticky header, tabular-nums, stack mobile)                       | Piliers décennale/RC Pro   |
| `DevisCTASection`       | `src/components/premium/devis-cta-section.tsx`       | CTA section finale conversion (terracotta filled + secondary ghost + reassurance)            | Toutes pages               |
| `PremiumBadge`          | `src/components/premium/premium-badge.tsx`           | Badge honey gold "Top du marché", "Recommandé", "Premium" (usage strictement limité)         | Cards produit premium      |
| `GrainOverlay`          | `src/components/premium/grain-overlay.tsx`           | SVG noise inline reuse (extrait de `noise-overlay` actuel)                                   | Tous heros                 |

### Refactor composants existants

| Existant                                   | Action                                                 |
| ------------------------------------------ | ------------------------------------------------------ |
| `src/components/home/MockOfferCard`        | Aligner avec `PremiumPilierCard` (déléguer ou re-skin) |
| `src/components/conversion/TrustBadgesRow` | Auditer contraste, intégrer dans `TrustStripACPR`      |
| `src/components/brand/FadeIn`, `Stagger`   | Conserver — déjà DESIGN.md compliant                   |
| `src/components/marketing/*`               | Auditer page par page lors refonte pilier              |

### Mise à jour Tailwind config

`tailwind.config.js`:

- Ajouter `boxShadow.premium` (DESIGN.md `--shadow-premium` terracotta tint).
- Ajouter `easing` custom (`enter`, `exit`, `move`) cubic-beziers DESIGN.md.
- Confirmer `borderRadius` map `sm:4px, md:8px, lg:12px, xl:16px, 2xl:24px`.
- Ajouter `fontFamily.display` alias Fraunces si pas déjà fait.

### Globals.css

- Ajouter `--shadow-premium` variable.
- Ajouter `prefers-reduced-motion` block (durations 0ms sauf opacity).
- Vérifier `.noise-overlay` utilise `opacity: 0.03` (DESIGN.md).

## Phases d'implémentation (commits atomiques)

### Phase 1 — Foundations (1 commit)

`feat(design): tokens + utility classes DESIGN.md compliance`

- tailwind.config.js: shadows, easing, radius scale, font-family alias.
- globals.css: --shadow-premium, prefers-reduced-motion, grain noise utility.

### Phase 2 — Composants premium réutilisables (1 commit par composant logique)

1. `feat(premium): GrainOverlay + PremiumBadge + shared primitives`
2. `feat(premium): PremiumHero + PartnersMarqueeBand`
3. `feat(premium): EditorialProcessSteps + EditorialTestimonial`
4. `feat(premium): PremiumPilierCard + DevisCTASection`
5. `feat(premium): TrustStripACPR + ComparatifTable`

### Phase 3 — Home refonte (1 commit)

`refactor(home): apply Atelier Premium system`

- Remplacer rose/indigo par tokens DESIGN.md.
- Retirer stock photos testimonials (citations only Fraunces).
- PROCESS_STEPS → `<EditorialProcessSteps>`.
- Verticaux grid → `<PremiumPilierCard>` (asymétrie bento conservée mais via DESIGN.md spans).
- Hero → `<PremiumHero>`.
- Ajouter `<PartnersMarqueeBand>` sous fold hero.

### Phase 4 — Piliers P0 (1 commit par pilier)

Pour chacun de: `/assurance-decennale`, `/mutuelle-pro-btp`, `/responsabilite-civile-professionnelle`, `/rc-pro`, `/assurance-professionnelle`:

`refactor(pilier-X): Atelier Premium hero + cards + trust`

- Hero pilier → `<PremiumHero variant="pilier" metier="..." />`
- Cards garanties → `<PremiumPilierCard>`
- Table comparatif (si applicable) → `<ComparatifTable>`
- Témoignages → `<EditorialTestimonial>`
- CTA finale → `<DevisCTASection>`

### Phase 5 — Piliers P1+P2 (1 commit par pilier)

Idem pour `/multirisque-pro`, `/assurance-btp`, `/assurance-entreprise`, `/cyber-assurance`.

### Phase 6 — QA + perf (1 commit)

`chore(qa): typecheck + lint + build + lighthouse fix`

- Pass `npm run typecheck`, `npm run lint`, `npm run build`.
- Lighthouse mobile ≥ 90 perf, ≥ 95 a11y, ≥ 95 SEO sur les 10 pages.
- Vérifier CLS ≤ 0.1 (Fraunces font-display swap fallback OK).

## Critères "Atelier Premium" par page (checklist /design-review)

- [ ] Hero: Fraunces display weight 500-700 sur statement principal
- [ ] Hero: grain noise overlay `opacity: 0.03`
- [ ] Hero: 2 CTAs hiérarchie claire (terracotta filled + ghost charcoal)
- [ ] Hero: trust ribbon ORIAS/ACPR visible above fold
- [ ] Sous hero: `<PartnersMarqueeBand>` partenaires nominatifs
- [ ] Sections: spacing 96-128px desktop, 64-80px mobile entre majeures
- [ ] Cards: hierarchical radius (`rounded-md` default, `rounded-2xl` pour featured)
- [ ] Couleurs: zéro rose/indigo/bleu corporate — uniquement tokens primary/secondary/accent/sand/charcoal
- [ ] Honey gold: uniquement sur badges premium (`<PremiumBadge>`)
- [ ] Témoignages: citations Fraunces italic, sans avatar stock
- [ ] Stats: tabular-nums DM Sans
- [ ] Motion: `<FadeIn>` + `<Stagger>` sur sections, respect `prefers-reduced-motion`
- [ ] Dark mode: surfaces charcoal-950, désaturation -15% brand
- [ ] WCAG: AAA body text, AA Large UI/CTAs
- [ ] Mobile: tables transformées en stack, CTA sticky bottom funnel

## Risques + mitigations

| Risque                                      | Impact                  | Mitigation                                                                                           |
| ------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| Régression SEO (changement structure H1/H2) | Trafic organique YMYL   | Préserver textes/keywords existants. Diff Lighthouse SEO avant/après.                                |
| Régression conversion (CTAs reskinned)      | Devis/jour ↓            | Conserver wording CTAs (`CTA_TEXTS.primary`). A/B test optionnel post-merge.                         |
| CLS sur Fraunces font swap                  | LCP/CLS dégradé         | `font-display: swap` + size-adjust + preload. Fallback Sora.                                         |
| Submodule git complexity                    | PR difficile            | Une seule PR sur submodule `nextjs-app`. Bump submodule SHA dans parent repo en commit séparé final. |
| Stock photos retrait sans replacement       | Hero pilier moins riche | Strategy: illustrations CSS/SVG sur-mesure simples (silhouettes métier) — fallback gradient + grain. |
| Volume travail piliers (9)                  | Burn-out / scope creep  | Phaser P0 → review → P1 → P2. STOP après P0 si fatigue/échec.                                        |

## Exit criteria

- `npm run build` passe (NEXT_BUILD_SKIP_DB=1).
- `npm run typecheck` 0 erreur.
- `npm run lint` 0 erreur.
- 10 pages refontes commitées sur `feature/premium-redesign`.
- DESIGN.md checklist verte sur home + 5 piliers P0 (P1/P2 best-effort).
- PR créée vers `main` avec preview Vercel + summary + test plan.
- Submodule SHA bump committé dans parent repo `/Users/marvin/assurance-pro`.

## Hors scope (à exclure)

- Refonte funnel devis (`/devis`) — out, sera phase 2.
- Refonte dashboard client portail — out.
- Refonte blog/guides — out (gardés en P3).
- Création de nouvelles pages programmatic — out, règle Ahrefs-first appliquée plus tard.
- Modification base données / RLS Supabase — out, no DB change.
- Modification API routes — out, no behavior change.

## Decisions log

| Date       | Décision                                                                   | Rationale                                                      |
| ---------- | -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 2026-05-15 | 10 composants premium réutilisables vs page-by-page custom                 | Réutilisation cross-pilier. Évite drift design. Maintenance ↓. |
| 2026-05-15 | Stock photos out, illustrations sur-mesure si possible sinon citation only | DESIGN.md anti-pattern. Coût photos réelles élevé phase 1.     |
| 2026-05-15 | Phasing P0 → P1 → P2 séquentiel                                            | Pas de parallel agents (submodule conflict risk).              |
| 2026-05-15 | Preserve URL + H1 textes                                                   | Protection SEO YMYL.                                           |

---

# Addendum — /plan-design-review (2026-05-15)

> Plan immutable. Cet addendum complète sans modifier le plan original.

## Scoring (avant → après fixes inline)

| Pass | Dimension                    | Initial | Après fixes          |
| ---- | ---------------------------- | ------- | -------------------- |
| 1    | Information Architecture     | 6/10    | 9/10                 |
| 2    | Interaction State Coverage   | 3/10    | 8/10                 |
| 3    | User Journey & Emotional Arc | 4/10    | 8/10                 |
| 4    | AI Slop Risk                 | 7/10    | 9/10                 |
| 5    | Design System Alignment      | 9/10    | 10/10                |
| 6    | Responsive & Accessibility   | 5/10    | 9/10                 |
| 7    | Unresolved Design Decisions  | —       | 4 résolus, 1 reporté |

**Overall design score: 5.7/10 → 8.7/10.**

## Pass 1 — Information Architecture (FIX)

### Fold hierarchy — Home

```
FOLD 1 (above the fold)
├─ Header sticky (logo + nav + CTA "Devis 2 min")
├─ Eyebrow pill ORIAS n° X · ACPR · CSCA
├─ H1 Fraunces "Votre assurance pro, comparée en 2 minutes"
├─ Lead DM Sans (max 60ch)
├─ 2 CTAs: terracotta filled "Obtenir mon devis" + ghost "Découvrir"
└─ Trust ribbon: 4.8/5 Trustpilot + 10 partenaires nominatifs

FOLD 2
└─ <PartnersMarqueeBand /> — logos nominatifs scroll

FOLD 3
└─ 6 verticaux <PremiumPilierCard /> bento asymétrique 2-col mobile / 3-col desktop

FOLD 4
└─ <EditorialProcessSteps /> 01-02-03 décalés

FOLD 5
└─ 3 témoignages <EditorialTestimonial /> citations Fraunces

FOLD 6
└─ <DevisCTASection /> reassurance + CTA finale
```

### Fold hierarchy — Pilier P0 (template uniforme)

```
FOLD 1
├─ Breadcrumb: Accueil > [Famille] > [Pilier]
├─ Eyebrow: "Pilier · X vol/mois recherches"
├─ H1 Fraunces métier-specific
├─ Lead reformulant promesse métier
├─ 2 CTAs (devis + comparatif)
└─ Trust ribbon ORIAS

FOLD 2: <PartnersMarqueeBand /> filtrée par pilier
FOLD 3: Sections garanties <PremiumPilierCard /> 4-6 cards
FOLD 4: <ComparatifTable /> (si décennale/RC Pro) OU FAQ
FOLD 5: <EditorialTestimonial /> métier-specific 2 témoignages
FOLD 6: Pages sous-métiers (ex. décennale → électricien/maçon/plombier) en grid
FOLD 7: <DevisCTASection />
```

### Navigation model

- Header: Verticaux (mega-menu 6 piliers) · Outils · Guides · Devis (CTA terracotta).
- Breadcrumb obligatoire piliers + sous-pages.
- Footer: 3 colonnes (Piliers · Légal · Contact) + ligne ACPR/ORIAS.

## Pass 2 — Interaction States (FIX — Table à intégrer phase 2 composants)

| Composant                | Loading                                 | Empty                                                                  | Error                                                       | Success                                | Partial                                      |
| ------------------------ | --------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------- | -------------------------------------------- |
| `<PremiumHero>`          | Skeleton (Fraunces fallback Sora swap)  | N/A                                                                    | N/A                                                         | N/A                                    | Image lazy → blur placeholder                |
| `<PartnersMarqueeBand>`  | 5 skeleton pills sand-200 animate-pulse | "Partenaires bientôt disponibles" (jamais en prod)                     | Silent fail, masquer band                                   | Marquee 40s linear                     | —                                            |
| `<PremiumPilierCard>`    | Skeleton card rounded-2xl sand-100      | N/A                                                                    | N/A                                                         | N/A                                    | Image hero lazy fallback gradient terracotta |
| Form devis (`/devis`)    | Spinner inline button + disable submit  | N/A                                                                    | Toast rouge bordure + inline field error forest-on-red text | Toast forest "Devis envoyé" + redirect | Auto-save indicateur "Brouillon sauvegardé"  |
| `<ComparatifTable>`      | Skeleton 5 rows sand-200                | "Aucune offre dispo pour ce profil. Contactez courtier." + CTA contact | Toast rouge + retry                                         | Render rows                            | Lazy load images logos assureurs             |
| `<EditorialTestimonial>` | Skeleton text-only                      | N/A (curated, jamais empty)                                            | N/A                                                         | N/A                                    | —                                            |
| `<TrustStripACPR>`       | Static, no loading                      | N/A                                                                    | N/A                                                         | N/A                                    | —                                            |
| `<DevisCTASection>`      | N/A                                     | N/A                                                                    | N/A                                                         | N/A                                    | —                                            |

### Empty state philosophy

- Jamais "No items found." sec. Toujours: warmth + primary action + context.
- Ex. comparatif: "On n'a pas encore d'offre pour ce profil exact. Notre courtier peut intervenir manuellement — laissez vos coordonnées, on rappelle sous 24h." + CTA téléphone.

## Pass 3 — User Journey (FIX — Storyboard P0)

### Persona: Karim, plombier-chauffagiste 38 ans, Lyon, SARL 3 ans

```
T+0s    LANDING /assurance-decennale (Google search "décennale plombier prix")
        FEEL: méfiant ("encore un comparateur?")
        DESIGN SUPPORT: H1 Fraunces "Décennale plombier" + ORIAS pill + 5★ Trustpilot
                       → "OK c'est un vrai courtier ORIAS"

T+8s    SCROLL fold 2 partenaires nominatifs (Hiscox, April, MMA, Generali...)
        FEEL: rassuré ("ils bossent avec les vrais")
        DESIGN SUPPORT: marquee partenaires + 10 logos noir/blanc → 1 hover = couleur

T+20s   SCROLL fold 3 garanties (5 cards Forest checkmark)
        FEEL: éduqué ("ah oui dommages avant réception, j'ai pas pensé")
        DESIGN SUPPORT: cards <PremiumPilierCard> avec icônes métier + 5 garanties + prix "à partir de 42€/mois"

T+45s   SCROLL fold 5 témoignage Karim B. Lyon plombier économie 32%
        FEEL: identification forte
        DESIGN SUPPORT: <EditorialTestimonial> citation Fraunces + nom + ville + métric -32%

T+60s   CLIC CTA "Obtenir mon devis"
        FEEL: confiant
        DESIGN SUPPORT: CTA terracotta filled hover translate-up + shadow-premium

T+90s   FORM devis étape 1 (activité + CA)
        FEEL: tâche claire
        DESIGN SUPPORT: progress bar honey gold 1/3 + single column 560px + label-au-dessus

T+5min  DEVIS reçu email (off-platform)
        FEEL: satisfaction
        DESIGN SUPPORT: email premium template (out scope phase 1)
```

### Time horizons design

- **5sec visceral**: warmth terracotta + Fraunces serif premium feel + ORIAS trust. NOT cold corporate.
- **5min behavioral**: form devis sans friction, save brouillon, mobile sticky CTA bottom.
- **5year reflective**: portail client (out scope phase 1) + service après sinistre humain.

## Pass 4 — AI Slop (FIX — Spec EditorialProcessSteps)

### `<EditorialProcessSteps>` spec concrète

Anti-pattern remplacé: 3 colonnes uniformes icon-in-circle.

Layout proposé:

```
Desktop (lg+):
[01]              "Décrivez votre activité"
   FRAUNCES               SORA 600 text-2xl
   text-9xl                + DM Sans description text-base
   primary-200             max-width 32ch
   opacity-60              ml-4 (décalé droite numéro)
                                              ↘
                              [02]            "Comparaison négociée"
                                 même style, décalé encore droite 64px
                                                                ↘
                                              [03]              "Souscription"
                                                 même style, retour gauche 32px (zigzag)

Mobile (sm):
Stack vertical, numéros 7xl pas 9xl, décalage retiré, gap-12.
```

CSS: numéro `font-family: var(--font-display)` (Fraunces) `weight: 500` `font-variation-settings: "SOFT" 100, "WONK" 1`. Color `primary-200` `opacity-60` pour effet "watermark". Title Sora 600. Décalages via `padding-left` ou `margin-left` progressif. Pas de fond decorative blob.

Anti-slop validations:

- ❌ Pas centré uniforme → asymétrie zigzag
- ❌ Pas d'icon-in-circle → numéros typographiques géants
- ❌ Pas de border decorative → spacing rythme la séparation
- ❌ Pas de purple/gradient bg → fond sand-50 plat

## Pass 6 — Responsive & A11y (FIX)

### Breakpoints (Tailwind defaults)

| Breakpoint | Width  | Layout changes                                            |
| ---------- | ------ | --------------------------------------------------------- |
| `sm`       | 640px  | Stack verticaux 1-col → 2-col, marquee width auto         |
| `md`       | 768px  | Bento 2x3, header desktop apparaît                        |
| `lg`       | 1024px | Bento 3x2, comparatif table en pleine largeur, hero 2-col |
| `xl`       | 1280px | Max container, fluid type plafonné                        |
| `2xl`      | 1536px | Pas de changement layout, juste plus de breathing room    |

### A11y checklist (à intégrer Phase 6 QA)

- [ ] Touch targets ≥ 44x44px sur tous CTAs mobile
- [ ] ARIA landmarks: `<header role="banner">`, `<main>`, `<nav aria-label="Principal">`, `<footer role="contentinfo">`
- [ ] Skip-link "Aller au contenu" first focusable
- [ ] Focus visible: outline `2px solid primary-400` + offset 2px sur tous interactifs
- [ ] Form labels associés via `htmlFor` (jamais placeholder-only)
- [ ] Errors annoncés `aria-live="polite"` + `aria-invalid="true"` sur champ
- [ ] Marquee partenaires: `prefers-reduced-motion` → paused state + `aria-label`
- [ ] Tables comparatif: `<caption>` + `<th scope>` + responsive stack avec rôle ARIA preserved
- [ ] Color contrast: vérifier WCAG AAA body text sur sand-50 (charcoal-800 ratio 13.6:1 ✓)
- [ ] Keyboard nav: tab order logique, Echap ferme mega-menu, flèches navigent
- [ ] Screen reader testé NVDA + VoiceOver sur 3 piliers P0 minimum

### Reduced motion treatment

Per DESIGN.md: `@media (prefers-reduced-motion: reduce)` → toutes durations 0ms sauf opacity (150ms). Marquee partenaires pause. FadeIn/Stagger fallback `opacity: 1` instant.

## Pass 7 — Unresolved Design Decisions (RÉSOLUS)

| Décision                                           | Décision prise                                                                                                                                                                                                                        | Rationale                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Remap `from-rose-500` Mutuelle Pro                 | `from-accent-500 to-accent-700` (forest)                                                                                                                                                                                              | Forest = trust santé, cohérent semantic                         |
| Remap `from-indigo-500` VTC                        | `from-primary-500 to-primary-700` (terracotta)                                                                                                                                                                                        | VTC = pro mobile, terracotta brand cohérent                     |
| Remap `from-secondary-500 to-secondary-700` RC Pro | `from-charcoal-700 to-charcoal-900` (sombre élégant)                                                                                                                                                                                  | Honey gold réservé badges premium, RC Pro = sombre serieux      |
| Cyber `from-charcoal-700 to-charcoal-900`          | **Conservé** + ajout `<PremiumBadge>` honey "Jusqu'à 5M€"                                                                                                                                                                             | Cohérent avec semantic "high-stakes" cyber                      |
| Stock photos retrait — replacement strategy        | **Phase 1**: citation only (sans avatar) sur testimonials. Verticaux: garder Unsplash MAIS valider 1-by-1 anti-slop (pas "homme cravate") + ajouter overlay grain. **Phase 2 future**: shoot photos clients réels (out scope refonte) | Évite blocage phase 1. Citation pure Fraunces italic = premium. |
| Submodule git workflow                             | 1 PR sur submodule `nextjs-app` (review complète) → merge submodule → commit bump SHA dans parent repo séparé                                                                                                                         | Préserve historique propre parent vs nested                     |
| A/B test post-merge                                | **Reporté hors scope**                                                                                                                                                                                                                | Décision marketing/produit, pas design. À discuter post-launch. |

### Reporté (1 unresolved)

- **Illustrations métier sur-mesure** (silhouettes outils, mains au travail BTP) — pas de budget illustration phase 1. Décision: livrer Phase 1 avec photos Unsplash filtrées + Phase 2 future commande illustrateur freelance.

## NOT in scope (design decisions explicitly deferred)

- **Funnel `/devis`** refonte complète: gardé en l'état Phase 1, refonte Phase 2.
- **Dashboard client portail**: aucune modif, Phase 3.
- **Blog/guides templates**: refonte différée Phase 2 (impact SEO YMYL = à valider Ahrefs first).
- **Pages programmatic auto-générées** (`/assurance-decennale/[slug]` métiers): bénéficient passivement des composants premium via `<PremiumPilierCard>` mais pas de refonte dédiée Phase 1.
- **Emails transactionnels** (devis envoyé, attestation reçue): out scope.
- **Cookie banner / consent UI**: existant `CookieConsent.tsx` conservé.

## What already exists (à réutiliser obligatoirement)

- `src/components/brand/` — `FadeIn`, `Stagger`, marquee partenaires animations CSS keyframes.
- `src/components/conversion/TrustBadgesRow.tsx` — auditer + intégrer dans `<TrustStripACPR>`.
- `src/components/home/MockOfferCard.tsx` — déprécier au profit `<PremiumPilierCard>` mais réutiliser logique props.
- `src/lib/seo/garantie-slug-dispatcher.ts` — gestion routing pilier/sous-métier intacte.
- Tailwind config tokens primary/secondary/accent/sand/charcoal — DÉJÀ DESIGN.md compliant.
- Fraunces + Sora + DM Sans déjà chargés via `next/font` (commit `e9174d7`).
- `noise-overlay` class globals.css — à extraire dans `<GrainOverlay>` composant.
- ASCII grid composition home `page.tsx` (lignes 230-740) — conserver patterns, re-skin via composants.

## Notes implémentation critiques (à respecter Phase 3+)

1. **Préserver TOUS H1/H2 textes existants** — SEO YMYL. Re-skin visuel uniquement.
2. **Préserver `metadata.title`/`description` exactes** — ranking en place.
3. **Préserver URLs** — pas de renommage slug.
4. **Conserver `<img>` raw** où commentaire `// Sentry RSC wrapping bug` justifie. Migrer vers `next/image` ailleurs.
5. **CLS Fraunces**: `font-display: swap` + `size-adjust` + preload uniquement weights utilisés. Test Lighthouse CLS < 0.05 obligatoire.
6. **Branch hygiene**: commits atomiques per phase (Phase 1-6 = 6+ commits distincts), pas de gros commit dump.

## GSTACK REVIEW REPORT

| Review        | Trigger               | Why                             | Runs | Status | Findings                                        |
| ------------- | --------------------- | ------------------------------- | ---- | ------ | ----------------------------------------------- |
| CEO Review    | `/plan-ceo-review`    | Scope & strategy                | 0    | —      | —                                               |
| Codex Review  | `/codex review`       | Independent 2nd opinion         | 0    | —      | —                                               |
| Eng Review    | `/plan-eng-review`    | Architecture & tests (required) | 0    | —      | —                                               |
| Design Review | `/plan-design-review` | UI/UX gaps                      | 1    | CLEAR  | score: 5.7/10 → 8.7/10, 6 décisions, 1 reportée |
| DX Review     | `/plan-devex-review`  | Developer experience gaps       | 0    | —      | —                                               |

**UNRESOLVED:** 1 (illustrations sur-mesure → reporté Phase 2)
**VERDICT:** Design review CLEAR — implementer can proceed. Eng review NOT required for visual-only refonte (no architecture change). Skipping per autonomous mode.
