'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import * as Sentry from '@sentry/nextjs'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { boundary: 'public-segment-error' },
      extra: { digest: error.digest },
    })
  }, [error])

  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <section className="noise-overlay relative overflow-hidden bg-charcoal-900 py-20 text-white md:py-28">
        <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-85" />
        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 ring-4 ring-red-400/30 backdrop-blur-sm">
            <AlertTriangle className="h-8 w-8 text-red-300" strokeWidth={2.4} aria-hidden="true" />
          </div>
          <p className="mb-2 font-display-premium text-5xl font-extrabold tabular-nums tracking-tight text-secondary-300 md:text-7xl">
            500
          </p>
          <h1 className="mb-4 font-display-premium font-heading text-3xl font-extrabold tracking-tight md:text-5xl">
            Erreur inattendue
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/85">
            Notre équipe technique a été notifiée via Sentry. Réessayez dans un instant — ou revenez
            à l&apos;accueil.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5"
            >
              <RefreshCw className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
              Réessayer
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Home className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
              Accueil
            </Link>
          </div>
          {error.digest && (
            <p className="mt-8 font-mono text-xs text-white/50">
              Code incident : <span className="text-white/80">{error.digest}</span>
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
