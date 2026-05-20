'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Euro, Loader2, ShieldCheck, Sparkles, Star } from 'lucide-react'

interface WidgetQuoteClientProps {
  proofId?: string
  variant: 'quote' | 'compare' | 'audit'
}

interface QuoteData {
  prime_min: number
  prime_med: number
  prime_max: number
  currency: string
  periodicity: string
  assureurs: Array<{ nom: string; prix_annuel: number; plafond: string; rating: string }>
  sinistralite_metier: number | null
  reference_legale: string | null
  ipid_url: string
  devis_url: string
}

interface CompareData {
  garantie: string
  metier: string
  statut: string
  offres: Array<{
    assureur: string
    prix_annuel_eur: number
    plafond: string
    rating: string
    trustscore: number
    delai_attestation: string
    recommande: boolean
  }>
  meilleur_prix: string
  meilleur_plafond: string
  devis_url: string
}

type WidgetData =
  | { type: 'quote'; data: QuoteData }
  | { type: 'compare'; data: CompareData }
  | { type: 'audit'; data: Record<string, unknown> }
  | { type: 'error'; message: string }
  | { type: 'loading' }

export function WidgetQuoteClient({ proofId, variant }: WidgetQuoteClientProps) {
  const [state, setState] = useState<WidgetData>({ type: 'loading' })

  useEffect(() => {
    if (!proofId) {
      setState({ type: 'error', message: "proofId manquant dans l'URL du widget" })
      return
    }

    const method =
      variant === 'compare'
        ? 'compare_offers'
        : variant === 'audit'
          ? 'audit_coverage'
          : 'generate_quote_pro'

    fetch('/api/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: { name: method, arguments: { proofId } },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setState({ type: 'error', message: json.error.message ?? 'Erreur inconnue' })
          return
        }
        const sc = json.result?.structuredContent
        if (!sc) {
          setState({ type: 'error', message: 'Réponse vide du serveur MCP' })
          return
        }
        if (variant === 'compare') {
          setState({ type: 'compare', data: sc as CompareData })
        } else if (variant === 'audit') {
          setState({ type: 'audit', data: sc as Record<string, unknown> })
        } else {
          setState({ type: 'quote', data: sc as QuoteData })
        }
      })
      .catch((err) => {
        setState({
          type: 'error',
          message: err instanceof Error ? err.message : 'Erreur réseau widget',
        })
      })
  }, [proofId, variant])

  if (state.type === 'loading') {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-charcoal-100 bg-white p-8 shadow-soft">
        <Loader2 className="h-8 w-8 animate-spin text-primary-700" />
        <span className="ml-3 text-sm font-medium text-charcoal-700">Génération devis…</span>
      </div>
    )
  }

  if (state.type === 'error') {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">
        <p className="mb-2 font-bold">Erreur widget</p>
        <p>{state.message}</p>
      </div>
    )
  }

  if (state.type === 'quote') {
    return <QuoteWidget data={state.data} />
  }

  if (state.type === 'compare') {
    return <CompareWidget data={state.data} />
  }

  return null
}

// ─── Quote Widget ─────────────────────────────────────────────────────────

