/**
 * LÉGIFRANCE / DILA API Client
 * Documentation : https://aife.economie.gouv.fr/
 * Permet l'accès aux textes juridiques officiels (Code des assurances, jurisprudence)
 *
 * Utilisé pour :
 * - Pages obligations légales (lien permanent vers article)
 * - Pages jurisprudence par métier × type sinistre
 * - Citation de sources sur 100% des pages YMYL
 */

import { logger } from '@/lib/logger'

const LEGIFRANCE_API_BASE = 'https://api.piste.gouv.fr/dila/legifrance/lf-engine-app'
const LEGIFRANCE_OAUTH_URL = 'https://oauth.piste.gouv.fr/api/oauth/token'

let cachedToken: { token: string; expiresAt: number } | null = null

interface OAuthTokenResponse {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
}

interface SearchRequest {
  recherche: {
    champs: Array<{
      typeChamp: 'TITLE' | 'TABLE' | 'NUM_ARTICLE' | 'ALL'
      criteres: Array<{
        valeur: string
        typeRecherche: 'EXACTE' | 'CONTIENT' | 'TOUS_LES_MOTS_DANS_UN_CHAMP'
        operateur?: 'ET' | 'OU'
      }>
      operateur?: 'ET' | 'OU'
    }>
    pageNumber?: number
    pageSize?: number
    sort?: 'PERTINENCE' | 'DATE_DESC' | 'DATE_ASC'
    fond: 'CODE' | 'JURI' | 'CONSTIT' | 'CETAT'
  }
}

export interface JuriDecision {
  id: string
  titre: string
  date: string
  juridiction: string
  numero: string
  formation?: string
  solution?: string
  resume?: string
  texte: string
  url: string
}

export interface CodeArticle {
  id: string
  num: string
  titre: string
  texte: string
  url: string
  dateModif?: string
}

/**
 * Récupère un token OAuth (cache 50 min)
 */
async function getOAuthToken(): Promise<string> {
  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.token
  }

  const clientId = process.env.LEGIFRANCE_CLIENT_ID
  const clientSecret = process.env.LEGIFRANCE_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('LEGIFRANCE_CLIENT_ID and LEGIFRANCE_CLIENT_SECRET required')
  }

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'openid',
  })

  const res = await fetch(LEGIFRANCE_OAUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  if (!res.ok) {
    throw new Error(`Légifrance OAuth failed: ${res.status}`)
  }

  const data = (await res.json()) as OAuthTokenResponse
  cachedToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in - 60) * 1000,
  }
  return data.access_token
}

async function callLegifranceApi<T>(endpoint: string, body: unknown): Promise<T> {
  const token = await getOAuthToken()
  const res = await fetch(`${LEGIFRANCE_API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    logger.error({ endpoint, status: res.status, errText }, 'Légifrance API error')
    throw new Error(`Légifrance API ${endpoint} returned ${res.status}`)
  }
  return (await res.json()) as T
}

/**
 * Cherche des articles dans le Code des assurances
 */
export async function searchCodeArticles(
  query: string,
  options: { pageSize?: number; pageNumber?: number } = {}
): Promise<CodeArticle[]> {
  const body: SearchRequest = {
    recherche: {
      champs: [
        {
          typeChamp: 'ALL',
          criteres: [{ valeur: query, typeRecherche: 'TOUS_LES_MOTS_DANS_UN_CHAMP' }],
        },
      ],
      pageNumber: options.pageNumber ?? 1,
      pageSize: options.pageSize ?? 10,
      sort: 'PERTINENCE',
      fond: 'CODE',
    },
  }
  const data = await callLegifranceApi<{ results: CodeArticle[] }>(
    '/consult/jorf',
    body
  )
  return data.results ?? []
}

/**
 * Cherche de la jurisprudence (Cour de cassation, CA, CE)
 */
export async function searchJurisprudence(
  query: string,
  options: {
    pageSize?: number
    pageNumber?: number
    juridiction?: 'CASS' | 'CETAT' | 'CA'
  } = {}
): Promise<JuriDecision[]> {
  const body: SearchRequest = {
    recherche: {
      champs: [
        {
          typeChamp: 'ALL',
          criteres: [{ valeur: query, typeRecherche: 'TOUS_LES_MOTS_DANS_UN_CHAMP' }],
        },
      ],
      pageNumber: options.pageNumber ?? 1,
      pageSize: options.pageSize ?? 20,
      sort: 'DATE_DESC',
      fond: options.juridiction === 'CETAT' ? 'CETAT' : 'JURI',
    },
  }
  const data = await callLegifranceApi<{ results: JuriDecision[] }>(
    '/search',
    body
  )
  return data.results ?? []
}

/**
 * Récupère un article par son ID
 */
export async function getArticleById(id: string): Promise<CodeArticle | null> {
  try {
    return await callLegifranceApi<CodeArticle>('/consult/getArticle', { id })
  } catch (err) {
    logger.warn({ id, err }, 'Article not found')
    return null
  }
}

/**
 * Construit l'URL permanente Légifrance pour un article
 */
export function buildLegifranceUrl(articleId: string): string {
  return `https://www.legifrance.gouv.fr/codes/article_lc/${articleId}`
}

/**
 * Articles de référence pour l'assurance pro (à citer fréquemment)
 */
export const REFERENCE_ARTICLES = {
  decennale_obligation: 'LEGIARTI000006791570',  // L. 241-1 C. assur. (décennale obligatoire)
  spinetta: 'LEGITEXT000006072026',              // Loi Spinetta du 4 janv. 1978
  art_1792_civ: 'LEGIARTI000006429931',          // art. 1792 C. civ. (présomption responsabilité)
  dda_devoir_conseil: 'LEGIARTI000037018921',    // L. 521-4 C. assur. (devoir de conseil)
  dommages_ouvrage: 'LEGIARTI000006791560',      // L. 242-1 C. assur. (DO obligatoire)
  rc_pro: 'LEGIARTI000006290631',                // L. 121-2 C. assur.
  exclusions: 'LEGIARTI000006290478',            // L. 113-1 (exclusions garantie)
  retractation: 'LEGIARTI000006290471',          // L. 112-2-1 (rétractation 14j)
  acpr_competence: 'LEGIARTI000027478183',       // L. 612-1 CMF (pouvoirs ACPR)
  orias_immatriculation: 'LEGIARTI000006290622', // L. 512-1 C. assur.
}
