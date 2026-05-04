'use client'

import { useMemo, useState } from 'react'
import { ASSUREURS_RC_PRO, TARIF_LABELS, type Assureur } from '@/lib/data/assureurs-rc-pro'

const SECTEURS = [
  { value: '', label: 'Tous secteurs (vue générale)' },
  { value: 'Informatique', label: 'Informatique / SaaS / freelance IT' },
  { value: 'Marketing', label: 'Marketing / communication' },
  { value: 'Consultant', label: 'Consultant / conseil' },
  { value: 'Photographe', label: 'Photographe / graphiste' },
  { value: 'Médecin', label: 'Médecin libéral' },
  { value: 'Santé paramédical', label: 'Santé paramédical (kiné, infirmier)' },
  { value: 'Avocat', label: 'Avocat / juridique' },
  { value: 'Expert-comptable', label: 'Expert-comptable' },
  { value: 'Formateur', label: 'Formateur / coach' },
  { value: 'Esthétique', label: 'Esthétique / bien-être' },
  { value: 'Restaurateur', label: 'Restaurateur / traiteur' },
  { value: 'Commerce', label: 'Commerce de détail' },
  { value: 'BTP', label: 'BTP — artisans' },
  { value: 'Couvreur', label: 'Couvreur-zingueur' },
  { value: 'RGE', label: 'RGE photovoltaïque' },
]

const PRIORITES = [
  { value: 'note', label: 'Note globale (recommandation cabinet)' },
  { value: 'tarif', label: 'Tarif compétitif (low cost)' },
  { value: 'rapidite', label: 'Rapidité souscription + attestation' },
  { value: 'plafond', label: 'Plafonds élevés (gros risques)' },
]

function scoreAssureur(a: Assureur, secteur: string, priorite: string): number {
  let score = a.noteGlobale * 20

  if (secteur && a.secteursForts.some((s) => s.toLowerCase().includes(secteur.toLowerCase()))) score += 25
  if (secteur && a.secteursEvites.some((s) => s.toLowerCase().includes(secteur.toLowerCase()))) score -= 30

  if (priorite === 'tarif' && a.tarifRangAdequation === 'low') score += 20
  if (priorite === 'tarif' && a.tarifRangAdequation === 'premium') score -= 15
  if (priorite === 'rapidite' && /[Ii]mmédiat|24h/.test(a.delaiDevis)) score += 20
  if (priorite === 'plafond' && /5M|10M/.test(a.forces.join(' '))) score += 20

  return Math.round(score)
}

export function ComparateurRcPro() {
  const [secteur, setSecteur] = useState<string>('')
  const [priorite, setPriorite] = useState<string>('note')

  const assureursTries = useMemo(() => {
    const scored = ASSUREURS_RC_PRO.map((a) => ({ ...a, score: scoreAssureur(a, secteur, priorite) }))
    return scored.sort((x, y) => y.score - x.score)
  }, [secteur, priorite])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border">
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="cp-secteur">Votre secteur d&apos;activité</label>
          <select id="cp-secteur" value={secteur} onChange={(e) => setSecteur(e.target.value)} className="w-full border border-gray-300 rounded p-3 text-sm bg-white">
            {SECTEURS.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="cp-priorite">Votre priorité</label>
          <select id="cp-priorite" value={priorite} onChange={(e) => setPriorite(e.target.value)} className="w-full border border-gray-300 rounded p-3 text-sm bg-white">
            {PRIORITES.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {assureursTries.map((a, i) => {
          const tarifBadge = TARIF_LABELS[a.tarifRangAdequation]
          const isFort = secteur && a.secteursForts.some((s) => s.toLowerCase().includes(secteur.toLowerCase()))
          const isEvite = secteur && a.secteursEvites.some((s) => s.toLowerCase().includes(secteur.toLowerCase()))
          return (
            <div
              key={a.id}
              className={`bg-white border-2 rounded-lg p-5 shadow-sm ${
                isFort ? 'border-emerald-400 ring-2 ring-emerald-100' : isEvite ? 'border-amber-300 opacity-75' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded">#{i + 1}</span>
                    <h3 className="text-xl font-bold">{a.nom}</h3>
                    {isFort && <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">✓ RECOMMANDÉ POUR VOUS</span>}
                    {isEvite && <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">⚠️ DÉCONSEILLÉ POUR CE SECTEUR</span>}
                  </div>
                  <p className="text-xs text-gray-500">{a.groupe} — {a.agrement}</p>
                  <p className="text-sm text-gray-700 mt-1 italic">« {a.sloganRcPro} »</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-700">{a.noteGlobale.toFixed(1)}<span className="text-sm text-gray-500">/5</span></div>
                  <span className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded ${tarifBadge.couleur}`}>{tarifBadge.label}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm mt-3">
                <div>
                  <p className="font-semibold text-emerald-700 mb-1">✓ Points forts</p>
                  <ul className="space-y-0.5 text-gray-700">{a.forces.map((f, k) => (<li key={k}>• {f}</li>))}</ul>
                </div>
                <div>
                  <p className="font-semibold text-amber-700 mb-1">⚠️ Limites</p>
                  <ul className="space-y-0.5 text-gray-700">{a.faiblesses.map((f, k) => (<li key={k}>• {f}</li>))}</ul>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 text-xs bg-gray-50 rounded p-3">
                <div><p className="text-gray-500">Délai devis</p><p className="font-semibold">{a.delaiDevis}</p></div>
                <div><p className="text-gray-500">Délai attestation</p><p className="font-semibold">{a.delaiAttestation}</p></div>
                <div><p className="text-gray-500">Spécialité</p><p className="font-semibold">{a.specialiteJuridique}</p></div>
              </div>

              {a.secteursForts.length > 0 && (
                <p className="text-xs text-gray-600 mt-3"><strong>Secteurs forts :</strong> {a.secteursForts.join(' • ')}</p>
              )}
            </div>
          )
        })}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Notre cabinet ORIAS sélectionne pour vous</h3>
        <p className="text-sm text-gray-700 mb-4">
          Plutôt que de comparer seul, recevez sous 24h les <strong>3 propositions optimales</strong>{' '}
          parmi ces 8 assureurs, sélectionnées selon votre profil exact.
        </p>
        <a href="/outils/devis-rc-pro" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-lg transition shadow-lg">
          → Recevoir 3 devis personnalisés sous 24h
        </a>
      </div>

      <p className="text-xs text-gray-500 italic">
        Notes attribuées par notre cabinet ORIAS (synthèse sourcing public + retour terrain
        2024-2025). Conformité Reco ACPR 2024-R-02 + 2025-R-01 (transparence comparaison +
        devoir conseil).
      </p>
    </div>
  )
}
