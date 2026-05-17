'use client'

import Image from 'next/image'
import { ShieldCheck, Sparkles } from 'lucide-react'
import { PreinscriptionForm } from '@/components/assurance/PreinscriptionForm'
import { ORIAS_EXPECTED_DATE } from '@/lib/config/pre-orias'
import { PAGE_PHOTOS } from '@/lib/data/photo-library'

interface DevisSoftViewProps {
  defaultVertical?: string
}

export function DevisSoftView({ defaultVertical }: DevisSoftViewProps) {
  return (
    <main className="min-h-screen bg-sand-50 py-12 dark:bg-charcoal-900 md:py-20">
      <div className="container mx-auto mb-10 max-w-5xl px-4">
        <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-premium">
          <Image
            src={PAGE_PHOTOS.devisConfiance.src}
            alt={PAGE_PHOTOS.devisConfiance.alt}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/20 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="font-display-premium text-lg italic md:text-xl">
              « Un courtier ORIAS dédié vous accompagne — pas un script. »
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-3xl px-4">
        <header className="mb-10 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-secondary-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary-800">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
            Pré-réservation prioritaire
          </span>
          <h1 className="mb-4 font-display-premium font-heading text-3xl font-extrabold tracking-tight text-charcoal-900 md:text-5xl">
            Réservez votre tarif négocié
          </h1>
          <p className="mx-auto max-w-2xl text-base text-charcoal-600 md:text-lg">
            Cabinet en cours d&apos;immatriculation ORIAS — ouverture {ORIAS_EXPECTED_DATE}.
            Pré-réservez votre place : vous serez parmi les premiers à recevoir{' '}
            <strong className="text-charcoal-900">3 devis personnalisés sous 24 h</strong> dès
            l&apos;ouverture commerciale.
          </p>
          <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-charcoal-700">
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck
                className="h-3.5 w-3.5 text-secondary-600"
                strokeWidth={2.4}
                aria-hidden="true"
              />
              Place prioritaire le jour J
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck
                className="h-3.5 w-3.5 text-secondary-600"
                strokeWidth={2.4}
                aria-hidden="true"
              />
              −32 % vs marché en moyenne
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck
                className="h-3.5 w-3.5 text-secondary-600"
                strokeWidth={2.4}
                aria-hidden="true"
              />
              Sans engagement
            </li>
          </ul>
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
