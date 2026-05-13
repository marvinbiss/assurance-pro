/**
 * Pilier — RC Pro transporteur marchandises (Couche B)
 *
 * KW Ahrefs (kw_universe) :
 * - "assurance professionnelle transport de marchandises" → 200 vol KD 1 CPC 450€
 * - "assurance transport de marchandises" → 300 vol KD 1 CPC 300€
 * - Famille cumulée : ~600 vol/m
 *
 * Particularité : RC Pro transport = obligation Convention CMR (international) +
 * art. L. 132-1 C. transp. (national) avec plafonds règlementaires.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro/transport-marchandises'
const TITLE = 'RC Pro transporteur marchandises 2026 — CMR + national (380-1 800€/an)'
const TAGLINE =
  'La RC Pro obligatoire pour transporteurs marchandises : couverture Convention CMR (international) + art. L. 132-1 C. transp. (national). Plafonds règlementaires + garantie complément possible.'

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    'RC Pro transport marchandises 2026 : OBLIGATOIRE Convention CMR (international) + art. L. 132-1 C. transp. (national). Plafonds règlementaires CMR : 8,33 DTS/kg (≈10€/kg). Garantie ad valorem complémentaire possible. Tarifs 380-1 800€/an AE/EI, 5 200-12 000€/an SARL flotte. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro est OBLIGATOIRE pour tout transporteur de marchandises (transport routier, déménagement, livraison professionnelle, coursier urbain) en France et à l'international (Convention CMR Genève 19 mai 1956 + art. L. 132-1 C. transp.). Elle couvre la responsabilité du transporteur en cas de perte, vol, détérioration ou retard sur les marchandises confiées. Plafonds règlementaires : Convention CMR = 8,33 DTS/kg (≈10€/kg en 2026), Code transport national = 23€/kg pour transports < 3T et 14€/kg pour transports > 3T. Au-delà, les clients peuvent souscrire une garantie 'ad valorem' complémentaire. Tarifs 2026 : 380-1 800 €/an pour AE/EI coursier-livraison, 5 200-12 000 €/an pour SARL flotte 5 véhicules."
      legalReference="Convention CMR (Genève 19/05/1956) + art. L. 132-1 C. transp. + Décret 2017-1198 (LOTI)"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATION CMR + national',
          desc: 'RC Pro transport obligatoire dès le 1er kg transporté commercialement. Sanctions absence : amende 7 500€',
        },
        {
          icon: '📦',
          title: 'Marchandises confiées',
          desc: 'Couverture perte, vol, détérioration, retard. Plafonds règlementaires CMR/L. 132-1 + ad valorem',
        },
        {
          icon: '🚛',
          title: 'Tous transports terrestres',
          desc: 'VUL, camionnettes, tracteurs routiers, semis, déménagement, livraison froide, ADR matières dangereuses',
        },
        {
          icon: '💰',
          title: '380-1 800 €/an AE/EI',
          desc: 'AE coursier urbain 380-680€. EI livraison régionale 720-1 280€. SARL flotte 5 véhicules : 5 200-12 000€/an',
        },
      ]}
      sections={[
        {
          h2: 'Plafonds règlementaires RC Pro transport',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Type transport</th>
                    <th className="border p-2 text-left">Cadre juridique</th>
                    <th className="border p-2 text-left">Plafond règlementaire</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">International (UE + tous pays signataires CMR)</td>
                    <td className="border p-2">Convention CMR Genève 1956</td>
                    <td className="border p-2">
                      <strong>8,33 DTS/kg</strong> (≈10€/kg 2026)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">National &lt; 3 tonnes</td>
                    <td className="border p-2">Art. L. 132-1 C. transp. + Contrat type</td>
                    <td className="border p-2">
                      <strong>23€/kg</strong> (limite envoi 750€/colis)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">National &gt; 3 tonnes</td>
                    <td className="border p-2">Art. L. 132-1 C. transp. + Contrat type</td>
                    <td className="border p-2">
                      <strong>14€/kg</strong> (limite envoi 2 300€/colis)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Déménagement</td>
                    <td className="border p-2">Décret 2017-1198 (LOTI déménagement)</td>
                    <td className="border p-2">
                      <strong>Forfait 76€/m³</strong> ou valeur déclarée
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Au-delà des plafonds règlementaires</strong> : le client peut imposer une{' '}
                <strong>garantie ad valorem</strong> (assurance valeur réelle marchandise).
                Sur-prime : 0,1 à 0,5% de la valeur déclarée. Notre cabinet ORIAS l&apos;intègre
                dans 100% des devis pour transporteurs B2B.
              </p>
            </div>
          ),
        },
        {
          h2: 'Sinistres types RC Pro transport',
          body: (
            <div>
              <p>Top 5 sinistres :</p>
              <ul>
                <li>
                  <strong>Vol marchandises (32%)</strong> — vol violent, vol simple, fausse identité
                  destinataire
                </li>
                <li>
                  <strong>Détérioration transport (28%)</strong> — manutention, choc, mauvais
                  arrimage
                </li>
                <li>
                  <strong>Retard livraison (16%)</strong> — perte vente B2B, indemnisation
                  forfaitaire
                </li>
                <li>
                  <strong>Erreur destinataire / livraison perdue (12%)</strong>
                </li>
                <li>
                  <strong>Sinistres ADR matières dangereuses (8%)</strong> — défaut signalisation,
                  conditionnement
                </li>
              </ul>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <div>
              <ul>
                <li>
                  <a href="/outils/calculateur-tarif-rc-pro" className="text-primary-600 underline">
                    Calculateur tarif RC Pro transport
                  </a>
                </li>
                <li>
                  <a href="/outils/devis-rc-pro" className="text-primary-600 underline">
                    Devis officiel RC Pro ORIAS sous 24h
                  </a>
                </li>
                <li>
                  <a href="/assurance-vtc" className="text-primary-600 underline">
                    Assurance VTC (transport personnes)
                  </a>
                </li>
                <li>
                  <a href="/rc-pro" className="text-primary-600 underline">
                    Pilier RC Pro
                  </a>
                </li>
              </ul>
            </div>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro transport obligatoire ?',
          a: 'OUI absolument dès le 1er transport commercial de marchandises. Convention CMR pour international (signée par 55+ pays UE/Russie/Iran/Maroc), art. L. 132-1 C. transp. pour national. Sanctions absence : amende 7 500€ + retrait licence transport (Loi LOTI). Carte conducteur DGITM bloquée.',
        },
        {
          q: 'Plafond CMR : suffisant pour mon activité ?',
          a: 'Souvent NON pour marchandises B2B haute valeur. Exemple : 1 palette électronique 50kg vaut 30 000€ → CMR rembourse 50 × 10€ = 500€ seulement. Solution : <strong>garantie ad valorem</strong> souscrite par expéditeur (sur-prime 0,1-0,5% valeur). Notre cabinet ORIAS l&apos;intègre par défaut pour clients B2B.',
        },
        {
          q: 'ADR matières dangereuses : RC Pro spécifique ?',
          a: 'OUI obligatoire (Accord ADR Genève 30 sept 1957). Sur-prime +30-80% du tarif RC Pro standard. Couverture pollution accidentelle obligatoire (art. L. 162-1 C. env.) + responsabilité dépollution. Conseiller à la sécurité ADR (CSS) obligatoire si >50T/an transportées.',
        },
        {
          q: 'Tarif RC Pro transport 2026 ?',
          a: 'AE coursier urbain (CA <50k€) : 380-680 €/an. EI livraison régionale : 720-1 280 €/an. EURL transport interrégional : 1 100-2 200 €/an. SARL flotte 5 véhicules : 5 200-12 000 €/an. SAS flotte 20+ véhicules : 22 000-58 000 €/an. Variables : zone (Paris +20%), ADR (+30-80%), international (+15%).',
        },
      ]}
    />
  )
}
