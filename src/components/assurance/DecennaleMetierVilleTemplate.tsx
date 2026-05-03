import Link from 'next/link'
import type { MetierBtp } from '@/lib/data/decennale-metiers'
import type { VilleData } from '@/lib/data/villes-top100'
import { VILLES_TOP100 } from '@/lib/data/villes-top100'
import { DECENNALE_METIERS } from '@/lib/data/decennale-metiers'

const ZONE_LABEL: Record<VilleData['zonageRisque'], string> = {
  urbain_dense: 'urbain dense',
  urbain: 'urbain',
  periurbain: 'périurbain',
  rural: 'rural',
}

// Le tarif local s'ajuste légèrement selon la zone (les assureurs majorent
// les zones urbain_dense pour la sinistralité dégât des eaux et incendie).
const ZONE_PREMIUM: Record<VilleData['zonageRisque'], number> = {
  urbain_dense: 1.15,
  urbain: 1.05,
  periurbain: 1.0,
  rural: 0.95,
}

function adjustTariff(base: { min: number; max: number }, zone: VilleData['zonageRisque']) {
  const k = ZONE_PREMIUM[zone]
  return {
    min: Math.round(base.min * k),
    max: Math.round(base.max * k),
  }
}

export function DecennaleMetierVilleTemplate({
  metier,
  ville,
}: {
  metier: MetierBtp
  ville: VilleData
}) {
  const ae = adjustTariff(metier.tarifs.auto_entrepreneur, ville.zonageRisque)
  const pme = adjustTariff(metier.tarifs.pme_50k_100k, ville.zonageRisque)
  const pmeMid = adjustTariff(metier.tarifs.pme_100k_250k, ville.zonageRisque)
  const grand = adjustTariff(metier.tarifs.grand_compte, ville.zonageRisque)

  const otherCitiesSameRegion = VILLES_TOP100.filter(
    (v) => v.regionSlug === ville.regionSlug && v.slug !== ville.slug
  ).slice(0, 6)

  const otherMetiersSameRisk = Object.values(DECENNALE_METIERS)
    .filter(
      (m) =>
        m.slug !== metier.slug && Math.abs(m.niveauRisque - metier.niveauRisque) <= 1
    )
    .slice(0, 6)

  const partLocale = Math.round(
    (metier.nbEntreprisesFrance / 600_000) * ville.artisansBtpEstime
  )

  return (
    <main className="min-h-screen bg-white py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>{' '}
          ›{' '}
          <Link href="/assurance-decennale" className="hover:underline">
            Assurance décennale
          </Link>{' '}
          ›{' '}
          <Link href={`/assurance-decennale/${metier.slug}`} className="hover:underline">
            {metier.name}
          </Link>{' '}
          › <span className="text-gray-900">{ville.nom}</span>
        </nav>

        <header className="mb-8">
          <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded mb-3">
            OBLIGATION LÉGALE — LOI SPINETTA
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Assurance décennale {metier.name.toLowerCase()} à {ville.nom} ({ville.departementCode})
          </h1>
          <p className="text-gray-700 text-lg">
            Tarifs négociés pour les <strong>{metier.name.toLowerCase()}s</strong> exerçant à{' '}
            {ville.nom}. À partir de <strong>{ae.min} €/an</strong> pour un auto-entrepreneur.
            Attestation 24h, conseil ORIAS, 10 assureurs partenaires.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Stat
            icon={metier.icon}
            label="Métier"
            value={metier.name}
            sub={`Risque ${metier.niveauRisque}/5`}
          />
          <Stat
            icon="📍"
            label={ville.departementNom}
            value={ville.nom}
            sub={`${ville.regionNom} — zone ${ZONE_LABEL[ville.zonageRisque]}`}
          />
          <Stat
            icon="💰"
            label="À partir de"
            value={`${ae.min} €/an`}
            sub="auto-entrepreneur"
          />
        </div>

        <section className="prose prose-lg max-w-none mb-10">
          <h2>
            Pourquoi un {metier.name.toLowerCase()} à {ville.nom} doit souscrire une décennale
          </h2>
          <p>
            En tant que <strong>{metier.name.toLowerCase()}</strong> exerçant à {ville.nom}, vous
            êtes soumis à la <strong>Loi Spinetta du 4 janvier 1978</strong> (art. L. 241-1 du Code
            des assurances). Vos travaux relevant de la garantie décennale couvrent tous les
            ouvrages susceptibles d&apos;affecter la solidité de l&apos;ouvrage ou de le rendre
            impropre à sa destination.
          </p>
          <p>
            La sinistralité moyenne du métier <strong>{metier.name.toLowerCase()}</strong> est de{' '}
            <strong>{metier.sinistraliteAqc}%</strong> (source AQC SYCODÉS 2024) avec un coût moyen
            de sinistre de <strong>{metier.coutSinistreMoyen.toLocaleString('fr-FR')} €</strong>.
            La zone {ZONE_LABEL[ville.zonageRisque]} de {ville.nom} ajoute un facteur de{' '}
            {Math.round((ZONE_PREMIUM[ville.zonageRisque] - 1) * 100)}% sur le tarif de base.
          </p>

          <h2>
            Tarifs décennale {metier.name.toLowerCase()} à {ville.nom} (2026)
          </h2>
          <p>
            Fourchettes indicatives ajustées au zonage{' '}
            <strong>{ZONE_LABEL[ville.zonageRisque]}</strong> de {ville.nom}, basées sur les
            barèmes 2026 de nos 10 assureurs partenaires&nbsp;:
          </p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Profil</th>
                <th className="border border-gray-300 p-2 text-right">Tarif annuel HT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Auto-entrepreneur (CA &lt; 50 k€)</td>
                <td className="border border-gray-300 p-2 text-right">
                  {ae.min} € – {ae.max} €
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">PME (CA 50–100 k€)</td>
                <td className="border border-gray-300 p-2 text-right">
                  {pme.min} € – {pme.max} €
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">PME (CA 100–250 k€)</td>
                <td className="border border-gray-300 p-2 text-right">
                  {pmeMid.min} € – {pmeMid.max} €
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Grand compte (CA &gt; 500 k€)</td>
                <td className="border border-gray-300 p-2 text-right">
                  {grand.min} € – {grand.max} €
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs italic text-gray-600 mt-2">
            Tarifs indicatifs incluant la majoration de zone {ZONE_LABEL[ville.zonageRisque]} (
            ×{ZONE_PREMIUM[ville.zonageRisque]}). Devis personnalisé recommandé via le formulaire.
          </p>

          <h2>
            Marché local — {metier.name.toLowerCase()} à {ville.nom}
          </h2>
          <p>
            {ville.nom} (population {ville.population.toLocaleString('fr-FR')}) compte environ{' '}
            <strong>{ville.artisansBtpEstime.toLocaleString('fr-FR')} artisans BTP</strong>. À
            l&apos;échelle nationale, on dénombre{' '}
            <strong>{metier.nbEntreprisesFrance.toLocaleString('fr-FR')}</strong>{' '}
            {metier.name.toLowerCase()}s — soit une estimation locale d&apos;environ{' '}
            <strong>{partLocale.toLocaleString('fr-FR')}</strong> {metier.name.toLowerCase()}s à{' '}
            {ville.nom} et son agglomération.
          </p>

          <h2>Risques métier spécifiques</h2>
          <ul>
            {metier.risques.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <h2>Top causes de sinistres ({metier.name.toLowerCase()})</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Cause</th>
                <th className="border border-gray-300 p-2 text-right">Part</th>
              </tr>
            </thead>
            <tbody>
              {metier.topCauses.map((c) => (
                <tr key={c.cause}>
                  <td className="border border-gray-300 p-2">{c.cause}</td>
                  <td className="border border-gray-300 p-2 text-right">{c.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Garanties recommandées</h2>
          <ul>
            {metier.garantiesSpecifiques.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10">
          <h2 className="text-xl font-bold mb-3">
            Devis décennale {metier.name.toLowerCase()} à {ville.nom}
          </h2>
          <p className="text-gray-700 mb-4">
            Recevez sous 24h jusqu&apos;à 5 propositions d&apos;assureurs adaptées à votre profil
            de {metier.name.toLowerCase()} et au marché local de {ville.nom}.
          </p>
          <Link
            href={`/devis?garantie=decennale&metier=${metier.slug}&ville=${ville.slug}`}
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded hover:bg-blue-700 transition"
          >
            Obtenir mon devis gratuit
          </Link>
        </section>

        {otherMetiersSameRisk.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3">Autres métiers à risque comparable</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {otherMetiersSameRisk.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/assurance-decennale/${m.slug}/${ville.slug}`}
                    className="block p-3 border rounded hover:bg-gray-50"
                  >
                    {m.icon} {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {otherCitiesSameRegion.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3">
              {metier.name} dans d&apos;autres villes de {ville.regionNom}
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {otherCitiesSameRegion.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/assurance-decennale/${metier.slug}/${v.slug}`}
                    className="block p-3 border rounded hover:bg-gray-50"
                  >
                    📍 {v.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: string
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs text-gray-600 uppercase tracking-wide">{label}</div>
      <div className="font-bold text-lg">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  )
}
