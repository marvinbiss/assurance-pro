/**
 * PilierLayout — Template piliers verticaux Vivos Assurance.
 *
 * Design language brand : terra gradient hero, bento cards bénéfices,
 * sections alternées sand/white avec rythme visuel, FAQ accordion premium,
 * CTA final gradient terra + glow.
 */

import Link from 'next/link'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  AlertCircle,
  Scale,
  Award,
  Wallet,
  Zap,
  ClipboardList,
  Wrench,
  Hammer,
  Briefcase,
  Clock,
  Target,
  Rocket,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const EMOJI_ICON_MAP: Record<string, LucideIcon> = {
  '⚖️': Scale,
  '⚖': Scale,
  '💰': Wallet,
  '⚡': Zap,
  '🛡️': ShieldCheck,
  '🛡': ShieldCheck,
  '🏆': Award,
  '📋': ClipboardList,
  '📜': ClipboardList,
  '🔧': Wrench,
  '🛠️': Hammer,
  '🛠': Hammer,
  '⚠️': AlertCircle,
  '⚠': AlertCircle,
  '✅': CheckCircle2,
  '⏱️': Clock,
  '⏱': Clock,
  '🎯': Target,
  '💼': Briefcase,
  '🚀': Rocket,
}
import { ExpertBio, SocialProofHero, TrustBadgesAcpr } from '@/components/premium'
// Below-fold heavy sections — lazy-loaded to keep First Load JS small.
import { ComparatifAssureursTable, DevisCTASection, TarifCalculator } from './pilier-sections-lazy'
import Image from 'next/image'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { MagneticCta } from '@/components/motion/magnetic-cta'
import { HERO_PHOTOS } from '@/lib/data/photo-library'

function pickHeroPhoto(slug: string): { src: string; alt: string } {
  const s = slug.toLowerCase()
  if (s.includes('decennale') || s.includes('btp') || s.includes('artisan'))
    return HERO_PHOTOS.chantier
  if (s.includes('mutuelle') || s.includes('sante')) return HERO_PHOTOS.conseil
  if (s.includes('equipe') || s.includes('collectif')) return HERO_PHOTOS.equipe
  return HERO_PHOTOS.bureau
}
import { ParallaxLayer } from '@/components/motion/dynamic/ParallaxLayerDynamic'
import { TiltCard } from '@/components/motion/dynamic/TiltCardDynamic'

type CalculatorGarantie =
  | 'decennale'
  | 'rc-pro'
  | 'multirisque-pro'
  | 'cyber'
  | 'mutuelle-pro'
  | 'vtc'
  | 'flotte-auto'
  | 'dommages-ouvrage'
  | 'tous-risques-chantier'
  | 'transport-marchandises'
  | 'moto-pro'
  | 'prevoyance'
  | 'protection-juridique'
  | 'homme-cle'

/**
 * Auto-dispatch garantie depuis slug si non fournie explicitement par la page.
 * Couvre les 130+ pages PilierLayout sans calculatorGarantie= explicite.
 *
 * Ordre des tests = priorité de match (spécifique → générique).
 * Les patterns longs/composés DOIVENT être testés avant les patterns courts.
 */
function inferCalculatorGarantie(slug: string): CalculatorGarantie {
  const s = slug.toLowerCase()

  // ----- Patterns composés / longs (priorité haute) -----
  if (s.includes('dommages-ouvrage') || s.includes('dommage-ouvrage')) return 'dommages-ouvrage'
  if (s.includes('tous-risques-chantier') || s.includes('trc-chantier')) {
    return 'tous-risques-chantier'
  }
  if (s.includes('transport-marchandises') || s.includes('marchandises-transport')) {
    return 'transport-marchandises'
  }
  if (s.includes('homme-cle') || s.includes('hommecle') || s.includes('homme-clef')) {
    return 'homme-cle'
  }
  if (s.includes('protection-juridique') || s.includes('juridique-pro')) {
    return 'protection-juridique'
  }
  if (
    s.includes('flotte') ||
    s.includes('voiture-pro') ||
    s.includes('auto-professionnelle') ||
    s.includes('voiture-professionnelle') ||
    s.includes('auto-entreprise')
  ) {
    return 'flotte-auto'
  }
  if (s.includes('moto-pro') || s.includes('moto-professionnelle') || s.includes('coursier')) {
    return 'moto-pro'
  }
  if (s.includes('prevoyance')) return 'prevoyance'
  if (s.includes('convoyage')) return 'transport-marchandises'

  // ----- Patterns spécifiques -----
  if (s.includes('decennale') || s.includes('spinetta') || s.includes('parfait-achevement')) {
    return 'decennale'
  }
  if (s.includes('cyber') || s.includes('rgpd') || s.includes('ransomware')) return 'cyber'
  if (s.includes('vtc') || s.includes('taxi') || s.includes('chauffeur')) return 'vtc'
  if (s.includes('mutuelle') || s.includes('madelin') || s.includes('sante') || s.includes('tns')) {
    return 'mutuelle-pro'
  }
  if (s.includes('multirisque') || s.includes('local') || s.includes('commerce')) {
    return 'multirisque-pro'
  }

  // Default fallback : RC Pro couvre la majorité (consultants, freelances, services pros).
  return 'rc-pro'
}

