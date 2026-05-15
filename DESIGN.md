# Design System — Vivos Assurance Pro

> Source de vérité visuelle. Lire avant toute modification UI. Pas de déviation sans approbation explicite.

## Product Context

- **What:** Plateforme d'assurance pro 100% digitale pour pros français (artisans BTP, freelances, médecins, restaurants, e-commerçants). Devis instantané + souscription en ligne + attestation immédiate.
- **Audience:** Pros TPE/PME, micro-entrepreneurs, professions libérales. Décident vite, veulent du concret, refusent le jargon corporate.
- **Secteur:** Assurance — YMYL (Your Money Your Life). Trust = conversion. Conformité ACPR/DDA/Spinetta obligatoire.
- **Project type:** Hybrid site éditorial SEO (piliers + guides) + funnel produit (devis/souscription) + portail client.
- **Peers de référence:** April Pro (modern friendly), Hiscox (premium editorial), Generali Pro (corporate trust). On vise au-dessus d'April en éditorial, plus chaleureux qu'Hiscox.

## Aesthetic Direction

**Direction: "Atelier Premium"** — warm-precise editorial.

- **Mood:** Confiance artisanale. Sérieux sans froideur. Premium sans bling. Sentiment d'être pris en charge par un courtier qui connaît le métier, pas par une plateforme générique.
- **Decoration level: intentional** — grain noise sur heros, dividers asymétriques, accent honey gold sur badges premium uniquement, illustrations métier discrètes (silhouettes outils, mains au travail).
- **Anti-slop:**
  - Pas de bleu corporate banque (#0066CC interdit).
  - Pas de gradients violet/cyan.
  - Pas de grille 3-colonnes feature-icons stock.
  - Pas de stock photo "homme cravate sourit ordinateur".
  - Pas de "Built for X" / "Trusted by 10,000+" sans preuve nominative.
- **Reference cues:** Hermès Pro Hub (warmth), Stripe (clarity), Monocle (editorial), Are.na (restraint).

## Typography

- **Display (hero, H1, statements):** **Fraunces** — variable serif optical-size. Personnalité chaleureuse, lettres "g" et "a" caractérielles. Soft 9 / Wonky 1 weight 500-700. Use sparingly: hero one-liner, pilier H1, quotes éditoriales.
- **Heading (H2-H4, section titles):** **Sora** — variable sans, weight 600-700. Géométrique stable, lisible toutes tailles. Substitue Fraunces dans contextes denses (dashboard, devis form).
- **Body:** **DM Sans** — variable, weight 400-500. Optimal lisibilité longue lecture YMYL (réglementation, exclusions, conditions). Tracking 0 à 1.05rem, tracking -0.005em ≥1.25rem.
- **UI / Labels / Buttons:** **Sora** weight 500-600, tracking 0.01em, uppercase optionnel pour CTAs secondaires uniquement.
- **Data / Tables / Numbers:** **DM Sans tabular-nums** (`font-variant-numeric: tabular-nums`). Stats prix, pourcentages, dates.
- **Code (rare):** **JetBrains Mono** weight 400.
- **Loading strategy:** `next/font/google` self-hosted. Display swap. Preload Fraunces + Sora + DM Sans uniquement. Subset latin-ext (accents français FR).

### Modular scale (1.25 — Major Third)

| Token          | Size (rem / px)                 | Line-height | Use                   |
| -------------- | ------------------------------- | ----------- | --------------------- |
| `text-xs`      | 0.75 / 12                       | 1.5         | Captions, legal, meta |
| `text-sm`      | 0.875 / 14                      | 1.55        | UI dense, labels      |
| `text-base`    | 1.00 / 16                       | 1.65        | Body default          |
| `text-lg`      | 1.125 / 18                      | 1.6         | Lead paragraph        |
| `text-xl`      | 1.25 / 20                       | 1.5         | Subheading            |
| `text-2xl`     | 1.5 / 24                        | 1.4         | H4                    |
| `text-3xl`     | 1.875 / 30                      | 1.3         | H3                    |
| `text-4xl`     | 2.25 / 36                       | 1.2         | H2                    |
| `text-5xl`     | 3.0 / 48                        | 1.15        | H1 (mobile hero)      |
| `text-6xl`     | 3.75 / 60                       | 1.1         | H1 (desktop hero)     |
| `text-7xl`     | 4.5 / 72                        | 1.05        | Display (statement)   |
| `text-display` | clamp(3rem, 5vw + 1rem, 5.5rem) | 1.05        | Fluid hero            |

## Color

**Approach: balanced** — Terracotta primary (warm trust), Honey gold (premium signals only), Forest green (verified/trust), Sand neutrals (canvas).

### Brand palette

| Token         | Hex       | Role                                 |
| ------------- | --------- | ------------------------------------ |
| `primary-50`  | `#FDF1EC` | Backgrounds soft, hero overlays      |
| `primary-100` | `#FADDCF` | Surfaces secondaires, badges légers  |
| `primary-200` | `#F5BAA0` | Hover surfaces                       |
| `primary-400` | `#E86B4B` | **PRIMARY** — CTAs, brand accents    |
| `primary-500` | `#D4553A` | Hover CTA                            |
| `primary-600` | `#C24B2A` | Active CTA, focus rings              |
| `primary-700` | `#A33E22` | Text-on-light when terracotta needed |
| `primary-900` | `#6B2916` | Dark mode terracotta                 |

| Token           | Hex       | Role                                          |
| --------------- | --------- | --------------------------------------------- |
| `secondary-400` | `#F2B523` | **HONEY** — Premium badges, awards, top-rated |
| `secondary-500` | `#E8960A` | Hover honey                                   |
| `secondary-50`  | `#FEFAEC` | Background "premium" sections                 |

| Token        | Hex       | Role                                           |
| ------------ | --------- | ---------------------------------------------- |
| `accent-500` | `#3D8B68` | **FOREST** — Verified, success, ratings, trust |
| `accent-100` | `#D9EDE3` | Success backgrounds                            |
| `accent-50`  | `#F0F7F4` | Success surfaces ultra-soft                    |

### Neutrals — Warm (Sand-tinted, NEVER cold gray)

| Token          | Hex       | Role                      |
| -------------- | --------- | ------------------------- |
| `sand-50`      | `#FDFAF7` | Page background (default) |
| `sand-100`     | `#F9F4EE` | Sections alternées        |
| `sand-200`     | `#F4EFE8` | Cards background          |
| `sand-300`     | `#EDE8E1` | Borders soft              |
| `sand-400`     | `#E5DDD4` | **Border default**        |
| `sand-500`     | `#D5C9BE` | Borders strong            |
| `charcoal-700` | `#45403B` | Text secondary            |
| `charcoal-800` | `#302C28` | **Text primary** (body)   |
| `charcoal-900` | `#1C1917` | Text emphasis, H1-H2      |
| `charcoal-950` | `#0F0E0C` | Pure dark (dark mode bg)  |

### Semantic

- **Success:** `accent-500` `#3D8B68` (forest) — devis validé, paiement confirmé
- **Warning:** `secondary-500` `#E8960A` (honey) — attention, deadline
- **Error:** `#EF4444` (red-500 — exception au système, validé pour clarté universelle)
- **Info:** `#3B82F6` (blue-500 — uniquement pour neutralité informationnelle ACPR/DDA)

### Dark mode

Stratégie: **redesign**, pas inversion. Surfaces `charcoal-950` (#0F0E0C). Terracotta désaturé `-15%` → `#D66047`. Honey désaturé `-10%` → `#E8A82A`. Forest désaturé `-15%` → `#4D9577`. Text `sand-50` sur charcoal-950, contrast WCAG AAA.

### Contrast requirements (WCAG)

- Body text: AAA (7:1 min)
- Headings + UI: AA Large (4.5:1)
- CTAs: AA Large + 3:1 against adjacent surface
- All semantic states tested in both modes

## Spacing

- **Base unit:** 4px (Tailwind default)
- **Density:** comfortable (8px modular for components, 16-24px for sections)
- **Page rhythm:** generous (96-128px between major sections desktop, 64-80px mobile)

| Token      | Value | Use                        |
| ---------- | ----- | -------------------------- |
| `space-0`  | 0     | —                          |
| `space-1`  | 4px   | Tight icon-text gap        |
| `space-2`  | 8px   | Component internal padding |
| `space-3`  | 12px  | Form input padding         |
| `space-4`  | 16px  | Card internal, gap default |
| `space-6`  | 24px  | Section internal           |
| `space-8`  | 32px  | Component-to-component     |
| `space-12` | 48px  | Subsection separation      |
| `space-16` | 64px  | Section separation mobile  |
| `space-24` | 96px  | Section separation desktop |
| `space-32` | 128px | Hero-to-content desktop    |

## Layout

- **Approach:** hybrid — **editorial** pour marketing/home/piliers (asymétrie, overlap, dépassements), **grid-disciplined** pour funnel devis/dashboard/forms.
- **Grid:** 12 cols desktop (gap 24px), 6 cols tablet (gap 16px), 4 cols mobile (gap 16px).
- **Max content width:** `1280px` (marketing), `880px` (lecture longue article/guide), `560px` (forms/auth).
- **Container padding:** `24px` mobile, `48px` tablet, `80px` desktop.
- **Border radius scale:**

| Token          | Value  | Use                                |
| -------------- | ------ | ---------------------------------- |
| `rounded-none` | 0      | Hero edges, full-bleed images      |
| `rounded-sm`   | 4px    | Input fields, small badges         |
| `rounded-md`   | 8px    | **Default** cards, buttons         |
| `rounded-lg`   | 12px   | Modals, large cards                |
| `rounded-xl`   | 16px   | Hero CTAs, featured cards          |
| `rounded-2xl`  | 24px   | Premium cards (mutuelle, top-tier) |
| `rounded-full` | 9999px | Pills, avatars, marquee tags       |

- **Elevation (shadows):** subtle, warm-tinted (no pure black).

```css
--shadow-sm: 0 1px 2px 0 rgb(28 25 23 / 0.04);
--shadow-md: 0 4px 6px -1px rgb(28 25 23 / 0.06), 0 2px 4px -2px rgb(28 25 23 / 0.04);
--shadow-lg: 0 10px 15px -3px rgb(28 25 23 / 0.08), 0 4px 6px -4px rgb(28 25 23 / 0.04);
--shadow-premium: 0 20px 40px -12px rgb(232 107 75 / 0.18); /* terracotta tint pour CTAs hero */
```

## Motion

- **Approach:** intentional — entrance subtiles, scroll-driven reveals, marquee continu, hover states refined. Pas de Disney, pas de parallax agressif.
- **Library standard:** `framer-motion` (déjà dans package). Composants `<FadeIn>`, `<Stagger>` déjà existants — réutiliser.
- **Easing:**
  - Enter: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
  - Exit: `cubic-bezier(0.7, 0, 0.84, 0)` (ease-in-expo)
  - Move: `cubic-bezier(0.65, 0, 0.35, 1)` (ease-in-out-cubic)
- **Duration:**
  - Micro (hover, focus): 120ms
  - Short (button states, tooltips): 200ms
  - Medium (cards, sections enter): 350ms
  - Long (page transitions, hero reveals): 600ms
  - Marquee partenaires: 40s linear infinite
- **Reduce-motion:** respect `prefers-reduced-motion` → toutes durations 0ms sauf opacity (kept at 150ms for state clarity).

## Composants Premium — Patterns

### Hero (home + pilier)

- Background: `sand-50` avec noise grain SVG inline `opacity: 0.03`
- H1 Fraunces `text-display` weight 500, color `charcoal-900`
- Lead DM Sans `text-lg` color `charcoal-700` max-width 60ch
- 2 CTAs: primary (terracotta filled) + secondary (ghost charcoal)
- Trust strip sous le fold: marquee partenaires + 3 stats (`devis/jour`, `note Trustpilot`, `compagnies partenaires`)
- Premium variant: honey gold "Top du marché" badge angle gauche

### Card produit (pilier)

- `rounded-2xl`, `bg-white`, `border-sand-300`, `shadow-md`
- Header: icon métier (custom, pas Lucide générique pour piliers principaux) + title Sora 600 `text-2xl`
- Body: bullets garanties (3-5 max), checkmark forest
- Footer: prix "à partir de X€/mois" Fraunces `text-3xl` + CTA "Devis 2 min"
- Hover: `shadow-lg` + scale 1.01 + transition 200ms

### Trust signals (toute page YMYL)

- Ligne ACPR — toujours visible footer + sticky bottom mobile sur funnel
- Badges: ORIAS n°, ACPR, certifications. Honey gold border `secondary-300`.
- Témoignages: photo réelle (jamais stock), nom + métier + ville, étoiles forest `accent-500`, citation Fraunces italic.
- Compteur live: "X devis générés aujourd'hui" — discret, footer hero.

### Table comparatif (piliers RC Pro / Décennale)

- Header sticky bg `sand-100`, font Sora 600
- Rows alternées `sand-50` / `white`
- Tabular-nums sur colonnes prix/garanties
- Mobile: transformation en cards stack (one row = one card), pas de scroll horizontal

### Form devis

- Single column max-width 560px
- Labels Sora 500 `text-sm` au-dessus, jamais inline
- Inputs `h-12 rounded-md border-sand-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100`
- Validation inline `accent-500` (vert) ou `red-500` (rouge), jamais juste rouge
- Progress bar honey gold top sticky (3 étapes max visibles)
- CTA "Continuer" full-width terracotta `h-14 text-base font-semibold`

## Anti-patterns (interdits)

| Don't                             | Do                                                         |
| --------------------------------- | ---------------------------------------------------------- |
| Bleu corporate `#0066CC`          | Terracotta primary `#E86B4B`                               |
| 3 colonnes icon-circle features   | 2 colonnes asymétrique editorial OR 4 colonnes avec photos |
| Stock photo "homme cravate"       | Photo réelle clients OR illustration sur-mesure            |
| Gradient violet/cyan              | Solid terracotta + warm shadow tint                        |
| "Trusted by 10,000+ businesses"   | Logos clients nominatifs + témoignage avec photo+nom       |
| Border radius uniform 100% bubbly | Hierarchical radius (4/8/16/24) selon contexte             |
| Helvetica/Roboto/Inter            | Fraunces/Sora/DM Sans                                      |
| Tableaux scroll-horizontal mobile | Stack cards transformation                                 |
| Drop shadows pure noir            | Shadows charcoal `rgb(28 25 23 / X)` warm-tinted           |
| Centré tout uniforme              | Asymétrie éditoriale heros, grid discipline funnel         |

## SAFE / RISK breakdown

### SAFE (category baseline — users expect)

- **Trust signals constants** (ACPR, ORIAS, certifications) — YMYL non-négociable
- **Prix clair "à partir de X€"** sur tous piliers — confiance pricing
- **CTA "Devis 2 min" omniprésent** — conversion attendue secteur assurance
- **Mobile-first responsive impeccable** — 70%+ traffic mobile sur pros

### RISK (où on prend la face)

- **Fraunces serif en hero** (concurrents = sans corporate). Risque: perçu "magazine" pas "fiable". Gain: mémorabilité, premium feel, anti-banalisation. Mitigation: Sora prend le relais sur dashboard/funnel.
- **Terracotta primary** (concurrents = bleu/vert sage). Risque: associé "design agency" pas "assurance". Gain: chaleur, différenciation totale, pas confondu avec Allianz/AXA/Generali. Mitigation: Forest sur trust signals reprend codes "trust traditionnel".
- **Grain noise + asymétrie éditoriale** sur marketing. Risque: perçu "moins pro". Gain: éloignement template SaaS générique, sensation "studio premium". Mitigation: funnel devis ultra propre grid-disciplined.
- **Honey gold pour premium uniquement** (jamais brand global). Risque: incompris si trop discret. Gain: signal sémantique fort "haut de gamme" sans bling.

## Decisions Log

| Date       | Decision                                | Rationale                                                                                                                                                     |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-05-15 | DESIGN.md créé via /design-consultation | Formaliser système existant (Terracotta/Honey/Forest/Sand + Fraunces/Sora/DM Sans déjà en place) + élever niveau premium. Branche `feature/premium-redesign`. |
| 2026-05-15 | Fraunces conservé en display            | Déjà shippé (commit e9174d7). Personnalité serif différencie de la concurrence corporate.                                                                     |
| 2026-05-15 | Aesthetic "Atelier Premium"             | Trois mots-clés: warm-precise-editorial. Combine artisan (cible BTP/artisan) + premium (cible médecin/avocat) + clarté YMYL.                                  |
| 2026-05-15 | Dark mode = redesign, pas inversion     | Terracotta perd 15% saturation, surfaces charcoal-950 chaudes, pas pur noir froid.                                                                            |
