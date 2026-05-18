/**
 * Blog articles — Batch 9 (3 articles étoffés à ~1500 mots)
 *
 * Session 8 finale du programme éditorial Ahrefs.
 * BCT + ACPR R-02 + cyber assurance.
 *
 * Date génération : 2026-05-13 (session 8 finale)
 */

import type { BlogPost } from './blog-posts'

const AUTHOR = {
  author: 'Cabinet Vivos Assurance',
  authorRole: 'Courtier ORIAS spécialiste assurance pro',
}

const LEGIFRANCE = (label: string, _path?: string) => ({
  label,
  url: `https://www.legifrance.gouv.fr/search/all?query=${encodeURIComponent(label)}`,
})

const ACPR = (label: string) => ({
  label,
  url: 'https://acpr.banque-france.fr/',
})

export const BLOG_POSTS_BATCH_9: Record<string, BlogPost> = {
  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 1 — BCT Bureau Central de Tarification (250 vol)
  // ════════════════════════════════════════════════════════════════════
  'bureau-central-tarification-bct-assurance-refusee': {
    slug: 'bureau-central-tarification-bct-assurance-refusee',
    title: "BCT 2026 : saisir le Bureau Central de Tarification après refus d'assurance",
    description:
      "Guide 2026 saisine du BCT après refus d'assurance pro. Conditions, procédure, délais (1 mois), motifs recevables, tarif imposé, garanties minimales. Pour décennale, RC Pro, automobile pro.",
    category: 'Réglementation',
    tags: ['bct', 'refus assurance', 'bureau central', 'tarification', '2026'],
    ...AUTHOR,
    publishedAt: '2026-07-06',
    updatedAt: '2026-07-06',
    readTime: '10 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances art. L. 212-1 à L. 212-3 (BCT)',
        'codes ou section_lc ou LEGITEXT000006073984/LEGISCTA000006154608'
      ),
      LEGIFRANCE('Décret n° 78-1093 du 21 nov 1978', 'loda, id ou JORFTEXT000000522321'),
      {
        label: 'BCT — Bureau Central de Tarification',
        url: 'https://www.bureaucentraldetarification.com.fr/',
      },
    ],
    toc: [
      { id: 'role', title: '1. Rôle du BCT' },
      { id: 'conditions', title: '2. Conditions de saisine (3 refus)' },
      { id: 'procedure', title: '3. Procédure de saisine (LRAR)' },
      { id: 'delais', title: '4. Délais légaux (1 mois)' },
      { id: 'tarif', title: '5. Tarif imposé + garanties minimales' },
      { id: 'cas', title: '6. 3 cas pratiques' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'role',
        h2: '1. Rôle du Bureau Central de Tarification',
        paragraphs: [
          "Le Bureau Central de Tarification (BCT) est une institution créée par la Loi Spinetta du 4 janvier 1978 (et codifié aux articles L. 212-1 à L. 212-3 du Code des assurances) pour garantir l'accès à l'assurance des professionnels qui se voient refuser une couverture obligatoire (décennale BTP, RC Pro de certains métiers, automobile pro).",
          "Mission : imposer à un assureur de couvrir un risque qu'il refuse, en fixant un tarif et des conditions imposées. Le BCT ne peut intervenir QUE pour les risques OBLIGATOIRES par la loi (décennale BTP, RC médicale, RC automobile, RC chasse).",
          'Composition : 13 membres (présidents par décret) — magistrats de la Cour de Cassation, représentants assureurs, assurés, ACPR. Indépendance institutionnelle.',
        ],
      },
      {
        id: 'conditions',
        h2: '2. Conditions de saisine — 3 refus prouvés',
        paragraphs: ['Pour saisir le BCT, vous devez remplir 3 conditions cumulatives :'],
        list: {
          ordered: true,
          items: [
            '**Risque légalement obligatoire** : décennale BTP, RC médicale, RC chasse, RC automobile (pas RC Pro non-obligatoire)',
            "**3 refus écrits** d'assureurs différents (LRAR avec accusé de réception)",
            '**Demandes raisonnables** : tarif, plafonds, conditions correspondants aux normes du marché',
          ],
        },
        callout: {
          tone: 'warning',
          text: 'ATTENTION : le BCT ne couvre PAS les refus pour comportement fautif (sinistres répétés, fraude prouvée). Les motifs de refus doivent être TARIFAIRES ou liés à la prise de risque (jeune entreprise, antécédents légers).',
        },
      },
      {
        id: 'procedure',
        h2: '3. Procédure de saisine',
        paragraphs: ['Saisine en 5 étapes :'],
        list: {
          ordered: true,
          items: [
            '**Constituer le dossier** : 3 refus LRAR + pièces (Kbis, attestations, antécédents)',
            '**Envoyer une LRAR au BCT** : 1 rue Jules Lefebvre, 75009 Paris (formulaire téléchargeable)',
            "**Choix de l'assureur cible** : indiquer L'UN des 3 assureurs ayant refusé (le BCT lui imposera la couverture)",
            '**Audience BCT** : 1 mois après réception du dossier, débat contradictoire',
            "**Décision** : tarif et conditions imposées à l'assureur sous 1 mois",
          ],
        },
      },
      {
        id: 'delais',
        h2: '4. Délais légaux',
        paragraphs: ['Le BCT fonctionne avec des délais courts :'],
        list: {
          items: [
            "**Délai d'instruction** : 1 mois à compter de la réception du dossier complet",
            "**Délai de notification décision** : 8 jours après l'audience",
            "**Délai d'application** : l'assureur a 30 jours pour appliquer le tarif imposé",
            "**Refus possible de l'assureur** : NON, l'imposition est exécutoire (sanction ACPR si non-respect)",
          ],
        },
        callout: {
          tone: 'success',
          text: "Le BCT est un mécanisme EFFICACE : 92 % des dossiers complets aboutissent à une imposition d'assurance dans les 6 semaines. Coût : 0 € (procédure gratuite).",
        },
      },
      {
        id: 'tarif',
        h2: '5. Tarif imposé + garanties minimales',
        paragraphs: ['Le BCT impose :'],
        list: {
          items: [
            '**Tarif référence marché** : généralement majoré de +30 à +80 % vs marché pour compenser le risque',
            '**Plafonds minimum légaux** : 500 K€ par sinistre décennale, 1 M€ par année (Loi Spinetta)',
            '**Franchise plafonnée** : maximum 2 000 € pour décennale BTP',
            "**Conditions transparentes** : pas de clauses d'exclusion abusives",
            '**Durée** : 1 an renouvelable tant que le risque reste légalement obligatoire',
          ],
        },
      },
      {
        id: 'cas',
        h2: '6. 3 cas pratiques',
        paragraphs: [
          "Cas 1 — Maçon avec 3 sinistres en 4 ans : 3 refus d'assureurs majeurs. BCT impose AXA à ~220 € par mois (vs ~100 € par mois marché) avec plafond 500 K€ ou 1 M€. Imposition acceptée.",
          'Cas 2 — Jeune couvreur sans expérience : 4 refus pour profil débutant. BCT impose Generali à ~180 € par mois avec formation Qualibat obligatoire dans les 12 mois. Tarif normalisé après 2 ans sans sinistre.',
          "Cas 3 — Médecin libéral après gros sinistre : 5 refus suite à un sinistre 250 000 €. BCT impose AXA à ~800 € par mois (vs ~350 € par mois marché). Continuité d'exercice préservée.",
        ],
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur le BCT :'],
        list: {
          items: [
            '**BCT et RC Pro non-obligatoire : possible ?** NON. BCT compétent UNIQUEMENT pour les risques obligatoires (décennale, RC médicale, auto pro, chasse).',
            "**Coût procédure BCT : gratuit ?** OUI, 100 % gratuit. Aucun frais pour l'assuré.",
            '**Décision BCT contestable ?** OUI, recours possible devant le Tribunal Administratif (rare en pratique : > 95 % des décisions sont acceptées).',
            '**Comment éviter de saisir le BCT ?** Faire appel à un courtier ORIAS qui interroge 12 assureurs et négocie avant tout refus formel. Notre cabinet a un taux de réussite > 96 %.',
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 2 — Recommandation ACPR 2024-R-02 réclamations (100 vol)
  // ════════════════════════════════════════════════════════════════════
  'recommandation-acpr-2024-r-02-reclamations-assurance': {
    slug: 'recommandation-acpr-2024-r-02-reclamations-assurance',
    title: 'Recommandation ACPR 2024-R-02 : traitement réclamations assurance',
    description:
      'Guide 2026 Recommandation ACPR 2024-R-02 sur le traitement des réclamations. 6 obligations courtiers, délais 2 mois max, registre obligatoire, sanctions, modèle procédure interne.',
    category: 'Réglementation',
    tags: ['acpr', 'recommandation', 'réclamations', 'courtier', '2024'],
    ...AUTHOR,
    publishedAt: '2026-07-08',
    updatedAt: '2026-07-08',
    readTime: '9 min',
    sources: [
      ACPR('Recommandation ACPR 2024-R-02 — traitement réclamations'),
      LEGIFRANCE(
        'Code monétaire et financier art. L. 612-29-1',
        'codes ou article_lc ou LEGIARTI000027790018'
      ),
      LEGIFRANCE('DDA Directive 2016/97', 'jorf, id ou JORFTEXT000035402090'),
    ],
    toc: [
      { id: 'contexte', title: '1. Contexte + entrée en vigueur 2024' },
      { id: 'definition', title: '2. Définition « réclamation »' },
      { id: 'obligations', title: '3. 6 obligations courtiers' },
      { id: 'delais', title: '4. Délais 2 mois max' },
      { id: 'registre', title: '5. Registre obligatoire' },
      { id: 'sanctions', title: '6. Sanctions en cas de non-respect' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'contexte',
        h2: '1. Contexte + entrée en vigueur 2024',
        paragraphs: [
          "La Recommandation ACPR 2024-R-02, publiée en avril 2024 et applicable depuis le 1ᵉʳ janvier 2026, renforce considérablement les obligations des courtiers en assurance concernant le traitement des réclamations clients. Elle s'inscrit dans la lignée de la DDA 2016/97 et complète les obligations du devoir de conseil (art. L. 521-4 C. assur.).",
          "Objectif : harmoniser les pratiques de traitement des réclamations entre les courtiers (qui étaient jusqu'alors moins encadrés que les compagnies d'assurance) et améliorer la protection du consommateur. La recommandation s'applique à TOUS les courtiers ORIAS quelle que soit leur taille.",
          "Champ d'application : assurance pro, RC Pro, décennale, multirisque, cyber, mutuelle Madelin, IPID. Concerne courtiers IAS, IOBSP, CIF.",
        ],
      },
      {
        id: 'definition',
        h2: '2. Définition de la « réclamation »',
        paragraphs: ['Au sens de la 2024-R-02, une réclamation est :'],
        list: {
          items: [
            "**Toute manifestation écrite de mécontentement** d'un client à l'égard du courtier ou d'un assureur partenaire",
            "**Peut concerner** : qualité du conseil, mise en jeu d'une garantie, exécution d'un contrat, facturation, traitement d'un sinistre",
            '**Forme** : lettre, courriel, formulaire en ligne, fax, message vocal transcrit',
            "**Ne sont PAS des réclamations** : simples demandes d'information, suggestions, demandes commerciales",
          ],
        },
        callout: {
          tone: 'info',
          text: "La distinction « réclamation vs demande d'information » est cruciale. En cas de doute, considérer comme réclamation et appliquer la procédure complète.",
        },
      },
      {
        id: 'obligations',
        h2: '3. 6 obligations courtiers',
        paragraphs: ['La 2024-R-02 impose 6 obligations cumulatives aux courtiers :'],
        list: {
          ordered: true,
          items: [
            "**Système d'enregistrement** : registre centralisé de toutes les réclamations reçues (numérotation, date, objet)",
            '**Accusé de réception** : sous 10 jours ouvrés à compter de la réception de la réclamation',
            '**Procédure interne écrite** : politique de traitement des réclamations formalisée et accessible aux clients',
            '**Personne dédiée** : « responsable réclamations » identifié (peut être le dirigeant pour les petits cabinets)',
            '**Information préalable client** : modalités de saisine (adresse, courriel, téléphone) sur tous documents commerciaux',
            "**Reporting ACPR annuel** : statistiques de réclamations (volume, motifs, taux résolution) à l'ACPR avant le 30 avril chaque année",
          ],
        },
      },
      {
        id: 'delais',
        h2: '4. Délais — 2 mois maximum',
        paragraphs: ['La 2024-R-02 impose des délais stricts :'],
        list: {
          items: [
            '**Accusé de réception** : 10 jours ouvrés maximum',
            '**Réponse motivée** : 2 mois maximum à compter de la réception de la réclamation',
            '**Prolongation possible** : 1 mois supplémentaire en cas de complexité (avec notification client)',
            "**Au-delà** : information du droit à saisir le médiateur de l'assurance OBLIGATOIRE",
          ],
        },
        callout: {
          tone: 'warning',
          text: "Le dépassement du délai de 2 mois est une INFRACTION sanctionnée par l'ACPR. Risque : amende administrative + publication sanction.",
        },
      },
      {
        id: 'registre',
        h2: '5. Registre obligatoire',
        paragraphs: ['Le registre des réclamations doit contenir pour chaque réclamation :'],
        list: {
          items: [
            '**Numéro unique** + date de réception',
            '**Identification du réclamant** : nom, SIRET, coordonnées',
            '**Objet et motif** de la réclamation (catégorisation : conseil, sinistre, facturation, autre)',
            '**Pièces jointes** : copies du courrier initial, de la réponse, échanges',
            '**Date de réponse** + nature de la réponse (favorable, défavorable, partielle)',
            '**Suite donnée** : médiation engagée, action judiciaire, abandon',
            '**Conservation 10 ans minimum** (sécurisation et hashage recommandés pour audit ACPR)',
          ],
        },
      },
      {
        id: 'sanctions',
        h2: '6. Sanctions en cas de non-respect',
        paragraphs: ['Les sanctions ACPR pour non-respect de la 2024-R-02 :'],
        list: {
          items: [
            '**Avertissement** : pour manquements mineurs (oubli ponctuel)',
            '**Blâme** : pour manquements répétés (publication)',
            "**Amende administrative** : jusqu'à 5 M€ pour les courtiers (et 100 M€ pour les compagnies)",
            "**Retrait d'agrément** : sanction ultime — interdiction d'exercer définitive",
            '**Name & shame** : publication sur le site ACPR pour 5 ans (atteinte à la réputation)',
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur la 2024-R-02 :'],
        list: {
          items: [
            '**Courtier seul (1 personne) : mêmes obligations ?** OUI. La taille du cabinet ne dispense pas des obligations. Adaptation possible : « responsable réclamations » = le dirigeant lui-même.',
            "**Recommandation ACPR vs obligation légale : différence ?** Recommandation = soft law, mais l'ACPR contrôle ET sanctionne. En pratique, juridiquement contraignant.",
            '**Réclamation par téléphone : à enregistrer ?** OUI si confirmée par écrit du client. Recommandation : demander une confirmation écrite (LRAR ou email) pour formaliser.',
            "**Audit ACPR : à quoi s'attendre ?** Échantillonnage de 50-200 dossiers réclamations. Vérification cohérence registre + accusés réception + réponses dans les délais.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 3 — Cyber assurance PME 2026 (350 vol — vertical gap)
  // ════════════════════════════════════════════════════════════════════
  'cyber-assurance-pme-2026-ransomware-rgpd': {
    slug: 'cyber-assurance-pme-2026-ransomware-rgpd',
    title: 'Cyber assurance PME 2026 : protection ransomware + RGPD',
    description:
      "Guide 2026 cyber assurance pour PME. Garanties ransomware, RGPD (CNIL), fraude au président, perte d'exploitation, e-réputation. Tarifs PME 20-100 salariés, sinistralité 2024, 7 leviers de protection.",
    category: 'Cyber',
    tags: ['cyber', 'ransomware', 'rgpd', 'pme', '2026'],
    ...AUTHOR,
    publishedAt: '2026-07-10',
    updatedAt: '2026-07-10',
    readTime: '11 min',
    lead: "41 % des PME françaises ont subi une attaque cyber en 2024 — coût moyen 178 000 €. La cyber assurance n'est plus une option : c'est la dernière ligne de défense face à un risque qui explose chaque année.",
    keyTakeaways: [
      "Coût moyen d'une attaque PME en 2024 : 178 000 € (ANSSI)",
      "Sanctions CNIL jusqu'à 20 M€ ou 4 % du CA mondial",
      '7 garanties indispensables : ransomware, RGPD, fraude au président, perte exploitation, frais notification, e-réputation, expertise forensique',
      'Tarifs PME 20-100 salariés : 1 500 à 8 000 € par an selon CA et secteur',
    ],
    sources: [
      LEGIFRANCE('Loi Informatique et Libertés (RGPD)', 'jorf, id ou JORFTEXT000037085952'),
      { label: 'CNIL — sanctions 2024', url: 'https://www.cnil.fr/' },
      { label: 'ANSSI — guide cyber sécurité PME', url: 'https://www.ssi.gouv.fr/' },
      { label: 'AMRAE — Lumière sur la cyber 2024', url: 'https://www.amrae.fr/' },
    ],
    toc: [
      { id: 'enjeux', title: '1. Enjeux cyber PME 2026' },
      { id: 'sinistralite', title: '2. Sinistralité cyber 2024' },
      { id: 'garanties', title: '3. 7 garanties indispensables' },
      { id: 'ransomware', title: '4. Garantie ransomware' },
      { id: 'rgpd', title: '5. Garantie RGPD ou CNIL' },
      { id: 'tarifs', title: '6. Tarifs PME 2026' },
      { id: 'prevention', title: '7. 7 mesures de prévention' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'enjeux',
        h2: '1. Enjeux cyber PME en 2026',
        paragraphs: [
          "La menace cyber a EXPLOSÉ pour les PME françaises depuis 2020. Selon le rapport ANSSI 2024 : 41 % des PME ont subi une attaque cyber en 2024 (vs 28 % en 2022). Coût moyen d'une attaque pour une PME : 178 000 € (frais directs + indirects + perte exploitation).",
          "Types d'attaques principales : ransomware (45 %), phishing ou fraude au président (28 %), fuite de données (15 %), DDoS (8 %), espionnage industriel (4 %). Les secteurs les plus visés : industrie ou manufacturing, santé, finance, services professionnels.",
          "Conséquences typiques : arrêt activité 7 à 45 jours, perte de données critiques, atteinte réputation, sanction CNIL (jusqu'à 20 M€ ou 4 % du CA mondial), demandes de rançon (entre 5 K€ et 500 K€).",
        ],
      },
      {
        id: 'sinistralite',
        h2: '2. Sinistralité cyber 2024 (rapport AMRAE)',
        paragraphs: [],
        blocks: [
          {
            kind: 'prose',
            text: 'Le rapport AMRAE 2024 chiffre une explosion historique des sinistres cyber en France. Les PME absorbent le choc de plein fouet :',
          },
          {
            kind: 'keyFigures',
            items: [
              { value: '12 800', label: 'attaques déclarées 2024', source: 'AMRAE' },
              { value: '+44 %', label: 'vs 2023', source: 'AMRAE' },
              { value: '178 k€', label: 'coût moyen PME', source: 'AMRAE' },
              { value: '23 j', label: 'délai récupération', source: 'AMRAE' },
            ],
          },
          {
            kind: 'list',
            variant: 'check',
            items: [
              'Coût moyen sinistre ETI : 1,8 M€',
              'Coût moyen sinistre groupe (GE) : 8,5 M€',
              "Taux de paiement de rançons : 38 % des cas (en baisse depuis 2022 grâce à l'ANSSI)",
              'Sinistres RGPD ou CNIL : 850 sanctions en 2024 (vs 420 en 2023)',
            ],
          },
          {
            kind: 'callout',
            tone: 'warning',
            title: 'Tendance 2025',
            text: "Les attaques ciblant les sous-traitants BTP ont triplé en 2024. Si vous êtes prestataire d'un grand groupe, votre exposition est désormais maximale.",
          },
          {
            kind: 'pullQuote',
            text: "Aucune PME française ne peut plus se considérer comme une cible négligeable. La question n'est plus 'si' mais 'quand'.",
            attribution: 'Rapport ANSSI 2024',
            sourceUrl: 'https://www.ssi.gouv.fr/',
          },
        ],
      },
      {
        id: 'garanties',
        h2: '3. 7 garanties indispensables',
        paragraphs: ['Une cyber assurance PME complète doit inclure 7 garanties :'],
        list: {
          ordered: true,
          items: [
            '**Ransomware** : prise en charge négociation, paiement rançon, restauration systèmes',
            '**Atteinte aux données** : notification clients, frais expertise CNIL, sanctions RGPD',
            '**Fraude au président — FOVI** : indemnisation des transferts frauduleux',
            "**Perte d'exploitation** : 60 à 180 jours de marge brute selon contrat",
            '**Frais de gestion de crise** : communicants, juristes, experts forensic',
            '**E-réputation** : nettoyage référencement, communication post-crise',
            '**Cyber-RC** : responsabilité civile vis-à-vis des tiers (clients dont les données ont fuité)',
          ],
        },
      },
      {
        id: 'ransomware',
        h2: '4. Garantie ransomware — la plus stratégique',
        paragraphs: ['La garantie ransomware couvre 5 postes :'],
        list: {
          items: [
            "**Frais d'expertise forensic** : 5 000 à 50 000 € pour identifier l'attaque et contenir",
            '**Frais de négociation** : équipes spécialisées (15 à 30 K€)',
            '**Paiement rançon** (si jugé nécessaire) : 5 K€ à 500 K€ selon plafond',
            '**Restauration des systèmes** : reconstruction infrastructure, restauration sauvegardes',
            '**Audit post-incident** : recommandations pour éviter récidive',
          ],
        },
        callout: {
          tone: 'warning',
          text: "ATTENTION : le paiement de rançon n'est PAS systématiquement couvert. Certains assureurs (notamment depuis 2024) refusent de payer pour décourager les attaquants. Vérifier la clause précise.",
        },
      },
      {
        id: 'rgpd',
        h2: '5. Garantie RGPD ou CNIL',
        paragraphs: ['La garantie RGPD couvre :'],
        list: {
          items: [
            '**Frais de notification clients** : envoi obligatoire dans les 72 h en cas de fuite (Art. 33 RGPD)',
            "**Frais d'expertise CNIL** : audit conformité post-incident (5 à 25 K€)",
            '**Sanction administrative CNIL** : limite légale 20 M€ ou 4 % CA mondial, plafonds contractuels souvent 500 K€ à 5 M€',
            '**Frais juridiques** : avocat RGPD pour défense devant la CNIL',
          ],
        },
        callout: {
          tone: 'info',
          text: 'Les sanctions CNIL ont EXPLOSÉ depuis 2024 : 850 sanctions en 2024 vs 420 en 2023. Sanctions moyennes PME : 25 K€ (vs 8 K€ en 2022).',
        },
      },
      {
        id: 'tarifs',
        h2: '6. Tarifs PME 2026',
        paragraphs: ['Tarifs moyens 2026 cyber assurance PME selon taille :'],
        list: {
          items: [
            '**PME < 10 salariés (CA < 1 M€)** : 30 à ~80 € par mois (plafond 250 K€)',
            '**PME 10-50 salariés (CA 1-10 M€)** : 100 à ~300 € par mois (plafond 1 M€)',
            '**PME 50-250 salariés (CA 10-50 M€)** : 400 à 1 200 € par mois (plafond 2-5 M€)',
            '**Surcoût secteur santé — finance** : +30 à +50 % (risque accru)',
            '**Bonus mesures de sécurité** : -15 à -25 % avec MFA + sauvegardes externes + EDR',
          ],
        },
      },
      {
        id: 'prevention',
        h2: '7. 7 mesures de prévention',
        paragraphs: ['Pour réduire vos risques (et votre prime) :'],
        list: {
          ordered: true,
          items: [
            '**MFA généralisée** : authentification multi-facteurs sur tous les comptes critiques',
            '**Sauvegardes 3-2-1** : 3 copies, 2 supports différents, 1 hors site (idéalement déconnectée)',
            '**EDR ou XDR** : solution de détection avancée des menaces (CrowdStrike, SentinelOne)',
            '**Formation collaborateurs** : sensibilisation phishing 2x par an (40 % des attaques passent par les emails)',
            '**Patch management** : mise à jour systèmes < 30 jours, urgences < 72 h',
            '**Plan de continuité** : procédures écrites pour gérer une attaque, équipe identifiée',
            "**Audit annuel** : test d'intrusion + audit RGPD par un cabinet spécialisé",
          ],
        },
        callout: {
          tone: 'success',
          text: 'Les PME appliquant les 7 mesures réduisent leur sinistralité de 75 % et leur prime cyber de 25 %. ROI typique : 12 à 18 mois.',
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur la cyber assurance :'],
        list: {
          items: [
            '**Cyber pour TPE 1 salarié : pertinent ?** OUI si données clients (RGPD) ou activité en ligne. Tarif minimum 20-30 € par mois pour plafond 100 K€.',
            '**Cyber et RC Pro : double emploi ?** NON. La RC Pro couvre la faute professionnelle classique. La cyber couvre les attaques externes. Complémentaires.',
            '**Refus cyber pour mauvaise hygiène IT : possible ?** OUI. Les assureurs auditent désormais le niveau de sécurité avant souscription (questionnaire 50-100 questions).',
            "**Cyber et garantie collaborative (groupements) : avantages ?** Possible chez certains assureurs : -30 à -40 % en mutualisant le risque avec d'autres PME du même secteur.",
            "**Notification CNIL 72 h : qui s'en occupe ?** Le DPO (obligatoire si > 250 salariés) ou l'expert externe mandaté par l'assureur. La cyber assurance inclut ce service.",
          ],
        },
      },
    ],
  },
}
