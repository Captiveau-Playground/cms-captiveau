'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, MessageCircleQuestion } from 'lucide-react'
import { SectionShell, ContentRail } from '@/components/layout-contract'
import { SeraStagger, SeraStaggerItem } from '@/lib/sera-motion'
import { AnimatedHeading } from '@/components/frontend/animated-heading'
import { Accordion } from '@/components/sora-ui/disclosure/accordion'
import type { FaqCategory } from '@/lib/content'

export default function Faq({
  faqs,
  categories,
}: {
  faqs: { title: string; content: string; category: string }[]
  categories: string[]
}) {
  const [active, setActive] = useState<string>('All')

  const filtered = useMemo(
    () => (active === 'All' ? faqs : faqs.filter((f) => f.category === active)),
    [active, faqs]
  )

  return (
    <SectionShell spacingMode="section">
      <ContentRail maxWidth="max-w-7xl" className="space-y-10">
        <SeraStagger className="space-y-10">
          <SeraStaggerItem>
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
              <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
                FAQ
              </p>
              <span className="font-mono text-[11px] text-muted-foreground">05</span>
            </div>
          </SeraStaggerItem>

          <SeraStaggerItem>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left — intro + help card */}
              <div className="lg:col-span-4">
                <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                  <AnimatedHeading
                    className="max-w-md text-balance font-medium text-3xl tracking-tight md:text-4xl"
                    highlightWords={['questions']}
                    text="Frequently asked questions"
                  />
                  <p className="max-w-md text-muted-foreground text-sm leading-relaxed md:text-base">
                    Everything you need to know about working with Captiveau.
                    Can't find your answer? We're one message away.
                  </p>

                  <div className="border border-border bg-background p-6">
                    <span className="flex size-10 items-center justify-center border border-border bg-muted/50 text-foreground/80">
                      <MessageCircleQuestion className="size-5" />
                    </span>
                    <h3 className="mt-4 font-medium text-base tracking-tight">
                      Still have questions?
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Talk to our team and get a reply within one business day.
                    </p>
                    <Link
                      className="mt-5 inline-flex items-center gap-1.5 border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/30 active:scale-[0.98]"
                      href="/contact"
                    >
                      Contact us
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right — tabs + accordion */}
              <div className="lg:col-span-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActive(cat)}
                      className={`rounded-full border px-3.5 py-2 font-medium text-xs transition-[background-color,border-color,color,transform] active:scale-[0.96] ${
                        active === cat
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border bg-background text-muted-foreground hover:border-foreground/25 hover:text-foreground'
                      }`}
                    >
                      {cat}
                      <span
                        className={`ml-1.5 tabular-nums ${
                          active === cat ? 'text-background/70' : 'text-muted-foreground/60'
                        }`}
                      >
                        {cat === 'All'
                          ? faqs.length
                          : faqs.filter((f) => f.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 border border-border bg-background">
                  {filtered.map((f, i) => (
                    <Accordion
                      key={`${active}-${f.title}`}
                      className={`${i > 0 ? 'border-t border-border' : ''}`}
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

                <div className="mt-6 flex flex-col gap-2 border border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Want to talk through your project?
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Book a free call
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </SeraStaggerItem>
        </SeraStagger>
      </ContentRail>
    </SectionShell>
  )
}