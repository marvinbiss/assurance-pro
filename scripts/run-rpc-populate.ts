import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf-8')
  .split('\n')
  .reduce((acc: Record<string, string>, l) => {
    const m = l.match(/^([A-Z_]+)=(.+)$/)
    if (m && m[1] && m[2]) acc[m[1]] = m[2].replace(/^"|"$/g, '')
    return acc
  }, {})

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!)

async function main() {
  console.log('🚀 Populate page_enrichment_cache via RPC...')
  const { data, error } = await sb.rpc('populate_page_enrichment_cache', {
    p_min_yield: 15,
    p_density_default: 50,
  })
  if (error) {
    console.error('❌', error)
    process.exit(1)
  }
  console.log('✅ Populate result:')
  console.table(data)

  console.log('\n🎯 Promote top 5820 yield → published...')
  const { data: promoted, error: e2 } = await sb.rpc('promote_top_yield_pages', { p_limit: 5820 })
  if (e2) {
    console.error('❌', e2)
    process.exit(1)
  }
  console.log(`✅ Promoted ${promoted} pages to 'published'`)

  console.log('\n📊 Audit qualité cache:')
  const { data: audit, error: e3 } = await sb.rpc('audit_enrichment_cache')
  if (e3) {
    console.error('❌', e3)
    process.exit(1)
  }
  console.table(audit)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
