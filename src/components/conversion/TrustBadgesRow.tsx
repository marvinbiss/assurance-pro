/**
 * Bandeau de confiance horizontal — labels réglementaires (ORIAS, ACPR, CSCA, RCP, DDA).
 * Statique, server-component compatible, à placer en haut/bas des piliers.
 */

const TRUST_ITEMS: Array<{ label: string; sub: string; icon: string }> = [
  { label: 'ORIAS', sub: 'Courtier immatriculé', icon: '🏛️' },
  { label: 'ACPR', sub: 'Soumis au contrôle', icon: '⚖️' },
  { label: 'CSCA', sub: 'Membre adhérent', icon: '🤝' },
  { label: 'RCP 5 M€', sub: 'Garantie financière', icon: '🛡️' },
  { label: 'DDA 2024', sub: 'Conseil tracé ACPR 2024-R-03', icon: '📋' },
]

export function TrustBadgesRow() {
  return (
    <section
      aria-label="Garanties réglementaires"
      className="bg-white border-y border-gray-200"
    >
      <div className="container mx-auto px-4 max-w-6xl py-6">
        <ul className="flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-4">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <span className="text-xl" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <div className="font-bold text-gray-900 leading-tight">{item.label}</div>
                <div className="text-xs text-gray-500 leading-tight">{item.sub}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
