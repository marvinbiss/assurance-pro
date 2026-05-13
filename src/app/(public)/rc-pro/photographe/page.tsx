/**
 * Pilier — RC Pro photographe / vidéaste
 * KW Ahrefs : "assurance professionnelle photographe" 200 vol KD 0 + "rc pro photographe" 90 vol
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro/photographe'
const TITLE = 'RC Pro photographe — Tarifs 2026 (mariage, événementiel, studio)'
const TAGLINE =
  "L'assurance RC pro pour photographes et vidéastes : mariage, événementiel, studio, corporate. Couvre matériel client + perte fichiers + droit à l'image."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "RC Pro photographe : couverture perte fichiers (carte SD, disque dur), casse matériel client, droit à l'image, retard livraison événement. Plafond 1,5-3 M€. Tarifs 280-680€/an. Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro photographe couvre les sinistres typiques du métier : perte de fichiers numériques (carte SD défectueuse, disque dur crashé, vol équipement avec photos non sauvegardées), casse de matériel client (vase, décoration de mariage), droit à l'image (publication non autorisée), retard de livraison sur événement (non-respect contractuel mariage), erreur de cadrage majeure non rattrapable. Pour les photographes mariage, le risque #1 est la PERTE DE FICHIERS — un mariage non livré peut générer 8 000-50 000€ de dommages-intérêts. Tarifs 2026 : 280-680€/an pour AE photographe, 580-1 480€/an pour SARL studio avec 1-3 salariés. Cette page distingue les profils et détaille les garanties indispensables."
      legalReference="Code des assurances L. 113-1 + Code civil (responsabilité contractuelle) + RGPD (droit à l'image)"
      isObligatoire={true}
      benefits={[
        {
          icon: '📷',
          title: 'Perte de fichiers',
          desc: 'TOP risque métier : carte SD HS, disque crashé, vol équipement non sauvegardé',
        },
        {
          icon: '🎁',
          title: 'Casse matériel client',
          desc: 'Vase, décoration mariage, écran client en RDV — couverts',
        },
        {
          icon: '⚖️',
          title: "Droit à l'image",
          desc: "Publication non autorisée d'un client (modèle, mariage) — sinistre 5-30k€",
        },
        {
          icon: '💰',
          title: 'À partir de 280 €/an',
          desc: 'AE photographe événementiel solo. SARL studio : 580-1 480€/an',
        },
      ]}
      sections={[
        {
          h2: 'Tarifs RC Pro photographe 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">AE photographe événementiel solo</td>
                    <td className="border p-2 text-right">280 € – 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      AE photographe mariage (haute saison mai-octobre)
                    </td>
                    <td className="border p-2 text-right">380 € – 680 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">EI photographe corporate / industriel</td>
                    <td className="border p-2 text-right">480 € – 880 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL studio photo 80m² + 2 salariés</td>
                    <td className="border p-2 text-right">880 € – 1 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Vidéaste pro avec drone (DGAC autorisé)</td>
                    <td className="border p-2 text-right">580 € – 1 200 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Garanties optionnelles indispensables : « tous risques matériel photo » (boîtiers,
                objectifs — souvent 15-50k€ de matériel) + « bris matériel transporté » + « location
                matériel ». Voir{' '}
                <Link
                  href="/assurance-voiture-professionnelle"
                  className="text-primary-600 underline"
                >
                  /assurance-voiture-professionnelle
                </Link>{' '}
                pour le véhicule pro avec matériel embarqué.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La RC Pro photographe est-elle obligatoire ?',
          a: "Pas légalement obligatoire (sauf vidéaste drone : OBLIGATION DGAC). Mais EXIGÉE par 100% des clients institutionnels, mariés via plateformes wedding (Mariages.net, Zankyou), agences corporate. Sans RC Pro : exclusion des appels d'offres + responsabilité personnelle illimitée en cas de sinistre.",
        },
        {
          q: 'Perte de fichiers mariage : quelle indemnisation ?',
          a: "Sinistre type 8 000-50 000€ (dommages-intérêts pour préjudice moral + perte de souvenirs irremplaçables + remboursement prestation). Couvert par RC Pro photographe avec garantie « perte de données » ACTIVÉE (souvent en option +60-150€/an). FORTEMENT recommandé pour mariage (1 oubli sauvegarde = ruine personnelle). Bonne pratique : double sauvegarde sur 2 cartes + cloud + disque dur immédiatement après l'événement.",
        },
        {
          q: 'Combien coûte la RC Pro photographe en 2026 ?',
          a: 'AE événementiel solo : 280-480€/an. AE mariage : 380-680€/an. EI corporate : 480-880€/an. SARL studio : 880-1 480€/an. Vidéaste drone : 580-1 200€/an (autorisation DGAC + assurance spécifique drone).',
        },
        {
          q: 'Drone vidéo : assurance spécifique ?',
          a: 'OUI obligatoire : RC pro spécifique drone + autorisation DGAC (déclaration ou agrément selon poids). Couverture des dommages causés par le drone (chute, collision, perte). Tarif additionnel : 200-500€/an. Indispensable pour vidéaste pro avec drone.',
        },
      ]}
    />
  )
}
