/**
 * Maillage interne — Référentiel des pages connexes par cluster sémantique
 *
 * Pattern Hub & Spoke :
 * - HUB = pilier principal (/rc-pro, /assurance-decennale, /cyber-assurance, etc.)
 * - SPOKES = sous-niches (rc-pro/[metier], assurance-decennale/[metier])
 * - SIBLINGS = pages au même niveau sémantique (cousins)
 * - TOOLS = outils transactionnels associés (calculateurs + devis)
 *
 * Chaque cluster expose les liens contextuels les plus pertinents pour
 * maximiser le link juice et le pages/session.
 */

export interface RelatedLink {
  label: string
  href: string
  description?: string
  /** Type pour grouper visuellement */
  type?: 'hub' | 'spoke' | 'sibling' | 'tool' | 'guide'
}

export interface RelatedCluster {
  id: string
  hub: RelatedLink
  spokes: RelatedLink[]
  tools: RelatedLink[]
  guides: RelatedLink[]
}

/* ============================================================
   CLUSTER 1 : RC PRO
   ============================================================ */
export const RC_PRO_CLUSTER: RelatedCluster = {
  id: 'rc-pro',
  hub: {
    label: 'RC Pro — Pilier principal',
    href: '/rc-pro',
    description: 'Toutes les professions concernées par la responsabilité civile professionnelle',
    type: 'hub',
  },
  spokes: [
    { label: 'RC Pro auto-entrepreneur', href: '/rc-pro/auto-entrepreneur', type: 'spoke' },
    { label: 'RC Pro SASU', href: '/rc-pro/sasu', type: 'spoke' },
    { label: 'RC Pro informatique / freelance IT', href: '/rc-pro/informatique', type: 'spoke' },
    { label: 'RC Pro consultant', href: '/rc-pro/consultant', type: 'spoke' },
    { label: 'RC Pro agent immobilier', href: '/rc-pro/immobilier', type: 'spoke' },
    { label: 'RC Pro expert-comptable', href: '/rc-pro/expert-comptable', type: 'spoke' },
    { label: 'RC Pro santé paramédical', href: '/rc-pro/sante-paramedical', type: 'spoke' },
    { label: 'RC Pro coach sportif', href: '/rc-pro/coach-sportif', type: 'spoke' },
    { label: 'RC Pro formateur', href: '/rc-pro/formateur', type: 'spoke' },
    { label: 'RC Pro photographe', href: '/rc-pro/photographe', type: 'spoke' },
    { label: 'RC Pro coiffeur', href: '/rc-pro/coiffeur', type: 'spoke' },
    { label: 'RC Pro esthétique', href: '/rc-pro/esthetique', type: 'spoke' },
    { label: 'RC Pro VTC', href: '/rc-pro/vtc', type: 'spoke' },
    {
      label: 'RC Pro transport marchandises',
      href: '/rc-pro/transport-marchandises',
      type: 'spoke',
    },
  ],
  tools: [
    {
      label: 'Calculateur tarif RC Pro 2026',
      href: '/outils/calculateur-tarif-rc-pro',
      type: 'tool',
    },
    { label: 'Devis officiel RC Pro sous 24h', href: '/outils/devis-rc-pro', type: 'tool' },
    { label: 'Comparateur 8 assureurs RC Pro', href: '/outils/comparateur-rc-pro', type: 'tool' },
    {
      label: 'Modèle attestation RC Pro PDF',
      href: '/outils/modele-attestation-rc-pro',
      type: 'tool',
    },
  ],
  guides: [
    {
      label: 'Quelle assurance professionnelle choisir ?',
      href: '/guides/quelle-assurance-professionnelle-choisir',
      type: 'guide',
    },
    {
      label: 'Avocat spécialisé assurance',
      href: '/guides/avocat-specialise-assurance',
      type: 'guide',
    },
    {
      label: 'Carte professionnelle assurance',
      href: '/guides/carte-professionnelle-assurance',
      type: 'guide',
    },
  ],
}

/* ============================================================
   CLUSTER 2 : DÉCENNALE BTP
   ============================================================ */
