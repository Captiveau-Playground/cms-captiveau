'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../section'
import { Eyebrow } from '../eyebrow'
import { RevealHeading } from '../section'
import { Reveal } from '../reveal'
import type { Project as ProjectItem } from '@/lib/content'

export default function PortfolioShowcase({ projects }: { projects: ProjectItem[] }) {
  const items = projects.slice(0, 4)

  return (
    <Section muted className="overflow-hidden py-16 sm:py-24">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-3">
            <Eyebrow label="Portfolio" />
            <RevealHeading className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Work that <span className="text-primary">speaks</span> for us
            </RevealHeading>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Setiap proyek adalah bukti komitmen kami pada kualitas — dari
              company profile hingga platform e-commerce.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex w-fit items-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:bg-primary-600"
          >
            View All Projects
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 2x2 editorial grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-none border border-border bg-card"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
                    {project.category}
                  </span>
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-base font-bold tracking-tight text-white">
                      {project.title}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}