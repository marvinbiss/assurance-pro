/**
 * Composant partagé pour pages C+D programmatiques.
 *
 * Réutilisé par les templates (tarif, guide, comparateur, devis dynamiques).
 * Design language brand Vivos : hero terra + cards premium + sections brandées.
 */

import { headers } from 'next/headers'
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
  type LucideIcon,
} from 'lucide-react'
import type { PageEnrichmentRow } from '@/lib/programmatic/page-enrichment'
import { buildSchemaOrg, shouldShowDevisForm } from '@/lib/programmatic/page-enrichment'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { DevisAssuranceForm } from '@/components/assurance/DevisAssuranceForm'
import { PageHero } from '@/components/layout/PageHero'
import { RelatedPagesSection } from '@/components/seo/RelatedPagesSection'

type Variant = 'prix' | 'comparateur' | 'guide' | 'devis' | 'tarif'

interface Props {
  enrichment: PageEnrichmentRow
  variant: Variant
  headline: string
  intro?: React.ReactNode
  extraSections?: React.ReactNode
}

const VARIANT_LABELS: Record<Variant, string> = {
  prix: 'Tarifs marché',
  comparateur: 'Comparateur ville',
  guide: 'Guide juridique',
  devis: 'Devis ORIAS',
  tarif: 'Tarif métier',
}

const VARIANT_ICONS: Record<Variant, LucideIcon> = {
  prix: Euro,
  comparateur: BarChart3,
  guide: Scale,
  devis: Sparkles,
  tarif: TrendingUp,
}

/**
 * Construit un breadcrumb enrichi multi-niveaux avec liens parents cliquables.
 *
 * Niveau 1: Accueil (géré par PageHero)
 * Niveau 2: Garantie (lien vers pilier hub si garantie_code dispo)
 * Niveau 3: Métier (lien vers /garantie/metier si applicable)
 * Niveau 4: Ville ou statut (label seulement, page courante)
 * Niveau 5: Variant (label seulement, page courante)
 *
 * Tous les niveaux émettent du JSON-LD BreadcrumbList (cf. PageHero).
 */
function buildEnrichedBreadcrumbs(
  enrichment: PageEnrichmentRow,
  variant: Variant
): Array<{ label: string; href?: string }> {
  const crumbs: Array<{ label: string; href?: string }> = []

  // Niveau 2 — Garantie (lien hub)
  if (enrichment.garantie_label && enrichment.garantie_code) {
    const garantieHref = mapGarantieCodeToHub(enrichment.garantie_code)
    crumbs.push({ label: enrichment.garantie_label, href: garantieHref })
  } else {
    crumbs.push({ label: enrichment.garantie_label ?? 'Garantie' })
  }

  // Niveau 3 — Métier (lien vers /tarif/garantie/metier si on n'est pas déjà sur cette page)
  if (enrichment.metier_nom && enrichment.metier_code && enrichment.garantie_code) {
    const metierHref = `/tarif/${enrichment.garantie_code}/${enrichment.metier_code}`
    const isCurrentPage = enrichment.page_slug === metierHref.slice(1)
    crumbs.push({
      label: enrichment.metier_nom,
      ...(isCurrentPage ? {} : { href: metierHref }),
    })
  }

  // Niveau 4 — Ville (label seulement, jamais cliquable car page la plus profonde)
  if (enrichment.ville_nom) {
    crumbs.push({ label: enrichment.ville_nom })
  }

  // Niveau 4bis — Statut juridique (si pas de ville)
  if (!enrichment.ville_nom && enrichment.statut_label) {
    crumbs.push({ label: enrichment.statut_label })
  }

  // Niveau final — Variant (toujours dernier, label seulement)
  crumbs.push({ label: VARIANT_LABELS[variant] })

  return crumbs
}

/**
 * Mappe un code garantie (depuis kw_universe) vers son URL hub.
 * Couvre les 9 garanties principales du site.
 */
function mapGarantieCodeToHub(code: string): string {
  const c = code.toLowerCase()
  if (c.includes('decennale')) return '/assurance-decennale'
  if (c.includes('rc-pro') || c.includes('rc_pro')) return '/rc-pro'
  if (c.includes('cyber')) return '/cyber-assurance'
  if (c.includes('multirisque')) return '/multirisque-pro'
  if (c.includes('mutuelle')) return '/mutuelle-pro'
  if (c.includes('vtc')) return '/assurance-vtc'
  if (c.includes('dommages-ouvrage') || c.includes('do')) return '/assurance-dommages-ouvrage'
  if (c.includes('tous-risques-chantier') || c.includes('trc'))
    return '/assurance-tous-risques-chantier'
  if (c.includes('protection-juridique')) return '/protection-juridique-professionnelle'
  if (c.includes('prevoyance')) return '/prevoyance-tns'
  // Fallback générique
  return `/${code}`
}

