export interface ComparisonTableProps {
  columns: string[]
  rows: Array<{ label: string; cells: string[] }>
  emphasizeCol?: number
}

export function ComparisonTable({ columns, rows, emphasizeCol }: ComparisonTableProps) {
  return (
    <div className="my-10">
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-charcoal-100 shadow-soft dark:border-charcoal-800 md:block">
        <table className="w-full border-collapse text-sm tabular-nums">
          <thead className="bg-sand-100 dark:bg-charcoal-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-300" />
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${
                    i === emphasizeCol
                      ? 'bg-primary-50 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200'
                      : 'text-charcoal-700 dark:text-charcoal-300'
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={
                  ri % 2 === 0
                    ? 'bg-white dark:bg-charcoal-950'
                    : 'bg-sand-50 dark:bg-charcoal-900/40'
                }
              >
                <th className="bg-sand-100 px-4 py-3 text-left font-semibold text-charcoal-800 dark:bg-charcoal-900 dark:text-charcoal-200">
                  {row.label}
                </th>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-3 ${
                      ci === emphasizeCol
                        ? 'border-l-2 border-r-2 border-primary-200 bg-primary-50/50 font-semibold text-primary-900 dark:border-primary-700/50 dark:bg-primary-900/20 dark:text-primary-100'
                        : 'text-charcoal-700 dark:text-charcoal-300'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-4 md:hidden">
        {rows.map((row, ri) => (
          <div
            key={ri}
            className="rounded-2xl border border-charcoal-100 bg-white p-5 shadow-soft dark:border-charcoal-800 dark:bg-charcoal-950"
          >
            <h4 className="mb-3 text-sm font-extrabold text-charcoal-900 dark:text-charcoal-50">
              {row.label}
            </h4>
            <dl className="space-y-2 text-sm tabular-nums">
              {row.cells.map((cell, ci) => (
                <div key={ci} className="flex items-baseline justify-between gap-3">
                  <dt
                    className={`text-xs font-bold uppercase tracking-wider ${
                      ci === emphasizeCol
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-charcoal-500 dark:text-charcoal-400'
                    }`}
                  >
                    {columns[ci]}
                  </dt>
                  <dd
                    className={`text-right ${
                      ci === emphasizeCol
                        ? 'font-semibold text-primary-900 dark:text-primary-200'
                        : 'text-charcoal-700 dark:text-charcoal-300'
                    }`}
                  >
                    {cell}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}
