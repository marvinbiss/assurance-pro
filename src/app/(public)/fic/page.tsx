import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: "Fiche d'Information Précontractuelle (FIC)",
  description:
    "Fiche d'information précontractuelle de notre cabinet de courtage ORIAS. Identité, statut, rémunération, conseil, conformité DDA art. L. 521-2 du Code des assurances.",
  alternates: { canonical: `${SITE_URL}/fic` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Fiche d'Information Précontractuelle (FIC)",
    description:
      "Fiche d'information précontractuelle de notre cabinet de courtage ORIAS. Identité, statut, rémunération, conseil, conformité DDA art. L. 521-2 du Code des assurances.",
    url: `${SITE_URL}/fic`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fiche d'Information Précontractuelle (FIC)",
    description:
      "Fiche d'information précontractuelle de notre cabinet de courtage ORIAS. Identité, statut, rémunération, conseil, conformité DDA art. L. 521-2 du Code des assurances.",
  },
}

export default function FicPage() {
  const orias = process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? "En cours d'attribution"
  const editor = process.env.NEXT_PUBLIC_LEGAL_EDITOR ?? 'Vivos Assurance SAS'
  const address =
    process.env.NEXT_PUBLIC_LEGAL_ADDRESS ??
    "Cabinet en Île-de-France (adresse précise publiée à l'attribution ORIAS)"

  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <PageHero
        breadcrumbs={[{ label: 'FIC (DDA)' }]}
        eyebrow="Fiche d'Information Cabinet · DDA"
        EyebrowIcon={FileText}
        title="FIC — Fiche d'Information Cabinet"
        description="Informations précontractuelles obligatoires DDA (art. L. 521-2 C. assur.)."
        size="sm"
      />

      <div className="container mx-auto max-w-3xl px-4 py-14">
        <article className="pilier-prose prose prose-lg max-w-none text-charcoal-700">
          <p className="text-sm text-charcoal-500">
            Document précontractuel — Art. L. 521-2 du Code des assurances
          </p>
          <h1>Fiche d&apos;Information Précontractuelle (FIC)</h1>
          <p className="text-sm text-charcoal-500">Version : 30 avril 2026</p>

          <p>
            Conformément à l&apos;<strong>article L. 521-2 du Code des assurances</strong>{' '}
            (transposition de la <strong>Directive Distribution Assurance — DDA</strong>), nous vous
            communiquons, préalablement à toute souscription, les informations qui suivent.
          </p>

          <h2>1. Identité et statut du distributeur</h2>
          <table>
            <tbody>
              <tr>
                <td>Raison sociale</td>
                <td>{editor}</td>
              </tr>
              <tr>
                <td>Siège social</td>
                <td>{address}</td>
              </tr>
              <tr>
                <td>N° ORIAS</td>
                <td>
                  <strong>{orias}</strong> — vérifiable sur{' '}
                  <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer">
                    www.orias.fr
                  </a>
                </td>
              </tr>
              <tr>
                <td>Catégorie</td>
                <td>Courtier en Assurance (catégorie b — art. L. 511-1 II 2°)</td>
              </tr>
              <tr>
                <td>Pays d&apos;origine</td>
                <td>France</td>
              </tr>
              <tr>
                <td>Autorité de contrôle</td>
                <td>ACPR — 4 Place de Budapest, 75436 Paris cedex 09</td>
              </tr>
            </tbody>
          </table>

          <h2>2. Conseil et analyse</h2>
          <p>
            Notre cabinet fournit ses recommandations sur la base d&apos;une{' '}
            <strong>
              analyse impartiale et personnalisée d&apos;un nombre suffisant de contrats
              d&apos;assurance offerts sur le marché
            </strong>
            (art. L. 521-1 II 2° C. assur.). Nous ne sommes pas tenus de placer nos clients
            exclusivement auprès d&apos;une ou plusieurs entreprises d&apos;assurance.
          </p>
          <p>
            Notre périmètre d&apos;analyse couvre <strong>10 compagnies partenaires</strong>{' '}
            (Hiscox, April Pro, MMA, Generali, AXA, MAAF, SMABTP, Allianz Pro, Wakam, Stello) sur
            les segments décennale, RC Pro, multirisque, mutuelle TNS, prévoyance, cyber, VTC,
            flotte auto pro.
          </p>

          <h2>3. Lien financier avec une entreprise d&apos;assurance</h2>
          <p>
            Nous déclarons{' '}
            <strong>n&apos;avoir aucun lien capitalistique direct ou indirect</strong> (10 % ou plus
            des droits de vote ou du capital) avec une entreprise d&apos;assurance. Aucune
            entreprise d&apos;assurance ne détient une participation égale ou supérieure à 10 % dans
            notre cabinet.
          </p>

          <h2>4. Mode de rémunération</h2>
          <p>
            Notre cabinet est rémunéré <strong>exclusivement par commissions</strong> versées par
            les compagnies d&apos;assurance lors de la souscription et tout au long de la vie du
            contrat.
          </p>
          <ul>
            <li>Aucun honoraire facturé au client.</li>
            <li>
              Le montant exact et la nature de la rémunération peuvent être communiqués sur demande
              écrite avant souscription.
            </li>
          </ul>

          <h2>5. Procédure de réclamation et médiation</h2>
          <p>
            Toute réclamation peut être déposée via notre{' '}
            <Link href="/reclamation">formulaire en ligne</Link> ou par email à{' '}
            <a href="mailto:reclamations@vivos-assurance.fr">reclamations@vivos-assurance.fr</a>.
          </p>
          <ul>
            <li>Accusé de réception sous 10 jours ouvrés (Recommandation ACPR 2024-R-02).</li>
            <li>Réponse au fond sous 2 mois maximum.</li>
            <li>
              Médiation gratuite :{' '}
              <a
                href="https://www.mediation-assurance.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Médiateur de l&apos;Assurance
              </a>
              .
            </li>
          </ul>

          <h2>6. Garantie financière et RCP</h2>
          <p>
            Conformément aux articles L. 512-6 et L. 512-7 du Code des assurances, le cabinet
            dispose d&apos;une <strong>Garantie Financière</strong> et d&apos;une{' '}
            <strong>RCP</strong> auprès d&apos;un assureur agréé. Plafonds&nbsp;:{' '}
            <strong>5 M€ par sinistre — 7,5 M€ par année</strong>.
          </p>

          <h2>7. Devoir de conseil (art. L. 521-4)</h2>
          <p>Avant toute souscription, nous&nbsp;:</p>
          <ol>
            <li>Recueillons vos exigences et besoins (questionnaire détaillé).</li>
            <li>Identifions les garanties indispensables à votre profil professionnel.</li>
            <li>Formulons par écrit une recommandation personnalisée et motivée.</li>
            <li>
              Documentons la traçabilité du conseil (Recommandation ACPR 2024-R-03 — applicable au
              31 décembre 2025).
            </li>
          </ol>

          <h2>8. Protection des données personnelles</h2>
          <p>
            Vos données sont traitées dans le respect du RGPD et de la Loi Informatique et Libertés.
            Voir notre <Link href="/confidentialite">Politique de confidentialité</Link>.
          </p>

          <h2>9. Téléchargement</h2>
          <p>
            Une version PDF de la présente FIC vous est remise au démarrage du processus de
            souscription. Sur demande à{' '}
            <a href="mailto:contact@vivos-assurance.fr">contact@vivos-assurance.fr</a>.
          </p>

          <p className="mt-8 text-xs italic text-charcoal-500">
            Cette fiche est conforme à l&apos;art. L. 521-2 du Code des assurances et à la
            Recommandation ACPR 2018-R-01 sur l&apos;information précontractuelle.
          </p>
        </article>
      </div>
    </main>
  )
}
