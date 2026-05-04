/**
 * TrustBadges — Bandeau de confiance E-E-A-T
 *
 * Affiche les preuves de légitimité du cabinet :
 * - Inscription ORIAS
 * - Conformité ACPR (RGPD + Recommandations)
 * - Membre CSCA
 * - Assureurs partenaires
 *
 * Best practice CRO : +12-25% conversion sur pages transactionnelles avec
 * trust badges visibles "above the fold" (étude Baymard Institute 2024).
 */

import Link from 'next/link'

interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'inline'
  className?: string
}

export function TrustBadges({ variant = 'default', className = '' }: TrustBadgesProps) {
  const ORIAS = process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'

  const badges = [
    {
      icon: '⚖️',
      label: 'Cabinet ORIAS',
      detail: `n° ${ORIAS}`,
      href: 'https://www.orias.fr/welcome',
      external: true,
    },
    {
      icon: '🛡️',
      label: 'Conformité ACPR',
      detail: 'Reco 2024-R-02 & R-03',
    },
    {
      icon: '📋',
      label: 'Membre CSCA',
      detail: 'Chambre Syndicale Courtiers',
    },
    {
      icon: '🔐',
      label: 'RGPD compliant',
      detail: 'DPO + registre traitements',
      href: '/confidentialite',
    },
    {
      icon: '⭐',
      label: '8 assureurs partenaires',
      detail: 'Hiscox, MMA, AXA, April...',
      href: '/comparateur-assureurs',
    },
    {
      icon: '⚡',
      label: 'Devis sous 24h',
      detail: 'Express 6h disponible',
    },
  ]

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-2 text-xs ${className}`}>
        {badges.map((b) => (
          <span
            key={b.label}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1"
          >
            <span aria-hidden="true">{b.icon}</span>
            <span className="font-semibold">{b.label}</span>
          </span>
        ))}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-2 gap-2 text-sm md:grid-cols-3 ${className}`}>
        {badges.slice(0, 6).map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-2 rounded border border-blue-100 bg-blue-50 p-2"
          >
            <span aria-hidden="true" className="text-lg">
              {b.icon}
            </span>
            <div>
              <p className="text-xs font-semibold text-blue-900">{b.label}</p>
              <p className="text-xs text-gray-600">{b.detail}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section
      aria-label="Garanties de confiance"
      className={`border-y border-gray-200 bg-gradient-to-r from-blue-50 via-white to-emerald-50 py-6 ${className}`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {badges.map((b) => {
            const content = (
              <div className="text-center">
                <div className="mb-2 text-3xl" aria-hidden="true">
                  {b.icon}
                </div>
                <p className="text-sm font-bold text-gray-900">{b.label}</p>
                <p className="mt-1 text-xs text-gray-600">{b.detail}</p>
              </div>
            )
            if (b.href && b.external) {
              return (
                <a
                  key={b.label}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:scale-105"
                >
                  {content}
                </a>
              )
            }
            if (b.href) {
              return (
                <Link key={b.label} href={b.href} className="block transition hover:scale-105">
                  {content}
                </Link>
              )
            }
            return <div key={b.label}>{content}</div>
          })}
        </div>
      </div>
    </section>
  )
}
