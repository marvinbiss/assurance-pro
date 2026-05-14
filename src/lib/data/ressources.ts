/**
 * Catalogue des ressources téléchargeables (lead magnets).
 *
 * Chaque ressource est rendue sur `/ressources/[slug]` avec contenu HTML
 * imprimable (CSS @media print → PDF natif navigateur). CTA newsletter en
 * bas pour capturer les emails.
 *
 * Toutes les ressources sont YMYL-compliant : aucune affirmation tarifaire
 * précise sans qualificateur, mentions DDA L. 521-4 + ACPR systématiques.
 */

export interface Ressource {
  slug: string
  title: string
  description: string
  /** Catégorie pour filtre */
  category: 'btp' | 'rc-pro' | 'reglementation' | 'fiscalite' | 'sinistre'
  /** Lucide icon name */
  icon: 'Hammer' | 'ShieldCheck' | 'Scale' | 'Calculator' | 'AlertTriangle'
  /** Temps de lecture estimé */
  readTime: string
  /** Date de mise à jour */
  updatedAt: string
  /** Métiers/profils ciblés */
  audience: string[]
  /** Sections de contenu (rendu comme article structuré) */
  sections: Array<{
    h2: string
    paragraphs?: string[]
    list?: { ordered?: boolean; items: string[] }
    callout?: { tone: 'info' | 'warning' | 'success'; text: string }
  }>
}

