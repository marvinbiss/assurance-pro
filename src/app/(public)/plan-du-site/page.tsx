import type { Metadata } from 'next'
import Link from 'next/link'
import { Map } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SITE_URL } from '@/lib/seo/config'
import { DECENNALE_METIERS } from '@/lib/data/decennale-metiers'
import { RC_PRO_PROFESSIONS } from '@/lib/data/rc-pro-professions'
import { VILLES_TOP100 } from '@/lib/data/villes-top100'
import { ASSUREURS_RC_PRO } from '@/lib/data/assureurs-rc-pro'

export const metadata: Metadata = {
  title: 'Plan du site',
  description:
    'Plan du site Vivos Assurance — toutes les pages organisées par catégorie : verticaux, métiers, villes, outils, blog, légal.',
  alternates: { canonical: `${SITE_URL}/plan-du-site` },
  openGraph: {
    title: 'Plan du site',
    description:
      'Plan du site Vivos Assurance — toutes les pages organisées par catégorie : verticaux, métiers, villes, outils, blog, légal.',
    url: `${SITE_URL}/plan-du-site`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plan du site',
    description:
      'Plan du site Vivos Assurance — toutes les pages organisées par catégorie : verticaux, métiers, villes, outils, blog, légal.',
  },
}

// ---- Constantes pSEO (combos cibles ---- ne pas dépasser le seuil de génération statique)

const PSEO_GARANTIES: Array<{ slug: string; label: string }> = [
  { slug: 'garantie-decennale', label: 'Décennale' },
  { slug: 'rc-pro', label: 'RC Pro' },
  { slug: 'multirisque-pro', label: 'Multirisque pro' },
  { slug: 'mutuelle-pro', label: 'Mutuelle pro' },
  { slug: 'cyber-assurance', label: 'Cyber assurance' },
  { slug: 'prevoyance-tns', label: 'Prévoyance TNS' },
  { slug: 'protection-juridique-pro', label: 'Protection juridique' },
  { slug: 'dommages-ouvrage', label: 'Dommages-ouvrage' },
  { slug: 'tous-risques-chantier', label: 'Tous risques chantier' },
]

const PSEO_STATUTS: Array<{ slug: string; label: string }> = [
  { slug: 'auto-entrepreneur', label: 'Auto-entrepreneur' },
  { slug: 'sasu', label: 'SASU' },
  { slug: 'sarl', label: 'SARL' },
  { slug: 'sas', label: 'SAS' },
  { slug: 'eurl', label: 'EURL' },
  { slug: 'profession-liberale', label: 'Profession libérale' },
  { slug: 'entreprise-individuelle', label: 'Entreprise individuelle' },
]

const TOP_METIERS_BTP_SLUGS: readonly string[] = [
  'plombier',
  'electricien',
  'macon',
  'couvreur-zingueur',
  'peintre',
  'charpentier-bois',
  'carreleur',
  'plaquiste-platrier',
  'menuisier-interieur',
  'facadier-ite',
  'etancheur',
  'installateur-photovoltaique',
  'menuisier-exterieur',
  'plombier-chauffagiste',
  'serrurier-metallier',
  'terrassier',
  'paysagiste',
  'pisciniste',
  'climatisation',
  'isolation-thermique',
]

const TOP_PROFESSIONS_SLUGS: readonly string[] = [
  'consultant',
  'freelance-it',
  'agence-web',
  'designer',
  'photographe',
  'coach-pro',
  'auto-entrepreneur',
  'formateur',
  'avocat',
  'expert-comptable',
  'medecin-generaliste',
  'infirmiere-liberale',
  'kinesitherapeute',
  'osteopathe',
  'dentiste',
  'pharmacien',
  'architecte',
  'agent-immobilier',
  'psychologue',
  'veterinaire',
]

const OUTILS: Array<{ slug: string; label: string }> = [
  { slug: 'calculateur-tarif-decennale', label: 'Calculateur tarif décennale' },
  { slug: 'calculateur-tarif-rc-pro', label: 'Calculateur tarif RC Pro' },
  { slug: 'calculateur-tarif-multirisque-pro', label: 'Calculateur tarif multirisque pro' },
  { slug: 'calculateur-tarif-mutuelle-pro', label: 'Calculateur tarif mutuelle pro' },
  { slug: 'calculateur-tarif-cyber-assurance', label: 'Calculateur tarif cyber assurance' },
  { slug: 'calculateur-tarif-prevoyance-tns', label: 'Calculateur tarif prévoyance TNS' },
  { slug: 'calculateur-tarif-vtc', label: 'Calculateur tarif VTC' },
  { slug: 'comparateur-rc-pro', label: 'Comparateur RC Pro' },
  { slug: 'comparateur-mutuelle-pro', label: 'Comparateur mutuelle pro' },
  { slug: 'devis-assurance-decennale', label: 'Devis décennale en ligne' },
  { slug: 'devis-rc-pro', label: 'Devis RC Pro en ligne' },
  { slug: 'modele-devis-pro', label: 'Modèle devis pro' },
  { slug: 'modele-facture-pro', label: 'Modèle facture pro' },
  { slug: 'modele-attestation-decennale', label: 'Modèle attestation décennale' },
  { slug: 'modele-attestation-rc-pro', label: 'Modèle attestation RC Pro' },
  { slug: 'lettre-resiliation-assurance', label: 'Lettre résiliation assurance' },
]

