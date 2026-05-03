import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/seo/config'
import { submitToIndexNow } from '@/lib/seo/indexnow'
import { getMetierSlugs } from '@/lib/data/decennale-metiers'
import { getProfessionSlugs } from '@/lib/data/rc-pro-professions'
import { getVilleSlugs } from '@/lib/data/villes-top100'
import { getPostSlugs } from '@/lib/data/blog-posts'
import { logger } from '@/lib/logger'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'

/**
 * Cron quotidien : soumet à IndexNow (Bing/Yandex) les URLs prioritaires
 * du site Assurance Pro pour garantir une indexation rapide post-deploy.
 */

const STATIC_PRIORITY = [
  '',
  'assurance-decennale',
  'rc-pro',
  'multirisque-pro',
  'mutuelle-pro',
  'assurance-vtc',
  'cyber-assurance',
  'rc-pro-avocat',
  'rc-pro-medecin',
  'comparateur-assureurs',
  'devis',
  'blog',
  'faq',
  'glossaire',
  'a-propos',
  'equipe',
  'notre-processus-conseil',
  'selection-assureurs',
  'fic',
  'ipid',
  'reclamation',
]

const MAX_URLS_PER_DAY = 500

export async function GET(request: Request) {
  if (!verifyCronAuthorization(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const urls = new Set<string>()

  for (const path of STATIC_PRIORITY) {
    urls.add(path ? `${SITE_URL}/${path}` : `${SITE_URL}/`)
  }

  for (const slug of getMetierSlugs()) urls.add(`${SITE_URL}/assurance-decennale/${slug}`)
  for (const slug of getProfessionSlugs()) urls.add(`${SITE_URL}/rc-pro/${slug}`)
  for (const slug of getPostSlugs()) urls.add(`${SITE_URL}/blog/${slug}`)

  // Geo : top villes par garantie (cap MAX_URLS_PER_DAY).
  const villes = getVilleSlugs()
  const metiersSet = new Set(getMetierSlugs())
  const profsSet = new Set(getProfessionSlugs())
  for (const v of villes) {
    if (urls.size >= MAX_URLS_PER_DAY) break
    if (!metiersSet.has(v)) urls.add(`${SITE_URL}/assurance-decennale/${v}`)
    if (urls.size >= MAX_URLS_PER_DAY) break
    if (!profsSet.has(v)) urls.add(`${SITE_URL}/rc-pro/${v}`)
  }

  const list = Array.from(urls).slice(0, MAX_URLS_PER_DAY)
  try {
    const result = await submitToIndexNow(list)
    logger.info({ submitted: list.length, ok: result }, 'indexnow daily submission')
    return NextResponse.json({ submitted: list.length, ok: result })
  } catch (err) {
    logger.error({ err }, 'indexnow submission failed')
    return NextResponse.json({ error: 'IndexNow submission failed' }, { status: 500 })
  }
}
