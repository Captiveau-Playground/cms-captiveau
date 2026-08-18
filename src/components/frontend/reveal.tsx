'use client'

import type { ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

/**
 * Server-safe scroll-reveal wrapper. Use this in server components
 * wherever you'd otherwise reach for `motion.div` directly.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
  as?: 'div' | 'li' | 'span' | 'section'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: variants?.hidden ?? defaultVariants.hidden,
        visible: {
          ...(variants?.visible ?? defaultVariants.visible),
          transition: {
            ...(variants?.visible as { transition?: object })?.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}
