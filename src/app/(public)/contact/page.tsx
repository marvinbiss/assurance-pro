import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PAGE_PHOTOS } from '@/lib/data/photo-library'
import {
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  FileWarning,
  Lock,
  Scale,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { SITE_URL } from '@/lib/seo/config'
import { CTA_TEXTS } from '@/lib/config/pre-orias'

export const metadata: Metadata = {
  title: 'Contact — Cabinet de courtage ORIAS',
  description:
    'Contactez notre cabinet de courtage ORIAS. Téléphone, email, réclamations ACPR, données personnelles RGPD. Réponse sous 24 h ouvrées.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact — Cabinet de courtage ORIAS',
    description:
      'Conseil personnalisé, gestion contrats, sinistres, réclamations. Réponse sous 24 h ouvrées.',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Cabinet de courtage ORIAS',
    description:
      'Conseil personnalisé, gestion contrats, sinistres, réclamations. Réponse sous 24 h ouvrées.',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      {/* Hero */}
      <section className="noise-overlay relative overflow-hidden bg-charcoal-900 py-16 text-white md:py-24">
        <Image
          src={PAGE_PHOTOS.contact.src}
          alt={PAGE_PHOTOS.contact.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-80" />
        <div
          className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-secondary-400/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary-700/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="container relative mx-auto max-w-6xl px-4">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 flex items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-white">Contact</span>
          </nav>

          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-secondary-300" strokeWidth={2.4} />
            Cabinet ORIAS &middot; Réponse sous 24 h
          </span>
          <h1 className="mb-5 max-w-3xl font-display-premium font-heading text-4xl font-extrabold leading-[1.05] tracking-display sm:text-5xl md:text-6xl">
            Parlons de votre
            <br />
            <span className="text-secondary-200">situation pro.</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/85 md:text-xl">
            Conseil personnalisé, gestion contrats, sinistres et réclamations. Notre équipe vous
            répond sous 24 heures ouvrées, sans engagement.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
              Lun–Ven 9h–19h
            </span>
            <span className="hidden text-white/30 sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
              Réclamations conformes ACPR 2024-R-02
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-14">
        {/* Channels grid premium */}
        <section className="mb-14">
          <header className="mb-8">
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
              Canaux directs
            </span>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
              Choisissez votre canal préféré
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Téléphone */}
            <a
              href="tel:+33182885127"
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-charcoal-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-premium"
            >
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700"
                aria-hidden="true"
              />
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-glow-clay transition-transform group-hover:scale-110">
                <Phone className="h-7 w-7 text-white" strokeWidth={2.4} />
              </div>
              <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
                Téléphone
              </p>
              <p className="mb-2 font-heading text-2xl font-extrabold tabular-nums tracking-tight text-charcoal-900">
                01 82 88 51 27
              </p>
              <p className="mb-5 flex-1 text-sm text-charcoal-600">
                Conseiller ORIAS dédié. Lundi–vendredi 9h–19h. Sans engagement.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 transition-transform group-hover:translate-x-1">
                Appeler maintenant
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:contact@vivos-assurance.fr"
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-charcoal-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-secondary-200 hover:shadow-premium"
            >
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary-500 to-secondary-700"
                aria-hidden="true"
              />
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-700 shadow-soft transition-transform group-hover:scale-110">
                <Mail className="h-7 w-7 text-white" strokeWidth={2.4} />
              </div>
              <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
                Email général
              </p>
              <p className="mb-2 break-all font-heading text-lg font-extrabold tracking-tight text-charcoal-900">
                contact@vivos-assurance.fr
              </p>
              <p className="mb-5 flex-1 text-sm text-charcoal-600">
                Questions, conseil produit, partenariat. Réponse sous 24 h ouvrées.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary-700 transition-transform group-hover:translate-x-1">
                Écrire un email
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </span>
            </a>

            {/* Devis / préinscription */}
            <Link
              href="/devis"
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-charcoal-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-premium"
            >
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-500 to-accent-700"
                aria-hidden="true"
              />
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-soft transition-transform group-hover:scale-110">
                <CheckCircle2 className="h-7 w-7 text-white" strokeWidth={2.4} />
              </div>
              <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
                Demande de devis
              </p>
              <p className="mb-2 font-heading text-xl font-extrabold tracking-tight text-charcoal-900">
                Comparez 10 assureurs
              </p>
              <p className="mb-5 flex-1 text-sm text-charcoal-600">
                Devis personnalisés en 24 heures, sans engagement, sans frais courtage.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-accent-700 transition-transform group-hover:translate-x-1">
                {CTA_TEXTS.short}
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </span>
            </Link>
          </div>
        </section>

        {/* Réclamations + RGPD en 2 colonnes */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Réclamations */}
          <article className="overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft">
            <div className="flex items-start gap-4 border-b border-charcoal-100 bg-gradient-to-br from-amber-50 to-white p-7">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-soft">
                <FileWarning className="h-6 w-6 text-white" strokeWidth={2.4} />
              </span>
              <div className="flex-1">
                <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-amber-700">
                  Réclamations
                </p>
                <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900">
                  Un litige ou une insatisfaction&nbsp;?
                </h2>
              </div>
            </div>

            <div className="p-7">
              <p className="mb-5 text-sm leading-relaxed text-charcoal-700">
                Pour toute réclamation, écrivez-nous à&nbsp;:
              </p>
              <a
                href="mailto:reclamations@vivos-assurance.fr"
                className="mb-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-amber-200 bg-amber-50/60 px-5 py-3 font-bold text-amber-800 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50"
              >
                <Mail className="h-4 w-4" strokeWidth={2.4} />
                reclamations@vivos-assurance.fr
              </a>

              <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50/40 p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-800">
                  <AlertCircle className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Reco ACPR 2024-R-02
                </p>
                <ul className="space-y-2 text-sm text-charcoal-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-700"
                      strokeWidth={2.4}
                    />
                    <span>
                      Accusé réception sous <strong>10 jours ouvrés</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-700"
                      strokeWidth={2.4}
                    />
                    <span>
                      Réponse au fond sous <strong>2 mois maximum</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-700"
                      strokeWidth={2.4}
                    />
                    <span>Information à chaque étape</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-charcoal-100 bg-sand-50/60 p-4 text-xs leading-relaxed text-charcoal-700">
                <Scale
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-charcoal-600"
                  strokeWidth={2.4}
                />
                <p>
                  En cas de désaccord persistant, vous pouvez saisir le{' '}
                  <a
                    href="https://www.mediation-assurance.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-primary-700 underline-offset-2 hover:underline"
                  >
                    Médiateur de l&apos;Assurance
                  </a>{' '}
                  (TSA 50110, 75441 Paris cedex 09).
                </p>
              </div>
            </div>
          </article>

          {/* RGPD */}
          <article className="overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft">
            <div className="flex items-start gap-4 border-b border-charcoal-100 bg-gradient-to-br from-accent-50 to-white p-7">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-soft">
                <Lock className="h-6 w-6 text-white" strokeWidth={2.4} />
              </span>
              <div className="flex-1">
                <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-accent-700">
                  RGPD &middot; Article 7
                </p>
                <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900">
                  Vos données personnelles
                </h2>
              </div>
            </div>

            <div className="p-7">
              <p className="mb-5 text-sm leading-relaxed text-charcoal-700">
                Les données personnelles que vous nous transmettez sont traitées par notre cabinet
                en qualité de <strong>responsable de traitement</strong>, aux fins de répondre à
                votre demande et de vous présenter une offre d&apos;assurance adaptée.
              </p>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-accent-100 bg-accent-50/40 p-4">
                  <p className="mb-1 text-[10px] font-extrabold uppercase tracking-wider text-accent-700">
                    Conservation
                  </p>
                  <p className="font-heading text-lg font-extrabold text-charcoal-900">3 ans</p>
                  <p className="text-[11px] text-charcoal-600">après dernier contact</p>
                </div>
                <div className="rounded-xl border border-accent-100 bg-accent-50/40 p-4">
                  <p className="mb-1 text-[10px] font-extrabold uppercase tracking-wider text-accent-700">
                    Hébergement
                  </p>
                  <p className="font-heading text-lg font-extrabold text-charcoal-900">UE</p>
                  <p className="text-[11px] text-charcoal-600">jamais revendues</p>
                </div>
              </div>

              <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
                Vos droits (accès, rectification, effacement&hellip;)
              </p>
              <a
                href="mailto:dpo@vivos-assurance.fr"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-accent-200 bg-accent-50/60 px-5 py-3 font-bold text-accent-800 transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:bg-accent-50"
              >
                <Mail className="h-4 w-4" strokeWidth={2.4} />
                dpo@vivos-assurance.fr
              </a>

              <p className="mt-4 text-xs text-charcoal-600">
                Vous pouvez également adresser une réclamation à la{' '}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary-700 underline-offset-2 hover:underline"
                >
                  CNIL
                </a>
                .
              </p>
            </div>
          </article>
        </section>

        {/* Adresse + horaires */}
        <section className="mt-14 overflow-hidden rounded-3xl border border-charcoal-100 bg-white p-8 shadow-soft md:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-50">
                <MapPin className="h-6 w-6 text-primary-700" strokeWidth={2.4} />
              </span>
              <div>
                <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
                  Adresse du cabinet
                </p>
                <p className="font-heading text-lg font-extrabold text-charcoal-900">
                  {process.env.NEXT_PUBLIC_LEGAL_ADDRESS ??
                    "Cabinet en Île-de-France (adresse précise publiée à l'attribution ORIAS)"}
                </p>
                <p className="mt-1 text-sm text-charcoal-600">Sur rendez-vous uniquement.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-secondary-50">
                <Clock className="h-6 w-6 text-secondary-700" strokeWidth={2.4} />
              </span>
              <div>
                <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
                  Horaires d&apos;ouverture
                </p>
                <p className="font-heading text-lg font-extrabold text-charcoal-900">
                  Lun&ndash;Ven · 9h&ndash;19h
                </p>
                <p className="mt-1 text-sm text-charcoal-600">
                  Hors jours fériés. Réponse email sous 24 h ouvrées.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
