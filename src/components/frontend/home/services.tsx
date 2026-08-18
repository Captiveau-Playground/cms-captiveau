'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Section, SectionHeader } from '../section'
import { TiltCard } from '@/components/sora-ui/effects/tilt-card'
import { resolveIcon } from '@/lib/icons'
import { AppWindowMac } from 'lucide-react'
import type { ServiceItem } from '@/lib/content'

export default function Services({ services }: { services: ServiceItem[] }) {
  const [featured, ...rest] = services
  return (
    <Section muted className="py-16 md:py-24">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Services"
          title={
            <>
              Our <span className="text-primary">Digital Services</span>
            </>
          }
          description="The complete technology stack to launch and grow your digital business."
          align="left"
        />
        <Link
          href="/services"
          className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:text-primary"
        >
          View All Services
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-fr">
        {/* ── Featured: Landing Page (tall) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="sm:col-span-2 lg:col-span-7 lg:row-span-2"
        >
          <TiltCard
            rotationFactor={3}
            glare
            className="group relative flex h-full min-h-[320px] overflow-hidden rounded-xl border border-border"
          >
            <Link
              href={`/services/${featured.slug}`}
              className="absolute inset-0 flex flex-col"
            >
              {/* image bg */}
              <div className="absolute inset-0">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/45" />
              </div>

              {/* content */}
              <div className="relative z-10 mt-auto flex flex-col gap-3 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-background/90 backdrop-blur-sm">
                    {(() => {
                      const FIcon = resolveIcon(featured.icon, AppWindowMac)
                      return <FIcon className="size-5 text-primary" strokeWidth={1.8} />
                    })()}
                  </span>
                  <span className="rounded-full bg-secondary/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                  {featured.tagline}
                </p>
                <p className="max-w-md text-sm leading-relaxed text-white/85">
                  {featured.description}
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {featured.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <span className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white">
                  Start Building
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </TiltCard>
        </motion.div>

        {/* ── rest: compact bento cells ── */}
        {rest.map((service, i) => {
          const Icon = resolveIcon(service.icon, AppWindowMac)
          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={
                i === 0 || i === 1
                  ? 'lg:col-span-5'
                  : 'lg:col-span-4'
              }
            >
              <TiltCard
                rotationFactor={3}
                className="group h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-black/10 hover:border-primary/30"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="flex h-full flex-col p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" strokeWidth={1.8} />
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {service.tagline}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {service.highlights.slice(0, 2).map((h) => (
                      <span
                        key={h}
                        className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Start Building
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
