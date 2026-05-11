import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Merci — Demande reçue | Assurance Pro',
  description:
    'Votre demande de devis a bien été reçue. Un courtier ORIAS vous recontactera dans les délais SLA.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Merci — Demande reçue | Assurance Pro',
    description:
      'Votre demande de devis a bien été reçue. Un courtier ORIAS vous recontactera dans les délais SLA.',
    url: `${SITE_URL}/devis/merci`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merci — Demande reçue | Assurance Pro',
    description:
      'Votre demande de devis a bien été reçue. Un courtier ORIAS vous recontactera dans les délais SLA.',
  },
}

const SLA_BY_SEGMENT: Record<
  'hot' | 'warm' | 'cold',
  { label: string; eta: string; color: string }
> = {
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
    <main className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow md:p-12">
        <div className="text-center">
          <div
            className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700"
            aria-hidden="true"
          >
            ✓
          </div>
          <h1 className="mb-2 text-3xl font-bold">Demande bien reçue</h1>
          <p className="mb-6 text-gray-600">Un email de confirmation vient de vous être envoyé.</p>

          {reference && (
            <div className="mb-6 inline-block rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
                Référence dossier
              </p>
              <p className="font-mono text-lg font-bold">{reference}</p>
            </div>
          )}

          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-${sla.color}-50 border border-${sla.color}-200 text-${sla.color}-800 text-sm font-semibold`}
          >
            <span aria-hidden="true">⏱</span>
            {sla.label} — recontact sous {sla.eta}
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-5">
          <h2 className="mb-3 font-semibold text-blue-900">Prochaines étapes</h2>
          <ol className="space-y-3 text-sm text-blue-900">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                1
              </span>
              <span>Email de confirmation reçu (vérifiez aussi vos spams).</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                2
              </span>
              <span>
                Notre équipe analyse votre profil et interroge les assureurs partenaires les plus
                adaptés.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                3
              </span>
              <span>
                Un courtier ORIAS vous contacte pour{' '}
                <strong>
                  recueillir vos exigences et formuler une recommandation écrite motivée
                </strong>{' '}
                (devoir de conseil DDA — art. L. 521-4 C.&nbsp;assur.).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                4
              </span>
              <span>
                Vous recevez 2 à 3 propositions tarifées comparables. Choix libre, sans engagement.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                5
              </span>
              <span>Souscription en ligne — attestation délivrée sous 24h.</span>
            </li>
          </ol>
        </div>

        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="mb-1 font-semibold">Une question urgente&nbsp;?</p>
          <p>
            Téléphone : <strong>01 XX XX XX XX</strong> (lundi-vendredi 9h-18h)
            <br />
            Email :{' '}
            <a href="mailto:contact@vivos-assurance.fr" className="underline">
              contact@vivos-assurance.fr
            </a>
          </p>
        </div>

        <div className="mb-6 text-xs leading-relaxed text-gray-500">
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

        <div className="flex flex-col justify-center gap-3 md:flex-row">
          <Link
            href="/comparateur-assureurs"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-center font-semibold hover:bg-gray-50"
          >
            Voir le comparateur
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center font-semibold text-white hover:bg-blue-800"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
