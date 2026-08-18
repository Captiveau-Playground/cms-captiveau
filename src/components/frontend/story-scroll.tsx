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
 * Scroll-telling project story (adapted from abui.io scroll-reveal-content-a).
 * A tall scroll journey (240vh) with a sticky 100vh viewport:
 * scrolling switches the featured image and highlights the active chapter.
 * - Desktop: numbered chapters with progress rails on the left, crossfading
 *   image on the right.
 * - Mobile: crossfading image on top + the active chapter only (no stacking).
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

  const pct = (index: number) => {
    const start = index / total
    const end = (index + 1) / total
    return Math.min(100, Math.max(0, ((progress - start) / (end - start)) * 100))
  }

  const chapter = chapters[activeIndex]

  return (
    <section className="bg-background">
      <div ref={ref} className="relative mx-auto w-full">
        {/* Scroll distance */}
        <div className="h-[240vh]" aria-hidden />

        {/* Sticky viewport */}
        <div className="sticky top-0 flex h-[100dvh] w-full items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
            {/* Chapters (desktop) */}
            <div className="hidden flex-col justify-center gap-8 lg:flex">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                The story
              </span>
              {chapters.map((c, i) => {
                const p = pct(i)
                const active = i === activeIndex
                return (
                  <div key={c.heading + i} className="flex w-full">
                    <div className="relative flex w-[64px] shrink-0 items-start justify-center">
                      <div className="absolute left-1/2 top-1 h-full w-[2px] -translate-x-1/2 bg-foreground/10" />
                      <div
                        className="absolute left-1/2 top-1 w-[2px] -translate-x-1/2 bg-foreground transition-[height] duration-150"
                        style={{ height: `${Math.max(p, active ? 100 : 0)}%` }}
                      />
                      <span
                        className={cn(
                          'relative z-10 mt-2 text-xs font-semibold tabular-nums transition-opacity duration-300',
                          active ? 'opacity-100' : 'opacity-40'
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="min-w-0 pl-4">
                      <h3
                        className={cn(
                          'mb-1 text-2xl font-semibold tracking-tight text-foreground transition-opacity duration-300 md:text-[1.7rem]',
                          active ? 'opacity-100' : 'opacity-40'
                        )}
                      >
                        {c.heading}
                      </h3>
                      <p
                        className={cn(
                          'max-w-[480px] text-base font-medium leading-[130%] text-muted-foreground transition-opacity duration-300 md:text-lg',
                          active ? 'opacity-100' : 'opacity-30'
                        )}
                      >
                        {c.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Image (desktop) */}
            <div className="relative hidden h-[78vh] w-full overflow-hidden rounded-2xl border border-border bg-muted lg:block">
              {chapters.map((c, i) => (
                <img
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

            {/* Mobile: image + active chapter only */}
            <div className="flex h-full flex-col justify-center gap-5 lg:hidden">
              <div className="relative h-[42dvh] w-full overflow-hidden rounded-xl border border-border bg-muted">
                {chapters.map((c, i) => (
                  <img
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

              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                The story · {String(activeIndex + 1).padStart(2, '0')}/
                {String(total).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {chapter.heading}
                </h3>
                <p className="text-base font-medium leading-[130%] text-muted-foreground">
                  {chapter.description}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2 pt-1">
                {chapters.map((c, i) => (
                  <span
                    key={c.heading + i}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === activeIndex ? 'w-8 bg-foreground' : 'w-2.5 bg-foreground/20'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function useScrollProgress(progress: MotionValue<number>, set: (v: number) => void) {
  useMotionValueEvent(progress, 'change', (latest) => set(latest))
}