'use client'

import {
  LogoCarouselSwapper,
  type LogoCarouselSwapperRow,
} from '@/components/sora-ui/effects/logo-carousel-swapper'
import { Section } from '../section'
import type { CmsHomepage } from '@/lib/cms-data'

const fallbackLogos = [
  '/logos/nvidia.svg', '/logos/supabase.svg', '/logos/github.svg', '/logos/openai.svg',
  '/logos/turso.svg', '/logos/clerk.svg', '/logos/claude.svg', '/logos/vercel.svg',
]

export default function SocialProof({ homepage }: { homepage: CmsHomepage }) {
  const logos = (homepage.socialProofLogos.length ? homepage.socialProofLogos : fallbackLogos).filter((l): l is string => !!l)
  const half = Math.ceil(logos.length / 2)
  const rows: LogoCarouselSwapperRow[] = [
    logos.slice(0, half).map((src) => ({ src, alt: 'partner' })),
    logos.slice(half).map((src) => ({ src, alt: 'partner' })),
  ]
  return (
    <Section muted className="py-16 sm:py-24">
      <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-secondary" />
          Social Proof
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {homepage.socialProofLabel}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {homepage.socialProofDescription}
        </p>
      </div>

      <LogoCarouselSwapper
        aria-label="Partner & technology logos"
        rows={rows}
        interval={3000}
        stagger={0.12}
        monochrome
        size="lg"
      />
    </Section>
  )
}
