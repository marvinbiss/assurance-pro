'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const GREETING: Message = {
  role: 'assistant',
  content:
    "Bonjour 👋 Je suis l'assistant Vivos Assurance. Je peux vous renseigner sur la décennale, RC Pro, Multirisque, Mutuelle TNS, VTC ou Cyber. Posez-moi votre question !",
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [streaming, setStreaming] = useState(false)
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const question = input.trim()
    if (!question || streaming) return

    setInput('')
    const history = messages.filter((m) => m !== GREETING).slice(-6)
    setMessages((m) => [
      ...m,
      { role: 'user', content: question },
      { role: 'assistant', content: '' },
    ])
    setStreaming(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question, history }),
      })

      if (!res.ok || !res.body) {
        const errText =
          res.status === 429
            ? 'Trop de questions, réessayez dans 1 min.'
            : 'Service indisponible. Utilisez le formulaire devis pour être recontacté.'
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
          content: 'Erreur réseau. Réessayez ou utilisez le formulaire devis.',
        }
        return next
      })
    } finally {
      setStreaming(false)
    }
  }

  return (
    <>
      {/* Floating action button */}
      <button
        type="button"
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        {open ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-blue-700 to-blue-900 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-700">
                AP
              </span>
              <div>
                <div className="text-sm font-semibold">Assistant Vivos</div>
                <div className="text-xs opacity-80">
                  Courtier ORIAS · répond en quelques secondes
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'rounded-br-sm bg-blue-600 text-white'
                      : 'rounded-bl-sm bg-white text-slate-800 shadow-sm'
                  }`}
                >
                  {m.content || (streaming && i === messages.length - 1 ? '…' : '')}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e as unknown as FormEvent)
                  }
                }}
                placeholder="Votre question (décennale, RC Pro…)"
                rows={2}
                disabled={streaming}
                className="flex-1 resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-50"
              >
                {streaming ? '…' : 'Envoyer'}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-slate-500">
              Information générique uniquement. Devis personnalisé via courtier ORIAS.
            </p>
          </form>
        </div>
      )}
    </>
  )
}
