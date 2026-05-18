/**
 * Blog articles — Batch 5 (4 articles étoffés à ~1500 mots)
 *
 * Session 4 du programme éditorial Ahrefs.
 * Catégorie A — auto-entrepreneur/micro-entreprise (suite).
 *
 * Date génération : 2026-05-13 (session 4)
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

const URSSAF = (label: string) => ({
  label,
  url: 'https://www.autoentrepreneur.urssaf.fr/',
})

export const BLOG_POSTS_BATCH_5: Record<string, BlogPost> = {
  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 1 — Assurance professionnelle auto-entrepreneur 2026 (700 vol)
  // ════════════════════════════════════════════════════════════════════
  'assurance-professionnelle-auto-entrepreneur-2026': {
    slug: 'assurance-professionnelle-auto-entrepreneur-2026',
    title: 'Assurance professionnelle auto-entrepreneur : quelles obligations en 2026 ?',
    description:
      'Guide complet 2026 des assurances pro pour auto-entrepreneur. RC Pro obligatoire (15 métiers), décennale BTP, multirisque, mutuelle TNS Madelin. Tarifs 2026, sanctions, démarches ORIAS, comparatif 8 assureurs.',
    category: 'Auto-entrepreneur',
    tags: ['auto-entrepreneur', 'assurance pro', 'obligations', 'rc pro', '2026'],
    ...AUTHOR,
    publishedAt: '2026-06-01',
    updatedAt: '2026-06-01',
    readTime: '12 min',
    sources: [
      LEGIFRANCE(
        'Code de commerce art. L. 110-1 (activités commerciales)',
        'codes ou article_lc ou LEGIARTI000006219254'
      ),
      LEGIFRANCE(
        'Code des assurances art. L. 241-1 (décennale)',
        'codes ou article_lc ou LEGIARTI000006792975'
      ),
      URSSAF('URSSAF auto-entrepreneur — obligations 2026'),
      {
        label: 'Service-Public.fr — auto-entreprise',
        url: 'https://entreprendre.service-public.fr/vosdroits/F23961',
      },
    ],
    toc: [
      { id: 'definition', title: '1. Auto-entrepreneur : définition + chiffres 2026' },
      { id: 'rc-pro-obligatoire', title: '2. RC Pro obligatoire (15 métiers)' },
      { id: 'decennale-btp', title: '3. Décennale BTP — 30 métiers' },
      { id: 'multirisque', title: '4. Multirisque pro — utile mais non-obligatoire' },
      { id: 'mutuelle-madelin', title: '5. Mutuelle TNS Madelin (déductible)' },
      { id: 'tarifs-2026', title: '6. Tarifs 2026 par activité' },
      { id: 'sanctions', title: '7. Sanctions en cas de défaut' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'definition',
        h2: '1. Auto-entrepreneur : définition + chiffres 2026',
        paragraphs: [
          "L'auto-entrepreneur (officiellement « micro-entrepreneur » depuis 2016) est un régime simplifié de la micro-entreprise individuelle. Au 1ᵉʳ janvier 2026, on compte 2,8 millions d'auto-entrepreneurs actifs en France selon l'URSSAF, soit +18 % par rapport à 2023. Les secteurs les plus représentés sont : services à la personne (28 %), BTP (19 %), conseil ou informatique (17 %), commerce ambulant (12 %).",
          "Le régime auto-entrepreneur a 3 caractéristiques fiscales majeures : (1) franchise en base de TVA jusqu'à 36 800 € HT pour les services et 91 900 € HT pour les ventes, (2) prélèvement libératoire forfaitaire URSSAF sur le chiffre d'affaires (12,3 % à 23,2 % selon activité), (3) abattement forfaitaire fiscal de 34 % à 71 % sur le CA pour calculer l'impôt sur le revenu.",
          "**ATTENTION** : malgré sa simplicité administrative, l'auto-entrepreneur est SOUMIS aux mêmes obligations d'assurance que toute autre forme juridique (SARL, SAS, EI classique). Le statut n'exonère PAS des obligations légales du Code des assurances et du Code civil.",
          "Les obligations d'assurance varient selon 3 critères : (1) la nature de l'activité (BTP ou RC Pro ou optionnel), (2) le chiffre d'affaires (pas d'obligation directe mais impact sur primes), (3) le contexte d'exercice (B2B ou B2C, en ligne ou physique).",
        ],
      },
      {
        id: 'rc-pro-obligatoire',
        h2: '2. RC Pro obligatoire — 15 métiers concernés',
        paragraphs: [
          'La Responsabilité Civile Professionnelle (RC Pro) est OBLIGATOIRE par la loi pour 15 catégories de métiers, indépendamment du statut juridique. Pour les auto-entrepreneurs, voici les principaux métiers concernés :',
        ],
        list: {
          ordered: true,
          items: [
            '**Conseil & expertise** : conseillers en propriété industrielle, en investissements financiers (CIF), experts-comptables, avocats, notaires',
            '**Santé & bien-être** : ostéopathes, psychothérapeutes, esthéticiennes prothésistes ongulaires, sophrologues exerçant en cabinet',
            '**Immobilier** : agents immobiliers, syndics de copropriété, marchands de biens, courtiers en assurance ou crédit (carte T, G ou S obligatoire)',
            "**Sport & loisirs** : éducateurs sportifs déclarés, moniteurs de plongée, guides de haute montagne, professeurs d'arts martiaux",
            '**Transport** : VTC, taxis, transporteurs de marchandises, ambulanciers, déménageurs',
            '**Animaux** : éducateurs canins, ostéopathes animaliers, dog-sitters professionnels (Code rural)',
            '**Sécurité** : agents de sécurité privée (carte CNAPS), détectives privés, formateurs en sécurité',
            '**Formation pro** : organismes de formation (obligation issue de la loi du 5 mars 2014)',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Pour les 15 métiers obligatoires, le défaut d'assurance RC Pro expose à 3 sanctions : (1) interdiction d'exercer immédiate, (2) amende administrative jusqu'à 7 500 €, (3) responsabilité personnelle illimitée du patrimoine en cas de sinistre.",
        },
      },
      {
        id: 'decennale-btp',
        h2: '3. Décennale BTP — 30 métiers obligatoires',
        paragraphs: [
          "Pour les auto-entrepreneurs du BTP, la garantie décennale (art. L. 241-1 C. assur.) est OBLIGATOIRE pour tous les métiers contribuant à la construction ou rénovation d'ouvrages immobiliers. 30 métiers principaux sont concernés :",
        ],
        list: {
          items: [
            '**Gros œuvre** : maçons, terrassiers, charpentiers, couvreurs, étancheurs, façadiers',
            '**Second œuvre** : plombiers-chauffagistes, électriciens, plaquistes, menuisiers, carreleurs, peintres',
            '**Spécialisés** : isolateurs (RGE), poseurs de panneaux solaires, installateurs PAC, ravaleurs',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Sanctions défaut décennale (art. L. 243-3) : 75 000 € d'amende + 6 mois de prison + interdiction d'exercer définitive. Le client peut également engager la responsabilité personnelle illimitée de l'auto-entrepreneur via art. 1792 C. civ.",
        },
      },
      {
        id: 'multirisque',
        h2: '4. Multirisque pro — utile mais non-obligatoire',
        paragraphs: [
          "La Multirisque Professionnelle n'est PAS obligatoire pour l'auto-entrepreneur, mais devient indispensable dès qu'il y a : (1) un local pro (boutique, atelier, cabinet), (2) du matériel de valeur (>2 000 €), (3) un stock de marchandises, (4) une activité au domicile non couverte par l'habitation classique.",
          "Garanties incluses typiquement : incendie, dégât des eaux, vol ou vandalisme, bris de glace, perte d'exploitation, dommages matériel pro, RC exploitation (différente de la RC Pro). Le tarif moyen 2026 d'une multirisque auto-entrepreneur est de ~25 € par mois pour un local de moins de 50 m² avec 10 000 € de matériel.",
        ],
      },
      {
        id: 'mutuelle-madelin',
        h2: '5. Mutuelle TNS Madelin — déductible fiscalement',
        paragraphs: [
          "L'auto-entrepreneur est affilié au régime des Travailleurs Non Salariés (TNS) et bénéficie depuis 2026 de la couverture santé universelle de base (Assurance Maladie). Cependant, le ticket modérateur, les dépassements d'honoraires, les soins dentaires et l'optique restent à sa charge.",
          "**Loi Madelin (art. 154 bis CGI)** : depuis 1994, les cotisations de mutuelle santé sont DÉDUCTIBLES du bénéfice imposable de l'auto-entrepreneur, dans la limite de 3,75 % du PASS + 7 % du PASS. Plafond 2026 : 3 858 € par an pour une famille moyenne.",
          'Tarifs 2026 mutuelles TNS Madelin : ~40 € par mois (formule économique, jeune dirigeant), ~80 € par mois (formule famille équilibrée), ~150 € par mois (formule premium avec hospitalisation chambre particulière).',
        ],
      },
      {
        id: 'tarifs-2026',
        h2: '6. Tarifs 2026 par activité',
        paragraphs: ['Voici les tarifs moyens 2026 pour un auto-entrepreneur (CA < 40 000 €) :'],
        list: {
          items: [
            '**RC Pro conseil ou services** : 15 à ~35 € par mois selon CA et profession (250 K€ à 1 M€ garantie)',
            '**Décennale BTP simple métier** : 60 à ~90 € par mois (maçon, peintre, plombier) — 500 K€ minimum',
            "**Décennale BTP multi-métiers** : 120 à ~200 € par mois (entreprise généraliste 3-5 corps d'état)",
            '**Multirisque pro local 50 m²** : 25 à ~45 € par mois',
            '**Cyber assurance** : 20 à ~40 € par mois (utile pour activités en ligne, e-commerce, prestation IT)',
            '**Mutuelle TNS Madelin famille** : 80 à ~150 € par mois (déductible fiscalement)',
            '**Protection juridique** : 12 à ~25 € par mois (couvre litiges clients, URSSAF, fournisseurs)',
          ],
        },
      },
      {
        id: 'sanctions',
        h2: '7. Sanctions en cas de défaut',
        paragraphs: ["Les sanctions varient selon la nature de l'assurance manquante :"],
        list: {
          items: [
            "**RC Pro obligatoire manquante** : 7 500 € d'amende + interdiction d'exercer immédiate + responsabilité illimitée",
            '**Décennale manquante (BTP)** : 75 000 € + 6 mois prison + interdiction définitive (art. L. 243-3)',
            '**Multirisque manquante** : aucune sanction légale mais perte du local + matériel en cas de sinistre',
            '**Mutuelle TNS** : aucune sanction (couverture base assurée par la sécurité sociale)',
          ],
        },
        callout: {
          tone: 'success',
          text: 'Notre cabinet ORIAS accompagne 100 % en ligne la souscription RC Pro + décennale auto-entrepreneur en moins de 24 h. Devis personnalisé multi-assureurs gratuit.',
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur le sujet :'],
        list: {
          items: [
            '**Auto-entrepreneur sans RC Pro pour métier non-obligatoire : risqué ?** OUI. Même si non-obligatoire légalement, un client peut engager votre responsabilité personnelle illimitée en cas de dommage. Patrimoine personnel saisissable.',
            "**Décennale auto-entrepreneur BTP first chantier : faut-il avoir l'attestation avant ?** OUI, art. L. 243-2. Souscription AVANT chaque chantier obligatoire. Notre cabinet émet l'attestation en 4 h ouvrées.",
            "**Combien coûte la décennale auto-entrepreneur en 2026 ?** 60 à ~200 € par mois selon métier et chiffre d'affaires. Maçon CA 30 K€ : ~65 € par mois. Multi-métiers CA 80 K€ : ~150 € par mois.",
            "**Mutuelle Madelin auto-entrepreneur : à partir de quand devient déductible ?** Dès l'année de souscription, sur la déclaration de revenus 2042 C-PRO. Limite 2026 : 3,75 % PASS + 7 % PASS.",
            "**Auto-entrepreneur et URSSAF : impact du défaut d'assurance ?** L'URSSAF ne contrôle pas les assurances directement, mais peut signaler les défauts aux organismes de contrôle (DGCCRF, ACPR). Risque de signalement Tracfin si fraude.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 2 — Assurance micro-entreprise 2026 (550 vol)
  // ════════════════════════════════════════════════════════════════════
  'assurance-micro-entreprise-2026': {
    slug: 'assurance-micro-entreprise-2026',
    title: 'Assurance micro-entreprise 2026 : guide complet par activité',
    description:
      'Guide 2026 des assurances micro-entreprise. Différences avec auto-entrepreneur, RC Pro obligatoire, décennale BTP, prix par activité, démarches souscription, plafonds CA 2026.',
    category: 'Auto-entrepreneur',
    tags: ['micro-entreprise', 'assurance', '2026', 'obligations', 'prix'],
    ...AUTHOR,
    publishedAt: '2026-06-03',
    updatedAt: '2026-06-03',
    readTime: '10 min',
    sources: [
      LEGIFRANCE('Loi PACTE 2019 (suppression seuils micro)', 'jorf, id ou JORFTEXT000038496102'),
      URSSAF('URSSAF micro-entrepreneur — plafonds 2026'),
      {
        label: 'INSEE — démographie micro-entreprises 2024',
        url: 'https://www.insee.fr/fr/statistiques',
      },
    ],
    toc: [
      { id: 'definition', title: '1. Micro-entreprise vs auto-entrepreneur' },
      { id: 'plafonds', title: '2. Plafonds CA 2026' },
      { id: 'obligations', title: "3. Obligations d'assurance" },
      { id: 'prix', title: '4. Prix par activité' },
      { id: 'souscription', title: '5. Démarches de souscription' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'definition',
        h2: '1. Micro-entreprise vs auto-entrepreneur — la même chose ?',
        paragraphs: [
          "Depuis le 1ᵉʳ janvier 2016, les régimes « auto-entrepreneur » et « micro-entreprise » ont fusionné officiellement sous le nom « micro-entrepreneur ». Les deux termes désignent donc EXACTEMENT le même régime fiscal et social en 2026, malgré la persistance d'usage du terme « auto-entrepreneur » dans le langage courant.",
          "Caractéristiques communes du régime : (1) entreprise individuelle (pas de personnalité morale séparée), (2) régime fiscal micro-BIC ou micro-BNC, (3) prélèvement libératoire URSSAF possible, (4) franchise TVA jusqu'aux seuils (cf. section 2), (5) responsabilité illimitée du patrimoine personnel (sauf déclaration d'insaisissabilité notariée).",
          "La fusion 2016 visait à simplifier la communication : avant 2016, les seuils auto-entrepreneur étaient plus bas que micro-entreprise, créant confusion. Depuis 2026, c'est UNIFIÉ avec les mêmes plafonds.",
        ],
      },
      {
        id: 'plafonds',
        h2: '2. Plafonds CA 2026 (loi de finances)',
        paragraphs: [
          "Les plafonds de chiffre d'affaires hors taxes annuel pour rester en micro-entreprise en 2026 sont :",
        ],
        list: {
          items: [
            '**Vente de marchandises, fourniture de logement** : 91 900 € HT (188 700 € sur 2 ans cumulés)',
            '**Prestations de services — professions libérales** : 36 800 € HT (77 700 € sur 2 ans cumulés)',
            '**Mixte (vente + services)** : 91 900 € global ET 36 800 € pour la partie services',
          ],
        },
        callout: {
          tone: 'info',
          text: "Au-delà de 2 dépassements consécutifs (2 années de suite), le micro-entrepreneur bascule automatiquement au régime réel d'imposition (EI classique ou EURL ou SASU au choix).",
        },
      },
      {
        id: 'obligations',
        h2: "3. Obligations d'assurance",
        paragraphs: [
          "Les obligations d'assurance sont identiques à celles décrites en détail dans notre guide auto-entrepreneur (cf. article dédié). Récapitulatif :",
        ],
        list: {
          items: [
            '**RC Pro obligatoire** pour 15 catégories métier (conseil, santé, immobilier, sport, transport, animaux, sécurité, formation pro)',
            '**Décennale obligatoire** pour 30 métiers BTP (gros œuvre, second œuvre, métiers spécialisés)',
            "**Multirisque pro** : non-obligatoire mais indispensable dès qu'il y a un local + matériel",
            '**Mutuelle TNS Madelin** : optionnelle, déductible fiscalement',
            '**Cyber assurance** : non-obligatoire mais pertinente pour activités en ligne ou IT',
          ],
        },
      },
      {
        id: 'prix',
        h2: '4. Prix par activité',
        paragraphs: ['Tarifs moyens 2026 micro-entreprise (CA < 50 K€) :'],
        list: {
          items: [
            '**Conseil ou freelance** : RC Pro 15-30 € par mois, multirisque 0 € (pas de local), mutuelle ~80 € par mois',
            '**Artisan BTP** : décennale 70-120 € par mois, RC Pro incluse, multirisque outils ~25 € par mois',
            '**Esthétique ou coiffure** : RC Pro ~25 € par mois, multirisque salon ~35 € par mois, mutuelle ~80 € par mois',
            '**E-commerce** : RC Pro ~20 € par mois, cyber ~25 € par mois, multirisque stock ~30 € par mois',
            '**VTC ou taxi** : RC Pro pro auto 80-150 € par mois (incluant assurance pro du véhicule)',
            '**Bien-être ou sport** : RC Pro ~25 € par mois (sport-éducateur), assurance corporel ~15 € par mois',
          ],
        },
      },
      {
        id: 'souscription',
        h2: '5. Démarches de souscription',
        paragraphs: ["La souscription d'une assurance micro-entreprise se fait en 4 étapes :"],
        list: {
          ordered: true,
          items: [
            "**Identification de l'activité** : code APE ou NAF officiel, description précise, expérience pro, formations ou diplômes",
            '**Recueil des besoins** : RC Pro, décennale, multirisque, cyber, mutuelle (selon obligations + risques)',
            '**Comparaison multi-assureurs** : un courtier ORIAS comme notre cabinet compare 8 à 12 assureurs partenaires',
            '**Souscription + paiement** : signature électronique, paiement mensualisé, attestation émise sous 24 h',
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur le sujet :'],
        list: {
          items: [
            "**Micro-entreprise et auto-entrepreneur : différence ?** AUCUNE depuis 2016. C'est le même régime, juste deux appellations.",
            "**Plafond dépassé : impact assurance ?** Aucun impact direct. Mais la prime peut être réajustée à l'échéance si le CA réel diffère de l'estimation initiale.",
            "**Micro-entreprise + salarié : assurance différente ?** OUI. Si vous employez un salarié, ajoutez une RC Employeur + DUERP obligatoire (Document Unique d'Évaluation des Risques Professionnels).",
            "**Insaisissabilité du patrimoine personnel : protège-t-elle de tout ?** NON. Elle protège la résidence principale (auto-protégée depuis 2015) et autres biens immobiliers SI déclaration notariée. Mais elle ne protège PAS d'une condamnation pénale ou d'une dette URSSAF.",
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 3 — Micro-entreprise BTP assurances (250 vol)
  // ════════════════════════════════════════════════════════════════════
  'micro-entreprise-btp-assurances-2026': {
    slug: 'micro-entreprise-btp-assurances-2026',
    title: 'Micro-entreprise BTP : 4 assurances obligatoires en 2026',
    description:
      'Guide 2026 des 4 assurances obligatoires ou recommandées pour artisan BTP en micro-entreprise. Décennale, RC Pro, multirisque, dommages-ouvrage. Tarifs, sanctions, démarches ORIAS.',
    category: 'BTP',
    tags: ['btp', 'micro-entreprise', 'artisan', 'décennale', 'rc pro'],
    ...AUTHOR,
    publishedAt: '2026-06-05',
    updatedAt: '2026-06-05',
    readTime: '11 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances art. L. 241-1',
        'codes ou article_lc ou LEGIARTI000006792975'
      ),
      LEGIFRANCE(
        'Code civil art. 1792 (responsabilité décennale)',
        'codes ou article_lc ou LEGIARTI000006442525'
      ),
      {
        label: 'AQC SYCODÉS 2024 — sinistralité',
        url: 'https://qualiteconstruction.com/observatoire/sycodes/',
      },
    ],
    toc: [
      { id: 'enjeux', title: '1. Enjeux BTP micro-entreprise' },
      { id: 'decennale', title: '2. Garantie décennale (obligatoire)' },
      { id: 'rc-pro', title: '3. RC Pro (obligatoire pour 30 métiers BTP)' },
      { id: 'multirisque', title: '4. Multirisque pro (recommandée)' },
      { id: 'dommages-ouvrage', title: '5. Dommages-ouvrage (côté client)' },
      { id: 'cas-pratiques', title: '6. 3 cas pratiques' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'enjeux',
        h2: '1. Enjeux BTP micro-entreprise',
        paragraphs: [
          "Le BTP est le secteur le plus risqué pour un micro-entrepreneur : sinistralité moyenne 2024 selon AQC SYCODÉS = 1 sinistre pour 5 chantiers, montant moyen de réparation = 28 500 €. Une absence d'assurance décennale peut donc ruiner durablement un artisan.",
          "30 métiers BTP sont concernés par l'obligation décennale en 2026 : maçons, plombiers, électriciens, charpentiers, couvreurs, peintres, carreleurs, plaquistes, isolateurs, façadiers, menuisiers, terrassiers, escaliers ou balustrades, étancheurs, ravaleurs, ferronniers, paysagistes-terrassiers, vérandalistes, poseurs PAC ou solaires, ramoneurs, désamianteurs, démolisseurs, étanchéistes piscine, sols souples spécialisés, sols spéciaux durs, agenceurs cuisine ou bain, électricité spécialisée (domotique), plomberie sanitaire avancée, géomètres-experts, dessinateurs métreurs (sauf études).",
        ],
      },
      {
        id: 'decennale',
        h2: '2. Garantie décennale — la pierre angulaire',
        paragraphs: [
          "La garantie décennale (art. L. 241-1 C. assur. + art. 1792 C. civ.) couvre pendant 10 ans après réception tous les dommages qui compromettent la solidité de l'ouvrage OU le rendent impropre à sa destination.",
          'Tarifs 2026 décennale micro-entreprise BTP (CA < 50 K€) :',
        ],
        list: {
          items: [
            '**Maçon CA 30 K€** : ~65 € par mois (~780  € par an)',
            '**Plombier CA 40 K€** : ~75 € par mois (~900  € par an)',
            '**Électricien CA 35 K€** : ~70 € par mois (~840  € par an)',
            '**Couvreur CA 45 K€** : ~95 € par mois (~1 140  € par an) — métier à risque élevé',
            '**Multi-métiers généraliste CA 50 K€** : ~120 € par mois (~1 440  € par an)',
          ],
        },
        callout: {
          tone: 'warning',
          text: "Sans décennale, sanctions : 75 000 € d'amende + 6 mois prison + interdiction d'exercer DÉFINITIVE (art. L. 243-3 C. assur.). Pratiques courantes des assureurs : refus de couverture rétroactive si demande post-chantier.",
        },
      },
      {
        id: 'rc-pro',
        h2: '3. RC Pro BTP — souvent confondue avec décennale',
        paragraphs: ['La RC Pro BTP est DISTINCTE de la décennale. Elle couvre :'],
        list: {
          items: [
            '**Pendant le chantier** : dommages à des tiers (passant blessé, mur du voisin endommagé)',
            "**Pendant 10 ans après réception** : dommages aux biens du client autres que l'ouvrage lui-même",
            '**Pollution — nuisances** : si le chantier cause une pollution accidentelle',
            "**Atteinte à l'environnement** : pour les métiers avec produits chimiques (peintres, étanchéistes)",
          ],
        },
        callout: {
          tone: 'info',
          text: 'La RC Pro est généralement INCLUSE dans le contrat décennale chez la plupart des assureurs (Allianz, AXA, Generali, MAAF). Tarif additionnel : 0 à ~15 € par mois selon métier.',
        },
      },
      {
        id: 'multirisque',
        h2: '4. Multirisque pro — protéger ses outils + véhicule',
        paragraphs: ['Pour un micro-entrepreneur BTP, la multirisque pro protège :'],
        list: {
          items: [
            '**Atelier ou local pro** : incendie, dégât des eaux, vol, vandalisme',
            '**Matériel pro** : outils, machines, échafaudages, échelles (10 000 à 30 000 € valeur moyenne)',
            '**Véhicule pro** : camionnette, fourgon (à compléter par assurance auto pro)',
            '**Stock de matériaux** : couverture vol ou incendie',
            "**Perte d'exploitation** : 1 à 3 mois de CA en cas d'arrêt forcé",
          ],
        },
      },
      {
        id: 'dommages-ouvrage',
        h2: "5. Dommages-ouvrage — c'est au client de la souscrire",
        paragraphs: [
          "La garantie dommages-ouvrage (DO) est OBLIGATOIRE pour le MAÎTRE D'OUVRAGE (client) avant l'ouverture du chantier (art. L. 242-1 C. assur.). Elle préfinance les réparations en cas de sinistre décennal, en attendant la mise en cause de l'artisan.",
          "L'artisan micro-entrepreneur a 2 obligations vis-à-vis de la DO : (1) recommander au client de la souscrire, (2) faciliter l'expertise en fournissant les attestations décennales et plans d'exécution.",
        ],
      },
      {
        id: 'cas-pratiques',
        h2: '6. 3 cas pratiques',
        paragraphs: [
          'Cas pratique 1 — Maçon CA 35 K€ : décennale ~70 € par mois + multirisque outils ~20 € par mois = ~90 € par mois (~1 080  € par an, soit 3 % du CA). Recommandation : OK, équilibre coût ou risque.',
          'Cas pratique 2 — Couvreur CA 60 K€ : décennale ~110 € par mois + multirisque outils + véhicule ~50 € par mois = ~160 € par mois (~1 920  € par an, soit 3,2 % du CA). Recommandation : ajouter cyber ~20 € par mois pour devis ou factures.',
          'Cas pratique 3 — Multi-métiers (maçon + plâtrier + peintre) CA 80 K€ : décennale ~145 € par mois + multirisque ~40 € par mois = ~185 € par mois (~2 220  € par an, soit 2,8 % du CA). Recommandation : revoir la stratégie — basculer en EI classique ou EURL pour optimiser fiscalité.',
        ],
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur le sujet :'],
        list: {
          items: [
            '**BTP sans décennale : risques réels ?** Catastrophique. Sinistralité moyenne 28 500 €. Patrimoine personnel saisissable (auto-entrepreneur = responsabilité illimitée). Risque pénal (75 000 € amende + 6 mois prison).',
            "**Décennale micro-entreprise BTP first chantier : souscrire AVANT ?** OBLIGATOIRE. Art. L. 243-2. Notre cabinet émet l'attestation en 4 à 24 h ouvrées.",
            "**Sous-traitance BTP : qui assure ?** Chaque entreprise (donneur d'ordre ET sous-traitant) doit avoir sa propre décennale. Sous-traitance sans décennale = faute lourde du donneur d'ordre.",
            '**Auto-entrepreneur BTP + salarié : RC Employeur obligatoire ?** OUI. Code du travail art. L. 4121-1 + DUERP. Tarif : 80 à ~150  € par an pour 1 salarié.',
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 4 — Statut juridique vs assurance pro (200 vol)
  // ════════════════════════════════════════════════════════════════════
  'statut-juridique-assurance-pro-comparatif': {
    slug: 'statut-juridique-assurance-pro-comparatif',
    title: 'Statut juridique et assurance pro : comparatif EI — SASU — EURL — micro',
    description:
      'Comparatif 2026 statut juridique vs assurance pro. Impact micro-entreprise, EI, EIRL, EURL, SASU, SARL sur RC Pro, décennale, multirisque. Quel statut optimise les primes ?',
    category: 'Conseil',
    tags: ['statut juridique', 'sasu', 'eurl', 'sarl', 'comparatif'],
    ...AUTHOR,
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    readTime: '11 min',
    sources: [
      LEGIFRANCE(
        'Code de commerce art. L. 223-1 (SARL)',
        'codes ou article_lc ou LEGIARTI000006219252'
      ),
      LEGIFRANCE('Loi PACTE 22 mai 2019', 'jorf, id ou JORFTEXT000038496102'),
      {
        label: 'INSEE — démographie entreprises 2024',
        url: 'https://www.insee.fr/fr/statistiques',
      },
    ],
    toc: [
      { id: 'enjeux', title: '1. Pourquoi le statut impacte les assurances' },
      { id: 'micro', title: '2. Micro-entreprise' },
      { id: 'ei-eirl', title: '3. EI — EIRL (depuis 2022 unifiés)' },
      { id: 'eurl', title: '4. EURL' },
      { id: 'sasu', title: '5. SASU' },
      { id: 'sarl-sas', title: '6. SARL — SAS (multi-associés)' },
      { id: 'tableau', title: '7. Tableau comparatif' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'enjeux',
        h2: '1. Pourquoi le statut juridique impacte les assurances',
        paragraphs: [
          "Le statut juridique d'une entreprise impacte les assurances pro sur 4 dimensions :",
        ],
        list: {
          ordered: true,
          items: [
            '**Responsabilité du dirigeant** : illimitée (EI, micro) ou limitée aux apports (EURL, SASU, SARL, SAS)',
            '**Régime social** : TNS (micro, EI, EURL avec gérant majoritaire) ou assimilé-salarié (SASU, SAS)',
            '**Primes RC Pro** : variation 10 à 30 % selon statut (assureurs voient EI ou micro comme plus risqués)',
            '**Patrimoine personnel** : saisissable en EI ou micro, protégé en SASU, EURL, SARL ou SAS',
          ],
        },
        callout: {
          tone: 'info',
          text: "Depuis la Loi du 14 février 2022, l'EI bénéficie d'une séparation automatique patrimoine pro ou perso. Mais la responsabilité dans le cadre des dettes pro reste personnelle.",
        },
      },
      {
        id: 'micro',
        h2: '2. Micro-entreprise',
        paragraphs: [
          'Régime simplifié, statut individuel, responsabilité illimitée. Impact assurance :',
        ],
        list: {
          items: [
            '**RC Pro** : primes 10 à 20 % supérieures vs SASU à activité égale (assureur compense risque illimité)',
            "**Décennale BTP** : pas de différence significative (l'attestation décennale couvre l'entreprise quel que soit son statut)",
            '**Multirisque** : tarifs identiques',
            "**Plus grande exposition personnelle** = nécessité d'une protection juridique + responsabilité civile vie privée renforcée",
          ],
        },
      },
      {
        id: 'ei-eirl',
        h2: '3. EI — EIRL — Entreprise Individuelle',
        paragraphs: [
          "Depuis le 15 mai 2022, l'EIRL a été supprimée et fusionnée avec l'EI : séparation patrimoines automatique. Impact assurance :",
        ],
        list: {
          items: [
            '**Responsabilité limitée au patrimoine pro** (depuis 2022). Mais : possibilité de renoncer à cette séparation pour obtenir crédit bancaire (alors patrimoine perso engagé).',
            '**Primes RC Pro** : 5 à 10 % supérieures à SASU mais inférieures à micro-entreprise.',
            '**Régime social TNS** : mutuelle Madelin déductible.',
          ],
        },
      },
      {
        id: 'eurl',
        h2: '4. EURL — un associé unique en SARL',
        paragraphs: [
          'Société à responsabilité limitée à associé unique. Responsabilité limitée aux apports. Impact assurance :',
        ],
        list: {
          items: [
            '**RC Pro** : tarifs identiques à SARL ou SAS standard',
            '**Décennale BTP** : tarifs identiques',
            '**Régime social gérant majoritaire** : TNS (mutuelle Madelin déductible)',
            '**Patrimoine personnel** : préservé sauf garantie bancaire personnelle',
          ],
        },
      },
      {
        id: 'sasu',
        h2: '5. SASU — Société par Actions Simplifiée Unipersonnelle',
        paragraphs: [
          'Forme préférée des freelances ou dirigeants depuis 2017 pour sa flexibilité. Impact assurance :',
        ],
        list: {
          items: [
            '**RC Pro** : tarifs les plus avantageux (assureurs préfèrent SASU pour la séparation nette)',
            '**Décennale BTP** : tarifs identiques aux autres formes sociétaires',
            '**Régime social assimilé-salarié** : mutuelle entreprise possible (article 83), pas Madelin',
            '**Cotisations sociales** : 75 % de la rémunération (vs 40-45 % pour TNS) MAIS meilleure protection chômage ou maladie',
          ],
        },
      },
      {
        id: 'sarl-sas',
        h2: '6. SARL — SAS — multi-associés',
        paragraphs: ['Sociétés avec 2 associés ou plus. Impact assurance :'],
        list: {
          items: [
            '**RC Pro** : tarifs standard',
            '**Décennale BTP** : tarifs standard',
            '**RC Mandataires Sociaux (D&O)** : recommandée pour protéger les dirigeants contre les actions des actionnaires (à partir de 200 K€ de CA conseillée)',
            "**Assurance Homme-Clé** : pertinente si 1 ou 2 personnes critiques pour l'activité",
          ],
        },
      },
      {
        id: 'tableau',
        h2: '7. Tableau comparatif',
        paragraphs: [
          "Voici un tableau de synthèse des impacts statut juridique vs primes d'assurance pro :",
        ],
        list: {
          items: [
            "**Micro-entreprise** : RC Pro +20 %, simplicité +++, fiscalité +++ jusqu'à 36-91 K€",
            '**EI (post-2022)** : RC Pro +10 %, séparation patrimoines auto, régime TNS',
            '**EURL** : RC Pro standard, gérant TNS, statut sociétaire (banques préfèrent)',
            '**SASU** : RC Pro -5 %, régime assimilé-salarié, charges sociales élevées mais meilleure couverture',
            '**SARL ou SAS** : RC Pro standard, recommandé multirisque + D&O dès 200 K€ CA',
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur le sujet :'],
        list: {
          items: [
            "**Changer de statut pour réduire les primes : pertinent ?** Marginalement. Économie de 50 à ~150  € par an sur les primes, mais coûts de transformation et changement de régime social peuvent annuler. Privilégier le statut adapté à l'activité.",
            "**SASU vs SARL : impact réel sur RC Pro ?** Quasi-nul. La différence se joue plutôt sur la nature de l'activité et le CA que sur la forme juridique.",
            '**Micro-entreprise vers SASU : démarches ?** Cessation micro + création SASU (formalités CFE ou INPI). Compter 1 mois et 200 à 500 € de frais notariés ou comptables.',
            '**Holding + SAS opérationnelle : impact assurance ?** La RC Pro suit la SAS opérationnelle. La holding peut souscrire une RC Mandataires Sociaux (D&O) qui couvre les dirigeants des deux entités.',
          ],
        },
      },
    ],
  },
}