export const DECENNALE_CLUSTER: RelatedCluster = {
  id: 'decennale',
  hub: {
    label: 'Assurance décennale BTP — Pilier Loi Spinetta',
    href: '/assurance-decennale',
    description: '37 métiers BTP couverts par la décennale obligatoire',
    type: 'hub',
  },
  spokes: [
    {
      label: 'Décennale auto-entrepreneur BTP',
      href: '/assurance-decennale/auto-entrepreneur',
      type: 'spoke',
    },
    {
      label: 'Décennale micro-entreprise',
      href: '/assurance-decennale/micro-entreprise',
      type: 'spoke',
    },
    {
      label: 'Décennale plombier-chauffagiste',
      href: '/assurance-decennale/plombier',
      type: 'spoke',
    },
    { label: 'Décennale électricien BTP', href: '/assurance-decennale/electricien', type: 'spoke' },
    { label: 'Décennale maçon gros œuvre', href: '/assurance-decennale/macon', type: 'spoke' },
    {
      label: 'Décennale couvreur-zingueur',
      href: '/assurance-decennale/couvreur-zingueur',
      type: 'spoke',
    },
    { label: 'Décennale carreleur', href: '/assurance-decennale/carreleur', type: 'spoke' },
    {
      label: 'Décennale peintre-plaquiste',
      href: '/assurance-decennale/peintre-plaquiste',
      type: 'spoke',
    },
    { label: 'Décennale charpentier', href: '/assurance-decennale/charpentier', type: 'spoke' },
    {
      label: "Décennale maître d'œuvre",
      href: '/assurance-decennale/maitre-oeuvre',
      type: 'spoke',
    },
    {
      label: 'Décennale RGE photovoltaïque',
      href: '/assurance-decennale/photovoltaique',
      type: 'spoke',
    },
  ],
  tools: [
    {
      label: 'Calculateur tarif décennale 2026',
      href: '/outils/calculateur-tarif-decennale',
      type: 'tool',
    },
    {
      label: 'Devis officiel décennale sous 24h',
      href: '/outils/devis-assurance-decennale',
      type: 'tool',
    },
    {
      label: 'Modèle attestation décennale PDF',
      href: '/outils/modele-attestation-decennale',
      type: 'tool',
    },
  ],
  guides: [
    {
      label: 'Guide attestation décennale (11 mentions arrêté 2024)',
      href: '/guides/attestation-decennale',
      type: 'guide',
    },
    { label: 'Dommages ouvrage (DO)', href: '/guides/dommages-ouvrage', type: 'guide' },
    { label: 'Tous risques chantier', href: '/guides/tous-risques-chantier', type: 'guide' },
    { label: 'Parfait achèvement', href: '/guides/parfait-achevement', type: 'guide' },
  ],
}

/* ============================================================
   CLUSTER 3 : MUTUELLE PRO + TNS
   ============================================================ */
export const MUTUELLE_CLUSTER: RelatedCluster = {
  id: 'mutuelle',
  hub: {
    label: 'Mutuelle pro BTP — Loi ANI',
    href: '/mutuelle-pro-btp',
    description: 'Mutuelles santé pour entreprises et travailleurs non-salariés',
    type: 'hub',
  },
  spokes: [
    { label: 'Mutuelle TNS Madelin', href: '/mutuelle-tns', type: 'spoke' },
    { label: 'Mutuelle santé TNS', href: '/mutuelle-sante-tns', type: 'spoke' },
    { label: 'Mutuelle dirigeant', href: '/mutuelle-dirigeant', type: 'spoke' },
    { label: 'Prévoyance artisan TNS', href: '/prevoyance-artisan', type: 'spoke' },
  ],
  tools: [
    {
      label: 'Calculateur tarif mutuelle pro (TNS + ANI)',
      href: '/outils/calculateur-tarif-mutuelle-pro',
      type: 'tool',
    },
    {
      label: 'Calculateur prévoyance TNS Madelin',
      href: '/outils/calculateur-tarif-prevoyance-tns',
      type: 'tool',
    },
    { label: 'Comparateur mutuelle pro', href: '/outils/comparateur-mutuelle-pro', type: 'tool' },
  ],
  guides: [
    {
      label: 'Meilleure mutuelle TNS — comparatif 7 organismes',
      href: '/guides/meilleure-mutuelle-tns',
      type: 'guide',
    },
  ],
}

/* ============================================================
   CLUSTER 4 : LOCAUX & MULTIRISQUE
   ============================================================ */
export const LOCAUX_CLUSTER: RelatedCluster = {
  id: 'locaux',
  hub: {
    label: 'Multirisque pro — Pilier locaux',
    href: '/multirisque-pro',
    description: 'Assurance des locaux professionnels (bureaux, ateliers, commerces)',
    type: 'hub',
  },
  spokes: [
    { label: 'Assurance bureau professionnel', href: '/assurance-bureau', type: 'spoke' },
    { label: 'Assurance local commercial', href: '/assurance-local-commercial', type: 'spoke' },
    { label: 'Assurance commerce', href: '/assurance-commerce', type: 'spoke' },
    { label: 'Assurance restaurant', href: '/assurance-restaurant', type: 'spoke' },
    {
      label: 'Assurance restaurant en ligne',
      href: '/assurance-restaurant-en-ligne',
      type: 'spoke',
    },
    { label: 'Assurance locaux entreprise', href: '/assurance-locaux-entreprise', type: 'spoke' },
  ],
  tools: [
    {
      label: 'Calculateur tarif multirisque pro',
      href: '/outils/calculateur-tarif-multirisque-pro',
      type: 'tool',
    },
  ],
  guides: [],
}

