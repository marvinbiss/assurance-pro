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
      tags: { boundary: 'app-root-error' },
      extra: { digest: error.digest },
    })
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 shadow-glow-clay">
          <AlertTriangle className="h-10 w-10 text-white" strokeWidth={2.2} />
        </div>
        <h1 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-charcoal-900">
          Oups ! Une erreur est survenue
        </h1>
        <p className="mb-8 text-base text-charcoal-600">
          Nous nous excusons pour ce désagrément. Notre équipe technique a été notifiée.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-cta-hover"
          >
            <RefreshCw className="h-5 w-5 transition-transform group-hover:rotate-180" />
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-charcoal-200 bg-white px-6 py-3 font-bold text-charcoal-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-charcoal-300 hover:shadow-premium"
          >
            <Home className="h-5 w-5" />
            Retour à l&apos;accueil
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-charcoal-500">
            Code erreur : <span className="font-mono">{error.digest}</span>
          </p>
        )}
      </div>
    </div>
  )
}
