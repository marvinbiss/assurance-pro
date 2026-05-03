/**
 * Company Identity — Single Source of Truth (Assurance Pro, courtier ORIAS).
 *
 * Hiérarchie des sources :
 *   Niveau 1 (mentions légales) : siret, legalName, address, phone, rcs, tva, orias
 *   Niveau 5 (UI copy) : description, tagline
 *
 * RÈGLE : tout champ `null` ne doit JAMAIS apparaître dans :
 *   - Le JSON-LD structuré
 *   - Les mentions légales
 *   - Le footer
 *
 * À jour au registre ORIAS ⇒ remplir les variables d'environnement
 * `COMPANY_*` (voir .env.example).
 */

export const companyIdentity = {
  // Brand (Level 5 — UI copy only)
  name: 'Assurance Pro' as const,
  tagline: 'Courtier ORIAS — comparez et négociez votre assurance pro en 2 minutes',
  description:
    'Cabinet de courtage ORIAS spécialiste de l\'assurance professionnelle. 10 assureurs partenaires comparés sur 17 verticaux : décennale BTP, RC Pro, multirisque, mutuelle TNS Madelin, VTC, cyber. Aucun frais de courtage facturé.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://assurance-pro.fr',

  // Legal identity (Level 1 — from env vars, null until company registration)
  legalName: process.env.COMPANY_LEGAL_NAME || null,
  formeJuridique: process.env.COMPANY_FORME_JURIDIQUE || null,
  capitalSocial: process.env.COMPANY_CAPITAL_SOCIAL || null,
  siret: process.env.COMPANY_SIRET || null,
  rcs: process.env.COMPANY_RCS || null,
  tvaIntracom: process.env.COMPANY_TVA || null,
  address: process.env.COMPANY_ADDRESS || null,
  phone: process.env.COMPANY_PHONE || '06 51 85 89 30',
  directeurPublication: process.env.COMPANY_DIRECTEUR_PUBLICATION || null,
  foundingDate: process.env.COMPANY_FOUNDING_DATE || null,

  // Contact (real and functional)
  email: 'contact@assurance-pro.fr',
  supportEmail: 'support@assurance-pro.fr',
  dpoEmail: 'dpo@assurance-pro.fr',
  presseEmail: 'presse@assurance-pro.fr',
  partenairesEmail: 'partenaires@assurance-pro.fr',
  careersEmail: 'careers@assurance-pro.fr',

  // Social (real profiles)
  social: {
    facebook: 'https://facebook.com/assurance-pro',
    instagram: 'https://instagram.com/assurance-pro',
    linkedin: 'https://linkedin.com/company/assurance-pro',
    twitter: 'https://x.com/assurance-pro',
  },

  // Hosting (Level 1 — verifiable)
  hosting: {
    name: 'Vercel Inc.',
    address: '340 S Lemon Ave #4133, Walnut, CA 91789, USA',
    website: 'https://vercel.com',
  },

  // Platform status
  status: (process.env.COMPANY_STATUS as 'pre-launch' | 'launched') || 'launched',
}

/** True quand l'identité légale du cabinet est entièrement renseignée. */
export function isCompanyRegistered(): boolean {
  return (
    companyIdentity.siret !== null &&
    companyIdentity.legalName !== null &&
    companyIdentity.address !== null
  )
}

/** URLs sociales non-nulles pour schema.org sameAs. */
export function getSocialLinks(): string[] {
  return Object.values(companyIdentity.social).filter(Boolean)
}