const GUIDES_JURIDIQUES: Array<{ slug: string; label: string }> = [
  { slug: 'assurance-decennale-immediate', label: 'Assurance décennale immédiate' },
  { slug: 'assurance-rgpd', label: 'Assurance RGPD' },
  { slug: 'attestation-decennale', label: 'Attestation décennale' },
  { slug: 'attestation-rc-pro', label: 'Attestation RC Pro' },
  { slug: 'avocat-litige-assurance', label: 'Avocat litige assurance' },
  { slug: 'avocat-specialise-assurance', label: 'Avocat spécialisé assurance' },
  { slug: 'carte-professionnelle-assurance', label: 'Carte professionnelle assurance' },
  { slug: 'courtier-assurance-decennale', label: 'Courtier assurance décennale' },
  { slug: 'devis-assurance-professionnelle', label: 'Devis assurance professionnelle' },
  { slug: 'dommages-ouvrage', label: 'Dommages-ouvrage' },
  { slug: 'franchise-assurance-pro', label: 'Franchise assurance pro' },
  { slug: 'meilleure-mutuelle-tns', label: 'Meilleure mutuelle TNS' },
  { slug: 'numero-assurance-maladie-medecin', label: 'N° assurance maladie médecin' },
  { slug: 'parfait-achevement', label: 'Garantie parfait achèvement' },
  { slug: 'quelle-assurance-professionnelle-choisir', label: 'Quelle assurance pro choisir' },
  { slug: 'resiliation-assurance-professionnelle', label: 'Résiliation assurance pro' },
  {
    slug: 'responsabilite-civile-professionnelle-informatique',
    label: 'RC Pro informatique',
  },
  { slug: 'tous-risques-chantier', label: 'Tous risques chantier' },
]

const BLOG_TOP_ARTICLES: Array<{ slug: string; title: string }> = [
  { slug: 'loi-spinetta-2026-actualites', title: 'Loi Spinetta 2026 — ce qui change' },
  {
    slug: 'rc-pro-consultant-comment-choisir',
    title: 'RC Pro consultant — comment choisir',
  },
  {
    slug: 'mutuelle-tns-madelin-comment-economiser',
    title: 'Mutuelle TNS Madelin — comment économiser',
  },
  { slug: 'cyber-assurance-pme-2026', title: 'Cyber assurance PME 2026' },
  {
    slug: 'rc-pro-auto-entrepreneur-guide-2026',
    title: 'RC Pro auto-entrepreneur — guide 2026',
  },
  { slug: 'decennale-auto-entrepreneur-2026', title: 'Décennale auto-entrepreneur 2026' },
  {
    slug: 'assurance-professionnelle-auto-entrepreneur-2026',
    title: 'Assurance pro auto-entrepreneur 2026',
  },
  { slug: 'assurance-micro-entreprise-2026', title: 'Assurance micro-entreprise 2026' },
  { slug: 'micro-entreprise-btp-assurances-2026', title: 'Micro-entreprise BTP — assurances' },
  {
    slug: 'statut-juridique-assurance-pro-comparatif',
    title: 'Statut juridique — comparatif assurance pro',
  },
  {
    slug: 'attestation-decennale-mentions-obligatoires-2026',
    title: 'Attestation décennale — mentions obligatoires',
  },
  {
    slug: 'attestation-rc-pro-modele-pdf-2026',
    title: 'Attestation RC Pro — modèle PDF',
  },
  {
    slug: 'lettre-resiliation-assurance-pro-loi-hamon-2026',
    title: 'Lettre résiliation loi Hamon',
  },
  {
    slug: 'combien-coute-assurance-pro-2026',
    title: 'Combien coûte une assurance pro en 2026',
  },
  {
    slug: 'prix-assurance-decennale-2026-par-metier',
    title: 'Prix assurance décennale 2026 — par métier',
  },
  {
    slug: 'tarif-rc-pro-2026-par-profession',
    title: 'Tarif RC Pro 2026 — par profession',
  },
  {
    slug: 'decennale-pas-chere-5-strategies-economies',
    title: 'Décennale pas chère — 5 stratégies',
  },
  {
    slug: 'comparateur-10-assureurs-pro-2026',
    title: 'Comparateur 10 assureurs pro 2026',
  },
  {
    slug: 'decennale-vs-dommages-ouvrage-7-differences',
    title: 'Décennale vs dommages-ouvrage',
  },
  {
    slug: 'loi-spinetta-1978-obligations-artisans-2026',
    title: 'Loi Spinetta 1978 — obligations artisans',
  },
  {
    slug: 'bureau-central-tarification-bct-assurance-refusee',
    title: 'BCT — assurance refusée',
  },
  {
    slug: 'loi-madelin-tns-optimisation-fiscale-2026',
    title: 'Loi Madelin TNS — optimisation fiscale',
  },
  {
    slug: 'declaration-sinistre-decennale-5-etapes',
    title: 'Déclarer un sinistre décennale en 5 étapes',
  },
  {
    slug: 'refus-indemnisation-assurance-4-recours-2026',
    title: 'Refus d’indemnisation — 4 recours',
  },
  {
    slug: 'mediation-assurance-procedure-delais-2026',
    title: 'Médiation assurance — procédure et délais',
  },
  {
    slug: 'sinistralite-btp-2024-aqc-sycodes-chiffres',
    title: 'Sinistralité BTP 2024 — chiffres AQC SYCODÉS',
  },
  {
    slug: 'cyber-assurance-pme-2026-ransomware-rgpd',
    title: 'Cyber assurance PME — ransomware et RGPD',
  },
  {
    slug: 'assurance-homme-cle-dirigeant-2026',
    title: 'Assurance homme-clé dirigeant 2026',
  },
]

