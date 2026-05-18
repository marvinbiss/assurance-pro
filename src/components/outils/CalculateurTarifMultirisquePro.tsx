'use client'

import { useMemo, useState } from 'react'
import {
  calculerMultirisque,
  getFormuleDescription,
  TYPE_LOCAUX_LABELS,
  STATUT_LABELS,
  FORMULE_LABELS,
  ZONE_LABELS,
  type Formule,
  type Statut,
  type TypeLocaux,
  type MultirisqueInput,
} from '@/lib/calculs/tarif-multirisque-pro'

export function CalculateurTarifMultirisquePro() {
  const [typeLocaux, setTypeLocaux] = useState<TypeLocaux>('bureau')
  const [surface, setSurface] = useState<number>(120)
  const [statut, setStatut] = useState<Statut>('locataire')
  const [ca, setCa] = useState<number>(500000)
  const [formule, setFormule] = useState<Formule>('standard')
  const [valeurMobilier, setValeurMobilier] = useState<number>(50000)
  const [pertesExploitation, setPertesExploitation] = useState<boolean>(true)
  const [zone, setZone] = useState<MultirisqueInput['zone']>('metropole')

  const r = useMemo(
    () =>
      calculerMultirisque({
        typeLocaux,
        surface,
        statut,
        ca,
        formule,
        valeurMobilier,
        pertesExploitation,
        zone,
      }),
    [typeLocaux, surface, statut, ca, formule, valeurMobilier, pertesExploitation, zone]
  )

  const ctaUrl = `/outils/devis-rc-pro?secteur=multirisque&typeLocaux=${typeLocaux}&surface=${surface}`

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="mr-type">
            Type de locaux
          </label>
          <select
            id="mr-type"
            value={typeLocaux}
            onChange={(e) => setTypeLocaux(e.target.value as TypeLocaux)}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {(Object.keys(TYPE_LOCAUX_LABELS) as TypeLocaux[]).map((t) => (
              <option key={t} value={t}>
                {TYPE_LOCAUX_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="mr-statut">
            Statut occupation
          </label>
          <select
            id="mr-statut"
            value={statut}
            onChange={(e) => setStatut(e.target.value as Statut)}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {(Object.keys(STATUT_LABELS) as Statut[]).map((s) => (
              <option key={s} value={s}>
                {STATUT_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="mr-formule">
            Niveau de couverture
          </label>
          <select
            id="mr-formule"
            value={formule}
            onChange={(e) => setFormule(e.target.value as Formule)}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {(Object.keys(FORMULE_LABELS) as Formule[]).map((f) => (
              <option key={f} value={f}>
                {FORMULE_LABELS[f]}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs italic text-charcoal-600">{getFormuleDescription(formule)}</p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="mr-surf">
            Surface : <span className="text-primary-700">{surface} m²</span>
          </label>
          <input
            id="mr-surf"
            type="range"
            min={20}
            max={2000}
            step={10}
            value={surface}
            onChange={(e) => setSurface(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-charcoal-500">
            <span>20 m²</span>
            <span>2 000 m²</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="mr-ca">
            CA HT annuel : <span className="text-primary-700">{ca.toLocaleString('fr-FR')} €</span>
          </label>
          <input
            id="mr-ca"
            type="range"
            min={50000}
            max={5000000}
            step={50000}
            value={ca}
            onChange={(e) => setCa(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-charcoal-500">
            <span>50 k€</span>
            <span>5 M€</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="mr-mob">
            Valeur mobilier ou matériel :{' '}
            <span className="text-primary-700">{valeurMobilier.toLocaleString('fr-FR')} €</span>
          </label>
          <input
            id="mr-mob"
            type="range"
            min={5000}
            max={1000000}
            step={5000}
            value={valeurMobilier}
            onChange={(e) => setValeurMobilier(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-charcoal-500">
            <span>5 k€</span>
            <span>1 M€</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="mr-zone">
            Zone géographique
          </label>
          <select
            id="mr-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value as MultirisqueInput['zone'])}
            className="w-full rounded border border-sand-300 bg-white p-3 text-sm"
          >
            {(Object.keys(ZONE_LABELS) as MultirisqueInput['zone'][]).map((z) => (
              <option key={z} value={z}>
                {ZONE_LABELS[z]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <input
            id="mr-pe"
            type="checkbox"
            checked={pertesExploitation}
            onChange={(e) => setPertesExploitation(e.target.checked)}
            className="h-5 w-5 accent-blue-700"
          />
          <label htmlFor="mr-pe" className="text-sm font-semibold">
            Inclure perte d&apos;exploitation (+18%)
          </label>
        </div>
      </div>

      <div className="mt-6 rounded-lg border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 p-6">
        <p className="mb-2 text-sm text-charcoal-600">Estimation cotisation multirisque pro 2026</p>
        <p className="mb-2 text-4xl font-extrabold text-orange-900 md:text-5xl">
          {r.cotisationAnnuelle.toLocaleString('fr-FR')} €<span className="text-2xl"> par an</span>
        </p>
        <p className="text-sm text-charcoal-700">
          Soit <strong>{r.cotisationMensuelle.toLocaleString('fr-FR')} € par mois</strong>.
          Estimation basée sur barèmes 2026 de 7 assureurs partenaires (MMA Pro, AXA Pro, Allianz
          Pro, Generali, MAIF Pro, Pro BTP MR, April Pro).
        </p>

        <div className="mt-4 rounded border border-orange-200 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-orange-900">
            Garanties incluses dans cette formule
          </p>
          <ul className="space-y-1 text-sm">
            {r.garanties.map((g) => (
              <li key={g.nom} className="flex items-center gap-2">
                <span className={g.couvert ? 'text-emerald-600' : 'text-gray-400'}>
                  {g.couvert ? '✓' : '✗'}
                </span>
                <span className={g.couvert ? 'font-semibold' : 'text-gray-400'}>{g.nom}</span>
                {g.couvert && <span className="text-xs text-charcoal-500">— {g.plafond}</span>}
              </li>
            ))}
          </ul>
        </div>

        <details className="mt-4 text-xs text-charcoal-600">
          <summary className="cursor-pointer font-semibold">Voir le détail du calcul</summary>
          <ul className="mt-2 space-y-1 pl-4">
            <li>
              Tarif base au m² : <strong>{r.detail.base} € par m² par an</strong>
            </li>
            <li>Coef surface (économies échelle) : ×{r.detail.coefSurface.toFixed(2)}</li>
            <li>Coef statut (locataire ou propriétaire) : ×{r.detail.coefStatut.toFixed(2)}</li>
            <li>Coef CA : ×{r.detail.coefCA.toFixed(2)}</li>
            <li>Coef formule : ×{r.detail.coefFormule.toFixed(2)}</li>
            <li>Coef mobilier déclaré : ×{r.detail.coefMobilier.toFixed(2)}</li>
            <li>Coef zone : ×{r.detail.coefZone.toFixed(2)}</li>
            <li>Coef perte exploitation : ×{r.detail.coefPE.toFixed(2)}</li>
          </ul>
        </details>

        <a
          href={ctaUrl}
          className="mt-5 inline-block w-full rounded-lg bg-orange-700 px-6 py-3 text-center font-bold text-white shadow-lg transition hover:bg-orange-800 md:w-auto"
        >
          → Recevoir mon devis multirisque officiel sous 24h
        </a>
      </div>

      <p className="text-xs italic text-charcoal-500">
        ⚠️ Estimation <strong>indicative</strong>. Tarif réel variable ±20% selon : présence
        sprinklers, alarme ou coffre-fort (rabais), proximité caserne pompiers, antécédents 5 ans,
        activités annexes (laboratoire, stockage matières dangereuses). Conformité ACPR 2024-R-02.
      </p>
    </div>
  )
}
