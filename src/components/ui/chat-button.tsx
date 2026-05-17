'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, Phone, Mail, X } from 'lucide-react'

/**
 * Floating chat button (style Cofidis/Cetelem).
 * Pas un vrai live chat — pré-ORIAS = pas d'intermédiation autorisée.
 * Expose 3 canaux directs : téléphone / email / formulaire contact.
 */
export function ChatButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 right-5 z-40 hidden w-72 overflow-hidden rounded-2xl border border-charcoal-200 bg-white shadow-premium-lg md:block"
          role="dialog"
          aria-label="Contact rapide"
        >
          <div className="flex items-center justify-between bg-gradient-to-br from-primary-600 to-primary-700 px-4 py-3 text-white">
            <div>
              <p className="m-0 text-sm font-extrabold">Courtier ORIAS dédié</p>
              <p className="m-0 text-[11px] opacity-90">Réponse sous 24h ouvrées</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="rounded-lg p-1 transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
          <ul className="divide-y divide-charcoal-100">
            <li>
              <a
                href="tel:+33182885127"
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-sand-50"
              >
                <Phone
                  className="h-4 w-4 flex-shrink-0 text-primary-600"
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <p className="m-0 text-sm font-bold text-charcoal-900">01 82 88 51 27</p>
                  <p className="m-0 text-[11px] text-charcoal-500">Lun-Ven 9h-19h</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@vivos-assurance.fr"
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-sand-50"
              >
                <Mail
                  className="h-4 w-4 flex-shrink-0 text-primary-600"
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <p className="m-0 text-sm font-bold text-charcoal-900">Email courtier</p>
                  <p className="m-0 text-[11px] text-charcoal-500">contact@vivos-assurance.fr</p>
                </div>
              </a>
            </li>
            <li>
              <Link
                href="/devis"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 bg-secondary-50 px-4 py-3 transition-colors hover:bg-secondary-100"
              >
                <MessageCircle
                  className="h-4 w-4 flex-shrink-0 text-secondary-700"
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <p className="m-0 text-sm font-extrabold text-secondary-900">Demander un devis</p>
                  <p className="m-0 text-[11px] text-secondary-700">Sans engagement</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer chat' : 'Ouvrir chat courtier'}
        className="fixed bottom-6 right-6 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-premium-lg ring-4 ring-white/40 transition-all hover:-translate-y-0.5 hover:from-primary-600 hover:to-primary-800 md:inline-flex"
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2.4} aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={2.4} aria-hidden="true" />
        )}
      </button>
    </>
  )
}
