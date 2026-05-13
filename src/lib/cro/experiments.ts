/**
 * Experiments registry — source de vérité pour les A/B tests actifs.
 *
 * Pattern : registry centralisé typé pour éviter strings volants dans le code.
 * Chaque expérience expose :
 *   - id stable (sticky-cta-v1)
 *   - variants typés (literal union)
 *   - poids (équiprobables par défaut)
 *   - statut (active / paused / archived)
 *   - hypothèse (pour reporting)
 *   - metric primaire (KPI sur lequel mesurer le succès)
 *
 * Ajout d'une expérience :
 *   1. Définir le type + l'objet dans EXPERIMENTS ci-dessous
 *   2. Utiliser useExperiment(EXPERIMENTS.X) côté client (auto-exposure tracking)
 *   3. Mesurer conversion via trackConversion(EXPERIMENTS.X, 'goal-id')
 */

import type { ABExperiment } from './ab-testing'

export type ExperimentStatus = 'active' | 'paused' | 'archived'

export interface ExperimentMetadata<V extends string = string> extends ABExperiment<V> {
  status: ExperimentStatus
  hypothesis: string
  primaryMetric: string
  startDate: string // ISO YYYY-MM-DD
  endDate?: string
  /** Holdout fraction 0..1 — visiteurs jamais exposés (mesure baseline). */
  holdout?: number
}

/**
 * Helper pour figer le type V depuis le tableau variants.
 */
function defineExperiment<V extends string>(
  e: Omit<ExperimentMetadata<V>, 'variants'> & { variants: readonly V[] }
): ExperimentMetadata<V> {
  return e
}

// ─── REGISTRY ────────────────────────────────────────────────────────────────

export const EXPERIMENTS = {
  /** Couleur du CTA principal sur pages prix (orange vs bleu). */
  ctaColor: defineExperiment({
    id: 'cta-color-v1',
    variants: ['control', 'orange', 'green'] as const,
    weights: [0.34, 0.33, 0.33],
    status: 'active' as ExperimentStatus,
    hypothesis: 'Un CTA orange (warm) augmente les clics devis sur pages prix vs bleu (control).',
    primaryMetric: 'click_devis_form',
    startDate: '2026-05-12',
    holdout: 0.05,
  }),

  /** Position de la sticky bar de conversion (bottom vs top vs none). */
  stickyBarPosition: defineExperiment({
    id: 'sticky-bar-position-v1',
    variants: ['none', 'bottom', 'top'] as const,
    weights: [0.2, 0.6, 0.2],
    status: 'active' as ExperimentStatus,
    hypothesis: 'Une sticky bar bottom convertit mieux que top (UX moins intrusive sur mobile).',
    primaryMetric: 'devis_form_submitted',
    startDate: '2026-05-12',
    holdout: 0.05,
  }),

  /** Hero copywriting (3 variantes pitch). */
  heroPitch: defineExperiment({
    id: 'hero-pitch-v1',
    variants: ['economies', 'rapidite', 'orias'] as const,
    weights: [0.34, 0.33, 0.33],
    status: 'active' as ExperimentStatus,
    hypothesis:
      'Le pitch "économies" (vs rapidité ou ORIAS) attire plus de signups sur audience price-sensitive.',
    primaryMetric: 'devis_form_submitted',
    startDate: '2026-05-12',
    holdout: 0.05,
  }),

  /** Chatbot affiché ou non (test impact perf + conversion). */
  chatbotEnabled: defineExperiment({
    id: 'chatbot-enabled-v1',
    variants: ['off', 'on'] as const,
    weights: [0.5, 0.5],
    status: 'active' as ExperimentStatus,
    hypothesis: "L'affichage du chatbot RAG augmente les conversions form devis sans dégrader LCP.",
    primaryMetric: 'devis_form_submitted',
    startDate: '2026-05-12',
    holdout: 0.05,
  }),
} as const

export type ExperimentId = keyof typeof EXPERIMENTS
export type ExperimentVariant<K extends ExperimentId> = (typeof EXPERIMENTS)[K]['variants'][number]

// ─── Liste expériences actives (utility) ─────────────────────────────────────

export function listActiveExperiments(): ExperimentMetadata[] {
  return Object.values(EXPERIMENTS).filter((e) => e.status === 'active') as ExperimentMetadata[]
}

export function isExperimentActive(experiment: ExperimentMetadata): boolean {
  if (experiment.status !== 'active') return false
  const now = new Date()
  const start = new Date(experiment.startDate)
  if (now < start) return false
  if (experiment.endDate && now > new Date(experiment.endDate)) return false
  return true
}
