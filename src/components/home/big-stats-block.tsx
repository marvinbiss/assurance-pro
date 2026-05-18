/**
 * BigStatsBlock — section stats XL style Alan / Lemonade.
 * 3 chiffres pleine largeur avec contexte + source.
 */
import { TrendingDown, Clock, ShieldCheck } from 'lucide-react'

const STATS = [
  {
    Icon: TrendingDown,
    value: '−32 %',
    label: "économie moyenne sur l'assurance professionnelle",
    source: 'Audit clients Vivos · échantillon 247 dossiers BTP + RC Pro 2025',
  },
  {
    Icon: Clock,
    value: '24 h',
    label: 'délai moyen de remise des devis personnalisés',
    source: 'Engagement de service · constaté Q1 2026',
  },
  {
    Icon: ShieldCheck,
    value: '10+',
    label: 'compagnies partenaires comparées à chaque dossier',
    source: 'Allianz, AXA, Hiscox, MMA, Generali, MAAF, SMABTP, Wakam…',
  },
] as const

export function BigStatsBlock() {
  return (
    <section className="bg-white py-28 md:py-40">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mb-12 max-w-2xl">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-secondary-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-secondary-800">
            Engagement chiffré
          </span>
          <h2 className="font-display-premium font-heading text-3xl font-extrabold leading-tight tracking-tight text-charcoal-900 md:text-4xl lg:text-5xl">
            Trois engagements,
            <br />
            <span className="text-primary-700">aucune fausse promesse.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-charcoal-100 bg-charcoal-100 md:grid-cols-3">
          {STATS.map((s) => (
            <article key={s.label} className="bg-white p-8 md:p-10">
              <s.Icon
                className="mb-6 h-7 w-7 text-primary-600"
                strokeWidth={2.4}
                aria-hidden="true"
              />
              <div className="font-display-premium text-5xl font-extrabold tabular-nums leading-none tracking-tight text-charcoal-900 md:text-7xl">
                {s.value}
              </div>
              <p className="mt-4 text-base font-bold leading-snug text-charcoal-800 md:text-lg">
                {s.label}
              </p>
              <p className="mt-3 border-t border-charcoal-100 pt-3 text-[11px] italic leading-snug text-charcoal-500">
                {s.source}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
