'use client'

import { useMemo, useState } from 'react'
import {
  calculerPrevoyance,
  PROFESSION_LABELS,
  FORMULE_LABELS,
  type Formule,
  type Profession,
} from '@/lib/calculs/tarif-prevoyance-tns'

export function CalculateurPrevoyanceTns() {
  const [profession, setProfession] = useState<Profession>('profession-liberale-conseil')
  const [age, setAge] = useState<number>(40)
  const [revenus, setRevenus] = useState<number>(60000)
  const [formule, setFormule] = useState<Formule>('standard')
  const [fumeur, setFumeur] = useState<boolean>(false)
  const [capitalDeces, setCapitalDeces] = useState<number>(100000)

  const r = useMemo(
    () =>
      calculerPrevoyance({
        statut: 'auto-entrepreneur',
        profession,
        age,
        revenus,
        formule,
        fumeur,
        capitalDeces,
      }),
    [profession, age, revenus, formule, fumeur, capitalDeces]
  )

  const ctaUrl = `/outils/devis-rc-pro?secteur=prevoyance-tns&profession=${profession}`

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="p-prof">
            Profession
          </label>
          <select
            id="p-prof"
            value={profession}
            onChange={(e) => setProfession(e.target.value as Profession)}
            className="w-full rounded border border-gray-300 bg-white p-3 text-sm"
          >
            {(Object.keys(PROFESSION_LABELS) as Profession[]).map((p) => (
              <option key={p} value={p}>
                {PROFESSION_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="p-formule">
            Niveau de couverture
          </label>
          <select
            id="p-formule"
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
          <label className="mb-2 block text-sm font-semibold" htmlFor="p-age">
            Âge : <span className="text-primary-700">{age} ans</span>
          </label>
          <input
            id="p-age"
            type="range"
            min={20}
            max={67}
            step={1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>20</span>
            <span>67</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="p-rev">
            Revenus annuels HT :{' '}
            <span className="text-primary-700">{revenus.toLocaleString('fr-FR')} €</span>
          </label>
          <input
            id="p-rev"
            type="range"
            min={15000}
            max={300000}
            step={5000}
            value={revenus}
            onChange={(e) => setRevenus(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>15 k€</span>
            <span>300 k€</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="p-cap">
            Capital décès souhaité :{' '}
            <span className="text-primary-700">{capitalDeces.toLocaleString('fr-FR')} €</span>
          </label>
          <input
            id="p-cap"
            type="range"
            min={20000}
            max={1000000}
            step={10000}
            value={capitalDeces}
            onChange={(e) => setCapitalDeces(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>20 k€</span>
            <span>1 M€</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input
            id="p-fum"
            type="checkbox"
            checked={fumeur}
            onChange={(e) => setFumeur(e.target.checked)}
            className="h-5 w-5 accent-blue-700"
          />
          <label htmlFor="p-fum" className="text-sm font-semibold">
            Fumeur (sur-prime +32%)
          </label>
        </div>
      </div>

      <div className="mt-6 rounded-lg border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
        <p className="mb-2 text-sm text-gray-600">
          Estimation cotisation prévoyance TNS Madelin 2026
        </p>
        <p className="mb-2 text-4xl font-extrabold text-amber-900 md:text-5xl">
          {r.cotisationMensuelle.toLocaleString('fr-FR')} €
          <span className="text-2xl"> par mois</span>
        </p>
        <p className="text-sm text-gray-700">
          Soit <strong>{r.cotisationAnnuelle.toLocaleString('fr-FR')} € par an</strong>. Couverture
          basée sur barèmes 2026 de 7 assureurs partenaires (Generali, MMA Pro, AXA Pro, Allianz,
          Pro BTP, Apicil, Swisslife).
        </p>

        <div className="mt-4 rounded border border-amber-200 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-amber-900">Vos couvertures incluses</p>
          <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
            <div className="rounded bg-amber-100 p-3">
              <p className="text-xs text-gray-600">IJ arrêt maladie</p>
              <p className="text-lg font-bold text-amber-900">
                {r.ijQuotidienneCouverte} € par jour
              </p>
            </div>
            <div className="rounded bg-amber-100 p-3">
              <p className="text-xs text-gray-600">Rente invalidité totale</p>
              <p className="text-lg font-bold text-amber-900">
                {r.rentesInvaliditeMensuelle.toLocaleString('fr-FR')} € par mois
              </p>
            </div>
            <div className="rounded bg-amber-100 p-3">
              <p className="text-xs text-gray-600">Capital décès</p>
              <p className="text-lg font-bold text-amber-900">
                {r.capitalDecesEffectif.toLocaleString('fr-FR')} €
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded border border-emerald-300 bg-emerald-50 p-4">
          <p className="mb-1 text-sm font-semibold text-emerald-900">
            💰 Avantage Loi Madelin (CGI art. 154 bis)
          </p>
          <p className="text-sm">
            Cotisation déductible fiscalement :{' '}
            <strong>{r.deductibiliteMadelin.toLocaleString('fr-FR')} € par an</strong> (sur{' '}
            {r.cotisationAnnuelle.toLocaleString('fr-FR')} € versés). Économie nette TMI 30% :{' '}
            <strong>
              {Math.round(r.deductibiliteMadelin * 0.3).toLocaleString('fr-FR')} € par an
            </strong>
            . Coût réel après déduction :{' '}
            <strong>
              {(r.cotisationAnnuelle - Math.round(r.deductibiliteMadelin * 0.3)).toLocaleString(
                'fr-FR'
              )}{' '}
              € par an
            </strong>
            .
          </p>
        </div>

        <details className="mt-4 text-xs text-gray-600">
          <summary className="cursor-pointer font-semibold">Voir le détail du calcul</summary>
          <ul className="mt-2 space-y-1 pl-4">
            <li>
              Tarif base formule : <strong>{r.detail.base} € par mois</strong>
            </li>
            <li>Coef âge : ×{r.detail.coefAge.toFixed(2)}</li>
            <li>Coef profession : ×{r.detail.coefProfession.toFixed(2)}</li>
            <li>Coef revenus : ×{r.detail.coefRevenus.toFixed(2)}</li>
            <li>Coef fumeur : ×{r.detail.coefFumeur.toFixed(2)}</li>
          </ul>
        </details>

        <a
          href={ctaUrl}
          className="mt-5 inline-block w-full rounded-lg bg-amber-700 px-6 py-3 text-center font-bold text-white shadow-lg transition hover:bg-amber-800 md:w-auto"
        >
          → Recevoir mon devis prévoyance TNS sous 24h
        </a>
      </div>

      <p className="text-xs italic text-gray-500">
        ⚠️ Estimation <strong>indicative</strong>. Tarif réel variable ±20% selon : questionnaire
        santé détaillé (antécédents médicaux 5 ans), pratiques sportives à risque (parapente,
        plongée, moto sport), zone géographique (DOM ou Corse). Conformité ACPR 2024-R-02.
      </p>
    </div>
  )
}
