/**
 * Migration ponctuelle : wrap `JSON.stringify(schema)` dans
 * `<script type="application/ld+json" dangerouslySetInnerHTML={{__html: ...}}/>`
 * vers `<script {...jsonLdScriptProps(schema, nonce)} />`.
 *
 * Cible : src/app/(public)/outils/[name]/page.tsx (16 fichiers)
 *
 * Run : npx tsx scripts/migrate-jsonld-safe.ts
 * (idempotent — skip si déjà migré)
 */

import { readFile, writeFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const OUTILS_DIR = join(process.cwd(), 'src/app/(public)/outils')

/**
 * Pattern à matcher :
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{
 *       __html: JSON.stringify(EXPR),
 *     }}
 *   />
 *
 * Remplace par :
 *   <script {...jsonLdScriptProps(EXPR, nonce)} />
 */
const SCRIPT_RE =
  /<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(([\s\S]+?)\)\s*,?\s*\}\}\s*\/>/g

function ensureImport(content: string): string {
  if (content.includes("from '@/lib/seo/safe-jsonld'")) return content
  // Insère après la dernière ligne d'imports `from`
  const importLines = content.split('\n')
  let lastImportIdx = -1
  for (let i = 0; i < importLines.length; i++) {
    if (importLines[i]!.match(/^import\s/) && importLines[i]!.includes('from ')) {
      lastImportIdx = i
    }
  }
  if (lastImportIdx === -1) return content
  importLines.splice(
    lastImportIdx + 1,
    0,
    "import { headers } from 'next/headers'",
    "import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'"
  )
  return importLines.join('\n')
}

function ensureNonce(content: string): string {
  if (content.includes("(await headers()).get('x-nonce')")) return content
  // Trouve le `export default function Page()` ou async function, ajoute nonce
  // au début du body. Détecte aussi `export default async function`.
  const replaced = content.replace(
    /export default (async )?function ([A-Z]\w*)\(\)\s*\{/,
    (_match, asyncKw, name) => {
      const asyncPrefix = asyncKw ?? 'async '
      return `export default ${asyncPrefix}function ${name}() {\n  const nonce = (await headers()).get('x-nonce') ?? undefined`
    }
  )
  return replaced
}

async function migrateFile(path: string): Promise<boolean> {
  const src = await readFile(path, 'utf8')
  if (!SCRIPT_RE.test(src)) return false
  // Reset regex state (g flag stateful)
  SCRIPT_RE.lastIndex = 0

  let out = src.replace(SCRIPT_RE, (_match, expr) => {
    const trimmedExpr = (expr as string).trim()
    return `<script {...jsonLdScriptProps(${trimmedExpr}, nonce)} />`
  })

  out = ensureImport(out)
  out = ensureNonce(out)

  if (out === src) return false
  await writeFile(path, out, 'utf8')
  return true
}

async function main(): Promise<void> {
  const dirs = await readdir(OUTILS_DIR, { withFileTypes: true })
  let migrated = 0
  let skipped = 0
  for (const d of dirs) {
    if (!d.isDirectory()) continue
    const file = join(OUTILS_DIR, d.name, 'page.tsx')
    try {
      const changed = await migrateFile(file)
      if (changed) {
        migrated++
        console.log(`✓ ${d.name}`)
      } else {
        skipped++
      }
    } catch (e) {
      console.error(`✗ ${d.name}: ${String(e)}`)
    }
  }
  console.log(`\nDone: ${migrated} migrated, ${skipped} skipped (already done or no match).`)
}

main().catch((e) => {
  console.error('fatal:', e)
  process.exit(1)
})
