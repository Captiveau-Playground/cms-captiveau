'use client'

import { motion } from 'motion/react'
import { Users, MessageCircle, ShieldCheck } from 'lucide-react'
import { Section } from '../section'
import type { CmsHomepage } from '@/lib/cms-data'

const icons = {
  users: Users,
  message: MessageCircle,
  shield: ShieldCheck,
} as const

export default function TrustPoints({ points }: { points: CmsHomepage['trustPoints'] }) {
  return (
    <Section className="py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {points.map((point, i) => {
          const Icon = icons[point.icon as keyof typeof icons] || Users
          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 hover:border-primary/40 sm:p-8"
            >
              <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="size-6 text-primary" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {point.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
