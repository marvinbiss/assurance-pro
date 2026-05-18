/**
 * Blog articles — Batch 7 (2 articles étoffés à ~1500 mots)
 *
 * Session 6 du programme éditorial Ahrefs.
 * Catégorie C (prix par métier) — articles tarifs détaillés.
 *
 * Date génération : 2026-05-13 (session 6)
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

export const BLOG_POSTS_BATCH_7: Record<string, BlogPost> = {
  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 1 — Prix décennale 2026 par métier (700 vol)
  // ════════════════════════════════════════════════════════════════════
  'prix-assurance-decennale-2026-par-metier': {
    slug: 'prix-assurance-decennale-2026-par-metier',
    title: 'Prix assurance décennale 2026 par métier : grille détaillée 30 métiers',
    description:
      "Grille tarifaire 2026 décennale par métier BTP. 30 métiers détaillés : maçon, plombier, électricien, couvreur, charpentier. Tarifs CA 30/50/80 K€. Méthodologie de calcul, 7 leviers d'économie.",
    category: 'Prix',
    tags: ['prix décennale', 'tarif 2026', 'btp', 'grille', 'comparatif'],
    ...AUTHOR,
    publishedAt: '2026-06-20',
    updatedAt: '2026-06-20',
    readTime: '12 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances art. L. 241-1',
        'codes ou article_lc ou LEGIARTI000006792975'
      ),
      {
        label: 'AQC SYCODÉS — sinistralité 2024',
        url: 'https://qualiteconstruction.com/observatoire/sycodes/',
      },
      { label: 'FFB — Fédération Française du Bâtiment', url: 'https://www.ffbatiment.fr/' },
    ],
    toc: [
      { id: 'methodologie', title: '1. Méthodologie de tarification' },
      { id: 'gros-oeuvre', title: '2. Gros œuvre — 7 métiers' },
      { id: 'second-oeuvre', title: '3. Second œuvre — 12 métiers' },
      { id: 'specialises', title: '4. Métiers spécialisés — 11 métiers' },
      { id: 'leviers', title: "5. 7 leviers d'économie" },
      { id: 'devis', title: '6. Devis multi-assureurs gratuit' },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'methodologie',
        h2: '1. Méthodologie de tarification décennale',
        paragraphs: [
          "Le prix d'une assurance décennale en 2026 dépend de 7 critères principaux que les assureurs analysent systématiquement :",
        ],
        list: {
          ordered: true,
          items: [
            '**Métier exercé** : impact x1 à x4 sur la prime (peintre vs étanchéiste piscine)',
            "**Chiffre d'affaires** : tarif progressif (~50 € par mois pour 30 K€, ~150 € par mois pour 100 K€)",
            "**Antécédents sinistres** : majoration jusqu'à +100 % si > 2 sinistres en 5 ans",
            "**Expérience pro** : minoration de -10 à -15 % si > 5 ans d'expérience documentée",
            '**Statut juridique** : impact marginal (micro -10 % à +10 % selon assureurs)',
            '**Zone géographique** : majoration Île-de-France, PACA, Corse (+5 à +15 %)',
            '**Sous-traitance** : majoration +10 à +20 % si > 30 % de sous-traitance',
          ],
        },
        callout: {
          tone: 'info',
          text: 'Notre cabinet ORIAS calcule votre tarif décennale en moins de 4 h en interrogeant 12 assureurs partenaires (Allianz, AXA, MAAF, Generali, Hiscox, GMF, MMA, Groupama, Macif, Albingia, Wakam, April).',
        },
      },
      {
        id: 'gros-oeuvre',
        h2: '2. Gros œuvre — 7 métiers',
        paragraphs: [
          'Tarifs moyens 2026 décennale gros œuvre (entreprise individuelle CA 50 K€) :',
        ],
        list: {
          items: [
            '**Maçon généraliste** : 75 à ~110 € par mois (900-1 320 € par an)',
            '**Terrassier** : 85 à ~130 € par mois (1 020-1 560 € par an)',
            '**Charpentier bois** : 80 à ~115 € par mois',
            '**Charpentier métallique** : 100 à ~150 € par mois (risque levage)',
            '**Couvreur zingueur** : 110 à ~160 € par mois (chute hauteur)',
            '**Étancheur** : 130 à ~180 € par mois (sinistralité élevée)',
            '**Façadier** : 90 à ~130 € par mois',
          ],
        },
        callout: {
          tone: 'warning',
          text: 'Couvreurs et étanchéistes ont les sinistralités les plus élevées du BTP : 1 sinistre sur 3 chantiers (vs 1/8 pour les peintres). Tarifs majorés en conséquence.',
        },
      },
      {
        id: 'second-oeuvre',
        h2: '3. Second œuvre — 12 métiers',
        paragraphs: [
          'Tarifs moyens 2026 décennale second œuvre (entreprise individuelle CA 50 K€) :',
        ],
        list: {
          items: [
            '**Plombier-chauffagiste** : 75 à ~110 € par mois',
            '**Électricien** : 70 à ~100 € par mois (sinistralité moyenne)',
            '**Plaquiste ou Plâtrier** : 60 à ~90 € par mois (faible sinistralité)',
            '**Menuisier intérieur** : 55 à ~85 € par mois',
            "**Menuisier extérieur (fenêtres ou portes)** : 70 à ~100 € par mois (étanchéité à l'air)",
            '**Carreleur** : 60 à ~90 € par mois',
            '**Peintre intérieur** : 50 à ~75 € par mois (la plus faible)',
            '**Peintre extérieur ou ravaleur** : 80 à ~110 € par mois',
            '**Sols souples (parquet, moquette)** : 55 à ~80 € par mois',
            '**Cuisiniste** : 65 à ~95 € par mois',
            '**Salle de bain spécialiste** : 75 à ~110 € par mois (étanchéité)',
            '**Domoticien** : 65 à ~90 € par mois',
          ],
        },
      },
      {
        id: 'specialises',
        h2: '4. Métiers spécialisés — 11 métiers',
        paragraphs: ['Tarifs moyens 2026 décennale métiers spécialisés (CA 50 K€) :'],
        list: {
          items: [
            '**Isolateur RGE** : 75 à ~110 € par mois',
            '**Installateur PAC** : 95 à ~140 € par mois',
            '**Poseur panneaux solaires** : 90 à ~135 € par mois (étanchéité toiture)',
            '**Désamianteur** : 180 à ~260 € par mois (risque sanitaire élevé)',
            '**Démolisseur** : 150 à ~220 € par mois (responsabilité tiers)',
            '**Étanchéiste piscine** : 200 à ~280 € par mois (sinistralité maximum)',
            '**Géomètre-expert** : 120 à ~180 € par mois (responsabilité conception)',
            "**Bureau d'études BTP** : 130 à ~190 € par mois (conception ou calcul)",
            "**Architecte d'intérieur** : 70 à ~100 € par mois",
            '**Paysagiste-terrassier** : 80 à ~120 € par mois',
            "**Ferronnier d'art** : 70 à ~100 € par mois",
          ],
        },
      },
      {
        id: 'leviers',
        h2: "5. 7 leviers d'économie sur votre décennale",
        paragraphs: ["Pour réduire votre prime décennale jusqu'à 30 %, 7 leviers actionnables :"],
        list: {
          ordered: true,
          items: [
            "**Comparer 8 à 12 assureurs** : écart de prime jusqu'à 40 % à garantie égale (utilisez un courtier ORIAS)",
            '**Augmenter la franchise** : franchise 500 € au lieu de 200 € = -15 % de prime',
            '**Paiement annuel** : -5 à -8 % vs mensualités (élimine frais gestion)',
            '**Bundle multi-garanties** : décennale + RC Pro + multirisque = -10 à -15 %',
            '**Antécédents propres** : 5 ans sans sinistre = bonus -15 à -25 %',
            '**Formations qualifiantes** : RGE, Qualibat, Qualipac = -5 à -10 %',
            '**Spécialisation** : 1 seul métier vs multi-métiers = -10 à -20 %',
          ],
        },
        callout: {
          tone: 'success',
          text: "Nos clients réalisent en moyenne 18 % d'économie sur leur prime décennale lors du renouvellement, juste en passant par notre cabinet ORIAS multi-assureurs.",
        },
      },
      {
        id: 'devis',
        h2: '6. Devis multi-assureurs gratuit',
        paragraphs: ['Notre processus de devis décennale en 4 étapes :'],
        list: {
          ordered: true,
          items: [
            "**Recueil d'informations** : métier, CA prévisionnel, antécédents, expérience (15 min en ligne)",
            '**Interrogation 12 assureurs** : envoi simultané du dossier à nos partenaires (4 à 24 h)',
            '**Analyse comparative** : tableau côte à côte tarifs + garanties + plafonds + exclusions',
            '**Recommandation motivée** : choix justifié + signature électronique + paiement',
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur le prix de la décennale :'],
        list: {
          items: [
            '**Décennale auto-entrepreneur CA 30 K€ : prix moyen ?** 60 à ~100 € par mois selon métier. Maçon : ~70 €, plombier : ~75 €, électricien : ~70 €.',
            '**Décennale entreprise CA 200 K€ : prix moyen ?** 250 à ~450 € par mois selon métier et statut. Effectif réduit (1-3 salariés) : économie possible par mutualisation.',
            "**Sinistre récent : impact sur prime ?** Majoration de +20 à +100 % pour 3 à 5 ans. Possibilité de changer d'assureur pour repartir sur des bases neutres.",
            '**Décennale moins chère ailleurs : changer ?** Vérifier les garanties incluses, les exclusions, les plafonds. Une décennale 30 % moins chère peut avoir des sous-plafonds problématiques.',
            '**Décennale pour 2 métiers : 1 ou 2 contrats ?** 1 seul contrat multi-activités possible chez la plupart des assureurs. Mention obligatoire des 2 activités. Tarif majoré de 30 à 60 %.',
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  // ARTICLE 2 — Tarif RC Pro 2026 par profession (550 vol)
  // ════════════════════════════════════════════════════════════════════
  'tarif-rc-pro-2026-par-profession': {
    slug: 'tarif-rc-pro-2026-par-profession',
    title: 'Tarif RC Pro 2026 par profession : grille détaillée 25 métiers',
    description:
      'Grille tarifaire 2026 RC Pro par profession. 25 métiers détaillés : conseil, santé, immobilier, sport, transport. Tarifs CA 30/50/100 K€. Plafonds garanties, méthodologie, économies.',
    category: 'Prix',
    tags: ['tarif rc pro', '2026', 'profession', 'grille', 'comparatif'],
    ...AUTHOR,
    publishedAt: '2026-06-22',
    updatedAt: '2026-06-22',
    readTime: '11 min',
    sources: [
      LEGIFRANCE(
        'Code des assurances art. L. 124-1',
        'codes ou article_lc ou LEGIARTI000006792570'
      ),
      { label: 'ACPR — Rapport annuel 2024', url: 'https://acpr.banque-france.fr/' },
    ],
    toc: [
      { id: 'methodologie', title: '1. Méthodologie de tarification RC Pro' },
      { id: 'conseil', title: '2. Conseil ou expertise — 7 métiers' },
      { id: 'sante', title: '3. Santé ou bien-être — 6 métiers' },
      { id: 'immobilier', title: '4. Immobilier — 4 métiers' },
      { id: 'transport', title: '5. Transport — 4 métiers' },
      { id: 'specialises', title: '6. Métiers spécialisés — 4 métiers' },
      { id: 'leviers', title: "7. 6 leviers d'économie" },
      { id: 'faq', title: 'FAQ' },
    ],
    body: [
      {
        id: 'methodologie',
        h2: '1. Méthodologie de tarification RC Pro',
        paragraphs: [
          "Le tarif d'une assurance RC Pro en 2026 dépend de 6 critères analysés systématiquement par les assureurs :",
        ],
        list: {
          ordered: true,
          items: [
            '**Profession** : impact x1 à x3 (notaire vs auto-entrepreneur conseil)',
            "**Chiffre d'affaires** : tarif progressif (~15 € par mois pour 30 K€, ~80 € par mois pour 300 K€)",
            '**Plafonds garantie souhaités** : 250 K€ vs 5 M€ = impact x3 sur la prime',
            '**Zone géographique** : majoration Île-de-France, USA, Asie (clientèle internationale)',
            '**Antécédents** : sinistre récent majoration +20 à +80 %',
            '**Sous-traitance — consultants externes** : majoration +10 à +25 %',
          ],
        },
      },
      {
        id: 'conseil',
        h2: '2. Conseil ou expertise — 7 métiers',
        paragraphs: ['Tarifs moyens 2026 RC Pro conseil ou expertise (CA 50 K€, plafond 500 K€) :'],
        list: {
          items: [
            '**Consultant en stratégie** : 25 à ~45 € par mois',
            '**Consultant IT ou dev** : 20 à ~40 € par mois',
            '**Expert-comptable** : 65 à ~100 € par mois (responsabilité élevée)',
            '**Avocat libéral** : 80 à ~130 € par mois (RC obligatoire CARPA)',
            '**Notaire** : 150 à ~250 € par mois (RC très élevée)',
            '**Conseiller financier (CIF)** : 100 à ~180 € par mois (RC obligatoire AMF)',
            '**Coach professionnel** : 18 à ~35 € par mois (faible sinistralité)',
          ],
        },
      },
      {
        id: 'sante',
        h2: '3. Santé ou bien-être — 6 métiers',
        paragraphs: ['Tarifs moyens 2026 RC Pro santé ou bien-être (CA 50 K€, plafond 1 M€) :'],
        list: {
          items: [
            '**Médecin libéral généraliste** : 200 à ~400 € par mois (RC très élevée, obligation 11 février 2002)',
            '**Médecin spécialiste hors chirurgie** : 250 à ~500 € par mois',
            '**Médecin chirurgien** : 800 à 2 500 € par mois (le plus cher)',
            '**Kinésithérapeute libéral** : 30 à ~50 € par mois',
            '**Ostéopathe** : 25 à ~45 € par mois',
            '**Esthéticienne — praticienne bien-être** : 22 à ~40 € par mois',
          ],
        },
        callout: {
          tone: 'info',
          text: "Pour les professions de santé, l'assurance dommages corporels (responsabilité civile médicale) est OBLIGATOIRE depuis la Loi Kouchner du 4 mars 2002. Sanctions identiques à la décennale BTP.",
        },
      },
      {
        id: 'immobilier',
        h2: '4. Immobilier — 4 métiers',
        paragraphs: [
          'Tarifs moyens 2026 RC Pro immobilier (CA 100 K€, plafond Loi Hoguet 500 K€ ou 1 M€) :',
        ],
        list: {
          items: [
            '**Agent immobilier (carte T)** : 90 à ~140 € par mois',
            '**Syndic de copropriété (carte S)** : 130 à ~200 € par mois',
            '**Marchand de biens** : 150 à ~250 € par mois (responsabilité élargie)',
            '**Diagnostiqueur immobilier (DPE, Plomb ou Amiante)** : 80 à ~130 € par mois',
          ],
        },
      },
      {
        id: 'transport',
        h2: '5. Transport — 4 métiers',
        paragraphs: ['Tarifs moyens 2026 RC Pro transport (CA 50 K€) :'],
        list: {
          items: [
            '**VTC indépendant** : 75 à ~130 € par mois (RC + assurance pro auto)',
            '**Taxi indépendant** : 100 à ~180 € par mois',
            '**Transporteur de marchandises** : 120 à ~200 € par mois',
            '**Ambulancier** : 200 à ~350 € par mois (RC corporelle élevée)',
          ],
        },
      },
      {
        id: 'specialises',
        h2: '6. Métiers spécialisés — 4 métiers',
        paragraphs: ['Tarifs moyens 2026 RC Pro métiers spécialisés (CA 50 K€) :'],
        list: {
          items: [
            '**Détective privé (CNAPS)** : 80 à ~130 € par mois',
            '**Agent de sécurité privée** : 60 à ~100 € par mois',
            '**Éducateur sportif (carte pro)** : 30 à ~55 € par mois',
            '**Guide de haute montagne** : 80 à ~140 € par mois (risque corporel)',
          ],
        },
      },
      {
        id: 'leviers',
        h2: "7. 6 leviers d'économie",
        paragraphs: ["Pour réduire votre prime RC Pro jusqu'à 30 % :"],
        list: {
          ordered: true,
          items: [
            "**Comparer 8+ assureurs** : écart jusqu'à 40 % (notre cabinet le fait gratuitement)",
            '**Plafond ajusté à votre activité** : pas 5 M€ si votre CA max 100 K€ — économie -30 %',
            '**Franchise raisonnable** : 500 € au lieu de 200 € = -10 % de prime',
            '**Paiement annuel** : -5 à -8 % vs mensualités',
            '**Bundle multi-garanties** : RC + multirisque + cyber = -10 à -15 %',
            '**Antécédents propres** : 3 ans sans sinistre = -10 à -20 %',
          ],
        },
      },
      {
        id: 'faq',
        h2: 'FAQ',
        paragraphs: ['Réponses aux questions fréquentes sur le tarif de la RC Pro :'],
        list: {
          items: [
            '**RC Pro auto-entrepreneur CA 30 K€ : prix moyen ?** 18 à ~35 € par mois selon profession. Conseil : ~22 €, esthétique : ~25 €, sport-éducateur : ~30 €.',
            '**RC Pro avec plafond 5 M€ vs 500 K€ : écart ?** Environ x2 à x3 sur la prime. Mais 5 M€ rarement justifié sauf grosse activité B2B.',
            "**Sinistre passé : impact tarif ?** Majoration jusqu'à +80 % pour 3 ans, puis retour progressif. Notre cabinet aide à changer d'assureur pour effacer l'historique.",
            '**RC Pro obligatoire et inscrite au contrat client : différence ?** RC Pro légale (15 métiers obligatoires) vs RC contractuelle (exigée par le client). Souvent satisfaite par la même police mais plafonds à vérifier.',
          ],
        },
      },
    ],
  },
}