export async function EnrichedPageLayout({
  enrichment,
  variant,
  headline,
  intro,
  extraSections,
}: Props) {
  const schemas = buildSchemaOrg(enrichment)
  const showDevis = shouldShowDevisForm(enrichment)
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return (
    <main className="min-h-screen bg-sand-50">
      {schemas.map((schema, i) => (
        <script key={i} {...jsonLdScriptProps(schema, nonce)} />
      ))}

      <PageHero
        breadcrumbs={buildEnrichedBreadcrumbs(enrichment, variant)}
        eyebrow={`${VARIANT_LABELS[variant]} · ${new Date().getFullYear()}`}
        EyebrowIcon={VARIANT_ICONS[variant]}
        title={headline}
        description={intro}
      />

      <article className="container mx-auto max-w-5xl px-4 py-14">
        <DensityBanner enrichment={enrichment} />

        {(enrichment.prix_min_eur || enrichment.prix_med_eur) && (
          <PrixGrid enrichment={enrichment} />
        )}

        <TrustSources enrichment={enrichment} />

        {extraSections}

        {enrichment.assureurs_top3_jsonb?.length > 0 && <AssureursTop3 enrichment={enrichment} />}

        {enrichment.jurisprudence_refs?.length > 0 && <Jurisprudence enrichment={enrichment} />}

        {enrichment.stats_sectorielles_jsonb?.length > 0 && <StatsBlock enrichment={enrichment} />}

        {enrichment.avis_top_jsonb?.filter((a) => a.iso_20488)?.length > 0 && (
          <AvisBlock enrichment={enrichment} />
        )}

        {showDevis && <DevisCta enrichment={enrichment} />}

        {/* Maillage interne contextuel (15+ liens cluster) */}
        <div className="mt-14">
          <RelatedPagesSection currentSlug={enrichment.page_slug ?? ''} />
        </div>

        <DdaDisclaimer />
      </article>
    </main>
  )
}

function DensityBanner({ enrichment }: { enrichment: PageEnrichmentRow }) {
  if (!enrichment.density_insee || !enrichment.metier_nom || !enrichment.ville_nom) return null
  return (
    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-charcoal-100 bg-white px-3.5 py-1.5 text-xs font-bold text-charcoal-700 shadow-soft">
      <BarChart3 className="h-3.5 w-3.5 text-primary-700" strokeWidth={2.4} />~{' '}
      {enrichment.density_insee.toLocaleString('fr-FR')} {enrichment.metier_nom}s recensés à{' '}
      {enrichment.ville_nom}
      <span className="text-charcoal-400">·</span>
      <span className="font-medium text-charcoal-500">
        INSEE Sirene {enrichment.enriched_at?.slice(0, 7)}
      </span>
    </div>
  )
}

function PrixGrid({ enrichment }: { enrichment: PageEnrichmentRow }) {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      {enrichment.prix_min_eur && (
        <PrixCell label="Tarif min marché" value={enrichment.prix_min_eur} highlight />
      )}
      {enrichment.prix_med_eur && <PrixCell label="Tarif médian" value={enrichment.prix_med_eur} />}
      {enrichment.prix_max_eur && (
        <PrixCell label="Tarif maximum" value={enrichment.prix_max_eur} />
      )}
    </section>
  )
}

function PrixCell({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: number
  highlight?: boolean
}) {
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

function TrustSources({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const sources: string[] = []
  if (enrichment.prix_min_eur) sources.push('Tarifs propriétaires')
  if (enrichment.density_insee) sources.push('INSEE Sirene')
  if (enrichment.sinistralite_pct) sources.push('AQC SYCODÉS')
  if (enrichment.jurisprudence_refs?.length > 0) sources.push('Légifrance')
  if (enrichment.assureurs_top3_jsonb?.length > 0) sources.push('Pappers')
  if (enrichment.avis_top_jsonb?.length > 0) sources.push('Trustpilot ISO 20488')
  if (enrichment.stats_sectorielles_jsonb?.length > 0) sources.push('FFA, FFB / CAPEB')

  if (sources.length === 0) return null
  return (
    <aside className="mt-10 overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-5 shadow-soft">
      <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
        <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
        Données vérifiées
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {sources.map((s) => (
          <li
            key={s}
            className="inline-flex items-center gap-1 rounded-full bg-secondary-50 px-2.5 py-0.5 text-[11px] font-bold text-secondary-800"
          >
            <CheckCircle2 className="h-3 w-3" strokeWidth={2.4} />
            {s}
          </li>
        ))}
      </ul>
    </aside>
  )
}

function AssureursTop3({ enrichment }: { enrichment: PageEnrichmentRow }) {
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
              </tr>
            </thead>
            <tbody>
              {enrichment.assureurs_top3_jsonb.map((a) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Jurisprudence({ enrichment }: { enrichment: PageEnrichmentRow }) {
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
        {enrichment.jurisprudence_refs.slice(0, 3).map((r, i) => (
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

function StatsBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
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
        {enrichment.stats_sectorielles_jsonb.slice(0, 6).map((s, i) => (
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

function AvisBlock({ enrichment }: { enrichment: PageEnrichmentRow }) {
  const avis = enrichment.avis_top_jsonb.filter((a) => a.iso_20488).slice(0, 4)
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
        {avis.map((a, i) => (
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

function DevisCta({ enrichment }: { enrichment: PageEnrichmentRow }) {
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
          Demande de devis {enrichment.garantie_label}
        </h2>
        <p className="mt-3 text-base text-charcoal-600">
          Recontact gratuit sous 24 h ouvrées par notre courtier partenaire ORIAS. Aucun engagement.
        </p>
      </header>
      <DevisAssuranceForm prefill={prefill} source_url={enrichment.page_slug} />
    </section>
  )
}

function DdaDisclaimer() {
  return (
    <footer className="mt-12 flex items-start gap-3 rounded-2xl border border-charcoal-100 bg-white p-5 text-xs leading-relaxed text-charcoal-600 shadow-soft">
      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-700" strokeWidth={2.4} />
      <p>
        <strong className="text-charcoal-900">Information précontractuelle DDA.</strong>
        Présentation factuelle, sans conseil personnalisé. Devis émis par courtier partenaire ORIAS.
        Tarifs basés sur données propriétaires + INSEE Sirene + AQC SYCODÉS. Registre :{' '}
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
