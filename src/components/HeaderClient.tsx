'use client'

/**
 * HeaderClient — Navigation principale Vivos Assurance
 * Design : sticky avec scroll detection → glass effect au scroll,
 * brand palette terracotta + sand, dropdown verticaux avec icons.
 */

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ChevronDown,
  Phone,
  ShieldCheck,
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
} from 'lucide-react'

const VERTICALS_NAV = [
  {
    label: 'BTP / Décennale',
    href: '/assurance-decennale',
    Icon: Hammer,
    color: 'text-primary-600',
  },
  { label: 'RC Pro', href: '/rc-pro', Icon: Briefcase, color: 'text-secondary-600' },
  { label: 'Multirisque Pro', href: '/multirisque-pro', Icon: Building2, color: 'text-accent-600' },
  { label: 'Mutuelle / TNS', href: '/mutuelle-pro', Icon: Heart, color: 'text-rose-600' },
  { label: 'VTC / Taxi', href: '/assurance-vtc', Icon: Car, color: 'text-indigo-600' },
  { label: 'Avocats / Juridique', href: '/rc-pro-avocat', Icon: Scale, color: 'text-charcoal-700' },
  { label: 'Médical / Santé', href: '/rc-pro-medecin', Icon: Stethoscope, color: 'text-rose-700' },
  { label: 'Cyber Assurance', href: '/cyber-assurance', Icon: Lock, color: 'text-charcoal-700' },
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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-charcoal-100/80 bg-white/85 shadow-soft backdrop-blur-xl'
          : 'border-b border-transparent bg-white/0'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-xl font-extrabold text-charcoal-900 transition-colors hover:text-primary-700"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-soft">
              <ShieldCheck className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span>
              Vivos<span className="text-primary-600">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {/* Garanties dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setVerticalsOpen(true)}
              onMouseLeave={() => setVerticalsOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-semibold text-charcoal-700 transition-colors hover:text-primary-700"
              >
                Garanties
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${verticalsOpen ? 'rotate-180' : ''}`}
                  strokeWidth={2.4}
                />
              </button>

              {verticalsOpen && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                  <div className="grid w-[480px] grid-cols-2 gap-1 rounded-2xl border border-charcoal-100 bg-white p-2 shadow-premium">
                    {VERTICALS_NAV.map((v) => (
                      <Link
                        key={v.href}
                        href={v.href}
                        className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-sand-50"
                      >
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-lg bg-sand-50 transition-colors group-hover:bg-white ${v.color}`}
                        >
                          <v.Icon className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                        <span className="text-sm font-semibold text-charcoal-800 group-hover:text-charcoal-900">
                          {v.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-charcoal-700 transition-colors hover:text-primary-700"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+33651858930"
              className="inline-flex items-center gap-1.5 text-sm font-bold tabular-nums text-charcoal-700 transition-colors hover:text-primary-700"
              aria-label="Appeler le cabinet au 06 51 85 89 30"
            >
              <Phone className="h-4 w-4" strokeWidth={2.2} />
              06 51 85 89 30
            </a>
            <Link
              href="/devis"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-all hover:bg-primary-600 hover:shadow-cta-hover"
            >
              Devis gratuit
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-charcoal-700 transition-colors hover:bg-sand-100 lg:hidden"
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
                    className={`flex h-9 w-9 items-center justify-center rounded-lg bg-sand-50 ${v.color}`}
                  >
                    <v.Icon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span className="text-sm font-semibold text-charcoal-800">{v.label}</span>
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
              Devis gratuit
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
