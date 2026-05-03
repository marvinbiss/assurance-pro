import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseServiceRoleKey } from './env'

/**
 * Server-only Supabase client with service_role key (bypasses RLS).
 *
 * Two factories :
 * - createAdminClient()           : default for ISR-cacheable reads (1h)
 * - createPiiAdminClient()        : strict no-store for PII reads/writes
 *                                   (réclamations, leads, conseil_records).
 *
 * Both must NEVER be exported to client bundles. Usage outside `app/api/**`
 * or `app/**` server components is forbidden.
 */
export function createAdminClient() {
  return createClient(supabaseUrl(), supabaseServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      // ISR cache (1h) for the public/cacheable read path.
      fetch: (url, options = {}) =>
        fetch(url, { ...options, next: { revalidate: 3600 } } as RequestInit),
    },
  })
}

/**
 * Same as createAdminClient but disables Next fetch cache.
 * Use for any query touching PII (réclamations, leads, conseil_records,
 * GDPR export/delete) so a stale view never returns user-specific rows.
 */
export function createPiiAdminClient() {
  return createClient(supabaseUrl(), supabaseServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      fetch: (url, options = {}) =>
        fetch(url, { ...options, cache: 'no-store' } as RequestInit),
    },
  })
}
