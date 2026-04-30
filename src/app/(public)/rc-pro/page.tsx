import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'

export const metadata: Metadata = {
  title: 'RC Pro — Responsabilité Civile Professionnelle | Assurance Pro',
  description:
    'Comparez votre RC Pro auprès de 10 assureurs. Consultants, freelances, agences digitales, services aux entreprises. Devis gratuit en 24h.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assurance-pro.fr'}/rc-pro` },
}

const PROFESSIONS_RC_PRO = [
  { name: 'Consultant', slug: 'consultant' },
  { name: 'Freelance IT', slug: 'freelance-it' },
  { name: 'Agence web', slug: 'agence-web' },
  { name: 'Designer', slug: 'designer-graphique' },
  { name: 'Photographe', slug: 'photographe' },
  { name: 'Coach pro', slug: 'coach-professionnel' },
  { name: 'Formateur', slug: 'formateur' },
  { name: 'Community manager', slug: 'community-manager' },
  { name: 'Traducteur', slug: 'traducteur' },
  { name: 'Auto-entrepreneur', slug: 'auto-entrepreneur' },
]

export default function PilierRcProPage() {
  return (
    <PilierLayout
      slug="rc-pro"
      title="RC Pro — Responsabilité Civile Professionnelle"
      tagline="L'assurance qui couvre les dommages causés à vos clients dans l'exercice de votre activité. Indispensable pour tout professionnel qui conseille, livre ou intervient."
      legalReference="art. L. 124-3 et L. 121-2 du Code des assurances"
      isObligatoire={false}
      intro="La RC Pro (Responsabilité Civile Professionnelle) couvre les dommages corporels, matériels et immatériels que vous pourriez causer à vos clients ou à des tiers dans l'exercice de votre activité professionnelle. Elle est obligatoire pour certaines professions réglementées (avocats, médecins, agents immobiliers) et fortement recommandée pour toutes les autres. Notre cabinet ORIAS compare 10 assureurs partenaires (Hiscox, April Pro, Stello, Wakam, AXA Pro…) pour vous proposer la meilleure couverture au tarif le plus adapté."
      benefits={[
        { icon: '🛡️', title: 'Jusqu\'à 5M€ de couverture', desc: 'Plafonds élevés disponibles' },
        { icon: '💼', title: '32 professions couvertes', desc: 'Spécialiste services pros' },
        { icon: '⚡', title: 'Souscription en ligne', desc: 'Attestation immédiate' },
        { icon: '💰', title: 'À partir de 12€/mois', desc: 'Pour les auto-entrepreneurs' },
      ]}
      sections={[
        {
          h2: 'Qui doit souscrire une RC Pro ?',
          body: (
            <>
              <p>
                La RC Pro est <strong>obligatoire par la loi</strong> pour&nbsp;:
              </p>
              <ul>
                <li>Les professions réglementées du droit (avocats, notaires, huissiers)</li>
                <li>Les professions médicales et paramédicales (médecins, infirmiers, kinés…)</li>
                <li>Les experts-comptables, commissaires aux comptes</li>
                <li>Les agents immobiliers, syndics, administrateurs de biens</li>
                <li>Les agences de voyages, intermédiaires en assurance, IOBSP</li>
                <li>Les architectes, maîtres d\'œuvre, géomètres</li>
              </ul>
              <p>
                Elle est <strong>fortement recommandée</strong> (et exigée par certains clients ou
                appels d\'offres) pour&nbsp;:
              </p>
              <ul>
                <li>Consultants, freelances, indépendants</li>
                <li>Agences web, ESN, développeurs</li>
                <li>Coachs, formateurs, mentors</li>
                <li>Photographes, vidéastes, designers</li>
                <li>Tous les services aux entreprises ou aux particuliers</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Que couvre la RC Pro ?',
          body: (
            <>
              <p>La RC Pro couvre 3 types de dommages causés à des tiers&nbsp;:</p>
              <ul>
                <li>
                  <strong>Dommages corporels</strong>&nbsp;: blessures physiques, atteinte à la santé
                  (rare hors métiers à risque)
                </li>
                <li>
                  <strong>Dommages matériels</strong>&nbsp;: dégradation ou perte de biens
                  appartenant à vos clients (matériel cassé chez un client, équipement
                  endommagé pendant une intervention)
                </li>
                <li>
                  <strong>Dommages immatériels</strong>&nbsp;: pertes financières causées par votre
                  faute ou négligence (perte d\'exploitation, perte de chiffre d\'affaires,
                  manque à gagner). C\'est la <em>garantie reine</em> pour les consultants
                  et freelances.
                </li>
              </ul>
              <p className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 text-sm">
                <strong>Exclusions classiques</strong>&nbsp;: dommages intentionnels, manquements
                délibérés à la réglementation, dommages causés aux biens dont vous avez
                la garde, certaines exclusions sectorielles. Vérifiez attentivement les
                conditions générales.
              </p>
            </>
          ),
        },
        {
          h2: 'Combien coûte une RC Pro ?',
          body: (
            <>
              <p>Le tarif annuel dépend de votre activité, de votre CA et du plafond de couverture choisi&nbsp;:</p>
              <table className="w-full text-sm border-collapse my-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Profession</th>
                    <th className="border border-gray-300 p-2 text-right">Auto-ent.</th>
                    <th className="border border-gray-300 p-2 text-right">SARL/SAS</th>
                    <th className="border border-gray-300 p-2 text-right">CA &gt;500k</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 p-2">Consultant</td><td className="border border-gray-300 p-2 text-right">144-288€</td><td className="border border-gray-300 p-2 text-right">450-1 200€</td><td className="border border-gray-300 p-2 text-right">2 500-5 500€</td></tr>
                  <tr><td className="border border-gray-300 p-2">Agence web</td><td className="border border-gray-300 p-2 text-right">200-380€</td><td className="border border-gray-300 p-2 text-right">600-1 800€</td><td className="border border-gray-300 p-2 text-right">3 200-7 000€</td></tr>
                  <tr><td className="border border-gray-300 p-2">Coach pro</td><td className="border border-gray-300 p-2 text-right">120-240€</td><td className="border border-gray-300 p-2 text-right">350-900€</td><td className="border border-gray-300 p-2 text-right">2 000-4 500€</td></tr>
                  <tr><td className="border border-gray-300 p-2">Avocat</td><td className="border border-gray-300 p-2 text-right">N/A</td><td className="border border-gray-300 p-2 text-right">800-2 200€</td><td className="border border-gray-300 p-2 text-right">3 500-8 000€</td></tr>
                  <tr><td className="border border-gray-300 p-2">Médecin</td><td className="border border-gray-300 p-2 text-right">N/A</td><td className="border border-gray-300 p-2 text-right">1 200-3 500€</td><td className="border border-gray-300 p-2 text-right">5 000-12 000€</td></tr>
                </tbody>
              </table>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La RC Pro est-elle obligatoire pour un auto-entrepreneur ?',
          a: 'Cela dépend de l\'activité. Pour les consultants, freelances digitaux, coachs, services aux particuliers, elle n\'est pas obligatoire mais fortement recommandée (et souvent exigée par les clients pros). Pour les professions réglementées (avocat, médecin, agent immobilier…), elle est OBLIGATOIRE quel que soit le statut.',
        },
        {
          q: 'RC Pro vs RC Exploitation : quelle différence ?',
          a: 'La RC Pro couvre les dommages causés DANS LE CADRE de votre prestation (mauvais conseil, erreur professionnelle). La RC Exploitation couvre les dommages causés EN DEHORS de la prestation (un visiteur tombe dans vos locaux). Les deux peuvent être combinées dans un contrat multirisque pro.',
        },
        {
          q: 'Quel plafond de garantie choisir ?',
          a: 'Pour un auto-entrepreneur consultant, 500k-1M€ par sinistre suffit généralement. Pour une agence ou un freelance qui intervient sur des projets stratégiques (>50k€), prévoir 2-3M€. Pour les professions à risque élevé (médical, juridique, IT critique), 5M€+ sont recommandés.',
        },
        {
          q: 'Que se passe-t-il si je n\'ai pas de RC Pro ?',
          a: 'En cas de sinistre, vous engagez votre patrimoine personnel (auto-entrepreneur, EI) ou celui de votre société. Pour les professions réglementées, l\'absence de RC Pro est sanctionnée pénalement et peut entraîner radiation/suspension de votre droit d\'exercer.',
        },
        {
          q: 'Puis-je déclarer un sinistre rétroactivement ?',
          a: 'La plupart des contrats RC Pro fonctionnent en "réclamation" : ils couvrent les sinistres déclarés pendant la période de validité, même pour des faits antérieurs (sous condition de "garantie subséquente"). Vérifiez le délai de garantie subséquente (2-10 ans selon contrat).',
        },
        {
          q: 'La RC Pro couvre-t-elle les frais de défense juridique ?',
          a: 'Oui, la plupart des contrats RC Pro incluent une "garantie défense recours" qui prend en charge les frais d\'avocats et expertises pour vous défendre en cas de litige avec un client. Vérifiez les plafonds (souvent 50k-150k€).',
        },
      ]}
      relatedMetiers={PROFESSIONS_RC_PRO}
    />
  )
}