/* ============================================================
   CLUSTER 5 : CYBER & RGPD
   ============================================================ */
export const CYBER_CLUSTER: RelatedCluster = {
  id: 'cyber',
  hub: {
    label: 'Cyber assurance entreprise',
    href: '/cyber-assurance',
    description: 'Couverture cyberattaques + RGPD pour entreprises',
    type: 'hub',
  },
  spokes: [{ label: 'Assurance e-commerce', href: '/assurance-e-commerce', type: 'spoke' }],
  tools: [
    {
      label: 'Calculateur tarif cyber assurance',
      href: '/outils/calculateur-tarif-cyber-assurance',
      type: 'tool',
    },
  ],
  guides: [
    { label: 'Guide assurance RGPD entreprise', href: '/guides/assurance-rgpd', type: 'guide' },
  ],
}

/* ============================================================
   CLUSTER 6 : VTC & TRANSPORT
   ============================================================ */
export const VTC_CLUSTER: RelatedCluster = {
  id: 'vtc',
  hub: {
    label: 'Assurance VTC — Loi LOTI',
    href: '/assurance-vtc',
    description: 'Couverture spécifique transport personnes professionnel',
    type: 'hub',
  },
  spokes: [
    { label: 'RC Pro VTC', href: '/rc-pro/vtc', type: 'spoke' },
    {
      label: 'RC Pro transport marchandises',
      href: '/rc-pro/transport-marchandises',
      type: 'spoke',
    },
    {
      label: 'Assurance auto professionnelle',
      href: '/assurance-auto-professionnelle',
      type: 'spoke',
    },
    { label: 'Assurance flotte automobile', href: '/assurance-flotte-automobile', type: 'spoke' },
  ],
  tools: [
    {
      label: 'Calculateur tarif assurance VTC',
      href: '/outils/calculateur-tarif-vtc',
      type: 'tool',
    },
  ],
  guides: [],
}

/* ============================================================
   ROUTING — slug → cluster
   ============================================================ */
const SLUG_TO_CLUSTER: Record<string, RelatedCluster> = {
  /* RC Pro */
  'rc-pro': RC_PRO_CLUSTER,
  'rc-pro/auto-entrepreneur': RC_PRO_CLUSTER,
  'rc-pro/sasu': RC_PRO_CLUSTER,
  'rc-pro/informatique': RC_PRO_CLUSTER,
  'rc-pro/consultant': RC_PRO_CLUSTER,
  'rc-pro/immobilier': RC_PRO_CLUSTER,
  'rc-pro/expert-comptable': RC_PRO_CLUSTER,
  'rc-pro/sante-paramedical': RC_PRO_CLUSTER,
  'rc-pro/coach-sportif': RC_PRO_CLUSTER,
  'rc-pro/formateur': RC_PRO_CLUSTER,
  'rc-pro/photographe': RC_PRO_CLUSTER,
  'rc-pro/coiffeur': RC_PRO_CLUSTER,
  'rc-pro/esthetique': RC_PRO_CLUSTER,
  'rc-pro/vtc': RC_PRO_CLUSTER,
  'rc-pro/transport-marchandises': RC_PRO_CLUSTER,
  'rc-pro/micro-entreprise-prestation-service': RC_PRO_CLUSTER,
  'responsabilite-civile-professionnelle': RC_PRO_CLUSTER,
  /* Décennale */
  'assurance-decennale': DECENNALE_CLUSTER,
  'assurance-decennale/auto-entrepreneur': DECENNALE_CLUSTER,
  'assurance-decennale/micro-entreprise': DECENNALE_CLUSTER,
  'assurance-decennale/plombier': DECENNALE_CLUSTER,
  'assurance-decennale/electricien': DECENNALE_CLUSTER,
  'assurance-decennale/macon': DECENNALE_CLUSTER,
  'assurance-decennale/couvreur-zingueur': DECENNALE_CLUSTER,
  'assurance-decennale/carreleur': DECENNALE_CLUSTER,
  'assurance-decennale/peintre-plaquiste': DECENNALE_CLUSTER,
  'assurance-decennale/charpentier': DECENNALE_CLUSTER,
  'assurance-decennale/maitre-oeuvre': DECENNALE_CLUSTER,
  'assurance-decennale/photovoltaique': DECENNALE_CLUSTER,
  /* Mutuelle */
  'mutuelle-pro-btp': MUTUELLE_CLUSTER,
  'mutuelle-tns': MUTUELLE_CLUSTER,
  'mutuelle-sante-tns': MUTUELLE_CLUSTER,
  'mutuelle-dirigeant': MUTUELLE_CLUSTER,
  'prevoyance-artisan': MUTUELLE_CLUSTER,
  /* Locaux */
  'multirisque-pro': LOCAUX_CLUSTER,
  'assurance-bureau': LOCAUX_CLUSTER,
  'assurance-local-commercial': LOCAUX_CLUSTER,
  'assurance-commerce': LOCAUX_CLUSTER,
  'assurance-restaurant': LOCAUX_CLUSTER,
  'assurance-restaurant-en-ligne': LOCAUX_CLUSTER,
  'assurance-locaux-entreprise': LOCAUX_CLUSTER,
  /* Cyber */
  'cyber-assurance': CYBER_CLUSTER,
  'assurance-e-commerce': CYBER_CLUSTER,
  /* VTC */
  'assurance-vtc': VTC_CLUSTER,
  'assurance-auto-professionnelle': VTC_CLUSTER,
  'assurance-flotte-automobile': VTC_CLUSTER,
}

