import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Merci — Demande reçue | Assurance Pro',
  description: 'Votre demande de devis a bien été reçue. Un courtier ORIAS vous recontactera dans les délais SLA.',
  robots: { index: false, follow: true },
}

const SLA_BY_SEGMENT: Record<'hot' | 'warm' | 'cold', { label: string; eta: string; color: string }> = {
  hot: { label: 'Priorité haute', eta: '2 heures ouvrées', color: 'red' },
  warm: { label: 'Priorité standard', eta: '24 heures ouvrées', color: 'amber' },
  cold: { label: 'Priorité étendue', eta: '72 heures ouvrées', color: 'blue' },
}

export default async function MerciPage({
  searchParams,
}: {
  // Next.js 15 : searchParams est désormais une Promise.
  searchParams: Promise<{ ref?: string; seg?: string }>
}) {
  const params = await searchParams
  const reference = params.ref ?? null
  const segment = (params.seg as 'hot' | 'warm' | 'cold' | undefined) ?? 'warm'
  const sla = SLA_BY_SEGMENT[segment] ?? SLA_BY_SEGMENT.warm

  return (
    <main className="min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-8 md:p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-700 text-3xl mb-4" aria-hidden="true">
            ✓
          </div>
          <h1 className="text-3xl font-bold mb-2">Demande bien reçue</h1>
          <p className="text-gray-600 mb-6">
            Un email de confirmation vient de vous être envoyé.
          </p>

          {reference && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 inline-block">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Référence dossier</p>
              <p className="font-mono text-lg font-bold">{reference}</p>
            </div>
          )}

          <div className={`mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-${sla.color}-50 border border-${sla.color}-200 text-${sla.color}-800 text-sm font-semibold`}>
            <span aria-hidden="true">⏱</span>
            {sla.label} — recontact sous {sla.eta}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-6">
          <h2 className="font-semibold mb-3 text-blue-900">Prochaines étapes</h2>
          <ol className="space-y-3 text-sm text-blue-900">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center">1</span>
              <span>Email de confirmation reçu (vérifiez aussi vos spams).</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center">2</span>
              <span>Notre équipe analyse votre profil et interroge les assureurs partenaires les plus adaptés.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center">3</span>
              <span>
                Un courtier ORIAS vous contacte pour <strong>recueillir vos exigences et formuler une
                recommandation écrite motivée</strong> (devoir de conseil DDA — art. L. 521-4 C.&nbsp;assur.).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center">4</span>
              <span>Vous recevez 2 à 3 propositions tarifées comparables. Choix libre, sans engagement.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center">5</span>
              <span>Souscription en ligne — attestation délivrée sous 24h.</span>
            </li>
          </ol>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-900">
          <p className="font-semibold mb-1">Une question urgente&nbsp;?</p>
          <p>
            Téléphone : <strong>01 XX XX XX XX</strong> (lundi-vendredi 9h-18h)<br />
            Email : <a href="mailto:contact@assurance-pro.fr" className="underline">contact@assurance-pro.fr</a>
          </p>
        </div>

        <div className="text-xs text-gray-500 leading-relaxed mb-6">
          <p className="mb-2">
            <strong>Conformité ACPR.</strong> Conformément à la Recommandation ACPR 2024-R-03, votre
            demande déclenche la traçabilité du conseil. Les exigences que vous avez déclarées sont
            enregistrées de manière immuable et utilisées pour fonder notre recommandation
            personnalisée.
          </p>
          <p>
            <strong>Aucun frais de courtage</strong> ne vous sera facturé. Nous sommes rémunérés
            exclusivement par les commissions des compagnies partenaires (art. L. 521-2 C. assur.).
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <Link
            href="/comparateur-assureurs"
            className="text-center px-5 py-2.5 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
          >
            Voir le comparateur
          </Link>
          <Link
            href="/"
            className="text-center px-5 py-2.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
