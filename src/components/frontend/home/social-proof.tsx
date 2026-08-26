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
  const source = homepage.socialProofLogos.length ? homepage.socialProofLogos : fallbackLogos
  // Dedupe by src — a logo added twice in the CMS must never render twice.
  const logos = source
    .filter((l): l is string => !!l)
    .filter((l, i, arr) => arr.indexOf(l) === i)

  // Interleave (even/odd indices) so each show/row holds different logos.
  const left = logos.filter((_, i) => i % 2 === 0).map((src) => ({ src, alt: 'partner' }))
  const right = logos.filter((_, i) => i % 2 === 1).map((src) => ({ src, alt: 'partner' }))
  const rows: LogoCarouselSwapperRow[] = [left, right]
  return (
    <Section className="border-y border-border py-12 sm:py-16">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {homepage.socialProofLabel || 'Dipercaya klien di berbagai industri'}
        </p>
        {homepage.socialProofDescription && (
          <p className="mt-2 text-sm text-muted-foreground">{homepage.socialProofDescription}</p>
        )}
      </div>
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