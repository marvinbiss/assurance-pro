/**
 * Template C — Prix/Tarif programmatique data-injected
 * Route : /prix/[garantie]/[metier]/[statut]
 * Couche : C (Money KW, yield Ahrefs 75.2 vis/page, intent commercial fort)
 *
 * Source data : v_page_enrichment_full (migration 015)
 * KW cible    : "prix [garantie] [metier] [statut]" + "tarif [garantie] [metier]" + "devis [garantie]"
 * CPC typique : 200-1300€ (high commercial intent)
 *
 * Génération statique avec dynamicParams = false + revalidate ISR 24h.
 * Filtrage par yield_score >= 15 (anti-thin) au niveau generateStaticParams.
 */

import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import type { Metadata } from 'next'
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Euro,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react'
import {
  getPageEnrichment,
  getEligibleSlugsForTemplate,
  buildPageTitle,
  buildPageDescription,
  buildCanonical,
  buildSchemaOrg,
  shouldShowDevisForm,
  type PageEnrichmentRow,
} from '@/lib/programmatic/page-enrichment'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { DevisAssuranceForm } from '@/components/assurance/DevisAssuranceForm'
import { PageHero } from '@/components/layout/PageHero'
import { RelatedPagesSection } from '@/components/seo/RelatedPagesSection'
import { TarifCalculator } from '@/components/assurance/pilier-sections-lazy'
import type { Garantie as CalcGarantie } from '@/components/premium/tarif-calculator'

function mapGarantieToCalculator(code: string | null): CalcGarantie | null {
  if (!code) return null
  const c = code.toLowerCase()
  if (c.includes('decennale')) return 'decennale'
  if (c.includes('rc-pro') || c === 'rc_pro') return 'rc-pro'
  if (c.includes('cyber')) return 'cyber'
  if (c.includes('multirisque')) return 'multirisque-pro'
  if (c.includes('mutuelle')) return 'mutuelle-pro'
  if (c.includes('vtc') || c.includes('taxi')) return 'vtc'
  if (c.includes('dommages-ouvrage')) return 'dommages-ouvrage'
  if (c.includes('tous-risques-chantier') || c === 'trc') return 'tous-risques-chantier'
  if (c.includes('transport-marchandises')) return 'transport-marchandises'
  if (c.includes('moto-pro')) return 'moto-pro'
  if (c.includes('protection-juridique')) return 'protection-juridique'
  if (c.includes('homme-cle')) return 'homme-cle'
  if (c.includes('prevoyance')) return 'prevoyance'
  if (c.includes('flotte')) return 'flotte-auto'
  return 'rc-pro'
}

// ────────────────────────────────────────────────────────────────────────────
// Configuration Next.js App Router
// ────────────────────────────────────────────────────────────────────────────

export const dynamicParams = false
export const revalidate = 86400 // ISR 24h (cohérent avec autres routes du repo)

type Params = {
  garantie: string
  metier: string
  statut: string
}

// ────────────────────────────────────────────────────────────────────────────
// generateStaticParams — filtré par yield_score (anti-thin)
// ────────────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  // Tentative live Supabase (dev/prod avec DB)
  const liveSlugs = await getEligibleSlugsForTemplate('prix_garantie_ville_statut', 15)

  // Fallback snapshot pré-généré (CI build sans DB, prod sans env var)
  const { PSEO_SLUGS_SNAPSHOT } = await import('@/lib/data/pseo-slugs-snapshot')
  const snapshotSlugs = PSEO_SLUGS_SNAPSHOT.prix_garantie_ville_statut as readonly string[]

  // Union (live prioritaire, snapshot fallback)
  const allSlugs = liveSlugs.length > 0 ? liveSlugs : snapshotSlugs

  return [...allSlugs]
    .filter((s) => s.startsWith('prix/'))
    .map((slug) => {
      const [, garantie, metier, statut] = slug.split('/')
      return { garantie, metier, statut }
    })
    .filter((p) => p.garantie && p.metier && p.statut)
}

