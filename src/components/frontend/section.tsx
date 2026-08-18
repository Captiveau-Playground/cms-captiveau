import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from './eyebrow'
import { TextRevealBlock } from '@/components/sora-ui/texts/text-reveal-block'

export function Section({
  children,
  className,
  id,
  muted = false,
}: {
  children: ReactNode
  className?: string
  id?: string
  /** Alternate gray background */
  muted?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        'mx-auto w-full',
        muted ? 'bg-muted/60' : 'bg-background',
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

/**
 * Heading wrapped in Sora UI TextRevealBlock — each line wipes in with a
 * colored block as it enters the viewport. Left-aligned by default.
 */
export function RevealHeading({
  children,
  blockColor = 'hsl(var(--primary))',
  className,
}: {
  children: ReactNode
  blockColor?: string
  className?: string
}) {
  return (
    <TextRevealBlock blockColor={blockColor} animateOnScroll direction="left">
      <h2 className={className}>{children}</h2>
    </TextRevealBlock>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  blockColor,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  blockColor?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && <Eyebrow label={eyebrow} />}
      <TextRevealBlock blockColor={blockColor ?? 'hsl(var(--primary))'} animateOnScroll direction="left">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.1]">
          {title}
        </h2>
      </TextRevealBlock>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
