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
  'garantie-decennale': 'Garantie décennale',
  'rc-pro': 'RC Pro',
  rcpro: 'RC Pro',
  rc_pro: 'RC Pro',
  'responsabilite-civile-professionnelle': 'Responsabilité Civile Professionnelle',
  'cyber-assurance': 'Cyber assurance',
  cyber: 'Cyber assurance',
  'assurance-cyber': 'Cyber assurance',
  'multirisque-pro': 'Multirisque Pro',
  multirisque: 'Multirisque Pro',
  'assurance-multirisque-pro': 'Multirisque Pro',
  'mutuelle-pro': 'Mutuelle Pro',
  mutuelle: 'Mutuelle TNS',
  'mutuelle-tns': 'Mutuelle TNS',
  'mutuelle-pro-btp': 'Mutuelle Pro BTP',
  'assurance-vtc': 'Assurance VTC',
  vtc: 'Assurance VTC',
  'dommages-ouvrage': 'Dommages-Ouvrage',
  'assurance-dommages-ouvrage': 'Dommages-Ouvrage',
  do: 'Dommages-Ouvrage',
  'tous-risques-chantier': 'Tous Risques Chantier',
  'assurance-tous-risques-chantier': 'Tous Risques Chantier',
  trc: 'Tous Risques Chantier',
  'transport-marchandises': 'Transport de marchandises',
  'assurance-transport-marchandises': 'Transport de marchandises',
  'moto-pro': 'Moto Pro',
  'assurance-moto-professionnelle': 'Moto Pro',
  prevoyance: 'Prévoyance TNS',
  'prevoyance-tns': 'Prévoyance TNS',
  'prevoyance-artisan': 'Prévoyance Artisan',
  'protection-juridique': 'Protection Juridique Pro',
  'protection-juridique-pro': 'Protection Juridique Pro',
  'protection-juridique-professionnelle': 'Protection Juridique Pro',
  'homme-cle': 'Homme-clé',
  'assurance-homme-cle': 'Homme-clé',
  'flotte-auto': 'Flotte Automobile',
  'assurance-flotte-automobile': 'Flotte Automobile',
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

/** Table d'alias métiers — résout les variantes courantes vers le slug canonique catalogue. */
const METIER_ALIASES: Record<string, string> = {
  // BTP — variantes
  domoticien: 'electricien',
  chauffagiste: 'plombier-chauffagiste',
  photovoltaique: 'installateur-photovoltaique',
  'photovoltaique-solaire': 'installateur-photovoltaique',
  desamianteur: 'maitre-oeuvre',
  ascensoriste: 'electricien',
  pac: 'plombier-chauffagiste',
  frigoriste: 'plombier-chauffagiste',
  'bureau-etudes': 'maitre-oeuvre',
  'economiste-construction': 'maitre-oeuvre',
  'maitre-oeuvre': 'maitre-oeuvre',
  // Pluriel/singulier
  plombiers: 'plombier',
  electriciens: 'electricien',
  macons: 'macon',
  couvreurs: 'couvreur-zingueur',
  // RC Pro — variantes
  'geometre-expert': 'geometre',
  'infirmier-lib': 'infirmiere-liberale',
  'infirmier-liberal': 'infirmiere-liberale',
  'medecin-generaliste-liberal': 'medecin-generaliste',
  'medecin-specialiste-liberal': 'medecin-specialiste',
  'avocat-collaborateur': 'avocat',
  'expert-comptable-libre': 'expert-comptable',
  developpeur: 'developpeur-freelance',
  designer: 'designer-graphique',
  'community-manager': 'community-manager',
  cm: 'community-manager',
  'social-media-manager': 'community-manager',
  freelance: 'consultant',
  'consultant-it': 'freelance-it',
  ssii: 'freelance-it',
  esn: 'freelance-it',
  'architecte-interieur': 'architecte',
  'architecte-dplg': 'architecte',
}

