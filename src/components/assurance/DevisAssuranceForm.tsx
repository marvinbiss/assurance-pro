'use client'

/**
 * DEVIS ASSURANCE — Formulaire 3 étapes
 *
 * Étape 1 : Activité (métier, ville, CA, statut)
 * Étape 2 : Profil de risque (ancienneté, sinistralité, garanties souhaitées)
 * Étape 3 : Coordonnées + consentement RGPD
 *
 * Sortie : POST /api/devis-assurance → scoring + dispatch routing
 */

import { useEffect, useRef, useState } from 'react'

const DRAFT_STORAGE_KEY = 'devis_draft_v1'
const DRAFT_TTL_MS = 24 * 60 * 60 * 1000 // 24h

type Step = 1 | 2 | 3

interface FormData {
  // Étape 1
  garantie_code: string
  metier_code: string
  ville: string
  postal_code: string
  ca_range: string
  statut_juridique: string

  // Étape 2
  anciennete_annees: number
  sinistralite_36m: number
  garanties_demandees: string[]
  sous_traitance: boolean

  // Étape 3
  prenom: string
  nom: string
  email: string
  telephone: string
  siret: string
  consent_rgpd: boolean
  consent_marketing: boolean
  consent_fic_ipid: boolean
}

interface Props {
  prefill?: Partial<FormData>
  source_page_id?: string
  source_url?: string
  onSubmitted?: (leadId: string) => void
}

const initialData: FormData = {
  garantie_code: '',
  metier_code: '',
  ville: '',
  postal_code: '',
  ca_range: '',
  statut_juridique: '',
  anciennete_annees: 0,
  sinistralite_36m: 0,
  garanties_demandees: [],
  sous_traitance: false,
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  siret: '',
  consent_rgpd: false,
  consent_marketing: false,
  consent_fic_ipid: false,
}