const BLOG_CATEGORIES: Array<{ slug: string; label: string }> = [
  { slug: 'btp', label: 'BTP' },
  { slug: 'rc-pro', label: 'RC Pro' },
  { slug: 'cyber', label: 'Cyber' },
  { slug: 'mutuelle-tns', label: 'Mutuelle — TNS' },
]

const ASSUREURS_PAGES: Array<{ href: string; label: string }> = [
  { href: '/hiscox-rc-pro', label: 'Hiscox RC Pro' },
  { href: '/mma-assurance-rc-pro', label: 'MMA RC Pro' },
  { href: '/assurance-rc-pro-mma', label: 'Assurance RC Pro MMA' },
  { href: '/rc-pro-mma', label: 'RC Pro MMA' },
  { href: '/multirisque-pro-mma', label: 'Multirisque pro MMA' },
  { href: '/stello-rc-pro', label: 'Stello RC Pro' },
  { href: '/rc-pro-maif', label: 'RC Pro MAIF' },
  { href: '/rc-pro-macif', label: 'RC Pro MACIF' },
  { href: '/rc-pro-matmut', label: 'RC Pro Matmut' },
  { href: '/rc-pro-credit-agricole', label: 'RC Pro Crédit Agricole' },
  { href: '/pro-btp-mutuelle', label: 'Pro BTP Mutuelle' },
  { href: '/pro-btp-assurance-decennale', label: 'Pro BTP Décennale' },
  { href: '/pro-btp-assurance-auto', label: 'Pro BTP Auto' },
]