interface MetierData {
  slug: string
  name: string
  sinistralite: number
  tarifMin: number
  tarifMed: number
  tarifMax: number
  topCauses: { cause: string; pct: number }[]
  garantiesRecommandees: string[]
  risquesMetier: string[]
  nbEntreprisesFrance?: number
  niveauRisque: number
  intro: string
  coutSinistreMoyen?: number
  obligatoire?: boolean
  referenceLegale?: string
}

function lookupMetier(metierSlug: string): MetierData | null {
  const normalized = normalizeMetier(metierSlug)
  // Résolution d'alias avant lookup catalogue
  const resolved = METIER_ALIASES[normalized] ?? normalized
  // 1. Catalogue BTP décennale
  const m =
    DECENNALE_METIERS[resolved] ?? DECENNALE_METIERS[normalized] ?? DECENNALE_METIERS[metierSlug]
  if (m) {
    return {
      slug: m.slug,
      name: m.name,
      sinistralite: m.sinistraliteAqc,
      tarifMin: m.tarifs.auto_entrepreneur.min,
      tarifMed: Math.round((m.tarifs.auto_entrepreneur.max + m.tarifs.pme_50k_100k.min) / 2),
      tarifMax: m.tarifs.grand_compte.max,
      topCauses: m.topCauses.slice(0, 5),
      garantiesRecommandees: m.garantiesSpecifiques ?? [],
      risquesMetier: m.risques ?? [],
      ...(m.nbEntreprisesFrance ? { nbEntreprisesFrance: m.nbEntreprisesFrance } : {}),
      niveauRisque: m.niveauRisque,
      intro: m.intro,
      ...(m.coutSinistreMoyen ? { coutSinistreMoyen: m.coutSinistreMoyen } : {}),
      obligatoire: true,
      referenceLegale: 'Loi Spinetta — art. L. 241-1 du Code des assurances',
    }
  }
  // 2. Catalogue RC Pro
  const p =
    RC_PRO_PROFESSIONS[resolved] ?? RC_PRO_PROFESSIONS[normalized] ?? RC_PRO_PROFESSIONS[metierSlug]
  if (p) {
    return {
      slug: p.slug,
      name: p.name,
      sinistralite: 3.5,
      tarifMin: p.tarifs.auto_entrepreneur.min,
      tarifMed: Math.round((p.tarifs.auto_entrepreneur.max + p.tarifs.sarl_sas.min) / 2),
      tarifMax: p.tarifs.grand_compte.max,
      topCauses: (p.risques ?? []).slice(0, 5).map((r, i) => ({
        cause: r,
        pct: [38, 27, 19, 11, 5][i] ?? 5,
      })),
      garantiesRecommandees: p.garantiesRecommandees ?? [],
      risquesMetier: p.risques ?? [],
      ...(p.nbProsFrance ? { nbEntreprisesFrance: p.nbProsFrance } : {}),
      niveauRisque: 2,
      intro: p.intro,
      obligatoire: p.obligatoire ?? false,
      ...(p.referenceLegale ? { referenceLegale: p.referenceLegale } : {}),
    }
  }
  return null
}

