'use client'

import { useMemo, useState } from 'react'
import {
  calculerCyber,
  getRisqueRGPD,
  SECTEUR_LABELS,
  DONNEES_LABELS,
  MATURITE_LABELS,
  PLAFOND_LABELS,
  type DonneesVolume,
  type MaturiteCyber,
  type Plafond,
  type Secteur,
} from '@/lib/calculs/tarif-cyber'

const FRANCHISES = [
  { value: 1000, label: '1 000 € (sur-prime)' },
  { value: 5000, label: '5 000 € (standard)' },
  { value: 25000, label: '25 000 € (rabais PME)' },
  { value: 100000, label: '100 000 € (rabais maximum ETI)' },
]

const PLAFONDS: Plafond[] = [100000, 500000, 1000000, 3000000, 5000000, 10000000]

export function CalculateurTarifCyber() {
  const [secteur, setSecteur] = useState<Secteur>('pme-services')
  const [ca, setCa] = useState<number>(2000000)
  const [effectif, setEffectif] = useState<number>(20)
  const [donneesVolume, setDonneesVolume] = useState<DonneesVolume>('1k-10k')
  const [maturite, setMaturite] = useState<MaturiteCyber>('basique')
  const [plafond, setPlafond] = useState<Plafond>(1000000)
  const [franchise, setFranchise] = useState<number>(5000)

  const r = useMemo(
    () => calculerCyber({ secteur, ca, effectif, donneesVolume, maturite, plafond, franchise }),
    [secteur, ca, effectif, donneesVolume, maturite, plafond, franchise]
  )

  const ctaUrl = `/outils/devis-rc-pro?secteur=cyber&plafond=${plafond}&effectif=${effectif}`

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="cy-secteur">
            Secteur d&apos;activité
          </label>
          <select
            id="cy-secteur"
            value={secteur}
            onChange={(e) => setSecteur(e.target.value as Secteur)}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {(Object.keys(SECTEUR_LABELS) as Secteur[]).map((s) => (
              <option key={s} value={s}>
                {SECTEUR_LABELS[s]}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs italic text-charcoal-600">
            Risque RGPD : {getRisqueRGPD(secteur)}
          </p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="cy-don">
            Volume données clients
          </label>
          <select
            id="cy-don"
            value={donneesVolume}
            onChange={(e) => setDonneesVolume(e.target.value as DonneesVolume)}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {(Object.keys(DONNEES_LABELS) as DonneesVolume[]).map((d) => (
              <option key={d} value={d}>
                {DONNEES_LABELS[d]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="cy-mat">
            Maturité cybersécurité
          </label>
          <select
            id="cy-mat"
            value={maturite}
            onChange={(e) => setMaturite(e.target.value as MaturiteCyber)}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {(Object.keys(MATURITE_LABELS) as MaturiteCyber[]).map((m) => (
              <option key={m} value={m}>
                {MATURITE_LABELS[m]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="cy-plafond">
            Plafond garantie souhaité
          </label>
          <select
            id="cy-plafond"
            value={plafond}
            onChange={(e) => setPlafond(Number(e.target.value) as Plafond)}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {PLAFONDS.map((p) => (
              <option key={p} value={p}>
                {PLAFOND_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="cy-franchise">
            Franchise par sinistre
          </label>
          <select
            id="cy-franchise"
            value={franchise}
            onChange={(e) => setFranchise(Number(e.target.value))}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {FRANCHISES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="cy-ca">
            CA HT annuel : <span className="text-primary-700">{ca.toLocaleString('fr-FR')} €</span>
          </label>
          <input
            id="cy-ca"
            type="range"
            min={50000}
            max={20000000}
            step={50000}
            value={ca}
            onChange={(e) => setCa(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-charcoal-500">
            <span>50 k€</span>
            <span>20 M€</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="cy-eff">
            Effectif : <span className="text-primary-700">{effectif} sal</span>
          </label>
          <input
            id="cy-eff"
            type="range"
            min={1}
            max={250}
            step={1}
            value={effectif}
            onChange={(e) => setEffectif(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-charcoal-500">
            <span>1</span>
            <span>250+</span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border-2 border-slate-400 bg-gradient-to-br from-slate-100 to-slate-200 p-6">
        <p className="mb-2 text-sm text-charcoal-600">
          Estimation tarif cyber assurance 2026 (annuel HT)
        </p>
        <p className="mb-2 text-4xl font-extrabold text-slate-900 md:text-5xl">
          {r.fourchetteBasse.toLocaleString('fr-FR')} € —{' '}
          {r.fourchetteHaute.toLocaleString('fr-FR')} €
        </p>
        <p className="text-sm text-charcoal-700">
          Médiane : <strong>{r.fourchetteMediane.toLocaleString('fr-FR')} € par an</strong> (≈{' '}
          {Math.round(r.fourchetteMediane / 12).toLocaleString('fr-FR')} € par mois). Plafond :{' '}
          <strong>{plafond.toLocaleString('fr-FR')} €</strong> par sinistre. Fourchette basée sur
          barèmes 2026 de 6 assureurs cyber spécialisés (Hiscox CyberClear, Stoïk, Beazley, AIG
          CyberEdge, AXA Cyber Secure, Allianz Cyber Risk).
        </p>

        <div className="mt-4 rounded border border-slate-300 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-slate-900">
            ⚠️ Coût moyen sinistre cyber 2026 (ANSSI)
          </p>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="rounded bg-red-50 p-2">
              <p className="text-charcoal-600">TPE</p>
              <p className="font-bold text-red-700">15-50 k€</p>
            </div>
            <div className="rounded bg-orange-50 p-2">
              <p className="text-charcoal-600">PME</p>
              <p className="font-bold text-orange-700">80-300 k€</p>
            </div>
            <div className="rounded bg-rose-50 p-2">
              <p className="text-charcoal-600">ETI</p>
              <p className="font-bold text-rose-700">500 k€-3 M€</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-charcoal-600">
            ROI cyber assurance : breakeven dès le 1er sinistre. <strong>1 entreprise sur 4</strong>{' '}
            subit une cyberattaque dans ses 5 premières années (ANSSI).
          </p>
        </div>

        <details className="mt-4 text-xs text-charcoal-600">
          <summary className="cursor-pointer font-semibold">Voir le détail du calcul</summary>
          <ul className="mt-2 space-y-1 pl-4">
            <li>
              Tarif base secteur : <strong>{Math.round(r.detail.base)} € par an</strong>
            </li>
            <li>Coef CA : ×{r.detail.coefCA.toFixed(2)}</li>
            <li>Coef volume données : ×{r.detail.coefDonnees.toFixed(2)}</li>
            <li>Coef maturité cyber : ×{r.detail.coefMaturite.toFixed(2)} (ISO 27001 = -22%)</li>
            <li>Coef plafond : ×{r.detail.coefPlafond.toFixed(2)}</li>
            <li>Coef franchise : ×{r.detail.coefFranchise.toFixed(2)}</li>
          </ul>
        </details>

        <a
          href={ctaUrl}
          className="mt-5 inline-block w-full rounded-lg bg-slate-700 px-6 py-3 text-center font-bold text-white shadow-lg transition hover:bg-slate-800 md:w-auto"
        >
          → Recevoir mon devis cyber officiel sous 24h
        </a>
      </div>

      <p className="text-xs italic text-charcoal-500">
        ⚠️ Estimation <strong>indicative</strong>. Tarif réel variable ±25% selon : audit cyber
        préalable (questionnaire ACPR), antécédents incidents 5 ans, dépendance fournisseurs cloud
        (AWS, Azure ou GCP), géographie data centers, présence DPO certifié. Conformité ACPR
        2024-R-02.
      </p>
    </div>
  )
}