function QuoteWidget({ data }: { data: QuoteData }) {
  return (
    <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft md:p-8">
      <header className="mb-5">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-700">
          <Sparkles className="h-3 w-3" strokeWidth={2.4} />
          Devis Vivos Assurance
        </span>
        <h2 className="font-heading text-xl font-extrabold text-charcoal-900 md:text-2xl">
          Devis personnalisé
        </h2>
      </header>

      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <PriceBox label="Min" value={data.prime_min} currency={data.currency} />
        <PriceBox label="Médiane" value={data.prime_med} currency={data.currency} highlight />
        <PriceBox label="Max" value={data.prime_max} currency={data.currency} />
      </div>

      {data.assureurs?.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-charcoal-600">
            Assureurs partenaires
          </p>
          <ul className="space-y-2">
            {data.assureurs.slice(0, 5).map((a, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-xl border border-charcoal-100 bg-sand-50 px-3 py-2 text-sm"
              >
                <span className="font-bold text-charcoal-900">{a.nom}</span>
                <span className="text-charcoal-600">
                  {a.prix_annuel.toLocaleString('fr-FR')} €/an · {a.rating ?? 'A'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.sinistralite_metier ? (
        <p className="mb-4 text-xs text-charcoal-500">
          Sinistralité métier : {data.sinistralite_metier}% (AQC SYCODÉS 2026)
        </p>
      ) : null}

      <a
        href={data.devis_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-600 px-5 py-3 text-sm font-extrabold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-secondary-700"
      >
        Finaliser le devis
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>

      <DdaFooter />
    </div>
  )
}

// ─── Compare Widget ───────────────────────────────────────────────────────

function CompareWidget({ data }: { data: CompareData }) {
  return (
    <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft md:p-8">
      <header className="mb-5">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-700">
          <ShieldCheck className="h-3 w-3" strokeWidth={2.4} />
          Comparatif Vivos
        </span>
        <h2 className="font-heading text-xl font-extrabold text-charcoal-900 md:text-2xl">
          {data.garantie} · {data.metier} ({data.statut})
        </h2>
      </header>

      <ul className="mb-5 space-y-2">
        {data.offres.map((o, i) => (
          <li
            key={i}
            className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
              o.recommande
                ? 'border-secondary-300 bg-secondary-50'
                : 'border-charcoal-100 bg-sand-50'
            }`}
          >
            <div>
              <p className="text-sm font-bold text-charcoal-900">
                {o.assureur}
                {o.recommande && (
                  <span className="ml-2 inline-flex items-center gap-0.5 rounded-full bg-secondary-200 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-secondary-900">
                    <Star className="h-2.5 w-2.5 fill-secondary-700" strokeWidth={0} />
                    Recommandé
                  </span>
                )}
              </p>
              <p className="text-xs text-charcoal-600">
                Rating {o.rating} · {o.delai_attestation} attestation
              </p>
            </div>
            <div className="text-right">
              <p className="font-heading text-base font-extrabold text-primary-700">
                {o.prix_annuel_eur.toLocaleString('fr-FR')} €/an
              </p>
              <p className="text-xs text-charcoal-500">
                <Star
                  className="inline h-3 w-3 fill-secondary-500 text-secondary-500"
                  strokeWidth={0}
                />{' '}
                {o.trustscore.toFixed(1)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mb-4 grid gap-2 rounded-xl border border-charcoal-100 bg-sand-50 p-3 text-xs">
        <p>
          <strong>🏆 Meilleur prix :</strong> {data.meilleur_prix}
        </p>
        <p>
          <strong>🛡️ Meilleur plafond :</strong> {data.meilleur_plafond}
        </p>
      </div>

      <a
        href={data.devis_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-600 px-5 py-3 text-sm font-extrabold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-secondary-700"
      >
        Souscrire chez {data.meilleur_prix}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>

      <DdaFooter />
    </div>
  )
}

// ─── Shared components ────────────────────────────────────────────────────

function PriceBox({
  label,
  value,
  currency,
  highlight,
}: {
  label: string
  value: number
  currency: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-3 text-center ${
        highlight ? 'border-primary-300 bg-primary-50' : 'border-charcoal-100 bg-sand-50'
      }`}
    >
      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-charcoal-600">
        <Euro className="inline h-3 w-3" strokeWidth={2.4} /> {label}
      </p>
      <p
        className={`font-heading text-lg font-extrabold tabular-nums ${
          highlight ? 'text-primary-800' : 'text-charcoal-900'
        }`}
      >
        {Math.round(value).toLocaleString('fr-FR')} {currency}
      </p>
      <p className="text-[10px] text-charcoal-500">par an</p>
    </div>
  )
}

function DdaFooter() {
  return (
    <p className="mt-4 flex items-start gap-1.5 text-[10px] leading-relaxed text-charcoal-500">
      <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-secondary-600" strokeWidth={2.4} />
      <span>
        Information précontractuelle DDA (art. L.521-4 C. assur.). Courtier ORIAS Vivos Assurance.
        Tarifs indicatifs basés sur barèmes propriétaires + AQC SYCODÉS + INSEE Sirene.
      </span>
    </p>
  )
}
