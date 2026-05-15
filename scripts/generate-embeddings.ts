/**
 * Génération offline des embeddings pour les 6 070 pages.
 *
 * Stratégie :
 *   1. Lire tous les page.tsx statiques + enrichissements programmatiques
 *   2. Pour chaque page : extraire titre + tagline + intro + sections (chunks)
 *   3. Embedder via OpenAI text-embedding-3-small (1536 dim)
 *   4. Upsert en base (idempotent — re-run safe)
 *
 * Coût estimé : 6 070 pages × ~500 tokens/page = ~3M tokens
 *               × $0.02 / 1M tokens = ~0.06€ total (one-shot)
 *
 * Usage :
 *   OPENAI_API_KEY=... NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *     npx tsx scripts/generate-embeddings.ts [--limit=100] [--dry-run]
 */

import 'dotenv/config'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const OPENAI_KEY = process.env.OPENAI_API_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
if (!OPENAI_KEY) {
  console.error('Missing OPENAI_API_KEY')
  process.exit(1)
}

const args = process.argv.slice(2)
const limit = Number(args.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? 0)
const dryRun = args.includes('--dry-run')

const openai = new OpenAI({ apiKey: OPENAI_KEY })
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const APP_DIR = join(process.cwd(), 'src/app/(public)')

// ─── Page discovery (statiques) ──────────────────────────────────────────────

interface PageDoc {
  slug: string
  title: string
  tagline: string
  content: string
}

async function walkPages(dir: string, root = APP_DIR): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const out: string[] = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      // Skip dynamic routes [param] — handled separately via Supabase view
      if (e.name.startsWith('[')) continue
      out.push(...(await walkPages(full, root)))
    } else if (e.name === 'page.tsx') {
      out.push(full)
    }
  }
  return out
}

