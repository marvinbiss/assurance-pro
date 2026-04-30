/**
 * Page de remerciement post-devis
 */

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Merci — Demande reçue | Assurance Pro',
  description: 'Votre demande de devis a bien été reçue. Un courtier ORIAS vous recontactera sous 24 heures.',
  robots: { index: false, follow: true },
}

export default function MerciPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-2xl text-center bg-white rounded-lg shadow p-12">
        <div className="text-6xl mb-6" aria-hidden="true">✓</div>
        <h1 className="text-3xl font-bold mb-4">Demande bien reçue !</h1>
        <p className="text-lg text-gray-600 mb-8">
          Un courtier ORIAS de notre équipe vous recontactera sous{' '}
          <strong>24&nbsp;heures ouvrées</strong> pour vous présenter les meilleures offres
          de nos partenaires assureurs.
        </p>

        <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold mb-3">Prochaines étapes</h2>
          <ol className="space-y-2 text-sm text-gray-700">
            <li>1. Vous recevez sous quelques minutes un email de confirmation.</li>
            <li>2. Notre équipe analyse votre profil et interroge nos assureurs partenaires.</li>
            <li>3. Un courtier ORIAS vous contacte sous 24h pour formuler un conseil personnalisé motivé (art.&nbsp;L.&nbsp;521-4 C.&nbsp;assur.).</li>
            <li>4. Vous choisissez l’offre, l’attestation est délivrée sous 24h après souscription.</li>
          </ol>
        </div>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800"
        >
          ← Retour à l’accueil
        </Link>
      </div>
    </main>
  )
}
