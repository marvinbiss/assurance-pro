/**
 * Articles de blog Vivos Assurance
 * Données autorité E-E-A-T (auteur, date, sources légales).
 * Le corps est en JSX léger (string interpolation côté template).
 */

export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  author: string
  authorRole: string
  authorOrias?: string
  publishedAt: string
  updatedAt: string
  readTime: string
  comingSoon?: boolean
  sources: Array<{ label: string; url: string }>
  toc: Array<{ id: string; title: string }>
  body: BlogSection[]
}

export interface BlogSection {
  id: string
  h2: string
  paragraphs: string[]
  list?: { ordered?: boolean; items: string[] }
  callout?: { tone: 'info' | 'warning' | 'success'; text: string }
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  'loi-spinetta-2026-actualites': {
    slug: 'loi-spinetta-2026-actualites',
    title: 'Loi Spinetta 2026 : ce qui change pour les artisans BTP',
    description:
      'Décryptage des évolutions 2026 sur la garantie décennale : mention obligatoire sur devis et factures, contrôles ACPR renforcés, nouveautés AQC SYCODÉS.',
    category: 'BTP',
    tags: ['décennale', 'spinetta', 'btp', 'acpr'],
    author: 'Cabinet Vivos Assurance',
    authorRole: 'Courtier ORIAS spécialiste BTP',
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    readTime: '6 min',
    sources: [
      {
        label: 'Loi n° 78-12 du 4 janvier 1978 (Spinetta) — Légifrance',
        url: 'https://www.legifrance.gouv.fr/',
      },
      {
        label: 'Code des assurances — art. L. 241-1',
        url: 'https://www.legifrance.gouv.fr/',
      },
      {
        label: 'AQC SYCODÉS — Sinistralité décennale 2024',
        url: 'https://qualiteconstruction.com/observatoire/sycodes/',
      },
      {
        label: 'ACPR — Recommandations 2024',
        url: 'https://acpr.banque-france.fr/',
      },
    ],
    toc: [
      { id: 'rappel', title: "1. Rappel : ce qu'impose la Loi Spinetta" },
      { id: 'devis-factures', title: '2. Mention obligatoire sur devis et factures' },
      { id: 'controles-acpr', title: '3. Contrôles ACPR renforcés en 2026' },
      { id: 'sinistralite', title: '4. Sinistralité 2024 — chiffres AQC' },
      { id: 'comment-rester-en-regle', title: '5. Comment rester en règle' },
    ],
    body: [
      {
        id: 'rappel',
        h2: "1. Rappel : ce qu'impose la Loi Spinetta",
        paragraphs: [
          "La Loi Spinetta du 4 janvier 1978, codifiée à l'article L. 241-1 du Code des assurances, impose à tout constructeur (entreprise BTP, artisan, auto-entrepreneur, architecte) de souscrire avant le démarrage du chantier une assurance couvrant sa responsabilité décennale.",
          "La couverture s'étend sur 10 ans à compter de la réception des travaux et concerne les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination (art. 1792 C. civ.).",
        ],
        callout: {
          tone: 'warning',
          text: "Sanctions en cas d'absence : 75 000 € d'amende, 6 mois d'emprisonnement, interdiction d'exercer.",
        },
      },
      {
        id: 'devis-factures',
        h2: '2. Mention obligatoire sur devis et factures',
        paragraphs: [
          "Depuis 2024, l'attestation décennale doit être mentionnée sur tous vos devis et factures clients. La mention doit comporter :",
        ],
        list: {
          items: [
            "Nom de l'assureur",
            'Numéro du contrat / police',
            'Période de validité',
            'Zone géographique couverte',
            'Activités couvertes',
          ],
        },
      },
      {
        id: 'controles-acpr',
        h2: '3. Contrôles ACPR renforcés en 2026',
        paragraphs: [
          "L'ACPR a publié en 2024 deux recommandations qui durcissent les obligations des distributeurs :",
          'La Recommandation 2024-R-02 (réclamations) impose un accusé de réception sous 10 jours ouvrés et une réponse au fond sous 2 mois maximum.',
          'La Recommandation 2024-R-03 (devoir de conseil) impose une traçabilité écrite et immuable du conseil délivré : exigences/besoins, motivation du choix, alternatives examinées.',
        ],
      },
      {
        id: 'sinistralite',
        h2: '4. Sinistralité 2024 — chiffres AQC',
        paragraphs: [
          "D'après l'Agence Qualité Construction (observatoire SYCODÉS), les principaux postes de sinistralité décennale 2024 sont :",
        ],
        list: {
          items: [
            'Couverture / étanchéité — 28 % des sinistres',
            'Maçonnerie / fissures structurelles — 22 %',
            'Plomberie / dégâts des eaux — 14 %',
            'Électricité / mise aux normes — 9 %',
            'Façade / ITE — 8 %',
          ],
        },
      },
      {
        id: 'comment-rester-en-regle',
        h2: '5. Comment rester en règle',
        paragraphs: ['Trois actions concrètes pour 2026 :'],
        list: {
          ordered: true,
          items: [
            "Vérifier que l'attestation est à jour et conforme (zones, activités déclarées, plafonds).",
            'Mettre à jour vos modèles de devis/factures pour intégrer le pavé décennale obligatoire.',
            'Conserver les écrits du courtier (recommandation motivée DDA art. L. 521-4) pour preuve en cas de contrôle ACPR.',
          ],
        },
        callout: {
          tone: 'success',
          text: 'Notre cabinet ORIAS vous accompagne pour auditer votre couverture actuelle et négocier les meilleures conditions auprès de nos 10 assureurs partenaires.',
        },
      },
    ],
  },

