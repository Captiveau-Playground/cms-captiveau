import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedHeading } from '@/components/frontend/animated-heading'
import type { Project as ProjectItem } from '@/lib/content'

/**
 * Related portfolio work — simple boxy cards that link to case studies,
 * used on service detail pages so visitors see examples of the outcome.
 */
export default function RelatedWork({
  projects,
  serviceTitle,
}: {
  projects: ProjectItem[]
  serviceTitle: string
}) {
  if (!projects.length) return null

  return (
    <section className="border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Related work
            </p>
            <AnimatedHeading
              className="mt-3 text-balance font-medium text-2xl tracking-tight md:text-3xl"
              highlightWords={['karya']}
              text={`Hasil karya ${serviceTitle}`}
            />
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
          >
            All portfolios
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group border border-border bg-background transition-colors hover:bg-muted/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-4">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {project.category || 'Portofolio'}
                  </p>
                  <h3 className="mt-1 truncate text-base font-medium tracking-[-0.02em] text-foreground group-hover:text-primary">
                    {project.title}
                  </h3>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}