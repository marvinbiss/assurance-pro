/**
 * Footer — Assurance Pro France
 * Conformité ORIAS arrêté 6/12/2022 (cliquabilité obligatoire)
 * Mentions légales + ACPR + RCP + association agréée
 */

import Link from 'next/link'
import { buildOriasFicheUrl, buildOriasRegistryUrl, formatOriasDisplay } from '@/lib/api/orias'

const ORIAS_NUMBER = process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'

export default function Footer() {
  const oriasFormatted = formatOriasDisplay(ORIAS_NUMBER.replace(/\s/g, '') || '07000000')
  const oriasFicheUrl = buildOriasFicheUrl(ORIAS_NUMBER.replace(/\s/g, '') || '07000000')
  const oriasRegistryUrl = buildOriasRegistryUrl()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              🛡️ Assurance Pro
            </h3>
            <p className="text-sm leading-relaxed">
              Cabinet de courtage indépendant spécialiste de l’assurance professionnelle.
              17 verticaux couverts. 10+ assureurs partenaires.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Garanties</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/assurance-decennale" className="hover:text-white">Décennale BTP</Link></li>
              <li><Link href="/rc-pro" className="hover:text-white">RC Pro</Link></li>
              <li><Link href="/multirisque-pro" className="hover:text-white">Multirisque Pro</Link></li>
              <li><Link href="/mutuelle-pro" className="hover:text-white">Mutuelle / TNS</Link></li>
              <li><Link href="/assurance-vtc" className="hover:text-white">VTC / Taxi</Link></li>
              <li><Link href="/cyber-assurance" className="hover:text-white">Cyber</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/devis" className="hover:text-white">Devis gratuit</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/glossaire" className="hover:text-white">Glossaire</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/mediation" className="hover:text-white">Médiation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Mentions légales</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cgv" className="hover:text-white">CGV</Link></li>
              <li><Link href="/confidentialite" className="hover:text-white">Confidentialité (RGPD)</Link></li>
              <li><Link href="/normes" className="hover:text-white">Normes & conformité</Link></li>
              <li><Link href="/plan-du-site" className="hover:text-white">Plan du site</Link></li>
            </ul>
          </div>
        </div>

        {/* Bandeau ORIAS — Conformité arrêté 6/12/2022 */}
        <div className="border-t border-gray-700 pt-8 text-xs leading-relaxed space-y-3 text-gray-400">
          <p>
            <strong className="text-gray-200">Assurance Pro</strong> est un cabinet de courtage
            en assurance immatriculé à l’ORIAS sous le numéro&nbsp;
            <a
              href={oriasFicheUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-blue-300 font-semibold"
            >
              {oriasFormatted}
            </a>
            &nbsp;(catégorie&nbsp;:&nbsp;Courtier&nbsp;–&nbsp;b). Le registre est consultable sur&nbsp;
            <a
              href={oriasRegistryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              www.orias.fr
            </a>.
          </p>
          <p>
            Soumis au contrôle de l’<strong>Autorité de Contrôle Prudentiel et de Résolution</strong>{' '}
            (ACPR) — 4 Place de Budapest, CS 92459, 75436 PARIS CEDEX 09.
          </p>
          <p>
            Responsabilité Civile Professionnelle et Garantie Financière conformes aux articles
            L.&nbsp;512-6 et L.&nbsp;512-7 du Code des assurances. Adhérent CSCA.
          </p>
          <p>
            En cas de réclamation : email&nbsp;<a href="mailto:reclamations@assurance-pro.fr" className="underline">reclamations@assurance-pro.fr</a>.
            Médiation possible auprès de la Médiation de l’Assurance — TSA 50110, 75441 Paris cedex 09 —{' '}
            <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener noreferrer" className="underline">
              www.mediation-assurance.org
            </a>.
          </p>
          <p className="pt-3 text-gray-500">
            © {new Date().getFullYear()} Assurance Pro. Tous droits réservés. Service de courtage —
            aucun frais facturé aux clients ; rémunération exclusivement par commissions des
            compagnies d’assurance partenaires.
          </p>
        </div>
      </div>
    </footer>
  )
}
