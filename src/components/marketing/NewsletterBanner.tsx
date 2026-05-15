'use client'

import { Sparkles } from 'lucide-react'
import { NewsletterForm } from './NewsletterForm'

/**
 * Bannière newsletter — section pleine largeur insérée juste avant le footer
 * pour capturer les emails des visiteurs avant le launch ORIAS.
 *
 * Marqué Client pour éviter un bug Next 15 RSC → CC en composition layout.
 */
export function NewsletterBanner() {
  return (
    <section
      className="border-y border-charcoal-100 bg-sand-50 py-14"
      aria-labelledby="newsletter-banner-title"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
              Newsletter mensuelle
            </span>
            <h2
              id="newsletter-banner-title"
              className="mb-3 font-heading text-2xl font-extrabold leading-tight tracking-tight text-charcoal-900 md:text-3xl"
            >
              Restez à jour sur la réglementation assurance pro
            </h2>
            <p className="text-base leading-relaxed text-charcoal-600">
              Une fois par mois, recevez nos décryptages ACPR, DDA, Loi Spinetta + nos guides
              pratiques par vertical (BTP, RC Pro, Mutuelle TNS, Cyber, VTC). Sans spam,
              désinscription en 1 clic.
            </p>
          </div>
          <NewsletterForm variant="card" source="banner" />
        </div>
      </div>
    </section>
  )
}
