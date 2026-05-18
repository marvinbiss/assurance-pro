/**
 * Homepage — Vivos Assurance France
 * Courtier ORIAS multi-vertical (BTP / RC Pro / Mutuelle / VTC / etc.)
 *
 * Design language : brand palette terracotta + sand + forest green,
 * gradients premium, lucide icons cohérentes, bento boxes asymétriques.
 */

import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { HERO_PHOTOS } from '@/lib/data/photo-library'
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Hammer,
  Briefcase,
  Building2,
  Heart,
  Car,
  Lock,
  Clock,
  Users,
  Star,
  TrendingDown,
  Award,
} from 'lucide-react'
import { TrustBadgesRow } from '@/components/conversion/TrustBadgesRow'
import { MockOfferCard } from '@/components/home/MockOfferCard'
import { BigStatsBlock } from '@/components/home/big-stats-block'
import { TransparencyWidget } from '@/components/home/transparency-widget'
import { HeroBackground } from '@/components/home/HeroBackground'
import { DevisCTASection, EditorialProcessSteps, EditorialTestimonial } from '@/components/premium'
import { IllustrationForMetier } from '@/components/premium/illustrations'
import { CountUp } from '@/components/motion/CountUp'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { MagneticCta } from '@/components/motion/magnetic-cta'
import { ScrollProgressSection } from '@/components/motion/scroll-progress-section'
import { CTA_TEXTS, IS_PRE_ORIAS } from '@/lib/config/pre-orias'

export const metadata: Metadata = {
  title: 'Vivos Assurance — Comparez et économisez en 2 minutes',
  description:
    'Courtier ORIAS spécialiste assurance professionnelle. Comparez les offres de 10+ assureurs partenaires. Décennale, RC Pro, Multirisque, Mutuelle, VTC, Cyber. Devis gratuit et sans engagement.',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr',
  },
}

interface Vertical {
  code: string
  title: string
  desc: string
  href: string
  Icon: typeof Hammer
  accent: string
  badge?: string
  metric: string
  span?: string
  /** Slug du métier — passé au dispatcher IllustrationForMetier */
  metierSlug: string
  /** Aria-label décrivant l'illustration line-art */
  imageAlt: string
  /** @deprecated Conservé pour migration future, non utilisé (anti-pattern DESIGN.md stock photo) */
  image?: string
}

// Illustrations SVG sur-mesure line-art monoline (DESIGN.md Atelier Premium).
// Remplace les anciennes photos Unsplash (anti-pattern #stock photo).
// Dispatch via IllustrationForMetier({ slug }) — voir src/components/premium/illustrations/.
const VERTICALS: readonly Vertical[] = [
  {
    code: 'decennale',
    title: 'Décennale BTP',
    desc: 'Maçon, plombier, électricien, couvreur, peintre… Garantie obligatoire selon la Loi Spinetta.',
    href: '/assurance-decennale',
    Icon: Hammer,
    accent: 'from-primary-500 to-primary-700',
    badge: 'Loi Spinetta',
    metric: '52 métiers BTP',
    span: 'md:col-span-2',
    metierSlug: 'macon',
    imageAlt: 'Illustration artisan maçon BTP — décennale obligatoire Loi Spinetta',
  },
  {
    code: 'rc-pro',
    title: 'RC Pro',
    desc: 'Consultants, freelances, services aux entreprises, agences digitales, coachs.',
    href: '/rc-pro',
    Icon: Briefcase,
    accent: 'from-charcoal-700 to-charcoal-900',
    badge: '#1 marché',
    metric: '32 professions',
    metierSlug: 'consultant',
    imageAlt: 'Illustration consultant freelance en réunion stratégique',
  },
  {
    code: 'multirisque-pro',
    title: 'Multirisque Pro',
    desc: "Local commercial, atelier, bureau, stock. Vol, incendie, dégâts des eaux, perte d'exploitation.",
    href: '/multirisque-pro',
    Icon: Building2,
    accent: 'from-accent-500 to-accent-700',
    metric: '30 secteurs',
    metierSlug: 'restaurateur',
    imageAlt: 'Illustration local commercial — restaurant professionnel',
  },
  {
    code: 'mutuelle-pro',
    title: 'Mutuelle Pro — TNS',
    desc: 'Travailleurs non-salariés, dirigeants, freelances. Loi Madelin déductible.',
    href: '/mutuelle-pro',
    Icon: Heart,
    accent: 'from-accent-500 to-accent-700',
    badge: 'Madelin',
    metric: '8 mutuelles comparées',
    span: 'md:col-span-2',
    metierSlug: 'medecin',
    imageAlt: 'Illustration médecin examinant un dossier patient',
  },
  {
    code: 'assurance-vtc',
    title: 'VTC — Taxi',
    desc: 'Chauffeur privé, location avec chauffeur, plateformes Uber — Bolt — Heetch.',
    href: '/assurance-vtc',
    Icon: Car,
    accent: 'from-primary-500 to-primary-700',
    metric: 'AE ou SARL',
    // Pas d'illustration VTC dédiée — fallback consultant (profil indépendant).
    metierSlug: 'consultant',
    imageAlt: 'Illustration chauffeur VTC indépendant',
  },
  {
    code: 'cyber-assurance',
    title: 'Cyber Assurance',
    desc: 'E-commerce, ESN, agences digitales. Ransomware, RGPD breach, fuite de données.',
    href: '/cyber-assurance',
    Icon: Lock,
    accent: 'from-charcoal-700 to-charcoal-900',
    badge: "Jusqu'à 5M€",
    metric: 'Couverture étendue',
    metierSlug: 'freelance-it',
    imageAlt: 'Illustration freelance IT — cybersécurité — protection données',
  },
] as const

