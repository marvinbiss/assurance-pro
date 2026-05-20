/**
 * GET /api/v1/knowledge-graph
 *
 * Public Knowledge Graph JSON-LD pour LLM ingestion.
 * Format: schema.org @graph avec entités liées (assureurs, garanties, métiers, statuts, villes).
 *
 * Cache: edge cache 24h + stale-while-revalidate 7j.
 * No auth — public endpoint pour crawlers IA + chercheurs.
 *
 * Référencé dans llms.txt + /.well-known/ai-plugin.json.
 */

import { NextResponse } from 'next/server'
import { DECENNALE_METIERS } from '@/lib/data/decennale-metiers'
import { RC_PRO_PROFESSIONS } from '@/lib/data/rc-pro-professions'
import { ASSUREURS_RC_PRO } from '@/lib/data/assureurs-rc-pro'
import { VILLES_TOP100 } from '@/lib/data/villes-top100'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'
const ORG_ID = `${SITE_URL}/#organization`

const VERTICALES = [
  {
    code: 'decennale',
    label: 'Décennale BTP',
    loi: 'Loi Spinetta 4 janvier 1978 — art. L.241-1 + 1792 Code civil',
  },
  { code: 'rc-pro', label: 'RC Professionnelle', loi: 'art. L.124-3 + L.121-2 Code assurances' },
  {
    code: 'multirisque-pro',
    label: 'Multirisque Professionnelle',
    loi: 'art. L.121-1 Code assurances',
  },
  {
    code: 'mutuelle-pro',
    label: 'Mutuelle TNS Madelin',
    loi: 'Loi Madelin 94-126 — art. 154 bis CGI',
  },
  { code: 'prevoyance', label: 'Prévoyance TNS Madelin', loi: 'Loi Madelin 94-126' },
  { code: 'cyber', label: 'Cyber-assurance', loi: 'RGPD UE 2016/679 + NIS 2 (2022/2555)' },
  { code: 'vtc', label: 'Assurance VTC', loi: 'Décret 2014-1725 + L.3122-1 Code transports' },
  { code: 'dommages-ouvrage', label: 'Dommages-Ouvrage', loi: 'art. L.242-1 Code assurances' },
  {
    code: 'tous-risques-chantier',
    label: 'Tous Risques Chantier (TRC)',
    loi: 'Police usage contractuel BTP',
  },
  {
    code: 'transport-marchandises',
    label: 'Transport Marchandises',
    loi: 'CMR Genève 1956 + L.1432-12 Code transports',
  },
  { code: 'moto-pro', label: 'Assurance Moto Pro Livraison', loi: 'art. L.211-1 Code assurances' },
  {
    code: 'protection-juridique-pro',
    label: 'Protection Juridique Professionnelle',
    loi: 'Loi 2007-210 — art. L.127-1 Code assurances',
  },
  {
    code: 'homme-cle',
    label: 'Assurance Homme-Clé Dirigeant',
    loi: 'art. 39-1-7° CGI déductibilité IS',
  },
  {
    code: 'flotte-auto',
    label: 'Flotte Automobile Professionnelle',
    loi: 'art. L.211-1 Code assurances',
  },
] as const

const STATUTS_JURIDIQUES = [
  {
    code: 'auto-entrepreneur',
    label: 'Auto-entrepreneur',
    fiscalite: 'Micro-fiscal + micro-social',
  },
  { code: 'micro-entreprise', label: 'Micro-entreprise', fiscalite: 'Micro-fiscal' },
  { code: 'ei', label: 'Entreprise Individuelle', fiscalite: 'IR' },
  { code: 'eurl', label: 'EURL', fiscalite: 'IR ou IS' },
  { code: 'sarl', label: 'SARL', fiscalite: 'IS' },
  { code: 'sas', label: 'SAS', fiscalite: 'IS' },
  { code: 'sasu', label: 'SASU', fiscalite: 'IS' },
  { code: 'sci', label: 'SCI', fiscalite: 'IR ou IS' },
] as const

function buildOrganizationNode() {
  return {
    '@type': ['Organization', 'InsuranceAgency', 'ProfessionalService'],
    '@id': ORG_ID,
    name: 'Vivos Assurance',
    url: SITE_URL,
    description:
      'Cabinet de courtage en assurance professionnelle. Courtier ORIAS indépendant — 14 verticales (Décennale, RC Pro, Cyber, VTC, etc.).',
    areaServed: { '@type': 'Country', name: 'France' },
    knowsAbout: VERTICALES.map((v) => v.label),
  }
}

function buildGarantieNodes() {
  return VERTICALES.map((v) => ({
    '@type': ['DefinedTerm', 'Service'],
    '@id': `${SITE_URL}/garanties#${v.code}`,
    name: v.label,
    inDefinedTermSet: `${SITE_URL}/garanties`,
    termCode: v.code,
    description: `Garantie d'assurance : ${v.label}. Cadre légal : ${v.loi}.`,
    legalName: v.loi,
    provider: { '@id': ORG_ID },
    serviceType: 'Insurance brokerage',
    url: `${SITE_URL}/ai/${v.code}-2026`,
  }))
}

