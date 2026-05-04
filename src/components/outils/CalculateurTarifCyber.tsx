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
    [secteur, ca, effectif, donneesVolume, maturite, plafond, franchise],
  )

  const ctaUrl = `/outils/devis-rc-pro?secteur=cyber&plafond=${plafond}&effectif=${effectif}`

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2" htmlFor="cy-secteur">Secteur d&apos;activité</label>
          <select id="cy-secteur" value={secteur} onChange={(e) => setSecteur(e.target.value as Secteur)} className="w-full border border-gray-300 rounded p-3 text-sm bg-white">
            {(Object.keys(SECTEUR_LABELS) as Secteur[]).map((s) => (<option key={s} value={s}>{SECTEUR_LABELS[s]}</option>))}
          </select>
          <p className="text-xs text-gray-600 mt-1 italic">Risque RGPD : {getRisqueRGPD(secteur)}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="cy-don">Volume données clients</label>
          <select id="cy-don" value={donneesVolume} onChange={(e) => setDonneesVolume(e.target.value as DonneesVolume)} className="w-full border border-gray-300 rounded p-3 text-sm bg-white">
            {(Object.keys(DONNEES_LABELS) as DonneesVolume[]).map((d) => (<option key={d} value={d}>{DONNEES_LABELS[d]}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="cy-mat">Maturité cybersécurité</label>
          <select id="cy-mat" value={maturite} onChange={(e) => setMaturite(e.target.value as MaturiteCyber)} className="w-full border border-gray-300 rounded p-3 text-sm bg-white">
            {(Object.keys(MATURITE_LABELS) as MaturiteCyber[]).map((m) => (<option key={m} value={m}>{MATURITE_LABELS[m]}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="cy-plafond">Plafond garantie souhaité</label>
          <select id="cy-plafond" value={plafond} onChange={(e) => setPlafond(Number(e.target.value) as Plafond)} className="w-full border border-gray-300 rounded p-3 text-sm bg-white">
            {PLAFONDS.map((p) => (<option key={p} value={p}>{PLAFOND_LABELS[p]}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="cy-franchise">Franchise par sinistre</label>
          <select id="cy-franchise" value={franchise} onChange={(e) => setFranchise(Number(e.target.value))} className="w-full border border-gray-300 rounded p-3 text-sm bg-white">
            {FRANCHISES.map((f) => (<option key={f.value} value={f.value}>{f.label}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="cy-ca">CA HT annuel : <span className="text-blue-700">{ca.toLocaleString('fr-FR')} €</span></label>
          <input id="cy-ca" type="range" min={50000} max={20000000} step={50000} value={ca} onChange={(e) => setCa(Number(e.target.value))} className="w-full accent-blue-700" />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>50 k€</span><span>20 M€</span></div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="cy-eff">Effectif : <span className="text-blue-700">{effectif} sal</span></label>
          <input id="cy-eff" type="range" min={1} max={250} step={1} value={effectif} onChange={(e) => setEffectif(Number(e.target.value))} className="w-full accent-blue-700" />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>1</span><span>250+</span></div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-400 rounded-lg p-6 mt-6">
        <p className="text-sm text-gray-600 mb-2">Estimation tarif cyber assurance 2026 (annuel HT)</p>
        <p className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
          {r.fourchetteBasse.toLocaleString('fr-FR')} € — {r.fourchetteHaute.toLocaleString('fr-FR')} €
        </p>
        <p className="text-sm text-gray-700">
          Médiane : <strong>{r.fourchetteMediane.toLocaleString('fr-FR')} €/an</strong>{' '}
          (≈ {Math.round(r.fourchetteMediane / 12).toLocaleString('fr-FR')} €/mois). Plafond : <strong>{plafond.toLocaleString('fr-FR')} €</strong> par sinistre.
          Fourchette basée sur barèmes 2026 de 6 assureurs cyber spécialisés (Hiscox CyberClear,
          Stoïk, Beazley, AIG CyberEdge, AXA Cyber Secure, Allianz Cyber Risk).
        </p>

        <div className="mt-4 bg-white rounded p-4 border border-slate-300">
          <p className="text-sm font-semibold text-slate-900 mb-2">⚠️ Coût moyen sinistre cyber 2026 (ANSSI)</p>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-red-50 rounded p-2"><p className="text-gray-600">TPE</p><p className="font-bold text-red-700">15-50 k€</p></div>
            <div className="bg-orange-50 rounded p-2"><p className="text-gray-600">PME</p><p className="font-bold text-orange-700">80-300 k€</p></div>
            <div className="bg-rose-50 rounded p-2"><p className="text-gray-600">ETI</p><p className="font-bold text-rose-700">500 k€-3 M€</p></div>
          </div>
          <p className="mt-2 text-xs text-gray-600">
            ROI cyber assurance : breakeven dès le 1er sinistre. <strong>1 entreprise sur 4</strong>{' '}
            subit une cyberattaque dans ses 5 premières années (ANSSI).
          </p>
        </div>

        <details className="mt-4 text-xs text-gray-600">
          <summary className="cursor-pointer font-semibold">Voir le détail du calcul</summary>
          <ul className="mt-2 space-y-1 pl-4">
            <li>Tarif base secteur : <strong>{Math.round(r.detail.base)} €/an</strong></li>
            <li>Coef CA : ×{r.detail.coefCA.toFixed(2)}</li>
            <li>Coef volume données : ×{r.detail.coefDonnees.toFixed(2)}</li>
            <li>Coef maturité cyber : ×{r.detail.coefMaturite.toFixed(2)} (ISO 27001 = -22%)</li>
            <li>Coef plafond : ×{r.detail.coefPlafond.toFixed(2)}</li>
            <li>Coef franchise : ×{r.detail.coefFranchise.toFixed(2)}</li>
          </ul>
        </details>

        <a href={ctaUrl} className="mt-5 inline-block bg-slate-700 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-lg transition shadow-lg w-full md:w-auto text-center">
          → Recevoir mon devis cyber officiel sous 24h
        </a>
      </div>

      <p className="text-xs text-gray-500 italic">
        ⚠️ Estimation <strong>indicative</strong>. Tarif réel variable ±25% selon : audit cyber
        préalable (questionnaire ACPR), antécédents incidents 5 ans, dépendance fournisseurs cloud
        (AWS/Azure/GCP), géographie data centers, présence DPO certifié. Conformité ACPR 2024-R-02.
      </p>
    </div>
  )
}
