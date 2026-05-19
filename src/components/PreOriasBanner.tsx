/**
 * PreOriasBanner — bandeau top informationnel pendant la phase soft launch.
 *
 * Affiché uniquement quand IS_PRE_ORIAS = true (NEXT_PUBLIC_PRE_ORIAS != 'false').
 * Conformité ACPR : indique explicitement que l'activité commerciale
 * débutera après immatriculation au registre ORIAS.
 */

import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { IS_PRE_ORIAS, ORIAS_EXPECTED_DATE } from '@/lib/config/pre-orias'

export function PreOriasBanner() {
  if (!IS_PRE_ORIAS) return null

  return (
    <div
      role="status"
      aria-label="Information cabinet en cours d'immatriculation ORIAS"
      className="relative z-40 bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white"
    >
      <div className="container mx-auto max-w-7xl px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-2 font-semibold text-secondary-300">
            <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2.4} />
            Cabinet en cours d&apos;immatriculation ORIAS
          </span>
          <span className="hidden text-white/30 sm:inline">·</span>
          <span className="text-white/85">Ouverture commerciale prévue {ORIAS_EXPECTED_DATE}</span>
          <span className="hidden text-white/30 md:inline">·</span>
          <Link
            href="/a-propos"
            className="hidden font-semibold text-secondary-300 underline-offset-2 hover:underline md:inline"
          >
            À propos du cabinet Vivos Assurance
          </Link>
        </div>
      </div>
    </div>
  )
}
