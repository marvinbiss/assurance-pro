/**
 * Ads tracking — UTM capture + ROAS measurement.
 *
 * Stratégie:
 *   1. Capture UTM params au premier landing (cookie 30j first-touch)
 *   2. Persiste source/medium/campaign/keyword sur session
 *   3. Attribue chaque conversion à la source initiale
 *   4. Push events GA4 + Meta Pixel + Google Ads conversion
 *
 * Conformité RGPD: ne fire que si analytics_storage = granted (Consent Mode v2).
 */

type DataLayerEvent = {
  event: string
  [key: string]: unknown
}

interface AdsTouch {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
  landed_at: string
  landing_path: string
}

const TOUCH_COOKIE = 'vivos_first_touch'
const TOUCH_COOKIE_TTL_DAYS = 30

function pushDataLayer(event: DataLayerEvent): void {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { dataLayer?: DataLayerEvent[] }
  if (!w.dataLayer) return
  w.dataLayer.push(event)
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1]
  return value ? decodeURIComponent(value) : null
}

function writeCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`
}

/**
 * Capture UTM + clickids au premier landing. Persiste 30 jours.
 * À appeler sur chaque page (root layout / RootClientHelpers).
 */
export function captureFirstTouch(): AdsTouch | null {
  if (typeof window === 'undefined') return null

  // Si déjà capturé en cookie → noop
  const existing = readCookie(TOUCH_COOKIE)
  if (existing) {
    try {
      return JSON.parse(existing) as AdsTouch
    } catch {
      // Cookie corrompu, on capture à nouveau
    }
  }

  const params = new URLSearchParams(window.location.search)
  const utm_source = params.get('utm_source') ?? undefined
  const utm_medium = params.get('utm_medium') ?? undefined
  const utm_campaign = params.get('utm_campaign') ?? undefined
  const utm_term = params.get('utm_term') ?? undefined
  const utm_content = params.get('utm_content') ?? undefined
  const gclid = params.get('gclid') ?? undefined
  const fbclid = params.get('fbclid') ?? undefined
  const msclkid = params.get('msclkid') ?? undefined

  // Pas de UTM = trafic organique direct. On capture quand même pour attribution.
  const touch: AdsTouch = {
    landed_at: new Date().toISOString(),
    landing_path: window.location.pathname,
    ...(utm_source ? { utm_source } : {}),
    ...(utm_medium ? { utm_medium } : {}),
    ...(utm_campaign ? { utm_campaign } : {}),
    ...(utm_term ? { utm_term } : {}),
    ...(utm_content ? { utm_content } : {}),
    ...(gclid ? { gclid } : {}),
    ...(fbclid ? { fbclid } : {}),
    ...(msclkid ? { msclkid } : {}),
  }

  writeCookie(TOUCH_COOKIE, JSON.stringify(touch), TOUCH_COOKIE_TTL_DAYS)

  // Fire ad_click event si paid traffic détecté
  if (utm_source || gclid || fbclid || msclkid) {
    pushDataLayer({
      event: 'ad_click',
      ...touch,
    })
  }

  return touch
}

/**
 * Récupère le first-touch attribution (cookie 30j).
 * Utile lors d'une conversion pour attribuer à la source initiale.
 */
export function getFirstTouch(): AdsTouch | null {
  const raw = readCookie(TOUCH_COOKIE)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AdsTouch
  } catch {
    return null
  }
}

/**
 * Tracking conversion ads avec attribution first-touch.
 * Fire 3 events en parallèle: GA4, Meta Pixel, Google Ads conversion.
 */
export function trackAdsConversion(params: {
  goal: string // ex: 'devis_submitted', 'preinscription', 'contract_signed'
  value?: number // valeur en € (commission estimée)
  currency?: string // 'EUR'
  vertical?: string
  metier?: string
  ville?: string
  email_hash?: string // SHA-256 de l'email (CAPI / Enhanced Conversions)
}): void {
  if (typeof window === 'undefined') return

  const touch = getFirstTouch()
  const commonParams = {
    ...(touch?.utm_source ? { source: touch.utm_source } : {}),
    ...(touch?.utm_campaign ? { campaign: touch.utm_campaign } : {}),
    ...(touch?.utm_term ? { keyword: touch.utm_term } : {}),
    ...(touch?.gclid ? { gclid: touch.gclid } : {}),
    ...(params.vertical ? { vertical: params.vertical } : {}),
    ...(params.metier ? { metier: params.metier } : {}),
    ...(params.ville ? { ville: params.ville } : {}),
  }

  // 1. GA4 event (via GTM)
  pushDataLayer({
    event: 'ads_conversion',
    goal: params.goal,
    value: params.value ?? 0,
    currency: params.currency ?? 'EUR',
    ...commonParams,
    ...(params.email_hash ? { email_hash: params.email_hash } : {}),
  })

  // 2. Google Ads conversion (si gclid présent)
  if (touch?.gclid) {
    pushDataLayer({
      event: 'google_ads_conversion',
      send_to: 'AW-CONVERSION_ID/LABEL', // à remplacer par ID conversion Google Ads
      value: params.value ?? 0,
      currency: params.currency ?? 'EUR',
      gclid: touch.gclid,
    })
  }

  // 3. Meta Pixel CAPI-ready event (si fbclid)
  if (touch?.fbclid) {
    pushDataLayer({
      event: 'meta_pixel_lead',
      content_name: params.goal,
      value: params.value ?? 0,
      currency: params.currency ?? 'EUR',
      fbclid: touch.fbclid,
      ...(params.email_hash ? { em: params.email_hash } : {}),
    })
  }
}

/**
 * Catalogue des goals ads-specific.
 */
export const ADS_GOALS = {
  // Top funnel
  LANDING_VIEW: 'landing_view',
  CALC_USED: 'calculator_used',
  // Mid funnel
  FORM_STARTED: 'form_started',
  FORM_STEP_COMPLETED: 'form_step_completed',
  // Lead capture
  PREINSCRIPTION: 'preinscription_warm_lead', // pré-ORIAS
  DEVIS_SUBMITTED: 'devis_submitted', // post-ORIAS
  // Closing
  CONTRACT_SIGNED: 'contract_signed',
  // Revenue
  COMMISSION_RECEIVED: 'commission_received',
} as const

export type AdsGoalId = (typeof ADS_GOALS)[keyof typeof ADS_GOALS]

/**
 * Hash SHA-256 d'un email pour Enhanced Conversions / CAPI.
 * Conforme RGPD (one-way hash, pas réversible).
 */
export async function hashEmail(email: string): Promise<string> {
  if (typeof crypto === 'undefined' || !crypto.subtle) return ''
  const normalized = email.trim().toLowerCase()
  const buffer = new TextEncoder().encode(normalized)
  const hash = await crypto.subtle.digest('SHA-256', buffer)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
