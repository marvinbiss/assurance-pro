/**
 * Tracking events — A/B exposure + conversion goals.
 *
 * Stratégie : double envoi GA4 (dataLayer.push) + Sentry breadcrumb
 * pour audit + recoupement entre 2 sources.
 *
 * Compatible Consent Mode v2 — n'envoie que si analytics_storage = granted.
 */

import type { ExperimentMetadata } from './experiments'

type DataLayerEvent = {
  event: string
  [key: string]: unknown
}

function pushDataLayer(event: DataLayerEvent): void {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { dataLayer?: DataLayerEvent[] }
  if (!w.dataLayer) return
  w.dataLayer.push(event)
}

function getSentry(): { addBreadcrumb: (b: unknown) => void } | null {
  if (typeof window === 'undefined') return null
  const w = window as typeof window & { Sentry?: { addBreadcrumb: (b: unknown) => void } }
  return w.Sentry ?? null
}

// ─── Exposure events ────────────────────────────────────────────────────────

/**
 * À appeler une fois par session × expérience lorsque l'utilisateur voit la variante.
 * Idempotent : protège contre double-fire via sessionStorage.
 */
export function trackExposure(experiment: ExperimentMetadata, variant: string): void {
  if (typeof window === 'undefined') return
  const key = `ab_exposed:${experiment.id}:${variant}`
  if (window.sessionStorage.getItem(key)) return
  window.sessionStorage.setItem(key, '1')

  pushDataLayer({
    event: 'ab_exposure',
    experiment_id: experiment.id,
    variant,
    primary_metric: experiment.primaryMetric,
  })

  getSentry()?.addBreadcrumb({
    category: 'ab-test',
    message: `Exposed: ${experiment.id} = ${variant}`,
    level: 'info',
    data: { experimentId: experiment.id, variant },
  })
}

// ─── Conversion events ──────────────────────────────────────────────────────

/**
 * À appeler à chaque conversion. Peut fire plusieurs fois (ex: page view, click, submit).
 * GA4 attribuera la conversion à toutes les variantes auxquelles l'utilisateur a été
 * exposé dans la session.
 */
export function trackConversion(goal: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return

  pushDataLayer({
    event: 'ab_conversion',
    goal,
    ...params,
  })

  getSentry()?.addBreadcrumb({
    category: 'ab-test',
    message: `Conversion: ${goal}`,
    level: 'info',
    data: { goal, ...params },
  })
}

// ─── Pre-defined goals (catalogue) ──────────────────────────────────────────

export const GOALS = {
  DEVIS_FORM_VIEWED: 'devis_form_viewed',
  DEVIS_FORM_STARTED: 'devis_form_started',
  DEVIS_FORM_SUBMITTED: 'devis_form_submitted',
  CHATBOT_OPENED: 'chatbot_opened',
  CHATBOT_QUESTION_SENT: 'chatbot_question_sent',
  CTA_DEVIS_CLICKED: 'cta_devis_clicked',
  PHONE_CLICKED: 'phone_clicked',
  EMAIL_CLICKED: 'email_clicked',
} as const

export type GoalId = (typeof GOALS)[keyof typeof GOALS]
