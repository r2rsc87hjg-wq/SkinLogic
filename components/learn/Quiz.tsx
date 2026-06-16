'use client'

import { useState } from 'react'
import type { QuizQuestion } from '@/content/learn/types'

// End-of-article knowledge check. Per-question: pick an option, get immediate
// right/wrong feedback plus an explanation. A running score shows at the top.
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  // selected[i] = chosen option index, or undefined if unanswered.
  const [selected, setSelected] = useState<(number | undefined)[]>(
    () => new Array(questions.length).fill(undefined)
  )

  const answeredCount = selected.filter((s) => s !== undefined).length
  const correctCount = selected.filter(
    (s, i) => s !== undefined && s === questions[i].answer
  ).length

  function choose(qIndex: number, optIndex: number) {
    setSelected((prev) => {
      if (prev[qIndex] !== undefined) return prev // lock answer once chosen
      const next = [...prev]
      next[qIndex] = optIndex
      return next
    })
  }

  return (
    <section
      aria-label="Knowledge check"
      className="my-8 rounded-2xl border border-accent/20 bg-accent-soft/60 p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-ink">
          Knowledge check
        </h2>
        <span className="glass-quiet relative rounded-full px-3 py-1 text-xs font-medium text-ink/70">
          {correctCount} / {questions.length} correct
        </span>
      </div>

      <ol className="space-y-6">
        {questions.map((question, qi) => {
          const choice = selected[qi]
          const answered = choice !== undefined
          return (
            <li key={qi}>
              <p className="mb-3 font-medium text-ink">
                {qi + 1}. {question.q}
              </p>
              <div className="grid gap-2">
                {question.options.map((opt, oi) => {
                  const isChoice = choice === oi
                  const isAnswer = question.answer === oi
                  let cls =
                    'border-line bg-surface hover:border-accent/40 hover:bg-sand/50'
                  if (answered && isAnswer)
                    cls = 'border-accent/60 bg-accent-soft text-ink'
                  else if (answered && isChoice && !isAnswer)
                    cls = 'border-amber-400/60 bg-amber-50 text-ink'
                  else if (answered) cls = 'border-line bg-surface opacity-70'

                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={answered}
                      onClick={() => choose(qi, oi)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-default ${cls}`}
                    >
                      <span>{opt}</span>
                      {answered && isAnswer && (
                        <span className="text-accent" aria-label="Correct">
                          ✓
                        </span>
                      )}
                      {answered && isChoice && !isAnswer && (
                        <span className="text-amber-600" aria-label="Incorrect">
                          ✕
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              {answered && (
                <p className="mt-2.5 rounded-lg bg-surface/80 px-3 py-2 text-xs leading-relaxed text-muted">
                  <span
                    className={
                      choice === question.answer
                        ? 'font-semibold text-accent'
                        : 'font-semibold text-amber-600'
                    }
                  >
                    {choice === question.answer ? 'Correct. ' : 'Not quite. '}
                  </span>
                  {question.explanation}
                </p>
              )}
            </li>
          )
        })}
      </ol>

      {answeredCount === questions.length && (
        <p className="mt-5 text-center text-sm font-medium text-ink">
          You scored {correctCount} / {questions.length}. Nice work — keep going
          below.
        </p>
      )}
    </section>
  )
}
