'use client'

import { useMemo, useState } from 'react'
import {
  calculerVtc,
  PROFIL_LABELS,
  ZONE_LABELS,
  FORMULE_LABELS,
  VEHICULE_LABELS,
  ANTECEDENTS_LABELS,
  type Antecedents,
  type Formule,
  type Profil,
  type Vehicule,
  type Zone,
} from '@/lib/calculs/tarif-vtc'

export function CalculateurTarifVtc() {
  const [profil, setProfil] = useState<Profil>('auto-entrepreneur-solo')
  const [ageChauffeur, setAgeChauffeur] = useState<number>(38)
  const [ancienneteVTC, setAncienneteVTC] = useState<number>(2)
  const [ancienneteB, setAncienneteB] = useState<number>(15)
  const [zone, setZone] = useState<Zone>('paris-petite-couronne')
  const [formule, setFormule] = useState<Formule>('tous-risques')
  const [vehicule, setVehicule] = useState<Vehicule>('berline-classique')
  const [antecedents, setAntecedents] = useState<Antecedents>('aucun')
  const [effectifChauffeurs, setEffectifChauffeurs] = useState<number>(1)

  const r = useMemo(
    () =>
      calculerVtc({
        profil,
        ageChauffeur,
        ancienneteVTC,
        ancienneteB,
        zone,
        formule,
        vehicule,
        antecedents,
        effectifChauffeurs,
      }),
    [
      profil,
      ageChauffeur,
      ancienneteVTC,
      ancienneteB,
      zone,
      formule,
      vehicule,
      antecedents,
      effectifChauffeurs,
    ]
  )

  const ctaUrl = `/outils/devis-rc-pro?secteur=transport-vtc&profil=${profil}&zone=${zone}`

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="v-profil">
            Statut juridique
          </label>
          <select
            id="v-profil"
            value={profil}
            onChange={(e) => setProfil(e.target.value as Profil)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {(Object.keys(PROFIL_LABELS) as Profil[]).map((p) => (
              <option key={p} value={p}>
                {PROFIL_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="v-zone">
            Zone d&apos;exercice principale
          </label>
          <select
            id="v-zone"
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
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="v-formule">
            Niveau de couverture
          </label>
          <select
            id="v-formule"
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
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="v-vehicule">
            Type de véhicule
          </label>
          <select
            id="v-vehicule"
            value={vehicule}
            onChange={(e) => setVehicule(e.target.value as Vehicule)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {(Object.keys(VEHICULE_LABELS) as Vehicule[]).map((v) => (
              <option key={v} value={v}>
                {VEHICULE_LABELS[v]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="v-age">
            Âge chauffeur principal : <span className="text-primary-700">{ageChauffeur} ans</span>
          </label>
          <input
            id="v-age"
            type="range"
            min={21}
            max={70}
            step={1}
            value={ageChauffeur}
            onChange={(e) => setAgeChauffeur(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>21</span>
            <span>70</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="v-anc-vtc">
            Ancienneté exercice VTC :{' '}
            <span className="text-primary-700">
              {ancienneteVTC} an{ancienneteVTC > 1 ? 's' : ''}
            </span>
          </label>
          <input
            id="v-anc-vtc"
            type="range"
            min={0}
            max={20}
            step={1}
            value={ancienneteVTC}
            onChange={(e) => setAncienneteVTC(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Nouveau</span>
            <span>20+</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="v-anc-b">
            Ancienneté permis B :{' '}
            <span className="text-primary-700">
              {ancienneteB} an{ancienneteB > 1 ? 's' : ''}
            </span>
          </label>
          <input
            id="v-anc-b"
            type="range"
            min={1}
            max={50}
            step={1}
            value={ancienneteB}
            onChange={(e) => setAncienneteB(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>1 an</span>
            <span>50+</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="v-effectif">
            Nombre de chauffeurs : <span className="text-primary-700">{effectifChauffeurs}</span>
          </label>
          <input
            id="v-effectif"
            type="range"
            min={1}
            max={20}
            step={1}
            value={effectifChauffeurs}
            onChange={(e) => setEffectifChauffeurs(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Solo</span>
            <span>20+ flotte</span>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="v-antecedents">
            Antécédents (5 dernières années)
          </label>
          <select
            id="v-antecedents"
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
      </div>

      <div className="mt-6 rounded-lg border-2 border-violet-300 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6">
        <p className="mb-2 text-sm text-gray-600">
          Estimation tarif assurance VTC 2026 (annuel HT)
        </p>
        <p className="mb-2 text-4xl font-extrabold text-violet-900 md:text-5xl">
          {r.fourchetteBasse.toLocaleString('fr-FR')} € —{' '}
          {r.fourchetteHaute.toLocaleString('fr-FR')} €
        </p>
        <p className="text-sm text-gray-700">
          Médiane indicative :{' '}
          <strong>{r.fourchetteMediane.toLocaleString('fr-FR')} € par an</strong> (≈{' '}
          {Math.round(r.fourchetteMediane / 12).toLocaleString('fr-FR')} € par mois). Fourchette
          basée sur les barèmes 2026 de nos 6 assureurs spécialisés VTC (AXA Pro, Allianz Pro,
          Wakam, MMA, AMV, Opteven Mobility). Devis officiel personnalisé sous 24h.
        </p>

        <details className="mt-4 text-xs text-gray-600">
          <summary className="cursor-pointer font-semibold">Voir le détail du calcul</summary>
          <ul className="mt-2 space-y-1 pl-4">
            <li>
              Tarif base profil : <strong>{Math.round(r.detail.base)} € par an</strong>
            </li>
            <li>Coef âge chauffeur : ×{r.detail.coefAge.toFixed(2)}</li>
            <li>Coef ancienneté permis B : ×{r.detail.coefPermis.toFixed(2)}</li>
            <li>Coef zone géographique : ×{r.detail.coefZone.toFixed(2)}</li>
            <li>Coef antécédents : ×{r.detail.coefAntecedents.toFixed(2)}</li>
            <li>Coef formule : ×{r.detail.coefFormule.toFixed(2)}</li>
            <li>Coef véhicule : ×{r.detail.coefVehicule.toFixed(2)}</li>
          </ul>
        </details>

        <a
          href={ctaUrl}
          className="mt-5 inline-block w-full rounded-lg bg-violet-700 px-6 py-3 text-center font-bold text-white shadow-lg transition hover:bg-violet-800 md:w-auto"
        >
          → Recevoir mon devis officiel VTC sous 24h
        </a>
      </div>

      <p className="text-xs italic text-gray-500">
        ⚠️ Estimation <strong>indicative</strong> — pas un devis officiel. Tarif réel variable ±20%
        selon : carte VTC active (préfecture), affiliation plateforme (Uber, Bolt, Heetch),
        kilométrage annuel, garanties optionnelles (protection juridique pénale, perte de licence,
        incapacité de conduire). Conformité ACPR 2024-R-02.
      </p>
    </div>
  )
}
