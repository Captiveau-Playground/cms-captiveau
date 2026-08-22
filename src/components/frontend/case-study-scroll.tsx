'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'motion/react'

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
 * progress (realtime, no waiting). Same treatment on mobile and desktop; on
 * small screens each scene compacts so title + description + image always fit
 * one viewport (text is line-clamped, image sizes against remaining space).
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
  const sceneNow = useTransform(scrollYProgress, (v) => Math.min(n, Math.floor(v * n) + 1))

  return (
    <section ref={ref} className="relative">
      {/* Sticky cinema viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-background">
        {/* Header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 pt-5 sm:px-6 lg:px-8 lg:pt-8">
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
            <Scene key={c.key} chapter={c} index={i} />
          ))}
        </motion.div>

        {/* Progress hairline — fills in real time */}
        <div className="absolute inset-x-0 bottom-5 z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:bottom-8 lg:px-8">
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

function Scene({ chapter, index }: { chapter: CaseChapter; index: number }) {
  return (
    <div className="flex h-full w-screen shrink-0 items-center justify-center">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-3 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Copy — compact on mobile (line-clamped) so it never overflows the viewport */}
        <div className="min-w-0 lg:col-span-5">
          <div className="flex items-center gap-2.5 lg:gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center border border-border font-mono text-[11px] tabular-nums lg:size-9 lg:text-xs">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-secondary lg:text-[11px] lg:tracking-[0.24em]">
              {chapter.eyebrow}
            </span>
          </div>
          <h3 className="mt-2.5 line-clamp-2 max-w-xl text-xl font-medium leading-[1.14] tracking-[-0.03em] text-foreground lg:mt-5 lg:text-balance lg:text-[2.75rem] lg:leading-[1.08] lg:tracking-[-0.04em]">
            {chapter.title}
          </h3>
          <div className="mt-3 hidden h-px w-full bg-border lg:mt-7 lg:block" />
          <p className="mt-2.5 line-clamp-3 max-w-[46ch] text-[13px] leading-relaxed text-muted-foreground lg:mt-5 lg:text-[17px] lg:line-clamp-none">
            {chapter.description}
          </p>
        </div>

        {/* Visual plate — sizes to remaining space */}
        <div className="min-w-0 lg:col-span-7">
          <div className="mb-2 flex items-center justify-between lg:mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              still {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {chapter.eyebrow}
            </span>
          </div>
          <div className="relative h-[30dvh] w-full overflow-hidden border border-border bg-muted lg:h-[58dvh]">
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