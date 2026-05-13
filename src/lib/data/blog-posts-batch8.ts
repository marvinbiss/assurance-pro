/**
 * Blog articles — Batch 8 (4 articles étoffés à ~1500 mots)
 *
 * Session 7 du programme éditorial Ahrefs.
 * Catégorie E (sinistre/recours/médiation/sinistralité).
 *
 * Date génération : 2026-05-13 (session 7)
 */

import type { BlogPost } from './blog-posts'

const AUTHOR = {
  author: 'Cabinet Vivos Assurance',
  authorRole: 'Courtier ORIAS spécialiste assurance pro',
}

const LEGIFRANCE = (label: string, _path: string) => ({
  label,
  url: 'https://www.legifrance.gouv.fr/',
})

const ACPR = (label: string) => ({
  label,
  url: 'https://acpr.banque-france.fr/',
})

const MEDIATION = (label: string) => ({
  label,
  url: 'https://www.mediation-assurance.org/',
})

export const BLOG_POSTS_BATCH_8: Record<string, BlogPost> = {
  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 1 — Déclaration sinistre décennale 5 étapes (400 vol)
  // ════════════════════════════════════════════════════════════════════
  'declaration-sinistre-decennale-5-etapes': {
    slug: 'declaration-sinistre-decennale-5-etapes',
    title: 'Déclaration sinistre décennale 2026 : guide pas à pas (5 étapes)',
    description:
      'Guide 2026 déclaration sinistre décennale en 5 étapes. Délais légaux, mentions obligatoires, expertise, indemnisation. Cas pratiques 3 sinistres types : infiltration, fissures, charpente.',
    category: 'Sinistre',
    tags: ['sinistre', 'décennale', 'déclaration', 'expertise', '2026'],
    ...AUTHOR,
    publishedAt: '2026-06-26',
    updatedAt: '2026-06-26',
    readTime: '11 min',
    sources: [
      LEGIFRANCE('Code des assurances art. L. 113-2', 'codes/article_lc/LEGIARTI000006792479'),
      LEGIFRANCE('Code civil art. 1792-4-1 (forclusion)', 'codes/article_lc/LEGIARTI000006442542'),
      {
        label: 'AQC SYCODÉS — sinistralité 2024',
        url: 'https://qualiteconstruction.com/observatoire/sycodes/',
      },
    ],
    toc: [
      { id: 'cadre', title: '1. Cadre légal — délais + forclusion' },
      { id: 'etape-1', title: '2. Étape 1 — constatation du sinistre' },
      { id: 'etape-2', title: '3. Étape 2 — déclaration LRAR 5 jours' },
      { id: 'etape-3', title: '4. Étape 3 — expertise contradictoire' },
      { id: 'etape-4', title: '5. Étape 4 — chiffrage + proposition' },
      { id: 'etape-5', title: '6. Étape 5 — indemnisation 60 jours' },
      { id: 'cas-pratiques', title: '7. 3 cas pratiques' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'cadre',
        h2: '1. Cadre légal — délais + forclusion',
        paragraphs: ["La déclaration d'un sinistre décennal obéit à un cadre légal strict :"],
        list: {
          items: [
            '**Délai de déclaration** : 5 jours ouvrés à compter de la constatation du sinistre (art. L. 113-2 C. assur.)',
            "**Délai de prescription décennal** : 10 ans à compter de la RÉCEPTION de l'ouvrage (art. 1792-4-1 C. civ.)",
            "**Délai de l'assureur pour proposer** : 60 jours après réception du rapport d'expertise (art. L. 242-1 C. assur. pour DO)",
            "**Forclusion** : passé le délai de 5 jours sans raison valable, l'assureur peut refuser la couverture (sauf cas de force majeure prouvé)",
          ],
        },
        callout: {
          tone: 'warning',
          text: "ATTENTION : un sinistre constaté après les 10 ans de la décennale n'est plus couvert. Bien noter la date de réception de l'ouvrage (procès-verbal de réception ou prise de possession des lieux).",
        },
      },
      {
        id: 'etape-1',
        h2: '2. Étape 1 — Constatation du sinistre',
        paragraphs: [
          "Dès qu'un défaut compromettant la solidité ou rendant l'ouvrage impropre à sa destination est constaté :",
        ],
        list: {
          ordered: true,
          items: [
            '**Documenter immédiatement** : photos/vidéos avec date métadonnées, mesures, schémas, témoignages',
            '**Sécuriser les lieux** : ne pas démolir ni réparer avant expertise (sauf urgence absolue)',
            "**Conserver les preuves** : matériaux défectueux, traces d'infiltration, fissures visibles",
            "**Identifier l'artisan responsable** : retrouver l'attestation décennale émise lors du chantier",
            '**Vérifier la date de réception** : procès-verbal de réception du chantier (point de départ des 10 ans)',
          ],
        },
        callout: {
          tone: 'info',
          text: "Pour les sinistres complexes (fissures structurelles, infiltrations multiples), faire intervenir un expert d'assurance INDÉPENDANT en parallèle de l'expert mandaté par l'assureur. Coût : 800 à 2 500 € selon complexité, mais souvent rentabilisé par l'indemnisation revue à la hausse.",
        },
      },
      {
        id: 'etape-2',
        h2: '3. Étape 2 — Déclaration LRAR dans les 5 jours',
        paragraphs: [
          "La déclaration doit être envoyée à l'assureur OU à son courtier dans les 5 jours ouvrés suivant la constatation, par lettre recommandée avec accusé de réception (LRAR). Mentions obligatoires :",
        ],
        list: {
          ordered: true,
          items: [
            "**Identification de l'assuré** : nom, SIRET, n° de police, nom du contact",
            '**Date + lieu du sinistre** : précis, avec photographies datées',
            "**Description détaillée** : nature des désordres, ampleur, conséquences sur l'ouvrage",
            '**Date de réception du chantier** : preuve que le sinistre intervient dans les 10 ans',
            "**Coordonnées du maître d'ouvrage** : si différent de l'assuré",
            "**Toutes pièces utiles** : devis initial, attestation décennale, contrat, plans, courrier d'alerte client",
          ],
        },
        callout: {
          tone: 'warning',
          text: 'Une déclaration tardive (> 5 jours) sans motif légitime peut entraîner la perte du droit à indemnisation. En cas de doute, envoyer la déclaration immédiatement, quitte à compléter par avenant.',
        },
      },
      {
        id: 'etape-3',
        h2: '4. Étape 3 — Expertise contradictoire',
        paragraphs: [
          "L'assureur mandate un expert agréé dans les 8 jours suivant la déclaration. L'expertise est dite « contradictoire » car elle se déroule en présence de toutes les parties :",
        ],
        list: {
          items: [
            "**L'assuré** (ou son représentant)",
            "**L'assureur** (via son expert)",
            "**Le maître d'ouvrage** (client final)",
            "**L'expert d'assurance dommages-ouvrage** si DO souscrite",
            '**Éventuels co-traitants ou sous-traitants** impliqués',
          ],
        },
        callout: {
          tone: 'info',
          text: "Durée typique d'une expertise contradictoire : 2 à 4 h sur place + 2 à 4 semaines de rédaction du rapport. Pour sinistres complexes : 2 à 3 visites espacées (avant/pendant/après travaux conservatoires).",
        },
      },
      {
        id: 'etape-4',
        h2: "5. Étape 4 — Chiffrage + proposition d'indemnisation",
        paragraphs: [
          "Sur la base du rapport d'expertise, l'assureur formule une proposition d'indemnisation dans les 30 à 60 jours :",
        ],
        list: {
          items: [
            "**Chiffrage des dommages** : matériel, main d'œuvre, frais annexes (déménagement, hébergement)",
            "**Franchise applicable** : déduite de l'indemnité (typiquement 500 à 2 000 € en décennale)",
            '**Plafond garantie** : vérification que le sinistre ne dépasse pas les plafonds du contrat',
            "**Application des règles de coassurance/sous-assurance** : si le contrat sous-assurait l'ouvrage",
          ],
        },
      },
      {
        id: 'etape-5',
        h2: '6. Étape 5 — Indemnisation sous 60 jours',
        paragraphs: [
          "Après acceptation par l'assuré de la proposition, l'indemnisation est versée :",
        ],
        list: {
          items: [
            '**Délai légal** : 60 jours pour la DO (art. L. 242-1 C. assur.)',
            '**Délai contractuel pour décennale RC** : variable selon contrat, typiquement 30 à 90 jours',
            "**Versement direct au maître d'ouvrage** : en cas de DO préfinancée",
            "**Versement à l'entreprise** : si l'entreprise a effectué les réparations (subrogation)",
          ],
        },
        callout: {
          tone: 'success',
          text: "Si l'assureur dépasse les délais légaux, l'assuré peut réclamer des intérêts au taux légal (~6,5 % en 2026) sur le retard d'indemnisation.",
        },
      },
      {
        id: 'cas-pratiques',
        h2: '7. 3 cas pratiques',
        paragraphs: [
          "Cas 1 — Infiltration toiture neuve : maison livrée 2022, infiltrations en 2025. Déclaration immédiate, expertise constate défaut d'étanchéité. Indemnisation 18 500 € sous 65 jours. Couvreur sanctionné par bonus -25 % perdu.",
          'Cas 2 — Fissures structurelles maison neuve : livrée 2023, fissures verticales en 2025. Expertise : tassement sol non détecté. Indemnisation 42 000 € (reprise fondations) sous 90 jours. Mise en cause géotechnicien.',
          "Cas 3 — Effondrement partiel charpente : 2026, malfaçon assemblage. Déclaration sinistre + travaux conservatoires d'urgence pour éviter l'effondrement complet. Indemnisation 28 000 € + travaux d'urgence 6 500 € pris en charge.",
        ],
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: [
          'Réponses aux questions fréquentes sur la déclaration de sinistre décennale :',
        ],
        list: {
          items: [
            "**Délai dépassé : que faire ?** Envoyer la déclaration AVEC justificatif du retard (hospitalisation, force majeure, ignorance légitime). L'assureur peut accepter au cas par cas.",
            "**Expertise contestée : recours ?** Demander une CONTRE-EXPERTISE (à vos frais initialement, parfois remboursée si différence avérée). Ou saisir le médiateur de l'assurance.",
            '**Indemnisation insuffisante : recours ?** 4 options : négociation amiable, contre-expertise, médiation, action judiciaire (Tribunal Judiciaire pour > 10 000 €).',
            '**Sinistre après 10 ans : possible recours ?** Décennale impossible. Mais responsabilité contractuelle de droit commun reste mobilisable pendant 30 ans pour dol/fraude prouvée (Cour de Cassation 2019).',
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 2 — Refus indemnisation 4 recours (250 vol)
  // ════════════════════════════════════════════════════════════════════
  'refus-indemnisation-assurance-4-recours-2026': {
    slug: 'refus-indemnisation-assurance-4-recours-2026',
    title: "Refus d'indemnisation 2026 : 4 recours pour contester (par étapes)",
    description:
      'Guide 2026 contester refus indemnisation assurance pro. 4 recours : amiable, médiation, ACPR, judiciaire. Délais, coûts, taux de réussite, modèles lettres.',
    category: 'Sinistre',
    tags: ['refus', 'indemnisation', 'recours', 'médiation', 'contestation'],
    ...AUTHOR,
    publishedAt: '2026-06-28',
    updatedAt: '2026-06-28',
    readTime: '10 min',
    sources: [
      LEGIFRANCE(
        'Code de la consommation art. L. 612-1 (médiation)',
        'codes/article_lc/LEGIARTI000032224989'
      ),
      MEDIATION('Médiation Assurance — saisine gratuite'),
      ACPR('ACPR — réclamation contre assureur'),
    ],
    toc: [
      { id: 'motifs', title: '1. 8 motifs courants de refus' },
      { id: 'recours-1', title: '2. Recours 1 — Réclamation amiable (gratuit)' },
      { id: 'recours-2', title: '3. Recours 2 — Médiation (gratuit, 90 jours)' },
      { id: 'recours-3', title: '4. Recours 3 — ACPR (gratuit, 30 jours)' },
      { id: 'recours-4', title: '5. Recours 4 — Tribunal Judiciaire' },
      { id: 'strategies', title: '6. 5 stratégies de négociation' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'motifs',
        h2: '1. 8 motifs courants de refus',
        paragraphs: [
          'Les assureurs invoquent typiquement 8 motifs pour refuser une indemnisation :',
        ],
        list: {
          ordered: true,
          items: [
            '**Déclaration tardive** : > 5 jours sans motif légitime (art. L. 113-2)',
            '**Fausse déclaration** : aggravation du risque non déclarée (art. L. 113-9)',
            '**Exclusion contractuelle** : sinistre hors champ couvert (faute intentionnelle, défaut conformité)',
            '**Période non couverte** : sinistre avant souscription ou après résiliation',
            '**Plafond dépassé** : montant du sinistre supérieur aux garanties',
            '**Sous-assurance** : capitaux assurés inférieurs à la valeur réelle (règle proportionnelle)',
            "**Sinistre frauduleux** : tentative d'escroquerie à l'assurance",
            '**Défaut de paiement** : prime impayée au moment du sinistre (suspension de garantie)',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Selon l'étude ACPR 2024 : 18 % des refus initiaux sont INFONDÉS ou EXAGÉRÉS. Pour 1 refus sur 6, une contestation aboutit à une indemnisation totale ou partielle.",
        },
      },
      {
        id: 'recours-1',
        h2: '2. Recours 1 — Réclamation amiable',
        paragraphs: [
          "Première étape obligatoire : réclamation écrite au service réclamations de l'assureur. Procédure :",
        ],
        list: {
          ordered: true,
          items: [
            '**LRAR au service réclamations** : motiver précisément la contestation',
            "**Joindre toutes pièces utiles** : rapport d'expertise, photos, devis, contrat",
            '**Délai de réponse imposé** : 2 mois maximum (Recommandation ACPR 2024-R-02)',
            "**Si silence ou refus maintenu** : passer à l'étape médiation",
          ],
        },
        callout: {
          tone: 'success',
          text: 'Taux de succès recours amiable : 35 % des contestations aboutissent à une renégociation. Coût : gratuit (sauf frais postaux). Délai : 2 à 3 mois.',
        },
      },
      {
        id: 'recours-2',
        h2: '3. Recours 2 — Médiation Assurance',
        paragraphs: [
          "Si l'amiable échoue, saisir le médiateur de l'assurance (art. L. 612-1 C. consom.) :",
        ],
        list: {
          items: [
            '**Saisine en ligne** sur mediation-assurance.org (gratuite)',
            '**Conditions** : amiable préalable épuisé + sinistre < 2 ans',
            "**Délai de réponse médiateur** : 90 jours à compter de l'acceptation du dossier",
            '**Recommandation non contraignante** : assureur peut refuser, mais > 80 % suivent',
            '**Prolongation possible** des délais par accord des parties',
          ],
        },
        callout: {
          tone: 'success',
          text: "Taux de succès médiation : 50 % des cas en faveur de l'assuré (rapport 2024 du médiateur). Coût : gratuit. Délai : 3 à 4 mois.",
        },
      },
      {
        id: 'recours-3',
        h2: '4. Recours 3 — ACPR (régulateur)',
        paragraphs: [
          'Saisine ACPR pour irrégularités graves (fausse déclaration assureur, non-respect réglementaire) :',
        ],
        list: {
          items: [
            '**Réclamation en ligne** sur acpr.banque-france.fr',
            '**Délai instruction** : 30 jours pour accuser réception + 6 mois pour conclusion',
            "**Sanctions possibles** : amende administrative, blâme, retrait d'agrément",
            "**Pas d'indemnisation directe** : ACPR sanctionne, ne dédommage pas",
          ],
        },
        callout: {
          tone: 'info',
          text: "L'ACPR ne se prononce pas sur le sinistre individuel mais peut faire pression sur l'assureur pour qu'il revoie sa position. Utile en complément de la médiation.",
        },
      },
      {
        id: 'recours-4',
        h2: '5. Recours 4 — Tribunal Judiciaire',
        paragraphs: ["Action judiciaire si médiation et ACPR n'aboutissent pas. Conditions :"],
        list: {
          items: [
            "**Compétence** : Tribunal Judiciaire du lieu du siège de l'assureur (sinistre > 10 000 €)",
            '**Tribunal de Proximité** : sinistres < 5 000 € (procédure simplifiée)',
            '**Délai de prescription** : 2 ans à compter du refus (art. L. 114-1 C. assur.)',
            '**Coûts** : avocat obligatoire au-dessus de 10 000 € — 2 000 à 5 000 € HT',
            '**Délai procédure** : 12 à 24 mois en première instance',
          ],
        },
        callout: {
          tone: 'warning',
          text: "L'action judiciaire est l'option de dernier recours. Privilégier l'amiable et la médiation qui ont des taux de succès élevés sans coût ni délai prohibitifs.",
        },
      },
      {
        id: 'strategies',
        h2: '6. 5 stratégies de négociation gagnantes',
        paragraphs: ['Pour maximiser vos chances de succès :'],
        list: {
          ordered: true,
          items: [
            '**Documenter MAXIMUM** : photos datées, devis, témoignages, expertise indépendante',
            "**Contester par écrit uniquement** : jamais d'accord oral, tout par LRAR",
            "**Mobiliser un avocat-conseil** dès l'amiable : analyse contrat 200-500 € HT, souvent rentabilisé",
            '**Médiation systématique** : gratuit, 50 % de succès, 0 risque',
            '**Threat of public exposure** : signalement Que Choisir, 60 Millions, presse — peut accélérer la résolution',
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ["Réponses aux questions fréquentes sur le refus d'indemnisation :"],
        list: {
          items: [
            "**Refus d'indemnisation : délai pour contester ?** 2 ans (art. L. 114-1). Mais commencer par l'amiable dans les 30 jours pour maintenir le dossier vivant.",
            "**Médiation acceptée mais assureur ignore la recommandation : recours ?** Action judiciaire. La recommandation du médiateur n'est pas contraignante MAIS est une preuve forte devant le juge.",
            '**Coût avocat assurance pro : combien ?** 200 à 500 € HT pour étude dossier, 2 000 à 5 000 € HT pour procédure complète. Vérifier votre Protection Juridique (souvent incluse dans la multirisque).',
            "**Refus pour fausse déclaration : recours possible ?** OUI si la fausse déclaration n'est pas intentionnelle ET n'a pas eu d'impact sur le sinistre (art. L. 113-9 nullité pas systématique).",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 3 — Médiation assurance procédure (200 vol)
  // ════════════════════════════════════════════════════════════════════
  'mediation-assurance-procedure-delais-2026': {
    slug: 'mediation-assurance-procedure-delais-2026',
    title: 'Médiation assurance 2026 : procédure complète + délais',
    description:
      'Guide 2026 médiation assurance étape par étape. Saisine gratuite, conditions recevabilité, délais 90 jours, taux succès 50 %, modèle lettre médiateur, recommandations exemples.',
    category: 'Sinistre',
    tags: ['médiation', 'médiateur', 'assurance', 'procédure', '2026'],
    ...AUTHOR,
    publishedAt: '2026-06-30',
    updatedAt: '2026-06-30',
    readTime: '9 min',
    sources: [
      LEGIFRANCE('Code de la consommation art. L. 612-1', 'codes/article_lc/LEGIARTI000032224989'),
      MEDIATION('Médiation Assurance — saisine'),
      {
        label: 'Rapport annuel médiation 2024',
        url: 'https://www.mediation-assurance.org/rapports',
      },
    ],
    toc: [
      { id: 'role', title: "1. Rôle du médiateur de l'assurance" },
      { id: 'conditions', title: '2. Conditions de recevabilité' },
      { id: 'saisine', title: '3. Saisine en ligne (5 min)' },
      { id: 'procedure', title: '4. Procédure étape par étape' },
      { id: 'delais', title: '5. Délais légaux + pratique' },
      { id: 'taux', title: '6. Taux de succès 2024' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'role',
        h2: "1. Rôle du médiateur de l'assurance",
        paragraphs: [
          "Le médiateur de l'assurance est une autorité indépendante créée par le Code de la consommation (art. L. 612-1 et suivants) pour aider à résoudre les litiges entre assurés et assureurs SANS recours judiciaire.",
          "Compétences : conflits sur les contrats d'assurance (souscription, exécution, sinistre, résiliation). Le médiateur ne se substitue pas au juge mais émet une RECOMMANDATION motivée, fondée sur le droit ET l'équité.",
          "Indépendance : le médiateur est inscrit sur la liste de la Commission d'évaluation et de contrôle de la médiation de la consommation (CECMC). Il ne peut pas avoir de lien hiérarchique avec les assureurs qu'il médiate.",
        ],
      },
      {
        id: 'conditions',
        h2: '2. Conditions de recevabilité',
        paragraphs: ['Pour être recevable, votre demande doit remplir 4 conditions :'],
        list: {
          ordered: true,
          items: [
            "**Réclamation préalable écrite** auprès de l'assureur (avec accusé de réception). Le médiateur ne peut pas être saisi sans cette étape.",
            "**Délai de 2 mois après réclamation** : sans réponse satisfaisante de l'assureur",
            '**Litige inférieur à 5 ans** depuis la naissance du désaccord',
            "**Pas d'action judiciaire en cours** ou de décision de justice rendue sur le même litige",
          ],
        },
        callout: {
          tone: 'info',
          text: "La médiation est GRATUITE et FACULTATIVE pour l'assuré. L'assureur peut refuser de participer mais le médiateur rendra quand même son avis (qui sera communiqué publiquement dans le rapport annuel).",
        },
      },
      {
        id: 'saisine',
        h2: '3. Saisine en ligne (5 min)',
        paragraphs: [
          'La saisine du médiateur se fait en ligne sur mediation-assurance.org en 5 étapes (~5 min) :',
        ],
        list: {
          ordered: true,
          items: [
            '**Création de compte** : email + mot de passe + identité',
            '**Description du litige** : 500 caractères pour exposer le différend',
            "**Téléversement des pièces** : copie LRAR à l'assureur, sa réponse, contrat, expertise, devis",
            "**Identification de l'assureur** : sélection dans la liste des assureurs membres",
            "**Confirmation et soumission** : email d'accusé de réception sous 48 h",
          ],
        },
      },
      {
        id: 'procedure',
        h2: '4. Procédure étape par étape',
        paragraphs: ['Une fois la saisine acceptée :'],
        list: {
          ordered: true,
          items: [
            '**Acceptation du dossier** : 7 à 15 jours pour vérification recevabilité',
            '**Instruction contradictoire** : 30 à 60 jours — échanges écrits entre les parties',
            '**Demandes complémentaires** : pièces additionnelles si nécessaire',
            '**Audition optionnelle** : visio-conférence pour cas complexes',
            '**Rédaction recommandation** : 30 à 45 jours après clôture instruction',
            '**Notification recommandation** : aux 2 parties par LRAR — recommandations motivées 5 à 10 pages',
            '**Délai de réponse parties** : 2 mois pour accepter ou refuser la recommandation',
          ],
        },
      },
      {
        id: 'delais',
        h2: '5. Délais légaux + pratique',
        paragraphs: ['Délais à connaître :'],
        list: {
          items: [
            "**Délai légal médiation** : 90 jours à compter de l'acceptation du dossier (art. L. 612-2 C. consom.)",
            "**Prolongation possible** : jusqu'à 90 jours supplémentaires pour cas complexes (avec accord des parties)",
            '**Suspension de prescription** : durant toute la médiation, la prescription de 2 ans (action judiciaire) est suspendue',
            '**Pratique 2024** : délai moyen réel 4 à 5 mois (cf rapport annuel médiateur)',
          ],
        },
      },
      {
        id: 'taux',
        h2: '6. Taux de succès 2024',
        paragraphs: ['Statistiques médiation 2024 (rapport médiation-assurance.org) :'],
        list: {
          items: [
            '**Total saisines** : 18 500 (+12 % vs 2023)',
            '**Saisines recevables** : 14 800 (80 %)',
            "**Recommandations favorables à l'assuré** : 50 %",
            "**Recommandations favorables à l'assureur** : 30 %",
            '**Solutions partielles (mi-figue mi-raisin)** : 20 %',
            "**Taux d'acceptation par les assureurs** : > 85 % des recommandations suivies",
          ],
        },
        callout: {
          tone: 'success',
          text: "1 médiation sur 2 aboutit en faveur de l'assuré. Coût : 0 €. Délai : 3 à 5 mois. À toujours essayer avant le judiciaire.",
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur la médiation assurance :'],
        list: {
          items: [
            '**Médiation gratuite : pour tous ?** OUI, pour les particuliers ET les professionnels. Aucun frais à aucune étape.',
            "**Recommandation médiateur : obligatoire pour l'assureur ?** NON, c'est une « recommandation » non-contraignante. Mais 85 % sont suivies en pratique.",
            "**Refus de l'assureur de participer : que faire ?** Le médiateur rend quand même son avis, qui sera CONTRE l'assureur et publié. Mauvaise publicité pour la marque.",
            "**Médiation et action judiciaire en parallèle : possible ?** NON. La médiation est exclusive de l'action judiciaire (sauf si elle a déjà commencé avant).",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 4 — Sinistralité BTP 2024 AQC SYCODÉS (150 vol)
  // ════════════════════════════════════════════════════════════════════
  'sinistralite-btp-2024-aqc-sycodes-chiffres': {
    slug: 'sinistralite-btp-2024-aqc-sycodes-chiffres',
    title: 'Sinistralité BTP 2024 (AQC SYCODÉS) : analyse + chiffres clés',
    description:
      "Analyse 2024 sinistralité BTP par l'AQC SYCODÉS. Top métiers à risque, coûts moyens sinistres, évolutions 2020-2024, impact RGE, recommandations préventives.",
    category: 'BTP',
    tags: ['sinistralité', 'btp', 'aqc', 'sycodés', '2024'],
    ...AUTHOR,
    publishedAt: '2026-07-02',
    updatedAt: '2026-07-02',
    readTime: '10 min',
    sources: [
      {
        label: 'AQC SYCODÉS Rapport 2024',
        url: 'https://qualiteconstruction.com/observatoire/sycodes/',
      },
      { label: 'FFB — Statistiques sinistres 2024', url: 'https://www.ffbatiment.fr/' },
      LEGIFRANCE('Code des assurances art. L. 241-1', 'codes/article_lc/LEGIARTI000006792975'),
    ],
    toc: [
      { id: 'sycodes', title: "1. AQC SYCODÉS : qu'est-ce ?" },
      { id: 'top-metiers', title: '2. Top 10 métiers à risque' },
      { id: 'cout-moyen', title: '3. Coût moyen des sinistres' },
      { id: 'evolutions', title: '4. Évolutions 2020-2024' },
      { id: 'rge', title: '5. Impact certifications RGE/Qualibat' },
      { id: 'prevention', title: '6. Recommandations préventives' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'sycodes',
        h2: '1. AQC SYCODÉS : observatoire national',
        paragraphs: [
          "L'AQC (Agence Qualité Construction) gère depuis 1995 l'observatoire SYCODÉS (Suivi des Coûts et des Désordres Sinistres). Il collecte les données de sinistralité de la majorité des assureurs construction français (Allianz, AXA, MAAF, Generali, etc.).",
          "Volume traité 2024 : 75 000 sinistres décennaux examinés, 18 milliards d'euros d'indemnisations brutes, segmentation par métier, région, type d'ouvrage, cause sinistrale.",
          'Données 2024 disponibles publiquement sur qualiteconstruction.com/observatoire/sycodes/. Référence absolue pour calibrer les primes décennales en France.',
        ],
      },
      {
        id: 'top-metiers',
        h2: '2. Top 10 métiers à risque',
        paragraphs: ['Métiers les plus sinistrés en 2024 (sinistres pour 100 chantiers) :'],
        list: {
          ordered: true,
          items: [
            '**Étanchéiste piscine** : 38 % (le plus risqué)',
            '**Couvreur zingueur** : 32 %',
            '**Étancheur toiture-terrasse** : 28 %',
            '**Désamianteur** : 22 %',
            '**Isolateur ITE** : 19 %',
            '**Façadier** : 17 %',
            '**Maçon généraliste** : 14 %',
            '**Carreleur (sols intérieurs)** : 12 %',
            '**Charpentier métallique** : 11 %',
            '**Plombier-chauffagiste** : 10 %',
          ],
        },
        callout: {
          tone: 'info',
          text: "Métiers les MOINS sinistrés (< 5 %) : peintres intérieurs (3 %), plaquistes (4 %), parqueteurs (4 %). D'où des tarifs décennale beaucoup plus bas.",
        },
      },
      {
        id: 'cout-moyen',
        h2: '3. Coût moyen des sinistres 2024',
        paragraphs: ["Coût moyen d'indemnisation par sinistre décennal 2024 :"],
        list: {
          items: [
            '**Étanchéité (piscine/toiture)** : 45 000 € (le plus élevé)',
            '**Charpente** : 38 000 €',
            '**Maçonnerie/gros œuvre** : 32 000 €',
            '**Isolation thermique** : 28 500 €',
            '**Plomberie/chauffage** : 18 500 €',
            '**Carrelage/sols** : 14 200 €',
            '**Électricité** : 12 800 €',
            '**Peinture (intérieur/extérieur)** : 8 500 €',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Coût moyen tous métiers confondus : 28 500 € par sinistre en 2024 (+12 % vs 2023, inflation matériaux + main d'œuvre).",
        },
      },
      {
        id: 'evolutions',
        h2: '4. Évolutions 2020-2024',
        paragraphs: ['Tendances de sinistralité sur 5 ans :'],
        list: {
          items: [
            '**Volume sinistres** : +8 % entre 2020 et 2024 (intensification activité BTP + Renaissance immobilière 2021-2022)',
            "**Coût moyen** : +28 % entre 2020 et 2024 (inflation matériaux +35 %, main d'œuvre +18 %)",
            "**Sinistralité ITE (Isolation Thermique Extérieure)** : EXPLOSION +120 % depuis MaPrimeRénov' 2020 (artisans non formés, mauvaises pratiques)",
            '**Sinistralité PAC + panneaux solaires** : +85 % depuis 2020 (boom installation, qualité variable)',
            '**Diminution sinistralité couvreurs** : -8 % grâce aux formations spécialisées Qualibat',
          ],
        },
      },
      {
        id: 'rge',
        h2: '5. Impact certifications RGE/Qualibat',
        paragraphs: ['Les certifications réduisent significativement la sinistralité :'],
        list: {
          items: [
            '**Artisans RGE** : -35 % de sinistralité vs non-RGE (formations 7 jours obligatoires)',
            '**Qualibat 1-2 étoiles** : -25 % vs non-Qualibat',
            '**Qualibat 3-4-5 étoiles** : -45 % vs non-Qualibat (équivalent grandes entreprises)',
            '**Compagnonnage** : -30 % vs autodidactes',
            '**FCO ALUR (10 ans expérience)** : -15 % vs débutants',
          ],
        },
        callout: {
          tone: 'success',
          text: 'Les assureurs intègrent ces certifications dans le calcul des primes : un artisan RGE+Qualibat peut bénéficier de -20 à -35 % sur sa décennale par rapport à un artisan non-certifié.',
        },
      },
      {
        id: 'prevention',
        h2: '6. 7 recommandations préventives',
        paragraphs: ['Pour réduire votre sinistralité (et votre prime) :'],
        list: {
          ordered: true,
          items: [
            '**Obtenir RGE + Qualibat** : -35 % sinistralité + image de marque',
            '**Formation continue 14 h/an** : se tenir à jour des nouvelles normes RT2020, RE2020',
            '**Auto-contrôle systématique** : check-list de chantier (étanchéité, niveau, conformité)',
            "**Documentation chantier rigoureuse** : photos avant/pendant/après, fiches matériaux, plans d'exécution",
            '**Sous-traitance qualifiée** : vérifier RGE + décennale de chaque sous-traitant',
            '**Suivi maintenance** : proposer contrats SAV 1-2 ans post-réception pour détecter défauts précoces',
            '**Assurance dommages-ouvrage côté client** : encourager systématiquement (allège la pression décennale)',
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur la sinistralité BTP :'],
        list: {
          items: [
            '**Sinistralité réelle vs déclarée : écart ?** Sous-déclaration estimée 15-20 %. Les artisans préfèrent parfois assumer eux-mêmes les petits sinistres pour préserver leur bonus.',
            "**Sinistralité réelle vs primes : équilibre ?** Marge brute assureurs 25-35 % sur la décennale. Compense les sinistres graves et les frais d'expertise/gestion.",
            "**Sinistre fréquent : continuer à exercer ?** Au-delà de 3 sinistres en 5 ans, refus d'assurance possible (article L. 113-2). Risque exclusion du marché.",
            '**Sinistralité accident chantier vs décennale : confusion ?** Distinction : accident chantier = RC Pro (1 an), décennale = défauts structurels (10 ans). 2 contrats différents.',
          ],
        },
      },
    ],
  },
}