function extractMetadata(src: string): { title?: string; tagline?: string; slug?: string } {
  const titleMatch = src.match(/const TITLE\s*=\s*['"`]([^'"`]+)['"`]/)
  const taglineMatch = src.match(/const TAGLINE\s*=\s*\n?\s*['"`]([^'"`]+)['"`]/m)
  const slugMatch = src.match(/const SLUG\s*=\s*['"`]([^'"`]+)['"`]/)
  return {
    title: titleMatch?.[1],
    tagline: taglineMatch?.[1],
    slug: slugMatch?.[1],
  }
}

function extractTextContent(src: string): string {
  // Crude extraction : capture intro="..." + sections h2/body JSX text
  const parts: string[] = []
  const introMatch = src.match(/intro=["']([^"']{50,2000})["']/)
  if (introMatch?.[1]) parts.push(introMatch[1])

  const h2Matches = src.matchAll(/h2:\s*['"`]([^'"`]+)['"`]/g)
  for (const m of h2Matches) parts.push(m[1] ?? '')

  const aMatches = src.matchAll(/a:\s*['"`]([^'"`]{30,1500})['"`]/g)
  for (const m of aMatches) parts.push(m[1] ?? '')

  const qMatches = src.matchAll(/q:\s*['"`]([^'"`]{10,300})['"`]/g)
  for (const m of qMatches) parts.push(m[1] ?? '')

  return parts.join('\n\n').replace(/\s+/g, ' ').trim().slice(0, 6000)
}

async function collectStaticPages(): Promise<PageDoc[]> {
  const files = await walkPages(APP_DIR)
  const docs: PageDoc[] = []
  for (const file of files) {
    const src = await readFile(file, 'utf8')
    const meta = extractMetadata(src)
    if (!meta.slug || !meta.title) continue
    const content = extractTextContent(src)
    if (content.length < 100) continue
    docs.push({
      slug: meta.slug,
      title: meta.title,
      tagline: meta.tagline ?? '',
      content: `${meta.title}\n${meta.tagline ?? ''}\n\n${content}`,
    })
  }
  return docs
}

// ─── Collecte des articles blog (lib/data/blog-posts*.ts) ────────────────────

/**
 * Extrait grossièrement les BlogPost depuis les batches blog en parsant les
 * strings TypeScript via regex. Pas idéal mais évite d'avoir à compiler le TS
 * dans le script. Pour chaque article on génère un PageDoc avec slug `blog/<slug>`
 * et content = title + description + tous les paragraphes/items concaténés.
 */
async function collectBlogPosts(): Promise<PageDoc[]> {
  const dataDir = join(process.cwd(), 'src/lib/data')
  const files = (await readdir(dataDir)).filter(
    (f) =>
      (f === 'blog-posts.ts' ||
        f.startsWith('blog-posts-batch') ||
        f === 'blog-posts-extensions.ts') &&
      f.endsWith('.ts') &&
      !f.endsWith('.test.ts')
  )

  const docs: PageDoc[] = []
  const seenSlugs = new Set<string>()

  for (const file of files) {
    const src = await readFile(join(dataDir, file), 'utf8')

    // Pattern : '<slug>': { ... }  — au début de chaque article (indent 2 espaces)
    const slugRegex = /^ {2}'([a-z0-9-]+)':\s*\{/gm
    const starts: Array<{ slug: string; pos: number }> = []
    for (const m of src.matchAll(slugRegex)) {
      if (m.index !== undefined) starts.push({ slug: m[1] ?? '', pos: m.index })
    }

    for (let i = 0; i < starts.length; i++) {
      const start = starts[i]!
      const next = starts[i + 1]
      const block = src.slice(start.pos, next ? next.pos : start.pos + 30_000)

      if (seenSlugs.has(start.slug)) continue
      seenSlugs.add(start.slug)

      // Extract title (premier title: ou title:)
      const titleMatch = block.match(/title:\s*['"`]([^'"`]+)['"`]/)
      // Extract description (premier description: même multi-ligne)
      const descMatch =
        block.match(/description:\s*['"`]([^'"`]+)['"`]/) ||
        block.match(/description:\s*\n\s*['"`]([^'"`]+)['"`]/)

      const title = titleMatch?.[1] ?? start.slug
      const description = descMatch?.[1] ?? ''

      // Extract paragraphs (toutes les strings dans des arrays paragraphs: [...])
      const paragraphs: string[] = []
      const paragraphsRegex = /paragraphs:\s*\[([\s\S]*?)\]/g
      for (const pm of block.matchAll(paragraphsRegex)) {
        const inner = pm[1] ?? ''
        for (const sm of inner.matchAll(/['"`]([^'"`]{30,2000})['"`]/g)) {
          if (sm[1]) paragraphs.push(sm[1])
        }
      }

      // Extract list items (strings dans items: [...])
      const items: string[] = []
      const itemsRegex = /items:\s*\[([\s\S]*?)\]/g
      for (const im of block.matchAll(itemsRegex)) {
        const inner = im[1] ?? ''
        for (const sm of inner.matchAll(/['"`]([^'"`]{20,500})['"`]/g)) {
          if (sm[1]) items.push(sm[1])
        }
      }

      const allText = [description, ...paragraphs, ...items]
        .map((s) => s.replace(/\\'/g, "'").replace(/\*\*/g, ''))
        .join(' ')
        .trim()

      if (allText.length < 200) continue

      docs.push({
        slug: `blog/${start.slug}`,
        title,
        tagline: description,
        content: `${title}\n${description}\n\n${allText}`.slice(0, 12_000),
      })
    }
  }

  return docs
}

// ─── Embed + upsert ──────────────────────────────────────────────────────────

async function embedAndUpsert(doc: PageDoc): Promise<void> {
  if (dryRun) {
    console.log(`[dry-run] would embed: ${doc.slug} (${doc.content.length} chars)`)
    return
  }
  const r = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: doc.content,
    dimensions: 1536,
  })
  const vec = r.data[0]?.embedding
  if (!vec) throw new Error(`no embedding returned for ${doc.slug}`)

  const { error } = await supabase.rpc('upsert_page_embedding', {
    p_page_slug: doc.slug,
    p_chunk_index: 0,
    p_content: doc.content,
    p_embedding: vec as unknown as string,
    p_model: 'text-embedding-3-small',
    p_token_count: r.usage?.total_tokens ?? null,
  })
  if (error) throw error
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('🔍 Discovering pages…')
  const staticDocs = await collectStaticPages()
  console.log(`📄 Found ${staticDocs.length} static pages`)

  console.log('📝 Discovering blog posts…')
  const blogDocs = await collectBlogPosts()
  console.log(`📰 Found ${blogDocs.length} blog posts`)

  const docs = [...staticDocs, ...blogDocs]
  console.log(`📚 Total documents to embed: ${docs.length}`)

  const queue = limit > 0 ? docs.slice(0, limit) : docs
  console.log(`🧮 Processing ${queue.length} documents (concurrency=3)…`)

  let ok = 0
  let failed = 0
  const CONCURRENCY = 3
  const start = Date.now()

  for (let i = 0; i < queue.length; i += CONCURRENCY) {
    const batch = queue.slice(i, i + CONCURRENCY)
    const results = await Promise.allSettled(batch.map((d) => embedAndUpsert(d)))
    for (const [idx, r] of results.entries()) {
      const doc = batch[idx]!
      if (r.status === 'fulfilled') {
        ok++
      } else {
        failed++
        console.error(`❌ ${doc.slug}: ${r.reason}`)
      }
    }
    const pct = Math.round(((i + batch.length) / queue.length) * 100)
    process.stdout.write(`\r✅ ${ok} | ❌ ${failed} | ${pct}% `)
  }

  const elapsed = Math.round((Date.now() - start) / 1000)
  console.log(
    `\n\n🎉 Done in ${elapsed}s — ok=${ok} failed=${failed} skipped=${docs.length - queue.length}`
  )
}

main().catch((e) => {
  console.error('💥 fatal:', e)
  process.exit(1)
})
