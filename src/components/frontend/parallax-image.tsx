'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Gentle scroll parallax — the image drifts vertically (slightly faster than
 * the page) inside a fixed frame. Used for the client portrait.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <div
      ref={ref}
      className={cn('relative w-full overflow-hidden border border-border bg-muted', className)}
    >
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  )
}