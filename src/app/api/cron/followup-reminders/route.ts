/**
 * POST /api/cron/followup-reminders
 * Cron job: checks followups due in the next 30 minutes.
 * Sends email reminder to the admin who created the followup.
 * Protected by CRON_SECRET.
 */

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/resend'
import { getFollowupReminderEmail } from '@/lib/email/templates/followup-reminder'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const now = new Date()
  const thirtyMinLater = new Date(now.getTime() + 30 * 60 * 1000)
  let reminded = 0

  try {
    // Find pending followups due in the next 30 minutes
    const { data: followups, error } = await supabase
      .from('lead_followups')
      .select(`
        id,
        lead_id,
        scheduled_at,
        type,
        note,
        created_by,
        lead:devis_requests!lead_id(service_name, city, client_name, client_phone)
      `)
      .eq('status', 'pending')
      .gte('scheduled_at', now.toISOString())
      .lte('scheduled_at', thirtyMinLater.toISOString())
      .limit(50)

    if (error) {
      logger.error('[followup-reminders] Query error:', { message: error.message })
      return NextResponse.json({ error: 'query failed' }, { status: 500 })
    }

    if (!followups || followups.length === 0) {
      return NextResponse.json({ ok: true, reminded: 0 })
    }

    // Get creator emails
    const creatorIds = Array.from(new Set(followups.map(f => f.created_by)))
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .in('id', creatorIds)

    const profileMap = new Map(
      (profiles || []).map(p => [p.id, { email: p.email, name: p.full_name }])
    )

    for (const followup of followups) {
      const creator = profileMap.get(followup.created_by)
      if (!creator?.email) continue

      const lead = followup.lead as unknown as {
        service_name: string
        city: string | null
        client_name: string
        client_phone: string
      } | null

      const { subject, html } = getFollowupReminderEmail({
        adminName: creator.name || 'Admin',
        followupType: followup.type,
        scheduledAt: followup.scheduled_at,
        note: followup.note,
        leadService: lead?.service_name || 'Inconnu',
        leadCity: lead?.city || '',
        leadClient: lead?.client_name || '',
        leadPhone: lead?.client_phone || '',
        dashboardUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.assurance-pro.fr'}/admin/leads`,
      })

      const result = await sendEmail({ to: creator.email, subject, html })
      if (result.success) {
        reminded++
      }
    }

    logger.info(`[followup-reminders] Sent ${reminded} reminders`)
    return NextResponse.json({ ok: true, reminded })
  } catch (err) {
    logger.error('[followup-reminders] Cron error:', err as Error)
    return NextResponse.json({ error: 'cron failed' }, { status: 500 })
  }
}
