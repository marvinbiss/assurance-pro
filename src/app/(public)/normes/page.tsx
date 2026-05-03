import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Normes et conformité | Assurance Pro',
  description: 'Conformité ORIAS, ACPR, CSCA, RGPD, DDA. Normes et obligations légales du courtier en assurance.',
  alternates: { canonical: `${SITE_URL}/normes` },
}

interface Norme {
  title: string
  reference: string
  description: string
}

const NORMES: Norme[] = [
  {
    title: 'Loi Spinetta',
    reference: 'Loi 78-12 du 4 janvier 1978',
    description: 'Institue la responsabilité civile décennale obligatoire pour les constructeurs et la garantie dommages-ouvrage pour les maîtres d\'ouvrage.',
  },
  {
    title: 'Article 1792 du Code civil',
    reference: 'Code civil, art. 1792',
    description: 'Établit la présomption de responsabilité des constructeurs pour les dommages compromettant la solidité de l\'ouvrage.',
  },
  {
    title: 'Code des assurances',
    reference: 'C. assur. art. L. 241-1, L. 121-2, L. 521-4, L. 512-1',
    description: 'Cadre légal général de l\'assurance professionnelle en France : décennale obligatoire, devoir de conseil, immatriculation ORIAS.',
  },
  {
    title: 'Loi Kouchner',
    reference: 'Loi 2002-303 du 4 mars 2002',
    description: 'Impose la souscription d\'une RC Pro pour tout professionnel de santé exerçant à titre libéral.',
  },
  {
    title: 'Loi Madelin',
    reference: 'Loi 94-126 du 11 février 1994',
    description: 'Permet aux Travailleurs Non Salariés de déduire fiscalement les cotisations de mutuelle, prévoyance et retraite.',
  },
  {
    title: 'Loi Hamon',
    reference: 'Loi 2014-344 du 17 mars 2014',
    description: 'Permet la résiliation des contrats d\'assurance après 1 an, à tout moment, avec préavis 1 mois.',
  },
  {
    title: 'Loi Naegelen',
    reference: 'Loi 2020-901 + décret 2022-34',
    description: 'Encadre le démarchage téléphonique : 10h-13h et 14h-20h, max 4 appels/mois, intégration Bloctel.',
  },
  {
    title: 'DDA — Directive Distribution Assurance',
    reference: 'Directive 2016/97/UE + Ord. 2018-361',
    description: 'Encadre la distribution d\'assurance en Europe : information précontractuelle, devoir de conseil, transparence rémunérations.',
  },
  {
    title: 'Recommandation ACPR 2024-R-02',
    reference: 'ACPR, 2 juillet 2024',
    description: 'Traitement des réclamations : accusé sous 10 jours, réponse fond sous 2 mois, registre obligatoire. Applicable au 31/12/2025.',
  },
  {
    title: 'Recommandation ACPR 2024-R-03',
    reference: 'ACPR, 21 novembre 2024',
    description: 'Recueil des informations relatives au client (devoir de conseil DDA). Durcit la traçabilité du conseil personnalisé. Applicable au 31/12/2025.',
  },
  {
    title: 'RGPD',
    reference: 'Règlement (UE) 2016/679',
    description: 'Règlement Général sur la Protection des Données. Encadre le traitement des données personnelles dans toute l\'UE.',
  },
  {
    title: 'Arrêté du 6 décembre 2022',
    reference: 'JO du 8 décembre 2022',
    description: 'Lutte contre l\'usurpation d\'identité ORIAS. Impose la cliquabilité du numéro ORIAS sur les sites des courtiers.',
  },
]

export default function NormesPage() {
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Normes et conformité</h1>
          <p className="text-gray-600 text-lg">
            Notre cabinet de courtage ORIAS opère dans le strict respect du cadre légal et réglementaire
            français et européen.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Cadre légal applicable</h2>
          <div className="space-y-4">
            {NORMES.map((n) => (
              <article key={n.title} className="border-l-4 border-blue-600 pl-4 py-2">
                <h3 className="font-bold text-lg">{n.title}</h3>
                <p className="text-sm text-gray-500 italic">{n.reference}</p>
                <p className="mt-1 text-gray-700">{n.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Notre conformité</h2>
          <ul className="space-y-2">
            <li>✅ Immatriculation ORIAS active (vérifiable sur orias.fr)</li>
            <li>✅ RCP renforcée 5 M€/sinistre — 7,5 M€/an</li>
            <li>✅ Garantie financière conforme L. 512-7 C. assur.</li>
            <li>✅ Adhésion CSCA active</li>
            <li>✅ Procédure réclamations 2024-R-02 opérationnelle</li>
            <li>✅ Devoir de conseil 2024-R-03 tracé (hash SHA-256)</li>
            <li>✅ DPO externe désigné</li>
            <li>✅ Registre des traitements RGPD à jour</li>
            <li>✅ Audit juridique annuel</li>
            <li>✅ Veille réglementaire trimestrielle ACPR/EIOPA/CNIL</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Autorités de contrôle</h2>
          <ul className="space-y-3">
            <li>
              <strong>ACPR</strong> — Autorité de Contrôle Prudentiel et de Résolution
              <br />
              <span className="text-sm text-gray-600">
                4 Place de Budapest, CS 92459, 75436 Paris cedex 09 —{' '}
                <a href="https://acpr.banque-france.fr" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  acpr.banque-france.fr
                </a>
              </span>
            </li>
            <li>
              <strong>ORIAS</strong> — Registre Unique des Intermédiaires
              <br />
              <span className="text-sm text-gray-600">
                <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  orias.fr
                </a>
              </span>
            </li>
            <li>
              <strong>CNIL</strong> — Commission Nationale Informatique et Libertés
              <br />
              <span className="text-sm text-gray-600">
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  cnil.fr
                </a>
              </span>
            </li>
            <li>
              <strong>Médiation de l\'Assurance</strong>
              <br />
              <span className="text-sm text-gray-600">
                TSA 50110, 75441 Paris cedex 09 —{' '}
                <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  mediation-assurance.org
                </a>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
