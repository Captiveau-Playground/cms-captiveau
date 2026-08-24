"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { defaultSpring, motionStagger, motionViewport } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";
import { SectionShell, ContentRail } from "@/components/layout-contract";
import { GalleryTile } from "@/lib/gallery-primitives";
import type { GalleryItem } from "@/lib/gallery-data";
import type { Project as ProjectItem } from "@/lib/content";
import { AnimatedHeading } from '@/components/frontend/animated-heading'

function toGalleryItem(p: ProjectItem): GalleryItem {
  return {
    id: p.slug,
    title: p.title,
    location: p.category || "Portfolio",
    date: p.year || "",
    category: "Texture",
    image: p.image,
    alt: p.title,
    summary: p.description,
  };
}

type ColumnEntry = {
  item: GalleryItem
  slug: string
  height: string
}

const leftColumnHeights = [
  "min-h-[14rem] md:min-h-[16rem]",
  "min-h-[10rem] md:min-h-[11rem]",
  "min-h-[13rem] md:min-h-[14rem]",
  "min-h-[9.5rem] md:min-h-[10.5rem]",
];
const rightColumnHeights = [
  "min-h-[10rem] md:min-h-[11rem]",
  "min-h-[15rem] md:min-h-[17rem]",
  "min-h-[9.5rem] md:min-h-[10.5rem]",
  "min-h-[12rem] md:min-h-[13rem]",
];

function ColumnRevealTile({
  entry,
  index,
  direction,
}: {
  entry: ColumnEntry
  index: number
  direction: "left" | "right"
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="transition-[opacity,filter] duration-300 group-hover/column:opacity-55 group-hover/column:blur-[1px] hover:!opacity-100 hover:!blur-none"
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: direction === "left" ? -14 : 14, filter: "blur(4px)" }
      }
      transition={{ ...defaultSpring, delay: index * motionStagger.item }}
      viewport={motionViewport}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, filter: "blur(0px)" }}
    >
      <Link
        href={`/portfolio/${entry.slug}`}
        className="block"
      >
        <GalleryTile
          className={cn(
            "shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
            entry.height,
          )}
          compact
          item={entry.item}
        />
      </Link>
    </motion.div>
  );
}

function GalleryColumn({
  items,
  direction,
  className,
}: {
  items: ColumnEntry[]
  direction: "left" | "right"
  className?: string
}) {
  return (
    <div className={cn("group/column space-y-4 md:space-y-5", className)}>
      {items.map((entry, index) => (
        <ColumnRevealTile
          direction={direction}
          entry={entry}
          index={index}
          key={entry.item.id}
        />
      ))}
    </div>
  );
}

export function GalleryColumnsSection({
  projects,
  metrics = [],
}: {
  projects: ProjectItem[]
  metrics?: { value: string; label: string }[]
}) {
  const reduceMotion = useReducedMotion();

  const items = projects.map(toGalleryItem)
  // Interleave kiri/kanan (parity) supaya jumlah item di kedua kolom seimbang
  // — dengan 4 item: kiri 2, kanan 2. Item ganjil di kanan, genap di kiri.
  const left = items.filter((_, i) => i % 2 === 0).map((item, i) => ({
    item,
    slug: item.id,
    height: leftColumnHeights[i % leftColumnHeights.length],
  }))
  const right = items.filter((_, i) => i % 2 === 1).map((item, i) => ({
    item,
    slug: item.id,
    height: rightColumnHeights[i % rightColumnHeights.length],
  }))

  return (
    <SectionShell spacingMode="section">
      <ContentRail maxWidth="max-w-7xl" className="space-y-10">
        <div className="max-w-2xl">
          <p className="font-medium text-primary text-xs uppercase tracking-[0.25em]">
            Portfolio
          </p>
          <AnimatedHeading
            className="mt-3 text-balance font-medium text-2xl tracking-tight md:text-4xl"
            highlightWords={['speaks']}
            text="Work that speaks for us"
          />
          <p className="mt-4 text-muted-foreground text-sm md:text-base">
            Setiap proyek adalah bukti komitmen kami pada kualitas — klik untuk
            melihat studi kasus lengkap.
          </p>
        </div>

        <motion.div
          className="relative overflow-hidden border border-border bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
          transition={defaultSpring}
          viewport={motionViewport}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        >
          <GridPattern
            aria-hidden
            className="absolute inset-0 stroke-foreground/[0.03]"
            height={40}
            width={40}
          />

          <div className="relative grid gap-px bg-border md:grid-cols-2">
            <GalleryColumn
              className="bg-background p-4 md:mt-10 md:p-5"
              direction="left"
              items={left}
            />
            <GalleryColumn
              className="bg-background p-4 md:p-5"
              direction="right"
              items={right}
            />
          </div>

          {metrics.length > 0 && (
            <div className="relative grid grid-cols-3 gap-px border-t border-border bg-border">
              {metrics.map((metric) => (
                <div
                  className="bg-background px-4 py-4 text-center md:px-6 md:py-5"
                  key={metric.label}
                >
                  <p className="font-medium text-2xl tracking-tight tabular-nums md:text-3xl">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-pretty text-muted-foreground text-xs md:text-sm">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </ContentRail>
    </SectionShell>
  );
}