'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface NewsletterFormProps {
  /** Variant visuel : 'compact' (footer) ou 'card' (bannière homepage) */
  variant?: 'compact' | 'card'
  /** Source tracking (passé au backend si étendu plus tard) */
  source?: string
}

export function NewsletterForm({ variant = 'compact', source = 'footer' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return

    if (!email.trim()) {
      setStatus('error')
      setErrorMsg('Email requis')
      return
    }
    if (!consent) {
      setStatus('error')
      setErrorMsg('Consentement RGPD requis')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent: true }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        setStatus('error')
        setErrorMsg(
          res.status === 429
            ? 'Trop de tentatives. Réessayez dans quelques minutes.'
            : (data.error ?? 'Une erreur est survenue.')
        )
        return
      }

      setStatus('success')
      setEmail('')
      setConsent(false)
    } catch {
      setStatus('error')
      setErrorMsg('Erreur réseau. Réessayez.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={`flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 ${
          variant === 'card' ? 'p-6' : 'p-4'
        } text-green-800`}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" strokeWidth={2.4} />
        <div className="text-sm">
          <strong>Inscription confirmée.</strong> Vérifiez votre boîte email — vous allez recevoir
          un message de bienvenue dans les prochaines minutes.
        </div>
      </div>
    )
  }

  const inputId = `newsletter-email-${source}`
  const consentId = `newsletter-consent-${source}`

  if (variant === 'card') {
    return (
      <div className="rounded-3xl border border-charcoal-100 bg-white p-6 shadow-soft md:p-8">
        <div className="mb-5 flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
            <Mail className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div>
            <h3 className="mb-1 font-heading text-lg font-extrabold tracking-tight text-charcoal-900">
              Newsletter mensuelle Vivos
            </h3>
            <p className="text-sm leading-relaxed text-charcoal-600">
              Actualités ACPR · DDA · Loi Spinetta. Guides BTP, RC Pro, Mutuelle TNS, Cyber, VTC.
              Désinscription en 1 clic.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor={inputId} className="sr-only">
            Adresse email
          </label>
          <input
            id={inputId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="prenom@exemple.fr"
            required
            disabled={status === 'submitting'}
            autoComplete="email"
            className="mb-3 w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-sm text-charcoal-900 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:bg-sand-100"
          />

          <label
            htmlFor={consentId}
            className="mb-4 flex cursor-pointer items-start gap-2 text-xs leading-snug text-charcoal-600"
          >
            <input
              id={consentId}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 flex-shrink-0 accent-primary-600"
            />
            <span>
              J'accepte de recevoir la newsletter mensuelle. Désinscription possible à tout moment.{' '}
              <Link href="/confidentialite" className="underline hover:text-primary-700">
                Politique RGPD
              </Link>
              .
            </span>
          </label>

          {status === 'error' && errorMsg && (
            <div
              className="mb-3 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" strokeWidth={2.4} />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-extrabold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} />
                Inscription…
              </>
            ) : (
              <>
                S'inscrire à la newsletter
                <Mail className="h-4 w-4" strokeWidth={2.4} />
              </>
            )}
          </button>
        </form>
      </div>
    )
  }

  // Variant compact (footer)
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2">
      <label htmlFor={inputId} className="block text-xs font-bold text-charcoal-700">
        Newsletter mensuelle
      </label>
      <div className="flex gap-2">
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="prenom@exemple.fr"
          required
          disabled={status === 'submitting'}
          autoComplete="email"
          className="flex-1 rounded-lg border border-charcoal-200 bg-white px-3 py-2 text-sm text-charcoal-900 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:bg-sand-100"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          aria-label="S'inscrire à la newsletter"
          className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} />
          ) : (
            <Mail className="h-4 w-4" strokeWidth={2.4} />
          )}
        </button>
      </div>

      <label
        htmlFor={consentId}
        className="flex cursor-pointer items-start gap-2 text-[11px] leading-snug text-charcoal-600"
      >
        <input
          id={consentId}
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-primary-600"
        />
        <span>
          J'accepte de recevoir la newsletter (désinscription en 1 clic).{' '}
          <Link href="/confidentialite" className="underline hover:text-primary-700">
            RGPD
          </Link>
        </span>
      </label>

      {status === 'error' && errorMsg && (
        <div className="flex items-start gap-1.5 text-[11px] text-red-600" role="alert">
          <AlertCircle className="mt-0.5 h-3 w-3 flex-shrink-0" strokeWidth={2.4} />
          <span>{errorMsg}</span>
        </div>
      )}
    </form>
  )
}
