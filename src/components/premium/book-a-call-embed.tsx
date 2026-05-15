'use client'

import { Clock, Lock, ShieldCheck } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'

interface BookACallEmbedProps {
  calendlyUrl?: string
  expertName: string
  expertRole?: string
  className?: string
}

type SubmitState = 'idle' | 'submit' | 'success' | 'error'

export function BookACallEmbed({
  calendlyUrl,
  expertName,
  expertRole,
  className = '',
}: BookACallEmbedProps) {
  const nameId = useId()
  const phoneId = useId()
  const emailId = useId()
  const messageId = useId()
  const statusId = useId()

  const [state, setState] = useState<SubmitState>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state === 'submit') return
    setState('submit')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: String(formData.get('name') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      source: 'book-a-call-embed',
      expert: expertName,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setState('success')
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erreur réseau')
    }
  }

  return (
    <section
      className={`rounded-2xl border border-sand-300 bg-white p-8 shadow-soft ${className}`}
      aria-label={`Réserver un appel avec ${expertName}`}
    >
      <div className="mb-2 inline-flex items-center gap-2">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary-400" />
        <span className="font-heading text-xs font-semibold uppercase tracking-wide text-secondary-600">
          Réservation gratuite
        </span>
      </div>

      <h3 className="font-heading text-2xl font-semibold text-charcoal-900 sm:text-3xl">
        Réserver un appel avec {expertName}
      </h3>
      {expertRole && <p className="mt-1 font-heading text-sm text-charcoal-600">{expertRole}</p>}
      <p className="mt-3 text-sm text-charcoal-700">
        Discutez 30 min de votre situation, gratuit sans engagement.
      </p>

      {calendlyUrl ? (
        <div className="mt-6 overflow-hidden rounded-xl border border-sand-300">
          <iframe
            src={calendlyUrl}
            title={`Calendrier de réservation — ${expertName}`}
            loading="lazy"
            className="block w-full"
            style={{ minHeight: '720px', border: 0 }}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label
              htmlFor={nameId}
              className="block font-heading text-sm font-medium text-charcoal-800"
            >
              Nom complet
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              required
              autoComplete="name"
              className="mt-1 block w-full rounded-lg border border-sand-400 bg-white px-3 py-2.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            />
          </div>

          <div>
            <label
              htmlFor={phoneId}
              className="block font-heading text-sm font-medium text-charcoal-800"
            >
              Téléphone
            </label>
            <input
              id={phoneId}
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              className="mt-1 block w-full rounded-lg border border-sand-400 bg-white px-3 py-2.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            />
          </div>

          <div>
            <label
              htmlFor={emailId}
              className="block font-heading text-sm font-medium text-charcoal-800"
            >
              Email
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 block w-full rounded-lg border border-sand-400 bg-white px-3 py-2.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            />
          </div>

          <div>
            <label
              htmlFor={messageId}
              className="block font-heading text-sm font-medium text-charcoal-800"
            >
              Votre situation (optionnel)
            </label>
            <textarea
              id={messageId}
              name="message"
              rows={3}
              className="mt-1 block w-full resize-y rounded-lg border border-sand-400 bg-white px-3 py-2.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            />
          </div>

          <button
            type="submit"
            disabled={state === 'submit' || state === 'success'}
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary-400 px-6 py-3 font-heading text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state === 'submit' ? 'Envoi en cours…' : 'Rappel sous 24h'}
          </button>

          <div id={statusId} role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
            {state === 'success' && (
              <span className="text-accent-700">Merci — nous vous rappelons sous 24h ouvrées.</span>
            )}
            {state === 'error' && (
              <span className="text-primary-600">
                {errorMsg ? `Erreur : ${errorMsg}.` : 'Erreur.'} Réessayez ou appelez-nous.
              </span>
            )}
          </div>
        </form>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-sand-200 pt-4 text-xs text-charcoal-600">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" />
          Confidentiel
        </span>
        <span aria-hidden="true" className="text-sand-500">
          ·
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" />
          ORIAS
        </span>
        <span aria-hidden="true" className="text-sand-500">
          ·
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" />
          24h max
        </span>
      </div>
    </section>
  )
}
