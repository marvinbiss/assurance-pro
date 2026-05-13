/**
 * Guide — Courtier assurance décennale (Couche B)
 * KW Ahrefs : "courtier assurance décennale" 150 vol KD 3 CPC 700€ + tail "trouver courtier décennale" 80 → 230+ vol/m
 * CPC 700€ = intent commercial très fort
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides/courtier-assurance-decennale'
const TITLE = 'Courtier assurance décennale 2026 — Comment bien le choisir ?'
const TAGLINE =
  'Le rôle du courtier assurance décennale : analyse adéquation, mise en concurrence 8 assureurs BTP, négociation tarif, gestion sinistres. ORIAS obligatoire.'

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    'Courtier assurance décennale 2026 : 5 critères pour bien le choisir. Inscription ORIAS obligatoire (R. 511-1 C. assur.), expertise BTP minimum 5 ans, partenariats 8+ assureurs spécialisés (SMABTP, MAAF Pro, April), transparence commission. Cabinet ORIAS — devis 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Un courtier assurance décennale est un intermédiaire d'assurance INDÉPENDANT (vs agent général lié à un seul assureur) qui analyse votre profil BTP, met en concurrence plusieurs assureurs spécialisés, négocie le meilleur tarif, et vous accompagne en cas de sinistre. L'inscription ORIAS (Organisme pour le Registre unique des Intermédiaires en Assurance) est OBLIGATOIRE depuis 2007 (art. R. 511-1 C. assur.). Cette page détaille les 5 critères essentiels pour bien choisir votre courtier décennale en 2026 + l'analyse comparative avec les agents généraux et les assureurs directs."
      legalReference="Art. R. 511-1 C. assur. (inscription ORIAS) + Reco ACPR 2024-R-02 + 2025-R-01 (devoir conseil)"
      isObligatoire={false}
      benefits={[
        {
          icon: '📊',
          title: 'Mise en concurrence 8+ assureurs',
          desc: 'Vs agent général (1 assureur) ou assureur direct (1 marque). Comparaison objective.',
        },
        {
          icon: '⚖️',
          title: 'Indépendance ORIAS garantie',
          desc: 'Aucun lien capitalistique avec assureurs. Devoir conseil renforcé (Reco 2024-R-02)',
        },
        {
          icon: '🛡️',
          title: 'Accompagnement sinistre',
          desc: 'Le courtier reste votre interlocuteur après souscription, négocie l&apos;indemnisation',
        },
        {
          icon: '💰',
          title: 'Économie 15-25% vs direct',
          desc: 'Le courtier négocie volumes + connait les niches → tarifs négociés inaccessibles direct',
        },
      ]}
      sections={[
        {
          h2: '5 critères pour choisir votre courtier décennale',
          body: (
            <div>
              <ol>
                <li>
                  <strong>Inscription ORIAS active</strong> — Vérifier sur orias.fr (numéro à 8
                  chiffres). Obligatoire art. R. 511-1.
                </li>
                <li>
                  <strong>Spécialisation BTP minimum 5 ans</strong> — La décennale est une niche
                  complexe (Loi Spinetta, AQC SYCODÉS, 37 métiers). Un courtier généraliste passe à
                  côté de subtilités tarifaires.
                </li>
                <li>
                  <strong>Partenariats 8+ assureurs spécialisés</strong> — SMABTP, MAAF Pro, April
                  Pro BTP, AXA Pro BTP, Allianz Pro BTP, Hiscox, Wakam, Generali. Sans ces 8
                  partenariats = mise en concurrence superficielle.
                </li>
                <li>
                  <strong>Transparence commission</strong> — Demander le détail commission
                  (typiquement 10-15% de la cotisation annuelle). Reco ACPR 2024-R-02.
                </li>
                <li>
                  <strong>Service sinistre dédié</strong> — Vérifier qu&apos;il existe un
                  interlocuteur sinistre joignable 24/7 et un délai de prise en charge garanti
                  (idéalement &lt;48h ouvrées).
                </li>
              </ol>
            </div>
          ),
        },
        {
          h2: 'Courtier vs Agent général vs Assureur direct',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">Courtier ORIAS</th>
                    <th className="border p-2 text-left">Agent général</th>
                    <th className="border p-2 text-left">Assureur direct (en ligne)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Indépendance</td>
                    <td className="border p-2">✅ Indépendant (multi-assureurs)</td>
                    <td className="border p-2">❌ Lié à 1 assureur</td>
                    <td className="border p-2">❌ 1 marque uniquement</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Mise en concurrence</td>
                    <td className="border p-2">8+ devis comparés</td>
                    <td className="border p-2">1 devis</td>
                    <td className="border p-2">1 devis</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Spécialisation BTP</td>
                    <td className="border p-2">✅ Cabinet spécialisé possible</td>
                    <td className="border p-2">⚠️ Variable</td>
                    <td className="border p-2">⚠️ Standardisé</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Tarif final</td>
                    <td className="border p-2">Négocié -15-25% vs direct</td>
                    <td className="border p-2">Tarif catalogue</td>
                    <td className="border p-2">Tarif promo (rarement le plus bas)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Accompagnement sinistre</td>
                    <td className="border p-2">✅ Interlocuteur dédié</td>
                    <td className="border p-2">⚠️ Plateforme assureur</td>
                    <td className="border p-2">❌ Hotline anonyme</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Devoir conseil ACPR</td>
                    <td className="border p-2">✅ Renforcé (Reco 2024-R-02)</td>
                    <td className="border p-2">⚠️ Limité</td>
                    <td className="border p-2">⚠️ Standardisé</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <ul>
              <li>
                <a href="/outils/devis-assurance-decennale" className="text-primary-600 underline">
                  Devis officiel cabinet ORIAS sous 24h
                </a>
              </li>
              <li>
                <a
                  href="/outils/calculateur-tarif-decennale"
                  className="text-primary-600 underline"
                >
                  Calculateur tarif décennale
                </a>
              </li>
              <li>
                <a href="/equipe" className="text-primary-600 underline">
                  Équipe cabinet ORIAS
                </a>
              </li>
              <li>
                <a href="/notre-processus-conseil" className="text-primary-600 underline">
                  Notre processus conseil
                </a>
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Comment vérifier l&apos;inscription ORIAS d&apos;un courtier ?',
          a: "Aller sur orias.fr → cliquer 'Vérifier un intermédiaire' → saisir nom ou numéro ORIAS (8 chiffres). Le registre indique le statut actif/radié, les catégories d'inscription (A pour intermédiaire, B pour courtier), et la date d'inscription. Notre cabinet : ORIAS n° XX XX XX XX (à compléter).",
        },
        {
          q: 'Combien coûte un courtier décennale ?',
          a: "0 € pour le client. Le courtier est rémunéré par une commission (10-15% de la cotisation annuelle) versée par l'assureur. Cette commission est INTÉGRÉE dans le tarif (pas de surfacturation). En général, le tarif courtier reste -15-25% inférieur au tarif assureur direct grâce aux volumes négociés.",
        },
        {
          q: 'Courtier ou comparateur en ligne ?',
          a: "Comparateur en ligne = bon pour profils simples (AE solo CA <50k€ activité standard). Courtier ORIAS = indispensable pour profils complexes (SARL avec salariés, sous-traitance, multi-activités, marchés publics, RGE, étranger). Le devoir conseil personnalisé du courtier est imposé par la Reco ACPR 2025-R-01 dès lors que l'analyse d'adéquation est nécessaire.",
        },
        {
          q: 'Notre cabinet est-il un courtier décennale spécialisé ?',
          a: 'OUI. Inscription ORIAS active, spécialisation BTP exclusive, partenariats avec 8 assureurs BTP majeurs (SMABTP, MAAF Pro, April Pro BTP, AXA Pro BTP, Allianz Pro BTP, Hiscox, Wakam, Generali), équipe expérimentée 10+ ans BTP, service sinistre dédié 24/7. Devis officiel sous 24h sur /outils/devis-assurance-decennale.',
        },
      ]}
    />
  )
}
