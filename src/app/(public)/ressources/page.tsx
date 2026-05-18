import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Hammer,
  ShieldCheck,
  Scale,
  Calculator,
  AlertTriangle,
  Clock,
  Download,
} from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { Stagger, StaggerItem } from '@/components/ui/FadeIn'
import { SITE_URL } from '@/lib/seo/config'
import { getAllRessources, type Ressource } from '@/lib/data/ressources'

export const metadata: Metadata = {
  title: 'Ressources gratuites — Guides et modèles assurance pro 2026',
  description:
    'Téléchargez gratuitement les ressources Vivos Assurance : kit RC Pro auto-entrepreneur, check-list décennale BTP, modèle lettre Loi Hamon, guide Madelin TNS 2026. Imprimable PDF.',
  alternates: { canonical: `${SITE_URL}/ressources` },
  openGraph: {
    title: 'Ressources gratuites — Guides et modèles assurance pro 2026',
    description:
      'Kit RC Pro AE, check-list décennale, modèle lettre Loi Hamon, guide Madelin. Téléchargement libre.',
    url: `${SITE_URL}/ressources`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ressources gratuites assurance pro',
    description: 'Kit RC Pro AE, check-list décennale BTP, modèles lettres, guides Madelin TNS.',
  },
}

const ICONS = {
  Hammer,
  ShieldCheck,
  Scale,
  Calculator,
  AlertTriangle,
} as const

const CATEGORY_LABELS: Record<Ressource['category'], string> = {
  btp: 'BTP',
  'rc-pro': 'RC Pro',
  reglementation: 'Réglementation',
  fiscalite: 'Fiscalité',
  sinistre: 'Sinistre',
}

const CATEGORY_GRADIENTS: Record<Ressource['category'], string> = {
  btp: 'from-orange-500 to-orange-700',
  'rc-pro': 'from-charcoal-700 to-charcoal-900',
  reglementation: 'from-purple-500 to-purple-700',
  fiscalite: 'from-secondary-500 to-secondary-700',
  sinistre: 'from-red-500 to-red-700',
}

export default function RessourcesPage() {
  const ressources = getAllRessources()

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <PageHero
        breadcrumbs={[{ label: 'Ressources' }]}
        eyebrow="Bibliothèque gratuite"
        EyebrowIcon={BookOpen}
        title={
          <>
            Ressources et modèles
            <br />
            <span className="text-secondary-200">assurance professionnelle</span>
          </>
        }
        description={
          <>
            Guides pratiques, check-lists, modèles de lettres, calculs fiscaux — rédigés par
            l&apos;équipe Vivos Assurance et conformes aux obligations ACPR ou DDA 2026.
            Téléchargez, imprimez, partagez librement.
          </>
        }
        meta={[
          { Icon: Download, label: 'Téléchargement libre' },
          { Icon: ShieldCheck, label: 'Conforme ACPR ou DDA' },
          { Icon: BookOpen, label: `${ressources.length} ressources` },
        ]}
      />

      <div className="container mx-auto max-w-6xl px-4 py-14">
        <section>
          <header className="mb-8">
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
              <BookOpen className="h-3.5 w-3.5" strokeWidth={2.4} />
              Catalogue
            </span>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
              Toutes les ressources
            </h2>
          </header>

          <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ressources.map((r) => {
              const Icon = ICONS[r.icon]
              return (
                <StaggerItem key={r.slug}>
                  <Link
                    href={`/ressources/${r.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
                  >
                    <div
                      className={`relative aspect-[16/9] bg-gradient-to-br ${
                        CATEGORY_GRADIENTS[r.category]
                      } p-5`}
                    >
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl"
                        aria-hidden="true"
                      />
                      <Icon
                        className="relative h-10 w-10 text-white/95 transition-transform group-hover:scale-110"
                        strokeWidth={1.8}
                      />
                      <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        {CATEGORY_LABELS[r.category]}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 font-heading text-base font-extrabold leading-tight tracking-tight text-charcoal-900 transition-colors group-hover:text-primary-700">
                        {r.title}
                      </h3>
                      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-charcoal-600">
                        {r.description}
                      </p>
                      <div className="mb-4 flex flex-wrap gap-1">
                        {r.audience.slice(0, 3).map((a) => (
                          <span
                            key={a}
                            className="inline-flex items-center rounded-full bg-sand-100 px-2 py-0.5 text-[10px] font-bold text-charcoal-700"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between border-t border-charcoal-100 pt-3 text-xs">
                        <span className="inline-flex items-center gap-1 text-charcoal-500">
                          <Clock className="h-3 w-3" strokeWidth={2.4} />
                          {r.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-primary-700 transition-transform group-hover:translate-x-0.5">
                          Lire
                          <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </Stagger>
        </section>
      </div>
    </div>
  )
}
