# 🧪 A/B Testing — Guide d'utilisation Vivos Assurance

**Statut** : infrastructure 100% prête, en attente d'activation côté composants.

---

## 1. Architecture (déjà en place)

| Fichier                      | Rôle                                                                      |
| ---------------------------- | ------------------------------------------------------------------------- |
| `src/lib/cro/ab-testing.ts`  | Cookie-based assignment SHA-256 déterministe, 50j max-age                 |
| `src/lib/cro/experiments.ts` | Registry typé des expériences (id, variants, weights, status, hypothesis) |
| `src/lib/cro/tracking.ts`    | Tracking GA4 (dataLayer) + Sentry breadcrumb                              |
| `src/lib/cro/server.ts`      | Helper server-side (middleware/route handlers)                            |
| `src/hooks/useExperiment.ts` | Hook React client-side avec auto-exposure tracking                        |
| `e2e/ab-testing.spec.ts`     | Tests E2E validation cookies + dataLayer                                  |

## 2. Expériences pré-configurées

### ctaColor (active)

```ts
{
  id: 'cta-color-v1',
  variants: ['control', 'orange', 'green'],
  weights: [0.34, 0.33, 0.33],
  hypothesis: 'Un CTA orange (warm) augmente les clics devis sur pages prix vs bleu (control).',
  primaryMetric: 'click_devis_form',
  holdout: 0.05, // 5 % de visiteurs jamais exposés (baseline)
}
```

### stickyBarPosition (active)

```ts
{
  id: 'sticky-bar-position-v1',
  variants: ['none', 'bottom', 'top'],
  // ... idem
}
```

## 3. Activer une expérience dans un composant client

```tsx
'use client'
import { useExperiment } from '@/hooks/useExperiment'
import { EXPERIMENTS } from '@/lib/cro/experiments'

export function MonCTA() {
  const variant = useExperiment(EXPERIMENTS.ctaColor)

  const bgClass = {
    control: 'bg-blue-600 hover:bg-blue-700',
    orange: 'bg-primary-600 hover:bg-primary-700',
    green: 'bg-emerald-600 hover:bg-emerald-700',
  }[variant]

  return (
    <a href="/devis" className={`rounded-xl px-5 py-3 text-white ${bgClass}`}>
      Demander un devis
    </a>
  )
}
```

Le hook gère automatiquement :

- Génération du `vivos_vid` (cookie visitor ID 365j)
- Assignment SHA-256 déterministe basé sur `vivos_vid + experiment.id`
- Persistance dans cookie `ab_variants` (50j)
- Tracking d'exposure GA4 + Sentry (idempotent par session)
- Fallback control si expérience archived/paused

## 4. Tracker une conversion

```tsx
'use client'
import { trackConversion } from '@/lib/cro/tracking'
import { EXPERIMENTS } from '@/lib/cro/experiments'

async function handleSubmit() {
  await fetch('/api/devis', {
    /* ... */
  })
  trackConversion(EXPERIMENTS.ctaColor, 'click_devis_form')
}
```

GA4 reçoit l'event :

```
event: ab_conversion
experiment_id: cta-color-v1
variant: orange
goal: click_devis_form
```

## 5. Workflow recommandé pour un nouveau test

### Étape 1 — Définir l'expérience

Ajouter dans `src/lib/cro/experiments.ts` :

```ts
export const EXPERIMENTS = {
  // ... existantes
  homeH1: defineExperiment({
    id: 'home-h1-v1',
    variants: ['control', 'simplicite', 'rapidite'] as const,
    weights: [0.34, 0.33, 0.33],
    status: 'active',
    hypothesis: "Un H1 axé 'rapidité' (2 min) augmente la conversion vs 'simplicité'.",
    primaryMetric: 'click_simulateur',
    startDate: '2026-05-14',
    holdout: 0.05,
  }),
}
```

### Étape 2 — Brancher dans le composant client

```tsx
'use client'
const variant = useExperiment(EXPERIMENTS.homeH1)

const h1 = {
  control: 'Comparez et économisez en 2 minutes',
  simplicite: "L'assurance pro simple, en 2 minutes",
  rapidite: 'Décennale BTP en 24h chrono',
}[variant]
```

### Étape 3 — Track la conversion sur l'action cible

```tsx
trackConversion(EXPERIMENTS.homeH1, 'click_simulateur')
```

### Étape 4 — Mesurer dans GA4

Dans GA4 → Explorations → Free form, créer :

- Dimension : `experiment_id` + `variant` (custom dimensions)
- Métrique : count of `ab_conversion` events
- Segments : par variant

## 6. Tests E2E

Le fichier `e2e/ab-testing.spec.ts` vérifie :

- Cookie `vivos_vid` créé à la 1ʳᵉ visite
- Cookie `ab_variants` populated quand une expérience est branchée
- Event `ab_exposure` pushé dans `dataLayer`
- Stickyness : cookies stables entre rechargements

**Note** : les tests sont `test.skip()` soft si aucune expérience n'est utilisée par un composant client. C'est le cas en l'état (infra prête, pas branchée). Brancher une expérience → tests s'activent automatiquement.

## 7. Sample size & durée recommandée

- **Minimum statistique** : 5 000 visiteurs par variant pour détecter un uplift de 10 % avec α=0.05, power=0.80
- **Pour Vivos pré-launch** : difficile à atteindre vite. Stratégie : laisser tourner 4-6 semaines après le launch ORIAS, puis analyser.
- **Holdout 5 %** : garder un échantillon jamais exposé pour mesurer la baseline naturelle.

## 8. Bonnes pratiques

✅ **Faire** :

- Un seul test "majeur" à la fois (évite les interactions croisées)
- Tester un changement à la fois (titre OU couleur, pas les 2)
- Documenter l'hypothèse AVANT le test (évite biais a posteriori)
- Analyser avec significance test (Z-test ou bootstrap)

❌ **Éviter** :

- Stopper un test trop tôt (peeking → faux positifs)
- Tester des micro-changements (perte de temps + bruit)
- Oublier le tracking de conversion (test inutile sans métrique)
- Activer 5 tests simultanés sans plan de lecture

## 9. Resources

- [GA4 A/B Test analysis](https://support.google.com/analytics/answer/9304018)
- [CXL — Sample size calculator](https://cxl.com/ab-test-calculator/)
- [Optimizely — Statistical significance](https://www.optimizely.com/optimization-glossary/statistical-significance/)
