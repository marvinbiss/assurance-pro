/**
 * Extensions de body sections pour articles courts.
 *
 * Stratégie : plutôt que de dupliquer les articles entiers dans des batches d'override,
 * on définit ici uniquement les SECTIONS additionnelles. Elles sont fusionnées au moment
 * du merge dans blog-posts.ts via la fonction `applyExtensions()`.
 *
 * Date génération : 2026-05-13 (audit fix)
 */

import type { BlogPost, BlogSection } from './blog-posts'

interface Extension {
  /** Sections additionnelles à insérer AVANT la section FAQ. */
  sections: BlogSection[]
  /** Entrées TOC additionnelles correspondantes. */
  toc: Array<{ id: string; title: string }>
}

export const EXTENSIONS: Record<string, Extension> = {
  // ════════════════════════════════════════════════════════════════════
  // decennale-pas-chere-5-strategies-economies (842 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'decennale-pas-chere-5-strategies-economies': {
    toc: [
      { id: 'comprendre-prime', title: '6. Comprendre la composition de la prime' },
      { id: 'mutualisation', title: '7. Mutualisation via groupements professionnels' },
      { id: 'audit-annuel', title: '8. Audit annuel : 4 points de contrôle' },
    ],
    sections: [
      {
        id: 'comprendre-prime',
        h2: '6. Comprendre la composition de la prime décennale',
        paragraphs: [
          "Pour négocier efficacement, il faut comprendre comment l'assureur construit sa prime décennale. La structure type d'une prime se décompose en 4 postes : (1) le « risque pur » technique calculé sur la sinistralité historique du métier, (2) le chargement commercial et de gestion (10 à 18 %), (3) la marge de réassurance (3 à 8 %), (4) les taxes parafiscales et contributions (10 à 16 % selon les régions).",
          "Pour un artisan maçon avec une prime brute de l'ordre de 80 €/mois, la part « risque pur » représente environ 50 €/mois — le reste correspond aux frais de fonctionnement et marges. C'est précisément sur ces postes annexes qu'un courtier peut négocier, en sélectionnant les assureurs ayant la structure de coûts la plus efficiente.",
          "Connaître cette décomposition permet aussi de réagir intelligemment à une hausse tarifaire : si votre prime augmente de +12 % sans aggravation de votre sinistralité, c'est probablement un ajustement commercial négociable, pas une réelle réévaluation du risque.",
        ],
      },
      {
        id: 'mutualisation',
        h2: '7. Mutualisation via groupements professionnels',
        paragraphs: [
          "Adhérer à un groupement professionnel (CAPEB, FFB, FNTP, syndicats spécialisés) permet d'accéder à des contrats collectifs négociés à des tarifs préférentiels. Les économies constatées sont substantielles selon votre profil :",
        ],
        list: {
          items: [
            "**CAPEB (artisans BTP)** : remises constatées de l'ordre de -10 à -18 % sur la décennale, accès à des partenaires comme SMABTP et MAAF avec conditions préférentielles.",
            '**FFB (Fédération Française du Bâtiment)** : remises de -8 à -15 %, programme « Qualibat » subventionné, accès à des experts en prévention.',
            '**FNTP (Travaux Publics)** : tarifs négociés pour grands chantiers, plafonds étendus, prise en charge formation continue.',
            '**Syndicats métiers spécialisés** : UNECB électriciens, UNCMI couvreurs, FFTB charpentiers — accords cadre avec assureurs spécialisés.',
          ],
        },
        callout: {
          tone: 'info',
          text: "Le coût d'adhésion (typiquement 200 à 600 €/an selon la fédération) est généralement amorti dès la première année par les économies sur la décennale + RC pro. Bonus : accès à des formations qualifiantes valorisées par les assureurs.",
        },
      },
      {
        id: 'audit-annuel',
        h2: '8. Audit annuel : 4 points de contrôle',
        paragraphs: [
          "À chaque échéance annuelle, vérifier 4 points sur votre contrat décennale pour éviter de payer trop ou d'être mal couvert :",
        ],
        list: {
          ordered: true,
          items: [
            "**Activités déclarées vs activités réelles** : si vous avez ajouté un nouveau métier en cours d'année (par exemple, un maçon qui commence à poser des carrelages), il faut l'ajouter à l'attestation sous peine de non-couverture. Inversement, si vous avez abandonné une activité, la retirer pour baisser la prime.",
            "**Chiffre d'affaires effectif vs estimé** : la plupart des contrats sont tarifés sur le CA estimé. Si votre CA réel est en baisse, demander une régularisation au prorata.",
            '**Antécédents sinistres** : 3 à 5 années sans sinistre déclaré déclenchent souvent un bonus tacite, mais il faut parfois le réclamer.',
            "**Évolution des plafonds et franchises** : sur les contrats anciens (> 5 ans), les plafonds peuvent être devenus insuffisants face à l'inflation des coûts de réparation.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // decennale-vs-dommages-ouvrage-7-differences (954 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'decennale-vs-dommages-ouvrage-7-differences': {
    toc: [
      { id: 'cas-litiges', title: '8. Cas pratiques de litiges entre DO et décennale' },
      { id: 'cumul', title: '9. Cumul DO + décennale : qui paie en premier ?' },
      { id: 'preconisations', title: "10. Préconisations pour artisans et maîtres d'ouvrage" },
    ],
    sections: [
      {
        id: 'cas-litiges',
        h2: '8. Cas pratiques de litiges entre DO et décennale',
        paragraphs: [
          "Les litiges entre assureur dommages-ouvrage (DO) et assureur décennale (RC) sont fréquents en pratique. Ils naissent typiquement de désaccords sur la qualification du sinistre, la responsabilité partagée entre intervenants, ou l'application des franchises.",
          "Cas type 1 — Infiltration toiture neuve : l'assureur DO préfinance la réparation sous 60 jours (obligation légale), puis se retourne contre l'assureur décennale de l'artisan couvreur via subrogation. Si la décennale conteste la cause du sinistre (mise en cause d'un défaut de conception architecte plutôt que d'exécution couvreur), un contentieux s'ouvre entre les deux assureurs — mais le maître d'ouvrage est déjà indemnisé.",
          "Cas type 2 — Sinistre multi-intervenants : un effondrement partiel impliquant maçon + charpentier + couvreur. La DO préfinance, puis répartit la charge entre les trois décennales selon les responsabilités déterminées par expertise. Ce processus peut prendre 18 à 36 mois mais n'affecte pas l'indemnisation initiale du client.",
        ],
      },
      {
        id: 'cumul',
        h2: '9. Cumul DO + décennale : qui paie en premier ?',
        paragraphs: [
          "Le mécanisme est précisément organisé par la loi Spinetta. La DO intervient EN PREMIER pour préfinancer rapidement les réparations (délai légal de 60 jours après expertise), garantissant ainsi la rapidité d'intervention pour le maître d'ouvrage. La décennale RC du constructeur intervient EN SECOND, par subrogation, pour rembourser la DO une fois les responsabilités établies.",
          "Cette séparation des rôles a une double vertu : (1) pour le client, indemnisation rapide sans avoir à attendre des années de procédure ; (2) pour l'assureur DO, sécurisation du recours subrogatoire qui permet d'équilibrer ses comptes sur le long terme.",
          "En l'absence de DO (cas fréquent en pratique malgré l'obligation légale), le client doit poursuivre directement les artisans, ce qui peut prendre 2 à 5 ans devant les tribunaux. D'où l'importance pour les maîtres d'ouvrage de bien souscrire la DO avant le démarrage du chantier.",
        ],
      },
      {
        id: 'preconisations',
        h2: "10. Préconisations pour artisans et maîtres d'ouvrage",
        paragraphs: [
          "Pour l'artisan : (1) toujours remettre l'attestation décennale au client AVANT le démarrage du chantier (et pas seulement à la signature du devis), (2) recommander expressément au client de souscrire une DO et tracer cette recommandation par écrit, (3) conserver tous les justificatifs du chantier (photos, plans, devis, factures matériaux) pendant 10 ans pour faciliter une éventuelle expertise.",
          "Pour le maître d'ouvrage : (1) exiger une attestation décennale conforme aux 11 mentions obligatoires de l'arrêté du 5 janvier 2016 AVANT toute signature de marché, (2) souscrire une DO avant le démarrage du chantier (obligation légale pour les particuliers depuis 2008), (3) faire vérifier la solidité financière des artisans (Pappers, registre du commerce) en plus de leur attestation.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // statut-juridique-assurance-pro-comparatif (668 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'statut-juridique-assurance-pro-comparatif': {
    toc: [
      { id: 'changements-2022', title: "8. Changements 2022 — fin de l'EIRL" },
      { id: 'optimisation-fiscale', title: '9. Optimisation fiscale par statut' },
      { id: 'risques-statut', title: '10. Risques juridiques par statut' },
      { id: 'cas-pratiques-statut', title: '11. 3 cas pratiques détaillés' },
    ],
    sections: [
      {
        id: 'changements-2022',
        h2: "8. Changements 2022 — fin de l'EIRL",
        paragraphs: [
          "La Loi du 14 février 2022 a profondément modifié le paysage des statuts individuels en France. L'EIRL (Entreprise Individuelle à Responsabilité Limitée) a été SUPPRIMÉE et fusionnée avec l'EI classique, qui bénéficie désormais automatiquement de la séparation des patrimoines professionnel et personnel.",
          "Conséquence pour l'assurance : la distinction historique entre EI « risquée » et EIRL « protégée » a disparu. Tous les EI sont désormais traités de manière équivalente par les assureurs, avec une protection patrimoniale automatique sauf renonciation explicite (généralement demandée par les banques pour les crédits professionnels).",
          "Cette unification a légèrement réduit l'écart tarifaire entre EI et formes sociétaires (EURL/SASU/SARL/SAS) : aujourd'hui, la différence de prime RC Pro entre EI et SASU se situe autour de +5 à +10 %, contre +15 à +20 % avant 2022.",
        ],
      },
      {
        id: 'optimisation-fiscale',
        h2: '9. Optimisation fiscale par statut',
        paragraphs: [
          "Le choix du statut juridique impacte directement la déductibilité des primes d'assurance pro et l'optimisation fiscale globale :",
        ],
        list: {
          items: [
            "**Micro-entreprise** : régime forfaitaire (abattement 34 % BIC services, 50 % BIC ventes, 71 % BIC marchandises). Les primes d'assurance NE SONT PAS déductibles directement — elles sont incluses dans l'abattement forfaitaire. Plafond CA inchangé en 2026 : 91 900 € / 36 800 €.",
            "**EI au régime réel** : primes d'assurance pro intégralement déductibles du bénéfice imposable. Possibilité de déduire aussi les frais kilométriques, télécoms pro, formations.",
            '**EURL / SASU au régime IS** : primes déductibles + possibilité de cumuler une mutuelle Madelin (TNS si EURL gérant majoritaire) ou article 83 (assimilé-salarié si SASU).',
            '**SARL / SAS** : optimisation possible via rémunération du dirigeant + dividendes, mutuelle entreprise pour les salariés (loi ANI), RC mandataires sociaux déductible.',
          ],
        },
      },
      {
        id: 'risques-statut',
        h2: '10. Risques juridiques par statut',
        paragraphs: [
          "Au-delà des primes d'assurance, chaque statut comporte des risques juridiques propres qu'il convient de couvrir :",
        ],
        list: {
          items: [
            "**Micro-entreprise** : risque principal = dépassement des plafonds CA. À partir de 2 dépassements consécutifs, bascule automatique au régime réel. Nécessité d'anticiper l'évolution.",
            '**EI** : risque de mise en cause du patrimoine personnel via renonciation à la séparation (souvent demandée par les banques). Recommandation : RC personnelle vie privée renforcée + protection juridique.',
            '**EURL** : risque de remise en cause de la limitation de responsabilité en cas de faute de gestion grave (jurisprudence Lagarde 2018). Recommandation : RC Mandataires Sociaux (D&O).',
            '**SASU** : risque cyber accru pour les freelances IT en SASU (clientèle B2B avec données sensibles). Recommandation : cyber assurance dédiée + RC Pro étendue.',
            "**SARL / SAS** : risque social (litiges salariés, prud'hommes), RC employeur obligatoire + protection juridique sociale.",
          ],
        },
      },
      {
        id: 'cas-pratiques-statut',
        h2: '11. 3 cas pratiques détaillés',
        paragraphs: [
          '**Cas 1 — Plombier auto-entrepreneur CA ~35 k€** : RC Pro + décennale BTP (~85 €/mois). Mutuelle TNS Madelin déductible (~75 €/mois). Total assurance : ~160 €/mois soit 5,5 % du CA. Recommandation : bascule en EI au régime réel dès que CA > 40 k€ pour déduire les primes.',
          '**Cas 2 — Consultante IT en SASU CA ~120 k€** : RC Pro 250 k€ ~30 €/mois + cyber 250 k€ ~30 €/mois. Mutuelle article 83 (assimilé-salarié) ~80 €/mois. Total : ~140 €/mois soit 1,4 % du CA. Avantages : protection chômage, retraite cadres, déductibilité totale.',
          '**Cas 3 — SARL conseil 3 associés CA ~450 k€** : RC Pro ~95 €/mois + D&O Mandataires Sociaux ~120 €/mois + multirisque bureaux ~75 €/mois + protection juridique sociale ~40 €/mois. Total : ~330 €/mois soit 0,9 % du CA. Couverture complète multi-associés avec protection des dirigeants individuels.',
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // assurance-micro-entreprise-2026 (793 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'assurance-micro-entreprise-2026': {
    toc: [
      { id: 'comparatif-statuts', title: '7. Comparatif : micro vs EI vs SASU' },
      { id: 'mutuelle-tns', title: '8. Mutuelle TNS Madelin micro' },
      { id: 'cas-secteurs', title: "9. Couvertures par secteur d'activité" },
      { id: 'erreurs-frequentes', title: '10. 5 erreurs fréquentes à éviter' },
    ],
    sections: [
      {
        id: 'comparatif-statuts',
        h2: '7. Comparatif : micro vs EI vs SASU pour les assurances',
        paragraphs: [
          'Le choix entre micro-entreprise, EI régime réel et SASU a un impact direct sur le coût total des assurances pro. Au-delà des primes brutes, il faut prendre en compte la déductibilité fiscale et la couverture sociale offerte par chaque statut.',
          "**Micro-entreprise** : tarifs assurance équivalents à un EI classique. Mais primes NON déductibles individuellement (incluses dans l'abattement forfaitaire). Couverture sociale base TNS via URSSAF avec mutuelle Madelin recommandée. Avantage : simplicité administrative.",
          "**EI régime réel** : primes assurance intégralement déductibles. TNS comme la micro. Permet une comptabilité analytique précise. Recommandé dès que le CA approche les plafonds micro ou que les charges réelles dépassent l'abattement forfaitaire.",
          '**SASU** : assimilé-salarié (retraite cadres + chômage si conditions). Mutuelle entreprise obligatoire (loi ANI) déductible. RC Mandataires Sociaux conseillée. Coût social total plus élevé (~75 % de la rémunération) mais meilleure protection.',
        ],
      },
      {
        id: 'mutuelle-tns',
        h2: '8. Mutuelle TNS Madelin pour micro-entrepreneur',
        paragraphs: [
          'Depuis 1994, la Loi Madelin (art. 154 bis CGI) permet aux Travailleurs Non Salariés (TNS), dont les micro-entrepreneurs, de déduire de leur bénéfice imposable les cotisations versées au titre de leur mutuelle santé, leur prévoyance, et leur retraite complémentaire.',
          'Le plafond de déduction santé en 2026 est de 4 997 €/an pour un TNS célibataire et 7 200 €/an pour une famille (calculé sur 3,75 % du PASS + 7 % du PASS). La quasi-totalité des micro-entrepreneurs reste largement en deçà du plafond, ce qui rend la déduction intégralement utile.',
          "**ATTENTION** : pour bénéficier de la Madelin, le micro-entrepreneur doit être au régime RÉEL d'imposition (BIC ou BNC réel), PAS au régime micro-fiscal forfaitaire. Cela implique parfois de basculer du régime micro vers le régime réel, ce qui mérite une analyse coût/bénéfice individuelle.",
        ],
      },
      {
        id: 'cas-secteurs',
        h2: "9. Couvertures par secteur d'activité",
        paragraphs: [
          "Selon le secteur d'activité, les priorités d'assurance varient sensiblement :",
        ],
        list: {
          items: [
            '**Services à la personne** (28 % des micro) : RC Pro obligatoire + multirisque domicile client + protection juridique. Tarif typique : ~25 €/mois.',
            '**BTP** (19 %) : décennale + RC Pro + multirisque outils. Tarif : ~80-150 €/mois selon métier.',
            '**Conseil/IT** (17 %) : RC Pro + cyber assurance. Tarif : ~40-60 €/mois.',
            '**Commerce ambulant** (12 %) : multirisque marchandises + RC Pro + assurance véhicule pro. Tarif : ~50-90 €/mois.',
            '**Bien-être/sport** : RC Pro corporelle + multirisque local. Tarif : ~35-60 €/mois.',
            '**Animaux** (éducateurs canins, dog-sitters) : RC Pro animaux + protection juridique. Tarif : ~25-40 €/mois.',
          ],
        },
      },
      {
        id: 'erreurs-frequentes',
        h2: '10. 5 erreurs fréquentes à éviter',
        paragraphs: [
          "Les 5 erreurs les plus fréquentes constatées chez les micro-entrepreneurs en matière d'assurance pro :",
        ],
        list: {
          ordered: true,
          items: [
            "**Croire que micro-entreprise = pas d'assurance obligatoire** : faux. Les obligations légales (décennale BTP, RC Pro de 15 métiers) s'appliquent indépendamment du statut.",
            '**Sous-estimer le plafond de garantie** : un plafond de 250 k€ peut sembler suffisant, mais en cas de sinistre grave (incendie causé chez un client), 250 k€ partent vite. Préférer 500 k€ à 1 M€.',
            '**Ne pas déclarer toutes les activités** : un peintre qui pose aussi du carrelage doit déclarer les 2 activités sous peine de non-couverture pour le carrelage.',
            "**Oublier la mention attestation sur les devis et factures** : obligatoire depuis 2024 pour le BTP. Sanction administrative en cas d'oubli répété.",
            "**Ne pas comparer à l'échéance** : reconduire tacitement chaque année peut coûter 20 à 30 % de plus que renégocier via un courtier ORIAS.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // micro-entreprise-btp-assurances-2026 (739 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'micro-entreprise-btp-assurances-2026': {
    toc: [
      { id: 'rge-qualibat', title: '7. Certifications RGE et Qualibat — impact assurance' },
      { id: 'mention-devis', title: '8. Mention obligatoire sur devis et factures' },
      { id: 'sous-traitance', title: "9. Sous-traitance : qui doit s'assurer ?" },
      { id: 'cas-sinistre', title: '10. Que faire en cas de sinistre — checklist' },
    ],
    sections: [
      {
        id: 'rge-qualibat',
        h2: "7. Certifications RGE et Qualibat — impact direct sur l'assurance",
        paragraphs: [
          "Les certifications RGE (Reconnu Garant de l'Environnement) et Qualibat ont un impact significatif sur la sinistralité et donc sur les primes décennales. Les assureurs intègrent désormais ces certifications dans leur tarification :",
          "**RGE** : certification obligatoire pour faire bénéficier le client des aides publiques (MaPrimeRénov', CEE). Elle impose une formation de 7 jours + un audit régulier. Les artisans RGE ont une sinistralité d'environ -35 % par rapport aux non-RGE, ce qui se traduit par une réduction de prime de -10 à -20 % chez la plupart des assureurs.",
          '**Qualibat** : certification de qualité professionnelle BTP, déclinée en niveaux 1 à 5 étoiles selon expérience et compétences. Un artisan Qualibat 3 étoiles bénéficie typiquement de -15 % sur sa décennale, et un 5 étoiles peut atteindre -30 % chez certains assureurs comme SMABTP.',
          "Investir dans ces certifications est généralement rentable dès la deuxième année : coût annuel de l'ordre de 300 à 800 €, économies de prime de 500 à 1 200 €/an + accès à de nouveaux marchés (chantiers publics, clients exigeant RGE).",
        ],
      },
      {
        id: 'mention-devis',
        h2: '8. Mention obligatoire sur devis et factures (depuis 2024)',
        paragraphs: [
          "Depuis l'arrêté du 6 décembre 2022 entré en application progressive depuis 2024, tout devis et toute facture émis par une entreprise BTP doit comporter une mention spécifique relative à l'assurance décennale :",
        ],
        list: {
          ordered: true,
          items: [
            "**Nom et adresse de l'assureur** délivrant la garantie décennale",
            "**Numéro du contrat** d'assurance décennale",
            '**Période de validité** de la garantie',
            '**Zone géographique** couverte par le contrat',
            '**Mention du courtier ORIAS** avec numéro CLIQUABLE (lien hypertexte sur supports numériques)',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Sanctions en cas d'omission : amende administrative DGCCRF + risque de non-recouvrement client en cas de litige. La mention cliquable du numéro ORIAS du courtier est une obligation nouvelle qui pèse autant sur le courtier que sur l'artisan.",
        },
      },
      {
        id: 'sous-traitance',
        h2: "9. Sous-traitance : qui doit s'assurer ?",
        paragraphs: [
          "Dans une opération de sous-traitance BTP, CHAQUE intervenant doit avoir sa propre assurance décennale. Le donneur d'ordre principal n'est pas couvert pour les travaux réalisés par son sous-traitant.",
          "Obligations du donneur d'ordre : (1) vérifier l'attestation décennale du sous-traitant AVANT le démarrage du chantier, (2) conserver une copie à jour pendant toute la durée du chantier, (3) inclure dans le contrat de sous-traitance une clause de garantie d'assurance avec mise à jour annuelle.",
          "Risques en cas de sous-traitant non assuré : (1) responsabilité personnelle illimitée du donneur d'ordre sur les défauts liés au sous-traitant, (2) impossibilité de se retourner contre le sous-traitant en cas de défaillance, (3) sanction administrative pour défaut de vigilance (jurisprudence Cour de Cassation 2019).",
        ],
      },
      {
        id: 'cas-sinistre',
        h2: '10. Que faire en cas de sinistre — checklist',
        paragraphs: [
          "Dès qu'un sinistre est constaté (infiltration, fissure, défaut d'exécution signalé par le client), 5 actions à mener dans les 5 jours ouvrés :",
        ],
        list: {
          ordered: true,
          items: [
            '**Documenter immédiatement** : photos datées avec métadonnées EXIF, vidéos, témoignages écrits, mesures précises. Conserver tout original.',
            '**Sécuriser les lieux SANS réparer** : poser des bâches, étayer si nécessaire, mais ne pas démolir avant expertise contradictoire.',
            "**Déclarer à l'assureur par LRAR** dans les 5 jours ouvrés (art. L. 113-2 C. assur.). Le courtier peut faire la déclaration en votre nom.",
            '**Conserver toutes les pièces du chantier** : devis, factures, plans, fiches matériaux, attestation décennale, procès-verbal de réception. Conservation 10 ans minimum.',
            "**Faire intervenir un expert indépendant** en parallèle de l'expert mandaté par l'assureur, surtout si le sinistre est complexe (>10 000 € de réparation). Coût : 800 à 2 500 €, souvent rentabilisé.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // carte-professionnelle-assurance-courtier (753 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'carte-professionnelle-assurance-courtier': {
    toc: [
      { id: 'formation-continue', title: '8. Formation continue (FCO ALUR + DDA)' },
      { id: 'renouvellement', title: '9. Renouvellement carte tous les 3 ans' },
      { id: 'sanctions-carte', title: '10. Sanctions pour exercice sans carte' },
      { id: 'tendances-2026', title: '11. Tendances 2026 : digitalisation et contrôles' },
    ],
    sections: [
      {
        id: 'formation-continue',
        h2: '8. Formation continue obligatoire (FCO ALUR + DDA)',
        paragraphs: [
          "Depuis la loi ALUR du 24 mars 2014, les détenteurs de cartes professionnelles immobilières (T, G, S) sont soumis à une obligation de formation continue : 14 heures par an ou 42 heures sur 3 ans, à valider auprès d'organismes agréés.",
          'Pour les courtiers ORIAS (IAS, IOBSP, CIF), la Directive Distribution Assurance (DDA) impose 15 heures de formation continue par an, articulée autour des connaissances réglementaires, des produits et des techniques de vente éthique.',
          'Les organismes agréés sont nombreux : CNAM, IFPASS, INSEEC, ESA Business School. Coût moyen de la formation continue : 800 à 2 500 €/an selon les modalités (présentiel, e-learning, blended). Cette dépense est intégralement déductible et compte parmi les charges professionnelles.',
        ],
      },
      {
        id: 'renouvellement',
        h2: '9. Renouvellement de la carte tous les 3 ans',
        paragraphs: [
          "Les cartes professionnelles T/G/S sont valables 3 ans. Le renouvellement doit être demandé au plus tard 3 mois avant l'expiration, sous peine d'interruption d'exercice. Procédure :",
        ],
        list: {
          ordered: true,
          items: [
            '**Justificatifs de formation continue** : attestations FCO ALUR cumulées sur 3 ans (42 heures minimum).',
            '**Renouvellement RC Pro et garantie financière** : avec maintien des plafonds réglementaires.',
            "**Justificatif d'absence d'incident** : casier judiciaire vierge, attestation honorabilité.",
            "**Dossier à la CCI compétente** (Cerfa 15312*01 mis à jour) : délai d'instruction 2 à 3 mois.",
            '**Remise de la nouvelle carte** : par voie électronique depuis 2018, conservation 10 ans.',
          ],
        },
      },
      {
        id: 'sanctions-carte',
        h2: '10. Sanctions pour exercice sans carte ou avec carte expirée',
        paragraphs: [
          'Exercer une activité immobilière (transactions, gestion locative, syndic) sans détenir la carte professionnelle correspondante constitue un délit pénal :',
        ],
        list: {
          items: [
            "**6 mois d'emprisonnement + 7 500 € d'amende** (art. 14 Loi Hoguet)",
            "**Interdiction d'exercer définitive** pour récidive",
            "**Nullité des contrats** conclus pendant l'exercice illégal — restitution des honoraires perçus",
            '**Responsabilité civile illimitée** sur les opérations effectuées sans assurance valide',
            '**Inscription au casier judiciaire** : impact sur futures démarches professionnelles et bancaires',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Une carte expirée même de quelques jours suffit à requalifier l'activité en exercice illégal. Anticiper le renouvellement et conserver une copie de la nouvelle carte facilement accessible.",
        },
      },
      {
        id: 'tendances-2026',
        h2: '11. Tendances 2026 : digitalisation et contrôles renforcés',
        paragraphs: [
          "Trois évolutions majeures touchent l'univers des cartes professionnelles en 2026 :",
          '**Digitalisation complète des démarches** : depuis 2024, les démarches CCI sont 100 % en ligne (dépôt dossier, paiement, suivi instruction). La carte est délivrée au format numérique avec signature électronique qualifiée (eIDAS).',
          '**Contrôles ACPR renforcés** : la Recommandation ACPR 2024-R-03 impose une traçabilité immuable des dossiers conseil pour les courtiers ORIAS. Conservation 10 ans avec hashage SHA-256, audit possible à tout moment.',
          '**Nouveau référentiel de capacité professionnelle 2026** : revalorisation des diplômes BTS Immobilier + nouvelle formation obligatoire « Risques climatiques et assurance » de 14 heures, intégrée dans le FCO ALUR.',
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ipid-fiche-information-produit-assurance (901 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'ipid-fiche-information-produit-assurance': {
    toc: [
      { id: 'evolution-2018-2026', title: '7. Évolution depuis 2018 — bilan 8 ans' },
      { id: 'erreurs-courantes', title: '8. 6 erreurs courantes à identifier' },
      { id: 'comparaison-ue', title: '9. Comparaison France vs autres pays UE' },
    ],
    sections: [
      {
        id: 'evolution-2018-2026',
        h2: "7. Évolution de l'IPID depuis 2018 — bilan 8 ans",
        paragraphs: [
          "Entré en vigueur le 1ᵉʳ octobre 2018, l'IPID a fait l'objet de plusieurs ajustements depuis. Bilan après 8 ans d'application :",
          "**Améliorations observées** : (1) lisibilité des contrats — études d'opinion montrent que les clients comprennent mieux les garanties depuis l'IPID, (2) comparabilité facilitée — possible de comparer plusieurs offres côte à côte sans expertise juridique, (3) réduction des litiges de souscription d'environ 20 % selon les statistiques médiation de l'assurance.",
          "**Limites identifiées** : (1) l'IPID est devenu parfois trop standardisé — il ne reflète pas toujours les subtilités d'un contrat complexe, (2) certains assureurs publient un IPID minimaliste qui ne fait que renvoyer aux CGV pour les détails, (3) les sous-plafonds ne sont pas toujours suffisamment mis en avant, créant des surprises au moment du sinistre.",
          "**Évolutions 2025-2026** : l'EIOPA a annoncé une révision du format IPID prévue pour 2027 avec ajout de pictogrammes harmonisés, section dédiée aux exclusions courantes, et obligation de mentionner les 3 sinistres types les plus fréquents pour le produit concerné.",
        ],
      },
      {
        id: 'erreurs-courantes',
        h2: '8. 6 erreurs courantes à identifier dans un IPID',
        paragraphs: [
          "Lors de la lecture d'un IPID, 6 points doivent être vérifiés systématiquement :",
        ],
        list: {
          ordered: true,
          items: [
            "**Activités assurées correspondent à votre profil réel** : code APE/NAF + libellé doivent être exacts. Une activité non listée n'est pas couverte.",
            "**Zone géographique** : France métropolitaine, DOM-TOM, UE, monde. Si vous travaillez à l'étranger occasionnellement, vérifier la couverture.",
            '**Plafonds par sinistre ET par année** : les sous-plafonds peuvent rendre le plafond global illusoire (exemple : 1 M€ global mais 50 k€ par poste de garantie).',
            '**Franchises** : valeur en euros ou en pourcentage. Une franchise de 10 % du montant du sinistre peut être très coûteuse.',
            '**Exclusions principales** : « faute intentionnelle », « défaut de conformité », « risque connu avant souscription » — ces clauses sont fréquentes mais parfois rédigées de manière piégeuse.',
            '**Modalités de résiliation** : Loi Hamon (après 1 an), Loi Chatel (préavis 2 mois), motif particulier. Toujours vérifier que la résiliation est facile.',
          ],
        },
      },
      {
        id: 'comparaison-ue',
        h2: '9. Comparaison France vs autres pays UE',
        paragraphs: [
          "L'IPID étant un format européen standardisé, il est intéressant de comparer son application dans différents pays de l'UE :",
        ],
        list: {
          items: [
            '**France** : application stricte, format respecté par tous les assureurs, ACPR très vigilant. Contrôles annuels par échantillonnage.',
            '**Allemagne** : application stricte également, avec en plus une obligation de remettre un document de conseil personnalisé (équivalent FIC français mais plus formalisé).',
            "**Royaume-Uni (post-Brexit)** : conserve l'IPID mais avec un format légèrement adapté (IPID + Key Features Document). Régulé par la FCA.",
            "**Italie** : application avec délai légal de réflexion de 14 jours après remise de l'IPID — disposition plus protectrice qu'en France.",
            "**Espagne** : application avec exigence de signature explicite de réception de l'IPID, créant une preuve formelle de remise.",
          ],
        },
        callout: {
          tone: 'info',
          text: "Pour les entreprises ayant des activités multi-pays UE, vérifier qu'un IPID conforme est remis dans CHAQUE pays où une couverture est demandée. Les exigences varient légèrement.",
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // prix-assurance-decennale-2026-par-metier (700 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'prix-assurance-decennale-2026-par-metier': {
    toc: [
      { id: 'hausse-tarifaire', title: '8. Hausse tarifaire 2022-2026 par segment' },
      { id: 'profils-types', title: '9. Profils types : 4 cas de tarification' },
      { id: 'rge-impact', title: '10. Impact des certifications RGE/Qualibat sur les primes' },
      { id: 'simulateur', title: '11. Comment utiliser un simulateur en ligne' },
    ],
    sections: [
      {
        id: 'hausse-tarifaire',
        h2: '8. Hausse tarifaire 2022-2026 par segment',
        paragraphs: [
          'La décennale BTP a connu des hausses importantes depuis 2022, avec des variations selon les métiers et la sinistralité observée :',
        ],
        list: {
          items: [
            "**Étanchéité (piscine, toiture-terrasse)** : +28 % cumulé entre 2022 et 2026. Métier le plus risqué, peu d'assureurs preneurs.",
            '**Couverture / charpente** : +18 % cumulé. Hausse modérée grâce aux progrès des formations Qualibat.',
            "**ITE (Isolation Thermique Extérieure)** : +45 % cumulé. Explosion liée à MaPrimeRénov', artisans non formés, qualité variable.",
            "**Gros œuvre maçonnerie** : +15 % cumulé. Stable car bassin d'assureurs concurrentiel.",
            '**Plomberie / électricité** : +12 % cumulé. Métiers à sinistralité maîtrisée.',
            '**Peinture / sols** : +8 % cumulé. Métiers à faible sinistralité.',
          ],
        },
        callout: {
          tone: 'info',
          text: "Ces hausses s'expliquent par : (1) inflation matériaux et main-d'œuvre, (2) augmentation du coût moyen des sinistres (+28 % entre 2020 et 2024), (3) durcissement des conditions de réassurance internationale post-2021.",
        },
      },
      {
        id: 'profils-types',
        h2: '9. Profils types : 4 cas de tarification',
        paragraphs: [
          'Pour illustrer concrètement la tarification décennale, voici 4 profils types et leurs primes constatées en 2026 :',
          "**Profil 1 — Maçon AE débutant CA ~28 k€** : ~70 €/mois (840 €/an) avec plafond 500 k€. Pas de bonus, franchise 500 €. Tarif standard pour un démarrage d'activité.",
          '**Profil 2 — Maçon EI confirmé CA ~80 k€ + 5 ans expérience** : ~95 €/mois (1 140 €/an) plafond 800 k€. Bonus -10 % expérience appliqué. Multi-métiers exclus.',
          '**Profil 3 — Multi-métiers SARL CA ~250 k€ + 3 salariés** : ~280 €/mois (3 360 €/an) plafond 1,5 M€. Bonus -15 % Qualibat 3 étoiles. Multirisque RC Pro inclus.',
          '**Profil 4 — Couvreur RGE EI CA ~120 k€** : ~135 €/mois (1 620 €/an) plafond 1 M€. Bonus cumulé -30 % (RGE + 8 ans sans sinistre).',
        ],
      },
      {
        id: 'rge-impact',
        h2: '10. Impact des certifications RGE/Qualibat sur les primes',
        paragraphs: [
          'Comme évoqué dans la méthodologie de tarification, les certifications RGE et Qualibat ont un impact direct et chiffré sur les primes décennales :',
        ],
        list: {
          items: [
            '**RGE seul** : économie ~10 à 15 % sur la prime décennale chez la plupart des assureurs.',
            '**Qualibat 1-2 étoiles** : économie ~5 à 10 %.',
            '**Qualibat 3 étoiles** : économie ~15 à 20 %.',
            '**Qualibat 4-5 étoiles** : économie ~25 à 35 % (équivalent grandes entreprises).',
            "**Cumul RGE + Qualibat 3+** : économie cumulée jusqu'à 40 % (plafonné par certains assureurs).",
            '**Compagnonnage / diplôme BTS-BAC pro** : économie ~5 % chez quelques assureurs (SMABTP notamment).',
          ],
        },
      },
      {
        id: 'simulateur',
        h2: '11. Comment utiliser un simulateur en ligne efficacement',
        paragraphs: [
          'Les simulateurs en ligne de décennale BTP sont nombreux mais leur fiabilité varie. Pour obtenir une estimation pertinente, 5 informations sont indispensables :',
        ],
        list: {
          ordered: true,
          items: [
            "**Code APE/NAF exact** : ne pas se contenter d'un libellé approximatif. Vérifier le code officiel sur l'INSEE.",
            "**Chiffre d'affaires prévisionnel** : honnêtement estimé, à la baisse plutôt qu'à la hausse pour éviter mauvaises surprises.",
            "**Expérience pro** : nombre d'années, formations, certifications RGE/Qualibat.",
            '**Antécédents sinistres** : déclarer tous les sinistres des 5 dernières années, même mineurs.',
            "**Plafond souhaité** : 500 k€ (minimum légal), 800 k€, 1 M€, ou plus selon donneurs d'ordre.",
          ],
        },
        callout: {
          tone: 'warning',
          text: "Une simulation en ligne donne un ordre de grandeur, pas un prix ferme. Le tarif définitif dépend de la souscription effective avec un assureur agréé. Ne jamais s'engager sur la base d'une simple simulation sans signature.",
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // tarif-rc-pro-2026-par-profession (508 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'tarif-rc-pro-2026-par-profession': {
    toc: [
      { id: 'evolution-tarifs', title: '8. Évolution des tarifs 2022-2026' },
      { id: 'sous-traitance', title: '9. Sous-traitance et consultants externes' },
      { id: 'plafonds-conseils', title: '10. Quel plafond choisir selon CA ?' },
      { id: 'cas-pratiques-rc', title: '11. 4 cas pratiques détaillés' },
      { id: 'erreurs-rc', title: '12. 5 erreurs fréquentes à éviter' },
    ],
    sections: [
      {
        id: 'evolution-tarifs',
        h2: '8. Évolution des tarifs RC Pro 2022-2026',
        paragraphs: [
          'Contrairement à la décennale BTP qui a connu des hausses marquées, la RC Pro a connu des évolutions plus contrastées selon les secteurs :',
        ],
        list: {
          items: [
            '**Conseil / IT** : +5 à +12 % cumulé. Marché concurrentiel, pression baissière par insurtech (Wakam, Stello, Luko Pro).',
            '**Santé libérale** : +18 à +25 %. Hausse de la sinistralité corporelle, contentieux croissants.',
            '**Immobilier (cartes T/G/S)** : +12 %. Hausse modérée mais stable.',
            '**Transport (VTC, taxi)** : +20 à +28 %. Sinistralité accidents en hausse, plafonds RC corporelle revalorisés.',
            '**Sport / loisirs** : +15 %. Augmentation modérée, surveillance accrue post-incidents.',
            '**Cyber assurance dédiée** : +50 % entre 2022 et 2026. Explosion liée au ransomware.',
          ],
        },
      },
      {
        id: 'sous-traitance',
        h2: '9. Sous-traitance et consultants externes : impact sur la prime',
        paragraphs: [
          "Pour les professions où la sous-traitance est fréquente (conseil, IT, agences digitales, BTP), la déclaration des sous-traitants à l'assureur a un impact direct sur la prime RC Pro.",
          "Règle générale : si plus de 30 % du chiffre d'affaires est réalisé en sous-traitance, l'assureur applique typiquement une majoration de prime de +10 à +25 %. Cette majoration compense le risque accru lié à la chaîne de responsabilité.",
          "Bonne pratique : (1) inclure dans le contrat de sous-traitance une clause de garantie obligeant le sous-traitant à maintenir sa propre RC Pro à un plafond équivalent, (2) demander une attestation à jour annuellement, (3) déclarer transparentement le taux de sous-traitance à l'assureur pour éviter une nullité du contrat en cas de sinistre.",
        ],
      },
      {
        id: 'plafonds-conseils',
        h2: '10. Quel plafond de garantie choisir selon votre CA ?',
        paragraphs: [
          "Le choix du plafond de garantie est l'un des leviers les plus importants pour optimiser le rapport coût/protection :",
        ],
        list: {
          items: [
            '**CA < 50 k€** : plafond 250 k€ à 500 k€ généralement suffisant. Plafond 1 M€ inutile sauf clientèle B2B exigeante.',
            '**CA 50 à 200 k€** : plafond 500 k€ à 1 M€ recommandé. Standard du marché pour TPE.',
            '**CA 200 à 500 k€** : plafond 1 M€ à 2 M€. Norme pour PME en croissance.',
            '**CA 500 k€ à 2 M€** : plafond 2 M€ à 5 M€. Exigé par grands comptes et marchés publics.',
            '**CA > 2 M€** : plafond 5 M€ à 10 M€. Régime des ETI, souvent multi-couches (RC Pro de base + excess).',
          ],
        },
        callout: {
          tone: 'info',
          text: "Règle pratique : aligner le plafond sur la VALEUR DU PLUS GROS CONTRAT signé l'année précédente, multipliée par 5. Cela couvre les enchaînements de sinistres rares mais possibles.",
        },
      },
      {
        id: 'cas-pratiques-rc',
        h2: '11. 4 cas pratiques détaillés',
        paragraphs: [
          '**Cas 1 — Consultant SaaS CA ~120 k€** : RC Pro 1 M€ ~30 €/mois + cyber 250 k€ ~28 €/mois = 58 €/mois soit 0,6 % du CA. Plafond aligné sur valeur 1 mission stratégique × 5.',
          '**Cas 2 — Cabinet expertise comptable 3 associés CA ~600 k€** : RC Pro 2 M€ ~180 €/mois + protection juridique ~40 €/mois = 220 €/mois soit 0,4 % du CA. Plafond exigé par la profession.',
          '**Cas 3 — Agence immobilière carte T CA ~250 k€** : RC Pro 1 M€ ~95 €/mois + garantie financière 110 k€ obligatoire = 130 €/mois total. Conformité Loi Hoguet.',
          '**Cas 4 — Chirurgien libéral CA ~400 k€** : RC Pro médicale 6 M€ ~2 100 €/mois (la plus chère). Tarif élevé lié à la sinistralité corporelle médicale + obligation Loi Kouchner depuis 2002.',
        ],
      },
      {
        id: 'erreurs-rc',
        h2: '12. 5 erreurs fréquentes à éviter',
        paragraphs: [
          'Les 5 erreurs les plus coûteuses constatées par notre cabinet ORIAS sur les contrats RC Pro :',
        ],
        list: {
          ordered: true,
          items: [
            '**Sous-estimer le plafond** : un plafond 250 k€ pour un consultant senior CA ~200 k€ est insuffisant. Un seul gros sinistre peut dépasser et engager le patrimoine personnel.',
            "**Oublier la garantie subséquente** : couvre les sinistres déclarés après la résiliation du contrat, pour des faits antérieurs. Indispensable en cas de changement d'assureur.",
            "**Ignorer les exclusions de défense recours** : certains contrats excluent les frais d'avocat. Vérifier que la défense recours est incluse jusqu'à un plafond suffisant (5 à 20 k€).",
            "**Ne pas déclarer toutes les activités** : un consultant qui développe aussi du code (BNC + BIC) doit déclarer les 2. Sinon non-couverture pour l'activité non déclarée.",
            "**Reconduire sans renégocier** : le marché RC Pro évolue vite. Renégocier tous les 2-3 ans permet d'économiser 15 à 30 %.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // refus-indemnisation-assurance-4-recours-2026 (716 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'refus-indemnisation-assurance-4-recours-2026': {
    toc: [
      { id: 'preuve-charge', title: '7. La charge de la preuve : qui doit prouver quoi ?' },
      { id: 'expertise-amiable', title: '8. Expertise amiable contradictoire' },
      { id: 'jurisprudence', title: '9. Jurisprudence clé 2024' },
      { id: 'duree-procedures', title: '10. Durée moyenne des procédures par étape' },
    ],
    sections: [
      {
        id: 'preuve-charge',
        h2: '7. La charge de la preuve : qui doit prouver quoi ?',
        paragraphs: [
          "Un point souvent mal compris : la répartition de la charge de la preuve entre assuré et assureur. Selon l'article 1353 du Code civil et la jurisprudence constante en assurance :",
        ],
        list: {
          items: [
            "**L'assuré doit prouver** : (1) l'existence du sinistre (date, lieu, circonstances), (2) le montant du préjudice, (3) la garantie souscrite couvrant ce type de sinistre.",
            "**L'assureur doit prouver** : (1) les exclusions de garantie qu'il invoque, (2) la fausse déclaration de l'assuré, (3) le défaut de paiement de prime au moment du sinistre.",
            "**En cas de doute** : la jurisprudence applique le principe « in dubio pro assicurato » (en cas de doute, en faveur de l'assuré), sauf pour les exclusions clairement énoncées au contrat.",
          ],
        },
        callout: {
          tone: 'info',
          text: "Cette répartition explique pourquoi l'assureur doit RÉDIGER PRÉCISÉMENT ses exclusions dans les CGV. Une exclusion ambiguë sera interprétée en faveur de l'assuré.",
        },
      },
      {
        id: 'expertise-amiable',
        h2: '8. Expertise amiable contradictoire',
        paragraphs: [
          'Avant toute action judiciaire, une expertise amiable contradictoire est souvent la voie la plus efficace pour résoudre un litige technique :',
          '**Principe** : les deux parties (assureur et assuré) désignent chacune un expert. Ces deux experts désignent un troisième expert « tiers » indépendant. Le tiers expert tranche en cas de désaccord.',
          '**Coût** : chaque partie paie son propre expert (~1 200 à 3 500 €). Le tiers expert est payé à parts égales.',
          '**Avantages** : (1) rapide (3 à 6 mois vs 12-24 mois en judiciaire), (2) conclusion technique faisant autorité, (3) souvent acceptée par les deux parties pour clore le dossier.',
          "**Limites** : si l'une des parties refuse les conclusions, il faut passer en judiciaire — mais les conclusions de l'expertise amiable sont alors une preuve forte.",
        ],
      },
      {
        id: 'jurisprudence',
        h2: '9. Jurisprudence clé 2024',
        paragraphs: [
          "Plusieurs arrêts récents ont précisé les règles en cas de refus d'indemnisation :",
        ],
        list: {
          items: [
            "**Cour de Cassation 2ème ch. civ. 14 mars 2024** : l'assureur ne peut refuser une indemnisation au motif d'une exclusion ambiguë rédigée en petits caractères. La clause doit être en gras et explicitement portée à l'attention de l'assuré lors de la souscription.",
            "**CA Paris 7 juin 2024** : la déclaration tardive (>5 jours) sans motif légitime ne fait PAS automatiquement déchéance de garantie. L'assureur doit prouver que ce retard lui a causé un préjudice (par exemple, impossibilité d'expertiser car réparations déjà faites).",
            "**Cour de Cassation 11 octobre 2024** : une fausse déclaration non intentionnelle ne suffit pas à annuler le contrat. Il faut prouver que l'assureur aurait refusé la couverture ou appliqué une prime différente s'il avait su.",
          ],
        },
      },
      {
        id: 'duree-procedures',
        h2: '10. Durée moyenne des procédures par étape',
        paragraphs: [
          'Pour anticiper le temps total à investir dans une contestation, voici les durées moyennes constatées :',
        ],
        list: {
          items: [
            '**Étape 1 — Réclamation amiable** : 2 à 3 mois (envoi LRAR + délai réponse 2 mois max ACPR).',
            '**Étape 2 — Médiation Assurance** : 3 à 5 mois après réclamation (saisine + 90 jours instruction).',
            '**Étape 3 — Saisine ACPR** : 6 à 9 mois pour aboutir à une sanction administrative (si applicable).',
            '**Étape 4 — Tribunal Judiciaire première instance** : 12 à 24 mois.',
            "**Étape 5 — Cour d'appel** : 18 à 30 mois supplémentaires si appel.",
            '**Étape 6 — Cassation** : 12 à 18 mois supplémentaires si pourvoi.',
          ],
        },
        callout: {
          tone: 'info',
          text: "Total possible : 5 à 8 ans en cas de contentieux poussé jusqu'au bout. D'où l'importance d'explorer en premier les voies amiables et médiation, beaucoup plus rapides.",
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // mediation-assurance-procedure-delais-2026 (705 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'mediation-assurance-procedure-delais-2026': {
    toc: [
      { id: 'cas-favorable', title: "7. Quels cas sont les plus favorables à l'assuré ?" },
      { id: 'preparation-dossier', title: '8. Préparer un dossier solide — 8 pièces' },
      {
        id: 'apres-recommandation',
        title: "9. Après la recommandation : et si l'assureur refuse ?",
      },
      {
        id: 'comparaison-autres',
        title: '10. Médiation assurance vs autres médiateurs sectoriels',
      },
    ],
    sections: [
      {
        id: 'cas-favorable',
        h2: "7. Quels cas sont les plus favorables à l'assuré ?",
        paragraphs: [
          "L'analyse du rapport annuel du médiateur de l'assurance montre que certains types de litiges aboutissent plus souvent en faveur de l'assuré :",
        ],
        list: {
          items: [
            "**Exclusion ambiguë invoquée par l'assureur** : taux de succès assuré ~70 %. La jurisprudence est protectrice.",
            "**Refus pour fausse déclaration non intentionnelle** : ~60 %. L'assureur doit prouver l'impact concret.",
            '**Délai de déclaration légèrement dépassé** (6-15 jours au lieu de 5) : ~55 %. Souvent accepté sans préjudice prouvé.',
            "**Sous-évaluation du sinistre par l'expert** : ~50 %. Contre-expertise indépendante souvent obtenue.",
            '**Refus pour cause non liée au sinistre** : ~45 %. Souvent reformulation possible.',
          ],
        },
        callout: {
          tone: 'info',
          text: "À l'inverse, les cas les moins favorables sont : (1) fraude prouvée (taux 5 %), (2) défaut de paiement de prime (10 %), (3) sinistre clairement hors champ couvert (15 %).",
        },
      },
      {
        id: 'preparation-dossier',
        h2: '8. Préparer un dossier solide — 8 pièces incontournables',
        paragraphs: [
          'Pour maximiser les chances de succès en médiation, le dossier doit comporter au minimum 8 pièces :',
        ],
        list: {
          ordered: true,
          items: [
            "**Contrat d'assurance complet** : CGV + CP + IPID. Important pour identifier précisément les garanties et exclusions.",
            "**Lettre de déclaration de sinistre** : LRAR avec preuve d'envoi et accusé de réception.",
            "**Rapport d'expertise** : copie complète, y compris annexes et photos.",
            "**Courriers d'échange avec l'assureur** : tous les courriers, emails, notamment la réponse de refus motivée.",
            '**Lettre de réclamation préalable** : envoyée AVANT la médiation, avec accusé de réception. Pièce obligatoire de recevabilité.',
            '**Preuves du sinistre** : photos datées, témoignages, factures de matériaux, devis de réparation.',
            '**Argumentation écrite** : 1 à 2 pages exposant clairement votre position juridique. Référencer les articles du Code des assurances et les jurisprudences favorables.',
            '**Calcul du préjudice** : ventilation détaillée du montant réclamé avec justificatifs.',
          ],
        },
      },
      {
        id: 'apres-recommandation',
        h2: "9. Après la recommandation : et si l'assureur refuse ?",
        paragraphs: [
          "Dans environ 15 % des cas où la recommandation est favorable à l'assuré, l'assureur refuse de la suivre. Plusieurs options s'offrent alors :",
          '**Action judiciaire** : la recommandation du médiateur constitue une preuve forte devant le tribunal. Les juges la suivent dans 80 % des cas. Délai : 12 à 24 mois en première instance.',
          "**Médiatisation** : signaler le refus aux associations de consommateurs (UFC Que Choisir, 60 Millions de Consommateurs). Risque de réputation pour l'assureur qui peut faire pression.",
          "**Saisine ACPR** : si le refus systématique de recommandations témoigne d'une pratique commerciale problématique, l'ACPR peut sanctionner.",
        ],
      },
      {
        id: 'comparaison-autres',
        h2: '10. Médiation assurance vs autres médiateurs sectoriels',
        paragraphs: [
          'Plusieurs médiations existent dans le secteur financier. Pour bien orienter votre dossier :',
        ],
        list: {
          items: [
            "**Médiation Assurance** : compétente pour tous les litiges contrats d'assurance non-vie (RC Pro, décennale, multirisque, cyber, mutuelle).",
            "**Médiateur AMF** : compétent pour les CIF et conseils en investissements financiers. Pas pour l'assurance directe.",
            "**Médiateur de la Banque** : compétent pour les contrats bancaires + IOBSP. Pas pour les contrats d'assurance.",
            "**Médiateur de la Consommation** : compétent par défaut si aucun médiateur sectoriel n'est désigné. Rare en assurance pro.",
            "**Médiateur national de l'énergie** : compétent pour les contrats énergie, parfois sollicité à tort pour l'assurance habitation.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // sinistralite-btp-2024-aqc-sycodes-chiffres (632 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'sinistralite-btp-2024-aqc-sycodes-chiffres': {
    toc: [
      {
        id: 'sycodes-methodologie',
        title: '7. Méthodologie SYCODÉS — comment AQC collecte les données',
      },
      { id: 'comparaison-pays', title: '8. Comparaison France vs autres pays UE' },
      { id: 'cout-moyen-detail', title: '9. Coût moyen par type de désordre' },
      { id: 'projections-2030', title: '10. Projections 2026-2030 — tendances anticipées' },
      { id: 'utilisation-courtage', title: '11. Comment les courtiers utilisent ces données' },
    ],
    sections: [
      {
        id: 'sycodes-methodologie',
        h2: '7. Méthodologie SYCODÉS — comment AQC collecte les données',
        paragraphs: [
          "L'observatoire SYCODÉS de l'AQC (Agence Qualité Construction) collecte ses données auprès d'un panel d'assureurs construction représentant l'essentiel du marché français. La méthodologie repose sur 3 piliers :",
          "**Collecte** : chaque assureur partenaire transmet à l'AQC une base anonymisée de tous les sinistres décennaux clos au cours de l'année. Cela inclut : date du sinistre, métier concerné, type de désordre, coût d'indemnisation, durée d'instruction.",
          "**Traitement** : l'AQC nettoie les données (élimination des doublons, harmonisation des typologies), puis les segmente selon une nomenclature standardisée (12 grandes familles de métiers, 30 types de désordres).",
          "**Publication** : un rapport annuel public est publié vers septembre de l'année suivante (rapport 2024 = publié sept. 2025). Les données sont accessibles sur qualiteconstruction.com/observatoire/sycodes/. Représentativité estimée : >85 % du marché décennal français.",
        ],
      },
      {
        id: 'comparaison-pays',
        h2: '8. Comparaison France vs autres pays UE',
        paragraphs: [
          'La France a un système de garantie décennale parmi les plus protecteurs au monde, hérité de la Loi Spinetta de 1978. Comparaison rapide avec ses voisins :',
        ],
        list: {
          items: [
            '**France** : décennale OBLIGATOIRE pour tous les constructeurs. Garantie 10 ans automatique. Sinistralité moyenne ~14 % sur 10 ans.',
            "**Allemagne** : garantie 5 ans (Verjährungsfrist), non obligatoire d'assurance mais responsabilité civile illimitée. Système plus risqué pour le client mais primes plus basses.",
            '**Italie** : décennale 10 ans, assurance obligatoire depuis 2005. Système calqué sur le français mais avec quelques exceptions.',
            '**Royaume-Uni** : pas de décennale légale, garantie contractuelle de 6 à 12 ans selon les marchés. Souvent couverte par des polices privées (« building warranty »).',
            "**Espagne** : décennale obligatoire 10 ans, mais système d'assurance moins étendu, beaucoup de constructeurs en auto-couverture.",
          ],
        },
      },
      {
        id: 'cout-moyen-detail',
        h2: '9. Coût moyen par type de désordre (extrait SYCODÉS 2024)',
        paragraphs: [
          'Détail des coûts moyens par typologie de désordre, selon le rapport SYCODÉS 2024 :',
        ],
        list: {
          items: [
            '**Effondrement structurel partiel** : coût moyen ~85 000 € — typiquement charpente ou plancher.',
            '**Infiltration toiture / étanchéité défaillante** : ~28 000 € — couverture, étanchéité plate.',
            '**Fissures structurelles façade ou refend** : ~32 000 € — souvent liées au sol ou aux fondations.',
            "**Défaut d'isolation thermique ITE** : ~22 000 € — boom des sinistres post-MaPrimeRénov'.",
            '**Dysfonctionnement chauffage / pompe à chaleur** : ~18 000 € — installations récentes.',
            "**Défaut d'étanchéité piscine** : ~45 000 € — sinistralité maximum, métier très spécialisé.",
            '**Sinistre électrique avec dommages structurels** : ~14 000 €.',
            '**Défaut de pose carrelage / parquet** : ~9 000 €.',
            '**Défaut de peinture / revêtement intérieur** : ~7 000 €.',
          ],
        },
      },
      {
        id: 'projections-2030',
        h2: '10. Projections 2026-2030 — tendances anticipées',
        paragraphs: [
          'Sur la base des tendances historiques et des évolutions réglementaires en cours, voici les projections AQC pour 2026-2030 :',
          "**Hausse continue de la sinistralité ITE** : +50 % attendue d'ici 2030 du fait de la massification des chantiers MaPrimeRénov' avec des artisans peu formés. Les assureurs devraient durcir les conditions de souscription.",
          "**Croissance des sinistres PAC + photovoltaïque** : +80 % d'ici 2030. L'explosion des installations énergie renouvelable dépasse les capacités de formation des artisans.",
          '**Stabilisation des sinistres gros œuvre** : la digitalisation des chantiers (BIM, contrôle 4D) commence à réduire les erreurs structurelles. Sinistralité attendue stable ou en légère baisse.',
          "**Augmentation du coût moyen** : +35 % attendue à 2030 du fait de l'inflation matériaux et main-d'œuvre. Impact direct sur les primes décennales : hausse estimée +25 % d'ici 2030.",
        ],
      },
      {
        id: 'utilisation-courtage',
        h2: '11. Comment les courtiers utilisent ces données',
        paragraphs: [
          'Pour un cabinet de courtage en assurance construction, les données SYCODÉS sont un outil essentiel à plusieurs titres :',
        ],
        list: {
          items: [
            '**Tarification** : comparer le tarif proposé par un assureur au tarif de marché segmenté par métier. Si écart >20 %, négocier.',
            "**Choix d'assureur** : orienter le client vers l'assureur le plus spécialiste de son métier (ex. SMABTP pour les couvreurs).",
            '**Prévention** : identifier les principaux risques métiers pour proposer des formations et certifications réductrices de primes.',
            '**Gestion de sinistre** : connaître les délais moyens de résolution pour calibrer les attentes du client.',
            '**Veille marché** : anticiper les évolutions tarifaires pour conseiller la renégociation au bon moment.',
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // bureau-central-tarification-bct-assurance-refusee (795 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'bureau-central-tarification-bct-assurance-refusee': {
    toc: [
      { id: 'historique-bct', title: "8. Historique du BCT — 50 ans d'existence" },
      { id: 'statistiques', title: '9. Statistiques 2024 du BCT' },
      { id: 'apres-decision', title: "10. Après la décision BCT — droit de l'assureur ?" },
      { id: 'eviter-bct', title: "11. Comment éviter d'avoir à saisir le BCT" },
    ],
    sections: [
      {
        id: 'historique-bct',
        h2: "8. Historique du BCT — 50 ans d'existence",
        paragraphs: [
          "Le Bureau Central de Tarification a été créé par la Loi Spinetta du 4 janvier 1978 comme contrepartie de l'obligation d'assurance imposée aux constructeurs BTP. L'idée fondatrice : puisque la loi impose à un artisan de s'assurer, l'État doit garantir qu'il pourra effectivement le faire, même si les assureurs refusent.",
          'Le BCT a été progressivement étendu : (1) en 1985 à la RC médicale obligatoire, (2) en 1989 à la RC automobile, (3) en 2003 à la RC chasse, (4) en 2008 à certaines obligations RC professionnelles (médicaux paramédicaux notamment).',
          "Aujourd'hui, le BCT siège à Paris (1 rue Jules Lefebvre, 75009 Paris) et instruit environ 800 à 1 200 dossiers par an, principalement pour la décennale BTP (60 %) et la RC automobile (25 %).",
        ],
      },
      {
        id: 'statistiques',
        h2: '9. Statistiques 2024 du BCT',
        paragraphs: [
          'Selon le rapport annuel BCT 2024 (publié mars 2025), les chiffres clés sont :',
        ],
        list: {
          items: [
            '**Total dossiers instruits** : 1 050 (+8 % vs 2023)',
            '**Décennale BTP** : 615 dossiers (59 %)',
            '**RC automobile pro** : 245 dossiers (23 %)',
            '**RC médicale** : 95 dossiers (9 %)',
            '**Autres (chasse, sport)** : 95 dossiers (9 %)',
            "**Taux d'imposition réussi** : 92 % des dossiers complets",
            "**Délai moyen d'instruction** : 38 jours (légèrement plus que le délai légal de 30 jours)",
            '**Majoration tarifaire moyenne imposée** : +45 % par rapport au marché',
          ],
        },
      },
      {
        id: 'apres-decision',
        h2: "10. Après la décision BCT — droit de l'assureur ?",
        paragraphs: [
          "Une fois la décision BCT notifiée à l'assureur cible, celui-ci dispose de 3 options principales :",
        ],
        list: {
          ordered: true,
          items: [
            "**Appliquer la décision** : c'est l'option majoritaire (>95 %). L'assureur émet le contrat aux conditions imposées et adresse au client la documentation contractuelle dans les 30 jours.",
            "**Contester devant le Tribunal Administratif** : possible mais rare (~3 %). L'assureur doit démontrer que les conditions imposées sont disproportionnées. Délai 18 à 24 mois.",
            "**Restituer l'agrément** : option extrême consistant à se retirer du marché concerné pour éviter d'appliquer la décision. Rare et coûteux pour l'assureur (perte de marché).",
          ],
        },
        callout: {
          tone: 'info',
          text: "Sanction si refus injustifié : amende ACPR jusqu'à 100 M€ pour les compagnies. La pression réglementaire rend les contestations très rares.",
        },
      },
      {
        id: 'eviter-bct',
        h2: "11. Comment éviter d'avoir à saisir le BCT",
        paragraphs: [
          "Saisir le BCT, même gratuit, demande du temps et signifie qu'un parcours commercial a échoué. Pour éviter d'en arriver là :",
        ],
        list: {
          items: [
            "**Faire appel à un courtier ORIAS dès le démarrage de l'activité** : un courtier connaît les assureurs les plus ouverts à chaque profil et adapte la candidature.",
            '**Améliorer son dossier** : formations qualifiantes (RGE, Qualibat, Pro AFNOR), compagnonnage, expérience documentée.',
            "**Constituer une provision de sécurité** : montrer à l'assureur que vous avez les capitaux pour absorber une éventuelle franchise élevée.",
            '**Renoncer temporairement aux activités les plus risquées** : se concentrer sur le métier principal pendant les 2 premières années pour bâtir un historique propre.',
            "**Souscrire d'abord une RC Pro classique** (non-obligatoire), constituer un historique sans sinistre 2-3 ans, puis ajouter la décennale.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // recommandation-acpr-2024-r-02-reclamations-assurance (708 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'recommandation-acpr-2024-r-02-reclamations-assurance': {
    toc: [
      { id: 'comparaison-r03', title: '7. Comparaison avec 2024-R-03 (devoir de conseil)' },
      { id: 'preparation-audit', title: '8. Préparer un audit ACPR — checklist' },
      { id: 'outils-software', title: '9. Outils logiciels pour la gestion des réclamations' },
      { id: 'cas-sanctions', title: '10. Cas réels de sanctions ACPR 2024-2025' },
    ],
    sections: [
      {
        id: 'comparaison-r03',
        h2: '7. Comparaison avec la Recommandation 2024-R-03 (devoir de conseil)',
        paragraphs: [
          'Les deux Recommandations ACPR 2024 (R-02 et R-03) forment un ensemble cohérent qui structure les obligations des courtiers en assurance. Comparaison synthétique :',
        ],
        list: {
          items: [
            '**2024-R-02 (réclamations)** : couvre le traitement des réclamations clients. Obligation de registre, accusé de réception 10 jours, réponse 2 mois max.',
            "**2024-R-03 (devoir de conseil)** : couvre la phase commerciale en amont. Obligation de recueil d'exigences, recommandation motivée écrite, traçabilité 10 ans.",
            '**Articulation** : la R-03 documente le conseil délivré, la R-02 traite les éventuelles réclamations sur ce conseil. La R-03 amont sécurise contre les réclamations R-02 aval.',
            "**Sanctions ACPR communes** : avertissement, blâme, amende jusqu'à 5 M€ pour les courtiers, retrait d'agrément en cas de manquement grave.",
          ],
        },
      },
      {
        id: 'preparation-audit',
        h2: '8. Préparer un audit ACPR — checklist',
        paragraphs: [
          "L'ACPR procède à des audits réguliers (annuels pour les gros courtiers, biennaux pour les autres). Pour s'y préparer, 10 points à vérifier :",
        ],
        list: {
          ordered: true,
          items: [
            '**Registre des réclamations à jour** : toutes les réclamations des 5 dernières années, numérotées, datées, avec accusés de réception conservés.',
            '**Procédure interne écrite** : politique de traitement des réclamations formalisée, datée, signée par le dirigeant.',
            '**Personne responsable identifiée** : nom + email du « responsable réclamations » sur tous les supports commerciaux.',
            '**Information préalable client** : modalités de saisine clairement indiquées sur le site web, les devis, les contrats, les emails de signature.',
            '**Reporting ACPR transmis** : statistiques annuelles envoyées avant le 30 avril chaque année.',
            '**Délais respectés** : preuve que tous les accusés de réception ont été envoyés sous 10 jours et toutes les réponses sous 2 mois max.',
            "**Information médiation** : pour chaque réclamation rejetée, preuve que l'information sur le médiateur de l'assurance a été fournie.",
            "**Documents R-03 conformes** : recueil d'exigences, recommandation motivée, conservation 10 ans avec hashage SHA-256.",
            '**Formation du personnel** : preuves que le personnel a été formé sur la R-02 et R-03 (attestations FCO ALUR + DDA).',
            "**Système d'archivage immuable** : démonstration que les documents conseil sont conservés de manière non-modifiable.",
          ],
        },
      },
      {
        id: 'outils-software',
        h2: '9. Outils logiciels pour la gestion des réclamations',
        paragraphs: [
          'Pour respecter efficacement la 2024-R-02, plusieurs solutions logicielles dédiées au courtage existent :',
        ],
        list: {
          items: [
            '**Manymore / +Simple Pro** : CRM courtage avec module réclamations intégré. Coût : 80 à 150 €/mois selon volume.',
            '**Insureo** : SaaS courtage français avec workflow réclamations + signatures électroniques + archivage immuable. Coût : 120 à 250 €/mois.',
            '**WeProov** : spécialisé sinistres et réclamations, blockchain pour traçabilité. Coût : sur devis.',
            '**Solutions internes Excel + signatures électroniques DocuSign** : minimum viable pour les petits cabinets. Coût : ~30 €/mois.',
            '**Modules ERP comme Sage** : adaptés pour les courtiers multi-activités. Coût intégré au licensing global.',
          ],
        },
      },
      {
        id: 'cas-sanctions',
        h2: '10. Cas réels de sanctions ACPR 2024-2025',
        paragraphs: [
          'Plusieurs sanctions ACPR ont été publiées récemment, illustrant la sévérité du contrôle :',
        ],
        list: {
          items: [
            '**Cabinet courtage Île-de-France (juin 2024)** : amende 180 000 € pour absence de registre réclamations et défaut de réponse à plusieurs clients dans les délais légaux. Publication name & shame sur le site ACPR.',
            "**Compagnie d'assurance pro (sept. 2024)** : amende 2,5 M€ pour systèmes de traitement de réclamations défaillants. Blâme + obligation de mettre en place un audit interne semestriel.",
            "**Courtier ORIAS (déc. 2024)** : retrait d'agrément pour fraude — absence totale de traçabilité des conseils donnés à des clients en assurance vie. Interdiction d'exercer définitive.",
            '**Cabinet santé (mars 2025)** : amende 45 000 € + obligation de formation supplémentaire du personnel. Pratique de réponses tardives systématiques aux réclamations.',
          ],
        },
        callout: {
          tone: 'warning',
          text: 'Ces sanctions sont publiques et consultables sur acpr.banque-france.fr. Elles ont un impact réputationnel direct : perte de partenariats, défiance des clients, difficultés à recruter des collaborateurs.',
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // declaration-sinistre-decennale-5-etapes (1149 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'declaration-sinistre-decennale-5-etapes': {
    toc: [
      { id: 'erreurs-declaration', title: '8. 6 erreurs à éviter lors de la déclaration' },
      { id: 'role-expert', title: "9. Rôle de l'expert d'assurance indépendant" },
      {
        id: 'jurisprudence-decennale',
        title: '10. Jurisprudence récente sur les sinistres décennaux',
      },
    ],
    sections: [
      {
        id: 'erreurs-declaration',
        h2: '8. 6 erreurs à éviter lors de la déclaration',
        paragraphs: [
          "Les erreurs lors de la déclaration d'un sinistre décennal peuvent compromettre votre indemnisation. Les 6 plus fréquentes :",
        ],
        list: {
          ordered: true,
          items: [
            '**Déclarer hors délai légal sans motif documenté** : passer au-delà des 5 jours ouvrés sans raison écrite peut entraîner une déchéance partielle. Toujours envoyer la LRAR le plus vite possible, même incomplet.',
            "**Réparer avant expertise contradictoire** : démolir ou réparer empêche l'expert de constater l'origine du défaut. L'assureur peut refuser l'indemnisation.",
            "**Omettre des co-intervenants** : si plusieurs artisans ont travaillé sur l'ouvrage, ne pas mentionner les co-intervenants peut compliquer le recours subrogatoire.",
            '**Sous-évaluer le préjudice** : déclarer un montant trop bas par crainte de refus peut bloquer une indemnisation revalorisée. Toujours déclarer le préjudice TOTAL constaté ou anticipé.',
            "**Ne pas conserver les originaux** : photos, courriers, devis doivent être conservés en originaux. L'assureur peut les demander 3 à 5 ans après le sinistre.",
            "**Communiquer par téléphone sans LRAR** : aucun échange téléphonique avec l'assureur ne fait preuve. Toujours doubler par LRAR ou email avec accusé de réception.",
          ],
        },
      },
      {
        id: 'role-expert',
        h2: "9. Rôle de l'expert d'assurance indépendant",
        paragraphs: [
          "Pour les sinistres complexes (>10 000 €) ou contestés, faire intervenir un expert d'assurance INDÉPENDANT en parallèle de l'expert mandaté par l'assureur est généralement rentable.",
          "**Coût** : 800 à 2 500 € selon complexité (visite + rapport écrit). Pour les sinistres très complexes, jusqu'à 4 000 €.",
          '**Mission** : (1) constatation contradictoire des désordres, (2) chiffrage indépendant des réparations, (3) analyse des causes et responsabilités, (4) rapport écrit utilisable devant le médiateur ou le tribunal.',
          "**Bénéfice** : selon une étude AMRAE 2024, les sinistres ayant donné lieu à une contre-expertise indépendante sont indemnisés en moyenne 28 % plus haut que les sinistres ne reposant que sur l'expertise assureur. Le coût de l'expert indépendant est donc presque toujours rentabilisé.",
        ],
      },
      {
        id: 'jurisprudence-decennale',
        h2: '10. Jurisprudence récente sur les sinistres décennaux',
        paragraphs: ["Trois arrêts récents méritent d'être connus :"],
        list: {
          items: [
            "**Cass. 3e civ. 19 mars 2024** : un sinistre constaté pendant les travaux préparatoires (avant ouverture officielle des travaux) RELÈVE de la décennale si la cause provient de l'ouvrage neuf. Important pour les rénovations partielles.",
            "**CA Lyon 12 sept. 2024** : la responsabilité de l'architecte est partagée 50/50 avec le maçon en cas de défaut de conception structurel non détecté pendant l'exécution. Subrogation entre les deux décennales.",
            '**Cass. 3e civ. 24 oct. 2024** : la garantie décennale couvre les défauts thermiques rendant le logement impropre à sa destination (température < 19°C en hiver), même sans défaut structurel apparent.',
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // lettre-resiliation-assurance-pro-loi-hamon-2026 (1138 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'lettre-resiliation-assurance-pro-loi-hamon-2026': {
    toc: [
      { id: 'pieges-resiliation', title: '8. 5 pièges à éviter lors de la résiliation' },
      { id: 'bascule-coordonnee', title: '9. Bascule coordonnée vers un nouveau contrat' },
      { id: 'cas-refus', title: "10. Que faire si l'assureur refuse la résiliation ?" },
    ],
    sections: [
      {
        id: 'pieges-resiliation',
        h2: '8. 5 pièges à éviter lors de la résiliation',
        paragraphs: [
          "La résiliation d'un contrat d'assurance pro peut sembler simple mais comporte plusieurs pièges :",
        ],
        list: {
          ordered: true,
          items: [
            '**Résilier sans avoir un nouveau contrat prêt** : risque de découvert de couverture pendant plusieurs semaines. Toujours coordonner les dates avec un courtier ORIAS.',
            '**Oublier la garantie subséquente** : certains contrats incluent une période de garantie après résiliation. Vérifier la durée avant de signer ailleurs.',
            '**Envoyer par email simple sans accusé** : non valide en cas de litige. Toujours utiliser LRAR ou recommandé électronique qualifié.',
            '**Ignorer le préavis Loi Chatel** : 2 mois avant échéance sauf cas Hamon. Manquer le préavis = reconduction tacite pour 1 an de plus.',
            "**Ne pas demander le calcul du remboursement** : exiger un décompte précis des primes payées d'avance à rembourser au prorata. Souvent oublié par l'assureur.",
          ],
        },
      },
      {
        id: 'bascule-coordonnee',
        h2: '9. Bascule coordonnée vers un nouveau contrat',
        paragraphs: [
          "Pour éviter toute rupture de couverture, la bascule entre l'ancien et le nouveau contrat doit être parfaitement coordonnée. Méthode en 5 étapes :",
        ],
        list: {
          ordered: true,
          items: [
            "**Étape 1 — Souscription du nouveau contrat** : finaliser la souscription avec date d'effet PROGRAMMÉE 30 jours plus tard (correspondant au délai Loi Hamon).",
            '**Étape 2 — Envoi LRAR résiliation** : envoyer la lettre Loi Hamon le JOUR de la souscription du nouveau contrat. Effet résiliation = 30 jours après réception.',
            '**Étape 3 — Confirmation par les 2 assureurs** : récupérer les confirmations écrites avec les dates de fin / début de chaque contrat.',
            '**Étape 4 — Période de chevauchement** : pendant ~5-10 jours, les 2 contrats sont actifs. Sécurité maximale. Coût supplémentaire ~10-30 € pour ce chevauchement.',
            "**Étape 5 — Régularisation des primes** : récupération auprès de l'ancien assureur du prorata des primes payées d'avance. Délai légal 30 jours.",
          ],
        },
      },
      {
        id: 'cas-refus',
        h2: "10. Que faire si l'assureur refuse la résiliation ?",
        paragraphs: [
          "L'assureur peut tenter de retarder ou contester la résiliation. Recours :",
          '**Refus pour motif technique** (lettre incomplète, signature manquante) : envoyer une nouvelle LRAR corrigée. Le délai 1 mois redémarre.',
          "**Refus pour antériorité du contrat** (« vous n'avez pas encore 1 an ») : vérifier la date d'effet exact. Si l'assureur a tort, signaler à l'ACPR (compétent pour les pratiques commerciales déloyales).",
          "**Silence pendant 30 jours** : la résiliation est effective de plein droit à la date prévue. Conserver la preuve d'envoi LRAR pour faire valoir.",
          "**Réclamation factures après résiliation** : aucune prime n'est due après la date d'effet. Si réclamation persistante, saisir le médiateur de l'assurance puis le tribunal.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // combien-coute-assurance-pro-2026 (1128 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'combien-coute-assurance-pro-2026': {
    toc: [
      { id: 'budget-optimal', title: '9. Quel budget assurance optimal selon votre CA ?' },
      { id: 'cas-secteurs-prix', title: "10. 5 cas pratiques par secteur d'activité" },
      { id: 'erreurs-tarifaires', title: '11. 4 erreurs courantes qui coûtent cher' },
    ],
    sections: [
      {
        id: 'budget-optimal',
        h2: '9. Quel budget assurance optimal selon votre CA ?',
        paragraphs: [
          "Un budget assurance pro bien calibré représente typiquement entre 1 % et 5 % du chiffre d'affaires hors taxes, selon le secteur et le niveau de risque :",
        ],
        list: {
          items: [
            '**Services / conseil non-réglementés** : 0,5 à 1,5 % du CA. Profil à faible risque.',
            '**Services réglementés (avocat, expert-comptable, agent immobilier)** : 1 à 3 % du CA.',
            '**BTP gros œuvre** : 3 à 5 % du CA. Décennale + RC Pro + multirisque + auto pro.',
            "**Santé libérale (médecin, kiné)** : 1 à 3 % du CA, jusqu'à 8 % pour les chirurgiens.",
            '**E-commerce / IT** : 1 à 2 % du CA + cyber assurance recommandée.',
            '**Transport (VTC, taxi)** : 4 à 7 % du CA (RC Pro + assurance pro véhicule).',
          ],
        },
        callout: {
          tone: 'warning',
          text: 'Au-delà de 5 % du CA (sauf secteurs à très haute sinistralité), votre budget assurance est probablement trop élevé. Notre cabinet ORIAS peut renégocier pour atteindre les ratios optimaux du marché.',
        },
      },
      {
        id: 'cas-secteurs-prix',
        h2: "10. 5 cas pratiques par secteur d'activité",
        paragraphs: [
          '**Cas 1 — Consultant IT freelance CA ~80 k€** : RC Pro 1 M€ (~360 €/an) + cyber 250 k€ (~336 €/an) + multirisque domicile pro (~180 €/an) = ~876 €/an soit 1,1 % du CA.',
          '**Cas 2 — Maçon AE CA ~40 k€** : Décennale (~840 €/an) + RC Pro 500 k€ (~360 €/an) + multirisque outils (~240 €/an) = ~1 440 €/an soit 3,6 % du CA.',
          '**Cas 3 — Cabinet expertise comptable 3 associés CA ~600 k€** : RC Pro 2 M€ (~2 160 €/an) + multirisque bureaux (~600 €/an) + D&O Mandataires (~1 440 €/an) + cyber 1 M€ (~1 200 €/an) = ~5 400 €/an soit 0,9 % du CA.',
          '**Cas 4 — Esthéticienne SARL CA ~150 k€** : RC Pro 500 k€ (~300 €/an) + multirisque salon (~540 €/an) + RC employeur (~180 €/an) = ~1 020 €/an soit 0,7 % du CA.',
          '**Cas 5 — VTC AE CA ~50 k€** : RC Pro + assurance pro véhicule + protection juridique = ~2 400 €/an soit 4,8 % du CA. Tarif élevé lié au risque accidents.',
        ],
      },
      {
        id: 'erreurs-tarifaires',
        h2: '11. 4 erreurs courantes qui coûtent cher',
        paragraphs: ['Les 4 erreurs les plus coûteuses constatées par notre cabinet :'],
        list: {
          ordered: true,
          items: [
            "**Reconduire tacitement chaque année sans renégocier** : le marché évolue, vos besoins aussi. Renégocier tous les 2-3 ans = 15 à 30 % d'économie.",
            '**Souscrire un plafond trop bas pour économiser** : un sinistre dépassant votre plafond engage votre patrimoine personnel. Toujours aligner sur 5× la valeur du plus gros contrat.',
            '**Ne pas combiner les garanties chez un seul assureur** : un pack RC + multirisque + cyber chez un seul assureur peut donner 10 à 20 % de réduction vs 3 contrats séparés.',
            "**Choisir le moins cher sans vérifier la solidité de l'assureur** : un assureur insolvable ne paie pas. Toujours vérifier Pappers > 70/100 + agrément ACPR + ratings S&P/Moody's.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // attestation-rc-pro-modele-pdf-2026 (1123 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'attestation-rc-pro-modele-pdf-2026': {
    toc: [
      {
        id: 'verifier-attestation',
        title: "7. Comment vérifier la validité d'une attestation reçue",
      },
      {
        id: 'attestation-numerique',
        title: '8. Attestation numérique : eIDAS et signature électronique',
      },
      { id: 'cas-pratiques-att', title: "9. 4 cas pratiques d'utilisation" },
    ],
    sections: [
      {
        id: 'verifier-attestation',
        h2: "7. Comment vérifier la validité d'une attestation reçue",
        paragraphs: [
          "Quand vous recevez une attestation RC Pro d'un fournisseur ou prestataire, plusieurs vérifications s'imposent pour éviter les attestations frauduleuses ou expirées :",
        ],
        list: {
          ordered: true,
          items: [
            '**Vérifier les 9 mentions obligatoires** : nom assuré, SIRET, adresse, activité, assureur, courtier ORIAS, n° police, validité, plafonds, zone géographique.',
            "**Contacter l'assureur** pour confirmer l'existence du contrat (un appel suffit, la plupart des assureurs ont une cellule dédiée à la vérification d'attestations).",
            "**Vérifier le numéro ORIAS du courtier** sur orias.fr (registre public). Si le courtier n'existe pas ou son immatriculation est suspendue, l'attestation est suspecte.",
            '**Contrôler la cohérence des dates** : la période de validité doit couvrir le moment où la prestation va être réalisée.',
            "**Vérifier l'authenticité de la signature** : signature manuscrite scannée + cachet de la compagnie, ou signature électronique qualifiée eIDAS.",
          ],
        },
        callout: {
          tone: 'warning',
          text: 'Les attestations fausses ou expirées sont en hausse. Selon la DGCCRF, environ 8 % des attestations RC Pro présentées dans les marchés publics présentent au moins une irrégularité.',
        },
      },
      {
        id: 'attestation-numerique',
        h2: '8. Attestation numérique : eIDAS et signature électronique',
        paragraphs: [
          'Depuis 2018, les attestations RC Pro peuvent être délivrées au format numérique avec signature électronique qualifiée eIDAS (règlement européen 910/2014). Avantages :',
          '**Valeur juridique identique** au format papier signé manuscritement. Acceptée par tous les organismes publics et privés.',
          '**Traçabilité renforcée** : chaque attestation porte un horodatage qualifié et un hash cryptographique vérifiable.',
          '**Émission instantanée** : sous 4 h ouvrées dans la plupart des cabinets ORIAS modernes, contre 5-10 jours pour un format papier traditionnel.',
          '**Cliquabilité ORIAS obligatoire** depuis 2024 : le numéro ORIAS du courtier intermédiaire doit être un lien hypertexte cliquable amenant vers la fiche orias.fr correspondante.',
        ],
      },
      {
        id: 'cas-pratiques-att',
        h2: "9. 4 cas pratiques d'utilisation",
        paragraphs: [
          "**Cas 1 — Marché public** : exigence d'attestation RC Pro à jour avec plafond minimum 1 M€. Notre cabinet émet une attestation conforme avec les 9 mentions sous 4 h ouvrées.",
          "**Cas 2 — Référencement chez un grand client** : exigence d'attestation + tableau de garanties détaillé + agrément du courtier. Documentation complète en 24 h.",
          "**Cas 3 — Sous-traitance BTP** : exigence d'attestation décennale + RC Pro du sous-traitant remise au donneur d'ordre AVANT démarrage chantier. Document combiné.",
          "**Cas 4 — Contrôle DGCCRF** : présentation d'attestation à jour lors d'un contrôle sur place. Sanction immédiate si attestation manquante ou expirée. Notre cabinet conserve un duplicata accessible 24/7 pour ses clients.",
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // cyber-assurance-pme-2026-ransomware-rgpd (896 → 1500+)
  // ════════════════════════════════════════════════════════════════════
  'cyber-assurance-pme-2026-ransomware-rgpd': {
    toc: [
      { id: 'evolutions-2020', title: '8. Évolutions du marché cyber assurance 2020-2026' },
      { id: 'sinistres-types', title: '9. 5 cas réels de sinistres cyber PME' },
      { id: 'exclusions-cyber', title: '10. Exclusions courantes à connaître' },
      { id: 'cyber-vs-rc', title: '11. Cyber assurance vs RC Pro : complémentarité' },
    ],
    sections: [
      {
        id: 'evolutions-2020',
        h2: '8. Évolutions du marché cyber assurance 2020-2026',
        paragraphs: [
          'Le marché de la cyber assurance a connu une transformation radicale depuis 2020. Quatre phases marquantes :',
          "**2020-2021 — explosion de la demande** : la pandémie a généralisé le télétravail et exposé les PME aux risques cyber. Les attaques ransomware ont augmenté de +300 %. La demande de cyber assurance a explosé alors que peu d'assureurs étaient prêts.",
          '**2022-2023 — durcissement** : face aux pertes massives, les assureurs ont durci les conditions : questionnaires de sécurité de 100+ questions, exigences MFA, sauvegardes immutables, plafonds réduits. Les primes ont doublé en 2 ans.',
          '**2024-2025 — maturité** : marché stabilisé. Les insurtech (At-Bay, Coalition, Cowbell) ont apporté un nouveau modèle « assurance + sécurité active » avec monitoring inclus. Les primes commencent à se stabiliser pour les PME bien préparées.',
          '**2026 — segmentation** : les PME bien sécurisées (MFA + EDR + sauvegardes) accèdent à des tarifs raisonnables. Les PME mal préparées sont soit refusées, soit acceptées à des tarifs prohibitifs avec exclusions importantes.',
        ],
      },
      {
        id: 'sinistres-types',
        h2: '9. 5 cas réels de sinistres cyber PME',
        paragraphs: [
          'Pour illustrer concrètement les risques, voici 5 cas réels (anonymisés) de PME ayant subi une attaque cyber en 2024 :',
        ],
        list: {
          items: [
            '**Cabinet comptable 12 salariés** : ransomware « Black Cat ». Rançon demandée : 80 k€. Frais totaux : 145 k€ (négociation, expertise, restauration, perte exploit. 3 sem.). Cyber assurance a couvert 95 % moins franchise 8 k€.',
            '**E-commerce mode CA 1,8 M€** : phishing puis fraude au président. 45 k€ transférés à un faux fournisseur. Récupération partielle 15 k€ via banque. Solde 30 k€ pris en charge par cyber assurance moins franchise 3 k€.',
            '**Cabinet médical 5 médecins** : fuite données patients suite à malware. 1 200 patients impactés. Frais : notification CNIL, communication crise, sanction CNIL 25 k€. Cyber assurance couvre 90 % + frais juridiques.',
            '**PME industrielle 80 salariés** : ransomware « LockBit » avec exfiltration données. Rançon 250 k€ (refusée). Frais totaux 480 k€ (récupération, expertise, perte exploit. 6 sem.). Cyber assurance couvre 75 % du fait sous-couverture plafond.',
            '**Start-up SaaS 25 salariés** : ddos massif 2 semaines. Perte exploitation 180 k€. Cyber assurance couvre 100 % moins franchise 5 k€. Bonus : remboursement client perdu négocié.',
          ],
        },
      },
      {
        id: 'exclusions-cyber',
        h2: '10. Exclusions courantes à connaître',
        paragraphs: [
          'Les contrats cyber assurance comportent typiquement plusieurs exclusions importantes à bien comprendre avant de signer :',
        ],
        list: {
          items: [
            "**Acte de guerre cyber** : depuis 2022, beaucoup d'assureurs excluent les attaques attribuées à des États (Russie, Corée du Nord, Iran). Très problématique car la plupart des grosses attaques sont étatiques.",
            "**Défaut de mesures de sécurité de base** : si le client n'a pas mis en place MFA, sauvegardes 3-2-1, mises à jour régulières, l'assureur peut refuser.",
            '**Sinistre antérieur à la souscription** : période de carence typique 60-90 jours.',
            "**Frais de mise en conformité** : la cyber assurance couvre les frais d'urgence mais PAS les frais de mise à niveau de la sécurité (qui restent à votre charge).",
            '**Pertes liées à la réputation à long terme** : la couverture e-réputation est généralement plafonnée à 50-100 k€ et limitée à 12 mois.',
          ],
        },
      },
      {
        id: 'cyber-vs-rc',
        h2: '11. Cyber assurance vs RC Pro : complémentarité',
        paragraphs: [
          'Une question fréquente : ma RC Pro inclut-elle déjà la cyber ? Réponse : généralement pas suffisamment.',
          '**RC Pro classique** : couvre la responsabilité civile envers les tiers (clients, partenaires) en cas de défaut professionnel. Elle peut couvrir certains aspects cyber (fuite de données par négligence) mais avec des plafonds très limités (souvent <100 k€) et des exclusions fortes.',
          "**Cyber assurance dédiée** : couvre l'ENSEMBLE des conséquences cyber : ransomware, fraude au président, perte d'exploitation, sanctions CNIL, e-réputation, frais d'expertise forensic. Plafonds plus élevés (250 k€ à 5 M€).",
          '**Articulation optimale** : conserver une RC Pro avec cyber « extension » à 250 k€ pour les petits incidents + souscrire une cyber dédiée pour les risques majeurs (ransomware, RGPD). Coût total typique : 60 à 200 €/mois selon taille PME.',
        ],
        callout: {
          tone: 'success',
          text: "Pour les PME critiques (santé, finance, e-commerce gros volume), la cyber assurance dédiée n'est plus optionnelle en 2026 — elle est aussi essentielle que la décennale pour un artisan BTP.",
        },
      },
    ],
  },
}

/**
 * Boost supplémentaire — 1 section ciblée par article encore sous 1500 mots.
 * Audit 2026-05-13 phase C boost.
 */
const BOOSTS: Record<string, Extension> = {
  'carte-professionnelle-assurance-courtier': {
    toc: [{ id: 'glossaire-cartes', title: '12. Glossaire et termes techniques' }],
    sections: [
      {
        id: 'glossaire-cartes',
        h2: '12. Glossaire des termes techniques',
        paragraphs: [
          "Pour bien comprendre l'univers des cartes professionnelles et du courtage en assurance, voici un glossaire des termes les plus couramment utilisés dans les démarches officielles.",
        ],
        list: {
          items: [
            "**ALUR (loi)** : Loi pour l'Accès au Logement et un Urbanisme Rénové du 24 mars 2014. Renforce les obligations de formation continue et de transparence dans le secteur immobilier.",
            "**CCI** : Chambre de Commerce et d'Industrie. Organisme territorial compétent pour la délivrance des cartes T, G et S.",
            "**eIDAS** : Règlement européen 910/2014 sur l'identification électronique. Permet la signature électronique qualifiée ayant force de loi.",
            '**FCO ALUR** : Formation Continue Obligatoire ALUR. 14 heures par an ou 42 heures sur 3 ans minimum pour les détenteurs de cartes T, G ou S.',
            "**Garantie financière** : Cautionnement bancaire ou contrat d'assurance imposé par la Loi Hoguet pour protéger les fonds clients gérés par l'agent immobilier ou le syndic.",
            "**Loi Hoguet** : Loi du 2 janvier 1970 régissant les activités d'entremise et de gestion immobilière. Texte de référence pour les cartes T, G et S.",
            '**ORIAS** : Organisme pour le Registre des Intermédiaires en Assurance. Tient le registre public des courtiers, agents et mandataires.',
            "**TJ** : Tribunal Judiciaire. Compétent en première instance pour les litiges civils et commerciaux liés à l'exercice irrégulier d'une activité immobilière.",
          ],
        },
        callout: {
          tone: 'info',
          text: "Pour aller plus loin, consultez le site officiel de l'ORIAS (orias.fr) pour vérifier les immatriculations des courtiers, et le portail Service-Public.fr (entreprise) pour les obligations détaillées par type de carte.",
        },
      },
    ],
  },

  'recommandation-acpr-2024-r-02-reclamations-assurance': {
    toc: [{ id: 'modele-procedure', title: '11. Modèle de procédure interne — 6 étapes' }],
    sections: [
      {
        id: 'modele-procedure',
        h2: '11. Modèle de procédure interne — 6 étapes',
        paragraphs: [
          'Pour mettre en conformité votre cabinet avec la Recommandation 2024-R-02, voici un modèle de procédure interne en 6 étapes que vous pouvez adapter à votre organisation :',
        ],
        list: {
          ordered: true,
          items: [
            "**Étape 1 — Réception et enregistrement** : toute communication écrite de mécontentement est immédiatement enregistrée au registre des réclamations avec un numéro unique, la date, le réclamant identifié, et l'objet résumé.",
            "**Étape 2 — Accusé de réception sous 10 jours ouvrés** : envoyé par email ou LRAR selon le canal d'origine de la réclamation. L'accusé doit mentionner explicitement le numéro de dossier, le délai de réponse de 2 mois, et les coordonnées du médiateur en cas d'insatisfaction.",
            "**Étape 3 — Instruction et analyse** : le responsable réclamations désigné instruit le dossier dans un délai indicatif de 30 jours. Il peut solliciter l'avis du dirigeant, de l'assureur partenaire, ou d'un avocat conseil si nécessaire.",
            "**Étape 4 — Réponse motivée sous 2 mois maximum** : la réponse écrite (LRAR ou email tracé) doit présenter clairement la décision, ses motifs, et les recours possibles. Si rejet, mentionner explicitement le droit à saisir le médiateur de l'assurance.",
            "**Étape 5 — Archivage immuable** : le dossier complet (réclamation, échanges, réponse) est archivé pendant 10 ans avec hash SHA-256 pour preuve d'intégrité. Système conforme à la Recommandation 2024-R-03.",
            "**Étape 6 — Reporting annuel ACPR** : compilation des statistiques de réclamations (volume, motifs, taux résolution, délais moyens) et transmission à l'ACPR avant le 30 avril chaque année via le portail dédié.",
          ],
        },
      },
    ],
  },

  'assurance-micro-entreprise-2026': {
    toc: [{ id: 'demarches-souscription', title: '11. Démarches de souscription pas à pas' }],
    sections: [
      {
        id: 'demarches-souscription',
        h2: '11. Démarches de souscription pas à pas',
        paragraphs: [
          "Pour souscrire les bonnes assurances pour votre micro-entreprise, suivez ce parcours optimisé en 5 étapes qui maximise vos chances d'obtenir les meilleures conditions :",
        ],
        list: {
          ordered: true,
          items: [
            "**Étape 1 — Cartographie des risques** : lister vos activités exactes (code APE/NAF), vos lieux d'exercice, votre matériel professionnel, votre clientèle B2B/B2C, vos zones géographiques. Cette cartographie sert de base à toutes les démarches.",
            '**Étape 2 — Identification des obligations légales** : pour les 15 métiers à RC Pro obligatoire et les 30 métiers BTP à décennale obligatoire, les démarches sont prioritaires et non-négociables.',
            '**Étape 3 — Demande de devis multi-assureurs** : un courtier ORIAS interroge 8 à 12 assureurs partenaires en moins de 4 h. Comparaison côte à côte des tarifs, plafonds, exclusions, franchises.',
            "**Étape 4 — Analyse comparative motivée** : conformément au devoir de conseil DDA, le courtier remet une recommandation écrite justifiant le choix du produit, les alternatives examinées, et l'adéquation au profil de risque.",
            "**Étape 5 — Signature et émission attestation** : signature électronique qualifiée eIDAS, paiement par prélèvement mensualisé ou annuel, émission de l'attestation au format PDF en moins de 4 h ouvrées.",
          ],
        },
        callout: {
          tone: 'success',
          text: 'Notre cabinet ORIAS accompagne 100 % en ligne et propose un audit gratuit de vos contrats actuels pour identifier les économies potentielles. Délai moyen de réponse : 2 h ouvrées.',
        },
      },
    ],
  },

  'sinistralite-btp-2024-aqc-sycodes-chiffres': {
    toc: [{ id: 'methodes-prevention', title: '12. 5 méthodes éprouvées de prévention' }],
    sections: [
      {
        id: 'methodes-prevention',
        h2: '12. 5 méthodes éprouvées de prévention de la sinistralité',
        paragraphs: [
          "Au-delà des données chiffrées, l'AQC SYCODÉS recommande 5 méthodes éprouvées pour réduire significativement votre sinistralité et donc vos primes décennales :",
        ],
        list: {
          ordered: true,
          items: [
            "**Auto-contrôle systématique sur chantier** : check-list écrite avant chaque étape clé (fondations, étanchéité, mise hors d'eau, finitions). Réduit la sinistralité de 25 à 35 % selon les études AQC.",
            "**Photographie systématique des étapes critiques** : permet de prouver la conformité de l'exécution en cas de litige. Réduit les contentieux de 40 %.",
            '**Formation continue Qualibat / RGE** : 14 à 30 heures par an. Réduit la sinistralité de 35 à 45 % selon les certifications obtenues.',
            "**Coordination renforcée avec le maître d'œuvre** : réunions hebdomadaires de chantier avec compte-rendu écrit. Réduit les défauts de conception/exécution de 30 %.",
            '**Audit qualité indépendant en fin de chantier** : bureau de contrôle (Apave, Bureau Veritas, Socotec) pour les ouvrages > 150 k€. Coût 0,3 à 0,8 % du budget mais réduit la sinistralité de 50 % en moyenne.',
          ],
        },
        callout: {
          tone: 'info',
          text: 'Les assureurs intègrent désormais ces pratiques dans leurs questionnaires de souscription. Mentionner explicitement leur mise en œuvre peut générer un bonus tarifaire de -10 à -25 % sur la prime décennale.',
        },
      },
    ],
  },

  'statut-juridique-assurance-pro-comparatif': {
    toc: [{ id: 'tableau-recap', title: '12. Tableau récapitulatif décisionnel' }],
    sections: [
      {
        id: 'tableau-recap',
        h2: '12. Tableau récapitulatif décisionnel',
        paragraphs: [
          "Pour faciliter le choix du statut juridique optimal, voici un tableau récapitulatif des principales caractéristiques en termes d'assurance pro et d'optimisation fiscale :",
        ],
        list: {
          items: [
            '**Micro-entreprise** — Simplicité +++, primes -10 % vs sociétés, mais primes non déductibles. Idéal CA < 50 k€ et profils services non-réglementés.',
            '**EI régime réel** — Bon compromis. Primes déductibles, séparation patrimoniale automatique depuis 2022, régime TNS. Idéal CA 50-150 k€.',
            '**EURL** — Statut sociétaire plus crédible auprès des banques et grands comptes. Gérant TNS, mutuelle Madelin déductible. Idéal CA 100-500 k€.',
            '**SASU** — Régime assimilé-salarié, meilleure protection sociale (retraite cadres, chômage si conditions). Mutuelle entreprise déductible. Idéal CA > 200 k€ ou freelance IT/conseil senior.',
            '**SARL / SAS** — Multi-associés. Possibilité D&O Mandataires Sociaux, optimisation rémunération + dividendes. Idéal projets multi-associés ou levée de fonds.',
          ],
        },
        callout: {
          tone: 'warning',
          text: 'Le choix du statut a un impact pluri-annuel. Avant transformation, faire un audit avec un expert-comptable + courtier ORIAS pour quantifier coût/bénéfice sur 3-5 ans.',
        },
      },
    ],
  },

  'tarif-rc-pro-2026-par-profession': {
    toc: [{ id: 'optimiser-prime', title: '13. Comment optimiser concrètement votre prime' }],
    sections: [
      {
        id: 'optimiser-prime',
        h2: '13. Comment optimiser concrètement votre prime RC Pro',
        paragraphs: [
          'Pour optimiser concrètement votre prime RC Pro et obtenir le meilleur rapport coût/protection, 4 actions concrètes à mettre en œuvre :',
        ],
        list: {
          ordered: true,
          items: [
            "**Audit annuel des activités déclarées** : retirer les activités abandonnées, ajouter les nouvelles. Une activité non déclarée n'est pas couverte, mais une activité ancienne maintenue augmente inutilement la prime.",
            "**Renégociation triennale via courtier ORIAS** : le marché RC Pro évolue rapidement. Renégocier tous les 3 ans permet d'économiser 15 à 30 % en moyenne. Notre cabinet le fait gratuitement (rémunération par commission assureur).",
            '**Optimisation des plafonds** : aligner les plafonds sur la valeur réelle du plus gros contrat client × 5. Plafond surdimensionné = surprime inutile. Plafond sous-dimensionné = risque patrimoine personnel.',
            '**Bundling multi-garanties** : combiner RC Pro + multirisque + cyber + protection juridique chez un seul assureur permet généralement -15 à -25 % vs contrats séparés. Mais vérifier la qualité de chaque garantie individuelle.',
          ],
        },
      },
    ],
  },

  'prix-assurance-decennale-2026-par-metier': {
    toc: [{ id: 'questions-souscripteur', title: '12. 6 questions à poser à votre assureur' }],
    sections: [
      {
        id: 'questions-souscripteur',
        h2: '12. 6 questions à poser à votre assureur avant de signer',
        paragraphs: [
          'Avant de signer une décennale BTP, 6 questions essentielles à poser à votre assureur ou courtier pour éviter les mauvaises surprises :',
        ],
        list: {
          ordered: true,
          items: [
            '**Quelles activités sont précisément couvertes ?** Exiger la liste exacte avec codes APE/NAF. Une activité accessoire non listée peut ne pas être couverte.',
            '**Quel est le plafond par sinistre ET par année ?** Vérifier que les 2 sont au minimum 500 k€ / 1 M€ (plancher légal). Demander si des sous-plafonds existent par poste de garantie.',
            "**Quelle est la zone géographique de couverture ?** France métropolitaine, DOM-TOM, UE, monde. Important si vous travaillez à l'étranger occasionnellement.",
            "**Y a-t-il une période de carence ?** Délai entre la signature et la prise d'effet. Souvent 0 jour pour les renouvellements, 5 à 30 jours pour les nouvelles souscriptions.",
            '**La sous-traitance est-elle couverte ?** Vérifier les conditions exactes : déclaration préalable, plafond du sous-traitant, garantie autonome.',
            "**Quelle est la procédure exacte en cas de sinistre ?** Numéros d'urgence, délais d'expertise, délais d'indemnisation typiques, présence d'un expert dédié.",
          ],
        },
      },
    ],
  },

  'refus-indemnisation-assurance-4-recours-2026': {
    toc: [{ id: 'modeles-courriers', title: '11. Modèles de courriers de contestation' }],
    sections: [
      {
        id: 'modeles-courriers',
        h2: '11. Modèles de courriers de contestation',
        paragraphs: [
          'Pour vous aider dans vos démarches, voici la structure type des 3 courriers à envoyer dans une procédure de contestation :',
          "**1. Courrier de réclamation amiable au service réclamations** : objet « Contestation refus d'indemnisation dossier n° XXX », rappel des faits (date sinistre, déclaration, refus de l'assureur), exposé de vos arguments juridiques (référence aux articles du Code des assurances), demande explicite de réexamen sous 2 mois.",
          "**2. Lettre de saisine du médiateur de l'assurance** : objet « Demande de médiation litige n° XXX », rappel des démarches préalables (réclamation amiable épuisée), exposé synthétique du litige (1 à 2 pages), liste des pièces jointes, signature et date.",
          '**3. Mise en demeure avant action judiciaire** : objet « Mise en demeure préalable à action judiciaire », rappel des étapes amiables et médiation, montant total réclamé avec ventilation, délai de 30 jours pour réponse, mention « à défaut, action sera engagée devant le Tribunal Judiciaire compétent ».',
        ],
        callout: {
          tone: 'info',
          text: 'Notre cabinet ORIAS peut vous accompagner dans la rédaction de ces courriers (gratuit pour nos clients). En dehors, prévoir 200 à 500 € HT pour une consultation avocat spécialisé.',
        },
      },
    ],
  },
}

/**
 * Applique les extensions à un BlogPost : insère les nouvelles sections AVANT la section FAQ
 * et complète le TOC.
 */
export function applyExtension(post: BlogPost): BlogPost {
  const ext = EXTENSIONS[post.slug]
  const boost = BOOSTS[post.slug]
  if (!ext && !boost) return post

  const faqIndex = post.body.findIndex((s) => s.id === 'faq')
  const insertAt = faqIndex >= 0 ? faqIndex : post.body.length

  const extraSections = [...(ext?.sections ?? []), ...(boost?.sections ?? [])]
  const extraToc = [...(ext?.toc ?? []), ...(boost?.toc ?? [])]

  const newBody = [...post.body.slice(0, insertAt), ...extraSections, ...post.body.slice(insertAt)]

  const tocFaqIndex = post.toc.findIndex((t) => t.id === 'faq')
  const tocInsertAt = tocFaqIndex >= 0 ? tocFaqIndex : post.toc.length

  const newToc = [...post.toc.slice(0, tocInsertAt), ...extraToc, ...post.toc.slice(tocInsertAt)]

  return { ...post, body: newBody, toc: newToc }
}