export function getRelatedCluster(slug: string): RelatedCluster | null {
  return SLUG_TO_CLUSTER[slug] ?? null
}

/**
 * Sélectionne MIN 15 liens contextuels pertinents pour la page courante (excluant son propre slug).
 * Best practice SEO 2024 : 15+ liens internes/page maximise le link juice + topical authority.
 *
 * Mix optimal :
 * - 1 hub principal (du cluster)
 * - TOUS les spokes cousins du cluster (8-14)
 * - TOUS les tools du cluster (1-4)
 * - TOUS les guides du cluster (0-4)
 * - + complément cross-cluster si <15 (autres hubs comme "voir aussi")
 */
export function selectContextualLinks(currentSlug: string, _max = 15): RelatedLink[] {
  const cluster = getRelatedCluster(currentSlug)
  if (!cluster) return getCrossClusterLinks(currentSlug, 15)

  const isCurrent = (href: string) => href === `/${currentSlug}` || href === currentSlug

  const result: RelatedLink[] = []

  /* 1 hub si différent */
  if (!isCurrent(cluster.hub.href)) result.push(cluster.hub)

  /* TOUS les spokes cousins (excluant courant) */
  const spokes = cluster.spokes.filter((s) => !isCurrent(s.href))
  result.push(...spokes)

  /* TOUS les tools */
  const tools = cluster.tools.filter((t) => !isCurrent(t.href))
  result.push(...tools)

  /* TOUS les guides */
  const guides = cluster.guides.filter((g) => !isCurrent(g.href))
  result.push(...guides)

  /* Si toujours <15, complète avec hubs cross-cluster (voir aussi) */
  if (result.length < 15) {
    const crossLinks = getCrossClusterLinks(currentSlug, 15 - result.length, [cluster.id])
    result.push(...crossLinks)
  }

  return result
}

/**
 * Retourne les hubs + tools des autres clusters (cross-linking sémantique).
 * Utilisé en complément quand un cluster est petit ou pour une page hors-cluster.
 */
function getCrossClusterLinks(
  currentSlug: string,
  count: number,
  excludeClusters: string[] = []
): RelatedLink[] {
  const isCurrent = (href: string) => href === `/${currentSlug}` || href === currentSlug
  const allClusters = [
    RC_PRO_CLUSTER,
    DECENNALE_CLUSTER,
    MUTUELLE_CLUSTER,
    LOCAUX_CLUSTER,
    CYBER_CLUSTER,
    VTC_CLUSTER,
  ]

  const candidates: RelatedLink[] = []
  for (const c of allClusters) {
    if (excludeClusters.includes(c.id)) continue
    /* hub */
    if (!isCurrent(c.hub.href)) candidates.push({ ...c.hub, type: 'sibling' })
    /* top 2 tools */
    c.tools
      .filter((t) => !isCurrent(t.href))
      .slice(0, 2)
      .forEach((t) => candidates.push(t))
    /* top 1 spoke */
    const topSpoke = c.spokes.find((s) => !isCurrent(s.href))
    if (topSpoke) candidates.push(topSpoke)
  }
  return candidates.slice(0, count)
}
