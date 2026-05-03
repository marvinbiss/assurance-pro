import { createBrowserClient } from '@supabase/ssr'
import { supabaseUrl, supabaseAnonKey } from './env'

export function createClient() {
  return createBrowserClient(supabaseUrl(), supabaseAnonKey())
}

// Singleton pattern for client-side
let client: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!client) {
    client = createClient()
  }
  return client
}
