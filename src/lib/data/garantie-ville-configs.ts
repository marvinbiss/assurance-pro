import type { GarantieVilleConfig } from '@/components/assurance/GarantieVilleTemplate'

export const MULTIRISQUE_PRO_CONFIG: GarantieVilleConfig = {
  garantieSlug: 'multirisque-pro',
  garantieLabel: 'Multirisque pro',
  tagline:
    'Couverture complète des locaux, biens et activité professionnelle pour les commerces, ESN, agences et bureaux d’études de {ville}.',
  legalRef: 'COUVERTURE COMPLÈTE LOCAUX & BIENS',
  priceFrom: '320€ par an',
  audience: 'Pros locaux',
  audienceMetric: 'freelancesEstime',
  sections: [
    {
      h2: 'Pourquoi une multirisque pro à {ville} ?',
      paragraphs: [
        'La Multirisque Professionnelle (MRP) est l’assurance « tout-en-un » qui protège vos locaux, votre matériel, vos stocks et votre RC Exploitation. À {ville} comme partout en France, elle n’est pas légalement obligatoire mais elle est exigée par 90 % des bailleurs commerciaux et par tous les marchés publics.',
        'En zone {zonage}, le coût moyen d’un sinistre incendie ou dégât des eaux dans un local commercial est de 18 000 à 45 000 €. La MRP couvre également la perte d’exploitation pendant la période d’arrêt — souvent décisive pour la survie d’une TPE.',
      ],
    },
    {
      h2: 'Tarifs multirisque {ville}',
      paragraphs: [
        'Tarifs indicatifs annuels pour un local pro de 50 à 200 m² à {ville} (zonage {zonage}, hors industries lourdes) :',
      ],
      bullets: [
        'Bureau — agence (50-100 m²) : 320 € – 750 € HT',
        'Commerce de proximité (100-200 m²) : 600 € – 1 800 € HT',
        'Atelier — dépôt : 1 200 € – 4 500 € HT selon stocks',
        'Restaurant — bar : 1 500 € – 5 000 € HT (risque incendie cuisine)',
      ],
    },
    {
      h2: 'Spécificités du marché à {ville}',
      paragraphs: [
        '{ville} est située en {region}, dans le département {departement} ({depCode}). Le tissu de TPE locales (~{ville-freelances} commerces et services) influence les barèmes assureurs.',
      ],
      bullets: [
        'Densité urbaine ({zonage}) — impact tarif vol — vandalisme',
        'Risques climatiques régionaux (tempêtes, inondations)',
        'Catastrophes naturelles : franchise légale 380 € (1 520 € pro)',
        'Zone urbaine sensible : majoration éventuelle',
      ],
    },
  ],
}

export const MUTUELLE_PRO_CONFIG: GarantieVilleConfig = {
  garantieSlug: 'mutuelle-pro',
  garantieLabel: 'Mutuelle pro — TNS Madelin',
  tagline:
    'Mutuelle santé Loi Madelin déductible fiscalement pour les TNS de {ville} : freelances, gérants, professions libérales.',
  legalRef: 'LOI MADELIN — ART. 154 BIS CGI',
  priceFrom: '45€ par mois',
  audience: 'TNS — freelances',
  audienceMetric: 'freelancesEstime',
  sections: [
    {
      h2: 'Mutuelle TNS Madelin à {ville}',
      paragraphs: [
        'La Loi Madelin (1994) ouvre droit à la déduction fiscale du résultat professionnel pour les TNS — Entrepreneurs Individuels, gérants majoritaires SARL ou EURL, auto-entrepreneurs et professions libérales. Pour un freelance à {ville} avec 70 k€ de bénéfice et TMI 30 %, l’économie d’impôt + URSSAF atteint 50-55 % de la cotisation.',
        'À {ville}, ~{ville-freelances} TNS sont éligibles. Notre cabinet ORIAS analyse votre profil et négocie auprès de 10 assureurs partenaires (April Pro, Generali, AXA, MMA, MAAF, Hiscox, etc.) pour obtenir le meilleur rapport garantie ou prix.',
      ],
    },
    {
      h2: 'Tarifs mutuelle pro {ville}',
      paragraphs: ['Tarifs indicatifs mensuels pour un TNS célibataire à {ville} :'],
      bullets: [
        'Formule essentielle (100 % BR) : 45 € – 75 € par mois',
        'Formule confort (150-200 % BR) : 75 € – 130 € par mois',
        'Formule premium (300 % BR + médecines douces) : 130 € – 220 € par mois',
        'Famille (conjoint + 2 enfants) : ×2,5 environ',
      ],
    },
    {
      h2: 'Plafond Madelin 2026',
      paragraphs: [
        'Plafonds calculés sur la base du PASS (Plafond Annuel Sécurité Sociale) — environ 46 368 € en 2026 :',
      ],
      bullets: [
        'Santé : 7 % PASS + 3,75 % bénéfice imposable (max ~11 130 € par an)',
        'Prévoyance : 1,75 % PASS + 1,87 % bénéfice imposable',
        'Retraite : 10 % bénéfice + 15 % de la fraction 1-8 PASS',
        'Le contrat doit être labellisé Madelin pour ouvrir le droit',
      ],
    },
  ],
}

