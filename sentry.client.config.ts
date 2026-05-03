/**
 * Sentry — client (browser) instrumentation.
 *
 * Activation : positionner SENTRY_DSN (ou NEXT_PUBLIC_SENTRY_DSN) en prod.
 * Sans DSN, Sentry est entièrement no-op (aucun appel réseau, aucune perf hit).
 */
import * as Sentry from '@sentry/nextjs'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    beforeSend(event) {
      // Strip PII headers/cookies — conformité RGPD courtage assurance.
      if (event.request) {
        delete event.request.cookies
        delete event.request.headers
      }
      return event
    },
  })
}