export function DevisAssuranceForm({ prefill, source_page_id, source_url, onSubmitted }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState<FormData>({ ...initialData, ...prefill })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null)
  const errorRef = useRef<HTMLDivElement | null>(null)

  // Hydratation localStorage (TTL 24h) — anti-abandon courtage.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as { savedAt: number; data: Partial<FormData> }
      if (!parsed?.savedAt || Date.now() - parsed.savedAt > DRAFT_TTL_MS) {
        localStorage.removeItem(DRAFT_STORAGE_KEY)
        return
      }
      // Ne pas écraser un prefill JWT cross-domain (déjà appliqué).
      setData((d) => ({ ...parsed.data, ...d, ...prefill }))
    } catch {
      // ignore parse errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persistance à chaque update (debounce léger via JSON.stringify).
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      // On NE persiste PAS les données sensibles : siret + email + téléphone restent
      // en mémoire seule pour limiter l'exposition en cas de partage de PC.
      const safe = { ...data, siret: '', email: '', telephone: '' }
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), data: safe }))
    } catch {
      // quota exceeded ; ignore
    }
  }, [data])

  // Focus management : à chaque changement d'étape, focus sur le H2 de la nouvelle étape.
  useEffect(() => {
    stepHeadingRef.current?.focus()
  }, [step])

  // Focus l'erreur quand elle apparaît.
  useEffect(() => {
    if (error) errorRef.current?.focus()
  }, [error])

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }))
  }

  function clearDraft() {
    try {
      if (typeof window !== 'undefined') localStorage.removeItem(DRAFT_STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  async function handleSubmit() {
    if (!data.consent_rgpd) {
      setError('Le consentement RGPD est obligatoire pour traiter votre demande.')
      return
    }
    if (!data.consent_fic_ipid) {
      setError(
        "Vous devez confirmer avoir consulté la Fiche d'Information Précontractuelle (FIC) et la fiche IPID du produit (art. L. 521-2 C. assur.)."
      )
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/devis-assurance', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, source_page_id, source_url }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? `Erreur ${res.status}`)
      }
      const json = (await res.json()) as { lead_id: string; redirect_url?: string }
      clearDraft()
      onSubmitted?.(json.lead_id)
      if (json.redirect_url) {
        window.location.href = json.redirect_url
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const canGoStep2 =
    data.garantie_code &&
    data.metier_code &&
    data.postal_code &&
    data.ca_range &&
    data.statut_juridique
  const canGoStep3 = data.anciennete_annees !== undefined && data.sinistralite_36m !== undefined
  const canSubmit =
    data.prenom &&
    data.nom &&
    data.email &&
    data.telephone &&
    data.consent_rgpd &&
    data.consent_fic_ipid

  return (
    <section className="devis-form mx-auto max-w-2xl rounded-lg bg-white p-6 shadow">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          if (step === 3 && canSubmit) handleSubmit()
        }}
      >
        <div
          className="mb-6"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label={`Étape ${step} sur 3`}
        >
          <div className="mb-2 flex items-center justify-between text-sm text-charcoal-500">
            <span className={step >= 1 ? 'font-semibold text-primary-600' : ''}>1. Activité</span>
            <span className={step >= 2 ? 'font-semibold text-primary-600' : ''}>2. Profil</span>
            <span className={step >= 3 ? 'font-semibold text-primary-600' : ''}>
              3. Coordonnées
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-primary-600 transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 ref={stepHeadingRef} tabIndex={-1} className="mb-4 text-2xl font-bold outline-none">
              Votre activité
            </h2>

            <Field label="Garantie souhaitée">
              <select
                value={data.garantie_code}
                onChange={(e) => update('garantie_code', e.target.value)}
                className="w-full rounded border p-2"
              >
                <option value="">Sélectionner...</option>
                <option value="decennale">Garantie décennale</option>
                <option value="rc_pro">RC Pro</option>
                <option value="multirisque_pro">Multirisque pro</option>
                <option value="dommages_ouvrage">Dommages-ouvrage</option>
                <option value="trc">Tous Risques Chantier</option>
                <option value="flotte_auto_pro">Flotte auto pro</option>
                <option value="prevoyance_tns">Prévoyance TNS</option>
                <option value="mutuelle_pro">Mutuelle pro</option>
                <option value="cyber">Cyber assurance</option>
              </select>
            </Field>

            <Field label="Votre métier">
              <input
                type="text"
                value={data.metier_code}
                onChange={(e) => update('metier_code', e.target.value)}
                placeholder="Plombier, électricien, VTC, médecin..."
                className="w-full rounded border p-2"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Ville">
                <input
                  type="text"
                  value={data.ville}
                  onChange={(e) => update('ville', e.target.value)}
                  className="w-full rounded border p-2"
                />
              </Field>
              <Field label="Code postal">
                <input
                  type="text"
                  value={data.postal_code}
                  onChange={(e) => update('postal_code', e.target.value)}
                  pattern="\d{5}"
                  maxLength={5}
                  className="w-full rounded border p-2"
                />
              </Field>
            </div>

            <Field label="CA annuel HT">
              <select
                value={data.ca_range}
                onChange={(e) => update('ca_range', e.target.value)}
                className="w-full rounded border p-2"
              >
                <option value="">Sélectionner...</option>
                <option value="lt_50k">Moins de 50 000 €</option>
                <option value="50_100k">50 000 - 100 000 €</option>
                <option value="100_250k">100 000 - 250 000 €</option>
                <option value="250_500k">250 000 - 500 000 €</option>
                <option value="gt_500k">Plus de 500 000 €</option>
              </select>
            </Field>

            <Field label="Statut juridique">
              <select
                value={data.statut_juridique}
                onChange={(e) => update('statut_juridique', e.target.value)}
                className="w-full rounded border p-2"
              >
                <option value="">Sélectionner...</option>
                <option value="auto_entrepreneur">Auto-entrepreneur — Micro</option>
                <option value="ei">Entreprise Individuelle (EI)</option>
                <option value="eurl">EURL</option>
                <option value="sarl">SARL</option>
                <option value="sasu">SASU</option>
                <option value="sas">SAS</option>
                <option value="profession_liberale">Profession libérale</option>
              </select>
            </Field>

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canGoStep2}
              className="w-full rounded bg-primary-600 py-3 font-semibold text-white disabled:bg-gray-300"
            >
              Continuer →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 ref={stepHeadingRef} tabIndex={-1} className="mb-4 text-2xl font-bold outline-none">
              Votre profil de risque
            </h2>

            <Field label="Ancienneté de votre activité (années)">
              <input
                type="number"
                min={0}
                max={50}
                value={data.anciennete_annees}
                onChange={(e) => update('anciennete_annees', Number(e.target.value))}
                className="w-full rounded border p-2"
              />
            </Field>

            <Field label="Sinistres déclarés sur 36 derniers mois">
              <input
                type="number"
                min={0}
                max={20}
                value={data.sinistralite_36m}
                onChange={(e) => update('sinistralite_36m', Number(e.target.value))}
                className="w-full rounded border p-2"
              />
            </Field>

            <Field label="Garanties souhaitées (plusieurs choix possibles)">
              <div className="space-y-2">
                {[
                  { code: 'decennale', label: 'Décennale' },
                  { code: 'rc_pro', label: 'RC Pro' },
                  { code: 'multirisque_pro', label: 'Multirisque pro' },
                  { code: 'flotte_auto_pro', label: 'Flotte auto pro' },
                  { code: 'prevoyance_tns', label: 'Prévoyance TNS' },
                  { code: 'mutuelle_pro', label: 'Mutuelle pro' },
                  { code: 'cyber', label: 'Cyber assurance' },
                ].map((g) => (
                  <label key={g.code} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.garanties_demandees.includes(g.code)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          update('garanties_demandees', [...data.garanties_demandees, g.code])
                        } else {
                          update(
                            'garanties_demandees',
                            data.garanties_demandees.filter((c) => c !== g.code)
                          )
                        }
                      }}
                    />
                    {g.label}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.sous_traitance}
                  onChange={(e) => update('sous_traitance', e.target.checked)}
                />
                Je travaille en sous-traitance
              </label>
            </Field>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded border py-3 font-semibold"
              >
                ← Retour
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!canGoStep3}
                className="flex-1 rounded bg-primary-600 py-3 font-semibold text-white disabled:bg-gray-300"
              >
                Continuer →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 ref={stepHeadingRef} tabIndex={-1} className="mb-4 text-2xl font-bold outline-none">
              Vos coordonnées
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Prénom">
                <input
                  type="text"
                  name="prenom"
                  value={data.prenom}
                  onChange={(e) => update('prenom', e.target.value)}
                  className="w-full rounded border p-2"
                  autoComplete="given-name"
                  required
                  maxLength={80}
                />
              </Field>
              <Field label="Nom">
                <input
                  type="text"
                  name="nom"
                  value={data.nom}
                  onChange={(e) => update('nom', e.target.value)}
                  className="w-full rounded border p-2"
                  autoComplete="family-name"
                  required
                  maxLength={80}
                />
              </Field>
            </div>

            <Field label="Email professionnel">
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => update('email', e.target.value)}
                className="w-full rounded border p-2"
                autoComplete="email"
                inputMode="email"
                required
                maxLength={254}
              />
            </Field>

            <Field label="Téléphone">
              <input
                type="tel"
                name="telephone"
                value={data.telephone}
                onChange={(e) => update('telephone', e.target.value)}
                pattern="[0-9 +]+"
                className="w-full rounded border p-2"
                autoComplete="tel"
                inputMode="tel"
                required
                maxLength={30}
              />
            </Field>

            <Field label="SIRET (optionnel — accélère le devis)">
              <input
                type="text"
                name="siret"
                value={data.siret}
                onChange={(e) => update('siret', e.target.value)}
                maxLength={14}
                className="w-full rounded border p-2"
                autoComplete="organization-identifier"
                inputMode="numeric"
                pattern="\d{14}"
              />
            </Field>

            <div className="mt-6 space-y-3 rounded bg-sand-50 p-4">
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={data.consent_rgpd}
                  onChange={(e) => update('consent_rgpd', e.target.checked)}
                  className="mt-1"
                  aria-required="true"
                />
                <span>
                  <strong>(Obligatoire)</strong> J&apos;accepte que mes données soient traitées par
                  le courtier dans le cadre de cette demande de devis (
                  <a
                    href="/confidentialite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Politique de confidentialité
                  </a>
                  ). Conformément au RGPD, je dispose d&apos;un droit d&apos;accès, de rectification
                  et d&apos;effacement.
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={data.consent_fic_ipid}
                  onChange={(e) => update('consent_fic_ipid', e.target.checked)}
                  className="mt-1"
                  aria-required="true"
                />
                <span>
                  <strong>(Obligatoire)</strong> J&apos;ai pris connaissance de la{' '}
                  <a href="/fic" target="_blank" rel="noopener noreferrer" className="underline">
                    Fiche d&apos;Information Précontractuelle (FIC)
                  </a>{' '}
                  et des{' '}
                  <a href="/ipid" target="_blank" rel="noopener noreferrer" className="underline">
                    fiches IPID
                  </a>{' '}
                  des produits (art. L. 521-2 du Code des assurances + règlement UE 2017/1469).
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={data.consent_marketing}
                  onChange={(e) => update('consent_marketing', e.target.checked)}
                  className="mt-1"
                />
                <span>
                  J&apos;accepte de recevoir des conseils et actualités réglementaires par email
                  (facultatif, désinscription à tout moment).
                </span>
              </label>
            </div>

            <div className="text-xs italic text-charcoal-500">
              Ce contenu est informatif et ne constitue pas un conseil personnalisé au sens de
              l'article L. 521-4 du Code des assurances. Pour un conseil adapté à votre situation,
              un courtier ORIAS vous recontactera après réception du formulaire.
            </div>

            {error ? (
              <div
                ref={errorRef}
                tabIndex={-1}
                role="alert"
                aria-live="assertive"
                className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 outline-none"
              >
                {error}
              </div>
            ) : null}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 rounded border py-3 font-semibold"
              >
                ← Retour
              </button>
              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className="flex-1 rounded bg-primary-600 py-3 font-semibold text-white disabled:bg-gray-300"
              >
                {submitting ? 'Envoi...' : 'Recevoir mon devis →'}
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      {label ? <span className="mb-1 block text-sm font-medium">{label}</span> : null}
      {children}
    </label>
  )
}
