'use client'

import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { detectEmergency } from '@/lib/emergency-detect'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Conversation starters shown when the chat is empty and as quick replies.
const QUICK_REPLIES = [
  'My skin type',
  'Acne help',
  'Mental health & skin',
  'Athlete skincare',
  'Ingredient basics',
  'See a dermatologist?',
]

const GREETING =
  "Hi, I'm your Skin Health Coach. 🌿 I'm here to help you understand your skin — routines, ingredients, conditions, athlete skincare, and how stress and confidence play in. Ask me anything, or tap a topic below.\n\nI'm not a doctor, so for diagnosis or anything worrying, please see a dermatologist."

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')
  const [showEmergency, setShowEmergency] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Keep the transcript scrolled to the latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, streaming])

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    setError('')
    if (detectEmergency(trimmed)) setShowEmergency(true)

    const next: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(next)
    setInput('')
    setStreaming(true)

    // Placeholder assistant message we stream tokens into.
    setMessages((m) => [...m, { role: 'assistant', content: '' }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message ?? 'Something went wrong. Please try again.')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((m) => {
          const copy = [...m]
          copy[copy.length - 1] = {
            role: 'assistant',
            content: copy[copy.length - 1].content + chunk,
          }
          return copy
        })
      }
    } catch (err) {
      // Drop the empty assistant placeholder and surface the error.
      setMessages((m) =>
        m[m.length - 1]?.role === 'assistant' && m[m.length - 1].content === ''
          ? m.slice(0, -1)
          : m
      )
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setStreaming(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    send(input)
  }

  const isEmpty = messages.length === 0

  return (
    <>
      {/* Floating bubble */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close skin health chat' : 'Open skin health chat'}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent to-[#27705f] text-paper shadow-lift transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.9-5.5A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Skin Health Coach chat"
          className="glass fixed bottom-24 right-5 z-50 flex h-[min(34rem,calc(100vh-7.5rem))] w-[min(24rem,calc(100vw-2.5rem))] animate-fade-in-up flex-col overflow-hidden rounded-3xl shadow-lift"
        >
          {/* Header */}
          <div className="relative z-10 flex items-center gap-3 border-b border-white/40 bg-gradient-to-br from-accent to-[#27705f] px-4 py-3.5 text-paper">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8" cy="8" r="2.25" fill="currentColor" />
              </svg>
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold leading-tight">Skin Health Coach</p>
              <p className="text-[0.7rem] text-paper/80">Warm, judgment-free guidance</p>
            </div>
          </div>

          {/* Transcript */}
          <div
            ref={scrollRef}
            className="relative z-10 flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {/* Greeting bubble (always shown) */}
            <Bubble role="assistant">
              <MarkdownText text={GREETING} />
            </Bubble>

            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.role === 'assistant' ? (
                  m.content ? (
                    <MarkdownText text={m.content} />
                  ) : (
                    <TypingDots />
                  )
                ) : (
                  m.content
                )}
              </Bubble>
            ))}

            {showEmergency && (
              <div className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2.5 text-xs leading-relaxed text-rose-800">
                If this is a medical emergency, please call your local emergency
                number (911 in the US) or go to the nearest emergency room now.
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-800">
                {error}
              </div>
            )}
          </div>

          {/* Quick replies */}
          <div className="relative z-10 flex flex-wrap gap-1.5 border-t border-white/40 px-3 pt-2.5">
            {(isEmpty ? QUICK_REPLIES : QUICK_REPLIES.slice(0, 4)).map((q) => (
              <button
                key={q}
                type="button"
                disabled={streaming}
                onClick={() => send(q)}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink/80 transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Composer */}
          <form onSubmit={handleSubmit} className="relative z-10 px-3 pb-2 pt-2">
            <div className="flex items-end gap-2 rounded-2xl border border-line bg-surface px-3 py-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                rows={1}
                maxLength={2000}
                placeholder="Ask about your skin…"
                aria-label="Message the Skin Health Coach"
                className="max-h-28 flex-1 resize-none bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                aria-label="Send message"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-paper transition-colors hover:bg-accent-hover disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="px-1 pt-1 text-center text-[0.65rem] leading-tight text-muted">
              Educational only — not medical advice. For diagnosis, see a
              board-certified dermatologist.
            </p>
          </form>
        </div>
      )}
    </>
  )
}

function Bubble({
  role,
  children,
}: {
  role: 'user' | 'assistant'
  children: React.ReactNode
}) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-accent text-paper'
            : 'border border-line bg-surface text-ink'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

// Minimal markdown rendering for assistant replies — scoped typography so lists
// and emphasis read well inside a small bubble.
function MarkdownText({ text }: { text: string }) {
  return (
    <div className="space-y-2 [&_a]:text-accent [&_a]:underline [&_li]:ml-4 [&_li]:list-disc [&_ol_li]:list-decimal [&_strong]:font-semibold">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="Coach is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted/60"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  )
}
