/**
 * Footer — Vivos Assurance France
 *
 * Conformité ORIAS arrêté 6/12/2022 (cliquabilité obligatoire),
 * mentions légales + ACPR + RCP + association agréée.
 *
 * Design : charcoal-950 deep avec accents brand, hiérarchie claire,
 * grille 4 colonnes desktop / 2 mobile, mentions légales en bas pliable.
 */

import Link from 'next/link'
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'
import { buildOriasFicheUrl, buildOriasRegistryUrl, formatOriasDisplay } from '@/lib/api/orias'
import { VivosLogo } from '@/components/brand/VivosLogo'
import { IS_PRE_ORIAS, ORIAS_EXPECTED_DATE } from '@/lib/config/pre-orias'

const ORIAS_NUMBER = process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'

const FOOTER_GROUPS = [
  {
    title: 'Garanties',
    links: [
      { label: 'Décennale BTP', href: '/assurance-decennale' },
      { label: 'RC Pro', href: '/rc-pro' },
      { label: 'Multirisque Pro', href: '/multirisque-pro' },
      { label: 'Mutuelle / TNS', href: '/mutuelle-pro' },
      { label: 'VTC / Taxi', href: '/assurance-vtc' },
      { label: 'Cyber assurance', href: '/cyber-assurance' },
    ],
  },
  {
    title: 'Cabinet',
    links: [
      { label: 'À propos', href: '/a-propos' },
      { label: "L'équipe", href: '/equipe' },
      { label: 'Notre processus', href: '/notre-processus-conseil' },
      { label: 'Sélection assureurs', href: '/selection-assureurs' },
      { label: 'Comparateur', href: '/comparateur-assureurs' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Glossaire', href: '/glossaire' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Devis gratuit', href: '/devis' },
    ],
  },
  {
    title: 'Mentions légales',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'CGV', href: '/cgv' },
      { label: 'FIC (DDA)', href: '/fic' },
      { label: 'Fiches IPID', href: '/ipid' },
      { label: 'Confidentialité', href: '/confidentialite' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Réclamation', href: '/reclamation' },
      { label: 'Médiation', href: '/mediation' },
    ],
  },
] as const

