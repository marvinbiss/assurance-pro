interface Stat {
  value: string
  label: string
  hint?: string
}

const DEFAULT_STATS: Stat[] = [
  { value: '10', label: 'Assureurs partenaires', hint: 'Hiscox, April Pro, MMA, Generali, AXA, SMABTP, Allianz, MAAF, Wakam, Stello' },
  { value: '17', label: 'Verticaux couverts', hint: 'Décennale, RC Pro, Multirisque, Mutuelle TNS, VTC, Cyber…' },
  { value: '24h', label: 'Devis et attestation', hint: 'Recontact priorisé selon profil HOT/WARM/COLD' },
  { value: '0€', label: 'Frais de courtage', hint: 'Rémunération exclusive par commissions assureurs (art. L. 521-2)' },
]

export function StatsBar({ stats = DEFAULT_STATS }: { stats?: Stat[] }) {
  return (
    <section
      aria-label="Chiffres-clés du cabinet"
      className="bg-white border-y border-gray-200"
    >
      <div className="container mx-auto px-4 max-w-6xl py-10">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <li key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-1">
                {s.value}
              </div>
              <div className="text-sm font-semibold text-gray-900">{s.label}</div>
              {s.hint && <div className="text-xs text-gray-500 mt-1">{s.hint}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
