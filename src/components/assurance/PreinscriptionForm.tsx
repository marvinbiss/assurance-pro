'use client'

import { useState } from 'react'
import { CheckCircle2, Mail, Loader2, ArrowRight, ShieldCheck } from 'lucide-react'

interface PreinscriptionFormProps {
  defaultVertical?: string
}

export function PreinscriptionForm({ defaultVertical }: PreinscriptionFormProps) {
  const [email, setEmail] = useState('')
  const [vertical, setVertical] = useState(defaultVertical ?? '')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!consent) {
      setError('Merci de cocher la case de consentement.')
      return
    }
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/preinscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, vertical: vertical || undefined, consent: true }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error ?? 'Erreur — merci de réessayer.')
      }
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur réseau')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-secondary-200 bg-gradient-to-br from-secondary-50 to-white p-8 text-center shadow-soft md:p-12">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100">
          <CheckCircle2 className="h-8 w-8 text-secondary-700" strokeWidth={2.4} />
        </div>
        <h2 className="mb-3 font-heading text-2xl font-extrabold text-charcoal-900 md:text-3xl">
          Préinscription confirmée
        </h2>
        <p className="mx-auto max-w-xl text-charcoal-600">
          Merci&nbsp;! Nous vous écrivons dès l&apos;immatriculation ORIAS validée pour vous
          présenter nos offres et activer votre devis personnalisé.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="preinscription-email"
          className="mb-2 block text-sm font-bold text-charcoal-800"
        >
          Email professionnel <span className="text-primary-600">*</span>
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-500"
            strokeWidth={2.4}
            aria-hidden="true"
          />
          <input
            id="preinscription-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@entreprise.fr"
            className="w-full rounded-xl border border-charcoal-200 bg-white px-12 py-3.5 text-base text-charcoal-900 placeholder:text-charcoal-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="preinscription-vertical"
          className="mb-2 block text-sm font-bold text-charcoal-800"
        >
          Garantie d&apos;intérêt <span className="text-charcoal-500">(optionnel)</span>
        </label>
        <select
          id="preinscription-vertical"
          value={vertical}
          onChange={(e) => setVertical(e.target.value)}
          className="w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3.5 text-base text-charcoal-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        >
          <option value="">— Je ne sais pas encore</option>
          <option value="decennale">Garantie décennale BTP</option>
          <option value="rc_pro">Responsabilité Civile Pro</option>
          <option value="multirisque">Multirisque Pro</option>
          <option value="mutuelle">Mutuelle TNS (Madelin)</option>
          <option value="vtc">Assurance VTC — Taxi</option>
          <option value="cyber">Cyber assurance</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-charcoal-200 bg-sand-50 p-4 text-sm text-charcoal-700">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 cursor-pointer rounded border-charcoal-300 text-primary-600 focus:ring-primary-500"
        />
        <span>
          J&apos;accepte d&apos;être informé(e) par email du lancement commercial de Vivos
          Assurance, dès l&apos;immatriculation ORIAS validée. Je peux me désinscrire à tout moment.
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm font-semibold text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-4 text-base font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-cta-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Envoi…
          </>
        ) : (
          <>
            Rejoindre la liste d&apos;attente
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-charcoal-500">
        <ShieldCheck className="h-3.5 w-3.5 text-secondary-600" strokeWidth={2.4} />
        RGPD &middot; Données stockées en UE, jamais revendues
      </p>
    </form>
  )
}