const SECTOR_HUB_PAGES: Array<{ href: string; label: string }> = [
  { href: '/assurance-artisan', label: 'Assurance artisan' },
  { href: '/assurance-btp', label: 'Assurance BTP' },
  { href: '/assurance-pro-btp', label: 'Assurance Pro BTP' },
  { href: '/assurance-decennale-btp', label: 'Décennale BTP' },
  { href: '/assurance-decennale-batiment', label: 'Décennale bâtiment' },
  { href: '/assurance-decennale-immediate', label: 'Décennale immédiate' },
  { href: '/assurance-decennale-obligatoire', label: 'Décennale obligatoire' },
  { href: '/assurance-decennale-pas-cher', label: 'Décennale pas cher' },
  { href: '/assurance-decennale-moins-cher', label: 'Décennale moins cher' },
  { href: '/assurance-decennale-la-moins-chere', label: 'Décennale la moins chère' },
  { href: '/assurance-decennale-auto-entrepreneur', label: 'Décennale auto-entrepreneur' },
  {
    href: '/assurance-decennale-auto-entrepreneur-pro-btp',
    label: 'Décennale auto-entrepreneur Pro BTP',
  },
  { href: '/assurance-decennale-maconnerie', label: 'Décennale maçonnerie' },
  { href: '/assurance-decennale-plombier', label: 'Décennale plombier' },
  { href: '/assurance-decennale-terrassement', label: 'Décennale terrassement' },
  { href: '/assurance-decennale-maitre-d-oeuvre', label: 'Décennale maître d’œuvre' },
  { href: '/assurance-dommages-ouvrage', label: 'Dommages-ouvrage' },
  { href: '/assurance-tous-risques-chantier', label: 'Tous risques chantier' },
  { href: '/assurance-association', label: 'Assurance association' },
  { href: '/assurance-auto-entreprise', label: 'Assurance auto entreprise' },
  { href: '/assurance-auto-professionnelle', label: 'Assurance auto professionnelle' },
  { href: '/assurance-bureau', label: 'Assurance bureau' },
  { href: '/assurance-commerce', label: 'Assurance commerce' },
  { href: '/assurance-consultant-independant', label: 'Assurance consultant indépendant' },
  { href: '/assurance-e-commerce', label: 'Assurance e-commerce' },
  { href: '/assurance-entreprise', label: 'Assurance entreprise' },
  { href: '/assurance-flotte-automobile', label: 'Assurance flotte automobile' },
  { href: '/assurance-freelance', label: 'Assurance freelance' },
  { href: '/assurance-habitation-professionnelle', label: 'Assurance habitation pro' },
  { href: '/assurance-homme-cle', label: 'Assurance homme-clé' },
  { href: '/assurance-juridique-professionnelle', label: 'Assurance juridique pro' },
  { href: '/assurance-local-commercial', label: 'Assurance local commercial' },
  { href: '/assurance-locaux-entreprise', label: 'Assurance locaux entreprise' },
  { href: '/assurance-medecin', label: 'Assurance médecin' },
  { href: '/assurance-micro-entreprise', label: 'Assurance micro-entreprise' },
  { href: '/assurance-mission-professionnelle', label: 'Assurance mission pro' },
  { href: '/assurance-moto-professionnelle', label: 'Assurance moto pro' },
  { href: '/assurance-multirisque-pro', label: 'Assurance multirisque pro' },
  { href: '/assurance-obligatoire-entreprise', label: 'Assurance obligatoire entreprise' },
  { href: '/assurance-portage-salarial', label: 'Assurance portage salarial' },
  { href: '/assurance-pour-entreprise-individuelle', label: 'Assurance EI' },
  { href: '/assurance-rc-pro', label: 'Assurance RC Pro' },
  { href: '/assurance-rc-pro-auto-entrepreneur', label: 'RC Pro auto-entrepreneur' },
  {
    href: '/assurance-rc-pro-auto-entrepreneur-en-ligne',
    label: 'RC Pro auto-entrepreneur en ligne',
  },
  {
    href: '/assurance-rc-pro-auto-entrepreneur-pas-cher',
    label: 'RC Pro auto-entrepreneur pas cher',
  },
  { href: '/assurance-rc-pro-en-ligne', label: 'RC Pro en ligne' },
  { href: '/assurance-rc-pro-et-decennale', label: 'RC Pro et décennale' },
  { href: '/assurance-rc-pro-informatique', label: 'RC Pro informatique' },
  { href: '/assurance-rc-pro-micro-entreprise', label: 'RC Pro micro-entreprise' },
  { href: '/assurance-rc-pro-sasu', label: 'RC Pro SASU' },
  { href: '/assurance-rc-pro-vtc', label: 'RC Pro VTC' },
  { href: '/assurance-restaurant', label: 'Assurance restaurant' },
  { href: '/assurance-restaurant-en-ligne', label: 'Assurance restaurant en ligne' },
  { href: '/assurance-sante-entreprise', label: 'Assurance santé entreprise' },
  { href: '/assurance-sante-professionnelle', label: 'Assurance santé pro' },
  { href: '/assurance-sasu', label: 'Assurance SASU' },
  { href: '/assurance-taxi', label: 'Assurance taxi' },
  { href: '/assurance-transport-marchandises', label: 'Assurance transport marchandises' },
  { href: '/assurance-travaux-artisan', label: 'Assurance travaux artisan' },
  { href: '/assurance-vtc', label: 'Assurance VTC' },
  { href: '/assurance-voiture-pro-btp', label: 'Assurance voiture pro BTP' },
  { href: '/assurance-voiture-professionnelle', label: 'Assurance voiture pro' },
]

const RC_PRO_VARIANTS_PAGES: Array<{ href: string; label: string }> = [
  { href: '/rc-pro-agent-immobilier', label: 'RC Pro agent immobilier' },
  { href: '/rc-pro-batiment', label: 'RC Pro bâtiment' },
  { href: '/rc-pro-consultant', label: 'RC Pro consultant' },
  { href: '/rc-pro-convoyage', label: 'RC Pro convoyage' },
  { href: '/rc-pro-estheticienne', label: 'RC Pro esthéticienne' },
  { href: '/rc-pro-freelance-informatique', label: 'RC Pro freelance informatique' },
  { href: '/rc-pro-immobilier', label: 'RC Pro immobilier' },
  { href: '/rc-pro-informatique', label: 'RC Pro informatique' },
  { href: '/rc-pro-micro-entreprise', label: 'RC Pro micro-entreprise' },
  { href: '/rc-pro-pas-cher', label: 'RC Pro pas cher' },
  { href: '/rc-pro-sasu', label: 'RC Pro SASU' },
  { href: '/rc-pro-souscription-en-ligne', label: 'RC Pro souscription en ligne' },
  { href: '/rc-pro-vtc', label: 'RC Pro VTC' },
  { href: '/rc-pro-en-ligne', label: 'RC Pro en ligne' },
  { href: '/rc-pro-et-decennale', label: 'RC Pro et décennale' },
  { href: '/rc-pro-decennale', label: 'RC Pro décennale' },
  { href: '/rc-pro-assurance', label: 'RC Pro assurance' },
  {
    href: '/responsabilite-civile-professionnelle',
    label: 'Responsabilité civile professionnelle',
  },
  {
    href: '/responsabilite-civile-professionnelle-auto-entrepreneur',
    label: 'RC Pro auto-entrepreneur',
  },
  {
    href: '/responsabilite-civile-professionnelle-informatique',
    label: 'RC Pro informatique',
  },
  { href: '/souscrire-rc-pro-en-ligne', label: 'Souscrire RC Pro en ligne' },
]