/**
 * Map slug standalone → métier value (alignée catalogue TarifCalculator).
 * Couvre les pages landing /assurance-X qui ne suivent pas le pattern /garantie/metier.
 *
 * Source de vérité métier values: src/components/premium/tarif-calculator.tsx
 */
const SLUG_TO_METIER: Record<string, string> = {
  // ---- Multirisque-pro ----
  'assurance-bureau': 'bureau-services',
  'assurance-commerce': 'commerce-detail',
  'assurance-restaurant': 'restaurant',
  'assurance-restaurant-en-ligne': 'restaurant',
  'assurance-local-commercial': 'commerce-detail',
  'assurance-locaux-entreprise': 'commerce-detail',
  'assurance-habitation-professionnelle': 'bureau-services',
  'assurance-association': 'association',
  'multirisque-pro-mma': 'commerce-detail',
  'btp-pro-mutuelle': 'depot-btp',

  // ---- Cyber ----
  'assurance-e-commerce': 'ecommerce',

  // ---- RC Pro (slugs alignés data + alias) ----
  'assurance-medecin': 'medecin-generaliste',
  'assurance-consultant-independant': 'consultant',
  'assurance-freelance': 'freelance-it',
  'assurance-artisan': 'multi-services-btp',
  'rc-pro-medecin': 'medecin-generaliste',
  'rc-pro-avocat': 'avocat',
  'rc-pro-batiment': 'multi-services-btp',
  'rc-pro-consultant': 'consultant',
  'rc-pro-estheticienne': 'esthetique',
  'rc-pro-freelance-informatique': 'freelance-it',
  'rc-pro-informatique': 'freelance-it',
  'rc-pro-immobilier': 'agent-immobilier',
  'rc-pro-agent-immobilier': 'agent-immobilier',
  'rc-pro-convoyage': 'transporteur-leger',
  'rc-pro-pas-cher': 'consultant',
  'rc-pro-mma': 'consultant',
  'rc-pro-macif': 'consultant',
  'rc-pro-maif': 'consultant',
  'rc-pro-matmut': 'consultant',
  'rc-pro-credit-agricole': 'consultant',
  'hiscox-rc-pro': 'consultant',
  'mma-assurance-rc-pro': 'consultant',
  'stello-rc-pro': 'freelance-it',
  'rc-pro-en-ligne': 'consultant',
  'rc-pro-souscription-en-ligne': 'consultant',
  'rc-pro-sasu': 'consultant',
  'rc-pro-decennale': 'multi-services-btp',
  'rc-pro-et-decennale': 'multi-services-btp',

  // ---- Statut/générique (RC Pro fallback) ----
  'assurance-auto-entreprise': 'commercial', // flotte-auto secteur
  'assurance-micro-entreprise': 'auto-entrepreneur',
  'assurance-mission-professionnelle': 'consultant',
  'assurance-obligatoire-entreprise': 'consultant',
  'assurance-pour-entreprise-individuelle': 'consultant',
  'assurance-entreprise': 'consultant',

  // ---- Décennale (legacy) ----
  'assurance-btp': 'multi-services-btp',
  'assurance-pro-btp': 'multi-services-btp',
  'assurance-decennale-batiment': 'multi-services-btp',
  'assurance-decennale-btp': 'multi-services-btp',
  'assurance-decennale-maconnerie': 'macon',
  'assurance-decennale-plombier': 'plombier',
  'assurance-decennale-terrassement': 'terrassier',
  'assurance-decennale-maitre-d-oeuvre': 'multi-services-btp',
  'assurance-decennale-immediate': 'multi-services-btp',
  'assurance-decennale-la-moins-chere': 'peintre',
  'assurance-decennale-moins-cher': 'peintre',
  'assurance-decennale-pas-cher': 'peintre',
  'assurance-decennale-auto-entrepreneur': 'multi-services-btp',
  'assurance-decennale-auto-entrepreneur-pro-btp': 'multi-services-btp',
  'assurance-decennale-pour-auto-entrepreneur': 'multi-services-btp',
  'assurance-decennale-obligatoire': 'multi-services-btp',
  'decennale-assurance': 'multi-services-btp',
  'comment-fonctionne-la-garantie-decennale': 'multi-services-btp',
  'garantie-decennale-obligatoire-pour-quels-travaux': 'multi-services-btp',
  'garantie-decennale-plomberie': 'plombier',
  'garantie-decennale-toiture': 'couvreur-zingueur',
  'garantie-decennale-travaux': 'multi-services-btp',
  'travaux-sans-garantie-decennale': 'multi-services-btp',
  'pro-btp-assurance-decennale': 'multi-services-btp',

  // ---- Mutuelle / Santé ----
  'mutuelle-pro-btp': 'artisan-btp',
  'mutuelle-pro-btp-s3-p3-avis': 'artisan-btp',
  'mutuelle-tns': 'dirigeant-tns',
  'mutuelle-sante-tns': 'dirigeant-tns',
  'mutuelle-dirigeant': 'dirigeant-tns',
  'pro-btp-mutuelle': 'artisan-btp',
  'pro-btp-mutuelle-remboursement': 'artisan-btp',
  'pro-btp-mutuelle-remboursement-mon-compte': 'artisan-btp',
  'assurance-sante-entreprise': 'dirigeant-tns',
  'assurance-sante-professionnelle': 'dirigeant-tns',

  // ---- VTC ----
  'assurance-taxi': 'taxi',
  'assurance-chauffeur-taxi': 'taxi',
  'assurance-rc-pro-vtc': 'taxi',
  'rc-pro-vtc': 'taxi',
  'assurance-responsabilite-civile-professionnelle-vtc': 'taxi',

  // ---- Flotte auto ----
  'assurance-flotte-automobile': 'utilitaire',
  'assurance-voiture-professionnelle': 'utilitaire',
  'assurance-voiture-pro-btp': 'utilitaire',
  'assurance-auto-professionnelle': 'utilitaire',
  'pro-btp-assurance-auto': 'utilitaire',

  // ---- Moto ----
  'assurance-moto-professionnelle': 'livraison',

  // ---- Spécifiques ----
  'assurance-portage-salarial': 'consultant',
  'assurance-sasu': 'consultant',
  sasu: 'consultant',
  'auto-entrepreneur': 'auto-entrepreneur',
  'micro-entreprise': 'auto-entrepreneur',
}

