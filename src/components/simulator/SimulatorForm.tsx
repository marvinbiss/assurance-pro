'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Calculator,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import {
  METIERS,
  STATUTS,
  CA_RANGES,
  simulate,
  type Garantie,
  type Statut,
  type CARange,
  type Antecedents,
} from '@/lib/data/simulator-rates'

const ANTECEDENTS_OPTIONS: Array<{ id: Antecedents; label: string }> = [
  { id: 'none', label: 'Aucun sinistre déclaré ces 5 dernières années' },
  { id: 'one', label: '1 sinistre dans les 5 dernières années' },
  { id: 'two_plus', label: '2 sinistres ou plus dans les 5 dernières années' },
]

interface SimulatorFormProps {
  defaultGaranties?: Garantie[]
}

export function SimulatorForm({ defaultGaranties }: SimulatorFormProps) {
  const [step, setStep] = useState(0)
  const [metier, setMetier] = useState<string>('')
  const [statut, setStatut] = useState<Statut>('micro')
  const [ca, setCa] = useState<CARange>('30-77')
  const [antecedents, setAntecedents] = useState<Antecedents>('none')

  const metierData = METIERS.find((m) => m.id === metier)
  const availableGaranties = useMemo(() => metierData?.garanties ?? [], [metierData])
  const [selectedGaranties, setSelectedGaranties] = useState<Garantie[]>([])

  // À chaque changement de métier, présélectionner les garanties obligatoires + recommandées
  const handleMetierChange = (id: string) => {
    setMetier(id)
    const m = METIERS.find((x) => x.id === id)
    if (m) {
      const preset =
        defaultGaranties && defaultGaranties.length > 0
          ? defaultGaranties.filter((g) => m.garanties.includes(g))
          : m.garanties.slice(0, 2)
      setSelectedGaranties(preset.length > 0 ? preset : m.garanties.slice(0, 1))
    }
  }

  const toggleGarantie = (g: Garantie) => {
    setSelectedGaranties((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]))
  }

  const result = useMemo(() => {
    if (!metier || selectedGaranties.length === 0) return null
    return simulate({ metier, statut, ca, antecedents, garanties: selectedGaranties })
  }, [metier, statut, ca, antecedents, selectedGaranties])

  const canGoNext = (s: number) => {
    if (s === 0) return !!metier
    if (s === 1) return !!statut && !!ca
    if (s === 2) return !!antecedents && selectedGaranties.length > 0
    return true
  }

  return (
    <div className="rounded-3xl border border-charcoal-100 bg-white p-6 shadow-soft md:p-10">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-primary-600' : 'bg-charcoal-100'
            }`}
          />
        ))}
      </div>

      {/* Step 0 — Métier */}
      {step === 0 && (
        <div>
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
            Étape 1 sur 4
          </span>
          <h2 className="mb-2 font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
            Quel est votre métier ?
          </h2>
          <p className="mb-6 text-sm text-charcoal-600">
            Sélectionnez l&apos;activité la plus proche de la vôtre. Le simulateur s&apos;adapte
            automatiquement aux garanties pertinentes.
          </p>
          <label htmlFor="metier" className="sr-only">
            Métier
          </label>
          <select
            id="metier"
            value={metier}
            onChange={(e) => handleMetierChange(e.target.value)}
            className="w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3.5 text-base text-charcoal-900 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
          >
            <option value="">— Choisir un métier —</option>
            {METIERS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
                {m.decennaleObligatoire ? ' (BTP)' : ''}
              </option>
            ))}
          </select>
          {metierData && (
            <div className="mt-4 rounded-xl bg-secondary-50 p-4 text-sm text-charcoal-700">
              <strong className="text-secondary-700">Garanties pertinentes :</strong>{' '}
              {metierData.garanties.length} types.{' '}
              {metierData.decennaleObligatoire && (
                <span className="text-primary-700">
                  Décennale OBLIGATOIRE (Loi Spinetta art. L. 241-1).
                </span>
              )}
              {metierData.rcProObligatoire && !metierData.decennaleObligatoire && (
                <span className="text-primary-700">RC Pro OBLIGATOIRE par la loi.</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 1 — Statut + CA */}
      {step === 1 && (
        <div>
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
            Étape 2 sur 4
          </span>
          <h2 className="mb-6 font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
            Votre statut juridique et CA
          </h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="statut" className="mb-1.5 block text-sm font-bold text-charcoal-700">
                Statut juridique
              </label>
              <select
                id="statut"
                value={statut}
                onChange={(e) => setStatut(e.target.value as Statut)}
                className="w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3.5 text-base text-charcoal-900 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                {STATUTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="ca" className="mb-1.5 block text-sm font-bold text-charcoal-700">
                Chiffre d&apos;affaires annuel HT prévisionnel
              </label>
              <select
                id="ca"
                value={ca}
                onChange={(e) => setCa(e.target.value as CARange)}
                className="w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3.5 text-base text-charcoal-900 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                {CA_RANGES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 — Antécédents + Garanties */}
      {step === 2 && (
        <div>
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
            Étape 3 sur 4
          </span>
          <h2 className="mb-6 font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
            Antécédents et garanties souhaitées
          </h2>
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-charcoal-700">
                Antécédents sinistres
              </label>
              <div className="space-y-2">
                {ANTECEDENTS_OPTIONS.map((a) => (
                  <label
                    key={a.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                      antecedents === a.id
                        ? 'border-primary-400 bg-primary-50'
                        : 'border-charcoal-200 bg-white hover:bg-sand-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="antecedents"
                      value={a.id}
                      checked={antecedents === a.id}
                      onChange={() => setAntecedents(a.id)}
                      className="h-4 w-4 accent-primary-600"
                    />
                    <span className="text-sm text-charcoal-800">{a.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-charcoal-700">
                Garanties à inclure dans l&apos;estimation
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {availableGaranties.map((g) => {
                  const checked = selectedGaranties.includes(g)
                  return (
                    <label
                      key={g}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors ${
                        checked
                          ? 'border-primary-400 bg-primary-50'
                          : 'border-charcoal-200 bg-white hover:bg-sand-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleGarantie(g)}
                        className="h-4 w-4 accent-primary-600"
                      />
                      <span className="text-sm font-medium text-charcoal-800">
                        {g === 'rc-pro' && 'RC Pro'}
                        {g === 'decennale' && 'Décennale'}
                        {g === 'multirisque' && 'Multirisque'}
                        {g === 'mutuelle-tns' && 'Mutuelle TNS'}
                        {g === 'cyber' && 'Cyber'}
                        {g === 'auto-pro' && 'Auto pro'}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 — Résultats */}
      {step === 3 && result && (
        <div>
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-secondary-700">
            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.4} />
            Estimation
          </span>
          <h2 className="mb-2 font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
            Votre estimation 2026
          </h2>
          <p className="mb-6 text-sm text-charcoal-600">
            Fourchette indicative basée sur ~500 dossiers analysés. Le tarif définitif dépend de la
            souscription.
          </p>

          <div className="mb-6 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 p-6 text-white shadow-premium">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/80">
              Prime annuelle HT totale estimée
            </p>
            <p className="font-heading text-3xl font-extrabold md:text-4xl">
              {result.totalMin.toLocaleString('fr-FR')} – {result.totalMax.toLocaleString('fr-FR')}{' '}
              €<span className="ml-2 text-base font-bold text-white/85">/ an</span>
            </p>
            <p className="mt-1 text-sm text-white/85">
              Soit ~{Math.round(result.totalMin / 12).toLocaleString('fr-FR')} à ~
              {Math.round(result.totalMax / 12).toLocaleString('fr-FR')} € / mois
            </p>
          </div>

          <div className="mb-6 space-y-2">
            {result.perGarantie.map((g) => (
              <div
                key={g.garantie}
                className="flex items-center justify-between rounded-xl border border-charcoal-100 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-primary-600" strokeWidth={2.4} />
                  <div>
                    <p className="text-sm font-bold text-charcoal-900">{g.label}</p>
                    {g.obligatoire && (
                      <p className="text-[11px] font-bold uppercase tracking-wider text-secondary-700">
                        Obligatoire par la loi
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm font-semibold text-charcoal-700">
                  {g.min.toLocaleString('fr-FR')} – {g.max.toLocaleString('fr-FR')} €
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-5 text-sm text-charcoal-700">
            <strong className="text-secondary-800">⚠️ Estimation indicative.</strong> Pour obtenir
            un devis personnalisé ferme prenant en compte votre situation exacte (zone géographique,
            ancienneté, certifications RGE/Qualibat, options spécifiques), demandez un devis
            personnalisé.
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/devis?metier=${metier}&statut=${statut}&ca=${ca}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-4 text-base font-extrabold text-white shadow-premium transition-all hover:-translate-y-0.5 hover:bg-primary-700"
            >
              Obtenir un devis personnalisé
              <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
            </Link>
            <button
              type="button"
              onClick={() => setStep(0)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-charcoal-200 bg-white px-6 py-4 text-sm font-bold text-charcoal-700 transition-colors hover:bg-charcoal-50"
            >
              Refaire une simulation
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      {step < 3 && (
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-charcoal-600 transition-colors hover:bg-charcoal-50 disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
            Précédent
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(3, s + 1))}
            disabled={!canGoNext(step)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-extrabold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-charcoal-300 disabled:hover:translate-y-0"
          >
            {step === 2 ? (
              <>
                <Calculator className="h-4 w-4" strokeWidth={2.4} />
                Voir mon estimation
              </>
            ) : (
              <>
                Continuer
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
