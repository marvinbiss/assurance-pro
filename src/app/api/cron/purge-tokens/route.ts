import { NextResponse } from 'next/server'
import { createPiiAdminClient } from '@/lib/supabase/admin'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'
import { logger } from '@/lib/logger'

/**
 * Cron quotidien : purge les tables anti-replay (JWT + GDPR token).
 * Appelle les fonctions Postgres `purge_jwt_jti_consumed()` et
 * `purge_gdpr_token_consumed()` créées par les migrations 010 et 011.
 */

export async function GET(request: Request) {
  if (!verifyCronAuthorization(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createPiiAdminClient()
  const results: Record<string, number | string> = {}

  try {
    const { data, error } = await admin.rpc('purge_jwt_jti_consumed')
    results.jwt_jti = error ? `error: ${error.message}` : Number(data) || 0
  } catch (err) {
    results.jwt_jti = `unhandled: ${err instanceof Error ? err.message : String(err)}`
  }

  try {
    const { data, error } = await admin.rpc('purge_gdpr_token_consumed')
    results.gdpr_token = error ? `error: ${error.message}` : Number(data) || 0
  } catch (err) {
    results.gdpr_token = `unhandled: ${err instanceof Error ? err.message : String(err)}`
  }

  try {
    const { data, error } = await admin.rpc('purge_admin_nonce_consumed')
    results.admin_nonce = error ? `error: ${error.message}` : Number(data) || 0
  } catch (err) {
    results.admin_nonce = `unhandled: ${err instanceof Error ? err.message : String(err)}`
  }

  logger.info(results, 'purge-tokens cron : completed')
  return NextResponse.json({ ok: true, results })
}
