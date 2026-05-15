'use client'

import { useState, type FormEvent } from 'react'
import { Check, Mail } from 'lucide-react'

interface NewsletterCaptureProps {
  title?: string
  subtitle?: string
  placeholder?: string
  ctaLabel?: string
  className?: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterCapture({
  title = 'Restez informé des évolutions du marché',
  subtitle = 'Une newsletter mensuelle. Décryptages ACPR, comparatifs, guides pratiques. Désinscription en un clic.',
  placeholder = 'votre@email.fr',
  ctaLabel = "S'inscrire",
  className = '',
}: NewsletterCaptureProps) {
  const [email, setEmail] = useState<string>('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string>('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setMessage('')

    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus('error')
      setMessage('Adresse email invalide.')
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent: true }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage('Merci, vous êtes inscrit.')
        setEmail('')
        return
      }

      // 404 — endpoint missing: treat as graceful success (per spec mock-if-404)
      if (res.status === 404) {
        setStatus('success')
        setMessage('Merci, vous êtes inscrit.')
        setEmail('')
        return
      }

      const data: unknown = await res.json().catch(() => ({}))
      const errMsg =
        typeof data === 'object' &&
        data !== null &&
        'error' in data &&
        typeof (data as { error: unknown }).error === 'string'
          ? (data as { error: string }).error
          : 'Une erreur est survenue. Réessayez dans un instant.'
      setStatus('error')
      setMessage(errMsg)
    } catch {
      setStatus('error')
      setMessage('Erreur réseau. Vérifiez votre connexion.')
    }
  }

  const isError = status === 'error'
  const isSuccess = status === 'success'
  const isSubmitting = status === 'submitting'

  return (
    <div className={`rounded-2xl border border-sand-300 bg-sand-100 p-8 shadow-soft ${className}`}>
      <div className="mb-5 flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary-600" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-charcoal-900">{title}</h3>
      </div>
      {subtitle && <p className="mb-6 text-sm leading-relaxed text-charcoal-700">{subtitle}</p>}

      {isSuccess ? (
        <div
          className="flex items-center gap-3 rounded-xl border border-accent-300 bg-accent-50 px-4 py-3"
          aria-live="polite"
        >
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-sm font-medium text-accent-700">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Adresse email
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            disabled={isSubmitting}
            placeholder={placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') setStatus('idle')
            }}
            aria-invalid={isError}
            aria-describedby="newsletter-status"
            className={`flex-1 rounded-md border bg-white px-4 py-3 text-base text-charcoal-900 placeholder-charcoal-400 transition-colors duration-200 ease-enter focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:opacity-60 ${
              isError ? 'border-red-500' : 'border-sand-400'
            }`}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md bg-primary-400 px-6 py-3 font-heading text-sm font-semibold text-white shadow-cta transition-all duration-200 ease-enter hover:bg-primary-500 hover:shadow-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Envoi…' : ctaLabel}
          </button>
        </form>
      )}

      <p
        id="newsletter-status"
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-sm ${isError ? 'text-red-600' : 'text-charcoal-500'}`}
      >
        {isError ? message : ''}
      </p>
    </div>
  )
}
