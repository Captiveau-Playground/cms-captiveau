'use client'

import Link from 'next/link'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { motion } from 'motion/react'
import { Section, SectionHeader } from '../section'
import { TiltCard } from '@/components/sora-ui/effects/tilt-card'
import type { CmsHomepage } from '@/lib/cms-data'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPreview({ articles }: { articles: any[] }) {
  const featured = articles.slice(0, 3)
  return (
    <Section className="py-16 sm:py-24">
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Blog & Artikel"
          title={
            <>
              Tips, tutorial, dan{' '}
              <span className="text-primary">insights terbaru</span>
            </>
          }
          description="Wawasan seputar teknologi dan pengembangan digital."
          align="left"
        />
        <Link
          href="/blog"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary"
        >
          View All Articles
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featured.map((article, i) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard
              rotationFactor={3}
              className="group h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
            >
              <Link href="/blog" className="flex h-full flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {article.category}
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {formatDate(article.date)}
                  </div>
                </div>
              </Link>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