  'rc-pro-consultant-comment-choisir': {
    slug: 'rc-pro-consultant-comment-choisir',
    title: 'RC Pro consultant : comment choisir son contrat en 5 critères',
    description:
      'Plafond, exclusions, garantie subséquente, défense recours, cyber : les 5 critères qui font la différence pour un freelance ou consultant.',
    category: 'RC Pro',
    tags: ['rc-pro', 'consultant', 'freelance'],
    author: 'Cabinet Vivos Assurance',
    authorRole: 'Courtier ORIAS — pôle Services',
    publishedAt: '2026-04-10',
    updatedAt: '2026-04-10',
    readTime: '8 min',
    sources: [
      {
        label: 'Code des assurances — art. L. 124-3',
        url: 'https://www.legifrance.gouv.fr/',
      },
      {
        label: 'Directive Distribution Assurance (DDA) — art. L. 521-4',
        url: 'https://www.legifrance.gouv.fr/',
      },
    ],
    toc: [
      { id: 'plafond', title: '1. Le plafond : 500k€ ou 2M€ ?' },
      { id: 'exclusions', title: '2. Lire les exclusions avant de signer' },
      { id: 'subsequente', title: '3. Garantie subséquente — le point critique' },
      { id: 'defense-recours', title: '4. Défense recours et protection juridique' },
      { id: 'cyber', title: '5. Option cyber : indispensable en 2026' },
    ],
    body: [
      {
        id: 'plafond',
        h2: '1. Le plafond : 500k€ ou 2M€ ?',
        paragraphs: [
          'Le plafond standard du marché pour un consultant indépendant est 500 000 € à 1 000 000 € par sinistre. Mais pour les missions stratégiques (M&A, ESN grands comptes, cabinets de conseil cotés), un plafond 2M€ est devenu la norme exigée par les clients.',
          "Règle pratique : alignez votre plafond sur la valeur du plus gros contrat client signé l'an passé × 5.",
        ],
      },
      {
        id: 'exclusions',
        h2: '2. Lire les exclusions avant de signer',
        paragraphs: ['Les exclusions à scruter en priorité :'],
        list: {
          items: [
            'Faute intentionnelle ou faute lourde (presque toujours exclues)',
            'Sanctions pénales (toujours exclues)',
            "Activités non déclarées (exclues — d'où l'importance de bien décrire votre activité)",
            'Cyber-attaques (souvent exclues sauf option dédiée — voir §5)',
            'Sinistres aux USA / Canada (souvent exclus sauf option internationale)',
          ],
        },
      },
      {
        id: 'subsequente',
        h2: '3. Garantie subséquente — le point critique',
        paragraphs: [
          'La RC Pro fonctionne en "réclamation" (claims-made) : elle couvre les sinistres déclarés pendant la période de validité, même pour des faits antérieurs.',
          "Mais que se passe-t-il à l'arrêt du contrat ? La garantie subséquente couvre les déclarations de sinistre faites APRÈS la fin du contrat, pour des faits commis pendant sa validité.",
          'Durée standard : 5 ans (art. L. 124-5 C. assur.). Pour les professions à délais longs (audit, M&A, conseil stratégique), demandez une garantie subséquente 10 ans.',
        ],
      },
      {
        id: 'defense-recours',
        h2: '4. Défense recours et protection juridique',
        paragraphs: [
          "La défense recours couvre les frais d'avocats et d'expertise quand vous êtes mis en cause. Standard inclus dans la majorité des contrats.",
          'La protection juridique pro est un produit séparé : elle couvre vos litiges OFFENSIFS (impayé client, conflit avec un fournisseur). Très utile pour un consultant dont les délais de paiement clients dérivent.',
        ],
      },
      {
        id: 'cyber',
        h2: '5. Option cyber : indispensable en 2026',
        paragraphs: [
          "Selon l'ANSSI, 1 entreprise française sur 5 a été victime d'une cyber-attaque en 2025. Pour un consultant indépendant manipulant des données clients, l'option cyber n'est plus optionnelle.",
          "Garanties à obtenir : frais de gestion de crise (forensic, notification CNIL), restauration des données, perte d'exploitation, RC fuite de données tiers.",
        ],
        callout: {
          tone: 'info',
          text: 'Notre cabinet ORIAS analyse gratuitement votre contrat actuel pour identifier les angles morts. Demande de devis comparatif sans engagement.',
        },
      },
    ],
  },

