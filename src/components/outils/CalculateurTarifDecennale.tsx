'use client'

/**
 * Composant — Calculateur tarif décennale interactif
 *
 * Pattern : 100% client-side (pas de network call), calcul instantané au changement
 * de valeur. Conformité ACPR 2024-R-02 (estimation indicative + redirection devis officiel).
 *
 * Funnel : utilisateur saisit → fourchette s'affiche live → CTA "Devis officiel ORIAS"
 * pré-remplit le form `/outils/devis-assurance-decennale` (existant en prod).
 */

import { useMemo, useState } from 'react'
import {
  calculerTarif,
  getSinistraliteAQC,
  METIER_LABELS,
  FORME_LABELS,
  ANTECEDENTS_LABELS,
  ZONE_LABELS,
  type Antecedents,
  type FormeJuridique,
  type Metier,
  type Zone,
} from '@/lib/calculs/tarif-decennale'

const FRANCHISES = [
  { value: 600, label: '600 € (sur-prime)' },
  { value: 1500, label: '1 500 € (standard)' },
  { value: 3000, label: '3 000 € (rabais)' },
  { value: 5000, label: '5 000 € (rabais maximum)' },
]

export function CalculateurTarifDecennale() {
  const [metier, setMetier] = useState<Metier>('electricien')
  const [ca, setCa] = useState<number>(60000)
  const [formeJuridique, setFormeJuridique] = useState<FormeJuridique>('auto-entrepreneur')
  const [effectif, setEffectif] = useState<number>(0)
  const [antecedents, setAntecedents] = useState<Antecedents>('aucun')
  const [franchise, setFranchise] = useState<number>(1500)
  const [zone, setZone] = useState<Zone>('metropole')
  const [anciennete, setAnciennete] = useState<number>(2)

  const resultat = useMemo(
    () => calculerTarif({ metier, ca, formeJuridique, effectif, antecedents, franchise, zone, anciennete }),
    [metier, ca, formeJuridique, effectif, antecedents, franchise, zone, anciennete],
  )

  const ctaUrl = `/outils/devis-assurance-decennale?metier=${metier}&forme=${formeJuridique}&ca=${ca}&effectif=${effectif}`

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="calc-metier">
            Métier BTP
          </label>
          <select
            id="calc-metier"
            value={metier}
            onChange={(e) => setMetier(e.target.value as Metier)}
            className="w-full border border-gray-300 rounded p-3 text-sm bg-white"
          >
            {(Object.keys(METIER_LABELS) as Metier[]).map((m) => (
              <option key={m} value={m}>
                {METIER_LABELS[m]} (sinistralité AQC {getSinistraliteAQC(m)})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="calc-forme">
            Forme juridique
          </label>
          <select
            id="calc-forme"
            value={formeJuridique}
            onChange={(e) => setFormeJuridique(e.target.value as FormeJuridique)}
            className="w-full border border-gray-300 rounded p-3 text-sm bg-white"
          >
            {(Object.keys(FORME_LABELS) as FormeJuridique[]).map((f) => (
              <option key={f} value={f}>
                {FORME_LABELS[f]}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2" htmlFor="calc-ca">
            Chiffre d&apos;affaires HT prévisionnel : <span className="text-blue-700">{ca.toLocaleString('fr-FR')} €</span>
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
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10 000 €</span>
            <span>500 000 €</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="calc-effectif">
            Salariés (hors dirigeant) : <span className="text-blue-700">{effectif}</span>
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
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>20+</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="calc-anciennete">
            Ancienneté d&apos;exercice : <span className="text-blue-700">{anciennete} an{anciennete > 1 ? 's' : ''}</span>
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
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Nouvel installé</span>
            <span>20 ans+</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="calc-antecedents">
            Antécédents sinistres
          </label>
          <select
            id="calc-antecedents"
            value={antecedents}
            onChange={(e) => setAntecedents(e.target.value as Antecedents)}
            className="w-full border border-gray-300 rounded p-3 text-sm bg-white"
          >
            {(Object.keys(ANTECEDENTS_LABELS) as Antecedents[]).map((a) => (
              <option key={a} value={a}>
                {ANTECEDENTS_LABELS[a]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="calc-franchise">
            Franchise par sinistre
          </label>
          <select
            id="calc-franchise"
            value={franchise}
            onChange={(e) => setFranchise(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-3 text-sm bg-white"
          >
            {FRANCHISES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2" htmlFor="calc-zone">
            Zone géographique
          </label>
          <select
            id="calc-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value as Zone)}
            className="w-full border border-gray-300 rounded p-3 text-sm bg-white"
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
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6 mt-6">
        <p className="text-sm text-gray-600 mb-2">Estimation tarif décennale 2026 (annuel HT)</p>
        <p className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">
          {resultat.fourchetteBasse.toLocaleString('fr-FR')} € — {resultat.fourchetteHaute.toLocaleString('fr-FR')} €
        </p>
        <p className="text-sm text-gray-700">
          Médiane indicative : <strong>{resultat.fourchetteMediane.toLocaleString('fr-FR')} €/an</strong>{' '}
          (≈ {Math.round(resultat.fourchetteMediane / 12).toLocaleString('fr-FR')} €/mois). Fourchette
          basée sur les barèmes 2026 de nos 8 assureurs partenaires (SMABTP, MAAF Pro, April Pro,
          Hiscox, AXA Pro, Allianz, Wakam, Generali). Devis officiel personnalisé sous 24h.
        </p>

        <details className="mt-4 text-xs text-gray-600">
          <summary className="cursor-pointer font-semibold">Voir le détail du calcul</summary>
          <ul className="mt-2 space-y-1 pl-4">
            <li>Tarif base métier : <strong>{Math.round(resultat.detail.base)} €/an</strong></li>
            <li>Coef CA : ×{resultat.detail.coefCA.toFixed(2)}</li>
            <li>Coef forme juridique : ×{resultat.detail.coefForme.toFixed(2)}</li>
            <li>Coef effectif : ×{resultat.detail.coefEffectif.toFixed(2)}</li>
            <li>Coef antécédents : ×{resultat.detail.coefAntecedents.toFixed(2)}</li>
            <li>Coef franchise : ×{resultat.detail.coefFranchise.toFixed(2)}</li>
            <li>Coef zone : ×{resultat.detail.coefZone.toFixed(2)}</li>
            <li>Coef ancienneté : ×{resultat.detail.coefAnciennete.toFixed(2)}</li>
          </ul>
          <p className="mt-3 italic">
            Coefficients publics conformes Recommandation ACPR 2024-R-02 (transparence tarif intermédiaire).
            Calculs basés sur AQC SYCODÉS 2024 + barèmes négociés cabinet ORIAS.
          </p>
        </details>

        <a
          href={ctaUrl}
          className="mt-5 inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-lg transition shadow-lg w-full md:w-auto text-center"
        >
          → Recevoir mon devis officiel sous 24h
        </a>
      </div>

      <p className="text-xs text-gray-500 italic">
        ⚠️ Cette estimation est <strong>indicative</strong> et n&apos;a aucune valeur contractuelle.
        Seul un devis officiel signé par un assureur agréé ACPR engage l&apos;assureur. Variations
        possibles selon : précision activité (codes NAF), antécédents détaillés (relevé d&apos;information),
        garanties optionnelles (RC exploitation, dommages aux biens, protection juridique).
      </p>
    </div>
  )
}
