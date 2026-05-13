/**
 * Pilier — Assurance obligatoire entreprise
 * KW Ahrefs : "assurance obligatoire entreprise" 150 vol KD 0 CPC 150€ + "micro-entreprise assurance obligatoire" 200 vol KD 5
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-obligatoire-entreprise'
const TITLE = 'Assurance obligatoire entreprise — Liste complète 2026 (sanctions absence)'
const TAGLINE =
  "La liste exhaustive des assurances OBLIGATOIRES pour une entreprise en France selon métier et statut juridique. Sanctions absence détaillées (jusqu'à 75 000€ + prison)."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Liste exhaustive 2026 des assurances OBLIGATOIRES par entreprise : décennale BTP, RC Pro santé/juridique/conseil financier/transport/sport, multirisque bail commercial, mutuelle collective ANI, auto pro. Sanctions absence + références légales. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La question des assurances OBLIGATOIRES pour une entreprise française génère beaucoup de confusion : selon votre métier, statut juridique et taille, certaines garanties sont légalement OBLIGATOIRES (sanctions pénales en cas d'absence) et d'autres sont CONTRACTUELLEMENT OBLIGATOIRES (clause bail commercial, exigence client). Cette page liste exhaustivement toutes les assurances obligatoires en France métropolitaine en 2026, avec les références légales précises et les sanctions encourues. Elle sert de checklist pour vérifier votre conformité et éviter les sanctions URSSAF, ACPR, Inspection du travail, ou poursuites pénales."
      legalReference="Code des assurances + ANI 2013 + Code de la santé publique + Code des transports"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: '21 métiers obligatoires',
          desc: 'BTP (Spinetta), santé (Kouchner), juridique, conseil financier (ACPR), transport, sport, esthétique invasive, sécurité',
        },
        {
          icon: '🏠',
          title: 'Multirisque bail',
          desc: 'OBLIGATION CONTRACTUELLE 100% baux commerciaux. Sanction : résiliation bail',
        },
        {
          icon: '👥',
          title: 'Mutuelle salariés ANI',
          desc: 'TOUS employeurs depuis 2016. 50% pris en charge employeur min. Sanctions URSSAF + dommages-intérêts',
        },
        {
          icon: '🚗',
          title: 'Auto pro',
          desc: 'RC circulation OBLIGATOIRE tout véhicule. Sanctions : 75 000€ + 6 mois prison',
        },
      ]}
      sections={[
        {
          h2: 'Liste exhaustive des assurances obligatoires en 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Assurance</th>
                    <th className="border p-2 text-left">OBLIGATOIRE pour</th>
                    <th className="border p-2 text-left">Sanctions absence</th>
                    <th className="border p-2 text-left">Référence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Décennale</strong>
                    </td>
                    <td className="border p-2">Tous artisans BTP</td>
                    <td className="border p-2">75 000€ + 6 mois prison + interdiction exercer</td>
                    <td className="border p-2">L. 241-1 C. assur. (Spinetta)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Dommages-ouvrage</strong>
                    </td>
                    <td className="border p-2">Maître d&apos;ouvrage construction</td>
                    <td className="border p-2">
                      75 000€ + 6 mois prison (sauf personne physique pour soi)
                    </td>
                    <td className="border p-2">L. 242-1 C. assur.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro santé</strong>
                    </td>
                    <td className="border p-2">Médecins, paramédicaux libéraux</td>
                    <td className="border p-2">Radiation Ordre + interdiction exercer</td>
                    <td className="border p-2">L. 1142-2 CSP (Kouchner)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro juridique</strong>
                    </td>
                    <td className="border p-2">Avocats, notaires, huissiers, experts-comptables</td>
                    <td className="border p-2">Radiation Ordre + sanctions disciplinaires</td>
                    <td className="border p-2">Codes déontologie spécifiques</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro conseil financier</strong>
                    </td>
                    <td className="border p-2">CGP, CIF, IOBSP — homologation ACPR</td>
                    <td className="border p-2">Retrait homologation ACPR + sanctions</td>
                    <td className="border p-2">L. 541-3 CMF (5 M€ minimum)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro transport</strong>
                    </td>
                    <td className="border p-2">VTC, taxi, LVC, chauffeur privé</td>
                    <td className="border p-2">Retrait carte pro + interdiction exercer</td>
                    <td className="border p-2">L. 3120-1 Code transports</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro sport</strong>
                    </td>
                    <td className="border p-2">Coach sportif, prof yoga, moniteurs</td>
                    <td className="border p-2">Sanctions Code du sport</td>
                    <td className="border p-2">L. 321-7 Code du sport</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Multirisque local</strong>
                    </td>
                    <td className="border p-2">Tout locataire bail commercial</td>
                    <td className="border p-2">Résiliation bail (motif grave)</td>
                    <td className="border p-2">Art. 1733 C. civ.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Mutuelle collective</strong>
                    </td>
                    <td className="border p-2">Tous employeurs (50% employeur min)</td>
                    <td className="border p-2">Redressement URSSAF + dommages-intérêts salariés</td>
                    <td className="border p-2">Loi 14/06/2013 (ANI)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Auto pro</strong>
                    </td>
                    <td className="border p-2">Tout véhicule à moteur</td>
                    <td className="border p-2">75 000€ + 6 mois prison + immobilisation</td>
                    <td className="border p-2">L. 211-1 C. assur.</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Hub assurances obligatoires : nos pages dédiées',
          body: (
            <>
              <ul>
                <li>
                  <Link href="/assurance-decennale" className="text-primary-600 underline">
                    Décennale BTP
                  </Link>{' '}
                  — Loi Spinetta
                </li>
                <li>
                  <Link href="/assurance-dommages-ouvrage" className="text-primary-600 underline">
                    Dommages-ouvrage
                  </Link>{' '}
                  — souscription maître d&apos;ouvrage
                </li>
                <li>
                  <Link
                    href="/responsabilite-civile-professionnelle"
                    className="text-primary-600 underline"
                  >
                    RC Pro
                  </Link>{' '}
                  — pilier complet 21 métiers réglementés
                </li>
                <li>
                  <Link href="/assurance-sante-entreprise" className="text-primary-600 underline">
                    Mutuelle collective ANI
                  </Link>{' '}
                  — obligation employeur
                </li>
                <li>
                  <Link href="/assurance-local-commercial" className="text-primary-600 underline">
                    Multirisque local
                  </Link>{' '}
                  — clause bail commercial
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelles sont les assurances obligatoires pour une entreprise en France ?',
          a: 'Selon le métier et le statut : DÉCENNALE pour artisans BTP (L. 241-1 C. assur.), RC Pro santé / juridique / conseil financier (CGP, CIF, IOBSP) / transport / sport / esthétique invasive / sécurité privée. Pour TOUS les EMPLOYEURS : mutuelle collective ANI 2013. Pour TOUT véhicule : RC circulation auto pro. Pour LOCATAIRES bail commercial : multirisque local.',
        },
        {
          q: "Sanctions en cas d'absence d'assurance obligatoire ?",
          a: "DÉCENNALE absente : 75 000€ + 6 mois prison + interdiction exercer (L. 243-3 C. assur.). MUTUELLE collective absente : redressement URSSAF + dommages-intérêts salariés. AUTO pro absente : 75 000€ + 6 mois prison + immobilisation véhicule. RC Pro santé absente : radiation Ordre. Cumul possible avec poursuites au pénal pour mise en danger d'autrui.",
        },
        {
          q: 'Et la mutuelle santé du dirigeant TNS ?',
          a: "PAS obligatoire pour le dirigeant TNS (vs salariés où la mutuelle COLLECTIVE est obligatoire). MAIS fortement recommandée — la Sécu seule rembourse mal sur optique/dentaire/dépassement honoraires. Voir <a href='/mutuelle-tns' class='text-primary-600 underline'>/mutuelle-tns</a>.",
        },
        {
          q: 'Combien de temps pour vérifier ma conformité ?',
          a: '30 minutes via notre checklist + audit de votre situation actuelle. Notre cabinet ORIAS établit un diagnostic gratuit de vos garanties obligatoires manquantes sous 24h. Devis pour combler les manques sous 48h.',
        },
      ]}
    />
  )
}