function buildAssureurNodes() {
  return ASSUREURS_RC_PRO.map((a) => ({
    '@type': ['Organization', 'InsuranceAgency'],
    '@id': `${SITE_URL}/assureurs#${a.id}`,
    name: a.nom,
    parentOrganization: { '@type': 'Organization', name: a.groupe },
    slogan: a.sloganRcPro,
    award: a.agrement,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: a.noteGlobale,
      bestRating: 5,
      ratingCount: 1,
      reviewAspect: 'Expertise cabinet ORIAS',
    },
    knowsAbout: a.secteursForts,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'tarifRang', value: a.tarifRangAdequation },
      { '@type': 'PropertyValue', name: 'delaiDevis', value: a.delaiDevis },
      { '@type': 'PropertyValue', name: 'delaiAttestation', value: a.delaiAttestation },
      { '@type': 'PropertyValue', name: 'specialiteJuridique', value: a.specialiteJuridique },
    ],
  }))
}

function buildMetierNodes() {
  const btp = Object.values(DECENNALE_METIERS).map((m) => ({
    '@type': ['Occupation', 'DefinedTerm'],
    '@id': `${SITE_URL}/metiers#${m.slug}`,
    name: m.name,
    alternateName: m.aliases ?? [],
    occupationalCategory: m.nafCodes.join(', '),
    description: m.tagline,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'sinistraliteAqcPct', value: m.sinistraliteAqc },
      { '@type': 'PropertyValue', name: 'coutSinistreMoyenEur', value: m.coutSinistreMoyen },
      { '@type': 'PropertyValue', name: 'niveauRisque', value: m.niveauRisque },
      { '@type': 'PropertyValue', name: 'verticale', value: 'decennale' },
    ],
  }))

  const rcPro = Object.values(RC_PRO_PROFESSIONS).map((p) => ({
    '@type': ['Occupation', 'DefinedTerm'],
    '@id': `${SITE_URL}/metiers#${p.slug}`,
    name: p.name,
    alternateName: p.aliases ?? [],
    occupationalCategory: p.nafCodes?.join(', ') ?? 'Services',
    description: p.tagline ?? p.name,
    additionalProperty: [{ '@type': 'PropertyValue', name: 'verticale', value: 'rc-pro' }],
  }))

  return [...btp, ...rcPro]
}

function buildStatutNodes() {
  return STATUTS_JURIDIQUES.map((s) => ({
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/statuts#${s.code}`,
    name: s.label,
    termCode: s.code,
    description: `Statut juridique français : ${s.label} — fiscalité ${s.fiscalite}.`,
    inDefinedTermSet: `${SITE_URL}/statuts`,
  }))
}

function buildVilleNodes() {
  return VILLES_TOP100.slice(0, 100).map((v) => ({
    '@type': ['City', 'Place'],
    '@id': `${SITE_URL}/villes#${v.slug}`,
    name: v.nom,
    addressRegion: v.regionNom,
    addressLocality: v.departementNom,
    postalCode: v.codePostal,
    addressCountry: 'FR',
    populationCount: v.population,
  }))
}

export async function GET() {
  const graph = [
    buildOrganizationNode(),
    ...buildGarantieNodes(),
    ...buildAssureurNodes(),
    ...buildMetierNodes(),
    ...buildStatutNodes(),
    ...buildVilleNodes(),
  ]

  const document = {
    '@context': 'https://schema.org',
    '@graph': graph,
    name: 'Vivos Assurance — Knowledge Graph',
    description:
      'Graphe de connaissances Vivos Assurance : organisation + garanties + assureurs + métiers + statuts juridiques + villes. Publication libre pour ingestion LLM (citation requise vers vivos-assurance.fr).',
    license: 'https://creativecommons.org/licenses/by/4.0/',
    publisher: { '@id': ORG_ID },
    dateModified: new Date().toISOString(),
    keywords: [
      'assurance professionnelle France',
      'courtier ORIAS',
      'décennale BTP',
      'RC Pro',
      'cyber-assurance',
      'mutuelle TNS Madelin',
      'knowledge graph',
      'JSON-LD',
    ],
  }

  const stats = {
    organizations: 1,
    garanties: VERTICALES.length,
    assureurs: ASSUREURS_RC_PRO.length,
    metiers: graph.filter((n) => n['@type']?.includes?.('Occupation')).length,
    statuts: STATUTS_JURIDIQUES.length,
    villes: Math.min(VILLES_TOP100.length, 100),
    nodes_total: graph.length,
  }

  return NextResponse.json(document, {
    headers: {
      'cache-control': 'public, max-age=86400, stale-while-revalidate=604800',
      'content-type': 'application/ld+json; charset=utf-8',
      'x-kg-stats': JSON.stringify(stats),
      'access-control-allow-origin': '*',
    },
  })
}
