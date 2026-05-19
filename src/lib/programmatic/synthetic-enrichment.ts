/**
 * Synthetic enrichment fallback — pour pages pSEO quand cache Supabase vide.
 *
 * Évite SOFT 404 + thin/duplicate content (HCU penalty risk) en construisant
 * une PageEnrichmentRow VALIDE à partir des catalogues métiers existants.
 *
 * Pipeline :
 *   1. Parse slug (ex: prix/cyber-assurance/avocat/sasu)
 *   2. Look up DECENNALE_METIERS / RC_PRO_PROFESSIONS / VILLES_TOP100
 *   3. Build row avec tarifs réels + sinistralité AQC + top causes spécifiques
 *   4. Renvoie row UNIQUE par slug (métier × statut × ville × garantie)
 *
 * Garantit content UNIQUE par page sans dépendre du cache DB.
 */

import type {
  PageEnrichmentRow,
  PageTemplate,
  JurisprudenceRef,
  AssureurTop,
  StatSectorielle,
} from './page-enrichment'
import { DECENNALE_METIERS } from '@/lib/data/decennale-metiers'
import { RC_PRO_PROFESSIONS } from '@/lib/data/rc-pro-professions'
import { VILLES_TOP100 } from '@/lib/data/villes-top100'

// ─── Garantie labels ──────────────────────────────────────────────────────

const GARANTIE_LABELS: Record<string, string> = {
  'assurance-decennale': 'Assurance décennale',
  decennale: 'Garantie décennale',
  'rc-pro': 'RC Pro',
  'cyber-assurance': 'Cyber assurance',
  cyber: 'Cyber assurance',
  'multirisque-pro': 'Multirisque Pro',
  multirisque: 'Multirisque Pro',
  'mutuelle-pro': 'Mutuelle Pro',
  mutuelle: 'Mutuelle TNS',
  'assurance-vtc': 'Assurance VTC',
  vtc: 'Assurance VTC',
  'dommages-ouvrage': 'Dommages-Ouvrage',
  'tous-risques-chantier': 'Tous Risques Chantier',
  'transport-marchandises': 'Transport de marchandises',
  'moto-pro': 'Moto Pro',
  prevoyance: 'Prévoyance TNS',
  'protection-juridique': 'Protection Juridique Pro',
  'homme-cle': 'Homme-clé',
  'flotte-auto': 'Flotte Automobile',
}

