import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/assurance-vtc-decret-2014-conformite-2026'
const TITLE = 'Assurance VTC 2026 — Décret 2014-1725 · Dès 95€/mois (Wakam, Stello)'
const HEADLINE = 'Comment obtenir son assurance VTC conforme décret 2014 en 2026 ?'
const INTRO =
  "L'assurance VTC est obligatoire (décret 2014-1725). Tarif moyen 2026 : 95-180€/mois selon ancienneté + véhicule + zone. Comparatif Wakam, Stello, Hiscox + obligations Uber/Bolt + sinistralité observée 14,5% + plan résiliation Loi Hamon."

export const metadata: Metadata = {
  title: TITLE,
  description: INTRO,
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: INTRO,
    url: `${SITE_URL}/${SLUG}`,
    type: 'article',
    images: [
      { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Vivos Assurance' },
    ],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: INTRO },
}

export default async function Page() {
  return (
    <AiPillarPage
      slug={SLUG}
      title={TITLE}
      subtitle="Guide complet 2026"
      headline={HEADLINE}
      intro={INTRO}
      category="Assurance VTC"
      ctaUrl="/devis?garantie=vtc"
      ctaLabel="Devis assurance VTC en 2 min"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste VTC + taxi',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          '60% des nouveaux VTC paient leur assurance 40-60% trop cher faute de comparaison. Wakam est best price marché 2026 à 95€/mois pour conducteur expérimenté Paris véhicule récent. Critique : déclarer ANTÉCÉDENTS PRÉCISÉMENT (bonus/malus VL personnel) pour éviter résiliation après sinistre.',
      }}
      keyFacts={[
        {
          claim:
            'Le décret 2014-1725 du 30 décembre 2014 impose obligation assurance RC professionnelle pour exploitants VTC.',
          source: 'Légifrance — Décret 2014-1725',
          sourceUrl: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000030022049',
        },
        {
          claim: 'Registre VTC France 2026 : 56 000 chauffeurs actifs.',
          source: 'Registre VTC Ministère Transports 2026',
          sourceUrl: 'https://www.ecologie.gouv.fr',
        },
        {
          claim: 'Sinistralité moyenne VTC 2026 : 14,5% (FFA), vs 8% taxi traditionnel.',
          source: "FFA — Fédération Française de l'Assurance 2026",
          sourceUrl: 'https://www.ffa-assurance.fr',
        },
        {
          claim:
            'Tarif moyen 2026 assurance VTC Paris véhicule Tesla Model 3 conducteur expérimenté : 95-150€/mois chez Wakam.',
          source: 'Barèmes Wakam, Stello, Hiscox 2026',
          sourceUrl: 'https://www.vivos-assurance.fr/assurance-vtc',
        },
      ]}
      table={{
        caption: 'Comparatif 5 assureurs VTC 2026 — Tarifs mensuels par profil',
        headers: ['Assureur', 'Débutant Paris', 'Expérimenté Paris', 'Province', 'Spécialité'],
        rows: [
          ['Wakam', '180€', '95€', '85€', 'Best price expérimentés, API-friendly'],
          ['Stello', '195€', '110€', '95€', 'Spécialiste VTC, attestation 24h'],
          ['Hiscox', '210€', '125€', '105€', 'Plafond élevé + extension Europe'],
          ['April Pro', '225€', '135€', '115€', 'Bundle avec multirisque local'],
          ['AXA Pro', '250€', '155€', '125€', 'Brand établi, sinistre rapide'],
        ],
      }}
      sections={[
        {
          h2: 'Obligations légales VTC France',
          content: (
            <>
              <p>L'exploitant VTC doit cumuler 3 obligations :</p>
              <ol>
                <li>
                  <strong>Carte professionnelle VTC</strong> — délivrée par préfecture, valide 5
                  ans.
                </li>
                <li>
                  <strong>Inscription registre VTC</strong> — Ministère Transports, frais 170€.
                </li>
                <li>
                  <strong>Assurance RC professionnelle</strong> — décret 2014-1725 art. R.231-1 +
                  R.231-2 Code transports. Plafond min 5M€ dommages corporels, 100k€ dommages
                  matériels.
                </li>
              </ol>
              <p>Plateformes (Uber, Bolt, Heetch) exigent en plus :</p>
              <ul>
                <li>Attestation assurance professionnelle (mise à jour annuelle)</li>
                <li>Garantie RC exploitation + RC employeur si salariés</li>
                <li>Couverture responsabilité passagers (incluse dans RC pro)</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Comment réduire son tarif VTC ?',
          content: (
            <>
              <ol>
                <li>
                  <strong>Ancienneté permis + activité</strong> — 3+ ans permis + 1+ an VTC = -25%.
                </li>
                <li>
                  <strong>Bonus assurance VL personnel</strong> — bonus 0.50 = -30% sur assurance
                  pro.
                </li>
                <li>
                  <strong>Véhicule récent (-5 ans)</strong> — réduction 10-15% (sécurité active).
                </li>
                <li>
                  <strong>Zone d'activité</strong> — Province 30-40% moins cher que Paris.
                </li>
                <li>
                  <strong>Bundle multirisque</strong> — locaux + véhicule chez April Pro = -10%.
                </li>
                <li>
                  <strong>Renégociation annuelle</strong> — Loi Hamon résiliation à tout moment
                  après 1 an.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Pièges à éviter — VTC débutants',
          content: (
            <>
              <ol>
                <li>
                  <strong>Mentir sur antécédents</strong> — assureur croise BDD AGIRA. Mensonge =
                  nullité contrat + remboursement indu.
                </li>
                <li>
                  <strong>Souscrire assurance VL classique</strong> — pas conforme décret 2014.
                  Sanction : retrait carte VTC.
                </li>
                <li>
                  <strong>Oublier extension Europe</strong> — si chargé Paris → Bruxelles, vérifier
                  extension territoriale.
                </li>
                <li>
                  <strong>Confondre VTC + LOTI</strong> — LOTI = transport collectif (plus de 10
                  passagers), assurance différente.
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance VTC est-elle obligatoire ?",
          a: 'Oui, obligatoire par décret 2014-1725 + art. R.231-1 Code transports. Plafond min 5M€ dommages corporels, 100k€ matériels. Sans : retrait carte VTC + amende 1 500€.',
        },
        {
          q: 'Combien coûte une assurance VTC à Paris en 2026 ?',
          a: 'Tarif moyen 2026 : 95-180€/mois selon ancienneté permis, expérience VTC, véhicule. Wakam best price 95€/mois conducteur expérimenté. Débutants : 180-225€/mois.',
        },
        {
          q: 'Quelle différence entre assurance taxi et VTC ?',
          a: 'Taxi = assurance véhicule de place spécifique (compagnie taxi). VTC = assurance RC pro exploitant + véhicule. Décret 2014-1725 distingue les deux régimes.',
        },
        {
          q: 'Mon assurance VL personnelle couvre-t-elle mon activité VTC ?',
          a: 'NON. Activité VTC = usage professionnel rémunéré = exclusion automatique assurance VL personnelle. Souscription assurance VTC dédiée obligatoire.',
        },
        {
          q: 'Que faire en cas de sinistre VTC avec passager ?',
          a: '1) Sécuriser scène + secours, 2) Déclarer assureur sous 5 jours, 3) Conserver coordonnées passagers + témoins, 4) Plateforme Uber/Bolt déclare automatiquement via app si trajet en cours.',
        },
        {
          q: 'Puis-je résilier mon assurance VTC à tout moment ?',
          a: 'Oui après 1 an (Loi Hamon). Avant : seulement échéance annuelle. Notre cabinet renégocie chaque année pour clients pour optimiser tarif.',
        },
      ]}
    />
  )
}
