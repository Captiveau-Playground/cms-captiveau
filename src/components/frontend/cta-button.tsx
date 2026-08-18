'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { ParticleHoverButton } from '@/components/sora-ui/buttons/particle-hover-button'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'white'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-600 shadow-sm shadow-primary/25',
  accent:
    'bg-secondary text-white hover:bg-secondary-600 shadow-sm shadow-secondary/25',
  outline:
    'border border-border bg-background text-foreground hover:border-primary/60 hover:text-primary',
  ghost: 'border border-transparent text-foreground hover:bg-muted',
  white:
    'bg-white text-foreground hover:bg-gray-100 shadow-sm shadow-black/10',
}

export function CtaButton({
  href = '#',
  children,
  variant = 'primary',
  size = 'md',
  withParticles = true,
  className,
  icon = true,
  ...props
}: {
  href?: string
  children: ReactNode
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  withParticles?: boolean
  icon?: boolean
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'children' | 'ref'>) {
  const sizes = {
    sm: 'h-9 px-4 text-sm gap-1.5',
    md: 'h-11 px-6 text-sm gap-2',
    lg: 'h-12 px-8 text-base gap-2',
  } as const

  const inner = (
    <Link
      href={href}
      className={cn(
        'group/cta relative inline-flex items-center justify-center rounded-none font-medium transition-all duration-200 will-change-transform active:scale-[0.98]',
        sizes[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="relative z-10 size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
        />
      )}
    </Link>
  )

  if (!withParticles) {
    return inner
  }

  return (
    <ParticleHoverButton
      className="inline-block"
      particle={
        <span className="pointer-events-none absolute -left-1 -top-1 size-1.5 rounded-full bg-secondary shadow-[0_0_8px_1px] shadow-secondary/60" />
      }
    >
      {inner}
    </ParticleHoverButton>
  )
}
