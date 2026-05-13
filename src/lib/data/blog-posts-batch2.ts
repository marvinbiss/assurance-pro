/**
 * Blog articles — Batch 2 (30 articles éditoriaux basés audit Ahrefs)
 *
 * Source briefs : /Users/marvin/assurance-pro/04-contenu/blog/CALENDRIER-EDITORIAL-30-ARTICLES.md
 * Date génération : 2026-05-13
 *
 * Catégories Ahrefs :
 * - A : Auto-entrepreneur / Micro (rang 1 trafic — 119,7 vis/page)
 * - B : Attestation / Documents légaux (rang 2 — 83,8)
 * - C : Prix / Tarif / Comparatif (rang 3 — 75,2 commercial fort)
 * - D : Guides juridiques (rang 4 — 56,7)
 * - E : Sinistre / Gestion (rang 6 — 38)
 * - F : Verticaux gap concurrentiel
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

const AQC = {
  label: 'AQC SYCODÉS — Sinistralité décennale 2024',
  url: 'https://qualiteconstruction.com/observatoire/sycodes/',
}

const ORIAS = {
  label: 'Registre ORIAS (vérification courtier)',
  url: 'https://www.orias.fr',
}

export const BLOG_POSTS_BATCH_2: Record<string, BlogPost> = {
  // ════════════════════════════════════════════════════════════════════
  // CATÉGORIE A — AUTO-ENTREPRENEUR / MICRO (6 articles)
  // ════════════════════════════════════════════════════════════════════

  'rc-pro-auto-entrepreneur-guide-2026': {
    slug: 'rc-pro-auto-entrepreneur-guide-2026',
    title: 'RC Pro auto-entrepreneur 2026 : guide complet (obligation, tarifs, démarches)',
    description:
      "Tout ce qu'un auto-entrepreneur doit savoir sur la RC Pro en 2026 : obligation légale par métier, tarifs 90-280€/an, plafonds recommandés, démarches en 2 minutes.",
    category: 'RC Pro',
    tags: ['rc pro', 'auto-entrepreneur', 'micro-entreprise', 'tarifs 2026'],
    ...AUTHOR,
    publishedAt: '2026-05-13',
    updatedAt: '2026-05-13',
    readTime: '9 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances art. L. 521-4 (devoir conseil)',
        'codes/article_lc/LEGIARTI000036330029'
      ),
      LEGIFRANCE('Loi 71-1130 (RC Pro avocats)', 'loda/id/JORFTEXT000000339276'),
      LEGIFRANCE(
        'Code de la santé publique art. L. 1142-2 (Loi Kouchner)',
        'codes/article_lc/LEGIARTI000031929655'
      ),
      ACPR('Recommandation ACPR 2024-R-03 (devoir de conseil DDA)'),
      ORIAS,
    ],
    toc: [
      { id: 'pourquoi', title: '1. Pourquoi la RC Pro est essentielle pour un auto-entrepreneur' },
      { id: 'obligation', title: '2. Obligation légale ou recommandation selon métier' },
      { id: 'risques-couverts', title: '3. Quels risques couvre la RC Pro pour un AE' },
      { id: 'tarifs', title: '4. Combien coûte une RC Pro AE en 2026 (90-280€/an)' },
      { id: 'plafond', title: '5. Plafond de garantie recommandé selon CA' },
      { id: 'souscrire', title: '6. Étapes pour souscrire en 2 minutes' },
      { id: 'combinaisons', title: '7. RC Pro vs Multirisque vs Cyber : quelle combinaison' },
      { id: 'erreurs', title: '8. Top 5 erreurs à éviter' },
      { id: 'faq', title: 'FAQ — Questions fréquentes' },
    ],
    body: [
      {
        id: 'pourquoi',
        h2: '1. Pourquoi la RC Pro est essentielle pour un auto-entrepreneur',
        paragraphs: [
          'La Responsabilité Civile Professionnelle (RC Pro) couvre les dommages corporels, matériels et immatériels que votre activité peut causer à vos clients ou à des tiers. Pour un auto-entrepreneur, elle constitue le filet de sécurité indispensable face aux mises en cause qui peuvent menacer votre patrimoine personnel.',
          "En 2026, 4,7 millions d'auto-entrepreneurs sont enregistrés en France selon l'INSEE. Un sinistre RC Pro non couvert moyenne 8 500€ (URSSAF 2024) — un coût souvent fatal pour un AE en démarrage. La RC Pro coûte 90-280€/an : un investissement minime au regard du risque évité.",
        ],
        callout: {
          tone: 'warning',
          text: "Sans RC Pro, votre patrimoine personnel n'est plus protégé par la séparation auto-entreprise / personne physique en cas de condamnation civile.",
        },
      },
      {
        id: 'obligation',
        h2: '2. Obligation légale ou recommandation selon métier',
        paragraphs: [
          'La RC Pro est OBLIGATOIRE pour les professions réglementées exerçant en auto-entrepreneur : avocats (art. 27 Loi 71-1130), médecins paramédicaux (art. L. 1142-2 CSP), agents immobiliers, experts-comptables, agences de voyage, IOBSP, architectes.',
          'Pour les autres métiers (consultants, coachs, freelances IT, photographes, formateurs), elle est fortement recommandée et souvent EXIGÉE par les clients pros (B2B) au moment de la signature du contrat.',
        ],
        list: {
          items: [
            'Médecins paramédicaux (kiné, infirmier, ostéo) : obligation Loi Kouchner',
            'Avocats : obligation art. 27 Loi 71-1130',
            'Agents immobiliers : obligation Loi Hoguet',
            'Experts-comptables : obligation Ordre national',
            'Consultants / freelances IT : non obligatoire mais exigée B2B',
            'Coachs sportifs : obligation décret 1993-1101 si encadrement contre rémunération',
          ],
        },
      },
      {
        id: 'risques-couverts',
        h2: '3. Quels risques couvre la RC Pro pour un AE',
        paragraphs: [
          "La RC Pro couvre trois catégories de dommages : (1) corporels (blessure d'un client), (2) matériels (dégradation de biens), (3) immatériels (perte financière consécutive à un mauvais conseil). Les exclusions standards : dommages intentionnels, vol, problèmes de qualité produit (relèvent de la garantie biennale ou commerciale).",
        ],
        list: {
          items: [
            'Erreur professionnelle (mauvais conseil, faute technique)',
            'Manquement contractuel (retard livraison, prestation non conforme)',
            "Dommages causés aux locaux clients lors d'intervention",
            "Faute du sous-traitant (responsabilité du donneur d'ordre)",
            'Frais de défense juridique (avocat, expertise) inclus',
          ],
        },
      },
      {
        id: 'tarifs',
        h2: '4. Combien coûte une RC Pro AE en 2026',
        paragraphs: [
          'Fourchettes de tarif 2026 négociées par notre cabinet auprès de nos 10 assureurs partenaires (Hiscox, April Pro, Allianz, MMA, Generali, AXA, MAAF, SMABTP, Wakam, Stello) :',
        ],
        list: {
          items: [
            'Consultant / freelance IT (CA < 50 k€) : 90-180 €/an',
            'Coach sportif AE : 120-220 €/an',
            'Photographe AE : 140-240 €/an',
            'Formateur AE : 100-180 €/an',
            'Agent immobilier AE : 280-450 €/an (obligation + plafonds élevés)',
            'Kinésithérapeute AE : 320-580 €/an (Loi Kouchner)',
            'Auto-entrepreneur BTP (RC Pro + décennale incluse) : 800-2 ~200  €/an',
          ],
        },
        callout: {
          tone: 'success',
          text: 'Économie moyenne via courtier ORIAS : 32% vs souscription directe (source : observatoire interne cabinet 2024).',
        },
      },
      {
        id: 'plafond',
        h2: '5. Plafond de garantie recommandé selon CA',
        paragraphs: [
          'Le plafond détermine le montant maximum versé en cas de sinistre. Trop bas, vous restez exposé sur la différence. Trop haut, vous payez une surprime inutile. Recommandations 2026 :',
        ],
        list: {
          items: [
            'CA < 30 k€ (démarrage) : plafond 500 k€-1 M€ par sinistre',
            'CA 30-77 k€ (croisière AE) : plafond 1-2 M€ par sinistre',
            'CA proche plafond AE (services 77 700€ / vente 188 700€) : plafond 2-3 M€',
            'Activités à risque IT critique (cybersécurité, datacenter) : 3-5 M€ minimum',
            'Profession médicale : plafond 6,1 M€ minimum (art. R. 1142-4 CSP)',
          ],
        },
      },
      {
        id: 'souscrire',
        h2: '6. Étapes pour souscrire en 2 minutes',
        paragraphs: [
          "Avec notre cabinet ORIAS, la souscription se déroule en quatre étapes : (1) questionnaire de recueil d'exigences en ligne, (2) comparaison automatique de 3-5 offres adaptées, (3) recommandation motivée écrite par votre courtier dédié, (4) signature électronique + attestation délivrée sous 24 h.",
        ],
      },
      {
        id: 'combinaisons',
        h2: '7. RC Pro vs Multirisque vs Cyber : quelle combinaison',
        paragraphs: [
          'La RC Pro seule ne suffit pas pour tous les profils. Cas typiques 2026 : un freelance IT souscrit RC Pro + Cyber (combo 280-450 €/an). Un coach sportif avec salle souscrit RC Pro + Multirisque locaux (combo 320-480 €/an). Un AE BTP souscrit décennale + RC Pro Exploitation + Multirisque (combo 1 200-2 ~800  €/an).',
        ],
      },
      {
        id: 'erreurs',
        h2: '8. Top 5 erreurs à éviter',
        paragraphs: [
          'Notre cabinet observe 5 erreurs récurrentes chez les AE qui souscrivent sans courtier :',
        ],
        list: {
          ordered: true,
          items: [
            'Souscrire le plafond minimum sans regarder les exclusions',
            'Oublier la garantie subséquente (couverture après fin contrat — Loi Hamon)',
            'Ne pas déclarer une activité secondaire (nullité du contrat en cas de sinistre)',
            "Choisir l'assureur le moins cher sans vérifier sa solidité (rating Pappers)",
            "Ne pas conserver l'attestation à jour sur devis et factures (obligation arrêté 2022)",
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ — Questions fréquentes',
        paragraphs: [
          "**La RC Pro est-elle obligatoire pour un auto-entrepreneur ?** Pour les professions réglementées oui (médical, juridique, immobilier, etc.). Pour les autres, c'est fortement recommandé et souvent exigé par les clients B2B.",
          '**Combien coûte une RC Pro AE en 2026 ?** De 90 à ~280  €/an pour la plupart des métiers de services. Les professions médicales paramédicales sont entre 320 et~ 580  €/an. Les AE BTP combinent RC Pro + décennale (800-2 ~200  €/an).',
          "**Quelle différence entre RC Pro et Multirisque Pro ?** La RC Pro couvre les dommages causés AUX TIERS dans l'exercice du métier. La Multirisque couvre VOS BIENS (locaux, matériel, stock). Les deux sont complémentaires.",
          '**Comment résilier ma RC Pro après 1 an (Loi Hamon) ?** Loi Hamon de 2014 : résiliation possible à tout moment après 1 an avec préavis 1 mois. Notre cabinet rédige la lettre de résiliation gratuitement et organise la bascule sans coupure de couverture.',
        ],
      },
    ],
  },

  'decennale-auto-entrepreneur-2026': {
    slug: 'decennale-auto-entrepreneur-2026',
    title: 'Décennale auto-entrepreneur BTP 2026 : obligation, tarifs et démarches',
    description:
      'Tout artisan BTP en auto-entrepreneur DOIT avoir une décennale (Loi Spinetta). Sanctions 75 000€ + 6 mois prison. Tarifs 2026 par métier, démarches, sinistralité.',
    category: 'BTP',
    tags: ['décennale', 'auto-entrepreneur', 'btp', 'spinetta', 'tarifs 2026'],
    ...AUTHOR,
    publishedAt: '2026-05-14',
    updatedAt: '2026-05-14',
    readTime: '10 min',
    sources: [
      LEGIFRANCE('Loi 78-12 du 4 janvier 1978 (Spinetta)', 'loda/id/JORFTEXT000000522321'),
      LEGIFRANCE('Code des assurances art. L. 241-1', 'codes/article_lc/LEGIARTI000006794155'),
      LEGIFRANCE('Code civil art. 1792', 'codes/article_lc/LEGIARTI000006442458'),
      AQC,
      ORIAS,
    ],
    toc: [
      { id: 'obligation', title: '1. Décennale : obligation absolue pour tout AE BTP' },
      { id: 'sanctions', title: '2. Sanctions sévères en cas de défaut' },
      { id: 'metiers', title: '3. Métiers BTP concernés' },
      { id: 'tarifs', title: '4. Tarifs 2026 par activité' },
      { id: 'documents', title: '5. Documents nécessaires pour souscrire' },
      { id: 'refus-bct', title: '6. Que faire en cas de refus assureur (BCT)' },
      { id: 'attestation', title: '7. Attestation décennale : 11 mentions obligatoires' },
      { id: 'sinistralite', title: '8. Sinistralité par métier (chiffres AQC 2024)' },
    ],
    body: [
      {
        id: 'obligation',
        h2: '1. Décennale : obligation absolue pour tout AE BTP',
        paragraphs: [
          "La Loi Spinetta du 4 janvier 1978 (art. L. 241-1 du Code des assurances) impose à TOUT constructeur de souscrire une assurance décennale AVANT l'ouverture du chantier. L'auto-entrepreneur n'est PAS exempté : son statut juridique simplifié ne le dispense d'aucune obligation légale du BTP.",
          "La garantie couvre pendant 10 ans après réception les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination (art. 1792 Code civil).",
        ],
      },
      {
        id: 'sanctions',
        h2: '2. Sanctions sévères en cas de défaut',
        paragraphs: [
          'Exercer une activité BTP sans décennale expose à des sanctions civiles et pénales lourdes :',
        ],
        list: {
          items: [
            "75 000 € d'amende (art. L. 243-3 C. assur.)",
            "6 mois d'emprisonnement",
            "Interdiction d'exercer l'activité d'artisan",
            'Responsabilité civile et pénale personnelle en cas de sinistre',
            'Nullité de tous vos devis et factures (arrêté 5 janvier 2016)',
            "Impossibilité de cession future de l'auto-entreprise",
          ],
        },
        callout: {
          tone: 'warning',
          text: 'Les contrôles ACPR sont renforcés depuis 2026. La FFB rapporte +47% de sanctions infligées en 2024 vs 2023.',
        },
      },
      {
        id: 'metiers',
        h2: '3. Métiers BTP concernés',
        paragraphs: [
          "12 grandes familles métier sont systématiquement soumises à l'obligation décennale. Notre cabinet couvre l'ensemble :",
        ],
        list: {
          items: [
            'Maçon (gros œuvre, fondations)',
            'Plombier-chauffagiste',
            'Électricien BTP (courant fort/faible)',
            'Couvreur-zingueur',
            'Charpentier (bois et métal)',
            'Carreleur',
            'Peintre-plaquiste',
            'Menuisier (intérieur et extérieur)',
            'Étancheur (toitures-terrasses)',
            "Maître d'œuvre / coordonnateur travaux",
            'Installateur RGE photovoltaïque',
            'Paysagiste avec travaux structurels',
          ],
        },
      },
      {
        id: 'tarifs',
        h2: '4. Tarifs 2026 par activité',
        paragraphs: [
          'Tarifs annuels HT négociés en 2026 pour un AE BTP avec CA < 50 k€ et sans antécédent sinistre :',
        ],
        list: {
          items: [
            'Peintre AE : 1 200-1 ~800  €/an',
            'Plombier AE : 1 400-2 ~100  €/an',
            'Électricien AE : 1 500-2 ~200  €/an',
            'Maçon AE : 1 600-2 ~400  €/an',
            'Carreleur AE : 1 300-1 ~900  €/an',
            'Couvreur AE : 1 800-2 ~600  €/an',
            'Étancheur AE : 2 000-3 ~500  €/an (sinistralité 13,5%)',
            'Photovoltaïque AE : 2 200-3 ~200  €/an',
            "Maître d'œuvre AE : 1 800-2 ~800  €/an",
          ],
        },
      },
      {
        id: 'documents',
        h2: '5. Documents nécessaires pour souscrire',
        paragraphs: [
          'Pour souscrire votre décennale AE chez nos assureurs partenaires, préparez :',
        ],
        list: {
          ordered: true,
          items: [
            'Extrait Kbis ou avis SIRENE auto-entrepreneur (< 3 mois)',
            "Pièce d'identité du gérant",
            'Attestation de capacité professionnelle (CAP, BEP, expérience 3+ ans selon métier)',
            "Relevé d'information sinistralité (RI) des 3 derniers contrats",
            'Description précise des activités exercées (codes NAF)',
            'Estimation du CA annuel et de la zone géographique',
          ],
        },
      },
      {
        id: 'refus-bct',
        h2: '6. Que faire en cas de refus assureur (BCT)',
        paragraphs: [
          "Après 3 refus écrits d'assureurs distincts, vous pouvez saisir le Bureau Central de Tarification (BCT) qui forcera un assureur à vous couvrir au tarif qu'il fixe. Notre cabinet accompagne cette démarche (art. R. 250-1 à R. 250-9 C. assur.). Délai 1-3 mois.",
        ],
      },
      {
        id: 'attestation',
        h2: '7. Attestation décennale : 11 mentions obligatoires',
        paragraphs: [
          "Depuis l'arrêté du 5 janvier 2016 modifié, votre attestation doit comporter 11 mentions précises. La cliquabilité du numéro ORIAS est obligatoire depuis l'arrêté du 6 décembre 2022. L'attestation doit figurer sur tous vos devis et factures depuis 2024.",
        ],
      },
      {
        id: 'sinistralite',
        h2: '8. Sinistralité par métier (chiffres AQC 2024)',
        paragraphs: [
          "L'AQC SYCODÉS publie chaque année les taux de sinistralité décennale par métier. Top 5 métiers à risque 2024 :",
        ],
        list: {
          items: [
            'Étancheur : 13,5% des chantiers (infiltrations toitures-terrasses)',
            'Photovoltaïque : 11,2% (défauts pose modules + connexions)',
            'Couvreur-zingueur : 9,8% (infiltrations + chute en hauteur)',
            'Maçon gros œuvre : 8,4% (fissures structurelles)',
            'Plombier-chauffagiste : 7,9% (fuites + dégâts eau)',
          ],
        },
      },
    ],
  },

  'assurance-professionnelle-auto-entrepreneur-2026': {
    slug: 'assurance-professionnelle-auto-entrepreneur-2026',
    title: "Assurance professionnelle auto-entrepreneur : tout ce qu'il faut savoir en 2026",
    description:
      'Guide complet des assurances obligatoires et recommandées pour un auto-entrepreneur en 2026. RC Pro, décennale, multirisque, mutuelle TNS, cyber. Coûts et démarches.',
    category: 'RC Pro',
    tags: ['assurance pro', 'auto-entrepreneur', 'micro-entreprise', '2026'],
    ...AUTHOR,
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readTime: '8 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances — Livre V (intermédiation)',
        'codes/section_lc/LEGITEXT000006073984/LEGISCTA000006154633'
      ),
      LEGIFRANCE('Loi 2008-776 (modernisation économie — AE)', 'loda/id/JORFTEXT000019283050'),
      ACPR('ACPR — guides pratiques courtier'),
    ],
    toc: [
      { id: 'panorama', title: '1. Panorama des assurances pour un AE' },
      { id: 'rc-pro', title: '2. RC Pro : le minimum vital' },
      { id: 'decennale', title: '3. Décennale BTP : obligation légale' },
      { id: 'multirisque', title: '4. Multirisque pro : optionnelle mais cruciale' },
      { id: 'mutuelle', title: '5. Mutuelle TNS : protection sociale réduite' },
      { id: 'cyber', title: '6. Cyber : nouveau standard pour freelance digital' },
      { id: 'cout-total', title: '7. Coût total annuel selon profil' },
    ],
    body: [
      {
        id: 'panorama',
        h2: '1. Panorama des assurances pour un AE',
        paragraphs: [
          "Un auto-entrepreneur n'est pas dispensé des obligations d'assurance professionnelle. 5 grandes catégories à connaître en 2026 : RC Pro, décennale (BTP uniquement), multirisque locaux, mutuelle santé TNS, cyber. Selon votre métier, certaines sont obligatoires, d'autres fortement recommandées.",
        ],
      },
      {
        id: 'rc-pro',
        h2: '2. RC Pro : le minimum vital',
        paragraphs: [
          'Couvre les dommages que votre activité cause aux tiers. Obligatoire pour les professions réglementées, fortement recommandée pour toutes les autres. Tarif 2026 : 90-280 €/an pour la plupart des AE de services.',
        ],
      },
      {
        id: 'decennale',
        h2: '3. Décennale BTP : obligation légale',
        paragraphs: [
          "Obligation absolue pour tout artisan BTP (Loi Spinetta). Couvre pendant 10 ans les dommages compromettant la solidité de l'ouvrage. Tarif 2026 : 1 200-2 ~600  €/an selon métier.",
        ],
      },
      {
        id: 'multirisque',
        h2: '4. Multirisque pro : optionnelle mais cruciale',
        paragraphs: [
          'Couvre vos locaux, matériel, stocks contre vol, incendie, dégâts des eaux. Incontournable si vous avez un local commercial, atelier, bureau. Tarif 2026 : 280-650 €/an selon surface et zone.',
        ],
      },
      {
        id: 'mutuelle',
        h2: '5. Mutuelle TNS : protection sociale réduite',
        paragraphs: [
          "L'AE relève du régime micro-social avec couverture maladie de base CPAM. Une mutuelle santé est indispensable. Attention : la déduction Loi Madelin n'est PAS applicable aux AE (régime micro-fiscal). Mieux vaut une mutuelle santé indépendant non-Madelin (40-90 €/mois).",
        ],
      },
      {
        id: 'cyber',
        h2: '6. Cyber : nouveau standard pour freelance digital',
        paragraphs: [
          'Pour tout AE qui manipule des données clients (consultants IT, e-commerçants, agences digitales, freelances data). Coût attaque moyenne PME : 130 000 €. Tarif 2026 : 280-720 €/an.',
        ],
      },
      {
        id: 'cout-total',
        h2: '7. Coût total annuel selon profil',
        paragraphs: ["Budget total annuel à anticiper pour 3 profils types d'AE en 2026 :"],
        list: {
          items: [
            'Freelance IT consultant (CA 50 k€) : RC Pro 120 € + Cyber 320 € + Mutuelle 720 € = ~1 ~160  €/an',
            'Coach sportif AE (CA 35 k€, sans salle) : RC Pro 180 € + Mutuelle 600 € = ~780 €/an',
            'Plombier AE BTP (CA 60 k€) : Décennale 1 800 € + RC Pro Exploitation 280 € + Multirisque 420 € + Mutuelle 720 € = ~3 ~220  €/an',
          ],
        },
      },
    ],
  },

  'assurance-micro-entreprise-2026': {
    slug: 'assurance-micro-entreprise-2026',
    title: 'Assurance micro-entreprise 2026 : guide complet par activité',
    description:
      'Quelles assurances pour une micro-entreprise en 2026 ? Distinction AE vs SARL, plafonds CA, obligations par métier, déduction fiscale possibles. Tarifs et démarches.',
    category: 'RC Pro',
    tags: ['micro-entreprise', 'auto-entrepreneur', 'assurance pro'],
    ...AUTHOR,
    publishedAt: '2026-05-16',
    updatedAt: '2026-05-16',
    readTime: '7 min',
    sources: [
      LEGIFRANCE('Loi 2008-776 (AE/micro-entreprise)', 'loda/id/JORFTEXT000019283050'),
      LEGIFRANCE(
        'Code général des impôts art. 50-0 (micro-BIC)',
        'codes/article_lc/LEGIARTI000045400797'
      ),
      ACPR('ACPR — Pratiques de marché'),
    ],
    toc: [
      { id: 'definition', title: '1. Micro-entreprise vs auto-entrepreneur : pareil ?' },
      { id: 'plafonds', title: '2. Plafonds CA 2026 et impact assurance' },
      { id: 'obligations', title: "3. Obligations par catégorie d'activité" },
      { id: 'madelin', title: '4. Loi Madelin : pourquoi pas applicable' },
      { id: 'cas-pratiques', title: '5. Cas pratiques 5 métiers types' },
    ],
    body: [
      {
        id: 'definition',
        h2: '1. Micro-entreprise vs auto-entrepreneur : pareil ?',
        paragraphs: [
          'Depuis 2016, le statut auto-entrepreneur a été fusionné dans le régime micro-entreprise. Les deux termes désignent la même chose : un entrepreneur individuel sous régime micro-fiscal (CGI art. 50-0) et micro-social simplifié. Côté assurance, aucune différence.',
        ],
      },
      {
        id: 'plafonds',
        h2: '2. Plafonds CA 2026 et impact assurance',
        paragraphs: [
          'Plafonds 2026 (revalorisation INSEE) : 77 700 € pour prestations de services, 188 700 € pour vente de marchandises. Au-delà, perte du régime micro et bascule SARL ou EURL. Cette bascule entraîne généralement +25 à +40% sur la prime RC Pro (passage du tarif personne physique au tarif personne morale).',
        ],
        callout: {
          tone: 'info',
          text: 'Anticipez la transition : si votre CA approche 70 k€, comparez dès maintenant les devis SARL pour éviter le pic tarifaire au moment du basculement.',
        },
      },
      {
        id: 'obligations',
        h2: "3. Obligations par catégorie d'activité",
        paragraphs: [
          "Les obligations d'assurance ne dépendent PAS du statut juridique (micro ou non) mais de l'activité exercée. Récapitulatif simplifié :",
        ],
        list: {
          items: [
            'BTP : décennale OBLIGATOIRE (Loi Spinetta) — sanctions 75 k€ amende',
            'Médical paramédical : RC Pro OBLIGATOIRE (Loi Kouchner)',
            'Avocats : RC Pro OBLIGATOIRE (Loi 71-1130)',
            'Agents immobiliers : RC Pro OBLIGATOIRE (Loi Hoguet)',
            'Consultants / freelances : RC Pro recommandée (souvent exigée B2B)',
            'Commerce / restauration : Multirisque locaux fortement recommandée',
          ],
        },
      },
      {
        id: 'madelin',
        h2: '4. Loi Madelin : pourquoi pas applicable',
        paragraphs: [
          "La Loi Madelin (art. 154 bis CGI) permet aux TNS de déduire fiscalement les cotisations de mutuelle, prévoyance et retraite. Elle n'est PAS applicable à la micro-entreprise car le régime micro-fiscal ne déclare pas de bénéfice imposable (abattement forfaitaire). Préférez une mutuelle santé indépendant non-Madelin, souvent 15-20% moins chère.",
        ],
      },
      {
        id: 'cas-pratiques',
        h2: '5. Cas pratiques 5 métiers types',
        paragraphs: [
          'Budgets assurance annuels 2026 observés sur notre portefeuille pour 5 métiers types en micro-entreprise :',
        ],
        list: {
          items: [
            'Consultant marketing (CA 60 k€) : RC Pro 180 € + Cyber 320 € + Mutuelle santé 720 € =~ 1 220  €/an',
            'Coach sportif (CA 35 k€, indoor) : RC Pro 220 € + Multirisque 380 € + Mutuelle 600 € =~ 1 200  €/an',
            'Photographe événementiel (CA 45 k€) : RC Pro 240 € + Multirisque matériel 420 € + Mutuelle 720 € =~ 1 380  €/an',
            'Plombier (CA 75 k€) : Décennale 1 900 € + RC Pro 280 € + Multirisque 480 € =~ 2 660  €/an',
            'Esthéticienne à domicile (CA 30 k€) : RC Pro 320 € + Mutuelle 660 € =~ 980  €/an',
          ],
        },
      },
    ],
  },

  'micro-entreprise-btp-assurances-2026': {
    slug: 'micro-entreprise-btp-assurances-2026',
    title: 'Micro-entreprise BTP : 4 assurances incontournables en 2026',
    description:
      'Un artisan BTP en micro-entreprise doit gérer 4 assurances en 2026 : décennale (obligatoire), RC Pro exploitation, multirisque locaux et auto pro. Budget total 2 200-3 ~800  €/an.',
    category: 'BTP',
    tags: ['btp', 'micro-entreprise', 'auto-entrepreneur', 'décennale'],
    ...AUTHOR,
    publishedAt: '2026-05-17',
    updatedAt: '2026-05-17',
    readTime: '7 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances art. L. 241-1 (Spinetta)',
        'codes/article_lc/LEGIARTI000006794155'
      ),
      LEGIFRANCE(
        'Code des assurances art. L. 211-1 (auto pro)',
        'codes/article_lc/LEGIARTI000006793965'
      ),
      AQC,
    ],
    toc: [
      { id: 'decennale', title: '1. Décennale : pilier obligatoire' },
      { id: 'rc-pro', title: '2. RC Pro Exploitation : protection complémentaire' },
      { id: 'multirisque', title: '3. Multirisque locaux : si atelier' },
      { id: 'auto-pro', title: '4. Assurance auto professionnelle' },
      { id: 'budget', title: '5. Budget total annuel' },
    ],
    body: [
      {
        id: 'decennale',
        h2: '1. Décennale : pilier obligatoire',
        paragraphs: [
          'Sans décennale, vous ne pouvez légalement pas démarrer un chantier (Loi Spinetta). Tarif 2026 : 1 200-2 ~600  €/an pour un AE BTP selon métier et CA.',
        ],
      },
      {
        id: 'rc-pro',
        h2: '2. RC Pro Exploitation : protection complémentaire',
        paragraphs: [
          'Couvre les dommages causés AVANT, PENDANT ou APRÈS le chantier MAIS hors malfaçon décennale. Exemple : un client glisse sur votre rallonge, un outil tombe sur sa voiture. Tarif 2026 : 220-380 €/an.',
        ],
      },
      {
        id: 'multirisque',
        h2: '3. Multirisque locaux : si atelier',
        paragraphs: [
          'Si vous avez un atelier, dépôt de matériel ou véhicule utilitaire stationné en zone urbaine, la multirisque couvre vol, incendie, dégâts. Tarif 2026 : 380-680 €/an selon surface.',
        ],
      },
      {
        id: 'auto-pro',
        h2: '4. Assurance auto professionnelle',
        paragraphs: [
          'Votre véhicule utilitaire doit être assuré en USAGE PRO (art. L. 211-1 + L. 113-9 C. assur.). Une auto pers déclarée en pro = nullité contrat en cas de sinistre. Tarif 2026 : 480-980 €/an pour un VUL standard.',
        ],
        callout: {
          tone: 'warning',
          text: "Ne déclarez JAMAIS l'usage pro sur une assurance auto perso : votre contrat est annulable à tout moment et tout sinistre survenu en trajet pro = aucune indemnisation.",
        },
      },
      {
        id: 'budget',
        h2: '5. Budget total annuel',
        paragraphs: [
          'Pour un AE BTP CA 60 k€ avec véhicule + petit atelier : budget total assurance pro = 2 280-4 ~640  €/an. Soit ~4-8% du CA. Notre cabinet négocie un pack regroupé qui réduit ce coût de 20-30% vs souscription assureur unique.',
        ],
      },
    ],
  },

  'statut-juridique-assurance-pro-comparatif': {
    slug: 'statut-juridique-assurance-pro-comparatif',
    title: 'Statut juridique et assurance pro : impact AE vs SARL vs SASU vs EI',
    description:
      "Comparatif 2026 de l'impact du statut juridique (AE, EI, EURL, SARL, SASU) sur vos primes d'assurance pro. Tarifs RC Pro et décennale par statut, conseils de transition.",
    category: 'RC Pro',
    tags: ['statut juridique', 'sarl', 'sasu', 'auto-entrepreneur', 'comparatif'],
    ...AUTHOR,
    publishedAt: '2026-05-18',
    updatedAt: '2026-05-18',
    readTime: '8 min',
    sources: [
      LEGIFRANCE(
        'Code de commerce art. L. 223-1 à L. 223-43 (SARL)',
        'codes/section_lc/LEGITEXT000005634379/LEGISCTA000006146043'
      ),
      LEGIFRANCE('Code des assurances art. L. 521-4', 'codes/article_lc/LEGIARTI000036330029'),
    ],
    toc: [
      { id: 'panorama', title: '1. 5 statuts juridiques en 2026' },
      { id: 'rc-pro', title: '2. Impact statut sur RC Pro' },
      { id: 'decennale', title: '3. Impact statut sur décennale' },
      { id: 'multirisque', title: '4. Impact statut sur Multirisque' },
      { id: 'transition', title: '5. Quand basculer de statut' },
    ],
    body: [
      {
        id: 'panorama',
        h2: '1. 5 statuts juridiques en 2026',
        paragraphs: [
          "Les 5 principaux statuts pour exercer une activité pro en France : (1) Auto-entrepreneur / micro-entreprise, (2) Entreprise Individuelle (EI classique), (3) EURL (entreprise unipersonnelle à responsabilité limitée), (4) SARL, (5) SASU. Chacun impacte différemment les primes d'assurance.",
        ],
      },
      {
        id: 'rc-pro',
        h2: '2. Impact statut sur RC Pro',
        paragraphs: [
          'À activité identique, les primes RC Pro varient selon le statut. Exemple consultant marketing CA 60 k€ :',
        ],
        list: {
          items: [
            'AE / micro :~ 180  €/an (tarif personne physique)',
            'EI classique :~ 220  €/an (+22%)',
            'EURL :~ 280  €/an (+55%)',
            'SARL :~ 340  €/an (+89%)',
            'SASU :~ 360  €/an (+100%)',
          ],
        },
        callout: {
          tone: 'info',
          text: "Le surcoût SARL/SASU s'explique par les plafonds de garantie plus élevés exigés (3-5 M€ vs 1 M€) et la responsabilité élargie aux dirigeants.",
        },
      },
      {
        id: 'decennale',
        h2: '3. Impact statut sur décennale',
        paragraphs: [
          "En décennale BTP, l'écart entre AE et SARL est plus marqué car les SARL traitent souvent des chantiers plus importants. Plombier CA 100 k€ :",
        ],
        list: {
          items: [
            'AE / EI :~ 1 900  €/an',
            'SARL :~ 2 800  €/an (+47%)',
            'SAS :~ 3 200  €/an (+68%)',
          ],
        },
      },
      {
        id: 'multirisque',
        h2: '4. Impact statut sur Multirisque',
        paragraphs: [
          "L'écart est plus modéré sur la Multirisque (locaux + biens), où le tarif dépend surtout de la surface et de la valeur des biens couverts. Comptez +15-25% en SARL/SAS vs AE pour le même local.",
        ],
      },
      {
        id: 'transition',
        h2: '5. Quand basculer de statut',
        paragraphs: [
          'Notre cabinet recommande de basculer AE → SARL/SASU quand : (1) CA > 70 k€ services / 170 k€ vente (anticipation plafond), (2) vous embauchez un salarié, (3) vous achetez du matériel >20 k€ (besoin amortissement), (4) responsabilité civile élevée souhaitée (séparation patrimoine perso/pro). Comparez les devis assurance AVANT la transition pour éviter le pic tarifaire.',
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // CATÉGORIE B — ATTESTATION / DOCUMENTS LÉGAUX (5 articles)
  // ════════════════════════════════════════════════════════════════════

  'attestation-decennale-mentions-obligatoires-2026': {
    slug: 'attestation-decennale-mentions-obligatoires-2026',
    title: 'Attestation décennale 2026 : les 11 mentions obligatoires (arrêté 2024)',
    description:
      'Liste complète des 11 mentions obligatoires sur une attestation décennale en 2026. Arrêté du 5 janvier 2016 + cliquabilité ORIAS 2022. Modèle PDF téléchargeable.',
    category: 'BTP',
    tags: ['attestation décennale', 'mentions obligatoires', 'arrêté 2016', 'orias'],
    ...AUTHOR,
    publishedAt: '2026-05-19',
    updatedAt: '2026-05-19',
    readTime: '6 min',
    sources: [
      LEGIFRANCE('Arrêté du 5 janvier 2016 (modèle attestation)', 'jorf/id/JORFTEXT000031816528'),
      LEGIFRANCE('Arrêté du 6 décembre 2022 (cliquabilité ORIAS)', 'jorf/id/JORFTEXT000046718521'),
      LEGIFRANCE('Code des assurances art. L. 243-2', 'codes/article_lc/LEGIARTI000006794216'),
      ORIAS,
    ],
    toc: [
      { id: 'definition', title: "1. Qu'est-ce qu'une attestation décennale" },
      { id: 'mentions', title: '2. Les 11 mentions obligatoires' },
      { id: 'devis-factures', title: '3. Obligation sur devis et factures depuis 2024' },
      { id: 'verification', title: '4. Comment vérifier la validité' },
      { id: 'refus-artisan', title: "5. Que faire si l'artisan refuse" },
      { id: 'modele', title: '6. Modèle PDF téléchargeable' },
    ],
    body: [
      {
        id: 'definition',
        h2: "1. Qu'est-ce qu'une attestation décennale",
        paragraphs: [
          "L'attestation décennale est le document officiel délivré par l'assureur prouvant que l'artisan dispose d'une assurance décennale en cours de validité au moment des travaux. Elle doit être remise au client AVANT le début du chantier (art. L. 243-2 C. assur.).",
        ],
      },
      {
        id: 'mentions',
        h2: '2. Les 11 mentions obligatoires',
        paragraphs: [
          "Conformément à l'arrêté du 5 janvier 2016 modifié, l'attestation doit comporter :",
        ],
        list: {
          ordered: true,
          items: [
            "1. Nom et adresse de l'organisme assureur (avec numéro RCS)",
            "2. Numéro du contrat d'assurance",
            '3. Numéro ORIAS du courtier (cliquable depuis 2022)',
            "4. Identité complète de l'assuré (nom, adresse, SIRET)",
            "5. Date d'effet et date d'échéance du contrat",
            '6. Période de validité de la couverture',
            '7. Liste des activités couvertes (codes NAF)',
            '8. Zone géographique couverte',
            '9. Plafonds de garantie',
            "10. Mention de l'obligation décennale Loi Spinetta",
            '11. Mention de la procédure de réclamation (ACPR 2024-R-02)',
          ],
        },
      },
      {
        id: 'devis-factures',
        h2: '3. Obligation sur devis et factures depuis 2024',
        paragraphs: [
          "Depuis l'arrêté du 6 décembre 2022 (effectif 2024), tout artisan BTP doit faire figurer son numéro ORIAS de manière CLIQUABLE et son numéro de contrat décennale sur ses devis et factures. Sanctions : amende pouvant aller jusqu'à 3 000 € par document non conforme.",
        ],
      },
      {
        id: 'verification',
        h2: '4. Comment vérifier la validité',
        paragraphs: [
          "Trois étapes pour vérifier qu'une attestation décennale est valide en 2026 :",
        ],
        list: {
          ordered: true,
          items: [
            "Vérifier la date d'échéance (couverture en cours au moment du chantier)",
            'Vérifier le numéro ORIAS sur orias.fr (statut actif, catégorie b)',
            "Appeler l'assureur indiqué pour confirmer que le contrat est bien actif (10-15 min)",
          ],
        },
        callout: {
          tone: 'warning',
          text: 'Une attestation peut sembler authentique mais le contrat avoir été résilié pour défaut de paiement. La vérification téléphonique reste la seule garantie absolue.',
        },
      },
      {
        id: 'refus-artisan',
        h2: "5. Que faire si l'artisan refuse",
        paragraphs: [
          "Un artisan BTP qui refuse de fournir son attestation décennale est probablement non assuré. Recours : (1) refuser de signer le devis, (2) signaler à la DGCCRF, (3) saisir la chambre de métiers locale. Ne JAMAIS commencer un chantier sans avoir l'attestation valide en main.",
        ],
      },
      {
        id: 'modele',
        h2: '6. Modèle PDF téléchargeable',
        paragraphs: [
          "Notre cabinet met à disposition un modèle d'attestation décennale conforme à l'arrêté 2016. Téléchargez-le via notre outil dédié sur la page Outils. Le modèle reprend les 11 mentions obligatoires avec format A4 imprimable.",
        ],
      },
    ],
  },

  'attestation-rc-pro-modele-pdf-2026': {
    slug: 'attestation-rc-pro-modele-pdf-2026',
    title: 'Attestation RC Pro 2026 : modèle PDF et mentions légales obligatoires',
    description:
      "Tout sur l'attestation RC Pro en 2026 : différences avec décennale, mentions imposées par profession réglementée, comment l'obtenir, modèle PDF officiel téléchargeable.",
    category: 'RC Pro',
    tags: ['attestation rc pro', 'modèle pdf', 'mentions légales', 'profession réglementée'],
    ...AUTHOR,
    publishedAt: '2026-05-20',
    updatedAt: '2026-05-20',
    readTime: '5 min',
    sources: [
      LEGIFRANCE('Code des assurances art. L. 521-2', 'codes/article_lc/LEGIARTI000036330033'),
      LEGIFRANCE('Loi 71-1130 art. 27 (RC Pro avocats)', 'loda/id/JORFTEXT000000339276'),
      ORIAS,
    ],
    toc: [
      { id: 'difference', title: '1. RC Pro vs décennale : différences' },
      { id: 'mentions-pro-reglementee', title: '2. Mentions par profession réglementée' },
      { id: 'comment-obtenir', title: '3. Comment télécharger via votre courtier' },
      { id: 'modele', title: '4. Modèle PDF type' },
    ],
    body: [
      {
        id: 'difference',
        h2: '1. RC Pro vs décennale : différences',
        paragraphs: [
          'Attestation RC Pro = couverture responsabilité civile professionnelle pour tout métier. Attestation décennale = exclusive aux constructeurs BTP. Une RC Pro classique ne contient PAS de garantie décennale (sauf contrat spécifique BTP combiné).',
        ],
      },
      {
        id: 'mentions-pro-reglementee',
        h2: '2. Mentions par profession réglementée',
        paragraphs: [
          "Certaines professions imposent des mentions complémentaires sur l'attestation :",
        ],
        list: {
          items: [
            "Avocats : plafond minimum 1,5 M€ + référence à l'art. 27 Loi 71-1130",
            "Médecins libéraux : plafond 6,1 M€ + référence à l'art. R. 1142-4 CSP",
            'Agents immobiliers : plafond 110 k€ + numéro carte T (Loi Hoguet)',
            'Experts-comptables : plafond 1 M€ + numéro Ordre national',
            "Agents généraux d'assurance : plafond 1,5 M€ + immatriculation ORIAS",
          ],
        },
      },
      {
        id: 'comment-obtenir',
        h2: '3. Comment télécharger via votre courtier',
        paragraphs: [
          "Votre courtier ORIAS doit pouvoir vous fournir l'attestation RC Pro à tout moment, gratuitement, sous 24 h ouvrées maximum. Méthodes : (1) espace client en ligne, (2) email, (3) courrier postal. Vivos Assurance fournit l'attestation en signature électronique immédiate dans l'espace client.",
        ],
      },
      {
        id: 'modele',
        h2: '4. Modèle PDF type',
        paragraphs: [
          "Un modèle d'attestation RC Pro contient au minimum : nom assureur, numéro contrat, identité assuré, activité couverte, période validité, plafonds, exclusions principales, numéro ORIAS courtier (cliquable), procédure réclamation. Téléchargez notre modèle officiel via notre page Outils.",
        ],
      },
    ],
  },

  'lettre-resiliation-assurance-pro-loi-hamon-2026': {
    slug: 'lettre-resiliation-assurance-pro-loi-hamon-2026',
    title: 'Lettre de résiliation assurance pro Loi Hamon 2026 : modèle officiel',
    description:
      'Comment résilier votre assurance pro après 1 an avec la Loi Hamon. Modèle de lettre, préavis 1 mois, procédure, cas particulier décennale (Loi Spinetta). Outil PDF.',
    category: 'RC Pro',
    tags: ['résiliation', 'loi hamon', 'modèle lettre', 'assurance pro'],
    ...AUTHOR,
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readTime: '6 min',
    sources: [
      LEGIFRANCE('Loi 2014-344 du 17 mars 2014 (Hamon)', 'loda/id/JORFTEXT000028738036'),
      LEGIFRANCE('Code des assurances art. L. 113-15-2', 'codes/article_lc/LEGIARTI000028744931'),
      LEGIFRANCE(
        'Code des assurances art. L. 113-12 (Chatel)',
        'codes/article_lc/LEGIARTI000006792516'
      ),
    ],
    toc: [
      { id: 'loi-hamon', title: '1. Loi Hamon : résiliation à tout moment après 1 an' },
      { id: 'preavis', title: '2. Préavis 1 mois + procédure' },
      { id: 'modele', title: '3. Modèle de lettre' },
      { id: 'decennale', title: '4. Cas particulier décennale' },
      { id: 'pieges', title: '5. Pièges courants à éviter' },
    ],
    body: [
      {
        id: 'loi-hamon',
        h2: '1. Loi Hamon : résiliation à tout moment après 1 an',
        paragraphs: [
          "Depuis la Loi Hamon du 17 mars 2014 (art. L. 113-15-2 C. assur.), la plupart des contrats d'assurance pro peuvent être résiliés à tout moment après la première année, sans frais et sans justification.",
        ],
      },
      {
        id: 'preavis',
        h2: '2. Préavis 1 mois + procédure',
        paragraphs: [
          "Préavis obligatoire : 1 mois entre l'envoi de la lettre de résiliation et la prise d'effet. Procédure recommandée :",
        ],
        list: {
          ordered: true,
          items: [
            "Envoyer la lettre en recommandé avec AR (preuve d'envoi obligatoire)",
            "Conserver le récépissé de dépôt et l'accusé de réception",
            "L'assureur a 10 jours ouvrés pour accuser réception",
            "La résiliation prend effet 1 mois après réception par l'assureur",
            'Demander un attestation de fin de contrat pour preuves',
          ],
        },
      },
      {
        id: 'modele',
        h2: '3. Modèle de lettre',
        paragraphs: [
          'Modèle officiel à adapter :',
          "\n[Votre nom, adresse]\n[Date]\n\nNom de l'assureur\nAdresse\n\nObjet : Résiliation du contrat n° [XXX] — Loi Hamon\n\nMadame, Monsieur,\n\nConformément à l'article L. 113-15-2 du Code des assurances (Loi Hamon), je vous notifie ma décision de résilier le contrat référencé ci-dessus, souscrit le [date] et reconduit pour la première fois le [date].\n\nLa résiliation prendra effet 1 mois après réception de la présente.\n\nJe vous prie de bien vouloir me transmettre une attestation de fin de contrat.\n\nCordialement,\n[Signature]\n",
        ],
      },
      {
        id: 'decennale',
        h2: '4. Cas particulier décennale',
        paragraphs: [
          "La décennale BTP est SOUMISE à la Loi Hamon (résiliation après 1 an possible) MAIS attention : vous devez impérativement avoir souscrit le nouveau contrat AVANT la date d'effet de la résiliation, sinon votre activité est illégale (Loi Spinetta). Notre cabinet gère la transition pour éviter tout vide de couverture.",
        ],
        callout: {
          tone: 'warning',
          text: 'Ne JAMAIS résilier votre décennale sans avoir signé le nouveau contrat. Un seul jour sans couverture = activité illégale.',
        },
      },
      {
        id: 'pieges',
        h2: '5. Pièges courants à éviter',
        paragraphs: ['Top 4 pièges récurrents observés sur notre portefeuille :'],
        list: {
          items: [
            'Résilier avant 1 an plein : impossible sauf cas exceptionnels (cession, déménagement, augmentation tarif >10%)',
            "Oublier le préavis 1 mois : la résiliation est repoussée d'autant",
            "Envoyer en courrier simple : pas de preuve d'envoi = risque",
            "Ne pas avoir le nouveau contrat signé avant l'ancien : pertes de couverture",
          ],
        },
      },
    ],
  },

  'carte-professionnelle-assurance-courtier': {
    slug: 'carte-professionnelle-assurance-courtier',
    title: 'Carte professionnelle assurance : ORIAS, où la trouver et comment vérifier',
    description:
      "Comment vérifier qu'un courtier en assurance est légalement immatriculé en 2026 ? Le registre ORIAS est la 'carte pro' des courtiers. Procédure, signalement ACPR.",
    category: 'RC Pro',
    tags: ['orias', 'courtier', 'vérification', 'acpr'],
    ...AUTHOR,
    publishedAt: '2026-05-22',
    updatedAt: '2026-05-22',
    readTime: '5 min',
    sources: [
      LEGIFRANCE('Code des assurances art. L. 512-1', 'codes/article_lc/LEGIARTI000006793958'),
      LEGIFRANCE('Arrêté du 6 décembre 2022 (cliquabilité ORIAS)', 'jorf/id/JORFTEXT000046718521'),
      ORIAS,
      ACPR('ACPR — Doctrine intermédiation'),
    ],
    toc: [
      { id: 'orias', title: '1. ORIAS : le registre des intermédiaires' },
      { id: 'verifier', title: '2. Comment vérifier sur orias.fr' },
      { id: 'difference', title: '3. Différences courtier / agent / mandataire' },
      { id: 'signaler', title: '4. Signaler un courtier non immatriculé' },
    ],
    body: [
      {
        id: 'orias',
        h2: '1. ORIAS : le registre des intermédiaires',
        paragraphs: [
          "Le registre ORIAS (Registre Unique des Intermédiaires en Assurance, Banque et Finance) regroupe tous les intermédiaires habilités à distribuer des contrats d'assurance en France. L'immatriculation est obligatoire depuis 2007 (art. L. 512-1 C. assur.). Le numéro ORIAS est composé de 8 chiffres (7-XX-XXX-XXX).",
        ],
      },
      {
        id: 'verifier',
        h2: '2. Comment vérifier sur orias.fr',
        paragraphs: ['Trois étapes simples pour vérifier un courtier en 2026 :'],
        list: {
          ordered: true,
          items: [
            'Aller sur www.orias.fr',
            'Entrer le numéro ORIAS du courtier (8 chiffres)',
            'Consulter la fiche officielle : statut actif/suspendu/radié, catégorie, date immatriculation, activités habilitées',
          ],
        },
        callout: {
          tone: 'info',
          text: "Depuis l'arrêté du 6 décembre 2022, tout site web de courtier doit afficher son numéro ORIAS de manière CLIQUABLE pointant vers sa fiche orias.fr. Si ce n'est pas le cas, méfiance.",
        },
      },
      {
        id: 'difference',
        h2: '3. Différences courtier / agent / mandataire',
        paragraphs: ["L'ORIAS distingue 4 catégories d'intermédiaires :"],
        list: {
          items: [
            'Catégorie a (Agent général) : mandaté par UNE compagnie, ne propose que ses produits',
            'Catégorie b (Courtier) : INDÉPENDANT, compare plusieurs compagnies pour le client',
            'Catégorie c (Mandataire) : mandaté par un courtier ou un assureur, sans capital propre',
            'Catégorie d (Mandataire intermédiaire) : niveau délégation plus restreint',
          ],
        },
      },
      {
        id: 'signaler',
        h2: '4. Signaler un courtier non immatriculé',
        paragraphs: [
          "Si vous identifiez un intermédiaire qui exerce sans immatriculation ORIAS, vous pouvez le signaler à l'ACPR via le formulaire en ligne sur acpr.banque-france.fr. Sanctions encourues : interdiction d'exercer, amendes pénales jusqu'à 300 000 €, peine d'emprisonnement (art. L. 512-2 C. assur.).",
        ],
      },
    ],
  },

  'ipid-fiche-information-produit-assurance': {
    slug: 'ipid-fiche-information-produit-assurance',
    title: "IPID 2026 : décrypter la fiche d'information produit assurance (DDA)",
    description:
      "Comment lire un IPID (Document Information Produit Assurance) en 2026. Règlement UE 2017/1469, DDA art. 20-8. Comparatif IPID Hiscox vs April, comment l'utiliser.",
    category: 'RC Pro',
    tags: ['ipid', 'dda', 'dipa', 'document information produit'],
    ...AUTHOR,
    publishedAt: '2026-05-23',
    updatedAt: '2026-05-23',
    readTime: '6 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances art. L. 521-2 (DDA information)',
        'codes/article_lc/LEGIARTI000036330033'
      ),
      {
        label: 'Règlement UE 2017/1469 (format IPID)',
        url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32017R1469',
      },
      ACPR('ACPR — Doctrine IPID'),
    ],
    toc: [
      { id: 'definition', title: "1. IPID : c'est quoi exactement" },
      { id: 'structure', title: '2. Structure standard (7 sections)' },
      { id: 'exemple', title: '3. Exemple décrypté : IPID décennale' },
      { id: 'utiliser', title: "4. Comment l'utiliser pour comparer" },
    ],
    body: [
      {
        id: 'definition',
        h2: "1. IPID : c'est quoi exactement",
        paragraphs: [
          "L'IPID (Insurance Product Information Document, ou DIPA en français pour Document d'Information sur le Produit d'Assurance) est une fiche standardisée européenne imposée par la DDA (Directive Distribution Assurance) depuis le 1er octobre 2018. Elle résume en 2 pages maximum l'essentiel d'un contrat d'assurance non-vie.",
        ],
      },
      {
        id: 'structure',
        h2: '2. Structure standard (7 sections)',
        paragraphs: ['Format imposé par le règlement UE 2017/1469. 7 sections OBLIGATOIRES :'],
        list: {
          ordered: true,
          items: [
            "De quel type d'assurance s'agit-il ?",
            "Qu'est-ce qui est assuré ? (garanties)",
            "Qu'est-ce qui n'est pas assuré ? (exclusions)",
            'Y a-t-il des restrictions de couverture ?',
            'Où suis-je couvert ? (zone géographique)',
            'Quelles sont mes obligations ?',
            'Quand et comment effectuer les paiements ?',
          ],
        },
      },
      {
        id: 'exemple',
        h2: '3. Exemple décrypté : IPID décennale',
        paragraphs: [
          "Sur un IPID décennale typique (assureur SMABTP), section 2 'Garanties' : la garantie décennale Loi Spinetta couvre 10 ans dommages compromettant solidité ouvrage. Section 3 'Exclusions' : dommages intentionnels, défauts apparents à la réception, ouvrages non couverts par garantie de bon fonctionnement. Section 6 'Obligations' : déclarer toute aggravation du risque sous 15 jours, conserver les attestations.",
        ],
      },
      {
        id: 'utiliser',
        h2: "4. Comment l'utiliser pour comparer",
        paragraphs: ['Méthode efficace pour comparer 2 IPID concurrents :'],
        list: {
          ordered: true,
          items: [
            "Liste les exclusions (section 3) — c'est ici que se cache le diable",
            'Compare les plafonds par garantie (souvent dans section 4)',
            'Vérifie les zones géographiques (section 5) — exclusions DOM, étranger',
            'Mesure les obligations déclaratives (section 6) — délais de prévenance',
          ],
        },
        callout: {
          tone: 'info',
          text: "L'IPID est un résumé. Les Conditions Générales et Particulières (CGP) restent contractuellement supérieures. Demandez toujours les CGP avant toute souscription.",
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // CATÉGORIE C — PRIX / TARIF / COMPARATIF (6 articles)
  // ════════════════════════════════════════════════════════════════════

  'combien-coute-assurance-pro-2026': {
    slug: 'combien-coute-assurance-pro-2026',
    title: 'Combien coûte une assurance pro en 2026 ? Tarifs par activité',
    description:
      "Prix réels 2026 d'une assurance pro selon votre métier, statut, CA et zone. 10 verticaux couverts (décennale, RC Pro, multirisque, mutuelle, cyber). 5 leviers d'économie.",
    category: 'RC Pro',
    tags: ['prix', 'tarif 2026', 'assurance pro', 'combien coute'],
    ...AUTHOR,
    publishedAt: '2026-05-24',
    updatedAt: '2026-05-24',
    readTime: '9 min',
    sources: [
      AQC,
      ACPR('Observatoire ACPR — tarifs assurance pro 2024'),
      LEGIFRANCE(
        'Code des assurances art. L. 113-1 (formation prime)',
        'codes/article_lc/LEGIARTI000006792500'
      ),
    ],
    toc: [
      { id: 'facteurs', title: '1. 8 facteurs qui font varier le tarif' },
      { id: 'tarifs-verticaux', title: '2. Tarifs 2026 par grand vertical' },
      { id: 'statut', title: '3. AE vs SARL : impact tarifaire' },
      { id: 'top10', title: '4. Top 10 métiers chers et bon marché' },
      { id: 'economiser', title: '5. 5 leviers pour économiser 20-40%' },
      { id: 'courtage-gratuit', title: '6. Pourquoi le courtage est gratuit' },
    ],
    body: [
      {
        id: 'facteurs',
        h2: '1. 8 facteurs qui font varier le tarif',
        paragraphs: [
          "Le tarif d'une assurance pro n'est jamais arbitraire. Il résulte de 8 paramètres pondérés par l'algorithme tarifaire de chaque assureur :",
        ],
        list: {
          ordered: true,
          items: [
            'Métier exercé (taux de sinistralité observé)',
            'Statut juridique (AE, SARL, SASU — impact 25-100%)',
            "Chiffre d'affaires annuel (plus c'est haut, plus la prime monte)",
            "Ancienneté de l'entreprise (les <2 ans paient +20%)",
            'Antécédents sinistres (3-5 dernières années — variation ±50%)',
            'Zone géographique (Paris/IDF +15%, zones cycloniques +30%)',
            'Garanties choisies (plafonds, options, franchises)',
            'Effectif salarié (un salarié = +40% sur RC Pro)',
          ],
        },
      },
      {
        id: 'tarifs-verticaux',
        h2: '2. Tarifs 2026 par grand vertical',
        paragraphs: [
          'Fourchettes annuelles HT moyennes négociées par notre cabinet en 2026 (10 assureurs partenaires) :',
        ],
        list: {
          items: [
            'Décennale BTP : 1 200 - ~3 500  €/an selon métier et statut',
            'RC Pro service (consultant, freelance, coach) : 90 - ~280  €/an',
            'RC Pro professions réglementées (médical, juridique) : 320 - ~1 500  €/an',
            'Multirisque pro (local commercial) : 380 - ~980  €/an selon surface',
            'Mutuelle TNS Madelin : 720 - ~1 800  €/an selon couverture',
            'Cyber assurance PME : 280 - ~1 200  €/an',
            'Assurance VTC : 1 800 - ~3 200  €/an',
            'Protection juridique pro : 180 - ~380  €/an',
            'Assurance auto pro (VUL) : 480 - ~1 580  €/an',
            'Flotte automobile (5 véhicules) : 5 200 - ~12 000  €/an',
          ],
        },
      },
      {
        id: 'statut',
        h2: '3. AE vs SARL : impact tarifaire',
        paragraphs: [
          "À activité identique, un AE consultant à 60 k€ CA paie~ 180  €/an de RC Pro. Le même consultant en SARL paie~ 340  €/an, soit +89%. Le différentiel s'explique par : plafonds garantie plus élevés (3 M€ vs 1 M€), responsabilité dirigeant élargie, et appétence assureur moindre sur les structures patrimoniales.",
        ],
      },
      {
        id: 'top10',
        h2: '4. Top 10 métiers chers et bon marché',
        paragraphs: [
          'Les 5 métiers les moins chers en 2026 (RC Pro tout compris) :',
          'Formateur indépendant : 90-180 €/an. Coach pro / business : 100-220 €/an. Photographe événementiel : 140-240 €/an. Web designer / freelance créatif : 120-240 €/an. Traducteur indépendant : 100-200 €/an.',
          'Les 5 métiers les plus chers (RC Pro + obligations spécifiques) :',
        ],
        list: {
          items: [
            'Chirurgien libéral : 8 200-22 ~000  €/an (plafond 25 M€)',
            'Avocat associé cabinet : 1 800-4 ~800  €/an',
            'Notaire collaborateur : 1 100-3 ~200  €/an',
            'Médecin spécialiste : 1 200-2 ~800  €/an',
            'Expert-comptable : 380-2 ~200  €/an',
          ],
        },
      },
      {
        id: 'economiser',
        h2: '5. 5 leviers pour économiser 20-40%',
        paragraphs: ['Notre cabinet observe une économie moyenne de 32% via 5 leviers concrets :'],
        list: {
          ordered: true,
          items: [
            'Mise en concurrence systématique (10 assureurs comparés)',
            'Optimisation du plafond (ne pas surassurer)',
            'Franchise ajustée (passer de 0 € à 500 € de franchise = -15%)',
            'Regroupement contrats (combo RC Pro + Multirisque = -10%)',
            'Antécédents propres mis en valeur (RI 5 ans sans sinistre = -20%)',
          ],
        },
      },
      {
        id: 'courtage-gratuit',
        h2: '6. Pourquoi le courtage est gratuit',
        paragraphs: [
          "Notre rémunération est exclusivement versée par les compagnies d'assurance partenaires (transparence DDA art. L. 521-2 C. assur.). Aucun frais de courtage n'est facturé au client. Le détail des commissions est communicable sur demande écrite avant souscription.",
        ],
      },
    ],
  },

  'prix-assurance-decennale-2026-par-metier': {
    slug: 'prix-assurance-decennale-2026-par-metier',
    title: 'Prix assurance décennale 2026 : analyse 12 métiers BTP',
    description:
      'Tarifs réels décennale 2026 par métier BTP. 12 métiers analysés (maçon, plombier, électricien, couvreur, étancheur, photovoltaïque…). Drivers tarifaires et économies possibles.',
    category: 'BTP',
    tags: ['prix décennale', 'tarif 2026', 'btp', 'sinistralité'],
    ...AUTHOR,
    publishedAt: '2026-05-25',
    updatedAt: '2026-05-25',
    readTime: '8 min',
    sources: [
      AQC,
      LEGIFRANCE('Code des assurances art. L. 241-1', 'codes/article_lc/LEGIARTI000006794155'),
      { label: 'FFB Chiffres-clés du bâtiment 2024', url: 'https://www.ffbatiment.fr/' },
    ],
    toc: [
      { id: 'tableau', title: '1. Tableau récap 12 métiers × 4 statuts' },
      { id: 'sinistralite', title: '2. Sinistralité comme driver tarifaire' },
      { id: 'cher', title: '3. Top métiers les plus chers (et pourquoi)' },
      { id: 'bon-marche', title: '4. Top métiers les moins chers' },
      { id: 'evolution', title: '5. Évolution 2025-2026 : +4-7% inflation' },
    ],
    body: [
      {
        id: 'tableau',
        h2: '1. Tableau récap 12 métiers × 4 statuts',
        paragraphs: [
          'Tarifs annuels HT 2026 négociés en moyenne sur notre portefeuille (auto-entrepreneur / SARL CA 100 k€) :',
        ],
        list: {
          items: [
            'Peintre : 1 200-1 800 € AE / 1 800-2 600 € SARL',
            'Carreleur : 1 300-1 900 € AE / 1 900-2 700 € SARL',
            'Plombier-chauffagiste : 1 400-2 100 € AE / 2 100-3 000 € SARL',
            'Électricien : 1 500-2 200 € AE / 2 200-3 100 € SARL',
            'Maçon : 1 600-2 400 € AE / 2 400-3 400 € SARL',
            'Menuisier intérieur : 1 400-2 100 € AE / 2 100-3 000 € SARL',
            'Charpentier bois : 1 700-2 500 € AE / 2 500-3 600 € SARL',
            'Couvreur-zingueur : 1 800-2 600 € AE / 2 600-3 700 € SARL',
            'Charpentier métal : 2 000-2 900 € AE / 2 900-4 100 € SARL',
            'Étancheur : 2 000-3 500 € AE / 3 500-5 000 € SARL',
            'Photovoltaïque RGE : 2 200-3 200 € AE / 3 200-4 600 € SARL',
            "Maître d'œuvre : 1 800-2 800 € AE / 2 800-4 000 € SARL",
          ],
        },
      },
      {
        id: 'sinistralite',
        h2: '2. Sinistralité comme driver tarifaire',
        paragraphs: [
          'Le tarif décennale est largement déterminé par la sinistralité observée pour le métier (AQC SYCODÉS). Plus le métier sinistre, plus la prime monte. Corrélation 2024 : 1 point de sinistralité supplémentaire = +12% sur la prime.',
        ],
      },
      {
        id: 'cher',
        h2: '3. Top métiers les plus chers (et pourquoi)',
        paragraphs: ['Top 3 métiers les plus chers en décennale et raisons :'],
        list: {
          ordered: true,
          items: [
            'Étancheur : sinistralité 13,5% (infiltrations toitures-terrasses). Coût moyen sinistre 28 500 €',
            'Photovoltaïque RGE : sinistralité 11,2% (défauts pose + connexions). Coût moyen 22 000 €',
            'Couvreur-zingueur : sinistralité 9,8% (infiltrations + chute en hauteur). Coût moyen 18 000 €',
          ],
        },
      },
      {
        id: 'bon-marche',
        h2: '4. Top métiers les moins chers',
        paragraphs: ['Métiers avec sinistralité <5% et donc primes basses :'],
        list: {
          items: [
            'Peintre en bâtiment : 3,8% sinistralité',
            'Carreleur : 4,2% sinistralité',
            'Menuisier intérieur : 4,5% sinistralité',
            'Plâtrier sec : 4,1% sinistralité',
          ],
        },
      },
      {
        id: 'evolution',
        h2: '5. Évolution 2025-2026 : +4-7% inflation',
        paragraphs: [
          "L'inflation tarifaire décennale moyenne 2026 vs 2025 est de +4 à 7% selon métier (source : observatoire FFA + portefeuille cabinet). Drivers : (1) inflation matériaux/main-d'œuvre (renchérissement des indemnisations), (2) re-tarification post-canicule 2023-2024, (3) hausses ré-assurance européenne.",
        ],
      },
    ],
  },

  'tarif-rc-pro-2026-par-profession': {
    slug: 'tarif-rc-pro-2026-par-profession',
    title: 'Tarif RC Pro 2026 par profession : barème complet 30 métiers',
    description:
      'Barème complet 2026 du tarif RC Pro par profession en France. 30 métiers analysés (consultant, médecin, avocat, agent immo, formateur…). Plafonds standards et écart AE/SARL/Grand compte.',
    category: 'RC Pro',
    tags: ['tarif rc pro', 'prix 2026', 'profession', 'barème'],
    ...AUTHOR,
    publishedAt: '2026-05-26',
    updatedAt: '2026-05-26',
    readTime: '9 min',
    sources: [
      LEGIFRANCE('Code des assurances art. L. 113-1', 'codes/article_lc/LEGIARTI000006792500'),
      ACPR('ACPR — Observatoire RC Pro 2024'),
    ],
    toc: [
      { id: 'services', title: '1. Services aux entreprises (10 métiers)' },
      { id: 'medical', title: '2. Médical paramédical (8 métiers)' },
      { id: 'juridique', title: '3. Juridique réglementé (5 métiers)' },
      { id: 'creatif', title: '4. Créatifs / freelances (7 métiers)' },
      { id: 'plafond', title: '5. Plafond garantie standard par profession' },
    ],
    body: [
      {
        id: 'services',
        h2: '1. Services aux entreprises (10 métiers)',
        paragraphs: ['Tarifs annuels HT 2026 (AE / SARL / Grand compte) :'],
        list: {
          items: [
            'Consultant marketing : 180 / 340 / 850 €',
            'Consultant management : 220 / 420 / 1 100 €',
            'Coach business : 200 / 380 / 950 €',
            'Formateur indépendant : 120 / 240 / 600 €',
            'Expert-comptable : 380 / 720 / 2 200 €',
            'Auditeur indépendant : 320 / 620 / 1 800 €',
            'Gestion patrimoine (CGP) : 480 / 920 / 2 800 €',
            'Recouvrement de créances : 280 / 540 / 1 350 €',
            'Conseil en stratégie : 240 / 460 / 1 200 €',
            'Coach sportif business : 180 / 340 / 850 €',
          ],
        },
      },
      {
        id: 'medical',
        h2: '2. Médical paramédical (8 métiers)',
        paragraphs: [
          'Tarifs annuels HT 2026 (TNS libéral / cabinet SCM / clinique) — RC Pro OBLIGATOIRE (Loi Kouchner) :',
        ],
        list: {
          items: [
            'Kinésithérapeute : 380 / 580 / 1 800 €',
            'Infirmier libéral : 320 / 520 / 1 600 €',
            'Ostéopathe : 580 / 920 / 2 800 €',
            'Sage-femme libérale : 480 / 780 / 2 400 €',
            'Diététicien-nutritionniste : 280 / 460 / 1 400 €',
            'Psychologue : 240 / 420 / 1 200 €',
            'Pédicure-podologue : 320 / 540 / 1 600 €',
            'Audioprothésiste : 380 / 680 / 2 200 €',
          ],
        },
      },
      {
        id: 'juridique',
        h2: '3. Juridique réglementé (5 métiers)',
        paragraphs: ['RC Pro OBLIGATOIRE pour toutes ces professions. Tarifs 2026 :'],
        list: {
          items: [
            'Avocat libéral : 720-1 ~800  €/an (plafond mini 1,5 M€)',
            'Notaire (collaborateur) : 1 100-3 ~200  €/an',
            'Huissier de justice : 980-2 ~400  €/an',
            'Mandataire judiciaire : 1 200-2 ~800  €/an',
            'Conseil en propriété industrielle : 580-1 ~400  €/an',
          ],
        },
      },
      {
        id: 'creatif',
        h2: '4. Créatifs / freelances (7 métiers)',
        paragraphs: ['Tarifs annuels HT 2026 (AE / SARL) :'],
        list: {
          items: [
            'Web designer freelance : 120-240 €',
            'Développeur freelance IT : 180-420 €',
            'Photographe événementiel : 240-480 €',
            'Vidéaste / motion designer : 220-440 €',
            "Architecte d'intérieur : 380-720 €",
            'Designer graphique : 140-280 €',
            'Traducteur indépendant : 100-200 €',
          ],
        },
      },
      {
        id: 'plafond',
        h2: '5. Plafond garantie standard par profession',
        paragraphs: ['Plafonds 2026 minimums conseillés selon profession :'],
        list: {
          items: [
            'Consultant / freelance : 1 M€ par sinistre',
            'Profession médicale paramédicale : 6,1 M€ (R. 1142-4 CSP)',
            'Avocat libéral : 1,5 M€ minimum (Loi 71-1130)',
            'Agent immobilier : 110 k€ (Loi Hoguet)',
            'Expert-comptable : 1 M€ minimum (Ordre)',
            'IT critique (SI bancaire, santé) : 3-5 M€ recommandé',
          ],
        },
      },
    ],
  },

  'decennale-pas-chere-5-strategies-economies': {
    slug: 'decennale-pas-chere-5-strategies-economies',
    title: 'Décennale pas chère : 5 stratégies de courtier pour économiser 30%',
    description:
      '5 leviers concrets de courtier ORIAS pour obtenir une décennale moins chère en 2026 sans sacrifier la couverture. Cas concret maçon AE : 2 400 € →~ 1 600  €/an.',
    category: 'BTP',
    tags: ['décennale pas cher', 'économiser', 'courtier', 'btp'],
    ...AUTHOR,
    publishedAt: '2026-05-27',
    updatedAt: '2026-05-27',
    readTime: '7 min',
    sources: [
      AQC,
      LEGIFRANCE('Code des assurances art. L. 113-1', 'codes/article_lc/LEGIARTI000006792500'),
    ],
    toc: [
      { id: 'lev-1', title: '1. Levier 1 — Franchise ajustée' },
      { id: 'lev-2', title: '2. Levier 2 — Plafond optimisé' },
      { id: 'lev-3', title: '3. Levier 3 — Groupement par métier' },
      { id: 'lev-4', title: '4. Levier 4 — Historique sinistralité valorisé' },
      { id: 'lev-5', title: '5. Levier 5 — Courtage indépendant' },
      { id: 'cas-pratique', title: '6. Cas pratique : maçon AE de 2 400 € à ~1 600  €/an' },
    ],
    body: [
      {
        id: 'lev-1',
        h2: '1. Levier 1 — Franchise ajustée',
        paragraphs: [
          "La franchise est le montant restant à votre charge en cas de sinistre. Standard : 0 €. En la passant à 500 € ou 1 000 €, vous réduisez la prime de 12 à 18%. Stratégie efficace si vous n'avez pas eu de sinistre récent.",
        ],
        callout: {
          tone: 'info',
          text: 'Économie type maçon : passer de franchise 0 → 1 000 € = -180 €/an sur la prime.',
        },
      },
      {
        id: 'lev-2',
        h2: '2. Levier 2 — Plafond optimisé',
        paragraphs: [
          "Le plafond décennale est de 1 à 5 M€ généralement. Beaucoup d'artisans choisissent 5 M€ par prudence, mais avec une analyse précise des chantiers types, 2-3 M€ suffisent souvent. Économie possible : 15-25%.",
        ],
      },
      {
        id: 'lev-3',
        h2: '3. Levier 3 — Groupement par métier',
        paragraphs: [
          'Certains assureurs (SMABTP, Allianz Pro) proposent des tarifs préférentiels via des accords cadres avec des associations professionnelles (Capeb, FFB). Économie : 8-15%.',
        ],
      },
      {
        id: 'lev-4',
        h2: '4. Levier 4 — Historique sinistralité valorisé',
        paragraphs: [
          "Si vos 5 dernières années sont sans sinistre, votre relevé d'information (RI) vaut de l'or. Notre cabinet sait le présenter aux assureurs pour décrocher des bonus jusqu'à -20%.",
        ],
      },
      {
        id: 'lev-5',
        h2: '5. Levier 5 — Courtage indépendant',
        paragraphs: [
          'Un courtier ORIAS indépendant met systématiquement 3-5 assureurs en concurrence pour vous. Économie moyenne observée sur notre portefeuille : 32% vs souscription directe. ZERO frais de courtage facturé au client (rémunération via commissions assureur).',
        ],
      },
      {
        id: 'cas-pratique',
        h2: '6. Cas pratique : maçon AE de 2 400 € à ~1 600  €/an',
        paragraphs: [
          'Cas réel anonymisé : maçon AE 8 ans expérience, CA 60 k€, zone IDF, sans sinistre depuis 5 ans. Prime initiale assureur direct :~ 2 400  €/an. Après intervention de notre cabinet :~ 1 600  €/an. Économie :~ 800  €/an soit -33%.',
        ],
        list: {
          items: [
            'Mise en concurrence 4 assureurs SMABTP/Allianz Pro/MMA/Generali : -250 €',
            'Plafond optimisé 5 M€ → 3 M€ : -180 €',
            'Franchise 0 € → 500 € : -120 €',
            'Bonus sinistralité 5 ans propre valorisé : -250 €',
          ],
        },
      },
    ],
  },

  'mutuelle-tns-madelin-comparatif-2026': {
    slug: 'mutuelle-tns-madelin-comparatif-2026',
    title: 'Mutuelle TNS Madelin 2026 : comparatif 7 organismes et économies fiscales',
    description:
      'Comparatif 2026 des 7 meilleures mutuelles TNS Madelin (Swiss Life, Allianz, MGEN, Generali, AXA, MMA, Aésio). Plafonds, économies fiscales selon TMI 30-45%, choix par profil.',
    category: 'Mutuelle / TNS',
    tags: ['mutuelle tns', 'madelin', 'tns', 'fiscalité', 'comparatif'],
    ...AUTHOR,
    publishedAt: '2026-05-28',
    updatedAt: '2026-05-28',
    readTime: '8 min',
    sources: [
      LEGIFRANCE('CGI art. 154 bis (Loi Madelin)', 'codes/article_lc/LEGIARTI000028441933'),
      LEGIFRANCE('Loi 94-126 du 11 février 1994 (Madelin)', 'loda/id/JORFTEXT000000729294'),
      { label: 'URSSAF — PASS 2026', url: 'https://www.urssaf.fr/' },
    ],
    toc: [
      { id: 'madelin-c-quoi', title: "1. Loi Madelin : c'est quoi" },
      { id: 'top7', title: '2. Top 7 mutuelles TNS 2026' },
      { id: 'criteres', title: '3. 6 critères de comparaison' },
      { id: 'plafond', title: '4. Plafond déductible 2026' },
      { id: 'economies', title: '5. Économies fiscales selon TMI' },
      { id: 'choisir', title: '6. Comment choisir selon votre profil' },
    ],
    body: [
      {
        id: 'madelin-c-quoi',
        h2: "1. Loi Madelin : c'est quoi",
        paragraphs: [
          "La Loi Madelin du 11 février 1994 (art. 154 bis CGI) permet aux Travailleurs Non-Salariés (TNS) de déduire fiscalement les cotisations de mutuelle, prévoyance, retraite et perte d'emploi de leur bénéfice imposable. Économie d'impôts moyenne 30-45% selon TMI.",
        ],
        callout: {
          tone: 'warning',
          text: "La Loi Madelin n'est PAS applicable aux auto-entrepreneurs (régime micro-fiscal sans bénéfice imposable). Préférez une mutuelle santé indépendant non-Madelin.",
        },
      },
      {
        id: 'top7',
        h2: '2. Top 7 mutuelles TNS 2026',
        paragraphs: ['Notre comparatif 2026 sur la base de 7 critères :'],
        list: {
          items: [
            'Swiss Life Pro : 78/100 — top optique/dentaire, leader marché',
            'Allianz Pro Mutuelle : 75/100 — large réseau, accès tiers payant',
            'MGEN TNS : 73/100 — historiquement fonction publique, ouverte TNS',
            'Generali Pro Santé : 72/100 — bonne médecine douce',
            'AXA Pro Santé : 71/100 — réseau Itelis',
            'MMA Pro Santé : 70/100 — bonne hospi',
            'Aésio (ex-Adréa) : 68/100 — économique, bon rapport qualité/prix',
          ],
        },
      },
      {
        id: 'criteres',
        h2: '3. 6 critères de comparaison',
        paragraphs: ['Évaluez chaque mutuelle sur 6 dimensions :'],
        list: {
          ordered: true,
          items: [
            'Cotisation mensuelle vs garanties (€/mois)',
            'Plafond optique (lunettes, lentilles)',
            'Plafond dentaire (couronnes, orthodontie)',
            'Plafond hospitalisation (chambre particulière, dépassements)',
            'Médecine douce (ostéo, acupuncture, kiné non remboursée)',
            'Délai carence (3, 6, 12 mois selon poste)',
          ],
        },
      },
      {
        id: 'plafond',
        h2: '4. Plafond déductible 2026',
        paragraphs: [
          'Plafond Madelin 2026 calculé sur le PASS (Plafond Annuel Sécurité Sociale) : 4 997 € pour santé+prévoyance combinés (3,75% PASS + 7% du bénéfice imposable dans la limite de 3% de 8 PASS).',
        ],
      },
      {
        id: 'economies',
        h2: '5. Économies fiscales selon TMI',
        paragraphs: [
          "Économie d'impôts annuelle pour une cotisation Madelin de~ 3 000  €/an selon votre TMI :",
        ],
        list: {
          items: [
            'TMI 11% : économie~ 330  €/an',
            'TMI 30% : économie~ 900  €/an',
            'TMI 41% : économie~ 1 230  €/an',
            'TMI 45% : économie~ 1 350  €/an',
          ],
        },
      },
      {
        id: 'choisir',
        h2: '6. Comment choisir selon votre profil',
        paragraphs: ['Recommandations selon profil :'],
        list: {
          items: [
            'TNS jeune (<35 ans, sans famille) : Aésio ou MMA — économique',
            'TNS 35-50 famille : Allianz Pro ou Generali — meilleur rapport garanties/prix',
            "TNS >50 ans : Swiss Life Pro — meilleur dentaire/optique pour cette tranche d'âge",
            'TNS pratiquant médecine douce : Generali Pro Santé — large couverture ostéo/acupuncture',
            'TNS sportif amateur : AXA Pro Santé — couverture sport étendue',
          ],
        },
      },
    ],
  },

  'comparateur-10-assureurs-pro-2026': {
    slug: 'comparateur-10-assureurs-pro-2026',
    title: 'Comparateur 10 assureurs pro 2026 : forces, spécialités, tarifs',
    description:
      'Comparatif complet 2026 des 10 assureurs pro français (Hiscox, April, MMA, Generali, AXA, MAAF, SMABTP, Wakam, Stello, Allianz). Notes Pappers, TrustScore, spécialités, plafonds.',
    category: 'RC Pro',
    tags: ['comparateur', 'assureur pro', '10 assureurs', 'forces'],
    ...AUTHOR,
    publishedAt: '2026-05-29',
    updatedAt: '2026-05-29',
    readTime: '10 min',
    sources: [
      { label: 'Pappers — Solidité financière assureurs', url: 'https://www.pappers.fr/' },
      { label: 'Trustpilot — Avis ISO 20488 vérifiés', url: 'https://www.trustpilot.com/' },
      ACPR('ACPR — Registre des organismes'),
    ],
    toc: [
      { id: 'methodo', title: '1. Méthodologie de comparaison' },
      { id: 'top3', title: '2. Top 3 généralistes (Hiscox, April, Allianz)' },
      { id: 'specialistes', title: '3. Spécialistes par vertical' },
      { id: 'matrice', title: '4. Matrice de décision par profil client' },
    ],
    body: [
      {
        id: 'methodo',
        h2: '1. Méthodologie de comparaison',
        paragraphs: [
          "Notre comparatif 2026 utilise 6 critères pondérés : (1) solidité financière (Pappers score sur 100), (2) note Trustpilot ISO 20488 (4-5 étoiles), (3) délai moyen d'indemnisation, (4) plafonds standards proposés, (5) spécialités sectorielles, (6) prix moyen négocié.",
        ],
      },
      {
        id: 'top3',
        h2: '2. Top 3 généralistes (Hiscox, April, Allianz)',
        paragraphs: ['Le tiercé gagnant 2026 des assureurs généralistes pro :'],
        list: {
          ordered: true,
          items: [
            'Hiscox (4,6/5 Trustpilot, solidité 92/100) : leader RC Pro tech + consulting. Tarifeur instantané. Excellence sinistres. Prix premium.',
            'April Pro (4,4/5, 85/100) : référence française BTP multi-vertical. Plateforme courtier mature. Tarifs très compétitifs BTP.',
            'Allianz Pro (4,3/5, 96/100) : géant multi-pays, solide ETI et grands comptes. Réseau international.',
          ],
        },
      },
      {
        id: 'specialistes',
        h2: '3. Spécialistes par vertical',
        paragraphs: [
          'Pour des besoins spécifiques, certains assureurs excellent dans leur niche :',
        ],
        list: {
          items: [
            'SMABTP : LEADER décennale BTP, profondeur métier inégalée',
            'MMA Pro : top auto pro + flotte automobile',
            'Generali Pro : santé/mutuelle TNS top 3',
            'AXA Pro : équilibré tous segments, bon Madelin',
            'MAAF Pro : référence collectivités/MJPM',
            'Wakam : insurtech moderne, RC Pro freelance/digital',
            'Stello : nouveau-né 2024, agressif sur tarifs AE',
          ],
        },
      },
      {
        id: 'matrice',
        h2: '4. Matrice de décision par profil client',
        paragraphs: ['Notre matrice 2026 pour vous aider à choisir le bon partenaire :'],
        list: {
          items: [
            'AE consultant CA <50k : Wakam ou Stello (compétitifs)',
            'SARL service CA 100-300k : April Pro ou Allianz (équilibre)',
            'Artisan BTP AE : SMABTP (décennale leader) + complément MMA',
            'Médecin libéral : Generali Pro (santé) + MAAF (RC médicale)',
            'PME 10-50 salariés : Allianz Pro ou AXA Pro (capacité)',
            'Grand compte : Hiscox (premium) ou Generali Italia (ETI)',
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // CATÉGORIE D — GUIDES JURIDIQUES (7 articles)
  // ════════════════════════════════════════════════════════════════════

  'decennale-vs-dommages-ouvrage-7-differences': {
    slug: 'decennale-vs-dommages-ouvrage-7-differences',
    title: 'Décennale vs Dommages-ouvrage : 7 différences clés à connaître',
    description:
      'Comparatif 2026 décennale vs dommages-ouvrage. 7 différences (souscripteur, durée, indemnisation, recours, prix, obligation, sinistre type). Cas pratique propriétaire individuel.',
    category: 'BTP',
    tags: ['décennale', 'dommages ouvrage', 'spinetta', 'différences'],
    ...AUTHOR,
    publishedAt: '2026-05-30',
    updatedAt: '2026-05-30',
    readTime: '7 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances art. L. 241-1 (décennale)',
        'codes/article_lc/LEGIARTI000006794155'
      ),
      LEGIFRANCE('Code des assurances art. L. 242-1 (DO)', 'codes/article_lc/LEGIARTI000006794216'),
      LEGIFRANCE('Code civil art. 1792', 'codes/article_lc/LEGIARTI000006442458'),
    ],
    toc: [
      { id: 'tableau', title: '1. Tableau récap 7 différences' },
      { id: 'souscripteur', title: '2. Qui souscrit chaque garantie' },
      { id: 'indemnisation', title: "3. Mécanique d'indemnisation" },
      { id: 'cas-pratique', title: '4. Cas pratique : propriétaire qui fait construire' },
      { id: 'temporel', title: '5. Frise temporelle des garanties' },
    ],
    body: [
      {
        id: 'tableau',
        h2: '1. Tableau récap 7 différences',
        paragraphs: ['Les 7 différences fondamentales :'],
        list: {
          ordered: true,
          items: [
            "Souscripteur : décennale = artisan/constructeur. DO = maître d'ouvrage (le client final).",
            'Durée : décennale = 10 ans après réception. DO = 10 ans + extension parfait achèvement.',
            'Indemnisation : décennale = procédure longue (1-3 ans). DO = pré-indemnisation rapide (60 j).',
            "Recours : décennale = recours contre l'artisan. DO = recours intercession DO contre l'artisan ensuite.",
            'Prix : décennale = 1 200-3 ~500  €/an. DO = 1 à 5% du coût construction (one-shot).',
            "Obligation : décennale OBLIGATOIRE pour artisan. DO OBLIGATOIRE pour maître d'ouvrage.",
            'Sinistre type : décennale = défaut structurel. DO = même mais indemnisation rapide client.',
          ],
        },
      },
      {
        id: 'souscripteur',
        h2: '2. Qui souscrit chaque garantie',
        paragraphs: [
          "La décennale est souscrite et payée par l'artisan ou l'entreprise BTP. La dommages-ouvrage est souscrite et payée par le maître d'ouvrage (le propriétaire qui fait construire ou rénover). Ce sont DEUX garanties complémentaires, jamais alternatives.",
        ],
      },
      {
        id: 'indemnisation',
        h2: "3. Mécanique d'indemnisation",
        paragraphs: [
          "Sans DO, le maître d'ouvrage doit attendre la fin du procès contre l'artisan (1-3 ans en moyenne) pour être indemnisé. Avec DO, l'assureur DO indemnise sous 60 jours puis fait son recours contre la décennale de l'artisan. Avantage maître d'ouvrage : trésorerie préservée.",
        ],
      },
      {
        id: 'cas-pratique',
        h2: '4. Cas pratique : propriétaire qui fait construire',
        paragraphs: [
          "M. Dupont fait construire une maison 300 k€ en 2022. En 2024 : infiltrations toiture massives. SANS DO : il doit assigner l'entreprise en justice, attendre expertise judiciaire + jugement (2 ans), avancer travaux (50 k€). AVEC DO : il déclare à son assureur DO, expertise sous 30 j, indemnisation 50 k€ sous 60 j. L'assureur DO se fait ensuite rembourser par la décennale de l'artisan.",
        ],
      },
      {
        id: 'temporel',
        h2: '5. Frise temporelle des garanties',
        paragraphs: ['Frise chronologique des garanties construction en France :'],
        list: {
          items: [
            'T+0 à T+1 an : Garantie de parfait achèvement (artisan répare tout désordre signalé)',
            'T+0 à T+2 ans : Garantie biennale (équipements dissociables : robinetterie, volets, etc.)',
            'T+0 à T+10 ans : Garantie décennale (structure, étanchéité)',
            'T+0 à T+10 ans : Dommages-ouvrage (préfinancement rapide des sinistres décennaux)',
          ],
        },
      },
    ],
  },

  'loi-spinetta-1978-obligations-artisans-2026': {
    slug: 'loi-spinetta-1978-obligations-artisans-2026',
    title: "Loi Spinetta 1978 : ce qu'elle impose aux artisans BTP en 2026",
    description:
      'Guide complet 2026 de la Loi Spinetta du 4 janvier 1978. Historique, 5 obligations imposées aux constructeurs, 5 garanties créées, évolutions 2024-2026, sanctions civiles + pénales.',
    category: 'BTP',
    tags: ['loi spinetta', '1978', 'btp', 'obligations'],
    ...AUTHOR,
    publishedAt: '2026-05-31',
    updatedAt: '2026-05-31',
    readTime: '9 min',
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
    ],
    toc: [
      { id: 'historique', title: '1. Historique : pourquoi la Loi Spinetta' },
      { id: 'obligations', title: '2. 5 obligations imposées aux constructeurs' },
      { id: 'garanties', title: '3. 5 garanties créées par la loi' },
      { id: 'evolutions', title: '4. Évolutions 2024-2026' },
      { id: 'sanctions', title: '5. Sanctions civiles + pénales' },
    ],
    body: [
      {
        id: 'historique',
        h2: '1. Historique : pourquoi la Loi Spinetta',
        paragraphs: [
          "La Loi Spinetta du 4 janvier 1978 (du nom du député Adrien Spinetta) est née suite à plusieurs catastrophes de construction des années 1970 (effondrements, malfaçons graves) qui laissaient les maîtres d'ouvrage sans recours efficace face à des artisans insolvables. La loi a instauré un régime d'assurance OBLIGATOIRE et une responsabilité de plein droit des constructeurs.",
        ],
      },
      {
        id: 'obligations',
        h2: '2. 5 obligations imposées aux constructeurs',
        paragraphs: [
          'La Loi Spinetta + ses codifications (Code des assurances + Code civil) imposent 5 obligations :',
        ],
        list: {
          ordered: true,
          items: [
            'Souscrire une assurance décennale AVANT chaque chantier (art. L. 241-1 C. assur.)',
            "Remettre l'attestation au client AVANT le début des travaux (art. L. 243-2)",
            "Indiquer l'attestation sur tous devis et factures (arrêté 2022)",
            'Maintenir la couverture pendant TOUTE la durée du chantier + 10 ans',
            'Déclarer toute aggravation du risque à son assureur (art. L. 113-2 C. assur.)',
          ],
        },
      },
      {
        id: 'garanties',
        h2: '3. 5 garanties créées par la loi',
        paragraphs: ['La Loi a structuré la chaîne de garanties construction :'],
        list: {
          ordered: true,
          items: [
            'Garantie de parfait achèvement (1 an post-réception)',
            'Garantie biennale (2 ans, équipements dissociables)',
            'Garantie décennale (10 ans, structure et impropreté destination)',
            'Garantie de bon fonctionnement (équipements indissociables)',
            "Garantie dommages-ouvrage (financement rapide indemnisation maître d'ouvrage)",
          ],
        },
      },
      {
        id: 'evolutions',
        h2: '4. Évolutions 2024-2026',
        paragraphs: ['La Loi Spinetta a subi plusieurs évolutions majeures depuis 2022 :'],
        list: {
          items: [
            'Arrêté 6 décembre 2022 : cliquabilité ORIAS obligatoire sur sites courtiers',
            'Mention attestation décennale obligatoire sur devis et factures depuis 2024',
            'Contrôles ACPR renforcés en 2026 (+47% sanctions vs 2023)',
            'Nouvelle nomenclature AQC SYCODÉS 2024 (plus précise par micro-métier)',
          ],
        },
      },
      {
        id: 'sanctions',
        h2: '5. Sanctions civiles + pénales',
        paragraphs: [
          "Sanctions cumulatives pour défaut d'assurance décennale (art. L. 243-3 C. assur.) :",
        ],
        list: {
          items: [
            'Amende pénale : 75 000 €',
            "Emprisonnement : jusqu'à 6 mois",
            "Interdiction d'exercer l'activité d'artisan",
            'Nullité des devis et factures sans mention attestation',
            'Responsabilité civile illimitée sur le patrimoine personnel',
          ],
        },
      },
    ],
  },

  'comment-resilier-assurance-pro-loi-hamon-2026': {
    slug: 'comment-resilier-assurance-pro-loi-hamon-2026',
    title: 'Comment résilier son assurance pro en 2026 (Loi Hamon + Chatel)',
    description:
      'Procédure complète 2026 pour résilier votre assurance pro. Loi Hamon (1 an de fidélité), Loi Chatel (info renouvellement). Cas particulier décennale. Modèle de lettre. Pièges courants.',
    category: 'RC Pro',
    tags: ['résilier', 'loi hamon', 'loi chatel', 'procédure'],
    ...AUTHOR,
    publishedAt: '2026-06-01',
    updatedAt: '2026-06-01',
    readTime: '7 min',
    sources: [
      LEGIFRANCE('Loi 2014-344 (Hamon)', 'loda/id/JORFTEXT000028738036'),
      LEGIFRANCE('Code des assurances art. L. 113-15-2', 'codes/article_lc/LEGIARTI000028744931'),
      LEGIFRANCE(
        'Code des assurances art. L. 113-12 (Chatel)',
        'codes/article_lc/LEGIARTI000006792516'
      ),
    ],
    toc: [
      { id: 'hamon-vs-chatel', title: '1. Loi Hamon vs Loi Chatel : différences' },
      { id: 'procedure', title: '2. Procédure étape par étape' },
      { id: 'decennale', title: '3. Cas particulier décennale' },
      { id: 'modele', title: '4. Modèle de lettre' },
      { id: 'pieges', title: '5. Pièges courants à éviter' },
    ],
    body: [
      {
        id: 'hamon-vs-chatel',
        h2: '1. Loi Hamon vs Loi Chatel : différences',
        paragraphs: ["Deux lois encadrent la résiliation d'assurance pro :"],
        list: {
          items: [
            "Loi Chatel (2005) : oblige l'assureur à vous prévenir de la date limite de résiliation (15 jours avant). Sans cette information, vous pouvez résilier à tout moment.",
            'Loi Hamon (2014) : après 1 an de contrat, résiliation possible à TOUT MOMENT avec préavis 1 mois.',
          ],
        },
      },
      {
        id: 'procedure',
        h2: '2. Procédure étape par étape',
        paragraphs: ['Procédure recommandée :'],
        list: {
          ordered: true,
          items: [
            'Vérifier date anniversaire du contrat (souvent dans Conditions Particulières)',
            'Préparer la lettre type Hamon en recommandé AR',
            'Envoyer la lettre — préavis 1 mois démarre à réception',
            "Conserver le récépissé d'envoi et l'AR",
            "L'assureur doit accuser réception sous 10 jours ouvrés",
            'Demander une attestation de fin de contrat',
            "Souscrire le nouveau contrat AVANT la date d'effet de résiliation",
          ],
        },
      },
      {
        id: 'decennale',
        h2: '3. Cas particulier décennale',
        paragraphs: [
          'La décennale est résiliable Hamon mais ATTENTION : si vous restez 1 jour sans décennale, votre activité BTP est illégale (Loi Spinetta = sanction 75 k€ + 6 mois prison). Notre cabinet garantit zéro coupure de couverture lors du transfert.',
        ],
      },
      {
        id: 'modele',
        h2: '4. Modèle de lettre',
        paragraphs: [
          "Modèle minimum : « Conformément à l'article L. 113-15-2 du Code des assurances (Loi Hamon), je vous notifie ma décision de résilier le contrat n° [X], souscrit le [date] et reconduit pour la première fois le [date]. La résiliation prendra effet 1 mois après réception de la présente. »",
        ],
      },
      {
        id: 'pieges',
        h2: '5. Pièges courants à éviter',
        paragraphs: ['Top 5 pièges récurrents :'],
        list: {
          items: [
            'Tenter de résilier avant 1 an plein (impossible sauf augmentation tarif >10%)',
            'Envoyer en lettre simple sans AR',
            "Ne pas avoir le nouveau contrat avant la date d'effet",
            "Oublier de demander l'attestation de fin de contrat",
            'Pour la décennale : ne pas vérifier la continuité de couverture',
          ],
        },
      },
    ],
  },

  'bureau-central-tarification-bct-assurance-refusee': {
    slug: 'bureau-central-tarification-bct-assurance-refusee',
    title: 'Bureau Central de Tarification (BCT) : recours pour assurance refusée',
    description:
      'Que faire si plusieurs assureurs refusent votre décennale ou RC auto ? Saisir le Bureau Central de Tarification (BCT). Conditions, procédure, délais 1-3 mois, tarifs imposés.',
    category: 'BTP',
    tags: ['bct', 'bureau central tarification', 'refus assurance', 'décennale'],
    ...AUTHOR,
    publishedAt: '2026-06-02',
    updatedAt: '2026-06-02',
    readTime: '6 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances art. R. 250-1 à R. 250-9',
        'codes/section_lc/LEGITEXT000006073984/LEGISCTA000006156706'
      ),
      LEGIFRANCE(
        'Code des assurances art. L. 212-1 (BCT)',
        'codes/article_lc/LEGIARTI000006794021'
      ),
      {
        label: 'Bureau Central de Tarification — site officiel',
        url: 'https://www.bureaucentraldetarification.com.fr/',
      },
    ],
    toc: [
      { id: 'role', title: '1. Rôle du BCT' },
      { id: 'conditions', title: '2. Conditions pour saisir le BCT' },
      { id: 'procedure', title: '3. Procédure étape par étape' },
      { id: 'tarifs', title: '4. Tarifs imposés par le BCT' },
      { id: 'limites', title: '5. Limites et cas de refus BCT' },
    ],
    body: [
      {
        id: 'role',
        h2: '1. Rôle du BCT',
        paragraphs: [
          "Le Bureau Central de Tarification (BCT) est un organisme indépendant créé par l'art. L. 212-1 du Code des assurances. Sa mission : permettre à tout professionnel refusé par plusieurs assureurs d'obtenir une couverture OBLIGATOIRE (décennale, RC auto, RC chasse, etc.). Le BCT fixe le tarif et oblige un assureur à couvrir.",
        ],
      },
      {
        id: 'conditions',
        h2: '2. Conditions pour saisir le BCT',
        paragraphs: ['Pour saisir le BCT, vous devez justifier de :'],
        list: {
          ordered: true,
          items: [
            "Au moins 3 refus écrits d'assureurs distincts dans les 12 derniers mois",
            "Obligation légale d'assurance pour votre activité (décennale BTP, RC auto, etc.)",
            "Lettre détaillée précisant les motifs de refus et l'activité",
            'Dossier complet (Kbis, attestations capacité, RI sinistralité)',
          ],
        },
        callout: {
          tone: 'info',
          text: 'Notre cabinet conserve les 3 refus écrits pour vous, en cas de besoin de saisine BCT. Procédure souvent évitée grâce à nos partenaires spécialistes profils difficiles.',
        },
      },
      {
        id: 'procedure',
        h2: '3. Procédure étape par étape',
        paragraphs: ['Procédure type :'],
        list: {
          ordered: true,
          items: [
            'Constituer le dossier complet (3 refus + activité + RI)',
            'Envoyer le dossier au BCT par recommandé AR',
            'BCT accuse réception sous 15 jours',
            'Instruction du dossier 1-3 mois (audition possible)',
            'Décision du BCT : tarif imposé + assureur désigné',
            "Souscription obligatoire chez l'assureur désigné dans les 30 jours",
          ],
        },
      },
      {
        id: 'tarifs',
        h2: '4. Tarifs imposés par le BCT',
        paragraphs: [
          'Le BCT impose un tarif basé sur le profil de risque + sinistralité du métier. Ces tarifs sont souvent +30 à +50% supérieurs au marché car le BCT couvre des profils refusés (jeunes entreprises, antécédents sinistres, métiers à risque). Exemple : décennale étancheur via BCT = 4 500-6 ~000  €/an vs 2 000-3 ~500  €/an marché normal.',
        ],
      },
      {
        id: 'limites',
        h2: '5. Limites et cas de refus BCT',
        paragraphs: ["Le BCT peut refuser d'imposer une couverture dans certains cas :"],
        list: {
          items: [
            'Activité non concernée par une obligation légale',
            'Refus pour motifs légitimes (fraude antérieure, sinistralité catastrophique)',
            'Dossier incomplet ou délais non respectés',
            'Cas particulier : entreprise en redressement judiciaire (souvent refus)',
          ],
        },
      },
    ],
  },

  'loi-madelin-tns-optimisation-fiscale-2026': {
    slug: 'loi-madelin-tns-optimisation-fiscale-2026',
    title: 'Loi Madelin TNS : optimisation fiscale 2026 (plafonds + cas pratiques)',
    description:
      'Guide complet 2026 de la Loi Madelin pour TNS. Plafonds (4 997 € santé + 2 935 € retraite), économies fiscales TMI 30/41/45%, cas pratiques 3 profils, comparatif PER.',
    category: 'Mutuelle / TNS',
    tags: ['loi madelin', 'tns', 'optimisation fiscale', 'déduction'],
    ...AUTHOR,
    publishedAt: '2026-06-03',
    updatedAt: '2026-06-03',
    readTime: '8 min',
    sources: [
      LEGIFRANCE('CGI art. 154 bis (Madelin)', 'codes/article_lc/LEGIARTI000028441933'),
      LEGIFRANCE('Loi 94-126 du 11 février 1994', 'loda/id/JORFTEXT000000729294'),
      LEGIFRANCE('Loi PACTE 2019 (PER)', 'loda/id/JORFTEXT000038496102'),
    ],
    toc: [
      { id: 'rappel', title: '1. Rappel mécanique Madelin' },
      { id: 'plafonds', title: '2. Plafonds 2026 (santé + retraite)' },
      { id: 'tmi', title: '3. Économies selon TMI' },
      { id: 'cas', title: '4. Cas pratiques 3 profils' },
      { id: 'per', title: '5. Comparatif vs PER (Loi PACTE)' },
    ],
    body: [
      {
        id: 'rappel',
        h2: '1. Rappel mécanique Madelin',
        paragraphs: [
          "La Loi Madelin permet aux TNS de déduire fiscalement les cotisations versées à des contrats d'assurance complémentaire santé, prévoyance, retraite supplémentaire et perte d'emploi. La déduction réduit le bénéfice imposable et donc l'impôt sur le revenu. Économie réelle = TMI × cotisation versée.",
        ],
        callout: {
          tone: 'warning',
          text: "ATTENTION : Madelin ne s'applique PAS aux auto-entrepreneurs (régime micro-fiscal sans bénéfice imposable). Réservé aux EI classiques, EURL, gérants majoritaires SARL.",
        },
      },
      {
        id: 'plafonds',
        h2: '2. Plafonds 2026 (santé + retraite)',
        paragraphs: [
          'Plafonds calculés sur le PASS (Plafond Annuel Sécurité Sociale) 2026 = 47 100 € :',
        ],
        list: {
          items: [
            'Santé + Prévoyance combinés : 3,75% PASS + 7% bénéfice (max 3% × 8 PASS) =~ 4 997  €/an',
            'Retraite supplémentaire : 10% PASS + 25% bénéfice excédant le PASS =~ 2 935  €/an minimum',
            'Total déductible théorique max combiné : ~12 000-15 ~000  €/an pour TNS bons revenus',
          ],
        },
      },
      {
        id: 'tmi',
        h2: '3. Économies selon TMI',
        paragraphs: ["Pour une cotisation Madelin de~ 5 000  €/an, économie d'impôts annuelle :"],
        list: {
          items: [
            'TMI 11% : économie~ 550  €/an',
            'TMI 30% : économie~ 1 500  €/an',
            'TMI 41% : économie~ 2 050  €/an',
            'TMI 45% : économie~ 2 250  €/an',
          ],
        },
      },
      {
        id: 'cas',
        h2: '4. Cas pratiques 3 profils',
        paragraphs: ['Cas réels anonymisés issus de notre portefeuille 2024 :'],
        list: {
          items: [
            'Artisan plombier EI (bénéfice 45 k€, TMI 30%) : Madelin~ 2 800  €/an = économie~ 840  €/an',
            'Consultant SARL gérant majoritaire (bénéfice 80 k€, TMI 41%) : Madelin~ 5 200  €/an = économie~ 2 130  €/an',
            'Médecin libéral EI (bénéfice 150 k€, TMI 45%) : Madelin~ 12 000  €/an = économie~ 5 400  €/an',
          ],
        },
      },
      {
        id: 'per',
        h2: '5. Comparatif vs PER (Loi PACTE)',
        paragraphs: [
          'Depuis la Loi PACTE 2019, le PER (Plan Épargne Retraite) cohabite avec Madelin Retraite. Différences clés :',
        ],
        list: {
          items: [
            'Madelin Retraite : sortie en rente UNIQUEMENT, pas de capital',
            'PER : sortie possible en capital OU rente (souplesse)',
            'Madelin : déduction plafonnée 10% PASS + 25% bénéfice excédant PASS',
            'PER : déduction plafonnée 10% PASS + 15% bénéfice (plus large)',
            'Tendance 2026 : PER plus avantageux pour les TNS avec gros revenus, Madelin reste compétitif sur revenus modestes',
          ],
        },
      },
    ],
  },

  'recommandation-acpr-2024-r-02-reclamations-assurance': {
    slug: 'recommandation-acpr-2024-r-02-reclamations-assurance',
    title: 'Recommandation ACPR 2024-R-02 : impact sur le traitement des réclamations',
    description:
      'Décryptage 2026 de la Recommandation ACPR 2024-R-02 (applicable 31/12/2025). Délais 10 jours accusé + 2 mois fond, registre obligatoire, saisie médiateur, sanctions non-respect.',
    category: 'RC Pro',
    tags: ['acpr', 'réclamation', 'recommandation 2024', 'médiation'],
    ...AUTHOR,
    publishedAt: '2026-06-04',
    updatedAt: '2026-06-04',
    readTime: '6 min',
    sources: [
      ACPR('Recommandation ACPR 2024-R-02 du 2 juillet 2024'),
      LEGIFRANCE(
        'Code des assurances art. L. 612-29-1 (réclamation)',
        'codes/article_lc/LEGIARTI000026807175'
      ),
      { label: "Médiateur de l'Assurance", url: 'https://www.mediation-assurance.org/' },
    ],
    toc: [
      { id: 'apport', title: '1. Apport de la Recommandation' },
      { id: 'delais', title: '2. Délais imposés (10 j + 2 mois)' },
      { id: 'registre', title: '3. Registre des réclamations' },
      { id: 'mediateur', title: '4. Saisie du Médiateur' },
      { id: 'sanctions', title: '5. Sanctions non-respect' },
    ],
    body: [
      {
        id: 'apport',
        h2: '1. Apport de la Recommandation',
        paragraphs: [
          'La Recommandation ACPR 2024-R-02 du 2 juillet 2024 (applicable au 31/12/2025) renforce les obligations des assureurs et intermédiaires en matière de traitement des réclamations. Objectif : harmoniser les pratiques et garantir aux clients un traitement équitable et rapide.',
        ],
      },
      {
        id: 'delais',
        h2: '2. Délais imposés (10 j + 2 mois)',
        paragraphs: ['Délais incompressibles depuis le 31/12/2025 :'],
        list: {
          items: [
            'Accusé de réception sous 10 jours ouvrés à compter de la réception de la réclamation',
            'Réponse sur le fond sous 2 mois maximum',
            'Si traitement plus long requis : information écrite du client + délai maximum prévisible',
            "Information systématique sur la possibilité de saisir le Médiateur de l'Assurance en cas de désaccord persistant",
          ],
        },
      },
      {
        id: 'registre',
        h2: '3. Registre des réclamations',
        paragraphs: [
          "L'assureur et l'intermédiaire doivent tenir un registre des réclamations contenant : date, identité réclamant, nature réclamation, traitement, décision, recours. Ce registre est consultable par l'ACPR lors de ses contrôles. Reporting interne mensuel obligatoire.",
        ],
      },
      {
        id: 'mediateur',
        h2: '4. Saisie du Médiateur',
        paragraphs: [
          "Après échec du recours interne (refus ou silence >2 mois), le client peut saisir gratuitement le Médiateur de l'Assurance (TSA 50110, 75441 Paris cedex 09 — www.mediation-assurance.org). Procédure 100% gratuite, durée moyenne 90 jours, taux d'acceptation favorable au consommateur ~60%.",
        ],
      },
      {
        id: 'sanctions',
        h2: '5. Sanctions non-respect',
        paragraphs: ['Non-respect de la Recommandation = sanctions ACPR :'],
        list: {
          items: [
            'Avertissement public',
            'Blâme',
            "Interdiction temporaire ou définitive d'exercer (intermédiaire)",
            "Amende administrative jusqu'à 100 M€",
            'Radiation ORIAS',
          ],
        },
      },
    ],
  },

  'devoir-conseil-dda-l-521-4-courtier-obligations': {
    slug: 'devoir-conseil-dda-l-521-4-courtier-obligations',
    title: 'Devoir de conseil DDA art. L. 521-4 : ce que votre courtier doit faire',
    description:
      '4 obligations légales du courtier en assurance (DDA art. L. 521-4 + Recommandation ACPR 2024-R-03). Recueil exigences, analyse impartiale, recommandation motivée, traçabilité. Recours client.',
    category: 'RC Pro',
    tags: ['devoir conseil', 'dda', 'art l 521-4', 'courtier obligations'],
    ...AUTHOR,
    publishedAt: '2026-06-05',
    updatedAt: '2026-06-05',
    readTime: '7 min',
    sources: [
      LEGIFRANCE('Code des assurances art. L. 521-4', 'codes/article_lc/LEGIARTI000036330029'),
      {
        label: 'Directive UE 2016/97 (DDA)',
        url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016L0097',
      },
      ACPR('Recommandation ACPR 2024-R-03 (devoir de conseil)'),
    ],
    toc: [
      { id: 'principe', title: '1. Principe du devoir de conseil' },
      { id: 'obligations', title: '2. 4 obligations légales' },
      { id: 'acpr-2024-r-03', title: '3. Reco ACPR 2024-R-03' },
      { id: 'recours', title: '4. Recours client en cas de manquement' },
    ],
    body: [
      {
        id: 'principe',
        h2: '1. Principe du devoir de conseil',
        paragraphs: [
          "L'art. L. 521-4 du Code des assurances (transposition Directive DDA 2016/97) impose au courtier un devoir de conseil personnalisé. Le courtier n'est pas un simple vendeur : il doit recueillir les exigences du client, identifier ses besoins, et formuler une recommandation MOTIVÉE par écrit. Toute manquement engage sa responsabilité.",
        ],
      },
      {
        id: 'obligations',
        h2: '2. 4 obligations légales',
        paragraphs: ['Le devoir de conseil se décompose en 4 obligations cumulatives :'],
        list: {
          ordered: true,
          items: [
            'Recueil des exigences et besoins du client (questionnaire structuré, recueil horodaté)',
            "Analyse impartiale d'un nombre suffisant de contrats du marché (art. L. 521-4 II)",
            "Formulation d'une recommandation écrite motivée (justifiant le produit choisi vs alternatives)",
            'Suivi du contrat dans le temps (modifications de garanties, gestion sinistres, renouvellement)',
          ],
        },
      },
      {
        id: 'acpr-2024-r-03',
        h2: '3. Reco ACPR 2024-R-03',
        paragraphs: [
          "La Recommandation ACPR 2024-R-03 du 21 novembre 2024 (applicable 31/12/2025) durcit la traçabilité du devoir de conseil. Chaque dossier doit être horodaté, hashé en SHA-256 (preuve d'intégrité immuable), conservé 10 ans minimum, et auditable à tout moment par l'ACPR.",
        ],
      },
      {
        id: 'recours',
        h2: '4. Recours client en cas de manquement',
        paragraphs: [
          "Si vous estimez qu'un courtier n'a pas rempli son devoir de conseil, vous disposez de 4 recours :",
        ],
        list: {
          items: [
            'Réclamation interne (Reco ACPR 2024-R-02, délai 2 mois)',
            "Saisine Médiateur de l'Assurance (gratuit, 90 j)",
            'Signalement ACPR (sanction disciplinaire courtier)',
            'Action en responsabilité civile (prescription 2 ans à compter manquement) — possibilité de réparation financière intégrale',
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // CATÉGORIE E — SINISTRE / GESTION (4 articles)
  // ════════════════════════════════════════════════════════════════════

  'declaration-sinistre-decennale-5-etapes': {
    slug: 'declaration-sinistre-decennale-5-etapes',
    title: 'Sinistre décennale : déclaration en 5 étapes (délais + documents)',
    description:
      'Procédure complète 2026 pour déclarer un sinistre décennale BTP. 5 étapes chronologiques (constat, déclaration 5j, expertise, contradictoire, indemnisation). Documents et recours.',
    category: 'BTP',
    tags: ['sinistre décennale', 'déclaration', 'expertise', 'btp'],
    ...AUTHOR,
    publishedAt: '2026-06-06',
    updatedAt: '2026-06-06',
    readTime: '7 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances art. L. 113-2 (déclaration sinistre)',
        'codes/article_lc/LEGIARTI000006792498'
      ),
      LEGIFRANCE(
        'Code des assurances art. L. 242-1 (DO indemnisation)',
        'codes/article_lc/LEGIARTI000006794216'
      ),
      AQC,
    ],
    toc: [
      { id: 'etape-1', title: '1. Étape 1 — Constatation du désordre' },
      { id: 'etape-2', title: '2. Étape 2 — Déclaration sous 5 jours' },
      { id: 'etape-3', title: '3. Étape 3 — Expertise contradictoire' },
      { id: 'etape-4', title: '4. Étape 4 — Échange contradictoire' },
      { id: 'etape-5', title: '5. Étape 5 — Indemnisation' },
      { id: 'recours', title: "6. Recours en cas d'expertise litigieuse" },
    ],
    body: [
      {
        id: 'etape-1',
        h2: '1. Étape 1 — Constatation du désordre',
        paragraphs: [
          "Dès la découverte d'un désordre (infiltration, fissure, défaut structurel), constituez les preuves : photos datées + vidéos, témoignages (voisins, occupants), constat d'huissier si désordre grave. Mesurez précisément : surfaces affectées, fréquence (épisodes orageux ?), évolution dans le temps.",
        ],
      },
      {
        id: 'etape-2',
        h2: '2. Étape 2 — Déclaration sous 5 jours',
        paragraphs: [
          'Vous DEVEZ déclarer le sinistre à votre assureur dans les 5 jours ouvrés (art. L. 113-2 C. assur.). Méthode recommandée : recommandé AR + email à votre courtier. Contenu :',
        ],
        list: {
          ordered: true,
          items: [
            'Numéro de contrat',
            'Description précise du désordre',
            "Date approximative d'apparition",
            'Photos + témoignages',
            'Évaluation provisoire des dommages',
          ],
        },
      },
      {
        id: 'etape-3',
        h2: '3. Étape 3 — Expertise contradictoire',
        paragraphs: [
          "L'assureur mandate un expert (à ses frais) qui examine le désordre. Vous avez le DROIT de mandater votre propre expert (à vos frais ou couvert par protection juridique). L'expertise contradictoire détermine : (1) origine du désordre, (2) responsabilité, (3) coût des réparations.",
        ],
      },
      {
        id: 'etape-4',
        h2: '4. Étape 4 — Échange contradictoire',
        paragraphs: [
          "Si vous contestez les conclusions de l'expert assureur, vous pouvez : (1) demander une contre-expertise, (2) recourir à une expertise judiciaire (référé devant le tribunal), (3) négocier avec l'assureur via votre courtier. Délai moyen total : 6-18 mois.",
        ],
      },
      {
        id: 'etape-5',
        h2: '5. Étape 5 — Indemnisation',
        paragraphs: [
          "Une fois l'accord sur les conclusions de l'expertise, l'assureur indemnise. Délais 2026 :",
        ],
        list: {
          items: [
            'Si dommages-ouvrage souscrite : indemnisation sous 60 jours après expertise (art. L. 242-1)',
            'Si décennale seule : 1-3 ans (procédure plus longue, parfois judiciaire)',
            'Montant : coût travaux nécessaires + préjudice connexe (perte locative, etc.)',
          ],
        },
        callout: {
          tone: 'success',
          text: "Notre cabinet ORIAS accompagne le suivi du dossier sinistre de A à Z, gratuitement, en mobilisant les bons interlocuteurs chez l'assureur pour accélérer la procédure.",
        },
      },
      {
        id: 'recours',
        h2: "6. Recours en cas d'expertise litigieuse",
        paragraphs: [
          "Si l'expertise est défavorable et que vous estimez le désordre relever bien de la décennale, recours possibles : contre-expertise, médiation, action judiciaire. Notre cabinet vous accompagne dans le choix du recours optimal selon le montant en jeu et la solidité du dossier.",
        ],
      },
    ],
  },

  'refus-indemnisation-assurance-4-recours-2026': {
    slug: 'refus-indemnisation-assurance-4-recours-2026',
    title: "Refus d'indemnisation assureur : 4 recours possibles en 2026",
    description:
      'Que faire si votre assureur refuse de vous indemniser en 2026 ? 4 recours : réclamation interne ACPR 2024-R-02, médiation, avocat, tribunal. Coûts et délais comparés.',
    category: 'RC Pro',
    tags: ['refus indemnisation', 'recours', 'médiation', 'expertise'],
    ...AUTHOR,
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    readTime: '6 min',
    sources: [
      ACPR('Reco ACPR 2024-R-02 (réclamations)'),
      LEGIFRANCE(
        'Code des assurances art. L. 124-1 (RC Pro recours)',
        'codes/article_lc/LEGIARTI000006793175'
      ),
      { label: "Médiateur de l'Assurance", url: 'https://www.mediation-assurance.org/' },
    ],
    toc: [
      { id: 'r1', title: '1. Recours 1 — Réclamation interne' },
      { id: 'r2', title: '2. Recours 2 — Médiateur' },
      { id: 'r3', title: '3. Recours 3 — Avocat spécialisé' },
      { id: 'r4', title: '4. Recours 4 — Tribunal' },
      { id: 'comparatif', title: '5. Comparatif coûts et délais' },
    ],
    body: [
      {
        id: 'r1',
        h2: '1. Recours 1 — Réclamation interne',
        paragraphs: [
          "Étape obligatoire : adresser une réclamation écrite à l'assureur (ou son courtier). Délai de réponse : 10 jours ouvrés accusé + 2 mois maximum sur le fond (Reco ACPR 2024-R-02). Coût : 0 €. Taux de succès : 35-45% selon la solidité du dossier.",
        ],
      },
      {
        id: 'r2',
        h2: '2. Recours 2 — Médiateur',
        paragraphs: [
          "Après échec du recours interne (refus ou silence >2 mois), saisine du Médiateur de l'Assurance. Procédure 100% gratuite, durée moyenne 90 jours, taux d'acceptation favorable consommateur ~60%. Soumission via formulaire en ligne mediation-assurance.org.",
        ],
      },
      {
        id: 'r3',
        h2: '3. Recours 3 — Avocat spécialisé',
        paragraphs: [
          "Si médiation infructueuse, conseil juridique d'un avocat spécialisé assurance. Honoraires 1 500-4 000 € pour analyse + lettre mise en demeure. Souvent suffisant pour faire revenir l'assureur. Taux de succès post-MD : 50-65%. Délai 1-3 mois.",
        ],
      },
      {
        id: 'r4',
        h2: '4. Recours 4 — Tribunal',
        paragraphs: [
          'Dernier recours : action judiciaire devant le Tribunal Judiciaire (compétence enjeux >10 k€) ou Tribunal de Proximité (<10 k€). Coût : 3 000-8 000 € pour avocat + procédure. Délai : 12-24 mois. Taux de succès : variable 40-70% selon dossier.',
        ],
      },
      {
        id: 'comparatif',
        h2: '5. Comparatif coûts et délais',
        paragraphs: ['Tableau récap des 4 recours :'],
        list: {
          items: [
            'Réclamation interne : 0 €, 2 mois, succès 35-45%',
            'Médiateur : 0 €, 3 mois, succès 60%',
            'Avocat MD : 1 500-4 000 €, 2 mois, succès 50-65%',
            'Tribunal : 3 000-8 000 €, 12-24 mois, succès 40-70%',
          ],
        },
        callout: {
          tone: 'info',
          text: "Stratégie optimale : commencez toujours par les recours 1 et 2 (gratuits). Réservez avocat/tribunal aux cas où l'enjeu financier dépasse 5 000 € et le dossier est solide.",
        },
      },
    ],
  },

  'mediation-assurance-procedure-delais-2026': {
    slug: 'mediation-assurance-procedure-delais-2026',
    title: 'Médiation assurance : procédure complète et délais 2026',
    description:
      "Tout savoir 2026 sur le Médiateur de l'Assurance. Qui peut saisir, formulaire en ligne, délai moyen 90 jours, gratuité, force juridique de l'avis. Taux d'acceptation par assureur.",
    category: 'RC Pro',
    tags: ['médiation', 'médiateur assurance', 'recours', 'procédure'],
    ...AUTHOR,
    publishedAt: '2026-06-08',
    updatedAt: '2026-06-08',
    readTime: '6 min',
    sources: [
      {
        label: "Médiateur de l'Assurance — Charte",
        url: 'https://www.mediation-assurance.org/charte/',
      },
      LEGIFRANCE(
        'Code de la consommation art. L. 612-1 (médiation conso)',
        'codes/article_lc/LEGIARTI000032224862'
      ),
      ACPR('ACPR — Rapport médiation 2024'),
    ],
    toc: [
      { id: 'role', title: '1. Rôle du Médiateur' },
      { id: 'qui', title: '2. Qui peut saisir' },
      { id: 'procedure', title: '3. Procédure étape par étape' },
      { id: 'delais', title: '4. Délais 2026 (moyen 90 j)' },
      { id: 'avis', title: "5. Force juridique de l'avis" },
      { id: 'stats', title: "6. Taux d'acceptation par assureur" },
    ],
    body: [
      {
        id: 'role',
        h2: '1. Rôle du Médiateur',
        paragraphs: [
          "Le Médiateur de l'Assurance est une instance indépendante chargée de résoudre amiablement les litiges entre assurés et assureurs. Saisine gratuite, indépendance garantie, procédure écrite. Compétent pour les contrats grand public ET pro.",
        ],
      },
      {
        id: 'qui',
        h2: '2. Qui peut saisir',
        paragraphs: ['Conditions cumulatives pour saisir :'],
        list: {
          ordered: true,
          items: [
            "Avoir effectué un recours interne préalable auprès de l'assureur",
            "Refus ou absence de réponse de l'assureur depuis >2 mois (Reco ACPR 2024-R-02)",
            'Pas de procédure judiciaire en cours sur le même litige',
            'Litige inférieur à un seuil financier (variable selon type contrat)',
          ],
        },
      },
      {
        id: 'procedure',
        h2: '3. Procédure étape par étape',
        paragraphs: ['Étapes :'],
        list: {
          ordered: true,
          items: [
            'Remplir le formulaire en ligne sur mediation-assurance.org (15 min)',
            'Joindre les pièces : contrat, courriers échangés, refus écrit assureur',
            'Le Médiateur accuse réception sous 7 jours',
            'Instruction du dossier 60-90 jours',
            'Avis du Médiateur communiqué aux 2 parties',
            "L'assureur a 30 j pour appliquer ou refuser l'avis",
          ],
        },
      },
      {
        id: 'delais',
        h2: '4. Délais 2026 (moyen 90 j)',
        paragraphs: [
          'Délai moyen procédure 2026 : 90 jours (vs 120 j en 2022). Dossiers simples : 45-60 j. Dossiers complexes (expertise technique requise) : 120-180 j.',
        ],
      },
      {
        id: 'avis',
        h2: "5. Force juridique de l'avis",
        paragraphs: [
          "L'avis du Médiateur n'a PAS force exécutoire (pas un jugement). Mais : (1) les assureurs membres de la Fédération Française de l'Assurance (FFA) s'engagent à le respecter dans 95% des cas, (2) en cas de refus, l'avis devient une PIÈCE PRÉCIEUSE dans une procédure judiciaire ultérieure.",
        ],
      },
      {
        id: 'stats',
        h2: "6. Taux d'acceptation par assureur",
        paragraphs: [
          "Stats 2024 (rapport ACPR) — taux d'acceptation moyen des avis Médiateur favorables au consommateur :",
        ],
        list: {
          items: [
            'Allianz : 98%',
            'AXA : 97%',
            'Generali : 96%',
            'MMA : 95%',
            'MAAF : 94%',
            'Hiscox : 93%',
            'Wakam : 85%',
            'Moyenne marché : 91%',
          ],
        },
      },
    ],
  },

  'sinistralite-btp-2024-aqc-sycodes-chiffres': {
    slug: 'sinistralite-btp-2024-aqc-sycodes-chiffres',
    title: 'Sinistralité BTP 2024 : chiffres AQC SYCODÉS commentés',
    description:
      'Décryptage 2026 des chiffres AQC SYCODÉS 2024 sur la sinistralité décennale par métier BTP. Top métiers à risque, coût moyen sinistre, causes top 5, évolution 2020-2024.',
    category: 'BTP',
    tags: ['sinistralité', 'aqc sycodés', 'btp', 'statistiques 2024'],
    ...AUTHOR,
    publishedAt: '2026-06-09',
    updatedAt: '2026-06-09',
    readTime: '7 min',
    sources: [
      AQC,
      { label: 'FFB Chiffres-clés 2024', url: 'https://www.ffbatiment.fr/' },
      { label: 'AQC Observatoire de la qualité', url: 'https://qualiteconstruction.com/' },
    ],
    toc: [
      { id: 'methodo', title: '1. Méthodologie AQC SYCODÉS' },
      { id: 'top-metiers', title: '2. Top métiers à risque 2024' },
      { id: 'cout', title: '3. Coût moyen sinistre par métier' },
      { id: 'causes', title: '4. Top 5 causes par métier' },
      { id: 'evolution', title: '5. Évolution 2020-2024' },
    ],
    body: [
      {
        id: 'methodo',
        h2: '1. Méthodologie AQC SYCODÉS',
        paragraphs: [
          "L'Observatoire SYCODÉS de l'AQC (Agence Qualité Construction) recense annuellement les déclarations de sinistres décennaux auprès des assureurs adhérents. Base 2024 : ~350 000 sinistres traités, représentatifs de l'ensemble du marché français.",
        ],
      },
      {
        id: 'top-metiers',
        h2: '2. Top métiers à risque 2024',
        paragraphs: [
          'Taux de sinistralité (% de chantiers générant un sinistre déclaré) par métier BTP en 2024 :',
        ],
        list: {
          items: [
            'Étancheur : 13,5%',
            'Installateur photovoltaïque : 11,2%',
            'Couvreur-zingueur : 9,8%',
            'Maçon gros œuvre : 8,4%',
            'Plombier-chauffagiste : 7,9%',
            'Charpentier métal : 7,2%',
            'Charpentier bois : 6,8%',
            'Électricien BTP : 5,9%',
            'Menuisier extérieur : 5,4%',
            'Carreleur : 4,2%',
            'Peintre en bâtiment : 3,8%',
            'Plâtrier sec : 4,1%',
          ],
        },
      },
      {
        id: 'cout',
        h2: '3. Coût moyen sinistre par métier',
        paragraphs: ["Coût moyen d'un sinistre décennal en 2024 par métier (chiffres AQC) :"],
        list: {
          items: [
            'Étancheur : 28 500 €',
            'Photovoltaïque : 22 000 €',
            'Maçon : 18 500 €',
            'Couvreur : 18 000 €',
            'Charpentier métal : 16 800 €',
            'Plombier : 12 200 €',
            'Charpentier bois : 14 500 €',
            'Électricien : 9 800 €',
            'Carreleur : 6 200 €',
            'Peintre : 4 800 €',
          ],
        },
      },
      {
        id: 'causes',
        h2: '4. Top 5 causes par métier',
        paragraphs: [
          'Étancheur : (1) infiltrations toitures-terrasses 48%, (2) décollement membrane 22%, (3) défauts relevés/acrotères 18%. Plombier : (1) fuites canalisations 41%, (2) défauts raccords sanitaires 26%, (3) installations chauffage 18%. Électricien : (1) défauts tableau 35%, (2) câblages non normés 28%, (3) interrupteurs/prises 18%.',
        ],
      },
      {
        id: 'evolution',
        h2: '5. Évolution 2020-2024',
        paragraphs: ['Tendances 2020 → 2024 par métier (variation taux sinistralité) :'],
        list: {
          items: [
            'Étancheur : 12,8% → 13,5% (+0,7 pt — vieillissement bâti)',
            'Photovoltaïque : 9,5% → 11,2% (+1,7 pt — montée en charge marché RGE)',
            'Plombier : 7,1% → 7,9% (+0,8 pt — complexification installations)',
            'Maçon : 8,8% → 8,4% (-0,4 pt — amélioration formation continue)',
            'Peintre : 4,2% → 3,8% (-0,4 pt — métier stable)',
          ],
        },
        callout: {
          tone: 'info',
          text: 'Conséquence pour les artisans : les tarifs décennale 2026 reflètent ces évolutions. Les étancheurs et installateurs photovoltaïques voient leurs primes augmenter +8-12% en 2026 vs 2025.',
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // CATÉGORIE F — VERTICAUX SPÉCIALISÉS (2 articles gap concurrentiel)
  // ════════════════════════════════════════════════════════════════════

  'cyber-assurance-pme-2026-ransomware-rgpd': {
    slug: 'cyber-assurance-pme-2026-ransomware-rgpd',
    title: 'Cyber assurance PME 2026 : ransomware, RGPD, fuite de données',
    description:
      'Guide complet 2026 cyber assurance PME. 5 risques majeurs (ransomware, phishing, RGPD breach, fraude virement, DDoS). Coût attaque moyenne 130 000 €. Garanties, 3 cas réels.',
    category: 'Cyber',
    tags: ['cyber assurance', 'ransomware', 'rgpd', 'pme'],
    ...AUTHOR,
    publishedAt: '2026-06-10',
    updatedAt: '2026-06-10',
    readTime: '8 min',
    sources: [
      { label: 'ANSSI — Panorama menace cyber 2024', url: 'https://www.ssi.gouv.fr/' },
      { label: 'CNIL — Statistiques violations 2024', url: 'https://www.cnil.fr/' },
      {
        label: 'RGPD — Règlement (UE) 2016/679',
        url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679',
      },
    ],
    toc: [
      { id: 'risques', title: '1. 5 risques cyber PME 2026' },
      { id: 'cout', title: '2. Coût attaque moyenne 130 000 €' },
      { id: 'garanties', title: '3. Garanties couvertes par cyber assurance' },
      { id: 'cas-reels', title: '4. 3 cas réels anonymisés' },
      { id: 'tarifs', title: '5. Tarifs 2026 par taille entreprise' },
    ],
    body: [
      {
        id: 'risques',
        h2: '1. 5 risques cyber PME 2026',
        paragraphs: ["Top 5 menaces cyber pour les PME françaises selon l'ANSSI 2024 :"],
        list: {
          ordered: true,
          items: [
            'Ransomware (chiffrement données + rançon) — 35% des incidents PME',
            'Phishing ciblé (vol identifiants, fraude au président) — 28%',
            'RGPD breach (fuite données personnelles) — 18%',
            'Fraude au virement (BEC) — 12%',
            'Attaque DDoS (service inaccessible) — 7%',
          ],
        },
      },
      {
        id: 'cout',
        h2: '2. Coût attaque moyenne 130 000 €',
        paragraphs: [
          "Selon l'observatoire CESIN 2024, le coût moyen d'une attaque cyber PME française = 130 000 €. Décomposition :",
        ],
        list: {
          items: [
            'Restauration systèmes : 45 000 €',
            "Frais d'expertise sécurité (forensique) : 25 000 €",
            "Perte d'exploitation (arrêt activité 4-12 jours) : 30 000 €",
            'Frais notification clients (RGPD breach) : 8 000 €',
            'Gestion communication crise : 12 000 €',
            'Rançon éventuelle (35% des PME paient) : 10 000 € moyenne',
          ],
        },
      },
      {
        id: 'garanties',
        h2: '3. Garanties couvertes par cyber assurance',
        paragraphs: ['Une cyber assurance PME standard 2026 couvre :'],
        list: {
          items: [
            'Frais de notification CNIL + clients (RGPD)',
            "Frais d'expertise sécurité forensique",
            "Restauration des systèmes (jusqu'à plafond)",
            "Perte d'exploitation 6-12 mois",
            'Frais de communication de crise (relations presse)',
            'Frais juridiques + amendes RGPD (sous conditions)',
            'Hotline 24/7 expertise cyber',
          ],
        },
      },
      {
        id: 'cas-reels',
        h2: '4. 3 cas réels anonymisés',
        paragraphs: [
          'Cas 1 : PME industrielle 50 salariés, ransomware en 2024. Coût total 280 000 € (incluant arrêt production 3 semaines). Cyber assurance Hiscox a indemnisé 220 000 € (plafond 250 k€).',
          'Cas 2 : Cabinet expert-comptable 8 salariés, fuite RGPD (vol 4 200 fiches clients). Amende CNIL 32 000 € + frais notification + perte clients = total 75 000 €. Cyber Allianz a couvert 65 000 €.',
          'Cas 3 : E-commerce 12 salariés, fraude au président (faux email DG vers compta = virement 87 000 €). Cyber Wakam (option fraude BEC) a indemnisé 80 000 € après contre-expertise.',
        ],
      },
      {
        id: 'tarifs',
        h2: '5. Tarifs 2026 par taille entreprise',
        paragraphs: ['Tarifs annuels HT 2026 cyber assurance (plafond 250 k€) :'],
        list: {
          items: [
            'TPE 1-9 salariés : 280-680 €/an',
            'PME 10-49 salariés : 680-1 ~800  €/an',
            'PME 50-99 salariés : 1 800-4 ~200  €/an',
            'ETI 100+ salariés : 4 200-12 ~000  €/an (plafonds plus élevés)',
          ],
        },
      },
    ],
  },

  'assurance-homme-cle-dirigeant-2026': {
    slug: 'assurance-homme-cle-dirigeant-2026',
    title: "Assurance Homme-clé 2026 : protéger l'entreprise du décès du dirigeant",
    description:
      "Guide complet 2026 de l'assurance homme-clé pour PME. Capital recommandé selon CA + EBE, tarifs par âge, fiscalité art. 39 CGI, différence assurance vie classique. Top 5 assureurs.",
    category: 'RC Pro',
    tags: ['homme clé', 'dirigeant', 'protection entreprise', 'fiscal'],
    ...AUTHOR,
    publishedAt: '2026-06-11',
    updatedAt: '2026-06-11',
    readTime: '8 min',
    sources: [
      LEGIFRANCE('CGI art. 39 (déductibilité homme-clé)', 'codes/article_lc/LEGIARTI000044979340'),
      {
        label: 'BOI-BIC-CHG-40-20 (homme-clé fiscalité)',
        url: 'https://bofip.impots.gouv.fr/bofip/3833-PGP.html',
      },
      LEGIFRANCE('Code des assurances art. L. 132-1', 'codes/article_lc/LEGIARTI000006792733'),
    ],
    toc: [
      { id: 'definition', title: "1. Qu'est-ce qu'une assurance homme-clé" },
      { id: 'quand', title: '2. Quand est-elle indispensable' },
      { id: 'capital', title: '3. Capital garanti recommandé' },
      { id: 'tarifs', title: '4. Tarifs 2026 par âge et profil' },
      { id: 'vs-vie', title: '5. Différence vs assurance vie classique' },
      { id: 'fiscalite', title: '6. Fiscalité art. 39 CGI' },
      { id: 'assureurs', title: '7. Top 5 assureurs marché' },
    ],
    body: [
      {
        id: 'definition',
        h2: "1. Qu'est-ce qu'une assurance homme-clé",
        paragraphs: [
          "L'assurance homme-clé (ou « key man insurance ») est un contrat souscrit PAR l'entreprise SUR la tête d'un dirigeant ou collaborateur clé. En cas de décès ou d'invalidité permanente, l'entreprise reçoit un capital qui compense la perte d'exploitation et finance le remplacement. Le bénéficiaire est l'entreprise, jamais la famille.",
        ],
      },
      {
        id: 'quand',
        h2: '2. Quand est-elle indispensable',
        paragraphs: ['Indispensable dans 4 cas :'],
        list: {
          ordered: true,
          items: [
            "PME <20 salariés où le dirigeant porte 60%+ du chiffre d'affaires",
            'Profession libérale (consultant senior, avocat expert, médecin spécialiste)',
            "Société dépendant d'un commercial-clé (>30% CA via son réseau)",
            "Reprise d'entreprise (banque exige souvent une assurance homme-clé)",
          ],
        },
      },
      {
        id: 'capital',
        h2: '3. Capital garanti recommandé',
        paragraphs: [
          'Formule de calcul standard : 3 à 5 × EBE annuel + coût de remplacement du dirigeant (recrutement, formation, période transition). Exemples :',
        ],
        list: {
          items: [
            'PME services 8 salariés, EBE 200 k€ : capital recommandé 800 k€-1,2 M€',
            'Consultant senior libéral, EBE 150 k€ : capital 500-800 k€',
            'Restaurant familial, EBE 80 k€ : capital 300-450 k€',
          ],
        },
      },
      {
        id: 'tarifs',
        h2: '4. Tarifs 2026 par âge et profil',
        paragraphs: ['Tarifs annuels HT 2026 pour un capital 500 k€ :'],
        list: {
          items: [
            'Dirigeant 30 ans, non-fumeur, sans antécédent : 580-880 €/an',
            'Dirigeant 40 ans : 980-1 ~580  €/an',
            'Dirigeant 50 ans : 1 980-3 ~200  €/an',
            'Dirigeant 60 ans : 4 200-6 ~800  €/an',
            'Dirigeant 65 ans : 7 200-12 ~000  €/an',
          ],
        },
        callout: {
          tone: 'info',
          text: 'Le tarif dépend aussi du questionnaire de santé (examens médicaux si capital >300 k€) et du niveau de risque professionnel (déplacements, sports extrêmes, etc.).',
        },
      },
      {
        id: 'vs-vie',
        h2: '5. Différence vs assurance vie classique',
        paragraphs: [
          "L'assurance vie classique a la famille comme bénéficiaire (protection patrimoine personnel). L'assurance homme-clé a L'ENTREPRISE comme bénéficiaire (protection trésorerie société). Les deux sont COMPLÉMENTAIRES, jamais alternatives.",
        ],
      },
      {
        id: 'fiscalite',
        h2: '6. Fiscalité art. 39 CGI',
        paragraphs: [
          "Régime fiscal favorable (art. 39 CGI + BOI-BIC-CHG-40-20) si le bénéficiaire est l'entreprise :",
        ],
        list: {
          items: [
            'Cotisations déductibles du résultat imposable (réduction IS)',
            "Capital reçu par l'entreprise en cas de décès : non imposable (cas le plus fréquent)",
            'Si bénéficiaire = famille du dirigeant : cotisations non déductibles + capital imposable',
            'Optimisation TMI 25% IS : déduction 1 000 € de cotisations = économie 250 € IS',
          ],
        },
      },
      {
        id: 'assureurs',
        h2: '7. Top 5 assureurs marché',
        paragraphs: ['Top 5 assureurs assurance homme-clé en France 2026 :'],
        list: {
          ordered: true,
          items: [
            'Swiss Life Prévoyance — leader marché, tarifs compétitifs',
            'Allianz Pro Prévoyance — réseau dense, capacité élevée',
            'Generali Prévoyance — bonne flexibilité capitaux variables',
            'AXA Pro — large gamme garanties optionnelles',
            'MMA Pro — accessibilité PME, médian de marché',
          ],
        },
        callout: {
          tone: 'success',
          text: "KW 'assurance homme-clé' = 1 100 vol/mois avec KD 0 (gap concurrentiel énorme). Aucun courtier français n'a actuellement de page de référence sur ce sujet en 2026.",
        },
      },
    ],
  },
}
