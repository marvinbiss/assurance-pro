/**
 * Référentiel des termes techniques assurance (glossaire).
 * Utilisé par <GlossaryLink> pour tooltips contextuels + Schema.org DefinedTerm.
 *
 * Bénéfice SEO : long-tail KW + autorité E-E-A-T (NerdWallet a 5 000+ termes).
 */

export interface GlossaryTerm {
  id: string /* slug stable, ex: "orias" */
  term: string /* affichage, ex: "ORIAS" */
  termCode?: string /* acronyme officiel ex: "ORIAS" */
  shortDef: string /* tooltip <150 chars */
  fullDef: string /* page glossaire complète */
  related?: string[] /* IDs termes connexes */
  legalRef?: string /* article de loi */
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'orias',
    term: 'ORIAS',
    termCode: 'ORIAS',
    shortDef:
      'Organisme pour le Registre unique des Intermédiaires en Assurance, banque et finance.',
    fullDef:
      "L'ORIAS est l'autorité française qui tient le registre obligatoire des intermédiaires en assurance (courtiers, agents, mandataires), en banque et en finance. Tout courtier doit être inscrit pour exercer légalement (art. R. 511-1 C. assur.). Vérifiable sur orias.fr.",
    legalRef: 'Art. R. 511-1 C. assur.',
    related: ['acpr', 'csca', 'dda'],
  },
  {
    id: 'acpr',
    term: 'ACPR',
    termCode: 'ACPR',
    shortDef:
      'Autorité de Contrôle Prudentiel et de Résolution, régulateur des assureurs et banques en France.',
    fullDef:
      "L'ACPR est une autorité administrative indépendante adossée à la Banque de France. Elle contrôle les assureurs, mutuelles, banques et intermédiaires. Publie des Recommandations contraignantes (ex: 2024-R-02 sur transparence intermédiaire, 2024-R-03 sur devoir conseil).",
    legalRef: 'Art. L. 612-1 C. mon. fin.',
    related: ['orias', 'dda'],
  },
  {
    id: 'dda',
    term: 'DDA',
    termCode: 'DDA',
    shortDef:
      "Directive sur la Distribution d'Assurances (UE 2016/97), encadre la commercialisation d'assurance.",
    fullDef:
      "La DDA (Directive Distribution d'Assurances), transposée en droit français en 2018, impose : devoir de conseil (analyse exigences ou besoins), transparence rémunération intermédiaire, formation continue 15h par an des distributeurs, gouvernance produit (POG).",
    legalRef: 'Directive UE 2016/97 + art. L. 521-1 C. assur.',
    related: ['acpr', 'csca', 'pog'],
  },
  {
    id: 'csca',
    term: 'CSCA',
    termCode: 'CSCA',
    shortDef:
      "Chambre Syndicale des Courtiers d'Assurances, principal syndicat professionnel français.",
    fullDef:
      "La CSCA fédère 1 500+ cabinets de courtage en assurance représentant 80% du chiffre d'affaires courtage français. Elle défend les intérêts professionnels, propose formation et certification, et dialogue avec ACPR ou Bercy.",
    related: ['orias', 'acpr'],
  },
  {
    id: 'loi-spinetta',
    term: 'Loi Spinetta',
    shortDef:
      "Loi 1978 imposant l'assurance décennale obligatoire pour tous les constructeurs BTP.",
    fullDef:
      "Loi n° 78-12 du 4 janvier 1978 — instaure le régime de la responsabilité décennale obligatoire (art. L. 241-1 C. assur.) pour TOUS les constructeurs (artisans BTP, maîtres d'œuvre, architectes). Sanctions absence : 75 000 € amende + 6 mois prison + interdiction d'exercer.",
    legalRef: 'Loi n° 78-12 du 4 janvier 1978 + art. L. 241-1 C. assur.',
    related: ['decennale', 'aqc', 'rge'],
  },
  {
    id: 'decennale',
    term: 'Décennale',
    shortDef:
      "Garantie obligatoire couvrant pendant 10 ans les dommages affectant la solidité d'un ouvrage.",
    fullDef:
      "La garantie décennale (art. 1792 C. civ.) couvre pendant 10 ans à compter de la réception les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination. Obligatoire pour tous les constructeurs (Loi Spinetta).",
    legalRef: 'Art. 1792 C. civ. + Loi Spinetta',
    related: ['loi-spinetta', 'rc-pro', 'dommages-ouvrage'],
  },
  {
    id: 'rc-pro',
    term: 'RC Pro',
    termCode: 'RC Pro',
    shortDef:
      "Responsabilité civile professionnelle — couvre les dommages causés à des tiers dans l'exercice du métier.",
    fullDef:
      "La RC Pro (Responsabilité Civile Professionnelle) couvre les conséquences pécuniaires des dommages corporels, matériels et immatériels causés à des tiers (clients, partenaires) dans l'exercice de l'activité professionnelle. OBLIGATOIRE pour les professions réglementées (médecins, avocats, agents immobiliers, experts-comptables).",
    legalRef: 'Art. 1147 C. civ. + lois spécifiques (Hoguet, Kouchner, Ord. 1945)',
    related: ['decennale', 'plafond-garantie', 'franchise'],
  },
  {
    id: 'aqc',
    term: 'AQC',
    termCode: 'AQC',
    shortDef:
      'Agence Qualité Construction — observatoire référence de la sinistralité BTP en France.',
    fullDef:
      "L'AQC (Agence Qualité Construction) publie chaque année le rapport SYCODÉS qui mesure la sinistralité par métier BTP : fréquence, coût moyen, causes. Référence statistique pour la tarification décennale.",
    related: ['decennale', 'rge'],
  },
  {
    id: 'loi-madelin',
    term: 'Loi Madelin',
    shortDef:
      'Régime fiscal permettant aux TNS de déduire leurs cotisations prévoyance, santé ou retraite.',
    fullDef:
      'Loi du 11 février 1994 (art. 154 bis CGI) permettant aux Travailleurs Non-Salariés (AE, EI, EURL, gérants majoritaires) de déduire fiscalement les cotisations versées aux contrats de prévoyance, santé et retraite. Plafond 2026 : 3,75% PASS + 7% au-delà ≈ 7 200 € par an pour CA 100k€.',
    legalRef: 'Art. 154 bis CGI',
    related: ['tns', 'prevoyance', 'mutuelle-tns'],
  },
  {
    id: 'tns',
    term: 'TNS',
    termCode: 'TNS',
    shortDef: 'Travailleur Non Salarié — auto-entrepreneur, EI, EURL, gérant majoritaire SARL.',
    fullDef:
      'Statut social applicable aux travailleurs indépendants : auto-entrepreneurs, entreprises individuelles, EURL gérants majoritaires, SARL gérants majoritaires, professions libérales. Cotisations sociales URSSAF ou CIPAV. Bénéficient du régime fiscal Madelin.',
    related: ['loi-madelin', 'mutuelle-tns', 'prevoyance'],
  },
  {
    id: 'loi-ani',
    term: 'Loi ANI',
    shortDef:
      'Loi 2013 imposant la mutuelle santé collective obligatoire pour tous les salariés du privé.',
    fullDef:
      "Loi du 14 juin 2013 sur l'Accord National Interprofessionnel — depuis le 1er janvier 2016, toute entreprise privée ≥1 salarié doit proposer une mutuelle santé collective avec part employeur ≥50% (art. L. 911-7 CSS). Sanctions absence : redressement URSSAF.",
    legalRef: 'Art. L. 911-7 CSS',
    related: ['mutuelle-pro', 'tns', 'loi-madelin'],
  },
  {
    id: 'rge',
    term: 'RGE',
    termCode: 'RGE',
    shortDef:
      "Reconnu Garant de l'Environnement — qualification requise pour MaPrimeRénov' et CEE.",
    fullDef:
      "Le label RGE (Reconnu Garant de l'Environnement) qualifie les artisans BTP éligibles aux aides publiques (MaPrimeRénov', CEE). Conditionne la décennale RGE photovoltaïque (sur-prime +30-90%). Délivré par Qualibat, Qualit'EnR, Qualifelec.",
    related: ['decennale', 'photovoltaique', 'maprimerenov'],
  },
  {
    id: 'plafond-garantie',
    term: 'Plafond garantie',
    shortDef: "Montant maximum d'indemnisation par sinistre ou par année d'assurance.",
    fullDef:
      "Le plafond de garantie est le montant maximum que l'assureur indemnisera par sinistre (ou par année). Au-delà, l'assuré supporte le surcoût. Plafonds standards RC Pro : 500 000 € (TPE), 1 000 000 € (PME), 5 000 000 € (ETI ou contrats publics).",
    related: ['rc-pro', 'franchise'],
  },
  {
    id: 'franchise',
    term: 'Franchise',
    shortDef:
      "Montant à votre charge en cas de sinistre, déduit de l'indemnité versée par l'assureur.",
    fullDef:
      "La franchise est la somme qui reste à la charge de l'assuré en cas de sinistre. Elle est déduite de l'indemnité. Plus elle est élevée, plus la cotisation annuelle baisse (jusqu'à -30%). Paliers standards : 300/750/1500/3000/5000 €.",
    related: ['rc-pro', 'plafond-garantie', 'decennale'],
  },
  {
    id: 'attestation-decennale',
    term: 'Attestation décennale',
    shortDef:
      "Document remis par l'assureur prouvant que l'artisan est couvert par une décennale en cours.",
    fullDef:
      "L'attestation décennale est délivrée par l'assureur et doit comporter 11 mentions obligatoires (arrêté du 23 janvier 2024) : identité assureur ou assuré, numéro police, période validité, activités couvertes, zone géographique, garanties + plafonds, mention Loi Spinetta, référence intermédiaire ORIAS, modalités réclamation, date émission.",
    legalRef: 'Arrêté du 23 janvier 2024',
    related: ['decennale', 'loi-spinetta', 'orias'],
  },
  {
    id: 'pog',
    term: 'POG',
    termCode: 'POG',
    shortDef: 'Product Oversight & Governance — obligation DDA de gouvernance produits assurance.',
    fullDef:
      "Le POG (Product Oversight & Governance) est l'obligation imposée par la DDA aux concepteurs et distributeurs de produits d'assurance de mettre en place un dispositif de gouvernance produit : analyse marché cible, tests, surveillance continue, retrait si inadéquation.",
    legalRef: 'Art. L. 521-2 C. assur.',
    related: ['dda', 'acpr'],
  },
  {
    id: 'dommages-ouvrage',
    term: 'Dommages ouvrage',
    termCode: 'DO',
    shortDef:
      "Assurance souscrite par le maître d'ouvrage pour réparer rapidement les sinistres décennaux.",
    fullDef:
      "L'assurance Dommages Ouvrage (DO) est souscrite par le maître d'ouvrage (propriétaire) AVANT démarrage chantier (art. L. 242-1 C. assur.). Elle préfinance la réparation des sinistres décennaux sans attendre l'expertise de responsabilité. Obligatoire pour vente avant 10 ans.",
    legalRef: 'Art. L. 242-1 C. assur.',
    related: ['decennale', 'loi-spinetta'],
  },
  {
    id: 'siret',
    term: 'SIRET',
    termCode: 'SIRET',
    shortDef: "Identifiant unique 14 chiffres d'un établissement français à l'INSEE.",
    fullDef:
      "Le SIRET (Système d'Identification du Répertoire des ÉTablissements) est un numéro à 14 chiffres : SIREN (9) + NIC (5). Il identifie un établissement spécifique d'une entreprise. Obligatoire sur factures et documents commerciaux (art. L. 441-9 C. com.).",
    legalRef: 'Art. L. 441-9 C. com.',
    related: ['siren', 'kbis'],
  },
  {
    id: 'rgpd',
    term: 'RGPD',
    termCode: 'RGPD',
    shortDef:
      'Règlement Général sur la Protection des Données (UE 2016/679) en vigueur depuis 2018.',
    fullDef:
      "Le RGPD (Règlement UE 2016/679) impose à toute entreprise traitant des données personnelles : registre des traitements, consentement explicite, droits (accès, rectification, suppression ou portabilité), notification breach 72h, DPO si traitement à grande échelle. Sanctions : jusqu'à 4% CA mondial OU 20 M€.",
    legalRef: 'Règlement UE 2016/679 + Loi Informatique et Libertés modifiée',
    related: ['cyber-assurance', 'cnil'],
  },
  {
    id: 'cnil',
    term: 'CNIL',
    termCode: 'CNIL',
    shortDef:
      "Commission Nationale de l'Informatique et des Libertés, autorité française de protection des données.",
    fullDef:
      "La CNIL est l'autorité administrative française chargée de veiller à l'application du RGPD. Elle reçoit les notifications de breach (sous 72h obligatoire), instruit les plaintes, mène des contrôles, et prononce des sanctions financières (jusqu'à 4% CA mondial).",
    related: ['rgpd', 'cyber-assurance'],
  },
]

const TERMS_BY_ID = new Map(GLOSSARY_TERMS.map((t) => [t.id, t]))

export function getGlossaryTerm(id: string): GlossaryTerm | undefined {
  return TERMS_BY_ID.get(id)
}

export function getAllGlossaryTerms(): GlossaryTerm[] {
  return GLOSSARY_TERMS
}
