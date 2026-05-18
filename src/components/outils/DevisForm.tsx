'use client'

/**
 * Form interactif pour générer un devis pro au format PDF.
 * Génération 100% client-side (RGPD compliant total).
 */

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { z } from 'zod'

const PdfDownloadButton = dynamic(
  () => import('./DevisPdfDownloadButton').then((m) => m.DevisPdfDownloadButton),
  {
    ssr: false,
    loading: () => <span className="text-sm text-charcoal-500">Préparation du PDF…</span>,
  }
)

const ligneSchema = z.object({
  description: z.string().min(2),
  quantite: z.number().min(0.01),
  prixUnitaire: z.number().min(0),
})

const schema = z.object({
  emetteurNom: z.string().min(2).max(120),
  emetteurFormeJuridique: z.string().min(2).max(60),
  emetteurAdresse: z.string().min(5).max(200),
  emetteurSiret: z.string().min(14).max(20),
  emetteurTva: z.string().optional(),
  emetteurEmail: z.string().email().optional().or(z.literal('')),
  emetteurTelephone: z.string().optional(),
  emetteurAssureur: z.string().optional(),
  emetteurAssurancePolice: z.string().optional(),
  destinataireNom: z.string().min(2).max(120),
  destinataireAdresse: z.string().min(5).max(200),
  destinataireSiret: z.string().optional(),
  numeroDevis: z.string().min(1).max(40),
  dateDevis: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateValidite: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tauxTva: z.number().min(0).max(100),
  dureeRealisation: z.string().optional(),
  conditionsReglement: z.string().optional(),
  acompte: z.string().optional(),
  garanties: z.string().optional(),
  lignes: z.array(ligneSchema).min(1),
})

type FormData = z.infer<typeof schema>

const today = new Date().toISOString().slice(0, 10)
const validite = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

const defaultData: FormData = {
  emetteurNom: '',
  emetteurFormeJuridique: 'Auto-entrepreneur',
  emetteurAdresse: '',
  emetteurSiret: '',
  emetteurTva: '',
  emetteurEmail: '',
  emetteurTelephone: '',
  emetteurAssureur: '',
  emetteurAssurancePolice: '',
  destinataireNom: '',
  destinataireAdresse: '',
  destinataireSiret: '',
  numeroDevis: `DEVIS-${new Date().getFullYear()}-001`,
  dateDevis: today,
  dateValidite: validite,
  tauxTva: 20,
  dureeRealisation: '',
  conditionsReglement: '30 % à la commande, solde à la livraison',
  acompte: '30 % à la signature',
  garanties: 'Décennale (Loi Spinetta) + RC Pro travaux',
  lignes: [{ description: 'Prestation', quantite: 1, prixUnitaire: 0 }],
}

