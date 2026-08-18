'use client'

import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

export type StoryChapter = {
  heading: string
  description: string
  image: string | null
}

/**
 * Scroll-telling project story (inspired by abui.io scroll-reveal-content-a).
 * A 250vh journey with a sticky 100dvh viewport. Each scroll segment advances
 * one chapter: the timeline dot lights up, the description fades in and the
 * featured image crossfades. Layout fills the viewport — no dead space.
 */
export default function StoryScroll({ chapters }: { chapters: StoryChapter[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  useScrollProgress(scrollYProgress, setProgress)

  if (!chapters.length) return null

  const total = chapters.length
  const activeIndex = Math.min(total - 1, Math.floor(progress * total))
  const chapter = chapters[activeIndex]

  return (
    <section ref={ref} className="relative bg-background">
      {/* Sticky viewport — sticks the moment the section enters the viewport
          (no empty scroll above it). The spacer after it holds the scroll. */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-background">
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          {/* Header row */}
          <div className="flex items-center justify-between pt-6 lg:pt-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              The story
            </span>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Body — fills remaining height */}
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 pb-10 pt-4 lg:grid-cols-2 lg:gap-12 lg:pb-12 lg:pt-6">
            {/* Chapters timeline (desktop) */}
            <div className="hidden min-h-0 flex-col justify-center lg:flex">
              <div
                className="flex flex-col justify-between gap-8"
                style={{ minHeight: 'min(520px, 72vh)' }}
              >
                {chapters.map((c, i) => {
                  const active = i === activeIndex
                  return (
                    <div key={c.heading + i} className="relative flex w-full items-stretch gap-4">
                      {/* Rail */}
                      <div className="relative flex w-7 flex-col items-center">
                        <span
                          className={cn(
                            'mt-1.5 size-3 shrink-0 rounded-full border-2 transition-all duration-300',
                            active
                              ? 'border-primary bg-primary'
                              : 'border-border bg-background'
                          )}
                        />
                        {i < total - 1 && (
                          <span className="absolute left-1/2 top-6 bottom-[-2.2rem] w-px -translate-x-1/2 bg-foreground/10" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'text-[11px] font-semibold tabular-nums transition-colors duration-300',
                            active ? 'text-primary' : 'text-muted-foreground/60'
                          )}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3
                          className={cn(
                            'mb-1 font-medium tracking-[-0.04em] transition-all duration-300',
                            active
                              ? 'text-2xl text-foreground md:text-3xl'
                              : 'text-xl text-foreground/40 md:text-2xl'
                          )}
                        >
                          {c.heading}
                        </h3>
                        <p
                          className={cn(
                            'max-w-[440px] text-[15px] font-medium leading-[135%] transition-opacity duration-300 md:text-base',
                            active ? 'opacity-100' : 'opacity-25'
                          )}
                        >
                          {c.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Image (desktop) — shorter, balanced with the chapters column */}
            <div className="relative hidden lg:flex lg:items-center">
              <div className="relative h-[50vh] w-full overflow-hidden border border-border bg-muted">
                {chapters.map((c, i) => (
                  <img loading="lazy" decoding="async"
                    key={c.heading + i}
                    src={c.image || '/images/office.jpg'}
                    alt={c.heading}
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
                      i === activeIndex ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Mobile: image + active chapter */}
            <div className="flex min-h-0 flex-col justify-center gap-4 lg:hidden">
              <div className="relative h-[44dvh] w-full overflow-hidden rounded-none border border-border bg-muted">
                {chapters.map((c, i) => (
                  <img loading="lazy" decoding="async"
                    key={c.heading + i}
                    src={c.image || '/images/office.jpg'}
                    alt={c.heading}
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
                      i === activeIndex ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  {String(activeIndex + 1).padStart(2, '0')} — {chapter.heading}
                </span>
                <h3 className="text-xl font-medium tracking-[-0.04em] text-foreground">
                  {chapter.heading}
                </h3>
                <p className="text-[15px] font-medium leading-[135%] text-muted-foreground">
                  {chapter.description}
                </p>
              </div>
              {/* Dots */}
              <div className="flex items-center gap-2 pt-1">
                {chapters.map((c, i) => (
                  <span
                    key={c.heading + i}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === activeIndex ? 'w-8 bg-primary' : 'w-2.5 bg-foreground/20'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-foreground/10">
            <div
              className="h-full bg-primary transition-[width] duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scroll distance — holds the sticky viewport for the story journey */}
      <div className="h-[220vh]" aria-hidden />
    </section>
  )
}

function useScrollProgress(progress: MotionValue<number>, set: (v: number) => void) {
  useMotionValueEvent(progress, 'change', (latest) => set(latest))
}