// ────────────────────────────────────────────────────────────────────────────
// generateMetadata
// ────────────────────────────────────────────────────────────────────────────

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const slug = `prix/${params.garantie}/${params.metier}/${params.statut}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) return {}

  return {
    title: buildPageTitle(enrichment),
    description: buildPageDescription(enrichment),
    alternates: { canonical: buildCanonical(slug) },
    openGraph: {
      title: buildPageTitle(enrichment),
      description: buildPageDescription(enrichment),
      url: buildCanonical(slug),
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Page Component
// ────────────────────────────────────────────────────────────────────────────

export default async function PrixPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const slug = `prix/${params.garantie}/${params.metier}/${params.statut}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) notFound()

  const schemas = buildSchemaOrg(enrichment)
  const showDevisForm = shouldShowDevisForm(enrichment)
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      {/* Schema.org JSON-LD — safe escape + nonce CSP */}
      {schemas.map((schema, i) => (
        <script key={i} {...jsonLdScriptProps(schema, nonce)} />
      ))}

      <PageHero
        breadcrumbs={[{ label: enrichment.garantie_label ?? 'Garantie' }, { label: 'Tarifs' }]}
        eyebrow={`Tarifs marché ${new Date().getFullYear()}`}
        EyebrowIcon={Euro}
        title={
          <>
            Prix {enrichment.garantie_label}
            <br />
            <span className="text-secondary-200">
              {enrichment.metier_nom} {enrichment.statut_label}
            </span>
          </>
        }
        description={
          enrichment.density_insee && enrichment.metier_nom && enrichment.ville_nom ? (
            <>
              ~{enrichment.density_insee.toLocaleString('fr-FR')} {enrichment.metier_nom}s recensés
              à {enrichment.ville_nom} (source INSEE Sirene).
            </>
          ) : (
            'Tarifs marché négociés par notre cabinet ORIAS auprès de 10 assureurs partenaires.'
          )
        }
      />

      <article className="container mx-auto max-w-5xl px-4 py-14">
        <section className="grid gap-5 md:grid-cols-3">
          <PrixCard label="Tarif minimum marché" value={enrichment.prix_min_eur} highlight />
          <PrixCard label="Tarif médian" value={enrichment.prix_med_eur} />
          <PrixCard label="Tarif maximum" value={enrichment.prix_max_eur} />
        </section>

        <DataTrustSignals enrichment={enrichment} />

        <PrixContextBlock enrichment={enrichment} />

        <ComparatifAssureurs enrichment={enrichment} />

        <JurisprudenceBlock enrichment={enrichment} />

        <StatsSectoriellesBlock enrichment={enrichment} />

        <AvisVerifiesBlock enrichment={enrichment} />

        {/* Estimateur tarifaire — calculator vertical-specific avec préselection métier */}
        {(() => {
          const calcG = mapGarantieToCalculator(enrichment.garantie_code)
          if (!calcG) return null
          return (
            <div className="mt-14">
              <TarifCalculator
                garantie={calcG}
                defaultMetier={enrichment.metier_code ?? undefined}
              />
            </div>
          )
        })()}

        {showDevisForm && <DevisFormCTA enrichment={enrichment} />}

        {/* Maillage interne contextuel cluster (15+ liens) */}
        <div className="mt-14">
          <RelatedPagesSection currentSlug={enrichment.page_slug ?? slug} />
        </div>

        <DisclaimerOrias />
      </article>
    </main>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Subcomponents (inline pour minimiser dépendances ; à externaliser plus tard)
// ────────────────────────────────────────────────────────────────────────────

