'use client'

/**
 * Form interactif pour générer une lettre de résiliation d'assurance pro au format PDF.
 * Génération 100% client-side (RGPD compliant total).
 */

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { z } from 'zod'

const PdfDownloadButton = dynamic(
  () =>
    import('./LettreResiliationPdfDownloadButton').then(
      (m) => m.LettreResiliationPdfDownloadButton
    ),
  { ssr: false, loading: () => <span className="text-sm text-gray-500">Préparation du PDF…</span> }
)

const schema = z.object({
  assureNom: z.string().min(2).max(80),
  assurePrenom: z.string().min(2).max(80),
  assureAdresse: z.string().min(5).max(200),
  assureCp: z.string().regex(/^\d{5}$/, 'Code postal 5 chiffres'),
  assureVille: z.string().min(2).max(80),
  assureurNom: z.string().min(2).max(120),
  assureurAdresse: z.string().min(5).max(200),
  assureurCp: z.string().regex(/^\d{5}$/, 'Code postal 5 chiffres'),
  assureurVille: z.string().min(2).max(80),
  numeroPolice: z.string().min(2).max(60),
  typeAssurance: z.string().min(2).max(80),
  dateSouscription: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateEffetResiliation: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  motif: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const today = new Date()
const effetDefault = new Date(today.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

const defaultData: FormData = {
  assureNom: '',
  assurePrenom: '',
  assureAdresse: '',
  assureCp: '',
  assureVille: '',
  assureurNom: '',
  assureurAdresse: '',
  assureurCp: '',
  assureurVille: '',
  numeroPolice: '',
  typeAssurance: 'Responsabilité Civile Professionnelle (RC Pro)',
  dateSouscription: '',
  dateEffetResiliation: effetDefault,
  motif: '',
}

const TYPES_ASSURANCE = [
  'Responsabilité Civile Professionnelle (RC Pro)',
  'Décennale (Loi Spinetta)',
  'Multirisque professionnelle',
  'Mutuelle santé TNS',
  'Prévoyance TNS',
  'Cyber assurance',
  'Protection juridique professionnelle',
  'Assurance auto/véhicule professionnel',
  'Assurance flotte automobile',
  'Autre',
]

export function LettreResiliationForm() {
  const [data, setData] = useState<FormData>(defaultData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [showPdf, setShowPdf] = useState(false)

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
    setShowPdf(false)
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    const result = schema.safeParse(data)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {}
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormData
        if (!fieldErrors[k]) fieldErrors[k] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setShowPdf(true)
  }

  return (
    <form onSubmit={handleGenerate} className="space-y-4">
      {/* Émetteur (vous) */}
      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-2 text-sm font-semibold">1. Vos coordonnées (émetteur)</legend>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <Field label="Prénom" required error={errors.assurePrenom}>
            <input
              type="text"
              value={data.assurePrenom}
              onChange={(e) => update('assurePrenom', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="Nom" required error={errors.assureNom}>
            <input
              type="text"
              value={data.assureNom}
              onChange={(e) => update('assureNom', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="Adresse" required error={errors.assureAdresse}>
            <input
              type="text"
              value={data.assureAdresse}
              onChange={(e) => update('assureAdresse', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
              required
            />
          </Field>
          <div className="grid grid-cols-3 gap-2">
            <Field label="CP" required error={errors.assureCp}>
              <input
                type="text"
                value={data.assureCp}
                onChange={(e) => update('assureCp', e.target.value)}
                placeholder="75001"
                className="w-full rounded border border-gray-300 px-3 py-2 font-mono"
                required
              />
            </Field>
            <div className="col-span-2">
              <Field label="Ville" required error={errors.assureVille}>
                <input
                  type="text"
                  value={data.assureVille}
                  onChange={(e) => update('assureVille', e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                  required
                />
              </Field>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Destinataire (assureur) */}
      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-2 text-sm font-semibold">
          2. Coordonnées de votre assureur (destinataire)
        </legend>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <Field label="Nom de l'assureur" required error={errors.assureurNom}>
            <input
              type="text"
              value={data.assureurNom}
              onChange={(e) => update('assureurNom', e.target.value)}
              placeholder="Ex : AXA Pro, MAAF Pro, MMA Pro"
              className="w-full rounded border border-gray-300 px-3 py-2"
              required
            />
          </Field>
          <Field label="Adresse du service résiliations" required error={errors.assureurAdresse}>
            <input
              type="text"
              value={data.assureurAdresse}
              onChange={(e) => update('assureurAdresse', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
              required
            />
          </Field>
          <div className="grid grid-cols-3 gap-2">
            <Field label="CP" required error={errors.assureurCp}>
              <input
                type="text"
                value={data.assureurCp}
                onChange={(e) => update('assureurCp', e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 font-mono"
                required
              />
            </Field>
            <div className="col-span-2">
              <Field label="Ville" required error={errors.assureurVille}>
                <input
                  type="text"
                  value={data.assureurVille}
                  onChange={(e) => update('assureurVille', e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                  required
                />
              </Field>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Contrat */}
      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-2 text-sm font-semibold">3. Contrat à résilier</legend>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <Field label="Numéro de police" required error={errors.numeroPolice}>
            <input
              type="text"
              value={data.numeroPolice}
              onChange={(e) => update('numeroPolice', e.target.value)}
              placeholder="Ex : POL-2024-XXXXXX"
              className="w-full rounded border border-gray-300 px-3 py-2 font-mono"
              required
            />
          </Field>
          <Field label="Type d'assurance" required>
            <select
              value={data.typeAssurance}
              onChange={(e) => update('typeAssurance', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
            >
              {TYPES_ASSURANCE.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Date de souscription du contrat" required error={errors.dateSouscription}>
            <input
              type="date"
              value={data.dateSouscription}
              onChange={(e) => update('dateSouscription', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
              required
            />
            <span className="mt-1 block text-xs text-amber-700">
              ⚠️ La Loi Hamon nécessite au moins 1 an d&apos;engagement
            </span>
          </Field>
          <Field
            label="Date d'effet de la résiliation souhaitée"
            required
            error={errors.dateEffetResiliation}
          >
            <input
              type="date"
              value={data.dateEffetResiliation}
              onChange={(e) => update('dateEffetResiliation', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
              required
            />
            <span className="mt-1 block text-xs text-gray-500">
              Délai légal : 1 mois après réception par l&apos;assureur
            </span>
          </Field>
          <div className="md:col-span-2">
            <Field label="Motif (optionnel — la Loi Hamon n'exige aucun motif)">
              <input
                type="text"
                value={data.motif}
                onChange={(e) => update('motif', e.target.value)}
                placeholder="Ex : changement d'assureur, tarif trop élevé..."
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </Field>
          </div>
        </div>
      </fieldset>

      <div className="flex flex-col items-start gap-3 md:flex-row">
        <button
          type="submit"
          className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition hover:bg-primary-700"
        >
          📄 Générer ma lettre PDF
        </button>
        {showPdf && (
          <PdfDownloadButton
            data={data}
            fileName={`lettre-resiliation-${data.numeroPolice.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`}
            className="inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            ⬇️ Télécharger ma lettre
          </PdfDownloadButton>
        )}
      </div>

      <p className="mt-4 text-xs italic text-gray-500">
        ✅ Loi Hamon (17 mars 2014) — résiliation infra-annuelle, sans frais, sans motif. Lettre à
        imprimer + signer + envoyer en <strong>recommandé avec accusé de réception</strong>.
      </p>
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
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}
