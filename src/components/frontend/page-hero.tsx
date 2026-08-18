'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { TextEffect } from '@/components/sora-ui/texts/text-effect'

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
        'relative overflow-hidden bg-gray-50 pt-32 pb-14 sm:pt-40 sm:pb-20',
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          <TextEffect as="span" preset="fade-in-blur" per="line" speedReveal={1.2}>
            {title}
          </TextEffect>
        </h1>
        {description && (
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