  'mutuelle-tns-madelin-comment-economiser': {
    slug: 'mutuelle-tns-madelin-comment-economiser',
    title: "Mutuelle TNS Madelin : comment économiser 30-45% d'impôts",
    description:
      'Plafond 2026, calcul de la déduction, exemple chiffré pour un consultant freelance. Optimisation fiscale Madelin pas à pas.',
    category: 'Mutuelle / TNS',
    tags: ['mutuelle', 'madelin', 'tns', 'fiscalite'],
    author: 'Cabinet Vivos Assurance',
    authorRole: 'Courtier ORIAS — pôle Santé / Prévoyance',
    publishedAt: '2026-03-20',
    updatedAt: '2026-03-20',
    readTime: '6 min',
    sources: [
      {
        label: 'Loi Madelin n° 94-126 du 11 février 1994',
        url: 'https://www.legifrance.gouv.fr/',
      },
      {
        label: 'CGI — art. 154 bis (déductibilité TNS)',
        url: 'https://www.legifrance.gouv.fr/',
      },
    ],
    toc: [
      { id: 'qui', title: '1. Qui est concerné ?' },
      { id: 'plafonds', title: '2. Plafonds 2026 de déduction' },
      { id: 'calcul', title: '3. Comment calculer votre économie' },
      { id: 'exemple', title: '4. Exemple chiffré : freelance IT à 70k€' },
      { id: 'pieges', title: '5. Les pièges à éviter' },
    ],
    body: [
      {
        id: 'qui',
        h2: '1. Qui est concerné ?',
        paragraphs: [
          'La Loi Madelin (1994) ouvre droit à la déduction fiscale du résultat professionnel pour les TNS (Travailleurs Non-Salariés) :',
        ],
        list: {
          items: [
            'Entrepreneurs Individuels (EI)',
            'Gérants majoritaires de SARL / EURL',
            'Auto-entrepreneurs (forfait spécifique)',
            'Professions libérales (BNC ou BIC)',
          ],
        },
      },
      {
        id: 'plafonds',
        h2: '2. Plafonds 2026 de déduction',
        paragraphs: [
          'Le plafond Madelin santé est calculé sur la base du PASS (Plafond Annuel de la Sécurité Sociale) — environ 46 368 € en 2026.',
        ],
        list: {
          items: [
            'Santé : 7 % PASS + 3,75 % bénéfice imposable, dans la limite de 3 % de 8 PASS (~11 130 €/an)',
            'Prévoyance : 1,75 % PASS + 1,87 % bénéfice imposable',
            'Retraite : 10 % bénéfice imposable + 15 % de la fraction comprise entre 1 et 8 PASS',
          ],
        },
      },
      {
        id: 'calcul',
        h2: '3. Comment calculer votre économie',
        paragraphs: [
          "La déduction Madelin réduit votre bénéfice imposable. L'économie d'impôt dépend donc de votre tranche marginale d'imposition (TMI) + des cotisations sociales (URSSAF).",
          'Formule simplifiée : économie = (cotisation Madelin) × (TMI + taux URSSAF).',
        ],
      },
      {
        id: 'exemple',
        h2: '4. Exemple chiffré : freelance IT à 70k€',
        paragraphs: [
          'Profil : freelance IT (EURL gérant majoritaire), bénéfice 70 000 €, TMI 30 %, URSSAF environ 22 %.',
          'Cotisation Madelin santé annuelle : 1 800 €.',
          "Économie d'impôt : 1 800 × (30 % + 22 %) = 936 € de moins à payer = 52 % de la cotisation effectivement remboursés par la fiscalité.",
        ],
        callout: {
          tone: 'success',
          text: "Pour un freelance à 70k€, le coût net d'une mutuelle Madelin de 1 800 € est en réalité de 864 € après déduction.",
        },
      },
      {
        id: 'pieges',
        h2: '5. Les pièges à éviter',
        paragraphs: ['Trois pièges fréquents :'],
        list: {
          ordered: true,
          items: [
            'Souscrire un contrat NON labellisé Madelin (perte du droit à déduction).',
            'Cumuler avec une mutuelle santé "responsable" non éligible.',
            "Oublier de fournir l'attestation Madelin annuelle au comptable (déclaration fiscale).",
          ],
        },
      },
    ],
  },

