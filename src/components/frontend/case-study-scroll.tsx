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
 * Case-study journey — two responsive treatments:
 *
 * Desktop (>lg): continuous film-strip scrollytelling — a sticky 100dvh
 * viewport with a horizontal track of full-width scenes that translates
 * smoothly with scroll progress. Realtime, no waiting, nothing discrete.
 *
 * Mobile (<lg): a calm vertical stack — each scene flows naturally down the
 * page at its own height (always fits, nothing clipped). Native touch scroll
 * stays buttery-smooth: no sticky pinning, no horizontal transform, just a
 * light per-scene reveal.
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
      {/* ── Desktop: pinned cinema film ─────────────────────────── */}
      <div className="relative hidden lg:block">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-background">
          {/* Header */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-8 lg:px-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              The story
            </span>
            <motion.span className="font-mono text-xs tabular-nums text-muted-foreground">
              <motion.span className="inline-block min-w-[2ch] text-foreground">
                {sceneNow}
              </motion.span>
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
          <div className="absolute inset-x-0 bottom-8 z-20 mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="relative h-px w-full bg-foreground/10">
              <motion.div
                style={{ width: progressW }}
                className="absolute inset-y-0 left-0 bg-primary"
              />
            </div>
          </div>
        </div>

        {/* Scroll distance — one viewport per scene keeps a steady glide */}
        <div aria-hidden style={{ height: `${n * 100}vh` }} />
      </div>

      {/* ── Mobile: calm vertical stack ──────────────────────────── */}
      <div className="border-y border-border bg-background lg:hidden">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b border-border py-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              The story
            </span>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {String(n).padStart(2, '0')} chapters
            </span>
          </div>

          {chapters.map((c, i) => (
            <motion.article
              key={c.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-border py-8 last:border-b-0 first:pt-9"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center border border-border font-mono text-xs tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">
                    {c.eyebrow}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  still {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-medium leading-[1.1] tracking-[-0.04em] text-foreground">
                {c.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>

              <div className="mt-5 overflow-hidden border border-border bg-muted">
                <img
                  src={c.image || '/images/office.jpg'}
                  alt={c.title}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-auto w-full"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
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
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
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
          <div className="relative h-[58dvh] w-full overflow-hidden border border-border bg-muted">
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