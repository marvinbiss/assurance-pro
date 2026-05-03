/**
 * Page /devis — Formulaire devis assurance pro 3 étapes
 * Supporte le pré-remplissage par :
 * - Query params simples (?garantie=...&ville=...) en provenance du site
 * - Token JWT cross-domain (?token=...) signé par ServicesArtisans
 */

import type { Metadata } from 'next'
import { DevisAssuranceForm } from '@/components/assurance/DevisAssuranceForm'
import { verifyCrossDomainToken } from '@/lib/integration/cross-domain-jwt'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Devis assurance pro gratuit en 2 minutes | Assurance Pro',
  description:
    'Recevez votre devis assurance professionnelle personnalisé en moins de 24 heures. Décennale, RC Pro, Multirisque, Mutuelle TNS, VTC. Sans engagement, sans frais courtage.',
  alternates: { canonical: `${SITE_URL}/devis` },
  robots: { index: true, follow: true },
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

// Allowlist regex — Latin + accented letters, digits, spaces, dashes, apostrophes, dots, commas.
// Defends against XSS payloads in fields rendered later in HTML emails.
// Limited to Latin-1 Supplement to avoid TS target=es5 \p{} restriction.
const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 '\-.,]{1,80}$/
const PHONE_RE = /^[\d +.\-()]{6,30}$/

function sanitizePrefill(raw: PrefillRaw): PrefillRaw {
  const out: PrefillRaw = {}
  if (raw.garantie_code && /^[a-z0-9-]{2,40}$/.test(raw.garantie_code)) out.garantie_code = raw.garantie_code
  if (raw.metier_code && /^[a-z0-9_-]{2,40}$/.test(raw.metier_code)) out.metier_code = raw.metier_code
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

export default async function DevisPage({
  searchParams,
}: {
  // Next.js 15 : Promise désormais.
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const get = (k: string): string | undefined => {
    const v = params[k]
    return Array.isArray(v) ? v[0] : v
  }

  // 1) Cross-domain JWT priorité
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

  // 2) Query params simples (en complément du token, sans écraser)
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
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Votre devis assurance pro en 2 minutes
          </h1>
          <p className="text-gray-600 text-lg">
            Comparé sur 10+ assureurs partenaires. Sans engagement. Réponse sous 24&nbsp;heures.
          </p>
          {crossDomainSource && (
            <p className="mt-3 text-sm text-blue-700 bg-blue-50 inline-block px-3 py-1 rounded-full">
              Connexion sécurisée depuis ServicesArtisans — formulaire pré-rempli
            </p>
          )}
        </header>

        <DevisAssuranceForm prefill={merged} />

        <p className="mt-8 text-center text-xs text-gray-500 max-w-2xl mx-auto">
          <strong>Information précontractuelle —</strong> Ce formulaire est un point de départ pour
          recueillir vos exigences et besoins (art.&nbsp;L.&nbsp;521-4 du Code des assurances).
          Un courtier ORIAS vous recontactera ensuite pour formuler un conseil personnalisé motivé
          conforme à la Recommandation ACPR 2024-R-03.
        </p>
      </div>
    </main>
  )
}