  'cyber-assurance-pme-2026': {
    slug: 'cyber-assurance-pme-2026',
    title: "Cyber assurance PME 2026 : pourquoi c'est devenu indispensable",
    description:
      "1 entreprise sur 5 victime d'une cyber-attaque en France en 2025 (ANSSI). Analyse des risques et des couvertures essentielles.",
    category: 'Cyber',
    tags: ['cyber', 'pme', 'rgpd', 'rancongiciel'],
    author: 'Cabinet Vivos Assurance',
    authorRole: 'Courtier ORIAS — pôle Cyber',
    publishedAt: '2026-03-28',
    updatedAt: '2026-03-28',
    readTime: '10 min',
    sources: [
      {
        label: 'ANSSI — Panorama de la menace 2025',
        url: 'https://www.cert.ssi.gouv.fr/cti/',
      },
      {
        label: 'CNIL — Sanctions et notifications 2024',
        url: 'https://www.cnil.fr/fr/cnil-sanctions',
      },
      {
        label: 'Règlement (UE) 2016/679 (RGPD)',
        url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
      },
    ],
    toc: [
      { id: 'menace', title: '1. État de la menace en France' },
      { id: 'couts', title: "2. Coûts moyens d'un sinistre cyber" },
      { id: 'garanties', title: '3. Garanties essentielles' },
      { id: 'exclusions', title: '4. Exclusions à anticiper' },
      { id: 'prerequis', title: '5. Prérequis techniques de souscription' },
    ],
    body: [
      {
        id: 'menace',
        h2: '1. État de la menace en France',
        paragraphs: [
          "D'après l'ANSSI, 1 entreprise française sur 5 a subi une cyber-attaque en 2025. Les rançongiciels (ransomwares) restent la principale menace pour les TPE/PME, suivis des fuites de données et du phishing ciblé (BEC).",
          'Les secteurs les plus touchés : santé, collectivités, industrie, services aux entreprises.',
        ],
      },
      {
        id: 'couts',
        h2: "2. Coûts moyens d'un sinistre cyber",
        paragraphs: ['Un sinistre cyber pour une PME française se chiffre en moyenne à :'],
        list: {
          items: [
            'Forensic + remédiation technique : 25 000 – 80 000 €',
            "Pertes d'exploitation (10 jours d'arrêt) : 15 000 – 150 000 €",
            'Notification CNIL + clients : 5 000 – 30 000 €',
            'Cyber-rançon (variable, plafond légal) : 10 000 – 500 000 €',
            'Sanctions CNIL (max 4 % CA mondial)',
          ],
        },
      },
      {
        id: 'garanties',
        h2: '3. Garanties essentielles',
        paragraphs: ['Un contrat cyber complet doit couvrir :'],
        list: {
          items: [
            'Frais de gestion de crise (forensic, communication, notification CNIL/clients)',
            "Pertes d'exploitation suite à arrêt SI",
            'Frais de restauration des données',
            'RC en cas de fuite de données tiers',
            'Frais juridiques RGPD',
            'Cyber-rançon (selon plafond et conformité légale)',
            'Assistance technique 24/7',
          ],
        },
      },
      {
        id: 'exclusions',
        h2: '4. Exclusions à anticiper',
        paragraphs: ['Exclusions standard du marché :'],
        list: {
          items: [
            'Sinistres antérieurs à la souscription (faits connus)',
            'Cyber-guerre et terrorisme étatique',
            'Sanctions pénales personnelles du dirigeant',
            'Atteintes liées à un défaut grossier de mise à jour',
          ],
        },
      },
      {
        id: 'prerequis',
        h2: '5. Prérequis techniques de souscription',
        paragraphs: ['Les assureurs cyber 2026 exigent un socle minimal :'],
        list: {
          ordered: true,
          items: [
            'MFA (authentification multi-facteurs) sur les comptes admin et accès distants',
            'Sauvegardes hors-ligne testées (3-2-1)',
            'EDR / antivirus de nouvelle génération',
            "Plan de continuité d'activité (PCA) documenté",
            'Sensibilisation collaborateurs (formation phishing annuelle)',
          ],
        },
        callout: {
          tone: 'info',
          text: 'Notre cabinet ORIAS audite gratuitement vos prérequis techniques avant de proposer un devis cyber. Demande sans engagement.',
        },
      },
    ],
  },
}

