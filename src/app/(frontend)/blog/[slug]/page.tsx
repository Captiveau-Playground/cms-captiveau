import type { Metadata } from 'next'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import RichText from '@/components/frontend/rich-text'
import { Section } from '@/components/frontend/section'
import { CtaButton } from '@/components/frontend/cta-button'
import { getCmsArticleBySlug } from '@/lib/cms-data'
import { handleRedirectOrNotFound } from '@/lib/redirects'
import { buildMetadata, getSiteUrl, SITE_NAME } from '@/lib/seo'
import { JsonLd } from '@/components/frontend/jsonld'
import { formatDateLong, formatRelativeTime } from '@/lib/date'
import { AnimatedHeading } from '@/components/frontend/animated-heading'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const article = await getCmsArticleBySlug(slug, { draft: isEnabled })

  if (!article) return {}

  return buildMetadata({
    title: article.title,
    description: article.description || undefined,
    image: article.image,
    path: `/blog/${slug}`,
    type: 'article',
    publishedTime: article.date ? `${article.date}T00:00:00Z` : undefined,
    authors: article.author ? [article.author] : undefined,
    keywords: [article.category],
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const article = await getCmsArticleBySlug(slug, { draft })

  if (!article) {
    await handleRedirectOrNotFound(`/blog/${slug}`)
    return null // unreachable — satisfies the type checker
  }

  const authorInitial = (article.author || 'C').trim().charAt(0).toUpperCase()
  const siteUrl = await getSiteUrl()
  const canonicalUrl = `${siteUrl}/blog/${slug}`

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description || undefined,
          image: article.image || undefined,
          datePublished: article.date ? `${article.date}T00:00:00Z` : undefined,
          dateModified: article.date ? `${article.date}T00:00:00Z` : undefined,
          author: { '@type': 'Person', name: article.author || SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.webp` } },
          mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        }}
      />

      {/* Article header */}
      <article>
        <header className="border-b border-border bg-background pb-12 pt-12 sm:pb-14 sm:pt-14">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              Semua artikel
            </Link>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
              {article.category}
            </p>

            <AnimatedHeading
              as="h1"
              className="text-balance font-medium text-3xl tracking-[-0.04em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
              text={article.title}
            />

            {article.description && (
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {article.description}
              </p>
            )}

            {/* Byline */}
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border/70 pt-5">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center border border-border bg-muted/50 text-sm font-bold uppercase text-primary">
                  {authorInitial}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {article.author || 'Tim Captiveau'}
                  </span>
                  <span className="text-xs text-muted-foreground">Penulis</span>
                </div>
              </div>
              <span className="hidden h-8 w-px bg-border/70 sm:block" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Diterbitkan</span>
                <time dateTime={article.date} className="text-sm font-medium text-foreground">
                  {article.date
                    ? `${formatDateLong(article.date)} · ${formatRelativeTime(article.date)}`
                    : ''}
                </time>
              </div>
              {article.readTime && (
                <>
                  <span className="hidden h-8 w-px bg-border/70 sm:block" />
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    {article.readTime} menit baca
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Featured image — full-width band */}
        {article.image && (
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-none border border-border shadow-xl shadow-black/10">
              <img loading="lazy" decoding="async"
                src={article.image}
                alt={article.title}
                className="aspect-[21/9] w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <Section className="py-12 sm:py-16">
          <div className="mx-auto w-full max-w-3xl">
            {article.content ? (
              <RichText data={article.content} />
            ) : (
              <p className="text-muted-foreground">Konten artikel belum tersedia.</p>
            )}

            {/* Meta footer */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                Diperbarui {article.date ? formatDateLong(article.date) : ''}
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                Kategori: <span className="font-medium text-foreground">{article.category}</span>
              </span>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section muted className="py-16 sm:py-24">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-medium tracking-[-0.04em] text-foreground">
              Punya proyek serupa?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Ceritakan ide kamu — tim kami siap membantu dari riset hingga rilis.
            </p>
            <CtaButton href="/contact" variant="accent">
              Konsultasi Gratis
            </CtaButton>
          </div>
        </Section>
      </article>
    </>
  )
}