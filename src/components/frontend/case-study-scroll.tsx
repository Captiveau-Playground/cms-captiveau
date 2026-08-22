'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

export type CaseChapter = {
  key: string
  eyebrow: string
  title: string
  description: string
  image: string | null
}

/**
 * Continuous film-strip scrollytelling — a sticky 100dvh viewport with a
 * horizontal track of full-width scenes that translates smoothly with scroll
 * progress (the JetBrains "Trusted by developers" feel: realtime, no waiting,
 * nothing discrete). Non-centered scenes dim and settle quietly; the copy
 * and image inside each scene stay put — the world moves, the story stands.
 */
export default function CaseStudyScroll({ chapters }: { chapters: CaseChapter[] }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  if (!chapters.length) return null

  const n = chapters.length
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `${-((n - 1) * 100)}vw`])
  const progressW = useTransform(scrollYProgress, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`)
  const sceneNow = useTransform(scrollYProgress, (v) =>
    Math.min(n, Math.floor(v * n) + 1)
  )

  return (
    <section ref={ref} className="relative">
      {/* Sticky cinema viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-background">
        {/* Header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            The story
          </span>
          <motion.span className="font-mono text-xs tabular-nums text-muted-foreground">
            <motion.span className="inline-block min-w-[2ch] text-foreground">{sceneNow}</motion.span>
            <span className="text-foreground/25"> / {String(n).padStart(2, '0')}</span>
          </motion.span>
        </div>

        {/* Film strip */}
        <motion.div style={{ x }} className="flex h-full w-max will-change-transform">
          {chapters.map((c, i) => (
            <Scene key={c.key} chapter={c} index={i} total={n} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* Progress hairline — fills in real time */}
        <div className="absolute inset-x-0 bottom-8 z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-px w-full bg-foreground/10">
            <motion.div style={{ width: progressW }} className="absolute inset-y-0 left-0 bg-primary" />
          </div>
        </div>
      </div>

      {/* Scroll distance — one viewport per scene keeps a steady glide */}
      <div aria-hidden style={{ height: `${n * 100}vh` }} />
    </section>
  )
}

function Scene({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: CaseChapter
  index: number
  total: number
  progress: MotionValue<number>
}) {
  return (
    <div className="flex h-full w-screen shrink-0 items-center justify-center">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Copy */}
        <div className="min-w-0 lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center border border-border font-mono text-xs tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">
              {chapter.eyebrow}
            </span>
          </div>
          <h3 className="mt-5 max-w-md text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-foreground md:text-[2.75rem]">
            {chapter.title}
          </h3>
          <div className="mt-7 h-px w-full bg-border" />
          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {chapter.description}
          </p>
        </div>

        {/* Visual plate */}
        <div className="min-w-0 lg:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              still {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {chapter.eyebrow}
            </span>
          </div>
          <div className="relative h-[40dvh] w-full overflow-hidden border border-border bg-muted lg:h-[58dvh]">
            <img
              src={chapter.image || '/images/office.jpg'}
              alt={chapter.title}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}