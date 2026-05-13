import type { Metadata } from 'next'
import Link from 'next/link'
import { Scale } from 'lucide-react'
import { SITE_URL } from '@/lib/seo/config'
import { PageHero } from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Mentions légales | Vivos Assurance',
  description:
    'Mentions légales du cabinet de courtage ORIAS Vivos Assurance. Éditeur, hébergeur, ORIAS, ACPR, RCP, garantie financière, propriété intellectuelle.',
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mentions légales | Vivos Assurance',
    description:
      'Mentions légales du cabinet de courtage ORIAS Vivos Assurance. Éditeur, hébergeur, ORIAS, ACPR, RCP, garantie financière, propriété intellectuelle.',
    url: `${SITE_URL}/mentions-legales`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentions légales | Vivos Assurance',
    description:
      'Mentions légales du cabinet de courtage ORIAS Vivos Assurance. Éditeur, hébergeur, ORIAS, ACPR, RCP, garantie financière, propriété intellectuelle.',
  },
}

export default function MentionsLegalesPage() {
  const orias = process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'
  const editor = process.env.NEXT_PUBLIC_LEGAL_EDITOR ?? 'Vivos Assurance SAS'
  const siret = process.env.NEXT_PUBLIC_LEGAL_SIRET ?? 'XXX XXX XXX 00000'
  const rcs = process.env.NEXT_PUBLIC_LEGAL_RCS ?? 'RCS Paris'
  const capital = process.env.NEXT_PUBLIC_LEGAL_CAPITAL ?? '10 000 €'
  const address = process.env.NEXT_PUBLIC_LEGAL_ADDRESS ?? 'XX rue de la Paix, 75000 Paris'
  const tva = process.env.NEXT_PUBLIC_LEGAL_TVA ?? 'FRXX XXX XXX XXX'

  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero
        breadcrumbs={[{ label: 'Mentions légales' }]}
        eyebrow="Information légale obligatoire"
        EyebrowIcon={Scale}
        title="Mentions légales"
        description="Éditeur, hébergeur, ORIAS, ACPR, RCP, garantie financière, propriété intellectuelle."
        size="sm"
      />

      <div className="container mx-auto max-w-3xl px-4 py-14">
        <article className="pilier-prose prose prose-lg max-w-none text-charcoal-700">
          <p className="text-sm text-charcoal-500">Dernière mise à jour : 30 avril 2026</p>

          <h2>1. Éditeur du site</h2>
          <p>
            <strong>{editor}</strong>
            <br />
            Société par Actions Simplifiée au capital de {capital}
            <br />
            Siège social : {address}
            <br />
            SIRET : {siret} — {rcs}
            <br />
            N° TVA intracommunautaire : {tva}
            <br />
            Tél. : 01 XX XX XX XX — Email :{' '}
            <a href="mailto:contact@vivos-assurance.fr">contact@vivos-assurance.fr</a>
          </p>

          <h2>2. Directeur de la publication</h2>
          <p>Le directeur de la publication est le représentant légal du cabinet.</p>

          <h2>3. Hébergeur</h2>
          <p>
            <strong>Vercel Inc.</strong> — 340 S Lemon Ave #4133, Walnut, CA 91789, USA
            <br />
            Site :{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
          </p>
          <p>
            Données : <strong>Supabase Inc.</strong> — région Europe (Frankfurt, eu-central-1).
          </p>

          <h2>4. Immatriculation ORIAS</h2>
          <p>
            {editor} est immatriculé au Registre unique des intermédiaires en assurance, banque et
            finance (<strong>ORIAS</strong>) sous le numéro <strong>{orias}</strong> en qualité de
            <strong> Courtier en Assurance (catégorie b)</strong>, conformément à l&apos;article L.
            512-1 du Code des assurances.
          </p>
          <p>
            Vérification possible sur{' '}
            <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer">
              www.orias.fr
            </a>
            .
          </p>

          <h2>5. Autorité de contrôle</h2>
          <p>
            <strong>Autorité de Contrôle Prudentiel et de Résolution (ACPR)</strong>
            <br />
            4 Place de Budapest, CS 92459 — 75436 Paris Cedex 09
            <br />
            Tél. : 01 49 95 40 00 —{' '}
            <a href="https://acpr.banque-france.fr" target="_blank" rel="noopener noreferrer">
              acpr.banque-france.fr
            </a>
          </p>

          <h2>6. Garantie financière et Responsabilité Civile Professionnelle</h2>
          <p>
            Conformément aux articles L. 512-6 et L. 512-7 du Code des assurances, le cabinet
            dispose d&apos;une <strong>Garantie Financière</strong> et d&apos;une{' '}
            <strong>RCP</strong> auprès d&apos;un assureur agréé. Plafonds :{' '}
            <strong>5 000 000 € par sinistre / 7 500 000 € par année</strong>
            (au-delà du minimum légal de 1 850 000 € / 2 500 000 €).
          </p>

          <h2>7. Adhésion à une association professionnelle agréée</h2>
          <p>
            Membre de la <strong>Chambre Syndicale des Courtiers d&apos;Assurances (CSCA)</strong>,
            association professionnelle agréée au titre de l&apos;article L. 513-3 du Code des
            assurances.
          </p>

          <h2>8. Indépendance et conseil</h2>
          <p>
            Le cabinet exerce son activité de manière <strong>indépendante</strong> : aucun lien
            capitalistique ni obligation contractuelle de placement avec une compagnie en
            particulier. Notre analyse de marché porte sur un nombre suffisant de contrats
            disponibles pour fonder une recommandation motivée (art. L. 521-4 C. assur.).
          </p>

          <h2>9. Rémunération</h2>
          <p>
            Notre rémunération est exclusivement constituée des commissions versées par les
            compagnies d&apos;assurance partenaires. Aucun honoraire n&apos;est facturé au client.
            Le détail peut être communiqué sur demande écrite avant souscription.
          </p>

          <h2>10. Réclamations et médiation</h2>
          <p>
            Toute réclamation peut être adressée par formulaire dédié{' '}
            <Link href="/reclamation">ici</Link> ou par email à{' '}
            <a href="mailto:reclamations@vivos-assurance.fr">reclamations@vivos-assurance.fr</a>. En
            cas de désaccord persistant, vous pouvez saisir le{' '}
            <strong>Médiateur de l&apos;Assurance</strong> : TSA 50110, 75441 Paris cedex 09 —{' '}
            <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener noreferrer">
              www.mediation-assurance.org
            </a>
            .
          </p>

          <h2>11. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du site (textes, graphismes, logos, icônes, comparatifs, données, base
            de données) est la propriété exclusive de {editor} ou fait l&apos;objet d&apos;une
            autorisation d&apos;usage. Toute reproduction, représentation, modification,
            publication, transmission, dénaturation, totale ou partielle, sur quelque support que ce
            soit, est interdite sans autorisation écrite préalable.
          </p>

          <h2>12. Liens hypertextes</h2>
          <p>
            Les liens vers des sites externes sont fournis à titre informatif. {editor} ne saurait
            être tenu responsable du contenu de sites tiers.
          </p>

          <h2>13. Protection des données personnelles</h2>
          <p>
            Voir notre <Link href="/confidentialite">Politique de confidentialité</Link> et notre{' '}
            <Link href="/cookies">Politique cookies</Link>.
          </p>

          <h2>14. Droit applicable</h2>
          <p>
            Les présentes mentions sont régies par le droit français. Tout litige relève de la
            compétence des tribunaux français après tentative de résolution amiable.
          </p>
        </article>
      </div>
    </main>
  )
}
