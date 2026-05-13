'use client'

import { useMemo, useState } from 'react'
import {
  calculerMutuelle,
  getFormuleDescription,
  FORMULE_LABELS,
  REGIME_LABELS,
  ZONE_LABELS,
  COMPOSITION_LABELS,
  type Composition,
  type Formule,
  type Regime,
  type Zone,
} from '@/lib/calculs/tarif-mutuelle-pro'

export function CalculateurTarifMutuellePro() {
  const [formule, setFormule] = useState<Formule>('standard')
  const [age, setAge] = useState<number>(40)
  const [regime, setRegime] = useState<Regime>('general-salarie')
  const [zone, setZone] = useState<Zone>('metropole')
  const [composition, setComposition] = useState<Composition>('duo')
  const [effectif, setEffectif] = useState<number>(1)

  const r = useMemo(
    () => calculerMutuelle({ formule, age, regime, zone, composition, effectif }),
    [formule, age, regime, zone, composition, effectif]
  )

  const ctaUrl = `/outils/comparateur-mutuelle-pro?formule=${formule}&regime=${regime}&effectif=${effectif}`
  const isCollective = effectif >= 1 && regime !== 'tns-madelin'

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="m-formule">
            Niveau de couverture
          </label>
          <select
            id="m-formule"
            value={formule}
            onChange={(e) => setFormule(e.target.value as Formule)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {(Object.keys(FORMULE_LABELS) as Formule[]).map((f) => (
              <option key={f} value={f}>
                {FORMULE_LABELS[f]}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs italic text-gray-600">{getFormuleDescription(formule)}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="m-regime">
            Régime social
          </label>
          <select
            id="m-regime"
            value={regime}
            onChange={(e) => setRegime(e.target.value as Regime)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {(Object.keys(REGIME_LABELS) as Regime[]).map((r) => (
              <option key={r} value={r}>
                {REGIME_LABELS[r]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="m-composition">
            Composition foyer
          </label>
          <select
            id="m-composition"
            value={composition}
            onChange={(e) => setComposition(e.target.value as Composition)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {(Object.keys(COMPOSITION_LABELS) as Composition[]).map((c) => (
              <option key={c} value={c}>
                {COMPOSITION_LABELS[c]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="m-age">
            Âge adhérent principal : <span className="text-primary-700">{age} ans</span>
          </label>
          <input
            id="m-age"
            type="range"
            min={18}
            max={75}
            step={1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>18</span>
            <span>75</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="m-effectif">
            Effectif entreprise :{' '}
            <span className="text-primary-700">
              {effectif === 0
                ? 'Aucun (TNS individuel)'
                : `${effectif} salarié${effectif > 1 ? 's' : ''}`}
            </span>
          </label>
          <input
            id="m-effectif"
            type="range"
            min={0}
            max={50}
            step={1}
            value={effectif}
            onChange={(e) => setEffectif(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>0 (TNS)</span>
            <span>50+</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="m-zone">
            Zone géographique
          </label>
          <select
            id="m-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value as Zone)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {(Object.keys(ZONE_LABELS) as Zone[]).map((z) => (
              <option key={z} value={z}>
                {ZONE_LABELS[z]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RÉSULTAT */}
      <div className="mt-6 rounded-lg border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
        <p className="mb-2 text-sm text-gray-600">Estimation tarif mutuelle santé pro 2026</p>
        <p className="mb-2 text-4xl font-extrabold text-emerald-900 md:text-5xl">
          {r.tarifMensuelTotal.toLocaleString('fr-FR')} €<span className="text-2xl">/mois</span>
        </p>
        <p className="text-sm text-gray-700">
          Soit <strong>{r.tarifAnnuelTotal.toLocaleString('fr-FR')} €/an</strong> pour le foyer (
          {r.tarifMensuelParAdulte} €/mois par adulte). Estimation basée sur barèmes 2026 des 8
          mutuelles santé partenaires (Pro BTP, Apicil, Malakoff Humanis, Harmonie Mutuelle, AG2R La
          Mondiale, Allianz, Generali, Klesia).
        </p>

        {isCollective && (
          <div className="mt-4 rounded border border-emerald-200 bg-white p-4">
            <p className="mb-2 text-sm font-semibold text-emerald-900">
              Loi ANI — Répartition employeur / salarié obligatoire
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded bg-emerald-100 p-3">
                <p className="text-xs text-gray-600">Part employeur (50% mini légal)</p>
                <p className="text-xl font-bold text-emerald-900">
                  {r.partEmployeurMensuelle} €/mois
                </p>
              </div>
              <div className="rounded bg-gray-50 p-3">
                <p className="text-xs text-gray-600">Part salarié (prélevée bulletin)</p>
                <p className="text-xl font-bold">{r.partSalarieMensuelle} €/mois</p>
              </div>
            </div>
            <p className="mt-2 text-xs italic text-gray-600">
              Loi ANI obligatoire depuis le 1er janvier 2016 (art. L. 911-7 CSS) pour toute
              entreprise privée ≥1 salarié. Pénalité absence : amende URSSAF + redressement social.
            </p>
          </div>
        )}

        <details className="mt-4 text-xs text-gray-600">
          <summary className="cursor-pointer font-semibold">Voir le détail du calcul</summary>
          <ul className="mt-2 space-y-1 pl-4">
            <li>
              Tarif base formule : <strong>{r.detail.base} €/mois/adulte</strong>
            </li>
            <li>Coef âge : ×{r.detail.coefAge.toFixed(2)} (DREES 2024)</li>
            <li>Coef régime social : ×{r.detail.coefRegime.toFixed(2)}</li>
            <li>Coef zone : ×{r.detail.coefZone.toFixed(2)}</li>
            <li>Coef composition foyer : ×{r.detail.coefComposition.toFixed(2)}</li>
          </ul>
        </details>

        <a
          href={ctaUrl}
          className="mt-5 inline-block w-full rounded-lg bg-emerald-700 px-6 py-3 text-center font-bold text-white shadow-lg transition hover:bg-emerald-800 md:w-auto"
        >
          → Comparer 8 mutuelles + devis officiel sous 24h
        </a>
      </div>

      <p className="text-xs italic text-gray-500">
        ⚠️ Estimation <strong>indicative</strong> — pas un devis officiel. Tarif réel variable ±15%
        selon : antécédents santé déclarés, garanties optionnelles (médecines douces, dentaire
        implantologie, optique premium), réseau de soins partenaire, ancienneté contrat. Conformité
        Recommandation ACPR 2024-R-02.
      </p>
    </div>
  )
}
