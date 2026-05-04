/**
 * Page À propos — E-E-A-T critique YMYL
 * Identité du courtier ORIAS, équipe, méthode, conformité
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildOriasFicheUrl, formatOriasDisplay, buildOriasRegistryUrl } from '@/lib/api/orias'
import { SITE_URL } from '@/lib/seo/config'

const ORIAS = process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'

export const metadata: Metadata = {
  title: 'À propos — Cabinet de courtage ORIAS | Assurance Pro',
  description:
    'Cabinet de courtage indépendant ORIAS spécialisé en assurance professionnelle. 17 verticaux. 10+ assureurs partenaires. Membre CSCA.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assurance-pro.fr'}/a-propos`,
  },
  openGraph: {
    title: 'À propos — Cabinet de courtage ORIAS | Assurance Pro',
    description:
      'Cabinet de courtage indépendant ORIAS spécialisé en assurance professionnelle. 17 verticaux. 10+ assureurs partenaires. Membre CSCA.',
    url: `${SITE_URL}/a-propos`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos — Cabinet de courtage ORIAS | Assurance Pro',
    description:
      'Cabinet de courtage indépendant ORIAS spécialisé en assurance professionnelle. 17 verticaux. 10+ assureurs partenaires. Membre CSCA.',
  },
}

export default function AProposPage() {
  const oriasFiche = buildOriasFicheUrl(ORIAS.replace(/\s/g, '') || '07000000')
  const oriasFormatted = formatOriasDisplay(ORIAS.replace(/\s/g, '') || '07000000')

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-blue-700 to-blue-900 py-16 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">Notre cabinet</h1>
          <p className="max-w-3xl text-lg opacity-95 md:text-xl">
            Courtier en assurance professionnelle ORIAS, indépendant, transparent. Notre
            mission&nbsp;: obtenir pour vous la meilleure couverture au tarif le plus juste, sur les
            17 verticaux de l’assurance pro française.
          </p>
        </div>
      </header>

      <section className="py-12">
        <div className="prose prose-lg container mx-auto max-w-3xl px-4">
          <h2>Qui sommes-nous&nbsp;?</h2>
          <p>
            Assurance Pro est un cabinet de courtage en assurance indépendant, immatriculé à l’ORIAS
            sous le numéro&nbsp;
            <a
              href={oriasFiche}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              {oriasFormatted}
            </a>
            &nbsp;(catégorie&nbsp;: Courtier en Assurance, type b).
          </p>
          <p>
            Notre cabinet est spécialisé dans l’
            <strong>assurance professionnelle multi-vertical</strong> : artisans du BTP, professions
            libérales, services aux entreprises, restauration, commerce, médical, juridique,
            transport (VTC/Taxi), e-commerce et cyber. Nous travaillons avec un panel de plus de 10
            assureurs partenaires (Hiscox, April Pro, Allianz Pro, MMA, Generali, AXA Pro, MAAF,
            SMABTP, Wakam, Stello…) afin de comparer pour vous les meilleures offres du marché.
          </p>

          <h2>Pourquoi un courtier&nbsp;?</h2>
          <p>
            Contrairement à un agent général lié à une seule compagnie, le courtier travaille pour
            <strong> votre intérêt</strong>. Nous interrogeons plusieurs assureurs, négocions les
            conditions, et vous accompagnons dans la durée (modifications de garanties, gestion de
            sinistres, renouvellement, résiliation Hamon).
          </p>
          <p>
            Notre rémunération est exclusivement assurée par les{' '}
            <strong>commissions versées par les compagnies d’assurance partenaires</strong>. Aucun
            frais de courtage n’est facturé à nos clients, conformément à la transparence DDA (art.
            L.&nbsp;521-2 du Code des assurances).
          </p>

          <h2>Notre méthode</h2>
          <ol>
            <li>
              <strong>Recueil d’exigences et besoins</strong> — Nous analysons votre activité, votre
              profil de risque, vos antécédents et vos objectifs (Recommandation ACPR 2024-R-03).
            </li>
            <li>
              <strong>Mise en concurrence</strong> — Nous interrogeons 3 à 5 assureurs partenaires
              compatibles avec votre profil et négocions les conditions.
            </li>
            <li>
              <strong>Conseil personnalisé motivé</strong> — Nous vous remettons par écrit notre
              recommandation, l’explication du choix produit et l’examen des alternatives (devoir de
              conseil DDA, art. L.&nbsp;521-4).
            </li>
            <li>
              <strong>Accompagnement</strong> — Nous gérons la souscription, l’attestation et les
              évolutions du contrat tout au long de la relation.
            </li>
          </ol>

          <h2>Notre conformité</h2>
          <p>
            Nous opérons dans le strict respect du Code des assurances et de la doctrine de
            l’Autorité de Contrôle Prudentiel et de Résolution (ACPR)&nbsp;:
          </p>
          <ul>
            <li>
              Immatriculation ORIAS à jour, vérifiable sur{' '}
              <a href={buildOriasRegistryUrl()} target="_blank" rel="noopener noreferrer">
                orias.fr
              </a>
            </li>
            <li>
              RCP renforcée et garantie financière conformes aux art. L.&nbsp;512-6 et L.&nbsp;512-7
              C.&nbsp;assur.
            </li>
            <li>
              Procédure de réclamation conforme à la <strong>Recommandation ACPR 2024-R-02</strong>
            </li>
            <li>
              Recueil du devoir de conseil traçable conforme à la{' '}
              <strong>Recommandation ACPR 2024-R-03</strong>
            </li>
            <li>Adhérent CSCA (Chambre Syndicale des Courtiers d’Assurances)</li>
            <li>DPO externe et registre des traitements RGPD à jour</li>
          </ul>

          <h2>Nos partenaires assureurs</h2>
          <div className="not-prose mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              'Hiscox',
              'April Pro',
              'Allianz Pro',
              'MMA Pro',
              'Generali Pro',
              'AXA Pro',
              'MAAF Pro',
              'SMABTP',
              'Wakam',
              'Stello',
            ].map((p) => (
              <div key={p} className="rounded bg-gray-50 px-4 py-3 text-center font-medium">
                {p}
              </div>
            ))}
          </div>

          <h2>Nous contacter</h2>
          <p>
            Pour une demande de devis personnalisé&nbsp;:{' '}
            <Link href="/devis" className="font-semibold">
              remplissez notre formulaire en ligne
            </Link>{' '}
            (réponse sous 24h).
          </p>
          <p>
            Pour toute autre question&nbsp;:{' '}
            <Link href="/contact" className="font-semibold">
              page contact
            </Link>
            .
          </p>
          <p>
            Pour une réclamation&nbsp;:{' '}
            <a href="mailto:reclamations@assurance-pro.fr" className="font-semibold">
              reclamations@assurance-pro.fr
            </a>{' '}
            — accusé réception sous 10 jours ouvrés, réponse sur le fond sous 2 mois (Reco ACPR
            2024-R-02). En cas de désaccord persistant, vous pouvez saisir{' '}
            <a
              href="https://www.mediation-assurance.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              le Médiateur de l’Assurance
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