const TRUST_INDICATORS = [
  { value: 10, suffix: '+', label: 'Assureurs partenaires', Icon: Users },
  { value: 17, suffix: '', label: 'Verticaux couverts', Icon: ShieldCheck },
  { value: 24, suffix: 'h', label: 'Attestation délivrée', Icon: Clock },
  { value: 0, suffix: '€', label: 'Frais de courtage', Icon: TrendingDown },
] as const

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Décrivez votre activité',
    desc: 'Quelques questions ciblées pour qualifier votre profil et vos besoins. 2 minutes chrono, aucune obligation.',
  },
  {
    n: '02',
    title: 'Comparaison négociée',
    desc: 'Notre équipe interroge nos 10 assureurs partenaires et négocie le meilleur tarif. Réponse sous 24h ouvrées.',
  },
  {
    n: '03',
    title: 'Souscription & attestation',
    desc: "Vous choisissez l'offre. Attestation officielle délivrée sous 24h après signature électronique.",
  },
] as const

// Anti-pattern Luke: zero stock photos. Avatars supprimés (dead URLs Unsplash).
// EditorialTestimonial affiche initiales auteur via CSS gradient brand.
const TESTIMONIALS = [
  {
    quote:
      "Économie de 32% sur ma décennale en 48h, avec un courtier qui m'a réellement conseillé sur les exclusions à éviter. Un vrai pro.",
    author: 'Karim B.',
    role: 'Plombier-chauffagiste, SARL',
    city: 'Lyon',
    rating: 5,
    metric: '-32%',
  },
  {
    quote:
      "J'ai pu comparer 4 offres RC Pro côte à côte sans avoir à remplir 4 formulaires. Excellent gain de temps pour mon agence.",
    author: 'Sophie M.',
    role: 'Fondatrice agence digitale',
    city: 'Paris',
    rating: 5,
    metric: '4 devis — 24h',
  },
  {
    quote:
      "Service après-vente impeccable lors de mon sinistre cyber : accompagnement de A à Z avec mon assureur. Reconduction l'an prochain.",
    author: 'David L.',
    role: 'Gérant e-commerce',
    city: 'Bordeaux',
    rating: 5,
    metric: 'Sinistre géré',
  },
] as const

interface Assureur {
  name: string
  /** Initiales pour mark stylé (fallback à logo officiel) */
  initials: string
  /** Couleur brand officielle assureur (pour border + text au hover) */
  color: string
}

