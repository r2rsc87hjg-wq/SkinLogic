import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ARTICLES, getArticle, getRelated } from '@/content/learn/articles'
import { ArticleBody } from '@/components/learn/ArticleBody'
import { ReadToggle } from '@/components/learn/ReadToggle'
import { ReadNext } from '@/components/learn/ReadNext'

interface Props {
  params: Promise<{ slug: string }>
}

const LEVEL_LABEL = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/learn/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.published,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = getRelated(article)

  // Article schema for rich results / better indexing.
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.published,
    articleSection: article.topic,
    author: { '@type': 'Organization', name: 'SkinLogic' },
    publisher: { '@type': 'Organization', name: 'SkinLogic' },
  }

  // Build a FAQPage schema from any FAQ block present in the article.
  const faqBlock = article.body.find((b) => b.type === 'faq')
  const faqJsonLd =
    faqBlock && faqBlock.type === 'faq'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqBlock.items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            // Strip glossary tokens for the plain-text schema answer.
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a.replace(/\{\{[a-z0-9-]+\|([^}]+)\}\}/g, '$1'),
            },
          })),
        }
      : null

  return (
    <main className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute top-72 left-[-12%] h-[24rem] w-[24rem] rounded-full bg-[#7ee1c8]/18 blur-[120px]" />
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12">
        <nav className="mb-8">
          <Link
            href="/learn"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            ← Learning Hub
          </Link>
        </nav>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="eyebrow text-accent">
              {LEVEL_LABEL[article.level]}
            </span>
            <span className="text-muted">·</span>
            <span className="text-muted">{article.topic}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{article.readingMinutes} min read</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-medium leading-tight text-ink md:text-5xl">
            {article.title}
          </h1>
          <p className="border-l-4 border-accent/30 pl-4 text-lg leading-relaxed text-muted">
            {article.summary}
          </p>
          <div className="mt-6">
            <ReadToggle slug={article.slug} />
          </div>
        </header>

        <ArticleBody blocks={article.body} />

        {/* External credible sources */}
        {article.externalSources?.length ? (
          <section className="mt-10 rounded-2xl border border-line bg-sand/40 p-5">
            <p className="eyebrow mb-3 text-muted">Read more from credible sources</p>
            <ul className="space-y-2">
              {article.externalSources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 text-sm"
                  >
                    <span className="mt-0.5 shrink-0 text-accent">↗</span>
                    <span>
                      <span className="font-medium text-ink underline-offset-2 group-hover:underline">
                        {s.title}
                      </span>
                      <span className="ml-1.5 text-xs text-muted">· {s.source}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Disclaimer */}
        <aside
          role="note"
          aria-label="Educational disclaimer"
          className="mt-8 rounded-2xl border border-line bg-sand/50 p-5 text-sm leading-relaxed text-muted"
        >
          This article is general educational information, not medical advice.
          It is not a substitute for professional guidance. For diagnosis or
          treatment of any skin condition, consult a board-certified
          dermatologist.
        </aside>

        <ReadNext articles={related} />
      </article>
    </main>
  )
}
