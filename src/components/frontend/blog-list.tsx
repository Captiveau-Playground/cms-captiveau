'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { motion } from 'motion/react'
import { PageHero } from '@/components/frontend/page-hero'
import { Section } from '@/components/frontend/section'
import { formatDateLong, formatRelativeTime } from '@/lib/date'
import { cn } from '@/lib/utils'

const categories = ['All', 'Tech', 'Design', 'Strategy', 'Development', 'Marketing', 'Analytics']

function AuthorChip({ name }: { name?: string }) {
  const initial = (name || 'C').trim().charAt(0).toUpperCase()
  return (
    <span className="flex items-center gap-2">
      <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold uppercase text-primary">
        {initial}
      </span>
      <span className="text-sm font-medium text-foreground">{name || 'Tim Captiveau'}</span>
    </span>
  )
}

function DateLine({ date }: { date?: string }) {
  if (!date) return null
  return (
    <time dateTime={date} className="text-sm text-muted-foreground">
      {formatDateLong(date)} · {formatRelativeTime(date)}
    </time>
  )
}

export default function BlogList({ articles }: { articles: any[] }) {
  const [active, setActive] = useState('All')
  const filtered =
    active === 'All' ? articles : articles.filter((a) => a.category === active)
  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={'Insights & Digital Inspiration'}
        description="Artikel, panduan, dan wawasan tentang teknologi, desain, dan strategi digital untuk membantu bisnis kamu berkembang."
      />

      <Section className="pb-20 sm:pb-24">
        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-border pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                active === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured story */}
        {featured && (
          <motion.article
            key={`featured-${active}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group mb-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-black/5 lg:grid-cols-2"
          >
            <Link
              href={featured.slug ? `/blog/${featured.slug}` : '#'}
              className="relative block aspect-[16/10] overflow-hidden lg:aspect-auto"
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </Link>
            <div className="flex flex-col justify-center gap-3 p-6 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                  {featured.category}
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  Unggulan
                </span>
              </div>
              <h2 className="text-2xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                <Link href={featured.slug ? `/blog/${featured.slug}` : '#'}>
                  {featured.title}
                </Link>
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {featured.excerpt}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-4">
                <AuthorChip name={featured.author} />
                <DateLine date={featured.date} />
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-4" /> {featured.readTime}
                </span>
              </div>
            </div>
          </motion.article>
        )}

        {/* Article grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <motion.article
                key={article.title + i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col"
              >
                <Link
                  href={article.slug ? `/blog/${article.slug}` : '#'}
                  className="mb-4 block overflow-hidden rounded-xl border border-border bg-card"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                    <Link href={article.slug ? `/blog/${article.slug}` : '#'}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 pt-3">
                    <AuthorChip name={article.author} />
                    <DateLine date={article.date} />
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    Baca artikel
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Belum ada artikel di kategori ini.
          </p>
        )}
      </Section>
    </>
  )
}