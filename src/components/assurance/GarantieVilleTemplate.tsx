import Link from 'next/link'
import type { VilleData } from '@/lib/data/villes-top100'
import { VILLES_TOP100 } from '@/lib/data/villes-top100'

export interface GarantieVilleConfig {
  /** Slug de la garantie (ex: 'multirisque-pro') */
  garantieSlug: string
  /** Libellé pour H1 + breadcrumb (ex: 'Multirisque pro') */
  garantieLabel: string
  /** Sous-titre rapide affiché en hero */
  tagline: string
  /** Référence légale (badge en haut) */
  legalRef: string
  /** Tarif "à partir de" affiché en stat */
  priceFrom: string
  /** Audience principale (ex: 'commerces, ESN, agences') */
  audience: string
  /** Stat label utilisée (artisansBtpEstime ou freelancesEstime) */
  audienceMetric: 'artisansBtpEstime' | 'freelancesEstime'
  /** Sections rich body — h2 + paragraphes */
  sections: Array<{ h2: string; paragraphs: string[]; bullets?: string[] }>
}

export function GarantieVilleTemplate({
  ville,
  config,
}: {
  ville: VilleData
  config: GarantieVilleConfig
}) {
  const otherCities = VILLES_TOP100.filter(
    (c) => c.regionSlug === ville.regionSlug && c.slug !== ville.slug
  ).slice(0, 6)

  const audienceCount =
    config.audienceMetric === 'artisansBtpEstime' ? ville.artisansBtpEstime : ville.freelancesEstime

  return (
    <main className="min-h-screen bg-white py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>{' '}
          ›{' '}
          <Link href={`/${config.garantieSlug}`} className="hover:underline">
            {config.garantieLabel}
          </Link>{' '}
          › <span className="text-gray-900">{ville.nom}</span>
        </nav>

        <header className="mb-8">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded mb-3">
            {config.legalRef}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {config.garantieLabel} {ville.nom} ({ville.departementCode}) — Tarifs et devis
          </h1>
          <p className="text-gray-700 text-lg">{config.tagline}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Stat
            icon="📍"
            label={`${ville.departementNom} (${ville.departementCode})`}
            value={ville.regionNom}
          />
          <Stat
            icon="🎯"
            label={config.audience}
            value={`~${audienceCount.toLocaleString('fr-FR')}`}
          />
          <Stat icon="💰" label="À partir de" value={config.priceFrom} />
        </div>

        <section className="prose prose-lg max-w-none mb-10">
          {config.sections.map((s) => (
            <div key={s.h2}>
              <h2>
                {s.h2.replace(/{ville}/g, ville.nom).replace(/{region}/g, ville.regionNom)}
              </h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>
                  {p
                    .replace(/{ville}/g, ville.nom)
                    .replace(/{region}/g, ville.regionNom)
                    .replace(/{departement}/g, ville.departementNom)
                    .replace(/{depCode}/g, ville.departementCode)}
                </p>
              ))}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>
                      {b
                        .replace(/{ville}/g, ville.nom)
                        .replace(/{region}/g, ville.regionNom)
                        .replace(/{zonage}/g, ville.zonageRisque.replace(/_/g, ' '))}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10">
          <h2 className="text-xl font-bold mb-3">
            Devis {config.garantieLabel} {ville.nom} en 2 minutes
          </h2>
          <p className="text-sm mb-4">
            Notre équipe ORIAS interroge nos 10 assureurs partenaires pour vous présenter les
            meilleures offres. <strong>Aucun frais de courtage facturé.</strong>
          </p>
          <Link
            href={`/devis?garantie=${config.garantieSlug}&ville=${encodeURIComponent(ville.slug)}`}
            className="inline-block px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded font-semibold"
          >
            Obtenir mon devis →
          </Link>
        </section>

        {otherCities.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3">
              Autres villes en {ville.regionNom}
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${config.garantieSlug}/${c.slug}`}
                    className="text-blue-700 hover:underline"
                  >
                    {config.garantieLabel} {c.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold mb-3">Voir aussi</h2>
          <ul className="text-sm space-y-1.5">
            <li>
              <Link href={`/${config.garantieSlug}`} className="text-blue-700 hover:underline">
                Page pilier — {config.garantieLabel}
              </Link>
            </li>
            <li>
              <Link href="/comparateur-assureurs" className="text-blue-700 hover:underline">
                Comparateur des 10 assureurs
              </Link>
            </li>
            <li>
              <Link href="/normes" className="text-blue-700 hover:underline">
                Normes &amp; conformité
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="text-2xl mb-1" aria-hidden="true">
        {icon}
      </div>
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className="text-base font-semibold text-gray-900">{value}</div>
    </div>
  )
}