export default function Footer() {
  const oriasClean = ORIAS_NUMBER.replace(/\s/g, '') || '07000000'
  const oriasFormatted = formatOriasDisplay(oriasClean)
  const oriasFicheUrl = buildOriasFicheUrl(oriasClean)
  const oriasRegistryUrl = buildOriasRegistryUrl()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-charcoal-950 text-charcoal-300">
      {/* Top accent gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Top : brand + contact */}
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="mb-5 inline-block transition-opacity hover:opacity-90"
              aria-label="Vivos Assurance — Accueil"
            >
              <VivosLogo size="lg" variant="light" />
            </Link>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-charcoal-400">
              Cabinet de courtage indépendant spécialiste de l'assurance professionnelle. 17
              verticaux couverts. 10+ assureurs partenaires.
            </p>

            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5 text-charcoal-300">
                <Phone className="h-4 w-4 text-primary-400" strokeWidth={2.2} />
                <a href="tel:+33651858930" className="font-bold tabular-nums hover:text-white">
                  06 51 85 89 30
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-charcoal-300">
                <Mail className="h-4 w-4 text-primary-400" strokeWidth={2.2} />
                <a href="mailto:contact@vivos-assurance.fr" className="hover:text-white">
                  contact@vivos-assurance.fr
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-charcoal-300">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400"
                  strokeWidth={2.2}
                />
                <span className="text-charcoal-400">
                  {process.env.NEXT_PUBLIC_LEGAL_ADDRESS ?? 'XX rue de la Paix, 75000 Paris'}
                </span>
              </li>
            </ul>
          </div>

          {/* Sitemap groups */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-2">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 font-heading text-xs font-extrabold uppercase tracking-wider text-white">
                  {group.title}
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-charcoal-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ORIAS bandeau premium — mode pre-ORIAS vs full */}
        <div className="mb-8 rounded-2xl border border-charcoal-800 bg-charcoal-900/60 p-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-glow-clay">
              <ShieldCheck className="h-6 w-6 text-white" strokeWidth={2.2} />
            </div>
            {IS_PRE_ORIAS ? (
              <div className="flex-1 text-sm leading-relaxed text-charcoal-300">
                <strong className="font-bold text-white">
                  Cabinet en cours d&apos;immatriculation au registre ORIAS
                </strong>
                {' · '}
                <span className="text-charcoal-400">
                  Catégorie b prévue (courtier en assurance)
                </span>
                {' · '}
                Registre :{' '}
                <a
                  href={oriasRegistryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-300 underline-offset-2 hover:underline"
                >
                  orias.fr
                </a>
                {' · '}
                <span className="text-charcoal-400">
                  Ouverture commerciale prévue {ORIAS_EXPECTED_DATE}. Aucun acte de distribution
                  d&apos;assurance n&apos;est effectué tant que le numéro ORIAS n&apos;est pas
                  attribué (art. L. 512-1 C. assur.).
                </span>
              </div>
            ) : (
              <div className="flex-1 text-sm leading-relaxed text-charcoal-300">
                <strong className="font-bold text-white">Courtier ORIAS </strong>
                n°{' '}
                <a
                  href={oriasFicheUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-primary-300 underline-offset-2 hover:underline"
                >
                  {oriasFormatted}
                  <ExternalLink className="h-3 w-3" />
                </a>
                {' · '}
                <span className="text-charcoal-400">Catégorie b</span>
                {' · '}
                Registre :{' '}
                <a
                  href={oriasRegistryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-300 underline-offset-2 hover:underline"
                >
                  orias.fr
                </a>
                {' · '}
                <span className="text-charcoal-400">
                  Adhérent CSCA · RCP & garantie financière conformes art. L. 512-6/7 C. assur.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mentions légales bas — paragraphe dense mais lisible */}
        <div className="space-y-3 text-xs leading-relaxed text-charcoal-500">
          <p>
            Soumis au contrôle de l'<strong className="text-charcoal-300">ACPR</strong> (Autorité de
            Contrôle Prudentiel et de Résolution) — 4 Place de Budapest, CS 92459, 75436 PARIS CEDEX
            09.
          </p>
          <p>
            <strong className="text-charcoal-300">Éditeur</strong> :{' '}
            {process.env.NEXT_PUBLIC_LEGAL_EDITOR ?? 'Vivos Assurance SAS'} — SIRET{' '}
            {process.env.NEXT_PUBLIC_LEGAL_SIRET ?? 'XXX XXX XXX 00000'}.{' '}
            <strong className="text-charcoal-300">Hébergeur</strong> : Vercel Inc., USA —{' '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline"
            >
              vercel.com
            </a>
            . Données : Supabase Inc. (région UE Frankfurt).
          </p>
          <p>
            Réclamations :{' '}
            <Link
              href="/reclamation"
              className="text-charcoal-300 underline-offset-2 hover:underline"
            >
              formulaire dédié
            </Link>{' '}
            ou{' '}
            <a
              href="mailto:reclamations@vivos-assurance.fr"
              className="text-charcoal-300 underline-offset-2 hover:underline"
            >
              reclamations@vivos-assurance.fr
            </a>
            . Médiation : Médiation de l'Assurance — TSA 50110, 75441 Paris cedex 09 —{' '}
            <a
              href="https://www.mediation-assurance.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-300 underline-offset-2 hover:underline"
            >
              mediation-assurance.org
            </a>
            .
          </p>
          <p className="pt-4 text-charcoal-600">
            © {year} Vivos Assurance. Tous droits réservés. Service de courtage gratuit pour les
            clients ; rémunération par commissions des compagnies d'assurance partenaires.
          </p>
        </div>
      </div>
    </footer>
  )
}
