'use client'

import { ShieldCheck, Sparkles } from 'lucide-react'
import { PreinscriptionForm } from '@/components/assurance/PreinscriptionForm'
import { ORIAS_EXPECTED_DATE } from '@/lib/config/pre-orias'

interface DevisSoftViewProps {
  defaultVertical?: string
}

export function DevisSoftView({ defaultVertical }: DevisSoftViewProps) {
  return (
    <main className="min-h-screen bg-sand-50 py-12 dark:bg-charcoal-900 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <header className="mb-10 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
            Soft launch &middot; Préinscription
          </span>
          <h1 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-charcoal-900 md:text-5xl">
            Soyez informé(e) dès le lancement
          </h1>
          <p className="mx-auto max-w-2xl text-base text-charcoal-600 md:text-lg">
            Notre cabinet est <strong>en cours d&apos;immatriculation au registre ORIAS</strong>.
            Ouverture commerciale prévue {ORIAS_EXPECTED_DATE}. Laissez-nous votre email pour être
            prévenu(e) en priorité et accéder à votre devis personnalisé dès l&apos;ouverture.
          </p>
        </header>

        <div className="rounded-3xl border border-charcoal-100 bg-white p-6 shadow-soft md:p-10">
          <PreinscriptionForm defaultVertical={defaultVertical} />
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-charcoal-100 bg-white/60 p-5 text-sm text-charcoal-600">
          <p className="mb-2 flex items-center gap-2 font-bold text-charcoal-800">
            <ShieldCheck className="h-4 w-4 text-secondary-600" strokeWidth={2.4} />
            Pourquoi pas de devis maintenant ?
          </p>
          <p className="leading-relaxed">
            La loi française (art. L. 512-1 du Code des assurances) interdit toute distribution ou
            intermédiation en assurance avant immatriculation au registre ORIAS. Nous respectons
            cette obligation : pas de tarif, pas de comparaison commerciale tant que notre numéro
            n&apos;est pas attribué. Vous serez le ou la premier(e) prévenu(e).
          </p>
        </div>
      </div>
    </main>
  )
}
