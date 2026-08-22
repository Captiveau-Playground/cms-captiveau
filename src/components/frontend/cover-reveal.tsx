'use client'

import { useRef } from 'react'
import { useInView, motion } from 'motion/react'

/**
 * Establishing shot — the cover image wipes in from the top (clip-path) while
 * the photo settles from a slow zoom. Distinct opening motion, used once.
 */
export default function CoverReveal({
  src,
  alt,
  left,
  right,
}: {
  src: string
  alt: string
  left: string
  right: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="relative overflow-hidden border border-border bg-muted">
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          initial={{ scale: 1.12 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto block h-auto max-h-[52vh] w-auto max-w-full object-contain"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-black/45 to-transparent px-4 pb-3 pt-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white mix-blend-difference">
          {left}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white mix-blend-difference">
          {right}
        </span>
      </div>
    </div>
  )
}