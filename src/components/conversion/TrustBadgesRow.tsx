/**
 * Bandeau de confiance horizontal — labels réglementaires
 * (ORIAS, ACPR, CSCA, RCP, DDA).
 *
 * Design : sand-50 background + icons lucide brand colors + separators discrets.
 * Placé juste après le hero pour conforter le statut d'autorité courtage.
 */

import { Landmark, Scale, Users, ShieldCheck, FileCheck2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface TrustItem {
  label: string
  sub: string
  Icon: LucideIcon
  color: string
}

const TRUST_ITEMS: TrustItem[] = [
  { label: 'ORIAS', sub: 'Courtier immatriculé', Icon: Landmark, color: 'text-primary-600' },
  { label: 'ACPR', sub: 'Soumis au contrôle', Icon: Scale, color: 'text-secondary-600' },
  { label: 'CSCA', sub: 'Membre adhérent', Icon: Users, color: 'text-accent-600' },
  { label: 'RCP 5 M€', sub: 'Garantie financière', Icon: ShieldCheck, color: 'text-primary-600' },
  {
    label: 'DDA 2024',
    sub: 'Conseil tracé ACPR 2024-R-03',
    Icon: FileCheck2,
    color: 'text-accent-700',
  },
]

export function TrustBadgesRow() {
  return (
    <section
      aria-label="Garanties réglementaires"
      className="border-y border-charcoal-100 bg-sand-50"
    >
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-between">
          {TRUST_ITEMS.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white ${item.color} shadow-soft`}
                aria-hidden="true"
              >
                <item.Icon className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <div>
                <div className="font-heading text-sm font-extrabold leading-tight text-charcoal-900">
                  {item.label}
                </div>
                <div className="text-xs leading-tight text-charcoal-500">{item.sub}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
