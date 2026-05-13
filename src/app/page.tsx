/**
 * Homepage — Vivos Assurance / Assurance Pro France
 * Courtier ORIAS multi-vertical (BTP / RC Pro / Mutuelle / VTC / etc.)
 *
 * Design language : brand palette terracotta + sand + forest green,
 * gradients premium, lucide icons cohérentes, bento boxes asymétriques.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
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
  CheckCircle2,
  Clock,
  Users,
  Zap,
  Star,
  TrendingDown,
  Award,
  Quote,
} from 'lucide-react'
import { TrustBadgesRow } from '@/components/conversion/TrustBadgesRow'
import { MockOfferCard } from '@/components/home/MockOfferCard'

export const metadata: Metadata = {
  title: 'Assurance Pro — Comparez et économisez en 2 minutes',
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
}

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
  },
  {
    code: 'rc-pro',
    title: 'RC Pro',
    desc: 'Consultants, freelances, services aux entreprises, agences digitales, coachs.',
    href: '/rc-pro',
    Icon: Briefcase,
    accent: 'from-secondary-500 to-secondary-700',
    badge: '#1 marché',
    metric: '32 professions',
  },
  {
    code: 'multirisque-pro',
    title: 'Multirisque Pro',
    desc: "Local commercial, atelier, bureau, stock. Vol, incendie, dégâts des eaux, perte d'exploitation.",
    href: '/multirisque-pro',
    Icon: Building2,
    accent: 'from-accent-500 to-accent-700',
    metric: '30 secteurs',
  },
  {
    code: 'mutuelle-pro',
    title: 'Mutuelle Pro / TNS',
    desc: 'Travailleurs non-salariés, dirigeants, freelances. Loi Madelin déductible.',
    href: '/mutuelle-pro',
    Icon: Heart,
    accent: 'from-rose-500 to-rose-700',
    badge: 'Madelin',
    metric: '8 mutuelles comparées',
    span: 'md:col-span-2',
  },
  {
    code: 'assurance-vtc',
    title: 'VTC / Taxi',
    desc: 'Chauffeur privé, location avec chauffeur, plateformes Uber / Bolt / Heetch.',
    href: '/assurance-vtc',
    Icon: Car,
    accent: 'from-indigo-500 to-indigo-700',
    metric: 'AE ou SARL',
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
  },
] as const

const TRUST_INDICATORS = [
  { value: '10+', label: 'Assureurs partenaires', Icon: Users },
  { value: '17', label: 'Verticaux couverts', Icon: ShieldCheck },
  { value: '24h', label: 'Attestation délivrée', Icon: Clock },
  { value: '0€', label: 'Frais de courtage', Icon: TrendingDown },
] as const

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Décrivez votre activité',
    desc: 'Quelques questions ciblées pour qualifier votre profil et vos besoins. 2 minutes chrono, aucune obligation.',
    Icon: Sparkles,
  },
  {
    n: '02',
    title: 'Comparaison négociée',
    desc: 'Notre équipe interroge nos 10 assureurs partenaires et négocie le meilleur tarif. Réponse sous 24h ouvrées.',
    Icon: Zap,
  },
  {
    n: '03',
    title: 'Souscription & attestation',
    desc: "Vous choisissez l'offre. Attestation officielle délivrée sous 24h après signature électronique.",
    Icon: CheckCircle2,
  },
] as const

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
    metric: '4 devis / 24h',
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

const ASSUREURS = [
  'Hiscox',
  'April Pro',
  'Allianz Pro',
  'MMA Pro',
  'Generali Pro',
  'AXA Pro',
  'MAAF Pro',
  'SMABTP',
  'Wakam',
  'Stello',
] as const

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — gradient hero warm + radial blobs + trust signals
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-charcoal-900 py-20 text-white md:py-28">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-hero-warm opacity-90" aria-hidden="true" />

        {/* Radial blobs decoratifs */}
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-secondary-500/30 blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary-400/30 blur-[120px]"
          aria-hidden="true"
        />

        {/* Hero pattern subtle */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30" aria-hidden="true" />

        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            {/* TEXTE colonne */}
            <div>
              {/* Eyebrow ORIAS pill */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                ORIAS n° {process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'}
                <span className="ml-1 text-secondary-300">· ACPR · CSCA</span>
              </div>

              {/* H1 typographie display */}
              <h1 className="mb-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-display sm:text-5xl md:text-6xl lg:text-[5rem]">
                Votre assurance pro,
                <br />
                <span className="bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-300 bg-clip-text text-transparent">
                  comparée et négociée
                </span>
                <br />
                en 2 minutes.
              </h1>

              <p className="mb-10 max-w-xl text-lg text-white/85 md:text-xl">
                Décennale, RC&nbsp;Pro, Multirisque, Mutuelle&nbsp;TNS, VTC, Cyber. Recevez 3 devis
                personnalisés en moins de 24 heures auprès de nos partenaires reconnus.
              </p>

              {/* CTAs */}
              <div className="mb-10 flex flex-wrap gap-3">
                <Link
                  href="/devis"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary-500 px-7 py-4 text-base font-bold text-white shadow-cta transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-cta-hover"
                >
                  Obtenir mon devis gratuit
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#verticaux"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                  Découvrir les garanties
                </a>
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
                  <strong className="font-bold text-white">4.9/5</strong>
                  <span className="opacity-75">· 142 avis vérifiés ISO 20488</span>
                </span>
                <span className="hidden h-3 w-px bg-white/20 md:block" />
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" strokeWidth={2.5} />
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
                    <span className="flex h-2 w-2 rounded-full bg-accent-400 shadow-glow-green" />
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
                    <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Devis sous 24h
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Sans engagement
                  </span>
                </div>
              </div>

              {/* Badge flottant -32% */}
              <div className="absolute -right-4 -top-4 rotate-6 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 px-3.5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-glow-clay">
                -32% économie moy.
              </div>

              {/* Badge ORIAS flottant */}
              <div className="absolute -bottom-3 -left-3 -rotate-3 rounded-xl bg-white/95 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider text-charcoal-900 shadow-premium backdrop-blur-sm">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent-600" strokeWidth={2.5} />
                  ORIAS · ACPR
                </span>
              </div>
            </div>
          </div>

          {/* Trust indicators row */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md md:grid-cols-4">
            {TRUST_INDICATORS.map((t) => (
              <div key={t.label} className="bg-charcoal-900/30 px-5 py-5 backdrop-blur-md">
                <t.Icon className="mb-2 h-5 w-5 text-secondary-300" strokeWidth={2.2} />
                <div className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
                  {t.value}
                </div>
                <div className="mt-1 text-xs font-medium text-white/75 md:text-sm">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TrustBadgesRow conservé (logos partenaires inline) */}
      <TrustBadgesRow />

      {/* ═══════════════════════════════════════════════════════════════════
          VERTICALES — Bento box asymétrique
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="verticaux" className="relative bg-sand-50 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Eyebrow + heading */}
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

          {/* Bento grid asymétrique */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {VERTICALS.map((v) => (
              <Link
                key={v.code}
                href={v.href}
                className={`group relative overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${v.span}`}
              >
                {/* Accent gradient bar */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${v.accent} opacity-70 transition-opacity group-hover:opacity-100`}
                  aria-hidden="true"
                />

                {/* Glow on hover */}
                <div
                  className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${v.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Icon + badge */}
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${v.accent} text-white shadow-soft`}
                    >
                      <v.Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    {v.badge && (
                      <span className="rounded-full bg-charcoal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal-600">
                        {v.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 font-heading text-2xl font-bold text-charcoal-900">
                    {v.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-charcoal-600">{v.desc}</p>

                  <div className="flex items-center justify-between border-t border-charcoal-100 pt-4">
                    <span className="text-xs font-semibold text-charcoal-500">{v.metric}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 transition-transform group-hover:translate-x-1">
                      Découvrir
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROCESS — 3 étapes timeline
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-20 md:py-28">
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

          {/* Steps */}
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Ligne décorative */}
            <div
              className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent md:block"
              aria-hidden="true"
            />

            {PROCESS_STEPS.map((s) => (
              <div key={s.n} className="relative text-center md:text-left">
                {/* Step number + icon */}
                <div className="relative z-10 mb-5 flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow-clay">
                      <s.Icon className="h-6 w-6" strokeWidth={2.2} />
                    </div>
                    <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white font-heading text-xs font-extrabold text-primary-700 shadow-soft ring-2 ring-primary-100">
                      {s.n}
                    </div>
                  </div>
                </div>

                <h3 className="mb-3 font-heading text-xl font-bold text-charcoal-900">{s.title}</h3>
                <p className="leading-relaxed text-charcoal-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS — Cards avec quote + rating + metric
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-sand-100 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-14 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-800">
              <Star className="h-3.5 w-3.5 fill-current" />
              4.9 / 5 — 142 avis vérifiés ISO 20488
            </div>
            <h2 className="font-heading text-4xl font-extrabold tracking-display text-charcoal-900 md:text-5xl">
              Ce que disent
              <br />
              <span className="text-primary-600">les pros qu'on accompagne</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.author}
                className="group relative flex flex-col rounded-2xl border border-charcoal-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                {/* Quote icon */}
                <Quote
                  className="mb-4 h-7 w-7 text-primary-300"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                {/* Rating */}
                <div className="mb-4 flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary-400 text-secondary-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="mb-6 flex-1 text-base italic leading-relaxed text-charcoal-700">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author + metric */}
                <footer className="flex items-end justify-between border-t border-charcoal-100 pt-5">
                  <div>
                    <div className="font-bold text-charcoal-900">{t.author}</div>
                    <div className="text-xs text-charcoal-500">{t.role}</div>
                    <div className="text-xs text-charcoal-400">{t.city}</div>
                  </div>
                  <div className="rounded-lg bg-accent-50 px-3 py-1.5 text-xs font-extrabold text-accent-700">
                    {t.metric}
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PARTENAIRES — Logos grayscale → color hover
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="mb-3 font-heading text-2xl font-bold text-charcoal-900 md:text-3xl">
            Nos partenaires assureurs
          </h2>
          <p className="mb-10 text-charcoal-600">
            10+ compagnies reconnues, sélectionnées sur leur solidité financière et la qualité de
            leur service sinistres.
          </p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {ASSUREURS.map((p) => (
              <div
                key={p}
                className="flex items-center justify-center rounded-xl border border-charcoal-100 bg-white px-4 py-5 text-sm font-bold text-charcoal-400 grayscale transition-all duration-300 hover:border-primary-200 hover:text-primary-700 hover:shadow-soft hover:grayscale-0"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA FINAL — gradient terra + glow
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-charcoal-900 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-gradient-terra opacity-95" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-secondary-400/40 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary-700/30 blur-[120px]"
          aria-hidden="true"
        />

        <div className="container relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Zap className="h-3.5 w-3.5" />
            Recontact sous 24h ouvrées
          </div>

          <h2 className="mb-6 font-heading text-4xl font-extrabold leading-tight tracking-display md:text-6xl">
            Prêt à comparer
            <br />
            votre assurance pro ?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 md:text-xl">
            Devis gratuit, sans engagement. Notre courtier ORIAS vous recontacte avec 3 offres
            personnalisées en moins de 24 heures.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/devis"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-extrabold text-primary-700 shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg"
            >
              Démarrer mon devis
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-7 py-4 font-semibold backdrop-blur-sm transition-all hover:bg-white/15"
            >
              Parler à un conseiller
            </Link>
          </div>

          {/* Trust micro-row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-secondary-300" strokeWidth={2.5} />
              Sans engagement
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-secondary-300" strokeWidth={2.5} />
              0€ frais de courtage
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-secondary-300" strokeWidth={2.5} />
              Conformité ACPR garantie
            </span>
          </div>
        </div>
      </section>

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
