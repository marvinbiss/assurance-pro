/**
 * Page /devis — bascule selon IS_PRE_ORIAS :
 *  - Mode soft : formulaire de préinscription email (liste d'attente lancement)
 *  - Mode full : DevisAssuranceForm 3 étapes (avec prefill cross-domain)
 */

import type { Metadata } from 'next'
import { DevisAssuranceForm } from '@/components/assurance/DevisAssuranceForm'
import { DevisSoftView } from '@/components/assurance/DevisSoftView'
import { verifyCrossDomainToken } from '@/lib/integration/cross-domain-jwt'
import { SITE_URL } from '@/lib/seo/config'
import { IS_PRE_ORIAS } from '@/lib/config/pre-orias'

export const dynamic = 'force-dynamic'

const FULL_TITLE = 'Devis assurance pro gratuit en 2 minutes'
const FULL_DESC =
  'Recevez votre devis assurance professionnelle personnalisé en moins de 24 heures. Décennale, RC Pro, Multirisque, Mutuelle TNS, VTC. Sans engagement, sans frais courtage.'

const SOFT_TITLE = 'Préinscription — Soyez prévenu(e) du lancement'
const SOFT_DESC =
  "Cabinet en cours d'immatriculation ORIAS. Rejoignez la liste d'attente pour être informé(e) dès l'ouverture commerciale et bénéficier d'un accompagnement personnalisé."

const PAGE_TITLE = IS_PRE_ORIAS ? SOFT_TITLE : FULL_TITLE
const PAGE_DESC = IS_PRE_ORIAS ? SOFT_DESC : FULL_DESC

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: `${SITE_URL}/devis` },
  robots: { index: true, follow: true },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: `${SITE_URL}/devis`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESC,
  },
}

interface PrefillRaw {
  garantie_code?: string
  metier_code?: string
  ville?: string
  postal_code?: string
  ca_range?: string
  statut_juridique?: string
  prenom?: string
  nom?: string
  email?: string
  telephone?: string
  siret?: string
}

const VALID_CA = new Set(['lt_50k', '50_100k', '100_250k', '250_500k', 'gt_500k'])
const VALID_STATUT = new Set([
  'auto_entrepreneur',
  'ei',
  'eurl',
  'sarl',
  'sasu',
  'sas',
  'profession_liberale',
])

const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 '\-.,]{1,80}$/
const PHONE_RE = /^[\d +.\-()]{6,30}$/

function sanitizePrefill(raw: PrefillRaw): PrefillRaw {
  const out: PrefillRaw = {}
  if (raw.garantie_code && /^[a-z0-9-]{2,40}$/.test(raw.garantie_code))
    out.garantie_code = raw.garantie_code
  if (raw.metier_code && /^[a-z0-9_-]{2,40}$/.test(raw.metier_code))
    out.metier_code = raw.metier_code
  if (raw.ville && NAME_RE.test(raw.ville)) out.ville = raw.ville
  if (raw.postal_code && /^\d{5}$/.test(raw.postal_code)) out.postal_code = raw.postal_code
  if (raw.ca_range && VALID_CA.has(raw.ca_range)) out.ca_range = raw.ca_range
  if (raw.statut_juridique && VALID_STATUT.has(raw.statut_juridique)) {
    out.statut_juridique = raw.statut_juridique
  }
  if (raw.prenom && NAME_RE.test(raw.prenom)) out.prenom = raw.prenom
  if (raw.nom && NAME_RE.test(raw.nom)) out.nom = raw.nom
  if (raw.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(raw.email) && raw.email.length <= 254) {
    out.email = raw.email
  }
  if (raw.telephone && PHONE_RE.test(raw.telephone)) out.telephone = raw.telephone
  if (raw.siret && /^\d{14}$/.test(raw.siret.replace(/\s/g, ''))) {
    out.siret = raw.siret.replace(/\s/g, '')
  }
  return out
}

const GARANTIE_TO_VERTICAL: Record<string, string> = {
  decennale: 'decennale',
  'assurance-decennale': 'decennale',
  'rc-pro': 'rc_pro',
  rc_pro: 'rc_pro',
  'multirisque-pro': 'multirisque',
  multirisque: 'multirisque',
  'mutuelle-pro': 'mutuelle',
  mutuelle: 'mutuelle',
  'assurance-vtc': 'vtc',
  vtc: 'vtc',
  'cyber-assurance': 'cyber',
  cyber: 'cyber',
}

export default async function DevisPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const get = (k: string): string | undefined => {
    const v = params[k]
    return Array.isArray(v) ? v[0] : v
  }

  if (IS_PRE_ORIAS) {
    const garantie = get('garantie') ?? get('vertical')
    const defaultVertical = garantie ? GARANTIE_TO_VERTICAL[garantie] : undefined
    return <DevisSoftView defaultVertical={defaultVertical} />
  }

  // Mode full commercial — devis form classique
  let prefill: PrefillRaw = {}
  let crossDomainSource: string | null = null
  const token = get('token')
  if (token) {
    try {
      const decoded = await verifyCrossDomainToken(token, { consumeJti: true })
      if (decoded) {
        prefill = {
          garantie_code: decoded.garantie ?? decoded.vertical,
          metier_code: decoded.metier,
          ville: decoded.ville,
          postal_code: decoded.postal_code,
          ca_range: decoded.ca_range,
          statut_juridique: decoded.statut_juridique,
          prenom: decoded.prenom,
          nom: decoded.nom,
          email: decoded.email,
          telephone: decoded.telephone,
          siret: decoded.siret,
        }
        crossDomainSource = decoded.source_artisan_id ?? 'servicesartisans.fr'
      }
    } catch {
      // Token invalide/expiré : ignorer silencieusement
    }
  }

  const queryPrefill: PrefillRaw = {
    garantie_code: get('garantie'),
    metier_code: get('metier'),
    ville: get('ville'),
    postal_code: get('cp'),
    ca_range: get('ca'),
    statut_juridique: get('statut'),
  }
  const merged = { ...sanitizePrefill(queryPrefill), ...sanitizePrefill(prefill) }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">
            Votre devis assurance pro en 2 minutes
          </h1>
          <p className="text-lg text-gray-600">
            Comparé sur 10+ assureurs partenaires. Sans engagement. Réponse sous 24&nbsp;heures.
          </p>
          {crossDomainSource && (
            <p className="mt-3 inline-block rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
              Connexion sécurisée depuis ServicesArtisans — formulaire pré-rempli
            </p>
          )}
        </header>

        <DevisAssuranceForm prefill={merged} />

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-gray-500">
          <strong>Information précontractuelle —</strong> Ce formulaire est un point de départ pour
          recueillir vos exigences et besoins (art.&nbsp;L.&nbsp;521-4 du Code des assurances). Un
          courtier ORIAS vous recontactera ensuite pour formuler un conseil personnalisé motivé
          conforme à la Recommandation ACPR 2024-R-03.
        </p>
      </div>
    </main>
  )
}
