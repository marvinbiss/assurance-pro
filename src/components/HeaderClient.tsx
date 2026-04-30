'use client'

/**
 * HeaderClient — Navigation principale Assurance Pro
 * Menus : verticaux assurance, garanties, ressources, contact + CTA devis
 */

import Link from 'next/link'
import { useState } from 'react'

const VERTICALS_NAV = [
  { label: 'BTP / Décennale', href: '/assurance-decennale' },
  { label: 'RC Pro', href: '/rc-pro' },
  { label: 'Multirisque Pro', href: '/multirisque-pro' },
  { label: 'Mutuelle / TNS', href: '/mutuelle-pro' },
  { label: 'VTC / Taxi', href: '/assurance-vtc' },
  { label: 'Avocats / Juridique', href: '/rc-pro-avocat' },
  { label: 'Médical / Santé', href: '/rc-pro-medecin' },
  { label: 'Cyber Assurance', href: '/cyber-assurance' },
]

export default function HeaderClient() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [verticalsOpen, setVerticalsOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
            <span aria-hidden="true">🛡️</span>
            <span>Assurance Pro</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <div
              className="relative"
              onMouseEnter={() => setVerticalsOpen(true)}
              onMouseLeave={() => setVerticalsOpen(false)}
            >
              <button
                type="button"
                className="text-gray-700 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                Garanties
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {verticalsOpen && (
                <div className="absolute top-full left-0 pt-2 w-72">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {VERTICALS_NAV.map((v) => (
                      <Link
                        key={v.href}
                        href={v.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {v.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog" className="text-gray-700 hover:text-blue-700 font-medium">Blog</Link>
            <Link href="/glossaire" className="text-gray-700 hover:text-blue-700 font-medium">Glossaire</Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-700 font-medium">FAQ</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-700 font-medium">Contact</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/devis"
              className="px-5 py-2.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Devis gratuit
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 py-3">
            <p className="px-2 text-xs uppercase font-bold text-gray-500 mb-2">Garanties</p>
            {VERTICALS_NAV.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="block py-2 px-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {v.label}
              </Link>
            ))}
            <hr className="my-3" />
            <Link href="/blog" className="block py-2 px-2 text-gray-700">Blog</Link>
            <Link href="/glossaire" className="block py-2 px-2 text-gray-700">Glossaire</Link>
            <Link href="/faq" className="block py-2 px-2 text-gray-700">FAQ</Link>
            <Link href="/contact" className="block py-2 px-2 text-gray-700">Contact</Link>
            <Link
              href="/devis"
              className="mt-3 block px-4 py-3 bg-blue-700 text-white rounded text-center font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Devis gratuit →
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