export const RESSOURCES: Record<string, Ressource> = {
  'kit-rc-pro-auto-entrepreneur-2026': {
    slug: 'kit-rc-pro-auto-entrepreneur-2026',
    title: 'Kit complet RC Pro auto-entrepreneur 2026',
    description:
      "Tout ce que vous devez savoir avant de souscrire votre RC Pro en tant qu'auto-entrepreneur : obligations légales par métier, fourchettes tarifaires indicatives, 8 critères clés du contrat, démarches.",
    category: 'rc-pro',
    icon: 'ShieldCheck',
    readTime: '8 min',
    updatedAt: '2026-05-14',
    audience: ['Auto-entrepreneur', 'Micro-entreprise', 'Freelance'],
    sections: [
      {
        h2: '1. La RC Pro auto-entrepreneur en 1 minute',
        paragraphs: [
          "La Responsabilité Civile Professionnelle (RC Pro) couvre les dommages causés à des tiers dans l'exercice de votre activité. Pour un auto-entrepreneur, elle est OBLIGATOIRE pour 15 métiers (santé, immobilier, conseil financier, sport-éducateur, etc.) et FORTEMENT RECOMMANDÉE pour les autres.",
          "L'auto-entrepreneur a une responsabilité illimitée sur son patrimoine personnel (article 2284 du Code civil) : sans RC Pro, votre maison, voiture et économies peuvent être saisis en cas de condamnation civile. La RC Pro est donc votre seul filet de sécurité.",
        ],
      },
      {
        h2: "2. Suis-je obligé d'en souscrire ?",
        paragraphs: ['OBLIGATOIRE pour 15 catégories de métiers, indépendamment du statut :'],
        list: {
          items: [
            'Conseil & expertise : conseillers en investissements financiers (CIF), experts-comptables, avocats, notaires',
            'Santé & bien-être : ostéopathes, psychothérapeutes, esthéticiennes prothésistes ongulaires',
            'Immobilier : agents immobiliers, syndics, marchands de biens, courtiers (carte T/G/S obligatoire)',
            'Sport & loisirs : éducateurs sportifs déclarés, moniteurs de plongée, guides de haute montagne',
            'Transport : VTC, taxis, transporteurs de marchandises, ambulanciers',
            'Animaux : éducateurs canins, ostéopathes animaliers, dog-sitters professionnels',
            'Sécurité : agents de sécurité privée (carte CNAPS), détectives privés',
            'Formation pro : organismes de formation (loi du 5 mars 2014)',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Sanctions défaut RC Pro obligatoire : amende administrative jusqu'à 7 500 € (DGCCRF) + interdiction d'exercer immédiate + responsabilité personnelle illimitée.",
        },
      },
      {
        h2: '3. Combien ça coûte ? Fourchettes 2026',
        paragraphs: [
          'Tarifs INDICATIFS observés sur ~500 dossiers Vivos 2024-2025. Le prix réel dépend de votre profil exact (CA, antécédents, zone géographique, certifications).',
        ],
        list: {
          items: [
            '**Conseil/freelance services** : ~15 à ~35 €/mois (180-420 €/an)',
            '**Coach professionnel** : ~18 à ~35 €/mois',
            '**Esthéticienne / praticienne bien-être** : ~22 à ~40 €/mois',
            '**Agent immobilier (carte T)** : ~90 à ~140 €/mois',
            '**VTC indépendant** : ~75 à ~130 €/mois (hors assurance véhicule pro)',
            '**Kinésithérapeute libéral** : ~30 à ~50 €/mois',
            '**Médecin généraliste libéral** : ~200 à ~400 €/mois',
            '**Avocat libéral** : ~80 à ~130 €/mois',
          ],
        },
        callout: {
          tone: 'info',
          text: 'Estimation personnalisée gratuite via notre simulateur en ligne — résultat en 2 minutes sans inscription.',
        },
      },
      {
        h2: '4. 8 critères clés du contrat',
        paragraphs: ['Avant de signer, vérifier ces 8 critères :'],
        list: {
          ordered: true,
          items: [
            "**Activités assurées** : liste exacte avec code APE/NAF. Une activité non listée n'est pas couverte.",
            '**Plafond par sinistre + par année** : minimum 500 k€ pour la plupart des métiers, 1 M€+ pour B2B exigeant.',
            "**Zone géographique** : France métro, DOM-TOM, UE, monde. Vérifier si vous travaillez à l'étranger.",
            '**Franchise** : montant restant à charge par sinistre (typiquement 200-1 000 €).',
            '**Garantie subséquente** : couvre les sinistres déclarés après résiliation, pour faits antérieurs.',
            "**Défense recours** : frais d'avocat pris en charge (plafond 5-20 k€).",
            "**Période de carence** : délai entre souscription et prise d'effet (0 à 30 jours).",
            '**Exclusions** : faute intentionnelle, défaut conformité — lire attentivement les CGV.',
          ],
        },
      },
      {
        h2: '5. Démarches en 4 étapes',
        list: {
          ordered: true,
          items: [
            '**Identifier votre profil de risque** : code APE/NAF, CA prévisionnel, zone géographique, antécédents.',
            '**Demander des devis multi-assureurs** via un courtier ORIAS (8-12 assureurs interrogés en 4 h).',
            '**Comparer les contrats** : plafonds, exclusions, garanties subséquentes, prix.',
            '**Souscrire** par signature électronique qualifiée eIDAS — attestation émise sous 4 h ouvrées.',
          ],
        },
      },
      {
        h2: '6. Erreurs fréquentes à éviter',
        list: {
          items: [
            'Sous-estimer le plafond pour économiser sur la prime',
            "Ne pas déclarer toutes les activités (la non-déclarée n'est pas couverte)",
            "Reconduire tacitement chaque année sans renégocier (15-30 % d'économie possible)",
            'Choisir un assureur opaque sans vérifier Pappers (>70/100) et agrément ACPR',
            'Confondre RC Pro et décennale (2 garanties distinctes pour le BTP)',
          ],
        },
      },
      {
        h2: '7. À retenir',
        list: {
          items: [
            'RC Pro obligatoire pour 15 métiers, fortement recommandée pour les autres',
            'Plafond minimum 500 k€, idéalement 5× la valeur du plus gros contrat client',
            'Comparer 3-5 assureurs via courtier ORIAS gratuit (rémunération par commission assureur)',
            'Renégocier tous les 2-3 ans pour maintenir tarif optimal',
            'Toujours vérifier la solidité financière (Pappers >70, agrément ACPR, rating A- minimum)',
          ],
        },
      },
    ],
  },

  'check-list-decennale-btp-2026': {
    slug: 'check-list-decennale-btp-2026',
    title: 'Check-list décennale BTP — avant souscription 2026',
    description:
      "Liste de vérification complète pour artisans BTP avant souscription d'une décennale : 12 points de contrôle, mentions obligatoires de l'attestation, démarches, sanctions en cas de défaut.",
    category: 'btp',
    icon: 'Hammer',
    readTime: '7 min',
    updatedAt: '2026-05-14',
    audience: ['Artisan BTP', 'Maçon', 'Couvreur', 'Plombier', 'Électricien', 'Multi-métiers'],
    sections: [
      {
        h2: 'Pourquoi cette check-list ?',
        paragraphs: [
          "La décennale BTP est OBLIGATOIRE depuis la Loi Spinetta du 4 janvier 1978 (codifiée art. L. 241-1 du Code des assurances). Le défaut de souscription expose à 75 000 € d'amende + 6 mois de prison + interdiction d'exercer (art. L. 243-3).",
          'Cette check-list couvre les 12 points à vérifier AVANT de signer votre contrat décennale, pour éviter les pièges les plus fréquents constatés en pratique.',
        ],
      },
      {
        h2: '1. Vos activités sont-elles toutes déclarées ?',
        paragraphs: [
          "Vérifiez que chaque métier que vous exercez (même occasionnellement) est listé dans le contrat. Un maçon qui pose aussi du carrelage doit déclarer les 2 activités. Sans déclaration, l'activité n'est PAS couverte.",
        ],
      },
      {
        h2: '2. Quel est le plafond par sinistre + par année ?',
        paragraphs: [
          'Minimum légal : 500 k€ par sinistre + 1 M€ par année. Pour chantiers importants ou multi-métiers, viser 800 k€-1,5 M€.',
        ],
      },
      {
        h2: '3. Quelle est la zone géographique de couverture ?',
        paragraphs: [
          'France métropolitaine, DOM-TOM, ou Europe. Vérifiez avant tout chantier hors zone.',
        ],
      },
      {
        h2: '4. Quelle est la franchise par sinistre ?',
        paragraphs: [
          'Typiquement 500-2 000 €. Plus la franchise est élevée, plus la prime est basse, mais plus votre reste à charge augmente.',
        ],
      },
      {
        h2: '5. La sous-traitance est-elle couverte ?',
        paragraphs: [
          "Si vous sous-traitez : chaque sous-traitant doit avoir SA propre décennale. Le donneur d'ordre n'est PAS couvert pour les travaux du sous-traitant. Demandez l'attestation du sous-traitant AVANT le chantier.",
        ],
      },
      {
        h2: "6. La période de carence (délai prise d'effet)",
        paragraphs: [
          'Pour une 1ʳᵉ souscription : 5 à 30 jours typiques entre signature et couverture effective. Pour un renouvellement chez le même assureur : généralement 0 jour.',
        ],
      },
      {
        h2: '7. Attestation : 11 mentions obligatoires (Arrêté 5 janvier 2016)',
        list: {
          ordered: true,
          items: [
            "Nom et adresse de l'assureur",
            'Numéro de contrat / police',
            'Période de validité (début + fin)',
            'Zone géographique couverte',
            'Activités garanties (listées précisément)',
            'Plafond par sinistre + par année',
            'Franchise applicable',
            "Nom de l'assuré + SIRET",
            'Mention « Loi Spinetta — art. L. 241-1 C. assur. »',
            'Date de souscription',
            'Mention du courtier ORIAS avec n° cliquable (arrêté du 6 décembre 2022)',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Une attestation sans l'une de ces 11 mentions peut être contestée par le client ou rejetée par la DGCCRF en cas de contrôle.",
        },
      },
      {
        h2: '8. La mention décennale sur devis et factures',
        paragraphs: [
          "Depuis 2024 (Arrêté du 6 décembre 2022), tout devis et facture BTP doit comporter le nom de l'assureur, le n° de contrat, la période et la zone géographique de la décennale. Mention cliquable du n° ORIAS du courtier obligatoire sur les supports numériques.",
        ],
      },
      {
        h2: "9. Vérifier la solidité financière de l'assureur",
        list: {
          items: [
            'Score Pappers > 70/100 (santé financière)',
            'Agrément ACPR valide (vérifiable sur acpr.banque-france.fr)',
            "Rating S&P / Moody's >= A- (Solvency II)",
            'Présent depuis > 5 ans pour la décennale (visibilité 10 ans nécessaire)',
          ],
        },
      },
      {
        h2: '10. Le courtier ORIAS — vérification obligatoire',
        paragraphs: [
          'Tout courtier doit être immatriculé ORIAS (registre public). Vérifier sur orias.fr avec le numéro à 8 chiffres. Catégorie obligatoire : « b » (courtier en assurance).',
        ],
      },
      {
        h2: '11. Sanctions en cas de défaut de décennale',
        list: {
          items: [
            "**75 000 € d'amende** (art. L. 243-3 C. assur.)",
            "**6 mois de prison** + interdiction d'exercer définitive en cas de récidive",
            '**Responsabilité personnelle illimitée** sur 10 ans après réception (art. 1792 C. civ.)',
            '**Patrimoine personnel saisissable** pour un auto-entrepreneur ou EI sans patrimoine séparé',
            'Mauvaise réputation : signalement DGCCRF possible',
          ],
        },
      },
      {
        h2: '12. Process de souscription rapide',
        list: {
          ordered: true,
          items: [
            'Préparer Kbis ou avis SIRENE (< 3 mois)',
            'Lister activités exactes avec codes APE/NAF',
            'Recenser antécédents sinistres 5 dernières années',
            'Demander devis multi-assureurs via courtier ORIAS',
            'Comparer plafonds, franchises, exclusions',
            'Signer électroniquement (eIDAS qualifiée)',
            'Recevoir attestation sous 4 h ouvrées',
          ],
        },
      },
    ],
  },

  'modele-lettre-resiliation-loi-hamon-2026': {
    slug: 'modele-lettre-resiliation-loi-hamon-2026',
    title: 'Modèle lettre résiliation Loi Hamon 2026 — assurance pro',
    description:
      "Modèle de lettre de résiliation Loi Hamon (art. L. 113-15-2 C. assur.) prêt à utiliser pour résilier votre assurance pro après 1 an. Mentions obligatoires, modalités d'envoi, FAQ.",
    category: 'reglementation',
    icon: 'Scale',
    readTime: '5 min',
    updatedAt: '2026-05-14',
    audience: ['Tous professionnels', 'Auto-entrepreneurs', 'Sociétés'],
    sections: [
      {
        h2: 'Cadre légal Loi Hamon (17 mars 2014)',
        paragraphs: [
          "Depuis la Loi Hamon du 17 mars 2014 (art. L. 113-15-2 du Code des assurances), tout assuré peut résilier son contrat d'assurance professionnelle à tout moment APRÈS 12 mois d'engagement, sans frais ni justification.",
          "La résiliation prend effet 1 mois après réception de la lettre par l'assureur. Vous récupérez au prorata les primes payées d'avance.",
        ],
      },
      {
        h2: 'Modèle de lettre prêt à utiliser',
        paragraphs: [
          'Copiez ce modèle, remplacez les [crochets] par vos informations, signez, et envoyez en LRAR (Lettre Recommandée avec Accusé de Réception).',
        ],
        callout: {
          tone: 'info',
          text: 'Le bloc de texte ci-dessous est conçu pour être copié dans un éditeur (Word, Google Docs) puis imprimé ou exporté en PDF.',
        },
      },
      {
        h2: 'TEMPLATE',
        paragraphs: [
          '[Vos nom et prénom OU Raison sociale]',
          '[Adresse complète]',
          '[Code postal + Ville]',
          '[Email] · [Téléphone]',
          '[N° SIRET si professionnel]',
          ' ',
          "[Nom de l'Assureur]",
          "[Adresse de l'Assureur — service Résiliations]",
          '[Code postal + Ville]',
          ' ',
          'À [Votre ville], le [Date]',
          ' ',
          "**Objet** : Résiliation du contrat d'assurance n° [numéro de contrat] — Loi Hamon (art. L. 113-15-2 C. assur.)",
          'Envoi en LRAR avec accusé de réception',
          ' ',
          'Madame, Monsieur,',
          ' ',
          "Conformément à l'article L. 113-15-2 du Code des assurances (Loi Hamon du 17 mars 2014), je vous notifie ma volonté de résilier le contrat d'assurance professionnelle référencé en objet, souscrit le [date de souscription], dont je suis titulaire.",
          ' ',
          'Ce contrat ayant été souscrit il y a plus de 12 mois, je suis fondé à demander sa résiliation à tout moment, sans frais ni indemnité.',
          ' ',
          "La résiliation prendra effet 1 mois après la réception de la présente lettre par vos services, soit le [date prévisionnelle = aujourd'hui + 1 mois].",
          ' ',
          "Je vous prie de bien vouloir m'adresser :",
          "1. Un avis de résiliation confirmant la date d'effet définitive ;",
          '2. Le décompte des primes à rembourser au prorata temporis ;',
          '3. Le remboursement par virement sur le compte communiqué lors de la souscription.',
          ' ',
          'En cas de question, je reste à votre disposition par email ou téléphone aux coordonnées indiquées en en-tête.',
          ' ',
          "Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
          ' ',
          '[Signature manuscrite]',
          '[Nom + prénom]',
          ' ',
          "Pièces jointes : copie de la pièce d'identité, copie du contrat (optionnel)",
        ],
      },
      {
        h2: "Modalités d'envoi",
        list: {
          items: [
            "**LRAR** : Lettre Recommandée avec Accusé de Réception (~7 € à la poste). C'est la méthode classique, à privilégier.",
            '**Recommandé électronique qualifié (eIDAS)** : valeur juridique identique, instantané. Services : AR24, Maileva, Lettre Recommandée Numérique. ~4 €.',
            "**Email avec accusé de réception** : valable depuis Loi Confiance 2020 SI l'assureur l'autorise dans les CGV. Vérifier au cas par cas.",
            '**À éviter** : email simple sans accusé — pas de preuve en cas de litige.',
          ],
        },
      },
      {
        h2: 'Délai et effet',
        list: {
          items: [
            "**Date de réception** : la résiliation court à partir de la réception de votre lettre par l'assureur (date du tampon AR).",
            '**Délai 1 mois** : la résiliation prend effet 1 mois après cette réception, pas avant.',
            '**Couverture maintenue** : pendant ce mois, vous restez couvert et payez normalement.',
            "**Remboursement prorata** : si vous aviez payé d'avance plusieurs mois, l'assureur rembourse au prorata sous 30 jours.",
          ],
        },
      },
      {
        h2: 'Conseils pratiques',
        list: {
          items: [
            "**Souscrivez votre nouveau contrat AVANT d'envoyer la résiliation** pour éviter toute rupture de couverture.",
            '**Coordonnez les dates** : nouveau contrat effet J+30, résiliation envoyée à J. Chevauchement 5-10 jours pour sécurité.',
            "**Conservez l'AR** : précieusement, c'est votre preuve en cas de contestation.",
            "**Suivi** : si vous ne recevez pas d'avis de résiliation dans les 30 jours, relancez l'assureur par email.",
          ],
        },
        callout: {
          tone: 'success',
          text: 'Notre cabinet ORIAS gère gratuitement la résiliation + bascule pour ses clients. Économie moyenne constatée : 15-30 % sur la prime annuelle.',
        },
      },
    ],
  },

  'guide-madelin-tns-optimisation-2026': {
    slug: 'guide-madelin-tns-optimisation-2026',
    title: 'Guide Loi Madelin TNS 2026 — optimisation fiscale',
    description:
      "Guide complet de la Loi Madelin (art. 154 bis CGI) pour TNS : 3 plafonds de déduction (santé, retraite, prévoyance), conditions d'éligibilité, check-list mise en œuvre, économies fiscales.",
    category: 'fiscalite',
    icon: 'Calculator',
    readTime: '8 min',
    updatedAt: '2026-05-14',
    audience: [
      'Auto-entrepreneur',
      'EI régime réel',
      'EURL gérant majoritaire',
      'Professions libérales',
    ],
    sections: [
      {
        h2: '1. La Loi Madelin en 1 minute',
        paragraphs: [
          'La Loi Madelin du 11 février 1994 (art. 154 bis CGI) permet aux Travailleurs Non Salariés (TNS) de déduire de leur bénéfice imposable les cotisations versées au titre de leur mutuelle santé, leur prévoyance, et leur retraite complémentaire.',
          "C'est l'un des leviers d'optimisation fiscale les plus rentables pour un TNS : économie d'impôt directe sur des dépenses utiles (santé, retraite).",
        ],
      },
      {
        h2: '2. Qui est éligible ?',
        list: {
          items: [
            '**Auto-entrepreneur** au régime réel (PAS au régime micro-fiscal forfaitaire)',
            '**Entreprise individuelle (EI)** au régime réel BIC ou BNC',
            '**EURL** dont le gérant est majoritaire (TNS)',
            '**SARL** dont le gérant est majoritaire (TNS)',
            '**Professions libérales** en BNC réel',
            '❌ NON éligible : SASU, SAS avec dirigeant assimilé-salarié (article 83 à la place)',
            '❌ NON éligible : micro-entrepreneur au régime micro-fiscal forfaitaire (abattement inclut déjà tout)',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Pour passer du régime micro au régime réel : option à exercer auprès de l'administration fiscale avant le 1ᵉʳ février de l'année. Analyse coût/bénéfice à faire avec votre expert-comptable.",
        },
      },
      {
        h2: '3. 3 plafonds de déduction 2026',
        paragraphs: [
          'Le PASS 2026 (Plafond Annuel de la Sécurité Sociale) est de 46 368 €. Les plafonds Madelin sont calculés en pourcentage du PASS.',
        ],
        list: {
          items: [
            '**Santé** : 3,75 % du PASS + 7 % du PASS dans la limite de 3 % de 8 PASS, soit ~3 850 €/an maximum pour un TNS célibataire.',
            '**Retraite (PER ou Madelin retraite)** : 10 % du PASS + 25 % de la fraction de bénéfice supérieure au PASS, plafonné à 8 PASS soit ~87 000 €/an maximum.',
            '**Prévoyance (décès, invalidité, incapacité)** : 1,875 % du PASS + 3,75 % du bénéfice imposable, plafonné à 8 PASS soit ~7 500 €/an typiquement.',
          ],
        },
        callout: {
          tone: 'info',
          text: "Les 3 plafonds sont CUMULABLES. Un TNS peut donc déduire jusqu'à environ 100 000 €/an cumulé (santé + retraite + prévoyance) selon son revenu.",
        },
      },
      {
        h2: '4. Économies fiscales concrètes',
        paragraphs: [
          "Exemple : artisan TNS au régime réel, bénéfice imposable 50 000 €, TMI (tranche marginale d'imposition) 30 %.",
        ],
        list: {
          items: [
            'Cotisation mutuelle Madelin : 80 €/mois = 960 €/an déductibles → économie IR ~288 €/an + économie URSSAF ~250 €/an = 538 €/an net (coût réel mutuelle 422 €/an)',
            'Cotisation PER Madelin retraite : 200 €/mois = 2 400 €/an déductibles → économie IR ~720 €/an + URSSAF ~624 €/an = 1 344 €/an (coût réel 1 056 €/an)',
            'Total déductions : 3 360 €/an → économies totales ~1 882 €/an (~56 % du coût brut)',
          ],
        },
      },
      {
        h2: '5. Check-list de mise en œuvre',
        list: {
          ordered: true,
          items: [
            "**Vérifier l'éligibilité au régime TNS** (artisan, commerçant, profession libérale non-salariée).",
            "**Souscrire un contrat labellisé Madelin** : vérifier la mention « contrat Madelin loi 94-126 » sur l'IPID.",
            "**Cotiser régulièrement** : versements mensuels ou trimestriels obligatoires. Un arrêt = perte du bénéfice fiscal sur l'année.",
            '**Conserver les justificatifs 6 ans** : attestations annuelles, contrats, échéanciers.',
            '**Déclarer sur la 2042 C-PRO** : ligne dédiée selon le type (santé/prévoyance/retraite).',
            '**Respecter les plafonds** : santé ~3 850 €/an, retraite ~87 000 €/an, prévoyance ~7 500 €/an.',
          ],
        },
      },
      {
        h2: '6. Erreurs fréquentes',
        list: {
          items: [
            "**Souscrire un contrat non-labellisé Madelin** : la déduction est refusée par l'administration",
            "**Oublier la déclaration sur la 2042 C-PRO** : la déduction n'est pas appliquée automatiquement",
            "**Dépasser les plafonds** : la fraction excédentaire n'est pas déductible (reprise possible par contrôle fiscal)",
            "**Arrêter les cotisations en cours d'année** : risque de remise en cause de la déductibilité",
            '**Confondre PER individuel et PER Madelin** : seul le PER Madelin (article 154 bis) bénéficie de la déduction TNS',
          ],
        },
      },
      {
        h2: '7. À retenir',
        list: {
          items: [
            'Économies fiscales 30-50 % du coût brut pour un TMI 30 %',
            'Régime micro = pas Madelin. Régime réel = oui Madelin.',
            'Cumul des 3 plafonds santé + retraite + prévoyance possible',
            'Justificatifs à conserver 6 ans (durée de prescription contrôle fiscal)',
            'Audit annuel avec expert-comptable ou courtier pour optimiser',
          ],
        },
      },
    ],
  },
}

export function getAllRessources(): Ressource[] {
  return Object.values(RESSOURCES)
}

export function getRessource(slug: string): Ressource | undefined {
  return RESSOURCES[slug]
}

export function getRessourceSlugs(): string[] {
  return Object.keys(RESSOURCES)
}
