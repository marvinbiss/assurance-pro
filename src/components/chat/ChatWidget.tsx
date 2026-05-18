'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import Link from 'next/link'
import { MessageCircle, X, Send, Sparkles, AlertTriangle, ExternalLink } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const GREETING_TEXT =
  "Bonjour 👋 Je suis l'assistant IA du cabinet Vivos Assurance. Je peux vous renseigner sur la décennale, RC Pro, multirisque, mutuelle TNS, VTC, cyber, etc. Posez-moi votre question."

const GREETING: Message = { role: 'assistant', content: GREETING_TEXT }

const SUGGESTIONS = [
  "Suis-je obligé d'avoir une décennale ?",
  'Combien coûte la RC Pro pour un consultant ?',
  'Comment résilier mon assurance pro ?',
  'Quelle différence entre RC Pro et décennale ?',
]

/**
 * Parse les références [/slug-page] dans une réponse en chips cliquables.
 * Le LLM est instruit de citer ses sources sous cette forme via le system prompt.
 */
function extractSources(content: string): string[] {
  const regex = /\[(\/[a-z0-9\-/_]+)\]/gi
  const found: string[] = []
  for (const m of content.matchAll(regex)) {
    if (m[1]) found.push(m[1])
  }
  return Array.from(new Set(found)).slice(0, 5)
}

/**
 * Supprime les balises [/slug] du texte pour rendu propre (les sources sont
 * affichées séparément en chips sous le message).
 */
