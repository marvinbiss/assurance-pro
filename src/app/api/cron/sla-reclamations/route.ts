import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/resend'
import { slaReclamationAlertTemplate } from '@/lib/email/templates/sla-reclamation-alert'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'

/**
 * Cron quotidien : ACPR 2024-R-02 — alerte sur les réclamations dont la deadline
 * d'accusé (10 jours ouvrés ≈ 14 jours calendaires) ou de réponse au fond
 * (2 mois) est franchie.
 *
 * Lit la vue `public.v_reclamations_sla_alerts` (créée par migration 009),
 * envoie un email récapitulatif à l'inbox réclamations + log structuré.
 *
 * Schedule recommandé : tous les jours à 08:00 UTC.
 */

interface SlaRow {
  id: string
  ticket: string
  email: string
  status: string
  created_at: string
  sla_acknowledge_deadline: string
  sla_response_deadline: string
  is_acknowledge_breach: boolean
  is_response_breach: boolean
}

import { RECLAMATIONS_INBOX } from '@/lib/email/inboxes'

export async function GET(request: Request) {
  if (!verifyCronAuthorization(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('v_reclamations_sla_alerts')
      .select(
        'id, ticket, email, status, created_at, sla_acknowledge_deadline, sla_response_deadline, is_acknowledge_breach, is_response_breach'
      )
      .order('created_at', { ascending: true })

    if (error) {
      logger.error({ err: error }, 'sla-reclamations cron query failed')
      return NextResponse.json({ error: 'Query failed' }, { status: 500 })
    }

    const rows = (data ?? []) as SlaRow[]
    const breached = rows.filter((r) => r.is_acknowledge_breach || r.is_response_breach)

    if (breached.length === 0) {
      logger.info('sla-reclamations cron : aucun dossier en retard')
      return NextResponse.json({ ok: true, total: rows.length, breached: 0 })
    }

    // Update parallèle (Promise.all) — N+1 évité, durée O(latence Supabase).
    await Promise.all(
      breached.map((r) =>
        supabase
          .from('reclamations')
          .update({
            sla_acknowledge_breached: r.is_acknowledge_breach,
            sla_response_breached: r.is_response_breach,
          })
          .eq('id', r.id)
      )
    )

    const tpl = slaReclamationAlertTemplate(breached)
    await sendEmail({ to: RECLAMATIONS_INBOX, subject: tpl.subject, html: tpl.html })

    logger.info(
      { total: rows.length, breached: breached.length },
      'sla-reclamations cron : alert dispatched'
    )
    return NextResponse.json({ ok: true, total: rows.length, breached: breached.length })
  } catch (err) {
    logger.error({ err }, 'sla-reclamations cron failed')
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
