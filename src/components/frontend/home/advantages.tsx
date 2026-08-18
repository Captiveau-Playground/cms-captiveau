'use client'

import { motion } from 'motion/react'
import { Eye, Users, Layers } from 'lucide-react'
import { Section } from '../section'
import { Eyebrow } from '../eyebrow'
import { RevealHeading } from '../section'
import type { CmsHomepage } from '@/lib/cms-data'

const icons = {
  eye: Eye,
  users: Users,
  layers: Layers,
} as const

export default function Advantages({ advantages }: { advantages: CmsHomepage['advantages'] }) {
  return (
    <Section className="py-16 sm:py-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="overflow-hidden rounded-none border border-border shadow-xl shadow-black/10">
            <img
              src="/images/meeting.jpg"
              alt="Captiveau team discussing with clients"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-6 rounded-none border border-border bg-card px-5 py-3 shadow-lg shadow-black/10">
            <p className="text-xl font-bold text-primary">8+ thn</p>
            <p className="text-xs text-muted-foreground">industry experience</p>
          </div>
        </motion.div>

        {/* Features */}
        <div className="flex flex-col gap-6 lg:col-span-6">
          <div className="flex flex-col gap-3">
            <Eyebrow label="Why Us" />
            <RevealHeading className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose <span className="text-primary">Captiveau?</span>
            </RevealHeading>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              An Indonesian software house focused on quality, speed, and client satisfaction.
            </p>
          </div>

          <div className="mt-2 flex flex-col gap-4">
            {advantages.map((item, i) => {
              const Icon = icons[item.icon as keyof typeof icons]
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 rounded-none border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-none bg-primary/10">
                    <Icon className="size-5 text-primary" strokeWidth={1.8} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
