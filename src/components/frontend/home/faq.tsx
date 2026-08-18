'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, MessageCircleQuestion } from 'lucide-react'
import { Section } from '../section'
import { Eyebrow } from '../eyebrow'
import { RevealHeading } from '../section'
import { Accordion } from '@/components/sora-ui/disclosure/accordion'
import type { FaqCategory } from '@/lib/content'
import { CtaButton } from '../cta-button'

export default function Faq({
  faqs,
  categories,
}: {
  faqs: { title: string; content: string; category: string }[]
  categories: string[]
}) {
  const [active, setActive] = useState<string>('All')

  const filtered = useMemo(
    () =>
      active === 'All' ? faqs : faqs.filter((f) => f.category === active),
    [active, faqs]
  )

  return (
    <Section muted className="py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left — sticky intro + help card */}
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <div className="flex flex-col gap-3">
              <Eyebrow label="FAQ" />
              <RevealHeading className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Frequently asked{' '}
                <span className="text-primary">questions</span>
              </RevealHeading>
              <p className="text-base leading-relaxed text-muted-foreground">
                Everything you need to know about working with Captiveau. Can't
                find your answer? We're one message away.
              </p>
            </div>

            {/* help card */}
            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                <MessageCircleQuestion className="size-5 text-primary" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                Still have questions?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Talk to our team and get a reply within one business day.
              </p>
              <div className="mt-4">
                <CtaButton href="/contact" size="sm" variant="outline" icon={false}>
                  Contact us
                </CtaButton>
              </div>
            </div>
          </div>
        </div>

        {/* Right — tabs + accordion */}
        <div className="lg:col-span-8">
          {/* category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active === cat
                    ? 'bg-primary text-white'
                    : 'border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40'
                }`}
              >
                {cat}
                <span
                  className={`ml-1.5 text-xs ${
                    active === cat ? 'text-white/70' : 'text-muted-foreground/60'
                  }`}
                >
                  {cat === 'All'
                    ? faqs.length
                    : faqs.filter((f) => f.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* accordion with numbering */}
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            {filtered.map((f, i) => (
              <Accordion
                key={`${active}-${f.title}`}
                className={`${i > 0 ? 'border-t border-border/70' : ''}`}
                items={[
                  {
                    title: `${String(i + 1).padStart(2, '0')} · ${f.title}`,
                    content: f.content,
                  },
                ]}
                iconMode="rotate"
                iconRotation={135}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4">
            <p className="text-sm text-muted-foreground">
              Want to talk through your project?
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              Book a free call
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
