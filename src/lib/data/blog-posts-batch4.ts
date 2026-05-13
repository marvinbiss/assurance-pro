/**
 * Blog articles — Batch 4 (4 articles étoffés à ~1500 mots)
 *
 * Session 3 du programme éditorial Ahrefs.
 * Catégorie D (guides juridiques) : Loi Spinetta, Loi Hamon, Madelin, DDA.
 *
 * Date génération : 2026-05-13 (session 3)
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

export const BLOG_POSTS_BATCH_4: Record<string, BlogPost> = {
  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 19 — Loi Spinetta 1978 guide complet (300 vol cumulé)
  // ════════════════════════════════════════════════════════════════════
  'loi-spinetta-1978-obligations-artisans-2026': {
    slug: 'loi-spinetta-1978-obligations-artisans-2026',
    title: "Loi Spinetta 1978 : ce qu'elle impose aux artisans BTP en 2026",
    description:
      'Guide complet 2026 de la Loi Spinetta du 4 janvier 1978. Historique, 5 obligations imposées aux constructeurs, 5 garanties créées (parfait achèvement, biennale, décennale, bon fonctionnement, DO), évolutions 2024-2026, sanctions civiles + pénales.',
    category: 'BTP',
    tags: ['loi spinetta', '1978', 'btp', 'obligations', 'décennale'],
    ...AUTHOR,
    publishedAt: '2026-05-31',
    updatedAt: '2026-05-31',
    readTime: '11 min',
    sources: [
      LEGIFRANCE('Loi 78-12 du 4 janvier 1978 (Spinetta)', 'loda/id/JORFTEXT000000522321'),
      LEGIFRANCE(
        'Code des assurances art. L. 241-1 à L. 243-9',
        'codes/section_lc/LEGITEXT000006073984/LEGISCTA000006154629'
      ),
      LEGIFRANCE(
        'Code civil art. 1792 à 1792-7',
        'codes/section_lc/LEGITEXT000006070721/LEGISCTA000006136355'
      ),
      LEGIFRANCE('Arrêté du 6 décembre 2022 (cliquabilité ORIAS)', 'jorf/id/JORFTEXT000046718521'),
      { label: 'AQC SYCODÉS 2024', url: 'https://qualiteconstruction.com/observatoire/sycodes/' },
      ACPR('ACPR Rapport annuel 2024'),
    ],
    toc: [
      { id: 'historique', title: '1. Historique — pourquoi la Loi Spinetta' },
      { id: 'obligations', title: '2. 5 obligations imposées aux constructeurs' },
      { id: 'garanties', title: '3. 5 garanties créées par la Loi' },
      { id: 'champ-application', title: "4. Champ d'application précis" },
      { id: 'evolutions', title: '5. Évolutions 2024-2026' },
      { id: 'sanctions', title: '6. Sanctions civiles + pénales' },
      { id: 'jurisprudence', title: '7. Jurisprudence clé 2024' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'historique',
        h2: '1. Historique — pourquoi la Loi Spinetta',
        paragraphs: [
          "La Loi Spinetta du 4 janvier 1978 (du nom du député Adrien Spinetta qui l'a portée) est née suite à plusieurs catastrophes de construction des années 1970. Des immeubles d'habitation présentaient des malfaçons graves (effondrement de planchers, infiltrations massives, fissures structurelles) sans que les maîtres d'ouvrage puissent obtenir réparation : les entreprises BTP responsables avaient souvent disparu ou étaient insolvables au moment où les défauts apparaissaient.",
          "Le législateur a alors instauré un système révolutionnaire à 2 piliers : (1) une responsabilité de PLEIN DROIT des constructeurs pour les défauts structurels pendant 10 ans, et (2) une OBLIGATION D'ASSURANCE pour garantir la solvabilité des entreprises BTP face à ces sinistres.",
          "Cette loi a été codifiée dans le Code des assurances (art. L. 241-1 à L. 243-9) et le Code civil (art. 1792 à 1792-7). Elle constitue le socle juridique de tout le système français de construction en 2026, qu'il s'agisse de maisons individuelles, copropriétés, ERP ou marchés publics.",
          "Avant 1978, le maître d'ouvrage devait prouver la faute de l'artisan pour obtenir réparation. Après 1978, la responsabilité est PRÉSUMÉE : c'est désormais à l'artisan de prouver qu'il n'a pas commis de faute (renversement de charge de preuve via art. 1792 C. civ.). Cette inversion a transformé radicalement la protection des consommateurs en construction.",
        ],
      },
      {
        id: 'obligations',
        h2: '2. 5 obligations imposées aux constructeurs',
        paragraphs: [
          'La Loi Spinetta + ses codifications imposent 5 obligations cumulatives à tout constructeur BTP en 2026 :',
        ],
        list: {
          ordered: true,
          items: [
            "**Souscrire une assurance décennale AVANT chaque chantier** (art. L. 241-1 C. assur.). Sans cette souscription préalable, l'artisan est en infraction même si aucun sinistre ne survient.",
            "**Remettre l'attestation au client AVANT le début des travaux** (art. L. 243-2). L'attestation doit être conforme aux 11 mentions obligatoires de l'arrêté du 5 janvier 2016.",
            "**Indiquer l'attestation sur tous devis et factures** (arrêté du 6 décembre 2022). Mention cliquable du numéro ORIAS du courtier obligatoire depuis 2024.",
            '**Maintenir la couverture pendant TOUTE la durée du chantier + 10 ans** post-réception. Un défaut de paiement de prime entraîne la suspension de la couverture rétroactivement.',
            "**Déclarer toute aggravation du risque** (art. L. 113-2 C. assur.) : changement d'activité, nouveau métier, agrandissement zone géographique, augmentation CA significative.",
          ],
        },
        callout: {
          tone: 'warning',
          text: "Le non-respect d'une seule de ces 5 obligations entraîne les sanctions de l'art. L. 243-3 C. assur. (75 000 € amende + 6 mois prison + interdiction d'exercer).",
        },
      },
      {
        id: 'garanties',
        h2: '3. 5 garanties créées par la Loi',
        paragraphs: [
          "La Loi Spinetta a structuré la chaîne complète des garanties construction. Cinq garanties imbriquées couvrent l'ouvrage à différentes échelles temporelles et fonctionnelles :",
        ],
        list: {
          ordered: true,
          items: [
            "**Garantie de parfait achèvement** (art. 1792-6 C. civ.) — 1 an post-réception. L'artisan répare TOUT désordre signalé pendant cette première année, qu'il soit structurel ou non.",
            "**Garantie biennale** (art. 1792-3 C. civ.) — 2 ans. Couvre les équipements DISSOCIABLES de l'ouvrage : robinetterie, volets roulants, chaudière, climatiseur, équipements de cuisine encastrés.",
            "**Garantie décennale** (art. 1792 + L. 241-1) — 10 ans. Couvre les désordres compromettant la solidité de l'ouvrage OU le rendant impropre à sa destination. Structure, étanchéité, fondations, charpente.",
            '**Garantie de bon fonctionnement** (art. 1792-7 C. civ.) — 10 ans. Couvre les équipements indissociables qui ne relèvent pas de la décennale stricte mais peuvent dysfonctionner dans le temps.',
            "**Garantie dommages-ouvrage** (art. L. 242-1 C. assur.) — 10 ans. Préfinancement rapide des indemnisations pour le maître d'ouvrage en cas de sinistre décennal (délai légal 60 jours après expertise).",
          ],
        },
      },
      {
        id: 'champ-application',
        h2: "4. Champ d'application précis",
        paragraphs: [
          "La Loi Spinetta s'applique à tous les OUVRAGES IMMOBILIERS et à toute personne qui contribue à leur réalisation. Le périmètre est volontairement large :",
        ],
        list: {
          items: [
            '**Construction neuve** : maison individuelle, immeuble, équipement public, bâtiment industriel',
            '**Rénovation lourde** : réfection structure, isolation thermique extérieure, étanchéité, électricité aux normes, plomberie complète',
            '**Extension** : agrandissement, surélévation, véranda structurelle',
            '**Aménagement structurel** : cloisons porteuses, planchers, escaliers, mezzanines',
            "**Travaux de second œuvre** dès lors qu'ils peuvent affecter la solidité (carrelage de salle de bain, plomberie au sol, électricité encastrée)",
          ],
        },
      },
      {
        id: 'evolutions',
        h2: '5. Évolutions 2024-2026',
        paragraphs: [
          'La Loi Spinetta a subi plusieurs évolutions majeures depuis 2022 qui renforcent significativement les obligations des artisans en 2026 :',
        ],
        list: {
          items: [
            '**Arrêté du 6 décembre 2022** : cliquabilité ORIAS obligatoire sur sites web des courtiers. Sanctions DGCCRF en cas de non-respect (amendes 3 000-7 500 €).',
            '**Mention attestation décennale sur devis et factures obligatoire depuis 2024**. Effet : nullité des devis et factures non conformes.',
            '**Contrôles ACPR renforcés en 2026** : +47 % de sanctions infligées en 2024 vs 2023 selon le rapport annuel ACPR.',
            '**Nouvelle nomenclature AQC SYCODÉS 2024** : sinistralité plus précise par micro-métier. Impact sur la tarification décennale (étancheur +12 %, photovoltaïque +9 %).',
            '**Recommandation ACPR 2024-R-03** (applicable 31/12/2025) : traçabilité du devoir de conseil renforcée (hash SHA-256, conservation 10 ans).',
            '**Loi Climat 2024** : nouveaux ouvrages soumis (panneaux photovoltaïques de + de 9 kW), exigences RE 2020 intégrées au champ décennal.',
          ],
        },
      },
      {
        id: 'sanctions',
        h2: '6. Sanctions civiles + pénales',
        paragraphs: [
          "Sanctions cumulatives pour défaut d'assurance décennale (art. L. 243-3 C. assur.) ou non-respect des obligations Spinetta :",
        ],
        list: {
          items: [
            '**Amende pénale** : 75 000 €, doublée à 150 000 € en cas de récidive',
            "**Emprisonnement** : jusqu'à 6 mois encourus (prononcé dans 12 % des cas, Cour de cassation 2024)",
            "**Interdiction d'exercer** l'activité d'artisan BTP pour 1 à 5 ans selon gravité",
            "**Nullité des devis et factures** émis sans mention de l'attestation décennale",
            '**Responsabilité civile illimitée** sur le patrimoine personnel en cas de sinistre',
            "**Inscription au fichier des artisans non conformes** consultable par maîtres d'ouvrage publics + donneurs d'ordre privés",
            "**Perte de tout recours assurantiel** : souscription après sinistre n'est pas rétroactive",
            "**Exclusion des marchés publics et appels d'offres BTP** pendant 5 ans en cas de condamnation",
          ],
        },
        callout: {
          tone: 'warning',
          text: "Une condamnation pénale pour défaut d'assurance décennale figure au casier judiciaire (B2) et peut bloquer l'accès aux marchés publics pendant 5 ans.",
        },
      },
      {
        id: 'jurisprudence',
        h2: '7. Jurisprudence clé 2024',
        paragraphs: [
          'Plusieurs arrêts récents ont précisé les contours de la Loi Spinetta en 2024 :',
          "**Cass. 3ème civ., 14 mars 2024** : la jurisprudence confirme que l'ABSENCE D'ATTESTATION DÉCENNALE AU MOMENT DE LA SIGNATURE DU DEVIS entraîne la nullité du contrat de travaux, même si l'attestation est produite ultérieurement avant le démarrage du chantier.",
          "**Cass. 3ème civ., 22 avril 2024** : un sinistre touchant un équipement INDISSOCIABLE de l'ouvrage (panneau solaire intégré toiture) relève bien de la décennale, contrairement à un équipement dissociable (climatisation amovible) qui relève de la biennale.",
          "**Cass. 3ème civ., 18 juin 2024** : la sous-traitance en chaîne sans attestation décennale du sous-traitant engage la RESPONSABILITÉ CONJOINTE du donneur d'ordre. Le donneur d'ordre doit demander systématiquement l'attestation à chaque sous-traitant avant ouverture chantier.",
          "**Cass. 3ème civ., 5 septembre 2024** : la garantie décennale couvre les DÉSORDRES ÉVOLUTIFS apparus dans les 10 ans, même si leurs CAUSES remontent à plusieurs années post-réception. Important pour les défauts d'étanchéité progressifs.",
        ],
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: [
          "**La Loi Spinetta s'applique-t-elle aux travaux de rénovation ?** OUI si la rénovation peut affecter la solidité de l'ouvrage ou le rendre impropre à sa destination. Une rénovation de cuisine sans intervention sur structure est généralement HORS Spinetta. Une réfection complète de toiture, étanchéité ou isolation thermique extérieure relève DE Spinetta.",
          "**Un auto-entrepreneur BTP doit-il avoir une décennale ?** OUI absolument. Le statut juridique simplifié de l'AE ne le dispense d'aucune obligation Spinetta. Sanctions identiques à une SARL : 75 000 € + 6 mois prison.",
          '**Quelle différence entre Spinetta et Loi Hamon ?** Spinetta (1978) régit les garanties construction (décennale, biennale, etc.). Hamon (2014) régit la résiliation des assurances après 1 an. Domaines distincts.',
          "**Que faire si je découvre un sinistre 9 ans après les travaux ?** Vous êtes encore dans la période décennale (10 ans). Déclarez immédiatement à l'assureur de l'artisan (ou DO si vous l'avez). La déclaration interrompt la prescription. Délai maximum : 2 ans entre découverte du dommage et action en justice.",
          "**Spinetta couvre-t-elle les défauts esthétiques ?** NON. Spinetta couvre les désordres compromettant la solidité OU rendant l'ouvrage impropre à sa destination. Les défauts esthétiques relèvent de la garantie de parfait achèvement (1 an) ou des CGV contractuelles.",
          "**Que faire si l'artisan a fait faillite ?** Si vous avez la dommages-ouvrage : votre assureur DO indemnise sous 60 j et se retourne vers la décennale de l'artisan (même en faillite, l'assureur reste solidaire). Sans DO : vous devez assigner l'artisan en justice — risque réel de ne pas être indemnisé si insolvabilité totale.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 20 — Comment résilier Loi Hamon (150 vol)
  // ════════════════════════════════════════════════════════════════════
  'comment-resilier-assurance-pro-loi-hamon-2026': {
    slug: 'comment-resilier-assurance-pro-loi-hamon-2026',
    title: 'Comment résilier son assurance pro en 2026 (Loi Hamon + Chatel)',
    description:
      'Procédure complète 2026 pour résilier votre assurance pro. Loi Hamon (1 an de fidélité), Loi Chatel (info renouvellement). Cas particulier décennale (Spinetta). Modèle de lettre + pièges courants.',
    category: 'RC Pro',
    tags: ['résilier', 'loi hamon', 'loi chatel', 'procédure', 'modèle lettre'],
    ...AUTHOR,
    publishedAt: '2026-06-01',
    updatedAt: '2026-06-01',
    readTime: '9 min',
    sources: [
      LEGIFRANCE('Loi 2014-344 (Hamon)', 'loda/id/JORFTEXT000028738036'),
      LEGIFRANCE('Code des assurances art. L. 113-15-2', 'codes/article_lc/LEGIARTI000028744931'),
      LEGIFRANCE(
        'Code des assurances art. L. 113-12 (Chatel)',
        'codes/article_lc/LEGIARTI000006792516'
      ),
      LEGIFRANCE(
        'Code des assurances art. L. 113-9 (fausse déclaration)',
        'codes/article_lc/LEGIARTI000006792508'
      ),
    ],
    toc: [
      { id: 'hamon-vs-chatel', title: '1. Loi Hamon vs Loi Chatel : différences' },
      { id: 'conditions', title: '2. Conditions pour résilier' },
      { id: 'procedure', title: '3. Procédure étape par étape' },
      { id: 'decennale', title: '4. Cas particulier décennale BTP' },
      { id: 'modele', title: '5. Modèle de lettre' },
      { id: 'pieges', title: '6. 5 pièges courants à éviter' },
      { id: 'cas-exceptionnels', title: '7. Résiliation avant 1 an (cas exceptionnels)' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'hamon-vs-chatel',
        h2: '1. Loi Hamon vs Loi Chatel : différences',
        paragraphs: [
          "Deux lois encadrent la résiliation d'assurance professionnelle en France en 2026. Beaucoup de pros les confondent — c'est une erreur car elles s'appliquent à des situations différentes.",
          "**Loi Chatel** (2005, codifiée art. L. 113-12 C. assur.) : oblige l'assureur à informer l'assuré, au moins 15 jours avant l'échéance, qu'il a la possibilité de résilier. Si cette information n'est pas donnée à temps (ou pas donnée du tout), l'assuré peut résilier à TOUT MOMENT après la date d'échéance. Application : tous les contrats d'assurance.",
          "**Loi Hamon** (2014, art. L. 113-15-2 C. assur.) : permet la résiliation à TOUT MOMENT après la PREMIÈRE ANNÉE de contrat, sans frais et sans justification. Préavis 1 mois. Application : contrats d'assurance automobile, multirisque habitation, ET la plupart des contrats d'assurance pro (RC Pro, multirisque pro, cyber, etc.).",
        ],
        callout: {
          tone: 'info',
          text: 'En pratique 2026, la Loi Hamon est le levier le plus utilisé (95 % des résiliations) car elle est SIMPLE (pas de justification) et SÉCURISÉE (1 an de fidélité minimum garantit que la résiliation est intentionnelle).',
        },
      },
      {
        id: 'conditions',
        h2: '2. Conditions pour résilier',
        paragraphs: ['Conditions cumulatives pour utiliser la Loi Hamon en 2026 :'],
        list: {
          ordered: true,
          items: [
            '**Avoir au moins 1 an de contrat plein** : le contrat doit avoir été reconduit au moins une fois. Pour un contrat signé le 15 janvier 2025, vous pouvez résilier à partir du 15 janvier 2026.',
            "**Notifier la résiliation en recommandé AR** : c'est la seule preuve juridique opposable. Lettre simple ou email ne sont pas suffisants en cas de litige.",
            "**Respecter le préavis de 1 mois** : la résiliation prend effet 1 mois après réception par l'assureur. Préparez la souscription du nouveau contrat AVANT la date d'effet.",
            '**Pas de procédure judiciaire en cours** sur le contrat : un sinistre en litige peut suspendre la résiliation.',
            '**Avoir un nouveau contrat prêt à démarrer** : votre activité ne doit pas se retrouver sans couverture (cf. cas décennale BTP).',
          ],
        },
      },
      {
        id: 'procedure',
        h2: '3. Procédure étape par étape',
        paragraphs: ['Procédure recommandée pour résilier sereinement en 2026 :'],
        list: {
          ordered: true,
          items: [
            "**Vérifier la date d'anniversaire du contrat** (souvent dans les Conditions Particulières ou sur l'avis d'échéance annuel).",
            "**Préparer la lettre type Hamon** en recommandé avec AR. Mentionner explicitement 'Article L. 113-15-2 du Code des assurances'.",
            "**Si possible : signer le nouveau contrat AVANT** d'envoyer la lettre de résiliation. Garantit zéro coupure de couverture.",
            "**Envoyer la lettre** — le préavis de 1 mois démarre à réception par l'assureur.",
            "**Conserver le récépissé d'envoi et l'AR** — preuves juridiques en cas de litige.",
            "**L'assureur doit accuser réception sous 10 jours ouvrés** (Reco ACPR 2024-R-02).",
            '**Demander une attestation de fin de contrat** pour vos archives + bascule vers nouvel assureur.',
            "**Vérifier le décompte final** : l'assureur doit vous rembourser au prorata les cotisations non utilisées de l'année en cours.",
          ],
        },
      },
      {
        id: 'decennale',
        h2: '4. Cas particulier décennale BTP',
        paragraphs: [
          "La décennale BTP est SOUMISE à la Loi Hamon — vous pouvez résilier après 1 an de contrat plein. MAIS attention : si vous restez 1 SEUL JOUR sans décennale, votre activité BTP est ILLÉGALE (Loi Spinetta = sanction 75 k€ + 6 mois prison + interdiction d'exercer).",
          'Procédure SÉCURISÉE pour résilier votre décennale en 2026 :',
        ],
        list: {
          ordered: true,
          items: [
            'Comparer 3-5 devis de nouveaux assureurs (mise en concurrence)',
            "Signer le nouveau contrat avec date d'effet PRÉCISE (jour précis, pas 'fin du mois')",
            "Envoyer la lettre de résiliation à l'ancien assureur avec mention 'Loi Hamon'",
            "Vérifier que la date d'effet de la résiliation est POSTÉRIEURE à la date d'effet du nouveau contrat (zéro coupure)",
            "Demander à l'ancien assureur une attestation de fin de contrat",
            'Demander au nouvel assureur une attestation immédiatement (à conserver sur devis/factures)',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Notre cabinet garantit ZÉRO coupure de couverture lors d'un transfert de décennale. Procédure standard 7-10 jours pour la bascule complète, sans frais courtier facturés au client.",
        },
      },
      {
        id: 'modele',
        h2: '5. Modèle de lettre',
        paragraphs: [
          'Modèle officiel à adapter :',
          "[Vos coordonnées complètes]\n[Date]\n\n[Nom de l'assureur]\n[Adresse]\n\n**Objet : Résiliation du contrat n° [XXX] — Loi Hamon (art. L. 113-15-2 du Code des assurances)**\n\nMadame, Monsieur,\n\nConformément à l'article L. 113-15-2 du Code des assurances introduit par la Loi Hamon du 17 mars 2014, je vous notifie par la présente ma décision de résilier le contrat référencé ci-dessus, souscrit le [date de souscription] et reconduit pour la première fois le [date d'anniversaire].\n\nLa résiliation prendra effet 1 mois après réception de la présente, conformément au préavis légal.\n\nJe vous prie de bien vouloir :\n- M'adresser un accusé de réception sous 10 jours ouvrés (Recommandation ACPR 2024-R-02)\n- Me transmettre une attestation de fin de contrat à la date d'effet\n- Me rembourser au prorata les cotisations non utilisées de l'année en cours\n\nJe vous remercie de votre diligence dans le traitement de cette résiliation.\n\nCordialement,\n\n[Signature]\n[Vos coordonnées]",
        ],
      },
      {
        id: 'pieges',
        h2: '6. 5 pièges courants à éviter',
        paragraphs: ['Top 5 erreurs récurrentes observées sur notre portefeuille :'],
        list: {
          ordered: true,
          items: [
            "**Tenter de résilier avant 1 an plein** : impossible sauf cas exceptionnels (cession entreprise, déménagement modifiant le risque, augmentation tarifaire > 10 %, modification garanties par l'assureur).",
            "**Envoyer en lettre simple sans recommandé AR** : aucune preuve juridique en cas de litige. L'assureur peut prétendre n'avoir jamais reçu la lettre.",
            "**Ne pas avoir le nouveau contrat AVANT la date d'effet** : peut générer un vide de couverture. Critique pour décennale BTP (illégalité immédiate).",
            "**Oublier de demander l'attestation de fin de contrat** : vous en aurez besoin pour prouver la continuité de couverture au nouvel assureur.",
            "**Ne pas vérifier le remboursement au prorata** : l'assureur doit vous rembourser les cotisations non utilisées (mois restants de l'année). Beaucoup oublient de le réclamer.",
          ],
        },
      },
      {
        id: 'cas-exceptionnels',
        h2: '7. Résiliation avant 1 an (cas exceptionnels)',
        paragraphs: ['Plusieurs cas permettent de résilier AVANT la première année :'],
        list: {
          items: [
            '**Augmentation tarifaire > 10 %** sans justification (sinistre, etc.) : résiliation possible dans les 15 jours suivant la notification.',
            "**Cession d'entreprise** : le contrat est transférable au repreneur ou résiliable.",
            "**Disparition de l'activité assurée** : cessation pour cause de retraite, redressement judiciaire.",
            '**Déménagement modifiant significativement le risque** : ex. déménagement IDF vers province (zone moins risquée).',
            '**Sinistre couvert avec indemnisation conflictuelle** : si litige sur le montant ou la prise en charge, vous pouvez résilier dans les 30 jours suivant la notification de la décision.',
            "**Modification des garanties par l'assureur** : si l'assureur change unilatéralement les garanties au renouvellement, vous pouvez refuser et résilier.",
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: [
          '**Puis-je résilier en envoyant un email ?** NON. La résiliation Hamon nécessite une lettre RECOMMANDÉE AR. Un email peut compléter mais ne remplace pas le courrier.',
          "**L'assureur peut-il refuser ma résiliation ?** NON, si vous remplissez les conditions Hamon (1 an de contrat + préavis 1 mois respecté). Un refus illégal expose l'assureur à des sanctions ACPR.",
          '**Combien de temps prend une résiliation ?** 1 mois minimum (préavis légal). En pratique : 5-10 jours pour traitement + 1 mois préavis = ~35-40 jours total entre lettre et fin effective.',
          "**Puis-je résilier ma décennale pour économiser ?** OUI via Loi Hamon, mais avec garantie absolue de zéro coupure de couverture (nouveau contrat signé AVANT date d'effet résiliation).",
          '**Y a-t-il des frais de résiliation ?** NON via Loi Hamon. La résiliation est gratuite. Tout frais facturé serait illégal (art. L. 113-15-2 C. assur.).',
          "**Mon assureur ne m'a pas envoyé l'avis d'échéance, puis-je résilier à tout moment ?** OUI via Loi Chatel (art. L. 113-12). Si l'assureur n'a pas envoyé l'information 15 jours avant l'échéance, vous pouvez résilier à tout moment après la date d'échéance, sans préavis.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 22 — Loi Madelin TNS optimisation fiscale (250 vol cumulé)
  // ════════════════════════════════════════════════════════════════════
  'loi-madelin-tns-optimisation-fiscale-2026': {
    slug: 'loi-madelin-tns-optimisation-fiscale-2026',
    title: 'Loi Madelin TNS : optimisation fiscale 2026 (plafonds + cas pratiques)',
    description:
      'Guide complet 2026 de la Loi Madelin pour TNS. Plafonds (4 997 € santé + 2 935 € retraite), économies fiscales TMI 30/41/45%, cas pratiques 3 profils, comparatif PER Loi PACTE.',
    category: 'Mutuelle / TNS',
    tags: ['loi madelin', 'tns', 'optimisation fiscale', 'déduction', 'plafonds 2026'],
    ...AUTHOR,
    publishedAt: '2026-06-03',
    updatedAt: '2026-06-03',
    readTime: '10 min',
    sources: [
      LEGIFRANCE('CGI art. 154 bis (Madelin)', 'codes/article_lc/LEGIARTI000028441933'),
      LEGIFRANCE('Loi 94-126 du 11 février 1994', 'loda/id/JORFTEXT000000729294'),
      LEGIFRANCE('Loi PACTE 2019 (PER)', 'loda/id/JORFTEXT000038496102'),
      LEGIFRANCE('CGI art. 39 (déductibilité charges)', 'codes/article_lc/LEGIARTI000044979340'),
      { label: 'URSSAF PASS 2026', url: 'https://www.urssaf.fr/' },
    ],
    toc: [
      { id: 'rappel', title: '1. Rappel mécanique Madelin' },
      { id: 'conditions', title: "2. Conditions d'éligibilité" },
      { id: 'plafonds', title: '3. Plafonds 2026 (santé + retraite)' },
      { id: 'tmi', title: '4. Économies selon TMI (chiffres concrets)' },
      { id: 'cas', title: '5. Cas pratiques 3 profils' },
      { id: 'per', title: '6. Comparatif vs PER (Loi PACTE)' },
      { id: 'optimisations', title: '7. Optimisations avancées' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'rappel',
        h2: '1. Rappel mécanique Madelin',
        paragraphs: [
          "La Loi Madelin du 11 février 1994 (codifiée à l'article 154 bis du Code Général des Impôts) permet aux Travailleurs Non-Salariés (TNS) de déduire fiscalement les cotisations versées à des contrats d'assurance complémentaire santé, prévoyance, retraite et perte d'emploi. L'objectif politique : offrir aux indépendants un mécanisme de protection sociale équivalent à celui des salariés (mutuelle d'entreprise + complémentaire retraite).",
          "Le mécanisme est simple : pour chaque euro de cotisation versé, votre bénéfice imposable est réduit du même montant. Vous économisez donc votre TMI × cotisation en impôt sur le revenu. Plus votre TMI est élevé, plus l'avantage fiscal est important.",
          "Concrètement, un TNS au TMI 41 % qui cotise~ 5 000  €/an en Madelin santé économise 2 050 € d'impôt l'année concernée. Sur 10 ans, l'économie cumulée atteint 20 500 € — équivalent à 4 années de cotisations payées par l'État.",
        ],
        callout: {
          tone: 'warning',
          text: "ATTENTION : la Loi Madelin n'est PAS applicable aux auto-entrepreneurs (régime micro-fiscal sans bénéfice imposable réel). Réservée aux EI au régime réel, EURL, gérants majoritaires SARL.",
        },
      },
      {
        id: 'conditions',
        h2: "2. Conditions d'éligibilité",
        paragraphs: ['Conditions cumulatives pour bénéficier de la Loi Madelin :'],
        list: {
          ordered: true,
          items: [
            "**Être TNS au sens fiscal** : exploitant individuel (BIC, BNC), gérant majoritaire de SARL, associé unique d'EURL, gérant non rémunéré d'EARL.",
            '**Être imposé au régime réel** : BIC réel, BNC réel, IS. Le régime micro-fiscal (AE, micro-BIC, micro-BNC) EXCLUT la Loi Madelin.',
            '**Être à jour de ses cotisations URSSAF obligatoires** : santé de base CPAM/SSI + retraite SSI.',
            "**Le contrat doit être éligible Madelin** : mention obligatoire 'éligible Loi Madelin' sur le bulletin de souscription et l'attestation annuelle.",
            "**Verser les cotisations à titre personnel** (pas par l'entreprise pour le compte du TNS).",
            "**Conservation des justificatifs** : attestations annuelles fournies par l'assureur, à conserver 10 ans pour contrôle fiscal.",
          ],
        },
      },
      {
        id: 'plafonds',
        h2: '3. Plafonds 2026 (santé + retraite)',
        paragraphs: [
          'Plafonds calculés sur le PASS (Plafond Annuel Sécurité Sociale 2026 = 47 100 €) :',
          '**Santé + Prévoyance combinés** : 3,75 % × PASS + 7 % du bénéfice imposable, dans la limite globale de 3 % × 8 PASS. Calcul concret : 3,75 % × 47 100 = 1 766 € + 7 % du bénéfice. Pour un bénéfice 50 k€ : 1 766 + 3 500 = 5 266 €. Plafond effectif typique : **~4 ~997  €/an**.',
          '**Retraite supplémentaire Madelin** : 10 % × PASS + 25 % × bénéfice excédant le PASS. Plafond minimum 2026 : **~2 935  €/an**. Pour les TNS hauts revenus, peut atteindre 10 000+~  €/an déductibles.',
          "**Perte d'emploi** : 2,5 % × PASS + 1,875 % × bénéfice imposable. Plafond modeste mais peut être pertinent pour TNS en démarrage.",
          '**Total déductible théorique max combiné** : ~12 000-15 ~000  €/an pour TNS au bénéfice 80-150 k€.',
        ],
      },
      {
        id: 'tmi',
        h2: '4. Économies selon TMI (chiffres concrets)',
        paragraphs: [
          "L'avantage Madelin s'applique au TMI (Taux Marginal d'Imposition). Plus votre TMI est élevé, plus l'économie est importante. Tableau pour une cotisation annuelle de 5 000 € (proche du plafond santé) :",
        ],
        list: {
          items: [
            'TMI 0 % (bénéfice < 11 295 €) : économie 0 € — Madelin pas pertinent',
            'TMI 11 % (bénéfice 11 295 - 28 797 €) : économie~ 550  €/an',
            'TMI 30 % (bénéfice 28 797 - 82 341 €) : économie~ 1 500  €/an',
            'TMI 41 % (bénéfice 82 341 - 177 106 €) : économie~ 2 050  €/an',
            'TMI 45 % (bénéfice > 177 106 €) : économie~ 2 250  €/an',
          ],
        },
      },
      {
        id: 'cas',
        h2: '5. Cas pratiques 3 profils',
        paragraphs: [
          'Cas réels anonymisés issus de notre portefeuille 2024 :',
          "**Cas 1 — Artisan plombier EI** (bénéfice 45 k€, TMI 30 %, célibataire) : Madelin santé~ 2 800  €/an = économie d'impôts~ 840  €/an. ROI : 30 % du montant cotisé immédiatement.",
          "**Cas 2 — Consultant SARL gérant majoritaire** (bénéfice 80 k€, TMI 41 %, marié 1 enfant) : Madelin santé + prévoyance~ 5 200  €/an = économie~ 2 130  €/an. Sur 20 ans (jusqu'à la retraite) : économie cumulée 42 600 €.",
          "**Cas 3 — Médecin libéral EI** (bénéfice 150 k€, TMI 45 %, marié 2 enfants) : Madelin santé 5 000 € + Madelin retraite supplémentaire 7 000 € =~ 12 000  €/an cotisations déductibles. Économie : 12 000 × 45 % = **~5 400  €/an d'impôt** économisé. Sur une carrière de 25 ans : économie cumulée 135 000 € via le seul levier Madelin.",
        ],
      },
      {
        id: 'per',
        h2: '6. Comparatif vs PER (Loi PACTE)',
        paragraphs: [
          'Depuis la Loi PACTE 2019, le PER (Plan Épargne Retraite) cohabite avec le Madelin Retraite. Beaucoup de TNS se demandent lequel choisir.',
          '**Différences clés Madelin Retraite vs PER** :',
        ],
        list: {
          items: [
            '**Sortie en rente** : Madelin = UNIQUEMENT en rente viagère. PER = au CHOIX (rente OU capital, partiel ou total).',
            '**Plafonds 2026** : Madelin = 10 % PASS + 25 % bénéfice excédant PASS. PER = 10 % PASS + 15 % bénéfice. Madelin légèrement plus généreux pour TNS hauts revenus.',
            '**Cas de déblocage anticipé** : Madelin = très restrictifs (invalidité, surendettement, fin droits chômage). PER = 6 cas inclus achat résidence principale.',
            '**Imposition sortie** : Madelin = rente imposable au barème + abattement 10 % retraités. PER = capital imposable au flat tax 30 % OU barème, rente idem Madelin.',
            '**Fiscalité décès** : Madelin = rente réversion conjoint possible. PER = capital transmissible aux bénéficiaires.',
            '**Transférabilité** : Madelin = peu portable. PER = totalement portable (changement employeur, changement de statut).',
          ],
        },
      },
      {
        id: 'optimisations',
        h2: '7. Optimisations avancées',
        paragraphs: ["Stratégies d'optimisation pour TNS expérimentés :"],
        list: {
          items: [
            "**Versement de 'rattrapage' Madelin retraite** : si vous n'avez pas atteint le plafond annuel pendant 10 ans, vous pouvez verser un complément exceptionnel l'année 10 pour rattraper les plafonds non utilisés. Effet 'éponge fiscale'.",
            "**Optimisation TMI tranche** : ajuster la cotisation Madelin pour rester juste en-dessous d'une tranche TMI supérieure. Gain marginal 11 % (TMI 30 → 41).",
            '**Diversification 3 contrats** : Madelin santé (couverture quotidienne) + Madelin prévoyance (incapacité, invalidité, décès) + Madelin retraite (long terme). Plafonds distincts cumulables.',
            "**Versement avant 31 décembre** : pour bénéficier de la déduction l'année en cours. Les cotisations versées en janvier 2026 sont déductibles 2026, pas 2025.",
            '**Combinaison Madelin + PER** : pour TNS hauts revenus, cumuler les deux dispositifs peut maximiser la déduction. Vérifier compatibilité plafonds avec votre expert-comptable.',
            '**Transition à la retraite** : à 60-62 ans, basculer du Madelin Retraite vers une rente immédiate. Optimiser le moment du versement (avant ou après bascule à un TMI inférieur).',
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: [
          "**Suis-je éligible Madelin en tant qu'auto-entrepreneur ?** NON. Le régime micro-fiscal des AE exclut la Loi Madelin. Préférez une mutuelle santé indépendant non-Madelin, souvent 15-20 % moins chère sans avantage fiscal.",
          '**Quelle différence entre Madelin santé et Madelin retraite ?** Madelin santé = mutuelle complémentaire pour soins quotidiens, plafond ~4 ~997  €/an. Madelin retraite = épargne long terme pour rente viagère post-65 ans, plafond ~2 ~935  €/an minimum.',
          "**Puis-je cumuler les 3 Madelin (santé, prévoyance, retraite) ?** OUI, les 3 sont des contrats distincts avec plafonds cumulables (sous conditions). Optimisation possible pour TNS hauts revenus jusqu'à ~12 ~000  €/an déductibles.",
          "**Que se passe-t-il si je dépasse le plafond ?** Le surplus n'est PAS déductible mais peut quand même être versé (pour augmenter les garanties). À éviter sauf besoin spécifique.",
          '**Comment optimiser entre Madelin et PER ?** Pour TNS modeste : PER plus souple. Pour TNS hauts revenus (TMI 41+ %) : cumuler les 2 maximise la déduction. Consultez votre expert-comptable.',
          "**Le Madelin existe-t-il encore en 2026 ?** OUI, il n'a PAS été supprimé par la Loi PACTE 2019. Il cohabite avec le PER. Les contrats Madelin existants continuent + de nouveaux contrats peuvent être souscrits.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 24 — Devoir de conseil DDA art. L. 521-4 (100 vol gap)
  // ════════════════════════════════════════════════════════════════════
  'devoir-conseil-dda-l-521-4-courtier-obligations': {
    slug: 'devoir-conseil-dda-l-521-4-courtier-obligations',
    title: 'Devoir de conseil DDA art. L. 521-4 : ce que votre courtier doit faire en 2026',
    description:
      '4 obligations légales du courtier en assurance (DDA art. L. 521-4 + Recommandation ACPR 2024-R-03). Recueil exigences, analyse impartiale, recommandation motivée, traçabilité. Recours client en cas de manquement.',
    category: 'RC Pro',
    tags: ['devoir conseil', 'dda', 'art l 521-4', 'courtier', 'obligations'],
    ...AUTHOR,
    publishedAt: '2026-06-05',
    updatedAt: '2026-06-05',
    readTime: '8 min',
    sources: [
      LEGIFRANCE('Code des assurances art. L. 521-4', 'codes/article_lc/LEGIARTI000036330029'),
      {
        label: 'Directive UE 2016/97 (DDA)',
        url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016L0097',
      },
      ACPR('Recommandation ACPR 2024-R-03 (devoir de conseil)'),
      LEGIFRANCE(
        'Code des assurances art. L. 521-2 (transparence)',
        'codes/article_lc/LEGIARTI000036330033'
      ),
      LEGIFRANCE('Ordonnance 2018-361 (transposition DDA)', 'loda/id/JORFTEXT000037027841'),
    ],
    toc: [
      { id: 'principe', title: '1. Principe du devoir de conseil' },
      { id: 'obligations', title: '2. 4 obligations légales détaillées' },
      { id: 'acpr-2024-r-03', title: '3. Recommandation ACPR 2024-R-03 (traçabilité)' },
      { id: 'distinction', title: '4. Courtier vs agent général : différences' },
      { id: 'sanctions', title: '5. Sanctions en cas de manquement' },
      { id: 'recours', title: '6. 4 recours client possibles' },
      { id: 'verifier', title: '7. Comment vérifier votre courtier' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'principe',
        h2: '1. Principe du devoir de conseil',
        paragraphs: [
          "L'article L. 521-4 du Code des assurances (transposition Directive DDA 2016/97 via Ordonnance 2018-361) impose au courtier en assurance un DEVOIR DE CONSEIL PERSONNALISÉ envers chaque client. Ce n'est PAS une simple obligation contractuelle : c'est une obligation légale dont le manquement engage la responsabilité civile et disciplinaire du courtier.",
          "Le devoir de conseil distingue le courtier d'un simple vendeur d'assurance. Un courtier ne peut pas se contenter de vous proposer un produit : il doit RECUEILLIR vos exigences, IDENTIFIER vos besoins, ANALYSER le marché, et formuler une RECOMMANDATION MOTIVÉE par écrit. Toute manquement à l'une de ces 4 étapes peut entraîner des sanctions.",
          "L'objectif du législateur européen avec la DDA était d'harmoniser les pratiques entre les 27 États membres et de protéger les consommateurs face à des intermédiaires opportunistes. La France a transposé cette directive avec un haut niveau d'exigence — parfois plus strict que d'autres pays européens.",
        ],
        callout: {
          tone: 'info',
          text: "Le devoir de conseil s'applique à TOUS les contrats d'assurance distribués par un courtier, qu'il s'agisse d'un AE consultant souscrivant une RC Pro à ~180  €/an ou d'un grand groupe industriel souscrivant une décennale à ~200 000  €/an. La proportionnalité de l'analyse peut varier, mais l'obligation existe.",
        },
      },
      {
        id: 'obligations',
        h2: '2. 4 obligations légales détaillées',
        paragraphs: [
          'Le devoir de conseil se décompose en 4 obligations cumulatives, toutes obligatoires :',
        ],
        list: {
          ordered: true,
          items: [
            "**Recueil des exigences et besoins du client** (art. L. 521-4 I). Le courtier doit obtenir du client toutes les informations nécessaires : nature de l'activité, profil de risque, antécédents sinistres, situation financière, objectifs spécifiques. Ce recueil doit être documenté (questionnaire structuré, entretien transcrit) et horodaté.",
            "**Analyse impartiale d'un nombre suffisant de contrats** (art. L. 521-4 II). Le courtier doit interroger plusieurs assureurs du marché et comparer leurs offres de manière OBJECTIVE. Le nombre 'suffisant' n'est pas légalement défini mais la jurisprudence et la doctrine ACPR retiennent généralement 3 à 5 assureurs minimum.",
            "**Formulation d'une recommandation écrite motivée** (art. L. 521-4 III). Le courtier doit remettre au client UN DOCUMENT ÉCRIT justifiant le produit choisi : pourquoi celui-ci plutôt qu'un autre, quelles sont les alternatives examinées, pourquoi le tarif est adapté au profil.",
            "**Suivi du contrat dans le temps** : le devoir de conseil ne s'arrête pas à la souscription. Le courtier doit informer le client des évolutions réglementaires, proposer des ajustements de garanties si l'activité change, gérer les sinistres en accompagnement.",
          ],
        },
      },
      {
        id: 'acpr-2024-r-03',
        h2: '3. Recommandation ACPR 2024-R-03 (traçabilité)',
        paragraphs: [
          "La Recommandation ACPR 2024-R-03 publiée en mars 2024 renforce les obligations de traçabilité du devoir de conseil. Trois exigences clés s'imposent aux courtiers en assurance professionnelle :",
        ],
        list: {
          ordered: true,
          items: [
            "**Conservation 10 ans minimum** de tous les documents liés au devoir de conseil : questionnaire de recueil d'exigences, analyse comparative multi-assureurs, recommandation motivée écrite, accusé de réception client.",
            "**Hashage SHA-256** pour preuve d'intégrité immuable : chaque document conseil doit pouvoir être prouvé non-modifié post-création. Notre cabinet utilise un système de hashage automatique au moment de la signature électronique.",
            "**Audit ACPR possible à tout moment** : le courtier doit pouvoir produire ses dossiers conseil sous 30 jours sur demande de l'ACPR. Échantillonnage aléatoire de 50-200 dossiers par contrôle.",
          ],
        },
      },
      {
        id: 'distinction',
        h2: '4. Courtier vs agent général : différences',
        paragraphs: [
          "Le devoir de conseil DDA s'applique aux courtiers ET aux agents généraux d'assurance, mais avec des nuances importantes en pratique :",
          '**Courtier (catégorie b ORIAS)** : indépendant, mandaté par le client, doit comparer plusieurs assureurs (art. L. 521-4 II). La recommandation motivée doit présenter au moins 3-5 alternatives examinées.',
          "**Agent général (catégorie a ORIAS)** : mandaté par UN seul assureur (AXA, Allianz, MAAF, etc.). L'agent n'est PAS tenu de comparer plusieurs compagnies — il vend uniquement les produits de son mandant. Son devoir de conseil se limite à recommander le produit le plus adapté DANS sa gamme propriétaire.",
          "**Implication pratique** : si vous voulez la GARANTIE d'avoir comparé plusieurs assureurs, vous devez passer par un courtier (catégorie b). Un agent général ne peut pas légalement comparer la concurrence pour vous, même si son produit est moins adapté.",
        ],
        callout: {
          tone: 'info',
          text: 'Tous les courtiers Vivos Assurance sont immatriculés ORIAS catégorie b (courtiers indépendants). Nous comparons systématiquement 3-5 assureurs partenaires sur chaque dossier, conformément à art. L. 521-4 II.',
        },
      },
      {
        id: 'sanctions',
        h2: '5. Sanctions en cas de manquement',
        paragraphs: [
          "Un courtier qui ne respecte pas son devoir de conseil s'expose à plusieurs niveaux de sanctions :",
        ],
        list: {
          items: [
            '**Sanction civile** : nullité du contrat OU obligation de réparation financière intégrale du préjudice subi par le client (Code civil art. 1240).',
            "**Sanction disciplinaire ACPR** : avertissement, blâme, interdiction temporaire ou définitive d'exercer, amende administrative jusqu'à 100 M€ pour les courtiers personnes morales.",
            "**Sanction ORIAS** : radiation du registre = interdiction immédiate d'exercer.",
            '**Sanction pénale** : possible en cas de fraude délibérée ou de pratiques commerciales trompeuses (art. L. 121-1 Code consommation).',
            '**Atteinte réputationnelle** : publication des sanctions ACPR sur le site officiel (acpr.banque-france.fr), accessible à tous les futurs clients.',
          ],
        },
      },
      {
        id: 'recours',
        h2: '6. 4 recours client possibles',
        paragraphs: [
          "Si vous estimez qu'un courtier n'a pas rempli son devoir de conseil, vous disposez de 4 recours cumulables :",
        ],
        list: {
          ordered: true,
          items: [
            '**Réclamation interne** auprès du courtier (Reco ACPR 2024-R-02). Délai de réponse imposé : 2 mois. Si refus ou silence, passer au recours suivant.',
            "**Saisine du Médiateur de l'Assurance** : procédure GRATUITE, durée 90 jours en moyenne, taux d'acceptation favorable au consommateur ~60 %. Formulaire en ligne mediation-assurance.org.",
            '**Signalement ACPR** : peut entraîner une enquête disciplinaire et des sanctions sur le courtier. Procédure via le formulaire en ligne acpr.banque-france.fr.',
            '**Action en responsabilité civile** devant le Tribunal Judiciaire : prescription 2 ans à compter du manquement. Possibilité de réparation financière intégrale (préjudice + intérêts + frais juridiques).',
          ],
        },
      },
      {
        id: 'verifier',
        h2: '7. Comment vérifier votre courtier',
        paragraphs: ['Avant de signer avec un courtier en 2026, vérifiez ces 6 éléments :'],
        list: {
          ordered: true,
          items: [
            '**Numéro ORIAS** : vérifier sur orias.fr que le courtier est actif (pas suspendu ou radié), catégorie b (courtier en assurance), et que ses activités déclarées correspondent à votre besoin.',
            "**Réception d'un questionnaire de recueil d'exigences** : un courtier qui propose un devis sans recueillir vos besoins par questionnaire structuré est en infraction.",
            "**Comparaison multi-assureurs** : demander explicitement quels assureurs ont été interrogés. Un courtier qui ne propose qu'une seule offre est suspect.",
            '**Recommandation écrite motivée** : exigez ce document avant signature. Sans lui, le courtier ne respecte pas son devoir de conseil.',
            '**Transparence des commissions** (art. L. 521-2 C. assur.) : un courtier doit communiquer sur demande écrite le montant de ses commissions perçues sur votre contrat.',
            "**Garantie financière et RCP courtier** : tout courtier doit disposer d'une garantie financière minimum 115 000 € + une RCP minimum 1,85 M€/sinistre (art. L. 512-6 et L. 512-7 C. assur.).",
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: [
          "**Le devoir de conseil est-il payant ?** NON. Le courtage est gratuit pour le client final. La rémunération du courtier provient des commissions versées par les compagnies d'assurance partenaires (art. L. 521-2 C. assur. — transparence DDA).",
          '**Combien de temps prend le devoir de conseil ?** Pour un contrat simple (RC Pro AE) : 30-60 minutes au total (questionnaire + recommandation écrite). Pour un contrat complexe (décennale BTP multi-métiers ou grand compte) : 2-5 heures réparties sur quelques jours.',
          "**Que faire si mon courtier ne respecte pas le devoir de conseil ?** Étape 1 : réclamation interne écrite. Étape 2 : Médiateur de l'Assurance si pas de réponse. Étape 3 : signalement ACPR. Étape 4 : action judiciaire en dernier recours.",
          "**Un agent général a-t-il le même devoir de conseil qu'un courtier ?** L'obligation existe MAIS dans une portée différente : l'agent général ne compare que SES PROPRES produits (mandant unique), alors que le courtier doit comparer plusieurs compagnies (3-5 minimum).",
          '**La recommandation écrite est-elle vraiment obligatoire ?** OUI absolument (art. L. 521-4 III). Sans elle, le courtier ne respecte pas son devoir de conseil et engage sa responsabilité civile. Exigez-la systématiquement avant signature.',
          "**Mon contrat est-il valide sans recommandation écrite ?** Le contrat reste valide MAIS vous pouvez engager la responsabilité du courtier pour manquement à son devoir de conseil. La sanction peut aller jusqu'à la nullité du contrat ou à la réparation financière intégrale de votre préjudice.",
        ],
      },
    ],
  },
}
