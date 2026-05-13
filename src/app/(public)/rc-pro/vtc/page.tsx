/**
 * Pilier — RC Pro VTC (sous /rc-pro/[slug] dynamique, route statique prioritaire)
 * KW Ahrefs : "rc pro vtc" 1 000 vol KD 2 + "assurance rcp vtc" 200 vol + "assurance rc circulation vtc" 200 vol
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro/vtc'
const TITLE = 'RC Pro VTC — Tarifs 2026 (RC chauffeur, plafond illimité, passagers)'
const TAGLINE =
  "L'assurance RC pro spécifique VTC : RC chauffeur passagers + RC tiers + plafond corporel illimité. Obligation Code des transports."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "RC Pro VTC OBLIGATOIRE (Code des transports L. 3120-1) : couvre passagers + tiers + véhicule. Plafond corporel illimité. Distinct de l'assurance VTC complète (multirisque + ADS). Tarifs 380-980€/an. Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro VTC est la garantie OBLIGATOIRE pour tout chauffeur VTC en France (Code des transports L. 3120-1). Elle couvre la responsabilité civile professionnelle du chauffeur envers ses passagers ET les tiers (autres véhicules, piétons, infrastructure) en cas de sinistre survenu pendant la prestation de transport. Le plafond corporel est ILLIMITÉ par obligation légale. Distincte de l'assurance VTC COMPLÈTE qui inclut aussi la multirisque véhicule (vol, incendie, vandalisme) et la couverture personnelle du chauffeur, la RC Pro VTC est le SOCLE LÉGAL minimum. Tarifs 2026 : 380-980 €/an pour la RC Pro VTC seule (vs 650-1 400 €/an pour le pack VTC complet). Cette page renvoie vers notre pilier complet /assurance-vtc."
      legalReference="Article L. 3120-1 du Code des transports + L. 211-1 C. assur. (RC obligatoire)"
      isObligatoire={true}
      benefits={[
        {
          icon: '🚗',
          title: 'OBLIGATION légale',
          desc: "Sans RC Pro VTC : retrait carte VTC + interdiction d'exercer + sanctions pénales",
        },
        {
          icon: '⚖️',
          title: 'Plafond illimité',
          desc: 'Plafond corporel ILLIMITÉ par obligation légale (vs 1,5-10 M€ pour RC pro standard)',
        },
        {
          icon: '👥',
          title: 'Passagers + tiers',
          desc: 'Couvre dommages corporels passagers transportés + dommages aux tiers (véhicules, piétons)',
        },
        {
          icon: '💰',
          title: 'À partir de 380 €/an',
          desc: 'RC Pro VTC seule. Pack VTC complet (RC + multirisque + ADS-licence) : 650-1 400€/an',
        },
      ]}
      sections={[
        {
          h2: 'Distinction RC Pro VTC vs Assurance VTC complète',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">RC Pro VTC seule</th>
                    <th className="border p-2 text-left">Assurance VTC complète</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">RC pro circulation (passagers + tiers)</td>
                    <td className="border p-2">✅</td>
                    <td className="border p-2">✅</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Plafond corporel illimité</td>
                    <td className="border p-2">✅</td>
                    <td className="border p-2">✅</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Tous risques véhicule (vol, incendie, vandalisme)
                    </td>
                    <td className="border p-2">❌</td>
                    <td className="border p-2">✅</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Bris de glace</td>
                    <td className="border p-2">❌</td>
                    <td className="border p-2">✅</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Garantie conducteur (capital décès/IJ)</td>
                    <td className="border p-2">❌</td>
                    <td className="border p-2">✅</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Véhicule de remplacement</td>
                    <td className="border p-2">❌</td>
                    <td className="border p-2">✅</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Tarif 2026</strong>
                    </td>
                    <td className="border p-2">
                      <strong>380-980€/an</strong>
                    </td>
                    <td className="border p-2">
                      <strong>650-1 400€/an</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                Voir notre pilier complet{' '}
                <Link href="/assurance-vtc" className="text-primary-600 underline">
                  /assurance-vtc
                </Link>{' '}
                pour le pack VTC complet.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La RC Pro VTC est-elle obligatoire ?',
          a: "OUI — Code des transports L. 3120-1. Sans RC Pro VTC : retrait carte VTC + interdiction d'exercer + sanctions pénales (75 000€ + 6 mois prison). Plafond corporel ILLIMITÉ par obligation légale.",
        },
        {
          q: 'Combien coûte la RC Pro VTC en 2026 ?',
          a: '380-980€/an pour la RC Pro VTC seule. Pack VTC complet (RC + multirisque + ADS) : 650-1 400€/an. Variables : km annuels, antécédents, ancienneté permis, zone géographique.',
        },
        {
          q: 'RC Pro VTC vs assurance véhicule particulier ?',
          a: 'RC Pro VTC = activité PROFESSIONNELLE de transport public de personnes. Plafond corporel illimité par obligation. Assurance véhicule particulier = usage perso, plafond plus limité, ne couvre PAS le transport public payant. Sans RC Pro VTC : sinistre rejeté pour usage non déclaré.',
        },
      ]}
    />
  )
}
