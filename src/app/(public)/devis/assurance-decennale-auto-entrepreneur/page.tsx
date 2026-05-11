/**
 * Devis — "devis assurance décennale auto entrepreneur" (100 vol, KD 2, CPC 1 000€) 🥇 MONEY MAX
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'devis/assurance-decennale-auto-entrepreneur'
const TITLE = 'Devis Assurance Décennale Auto Entrepreneur — Comparatif 24h'
const TAGLINE =
  'Obtenez gratuitement votre devis décennale auto-entrepreneur en 5 minutes. Comparatif April Pro vs SMABTP vs Allianz Pro. Attestation 24h.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Devis décennale AE gratuit en 5 min. April Pro best price 950€/an peintre, 1 400€/an plombier. Comparatif April / SMABTP / Allianz. Attestation 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Demande de devis décennale auto-entrepreneur GRATUITE en 5 minutes : notre courtier ORIAS partenaire compare 5 assureurs spécialisés BTP (April Pro, SMABTP, Allianz Pro, MMA Pro BTP, AXA Pro BTP) pour vous proposer le meilleur tarif décennale conforme à votre métier et votre profil. Attestation conforme Loi Spinetta délivrée sous 24h ouvrées."
      legalReference="Loi Spinetta + art. 1792 Code civil"
      benefits={[
        {
          icon: '💰',
          title: 'Best price garanti',
          desc: 'April Pro AE peintre 950€/an • plombier 1 400€/an • maçon 1 800€/an',
        },
        {
          icon: '⚡',
          title: 'Devis en 5 minutes',
          desc: 'Formulaire simple — SIRET + activité + CA prévisionnel suffisent',
        },
        {
          icon: '🔍',
          title: '5 assureurs comparés',
          desc: 'April Pro, SMABTP, Allianz Pro, MMA Pro BTP, AXA Pro BTP',
        },
        {
          icon: '📋',
          title: 'Attestation 24h',
          desc: 'Conforme Loi Spinetta présentable au maître d&apos;ouvrage',
        },
      ]}
      sections={[
        {
          h2: 'Comment fonctionne notre devis décennale AE',
          body: (
            <ol>
              <li>
                <strong>Remplir le formulaire</strong> (5 min) : statut AE, métier précis BTP, CA
                prévisionnel, ancienneté activité
              </li>
              <li>
                <strong>Notre courtier compare</strong> 5 assureurs spécialisés BTP en temps réel
              </li>
              <li>
                <strong>Recevoir devis détaillé</strong> par email sous 30 min ouvrées : tarif,
                plafond, franchise, postériorité, exclusions clés
              </li>
              <li>
                <strong>Choisir l&apos;offre</strong> qui correspond à vos besoins
              </li>
              <li>
                <strong>Souscription en ligne</strong> sécurisée (CB ou prélèvement)
              </li>
              <li>
                <strong>Attestation conforme</strong> téléchargeable sous 24h ouvrées
              </li>
            </ol>
          ),
        },
        {
          h2: 'Tarifs décennale AE par métier (best price April Pro)',
          body: (
            <ul>
              <li>
                <strong>Peintre AE</strong> : 950-1 400€/an
              </li>
              <li>
                <strong>Plâtrier AE</strong> : 1 100-1 600€/an
              </li>
              <li>
                <strong>Carreleur AE</strong> : 1 200-1 700€/an
              </li>
              <li>
                <strong>Plombier AE</strong> : 1 400-2 100€/an
              </li>
              <li>
                <strong>Électricien AE</strong> : 1 500-2 200€/an
              </li>
              <li>
                <strong>Maçon AE</strong> : 1 800-2 800€/an
              </li>
              <li>
                <strong>Couvreur AE</strong> : 2 200-3 500€/an
              </li>
              <li>
                <strong>Multi-services BTP AE</strong> : 2 200-3 500€/an
              </li>
            </ul>
          ),
        },
        {
          h2: 'Pièces nécessaires pour finaliser devis',
          body: (
            <ul>
              <li>SIRET valide (vérifié Insee.fr — &lt; 3 mois)</li>
              <li>Attestation ACOSS / URSSAF AE</li>
              <li>CNI ou passeport recto-verso</li>
              <li>Justificatif activité BTP (CAP/BEP/diplôme OU expérience 3+ ans)</li>
              <li>CA prévisionnel 12 mois (honnête)</li>
              <li>Antécédents sinistralité 36 mois (déclaration honneur)</li>
              <li>RIB pour paiement</li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien de temps pour recevoir un devis décennale AE ?',
          a: 'Devis envoyé par email sous 30 minutes ouvrées après remplissage du formulaire. Comparaison réelle 5 assureurs spécialisés BTP (April Pro, SMABTP, Allianz Pro, MMA Pro BTP, AXA Pro BTP).',
        },
        {
          q: 'Décennale AE peintre la moins chère ?',
          a: 'April Pro BTP à 950€/an (plafond 1M€, postériorité 10 ans, formule standard). Best price marché vérifié 2026. En-dessous = SUSPECT (assureur non-agréé ACPR ou exclusions étendues).',
        },
        {
          q: 'Délai pour avoir attestation après devis ?',
          a: '24h ouvrées chez April Pro (le plus rapide). 48h Allianz Pro / MMA Pro BTP. 72h AXA Pro BTP. Demander devis sans engagement, comparer, souscrire = délai total 1-3 jours ouvrés.',
        },
        {
          q: 'Le devis est-il vraiment gratuit ?',
          a: 'OUI 100% gratuit et sans engagement. Notre courtier ORIAS est rémunéré par l&apos;assureur en cas de souscription (commission standard) — pas par vous. Vous comparez librement et choisissez sans pression.',
        },
      ]}
      relatedMetiers={[
        {
          name: 'Décennale auto-entrepreneur (vue globale)',
          slug: 'assurance-decennale-auto-entrepreneur',
        },
        { name: 'Décennale immédiate', slug: 'assurance-decennale-immediate' },
        { name: 'Décennale pas chère', slug: 'assurance-decennale-pas-cher' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Devis décennale (générique)', slug: 'devis/assurance-decennale' },
      ]}
    />
  )
}
