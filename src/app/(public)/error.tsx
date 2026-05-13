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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="mb-4 font-heading text-3xl font-bold tracking-tight text-gray-900">
          Oups ! Une erreur est survenue
        </h1>
        <p className="mb-8 text-gray-600">
          Nous nous excusons pour ce désagrément. Notre équipe technique a été notifiée.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            <RefreshCw className="h-5 w-5" />
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Home className="h-5 w-5" />
            Retour à l'accueil
          </Link>
        </div>

        {error.digest && <p className="mt-8 text-sm text-gray-400">Code erreur : {error.digest}</p>}
      </div>
    </div>
  )
}