/**
 * Extrait le slug métier depuis l'URL pour préselection dans TarifCalculator.
 *
 * Stratégie (priorité décroissante):
 * 1. Lookup SLUG_TO_METIER (mappings standalone landings explicites)
 * 2. Slug avec sous-segment (ex: 'rc-pro/medecin-generaliste') → dernier segment
 * 3. Pattern hyphéné (ex: 'rc-pro-medecin') → métier extrait après prefix garantie
 * 4. undefined (fallback transparent au 1er catalogue)
 */
/** Normalise un slug métier: underscore→hyphen, lowercase, trim. */
function normalizeMetierSlug(s: string): string {
  return s.toLowerCase().replace(/_/g, '-').trim()
}

function extractMetierFromSlug(rawSlug: string): string | undefined {
  const slug = normalizeMetierSlug(rawSlug)
  return extractMetierFromSlugInternal(slug)
}

function extractMetierFromSlugInternal(slug: string): string | undefined {
  // 1. Map explicite
  const mapped = SLUG_TO_METIER[slug]
  if (mapped) return mapped

  // 2. Slug avec /
  const segments = slug.split('/').filter(Boolean)
  if (segments.length >= 2) {
    return segments[segments.length - 1]
  }

  // 3. Pattern hyphéné après prefix garantie (ORDRE = LONG → COURT pour éviter
  //    qu'un préfixe court (assurance-) ne mange un préfixe long (assurance-rc-pro-))
  const known = [
    'assurance-responsabilite-civile-professionnelle-',
    'assurance-decennale-',
    'assurance-rc-pro-',
    'assurance-cyber-',
    'assurance-vtc-',
    'multirisque-pro-',
    'cyber-assurance-',
    'mutuelle-pro-',
    'mutuelle-tns-',
    'decennale-',
    'rc-pro-',
    'cyber-',
    'vtc-',
    'assurance-',
  ]
  for (const prefix of known) {
    if (slug.startsWith(prefix)) {
      const rest = slug.slice(prefix.length)
      if (rest.length > 0) return rest
    }
  }
  return undefined
}
import {
  getBreadcrumbSchema,
  getServiceSchema,
  getArticleSchema,
  getFAQPageSchema,
  getAggregateRatingDirectSchema,
  getInsuranceAgencyOrganizationSchema,
  getPersonSchema,
} from '@/lib/seo/jsonld'
import { SITE_URL } from '@/lib/seo/config'
import { SITE_AGGREGATE_RATING } from '@/lib/seo/aggregate-rating'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { CTA_TEXTS, IS_PRE_ORIAS } from '@/lib/config/pre-orias'
import { RelatedPagesSection } from '@/components/seo/RelatedPagesSection'