const MUTUELLE_PAGES: Array<{ href: string; label: string }> = [
  { href: '/mutuelle-pro', label: 'Mutuelle pro' },
  { href: '/mutuelle-pro-btp', label: 'Mutuelle Pro BTP' },
  { href: '/mutuelle-pro-btp-s3-p3-avis', label: 'Mutuelle Pro BTP S3 P3 — avis' },
  { href: '/mutuelle-sante-tns', label: 'Mutuelle santé TNS' },
  { href: '/mutuelle-tns', label: 'Mutuelle TNS' },
  { href: '/mutuelle-dirigeant', label: 'Mutuelle dirigeant' },
  { href: '/btp-pro-mutuelle', label: 'BTP Pro mutuelle' },
  { href: '/pro-btp-mutuelle', label: 'Pro BTP mutuelle' },
  { href: '/pro-btp-mutuelle-remboursement', label: 'Pro BTP mutuelle remboursement' },
  {
    href: '/pro-btp-mutuelle-remboursement-mon-compte',
    label: 'Pro BTP mutuelle — mon compte',
  },
  { href: '/prevoyance-artisan', label: 'Prévoyance artisan' },
  { href: '/prevoyance-tns', label: 'Prévoyance TNS' },
  { href: '/protection-juridique-professionnelle', label: 'Protection juridique pro' },
]

// ---- Groupement villes par région

const villesParRegion = VILLES_TOP100.reduce<Record<string, typeof VILLES_TOP100>>((acc, ville) => {
  const key = ville.regionSlug
  if (!acc[key]) acc[key] = []
  acc[key].push(ville)
  return acc
}, {})

const REGIONS_ORDER: Array<{ slug: string; nom: string }> = [
  { slug: 'ile-de-france', nom: 'Île-de-France' },
  { slug: 'auvergne-rhone-alpes', nom: 'Auvergne-Rhône-Alpes' },
  { slug: 'provence-alpes-cote-d-azur', nom: 'Provence-Alpes-Côte d’Azur' },
  { slug: 'occitanie', nom: 'Occitanie' },
  { slug: 'nouvelle-aquitaine', nom: 'Nouvelle-Aquitaine' },
  { slug: 'hauts-de-france', nom: 'Hauts-de-France' },
  { slug: 'grand-est', nom: 'Grand Est' },
  { slug: 'pays-de-la-loire', nom: 'Pays de la Loire' },
  { slug: 'bretagne', nom: 'Bretagne' },
  { slug: 'normandie', nom: 'Normandie' },
  { slug: 'centre-val-de-loire', nom: 'Centre-Val de Loire' },
  { slug: 'bourgogne-franche-comte', nom: 'Bourgogne-Franche-Comté' },
  { slug: 'la-reunion', nom: 'La Réunion' },
  { slug: 'martinique', nom: 'Martinique' },
  { slug: 'guadeloupe', nom: 'Guadeloupe' },
  { slug: 'guyane', nom: 'Guyane' },
  { slug: 'mayotte', nom: 'Mayotte' },
]

// ---- Styles communs

const linkClass = 'font-semibold text-primary-700 underline-offset-2 hover:underline'
const smallLinkClass = 'text-sm font-semibold text-primary-700 underline-offset-2 hover:underline'
const tinyLinkClass = 'text-xs font-medium text-primary-700 underline-offset-2 hover:underline'

const sectionTitle = 'mb-3 border-b border-primary-200 pb-2 text-xl font-bold text-primary-900'
const subSectionTitle = 'mb-2 mt-4 text-sm font-bold uppercase tracking-wide text-primary-700'

function DetailsSection({
  summary,
  count,
  children,
}: {
  summary: string
  count: number
  children: React.ReactNode
}) {
  return (
    <details className="mt-4 rounded-lg border border-primary-100 bg-white p-4 open:shadow-sm dark:border-charcoal-700 dark:bg-charcoal-900">
      <summary className="cursor-pointer text-sm font-bold text-primary-900 hover:text-primary-700 dark:text-sand-100">
        {summary}{' '}
        <span className="ml-1 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700">
          {count}
        </span>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  )
}

