'use client'

import { motion } from 'motion/react'
import { Code2, Star } from 'lucide-react'
import { CtaButton } from '../cta-button'
import CountUp from '../count-up'
import { TextLoop } from '@/components/sora-ui/texts/text-loop'
import type { CmsHomepage } from '@/lib/cms-data'

const fallbackStats = [
  { value: 50, suffix: '+', label: 'Products shipped' },
  { value: 30, suffix: '+', label: 'Trusted clients' },
  { value: 8, suffix: ' yrs', label: 'Experience' },
]

const fallbackSpecialties = [
  'digital products',
  'company profiles',
  'e-commerce platforms',
  'web & mobile apps',
  'SaaS dashboards',
]

export default function Hero({ homepage }: { homepage: CmsHomepage }) {
  const stats = homepage.stats.length ? homepage.stats : fallbackStats
  const specialties = homepage.heroSpecialties.length
    ? homepage.heroSpecialties
    : fallbackSpecialties

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-background">
      {/* soft decorative accents — solid, no gradients */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute right-[8%] top-[14%] size-2 rounded-full bg-secondary/70" />
        <span className="absolute bottom-[18%] left-[4%] size-1.5 rounded-full bg-primary/50" />
        <span className="absolute left-[46%] top-[10%] size-1 rounded-full bg-secondary/40" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-4 px-4 pt-10 pb-4 sm:px-6 sm:gap-6 sm:pt-14 sm:pb-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:pt-14 lg:pb-20">
        {/* ── Left — copy ── */}
        <div className="flex flex-col gap-4">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              {homepage.heroBadge}
            </span>
          </motion.div>

          {/* headline */}
          <h1 className="text-[2.5rem] font-bold leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]">
            <span className="block">
              {homepage.heroTitlePrefix}{' '}
              <TextLoop
                interval={2.2}
                className="inline-block align-baseline"
              >
                {specialties.map((s) => (
                  <span key={s} className="inline-block text-primary">
                    {s}
                  </span>
                ))}
              </TextLoop>{' '}
              {homepage.heroTitleSuffix}
            </span>
          </h1>

          {/* subtext */}
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {homepage.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:items-center">
            <CtaButton href="/contact" size="lg">
              Start Your Project
            </CtaButton>
            <CtaButton href="/portfolio" size="lg" variant="outline" icon={false}>
              See Our Work
            </CtaButton>
          </div>

          {/* compact stats */}
          <dl className="mt-1 grid max-w-md grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border bg-card px-3 py-2"
              >
                <dd className="text-lg font-bold tracking-tight text-primary sm:text-xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="text-[11px] leading-tight text-muted-foreground">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Right — visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-xl border border-border shadow-lg shadow-black/10 sm:max-w-sm sm:rounded-2xl lg:max-w-none"
        >
          {/* main image */}
          <div className="relative">
            <img
              src={homepage.heroImage || '/images/team.jpg'}
              alt="Captiveau team at work"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />
            {/* top-left chip */}
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-lg bg-background/90 px-3 py-1.5 font-mono text-[11px] font-medium text-foreground backdrop-blur-sm">
              <Code2 className="size-3 text-primary" />
              captiveau.id
            </span>
          </div>

          {/* floating: rating card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="absolute -left-3 top-6 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-lg shadow-black/10 sm:block sm:-left-6"
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-secondary text-secondary" />
              ))}
            </div>
            <p className="mt-1 text-sm font-bold text-foreground">4.9 / 5</p>
            <p className="text-[11px] text-muted-foreground">client rating</p>
          </motion.div>

          {/* floating: shipped card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="absolute -right-2 bottom-10 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-lg shadow-black/10 sm:block sm:-right-5"
          >
            <p className="text-lg font-bold text-primary">
              <CountUp value={50} suffix="+" />
            </p>
            <p className="text-[11px] text-muted-foreground">products shipped</p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          scroll
        </span>
        <span className="h-6 w-px animate-pulse bg-border" />
      </div>
    </section>
  )
}