function buildBreadcrumbItems(slug: string, title: string) {
  const segments = slug.split('/').filter((s): s is string => Boolean(s))
  const items: { name: string; url: string }[] = [{ name: 'Accueil', url: '/' }]
  let acc = ''
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i] ?? ''
    acc = `${acc}/${seg}`
    const isLast = i === segments.length - 1
    items.push({
      name: isLast ? title : prettifySegment(seg),
      url: acc,
    })
  }
  return items
}

function prettifySegment(s: string): string {
  return s
    .split('-')
    .map((w) => (w.length > 0 ? `${w[0]?.toUpperCase() ?? ''}${w.slice(1)}` : w))
    .join(' ')
}

export interface PilierProps {
  /** Slug pour Schema.org */
  slug: string
  /** Titre H1 */
  title: string
  /** Sous-titre court */
  tagline: string
  /** Description méta + intro */
  intro: string
  /** Bénéfices clés (3-4 points) */
  benefits: { icon?: string; title: string; desc: string }[]
  /** Sections de contenu (H2 + body riche) */
  sections: { h2: string; body: ReactNode }[]
  /** FAQ */
  faq: { q: string; a: string }[]
  /** Métiers / activités liées (cards de redirection) */
  relatedMetiers?: { name: string; slug: string }[]
  /** Référence légale principale (ex : "Loi Spinetta — art. L. 241-1 C. assur.") */
  legalReference?: string
  /** Garantie obligatoire ? */
  isObligatoire?: boolean
  /** Stats social proof hero (4 max) */
  socialProofStats?: readonly { value: string; label: string }[]
  /** Calculateur tarif inline */
  calculatorGarantie?: CalculatorGarantie
  /** Expert bio courtier */
  expertBio?: {
    name: string
    role: string
    bio: string
    orias?: string
    linkedin?: string
    avatar?: string
  }
  /** Comparatif assureurs table */
  comparatifRows?: readonly {
    assureur: string
    color: string
    prix: string
    plafond: string
    delai: string
    recommande?: boolean
  }[]
}

