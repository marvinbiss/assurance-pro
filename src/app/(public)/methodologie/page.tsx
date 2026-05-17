import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  GitBranch,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { SITE_URL } from '@/lib/seo/config'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import Image from 'next/image'
import { BRAND_VOICE } from '@/lib/brand/brand-voice'
import { BrandOrnament } from '@/components/brand/brand-ornament'
import { HERO_PHOTOS } from '@/lib/data/photo-library'

export const metadata: Metadata = {
  title: 'Méthodologie éditoriale — sources, fact-checking, mise à jour',
  description:
    'Comment Vivos Assurance rédige, vérifie et met à jour ses articles : sources légales (Légifrance, ACPR, AQC, FFA), processus de fact-checking, validation ORIAS, calendrier de révision.',
  alternates: { canonical: `${SITE_URL}/methodologie` },
}

const PRINCIPLES: Array<{ Icon: typeof ShieldCheck; title: string; body: string }> = [
  {
    Icon: ShieldCheck,
    title: 'Sources légales primaires',
    body: 'Chaque article cite a minima un texte de loi (Légifrance), une décision ACPR, ou une étude sectorielle (AQC SYCODÉS, FFA, AMRAE). Pas de sources secondaires non vérifiables.',
  },
  {
    Icon: Users,
    title: 'Validation courtier ORIAS',
    body: "Tous les contenus YMYL (Your Money Your Life) sont relus par un courtier inscrit ORIAS avant publication. Le nom du valideur est mentionné dans la bio de fin d'article.",
  },
  {
    Icon: RefreshCw,
    title: 'Calendrier de révision',
    body: 'Articles réglementaires : revue tous les 6 mois. Articles tarifs : revue trimestrielle (Q1, Q2, Q3, Q4). Sinistralité : annuelle après publication AQC. La date `updatedAt` reflète la dernière révision substantielle.',
  },
  {
    Icon: FileText,
    title: 'Citations vérifiables',
    body: 'Chaque chiffre, taux ou article de loi mentionné est associé à un lien externe vers la source officielle. Pas de chiffre sans source.',
  },
  {
    Icon: GitBranch,
    title: 'Versioning Git transparent',
    body: "Le code source des articles est versionné Git. Toute modification substantielle (correction d'erreur, nouvelle réglementation) crée un commit traçable.",
  },
  {
    Icon: ScrollText,
    title: 'Conseil motivé conforme L. 521-4',
    body: 'Nos analyses respectent les exigences du Code des assurances (art. L. 521-4) : conseil motivé, recommandation conforme aux exigences exprimées, transparence sur les rémunérations.',
  },
]

const PROCESS_STEPS: Array<{ title: string; body: string }> = [
  {
    title: 'Recherche keyword + validation Ahrefs',
    body: 'Avant rédaction, le sujet est validé sur trois critères : volume de recherche réel (Ahrefs), difficulté SEO compatible avec notre autorité, intention de recherche cohérente avec notre offre.',
  },
  {
    title: 'Veille réglementaire & sectorielle',
    body: 'Recension des sources primaires : textes Légifrance applicables, recommandations ACPR (FAQ courtage, R-02 réclamations), études sectorielles récentes (AQC, FFA, AMRAE, AMF).',
  },
  {
    title: 'Rédaction structurée par courtier ORIAS',
    body: 'Plan H2 imposé : rappel cadre légal, chiffres-clés, garanties, exclusions courantes, tarifs, FAQ. Chaque section cite au moins une source. Format Inverted Pyramid + Skim-friendly.',
  },
  {
    title: 'Fact-checking croisé',
    body: 'Relecture par un second courtier ORIAS ou un partenaire expert (avocat spécialisé, expert AQC selon le sujet). Chaque chiffre est vérifié sur la source officielle. Aucune publication sans validation.',
  },
  {
    title: 'Schema JSON-LD + signaux E-E-A-T',
    body: 'Avant mise en ligne : BlogPosting + FAQPage + auteur Person schema avec ORIAS, sources marquées rel=external. Vérification Rich Results Google.',
  },
  {
    title: 'Monitoring & mise à jour',
    body: "Suivi mensuel des positions Search Console. Mise à jour déclenchée par : changement réglementaire majeur, publication d'un rapport sectoriel actualisé, signal SERP de fraîcheur attendue par Google.",
  },
]