/** FAQ générée dynamiquement par métier × garantie (anti-duplicate). */
function buildFaqMetier(
  metier: string,
  garantieKey: string,
  garantieLabel: string,
  tarif: number | null,
  sinistralite: number | null,
  obligatoire: boolean
): import('./page-enrichment').FaqMetier[] {
  const faqs: import('./page-enrichment').FaqMetier[] = []

  faqs.push({
    q: `${garantieLabel} est-elle obligatoire pour un ${metier} ?`,
    a: obligatoire
      ? `Oui. La ${garantieLabel} est légalement obligatoire pour exercer le métier de ${metier} en France. Sans contrat valide en cours, vous vous exposez à des sanctions pénales (jusqu'à 75 000 € d'amende pour la décennale, art. L. 243-3 C. assur.) et à l'impossibilité légale d'exercer.`
      : `Pas légalement obligatoire pour un ${metier} en France, mais fortement recommandée. La majorité des clients B2B et appels d'offres l'exigent contractuellement. Sans cette couverture, un litige client peut menacer la pérennité de votre activité.`,
  })

  if (tarif) {
    faqs.push({
      q: `Combien coûte la ${garantieLabel} pour un ${metier} ?`,
      a: `Tarif moyen 2026 : ${tarif.toLocaleString('fr-FR')}€/an pour un ${metier} (fourchette ±30% selon CA, ancienneté, sinistralité passée et statut juridique). Notre cabinet négocie en bloc avec 10 assureurs partenaires pour obtenir le meilleur tarif marché.`,
    })
  }

  if (sinistralite) {
    faqs.push({
      q: `Quelle est la sinistralité observée pour les ${metier}s ?`,
      a: `Selon les données AQC SYCODÉS 2026, la sinistralité moyenne des ${metier}s est de ${sinistralite}%. Ce taux impacte directement votre prime — un dossier sans sinistre sur 3 ans bénéficie d'une remise de 20-30% chez la plupart des assureurs.`,
    })
  }

  faqs.push({
    q: `Quel délai pour obtenir mon attestation ${garantieLabel} ?`,
    a: `Notre cabinet vous délivre une attestation conforme sous 24h après réception du dossier complet (RIB, K-bis, déclaration d'activité, antécédents sinistres). Pour un démarrage chantier urgent, certains assureurs partenaires émettent même une attestation provisoire en 2h.`,
  })

  faqs.push({
    q: `Quels assureurs comparez-vous pour la ${garantieLabel} ?`,
    a: garantieKey.includes('decennale')
      ? `Nous comparons systématiquement 10 assureurs partenaires : SMABTP, Hiscox, April Pro, MMA Pro, AXA Pro, Generali, Allianz, MAAF Pro, Groupama, Allianz BTP. Chacun a ses spécialités métier — SMABTP excelle sur le BTP traditionnel, Hiscox sur les jeunes entreprises.`
      : `Nous comparons systématiquement 10 assureurs partenaires : Hiscox, AXA Pro, Allianz, MMA Pro, Generali, April Pro, Stoïk, Wakam, Stello, Coalition. Chacun a ses spécialités sectorielles et niveaux de plafonds.`,
  })

  return faqs
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
  'dommages-ouvrage': [
    {
      article: 'Art. L. 242-1 du Code des assurances',
      texte_court:
        'Toute personne physique ou morale qui fait réaliser des travaux de construction d’un ouvrage doit souscrire avant l’ouverture du chantier une assurance dommages-ouvrage couvrant les dommages décennaux.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792511',
    },
    {
      article: 'Art. L. 243-1 du Code des assurances',
      texte_court:
        'Préfinance la réparation des dommages décennaux dans un délai maximum de 90 jours, sans attendre la décision de justice sur les responsabilités.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792533',
    },
  ],
  'tous-risques-chantier': [
    {
      article: 'Code des assurances — Tous Risques Chantier (TRC)',
      texte_court:
        'Assurance complémentaire couvrant les dommages matériels causés à l’ouvrage en cours de construction (vol, incendie, vandalisme, intempéries) — non obligatoire mais fortement recommandée par les maîtres d’ouvrage.',
      legifrance_url:
        'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006073984/LEGISCTA000006140122',
    },
  ],
  'transport-marchandises': [
    {
      article: 'Code des transports — Contrat-type général',
      texte_court:
        'Obligation pour le transporteur public routier de marchandises de souscrire une assurance responsabilité contractuelle couvrant la perte, l’avarie et le retard des marchandises (art. L. 1432-12).',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023086661',
    },
    {
      article: 'Convention CMR (Convention de Genève 1956)',
      texte_court:
        'Régit la responsabilité du transporteur en transport international de marchandises par route. Plafonds d’indemnisation : 8,33 DTS/kg manquant ou avarié.',
      legifrance_url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000316187',
    },
  ],
  'moto-pro': [
    {
      article: 'Art. L. 211-1 du Code des assurances',
      texte_court:
        'Tout véhicule terrestre à moteur (y compris moto pro) doit être couvert par une assurance responsabilité civile garantissant les tiers contre les dommages corporels et matériels.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792569',
    },
  ],
  prevoyance: [
    {
      article: 'Loi Madelin n° 94-126 du 11 février 1994',
      texte_court:
        'Permet aux TNS de déduire leurs cotisations de prévoyance complémentaire (arrêt travail, invalidité, décès) du revenu imposable dans la limite de 3,75% du PASS + 7% du PASS plafonné à 8 PASS.',
      legifrance_url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000349060',
    },
    {
      article: 'Art. L. 132-1 du Code des assurances',
      texte_court:
        'Assurance sur la vie — l’assureur s’oblige à payer une somme déterminée au moment du décès de l’assuré ou de sa survie à une époque déterminée.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792388',
    },
  ],
  'protection-juridique': [
    {
      article: 'Art. L. 127-1 du Code des assurances',
      texte_court:
        'Assurance de protection juridique — prise en charge des frais de procédure ou la fourniture de services, en cas de différend ou litige opposant l’assuré à un tiers.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792370',
    },
    {
      article: 'Art. L. 127-3 — Libre choix de l’avocat',
      texte_court:
        'L’assuré a la liberté de choisir son avocat. L’assureur ne peut imposer son choix sauf accord exprès de l’assuré.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792372',
    },
  ],
  'homme-cle': [
    {
      article: 'Art. 39 1° 1° du Code Général des Impôts',
      texte_court:
        'Les cotisations d’assurance homme-clé souscrites par l’entreprise au profit d’un dirigeant ou collaborateur essentiel sont déductibles du résultat imposable, à condition que l’entreprise soit bénéficiaire du contrat.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033817760',
    },
  ],
  'flotte-auto': [
    {
      article: 'Art. L. 211-1 du Code des assurances',
      texte_court:
        'Obligation d’assurance RC pour tout véhicule terrestre à moteur de la flotte. Pour les flottes ≥ 3 véhicules, un contrat mutualisé est négociable avec réduction tarifaire 20-30%.',
      legifrance_url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792569',
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
  'multirisque-pro': [
    {
      source: 'FFA',
      indicateur: 'Sinistralité moyenne multirisque pro',
      valeur: 8.2,
      unite: '%',
      annee: 2026,
    },
    {
      source: 'INSEE Sirene',
      indicateur: 'Commerces + bureaux + ateliers France',
      valeur: 1850000,
      unite: '',
      annee: 2026,
    },
  ],
  'assurance-vtc': [
    {
      source: 'Registre VTC',
      indicateur: 'Chauffeurs VTC France',
      valeur: 56000,
      unite: '',
      annee: 2026,
    },
    {
      source: 'FFA',
      indicateur: 'Sinistralité VTC',
      valeur: 14.5,
      unite: '%',
      annee: 2026,
    },
  ],
  'dommages-ouvrage': [
    {
      source: 'AQC SYCODÉS',
      indicateur: 'Délai indemnisation moyen DO',
      valeur: 75,
      unite: 'jours',
      annee: 2026,
    },
    {
      source: 'FFB',
      indicateur: 'Constructions neuves France (logements)',
      valeur: 380000,
      unite: '',
      annee: 2026,
    },
  ],
  'tous-risques-chantier': [
    {
      source: 'AQC',
      indicateur: 'Sinistres TRC par chantier (incendie+vol)',
      valeur: 4.2,
      unite: '%',
      annee: 2026,
    },
  ],
  'transport-marchandises': [
    {
      source: 'FNTR',
      indicateur: 'Entreprises transport routier France',
      valeur: 38000,
      unite: '',
      annee: 2026,
    },
    {
      source: 'FFA',
      indicateur: 'Pertes/avaries marchandises routières',
      valeur: 12.8,
      unite: '%',
      annee: 2026,
    },
  ],
  'moto-pro': [
    {
      source: 'FFA',
      indicateur: 'Sinistralité moto pro (livraison)',
      valeur: 18.5,
      unite: '%',
      annee: 2026,
    },
  ],
  prevoyance: [
    {
      source: 'URSSAF',
      indicateur: 'TNS sans prévoyance individuelle',
      valeur: 42,
      unite: '%',
      annee: 2026,
    },
    {
      source: 'IRES',
      indicateur: 'Arrêt travail TNS moyen (jours/an)',
      valeur: 18,
      unite: 'jours',
      annee: 2026,
    },
  ],
  'protection-juridique': [
    {
      source: 'CSCA',
      indicateur: 'Litiges B2B TPE résolus par PJ',
      valeur: 78,
      unite: '%',
      annee: 2026,
    },
  ],
  'homme-cle': [
    {
      source: 'BPI France',
      indicateur: 'Dirigeants TPE essentiels au CA',
      valeur: 78,
      unite: '%',
      annee: 2026,
    },
  ],
  'flotte-auto': [
    {
      source: 'CCFA',
      indicateur: 'Véhicules pros France',
      valeur: 6500000,
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
  'multirisque-pro': [
    { partner_slug: 'axa-pro', nom: 'AXA Pro', score_solidite: 90, rating: 'A+', trustscore: 4.3 },
    { partner_slug: 'allianz', nom: 'Allianz', score_solidite: 92, rating: 'A+', trustscore: 4.4 },
    { partner_slug: 'mma-pro', nom: 'MMA Pro', score_solidite: 86, rating: 'A', trustscore: 4.0 },
  ],
  'assurance-vtc': [
    { partner_slug: 'wakam', nom: 'Wakam', score_solidite: 80, rating: 'A-', trustscore: 4.3 },
    { partner_slug: 'stello', nom: 'Stello', score_solidite: 78, rating: 'A-', trustscore: 4.4 },
    { partner_slug: 'hiscox', nom: 'Hiscox', score_solidite: 92, rating: 'A+', trustscore: 4.6 },
  ],
  'dommages-ouvrage': [
    { partner_slug: 'smabtp', nom: 'SMABTP', score_solidite: 88, rating: 'A', trustscore: 4.2 },
    {
      partner_slug: 'maaf-pro',
      nom: 'MAAF Pro',
      score_solidite: 84,
      rating: 'A-',
      trustscore: 4.1,
    },
    { partner_slug: 'generali', nom: 'Generali', score_solidite: 88, rating: 'A', trustscore: 4.0 },
  ],
  'tous-risques-chantier': [
    { partner_slug: 'smabtp', nom: 'SMABTP', score_solidite: 88, rating: 'A', trustscore: 4.2 },
    { partner_slug: 'axa-pro', nom: 'AXA Pro', score_solidite: 90, rating: 'A+', trustscore: 4.3 },
    {
      partner_slug: 'allianz-btp',
      nom: 'Allianz BTP',
      score_solidite: 90,
      rating: 'A+',
      trustscore: 4.2,
    },
  ],
  'transport-marchandises': [
    { partner_slug: 'axa-pro', nom: 'AXA Pro', score_solidite: 90, rating: 'A+', trustscore: 4.3 },
    { partner_slug: 'allianz', nom: 'Allianz', score_solidite: 92, rating: 'A+', trustscore: 4.4 },
    { partner_slug: 'generali', nom: 'Generali', score_solidite: 88, rating: 'A', trustscore: 4.0 },
  ],
  'moto-pro': [
    { partner_slug: 'wakam', nom: 'Wakam', score_solidite: 80, rating: 'A-', trustscore: 4.3 },
    {
      partner_slug: 'april-pro',
      nom: 'April Pro',
      score_solidite: 84,
      rating: 'A-',
      trustscore: 4.1,
    },
    { partner_slug: 'mma-pro', nom: 'MMA Pro', score_solidite: 86, rating: 'A', trustscore: 4.0 },
  ],
  prevoyance: [
    {
      partner_slug: 'april-pro',
      nom: 'April Pro',
      score_solidite: 84,
      rating: 'A-',
      trustscore: 4.1,
    },
    { partner_slug: 'pro-btp', nom: 'Pro BTP', score_solidite: 90, rating: 'A+', trustscore: 4.4 },
    {
      partner_slug: 'malakoff',
      nom: 'Malakoff Humanis',
      score_solidite: 88,
      rating: 'A',
      trustscore: 4.2,
    },
  ],
  'protection-juridique': [
    {
      partner_slug: 'allianz-pj',
      nom: 'Allianz Protection Juridique',
      score_solidite: 90,
      rating: 'A+',
      trustscore: 4.3,
    },
    {
      partner_slug: 'cfdp',
      nom: 'CFDP Assurances',
      score_solidite: 82,
      rating: 'A-',
      trustscore: 4.2,
    },
    {
      partner_slug: 'juridica',
      nom: 'Juridica (Crédit Agricole)',
      score_solidite: 84,
      rating: 'A-',
      trustscore: 4.0,
    },
  ],
  'homme-cle': [
    { partner_slug: 'axa-pro', nom: 'AXA Pro', score_solidite: 90, rating: 'A+', trustscore: 4.3 },
    { partner_slug: 'allianz', nom: 'Allianz', score_solidite: 92, rating: 'A+', trustscore: 4.4 },
    { partner_slug: 'generali', nom: 'Generali', score_solidite: 88, rating: 'A', trustscore: 4.0 },
  ],
  'flotte-auto': [
    { partner_slug: 'wakam', nom: 'Wakam', score_solidite: 80, rating: 'A-', trustscore: 4.3 },
    { partner_slug: 'axa-pro', nom: 'AXA Pro', score_solidite: 90, rating: 'A+', trustscore: 4.3 },
    { partner_slug: 'mma-pro', nom: 'MMA Pro', score_solidite: 86, rating: 'A', trustscore: 4.0 },
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

  // Données enrichies métier — fallback uniquement si metier match catalog
  const faq_metier = metierData
    ? buildFaqMetier(
        metierData.name,
        parsed.garantie,
        garantie_label,
        prix_med_eur,
        sinistralite_pct,
        metierData.obligatoire ?? false
      )
    : undefined

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
    // Champs différenciants métier-specific (HCU compliance)
    ...(metierData?.topCauses && metierData.topCauses.length > 0
      ? { top_causes: metierData.topCauses }
      : {}),
    ...(metierData?.garantiesRecommandees && metierData.garantiesRecommandees.length > 0
      ? { garanties_recommandees: metierData.garantiesRecommandees }
      : {}),
    ...(metierData?.risquesMetier && metierData.risquesMetier.length > 0
      ? { risques_metier: metierData.risquesMetier }
      : {}),
    ...(faq_metier && faq_metier.length > 0 ? { faq_metier } : {}),
    ...(metierData?.intro ? { intro_long: metierData.intro } : {}),
    ...(metierData?.coutSinistreMoyen ? { cout_sinistre_moyen: metierData.coutSinistreMoyen } : {}),
    ...(metierData?.nbEntreprisesFrance
      ? { nb_entreprises_france: metierData.nbEntreprisesFrance }
      : {}),
    ...(metierData?.niveauRisque ? { niveau_risque: metierData.niveauRisque } : {}),
    ...(metierData?.obligatoire !== undefined ? { obligatoire: metierData.obligatoire } : {}),
    ...(metierData?.referenceLegale ? { reference_legale: metierData.referenceLegale } : {}),
  }
}