import { BLOG_POSTS_BATCH_2 } from './blog-posts-batch2'
import { BLOG_POSTS_BATCH_2_EXTENDED } from './blog-posts-batch2-extended'
import { BLOG_POSTS_BATCH_3 } from './blog-posts-batch3'
import { BLOG_POSTS_BATCH_4 } from './blog-posts-batch4'
import { BLOG_POSTS_BATCH_5 } from './blog-posts-batch5'
import { BLOG_POSTS_BATCH_6 } from './blog-posts-batch6'
import { BLOG_POSTS_BATCH_7 } from './blog-posts-batch7'
import { BLOG_POSTS_BATCH_8 } from './blog-posts-batch8'
import { BLOG_POSTS_BATCH_9 } from './blog-posts-batch9'
import { applyExtension } from './blog-posts-extensions'

/** Tous les articles fusionnés. L'ordre du spread garantit que les versions
 *  étoffées ÉCRASENT les versions courtes pour les slugs communs. */
const MERGED_POSTS: Record<string, BlogPost> = {
  ...BLOG_POSTS,
  ...BLOG_POSTS_BATCH_2,
  ...BLOG_POSTS_BATCH_2_EXTENDED,
  ...BLOG_POSTS_BATCH_3,
  ...BLOG_POSTS_BATCH_4,
  ...BLOG_POSTS_BATCH_5,
  ...BLOG_POSTS_BATCH_6,
  ...BLOG_POSTS_BATCH_7,
  ...BLOG_POSTS_BATCH_8,
  ...BLOG_POSTS_BATCH_9,
}

/** Application des extensions de sections aux articles courts (audit fix 2026-05). */
const ALL_POSTS: Record<string, BlogPost> = Object.fromEntries(
  Object.entries(MERGED_POSTS).map(([slug, post]) => [slug, applyExtension(post)])
)

export function getPost(slug: string): BlogPost | undefined {
  return ALL_POSTS[slug]
}

export function getPostSlugs(): string[] {
  return Object.keys(ALL_POSTS)
}

export function getAllPosts(): BlogPost[] {
  return Object.values(ALL_POSTS).sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category.toLowerCase() === category.toLowerCase())
}

export function getCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getAllCategories(): Array<{ name: string; slug: string; count: number }> {
  const map = new Map<string, { name: string; slug: string; count: number }>()
  for (const p of getAllPosts()) {
    const slug = getCategorySlug(p.category)
    const existing = map.get(slug)
    if (existing) existing.count++
    else map.set(slug, { name: p.category, slug, count: 1 })
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count)
}
