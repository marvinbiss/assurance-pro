/**
 * Page /devis — Formulaire devis assurance pro 3 étapes
 */

import type { Metadata } from 'next'
import { DevisAssuranceForm } from '@/components/assurance/DevisAssuranceForm'

export const metadata: Metadata = {
  title: 'Devis assurance pro gratuit en 2 minutes | Assurance Pro',
  description:
    'Recevez votre devis assurance professionnelle personnalisé en moins de 24 heures. Décennale, RC Pro, Multirisque, Mutuelle TNS, VTC. Sans engagement, sans frais courtage.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assurance-pro.fr'}/devis`,
  },
  robots: { index: true, follow: true },
}

export default function DevisPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Votre devis assurance pro en 2 minutes
          </h1>
          <p className="text-gray-600 text-lg">
            Comparé sur 10+ assureurs partenaires. Sans engagement. Réponse sous 24&nbsp;heures.
          </p>
        </header>

        <DevisAssuranceForm />

        <p className="mt-8 text-center text-xs text-gray-500 max-w-2xl mx-auto">
          <strong>Information précontractuelle —</strong> Ce formulaire est un point de départ pour
          recueillir vos exigences et besoins (art.&nbsp;L.&nbsp;521-4 du Code des assurances).
          Un courtier ORIAS vous recontactera ensuite pour formuler un conseil personnalisé motivé
          conforme à la Recommandation ACPR 2024-R-03.
        </p>
      </div>
    </main>
  )
}
