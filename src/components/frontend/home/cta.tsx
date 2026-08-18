'use client'

import { Section } from '../section'
import { CtaButton } from '../cta-button'
import type { CmsHomepage } from '@/lib/cms-data'
import { TextRevealBlock } from '@/components/sora-ui/texts/text-reveal-block'

export default function Cta({ homepage }: { homepage: CmsHomepage }) {
  return (
    <Section className="py-16 sm:py-24">
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-primary lg:grid-cols-2">
        {/* Copy */}
        <div className="flex flex-col items-start justify-center gap-5 px-6 py-14 sm:px-12 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
            <span className="size-1.5 rounded-full bg-secondary" />
            Free · No Commitment
          </span>
          <TextRevealBlock blockColor="hsl(var(--primary))" animateOnScroll direction="left">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {homepage.ctaTitle}
            </h2>
          </TextRevealBlock>
          <p className="max-w-md text-base leading-relaxed text-white/85">
            {homepage.ctaSubtitle}
          </p>
          <CtaButton href="/contact" size="lg" variant="white">
            {homepage.ctaButtonText}
          </CtaButton>
        </div>

        {/* Image */}
        <div className="relative min-h-[260px]">
          <img
            src="/images/office.jpg"
            alt="Ruang kerja tim Captiveau"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/20" />
        </div>
      </div>
    </Section>
  )
}
