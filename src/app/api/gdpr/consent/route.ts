/**
 * GDPR Cookie Consent API - Assurance Pro
 * Records user cookie consent for compliance
 */

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { logger } from '@/lib/logger'
import { z } from 'zod'
import { supabaseUrl, supabaseAnonKey, supabaseServiceRoleKey } from '@/lib/supabase/env'
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter'
import { captureApiException } from '@/lib/observability/sentry'

// POST request schema
const consentPostSchema = z.object({
  preferences: z.object({
    necessary: z.boolean(),
    functional: z.boolean().optional(),
    analytics: z.boolean(),
    marketing: z.boolean(),
    personalization: z.boolean(),
  }),
  timestamp: z.string().datetime().optional(),
  userAgent: z.string().max(500).optional(),
})

// Lazy initialize to avoid build-time errors
function getSupabaseAdmin() {
  return createClient(supabaseUrl(), supabaseServiceRoleKey())
}

// POST /api/gdpr/consent - Record cookie consent
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    // Rate limiting (RGPD consent — 10 changes / 5 min / IP).
    // Évite spam toggling qui pollue les logs et fausse les statistiques
    // d'opt-in CNIL ; 10 toggles légitimes en 5 min couvre tous les cas réels
    // (parcours utilisateur exploratoire, changement d'avis, multi-onglets).
    const ip = getClientIp(request.headers)
    const rl = await checkRateLimit(`gdpr-consent:${ip}`, { window: 300_000, max: 10 })
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: { message: 'Trop de mises à jour de consentement, veuillez patienter' } },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetTime - Date.now()) / 1000)) } }
      )
    }

    const body = await request.json()
    const result = consentPostSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ success: false, error: { message: 'Requête invalide', details: result.error.flatten() } }, { status: 400 })
    }
    const { preferences, timestamp, userAgent } = result.data

    // Get user if authenticated
    let userId: string | null = null
    try {
      const cookieStore = await cookies()
      const supabase = createServerClient(
        supabaseUrl(),
        supabaseAnonKey(),
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options)
              })
            },
          },
        }
      )
      const { data: { user } } = await supabase.auth.getUser()
      userId = user?.id || null
    } catch {
      // User not authenticated, that's fine
    }

    // IP for compliance record (déjà extraite plus haut pour le rate-limit).
    const ipAddress = ip || 'unknown'

    // Record consent
    const { error } = await getSupabaseAdmin().from('cookie_consents').insert({
      user_id: userId,
      session_id: crypto.randomUUID(),
      ip_address: ipAddress,
      user_agent: userAgent,
      necessary: preferences.necessary,
      functional: preferences.functional ?? false,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      personalization: preferences.personalization,
      consent_given_at: timestamp,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('GDPR consent error:', error)
    captureApiException(error, { route: 'api/gdpr/consent', category: 'gdpr', extra: { method: 'POST' } })
    return NextResponse.json(
      { success: false, error: { message: 'Erreur lors de l\'enregistrement du consentement' } },
      { status: 500 }
    )
  }
}

// GET /api/gdpr/consent - Get user's consent history
export async function GET(_request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      supabaseUrl(),
      supabaseAnonKey(),
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: 'Authentification requise' } },
        { status: 401 }
      )
    }

    const { data: consents } = await getSupabaseAdmin()
      .from('cookie_consents')
      .select('id, user_id, session_id, ip_address, user_agent, necessary, analytics, marketing, personalization, consent_given_at, updated_at')
      .eq('user_id', user.id)
      .order('consent_given_at', { ascending: false })

    return NextResponse.json({ consents: consents || [] })
  } catch (error) {
    logger.error('GDPR consent fetch error:', error)
    captureApiException(error, { route: 'api/gdpr/consent', category: 'gdpr', extra: { method: 'GET' } })
    return NextResponse.json(
      { success: false, error: { message: 'Erreur lors de la récupération de l\'historique de consentement' } },
      { status: 500 }
    )
  }
}
