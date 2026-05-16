'use client'

/**
 * HeaderClient — Navigation premium Vivos Assurance.
 *
 * Design inspiré Stripe / Alan / Linear :
 *   - Logo SVG custom avec wordmark
 *   - Mega menu Garanties : grid 8 catégories + featured card visual
 *   - Sticky scroll detection → glass effect
 *   - Tonalité tracking-tight + font-heading
 */

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ChevronDown,
  Phone,
  Menu,
  X,
  Hammer,
  Briefcase,
  Building2,
  Heart,
  Car,
  Lock,
  Stethoscope,
  Scale,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react'
import { VivosLogo } from '@/components/brand/VivosLogo'
import { CTA_TEXTS, IS_PRE_ORIAS } from '@/lib/config/pre-orias'

const VERTICALS_NAV = [
  {
    label: 'Décennale BTP',
    href: '/assurance-decennale',
    Icon: Hammer,
    color: 'text-primary-600 bg-primary-50',
    sub: 'Loi Spinetta · 52 métiers',
  },
  {
    label: 'RC Pro',
    href: '/rc-pro',
    Icon: Briefcase,
    color: 'text-secondary-600 bg-secondary-50',
    sub: 'Consultants, freelances, services',
  },
  {
    label: 'Multirisque Pro',
    href: '/multirisque-pro',
    Icon: Building2,
    color: 'text-accent-600 bg-accent-50',
    sub: 'Local, atelier, bureau, stock',
  },
  {
    label: 'Mutuelle TNS',
    href: '/mutuelle-pro',
    Icon: Heart,
    color: 'text-rose-600 bg-rose-50',
    sub: 'Loi Madelin déductible',
  },
  {
    label: 'VTC / Taxi',
    href: '/assurance-vtc',
    Icon: Car,
    color: 'text-indigo-600 bg-indigo-50',
    sub: 'Uber, Bolt, Heetch',
  },
  {
    label: 'Cyber assurance',
    href: '/cyber-assurance',
    Icon: Lock,
    color: 'text-charcoal-700 bg-charcoal-100',
    sub: 'Ransomware, RGPD, data',
  },
  {
    label: 'Avocats / Libéral',
    href: '/rc-pro-avocat',
    Icon: Scale,
    color: 'text-violet-600 bg-violet-50',
    sub: 'Professions réglementées',
  },
  {
    label: 'Médical / Santé',
    href: '/rc-pro-medecin',
    Icon: Stethoscope,
    color: 'text-rose-700 bg-rose-50',
    sub: 'Loi Kouchner, paramédical',
  },
] as const

const NAV_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Glossaire', href: '/glossaire' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const

export default function HeaderClient() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [verticalsOpen, setVerticalsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Header toujours glassmorph + charcoal text (lisible sur tous fonds).
  // Au scroll : ajoute shadow + border pour profondeur supplémentaire.
  const navColor = 'text-charcoal-700 dark:text-charcoal-200'
  const navHover = 'hover:text-primary-700'

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl transition-all duration-300 dark:bg-charcoal-950/85 ${
        scrolled
          ? 'border-charcoal-100/80 shadow-soft dark:border-charcoal-800/80'
          : 'border-charcoal-100/40 dark:border-charcoal-900/40'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-[68px] items-center justify-between">
          {/* Logo — variant light sur hero, dark au scroll */}
          <Link
            href="/"
            className="transition-opacity hover:opacity-90"
            aria-label="Vivos Assurance — Accueil"
          >
            <VivosLogo size="md" variant="dark" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {/* Garanties mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setVerticalsOpen(true)}
              onMouseLeave={() => setVerticalsOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 text-[15px] font-semibold ${navColor} transition-colors ${navHover}`}
              >
                Garanties
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    verticalsOpen ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2.4}
                />
              </button>

              {verticalsOpen && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                  <div className="w-[760px] overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-premium-lg dark:border-charcoal-800 dark:bg-charcoal-900">
                    <div className="grid grid-cols-3">
                      {/* Colonne 1+2 : Liens catégories */}
                      <div className="col-span-2 grid grid-cols-2 gap-1 p-4">
                        {VERTICALS_NAV.map((v) => (
                          <Link
                            key={v.href}
                            href={v.href}
                            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-sand-50"
                          >
                            <span
                              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${v.color}`}
                            >
                              <v.Icon className="h-5 w-5" strokeWidth={2.2} />
                            </span>
                            <div className="flex-1 leading-tight">
                              <div className="font-heading text-sm font-bold text-charcoal-900 group-hover:text-primary-700">
                                {v.label}
                              </div>
                              <div className="mt-0.5 text-[11px] text-charcoal-500">{v.sub}</div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Colonne 3 : Featured card visual */}
                      <div className="relative overflow-hidden bg-gradient-hero-warm p-5 text-white">
                        <div
                          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary-400/30 blur-3xl"
                          aria-hidden="true"
                        />
                        <div className="relative">
                          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                            <Sparkles className="h-3 w-3" />
                            Économies moy.
                          </div>
                          <div className="mb-1 font-heading text-4xl font-extrabold tracking-tight">
                            -32<span className="text-2xl">%</span>
                          </div>
                          <p className="mb-5 text-xs leading-relaxed text-white/85">
                            Économie observée vs souscription en direct.
                          </p>

                          <ul className="mb-5 space-y-1.5 text-[11px]">
                            {[
                              'Comparaison 10+ assureurs',
                              'Devis en 24 h ouvrées',
                              'Aucun frais',
                            ].map((item) => (
                              <li key={item} className="flex items-center gap-1.5">
                                <Check className="h-3 w-3 text-secondary-300" strokeWidth={3} />
                                {item}
                              </li>
                            ))}
                          </ul>

                          <Link
                            href="/devis"
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-primary-700 shadow-soft transition-all hover:-translate-y-0.5"
                          >
                            {CTA_TEXTS.short}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Footer mega menu */}
                    <div className="flex items-center justify-between border-t border-charcoal-100 bg-sand-50 px-5 py-3 text-xs">
                      <span className="text-charcoal-500">
                        {IS_PRE_ORIAS
                          ? '17 verticaux couverts · Immatriculation ORIAS en cours'
                          : '17 verticaux couverts · ORIAS · ACPR'}
                      </span>
                      <Link
                        href="/comparateur-assureurs"
                        className="inline-flex items-center gap-1 font-bold text-primary-700 hover:text-primary-800"
                      >
                        Comparer tous les assureurs
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[15px] font-semibold ${navColor} transition-colors ${navHover}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+33651858930"
              className={`inline-flex items-center gap-1.5 text-sm font-bold tabular-nums ${navColor} transition-colors ${navHover}`}
              aria-label="Appeler le cabinet"
            >
              <Phone className="h-4 w-4" strokeWidth={2.2} />
              06 51 85 89 30
            </a>
            <Link
              href="/devis"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-cta-hover"
            >
              {CTA_TEXTS.short}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`rounded-lg p-2 ${navColor} transition-colors hover:bg-white/10 lg:hidden`}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-charcoal-100 py-4 lg:hidden">
            <p className="mb-2 px-2 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
              Garanties
            </p>
            <div className="mb-4 grid grid-cols-1 gap-1">
              {VERTICALS_NAV.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-sand-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${v.color}`}
                  >
                    <v.Icon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-charcoal-800">{v.label}</div>
                    <div className="text-[11px] text-charcoal-500">{v.sub}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-charcoal-100 pt-3">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-charcoal-700 transition-colors hover:bg-sand-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Link
              href="/devis"
              className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white shadow-cta"
              onClick={() => setMobileOpen(false)}
            >
              {CTA_TEXTS.short}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