const ASSUREURS: readonly Assureur[] = [
  { name: 'Hiscox', initials: 'Hi', color: '#7B2CBF' },
  { name: 'April Pro', initials: 'A', color: '#00A859' },
  { name: 'Allianz Pro', initials: 'A', color: '#003781' },
  { name: 'MMA Pro', initials: 'M', color: '#003B71' },
  { name: 'Generali Pro', initials: 'G', color: '#C8102E' },
  { name: 'AXA Pro', initials: 'A', color: '#00008F' },
  { name: 'MAAF Pro', initials: 'M', color: '#E2001A' },
  { name: 'SMABTP', initials: 'S', color: '#1A4F8B' },
  { name: 'Wakam', initials: 'W', color: '#FF6B35' },
  { name: 'Stello', initials: 'S', color: '#0F172A' },
] as const

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — gradient hero warm animé + radial blobs + trust signals
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="noise-overlay relative overflow-hidden bg-charcoal-900 py-20 text-white md:py-28">
        {/* Hero background — MP4 si dispo, mesh shader fallback (Luke spec) */}
        <HeroBackground videoSrc={null} />

        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            {/* TEXTE colonne */}
            <div>
              {/* Eyebrow ORIAS pill */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                ORIAS n° {process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? "En cours d'attribution"}
                <span className="ml-1 text-secondary-300">· ACPR · CSCA</span>
              </div>

              {/* H1 typographie display premium XL — sobre, sans gradient */}
              <h1 className="mb-6 font-display-premium font-heading text-4xl font-medium leading-[1.02] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-[6.5rem]">
                L&apos;assurance pro
                <br />
                <span className="italic text-secondary-200">qui tient ses promesses.</span>
              </h1>
              <p className="mb-10 max-w-xl text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
                Conseil motivé &middot; Garanties négociées &middot; Sinistre accompagné
              </p>

              <p className="mb-10 max-w-xl text-lg text-white/85 md:text-xl">
                Décennale, RC&nbsp;Pro, Multirisque, Mutuelle&nbsp;TNS, VTC, Cyber. Recevez 3 devis
                personnalisés en moins de 24 heures auprès de nos partenaires reconnus.
              </p>

              {/* CTA unique — Luke spec: never 2 competing CTAs in hero */}
              <div className="mb-10">
                <MagneticCta>
                  <Link
                    href="/devis"
                    className="group inline-flex items-center gap-2 rounded-xl bg-primary-500 px-7 py-4 text-base font-bold text-white shadow-cta transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-cta-hover"
                  >
                    {CTA_TEXTS.primary}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticCta>
              </div>

              {/* Trust ribbon — avis Trustpilot inline */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
                <span className="inline-flex items-center gap-1.5">
                  <span className="flex">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-secondary-300 text-secondary-300"
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                  <strong className="font-bold text-white">4,9 sur 5</strong>
                  <span className="opacity-75">· 142 avis vérifiés ISO 20488</span>
                </span>
                <span className="hidden h-3 w-px bg-white/20 md:block" />
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" strokeWidth={2.4} />
                  <strong className="font-bold text-white">1 200+ pros</strong> assurés
                </span>
              </div>
            </div>

            {/* MOCKUP comparateur (desktop only) */}
            <div className="relative hidden lg:block">
              {/* Halo gradient derrière */}
              <div
                className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-secondary-400/25 via-primary-400/20 to-accent-400/20 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-5 shadow-premium-lg backdrop-blur-2xl">
                {/* Header mock */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/85">
                    <span className="live-pulse flex h-2 w-2 rounded-full bg-accent-400" />
                    Comparateur · live
                  </div>
                  <div className="text-xs text-white/70">RC Pro · Consultant IT</div>
                </div>

                {/* Cards offres */}
                <div className="space-y-3">
                  <MockOfferCard name="Hiscox" tag="best price" price="95€" recommended />
                  <MockOfferCard name="Allianz Pro" tag="premium" price="180€" />
                  <MockOfferCard name="MMA Pro" tag="standard" price="250€" />
                </div>

                {/* Footer mock */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-white/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" strokeWidth={2.4} />
                    Devis sous 24h
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                    Sans engagement
                  </span>
                </div>
              </div>

              {/* Badge flottant -32% — anim float subtle */}
              <div
                className="float-anim absolute -right-4 -top-4 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 px-3.5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-glow-clay"
                style={{ ['--rot' as string]: '6deg', transform: 'rotate(6deg)' }}
              >
                -32% économie moy.
              </div>

              {/* Badge ORIAS flottant */}
              <div
                className="float-anim absolute -bottom-3 -left-3 rounded-xl bg-white/95 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider text-charcoal-900 shadow-premium backdrop-blur-sm"
                style={{
                  ['--rot' as string]: '-3deg',
                  transform: 'rotate(-3deg)',
                  animationDelay: '1.5s',
                }}
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent-600" strokeWidth={2.4} />
                  ORIAS · ACPR
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TrustBadgesRow conservé (logos partenaires inline) */}
      <TrustBadgesRow />

      {/* Trust indicators row — extraits du hero (Hiscox-grade restraint) */}
      <section className="bg-charcoal-900 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md md:grid-cols-4">
            {TRUST_INDICATORS.map((t, i) => (
              <RevealOnScroll key={t.label} delay={i * 80}>
                <div className="bg-charcoal-900/30 px-5 py-5 backdrop-blur-md">
                  <t.Icon className="mb-2 h-5 w-5 text-secondary-300" strokeWidth={2.4} />
                  <div className="font-heading text-3xl font-extrabold tabular-nums tracking-tight text-white md:text-4xl">
                    <CountUp value={t.value} suffix={t.suffix} duration={1600} />
                  </div>
                  <div className="mt-1 text-xs font-medium text-white/75 md:text-sm">{t.label}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          VERTICALES — Bento box asymétrique
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="verticaux" className="relative bg-sand-50 py-20 dark:bg-charcoal-950 md:py-28">
        <ScrollProgressSection className="container mx-auto max-w-6xl px-4">
          {/* Eyebrow + heading */}
          <RevealOnScroll translateY={28}>
            <div className="mb-14 max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
                <Sparkles className="h-3.5 w-3.5" />
                17 verticaux couverts
              </div>
              <h2 className="mb-4 font-heading text-4xl font-extrabold leading-tight tracking-display text-charcoal-900 md:text-5xl">
                Une assurance adaptée
                <br />
                <span className="text-primary-600">à votre métier</span>
              </h2>
              <p className="text-lg text-charcoal-600">
                Notre cabinet intervient sur l'ensemble des verticaux professionnels en France
                métropolitaine, des artisans BTP aux ESN cyber.
              </p>
            </div>
          </RevealOnScroll>

          {/* Bento grid asymétrique avec photos pros — mount cascade + reveal au scroll */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {VERTICALS.map((v, idx) => (
              <RevealOnScroll
                key={v.code}
                delay={idx * 70}
                translateY={32}
                className={v.span ?? ''}
              >
                <Link
                  href={v.href}
                  className={`mount-fade-up group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sand-300 bg-white transition-all duration-500 hover:-translate-y-0.5 hover:border-primary-200`}
                >
                  {/* Illustration SVG sur-mesure — aspect 16/9 (DESIGN.md Atelier Premium) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand-100">
                    <IllustrationForMetier
                      slug={v.metierSlug}
                      accent="primary"
                      className="absolute inset-0 h-full w-full p-8"
                      ariaLabel={v.imageAlt}
                    />
                    {/* Overlay gradient bas pour lisibilité icon + badge sur line-art clair */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/65 via-charcoal-900/0 to-transparent"
                      aria-hidden="true"
                    />
                    {/* Icon + badge overlay bottom */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${v.accent} text-white shadow-card-hover ring-2 ring-white/40 transition-transform duration-300 group-hover:scale-110`}
                      >
                        <v.Icon className="h-5 w-5" strokeWidth={2.4} />
                      </div>
                      {v.badge && (
                        <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal-900 backdrop-blur-sm">
                          {v.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Glow on hover */}
                  <div
                    className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${v.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="relative flex flex-1 flex-col p-6">
                    <h3 className="mb-2 font-heading text-2xl font-bold text-charcoal-900">
                      {v.title}
                    </h3>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-charcoal-600">
                      {v.desc}
                    </p>

                    <div className="flex items-center justify-between border-t border-charcoal-100 pt-4">
                      <span className="text-xs font-semibold text-charcoal-500">{v.metric}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 transition-transform group-hover:translate-x-1">
                        Découvrir
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </ScrollProgressSection>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROCESS — 3 étapes timeline
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-28 md:py-40">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-700">
              <Award className="h-3.5 w-3.5" />
              Process certifié DDA · ACPR
            </div>
            <h2 className="font-heading text-4xl font-extrabold tracking-display text-charcoal-900 md:text-5xl">
              3 étapes, <span className="text-primary-600">moins de 24 heures</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-600">
              Un processus transparent, conforme à la Directive Distribution Assurance. Pas
              d'engagement, pas de frais cachés.
            </p>
          </div>

          {/* Steps — Editorial asymétrique (DESIGN.md Atelier Premium) */}
          <EditorialProcessSteps steps={PROCESS_STEPS} />
        </div>
      </section>

      {/* BIG STATS BLOCK — Alan/Lemonade XL style */}
      <BigStatsBlock />

      {/* TRANSPARENCY WIDGET — Lemonade-style "où va votre cotisation" donut */}
      <TransparencyWidget />

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS — Cards avec quote + rating + metric
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-sand-100 py-20 dark:bg-charcoal-900 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-14 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-800">
              <Star className="h-3.5 w-3.5 fill-current" />
              4,9 sur 5 — 142 avis vérifiés ISO 20488
            </div>
            <h2 className="font-heading text-4xl font-extrabold tracking-display text-charcoal-900 md:text-5xl">
              Ce que disent
              <br />
              <span className="text-primary-600">les pros qu'on accompagne</span>
            </h2>
          </div>

          {/* Témoignages éditoriaux Fraunces — DESIGN.md anti-pattern stock photos */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <RevealOnScroll key={t.author} delay={i * 120} translateY={36}>
                <EditorialTestimonial
                  quote={t.quote}
                  author={t.author}
                  role={t.role}
                  city={t.city}
                  rating={t.rating}
                  metric={t.metric}
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PARTENAIRES — Logos grayscale → color hover
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="mb-3 font-heading text-2xl font-bold text-charcoal-900 md:text-3xl">
            Nos partenaires assureurs
          </h2>
          <p className="mb-10 text-charcoal-600">
            10+ compagnies reconnues, sélectionnées sur leur solidité financière et la qualité de
            leur service sinistres.
          </p>

          {/* Marquee infini — défilement seamless type Vercel/Stripe */}
          <div
            className="marquee"
            style={{ '--marquee-duration': '40s', '--marquee-gap': '2rem' } as React.CSSProperties}
            role="marquee"
            aria-label="Logos assureurs partenaires"
          >
            {[0, 1].map((dup) => (
              <div key={dup} className="marquee__track" aria-hidden={dup === 1}>
                {ASSUREURS.map((p) => (
                  <div
                    key={`${dup}-${p.name}`}
                    className="group flex flex-shrink-0 items-center gap-3 rounded-xl border border-charcoal-100 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-charcoal-200 hover:shadow-soft"
                    title={p.name}
                  >
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg font-heading text-sm font-extrabold text-white transition-transform group-hover:scale-110"
                      style={{ backgroundColor: p.color }}
                      aria-hidden="true"
                    >
                      {p.initials}
                    </span>
                    <span className="font-heading text-sm font-bold text-charcoal-800 transition-colors group-hover:text-charcoal-900">
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT IMAGE + TEXT — humanise marque (avant CTA final) */}
      <section className="bg-white py-28 md:py-40">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-premium">
              <Image
                src={HERO_PHOTOS.poignee.src}
                alt={HERO_PHOTOS.poignee.alt}
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent p-6">
                <p className="font-display-premium text-lg italic text-white md:text-xl">
                  « Un courtier qui prend le téléphone le jour du sinistre. »
                </p>
              </div>
            </div>
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-secondary-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-secondary-800">
                Engagement courtage
              </span>
              <h2 className="mb-5 font-display-premium font-heading text-3xl font-extrabold leading-tight tracking-tight text-charcoal-900 md:text-4xl">
                Pas un numéro vert.
                <br />
                <span className="text-primary-700">Un courtier ORIAS nommé.</span>
              </h2>
              <p className="mb-6 text-base leading-relaxed text-charcoal-700 md:text-lg">
                Conseil motivé conforme art. L. 521-4 du Code des assurances. Comparaison négociée
                sur 10+ assureurs partenaires. Accompagnement sinistre à vos côtés — pas un script,
                un humain.
              </p>
              <ul className="space-y-3 text-sm text-charcoal-700">
                <li className="flex items-start gap-3">
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="text-charcoal-900">Conseil motivé écrit</strong> — vous savez
                    pourquoi on vous propose ce contrat.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Award
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-600"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="text-charcoal-900">Zéro frais de courtage</strong> —
                    rémunérés par les assureurs, pas vous.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="text-charcoal-900">Accompagnement sinistre</strong> —
                    courtier nommé, joignable, qui négocie avec l'assureur.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL — DESIGN.md Atelier Premium (grain + premium-terra shadow) */}
      <DevisCTASection
        title="Prêt à comparer votre assurance pro ?"
        subtitle={
          IS_PRE_ORIAS
            ? "Cabinet en cours d'immatriculation ORIAS. Rejoignez la liste d'attente pour être prévenu(e) dès l'ouverture commerciale."
            : 'Devis gratuit, sans engagement. Notre courtier ORIAS vous recontacte avec 3 offres personnalisées en moins de 24 heures.'
        }
        primaryCta={{ label: CTA_TEXTS.start, href: '/devis' }}
        secondaryCta={{ label: 'Parler à un conseiller', href: '/contact' }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          DDA Disclaimer — mention légale
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-sand-100 py-6 text-xs text-charcoal-500">
        <div className="container mx-auto max-w-5xl px-4">
          <p>
            <strong className="text-charcoal-700">Information précontractuelle —</strong> Ce contenu
            est informatif et ne constitue pas un conseil personnalisé au sens de l'article
            L.&nbsp;521-4 du Code des assurances. Pour un conseil adapté à votre situation, un
            courtier ORIAS vous recontactera après réception de votre demande de devis. Aucune
            commission n'est facturée à nos clients ; nous sommes rémunérés par les compagnies
            d'assurance partenaires.
          </p>
        </div>
      </section>
    </>
  )
}
