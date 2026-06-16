import type { Block } from '@/content/learn/types'
import { InlineText } from './InlineText'
import { Callout } from './Callout'
import { FAQAccordion } from './FAQAccordion'
import { Quiz } from './Quiz'

// Renders a typed article body. Each block maps to a presentational component;
// headings get stable ids so they can be linked and form a clean H2 hierarchy
// under the page H1.
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2
                key={i}
                id={block.id}
                className="scroll-mt-24 pt-4 font-display text-2xl font-semibold text-ink"
              >
                {block.text}
              </h2>
            )
          case 'paragraph':
            return (
              <p key={i} className="leading-relaxed text-ink/85">
                <InlineText text={block.text} />
              </p>
            )
          case 'list':
            return block.ordered ? (
              <ol
                key={i}
                className="list-decimal space-y-2 pl-5 leading-relaxed marker:text-accent marker:font-semibold text-ink/85"
              >
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    <InlineText text={item} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul
                key={i}
                className="list-disc space-y-2 pl-5 leading-relaxed marker:text-accent text-ink/85"
              >
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            )
          case 'callout':
            return (
              <Callout
                key={i}
                variant={block.variant}
                title={block.title}
                text={block.text}
              />
            )
          case 'faq':
            return (
              <div key={i}>
                <h2 className="pt-4 font-display text-2xl font-semibold text-ink">
                  Frequently asked
                </h2>
                <FAQAccordion items={block.items} />
              </div>
            )
          case 'quiz':
            return <Quiz key={i} questions={block.questions} />
          case 'ingredient-spotlight':
            return (
              <div key={i} className="rounded-2xl border border-accent/20 bg-accent/5 p-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">Ingredient spotlight — {block.name}</p>
                <p className="text-sm leading-relaxed text-ink/85">{block.whatItDoes}</p>
                {block.goodFor.length > 0 && (
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted mb-1">Good for</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {block.goodFor.map((g, j) => (
                        <li key={j} className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent">{g}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {block.avoidIf.length > 0 && (
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted mb-1">Use with caution if</p>
                    <ul className="space-y-1">
                      {block.avoidIf.map((a, j) => (
                        <li key={j} className="text-xs leading-relaxed text-muted">{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          case 'myth-fact':
            return (
              <div key={i} className="grid gap-3 rounded-2xl border border-line bg-sand/40 p-5 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-rose-500">Myth</p>
                  <p className="text-sm leading-relaxed text-ink/80 line-through decoration-rose-400">{block.myth}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-emerald-600">Fact</p>
                  <p className="text-sm leading-relaxed text-ink/85">{block.fact}</p>
                </div>
              </div>
            )
          case 'pip-links':
            return (
              <div key={i} className="rounded-2xl border border-line bg-sand/40 p-5">
                <p className="eyebrow mb-3 text-muted">Further reading</p>
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item.url}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2 text-sm"
                      >
                        <span className="mt-0.5 text-accent">↗</span>
                        <span>
                          <span className="font-medium text-ink underline-offset-2 group-hover:underline">{item.title}</span>
                          {item.source && <span className="ml-1.5 text-xs text-muted">· {item.source}</span>}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
