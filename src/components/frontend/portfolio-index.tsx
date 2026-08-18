'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'
import { cn } from '@/lib/utils'

export type PortfolioItem = {
  slug: string
  title: string
  image: string
  category: string
  year: string
  description: string
  results: { value: string; label: string }[]
  size: 'large' | 'small'
}

/**
 * Editorial portfolio index — the entry point into case studies.
 * Featured project full-width, then alternating staggered rows that link
 * into each project detail page.
 */
export default function PortfolioIndex({ projects }: { projects: PortfolioItem[] }) {
  const [featured, ...rest] = projects

  if (!featured) return null

  return (
    <>
      {/* Featured project */}
      <Reveal>
        <Link
          href={`/portfolio/${featured.slug}`}
          className="group relative block overflow-hidden rounded-none border border-border bg-card"
        >
          <img loading="lazy" decoding="async"
            src={featured.image}
            alt={featured.title}
            className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:aspect-[21/9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
              <span className="rounded-full bg-white/15 px-2.5 py-1 backdrop-blur-sm">
                {featured.category}
              </span>
              {featured.year && (
                <span className="rounded-full bg-white/15 px-2.5 py-1 backdrop-blur-sm">
                  {featured.year}
                </span>
              )}
              <span className="rounded-full bg-secondary px-2.5 py-1 text-white">
                Featured
              </span>
            </div>
            <h2 className="text-2xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
              {featured.title}
            </h2>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 underline-offset-4 group-hover:underline">
              View case study
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </Reveal>

      {/* Editorial alternating rows */}
      <div className="mt-16 flex flex-col gap-16 sm:mt-24 sm:gap-24">
        {rest.map((project, i) => {
          const flipped = i % 2 === 1
          return (
            <Reveal key={project.slug} delay={0.05}>
              <div
                className={cn(
                  'group grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-12',
                  flipped && 'lg:[direction:rtl]'
                )}
              >
                {/* Image */}
                <div className="lg:col-span-7 lg:[direction:ltr]">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="relative block overflow-hidden rounded-none border border-border bg-card"
                  >
                    <img loading="lazy" decoding="async"
                      src={project.image}
                      alt={project.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-background/85 text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-4 lg:col-span-5 lg:[direction:ltr]">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <span className="text-secondary">{project.category}</span>
                    {project.year && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span>{project.year}</span>
                      </>
                    )}
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{String(i + 2).padStart(2, '0')}</span>
                  </div>

                  <h3 className="text-2xl font-medium tracking-[-0.04em] text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
                  </h3>

                  <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {project.results.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5">
                      {project.results.slice(0, 3).map((r) => (
                        <div key={r.label} className="flex flex-col">
                          <span className="text-2xl font-medium tracking-[-0.04em] text-foreground">
                            {r.value}
                          </span>
                          <span className="text-xs text-muted-foreground">{r.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    View case study
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </>
  )
}