export default function PlanDuSitePage() {
  // Combos pSEO (samples ciblés ---- routes existantes)
  const tarifCombos: Array<{ garantie: string; metier: string; label: string }> = []
  for (const g of PSEO_GARANTIES.slice(0, 4)) {
    for (const m of TOP_METIERS_BTP_SLUGS.slice(0, 6)) {
      tarifCombos.push({
        garantie: g.slug,
        metier: m,
        label: `${g.label} — ${m.replace(/-/g, ' ')}`,
      })
    }
  }

  const prixCombos: Array<{
    garantie: string
    metier: string
    statut: string
    label: string
  }> = []
  for (const g of PSEO_GARANTIES.slice(0, 3)) {
    for (const m of TOP_METIERS_BTP_SLUGS.slice(0, 4)) {
      for (const s of PSEO_STATUTS.slice(0, 3)) {
        prixCombos.push({
          garantie: g.slug,
          metier: m,
          statut: s.slug,
          label: `${g.label} — ${m.replace(/-/g, ' ')} (${s.label})`,
        })
      }
    }
  }

  const devisCombos: Array<{ garantie: string; metier: string; label: string }> = []
  for (const g of PSEO_GARANTIES.slice(0, 3)) {
    for (const m of [...TOP_METIERS_BTP_SLUGS.slice(0, 4), ...TOP_PROFESSIONS_SLUGS.slice(0, 4)]) {
      devisCombos.push({
        garantie: g.slug,
        metier: m,
        label: `${g.label} — ${m.replace(/-/g, ' ')}`,
      })
    }
  }

  const guideCombos: Array<{ garantie: string; metier: string; label: string }> = []
  for (const g of PSEO_GARANTIES.slice(0, 3)) {
    for (const m of TOP_METIERS_BTP_SLUGS.slice(0, 5)) {
      guideCombos.push({
        garantie: g.slug,
        metier: m,
        label: `${g.label} — ${m.replace(/-/g, ' ')}`,
      })
    }
  }

  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <PageHero
        breadcrumbs={[{ label: 'Plan du site' }]}
        eyebrow="Navigation complète"
        EyebrowIcon={Map}
        title="Plan du site"
        description="Toutes les pages du site organisées par catégorie — piliers, métiers, villes, outils, blog, assureurs, légal."
        size="sm"
      />

      <div className="container mx-auto max-w-5xl px-4 py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* ---- Pages principales ---- */}
          <section>
            <h2 className={sectionTitle}>Pages principales</h2>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className={linkClass}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/devis" className={linkClass}>
                  Devis gratuit en 2 min
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className={linkClass}>
                  À propos du cabinet
                </Link>
              </li>
              <li>
                <Link href="/equipe" className={linkClass}>
                  Notre équipe
                </Link>
              </li>
              <li>
                <Link href="/methodologie" className={linkClass}>
                  Méthodologie
                </Link>
              </li>
              <li>
                <Link href="/notre-processus-conseil" className={linkClass}>
                  Processus conseil
                </Link>
              </li>
              <li>
                <Link href="/selection-assureurs" className={linkClass}>
                  Sélection des assureurs
                </Link>
              </li>
              <li>
                <Link href="/comparateur-assureurs" className={linkClass}>
                  Comparateur des 10 assureurs
                </Link>
              </li>
              <li>
                <Link href="/courtier" className={linkClass}>
                  Courtier assurance pro
                </Link>
              </li>
              <li>
                <Link href="/courtier-assurance-pro" className={linkClass}>
                  Courtier assurance pro (variante)
                </Link>
              </li>
              <li>
                <Link href="/presse" className={linkClass}>
                  Presse
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Nous contacter
                </Link>
              </li>
            </ul>
          </section>

          {/* ---- Piliers ---- */}
          <section>
            <h2 className={sectionTitle}>Garanties (Piliers)</h2>
            <ul className="space-y-1.5">
              <li>
                <Link href="/assurance-decennale" className={linkClass}>
                  Assurance décennale BTP
                </Link>
              </li>
              <li>
                <Link href="/rc-pro" className={linkClass}>
                  RC Pro générique
                </Link>
              </li>
              <li>
                <Link href="/multirisque-pro" className={linkClass}>
                  Multirisque professionnelle
                </Link>
              </li>
              <li>
                <Link href="/mutuelle-pro" className={linkClass}>
                  Mutuelle pro ou TNS Madelin
                </Link>
              </li>
              <li>
                <Link href="/assurance-vtc" className={linkClass}>
                  Assurance VTC ou Taxi
                </Link>
              </li>
              <li>
                <Link href="/cyber-assurance" className={linkClass}>
                  Cyber assurance
                </Link>
              </li>
              <li>
                <Link href="/rc-pro-avocat" className={linkClass}>
                  RC Pro Avocat
                </Link>
              </li>
              <li>
                <Link href="/rc-pro-medecin" className={linkClass}>
                  RC Pro Médecin
                </Link>
              </li>
              <li>
                <Link href="/assurance-dommages-ouvrage" className={linkClass}>
                  Assurance dommages-ouvrage
                </Link>
              </li>
              <li>
                <Link href="/assurance-tous-risques-chantier" className={linkClass}>
                  Tous risques chantier
                </Link>
              </li>
              <li>
                <Link href="/comparateur-assurance-professionnelle" className={linkClass}>
                  Comparateur assurance pro
                </Link>
              </li>
            </ul>
          </section>
        </div>

        {/* ---- Décennale x Métiers ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Décennale × Métiers BTP</h2>
          <ul className="columns-2 gap-x-6 space-y-1.5 md:columns-3">
            {Object.values(DECENNALE_METIERS).map((m) => (
              <li key={m.slug} className="break-inside-avoid">
                <Link href={`/assurance-decennale/${m.slug}`} className={smallLinkClass}>
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- RC Pro x Professions ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>RC Pro × Professions</h2>
          <ul className="columns-2 gap-x-6 space-y-1.5 md:columns-3">
            {Object.values(RC_PRO_PROFESSIONS).map((p) => (
              <li key={p.slug} className="break-inside-avoid">
                <Link href={`/rc-pro/${p.slug}`} className={smallLinkClass}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Villes pSEO ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Villes — Décennale par ville (Top 100)</h2>
          <p className="mb-4 text-sm text-charcoal-600 dark:text-sand-300">
            Pages locales décennale, RC Pro et multirisque, regroupées par région administrative.
          </p>
          {REGIONS_ORDER.map((region) => {
            const villes = villesParRegion[region.slug] ?? []
            if (villes.length === 0) return null
            return (
              <DetailsSection key={region.slug} summary={region.nom} count={villes.length * 3}>
                <ul className="columns-2 gap-x-6 space-y-1 md:columns-3">
                  {villes.map((v) => (
                    <li key={v.slug} className="break-inside-avoid">
                      <Link href={`/assurance-decennale/ville/${v.slug}`} className={tinyLinkClass}>
                        Décennale {v.nom}
                      </Link>
                      {' · '}
                      <Link href={`/rc-pro/ville/${v.slug}`} className={tinyLinkClass}>
                        RC Pro {v.nom}
                      </Link>
                      {' · '}
                      <Link href={`/multirisque-pro/ville/${v.slug}`} className={tinyLinkClass}>
                        MRP {v.nom}
                      </Link>
                    </li>
                  ))}
                </ul>
              </DetailsSection>
            )
          })}
        </section>

        {/* ---- Outils ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Outils, calculateurs et modèles</h2>
          <ul className="columns-2 gap-x-6 space-y-1.5 md:columns-3">
            {OUTILS.map((o) => (
              <li key={o.slug} className="break-inside-avoid">
                <Link href={`/outils/${o.slug}`} className={smallLinkClass}>
                  {o.label}
                </Link>
              </li>
            ))}
            <li className="break-inside-avoid">
              <Link href="/simulateur" className={smallLinkClass}>
                Simulateur de tarif
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/attestation" className={smallLinkClass}>
                Demander une attestation
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/auteurs" className={smallLinkClass}>
                Auteurs ou experts
              </Link>
            </li>
          </ul>
        </section>

        {/* ---- Guides juridiques ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Guides juridiques et pratiques</h2>
          <ul className="columns-2 gap-x-6 space-y-1.5 md:columns-3">
            {GUIDES_JURIDIQUES.map((g) => (
              <li key={g.slug} className="break-inside-avoid">
                <Link href={`/guides/${g.slug}`} className={smallLinkClass}>
                  {g.label}
                </Link>
              </li>
            ))}
            <li className="break-inside-avoid">
              <Link href="/comment-fonctionne-la-garantie-decennale" className={smallLinkClass}>
                Comment fonctionne la décennale
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link
                href="/garantie-decennale-obligatoire-pour-quels-travaux"
                className={smallLinkClass}
              >
                Décennale — quels travaux
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/garantie-decennale-plomberie" className={smallLinkClass}>
                Décennale plomberie
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/garantie-decennale-toiture" className={smallLinkClass}>
                Décennale toiture
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/garantie-decennale-travaux" className={smallLinkClass}>
                Décennale travaux
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/travaux-sans-garantie-decennale" className={smallLinkClass}>
                Travaux sans décennale
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/decennale-assurance" className={smallLinkClass}>
                Décennale assurance
              </Link>
            </li>
          </ul>
        </section>

        {/* ---- Tarif pSEO ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Tarifs ciblés (combos clés)</h2>
          <p className="mb-4 text-sm text-charcoal-600 dark:text-sand-300">
            Pages tarif programmatiques par garantie et métier — échantillon représentatif des
            combinaisons à fort intent commercial.
          </p>
          <DetailsSection summary="Tarifs garantie × métier" count={tarifCombos.length}>
            <ul className="columns-2 gap-x-6 space-y-1 md:columns-3">
              {tarifCombos.map((c) => (
                <li key={`tarif-${c.garantie}-${c.metier}`} className="break-inside-avoid">
                  <Link href={`/tarif/${c.garantie}/${c.metier}`} className={tinyLinkClass}>
                    Tarif {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </DetailsSection>

          <DetailsSection
            summary="Prix garantie × métier × statut juridique"
            count={prixCombos.length}
          >
            <ul className="columns-2 gap-x-6 space-y-1 md:columns-3">
              {prixCombos.map((c) => (
                <li
                  key={`prix-${c.garantie}-${c.metier}-${c.statut}`}
                  className="break-inside-avoid"
                >
                  <Link
                    href={`/prix/${c.garantie}/${c.metier}/${c.statut}`}
                    className={tinyLinkClass}
                  >
                    Prix {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </DetailsSection>

          <DetailsSection summary="Devis garantie × métier" count={devisCombos.length}>
            <ul className="columns-2 gap-x-6 space-y-1 md:columns-3">
              {devisCombos.map((c) => (
                <li key={`devis-${c.garantie}-${c.metier}`} className="break-inside-avoid">
                  <Link href={`/devis/${c.garantie}/${c.metier}`} className={tinyLinkClass}>
                    Devis {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </DetailsSection>

          <DetailsSection summary="Guides garantie × métier" count={guideCombos.length}>
            <ul className="columns-2 gap-x-6 space-y-1 md:columns-3">
              {guideCombos.map((c) => (
                <li key={`guide-${c.garantie}-${c.metier}`} className="break-inside-avoid">
                  <Link href={`/guide/${c.garantie}/${c.metier}`} className={tinyLinkClass}>
                    Guide {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </DetailsSection>
        </section>

        {/* ---- Pages sectorielles ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Pages sectorielles et hubs</h2>
          <ul className="columns-2 gap-x-6 space-y-1.5 md:columns-3">
            {SECTOR_HUB_PAGES.map((p) => (
              <li key={p.href} className="break-inside-avoid">
                <Link href={p.href} className={smallLinkClass}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Variantes RC Pro ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Variantes RC Pro</h2>
          <ul className="columns-2 gap-x-6 space-y-1.5 md:columns-3">
            {RC_PRO_VARIANTS_PAGES.map((p) => (
              <li key={p.href} className="break-inside-avoid">
                <Link href={p.href} className={smallLinkClass}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Mutuelle ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Mutuelle, prévoyance et juridique</h2>
          <ul className="columns-2 gap-x-6 space-y-1.5 md:columns-3">
            {MUTUELLE_PAGES.map((p) => (
              <li key={p.href} className="break-inside-avoid">
                <Link href={p.href} className={smallLinkClass}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Assureurs ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Assureurs partenaires</h2>

          <h3 className={subSectionTitle}>Comparatifs assureurs</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 md:grid-cols-3">
            {ASSUREURS_RC_PRO.map((a) => (
              <li key={a.id}>
                <Link href={`/comparateur-assureurs#${a.id}`} className={smallLinkClass}>
                  {a.nom}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className={subSectionTitle}>Pages assureurs dédiées</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 md:grid-cols-3">
            {ASSUREURS_PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={smallLinkClass}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Blog ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Blog</h2>

          <h3 className={subSectionTitle}>Catégories</h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            <li>
              <Link href="/blog" className={linkClass}>
                Tous les articles
              </Link>
            </li>
            {BLOG_CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/blog/categorie/${c.slug}`} className={smallLinkClass}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className={subSectionTitle}>Top articles</h3>
          <ul className="columns-1 gap-x-6 space-y-1.5 md:columns-2">
            {BLOG_TOP_ARTICLES.map((a) => (
              <li key={a.slug} className="break-inside-avoid">
                <Link href={`/blog/${a.slug}`} className={smallLinkClass}>
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Ressources ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Ressources</h2>
          <ul className="columns-2 gap-x-6 space-y-1.5">
            <li className="break-inside-avoid">
              <Link href="/blog" className={linkClass}>
                Blog
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/glossaire" className={linkClass}>
                Glossaire (40+ termes)
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/faq" className={linkClass}>
                FAQ assurance pro
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/normes" className={linkClass}>
                Normes et conformité
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/ressources" className={linkClass}>
                Ressources téléchargeables
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/auteurs" className={linkClass}>
                Auteurs experts
              </Link>
            </li>
          </ul>
        </section>

        {/* ---- Mentions légales ---- */}
        <section className="mt-10">
          <h2 className={sectionTitle}>Mentions légales</h2>
          <ul className="columns-2 gap-x-6 space-y-1.5">
            <li className="break-inside-avoid">
              <Link href="/mentions-legales" className={linkClass}>
                Mentions légales
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/cgv" className={linkClass}>
                Conditions Générales de Service
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/fic" className={linkClass}>
                FIC — Fiche d&apos;Information Précontractuelle
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/ipid" className={linkClass}>
                IPID — Fiches produit standardisées
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/confidentialite" className={linkClass}>
                Politique de confidentialité (RGPD)
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/cookies" className={linkClass}>
                Politique cookies
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/reclamation" className={linkClass}>
                Déposer une réclamation
              </Link>
            </li>
            <li className="break-inside-avoid">
              <Link href="/mediation" className={linkClass}>
                Médiation
              </Link>
            </li>
          </ul>
        </section>

        <div className="mt-12 rounded-lg bg-gray-50 p-6 text-sm text-gray-600 dark:bg-charcoal-900 dark:text-sand-300">
          <p>
            <strong>Sitemap XML :</strong>{' '}
            <Link href="/sitemap.xml" className="font-semibold text-primary-700 underline">
              sitemap.xml
            </Link>{' '}
            (pour les moteurs de recherche)
          </p>
          <p className="mt-2">
            <strong>Robots :</strong>{' '}
            <Link href="/robots.txt" className="font-semibold text-primary-700 underline">
              robots.txt
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
