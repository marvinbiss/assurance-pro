'use client'

import { useState } from 'react'

interface ReclamationFormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  ticket?: string
  message?: string
}

export function ReclamationForm() {
  const [state, setState] = useState<ReclamationFormState>({ status: 'idle' })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({ status: 'submitting' })

    const formData = new FormData(e.currentTarget)
    const payload = {
      civilite: String(formData.get('civilite') ?? ''),
      nom: String(formData.get('nom') ?? '').trim(),
      prenom: String(formData.get('prenom') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      telephone: String(formData.get('telephone') ?? '').trim(),
      societe: String(formData.get('societe') ?? '').trim(),
      contrat: String(formData.get('contrat') ?? '').trim(),
      sinistre_ref: String(formData.get('sinistre_ref') ?? '').trim(),
      categorie: String(formData.get('categorie') ?? ''),
      objet: String(formData.get('objet') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
      consent: formData.get('consent') === 'on',
    }

    if (!payload.consent) {
      setState({ status: 'error', message: 'Vous devez accepter le traitement de vos données.' })
      return
    }
    if (!payload.email || !payload.message || !payload.objet) {
      setState({ status: 'error', message: 'Email, objet et message sont obligatoires.' })
      return
    }

    try {
      const res = await fetch('/api/reclamation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setState({ status: 'error', message: data?.error ?? 'Erreur. Veuillez réessayer.' })
        return
      }
      setState({ status: 'success', ticket: data.ticket })
    } catch {
      setState({ status: 'error', message: 'Erreur réseau. Veuillez réessayer.' })
    }
  }

  if (state.status === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="mb-2 text-xl font-bold text-green-800">Réclamation enregistrée</h2>
        <p className="mb-1 text-sm text-green-900">
          Votre numéro de dossier : <strong className="font-mono">{state.ticket}</strong>
        </p>
        <p className="mb-3 text-sm text-green-900">
          Conformément à la <strong>Recommandation ACPR 2024-R-02</strong>, nous accuserons
          réception de votre réclamation sous <strong>10 jours ouvrés</strong> et nous vous
          répondrons sur le fond sous <strong>2 mois maximum</strong>.
        </p>
        <p className="text-xs text-green-800">
          Un email de confirmation vous a été envoyé. En cas de désaccord persistant, vous pourrez
          saisir le Médiateur de l&apos;Assurance.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <fieldset disabled={state.status === 'submitting'} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="civilite" className="mb-1 block text-sm font-semibold text-gray-700">
              Civilité
            </label>
            <select
              id="civilite"
              name="civilite"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="M.">M.</option>
              <option value="Mme">Mme</option>
            </select>
          </div>
          <div>
            <label htmlFor="prenom" className="mb-1 block text-sm font-semibold text-gray-700">
              Prénom *
            </label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="nom" className="mb-1 block text-sm font-semibold text-gray-700">
              Nom *
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-gray-700">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="telephone" className="mb-1 block text-sm font-semibold text-gray-700">
              Téléphone
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              autoComplete="tel"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="societe" className="mb-1 block text-sm font-semibold text-gray-700">
            Raison sociale (si professionnel)
          </label>
          <input
            id="societe"
            name="societe"
            type="text"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="contrat" className="mb-1 block text-sm font-semibold text-gray-700">
              N° de contrat
            </label>
            <input
              id="contrat"
              name="contrat"
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="sinistre_ref"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Référence sinistre
            </label>
            <input
              id="sinistre_ref"
              name="sinistre_ref"
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="categorie" className="mb-1 block text-sm font-semibold text-gray-700">
            Catégorie *
          </label>
          <select
            id="categorie"
            name="categorie"
            required
            defaultValue=""
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="" disabled>
              — Choisir —
            </option>
            <option value="conseil">Devoir de conseil</option>
            <option value="souscription">Souscription — Tarif</option>
            <option value="sinistre">Gestion sinistre</option>
            <option value="resiliation">Résiliation</option>
            <option value="facturation">Facturation — Cotisation</option>
            <option value="rgpd">Données personnelles (RGPD)</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="objet" className="mb-1 block text-sm font-semibold text-gray-700">
            Objet *
          </label>
          <input
            id="objet"
            name="objet"
            type="text"
            required
            maxLength={200}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-semibold text-gray-700">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={4000}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            placeholder="Décrivez précisément les faits, dates, échanges déjà eus, et la résolution attendue."
          />
        </div>

        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input type="checkbox" name="consent" required className="mt-0.5" />
          <span>
            J&apos;accepte le traitement de mes données dans le cadre du suivi de ma réclamation
            (base légale : intérêt légitime + obligation réglementaire ACPR). Conservation 5 ans.
            <a
              href="/confidentialite"
              className="ml-1 font-semibold text-primary-700 underline-offset-2 hover:underline"
            >
              En savoir plus
            </a>
            .
          </span>
        </label>

        {state.status === 'error' && state.message && (
          <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-primary-500 px-6 py-3 font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-primary-600 disabled:opacity-50 md:w-auto"
        >
          {state.status === 'submitting' ? 'Envoi…' : 'Envoyer ma réclamation'}
        </button>
      </fieldset>
    </form>
  )
}
