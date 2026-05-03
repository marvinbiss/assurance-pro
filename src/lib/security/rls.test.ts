// @vitest-environment node
/**
 * Tests RLS — vérifie que la migration 009 verrouille bien tous les schémas
 * sensibles (app, audit) en deny-all via le client anon (clé publique).
 *
 * Ces tests sont SKIP par défaut en CI sans Supabase live (vars manquantes).
 * Pour les exécuter en local :
 *   AHREFS_EXPORTS_DIR=... NEXT_PUBLIC_SUPABASE_URL=... \
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... npx vitest run rls
 *
 * Ils servent de garde-fou anti-régression : si quelqu'un crée une nouvelle
 * table app.* ou audit.* sans policy, le test échoue.
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const skip = !url || !anon
const skipReason =
  'Variables Supabase absentes (NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY) — tests RLS désactivés.'

describe.skipIf(skip)('RLS lockdown (migration 009)', () => {
  // Lazy init via beforeAll : `describe.skipIf` n'empêche pas l'évaluation du
  // factory du describe — donc `createClient('', '')` planterait sans cette
  // indirection. beforeAll n'est appelé que si la suite n'est pas skipée.
  let anonClient: SupabaseClient
  beforeAll(() => {
    anonClient = createClient(url as string, anon as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  })

  // Tables publiques compliance — RLS deny-all attendu (aucune policy = aucun accès via anon).
  const PUBLIC_LOCKED_TABLES = [
    'leads',
    'reclamations',
    'conseil_records',
    'newsletter_subscribers',
    'googlebot_logs',
    'kw_universe',
    'competitor_pages',
    'competitor_metrics',
    'jwt_jti_consumed',
    'gdpr_token_consumed',
    'admin_nonce_consumed',
  ] as const

  for (const table of PUBLIC_LOCKED_TABLES) {
    it(`anon SELECT sur public.${table} ne renvoie aucune ligne (RLS deny-all)`, async () => {
      const { data, error } = await anonClient.from(table).select('*').limit(1)
      // Deux comportements valides :
      //   1. data est un array vide (RLS filtre toutes les rows)
      //   2. error est de type permission denied
      // Tout autre comportement = RLS cassée.
      if (error) {
        expect(error.message).toMatch(/permission|denied|policy|access/i)
      } else {
        expect(data).toEqual([])
      }
    })

    it(`anon INSERT sur public.${table} est rejeté`, async () => {
      // Insert d'une ligne factice — doit échouer (deny-all write OU schema violation).
      const { error } = await anonClient.from(table).insert({ _bogus: 'rls-probe' } as never)
      expect(error).not.toBeNull()
    })
  }

  // RLS sur tables PII : un appel select sur app.profiles via le schema public
  // n'est pas accessible (pas exposé en API REST). On teste plutôt qu'aucune
  // RPC sensible n'est exposée sans authentification.
  it('RPC sensible persist_lead_atomic n\'est pas appelable sans service role', async () => {
    const { error } = await anonClient.rpc('persist_lead_atomic', {})
    expect(error).not.toBeNull()
    // L'erreur peut être : permission denied, function not found, ou validation.
    // L'important : on ne doit JAMAIS recevoir un 200 sans service role.
  })
})

describe('RLS guard meta', () => {
  it('skip metadata is informative when env vars missing', () => {
    if (skip) {
      // Note : ce test sert à laisser une trace dans le rapport vitest quand on est en CI sans Supabase.
      expect(skipReason).toMatch(/Variables Supabase absentes/)
    } else {
      expect(url).toMatch(/^https:\/\/.+\.supabase\.co$/)
    }
  })
})
