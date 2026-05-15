'use client'

import { Mail, MessageCircle, Phone, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

interface ChatLiveWidgetProps {
  className?: string
  phoneNumber?: string
  whatsappNumber?: string
}

const FIRST_VISIT_KEY = 'vivos-chat-widget-seen'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.057 22h-.005a9.87 9.87 0 0 1-5.031-1.378L6.6 20.34l-3.696.968 1.005-3.607-.243-.398a9.825 9.825 0 0 1-1.51-5.25c0-5.444 4.43-9.872 9.871-9.872a9.812 9.812 0 0 1 6.991 2.892 9.806 9.806 0 0 1 2.886 6.99c-.003 5.443-4.434 9.872-9.876 9.872zM20.52 3.448A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.821 11.821 0 0 0-3.422-8.453z" />
    </svg>
  )
}

export function ChatLiveWidget({
  className = '',
  phoneNumber,
  whatsappNumber,
}: ChatLiveWidgetProps) {
  const pathname = usePathname()
  const dialogId = useId()
  const titleId = useId()

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Mount + first-visit badge + reduced motion
  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)

    try {
      const seen = window.sessionStorage.getItem(FIRST_VISIT_KEY)
      if (!seen) setShowBadge(true)
    } catch {
      // sessionStorage may throw in privacy modes — ignore
    }

    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Hide on /devis routes
  const hideOnRoute = pathname?.startsWith('/devis') ?? false

  const handleOpen = useCallback(() => {
    setOpen(true)
    setShowBadge(false)
    try {
      window.sessionStorage.setItem(FIRST_VISIT_KEY, '1')
    } catch {
      // ignore
    }
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    // Restore focus to trigger
    requestAnimationFrame(() => buttonRef.current?.focus())
  }, [])

  // Esc to close + basic focus trap
  useEffect(() => {
    if (!open) return

    // Focus the close button when opening
    requestAnimationFrame(() => closeButtonRef.current?.focus())

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (!first || !last) return
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, handleClose])

  if (!mounted || hideOnRoute) return null

  const transformOpen = reducedMotion ? 'translateY(0)' : 'translateY(0)'
  const transformClosed = reducedMotion ? 'translateY(0)' : 'translateY(12px)'
  const panelTransition = reducedMotion
    ? undefined
    : 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms cubic-bezier(0.16, 1, 0.3, 1)'

  return (
    <div className={`pointer-events-none fixed inset-0 z-50 ${className}`}>
      {/* Floating button */}
      <div className="pointer-events-auto absolute bottom-6 right-6">
        <button
          ref={buttonRef}
          type="button"
          aria-label="Ouvrir l'aide en direct"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={dialogId}
          onClick={handleOpen}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-cta transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2"
          style={{ display: open ? 'none' : 'flex' }}
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
          {showBadge && (
            <span
              aria-label="Nouveau"
              className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-secondary-400 px-1 font-heading text-[10px] font-bold text-charcoal-900 ring-2 ring-white"
            >
              1
            </span>
          )}
        </button>
      </div>

      {/* Panel */}
      {open && (
        <div
          id={dialogId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="pointer-events-auto absolute inset-x-0 bottom-0 flex flex-col overflow-hidden border border-sand-300 bg-white shadow-premium md:bottom-20 md:left-auto md:right-6 md:h-[480px] md:w-[360px] md:rounded-2xl"
          style={{
            height: 'min(100dvh, 100vh)',
            opacity: 1,
            transform: open ? transformOpen : transformClosed,
            transition: panelTransition,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-charcoal-900 p-4 text-white">
            <h2 id={titleId} className="font-heading text-base font-semibold">
              Discuter avec un courtier
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Fermer la fenêtre de discussion"
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5">
            <p className="text-sm text-charcoal-700">
              Choisissez votre canal préféré. Un courtier ORIAS vous répond.
            </p>

            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                className="group flex items-center gap-3 rounded-xl border border-sand-300 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 group-hover:bg-primary-200">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="font-heading text-sm font-semibold text-charcoal-900">
                    Appeler maintenant
                  </span>
                  <span className="text-xs text-charcoal-600">{phoneNumber}</span>
                </span>
              </a>
            )}

            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-sand-300 bg-white p-4 transition-colors hover:border-accent-300 hover:bg-accent-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700 group-hover:bg-accent-200">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="font-heading text-sm font-semibold text-charcoal-900">
                    WhatsApp
                  </span>
                  <span className="text-xs text-charcoal-600">Réponse rapide en journée</span>
                </span>
              </a>
            )}

            <a
              href="mailto:contact@vivos-assurance.fr"
              className="group flex items-center gap-3 rounded-xl border border-sand-300 bg-white p-4 transition-colors hover:border-secondary-300 hover:bg-secondary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-700 group-hover:bg-secondary-200">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="font-heading text-sm font-semibold text-charcoal-900">Email</span>
                <span className="text-xs text-charcoal-600">contact@vivos-assurance.fr</span>
              </span>
            </a>
          </div>

          {/* Footer */}
          <div className="border-t border-sand-200 bg-sand-50 p-3 text-center">
            <p className="text-xs text-charcoal-500">Réponse sous 1h en horaires ouvrés</p>
          </div>
        </div>
      )}
    </div>
  )
}
