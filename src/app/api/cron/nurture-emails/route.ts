/**
 * CRON — Pipeline nurture emails warm leads pré-ORIAS.
 *
 * Cadence : 1× / jour (Vercel Cron à 9h UTC = 10h Paris).
 *
 * Logique :
 *   1. Récupère les `newsletter_subscribers` avec source `preinscription_pre_orias*`
 *   2. Pour chaque lead, calcule le step suivant selon `nurture_step` actuel + delta `consent_at`
 *   3. Envoie email correspondant via Resend
 *   4. Met à jour `nurture_step` + `nurture_last_sent_at`
 *
 * Séquence : J+1 (step 1) · J+7 (step 2) · J+14 (step 3)
 */

import { NextResponse, type NextRequest } from 'next/server'
import { logger } from '@/lib/logger'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'
import { createPiiAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/resend'
import {
  nurtureEmail1Confirmation,
  nurtureEmail2MarketGuide,
  nurtureEmail3CaseStudy,
  type NurtureStep,
} from '@/lib/email/templates/preinscription-nurture'

interface Subscriber {
  email: string
  source: string | null
  consent_at: string | null
  nurture_step: number | null
  nurture_last_sent_at: string | null
}

const STEP_DELAYS_HOURS: Record<NurtureStep, number> = {
  1: 24, // J+1
  2: 7 * 24, // J+7
  3: 14 * 24, // J+14
}

function getVerticalFromSource(source: string | null): string | null {
  if (!source) return null
  const match = source.match(/^preinscription_pre_orias:(.+)$/)
  return match?.[1] ?? null
}

function shouldSendStep(consentAt: string, lastSentAt: string | null, step: NurtureStep): boolean {
  const consentDate = new Date(consentAt).getTime()
  const now = Date.now()
  const targetHours = STEP_DELAYS_HOURS[step]
  const elapsedHours = (now - consentDate) / (1000 * 60 * 60)
  if (elapsedHours < targetHours) return false
  // Anti-double envoi : 23h minimum entre 2 emails
  if (lastSentAt) {
    const lastSent = new Date(lastSentAt).getTime()
    if ((now - lastSent) / (1000 * 60 * 60) < 23) return false
  }
  return true
}

export async function GET(req: NextRequest) {
  if (!verifyCronAuthorization(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const admin = createPiiAdminClient()

    // Récupère les leads warm pré-ORIAS, step 0/1/2 (pas encore terminé séquence)
    const { data, error } = await admin
      .from('newsletter_subscribers')
      .select('email, source, consent_at, nurture_step, nurture_last_sent_at')
      .like('source', 'preinscription_pre_orias%')
      .or('nurture_step.is.null,nurture_step.lt.3')
      .eq('status', 'pending')
      .limit(200)

    if (error) {
      logger.error({ error }, 'nurture-emails: supabase query failed')
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    const subscribers = (data as Subscriber[] | null) ?? []
    let sent = 0
    let skipped = 0
    let failed = 0

    for (const sub of subscribers) {
      if (!sub.consent_at || !sub.email) {
        skipped++
        continue
      }

      const currentStep = (sub.nurture_step ?? 0) as 0 | 1 | 2 | 3
      const nextStep = (currentStep + 1) as NurtureStep

      if (nextStep > 3) {
        skipped++
        continue
      }

      if (!shouldSendStep(sub.consent_at, sub.nurture_last_sent_at, nextStep)) {
        skipped++
        continue
      }

      const vertical = getVerticalFromSource(sub.source)

      let template: ReturnType<typeof nurtureEmail1Confirmation>
      try {
        if (nextStep === 1) {
          template = nurtureEmail1Confirmation({ email: sub.email, vertical })
        } else if (nextStep === 2) {
          template = nurtureEmail2MarketGuide({ email: sub.email, vertical })
        } else {
          template = nurtureEmail3CaseStudy({ email: sub.email, vertical })
        }

        await sendEmail({
          to: sub.email,
          subject: template.subject,
          html: template.html,
        })

        await admin
          .from('newsletter_subscribers')
          .update({
            nurture_step: nextStep,
            nurture_last_sent_at: new Date().toISOString(),
          })
          .eq('email', sub.email)

        sent++
      } catch (err) {
        logger.error(
          {
            err,
            step: nextStep,
            emailHash: sub.email.substring(0, 4) + '***',
          },
          'nurture-emails: send failed'
        )
        failed++
      }
    }

    logger.info(
      { sent, skipped, failed, total: subscribers.length },
      'nurture-emails: batch completed'
    )

    return NextResponse.json({
      ok: true,
      total: subscribers.length,
      sent,
      skipped,
      failed,
    })
  } catch (err) {
    logger.error({ err }, 'nurture-emails: cron error')
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
