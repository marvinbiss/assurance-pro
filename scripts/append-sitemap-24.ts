import { readFileSync, writeFileSync } from 'fs'

interface Target { slug: string; tier: number; nb_kw: number; vol_total: number; roi_cumul: number }
const targets: Target[] = JSON.parse(readFileSync('src/data/50-targets.json', 'utf-8'))

const sitemap = readFileSync('src/app/sitemap.ts', 'utf-8')
const marker = "// EXPLOIT 100% AHREFS - 24 NOUVELLES PAGES"
if (sitemap.includes(marker)) {
  console.log('Marker existe — skip')
  process.exit(0)
}

const entries = targets.map((t) => {
  const priority = t.tier === 3 ? 0.85 : t.tier === 4 ? 0.8 : 0.75
  return `  { path: '${t.slug}', priority: ${priority}, changeFrequency: 'weekly' }, // T${t.tier} ${t.nb_kw}KW ${t.vol_total}vol ROI ${t.roi_cumul.toLocaleString('fr-FR')}`
}).join('\n')

const block = `\n  // ${marker} (extraction script extract-50-targets.ts)\n${entries}\n`

/* Insère juste avant la fin du tableau */
const updated = sitemap.replace(
  /(\{ path: 'guides\/responsabilite-civile-professionnelle-informatique'[^\n]+\n)/,
  `$1${block}`
)

writeFileSync('src/app/sitemap.ts', updated)
console.log(`Inséré ${targets.length} entries sitemap`)