export const ASSURANCE_VTC_CONFIG: GarantieVilleConfig = {
  garantieSlug: 'assurance-vtc',
  garantieLabel: 'Assurance VTC',
  tagline:
    'Assurance VTC professionnelle obligatoire pour les chauffeurs Uber, Bolt, Heetch de {ville} et région {region}.',
  legalRef: 'OBLIGATION L. 211-1 + EVTC',
  priceFrom: '1 200€ par an',
  audience: 'VTC — Taxi',
  audienceMetric: 'freelancesEstime',
  sections: [
    {
      h2: 'Pourquoi une assurance VTC dédiée à {ville} ?',
      paragraphs: [
        'L’assurance VTC est obligatoire au titre de l’art. L. 211-1 du Code des assurances. Mais l’assurance auto perso ne suffit PAS : elle exclut les trajets professionnels rémunérés. En cas de sinistre avec un client à bord, la compagnie refuse l’indemnisation et vous engagez votre patrimoine.',
        'À {ville}, {departement} ({depCode}), le marché VTC est dominé par Uber, Bolt et Heetch. Toutes ces plateformes exigent une attestation d’assurance VTC valide ET la mention de l’inscription EVTC en cours.',
      ],
    },
    {
      h2: 'Tarifs VTC {ville}',
      paragraphs: [
        'Tarifs indicatifs annuels pour un VTC indépendant à {ville} (zonage {zonage}, sans antécédents sinistres majeurs) :',
      ],
      bullets: [
        'Berline standard (Volkswagen Passat, Peugeot 508) : 1 200 € – 2 200 €',
        'Berline premium (Mercedes Classe E, BMW Série 5) : 1 800 € – 3 500 €',
        'SUV — Van (Mercedes V, Tesla Model X) : 2 500 € – 4 800 €',
        'Profil jeune conducteur ou sinistralité : majoration jusqu’à +80 %',
      ],
    },
    {
      h2: 'Garanties indispensables',
      paragraphs: ['Notre cabinet ORIAS recommande pour un VTC à {ville} :'],
      bullets: [
        'RC Circulation (obligatoire) — illimitée',
        'Tous accidents + vol + incendie + bris de glace',
        'Assistance 24/7 + véhicule de remplacement (impératif si arrêt = perte de revenu)',
        'Protection juridique conducteur',
        'Garantie passagers transportés (responsabilité tiers)',
        'Option indemnités journalières en cas d’arrêt de travail',
      ],
    },
  ],
}

export const CYBER_ASSURANCE_CONFIG: GarantieVilleConfig = {
  garantieSlug: 'cyber-assurance',
  garantieLabel: 'Cyber assurance',
  tagline:
    'Couverture cyber-risques et fuite de données RGPD pour les TPE ou PME de {ville}. 1 entreprise sur 5 victime en France en 2025 (ANSSI).',
  legalRef: 'RGPD + DIRECTIVE NIS 2',
  priceFrom: '480€ par an',
  audience: 'TPE — PME',
  audienceMetric: 'freelancesEstime',
  sections: [
    {
      h2: 'Cyber assurance à {ville} : un risque devenu majeur',
      paragraphs: [
        'D’après l’ANSSI, 1 entreprise française sur 5 a subi une cyber-attaque en 2025. Les rançongiciels (ransomwares) restent la principale menace pour les TPE ou PME, suivis des fuites de données et du phishing ciblé (BEC).',
        'Pour une PME à {ville}, le coût moyen d’un sinistre cyber dépasse 50 000 € (forensic, restauration, pertes d’exploitation, sanctions CNIL). La cyber assurance prend en charge ces frais ET fournit une équipe d’experts 24/7.',
      ],
    },
    {
      h2: 'Tarifs cyber {ville}',
      paragraphs: [
        'Tarifs indicatifs annuels pour une PME à {ville} (CA jusqu’à 5 M€, sans antécédents) :',
      ],
      bullets: [
        'TPE (CA < 500 k€, 1-5 salariés) : 480 € – 1 200 €',
        'PME (CA 500 k€ – 2 M€) : 1 500 € – 4 500 €',
        'PME (CA 2-5 M€) : 4 500 € – 12 000 €',
        'Plafond standard : 250 k€ ; option 1-5 M€ pour grands comptes',
      ],
    },
    {
      h2: 'Garanties incluses',
      paragraphs: [
        'Notre cabinet ORIAS sélectionne pour les pros de {ville} les contrats incluant :',
      ],
      bullets: [
        'Frais de gestion de crise (forensic, communication, notification CNIL ou clients)',
        'Pertes d’exploitation suite à arrêt SI',
        'Frais de restauration des données',
        'RC en cas de fuite de données tiers',
        'Frais juridiques RGPD (sanctions CNIL jusqu’à 4 % CA mondial)',
        'Cyber-rançon (selon plafond et conformité légale)',
        'Assistance technique 24/7',
      ],
    },
  ],
}
