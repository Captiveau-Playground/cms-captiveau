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

/**
 * Simple client-logo strip — placed right under the hero.
 */
export default function SocialProof({ homepage }: { homepage: CmsHomepage }) {
  const logos = (homepage.socialProofLogos.length ? homepage.socialProofLogos : fallbackLogos).filter((l): l is string => !!l)
  const half = Math.ceil(logos.length / 2)
  const rows: LogoCarouselSwapperRow[] = [
    logos.slice(0, half).map((src) => ({ src, alt: 'partner' })),
    logos.slice(half).map((src) => ({ src, alt: 'partner' })),
  ]
  return (
    <Section className="border-y border-border py-12 sm:py-16">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {homepage.socialProofLabel || 'Dipercaya klien di berbagai industri'}
      </p>
      <LogoCarouselSwapper
        aria-label="Client & partner logos"
        rows={rows}
        interval={3000}
        stagger={0.12}
        monochrome
        size="lg"
      />
    </Section>
  )
}