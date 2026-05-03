/**
 * IPID — Insurance Product Information Document
 * Document d'information standardisé conforme art. 20-8 directive UE 2016/97 (DDA)
 * et règlement d'exécution UE 2017/1469.
 *
 * Format prescrit : 2 pages A4, sections obligatoires, icônes prévues.
 * Ces données alimentent les pages /ipid/[product] et serviront à générer le PDF.
 */

export interface IpidProduct {
  slug: string
  productName: string
  productType: string
  insurer: string
  insurerOrias?: string
  whatIsIt: string
  whatIsCovered: string[]
  whatIsNotCovered: string[]
  restrictions: string[]
  whereCovered: string[]
  obligations: string[]
  paymentTerms: string
  duration: string
  termination: string
}

export const IPID_PRODUCTS: Record<string, IpidProduct> = {
  'decennale-btp': {
    slug: 'decennale-btp',
    productName: 'Garantie Décennale Artisans BTP',
    productType: 'Responsabilité Civile Décennale (Loi Spinetta — art. L. 241-1 C. assur.)',
    insurer: 'Compagnie partenaire (variable selon profil)',
    whatIsIt:
      'Couverture obligatoire des dommages compromettant la solidité de l\'ouvrage ou le rendant impropre à sa destination, pendant 10 ans à compter de la réception des travaux.',
    whatIsCovered: [
      'Dommages affectant la solidité de l\'ouvrage (gros œuvre, fondations, charpente)',
      'Dommages rendant l\'ouvrage impropre à sa destination (étanchéité, fissures structurelles)',
      'Travaux de reprise et frais d\'expertise associés',
      'Pré-financement par l\'assureur (avance sur indemnisation)',
    ],
    whatIsNotCovered: [
      'Dommages purement esthétiques (sans atteinte à la solidité ou destination)',
      'Travaux non déclarés ou hors zone géographique couverte',
      'Sinistres résultant d\'un défaut d\'entretien manifeste',
      'Dommages aux biens existants non concernés par le chantier (sauf option)',
      'Travaux à l\'étranger (sauf extension TRC internationale)',
    ],
    restrictions: [
      'Activités déclarées limitativement (corps de métier expressément prévus aux CG)',
      'Plafond annuel d\'activité (CA) à respecter',
      'Franchise applicable selon profil',
    ],
    whereCovered: [
      'France métropolitaine + DROM-COM (selon contrat)',
      'Travaux réalisés sur le territoire couvert uniquement',
    ],
    obligations: [
      'Déclarer tout changement d\'activité ou de CA dans les 15 jours',
      'Mentionner la décennale (assureur, n° police, période, zone) sur tous devis et factures (obligation 2024)',
      'Déclarer tout sinistre ou réclamation dans les 5 jours ouvrés',
      'Maintenir la couverture sans interruption pendant la période décennale',
    ],
    paymentTerms:
      'Cotisation annuelle payable d\'avance, en une ou plusieurs échéances (mensuelle/trimestrielle/annuelle).',
    duration: 'Tacite reconduction annuelle. Garantie subséquente 10 ans après cessation d\'activité.',
    termination:
      'Résiliation à échéance principale avec préavis 2 mois. Loi Hamon : à tout moment après 1 an de souscription.',
  },
  'rc-pro-services': {
    slug: 'rc-pro-services',
    productName: 'RC Professionnelle Prestataires de Services',
    productType: 'Responsabilité Civile Professionnelle (consultants, freelances, agences)',
    insurer: 'Compagnie partenaire (variable selon profil)',
    whatIsIt:
      'Couverture des dommages corporels, matériels et immatériels causés à des tiers (clients, partenaires) dans le cadre de votre activité professionnelle.',
    whatIsCovered: [
      'Erreur, omission ou négligence professionnelle',
      'Dommages immatériels consécutifs à une faute (manque à gagner client)',
      'Frais de défense et recours (protection juridique pro)',
      'Garantie subséquente : sinistres déclarés après cessation d\'activité',
    ],
    whatIsNotCovered: [
      'Dommages intentionnels',
      'Sanctions pénales et amendes',
      'Activités non déclarées au contrat',
      'Pertes financières sans dommage matériel ou faute prouvée (sauf option cyber)',
      'Cyber-attaques et fuites de données (sauf option dédiée)',
    ],
    restrictions: [
      'Activités professionnelles déclarées limitativement',
      'Plafond annuel et par sinistre selon profil',
      'Franchise applicable',
    ],
    whereCovered: [
      'France métropolitaine et DROM-COM',
      'Union européenne (selon contrat)',
      'Monde entier hors USA/Canada (selon option internationale)',
    ],
    obligations: [
      'Déclarer toute évolution significative de l\'activité',
      'Déclarer tout sinistre ou réclamation dans les 5 jours ouvrés',
      'Conserver les preuves (contrats, mails, livrables)',
    ],
    paymentTerms: 'Cotisation annuelle, mensualisable selon contrat.',
    duration: 'Tacite reconduction annuelle.',
    termination: 'Loi Hamon : à tout moment après 1 an. Préavis 2 mois à échéance.',
  },
  'mutuelle-tns-madelin': {
    slug: 'mutuelle-tns-madelin',
    productName: 'Mutuelle Santé TNS Madelin',
    productType: 'Complémentaire santé pour Travailleurs Non-Salariés — Loi Madelin 1994',
    insurer: 'Compagnie partenaire (variable selon profil)',
    whatIsIt:
      'Complémentaire santé responsable et solidaire, ouvrant droit à la déduction Madelin (art. 154 bis CGI) pour les TNS (gérants TNS, EI, AE, professions libérales).',
    whatIsCovered: [
      'Hospitalisation (frais de séjour, chambre individuelle, honoraires)',
      'Soins courants (consultations, pharmacie, analyses)',
      'Optique, dentaire, audioprothèse (selon panier 100 % santé)',
      'Médecines douces (selon formule)',
    ],
    whatIsNotCovered: [
      'Soins non remboursés par la Sécurité sociale (sauf option)',
      'Cures thermales hors prescription',
      'Chirurgie esthétique non réparatrice',
    ],
    restrictions: [
      'Contrat responsable : respect des plafonds réglementaires',
      'Délais de carence selon postes (hospitalisation programmée, dentaire, optique)',
    ],
    whereCovered: ['France', 'Étranger : remboursement sur la base des tarifs français (sauf option)'],
    obligations: [
      'Justifier statut TNS (extrait Kbis, INSEE) pour bénéficier de la déduction Madelin',
      'Régularité des cotisations (sous peine de perte du caractère Madelin)',
      'Déclarer tout changement de statut (passage en SAS notamment)',
    ],
    paymentTerms: 'Cotisation mensuelle ou trimestrielle, déductible du résultat fiscal pro (plafond Madelin).',
    duration: 'Tacite reconduction annuelle.',
    termination: 'Loi Hamon : à tout moment après 1 an. Préavis 2 mois à échéance.',
  },
  'cyber-pme': {
    slug: 'cyber-pme',
    productName: 'Assurance Cyber TPE/PME',
    productType: 'Cyber-risques et atteintes aux données personnelles',
    insurer: 'Compagnie partenaire (variable selon profil)',
    whatIsIt:
      'Couverture des conséquences financières d\'une cyber-attaque (rançongiciel, intrusion, fuite RGPD) et assistance technique 24/7.',
    whatIsCovered: [
      'Frais de gestion de crise (forensic, communication, notification CNIL)',
      'Pertes d\'exploitation suite à arrêt SI',
      'Frais de restauration des données',
      'Responsabilité civile en cas de fuite de données tiers',
      'Frais juridiques RGPD',
      'Cyber-rançon (selon contrat et conformité légale)',
    ],
    whatIsNotCovered: [
      'Sinistres antérieurs à la souscription',
      'Sanctions pénales personnelles',
      'Atteintes liées à un défaut grossier de mise à jour',
      'Cyber-guerre et terrorisme étatique',
    ],
    restrictions: [
      'Mesures de sécurité minimales requises (MFA, sauvegardes, EDR)',
      'Audit préalable possible selon profil',
      'Plafonds par sinistre et par année',
    ],
    whereCovered: ['Monde entier (sauf pays sous embargo)'],
    obligations: [
      'Maintenir les mesures de sécurité déclarées',
      'Déclarer tout incident dans les 72 h',
      'Coopérer avec l\'équipe de gestion de crise désignée',
    ],
    paymentTerms: 'Cotisation annuelle, mensualisable selon contrat.',
    duration: 'Tacite reconduction annuelle.',
    termination: 'Loi Hamon : à tout moment après 1 an.',
  },
  'multirisque-pro': {
    slug: 'multirisque-pro',
    productName: 'Multirisque Professionnelle',
    productType: 'Couverture des locaux, biens et activité professionnelle',
    insurer: 'Compagnie partenaire (variable selon profil)',
    whatIsIt:
      'Protection complète des locaux pro (incendie, vol, dégâts des eaux, bris de glace) + RC Pro + perte d\'exploitation + protection juridique.',
    whatIsCovered: [
      'Incendie, explosion, foudre',
      'Dégâts des eaux',
      'Vol et vandalisme',
      'Bris de glace, bris de matériel',
      'Catastrophes naturelles et tempêtes',
      'Perte d\'exploitation suite à sinistre',
      'RC Exploitation et RC Pro',
    ],
    whatIsNotCovered: [
      'Dommages volontaires',
      'Vétusté et défaut d\'entretien',
      'Activités non déclarées',
      'Cyber-risques (sauf option dédiée)',
    ],
    restrictions: [
      'Vétusté appliquée selon barème',
      'Plafond mobilier et matériel selon déclaration',
      'Mesures de prévention (alarme, télésurveillance) selon zone',
    ],
    whereCovered: ['Locaux assurés', 'Déplacements pro selon option'],
    obligations: [
      'Déclarer tout changement de superficie ou d\'activité',
      'Déclarer tout sinistre dans les 5 jours ouvrés (2 jours si vol)',
      'Maintenir les dispositifs de sécurité',
    ],
    paymentTerms: 'Cotisation annuelle, mensualisable.',
    duration: 'Tacite reconduction annuelle.',
    termination: 'Loi Hamon : à tout moment après 1 an.',
  },
  'vtc': {
    slug: 'vtc',
    productName: 'Assurance VTC Professionnelle',
    productType: 'Responsabilité Civile + assurance auto VTC obligatoire',
    insurer: 'Compagnie partenaire (variable selon profil)',
    whatIsIt:
      'Assurance dédiée aux chauffeurs VTC inscrits au registre EVTC. Conforme exigences plateformes (Uber, Bolt, Heetch) et préfecture.',
    whatIsCovered: [
      'Responsabilité Civile Circulation (obligation art. L. 211-1)',
      'Dommages tous accidents (selon formule)',
      'Vol, incendie, bris de glace',
      'Assistance 24/7 + véhicule de remplacement',
      'Protection juridique conducteur',
      'Garantie passagers transportés',
    ],
    whatIsNotCovered: [
      'Conduite sans carte VTC valide',
      'Conduite sans inscription au Registre des EVTC',
      'Usage perso non déclaré comme tel',
      'Dommages volontaires',
    ],
    restrictions: [
      'Carte VTC en cours de validité obligatoire',
      'Inscription EVTC à jour',
      'Antécédents (sinistres, retraits permis) selon barème',
    ],
    whereCovered: ['France métropolitaine', 'UE selon option'],
    obligations: [
      'Déclarer toute infraction grave ou retrait de permis',
      'Déclarer tout sinistre dans les 5 jours ouvrés (2 jours si vol)',
      'Maintenir la carte VTC et l\'inscription EVTC',
    ],
    paymentTerms: 'Cotisation mensuelle ou annuelle.',
    duration: 'Tacite reconduction annuelle.',
    termination: 'Loi Hamon : à tout moment après 1 an.',
  },
}

export function getIpidProduct(slug: string): IpidProduct | undefined {
  return IPID_PRODUCTS[slug]
}

export function getIpidSlugs(): string[] {
  return Object.keys(IPID_PRODUCTS)
}
