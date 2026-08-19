"use client";
import { ConsultCta, type CalSettings } from '@/components/frontend/consult-cta'

import { ArrowRightIcon, Code2, SparklesIcon, TerminalIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ContentRail, SectionShell } from "@/components/layout-contract";
import { Button } from "@/components/ui/button";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { GridPattern } from "@/components/ui/grid-pattern";
import { TextLoop } from "@/components/sora-ui/texts/text-loop";
import CountUp from "@/components/frontend/count-up";
import type { CmsHomepage } from "@/lib/cms-data";

const spring = { type: "spring" as const, stiffness: 380, damping: 28 };

const fallbackSpecialties = [
  "digital products",
  "company profiles",
  "e-commerce platforms",
  "web & mobile apps",
  "SaaS dashboards",
];

function FeaturedVisual({ src, alt }: { src?: string | null; alt: string }) {
  return (
    <div className="relative h-36 overflow-hidden rounded-t-none border border-border/70 border-b-0 sm:h-40">
      <div className="absolute inset-x-0 top-0 h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={alt}
          className="h-full w-full object-cover object-top"
          src={src || "/images/team.jpg"}
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </div>
  );
}

export function HeroBentoSection({
  homepage,
  cal,
}: {
  homepage: CmsHomepage
  cal?: CalSettings | null
}) {
  const reduceMotion = useReducedMotion();
  const specialties = homepage.heroSpecialties.length
    ? homepage.heroSpecialties
    : fallbackSpecialties
  const stats = homepage.stats.length ? homepage.stats : []

  return (
    <SectionShell spacingMode="section" className="relative isolate overflow-hidden lg:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl" />
        <GridPattern
          className="absolute inset-0 mask-[radial-gradient(ellipse_at_top,white,transparent_72%)] stroke-foreground/[0.05]"
          height={48}
          width={48}
        />
      </div>

      <ContentRail className="relative">
        <motion.div
          className="relative rounded-none border border-border bg-background p-4 md:p-5"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          transition={{ ...spring, delay: 0.06 }}
          viewport={{ once: true }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <DecorIcon position="top-left" />
          <DecorIcon position="top-right" />
          <DecorIcon position="bottom-left" />
          <DecorIcon position="bottom-right" />

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-none bg-border min-[30rem]:grid-cols-6">
            {/* Headline + CTAs */}
            <motion.div
              className="space-y-5 bg-background p-5 min-[30rem]:col-span-4 min-[30rem]:p-6"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              transition={{ ...spring, delay: 0.1 }}
              viewport={{ once: true }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                {homepage.heroBadge}
              </p>
              <h1 className="text-pretty font-medium text-3xl tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.06]">
                {homepage.heroTitlePrefix}{" "}
                <TextLoop interval={2.4} className="inline-block align-baseline">
                  {specialties.map((s) => (
                    <span key={s} className="inline-block text-primary">
                      {s}
                    </span>
                  ))}
                </TextLoop>{" "}
                <br/>
                {homepage.heroTitleSuffix}
              </h1>
              <p className="max-w-lg text-pretty text-muted-foreground text-sm leading-relaxed md:text-base">
                {homepage.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <ConsultCta label="Start Your Project" cal={cal} />
                <Button
                  asChild
                  className="active:scale-[0.96] transition-transform"
                  size="lg"
                  variant="outline"
                >
                  <a href="/portfolio">See Our Work</a>
                </Button>
              </div>
            </motion.div>

            {/* Stat cell */}
            <motion.div
              className="flex flex-col justify-between bg-background p-5 min-[30rem]:col-span-2"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              transition={{ ...spring, delay: 0.16 }}
              viewport={{ once: true }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <div className="flex size-8 items-center justify-center rounded-none border border-border/80 bg-muted/30 text-foreground/70">
                <SparklesIcon className="size-4" />
              </div>
              <div>
                <p className="font-medium text-3xl tracking-tight tabular-nums">
                  {stats[0] ? (
                    <CountUp value={stats[0].value} suffix={stats[0].suffix} />
                  ) : (
                    "50+"
                  )}
                </p>
                <p className="mt-1 text-muted-foreground text-xs leading-relaxed">
                  {stats[0]?.label || "products shipped"}
                </p>
              </div>
            </motion.div>

            {/* Featured visual */}
            <motion.div
              className="flex flex-col overflow-hidden bg-background px-5 pt-5 pb-0 min-[30rem]:col-span-3"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              transition={{ ...spring, delay: 0.22 }}
              viewport={{ once: true }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <p className="mb-3 font-medium text-[0.625rem] text-muted-foreground uppercase tracking-[0.14em]">
                Captiveau
              </p>
              <FeaturedVisual src={homepage.heroImage} alt="Captiveau" />
            </motion.div>

            {/* Tech / services cell */}
            <motion.div
              className="flex flex-col justify-between bg-background p-5 min-[30rem]:col-span-3"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              transition={{ ...spring, delay: 0.28 }}
              viewport={{ once: true }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <div className="flex size-8 items-center justify-center rounded-none border border-border/80 bg-muted/30 text-foreground/70">
                <Code2 className="size-4" />
              </div>
              <div className="space-y-2">
                <p className="truncate font-mono text-[0.6875rem] text-muted-foreground">
                  next.js · typescript · node.js
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Riset, desain, pengembangan, hingga peluncuran — satu tim,
                  satu standar kualitas.
                </p>
              </div>
            </motion.div>

            {/* Specialty chips */}
            <motion.div
              className="flex flex-col justify-between gap-4 bg-background p-5 min-[30rem]:col-span-6 min-[30rem]:flex-row min-[30rem]:items-center min-[30rem]:justify-between"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              transition={{ ...spring, delay: 0.34 }}
              viewport={{ once: true }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <TerminalIcon className="size-3.5 shrink-0" />
                <span>End-to-end digital product studio</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {specialties.slice(0, 5).map((specialty) => (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-none border border-border/80 bg-muted/15 px-2 py-1 text-[0.6875rem] text-muted-foreground"
                    key={specialty}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </ContentRail>

      <FullWidthDivider className="bottom-0" contained position="bottom" />
    </SectionShell>
  );
}
