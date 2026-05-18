export interface ComparisonTableProps {
  columns: string[]
  rows: Array<{ label: string; cells: string[] }>
  emphasizeCol?: number
}

export function ComparisonTable({ columns, rows, emphasizeCol }: ComparisonTableProps) {
  return (
    <div className="my-10">
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-charcoal-100 shadow-soft md:block">
        <table className="w-full border-collapse text-sm tabular-nums">
          <thead className="bg-sand-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-charcoal-700" />
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${
                    i === emphasizeCol ? 'bg-primary-50 text-primary-800' : 'text-charcoal-700'
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-sand-50'}>
                <th className="bg-sand-100 px-4 py-3 text-left font-semibold text-charcoal-800">
                  {row.label}
                </th>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-3 ${
                      ci === emphasizeCol
                        ? 'border-l-2 border-r-2 border-primary-200 bg-primary-50/50 font-semibold text-primary-900'
                        : 'text-charcoal-700'
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
          <div key={ri} className="rounded-2xl border border-charcoal-100 bg-white p-5 shadow-soft">
            <h4 className="mb-3 text-sm font-extrabold text-charcoal-900">{row.label}</h4>
            <dl className="space-y-2 text-sm tabular-nums">
              {row.cells.map((cell, ci) => (
                <div key={ci} className="flex items-baseline justify-between gap-3">
                  <dt
                    className={`text-xs font-bold uppercase tracking-wider ${
                      ci === emphasizeCol ? 'text-primary-700' : 'text-charcoal-500'
                    }`}
                  >
                    {columns[ci]}
                  </dt>
                  <dd
                    className={`text-right ${
                      ci === emphasizeCol ? 'font-semibold text-primary-900' : 'text-charcoal-700'
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
