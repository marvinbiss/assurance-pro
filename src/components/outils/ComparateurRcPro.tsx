'use client'

import { useMemo, useState } from 'react'
import { ASSUREURS_RC_PRO, TARIF_LABELS, type Assureur } from '@/lib/data/assureurs-rc-pro'

const SECTEURS = [
  { value: '', label: 'Tous secteurs (vue générale)' },
  { value: 'Informatique', label: 'Informatique — SaaS — freelance IT' },
  { value: 'Marketing', label: 'Marketing — communication' },
  { value: 'Consultant', label: 'Consultant — conseil' },
  { value: 'Photographe', label: 'Photographe — graphiste' },
  { value: 'Médecin', label: 'Médecin libéral' },
  { value: 'Santé paramédical', label: 'Santé paramédical (kiné, infirmier)' },
  { value: 'Avocat', label: 'Avocat — juridique' },
  { value: 'Expert-comptable', label: 'Expert-comptable' },
  { value: 'Formateur', label: 'Formateur — coach' },
  { value: 'Esthétique', label: 'Esthétique — bien-être' },
  { value: 'Restaurateur', label: 'Restaurateur — traiteur' },
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

  if (secteur && a.secteursForts.some((s) => s.toLowerCase().includes(secteur.toLowerCase())))
    score += 25
  if (secteur && a.secteursEvites.some((s) => s.toLowerCase().includes(secteur.toLowerCase())))
    score -= 30

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
    const scored = ASSUREURS_RC_PRO.map((a) => ({
      ...a,
      score: scoreAssureur(a, secteur, priorite),
    }))
    return scored.sort((x, y) => y.score - x.score)
  }, [secteur, priorite])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 rounded-lg border bg-white p-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="cp-secteur">
            Votre secteur d&apos;activité
          </label>
          <select
            id="cp-secteur"
            value={secteur}
            onChange={(e) => setSecteur(e.target.value)}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {SECTEURS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="cp-priorite">
            Votre priorité
          </label>
          <select
            id="cp-priorite"
            value={priorite}
            onChange={(e) => setPriorite(e.target.value)}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {PRIORITES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {assureursTries.map((a, i) => {
          const tarifBadge = TARIF_LABELS[a.tarifRangAdequation]
          const isFort =
            secteur && a.secteursForts.some((s) => s.toLowerCase().includes(secteur.toLowerCase()))
          const isEvite =
            secteur && a.secteursEvites.some((s) => s.toLowerCase().includes(secteur.toLowerCase()))
          return (
            <div
              key={a.id}
              className={`rounded-lg border-2 bg-white p-5 shadow-sm ${
                isFort
                  ? 'border-emerald-400 ring-2 ring-emerald-100'
                  : isEvite
                    ? 'border-amber-300 opacity-75'
                    : 'border-sand-200'
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <span className="rounded bg-primary-700 px-2 py-1 text-xs font-bold text-white">
                      #{i + 1}
                    </span>
                    <h3 className="text-xl font-bold">{a.nom}</h3>
                    {isFort && (
                      <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">
                        ✓ RECOMMANDÉ POUR VOUS
                      </span>
                    )}
                    {isEvite && (
                      <span className="rounded bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">
                        ⚠️ DÉCONSEILLÉ POUR CE SECTEUR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-charcoal-500">
                    {a.groupe} — {a.agrement}
                  </p>
                  <p className="mt-1 text-sm italic text-charcoal-700">« {a.sloganRcPro} »</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-700">
                    {a.noteGlobale.toFixed(1)}
                    <span className="text-sm text-charcoal-500">/5</span>
                  </div>
                  <span
                    className={`mt-1 inline-block rounded px-2 py-1 text-xs font-semibold ${tarifBadge.couleur}`}
                  >
                    {tarifBadge.label}
                  </span>
                </div>
              </div>

              <div className="mt-3 grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <p className="mb-1 font-semibold text-emerald-700">✓ Points forts</p>
                  <ul className="space-y-0.5 text-charcoal-700">
                    {a.forces.map((f, k) => (
                      <li key={k}>• {f}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-amber-700">⚠️ Limites</p>
                  <ul className="space-y-0.5 text-charcoal-700">
                    {a.faiblesses.map((f, k) => (
                      <li key={k}>• {f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 rounded bg-sand-50 p-3 text-xs">
                <div>
                  <p className="text-charcoal-500">Délai devis</p>
                  <p className="font-semibold">{a.delaiDevis}</p>
                </div>
                <div>
                  <p className="text-charcoal-500">Délai attestation</p>
                  <p className="font-semibold">{a.delaiAttestation}</p>
                </div>
                <div>
                  <p className="text-charcoal-500">Spécialité</p>
                  <p className="font-semibold">{a.specialiteJuridique}</p>
                </div>
              </div>

              {a.secteursForts.length > 0 && (
                <p className="mt-3 text-xs text-charcoal-600">
                  <strong>Secteurs forts :</strong> {a.secteursForts.join(' • ')}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="rounded-lg border-2 border-primary-300 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center">
        <h3 className="mb-2 text-xl font-bold text-primary-900">
          Notre cabinet ORIAS sélectionne pour vous
        </h3>
        <p className="mb-4 text-sm text-charcoal-700">
          Plutôt que de comparer seul, recevez sous 24h les{' '}
          <strong>3 propositions optimales</strong> parmi ces 8 assureurs, sélectionnées selon votre
          profil exact.
        </p>
        <a
          href="/outils/devis-rc-pro"
          className="inline-block rounded-lg bg-primary-700 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-primary-800"
        >
          → Recevoir 3 devis personnalisés sous 24h
        </a>
      </div>

      <p className="text-xs italic text-charcoal-500">
        Notes attribuées par notre cabinet ORIAS (synthèse sourcing public + retour terrain
        2024-2025). Conformité Reco ACPR 2024-R-02 + 2025-R-01 (transparence comparaison + devoir
        conseil).
      </p>
    </div>
  )
}
