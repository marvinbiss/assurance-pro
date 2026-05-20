import { redirect } from 'next/navigation'
import { isAdminAuthenticated, ADMIN_UNAUTHORIZED_HTML } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  searchParams: Promise<{ token?: string }>
}

interface EndpointRow {
  id: string
  url: string
  oauth_client_id: string | null
  secret_preview: string
  description: string | null
  events: string[]
  active: boolean
  failure_count: number
  last_delivery_at: string | null
  last_success_at: string | null
  created_at: string
}

interface DeliveryRollup {
  endpoint_id: string
  delivery_date: string
  total: number
  success: number
  failed: number
  dead_letter: number
  success_rate_pct: number | null
}

export default async function AdminWebhooksPage({ searchParams }: PageProps) {
  const { token } = await searchParams
  const ok = await isAdminAuthenticated(token)
  if (!ok) {
    return <div dangerouslySetInnerHTML={{ __html: ADMIN_UNAUTHORIZED_HTML() }} />
  }
  if (token) redirect('/admin/webhooks') // strip token from URL

  const admin = createAdminClient()
  const [{ data: endpoints }, { data: rollup }] = await Promise.all([
    admin
      .from('webhook_endpoints')
      .select(
        'id, url, oauth_client_id, secret_preview, description, events, active, failure_count, last_delivery_at, last_success_at, created_at'
      )
      .order('created_at', { ascending: false })
      .limit(100),
    admin
      .from('webhook_deliveries_rollup')
      .select('endpoint_id, delivery_date, total, success, failed, dead_letter, success_rate_pct')
      .order('delivery_date', { ascending: false })
      .limit(200),
  ])

  const totals = (rollup ?? []).reduce(
    (acc, r) => {
      acc.total += r.total
      acc.success += r.success
      acc.failed += r.failed + r.dead_letter
      return acc
    },
    { total: 0, success: 0, failed: 0 }
  )
  const globalRate = totals.total > 0 ? ((100 * totals.success) / totals.total).toFixed(2) : '—'

  return (
    <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '1rem', fontFamily: 'system-ui' }}>
      <h1>Webhooks Dashboard</h1>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          margin: '1.5rem 0',
        }}
      >
        <Stat label="Total endpoints" value={(endpoints ?? []).length} />
        <Stat label="Active endpoints" value={(endpoints ?? []).filter((e) => e.active).length} />
        <Stat label="Deliveries (30j)" value={totals.total} />
        <Stat label="Success rate global" value={`${globalRate}%`} />
      </section>

      <h2 style={{ marginTop: '2rem' }}>Endpoints</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>URL</th>
            <th style={th}>OAuth client</th>
            <th style={th}>Events</th>
            <th style={th}>Active</th>
            <th style={th}>Failure count</th>
            <th style={th}>Last delivery</th>
          </tr>
        </thead>
        <tbody>
          {((endpoints as EndpointRow[] | null) ?? []).map((e) => (
            <tr key={e.id}>
              <td style={td}>
                <code>{e.url}</code>
              </td>
              <td style={td}>
                <code>{e.oauth_client_id ?? '—'}</code>
              </td>
              <td style={td}>{e.events.join(', ')}</td>
              <td style={td}>{e.active ? '✓' : '✗'}</td>
              <td style={td}>{e.failure_count}</td>
              <td style={td}>
                {e.last_delivery_at ? new Date(e.last_delivery_at).toLocaleString('fr-FR') : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: '2rem' }}>Deliveries rollup (par jour, top 50)</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>Date</th>
            <th style={th}>Endpoint</th>
            <th style={th}>Total</th>
            <th style={th}>Success</th>
            <th style={th}>Failed</th>
            <th style={th}>Dead-letter</th>
            <th style={th}>Success %</th>
          </tr>
        </thead>
        <tbody>
          {((rollup as DeliveryRollup[] | null) ?? []).slice(0, 50).map((r, i) => (
            <tr key={i}>
              <td style={td}>{r.delivery_date}</td>
              <td style={td}>
                <code>{r.endpoint_id.slice(0, 8)}…</code>
              </td>
              <td style={td}>{r.total}</td>
              <td style={{ ...td, color: '#080' }}>{r.success}</td>
              <td style={{ ...td, color: '#a60' }}>{r.failed}</td>
              <td style={{ ...td, color: '#a00' }}>{r.dead_letter}</td>
              <td style={td}>{r.success_rate_pct?.toFixed(1) ?? '—'}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '1rem' }}>
      <div
        style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          color: '#666',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.25rem' }}>{value}</div>
    </div>
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
const td = { padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }
