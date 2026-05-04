/**
 * Next.js Instrumentation — Sentry client (browser).
 *
 * Remplace sentry.client.config.ts (renommage requis Sentry 8.x + Turbopack).
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

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
