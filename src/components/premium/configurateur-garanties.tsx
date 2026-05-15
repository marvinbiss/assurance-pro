'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Settings } from 'lucide-react'

interface Garantie {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly pricePerMonth: number
  readonly included?: boolean
  readonly required?: boolean
}

interface ConfigurateurGarantiesProps {
  garanties: readonly Garantie[]
  baseLabel: string
  basePricePerMonth: number
  className?: string
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)
}

export function ConfigurateurGaranties({
  garanties,
  baseLabel,
  basePricePerMonth,
  className = '',
}: ConfigurateurGarantiesProps) {
  const [selected, setSelected] = useState<Readonly<Record<string, boolean>>>(() => {
    const initial: Record<string, boolean> = {}
    for (const g of garanties) {
      initial[g.id] = g.required === true || g.included === true
    }
    return initial
  })

  const total = useMemo<number>(() => {
    let sum = basePricePerMonth
    for (const g of garanties) {
      if (selected[g.id] === true) sum += g.pricePerMonth
    }
    return sum
  }, [garanties, selected, basePricePerMonth])

  const activeIds = useMemo<readonly string[]>(
    () => garanties.filter((g) => selected[g.id] === true).map((g) => g.id),
    [garanties, selected]
  )

  const queryString =
    activeIds.length > 0 ? `?garanties=${encodeURIComponent(activeIds.join(','))}` : ''

  function toggle(id: string, locked: boolean): void {
    if (locked) return
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div
      className={`rounded-2xl border border-sand-300 bg-white p-6 shadow-soft md:p-8 ${className}`}
    >
      <header className="mb-6 flex items-center gap-2">
        <Settings className="h-5 w-5 text-primary-600" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-charcoal-900">
          Configurez vos garanties
        </h3>
      </header>

      <div className="mb-6 flex items-center justify-between rounded-xl bg-sand-100 px-4 py-3">
        <span className="font-heading text-sm font-medium text-charcoal-800">{baseLabel}</span>
        <span
          className="font-heading text-sm font-semibold tabular-nums text-charcoal-900"
          style={{ fontFamily: 'var(--font-heading), Sora, sans-serif' }}
        >
          {formatPrice(basePricePerMonth)} / mois
        </span>
      </div>

      <ul className="mb-8 flex flex-col gap-3">
        {garanties.map((g) => {
          const locked = g.required === true
          const isOn = selected[g.id] === true
          return (
            <li
              key={g.id}
              className={`flex items-start justify-between gap-4 rounded-xl border p-4 transition-colors duration-200 ease-enter ${
                isOn ? 'border-accent-300 bg-accent-50' : 'border-sand-300 bg-white'
              }`}
            >
              <div className="flex-1">
                <p className="font-heading text-sm font-semibold text-charcoal-900">
                  {g.name}
                  {locked && (
                    <span className="ml-2 rounded-full bg-sand-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-charcoal-600">
                      Inclus
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-charcoal-700">{g.description}</p>
                <p className="mt-2 font-heading text-xs font-semibold uppercase tracking-wider text-secondary-700">
                  +{formatPrice(g.pricePerMonth)} / mois
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isOn}
                aria-label={`${isOn ? 'Désactiver' : 'Activer'} ${g.name}`}
                disabled={locked}
                onClick={() => toggle(g.id, locked)}
                className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors duration-200 ease-enter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${
                  isOn ? 'border-accent-500 bg-accent-500' : 'border-sand-400 bg-sand-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-enter ${
                    isOn ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>

      <div className="sticky bottom-0 -mx-6 flex flex-col gap-4 border-t border-sand-300 bg-white/95 px-6 py-5 backdrop-blur md:static md:mx-0 md:flex-row md:items-center md:justify-between md:rounded-xl md:border md:bg-sand-50 md:px-6">
        <div>
          <p className="font-heading text-xs uppercase tracking-wider text-charcoal-500">
            Total estimé
          </p>
          <p
            className="font-display text-3xl font-semibold tabular-nums text-charcoal-900"
            style={{ fontFamily: 'var(--font-heading), Fraunces, serif' }}
          >
            {formatPrice(total)}
            <span className="ml-1 font-heading text-sm font-medium text-charcoal-600">/ mois</span>
          </p>
        </div>
        <Link
          href={`/devis-assurance${queryString}`}
          className="inline-flex items-center justify-center rounded-md bg-primary-400 px-6 py-3 font-heading text-sm font-semibold text-white shadow-cta transition-all duration-200 ease-enter hover:bg-primary-500 hover:shadow-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
        >
          Souscrire ce devis
        </Link>
      </div>
    </div>
  )
}