function PrixCard({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: number | null
  highlight?: boolean
}) {
  if (value == null) return null
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium ${
        highlight
          ? 'border-primary-200 ring-2 ring-primary-100'
          : 'border-charcoal-100 hover:border-primary-200'
      }`}
    >
      {highlight && (
        <span
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-700"
          aria-hidden="true"
        />
      )}
      <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
        {highlight ? (
          <Sparkles className="h-3.5 w-3.5 text-primary-700" strokeWidth={2.4} />
        ) : (
          <Euro className="h-3.5 w-3.5 text-charcoal-500" strokeWidth={2.4} />
        )}
        {label}
      </div>
      <div
        className={`font-heading text-3xl font-extrabold tabular-nums tracking-tight ${
          highlight ? 'text-primary-700' : 'text-charcoal-900'
        }`}
      >
        {Math.round(value).toLocaleString('fr-FR')}
        <span className="text-xl">€</span>
        <span className="ml-1 text-base font-normal text-charcoal-500"> par an</span>
      </div>
    </div>
  )
}

function DataTrustSignals({ enrichment }: { enrichment: PageEnrichmentRow }) {
  return (
    <aside className="mt-10 overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft">
      <p className="mb-4 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary-700">
        <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
        Sources data vérifiées
      </p>
      <ul className="grid gap-2 text-sm md:grid-cols-2">
        <li className="flex items-start gap-2 text-charcoal-700">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-700"
            strokeWidth={2.4}
          />
          <span>Tarifs : agrégation devis propriétaires + partenaires</span>
        </li>
        <li className="flex items-start gap-2 text-charcoal-700">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-700"
            strokeWidth={2.4}
          />
          <span>Densité : INSEE Sirene (mis à jour mensuel)</span>
        </li>
        {enrichment.sinistralite_pct && (
          <li className="flex items-start gap-2 text-charcoal-700">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-700"
              strokeWidth={2.4}
            />
            <span>Sinistralité : AQC SYCODÉS (référence sectorielle)</span>
          </li>
        )}
        {enrichment.jurisprudence_refs?.length > 0 && (
          <li className="flex items-start gap-2 text-charcoal-700">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-700"
              strokeWidth={2.4}
            />
            <span>Jurisprudence : Légifrance API</span>
          </li>
        )}
        {enrichment.assureurs_top3_jsonb?.length > 0 && (
          <li className="flex items-start gap-2 text-charcoal-700">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-700"
              strokeWidth={2.4}
            />
            <span>Solidité assureurs : Pappers (S&amp;P ou Moody&apos;s)</span>
          </li>
        )}
        {enrichment.avis_top_jsonb?.length > 0 && (
          <li className="flex items-start gap-2 text-charcoal-700">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-700"
              strokeWidth={2.4}
            />
            <span>Avis : Trustpilot ISO 20488 vérifiés</span>
          </li>
        )}
        {enrichment.stats_sectorielles_jsonb?.length > 0 && (
          <li className="flex items-start gap-2 text-charcoal-700">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-700"
              strokeWidth={2.4}
            />
            <span>Stats : FFA — FFB — CAPEB — Mutualité Française</span>
          </li>
        )}
      </ul>
    </aside>
  )
}

function PrixContextBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  if (!enrichment.prix_med_eur) return null
  return (
    <section className="mt-14">
      <header className="mb-6">
        <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.4} />
          Analyse marché
        </span>
        <h2 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-charcoal-900 md:text-3xl">
          Pourquoi ce tarif {enrichment.garantie_label} pour un {enrichment.metier_nom}{' '}
          {enrichment.statut_label} ?
        </h2>
      </header>
      <div className="pilier-prose prose prose-lg max-w-none text-charcoal-700">
        <p>
          Le tarif médian observé pour {enrichment.garantie_label} appliqué aux{' '}
          {enrichment.metier_nom}s sous statut {enrichment.statut_label}
          {enrichment.ville_nom && ` à ${enrichment.ville_nom}`} s&apos;établit à{' '}
          <strong>{Math.round(enrichment.prix_med_eur).toLocaleString('fr-FR')}€ par an</strong>.
        </p>
        {enrichment.sinistralite_pct && (
          <p>
            La sinistralité métier (AQC SYCODÉS, dernière année disponible) est de{' '}
            <strong>{enrichment.sinistralite_pct.toFixed(1)}%</strong>, ce qui influence directement
            la prime calculée par les assureurs partenaires.
          </p>
        )}
        {enrichment.density_insee && enrichment.ville_nom && (
          <p>
            La densité de {enrichment.metier_nom}s à {enrichment.ville_nom} (
            {enrichment.density_insee.toLocaleString('fr-FR')} actifs INSEE Sirene) crée un marché
            concurrentiel modérément profond, avec {enrichment.assureurs_top3_jsonb?.length ?? 0}{' '}
            assureurs partenaires actifs sur la zone.
          </p>
        )}
      </div>
    </section>
  )
}

function ComparatifAssureurs({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const top3 = enrichment.assureurs_top3_jsonb ?? []
  if (top3.length === 0) return null
  return (
    <section className="mt-14">
      <header className="mb-6">
        <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
          <Star className="h-3.5 w-3.5" strokeWidth={2.4} />
          Top assureurs
        </span>
        <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
          Top 3 assureurs partenaires
        </h2>
      </header>
      <div className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-br from-charcoal-900 to-charcoal-800">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-white">
                  Assureur
                </th>
                <th className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-white">
                  Solidité Pappers
                </th>
                <th className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-white">
                  TrustScore
                </th>
                <th className="px-5 py-4 text-right text-xs font-extrabold uppercase tracking-wider text-white">
                  Tarif indicatif
                </th>
              </tr>
            </thead>
            <tbody>
              {top3.map((a) => (
                <tr
                  key={a.partner_slug}
                  className="border-t border-charcoal-100 transition-colors hover:bg-sand-50/60"
                >
                  <td className="px-5 py-3.5 font-heading font-extrabold text-charcoal-900">
                    {a.nom}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-charcoal-800">
                    {a.score_solidite}/100
                    {a.rating && (
                      <span className="ml-2 text-xs font-normal text-charcoal-500">
                        ({a.rating})
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {a.trustscore ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary-50 px-2.5 py-0.5 text-xs font-bold text-secondary-800">
                        {a.trustscore.toFixed(1)}
                        <Star
                          className="h-3 w-3 fill-secondary-500 text-secondary-500"
                          strokeWidth={2}
                        />
                      </span>
                    ) : (
                      <span className="text-charcoal-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right font-extrabold tabular-nums text-primary-700">
                    {a.prix_indicatif_min ? `${a.prix_indicatif_min}€ par an min` : 'Sur devis'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function JurisprudenceBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const refs = enrichment.jurisprudence_refs ?? []
  if (refs.length === 0) return null
  return (
    <section className="mt-14">
      <header className="mb-6">
        <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
          <Scale className="h-3.5 w-3.5" strokeWidth={2.4} />
          Cadre juridique
        </span>
        <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
          Références légales applicables
        </h2>
      </header>
      <ul className="grid gap-4">
        {refs.slice(0, 3).map((r, i) => (
          <li
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-premium"
          >
            <span
              className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-500 to-primary-700 opacity-60 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
            <strong className="block font-heading text-base font-extrabold text-charcoal-900">
              {r.article}
            </strong>
            <p className="mt-1.5 text-sm leading-relaxed text-charcoal-700">{r.texte_court}</p>
            <a
              href={r.legifrance_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 underline-offset-4 hover:underline"
            >
              Texte intégral (Légifrance)
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function StatsSectoriellesBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const stats = enrichment.stats_sectorielles_jsonb ?? []
  if (stats.length === 0) return null
  return (
    <section className="mt-14">
      <header className="mb-6">
        <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
          <BarChart3 className="h-3.5 w-3.5" strokeWidth={2.4} />
          Data sectorielle
        </span>
        <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
          Statistiques marché
        </h2>
      </header>
      <ul className="grid gap-4 md:grid-cols-3">
        {stats.slice(0, 6).map((s, i) => (
          <li
            key={i}
            className="overflow-hidden rounded-2xl border border-accent-100 bg-gradient-to-br from-accent-50 to-white p-5 shadow-soft"
          >
            <div className="font-heading text-3xl font-extrabold text-accent-700">
              {s.valeur}
              {s.unite === '%' ? '%' : s.unite === 'EUR' ? '€' : ''}
            </div>
            <div className="mt-2 text-sm font-semibold text-charcoal-900">{s.indicateur}</div>
            <div className="mt-2 text-[11px] font-medium text-charcoal-500">
              {s.source} · {s.annee}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function AvisVerifiesBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const avis = enrichment.avis_top_jsonb?.filter((a) => a.iso_20488) ?? []
  if (avis.length === 0) return null
  return (
    <section className="mt-14">
      <header className="mb-6">
        <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
          <Quote className="h-3.5 w-3.5" strokeWidth={2.4} />
          ISO 20488
        </span>
        <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
          Avis clients vérifiés
        </h2>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {avis.slice(0, 4).map((a, i) => (
          <blockquote
            key={i}
            className="relative overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft"
          >
            <Quote className="absolute right-4 top-4 h-8 w-8 text-primary-100" strokeWidth={1.5} />
            <div className="mb-3 flex items-center gap-1">
              {Array.from({ length: a.note }).map((_, j) => (
                <Star
                  key={`f-${j}`}
                  className="h-4 w-4 fill-secondary-500 text-secondary-500"
                  strokeWidth={2}
                />
              ))}
              {Array.from({ length: 5 - a.note }).map((_, j) => (
                <Star key={`e-${j}`} className="h-4 w-4 text-charcoal-200" strokeWidth={2} />
              ))}
            </div>
            <p className="text-sm italic leading-relaxed text-charcoal-700">
              &ldquo;{a.texte}&rdquo;
            </p>
            <footer className="mt-4 flex items-center justify-between gap-2 border-t border-charcoal-100 pt-3 text-xs">
              <span className="font-bold text-charcoal-700">
                {a.auteur}
                {a.ville && ` · ${a.ville}`}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary-50 px-2 py-0.5 font-bold text-secondary-800">
                <ShieldCheck className="h-3 w-3" strokeWidth={2.4} />
                ISO 20488
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

function DevisFormCTA({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const prefill = {
    garantie_code: enrichment.garantie_code ?? '',
    metier_code: enrichment.metier_code ?? '',
    ville: enrichment.ville_nom ?? '',
    statut_juridique: enrichment.statut_juridique ?? '',
  }
  return (
    <section
      id="devis"
      className="relative mt-16 overflow-hidden rounded-3xl border border-charcoal-100 bg-white p-8 shadow-premium-lg md:p-12"
    >
      <span
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-700"
        aria-hidden="true"
      />
      <header className="mb-7">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-700">
          <Sparkles className="h-3 w-3" strokeWidth={2.4} />
          Devis ORIAS · 24 h
        </span>
        <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-display text-charcoal-900 md:text-4xl">
          Devis personnalisé {enrichment.garantie_label}
        </h2>
        <p className="mt-3 text-base text-charcoal-600">
          Notre courtier partenaire ORIAS vous recontacte gratuitement sous 24 h ouvrées avec
          jusqu&apos;à 3 offres comparées.
        </p>
      </header>
      <DevisAssuranceForm prefill={prefill} source_url={enrichment.page_slug} />
    </section>
  )
}

function DisclaimerOrias() {
  return (
    <footer className="mt-12 flex items-start gap-3 rounded-2xl border border-charcoal-100 bg-white p-5 text-xs leading-relaxed text-charcoal-600 shadow-soft">
      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-700" strokeWidth={2.4} />
      <p>
        <strong className="text-charcoal-900">Information précontractuelle DDA.</strong> Cette page
        constitue une présentation factuelle des tarifs marché et ne vaut pas conseil. Les devis
        personnalisés sont émis par notre courtier partenaire ORIAS. Tarifs indicatifs basés sur
        agrégation données propriétaires + INSEE Sirene + AQC SYCODÉS. Conformément à l&apos;arrêté
        du 6 décembre 2022, le registre ORIAS est consultable sur{' '}
        <a
          href="https://www.orias.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary-700 underline-offset-2 hover:underline"
        >
          orias.fr
        </a>
        .
      </p>
    </footer>
  )
}
