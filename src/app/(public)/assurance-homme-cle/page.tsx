/**
 * Pilier — Assurance homme-clé (1 100 vol/mois, KD 0)
 * Source data : Ahrefs 2026-04-29, kw_universe['assurance homme clé'] +
 * vert-homme_cl__assurance.json (78 KW).
 *
 * KD 0 = aucune compétition réelle, opportunité massive. Niche pépite.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-homme-cle'
const TITLE = 'Assurance homme-clé — Protéger l\'avenir de votre entreprise'
const TAGLINE = "L'assurance homme-clé indemnise votre société en cas de décès ou d'invalidité d'un dirigeant ou d'un collaborateur indispensable. Conseil ORIAS pour PME, ETI, start-ups."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Assurance homme-clé (key-person) : capital ou rente versée à l'entreprise en cas de décès ou d'invalidité d'un dirigeant ou collaborateur stratégique. Tarifs négociés, fiscalité optimisée. Devis gratuit ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: TAGLINE,
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance homme-clé (ou « key-person insurance ») est une garantie souscrite par une entreprise sur la tête d'une personne dont la disparition ou l'incapacité de travail aurait un impact financier majeur sur l'activité : dirigeant fondateur, directeur commercial qui apporte 60% du CA, CTO seul détenteur de l'expertise technique critique, médecin associé d'une SELARL, avocat associé d'un cabinet... En cas de décès ou d'invalidité de la personne assurée, l'entreprise reçoit un capital ou une rente lui permettant de compenser la perte de chiffre d'affaires, de financer un recrutement de remplacement, de rembourser un emprunt bancaire ou de stabiliser sa trésorerie. Contrairement à l'assurance vie ou prévoyance individuelle, le bénéficiaire est l'entreprise (et non la famille). Cette page détaille le mécanisme, les tarifs 2026, la fiscalité (charges déductibles, capital imposable) et les pièges classiques."
      legalReference="Article 39 du CGI (charges déductibles) + jurisprudence Cass. com. 1995"
      isObligatoire={false}
      benefits={[
        { icon: '👨‍💼', title: 'Capital ou rente entreprise', desc: 'L\'entreprise est bénéficiaire (pas la famille). Indemnise la perte de revenus liée à la disparition' },
        { icon: '💼', title: 'Charges déductibles', desc: 'Cotisations déductibles du résultat imposable (art. 39 CGI). Fiscalité optimisée' },
        { icon: '🏦', title: 'Garantie bancaire', desc: 'Souvent exigée par les banques pour octroi/maintien de prêt PME (10-25% du capital prêté)' },
        { icon: '⚡', title: 'Souscription rapide', desc: 'Devis sous 24h, formalités médicales allégées jusqu\'à 200 k€ de capital assuré' },
      ]}
      sections={[
        {
          h2: 'Qu\'est-ce qu\'un « homme-clé » dans l\'entreprise ?',
          body: (
            <>
              <p>
                Un homme-clé (ou femme-clé — terme générique « personne-clé ») est défini par
                la jurisprudence et la pratique assurantielle comme une personne dont la
                disparition ou l&apos;incapacité de travail entraînerait une perte significative
                pour l&apos;entreprise, généralement caractérisée par :
              </p>
              <ul>
                <li>Une <strong>contribution déterminante au chiffre d&apos;affaires</strong> (apport commercial direct &gt; 30%)</li>
                <li>Un <strong>savoir-faire technique unique</strong> non transférable rapidement (brevet, méthode propriétaire, expertise rare)</li>
                <li>Un <strong>réseau professionnel critique</strong> (clés clients institutionnels, partenariats stratégiques)</li>
                <li>Un <strong>rôle de pilotage opérationnel</strong> sans backup interne (CEO solo, CTO unique)</li>
                <li>Un <strong>statut juridique spécifique</strong> (gérant unique de SARL, associé unique d&apos;EURL, médecin associé d&apos;une SELARL)</li>
              </ul>
              <p>
                Profils typiques assurés : fondateurs / dirigeants de PME (CA &lt; 10 M€),
                associés de cabinets de professions libérales (médecins, avocats, notaires,
                experts-comptables), CTO de start-ups en levée de fonds, directeurs commerciaux
                ETI, sportifs/artistes générant les revenus d&apos;une société ad-hoc.
              </p>
            </>
          ),
        },
        {
          h2: 'Combien coûte une assurance homme-clé en 2026 ?',
          body: (
            <>
              <p>
                Tarifs indicatifs 2026 pour un capital décès + invalidité absolue, basés
                sur les barèmes de nos 5 partenaires (AXA Pro, Allianz Vie, Generali, Hiscox,
                Aviva Pro) :
              </p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil assuré</th>
                    <th className="border p-2 text-right">Capital assuré</th>
                    <th className="border p-2 text-right">Cotisation annuelle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Dirigeant 35 ans, non-fumeur, sans antécédent</td><td className="border p-2 text-right">200 000 €</td><td className="border p-2 text-right">280 € – 420 €</td></tr>
                  <tr><td className="border p-2">Dirigeant 45 ans, non-fumeur</td><td className="border p-2 text-right">500 000 €</td><td className="border p-2 text-right">980 € – 1 580 €</td></tr>
                  <tr><td className="border p-2">CTO 38 ans, fumeur</td><td className="border p-2 text-right">300 000 €</td><td className="border p-2 text-right">680 € – 1 100 €</td></tr>
                  <tr><td className="border p-2">Médecin associé SELARL, 50 ans</td><td className="border p-2 text-right">400 000 €</td><td className="border p-2 text-right">1 280 € – 2 100 €</td></tr>
                  <tr><td className="border p-2">Sportif pro, 28 ans</td><td className="border p-2 text-right">1 000 000 €</td><td className="border p-2 text-right">2 800 € – 6 200 €</td></tr>
                </tbody>
              </table>
              <p className="text-xs italic text-gray-600 mt-2">
                Tarifs hors options (rente d&apos;invalidité progressive, exonération de
                cotisation en cas d&apos;arrêt de travail). Examen médical au-delà de 200 k€
                de capital (questionnaire simple en deçà).
              </p>
            </>
          ),
        },
        {
          h2: 'Fiscalité de l\'assurance homme-clé : charges déductibles, capital imposable',
          body: (
            <>
              <p>
                L&apos;assurance homme-clé bénéficie d&apos;un régime fiscal favorable :
              </p>
              <ul>
                <li><strong>Cotisations déductibles</strong> du résultat imposable au titre de l&apos;article 39 du CGI (charges générales d&apos;exploitation), sous conditions cumulatives :
                  <ul>
                    <li>L&apos;entreprise est seule bénéficiaire du capital (pas la famille)</li>
                    <li>L&apos;assurance correspond à un intérêt économique réel (lien de causalité personne-CA)</li>
                    <li>Le contrat ne comporte pas de capitalisation</li>
                  </ul>
                </li>
                <li><strong>Capital perçu imposable</strong> au résultat (IS ou IR selon la forme juridique), mais étalable sur 5 ans pour absorber l&apos;impact</li>
                <li><strong>Pas de contributions sociales</strong> URSSAF sur les cotisations (vs assurance prévoyance individuelle)</li>
              </ul>
              <p>
                <strong>Cas particulier des cabinets libéraux (BNC)</strong> : les cotisations
                sont déductibles directement sur le bénéfice non commercial, sans plafond Madelin
                spécifique (l&apos;assurance homme-clé n&apos;est pas un contrat Madelin).
              </p>
            </>
          ),
        },
        {
          h2: 'Quel capital assurer ? La méthode de calcul recommandée',
          body: (
            <>
              <p>
                3 méthodes de dimensionnement, à combiner :
              </p>
              <ol>
                <li><strong>Méthode du multiple de salaire / rémunération</strong> :
                  capital = 3 à 5 ans de rémunération brute annuelle de la personne (salaire +
                  dividendes pour gérants TNS).</li>
                <li><strong>Méthode du multiple de marge brute apportée</strong> :
                  capital = 2 ans de marge brute imputable à la personne. Utile pour
                  un commercial qui apporte 70 % du CA mais n&apos;est pas le mieux payé.</li>
                <li><strong>Méthode du coût de remplacement</strong> :
                  capital = (recrutement remplaçant + formation 12 mois + perte de productivité
                  pendant la transition + impact commercial sur 24 mois). Pour un CTO start-up :
                  facilement 800 k€ – 1,5 M€.</li>
              </ol>
              <p>
                Recommandation pragmatique : prendre le maximum des 3 méthodes, plafonner à
                5× la rémunération brute annuelle (au-delà, l&apos;administration fiscale
                peut requalifier en avantage en nature).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        { q: 'Qui peut souscrire une assurance homme-clé ?', a: "L'entreprise est souscriptrice ET bénéficiaire (jamais la personne assurée individuellement). Toutes formes juridiques éligibles : SARL, SAS, SASU, EURL, SCI à objet commercial, professions libérales en BNC ou SELARL. Statut TPE/PME/ETI/start-up indifférent." },
        { q: 'Combien coûte une assurance homme-clé pour un dirigeant de PME ?', a: "Pour un dirigeant 40 ans non-fumeur sans antécédent médical, capital 300 k€ : ~580 à 920 €/an. Pour un capital 500 k€ : ~980 à 1 580 €/an. Tarifs fonction de l'âge, du statut tabagique, de la profession (sportif > BTP > tertiaire) et des antécédents médicaux." },
        { q: 'Les cotisations homme-clé sont-elles déductibles fiscalement ?', a: "Oui, déductibles du résultat imposable au titre de l'article 39 du CGI (charges d'exploitation), sous 3 conditions : entreprise seule bénéficiaire, intérêt économique réel démontrable, contrat sans capitalisation. Capital perçu en cas de sinistre : imposable au résultat, étalable sur 5 ans." },
        { q: 'Différence entre assurance homme-clé et assurance prévoyance individuelle du dirigeant ?', a: "Assurance homme-clé = ENTREPRISE bénéficiaire (compense la perte économique). Assurance prévoyance individuelle = FAMILLE bénéficiaire (capital décès, rente conjoint, rente éducation). Les deux sont complémentaires : un dirigeant patrimonial bien équipé a généralement les deux." },
        { q: 'La banque exige-t-elle une assurance homme-clé pour un prêt PME ?', a: "Très fréquent pour les prêts > 200 k€ ou les financements LBO/MBO. Les banques exigent typiquement un capital homme-clé égal à 10-25% du capital prêté, avec délégation de bénéfice partielle au profit de la banque (en cas de décès, le capital rembourse en priorité le prêt restant dû)." },
        { q: 'Que se passe-t-il si je quitte l\'entreprise (vente, retraite) ?', a: "Le contrat homme-clé peut être : (1) résilié immédiatement par l'entreprise (loi Hamon), (2) transformé en contrat individuel à votre nom avec maintien des garanties (rachat possible), (3) maintenu par l'entreprise jusqu'à votre départ effectif si transition longue. À étudier au cas par cas avec votre courtier." },
        { q: 'Combien de temps pour obtenir un devis homme-clé ?', a: "Devis personnalisé via notre formulaire : 24h ouvrées avec 3 propositions. Souscription : 48h pour capital ≤ 200 k€ (questionnaire de santé simple). Au-delà : 7-15 jours (examen médical complémentaire requis : analyses de sang, ECG, parfois épreuve d'effort)." },
      ]}
    />
  )
}