export default function MethodologiePage() {
  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <BreadcrumbSchema items={[{ label: 'Méthodologie éditoriale' }]} />

      <section className="noise-overlay relative overflow-hidden bg-charcoal-900 py-16 text-white md:py-24">
        <Image
          src={HERO_PHOTOS.bureau.src}
          alt={HERO_PHOTOS.bureau.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-80" />
        <div className="container relative mx-auto max-w-4xl px-4">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-5 flex items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-white">Méthodologie éditoriale</span>
          </nav>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <ShieldCheck
              className="h-3.5 w-3.5 text-secondary-300"
              strokeWidth={2.4}
              aria-hidden="true"
            />
            Transparence E-E-A-T YMYL
          </span>
          <h1 className="mb-5 font-display-premium font-heading text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Comment nous écrivons,
            <br />
            <span className="text-secondary-200">vérifions et mettons à jour</span>
          </h1>
          <p className="max-w-3xl text-lg text-white/85 md:text-xl">
            Vivos Assurance publie du contenu YMYL (Your Money Your Life) qui peut influencer des
            décisions financières et juridiques. Notre méthodologie est documentée publiquement.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-16">
        <header className="mb-10">
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700 dark:text-primary-300">
            <BookOpen className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />6 principes
            éditoriaux
          </span>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 dark:text-white md:text-3xl">
            Nos engagements éditoriaux
          </h2>
        </header>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft dark:border-charcoal-800 dark:bg-charcoal-900"
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-soft">
                <p.Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              </span>
              <h3 className="mb-2 font-heading text-base font-extrabold tracking-tight text-charcoal-900 dark:text-white">
                {p.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-charcoal-700 dark:text-charcoal-300">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <header className="mb-10">
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700 dark:text-primary-300">
            <GitBranch className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
            Notre processus
          </span>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 dark:text-white md:text-3xl">
            De l&apos;idée à la publication
          </h2>
        </header>
        <ol className="space-y-6">
          {PROCESS_STEPS.map((step, i) => (
            <li key={i} className="relative flex gap-5">
              {i < PROCESS_STEPS.length - 1 && (
                <span
                  className="absolute left-5 top-12 h-[calc(100%-2rem)] w-0.5 bg-gradient-to-b from-primary-300 to-primary-100 dark:from-primary-700 dark:to-primary-900"
                  aria-hidden="true"
                />
              )}
              <span
                className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-sm font-extrabold text-white shadow-soft"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="flex-1 pt-1">
                <h3 className="mb-2 font-heading text-lg font-extrabold text-charcoal-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-[16px] leading-relaxed text-charcoal-700 dark:text-charcoal-300">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Voix éditoriale charter */}
      <section className="container mx-auto max-w-4xl px-4 py-16">
        <div className="mb-8 flex justify-center">
          <BrandOrnament variant="minimal" />
        </div>
        <header className="mb-8 text-center">
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
            <ScrollText className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
            Voix éditoriale
          </span>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
            Comment nous écrivons
          </h2>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-secondary-200 bg-secondary-50/50 p-7">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-wider text-secondary-800">
              Nous faisons
            </p>
            <ul className="space-y-2.5">
              {BRAND_VOICE.do.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-charcoal-800">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-700"
                    strokeWidth={2.6}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-charcoal-200 bg-charcoal-50/60 p-7">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-wider text-charcoal-700">
              Nous évitons
            </p>
            <ul className="space-y-2.5">
              {BRAND_VOICE.dont.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-charcoal-700">
                  <span
                    className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-charcoal-400"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-3xl border border-charcoal-100 bg-white p-10 shadow-soft dark:border-charcoal-800 dark:bg-charcoal-900">
          <header className="mb-6">
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-secondary-700 dark:text-secondary-300">
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
              Erreur signalée ?
            </span>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 dark:text-white md:text-3xl">
              Politique de correction
            </h2>
          </header>
          <p className="mb-6 text-[16px] leading-relaxed text-charcoal-700 dark:text-charcoal-300">
            Si vous identifiez une erreur factuelle, un texte de loi obsolète ou une statistique
            datée, signalez-le par email à{' '}
            <a
              href="mailto:redaction@vivos-assurance.fr"
              className="font-semibold text-primary-700 underline-offset-4 hover:underline dark:text-primary-300"
            >
              redaction@vivos-assurance.fr
            </a>
            . Les corrections substantielles sont publiées sous 5 jours ouvrés, accompagnées
            d&apos;une mention en bas d&apos;article et d&apos;une mise à jour du champ{' '}
            <code className="rounded bg-sand-100 px-1.5 py-0.5 text-sm dark:bg-charcoal-800">
              updatedAt
            </code>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-charcoal-900 px-5 py-3 text-sm font-extrabold text-white shadow-soft transition-all hover:-translate-y-0.5 dark:bg-white dark:text-charcoal-900"
            >
              Nous contacter
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-charcoal-200 bg-white px-5 py-3 text-sm font-extrabold text-charcoal-800 transition-all hover:-translate-y-0.5 hover:border-charcoal-300 dark:border-charcoal-700 dark:bg-charcoal-900 dark:text-white"
            >
              Voir le blog
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