export function DevisForm() {
  const [data, setData] = useState<FormData>(defaultData)
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})
  const [showPdf, setShowPdf] = useState(false)

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }))
    setShowPdf(false)
  }

  function updateLigne(
    index: number,
    key: keyof (typeof defaultData.lignes)[number],
    value: string | number
  ) {
    setData((d) => ({
      ...d,
      lignes: d.lignes.map((l, i) => (i === index ? { ...l, [key]: value } : l)),
    }))
    setShowPdf(false)
  }

  function addLigne() {
    setData((d) => ({
      ...d,
      lignes: [...d.lignes, { description: '', quantite: 1, prixUnitaire: 0 }],
    }))
    setShowPdf(false)
  }

  function removeLigne(index: number) {
    setData((d) => ({ ...d, lignes: d.lignes.filter((_, i) => i !== index) }))
    setShowPdf(false)
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    const result = schema.safeParse(data)
    if (!result.success) {
      const fieldErrors: Partial<Record<string, string>> = {}
      for (const issue of result.error.issues) {
        const k = issue.path.join('.')
        if (!fieldErrors[k]) fieldErrors[k] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setShowPdf(true)
  }

  const sousTotal = data.lignes.reduce(
    (s, l) => s + (Number(l.quantite) || 0) * (Number(l.prixUnitaire) || 0),
    0
  )
  const tva = sousTotal * (data.tauxTva / 100)
  const totalTTC = sousTotal + tva
  const fmt = (n: number) => `${n.toFixed(2)} €`

  return (
    <form onSubmit={handleGenerate} className="space-y-4">
      <fieldset className="rounded-lg border border-sand-200 p-4">
        <legend className="px-2 text-sm font-semibold">
          1. Vos informations (émetteur du devis)
        </legend>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <Field label="Raison sociale — Nom" required error={errors.emetteurNom}>
            <input
              type="text"
              value={data.emetteurNom}
              onChange={(e) => update('emetteurNom', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
              required
              placeholder="Ex : EURL DUPONT BTP"
            />
          </Field>
          <Field label="Forme juridique" required>
            <input
              type="text"
              value={data.emetteurFormeJuridique}
              onChange={(e) => update('emetteurFormeJuridique', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="Adresse" required>
            <input
              type="text"
              value={data.emetteurAdresse}
              onChange={(e) => update('emetteurAdresse', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="SIRET" required>
            <input
              type="text"
              value={data.emetteurSiret}
              onChange={(e) => update('emetteurSiret', e.target.value)}
              placeholder="123 456 789 00012"
              className="w-full rounded border border-sand-300 px-3 py-2 font-mono"
              required
            />
          </Field>
          <Field label="N° TVA (si applicable)">
            <input
              type="text"
              value={data.emetteurTva}
              onChange={(e) => update('emetteurTva', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={data.emetteurEmail}
              onChange={(e) => update('emetteurEmail', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
            />
          </Field>
          <Field label="Téléphone">
            <input
              type="tel"
              value={data.emetteurTelephone}
              onChange={(e) => update('emetteurTelephone', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
            />
          </Field>
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-primary-600">
            + Mention assurance pro (BTP, santé, juridique — décret 2024)
          </summary>
          <div className="mt-2 grid gap-3 md:grid-cols-2">
            <Field label="Assureur">
              <input
                type="text"
                value={data.emetteurAssureur}
                onChange={(e) => update('emetteurAssureur', e.target.value)}
                placeholder="SMABTP, Hiscox..."
                className="w-full rounded border border-sand-300 px-3 py-2"
              />
            </Field>
            <Field label="N° de police">
              <input
                type="text"
                value={data.emetteurAssurancePolice}
                onChange={(e) => update('emetteurAssurancePolice', e.target.value)}
                className="w-full rounded border border-sand-300 px-3 py-2"
              />
            </Field>
          </div>
        </details>
      </fieldset>

      <fieldset className="rounded-lg border border-sand-200 p-4">
        <legend className="px-2 text-sm font-semibold">2. Client (destinataire)</legend>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <Field label="Raison sociale — Nom" required>
            <input
              type="text"
              value={data.destinataireNom}
              onChange={(e) => update('destinataireNom', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="Adresse" required>
            <input
              type="text"
              value={data.destinataireAdresse}
              onChange={(e) => update('destinataireAdresse', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="SIRET (si client B2B)">
            <input
              type="text"
              value={data.destinataireSiret}
              onChange={(e) => update('destinataireSiret', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2 font-mono"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-sand-200 p-4">
        <legend className="px-2 text-sm font-semibold">3. Détails du devis</legend>
        <div className="mt-2 grid gap-3 md:grid-cols-3">
          <Field label="N° devis" required>
            <input
              type="text"
              value={data.numeroDevis}
              onChange={(e) => update('numeroDevis', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="Date d'émission" required>
            <input
              type="date"
              value={data.dateDevis}
              onChange={(e) => update('dateDevis', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="Date de validité" required>
            <input
              type="date"
              value={data.dateValidite}
              onChange={(e) => update('dateValidite', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="Taux TVA (%)" required>
            <input
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={data.tauxTva}
              onChange={(e) => update('tauxTva', Number(e.target.value))}
              className="w-full rounded border border-sand-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="Durée prévisionnelle">
            <input
              type="text"
              value={data.dureeRealisation}
              onChange={(e) => update('dureeRealisation', e.target.value)}
              placeholder="Ex : 5 jours ouvrés"
              className="w-full rounded border border-sand-300 px-3 py-2"
            />
          </Field>
          <Field label="Acompte demandé">
            <input
              type="text"
              value={data.acompte}
              onChange={(e) => update('acompte', e.target.value)}
              placeholder="30% à la signature"
              className="w-full rounded border border-sand-300 px-3 py-2"
            />
          </Field>
          <Field label="Conditions de règlement">
            <input
              type="text"
              value={data.conditionsReglement}
              onChange={(e) => update('conditionsReglement', e.target.value)}
              className="w-full rounded border border-sand-300 px-3 py-2"
            />
          </Field>
          <Field label="Garanties">
            <input
              type="text"
              value={data.garanties}
              onChange={(e) => update('garanties', e.target.value)}
              placeholder="Décennale + RC Pro"
              className="w-full rounded border border-sand-300 px-3 py-2"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-sand-200 p-4">
        <legend className="px-2 text-sm font-semibold">4. Prestations chiffrées</legend>
        <div className="mt-2 space-y-2">
          {data.lignes.map((l, i) => (
            <div key={i} className="grid grid-cols-12 items-end gap-2">
              <div className="col-span-6">
                <input
                  type="text"
                  value={l.description}
                  onChange={(e) => updateLigne(i, 'description', e.target.value)}
                  placeholder="Description"
                  className="w-full rounded border border-sand-300 px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  min={0.01}
                  step="0.01"
                  value={l.quantite}
                  onChange={(e) => updateLigne(i, 'quantite', Number(e.target.value))}
                  placeholder="Qté"
                  className="w-full rounded border border-sand-300 px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={l.prixUnitaire}
                  onChange={(e) => updateLigne(i, 'prixUnitaire', Number(e.target.value))}
                  placeholder="PU HT"
                  className="w-full rounded border border-sand-300 px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="col-span-1">
                {data.lignes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLigne(i)}
                    className="text-xs text-red-600"
                  >
                    Suppr
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addLigne}
            className="mt-2 text-sm font-semibold text-primary-600"
          >
            + Ajouter une ligne
          </button>
        </div>
        <div className="mt-3 space-y-1 text-right text-sm">
          <div>
            Sous-total HT : <span className="font-mono">{fmt(sousTotal)}</span>
          </div>
          <div>
            TVA ({data.tauxTva}%) : <span className="font-mono">{fmt(tva)}</span>
          </div>
          <div className="font-bold text-primary-700">
            Total TTC : <span className="font-mono">{fmt(totalTTC)}</span>
          </div>
        </div>
      </fieldset>

      <div className="flex flex-col items-start gap-3 md:flex-row">
        <button
          type="submit"
          className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition hover:bg-primary-700"
        >
          📄 Générer mon devis PDF
        </button>
        {showPdf && (
          <PdfDownloadButton
            data={data}
            fileName={`devis-${data.numeroDevis}.pdf`}
            className="inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            ⬇️ Télécharger mon devis
          </PdfDownloadButton>
        )}
      </div>
    </form>
  )
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-charcoal-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}
