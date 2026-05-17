import Link from 'next/link'
import type { VilleData } from '@/lib/data/villes-top100'
import { VILLES_TOP100 } from '@/lib/data/villes-top100'
import { getMetier } from '@/lib/data/decennale-metiers'

const FEATURED_METIER_SLUGS = [
  'plombier',
  'electricien',
  'macon',
  'couvreur-zingueur',
  'peintre',
  'charpentier-bois',
]

export function DecennaleVilleTemplate({ ville }: { ville: VilleData }) {
  const otherCities = VILLES_TOP100.filter(
    (c) => c.regionSlug === ville.regionSlug && c.slug !== ville.slug
  ).slice(0, 6)

  const featuredMetiers = FEATURED_METIER_SLUGS.map((s) => getMetier(s)).filter(
    (m): m is NonNullable<typeof m> => Boolean(m)
  )

  return (
    <main className="min-h-screen bg-white py-10">
      <div className="container mx-auto max-w-4xl px-4">
        <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>{' '}
          ›{' '}
          <Link href="/assurance-decennale" className="hover:underline">
            Assurance décennale
          </Link>{' '}
          › <span className="text-gray-900">{ville.nom}</span>
        </nav>

        <header className="mb-8">
          <span className="mb-3 inline-block rounded bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">
            OBLIGATION LÉGALE — LOI SPINETTA
          </span>
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">
            Assurance décennale {ville.nom} ({ville.departementCode}) — Tarifs et devis
          </h1>
          <p className="text-lg text-gray-700">
            Couverture décennale obligatoire pour les{' '}
            <strong>~{ville.artisansBtpEstime.toLocaleString('fr-FR')} artisans BTP</strong> de{' '}
            {ville.nom}. Tarifs négociés auprès de 10 assureurs partenaires, attestation 24h,
            conseil ORIAS.
          </p>
        </header>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Stat
            icon="📍"
            label={`${ville.departementNom} (${ville.departementCode})`}
            value={ville.regionNom}
          />
          <Stat
            icon="🏗️"
            label="Artisans BTP"
            value={`~${ville.artisansBtpEstime.toLocaleString('fr-FR')}`}
          />
          <Stat icon="💰" label="À partir de" value="480€ par an" />
        </div>

        <section className="prose prose-lg mb-10 max-w-none">
          <h2>Pourquoi une décennale est obligatoire à {ville.nom}</h2>
          <p>
            La <strong>Loi Spinetta du 4 janvier 1978</strong> (art. L. 241-1 C. assur.) impose à
            tout professionnel du BTP exerçant à {ville.nom}, comme partout en France, de souscrire
            une garantie décennale couvrant les dommages compromettant la solidité de l&apos;ouvrage
            ou le rendant impropre à sa destination, pendant 10 ans à compter de la réception des
            travaux.
          </p>
          <p>L&apos;absence de couverture est sanctionnée par&nbsp;:</p>
          <ul>
            <li>75 000 € d&apos;amende</li>
            <li>6 mois d&apos;emprisonnement</li>
            <li>Interdiction d&apos;exercer l&apos;activité d&apos;artisan</li>
            <li>Responsabilité civile et pénale personnelle en cas de sinistre</li>
          </ul>
          <p>
            Depuis 2024, la mention de votre décennale (assureur, n° de police, période, zone
            géographique couverte) est <strong>obligatoire sur tous vos devis et factures</strong>{' '}
            clients.
          </p>

          <h2>Combien coûte la décennale à {ville.nom} ?</h2>
          <p>
            Les tarifs varient selon votre profil (statut, ancienneté, antécédents sinistres,
            métier) et le zonage de risque ({ville.zonageRisque.replace(/_/g, ' ')} pour {ville.nom}
            ). Voici une fourchette indicative pour un artisan BTP exerçant à {ville.nom}&nbsp;:
          </p>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Profil</th>
                <th className="border border-gray-300 p-2 text-right">Tarif annuel HT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Auto-entrepreneur (CA &lt; 50 k€)</td>
                <td className="border border-gray-300 p-2 text-right">480 € – 1 200 €</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">PME (CA 50-100 k€)</td>
                <td className="border border-gray-300 p-2 text-right">1 200 € – 2 800 €</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">PME (CA 100-250 k€)</td>
                <td className="border border-gray-300 p-2 text-right">2 800 € – 6 500 €</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Grand compte (CA &gt; 500 k€)</td>
                <td className="border border-gray-300 p-2 text-right">6 500 € – 18 000 €</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-xs italic text-gray-600">
            Tarifs indicatifs basés sur les barèmes 2026 de nos 10 assureurs partenaires (Hiscox,
            April Pro, MMA, Generali, AXA Pro, SMABTP, Allianz Pro, MAAF, Wakam, Stello). Devis
            personnalisé recommandé.
          </p>

          <h2>Spécificités du marché BTP à {ville.nom}</h2>
          <p>
            {ville.nom} est située en <strong>{ville.regionNom}</strong>, dans le département du{' '}
            <strong>
              {ville.departementNom} ({ville.departementCode})
            </strong>
            . Le tissu d&apos;artisans BTP local est estimé à{' '}
            {ville.artisansBtpEstime.toLocaleString('fr-FR')} entreprises. Les principaux paramètres
            pris en compte par les assureurs pour cette zone&nbsp;:
          </p>
          <ul>
            <li>Densité urbaine (zonage&nbsp;: {ville.zonageRisque.replace(/_/g, ' ')})</li>
            <li>Sinistralité départementale moyenne (source AQC SYCODÉS)</li>
            <li>Risques climatiques régionaux (tempêtes, gel, retrait-gonflement argiles)</li>
            <li>Réglementations locales (PLU, ABF, parasismique selon zones)</li>
          </ul>

          <h2>Métiers BTP les plus concernés à {ville.nom}</h2>
          <p>
            Tous les corps de métier du BTP sont soumis à l&apos;obligation décennale. Voici les
            plus sollicités à {ville.nom}&nbsp;:
          </p>
        </section>

        <ul className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {featuredMetiers.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/assurance-decennale/${m.slug}`}
                className="block rounded-lg border border-gray-200 bg-white p-3 transition hover:shadow-md"
              >
                <span className="mr-1 text-xl" aria-hidden="true">
                  {m.icon}
                </span>
                <span className="text-sm font-semibold text-gray-900">{m.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mb-10 rounded-lg border border-primary-200 bg-primary-50 p-6">
          <h2 className="mb-3 text-xl font-bold">Devis décennale {ville.nom} en 2 minutes</h2>
          <p className="mb-4 text-sm">
            Notre équipe de courtiers ORIAS interroge nos 10 assureurs partenaires pour vous
            présenter les meilleures offres. <strong>Aucun frais de courtage facturé.</strong>
          </p>
          <Link
            href={`/devis?garantie=decennale&ville=${encodeURIComponent(ville.slug)}`}
            className="inline-block rounded bg-primary-700 px-6 py-3 font-semibold text-white hover:bg-primary-800"
          >
            Obtenir mon devis →
          </Link>
        </section>

        {otherCities.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold">Autres villes en {ville.regionNom}</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/assurance-decennale/${c.slug}`}
                    className="text-primary-700 hover:underline"
                  >
                    Décennale {c.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="border-t border-gray-200 pt-6">
          <h2 className="mb-3 text-lg font-bold">Voir aussi</h2>
          <ul className="space-y-1.5 text-sm">
            <li>
              <Link href="/assurance-decennale" className="text-primary-700 hover:underline">
                Page pilier — Assurance décennale BTP
              </Link>
            </li>
            <li>
              <Link href="/comparateur-assureurs" className="text-primary-700 hover:underline">
                Comparateur des 10 assureurs partenaires
              </Link>
            </li>
            <li>
              <Link href="/normes" className="text-primary-700 hover:underline">
                Normes &amp; conformité (Loi Spinetta, art. 1792 C. civ.)
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
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="mb-1 text-2xl" aria-hidden="true">
        {icon}
      </div>
      <div className="mb-0.5 text-xs text-gray-500">{label}</div>
      <div className="text-base font-semibold text-gray-900">{value}</div>
    </div>
  )
}
