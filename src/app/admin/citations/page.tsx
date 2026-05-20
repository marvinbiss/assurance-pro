import { redirect } from 'next/navigation'
import { isAdminAuthenticated, ADMIN_UNAUTHORIZED_HTML } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  searchParams: Promise<{ token?: string }>
}

interface RollupRow {
  measure_date: string
  llm_provider: string
  total_queries: number
  cited_count: number
  citation_rate_pct: number | null
  avg_rank: number | null
  total_cost_usd: number | null
}

interface CitedRow {
  llm_provider: string
  llm_model: string
  citation_rank: number | null
  citation_url: string | null
  citation_snippet: string | null
  measured_at: string
  llm_target_queries: { query: string; category: string } | null
}

export default async function AdminCitationsPage({ searchParams }: PageProps) {
  const { token } = await searchParams
  const ok = await isAdminAuthenticated(token)
  if (!ok) {
    return <div dangerouslySetInnerHTML={{ __html: ADMIN_UNAUTHORIZED_HTML() }} />
  }
  if (token) redirect('/admin/citations')

  const admin = createAdminClient()
  const [{ data: rollup }, { data: recentCited }] = await Promise.all([
    admin
      .from('llm_citations_daily_rollup')
      .select(
        'measure_date, llm_provider, total_queries, cited_count, citation_rate_pct, avg_rank, total_cost_usd'
      )
      .order('measure_date', { ascending: false })
      .limit(120),
    admin
      .from('llm_citations')
      .select(
        'llm_provider, llm_model, citation_rank, citation_url, citation_snippet, measured_at, llm_target_queries(query, category)'
      )
      .eq('cited', true)
      .order('measured_at', { ascending: false })
      .limit(50),
  ])

  // Aggrégate per provider all-time
  const perProvider = new Map<string, { total: number; cited: number; cost: number }>()
  for (const r of (rollup ?? []) as RollupRow[]) {
    const p = perProvider.get(r.llm_provider) ?? { total: 0, cited: 0, cost: 0 }
    p.total += r.total_queries
    p.cited += r.cited_count
    p.cost += r.total_cost_usd ?? 0
    perProvider.set(r.llm_provider, p)
  }

  return (
    <main style={{ maxWidth: 1280, margin: '2rem auto', padding: '1rem', fontFamily: 'system-ui' }}>
      <h1>LLM Citation Tracking</h1>
      <p style={{ color: '#666' }}>
        Mesure quotidienne citation Vivos par ChatGPT, Claude, Perplexity, Gemini.
      </p>

      <h2 style={{ marginTop: '2rem' }}>Citation rate par provider (all-time)</h2>
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          margin: '1rem 0',
        }}
      >
        {(['openai', 'anthropic', 'perplexity', 'gemini'] as const).map((p) => {
          const stat = perProvider.get(p) ?? { total: 0, cited: 0, cost: 0 }
          const rate = stat.total > 0 ? ((100 * stat.cited) / stat.total).toFixed(1) : '—'
          return (
            <div
              key={p}
              style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '1rem' }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#666' }}>
                {p}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem' }}>{rate}%</div>
              <div style={{ fontSize: '0.75rem', color: '#666' }}>
                {stat.cited} cited / {stat.total} queries · ${stat.cost.toFixed(2)}
              </div>
            </div>
          )
        })}
      </section>

      <h2 style={{ marginTop: '2rem' }}>Daily rollup (120 dernières mesures)</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>Date</th>
            <th style={th}>Provider</th>
            <th style={th}>Queries</th>
            <th style={th}>Cited</th>
            <th style={th}>Rate %</th>
            <th style={th}>Avg rank</th>
            <th style={th}>Cost USD</th>
          </tr>
        </thead>
        <tbody>
          {((rollup ?? []) as RollupRow[]).map((r, i) => (
            <tr key={i}>
              <td style={td}>{r.measure_date}</td>
              <td style={td}>
                <code>{r.llm_provider}</code>
              </td>
              <td style={td}>{r.total_queries}</td>
              <td style={{ ...td, color: '#080', fontWeight: 600 }}>{r.cited_count}</td>
              <td style={td}>{r.citation_rate_pct?.toFixed(1) ?? '—'}%</td>
              <td style={td}>{r.avg_rank?.toFixed(1) ?? '—'}</td>
              <td style={td}>${r.total_cost_usd?.toFixed(4) ?? '0.0000'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: '2rem' }}>50 dernières citations détectées</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>Mesure</th>
            <th style={th}>Provider</th>
            <th style={th}>Query</th>
            <th style={th}>Rank</th>
            <th style={th}>URL Vivos</th>
            <th style={th}>Snippet</th>
          </tr>
        </thead>
        <tbody>
          {((recentCited ?? []) as unknown as CitedRow[]).map((r, i) => (
            <tr key={i}>
              <td style={td}>{new Date(r.measured_at).toLocaleString('fr-FR')}</td>
              <td style={td}>
                <code>{r.llm_provider}</code>
              </td>
              <td style={td}>{r.llm_target_queries?.query ?? '—'}</td>
              <td style={td}>{r.citation_rank ?? '—'}</td>
              <td style={td}>
                <a href={r.citation_url ?? '#'} target="_blank" rel="noopener noreferrer">
                  {r.citation_url?.slice(0, 50)}…
                </a>
              </td>
              <td style={{ ...td, fontStyle: 'italic', color: '#555' }}>
                {r.citation_snippet?.slice(0, 180) ?? '—'}…
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  fontSize: '0.875rem',
  marginTop: '0.5rem',
}
const th = {
  textAlign: 'left' as const,
  padding: '0.5rem',
  borderBottom: '2px solid #ddd',
  background: '#fafafa',
}
const td = { padding: '0.5rem', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top' as const }
