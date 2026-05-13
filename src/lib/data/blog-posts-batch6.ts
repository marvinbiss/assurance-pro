/**
 * Blog articles — Batch 6 (4 articles étoffés à ~1500 mots)
 *
 * Session 5 du programme éditorial Ahrefs.
 * Catégorie B (attestation/résiliation/IPID/cartes pro).
 *
 * Date génération : 2026-05-13 (session 5)
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

const ORIAS = (label: string) => ({
  label,
  url: 'https://www.orias.fr/',
})

export const BLOG_POSTS_BATCH_6: Record<string, BlogPost> = {
  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 1 — Attestation RC Pro modèle PDF 2026 (450 vol)
  // ════════════════════════════════════════════════════════════════════
  'attestation-rc-pro-modele-pdf-2026': {
    slug: 'attestation-rc-pro-modele-pdf-2026',
    title: 'Attestation RC Pro 2026 : modèle PDF + 9 mentions obligatoires',
    description:
      "Modèle 2026 d'attestation RC Pro conforme. 9 mentions obligatoires, format PDF, période validité, sanctions absence, démarches obtention rapide en moins de 24 h.",
    category: 'Attestation',
    tags: ['attestation rc pro', 'modèle', 'pdf', '2026', 'mentions'],
    ...AUTHOR,
    publishedAt: '2026-06-10',
    updatedAt: '2026-06-10',
    readTime: '10 min',
    sources: [
      LEGIFRANCE('Code des assurances art. L. 124-1', 'codes/article_lc/LEGIARTI000006792570'),
      LEGIFRANCE('Arrêté du 6 décembre 2022 (cliquabilité ORIAS)', 'jorf/id/JORFTEXT000046718521'),
      ORIAS('ORIAS — vérification courtier'),
      ACPR('ACPR — contrôle attestations'),
    ],
    toc: [
      { id: 'definition', title: "1. Qu'est-ce qu'une attestation RC Pro" },
      { id: 'mentions', title: '2. 9 mentions obligatoires 2026' },
      { id: 'modele', title: '3. Modèle PDF type' },
      { id: 'validite', title: '4. Période de validité' },
      { id: 'sanctions', title: "5. Sanctions en cas d'absence" },
      { id: 'obtention', title: "6. Démarches d'obtention (24 h)" },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'definition',
        h2: "1. Qu'est-ce qu'une attestation RC Pro",
        paragraphs: [
          "L'attestation de Responsabilité Civile Professionnelle (RC Pro) est le document délivré par un assureur ou courtier prouvant qu'une entreprise est couverte par une police RC Pro en cours de validité. Elle est exigée :",
          "Pour les 15 métiers à RC Pro obligatoire (santé, immobilier, conseil, sport, transport, animaux, sécurité, formation pro), elle DOIT être remise au client AVANT toute prestation. Pour les autres métiers, elle est demandée par les donneurs d'ordre B2B (appels d'offres, contrats cadres) comme justificatif de solvabilité.",
          "Distinction importante : l'attestation RC Pro ≠ attestation décennale. L'attestation RC Pro couvre les dommages causés à des tiers PENDANT l'activité (passant blessé, dégâts au bien d'un client). L'attestation décennale couvre les défauts STRUCTURELS d'un ouvrage pendant 10 ans après réception.",
        ],
        list: {
          items: [
            '**Avant signature de contrat** : annexe au bon de commande, devis ou marché public',
            '**Avant chantier** : pour les métiers manuels et BTP (obligation légale art. L. 243-2)',
            '**Lors de contrôles** : par la DGCCRF, ACPR, ou ORIAS',
            '**À la demande du client** : sur simple demande pour rassurance commerciale',
          ],
        },
      },
      {
        id: 'mentions',
        h2: '2. 9 mentions obligatoires 2026',
        paragraphs: [
          'Une attestation RC Pro valide 2026 DOIT comporter les 9 mentions suivantes (Arrêté du 6 décembre 2022 + Code des assurances) :',
        ],
        list: {
          ordered: true,
          items: [
            "**Nom commercial + raison sociale + n° SIRET** de l'assuré",
            "**Adresse complète** du siège social + lieu(x) d'exercice si différent",
            '**Activité(s) assurée(s)** : description précise des métiers couverts (code APE/NAF + libellé)',
            "**Nom + adresse de l'assureur** + n° SIREN de la compagnie",
            "**Nom + n° ORIAS du courtier intermédiaire** avec mention cliquable depuis l'arrêté du 6 décembre 2022",
            "**N° de police d'assurance** RC Pro souscrite",
            '**Période de validité** : date de début + date de fin (généralement 1 an glissant)',
            "**Plafonds de garantie** : montant maximum par sinistre + par année d'assurance + sous-plafonds spécifiques",
            '**Zone géographique** de couverture : France, UE, monde entier',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Une attestation RC Pro sans l'une de ces 9 mentions est NON-CONFORME et peut être rejetée par le client ou contestée en cas de sinistre. Vérifier systématiquement.",
        },
      },
      {
        id: 'modele',
        h2: '3. Modèle PDF type',
        paragraphs: [
          "Structure type d'une attestation RC Pro conforme 2026, organisée en 4 blocs :",
        ],
        list: {
          ordered: true,
          items: [
            '**En-tête assureur** : logo, raison sociale, SIREN, adresse, téléphone, courriel',
            '**Bloc identification assuré** : raison sociale, SIRET, adresse, activité avec code APE',
            '**Bloc garanties** : nom du contrat, n° police, plafonds, franchise, période validité, zone géo',
            "**Pied de page** : courtier ORIAS (nom + n°), date d'émission, signature électronique qualifiée",
          ],
        },
        callout: {
          tone: 'info',
          text: "Notre cabinet émet l'attestation au format PDF signé électroniquement (eIDAS qualifiée) en moins de 4 h ouvrées. Téléchargement instantané + envoi au client + archive 10 ans.",
        },
      },
      {
        id: 'validite',
        h2: '4. Période de validité',
        paragraphs: [
          "La période de validité d'une attestation RC Pro est CLASSIQUEMENT de 12 mois glissants à compter de la date d'émission. Elle correspond à l'année d'assurance souscrite. Renouvellement automatique par tacite reconduction (art. L. 113-12 C. assur.) sauf résiliation à l'échéance.",
          "Attention : une attestation peut être ANTIDATÉE techniquement (effet rétroactif) mais cette pratique est strictement encadrée. La rétroactivité ne peut excéder 30 jours et nécessite une déclaration de l'assuré sur les sinistres connus. En cas de fausse déclaration, l'attestation est nulle.",
          "Pour les contrats annuels classiques, la date de validité court du 1ᵉʳ jour du mois de souscription au dernier jour du même mois l'année suivante. Pour les contrats mensuels (rare en RC Pro), validité mois par mois.",
        ],
      },
      {
        id: 'sanctions',
        h2: "5. Sanctions en cas d'absence",
        paragraphs: [
          "Pour les métiers à RC Pro obligatoire, l'absence d'attestation lors d'un contrôle entraîne :",
        ],
        list: {
          items: [
            "**Amende administrative** : jusqu'à 7 500 € (DGCCRF, art. L. 243-3)",
            "**Interdiction d'exercer** : immédiate, peut être définitive en cas de récidive",
            '**Responsabilité civile illimitée** : patrimoine personnel saisissable si auto-entrepreneur ou EI',
            "**Annulation des contrats** : un client peut résilier un contrat en cours pour défaut d'assurance",
            '**Inscription au FICOBA** : signalement aux organismes de contrôle',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Pour les marchés publics, l'absence d'attestation RC Pro entraîne l'EXCLUSION immédiate du marché + signalement à la préfecture. Possibilité d'inscription sur la liste noire des entreprises non conformes.",
        },
      },
      {
        id: 'obtention',
        h2: "6. Démarches d'obtention en moins de 24 h",
        paragraphs: ['Pour obtenir rapidement votre attestation RC Pro, 4 étapes :'],
        list: {
          ordered: true,
          items: [
            "**Identification de l'activité** : code APE/NAF officiel, description précise, expérience pro, formations/diplômes",
            '**Évaluation des risques** : CA prévisionnel, zone géographique, clientèle B2B/B2C, antécédents',
            '**Comparaison multi-assureurs** : un courtier ORIAS interroge 8 à 12 assureurs partenaires en moins de 4 h',
            '**Souscription + paiement** : signature électronique qualifiée, paiement par prélèvement, attestation PDF envoyée par courriel immédiatement',
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ["Réponses aux questions fréquentes sur l'attestation RC Pro :"],
        list: {
          items: [
            '**Attestation perdue : comment la récupérer ?** Demander un duplicata à votre assureur ou courtier. Émission immédiate sur Espace Client. Gratuit pour 1ʳᵉ demande, parfois 5 à 15 € pour duplicatas multiples.',
            '**Attestation antidatée : risqué ?** OUI. Pratique encadrée. Rétroactivité limitée à 30 jours + déclaration sinistres. Faux ou usage de faux = délit pénal (3 ans + 45 000 €).',
            "**Refus d'émission attestation : recours ?** Possibles : contestation devant le médiateur de l'assurance, saisine de l'ACPR, action devant le Tribunal Judiciaire. Notre cabinet accompagne ces démarches.",
            "**Attestation provisoire : valable ?** OUI temporairement (30 jours max). Délivrée pendant l'instruction de la souscription. Mention « provisoire » obligatoire. Doit être remplacée par l'attestation définitive sous 30 jours.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 2 — Lettre résiliation assurance pro Loi Hamon (350 vol)
  // ════════════════════════════════════════════════════════════════════
  'lettre-resiliation-assurance-pro-loi-hamon-2026': {
    slug: 'lettre-resiliation-assurance-pro-loi-hamon-2026',
    title: 'Lettre de résiliation assurance pro 2026 : modèles Loi Hamon + Chatel',
    description:
      'Modèles 2026 lettres résiliation assurance pro. Loi Hamon (1ʳᵉ année), Loi Chatel (échéance), résiliation pour motif. LRAR, recommandé électronique, mentions obligatoires, 3 cas pratiques.',
    category: 'Résiliation',
    tags: ['résiliation', 'loi hamon', 'loi chatel', 'modèle', 'lettre'],
    ...AUTHOR,
    publishedAt: '2026-06-12',
    updatedAt: '2026-06-12',
    readTime: '10 min',
    sources: [
      LEGIFRANCE(
        'Loi Hamon 17 mars 2014 (art. L. 113-15-2 C. assur.)',
        'jorf/id/JORFTEXT000028738036'
      ),
      LEGIFRANCE('Loi Chatel 28 janvier 2005', 'jorf/id/JORFTEXT000000444571'),
      LEGIFRANCE('Code des assurances art. L. 113-12', 'codes/article_lc/LEGIARTI000006792511'),
    ],
    toc: [
      { id: 'cadre', title: '1. Cadre légal résiliation assurance pro' },
      { id: 'hamon', title: '2. Loi Hamon — 1ʳᵉ année après souscription' },
      { id: 'chatel', title: "3. Loi Chatel — résiliation à l'échéance" },
      { id: 'motif', title: '4. Résiliation pour motif (sinistre, changement)' },
      { id: 'modele-hamon', title: '5. Modèle lettre Loi Hamon' },
      { id: 'modele-chatel', title: '6. Modèle lettre Loi Chatel' },
      { id: 'envoi', title: "7. Modalités d'envoi (LRAR ou recommandé électronique)" },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'cadre',
        h2: '1. Cadre légal — 4 motifs de résiliation',
        paragraphs: [
          "La résiliation d'un contrat d'assurance professionnelle obéit à un cadre légal strict. Quatre motifs de résiliation existent en 2026 :",
        ],
        list: {
          ordered: true,
          items: [
            "**Loi Hamon (art. L. 113-15-2)** : résiliation possible à tout moment APRÈS 1 an d'engagement, sans frais ni justification",
            "**Loi Chatel (art. L. 113-15-1)** : résiliation à l'échéance annuelle, préavis 2 mois si l'assureur a respecté ses obligations d'avis",
            '**Résiliation pour motif** : changement de situation, sinistre, hausse tarifaire injustifiée — préavis 1 à 3 mois selon motif',
            "**Résiliation d'un commun accord** : avenant signé par les 2 parties, effet à la date convenue",
          ],
        },
      },
      {
        id: 'hamon',
        h2: '2. Loi Hamon — résiliation à tout moment après 1 an',
        paragraphs: [
          "Depuis la Loi Hamon du 17 mars 2014, l'assuré peut résilier son contrat d'assurance pro à tout moment APRÈS 1 an d'engagement, sans frais ni justification. Conditions :",
        ],
        list: {
          items: [
            "**Date d'effet** : 1 mois après réception de la demande par l'assureur",
            "**Forme** : lettre recommandée avec accusé de réception (LRAR), recommandé électronique, ou lettre simple par email avec preuve d'envoi",
            "**Délai d'attente** : minimum 12 mois depuis la date de souscription (sinon résiliation impossible avant échéance annuelle)",
            "**Remboursement** : prorata temporis des primes payées d'avance",
            '**Aucune justification** : ni motif particulier, ni preuve de souscription nouveau contrat',
          ],
        },
        callout: {
          tone: 'success',
          text: "La Loi Hamon est l'option la plus flexible. À utiliser systématiquement après la 1ʳᵉ année si le tarif ou les garanties ne conviennent plus.",
        },
      },
      {
        id: 'chatel',
        h2: "3. Loi Chatel — résiliation à l'échéance",
        paragraphs: [
          "La Loi Chatel du 28 janvier 2005 (art. L. 113-15-1 C. assur.) impose à l'assureur d'envoyer un avis d'échéance avec rappel du droit à résiliation au plus tard 15 jours AVANT la date limite de préavis. Si l'assureur ne respecte pas ce délai :",
        ],
        list: {
          items: [
            "**L'assuré peut résilier à tout moment** sans frais ni justification",
            "**Délai supplémentaire de 20 jours** est accordé après réception de l'avis tardif",
            "**Sanction** : l'assureur ne peut pas opposer la tacite reconduction",
          ],
        },
        callout: {
          tone: 'info',
          text: "Si l'avis Chatel est conforme, le préavis classique de 2 mois s'applique : lettre à envoyer au plus tard 2 mois avant la date d'échéance.",
        },
      },
      {
        id: 'motif',
        h2: '4. Résiliation pour motif (sinistre, changement)',
        paragraphs: ['Plusieurs motifs permettent une résiliation hors cadre Hamon/Chatel :'],
        list: {
          items: [
            "**Changement de situation** (art. L. 113-16) : changement de domicile, situation matrimoniale, profession, régime matrimonial — résiliation 3 mois après l'événement",
            "**Hausse tarifaire injustifiée** (art. L. 113-4) : si l'assureur augmente la prime sans modification du risque — résiliation 30 jours après notification",
            "**Sinistre** : possible par l'assureur (1 mois après sinistre) ou par l'assuré (1 mois après refus de garantie)",
            "**Cession d'entreprise** : automatique avec transfert au cessionnaire ou résiliation par l'une des parties",
          ],
        },
      },
      {
        id: 'modele-hamon',
        h2: '5. Modèle lettre Loi Hamon',
        paragraphs: [
          'Exemple type de lettre de résiliation Loi Hamon :',
          '**Objet** : Résiliation contrat assurance professionnelle n° [numéro] — Loi Hamon',
          'Madame, Monsieur,',
          "Conformément à l'article L. 113-15-2 du Code des assurances (Loi Hamon du 17 mars 2014), je vous notifie ma volonté de résilier le contrat d'assurance professionnelle référencé en objet, souscrit le [date], dont je suis titulaire.",
          'La résiliation prendra effet 1 mois après la réception de la présente lettre, soit le [date dans 1 mois].',
          "Je vous prie de bien vouloir m'adresser un avis de résiliation confirmant la date d'effet, ainsi que le décompte des primes à rembourser au prorata temporis.",
          "Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
          '[Signature + date + nom]',
        ],
      },
      {
        id: 'modele-chatel',
        h2: '6. Modèle lettre Loi Chatel',
        paragraphs: [
          'Exemple type de lettre de résiliation Loi Chatel :',
          '**Objet** : Résiliation contrat assurance professionnelle n° [numéro] — Loi Chatel',
          'Madame, Monsieur,',
          "Conformément à l'article L. 113-15-1 du Code des assurances (Loi Chatel du 28 janvier 2005), je vous notifie ma volonté de résilier le contrat d'assurance professionnelle référencé en objet à son prochaine échéance annuelle, soit le [date d'échéance].",
          'Cette lettre est envoyée en respectant le préavis de 2 mois prévu par la loi.',
          "Je vous prie de bien vouloir m'adresser un avis de résiliation confirmant la date d'effet.",
          "Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
          '[Signature + date + nom]',
        ],
      },
      {
        id: 'envoi',
        h2: "7. Modalités d'envoi",
        paragraphs: ["Trois modalités d'envoi sont admises depuis 2020 :"],
        list: {
          ordered: true,
          items: [
            '**Lettre Recommandée avec AR (LRAR)** : forme classique, preuve indiscutable, coût ~7 € — délai 3 à 5 jours',
            '**Recommandé électronique qualifié** (eIDAS) : valeur juridique identique à LRAR, instantané, coût ~4 € — services AR24, Maileva, Lettre Recommandée Numérique',
            "**Email avec accusé de réception** : valable depuis la Loi Confiance 2020 si l'assureur l'autorise dans les CGV (vérifier au cas par cas)",
          ],
        },
        callout: {
          tone: 'warning',
          text: 'Ne JAMAIS envoyer par simple email sans AR : pas de preuve de réception. En cas de litige, la résiliation peut être contestée.',
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur la résiliation assurance pro :'],
        list: {
          items: [
            "**Résilier avant 1 an : possible ?** NON sauf motif légitime (sinistre, déménagement, cession). Loi Hamon ne s'applique qu'après 12 mois d'engagement.",
            "**Tacite reconduction : comment l'éviter ?** Respecter le préavis de 2 mois avant échéance ou utiliser Loi Hamon après 1 an. Vérifier les CGV : certains contrats imposent 3 mois.",
            "**Assureur refuse la résiliation : recours ?** Saisir le médiateur de l'assurance (gratuit, 90 jours), puis Tribunal Judiciaire si besoin. Notre cabinet accompagne.",
            '**Résiliation + souscription nouveau contrat : risque de découvert ?** OUI. Toujours faire chevaucher 1 mois pour éviter rupture de couverture. Notre cabinet coordonne les dates.',
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 3 — Carte professionnelle assurance courtier (300 vol)
  // ════════════════════════════════════════════════════════════════════
  'carte-professionnelle-assurance-courtier': {
    slug: 'carte-professionnelle-assurance-courtier',
    title: 'Cartes professionnelles courtier : T, G, S — guide 2026',
    description:
      'Guide 2026 des cartes professionnelles obligatoires en immobilier et courtage. Carte T (transactions), G (gestion locative), S (syndic), I (intermédiaire). RC Pro obligatoire, formations, délais préfecture.',
    category: 'Réglementation',
    tags: ['carte t', 'carte g', 'carte s', 'courtier', 'immobilier'],
    ...AUTHOR,
    publishedAt: '2026-06-14',
    updatedAt: '2026-06-14',
    readTime: '10 min',
    sources: [
      LEGIFRANCE('Loi Hoguet du 2 janvier 1970', 'loda/id/JORFTEXT000000875432'),
      LEGIFRANCE('Loi ALUR du 24 mars 2014', 'jorf/id/JORFTEXT000028772256'),
      ORIAS('ORIAS — registre intermédiaires'),
    ],
    toc: [
      { id: 'definition', title: '1. Cartes professionnelles : définition' },
      { id: 'carte-t', title: '2. Carte T — transactions immobilières' },
      { id: 'carte-g', title: '3. Carte G — gestion locative' },
      { id: 'carte-s', title: '4. Carte S — syndic de copropriété' },
      { id: 'courtier-orias', title: '5. Courtier ORIAS (CIF/IOBSP/IAS)' },
      { id: 'rc-pro', title: '6. RC Pro obligatoire' },
      { id: 'demarches', title: "7. Démarches d'obtention" },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'definition',
        h2: '1. Cartes professionnelles : un cadre Loi Hoguet',
        paragraphs: [
          "La Loi Hoguet du 2 janvier 1970 (modifiée par Loi ALUR 2014) impose aux professionnels de l'immobilier et du courtage la détention de cartes professionnelles spécifiques selon leur activité. Ces cartes sont délivrées par la Chambre de Commerce et d'Industrie (CCI) après vérification des conditions de capacité professionnelle.",
          "L'obtention d'une carte professionnelle suppose : (1) garantie financière souscrite, (2) RC Pro adaptée souscrite, (3) condition de capacité professionnelle (diplôme ou expérience), (4) honorabilité (casier judiciaire vierge), (5) inscription au registre du commerce.",
          "Les cartes sont valables 3 ans renouvelables. Renouvellement conditionné à la justification d'une formation continue (obligation FCO ALUR : 14 h/an ou 42 h sur 3 ans).",
        ],
      },
      {
        id: 'carte-t',
        h2: '2. Carte T — transactions immobilières',
        paragraphs: [
          "La carte T autorise l'exercice d'activités de transactions sur immeubles et fonds de commerce : achat, vente, échange, location, sous-location, recherche de logement, location saisonnière.",
        ],
        list: {
          items: [
            "**Conditions obtention** : BTS PI ou Bac+3 immobilier, OU 3 ans d'expérience en agence + Bac, OU 10 ans expérience sans diplôme",
            '**Garantie financière** : minimum 110 000 € (gestion de fonds clients via séquestre)',
            '**RC Pro** : 500 000 € minimum par sinistre + 1 M€ par année',
            '**Durée validité** : 3 ans renouvelables (FCO ALUR obligatoire)',
          ],
        },
      },
      {
        id: 'carte-g',
        h2: '3. Carte G — gestion locative',
        paragraphs: [
          'La carte G autorise la gestion locative pour le compte de tiers : encaissement loyers, gestion charges, états des lieux, contentieux locataires.',
        ],
        list: {
          items: [
            '**Conditions obtention** : identiques carte T',
            '**Garantie financière** : minimum 110 000 €',
            '**RC Pro** : 500 000 € / 1 M€ identiques',
            '**Particularité 2026** : obligation détention en compte séquestre des dépôts garantie (CARPA équivalente immobilier)',
          ],
        },
      },
      {
        id: 'carte-s',
        h2: '4. Carte S — syndic de copropriété',
        paragraphs: [
          "La carte S autorise l'exercice de syndic professionnel pour la gestion d'immeubles en copropriété (Loi du 10 juillet 1965).",
        ],
        list: {
          items: [
            '**Conditions obtention** : identiques carte T + formation spécifique syndic 30 h',
            '**Garantie financière** : minimum 110 000 €',
            '**RC Pro** : 800 000 € / 1,5 M€ — niveau supérieur du fait responsabilité élargie',
            '**Particularité** : obligation formation continue spécifique syndic 14 h/an',
          ],
        },
      },
      {
        id: 'courtier-orias',
        h2: '5. Courtier ORIAS — pas une carte mais une immatriculation',
        paragraphs: [
          "Les courtiers en assurance, crédit, IOBSP ne disposent PAS d'une « carte » mais d'une IMMATRICULATION ORIAS (Organisme pour le Registre des Intermédiaires en Assurance). 4 catégories ORIAS :",
        ],
        list: {
          ordered: true,
          items: [
            '**IAS (Intermédiaire en Assurance)** : courtiers assurance — 4 niveaux (1 à 4 selon capacité)',
            '**IOBSP (Intermédiaire en Opérations de Banque)** : courtiers crédit — 4 niveaux (1 à 4)',
            '**CIF (Conseiller en Investissements Financiers)** : conseillers gestion patrimoine — formation 150 h obligatoire',
            '**ALPSI (Agent Lié Prestataire Services Investissement)** : mandataires des établissements de crédit',
          ],
        },
        callout: {
          tone: 'info',
          text: "Le numéro ORIAS est public et vérifiable sur orias.fr. Depuis l'Arrêté du 6 décembre 2022, le numéro ORIAS doit être CLIQUABLE sur tous les supports digitaux du courtier (site web, signature email, devis numériques).",
        },
      },
      {
        id: 'rc-pro',
        h2: '6. RC Pro obligatoire — montants 2026',
        paragraphs: [
          "Pour chaque carte professionnelle, des montants minimaux de RC Pro sont fixés par les arrêtés d'application Loi Hoguet et DDA :",
        ],
        list: {
          items: [
            '**Carte T (transactions)** : 500 000 € / sinistre + 1 M€ / année',
            '**Carte G (gestion)** : 500 000 € / sinistre + 1 M€ / année',
            '**Carte S (syndic)** : 800 000 € / sinistre + 1,5 M€ / année',
            '**Courtier ORIAS IAS** : 1,5 M€ / sinistre + 2 M€ / année',
            '**Courtier ORIAS IOBSP** : 500 000 € / sinistre + 800 000 € / année',
            '**CIF** : 150 000 € / sinistre + 300 000 € / année',
          ],
        },
      },
      {
        id: 'demarches',
        h2: "7. Démarches d'obtention",
        paragraphs: ["Le processus type d'obtention d'une carte professionnelle :"],
        list: {
          ordered: true,
          items: [
            '**Justifier la capacité professionnelle** : diplôme, attestation expérience, justifications continues',
            "**Souscrire RC Pro + garantie financière** : auprès d'un assureur (notre cabinet propose les packs Hoguet complets)",
            '**Constituer dossier CCI** : Cerfa 15312*01 + justifications + justificatif RC + garantie financière',
            '**Déposer le dossier** auprès de la CCI compétente (territorial) — délai instruction 2 à 3 mois',
            '**Recevoir la carte** par voie électronique (depuis 2018) — validité 3 ans',
          ],
        },
        callout: {
          tone: 'info',
          text: 'Notre cabinet ORIAS propose un pack complet « démarches Hoguet » : RC Pro + garantie financière + accompagnement dossier CCI pour 1 200 € HT (au lieu de 3 000 €+ chez un avocat spécialisé).',
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur les cartes professionnelles :'],
        list: {
          items: [
            '**Carte T + G + S : 3 cartes séparées ?** OUI, sauf si « carte multipack T+G+S » disponible dans certaines CCI. Sinon, 3 démarches distinctes.',
            "**Carte sans diplôme : possible ?** OUI avec 10 ans d'expérience prouvée (bulletins de salaire) ou 3 ans + Bac. Sinon, formation BTS PI obligatoire.",
            "**Renouvellement raté : conséquences ?** Interdiction d'exercice immédiate. Risque pénal si activité poursuivie sans carte (art. L. 110-1 C. com). 6 mois prison + 7 500 € amende.",
            "**Courtier ORIAS : combien de temps pour s'inscrire ?** 4 à 6 semaines avec dossier complet. Notre cabinet accompagne en moins de 30 jours.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 4 — IPID fiche information produit assurance (200 vol)
  // ════════════════════════════════════════════════════════════════════
  'ipid-fiche-information-produit-assurance': {
    slug: 'ipid-fiche-information-produit-assurance',
    title: "IPID 2026 : fiche d'information produit d'assurance expliquée",
    description:
      'Guide 2026 IPID (Insurance Product Information Document). Obligatoire depuis 2018, format standardisé EIOPA, 7 sections, distinction RC Pro/décennale/multirisque, sanctions absence.',
    category: 'Réglementation',
    tags: ['ipid', 'fiche information', 'eiopa', 'dda', 'standardisation'],
    ...AUTHOR,
    publishedAt: '2026-06-16',
    updatedAt: '2026-06-16',
    readTime: '9 min',
    sources: [
      LEGIFRANCE('Directive Distribution Assurance (DDA) 2016/97', 'jorf/id/JORFTEXT000035402090'),
      LEGIFRANCE('Code des assurances art. L. 112-2', 'codes/article_lc/LEGIARTI000006792456'),
      {
        label: 'EIOPA — Insurance Product Information Document',
        url: 'https://www.eiopa.europa.eu/',
      },
    ],
    toc: [
      { id: 'definition', title: '1. IPID : définition + cadre légal' },
      { id: 'format', title: '2. Format standardisé EIOPA — 7 sections' },
      { id: 'contenu', title: '3. Contenu obligatoire des 7 sections' },
      { id: 'distinction', title: '4. Distinction IPID / FIC / CGV' },
      { id: 'remise', title: '5. Modalités de remise' },
      { id: 'sanctions', title: "6. Sanctions en cas d'absence" },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'definition',
        h2: '1. IPID : définition + cadre légal',
        paragraphs: [
          "L'IPID (Insurance Product Information Document) — ou « Fiche d'Information sur le Produit d'Assurance » — est un document standardisé européen, OBLIGATOIRE depuis le 1ᵉʳ octobre 2018, suite à la Directive sur la Distribution d'Assurances (DDA) 2016/97 et au règlement d'exécution UE 2017/1469.",
          "L'IPID doit être remis OBLIGATOIREMENT au client AVANT la souscription pour tout produit d'assurance NON-VIE (assurance pro, habitation, auto, santé, etc.). Pour les produits vie, c'est le DICI (Document d'Information Clé pour l'Investisseur) qui s'applique.",
          "Objectif : permettre au client de comparer facilement les produits d'assurance grâce à un format standardisé européen. Le format est identique partout en UE (article par article, ordre fixe, longueur ~2 pages A4).",
        ],
      },
      {
        id: 'format',
        h2: '2. Format standardisé EIOPA — 7 sections',
        paragraphs: [
          "L'IPID suit un format strict défini par l'EIOPA (Autorité européenne des assurances et des pensions professionnelles) avec 7 sections obligatoires + icônes standardisées :",
        ],
        list: {
          ordered: true,
          items: [
            "**Quel type d'assurance ?** — description courte du produit (responsabilité civile, décennale, multirisque)",
            "**Qu'est-ce qui est assuré ?** — liste des garanties + plafonds + sous-plafonds (icône verte ✓)",
            "**Qu'est-ce qui n'est pas assuré ?** — exclusions principales (icône rouge ✗)",
            '**Y a-t-il des restrictions de couverture ?** — franchises, conditions de mise en jeu, sous-conditions (icône orange !)',
            '**Où suis-je couvert ?** — zone géographique (France, UE, monde)',
            '**Quelles sont mes obligations ?** — déclarations à faire, contributions, modalités de paiement',
            '**Quand et comment effectuer les paiements ?** — fréquence, modalités, conséquences impayé',
          ],
        },
        callout: {
          tone: 'info',
          text: "L'IPID est limité à 3 pages A4 maximum. Format papier OU numérique au choix du client. Police d'écriture obligatoire : Arial 11 minimum.",
        },
      },
      {
        id: 'contenu',
        h2: '3. Contenu obligatoire des 7 sections',
        paragraphs: ["Pour chaque section, l'IPID doit contenir :"],
        list: {
          items: [
            '**Identification produit** : nom commercial + identifiant assureur',
            '**Description type assurance** : nature des risques couverts (RC Pro, décennale, multirisque, cyber, etc.)',
            '**Garanties principales** : 5 à 10 garanties les plus importantes, avec plafonds chiffrés',
            '**Exclusions courantes** : liste des cas non couverts (faute intentionnelle, défaut conformité, etc.)',
            '**Sous-plafonds** : garanties partielles (ex. : vol limité 5 000 € en multirisque)',
            "**Franchises** : montant restant à charge de l'assuré par sinistre",
            '**Zone géographique** : France métropolitaine, DOM-TOM, UE, monde entier',
            '**Durée du contrat** : annuelle, mensuelle, pluriannuelle',
            '**Modalités de résiliation** : Loi Hamon, Loi Chatel, motif particulier',
          ],
        },
      },
      {
        id: 'distinction',
        h2: '4. Distinction IPID / FIC / CGV',
        paragraphs: ['3 documents distincts en assurance, à ne pas confondre :'],
        list: {
          ordered: true,
          items: [
            '**IPID (Insurance Product Information Document)** : fiche standardisée 2-3 pages, OBLIGATOIRE avant souscription, format EIOPA standardisé européen',
            "**FIC (Fiche d'Information Conseil)** : document du courtier (art. L. 521-4) justifiant la recommandation personnalisée — pas standardisé, contenu libre mais doit comporter recueil exigences + justification choix produit",
            "**CGV/CGU (Conditions Générales)** : contrat complet 20-50 pages, l'IPID en est un résumé. Le client peut demander les CGV avant signature.",
          ],
        },
      },
      {
        id: 'remise',
        h2: '5. Modalités de remise',
        paragraphs: ["L'IPID doit être remis AVANT la souscription :"],
        list: {
          items: [
            '**Format papier** : remise en main propre ou par voie postale',
            '**Format numérique** : email avec pièce jointe PDF OU lien vers téléchargement',
            '**Délai minimum** : 1 jour ouvré avant signature (recommandé), pas de délai légal minimum',
            '**Accusé de réception** : recommandé pour preuve en cas de litige',
            '**Langue** : française obligatoire pour les contrats en France',
          ],
        },
      },
      {
        id: 'sanctions',
        h2: "6. Sanctions en cas d'absence",
        paragraphs: ["L'absence d'IPID ou la remise tardive expose à plusieurs sanctions :"],
        list: {
          items: [
            "**Sanction ACPR** : avertissement, blâme, amende administrative jusqu'à 100 M€ pour les compagnies / 5 M€ pour les courtiers",
            '**Nullité du contrat** : possible à la demande du client dans les 30 jours suivant la souscription',
            '**Responsabilité civile** : indemnisation du préjudice subi par le client (dommages-intérêts)',
            '**Atteinte à la réputation** : publication des sanctions sur le site ACPR (« Name & Shame »)',
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ["Réponses aux questions fréquentes sur l'IPID :"],
        list: {
          items: [
            "**IPID obligatoire pour TOUS produits ?** Uniquement non-vie. Pour les produits vie, c'est le DICI. Pour les produits combinés (multirisque pro + prévoyance), 2 documents distincts.",
            '**IPID en anglais : valable en France ?** NON. Obligation langue française pour les contrats sur territoire français.',
            "**Renouvellement contrat : nouveau IPID ?** OUI à chaque modification importante des garanties. À l'identique : pas obligatoire mais recommandé.",
            "**IPID vs CGV : lequel prime en cas de divergence ?** CGV. L'IPID est un résumé. Si divergence, le contrat (CGV) prévaut, sauf si l'IPID est plus favorable au client.",
          ],
        },
      },
    ],
  },
}
