/**
 * Helpers Sentry pour les routes API.
 *
 * No-op si SENTRY_DSN absent (sentry.server.config.ts ne fait pas init() sans
 * DSN, donc Sentry.captureException est lui-même no-op gracieux).
 *
 * Convention : tagger chaque erreur avec la route + une catégorie pour faciliter
 * le triage dans le dashboard Sentry.
 */

import * as Sentry from '@sentry/nextjs'

export interface CaptureContext {
  /** Identifiant unique de la route, ex: 'api/reclamation' */
  route: string
  /** Catégorie haute pour filtrage dashboard, ex: 'compliance' | 'lead' | 'gdpr' */
  category: 'compliance' | 'lead' | 'gdpr' | 'cron' | 'admin' | 'auth' | 'other'
  /** Métadonnées additionnelles non-PII (ticket, slug, statut HTTP, etc.) */
  extra?: Record<string, unknown>
}

/**
 * Capture une exception côté API avec tags structurés.
 * Filtre automatiquement les en-têtes/cookies avant envoi (RGPD).
 */
export function captureApiException(error: unknown, ctx: CaptureContext): void {
  Sentry.captureException(error, {
    tags: {
      route: ctx.route,
      category: ctx.category,
    },
    extra: ctx.extra,
  })
}

/**
 * Capture un message non-bloquant (warning, dégradation de service).
 */
export function captureApiMessage(
  message: string,
  level: 'warning' | 'error' = 'warning',
  ctx: CaptureContext,
): void {
  Sentry.captureMessage(message, {
    level,
    tags: {
      route: ctx.route,
      category: ctx.category,
    },
    extra: ctx.extra,
  })
}
