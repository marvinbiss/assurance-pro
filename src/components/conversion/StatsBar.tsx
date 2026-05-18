interface Stat {
  value: string
  label: string
  hint?: string
}

const DEFAULT_STATS: Stat[] = [
  {
    value: '10',
    label: 'Assureurs partenaires',
    hint: 'Hiscox, April Pro, MMA, Generali, AXA, SMABTP, Allianz, MAAF, Wakam, Stello',
  },
  {
    value: '17',
    label: 'Verticaux couverts',
    hint: 'Décennale, RC Pro, Multirisque, Mutuelle TNS, VTC, Cyber…',
  },
  {
    value: '24h',
    label: 'Devis et attestation',
    hint: 'Recontact priorisé selon profil HOT, WARM ou COLD',
  },
  {
    value: '0€',
    label: 'Frais de courtage',
    hint: 'Rémunération exclusive par commissions assureurs (art. L. 521-2)',
  },
]

export function StatsBar({ stats = DEFAULT_STATS }: { stats?: Stat[] }) {
  return (
    <section aria-label="Chiffres-clés du cabinet" className="border-y border-gray-200 bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="text-center">
              <div className="mb-1 text-3xl font-extrabold text-primary-700 md:text-4xl">
                {s.value}
              </div>
              <div className="text-sm font-semibold text-gray-900">{s.label}</div>
              {s.hint && <div className="mt-1 text-xs text-gray-500">{s.hint}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
