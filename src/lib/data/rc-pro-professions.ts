/**
 * Données détaillées par profession pour la RC Pro
 */

export interface ProfessionRcPro {
  slug: string
  name: string
  aliases?: string[]
  nafCodes: string[]
  tagline: string
  intro: string
  /** Obligation légale ? */
  obligatoire: boolean
  /** Référence légale */
  referenceLegale?: string
  /** Tarifs par profil */
  tarifs: {
    auto_entrepreneur: { min: number; max: number }
    sarl_sas: { min: number; max: number }
    grand_compte: { min: number; max: number }
  }
  /** Plafond recommandé en M€ */
  plafondRecommande: number
  /** Risques fréquents */
  risques: string[]
  /** Garanties recommandées */
  garantiesRecommandees: string[]
  /** Icône emoji */
  icon: string
  /** Nb pros estimés en France */
  nbProsFrance: number
}

export const RC_PRO_PROFESSIONS: Record<string, ProfessionRcPro> = {
  consultant: {
    slug: 'consultant',
    name: 'Consultant',
    aliases: ['Consultant management', 'Consultant stratégie', 'Consultant business'],
    nafCodes: ['7022Z'],
    tagline:
      'RC Pro consultant — Couvrez vos recommandations stratégiques contre les mises en cause clients.',
    intro:
      'Le métier de consultant (management, stratégie, organisation, finance) expose à un risque élevé de mise en cause sur la qualité du conseil délivré. Une recommandation jugée erronée par un client peut générer une réclamation pour préjudice financier (perte de CA, mauvaise décision M&A, etc.). La RC Pro consultant n’est pas légalement obligatoire mais est systématiquement exigée par les ESN, cabinets et clients grand compte. Notre cabinet ORIAS propose des contrats spécifiques avec plafond jusqu’à 5M€.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 144, max: 288 },
      sarl_sas: { min: 450, max: 1200 },
      grand_compte: { min: 2500, max: 5500 },
    },
    plafondRecommande: 1,
    risques: [
      'Recommandation stratégique erronée',
      'Préjudice financier client (perte CA)',
      'Manquement au devoir de conseil',
      'Confidentialité — fuite données client',
    ],
    garantiesRecommandees: [
      'RC Pro étendue (immatériels)',
      'Cyber assurance (données clients)',
      'Protection juridique pro',
      'Garantie défense recours',
    ],
    icon: '💼',
    nbProsFrance: 95000,
  },

  'freelance-it': {
    slug: 'freelance-it',
    name: 'Freelance IT — Développeur',
    aliases: ['Développeur freelance', 'Freelance DevOps', 'Consultant tech'],
    nafCodes: ['6201Z', '6202A'],
    tagline:
      'RC Pro freelance IT — Développement, intégration, déploiement. Couverture cyber incluse.',
    intro:
      'Le freelance IT (développeur, DevOps, consultant cloud) intervient sur des projets critiques pour ses clients. Un bug, une faille de sécurité, un déploiement raté peut générer une perte d’exploitation, une fuite de données ou une mise en cause RGPD. Les ESN et grands comptes exigent quasi-systématiquement une RC Pro avec extension cyber. Notre cabinet négocie des plafonds 1-3M€ adaptés aux freelances IT à partir de 200€ par an.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 200, max: 380 },
      sarl_sas: { min: 600, max: 1500 },
      grand_compte: { min: 3500, max: 7000 },
    },
    plafondRecommande: 2,
    risques: [
      'Bug en production (perte exploitation client)',
      'Faille de sécurité — fuite de données',
      'Manquement RGPD — non-conformité',
      'Retard de livraison — dépassement budget',
    ],
    garantiesRecommandees: [
      'RC Pro + Cyber inclus',
      'Garantie défense en cas de mise en cause',
      'Couverture sous-traitance (autres freelances)',
      'Protection juridique pro',
    ],
    icon: '👨‍💻',
    nbProsFrance: 80000,
  },

  'agence-web': {
    slug: 'agence-web',
    name: 'Agence web — digital',
    aliases: ['Agence digitale', 'Studio web', 'WebAgency'],
    nafCodes: ['7311Z', '6201Z'],
    tagline:
      'RC Pro agence web — Création de sites, applications, marketing digital. Pack RC + Cyber.',
    intro:
      'L’agence web ou digital combine création (sites, apps, e-commerce) + marketing (SEA, SEO, social ads) + parfois hébergement. Les sinistres typiques : site non fonctionnel à la livraison, retard impactant un lancement client (Black Friday, salon), faille de sécurité, perte de données client. La RC Pro avec extension cyber est indispensable pour toute agence sérieuse. Plafond recommandé : 1-3M€ selon la taille des projets.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 200, max: 400 },
      sarl_sas: { min: 600, max: 1800 },
      grand_compte: { min: 3200, max: 7000 },
    },
    plafondRecommande: 2,
    risques: [
      'Site non fonctionnel à la livraison',
      'Retard impactant un lancement client',
      'Faille de sécurité — hack du site client',
      'Manquement RGPD',
    ],
    garantiesRecommandees: [
      'RC Pro + Cyber étendu',
      'Garantie hébergement (si vous hébergez)',
      'Protection juridique pro',
      'Multirisque locaux',
    ],
    icon: '🌐',
    nbProsFrance: 12000,
  },

  designer: {
    slug: 'designer',
    name: 'Designer — Graphiste',
    aliases: ['Designer graphique', 'UX ou UI Designer', 'Illustrateur'],
    nafCodes: ['7410Z'],
    tagline: 'RC Pro designer — Couvrez vos créations graphiques, UX ou UI et droits d’auteur.',
    intro:
      'Le designer graphique ou UX ou UI fait face à des risques liés au droit d’auteur (utilisation d’éléments protégés), au délai de livraison et à la conformité du livrable (charte graphique, brand guidelines). La RC Pro designer protège contre les litiges client et les mises en cause pour contrefaçon involontaire. Tarifs accessibles à partir de 130€ par an pour un auto-entrepreneur.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 130, max: 260 },
      sarl_sas: { min: 400, max: 900 },
      grand_compte: { min: 1800, max: 3500 },
    },
    plafondRecommande: 1,
    risques: [
      'Utilisation involontaire d’éléments protégés (contrefaçon)',
      'Retard de livraison',
      'Non-conformité au brief client',
      'Perte de fichiers source',
    ],
    garantiesRecommandees: [
      'RC Pro avec garantie propriété intellectuelle',
      'Garantie défense recours',
      'Couverture cyber (fichiers clients)',
    ],
    icon: '🎨',
    nbProsFrance: 35000,
  },

  photographe: {
    slug: 'photographe',
    name: 'Photographe pro',
    aliases: ['Photographe événementiel', 'Photographe portrait', 'Photographe corporate'],
    nafCodes: ['7420Z'],
    tagline: 'RC Pro photographe — Mariage, corporate, événementiel. Garantie matériel incluse.',
    intro:
      'Le photographe professionnel (mariage, événementiel, corporate, portrait) fait face à des risques spécifiques : dommages matériel (vol, casse), perte de fichiers (carte SD défectueuse), dommages corporels lors de séances, droit à l’image. Notre cabinet propose des contrats sur-mesure avec garantie matériel à partir de 500€ par an.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 200, max: 400 },
      sarl_sas: { min: 500, max: 1100 },
      grand_compte: { min: 2200, max: 4500 },
    },
    plafondRecommande: 1,
    risques: [
      'Vol — casse matériel photo',
      'Perte fichiers (carte SD défectueuse)',
      'Dommages aux biens (mariage, événements)',
      'Droit à l’image — RGPD',
    ],
    garantiesRecommandees: [
      'RC Pro événementielle',
      'Garantie matériel photo (vol + casse)',
      'Couverture déplacements pro',
      'Protection juridique pro',
    ],
    icon: '📷',
    nbProsFrance: 18000,
  },

  'coach-pro': {
    slug: 'coach-pro',
    name: 'Coach professionnel',
    aliases: ['Coach business', 'Coach de vie', 'Mentor'],
    nafCodes: ['7022Z', '8559B'],
    tagline: 'RC Pro coach — Couvrez vos accompagnements individuels et collectifs.',
    intro:
      'Le coach professionnel (business, vie, sportif si certifié) intervient en accompagnement individuel ou collectif. Les risques : mise en cause sur la qualité de l’accompagnement, conflit avec un client, atteinte à la réputation. La RC Pro coach est généralement à 200-400€ par an, idéale pour les auto-entrepreneurs.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 120, max: 240 },
      sarl_sas: { min: 350, max: 900 },
      grand_compte: { min: 2000, max: 4500 },
    },
    plafondRecommande: 1,
    risques: [
      'Mise en cause sur qualité accompagnement',
      'Conflit — litige client',
      'Atteinte réputation — dénigrement',
      'Manquement à la confidentialité',
    ],
    garantiesRecommandees: [
      'RC Pro accompagnement',
      'Protection juridique pro',
      'Garantie défense pénale',
    ],
    icon: '🎯',
    nbProsFrance: 40000,
  },

  'auto-entrepreneur': {
    slug: 'auto-entrepreneur',
    name: 'Auto-entrepreneur — micro-entrepreneur',
    aliases: ['Micro-entrepreneur', 'Auto-entrepreneur services'],
    nafCodes: ['*'],
    tagline:
      'RC Pro auto-entrepreneur — La couverture pro adaptée à votre statut. À partir de 9€ par mois.',
    intro:
      'Le statut d’auto-entrepreneur n’exonère pas de la responsabilité civile professionnelle : un auto-entrepreneur engage son patrimoine personnel en cas de sinistre. La RC Pro auto-entrepreneur permet de protéger ses biens personnels (résidence, comptes bancaires) en cas de mise en cause. Tarifs ultra-accessibles à partir de 9€ par mois selon l’activité. Notre cabinet ORIAS travaille avec Hiscox, April Pro, Stello et Wakam, spécialisés AE.',
    obligatoire: false,
    referenceLegale:
      'Selon activité (obligatoire pour BTP, médical, juridique, immobilier, agences voyages)',
    tarifs: {
      auto_entrepreneur: { min: 108, max: 360 },
      sarl_sas: { min: 0, max: 0 },
      grand_compte: { min: 0, max: 0 },
    },
    plafondRecommande: 1,
    risques: [
      'Mise en cause patrimoine personnel',
      'Sinistre client — livraison défectueuse',
      'Dommages matériels chez le client',
      'Manquement contractuel',
    ],
    garantiesRecommandees: [
      'RC Pro adaptée à l’activité',
      'Couverture multi-activités (si polyvalent)',
      'Garantie défense recours',
      'Protection juridique pro',
    ],
    icon: '🧑‍💼',
    nbProsFrance: 2500000,
  },

  formateur: {
    slug: 'formateur',
    name: 'Formateur — Organisme de formation',
    aliases: ['Formateur indépendant', 'Centre de formation', 'Formateur Qualiopi'],
    nafCodes: ['8559A', '8559B'],
    tagline: 'RC Pro formateur — Conformité Qualiopi + responsabilité pédagogique.',
    intro:
      'Le formateur indépendant ou organisme de formation (Qualiopi obligatoire pour CPF ou OPCO) doit couvrir sa responsabilité pédagogique : non-conformité du contenu de formation, absence de résultats, accident lors d’une session, mise en cause sur la certification. Notre cabinet propose des contrats RC Pro formateur à partir de 280€ par an avec extension Qualiopi.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 200, max: 400 },
      sarl_sas: { min: 500, max: 1500 },
      grand_compte: { min: 2500, max: 6000 },
    },
    plafondRecommande: 1,
    risques: [
      'Non-conformité contenu (Qualiopi)',
      'Absence de résultats client',
      'Accident lors d’une session',
      'Mise en cause sur certification',
    ],
    garantiesRecommandees: [
      'RC Pro formation + Qualiopi',
      'Multirisque salle de formation',
      'Garantie cyber (plateforme e-learning)',
      'Protection juridique',
    ],
    icon: '🎓',
    nbProsFrance: 35000,
  },

  // ─── Phase 2 — Professions réglementées (RC Pro obligatoire) ────────────

  avocat: {
    slug: 'avocat',
    name: 'Avocat',
    nafCodes: ['6910Z'],
    tagline: 'RC Pro avocat — Obligation légale ordre des avocats, plafond 1,5M€ minimum.',
    intro:
      'La RC Pro est OBLIGATOIRE pour les avocats (art. 27 Loi 71-1130 + Décret 96-1080). Elle couvre les fautes professionnelles, le devoir de conseil, la confidentialité.',
    obligatoire: true,
    referenceLegale: 'Art. 27 Loi 71-1130 + Décret 96-1080',
    tarifs: {
      auto_entrepreneur: { min: 850, max: 1800 },
      sarl_sas: { min: 2200, max: 5500 },
      grand_compte: { min: 8000, max: 22000 },
    },
    plafondRecommande: 1.5,
    risques: ['Erreur procédure', 'Manquement délai', 'Conflit d’intérêts', 'Confidentialité'],
    garantiesRecommandees: ['RC Pro 1,5M€ min', 'Garantie subséquente 10 ans', 'Cyber'],
    icon: '⚖️',
    nbProsFrance: 70000,
  },
  notaire: {
    slug: 'notaire',
    name: 'Notaire',
    nafCodes: ['6910Z'],
    tagline: 'RC Pro notaire — Obligation Conseil Sup. Notariat, plafond 5M€.',
    intro:
      'La RC Pro notaire est obligatoire (art. 13 Décret 73-541). Couvre les actes authentiques, le conseil, la responsabilité solidaire.',
    obligatoire: true,
    referenceLegale: 'Art. 13 Décret 73-541',
    tarifs: {
      auto_entrepreneur: { min: 0, max: 0 },
      sarl_sas: { min: 5500, max: 12000 },
      grand_compte: { min: 18000, max: 50000 },
    },
    plafondRecommande: 5,
    risques: ['Erreur acte authentique', 'Manquement vérification', 'Confidentialité succession'],
    garantiesRecommandees: ['RC Pro 5M€', 'Garantie subséquente 30 ans', 'Cyber renforcée'],
    icon: '📜',
    nbProsFrance: 17000,
  },
  'expert-comptable': {
    slug: 'expert-comptable',
    name: 'Expert-comptable',
    nafCodes: ['6920Z'],
    tagline: 'RC Pro expert-comptable — Obligation Ordre, plafond 2M€.',
    intro:
      'La RC Pro est obligatoire pour les experts-comptables (Code de déontologie OECCA). Couvre les missions de comptabilité, audit, conseil fiscal et social.',
    obligatoire: true,
    referenceLegale: 'Code déontologie OECCA',
    tarifs: {
      auto_entrepreneur: { min: 320, max: 750 },
      sarl_sas: { min: 1500, max: 4500 },
      grand_compte: { min: 6500, max: 18000 },
    },
    plafondRecommande: 2,
    risques: [
      'Erreur déclaration fiscale',
      'Mauvais conseil fiscal',
      'Fraude collaborateur',
      'Cyber',
    ],
    garantiesRecommandees: ['RC Pro 2M€', 'Garantie subséquente 10 ans', 'Cyber + RGPD'],
    icon: '📊',
    nbProsFrance: 21000,
  },
  'commissaire-aux-comptes': {
    slug: 'commissaire-aux-comptes',
    name: 'Commissaire aux comptes',
    nafCodes: ['6920Z'],
    tagline: 'RC Pro CAC — Obligation H3C, plafond 5M€.',
    intro:
      'La RC Pro est obligatoire pour les CAC (art. L. 822-17 C. com.). Couvre les missions d’audit légal et contrôle des comptes.',
    obligatoire: true,
    referenceLegale: 'Art. L. 822-17 C. com.',
    tarifs: {
      auto_entrepreneur: { min: 0, max: 0 },
      sarl_sas: { min: 3500, max: 9500 },
      grand_compte: { min: 12000, max: 35000 },
    },
    plafondRecommande: 5,
    risques: ['Audit défaillant', 'Non-détection fraude', 'Indépendance', 'Confidentialité'],
    garantiesRecommandees: ['RC Pro 5M€', 'Garantie subséquente 10 ans'],
    icon: '🔍',
    nbProsFrance: 12000,
  },
  huissier: {
    slug: 'huissier',
    name: 'Huissier (commissaire de justice)',
    nafCodes: ['6910Z'],
    tagline: 'RC Pro huissier — Obligation Chambre nationale, plafond 1,5M€.',
    intro:
      'La RC Pro est obligatoire pour les commissaires de justice (ord. 2016-728). Couvre actes d’huissier, recouvrement, constats.',
    obligatoire: true,
    referenceLegale: 'Ord. 2016-728',
    tarifs: {
      auto_entrepreneur: { min: 0, max: 0 },
      sarl_sas: { min: 1800, max: 4500 },
      grand_compte: { min: 6000, max: 16000 },
    },
    plafondRecommande: 1.5,
    risques: ['Erreur acte', 'Recouvrement abusif', 'Confidentialité'],
    garantiesRecommandees: ['RC Pro 1,5M€', 'Garantie subséquente 10 ans'],
    icon: '📋',
    nbProsFrance: 3500,
  },
  'mandataire-judiciaire': {
    slug: 'mandataire-judiciaire',
    name: 'Mandataire judiciaire',
    nafCodes: ['6910Z'],
    tagline: 'RC Pro mandataire judiciaire — Obligation CNAJMJ, plafond 3M€.',
    intro:
      'RC Pro obligatoire (art. L. 814-9 C. com.). Couvre les procédures collectives, mandataires, administrateurs judiciaires.',
    obligatoire: true,
    referenceLegale: 'Art. L. 814-9 C. com.',
    tarifs: {
      auto_entrepreneur: { min: 0, max: 0 },
      sarl_sas: { min: 4500, max: 11000 },
      grand_compte: { min: 14000, max: 38000 },
    },
    plafondRecommande: 3,
    risques: ['Erreur procédure', 'Préjudice créanciers', 'Confidentialité'],
    garantiesRecommandees: ['RC Pro 3M€', 'Garantie subséquente 10 ans'],
    icon: '⚖️',
    nbProsFrance: 1200,
  },

  // ─── Santé / médical (RC Pro obligatoire — Loi Kouchner) ─────────────

  'medecin-generaliste': {
    slug: 'medecin-generaliste',
    name: 'Médecin généraliste',
    nafCodes: ['8621Z'],
    tagline: 'RC Pro médecin généraliste — Obligation Loi Kouchner, plafond 6M€.',
    intro:
      'RC Pro médicale obligatoire (art. L. 1142-2 CSP — Loi Kouchner 2002). Plafond minimum légal 8M€ par sinistre. Risque sinistralité élevé.',
    obligatoire: true,
    referenceLegale: 'Art. L. 1142-2 CSP — Loi Kouchner',
    tarifs: {
      auto_entrepreneur: { min: 0, max: 0 },
      sarl_sas: { min: 850, max: 1800 },
      grand_compte: { min: 2200, max: 5500 },
    },
    plafondRecommande: 8,
    risques: ['Erreur diagnostic', 'Manquement consentement éclairé', 'Faute médicale'],
    garantiesRecommandees: ['RC médicale 8M€', 'Protection juridique', 'Cyber données patient'],
    icon: '🩺',
    nbProsFrance: 102000,
  },
  'medecin-specialiste': {
    slug: 'medecin-specialiste',
    name: 'Médecin spécialiste',
    aliases: ['Cardiologue', 'Dermatologue', 'Pédiatre'],
    nafCodes: ['8622A', '8622B'],
    tagline: 'RC Pro médecin spécialiste — Obligation Loi Kouchner, plafond 8M€.',
    intro:
      'RC Pro médicale obligatoire avec sinistralité variable selon spécialité (chirurgie >> autres). Plafond légal 8M€ par sinistre minimum.',
    obligatoire: true,
    referenceLegale: 'Art. L. 1142-2 CSP',
    tarifs: {
      auto_entrepreneur: { min: 0, max: 0 },
      sarl_sas: { min: 1800, max: 5500 },
      grand_compte: { min: 6500, max: 25000 },
    },
    plafondRecommande: 8,
    risques: ['Erreur diagnostic spécialisé', 'Faute opératoire', 'Aléa thérapeutique'],
    garantiesRecommandees: ['RC médicale 8M€+', 'Protection juridique', 'Cyber'],
    icon: '🏥',
    nbProsFrance: 130000,
  },
  chirurgien: {
    slug: 'chirurgien',
    name: 'Chirurgien',
    nafCodes: ['8622A'],
    tagline: 'RC Pro chirurgien — Obligation Loi Kouchner, plafond 10M€ recommandé.',
    intro:
      'Spécialité à très forte sinistralité (sinistres rares mais coûts moyens > 500k€). RC Pro obligatoire avec plafonds renforcés conseillés.',
    obligatoire: true,
    referenceLegale: 'Art. L. 1142-2 CSP',
    tarifs: {
      auto_entrepreneur: { min: 0, max: 0 },
      sarl_sas: { min: 8500, max: 25000 },
      grand_compte: { min: 25000, max: 80000 },
    },
    plafondRecommande: 10,
    risques: ['Faute opératoire', 'Aléa thérapeutique', 'Préjudice corporel grave'],
    garantiesRecommandees: ['RC médicale 10M€+', 'Garantie subséquente 30 ans'],
    icon: '🔬',
    nbProsFrance: 12000,
  },
  'infirmiere-liberale': {
    slug: 'infirmiere-liberale',
    name: 'Infirmière libérale',
    nafCodes: ['8690D'],
    tagline: 'RC Pro infirmière libérale — Obligation Ordre, plafond 8M€.',
    intro:
      'RC Pro obligatoire pour les IDEL (art. L. 4312-7 CSP). Couvre soins à domicile, gestes techniques.',
    obligatoire: true,
    referenceLegale: 'Art. L. 4312-7 CSP',
    tarifs: {
      auto_entrepreneur: { min: 180, max: 380 },
      sarl_sas: { min: 380, max: 850 },
      grand_compte: { min: 1200, max: 2800 },
    },
    plafondRecommande: 8,
    risques: ['Erreur soin', 'Chute patient à domicile', 'Confidentialité'],
    garantiesRecommandees: ['RC médicale 8M€', 'Protection juridique', 'Multirisque véhicule pro'],
    icon: '💉',
    nbProsFrance: 130000,
  },
  kinesitherapeute: {
    slug: 'kinesitherapeute',
    name: 'Kinésithérapeute',
    nafCodes: ['8690E'],
    tagline: 'RC Pro kiné — Obligation Ordre, plafond 8M€.',
    intro:
      'RC Pro obligatoire pour les masseurs-kinésithérapeutes. Couvre gestes thérapeutiques, conseils, équipements.',
    obligatoire: true,
    referenceLegale: 'Art. L. 4321-19 CSP',
    tarifs: {
      auto_entrepreneur: { min: 180, max: 380 },
      sarl_sas: { min: 380, max: 950 },
      grand_compte: { min: 1500, max: 3500 },
    },
    plafondRecommande: 8,
    risques: ['Erreur manipulation', 'Aggravation pathologie', 'Chute table'],
    garantiesRecommandees: ['RC médicale 8M€', 'Multirisque cabinet', 'Protection juridique'],
    icon: '💪',
    nbProsFrance: 95000,
  },
  osteopathe: {
    slug: 'osteopathe',
    name: 'Ostéopathe',
    nafCodes: ['8690F'],
    tagline: 'RC Pro ostéopathe — Recommandée par les syndicats, plafond 6M€.',
    intro:
      'RC Pro fortement recommandée pour ostéopathes (encadrement légal Décret 2007-435). Couvre manipulations, conseils.',
    obligatoire: false,
    referenceLegale: 'Décret 2007-435',
    tarifs: {
      auto_entrepreneur: { min: 220, max: 480 },
      sarl_sas: { min: 480, max: 1100 },
      grand_compte: { min: 1500, max: 3500 },
    },
    plafondRecommande: 6,
    risques: ['Manipulation cervicale (AVC)', 'Aggravation pathologie', 'Chute'],
    garantiesRecommandees: ['RC Pro 6M€', 'Protection juridique', 'Multirisque cabinet'],
    icon: '🤲',
    nbProsFrance: 35000,
  },
  'sage-femme': {
    slug: 'sage-femme',
    name: 'Sage-femme libérale',
    nafCodes: ['8690D'],
    tagline: 'RC Pro sage-femme — Obligation Loi Kouchner, plafond 8M€.',
    intro:
      'RC Pro médicale obligatoire (art. L. 1142-2 CSP). Couvre suivi grossesse, accouchement, postnatal.',
    obligatoire: true,
    referenceLegale: 'Art. L. 1142-2 CSP',
    tarifs: {
      auto_entrepreneur: { min: 380, max: 850 },
      sarl_sas: { min: 850, max: 2200 },
      grand_compte: { min: 2800, max: 6500 },
    },
    plafondRecommande: 8,
    risques: ['Préjudice nouveau-né', 'Erreur surveillance', 'Aléa thérapeutique'],
    garantiesRecommandees: ['RC médicale 8M€', 'Garantie subséquente longue', 'Cyber'],
    icon: '🤰',
    nbProsFrance: 6500,
  },
  dentiste: {
    slug: 'dentiste',
    name: 'Chirurgien-dentiste',
    nafCodes: ['8623Z'],
    tagline: 'RC Pro dentiste — Obligation Ordre, plafond 8M€.',
    intro: 'RC Pro obligatoire (Code déontologie). Couvre soins, prothèses, implants, orthodontie.',
    obligatoire: true,
    referenceLegale: 'Code déontologie chirurgiens-dentistes',
    tarifs: {
      auto_entrepreneur: { min: 0, max: 0 },
      sarl_sas: { min: 1500, max: 3800 },
      grand_compte: { min: 4500, max: 12000 },
    },
    plafondRecommande: 8,
    risques: ['Échec implant', 'Erreur prothèse', 'Lésion nerveuse', 'Cyber dossiers patients'],
    garantiesRecommandees: ['RC médicale 8M€', 'Cyber + RGPD', 'Multirisque cabinet'],
    icon: '🦷',
    nbProsFrance: 42000,
  },
  psychologue: {
    slug: 'psychologue',
    name: 'Psychologue',
    nafCodes: ['8690F'],
    tagline: 'RC Pro psychologue — Recommandée syndicats, plafond 2M€.',
    intro:
      'RC Pro non légalement obligatoire mais fortement recommandée. Couvre les manquements au devoir de conseil et confidentialité.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 144, max: 320 },
      sarl_sas: { min: 320, max: 850 },
      grand_compte: { min: 1100, max: 2500 },
    },
    plafondRecommande: 2,
    risques: ['Manquement déontologique', 'Confidentialité dossier', 'Erreur diagnostic'],
    garantiesRecommandees: ['RC Pro 2M€', 'Cyber + RGPD', 'Protection juridique'],
    icon: '🧠',
    nbProsFrance: 75000,
  },
  pharmacien: {
    slug: 'pharmacien',
    name: 'Pharmacien titulaire',
    nafCodes: ['4773Z'],
    tagline: 'RC Pro pharmacien — Obligation Ordre, plafond 5M€.',
    intro:
      'RC Pro obligatoire (Code déontologie pharmaciens). Couvre dispensation, conseil, préparations magistrales.',
    obligatoire: true,
    referenceLegale: 'Code déontologie pharmaciens',
    tarifs: {
      auto_entrepreneur: { min: 0, max: 0 },
      sarl_sas: { min: 2200, max: 5500 },
      grand_compte: { min: 6500, max: 18000 },
    },
    plafondRecommande: 5,
    risques: ['Erreur dispensation', 'Préparation défectueuse', 'Vol stupéfiants'],
    garantiesRecommandees: ['RC Pro 5M€', 'Multirisque officine', 'Vol stupéfiants'],
    icon: '💊',
    nbProsFrance: 21500,
  },
  veterinaire: {
    slug: 'veterinaire',
    name: 'Vétérinaire',
    nafCodes: ['7500Z'],
    tagline: 'RC Pro vétérinaire — Obligation Ordre, plafond 2M€.',
    intro:
      'RC Pro obligatoire (Code déontologie vétérinaires). Couvre soins, chirurgie, prescription.',
    obligatoire: true,
    referenceLegale: 'Code déontologie vétérinaires',
    tarifs: {
      auto_entrepreneur: { min: 220, max: 480 },
      sarl_sas: { min: 950, max: 2500 },
      grand_compte: { min: 3500, max: 9500 },
    },
    plafondRecommande: 2,
    risques: ['Échec opération animal', 'Erreur prescription', 'Morsure tiers'],
    garantiesRecommandees: ['RC Pro 2M€', 'Multirisque clinique', 'RC tiers'],
    icon: '🐾',
    nbProsFrance: 23000,
  },

  // ─── Architecture / immobilier / juridique ───────────────────────────

  architecte: {
    slug: 'architecte',
    name: 'Architecte',
    nafCodes: ['7111Z'],
    tagline: 'RC Pro architecte — Obligation Ordre + décennale, plafond 1,5M€.',
    intro:
      'RC Pro et décennale obligatoires (Loi 77-2 + Loi Spinetta). Sinistralité élevée sur conception.',
    obligatoire: true,
    referenceLegale: 'Loi 77-2 + Loi Spinetta',
    tarifs: {
      auto_entrepreneur: { min: 850, max: 2200 },
      sarl_sas: { min: 2200, max: 6500 },
      grand_compte: { min: 8500, max: 25000 },
    },
    plafondRecommande: 1.5,
    risques: [
      'Erreur conception',
      'Manquement permis',
      'Décennale ouvrage',
      'Coordination chantier',
    ],
    garantiesRecommandees: ['RC Pro 1,5M€', 'Décennale architecte', 'Garantie subséquente 10 ans'],
    icon: '📐',
    nbProsFrance: 30000,
  },
  'agent-immobilier': {
    slug: 'agent-immobilier',
    name: 'Agent immobilier',
    nafCodes: ['6831Z'],
    tagline: 'RC Pro agent immobilier — Obligation carte T, plafond 500k€.',
    intro:
      'RC Pro obligatoire (Loi Hoguet + Décret 72-678). Couvre transactions immobilières, gestion locative.',
    obligatoire: true,
    referenceLegale: 'Loi Hoguet + Décret 72-678',
    tarifs: {
      auto_entrepreneur: { min: 380, max: 850 },
      sarl_sas: { min: 850, max: 2500 },
      grand_compte: { min: 3500, max: 9500 },
    },
    plafondRecommande: 0.5,
    risques: [
      'Erreur diagnostic obligatoire',
      'Manquement information acquéreur',
      'Garantie financière',
    ],
    garantiesRecommandees: ['RC Pro 500k€', 'Garantie financière (Loi Hoguet)', 'Cyber'],
    icon: '🏠',
    nbProsFrance: 35000,
  },
  'syndic-immobilier': {
    slug: 'syndic-immobilier',
    name: 'Syndic de copropriété',
    nafCodes: ['6832A'],
    tagline: 'RC Pro syndic — Obligation Loi Hoguet, plafond 1,5M€.',
    intro: 'RC Pro obligatoire (Loi Hoguet). Couvre gestion copropriétés, AG, comptes, sinistres.',
    obligatoire: true,
    referenceLegale: 'Loi Hoguet',
    tarifs: {
      auto_entrepreneur: { min: 580, max: 1300 },
      sarl_sas: { min: 1300, max: 3500 },
      grand_compte: { min: 4500, max: 12000 },
    },
    plafondRecommande: 1.5,
    risques: ['Erreur AG', 'Détournement fonds', 'Manquement obligations légales', 'Cyber'],
    garantiesRecommandees: ['RC Pro 1,5M€', 'Garantie financière obligatoire', 'Cyber + RGPD'],
    icon: '🏘️',
    nbProsFrance: 8500,
  },
  'diagnostic-immobilier': {
    slug: 'diagnostic-immobilier',
    name: 'Diagnostiqueur immobilier',
    nafCodes: ['7120A'],
    tagline: 'RC Pro diagnostiqueur — Obligation art. L. 271-6 CCH, plafond 500k€.',
    intro:
      'RC Pro obligatoire pour les certifications (DPE, amiante, plomb, termites). Forte sinistralité DPE post-réforme 2021.',
    obligatoire: true,
    referenceLegale: 'Art. L. 271-6 CCH',
    tarifs: {
      auto_entrepreneur: { min: 380, max: 850 },
      sarl_sas: { min: 850, max: 2200 },
      grand_compte: { min: 2800, max: 7500 },
    },
    plafondRecommande: 0.5,
    risques: ['Erreur DPE', 'Amiante non détectée', 'Termites non identifiés'],
    garantiesRecommandees: [
      'RC Pro 500k€',
      'Garantie subséquente 10 ans',
      'Multirisque équipement',
    ],
    icon: '🔍',
    nbProsFrance: 12000,
  },
  geometre: {
    slug: 'geometre',
    name: 'Géomètre-expert',
    nafCodes: ['7112B'],
    tagline: 'RC Pro géomètre — Obligation Ordre, plafond 1,5M€.',
    intro:
      'RC Pro obligatoire (Loi 46-942). Couvre bornage, division parcellaire, plans topographiques.',
    obligatoire: true,
    referenceLegale: 'Loi 46-942',
    tarifs: {
      auto_entrepreneur: { min: 580, max: 1300 },
      sarl_sas: { min: 1300, max: 3500 },
      grand_compte: { min: 4500, max: 12000 },
    },
    plafondRecommande: 1.5,
    risques: ['Erreur bornage', 'Plan inexact', 'Litige propriété'],
    garantiesRecommandees: ['RC Pro 1,5M€', 'Garantie subséquente 10 ans'],
    icon: '📏',
    nbProsFrance: 2500,
  },

  // ─── Tech / digital / créatif ────────────────────────────────────────

  'developpeur-freelance': {
    slug: 'developpeur-freelance',
    name: 'Développeur freelance',
    aliases: ['Dev fullstack', 'Backend dev', 'Frontend dev'],
    nafCodes: ['6201Z'],
    tagline: 'RC Pro développeur — Couvrez bugs, retards, propriété intellectuelle.',
    intro:
      'Le métier de dev freelance expose à la mise en cause sur livrables, retards, bugs. Demandée par 80% des clients ESN.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 96, max: 240 },
      sarl_sas: { min: 380, max: 1100 },
      grand_compte: { min: 2200, max: 5500 },
    },
    plafondRecommande: 1,
    risques: [
      'Bug en production',
      'Retard livraison',
      'Fuite code source',
      'Propriété intellectuelle',
    ],
    garantiesRecommandees: ['RC Pro 1M€', 'Cyber', 'Protection juridique'],
    icon: '💻',
    nbProsFrance: 110000,
  },
  'data-scientist': {
    slug: 'data-scientist',
    name: 'Data scientist',
    aliases: ['ML engineer', 'AI engineer'],
    nafCodes: ['6201Z'],
    tagline: 'RC Pro data scientist — Couvrez modèles ML, RGPD, biais algorithmique.',
    intro:
      'Profession à risques RGPD et IA Act renforcés. Mise en cause possible sur biais ML, fuite données, modèles défaillants.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 144, max: 380 },
      sarl_sas: { min: 580, max: 1500 },
      grand_compte: { min: 2800, max: 7500 },
    },
    plafondRecommande: 1.5,
    risques: ['Biais ML — discrimination', 'Fuite training data', 'Manquement RGPD', 'IA Act'],
    garantiesRecommandees: ['RC Pro 1,5M€', 'Cyber renforcée', 'Garantie subséquente 5 ans'],
    icon: '📊',
    nbProsFrance: 28000,
  },
  'community-manager': {
    slug: 'community-manager',
    name: 'Community manager',
    nafCodes: ['7311Z'],
    tagline: 'RC Pro community manager — Couvrez crise réputation, propriété intellectuelle.',
    intro: 'Risque réputation (post viral négatif), droit à l’image, propriété intellectuelle.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 96, max: 240 },
      sarl_sas: { min: 280, max: 750 },
      grand_compte: { min: 1100, max: 2800 },
    },
    plafondRecommande: 0.5,
    risques: ['Crise réputation', 'Droit image', 'Diffamation', 'Cyber'],
    garantiesRecommandees: ['RC Pro 500k€', 'Cyber + RGPD', 'Protection juridique'],
    icon: '📱',
    nbProsFrance: 42000,
  },
  'consultant-seo': {
    slug: 'consultant-seo',
    name: 'Consultant SEO',
    nafCodes: ['7311Z'],
    tagline: 'RC Pro consultant SEO — Couvrez sanctions Google, manquement résultats.',
    intro:
      'Risques liés aux engagements de résultats, sanctions Google (manual action), pratiques black hat.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 96, max: 240 },
      sarl_sas: { min: 380, max: 1100 },
      grand_compte: { min: 1800, max: 4500 },
    },
    plafondRecommande: 1,
    risques: ['Sanction Google', 'Engagement résultat non tenu', 'Pratique black hat client'],
    garantiesRecommandees: ['RC Pro 1M€', 'Protection juridique', 'Cyber'],
    icon: '🔎',
    nbProsFrance: 18000,
  },
  videaste: {
    slug: 'videaste',
    name: 'Vidéaste',
    aliases: ['Cameraman', 'Monteur vidéo'],
    nafCodes: ['5911A'],
    tagline: 'RC Pro vidéaste — Casse matériel, droit à l’image, livraison.',
    intro:
      'Couvre matériel pro (caméras, drones, éclairage), droit à l’image, livraison contractuelle.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 144, max: 380 },
      sarl_sas: { min: 580, max: 1500 },
      grand_compte: { min: 2200, max: 5500 },
    },
    plafondRecommande: 0.5,
    risques: ['Casse matériel', 'Droit image', 'Non-livraison', 'Drone (RC tiers)'],
    garantiesRecommandees: ['RC Pro 500k€', 'Multirisque matériel', 'RC drone'],
    icon: '🎥',
    nbProsFrance: 12000,
  },
  webmaster: {
    slug: 'webmaster',
    name: 'Webmaster — intégrateur',
    nafCodes: ['6201Z'],
    tagline: 'RC Pro webmaster — Site cassé, perte SEO, hébergement.',
    intro: 'Couvre les sites maintenus (uptime, perte SEO suite intervention, perte données).',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 96, max: 240 },
      sarl_sas: { min: 320, max: 850 },
      grand_compte: { min: 1100, max: 2800 },
    },
    plafondRecommande: 0.5,
    risques: ['Site cassé suite intervention', 'Perte SEO', 'Perte données client'],
    garantiesRecommandees: ['RC Pro 500k€', 'Cyber', 'Protection juridique'],
    icon: '🌐',
    nbProsFrance: 25000,
  },
  graphiste: {
    slug: 'graphiste',
    name: 'Graphiste',
    aliases: ['Directeur artistique', 'Illustrateur'],
    nafCodes: ['7410Z'],
    tagline: 'RC Pro graphiste — Propriété intellectuelle, contrefaçon, livraison.',
    intro:
      'Risque propriété intellectuelle (contrefaçon involontaire), droits images stock, livraison contractuelle.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 96, max: 240 },
      sarl_sas: { min: 280, max: 750 },
      grand_compte: { min: 1100, max: 2800 },
    },
    plafondRecommande: 0.5,
    risques: ['Contrefaçon', 'Droits images stock', 'Livraison non-conforme'],
    garantiesRecommandees: ['RC Pro 500k€', 'Garantie propriété intellectuelle', 'Cyber'],
    icon: '🎨',
    nbProsFrance: 38000,
  },

  // ─── Conseil / business ──────────────────────────────────────────────

  'conseil-rh': {
    slug: 'conseil-rh',
    name: 'Consultant RH',
    aliases: ['Recruteur', 'Cabinet RH'],
    nafCodes: ['7022Z'],
    tagline: 'RC Pro consultant RH — Recrutement, paie, conformité travail.',
    intro:
      'Couvre recommandations RH, recrutement, paie. Risque RGPD important sur les CV et données salariés.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 144, max: 320 },
      sarl_sas: { min: 580, max: 1500 },
      grand_compte: { min: 2200, max: 5500 },
    },
    plafondRecommande: 1,
    risques: ['Erreur recrutement', 'Manquement RGPD', 'Conseil paie erroné'],
    garantiesRecommandees: ['RC Pro 1M€', 'Cyber + RGPD', 'Protection juridique'],
    icon: '👥',
    nbProsFrance: 28000,
  },
  'conseil-financier': {
    slug: 'conseil-financier',
    name: 'Conseiller en gestion de patrimoine (CGP ou CIF)',
    nafCodes: ['6622Z'],
    tagline: 'RC Pro CGP ou CIF — Obligation ORIAS, plafond 1,5M€.',
    intro:
      'RC Pro obligatoire pour les CIF (art. L. 541-3 CMF). Couvre recommandations financières, devoir de conseil.',
    obligatoire: true,
    referenceLegale: 'Art. L. 541-3 CMF + ORIAS',
    tarifs: {
      auto_entrepreneur: { min: 380, max: 850 },
      sarl_sas: { min: 1500, max: 3500 },
      grand_compte: { min: 4500, max: 12000 },
    },
    plafondRecommande: 1.5,
    risques: ['Conseil financier inadapté', 'Manquement devoir conseil', 'Conflit intérêts'],
    garantiesRecommandees: ['RC Pro 1,5M€', 'Cyber', 'Protection juridique'],
    icon: '💼',
    nbProsFrance: 6500,
  },
  'agent-general-assurance': {
    slug: 'agent-general-assurance',
    name: 'Agent général d’assurance',
    nafCodes: ['6622Z'],
    tagline: 'RC Pro agent général — Obligation ORIAS, plafond 1,5M€.',
    intro:
      'RC Pro obligatoire (art. L. 512-6 C. assur.). Couvre distribution et conseil en assurance.',
    obligatoire: true,
    referenceLegale: 'Art. L. 512-6 C. assur.',
    tarifs: {
      auto_entrepreneur: { min: 0, max: 0 },
      sarl_sas: { min: 1200, max: 3500 },
      grand_compte: { min: 4500, max: 12000 },
    },
    plafondRecommande: 1.5,
    risques: ['Conseil DDA défaillant', 'Manquement obligations ACPR', 'Cyber'],
    garantiesRecommandees: ['RC Pro 1,5M€ (L. 512-6)', 'Cyber + RGPD', 'Garantie financière'],
    icon: '🛡️',
    nbProsFrance: 11000,
  },
  'consultant-marketing': {
    slug: 'consultant-marketing',
    name: 'Consultant marketing digital',
    nafCodes: ['7311Z'],
    tagline: 'RC Pro consultant marketing — Engagement résultats, RGPD.',
    intro:
      'Couvre les missions de marketing digital (SEA, SMA, content). Risque RGPD sur les données clients.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 96, max: 240 },
      sarl_sas: { min: 380, max: 1100 },
      grand_compte: { min: 1800, max: 4500 },
    },
    plafondRecommande: 1,
    risques: ['Engagement ROI non tenu', 'Manquement RGPD', 'Sanctions plateformes'],
    garantiesRecommandees: ['RC Pro 1M€', 'Cyber + RGPD', 'Protection juridique'],
    icon: '📈',
    nbProsFrance: 22000,
  },

  // ─── Services aux particuliers ───────────────────────────────────────

  'aide-domicile': {
    slug: 'aide-domicile',
    name: 'Aide à domicile',
    aliases: ['Auxiliaire de vie'],
    nafCodes: ['8810A'],
    tagline: 'RC Pro aide à domicile — Couvrez chute, casse, soin personne.',
    intro:
      'Couvre les interventions chez les bénéficiaires (chute, casse mobilier, manquement soin). Risque corporel.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 144, max: 320 },
      sarl_sas: { min: 380, max: 950 },
      grand_compte: { min: 1500, max: 3500 },
    },
    plafondRecommande: 1,
    risques: ['Chute bénéficiaire', 'Casse mobilier client', 'Vol accusation', 'Cyber'],
    garantiesRecommandees: ['RC Pro 1M€', 'Multirisque déplacement', 'Protection juridique'],
    icon: '🏡',
    nbProsFrance: 250000,
  },
  esthetique: {
    slug: 'esthetique',
    name: 'Esthéticienne',
    aliases: ['Institut beauté'],
    nafCodes: ['9602B'],
    tagline: 'RC Pro esthéticienne — Brûlure, allergie, lasers IPL.',
    intro:
      'Couvre les soins esthétiques (épilation laser ou IPL, soins visage, manucure). Sinistralité brûlures et allergies.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 220, max: 480 },
      sarl_sas: { min: 480, max: 1300 },
      grand_compte: { min: 1800, max: 4500 },
    },
    plafondRecommande: 1,
    risques: ['Brûlure laser', 'Allergie produits', 'Casse matériel'],
    garantiesRecommandees: ['RC Pro 1M€', 'Multirisque institut', 'Garantie matériel'],
    icon: '💅',
    nbProsFrance: 95000,
  },
  coiffeur: {
    slug: 'coiffeur',
    name: 'Coiffeur à domicile',
    nafCodes: ['9602A'],
    tagline: 'RC Pro coiffeur — Allergie teinture, brûlure, casse.',
    intro: 'Couvre les prestations à domicile (allergie produits, brûlure, casse mobilier).',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 144, max: 320 },
      sarl_sas: { min: 320, max: 850 },
      grand_compte: { min: 1100, max: 2800 },
    },
    plafondRecommande: 0.5,
    risques: ['Allergie teinture', 'Brûlure fer', 'Casse mobilier client'],
    garantiesRecommandees: ['RC Pro 500k€', 'Multirisque outillage', 'RC déplacement'],
    icon: '✂️',
    nbProsFrance: 85000,
  },
  taxi: {
    slug: 'taxi',
    name: 'Taxi',
    nafCodes: ['4932Z'],
    tagline: 'RC Pro taxi — Obligation L. 211-1, autorisation préfecture.',
    intro:
      'Assurance véhicule taxi obligatoire (art. L. 211-1 C. assur.). Couvre transport rémunéré + RC tiers.',
    obligatoire: true,
    referenceLegale: 'Art. L. 211-1 C. assur. + autorisation taxi',
    tarifs: {
      auto_entrepreneur: { min: 1200, max: 2400 },
      sarl_sas: { min: 2400, max: 5500 },
      grand_compte: { min: 6500, max: 15000 },
    },
    plafondRecommande: 1,
    risques: ['Accident circulation', 'Vol', 'Agression conducteur'],
    garantiesRecommandees: [
      'Assurance taxi obligatoire',
      'Protection juridique',
      'IJ arrêt travail',
    ],
    icon: '🚕',
    nbProsFrance: 58000,
  },

  // ─── Restauration / commerce ──────────────────────────────────────────

  restaurateur: {
    slug: 'restaurateur',
    name: 'Restaurateur',
    nafCodes: ['5610A'],
    tagline: 'RC Pro restaurateur — Intoxication alimentaire, incendie, glissade.',
    intro:
      'Couvre les sinistres alimentaires (intoxication, allergène), incendie cuisine, glissades clientèle.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 480, max: 950 },
      sarl_sas: { min: 1500, max: 3800 },
      grand_compte: { min: 5500, max: 14000 },
    },
    plafondRecommande: 1,
    risques: [
      'Intoxication alimentaire',
      'Incendie cuisine',
      'Glissade clientèle',
      'Erreur allergène',
    ],
    garantiesRecommandees: ['RC Pro 1M€', 'Multirisque restaurant', 'Perte d’exploitation'],
    icon: '🍽️',
    nbProsFrance: 175000,
  },
  commercant: {
    slug: 'commercant',
    name: 'Commerçant indépendant',
    nafCodes: ['4711F'],
    tagline: 'RC Pro commerçant — Glissade client, vol, casse.',
    intro:
      'Couvre les sinistres en boutique (glissade client, vol, casse). Multirisque pro indispensable.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 220, max: 480 },
      sarl_sas: { min: 480, max: 1300 },
      grand_compte: { min: 1800, max: 4500 },
    },
    plafondRecommande: 1,
    risques: ['Glissade client', 'Vol stocks', 'Incendie', 'Cyber (e-commerce)'],
    garantiesRecommandees: ['RC Pro 1M€', 'Multirisque commerce', 'Cyber si e-commerce'],
    icon: '🛍️',
    nbProsFrance: 280000,
  },
  'agent-de-voyage': {
    slug: 'agent-de-voyage',
    name: 'Agent de voyage',
    nafCodes: ['7911Z'],
    tagline: 'RC Pro agent de voyage — Obligation Atout France, plafond 750k€.',
    intro:
      'RC Pro obligatoire (Loi 2009-888). Couvre prestations vendues, défaillance prestataire, garantie financière.',
    obligatoire: true,
    referenceLegale: 'Loi 2009-888 + Atout France',
    tarifs: {
      auto_entrepreneur: { min: 580, max: 1300 },
      sarl_sas: { min: 1500, max: 4500 },
      grand_compte: { min: 5500, max: 14000 },
    },
    plafondRecommande: 0.75,
    risques: ['Défaillance prestataire', 'Annulation voyage', 'Cyber données client'],
    garantiesRecommandees: ['RC Pro 750k€', 'Garantie financière (APST)', 'Cyber + RGPD'],
    icon: '✈️',
    nbProsFrance: 4500,
  },

  // ─── Bien-être / sport ───────────────────────────────────────────────

  'coach-sportif': {
    slug: 'coach-sportif',
    name: 'Coach sportif',
    nafCodes: ['9329Z'],
    tagline: 'RC Pro coach sportif — Blessure client, salle, matériel.',
    intro:
      'Couvre les blessures lors des sessions sportives. Carte professionnelle obligatoire (art. L. 212-1 C. sport).',
    obligatoire: true,
    referenceLegale: 'Art. L. 212-1 C. sport',
    tarifs: {
      auto_entrepreneur: { min: 144, max: 320 },
      sarl_sas: { min: 380, max: 950 },
      grand_compte: { min: 1500, max: 3800 },
    },
    plafondRecommande: 1.5,
    risques: ['Blessure client', 'Aggravation pathologie', 'Casse matériel'],
    garantiesRecommandees: ['RC Pro 1,5M€', 'Multirisque salle', 'IJ arrêt travail'],
    icon: '🏋️',
    nbProsFrance: 32000,
  },
  'moniteur-yoga': {
    slug: 'moniteur-yoga',
    name: 'Moniteur yoga — pilates',
    nafCodes: ['9329Z'],
    tagline: 'RC Pro yoga — Blessure, locaux, formation Yoga Alliance.',
    intro:
      'Couvre les blessures en cours de yoga — pilates. Recommandé même sans carte pro obligatoire.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 144, max: 280 },
      sarl_sas: { min: 320, max: 750 },
      grand_compte: { min: 1100, max: 2800 },
    },
    plafondRecommande: 1,
    risques: ['Blessure pose', 'Aggravation pathologie', 'Casse matériel'],
    garantiesRecommandees: ['RC Pro 1M€', 'Multirisque studio', 'Cyber abonnement en ligne'],
    icon: '🧘',
    nbProsFrance: 18000,
  },
  'animateur-jeunesse': {
    slug: 'animateur-jeunesse',
    name: 'Animateur jeunesse — BAFA',
    nafCodes: ['9329Z'],
    tagline: 'RC Pro animateur — Garde mineurs, sortie, accident.',
    intro:
      'Couvre la garde de mineurs (centres aérés, classes vertes). Obligation BAFA pour activités déclarées.',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 144, max: 280 },
      sarl_sas: { min: 280, max: 750 },
      grand_compte: { min: 1100, max: 2500 },
    },
    plafondRecommande: 1.5,
    risques: ['Accident enfant', 'Sortie hors site', 'Manquement encadrement'],
    garantiesRecommandees: ['RC Pro 1,5M€', 'Protection juridique', 'Multirisque local'],
    icon: '🎈',
    nbProsFrance: 45000,
  },

  // ─── Logistique / transport ──────────────────────────────────────────

  'transporteur-leger': {
    slug: 'transporteur-leger',
    name: 'Transporteur léger',
    aliases: ['Coursier', 'Livreur'],
    nafCodes: ['4942Z'],
    tagline: 'RC Pro transporteur léger — Marchandise, accident, retard.',
    intro: 'Couvre les marchandises transportées + RC contractuelle (retard, perte).',
    obligatoire: true,
    referenceLegale: 'Loi LOTI',
    tarifs: {
      auto_entrepreneur: { min: 1200, max: 2500 },
      sarl_sas: { min: 2500, max: 5500 },
      grand_compte: { min: 6500, max: 15000 },
    },
    plafondRecommande: 1,
    risques: ['Perte ou casse marchandise', 'Accident circulation', 'Retard livraison'],
    garantiesRecommandees: [
      'RC contractuelle marchandise',
      'Multirisque véhicule',
      'Protection juridique',
    ],
    icon: '📦',
    nbProsFrance: 65000,
  },

  // ─── Bâtiment second œuvre (non décennale) ────────────────────────────

  'serrurier-depannage': {
    slug: 'serrurier-depannage',
    name: 'Serrurier de dépannage',
    nafCodes: ['4321A'],
    tagline: 'RC Pro serrurier dépannage — Casse, conseil, urgence 24/7.',
    intro:
      'Couvre les interventions de dépannage (effraction de porte, changement serrure). Marché à risque (litiges tarification).',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 380, max: 850 },
      sarl_sas: { min: 850, max: 2200 },
      grand_compte: { min: 2800, max: 6500 },
    },
    plafondRecommande: 0.5,
    risques: ['Casse porte client', 'Litige tarification', 'Vol après intervention'],
    garantiesRecommandees: ['RC Pro 500k€', 'Multirisque véhicule', 'Protection juridique'],
    icon: '🔐',
    nbProsFrance: 14000,
  },
  'electricien-depannage': {
    slug: 'electricien-depannage',
    name: 'Électricien dépannage',
    nafCodes: ['4321A'],
    tagline: 'RC Pro électricien dépannage — Court-circuit, urgence, conseil.',
    intro:
      'Couvre les interventions électriques de dépannage hors décennale (réparation circuits, prises, tableaux).',
    obligatoire: false,
    tarifs: {
      auto_entrepreneur: { min: 280, max: 580 },
      sarl_sas: { min: 580, max: 1500 },
      grand_compte: { min: 2200, max: 5500 },
    },
    plafondRecommande: 0.5,
    risques: ['Court-circuit suite intervention', 'Casse appareils', 'Erreur diagnostic'],
    garantiesRecommandees: ['RC Pro 500k€', 'Multirisque véhicule'],
    icon: '⚡',
    nbProsFrance: 18000,
  },
}

export function getProfessionSlugs(): string[] {
  return Object.keys(RC_PRO_PROFESSIONS)
}

export function getProfession(slug: string): ProfessionRcPro | null {
  return RC_PRO_PROFESSIONS[slug] ?? null
}
