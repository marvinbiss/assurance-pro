'use client'

import { useState, useTransition } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { subscribeNewsletter, type NewsletterResult } from '@/app/(public)/blog/_actions/newsletter'

export function NewsletterForm() {
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<NewsletterResult | null>(null)
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const r = await subscribeNewsletter(formData)
      setResult(r)
      if (r.ok) setEmail('')
    })
  }

  if (result?.ok) {
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-2xl border border-secondary-300/40 bg-white/10 px-5 py-5 text-white backdrop-blur-sm"
      >
        <CheckCircle2
          className="h-6 w-6 flex-shrink-0 text-secondary-300"
          strokeWidth={2.4}
          aria-hidden="true"
        />
        <p className="m-0 text-sm font-bold">{result.message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      {/* honeypot */}
      <div
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="company">Entreprise (laisser vide)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Votre adresse email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vous@entreprise.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={pending}
          aria-invalid={result && !result.ok ? 'true' : undefined}
          className="flex-1 rounded-xl border border-white/25 bg-white/10 px-5 py-4 text-base text-white backdrop-blur-sm placeholder:text-white/50 focus:border-secondary-300 focus:outline-none focus:ring-2 focus:ring-secondary-300/40 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-7 py-4 text-base font-extrabold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-cta-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} aria-hidden="true" />
              Envoi…
            </>
          ) : (
            <>
              S&apos;inscrire
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </div>

      {result && !result.ok && (
        <p role="alert" className="text-xs font-bold text-red-300">
          {result.message}
        </p>
      )}

      <p className="text-[11px] text-white/60">
        RGPD · consentement explicite · hébergement UE · désinscription en 1 clic.
      </p>
    </form>
  )
}
