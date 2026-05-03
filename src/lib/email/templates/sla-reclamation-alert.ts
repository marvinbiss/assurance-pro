interface SlaAlertRow {
  ticket: string
  email: string
  status: string
  created_at: string
  sla_acknowledge_deadline: string
  sla_response_deadline: string
  is_acknowledge_breach: boolean
  is_response_breach: boolean
}

import { esc, escSubject } from './_html'

export function slaReclamationAlertTemplate(rows: SlaAlertRow[]): {
  subject: string
  html: string
} {
  const ack = rows.filter((r) => r.is_acknowledge_breach).length
  const fond = rows.filter((r) => r.is_response_breach).length
  const subject = escSubject(
    `[ACPR R-02] ${rows.length} réclamation(s) à traiter — ` +
      `${ack} accusé(s) en retard, ${fond} réponse(s) en retard`
  )

  const formatRow = (r: SlaAlertRow) => `
    <tr>
      <td style="padding:6px;border-bottom:1px solid #e2e8f0;font-family:monospace">${esc(r.ticket)}</td>
      <td style="padding:6px;border-bottom:1px solid #e2e8f0">${esc(r.status)}</td>
      <td style="padding:6px;border-bottom:1px solid #e2e8f0;font-size:12px">${esc(r.email)}</td>
      <td style="padding:6px;border-bottom:1px solid #e2e8f0;font-size:12px;color:${r.is_acknowledge_breach ? '#b91c1c' : '#475569'}">${esc(r.sla_acknowledge_deadline.slice(0, 10))}</td>
      <td style="padding:6px;border-bottom:1px solid #e2e8f0;font-size:12px;color:${r.is_response_breach ? '#b91c1c' : '#475569'}">${esc(r.sla_response_deadline.slice(0, 10))}</td>
    </tr>`

  return {
    subject,
    html: `
<!doctype html>
<html lang="fr">
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:24px;color:#0f172a">
    <div style="max-width:760px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;border:1px solid #e2e8f0">
      <h1 style="font-size:18px;margin:0 0 12px">Alerte SLA réclamations — Recommandation ACPR 2024-R-02</h1>
      <p style="margin:0 0 12px">
        ${rows.length} dossier(s) nécessite(nt) action — <strong style="color:#b91c1c">${ack}</strong> accusé(s) de réception en retard,
        <strong style="color:#b91c1c">${fond}</strong> réponse(s) au fond en retard.
      </p>
      <table style="border-collapse:collapse;width:100%;font-size:13px;margin-top:12px">
        <thead>
          <tr style="background:#f1f5f9;text-align:left">
            <th style="padding:6px">Ticket</th>
            <th style="padding:6px">Status</th>
            <th style="padding:6px">Email</th>
            <th style="padding:6px">Limite accusé (10j)</th>
            <th style="padding:6px">Limite réponse (2 mois)</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(formatRow).join('')}
        </tbody>
      </table>
      <p style="font-size:12px;color:#64748b;margin-top:16px">
        Source : <code>public.v_reclamations_sla_alerts</code> — généré quotidiennement par le cron sla-reclamations.
      </p>
    </div>
  </body>
</html>
`,
  }
}
