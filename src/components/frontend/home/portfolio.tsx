'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../section'
import { Eyebrow } from '../eyebrow'
import { RevealHeading } from '../section'
import { MagneticCards } from '@/components/sora-ui/effects/magnetic-cards'
import type { Project as ProjectItem } from '@/lib/content'

export default function PortfolioShowcase({ projects }: { projects: ProjectItem[] }) {
  return (
    <Section muted className="overflow-hidden py-16 sm:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Eyebrow label="Portfolio" />
            <RevealHeading className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Work that{' '}
              <span className="text-primary">speaks</span> for us
            </RevealHeading>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Every project proves our commitment to quality.
              Move your cursor over the cards to feel the interaction.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-l-2 border-primary pl-4">
            {projects.slice(0, 4).map((p, i) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-background"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                  <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {p.title}
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">{p.category}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:bg-primary-600"
          >
            View All Projects
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Magnetic fan */}
        <div className="flex min-h-[420px] items-center justify-center py-10">
          <MagneticCards
            items={projects.slice(0, 4).map((p) => ({
              src: p.image,
              alt: p.title,
            }))}
            className="h-[320px] w-[90%] max-w-[480px]"
            cardClassName="rounded-xl overflow-hidden border border-border shadow-xl shadow-black/15"
          />
        </div>
      </div>
    </Section>
  )
}
