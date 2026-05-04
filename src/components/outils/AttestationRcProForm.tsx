'use client'

/**
 * Form interactif pour générer un modèle d'attestation RC Pro au format PDF.
 * Génération 100% client-side (RGPD compliant total).
 */

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { z } from 'zod'

const PdfDownloadButton = dynamic(
  () => import('./RcProPdfDownloadButton').then((m) => m.RcProPdfDownloadButton),
  { ssr: false, loading: () => <span className="text-gray-500 text-sm">Préparation du PDF…</span> }
)

const schema = z.object({
  raisonSociale: z.string().min(2, '2 caractères min').max(120),
  formeJuridique: z.enum(['Auto-entrepreneur', 'EI', 'EURL', 'SARL', 'SASU', 'SAS', 'Profession libérale', 'Autre']),
  siret: z.string().regex(/^\d{14}$/, '14 chiffres SIRET').or(z.string().regex(/^\d{3}\s\d{3}\s\d{3}\s\d{5}$/, 'Format 14 chiffres')),
  adresse: z.string().min(5).max(200),
  metiers: z.string().min(3, 'Activité(s) exercée(s)').max(300),
  zoneGeographique: z.string().min(3).max(100),
  dateDebut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format YYYY-MM-DD'),
  dateFin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format YYYY-MM-DD'),
  plafondParSinistre: z.string().min(2).max(50),
  plafondAnnuel: z.string().min(2).max(50),
})

type FormData = z.infer<typeof schema>

const defaultData: FormData = {
  raisonSociale: '',
  formeJuridique: 'Auto-entrepreneur',
  siret: '',
  adresse: '',
  metiers: 'Conseil en stratégie, formation, audit',
  zoneGeographique: 'France métropolitaine',
  dateDebut: new Date().toISOString().slice(0, 10),
  dateFin: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  plafondParSinistre: '1 500 000 €',
  plafondAnnuel: '3 000 000 €',
}

export function AttestationRcProForm() {
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
      <fieldset className="border border-gray-200 rounded-lg p-4">
        <legend className="text-sm font-semibold px-2">1. Identité de l&apos;entreprise</legend>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
          <Field label="Raison sociale" required error={errors.raisonSociale}>
            <input type="text" value={data.raisonSociale} onChange={(e) => update('raisonSociale', e.target.value)} placeholder="Ex : EURL DUPONT CONSULTING" className="w-full px-3 py-2 border border-gray-300 rounded" required />
          </Field>
          <Field label="Forme juridique" required>
            <select value={data.formeJuridique} onChange={(e) => update('formeJuridique', e.target.value as FormData['formeJuridique'])} className="w-full px-3 py-2 border border-gray-300 rounded">
              {(['Auto-entrepreneur', 'EI', 'EURL', 'SARL', 'SASU', 'SAS', 'Profession libérale', 'Autre'] as const).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </Field>
          <Field label="SIRET (14 chiffres)" required error={errors.siret}>
            <input type="text" value={data.siret} onChange={(e) => update('siret', e.target.value)} placeholder="123 456 789 00012" className="w-full px-3 py-2 border border-gray-300 rounded font-mono" required />
          </Field>
          <Field label="Adresse complète" required error={errors.adresse}>
            <input type="text" value={data.adresse} onChange={(e) => update('adresse', e.target.value)} placeholder="12 rue de Rivoli, 75001 Paris" className="w-full px-3 py-2 border border-gray-300 rounded" required />
          </Field>
        </div>
      </fieldset>

      <fieldset className="border border-gray-200 rounded-lg p-4">
        <legend className="text-sm font-semibold px-2">2. Activité couverte</legend>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
          <Field label="Activité(s) exercée(s)" required error={errors.metiers}>
            <input type="text" value={data.metiers} onChange={(e) => update('metiers', e.target.value)} placeholder="Conseil management, formation" className="w-full px-3 py-2 border border-gray-300 rounded" required />
          </Field>
          <Field label="Zone géographique" required error={errors.zoneGeographique}>
            <input type="text" value={data.zoneGeographique} onChange={(e) => update('zoneGeographique', e.target.value)} placeholder="France métropolitaine + UE" className="w-full px-3 py-2 border border-gray-300 rounded" required />
          </Field>
        </div>
      </fieldset>

      <fieldset className="border border-gray-200 rounded-lg p-4">
        <legend className="text-sm font-semibold px-2">3. Période + plafonds</legend>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
          <Field label="Date de début" required error={errors.dateDebut}>
            <input type="date" value={data.dateDebut} onChange={(e) => update('dateDebut', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" required />
          </Field>
          <Field label="Date de fin" required error={errors.dateFin}>
            <input type="date" value={data.dateFin} onChange={(e) => update('dateFin', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" required />
          </Field>
          <Field label="Plafond par sinistre" required error={errors.plafondParSinistre}>
            <input type="text" value={data.plafondParSinistre} onChange={(e) => update('plafondParSinistre', e.target.value)} placeholder="1 500 000 €" className="w-full px-3 py-2 border border-gray-300 rounded" required />
          </Field>
          <Field label="Plafond annuel cumulé" required error={errors.plafondAnnuel}>
            <input type="text" value={data.plafondAnnuel} onChange={(e) => update('plafondAnnuel', e.target.value)} placeholder="3 000 000 €" className="w-full px-3 py-2 border border-gray-300 rounded" required />
          </Field>
        </div>
      </fieldset>

      <div className="flex flex-col md:flex-row gap-3 items-start">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
          📄 Générer mon modèle PDF
        </button>
        {showPdf && (
          <PdfDownloadButton
            data={data}
            fileName={`modele-attestation-rc-pro-${data.siret.replace(/\s/g, '')}.pdf`}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition inline-block"
          >
            ⬇️ Télécharger le PDF maintenant
          </PdfDownloadButton>
        )}
      </div>

      <p className="text-xs text-gray-500 italic mt-4">
        ⚠️ Modèle PÉDAGOGIQUE non opposable. Pour une vraie attestation, souscrivez via notre{' '}
        <a href="/outils/devis-rc-pro" className="text-blue-600 underline">cabinet ORIAS sous 24h</a>.
      </p>
    </form>
  )
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500"> *</span>}
      </span>
      {children}
      {error && <span className="block text-xs text-red-600 mt-1">{error}</span>}
    </label>
  )
}
