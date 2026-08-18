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
 * Scroll-reveal project story (adapted from abui.io scroll-reveal-content-a):
 * a 300vh scroll journey with a sticky 100vh viewport — numbered chapters with
 * progress rails on the left, crossfading images on the right (lg+).
 * On mobile the story stacks: chapters with their inline image.
 */
export default function StoryScroll({ chapters }: { chapters: StoryChapter[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  useScrollProgress(scrollYProgress, setProgress)

  const total = chapters.length || 1

  const pct = (index: number) => {
    const start = index / total
    const end = (index + 1) / total
    return Math.min(100, Math.max(0, ((progress - start) / (end - start)) * 100))
  }

  if (!chapters.length) return null

  return (
    <section className="bg-background">
      <div ref={ref} className="relative mx-auto w-full max-w-[90vw]">
        {/* Scroll distance */}
        <div className="h-[300vh]" aria-hidden />

        {/* Sticky viewport */}
        <div className="sticky top-0 flex h-[100vh] w-full flex-col items-start justify-center">
          <div className="mx-auto grid w-full max-w-[1340px] grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            {/* Chapters */}
            <div className="flex w-full flex-col gap-8 lg:gap-10">
              {chapters.map((chapter, i) => {
                const p = pct(i)
                const active = p > 0
                return (
                  <div key={chapter.heading + i} className="flex w-full flex-col">
                    {/* Mobile inline image */}
                    {chapter.image && (
                      <div className="mb-4 overflow-hidden rounded-xl border border-border lg:hidden">
                        <img
                          src={chapter.image}
                          alt={chapter.heading}
                          className="aspect-[16/9] w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span
                        className={cn(
                          'text-2xl font-semibold tracking-tight transition-opacity duration-300 md:text-3xl',
                          active ? 'opacity-100' : 'opacity-50'
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex w-full">
                      <div className="relative flex w-[70px] items-start justify-center">
                        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-foreground/10" />
                        <div
                          className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-foreground transition-[height] duration-150"
                          style={{ height: `${p}%` }}
                        />
                      </div>
                      <div className="w-[calc(100%-40px)] pl-4">
                        <div className="flex flex-col gap-1">
                          <h3
                            className={cn(
                              'mb-2 text-2xl font-semibold tracking-tight text-foreground transition-opacity duration-300 md:text-3xl',
                              active ? 'opacity-100' : 'opacity-50'
                            )}
                          >
                            {chapter.heading}
                          </h3>
                          <p
                            className={cn(
                              'max-w-[400px] text-base font-medium leading-[130%] text-muted-foreground transition-opacity duration-300 md:text-lg',
                              active ? 'opacity-100' : 'opacity-50'
                            )}
                          >
                            {chapter.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Crossfading images (lg+) */}
            <div className="relative hidden h-full flex-col items-center justify-center lg:flex">
              <div className="relative h-[65vh] w-full overflow-hidden rounded-2xl border border-border bg-muted">
                {chapters.map((chapter, i) => (
                  <img
                    key={chapter.heading + i}
                    src={chapter.image || '/images/office.jpg'}
                    alt={chapter.heading}
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
                      progress > i / total ? 'opacity-100' : 'opacity-0'
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