export async function PilierLayout({
  slug,
  title,
  tagline,
  intro,
  benefits,
  sections,
  faq,
  relatedMetiers,
  legalReference,
  isObligatoire,
  socialProofStats,
  calculatorGarantie,
  expertBio,
  comparatifRows,
}: PilierProps) {
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return (
    <article className="min-h-screen dark:bg-charcoal-950">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — gradient terra + breadcrumb + CTAs + legal ref
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="noise-overlay relative overflow-hidden bg-charcoal-900 py-20 text-white md:py-28">
        {/* Cover photo background — priority for LCP */}
        {(() => {
          const photo = pickHeroPhoto(slug)
          return (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25"
            />
          )
        })()}
        {/* Mesh gradient animé */}
        <div
          className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-80"
          aria-hidden="true"
        />
        {/* Radial blobs decoratifs — parallax scroll + mouse */}
        <ParallaxLayer
          speed={0.22}
          mouseInfluence={0.45}
          className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-secondary-500/30 blur-[140px]"
        >
          <span aria-hidden className="block h-full w-full" />
        </ParallaxLayer>
        <ParallaxLayer
          speed={-0.15}
          mouseInfluence={0.3}
          className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-primary-400/30 blur-[120px]"
        >
          <span aria-hidden className="block h-full w-full" />
        </ParallaxLayer>
        <div className="absolute inset-0 bg-hero-pattern opacity-30" aria-hidden="true" />

        <div className="container relative mx-auto max-w-5xl px-4">
          {/* Breadcrumb */}
          <nav
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/75"
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span className="text-white/40" aria-hidden="true">
              /
            </span>
            <span className="text-white/95" aria-current="page">
              {prettifySegment(slug.split('/')[0] ?? '')}
            </span>
          </nav>

          {/* Badge obligatoire */}
          {isObligatoire ? (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary-300/40 bg-secondary-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary-100 backdrop-blur-sm">
              <AlertCircle className="h-3.5 w-3.5" />
              Garantie obligatoire
            </div>
          ) : (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              Courtier ORIAS · ACPR
            </div>
          )}

          {/* H1 typographie display premium */}
          <h1 className="mb-6 max-w-4xl font-display-premium font-heading text-4xl font-extrabold leading-[1.05] tracking-display sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            {title}
          </h1>

          <p className="mb-10 max-w-3xl text-lg text-white/85 md:text-xl">{tagline}</p>

          {/* CTAs */}
          <div className="mb-10 flex flex-wrap gap-3">
            <MagneticCta>
              <Link
                href={`/devis?garantie=${slug}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-primary-500 px-7 py-4 text-base font-bold text-white shadow-cta transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-cta-hover"
              >
                {CTA_TEXTS.primary}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticCta>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              Questions fréquentes
            </a>
          </div>

          {/* Référence légale en pill */}
          {legalReference ? (
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-charcoal-900/30 px-4 py-2 text-sm text-white/85 backdrop-blur-sm">
              <Scale className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
              <span className="font-medium">Référence légale :</span>
              <span className="text-white">{legalReference}</span>
            </div>
          ) : null}

          {/* Trust badges ORIAS / ACPR / DDA — différenciateur YMYL anti-FR-norm */}
          <TrustBadgesAcpr orias={process.env.NEXT_PUBLIC_ORIAS_NUMBER} className="mt-6" />
        </div>
      </section>

      {/* Social proof stats band (sand-50 sous hero) */}
      {socialProofStats && socialProofStats.length > 0 ? (
        <section className="border-y border-sand-300 bg-sand-50 py-10 dark:bg-charcoal-900 md:py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <SocialProofHero stats={socialProofStats} />
          </div>
        </section>
      ) : null}

      {/* ═══════════════════════════════════════════════════════════════════
          BÉNÉFICES — Cards avec icons gradient
          ═══════════════════════════════════════════════════════════════════ */}
      {benefits.length > 0 ? (
        <section className="bg-sand-50 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b, idx) => (
                <RevealOnScroll key={b.title} delay={idx * 80} translateY={28}>
                  <TiltCard maxTilt={4} glowColor="rgba(43, 77, 133, 0.12)">
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft transition-[box-shadow] duration-300 hover:shadow-card-hover">
                      <div
                        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-60 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      {(() => {
                        const MappedIcon = b.icon ? EMOJI_ICON_MAP[b.icon] : null
                        const IconCmp = MappedIcon ?? CheckCircle2
                        return (
                          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-soft transition-transform group-hover:scale-110">
                            <IconCmp className="h-5 w-5" strokeWidth={2.4} aria-hidden />
                          </div>
                        )
                      })()}
                      <h3 className="mb-2 font-heading text-base font-bold text-charcoal-900">
                        {b.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-charcoal-600">{b.desc}</p>
                    </div>
                  </TiltCard>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ═══════════════════════════════════════════════════════════════════
          INTRO — Texte introductif avec eyebrow
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
            <Sparkles className="h-3.5 w-3.5" />
            En bref
          </div>
          <p className="text-xl leading-relaxed text-charcoal-700 md:text-2xl md:leading-[1.5]">
            {intro}
          </p>
        </div>
      </section>

      {/* Calculateur tarif inline (premium conversion) — toujours présent.
          Si calculatorGarantie pas fourni explicitement, auto-dispatch via slug. */}
      {(() => {
        const garantie = calculatorGarantie ?? inferCalculatorGarantie(slug)
        return (
          <section className="bg-sand-50 py-20 md:py-28">
            <div className="container mx-auto max-w-4xl px-4">
              <RevealOnScroll>
                <div className="mb-8 text-center">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
                    Estimation instantanée
                  </div>
                  <h2
                    className="font-heading text-3xl font-medium leading-tight tracking-tight text-charcoal-900 md:text-4xl"
                    style={{ fontFamily: 'var(--font-heading), Fraunces, serif' }}
                  >
                    Combien va vous coûter votre assurance ?
                  </h2>
                </div>
                <TarifCalculator garantie={garantie} defaultMetier={extractMetierFromSlug(slug)} />
              </RevealOnScroll>
            </div>
          </section>
        )
      })()}

      {/* Comparatif assureurs table */}
      {comparatifRows && comparatifRows.length > 0 ? (
        <section className="bg-white py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-4">
            <RevealOnScroll>
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-800">
                  Comparatif 2026
                </div>
                <h2
                  className="font-heading text-3xl font-medium leading-tight tracking-tight text-charcoal-900 md:text-4xl"
                  style={{ fontFamily: 'var(--font-heading), Fraunces, serif' }}
                >
                  Nos assureurs partenaires comparés
                </h2>
              </div>
              <ComparatifAssureursTable rows={comparatifRows} />
            </RevealOnScroll>
          </div>
        </section>
      ) : null}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTIONS — Alternance sand / white pour rythme visuel
          ═══════════════════════════════════════════════════════════════════ */}
      {sections.map((s, idx) => (
        <section
          key={s.h2}
          className={`py-24 md:py-32 ${idx % 2 === 0 ? 'bg-sand-50' : 'bg-white'}`}
        >
          <div className="container mx-auto max-w-4xl px-4">
            <RevealOnScroll translateY={28}>
              <div className="mb-8 flex items-start gap-4">
                <span
                  className="mt-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 font-heading text-base font-extrabold text-white shadow-glow-clay"
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-display text-charcoal-900 md:text-4xl">
                  {s.h2}
                </h2>
              </div>
              <div className="pilier-prose prose prose-lg max-w-none text-charcoal-700">
                {s.body}
              </div>
            </RevealOnScroll>
          </div>
        </section>
      ))}

      {/* Expert bio courtier — E-E-A-T YMYL signal */}
      {expertBio ? (
        <section className="bg-sand-50 py-20 md:py-28">
          <div className="container mx-auto max-w-4xl px-4">
            <RevealOnScroll>
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-700">
                  Votre interlocuteur
                </div>
                <h2
                  className="font-heading text-3xl font-medium leading-tight tracking-tight text-charcoal-900 md:text-4xl"
                  style={{ fontFamily: 'var(--font-heading), Fraunces, serif' }}
                >
                  Un courtier ORIAS qui connaît votre métier
                </h2>
              </div>
              <ExpertBio {...expertBio} />
            </RevealOnScroll>
          </div>
        </section>
      ) : null}

      {/* ═══════════════════════════════════════════════════════════════════
          RELATED MÉTIERS — Grid links premium
          ═══════════════════════════════════════════════════════════════════ */}
      {relatedMetiers && relatedMetiers.length > 0 ? (
        <section className="bg-white py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-700">
                <Award className="h-3.5 w-3.5" />
                Couverture étendue
              </div>
              <h2 className="font-heading text-3xl font-extrabold tracking-display text-charcoal-900 md:text-4xl">
                Couvert pour <span className="text-primary-600">votre métier</span> ?
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {relatedMetiers.map((m) => (
                <Link
                  key={m.slug}
                  href={`/${slug}/${m.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-charcoal-100 bg-white px-4 py-3.5 text-sm font-semibold text-charcoal-800 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:bg-sand-50 hover:text-primary-700"
                >
                  <span>{m.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* MAILLAGE INTERNE — Pages connexes (auto-injecté selon cluster sémantique) */}
      <RelatedPagesSection currentSlug={slug} />

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ — Accordion premium
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="bg-sand-50 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-800">
              <ShieldCheck className="h-3.5 w-3.5" />
              Conformité DDA
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-display text-charcoal-900 md:text-4xl">
              Questions <span className="text-primary-600">fréquentes</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-charcoal-100 bg-white px-5 py-4 shadow-soft transition-all open:border-primary-300 open:bg-white open:shadow-card-hover hover:border-primary-200 hover:shadow-card-hover"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-bold text-charcoal-900">
                  <span className="text-base md:text-lg">{f.q}</span>
                  <ChevronDown
                    className="h-5 w-5 flex-shrink-0 text-primary-600 transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 leading-relaxed text-charcoal-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer DDA L.521-4 Code des assurances — conformité ACPR/YMYL piliers */}
      <section aria-label="Mentions précontractuelles" className="bg-sand-100 py-6">
        <div className="container mx-auto max-w-5xl px-4 text-xs leading-relaxed text-charcoal-600">
          <p>
            <strong className="text-charcoal-800">Information précontractuelle —</strong> Ce contenu
            est informatif et ne constitue pas un conseil personnalisé au sens de l&apos;article
            L.&nbsp;521-4 du Code des assurances. Pour un conseil adapté à votre situation, un
            courtier ORIAS vous recontactera après réception de votre demande de devis. Aucune
            commission n&apos;est facturée à nos clients ; nous sommes rémunérés par les compagnies
            d&apos;assurance partenaires. Conformité DDA &amp; ACPR.
          </p>
        </div>
      </section>

      {/* CTA FINAL — DESIGN.md Atelier Premium (grain + premium-terra shadow) */}
      <DevisCTASection
        title={`Prêt à comparer votre ${title.split(' ')[0]?.toLowerCase() ?? 'assurance'} ?`}
        subtitle={
          IS_PRE_ORIAS
            ? "Cabinet en cours d'immatriculation ORIAS. Rejoignez la liste pour être prévenu(e) dès l'ouverture commerciale."
            : 'Devis gratuit, sans engagement. Notre courtier ORIAS vous recontacte avec 3 offres personnalisées en moins de 24 heures.'
        }
        primaryCta={{ label: CTA_TEXTS.start, href: `/devis?garantie=${slug}` }}
        secondaryCta={{ label: 'Parler à un conseiller', href: '/contact' }}
      />

      {/* Schemas JSON-LD — safe escape + nonce CSP */}
      <script {...jsonLdScriptProps(getFAQPageSchema(faq), nonce)} />
      <script
        {...jsonLdScriptProps(getBreadcrumbSchema(buildBreadcrumbItems(slug, title)), nonce)}
      />
      <script
        {...jsonLdScriptProps(
          slug.startsWith('guides/')
            ? getArticleSchema({
                headline: title,
                description: tagline,
                url: `${SITE_URL}/${slug}`,
              })
            : getServiceSchema({
                name: title,
                description: tagline,
                url: `${SITE_URL}/${slug}`,
              }),
          nonce
        )}
      />
      {/* InsuranceAgency root signal — E-E-A-T YMYL (ORIAS/ACPR/CSCA) */}
      <script {...jsonLdScriptProps(getInsuranceAgencyOrganizationSchema(), nonce)} />
      {/* AggregateRating site-wide — rich snippet ★ SERP */}
      <script
        {...jsonLdScriptProps(
          getAggregateRatingDirectSchema({
            ratingValue: SITE_AGGREGATE_RATING.ratingValue,
            reviewCount: SITE_AGGREGATE_RATING.reviewCount,
            bestRating: SITE_AGGREGATE_RATING.bestRating,
            worstRating: SITE_AGGREGATE_RATING.worstRating,
            itemReviewedName: title,
            itemReviewedType: 'Service',
          }),
          nonce
        )}
      />
      {/* Person schema (expert author) — E-E-A-T author signal */}
      {expertBio ? (
        <script
          {...jsonLdScriptProps(
            getPersonSchema({
              name: expertBio.name,
              jobTitle: expertBio.role,
              url: `${SITE_URL}/${slug}#expert`,
              ...(expertBio.avatar ? { imageUrl: expertBio.avatar } : {}),
              description: expertBio.bio,
              ...(expertBio.linkedin ? { sameAs: [expertBio.linkedin] } : {}),
            }),
            nonce
          )}
        />
      ) : null}
    </article>
  )
}
