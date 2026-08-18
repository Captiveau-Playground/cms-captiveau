'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedHeading } from '@/components/frontend/animated-heading'

/**
 * Page hero — Nusaiba-style: mono eyebrow + word-reveal heading + description,
 * boxy with a bottom border (matches the homepage design system).
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  description?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'border-b border-border bg-background pb-14 pt-12 sm:pb-16 sm:pt-14',
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <AnimatedHeading
          as="h1"
          className="max-w-4xl text-balance font-medium text-4xl tracking-[-0.04em] md:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
          text={title}
        />
        {description && (
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}