function cleanContent(content: string): string {
  return content.replace(/\s*\[\/[a-z0-9\-/_]+\]/gi, '').trim()
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [streaming, setStreaming] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const endRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open && !streaming) inputRef.current?.focus()
  }, [open, streaming])

  async function send(question: string) {
    if (!question.trim() || streaming) return
    const trimmed = question.trim().slice(0, 500)

    setInput('')
    const history = messages.filter((m) => m !== GREETING).slice(-6)
    setMessages((m) => [
      ...m,
      { role: 'user', content: trimmed },
      { role: 'assistant', content: '' },
    ])
    setStreaming(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: trimmed, history }),
      })

      if (!res.ok || !res.body) {
        const errText =
          res.status === 429
            ? 'Trop de questions, réessayez dans 1 minute.'
            : 'Service momentanément indisponible. Utilisez le formulaire devis pour être recontacté.'
        setMessages((m) => {
          const next = [...m]
          next[next.length - 1] = { role: 'assistant', content: errText }
          return next
        })
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split('\n\n')
        buffer = events.pop() ?? ''
        for (const evt of events) {
          if (!evt.startsWith('data: ')) continue
          try {
            const payload = JSON.parse(evt.slice(6)) as {
              delta?: string
              done?: boolean
              error?: string
            }
            if (payload.delta) {
              accumulated += payload.delta
              setMessages((m) => {
                const next = [...m]
                next[next.length - 1] = { role: 'assistant', content: accumulated }
                return next
              })
            }
          } catch {
            /* ignore JSON parse errors */
          }
        }
      }
    } catch (e) {
      console.warn('[chat] fetch failed', e)
      setMessages((m) => {
        const next = [...m]
        next[next.length - 1] = {
          role: 'assistant',
          content: 'Erreur réseau. Réessayez ou utilisez le formulaire devis pour être recontacté.',
        }
        return next
      })
    } finally {
      setStreaming(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    void send(input)
  }

  const hasOnlyGreeting = messages.length === 1 && messages[0]?.role === 'assistant'

  return (
    <>
      {/* Floating action button — brand terra */}
      <button
        type="button"
        aria-label={open ? 'Fermer le chat' : "Ouvrir l'assistant IA"}
        onClick={() => setOpen((v) => !v)}
        className="group fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-premium-lg transition-all duration-300 hover:scale-110 hover:shadow-glow-clay focus:outline-none focus:ring-4 focus:ring-primary-300/50 md:flex"
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2.4} />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" strokeWidth={2.4} />
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary-500" />
            </span>
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 hidden h-[600px] w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-charcoal-200 bg-white shadow-premium-lg md:flex"
          role="dialog"
          aria-label="Assistant IA Vivos Assurance"
        >
          {/* Header brand terra gradient */}
          <header className="relative overflow-hidden border-b border-primary-700/30 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-4 py-4 text-white">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary-400/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                <Sparkles className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <div className="flex-1">
                <div className="font-heading text-sm font-extrabold tracking-tight">
                  Assistant IA Vivos
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/85">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  Cabinet ORIAS · réponse en quelques secondes
                </div>
              </div>
            </div>
          </header>

          {/* Disclaimer YMYL (dismissable) */}
          {showDisclaimer && (
            <div className="border-b border-secondary-200 bg-secondary-50 px-4 py-2.5 text-[11px] leading-snug text-secondary-800">
              <div className="flex items-start gap-2">
                <AlertTriangle
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-secondary-700"
                  strokeWidth={2.4}
                />
                <div className="flex-1">
                  <strong>Assistant IA générique.</strong> Pour conseil personnalisé conforme DDA
                  art. L. 521-4, contactez un courtier humain via le formulaire devis.
                </div>
                <button
                  type="button"
                  onClick={() => setShowDisclaimer(false)}
                  aria-label="Fermer l'avertissement"
                  className="ml-1 flex-shrink-0 rounded-md p-0.5 hover:bg-secondary-100"
                >
                  <X className="h-3 w-3" strokeWidth={2.4} />
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-sand-50 px-4 py-4">
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1
              const isAssistant = m.role === 'assistant'
              const sources = isAssistant ? extractSources(m.content) : []
              const cleaned = isAssistant ? cleanContent(m.content) : m.content
              const isEmpty = !cleaned

              return (
                <div
                  key={i}
                  className={`mb-3 flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="flex max-w-[88%] flex-col gap-1.5">
                    <div
                      className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        isAssistant
                          ? 'rounded-bl-md border border-charcoal-100 bg-white text-charcoal-800 shadow-soft'
                          : 'rounded-br-md bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-soft'
                      }`}
                    >
                      {isEmpty && streaming && isLast && isAssistant ? (
                        <span className="inline-flex gap-1">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-charcoal-400" />
                          <span
                            className="h-1.5 w-1.5 animate-pulse rounded-full bg-charcoal-400"
                            style={{ animationDelay: '150ms' }}
                          />
                          <span
                            className="h-1.5 w-1.5 animate-pulse rounded-full bg-charcoal-400"
                            style={{ animationDelay: '300ms' }}
                          />
                        </span>
                      ) : (
                        cleaned
                      )}
                    </div>

                    {/* Sources cliquables (parsed depuis [/slug]) */}
                    {sources.length > 0 && (
                      <div className="flex flex-wrap gap-1 px-1">
                        {sources.map((src) => (
                          <Link
                            key={src}
                            href={src}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-1 rounded-full border border-charcoal-200 bg-white px-2 py-0.5 text-[10px] font-bold text-charcoal-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                          >
                            <span className="max-w-[120px] truncate">{src}</span>
                            <ExternalLink className="h-2.5 w-2.5" strokeWidth={2.4} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Suggestions cliquables au démarrage */}
            {hasOnlyGreeting && !streaming && (
              <div className="mt-4 space-y-1.5">
                <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-charcoal-500">
                  Suggestions
                </p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="block w-full rounded-xl border border-charcoal-200 bg-white px-3 py-2 text-left text-xs text-charcoal-700 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="border-t border-charcoal-200 bg-white p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e as unknown as FormEvent)
                  }
                }}
                placeholder="Votre question..."
                rows={2}
                maxLength={500}
                disabled={streaming}
                className="flex-1 resize-none rounded-xl border border-charcoal-200 bg-white px-3 py-2 text-sm text-charcoal-900 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:bg-sand-100"
                aria-label="Votre question"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                aria-label="Envoyer le message"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-soft transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>
            <p className="mt-2 text-[10px] leading-snug text-charcoal-500">
              IA générique. Pas de stockage des conversations.{' '}
              <Link href="/confidentialite" className="underline hover:text-primary-700">
                Confidentialité
              </Link>
              .
            </p>
          </form>
        </div>
      )}
    </>
  )
}