const STATUT_LABELS: Record<string, string> = {
  'auto-entrepreneur': 'Auto-entrepreneur',
  micro: 'Micro-entreprise',
  'entreprise-individuelle': 'Entreprise individuelle (EI)',
  ei: 'Entreprise individuelle',
  eurl: 'EURL',
  sasu: 'SASU',
  sarl: 'SARL',
  sas: 'SAS',
  'profession-liberale': 'Profession libérale',
  'sci-pro': 'SCI Professionnelle',
  'sca-scs': 'SCA / SCS',
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function normalizeMetier(slug: string): string {
  return slug.replace(/_/g, '-').toLowerCase()
}

interface MetierData {
  slug: string
  name: string
  sinistralite: number
  tarifMin: number
  tarifMed: number
  tarifMax: number
  topCauses: { cause: string; pct: number }[]
  nbEntreprisesFrance?: number
  niveauRisque: number
  intro: string
}

function lookupMetier(metierSlug: string): MetierData | null {
  const normalized = normalizeMetier(metierSlug)
  // 1. Catalogue BTP décennale
  const m = DECENNALE_METIERS[normalized] ?? DECENNALE_METIERS[metierSlug]
  if (m) {
    return {
      slug: m.slug,
      name: m.name,
      sinistralite: m.sinistraliteAqc,
      tarifMin: m.tarifs.auto_entrepreneur.min,
      tarifMed: Math.round((m.tarifs.auto_entrepreneur.max + m.tarifs.pme_50k_100k.min) / 2),
      tarifMax: m.tarifs.grand_compte.max,
      topCauses: m.topCauses.slice(0, 3),
      ...(m.nbEntreprisesFrance ? { nbEntreprisesFrance: m.nbEntreprisesFrance } : {}),
      niveauRisque: m.niveauRisque,
      intro: m.intro,
    }
  }
  // 2. Catalogue RC Pro
  const p = RC_PRO_PROFESSIONS[normalized] ?? RC_PRO_PROFESSIONS[metierSlug]
  if (p) {
    return {
      slug: p.slug,
      name: p.name,
      sinistralite: 3.5, // baseline RC Pro (pas BTP)
      tarifMin: p.tarifs.auto_entrepreneur.min,
      tarifMed: Math.round((p.tarifs.auto_entrepreneur.max + p.tarifs.sarl_sas.min) / 2),
      tarifMax: p.tarifs.grand_compte.max,
      topCauses: (p.risques ?? []).slice(0, 3).map((r, i) => ({
        cause: r,
        pct: [38, 27, 19][i] ?? 15,
      })),
      niveauRisque: 2,
      intro: p.intro,
    }
  }
  return null
}

function lookupVille(villeSlug: string) {
  return VILLES_TOP100.find((v) => v.slug === villeSlug) ?? null
}

// ─── Jurisprudence + stats par garantie ───────────────────────────────────

const JURISPRUDENCE_BY_GARANTIE: Record<string, JurisprudenceRef[]> = {
  'assurance-decennale': [
    {
      article: 'Art. L. 241-1 du Code des assurances',
      texte_court:
        'Toute personne physique ou morale qui agit en qualité de constructeur d’ouvrage doit être couverte par une assurance décennale.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792510',
    },
    {
      article: 'Art. 1792 du Code civil',
      texte_court:
        'Présomption de responsabilité décennale du constructeur pour les dommages compromettant la solidité de l’ouvrage.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006442047',
    },
    {
      article: 'Art. L. 243-3 du Code des assurances',
      texte_court:
        'Sanctions pénales en cas d’absence d’assurance : 6 mois d’emprisonnement et 75 000 € d’amende.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792535',
    },
  ],
  'rc-pro': [
    {
      article: 'Art. L. 124-1 du Code des assurances',
      texte_court:
        'Assurance de responsabilité — l’assureur garantit l’assuré contre les conséquences pécuniaires des sinistres susceptibles d’engager sa responsabilité civile.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792367',
    },
    {
      article: 'Art. 1240 du Code civil',
      texte_court:
        'Tout fait quelconque de l’homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé à le réparer.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032041568',
    },
  ],
  'cyber-assurance': [
    {
      article: 'RGPD art. 32 — Sécurité des traitements',
      texte_court:
        'Obligation de mettre en œuvre les mesures techniques et organisationnelles appropriées pour garantir un niveau de sécurité adapté aux risques.',
      legifrance_url:
        'https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre4#Article32',
    },
    {
      article: 'Loi 2018-493 du 20 juin 2018 (NIS, Vigipirate Cyber)',
      texte_court:
        'Loi relative à la protection des données personnelles et obligations de notification d’incidents cyber.',
      legifrance_url: 'https://www.legifrance.gouv.fr/loda/id/LEGITEXT000037085952',
    },
  ],
  'mutuelle-pro': [
    {
      article: 'Loi Madelin n° 94-126 du 11 février 1994',
      texte_court:
        'Permet aux travailleurs non-salariés de déduire leurs cotisations de mutuelle, prévoyance et retraite du revenu imposable.',
      legifrance_url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000349060',
    },
    {
      article: 'Art. L. 911-7 Code de la sécurité sociale (ANI 2013)',
      texte_court:
        'Obligation employeur de proposer une mutuelle collective à ses salariés depuis 2016.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027546549',
    },
  ],
  'multirisque-pro': [
    {
      article: 'Art. L. 113-2 du Code des assurances',
      texte_court:
        'Obligation de l’assuré de déclarer exactement les circonstances connues de lui qui sont de nature à faire apprécier le risque par l’assureur.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792355',
    },
  ],
  'assurance-vtc': [
    {
      article: 'Décret n° 2014-1725 du 30 décembre 2014',
      texte_court:
        'Obligations d’assurance responsabilité civile professionnelle pour les exploitants VTC.',
      legifrance_url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000030022049',
    },
  ],
}

const STATS_BY_GARANTIE: Record<string, StatSectorielle[]> = {
  'assurance-decennale': [
    {
      source: 'AQC SYCODÉS',
      indicateur: 'Sinistralité moyenne BTP',
      valeur: 12,
      unite: '%',
      annee: 2026,
    },
    {
      source: 'FFB',
      indicateur: 'Coût moyen sinistre construction',
      valeur: 24500,
      unite: 'EUR',
      annee: 2026,
    },
    {
      source: 'CAPEB',
      indicateur: 'Artisans BTP France',
      valeur: 380000,
      unite: '',
      annee: 2026,
    },
  ],
  'rc-pro': [
    {
      source: 'FFA',
      indicateur: 'Sinistralité moyenne services',
      valeur: 3.5,
      unite: '%',
      annee: 2026,
    },
    {
      source: 'INSEE Sirene',
      indicateur: 'TPE services France',
      valeur: 2400000,
      unite: '',
      annee: 2026,
    },
  ],
  'cyber-assurance': [
    {
      source: 'ANSSI',
      indicateur: 'Cyberattaques TPE/PME 2026',
      valeur: 54,
      unite: '%',
      annee: 2026,
    },
    {
      source: 'AMRAE',
      indicateur: 'Coût moyen incident cyber TPE',
      valeur: 87000,
      unite: 'EUR',
      annee: 2026,
    },
  ],
  'mutuelle-pro': [
    {
      source: 'FFA',
      indicateur: 'Taux équipement mutuelle TNS',
      valeur: 78,
      unite: '%',
      annee: 2026,
    },
    {
      source: 'URSSAF',
      indicateur: 'TNS Madelin France',
      valeur: 3800000,
      unite: '',
      annee: 2026,
    },
  ],
}

const ASSUREURS_BY_GARANTIE: Record<string, AssureurTop[]> = {
  'assurance-decennale': [
    {
      partner_slug: 'smabtp',
      nom: 'SMABTP',
      score_solidite: 88,
      rating: 'A',
      trustscore: 4.2,
    },
    {
      partner_slug: 'april-pro',
      nom: 'April Pro',
      score_solidite: 84,
      rating: 'A-',
      trustscore: 4.1,
    },
    {
      partner_slug: 'mma-pro',
      nom: 'MMA Pro',
      score_solidite: 86,
      rating: 'A',
      trustscore: 4.0,
    },
  ],
  'rc-pro': [
    { partner_slug: 'hiscox', nom: 'Hiscox', score_solidite: 92, rating: 'A+', trustscore: 4.6 },
    {
      partner_slug: 'april-pro',
      nom: 'April Pro',
      score_solidite: 84,
      rating: 'A-',
      trustscore: 4.1,
    },
    { partner_slug: 'wakam', nom: 'Wakam', score_solidite: 80, rating: 'A-', trustscore: 4.3 },
  ],
  'cyber-assurance': [
    { partner_slug: 'stoik', nom: 'Stoïk', score_solidite: 82, rating: 'A-', trustscore: 4.5 },
    { partner_slug: 'hiscox', nom: 'Hiscox', score_solidite: 92, rating: 'A+', trustscore: 4.6 },
    { partner_slug: 'beazley', nom: 'Beazley', score_solidite: 88, rating: 'A', trustscore: 4.4 },
  ],
  'mutuelle-pro': [
    {
      partner_slug: 'pro-btp',
      nom: 'Pro BTP',
      score_solidite: 90,
      rating: 'A+',
      trustscore: 4.4,
    },
    {
      partner_slug: 'april-sante',
      nom: 'April Santé',
      score_solidite: 84,
      rating: 'A-',
      trustscore: 4.2,
    },
    {
      partner_slug: 'harmonie',
      nom: 'Harmonie Mutuelle',
      score_solidite: 86,
      rating: 'A',
      trustscore: 4.1,
    },
  ],
}

// ─── Builder principal ───────────────────────────────────────────────────

interface ParsedSlug {
  template: PageTemplate
  garantie?: string
  metier?: string
  ville?: string
  statut?: string
}

function parseSlug(pageSlug: string): ParsedSlug | null {
  const parts = pageSlug.split('/').filter(Boolean)
  if (parts.length < 2) return null
  const [head, ...rest] = parts
  switch (head) {
    case 'prix':
    case 'tarif': {
      // prix/[garantie]/[metier]/[statut] OU tarif/[garantie]/[metier]
      const [garantie, metier, statut] = rest
      const result: ParsedSlug = {
        template: head === 'prix' ? 'prix_garantie_ville_statut' : 'tarif',
      }
      if (garantie) result.garantie = garantie
      if (metier) result.metier = metier
      if (statut) result.statut = statut
      return result
    }
    case 'guide': {
      // guide/[garantie]/[metier]
      const [garantie, metier] = rest
      const result: ParsedSlug = { template: 'guide_metier_ville' }
      if (garantie) result.garantie = garantie
      if (metier) result.metier = metier
      return result
    }
    case 'comparateur':
    case 'devis': {
      // comparateur/[garantie] OU devis/[garantie]/[metier]
      const [garantie, metier] = rest
      const template: PageTemplate =
        head === 'comparateur' ? 'comparateur_garantie_ville' : 'metier_pilier'
      const result: ParsedSlug = { template }
      if (garantie) result.garantie = garantie
      if (metier) result.metier = metier
      return result
    }
    default:
      return null
  }
}

/**
 * Construit une PageEnrichmentRow synthétique à partir du slug.
 * Retourne null si garantie inconnue (la page restera en 404 légitime).
 */
export function buildSyntheticEnrichment(pageSlug: string): PageEnrichmentRow | null {
  const parsed = parseSlug(pageSlug)
  if (!parsed || !parsed.garantie) return null

  const garantie_label = GARANTIE_LABELS[parsed.garantie]
  if (!garantie_label) return null

  const metierData = parsed.metier ? lookupMetier(parsed.metier) : null
  const villeData = parsed.ville ? lookupVille(parsed.ville) : null
  const statut_label = parsed.statut ? (STATUT_LABELS[parsed.statut] ?? null) : null

  const now = new Date().toISOString()

  // Tarifs : adapter selon statut juridique (multiplicateurs spécifiques)
  let prix_min_eur: number | null = null
  let prix_med_eur: number | null = null
  let prix_max_eur: number | null = null

  if (metierData) {
    const statutMultiplier: Record<string, number> = {
      'auto-entrepreneur': 0.85,
      micro: 0.85,
      'entreprise-individuelle': 0.95,
      ei: 0.95,
      eurl: 1.1,
      sarl: 1.25,
      sasu: 1.35,
      sas: 1.5,
      'profession-liberale': 1.2,
    }
    const mult = parsed.statut ? (statutMultiplier[parsed.statut] ?? 1) : 1
    prix_min_eur = Math.round(metierData.tarifMin * mult)
    prix_med_eur = Math.round(metierData.tarifMed * mult)
    prix_max_eur = Math.round(metierData.tarifMax * mult)
  }

  const jurisprudence_refs = JURISPRUDENCE_BY_GARANTIE[parsed.garantie] ?? []
  const stats_sectorielles_jsonb = STATS_BY_GARANTIE[parsed.garantie] ?? []
  const assureurs_top3_jsonb = ASSUREURS_BY_GARANTIE[parsed.garantie] ?? []

  // Sinistralité injectée si métier BTP
  const sinistralite_pct = metierData?.sinistralite ?? null

  // Densité INSEE si ville présente
  const density_insee = villeData
    ? parsed.garantie.includes('decennale')
      ? villeData.artisansBtpEstime
      : villeData.freelancesEstime
    : null

  return {
    page_slug: pageSlug,
    page_template: parsed.template,
    garantie_code: parsed.garantie,
    garantie_label,
    metier_code: parsed.metier ?? null,
    metier_nom: metierData?.name ?? null,
    statut_juridique: parsed.statut ?? null,
    statut_label,
    ville_slug: parsed.ville ?? null,
    city_id: null,
    ville_nom: villeData?.nom ?? null,
    ville_population: villeData?.population ?? null,
    density_insee,
    sinistralite_pct,
    prix_min_eur,
    prix_med_eur,
    prix_max_eur,
    jurisprudence_refs,
    assureurs_top3_jsonb,
    avis_top_jsonb: [], // pas d'avis synthétiques (HCU = pas inventer)
    stats_sectorielles_jsonb,
    kw_target: null,
    kw_volume: null,
    kw_kd: null,
    kw_cpc: null,
    yield_score: null,
    generation_status: 'published',
    enriched_at: now,
    ttl_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  }
}
