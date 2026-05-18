'use client'

/**
 * Composant — Calculateur tarif RC Pro interactif
 *
 * Pattern : 100% client-side, calcul live au changement.
 * Funnel : utilisateur saisit → fourchette s'affiche → CTA "Devis officiel ORIAS"
 * pré-remplit /outils/devis-rc-pro (existant en prod).
 */

import { useMemo, useState } from 'react'
import {
  calculerTarif,
  getSinistralite,
  SECTEUR_LABELS,
  FORME_LABELS,
  ANTECEDENTS_LABELS,
  PLAFOND_LABELS,
  type Antecedents,
  type FormeJuridique,
  type Plafond,
  type Secteur,
} from '@/lib/calculs/tarif-rc-pro'

const FRANCHISES = [
  { value: 300, label: '300 € (sur-prime)' },
  { value: 750, label: '750 € (faible)' },
  { value: 1500, label: '1 500 € (standard)' },
  { value: 3000, label: '3 000 € (rabais)' },
  { value: 5000, label: '5 000 € (rabais maximum)' },
]

const PLAFONDS: Plafond[] = [150000, 500000, 1000000, 2000000, 5000000]

export function CalculateurTarifRcPro() {
  const [secteur, setSecteur] = useState<Secteur>('consultant-conseil')
  const [ca, setCa] = useState<number>(50000)
  const [formeJuridique, setFormeJuridique] = useState<FormeJuridique>('auto-entrepreneur')
  const [effectif, setEffectif] = useState<number>(0)
  const [antecedents, setAntecedents] = useState<Antecedents>('aucun')
  const [franchise, setFranchise] = useState<number>(1500)
  const [plafond, setPlafond] = useState<Plafond>(500000)
  const [anciennete, setAnciennete] = useState<number>(2)

  const resultat = useMemo(
    () =>
      calculerTarif({
        secteur,
        ca,
        formeJuridique,
        effectif,
        antecedents,
        franchise,
        plafond,
        anciennete,
      }),
    [secteur, ca, formeJuridique, effectif, antecedents, franchise, plafond, anciennete]
  )

  const ctaUrl = `/outils/devis-rc-pro?secteur=${secteur}&forme=${formeJuridique}&ca=${ca}&effectif=${effectif}`

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="calc-secteur">
            Secteur d&apos;activité
          </label>
          <select
            id="calc-secteur"
            value={secteur}
            onChange={(e) => setSecteur(e.target.value as Secteur)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {(Object.keys(SECTEUR_LABELS) as Secteur[]).map((s) => (
              <option key={s} value={s}>
                {SECTEUR_LABELS[s]} (sinistralité {getSinistralite(s)})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="calc-forme">
            Forme juridique
          </label>
          <select
            id="calc-forme"
            value={formeJuridique}
            onChange={(e) => setFormeJuridique(e.target.value as FormeJuridique)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {(Object.keys(FORME_LABELS) as FormeJuridique[]).map((f) => (
              <option key={f} value={f}>
                {FORME_LABELS[f]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="calc-plafond">
            Plafond garantie souhaité
          </label>
          <select
            id="calc-plafond"
            value={plafond}
            onChange={(e) => setPlafond(Number(e.target.value) as Plafond)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {PLAFONDS.map((p) => (
              <option key={p} value={p}>
                {PLAFOND_LABELS[p]}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="calc-ca">
            Chiffre d&apos;affaires HT prévisionnel :{' '}
            <span className="text-primary-700">{ca.toLocaleString('fr-FR')} €</span>
          </label>
          <input
            id="calc-ca"
            type="range"
            min={10000}
            max={500000}
            step={5000}
            value={ca}
            onChange={(e) => setCa(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>10 000 €</span>
            <span>500 000 €</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="calc-effectif">
            Salariés (hors dirigeant) : <span className="text-primary-700">{effectif}</span>
          </label>
          <input
            id="calc-effectif"
            type="range"
            min={0}
            max={20}
            step={1}
            value={effectif}
            onChange={(e) => setEffectif(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>20+</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="calc-anciennete">
            Ancienneté d&apos;activité :{' '}
            <span className="text-primary-700">
              {anciennete} an{anciennete > 1 ? 's' : ''}
            </span>
          </label>
          <input
            id="calc-anciennete"
            type="range"
            min={0}
            max={20}
            step={1}
            value={anciennete}
            onChange={(e) => setAnciennete(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Nouvel installé</span>
            <span>20 ans+</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="calc-antecedents">
            Antécédents sinistres
          </label>
          <select
            id="calc-antecedents"
            value={antecedents}
            onChange={(e) => setAntecedents(e.target.value as Antecedents)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {(Object.keys(ANTECEDENTS_LABELS) as Antecedents[]).map((a) => (
              <option key={a} value={a}>
                {ANTECEDENTS_LABELS[a]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="calc-franchise">
            Franchise par sinistre
          </label>
          <select
            id="calc-franchise"
            value={franchise}
            onChange={(e) => setFranchise(Number(e.target.value))}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {FRANCHISES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RÉSULTAT */}
      <div className="mt-6 rounded-lg border-2 border-primary-300 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <p className="mb-2 text-sm text-gray-600">Estimation tarif RC Pro 2026 (annuel HT)</p>
        <p className="mb-2 text-4xl font-extrabold text-primary-900 md:text-5xl">
          {resultat.fourchetteBasse.toLocaleString('fr-FR')} € —{' '}
          {resultat.fourchetteHaute.toLocaleString('fr-FR')} €
        </p>
        <p className="text-sm text-gray-700">
          Médiane indicative :{' '}
          <strong>{resultat.fourchetteMediane.toLocaleString('fr-FR')} € par an</strong> (≈{' '}
          {Math.round(resultat.fourchetteMediane / 12).toLocaleString('fr-FR')} € par mois).
          Fourchette basée sur les barèmes 2026 de nos 8 assureurs partenaires (Hiscox, MMA Pro, AXA
          Pro, Allianz Pro, Generali, MAIF Pro, Wakam, April Pro). Devis officiel personnalisé sous
          24h.
        </p>

        <details className="mt-4 text-xs text-gray-600">
          <summary className="cursor-pointer font-semibold">Voir le détail du calcul</summary>
          <ul className="mt-2 space-y-1 pl-4">
            <li>
              Tarif base secteur : <strong>{Math.round(resultat.detail.base)} € par an</strong>
            </li>
            <li>Coef CA : ×{resultat.detail.coefCA.toFixed(2)}</li>
            <li>Coef forme juridique : ×{resultat.detail.coefForme.toFixed(2)}</li>
            <li>Coef effectif : ×{resultat.detail.coefEffectif.toFixed(2)}</li>
            <li>Coef antécédents : ×{resultat.detail.coefAntecedents.toFixed(2)}</li>
            <li>Coef franchise : ×{resultat.detail.coefFranchise.toFixed(2)}</li>
            <li>Coef plafond garantie : ×{resultat.detail.coefPlafond.toFixed(2)}</li>
            <li>Coef ancienneté : ×{resultat.detail.coefAnciennete.toFixed(2)}</li>
          </ul>
          <p className="mt-3 italic">
            Coefficients publics conformes Recommandation ACPR 2024-R-02 (transparence tarif
            intermédiaire).
          </p>
        </details>

        <a
          href={ctaUrl}
          className="mt-5 inline-block w-full rounded-lg bg-primary-700 px-6 py-3 text-center font-bold text-white shadow-lg transition hover:bg-primary-800 md:w-auto"
        >
          → Recevoir mon devis officiel sous 24h
        </a>
      </div>

      <p className="text-xs italic text-gray-500">
        ⚠️ Cette estimation est <strong>indicative</strong> et n&apos;a aucune valeur contractuelle.
        Seul un devis officiel signé par un assureur agréé ACPR engage l&apos;assureur. Variations
        possibles selon : précision activité (codes NAF), antécédents détaillés (relevé
        d&apos;information), garanties optionnelles (RC exploitation, défense recours, protection
        juridique, cyber).
      </p>
    </div>
  )
}
