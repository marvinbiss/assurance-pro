/**
 * Pilier — Décennale micro-entreprise (sous /assurance-decennale/[slug])
 * KW Ahrefs : "assurance decennale micro entreprise" 150 vol KD 0 CPC 500€
 * Note routing : route statique prend priorité sur [slug] dynamique.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale/micro-entreprise'
const TITLE = 'Décennale micro-entreprise BTP — Tarifs 2026, Loi Spinetta'
const TAGLINE =
  'La décennale obligatoire pour les micro-entreprises BTP : Loi Spinetta, tarifs négociés à partir de 480€/an, attestation 24h, conseil ORIAS spécialisé artisans.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale micro-entreprise BTP : OBLIGATOIRE Loi Spinetta. Tarifs 480-1 540€/an selon métier. Attestation 24h. 8 assureurs comparés (Hiscox, April Pro, SMABTP, MMA, AXA Pro, Wakam, Stello, Generali). Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance décennale est OBLIGATOIRE pour TOUS les micro-entrepreneurs (= auto-entrepreneurs, dénomination légale depuis 2016) du BTP, sans exception : maçons, plombiers, électriciens, peintres, couvreurs, carreleurs, menuisiers, charpentiers. Imposée par la Loi Spinetta du 4 janvier 1978 (article L. 241-1 du Code des assurances), elle couvre pendant 10 ans à compter de la réception des travaux les dommages compromettant la solidité de l'ouvrage. Sans elle : 75 000€ d'amende + 6 mois de prison + interdiction d'exercer (art. L. 243-3 C. assur.). Pour les micro-entreprises : tarifs préférentiels « jeune installé » + procédure simplifiée + attestation 24h. Cette page est une variante terminologique de notre pilier complet <a href='/assurance-decennale/auto-entrepreneur' class='text-primary-600 underline'>/assurance-decennale/auto-entrepreneur</a> qui couvre les mêmes garanties (micro-entrepreneur = auto-entrepreneur, même statut juridique)."
      legalReference="Loi Spinetta — Article L. 241-1 du Code des assurances"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'Loi Spinetta OBLIGATOIRE',
          desc: "Sanctions absence : 75 000€ + 6 mois prison + interdiction d'exercer",
        },
        {
          icon: '💰',
          title: 'À partir de 480 €/an',
          desc: 'Micro-entreprise BTP peintre/plaquiste. Couvreur : 820-1 540€/an',
        },
        {
          icon: '⚡',
          title: 'Attestation 24h',
          desc: 'Conforme arrêté 23 janvier 2024. Mention obligatoire sur devis et factures',
        },
        {
          icon: '🏗️',
          title: '8 assureurs comparés',
          desc: 'Hiscox, April Pro, SMABTP, MMA Pro, AXA Pro, Wakam, Stello, Generali',
        },
      ]}
      sections={[
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <p>Cette page renvoie vers nos piliers spécialisés :</p>
              <ul>
                <li>
                  <Link
                    href="/assurance-decennale/auto-entrepreneur"
                    className="text-primary-600 underline"
                  >
                    Décennale auto-entrepreneur
                  </Link>{' '}
                  — pilier complet (tarifs détaillés par métier, procédure 24h, modèle attestation)
                </li>
                <li>
                  <Link href="/assurance-decennale" className="text-primary-600 underline">
                    Pilier décennale BTP
                  </Link>{' '}
                  — Loi Spinetta + 37 métiers BTP couverts
                </li>
                <li>
                  <Link href="/assurance-micro-entreprise" className="text-primary-600 underline">
                    Assurance micro-entreprise
                  </Link>{' '}
                  — pack global pour micro-entrepreneurs (RC Pro, multirisque, mutuelle)
                </li>
                <li>
                  <Link href="/guides/attestation-decennale" className="text-primary-600 underline">
                    Guide attestation décennale
                  </Link>{' '}
                  — 11 mentions obligatoires + modèle PDF
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Différence entre micro-entrepreneur et auto-entrepreneur ?',
          a: "AUCUNE — c'est le MÊME statut juridique. « Auto-entrepreneur » est la dénomination historique (créée en 2009). « Micro-entrepreneur » est la dénomination LÉGALE OFFICIELLE depuis la Loi du 9 août 2016. Côté assurance : mêmes contrats, mêmes obligations, mêmes tarifs.",
        },
        {
          q: 'Combien coûte la décennale pour une micro-entreprise BTP ?',
          a: "Démarre à 480€/an pour un peintre/plaquiste. Médiane marché : 640-1 080€/an pour plombier/électricien. Plafond pratique : 1 540€/an pour couvreur-zingueur. Variables : métier, CA prévisionnel, antécédents. Voir tarifs détaillés par métier sur <a href='/assurance-decennale/auto-entrepreneur' class='text-primary-600 underline'>/assurance-decennale/auto-entrepreneur</a>.",
        },
        {
          q: "Combien de temps pour obtenir l'attestation ?",
          a: '24h ouvrées via notre formulaire. Procédure « Express 6h » disponible pour chantiers urgents (+80€).',
        },
      ]}
    />
  )
}
