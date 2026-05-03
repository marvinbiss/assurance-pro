import Link from 'next/link'
import type { VilleData } from '@/lib/data/villes-top100'
import { VILLES_TOP100 } from '@/lib/data/villes-top100'
import { getProfession } from '@/lib/data/rc-pro-professions'

const FEATURED_PROFESSION_SLUGS = [
  'consultant',
  'freelance-it',
  'agence-web',
  'designer',
  'photographe',
  'coach-pro',
]

export function RcProVilleTemplate({ ville }: { ville: VilleData }) {
  const otherCities = VILLES_TOP100.filter(
    (c) => c.regionSlug === ville.regionSlug && c.slug !== ville.slug
  ).slice(0, 6)

  const featured = FEATURED_PROFESSION_SLUGS.map((s) => getProfession(s)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  )

  return (
    <main className="min-h-screen bg-white py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>{' '}
          ›{' '}
          <Link href="/rc-pro" className="hover:underline">
            RC Pro
          </Link>{' '}
          › <span className="text-gray-900">{ville.nom}</span>
        </nav>

        <header className="mb-8">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded mb-3">
            RECOMMANDÉ POUR FREELANCES & PME
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            RC Pro {ville.nom} ({ville.departementCode}) — Tarifs et devis
          </h1>
          <p className="text-gray-700 text-lg">
            Responsabilité Civile Professionnelle pour les{' '}
            <strong>~{ville.freelancesEstime.toLocaleString('fr-FR')} freelances, consultants et
            agences</strong> de {ville.nom}. Plafond 500k€ à 2M€. Souscription en ligne, attestation
            immédiate.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Stat
            icon="📍"
            label={`${ville.departementNom} (${ville.departementCode})`}
            value={ville.regionNom}
          />
          <Stat
            icon="💼"
            label="Freelances & TPE"
            value={`~${ville.freelancesEstime.toLocaleString('fr-FR')}`}
          />
          <Stat icon="💰" label="À partir de" value="95€/an" />
        </div>

        <section className="prose prose-lg max-w-none mb-10">
          <h2>Pourquoi souscrire une RC Pro à {ville.nom} ?</h2>
          <p>
            Sans RC Pro, vous engagez votre patrimoine personnel (auto-entrepreneur, EI) ou celui de
            votre société en cas de mise en cause par un client mécontent. Un litige peut représenter
            plusieurs dizaines voire centaines de milliers d&apos;euros (frais d&apos;avocats,
            dommages-intérêts, perte d&apos;exploitation).
          </p>
          <p>
            À {ville.nom}, la RC Pro est <strong>fortement recommandée</strong> et de plus en plus
            exigée par les clients (ESN, grands comptes, appels d&apos;offres publics). Pour les
            professions réglementées (avocats, médecins, architectes, experts-comptables), elle est
            <strong> légalement obligatoire</strong>.
          </p>

          <h2>Tarifs RC Pro à {ville.nom}</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Profil</th>
                <th className="border border-gray-300 p-2 text-right">Tarif annuel HT</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2">Auto-entrepreneur / freelance</td><td className="border border-gray-300 p-2 text-right">95 € – 380 €</td></tr>
              <tr><td className="border border-gray-300 p-2">EI / EURL (CA &lt; 100 k€)</td><td className="border border-gray-300 p-2 text-right">280 € – 850 €</td></tr>
              <tr><td className="border border-gray-300 p-2">SARL / SAS (CA 100-500 k€)</td><td className="border border-gray-300 p-2 text-right">850 € – 3 200 €</td></tr>
              <tr><td className="border border-gray-300 p-2">Grand compte (CA &gt; 500 k€)</td><td className="border border-gray-300 p-2 text-right">3 200 € – 12 000 €</td></tr>
            </tbody>
          </table>
          <p className="text-xs italic text-gray-600 mt-2">
            Tarifs indicatifs. Le tarif réel dépend de votre activité, plafond souhaité, ancienneté
            et antécédents. Plafond standard 500k€-1M€ ; option 2M€ ou plus pour grands comptes.
          </p>

          <h2>Métiers les plus concernés à {ville.nom}</h2>
          <p>
            {ville.nom} concentre une forte densité de freelances et TPE de service ({ville.freelancesEstime.toLocaleString('fr-FR')} estimés).
            Voici les profils les plus représentés&nbsp;:
          </p>
        </section>

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/rc-pro/${p.slug}`}
                className="block bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
              >
                <span className="text-xl mr-1" aria-hidden="true">{p.icon}</span>
                <span className="font-semibold text-sm text-gray-900">{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10">
          <h2 className="text-xl font-bold mb-3">Devis RC Pro {ville.nom} en 2 minutes</h2>
          <p className="text-sm mb-4">
            Notre équipe ORIAS interroge nos 10 assureurs partenaires pour vous présenter les meilleures
            offres. <strong>Aucun frais de courtage facturé.</strong>
          </p>
          <Link
            href={`/devis?garantie=rc-pro&ville=${encodeURIComponent(ville.slug)}`}
            className="inline-block px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded font-semibold"
          >
            Obtenir mon devis →
          </Link>
        </section>

        {otherCities.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3">Autres villes en {ville.regionNom}</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/rc-pro/${c.slug}`} className="text-blue-700 hover:underline">
                    RC Pro {c.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold mb-3">Voir aussi</h2>
          <ul className="text-sm space-y-1.5">
            <li><Link href="/rc-pro" className="text-blue-700 hover:underline">Page pilier — RC Pro</Link></li>
            <li><Link href="/comparateur-assureurs" className="text-blue-700 hover:underline">Comparateur des 10 assureurs</Link></li>
            <li><Link href="/cyber-assurance" className="text-blue-700 hover:underline">Cyber assurance — complémentaire</Link></li>
          </ul>
        </section>
      </div>
    </main>
  )
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="text-2xl mb-1" aria-hidden="true">{icon}</div>
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className="text-base font-semibold text-gray-900">{value}</div>
    </div>
  )
}
