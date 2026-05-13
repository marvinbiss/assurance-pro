/**
 * Next.js Instrumentation — Sentry initialization (server + edge runtimes).
 *
 * Remplace sentry.server.config.ts + sentry.edge.config.ts (deprecated dans Sentry 8.x).
 * Doc : https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 *
 * Activation : positionner SENTRY_DSN en prod. Sans DSN = no-op (aucun appel réseau).
 */

function resolveDsn(): string | undefined {
  const raw = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN
  // Ignore les placeholders (ex: "https://...@sentry.io/...") pour éviter
  // de polluer le dev / les logs avec un DSN invalide.
  if (!raw || raw.includes('...') || raw.includes('XXX')) return undefined
  return raw
}

export async function register() {
  const dsn = resolveDsn()
  if (!dsn) return

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs')
    Sentry.init({
      dsn,
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development',
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      beforeSend(event) {
        if (event.request) {
          delete event.request.cookies
          delete event.request.headers
        }
        return event
      },
    })
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    const Sentry = await import('@sentry/nextjs')
    Sentry.init({
      dsn,
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development',
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      // Strip PII (cookies, headers) — conformité RGPD courtage assurance.
      beforeSend(event) {
        if (event.request) {
          delete event.request.cookies
          delete event.request.headers
        }
        return event
      },
    })
  }
}

export async function onRequestError(
  err: unknown,
  request: { path: string; method: string; headers: Record<string, string> },
  context: { routerKind: 'Pages Router' | 'App Router'; routePath: string; routeType: string }
) {
  const dsn = resolveDsn()
  if (!dsn) return
  const Sentry = await import('@sentry/nextjs')
  Sentry.captureRequestError(err, request, context)
}
