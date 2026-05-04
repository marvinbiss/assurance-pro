import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Médiation — Réclamation et résolution de litige | Assurance Pro',
  description:
    "Procédure de médiation conforme à la Recommandation ACPR 2024-R-02. Réclamation interne puis Médiateur de l'Assurance.",
  alternates: { canonical: `${SITE_URL}/mediation` },
  openGraph: {
    title: 'Médiation — Réclamation et résolution de litige | Assurance Pro',
    description:
      'Procédure de médiation conforme à la Recommandation ACPR 2024-R-02. Réclamation interne puis Médiateur de l\\',
    url: `${SITE_URL}/mediation`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Médiation — Réclamation et résolution de litige | Assurance Pro',
    description:
      'Procédure de médiation conforme à la Recommandation ACPR 2024-R-02. Réclamation interne puis Médiateur de l\\',
  },
}

export default function MediationPage() {
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="prose prose-lg container mx-auto max-w-3xl px-4">
        <h1>Médiation et résolution de litige</h1>

        <p className="text-lg">
          Notre cabinet de courtage ORIAS s\'engage à traiter chaque réclamation avec rigueur et
          célérité, conformément à la{' '}
          <strong>Recommandation ACPR 2024-R-02 du 2 juillet 2024</strong>.
        </p>

        <h2>1. Procédure interne (1ʳᵉ étape)</h2>
        <p>
          En cas de désaccord ou d\'insatisfaction, nous vous invitons à nous contacter en premier
          lieu via notre service réclamations dédié :
        </p>
        <ul>
          <li>
            📧 Email :{' '}
            <a href="mailto:reclamations@assurance-pro.fr">reclamations@assurance-pro.fr</a>
          </li>
          <li>📨 Courrier : Service Réclamations — Assurance Pro — [Adresse cabinet]</li>
        </ul>

        <h3>Nos engagements</h3>
        <ul>
          <li>
            <strong>Accusé de réception</strong> sous 10 jours ouvrés
          </li>
          <li>
            <strong>Réponse sur le fond</strong> sous 2 mois maximum
          </li>
          <li>Information à chaque étape de l\'avancement</li>
          <li>Tentative de résolution amiable systématique</li>
        </ul>

        <h2>2. Médiation externe (2ᵉ étape)</h2>
        <p>
          En cas de désaccord persistant après la procédure interne (ou si vous n\'obtenez pas de
          réponse dans les 2 mois), vous pouvez saisir gratuitement{' '}
          <strong>la Médiation de l\'Assurance</strong>.
        </p>

        <div className="not-prose my-6 rounded-lg bg-blue-50 p-6">
          <h3 className="mb-3 text-xl font-bold">La Médiation de l\'Assurance</h3>
          <ul className="list-none space-y-2 pl-0">
            <li>
              📨 <strong>Adresse :</strong> TSA 50110, 75441 Paris cedex 09
            </li>
            <li>
              🌐 <strong>Site :</strong>{' '}
              <a
                href="https://www.mediation-assurance.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                www.mediation-assurance.org
              </a>
            </li>
            <li>
              📧 <strong>Saisine en ligne :</strong> formulaire sur le site officiel
            </li>
            <li>
              ⏱️ <strong>Délai de traitement :</strong> 90 jours en moyenne
            </li>
            <li>
              💰 <strong>Coût :</strong> gratuit pour le consommateur
            </li>
          </ul>
        </div>

        <h3>Conditions de saisine du Médiateur</h3>
        <ul>
          <li>Vous avez d\'abord tenté un recours auprès de notre cabinet</li>
          <li>Le litige n\'est pas encore porté devant un tribunal</li>
          <li>Le litige date de moins de 2 ans</li>
          <li>Le litige porte sur l\'exécution ou l\'interprétation d\'un contrat d\'assurance</li>
        </ul>

        <h2>3. Recours judiciaire (dernier recours)</h2>
        <p>
          Si la médiation n\'aboutit pas, vous conservez le droit d\'intenter une action devant les
          tribunaux français compétents.
        </p>

        <h2>4. Autres recours</h2>
        <ul>
          <li>
            <strong>ACPR</strong> (Autorité de Contrôle Prudentiel et de Résolution) pour signaler
            un manquement professionnel :{' '}
            <a href="https://acpr.banque-france.fr" target="_blank" rel="noopener noreferrer">
              acpr.banque-france.fr
            </a>
          </li>
          <li>
            <strong>CNIL</strong> pour les questions relatives à la protection de vos données
            personnelles :{' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              www.cnil.fr
            </a>
          </li>
          <li>
            <strong>DGCCRF</strong> pour signaler une pratique commerciale trompeuse :{' '}
            <a href="https://signal.conso.gouv.fr" target="_blank" rel="noopener noreferrer">
              signal.conso.gouv.fr
            </a>
          </li>
        </ul>
      </div>
    </main>
  )
}
