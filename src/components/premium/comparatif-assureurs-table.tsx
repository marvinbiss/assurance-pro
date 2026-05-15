import { CheckCircle2 } from 'lucide-react'

export interface ComparatifAssureurRow {
  readonly assureur: string
  readonly color: string
  readonly prix: string
  readonly plafond: string
  readonly delai: string
  readonly recommande?: boolean
}

interface ComparatifAssureursTableProps {
  rows: readonly ComparatifAssureurRow[]
  className?: string
}

const INCLUSE_TOKENS = new Set(['incluse', 'inclus', 'incluses', 'inclusif'])

function isIncluse(value: string): boolean {
  return INCLUSE_TOKENS.has(value.trim().toLowerCase())
}

function CellValue({ value, tabular }: { value: string; tabular?: boolean }) {
  if (isIncluse(value)) {
    return (
      <span className="inline-flex items-center gap-1.5 text-accent-700">
        <CheckCircle2 className="h-4 w-4 text-accent-500" aria-hidden="true" strokeWidth={2.25} />
        <span className="font-medium">{value}</span>
      </span>
    )
  }
  return <span className={tabular ? 'tabular-nums' : undefined}>{value}</span>
}

export function ComparatifAssureursTable({ rows, className = '' }: ComparatifAssureursTableProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop / tablet — table */}
      <div className="hidden overflow-hidden rounded-2xl border border-sand-300 bg-white shadow-soft md:block">
        <table className="w-full border-collapse text-left text-sm text-charcoal-800">
          <caption className="sr-only">
            Comparatif des assureurs : prix, plafond, délai d’indemnisation
          </caption>
          <thead className="sticky top-0 z-10 bg-sand-100">
            <tr className="font-heading text-xs font-semibold uppercase tracking-wider text-charcoal-700">
              <th scope="col" className="px-5 py-3.5">
                Assureur
              </th>
              <th scope="col" className="px-5 py-3.5">
                Prix
              </th>
              <th scope="col" className="px-5 py-3.5">
                Plafond
              </th>
              <th scope="col" className="px-5 py-3.5">
                Délai
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const zebra = index % 2 === 0 ? 'bg-white' : 'bg-sand-50'
              const recommended = row.recommande
                ? 'border-l-2 border-l-primary-500'
                : 'border-l-2 border-l-transparent'
              return (
                <tr
                  key={`${row.assureur}-${index}`}
                  className={`${zebra} ${recommended} border-b border-sand-200 last:border-b-0`}
                >
                  <th scope="row" className="px-5 py-4 font-medium">
                    <span className="flex flex-wrap items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                        // Allowed inline style: dynamic data-driven color from props
                        style={{ backgroundColor: row.color }}
                      />
                      <span className="font-heading text-base">{row.assureur}</span>
                      {row.recommande ? (
                        <span className="inline-flex items-center rounded-full border border-secondary-300 bg-secondary-50 px-2 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wider text-secondary-700">
                          Recommandé
                        </span>
                      ) : null}
                    </span>
                  </th>
                  <td className="px-5 py-4">
                    <CellValue value={row.prix} tabular />
                  </td>
                  <td className="px-5 py-4">
                    <CellValue value={row.plafond} tabular />
                  </td>
                  <td className="px-5 py-4">
                    <CellValue value={row.delai} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile — stacked cards */}
      <ul className="flex flex-col gap-3 md:hidden" aria-label="Comparatif des assureurs">
        {rows.map((row, index) => {
          const recommended = row.recommande
            ? 'border-l-2 border-l-primary-500'
            : 'border-l-2 border-l-transparent'
          return (
            <li
              key={`${row.assureur}-mobile-${index}`}
              className={`overflow-hidden rounded-2xl border border-sand-300 bg-white shadow-soft ${recommended}`}
            >
              <div className="flex items-center justify-between gap-2 bg-sand-100 px-4 py-3">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: row.color }}
                  />
                  <span className="font-heading text-base font-semibold text-charcoal-900">
                    {row.assureur}
                  </span>
                </span>
                {row.recommande ? (
                  <span className="inline-flex items-center rounded-full border border-secondary-300 bg-secondary-50 px-2 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wider text-secondary-700">
                    Recommandé
                  </span>
                ) : null}
              </div>
              <dl className="divide-y divide-sand-200 px-4 py-2 text-sm text-charcoal-800">
                <div className="flex items-center justify-between gap-3 py-2">
                  <dt className="font-heading text-[11px] font-semibold uppercase tracking-wider text-charcoal-600">
                    Prix
                  </dt>
                  <dd>
                    <CellValue value={row.prix} tabular />
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 py-2">
                  <dt className="font-heading text-[11px] font-semibold uppercase tracking-wider text-charcoal-600">
                    Plafond
                  </dt>
                  <dd>
                    <CellValue value={row.plafond} tabular />
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 py-2">
                  <dt className="font-heading text-[11px] font-semibold uppercase tracking-wider text-charcoal-600">
                    Délai
                  </dt>
                  <dd>
                    <CellValue value={row.delai} />
                  </dd>
                </div>
              </dl>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
