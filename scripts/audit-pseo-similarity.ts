#!/usr/bin/env tsx
/**
 * Audit pSEO HCU-compliance — détection thin/duplicate content.
 *
 * Sample N pages par template, fetch live, calcule similarité Jaccard
 * (chars n-grams), génère rapport candidats suppression vs enrichissement.
 *
 * Usage:
 *   npx tsx scripts/audit-pseo-similarity.ts
 *
 * Output: audit-pseo-report.json + console summary
 */

import { writeFileSync } from 'node:fs'

const SITE_URL = 'https://vivos-assurance.fr'

const TEMPLATES_TO_AUDIT = [
  {
    name: 'guide_metier',
    sampleUrls: [
      '/guide/cyber-assurance/peintre',
      '/guide/cyber-assurance/plombier',
      '/guide/cyber-assurance/electricien',
      '/guide/cyber-assurance/avocat',
      '/guide/cyber-assurance/medecin_specialiste',
    ],
  },
  {
    name: 'tarif_metier',
    sampleUrls: [
      '/tarif/cyber-assurance/peintre',
      '/tarif/cyber-assurance/plombier',
      '/tarif/cyber-assurance/electricien',
      '/tarif/cyber-assurance/kinesitherapeute',
      '/tarif/cyber-assurance/architecte_dplg',
    ],
  },
  {
    name: 'prix_metier_statut',
    sampleUrls: [
      '/prix/cyber-assurance/avocat/sasu',
      '/prix/cyber-assurance/avocat/sarl',
      '/prix/cyber-assurance/avocat/eurl',
      '/prix/cyber-assurance/peintre/sasu',
      '/prix/cyber-assurance/plombier/sasu',
    ],
  },
]

/** Strip HTML, normalize, return text body only. */
function extractBody(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

/** Jaccard similarity sur shingles 5-chars. */
function jaccardSimilarity(text1: string, text2: string, k = 5): number {
  const shingles1 = new Set<string>()
  const shingles2 = new Set<string>()
  for (let i = 0; i <= text1.length - k; i++) {
    shingles1.add(text1.substring(i, i + k))
  }
  for (let i = 0; i <= text2.length - k; i++) {
    shingles2.add(text2.substring(i, i + k))
  }
  const intersection = new Set([...shingles1].filter((s) => shingles2.has(s)))
  const union = new Set([...shingles1, ...shingles2])
  return union.size === 0 ? 0 : intersection.size / union.size
}

async function fetchPage(path: string): Promise<{ url: string; body: string; words: number }> {
  const url = `${SITE_URL}${path}`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Vivos-PSEOAudit/1.0' },
  })
  const html = await res.text()
  const body = extractBody(html)
  const words = body.split(/\s+/).length
  return { url, body, words }
}

interface AuditResult {
  template: string
  pages: Array<{ url: string; words: number }>
  comparisons: Array<{ a: string; b: string; similarity: number }>
  avgSimilarity: number
  maxSimilarity: number
  verdict: 'SAFE' | 'WARNING' | 'CRITICAL'
}

async function auditTemplate(templateName: string, urls: string[]): Promise<AuditResult> {
  console.log(`\n=== Auditing template: ${templateName} ===`)
  const pages = []
  for (const url of urls) {
    try {
      const page = await fetchPage(url)
      pages.push(page)
      console.log(`  ✓ ${url} (${page.words} words)`)
    } catch (err) {
      console.log(`  ✗ ${url} FAILED: ${(err as Error).message}`)
    }
  }

  const comparisons = []
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const a = pages[i]
      const b = pages[j]
      if (!a || !b) continue
      const sim = jaccardSimilarity(a.body, b.body)
      comparisons.push({
        a: a.url,
        b: b.url,
        similarity: parseFloat(sim.toFixed(4)),
      })
    }
  }

  const avgSimilarity =
    comparisons.length > 0
      ? comparisons.reduce((sum, c) => sum + c.similarity, 0) / comparisons.length
      : 0
  const maxSimilarity = Math.max(...comparisons.map((c) => c.similarity), 0)

  let verdict: AuditResult['verdict'] = 'SAFE'
  if (avgSimilarity > 0.95) verdict = 'CRITICAL'
  else if (avgSimilarity > 0.85) verdict = 'WARNING'

  return {
    template: templateName,
    pages: pages.map((p) => ({ url: p.url, words: p.words })),
    comparisons,
    avgSimilarity: parseFloat(avgSimilarity.toFixed(4)),
    maxSimilarity: parseFloat(maxSimilarity.toFixed(4)),
    verdict,
  }
}

async function main() {
  console.log('=== pSEO HCU-Compliance Audit ===')
  console.log(`Sample size par template: ${TEMPLATES_TO_AUDIT.length * 5} pages`)
  console.log('Métrique: Jaccard similarity sur shingles 5-chars')
  console.log('Seuils: AVG > 0.85 = WARNING, AVG > 0.95 = CRITICAL\n')

  const results: AuditResult[] = []
  for (const tmpl of TEMPLATES_TO_AUDIT) {
    const result = await auditTemplate(tmpl.name, tmpl.sampleUrls)
    results.push(result)
  }

  // Console summary
  console.log('\n=== SUMMARY ===\n')
  for (const r of results) {
    const icon = r.verdict === 'CRITICAL' ? '🚨' : r.verdict === 'WARNING' ? '⚠️ ' : '✅'
    console.log(
      `${icon} ${r.template}: avg=${r.avgSimilarity}, max=${r.maxSimilarity}, verdict=${r.verdict}`
    )
  }

  // Critical templates list
  const criticalTemplates = results.filter((r) => r.verdict === 'CRITICAL')
  if (criticalTemplates.length > 0) {
    console.log('\n🚨 CRITICAL templates (HCU duplicate risk):')
    for (const t of criticalTemplates) {
      console.log(`  - ${t.template}: ${t.avgSimilarity * 100}% similarity moyenne`)
    }
    console.log('\n  → Action: enrich templates avec données métier-spécifiques')
    console.log('  → Ou: réduire couverture pSEO aux pages high-value uniquement')
  }

  // Persist JSON
  writeFileSync(
    'audit-pseo-report.json',
    JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)
  )
  console.log('\n📄 Rapport détaillé: audit-pseo-report.json')
}

main().catch((err) => {
  console.error('Audit failed:', err)
  process.exit(1)
})
