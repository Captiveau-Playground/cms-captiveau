"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRightIcon, Sparkles } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ContentRail, SectionShell } from "@/components/layout-contract";
import { motionStagger, motionViewport } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";
import { HeroAnnouncement, HeroCtaRow } from "@/lib/hero-primitives";
import { resolveIcon } from "@/lib/icons";

const spring = { type: "spring" as const, duration: 0.35, bounce: 0 };

export type AdvantageItem = {
  icon: string
  title: string
  desc: string
}

/**
 * "Why Choose Captiveau?" — adapted from @nusaiba/hero-12
 * (announcement + headline + staggered tile grid + CTA row).
 */
export function HeroGalleryWallSection({
  advantages,
}: {
  advantages: AdvantageItem[]
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, motionViewport);

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, filter: "blur(4px)", y: 12 },
        visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: spring },
      };

  return (
    <SectionShell spacingMode="section" ref={ref}>
      <motion.div
        animate={inView ? "visible" : "hidden"}
        className="w-full"
        initial="hidden"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: motionStagger.item, delayChildren: 0.05 } },
        }}
      >
        <ContentRail>
          <motion.div variants={itemVariants}>
            <HeroAnnouncement
              detail="Riset, desain, dan engineering dalam satu tim."
              label="Why Us"
            />
          </motion.div>
          <motion.h1
            className="mt-8 max-w-[16ch] text-balance font-medium text-4xl tracking-[-0.04em] md:text-5xl"
            variants={itemVariants}
          >
            Why Choose <span className="text-primary">Captiveau?</span>
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-pretty text-muted-foreground text-sm md:text-base"
            variants={itemVariants}
          >
            Tim senior yang bekerja langsung, proses yang transparan, dan hasil
            yang terukur — dari ide hingga peluncuran.
          </motion.p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {advantages.map((item, i) => {
              const Icon = resolveIcon(item.icon, Sparkles)
              return (
                <motion.div key={item.title + i} variants={itemVariants}>
                  <div
                    className={cn(
                      "group flex h-full min-h-[9rem] flex-col justify-between border border-border bg-card/30 p-6",
                      "transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md active:scale-[0.99]",
                    )}
                  >
                    <div>
                      <span className="mb-4 flex size-10 items-center justify-center rounded-none border bg-muted/50 text-foreground/80">
                        <Icon className="size-5" />
                      </span>
                      <p className="text-lg font-medium tracking-[-0.04em]">{item.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <ArrowUpRightIcon className="mt-4 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div className="mt-10" variants={itemVariants}>
            <HeroCtaRow
              primary={{ label: "Start Your Project", href: "/contact" }}
              secondary={{ label: "See Our Work", href: "/portfolio" }}
            />
          </motion.div>
        </ContentRail>
      </motion.div>
    </SectionShell>
  );
}