'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'motion/react'
import CountUp from '@/components/frontend/count-up'
import { parseMetric } from '@/lib/metrics'

type Metric = { value: string; label: string }

/**
 * The finale — a cinematic outcome scoreboard. The headline metric animates
 * with a scroll-linked progress bar (0 → 100% as the section crosses the
 * screen), the big number counts up, and supporting metrics land beneath it.
 */
export default function OutcomeFinale({
  results,
  year,
  headline,
}: {
  results: Metric[]
  year?: string
  headline?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 0.6'],
  })
  const fill = useTransform(scrollYProgress, [0.15, 0.9], ['2%', '100%'])

  const [head, ...rest] = results
  if (!head) return null
  const m = parseMetric(head.value)

  return (
    <section
      ref={ref}
      className="border-t border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              <span className="h-px w-8 bg-primary/40" />
              The outcome
            </p>
            <h2 className="mt-3 max-w-2xl text-balance text-3xl font-medium tracking-[-0.04em] text-foreground md:text-4xl">
              {headline || 'The outcome, in numbers'}
            </h2>
          </div>
          {year && (
            <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              measured post-launch · {year}
            </p>
          )}
        </div>

        {/* Scoreboard */}
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Headline metric with scroll-linked bar */}
          <div className="lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              result 01 — {head.label}
            </p>
            <p className="mt-4 text-[clamp(4rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.04em] tabular-nums text-foreground">
              {m.prefix}
              {m.value !== null ? (
                <CountUp value={m.value} suffix={m.suffix} decimals={m.decimals} />
              ) : (
                m.text
              )}
            </p>

            {/* before → after */}
            <div className="mt-10">
              <div className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>before launch</span>
                <span className="text-foreground">{m.text}</span>
              </div>
              <div className="h-[3px] w-full overflow-hidden bg-foreground/10">
                <motion.div style={{ width: fill }} className="h-full bg-primary" />
              </div>
              <div className="mt-2.5 text-right font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                after launch
              </div>
            </div>
          </div>

          {/* Supporting metrics */}
          <div className="flex flex-col justify-end lg:col-span-4">
            {rest.map((r, i) => {
              const rm = parseMetric(r.value)
              return (
                <div
                  key={r.label}
                  className="border-t border-border py-6 first:pt-0 sm:py-7"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    result {String(i + 2).padStart(2, '0')} — {r.label}
                  </p>
                  <p className="mt-2 text-4xl font-medium tabular-nums tracking-[-0.04em] text-secondary sm:text-5xl">
                    {rm.prefix}
                    {rm.value !== null ? (
                      <CountUp value={rm.value} suffix={rm.suffix} decimals={rm.decimals} />
                    ) : (
                      rm.text
                    )}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}