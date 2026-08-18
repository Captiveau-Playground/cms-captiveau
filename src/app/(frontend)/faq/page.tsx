import { PageHero } from '@/components/frontend/page-hero'
import { Section } from '@/components/frontend/section'
import { CtaButton } from '@/components/frontend/cta-button'
import { RevealHeading } from '@/components/frontend/section'
import { Accordion } from '@/components/sora-ui/disclosure/accordion'
import { getCmsFaqs } from '@/lib/cms-data'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
  title: 'Pertanyaan Umum (FAQ)',
  description:
    'Temukan jawaban tentang layanan, proses, dan harga di Captiveau. Tidak menemukan jawaban? Hubungi tim kami secara langsung.',
  path: '/faq',
  keywords: ['faq software house', 'pertanyaan umum', 'harga pembuatan website'],
})
}

export default async function FaqPage() {
  const { faqs } = await getCmsFaqs()
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Find answers about Captiveau and our services. If you can’t find one, reach out directly."
      />

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Accordion
            className="flex flex-col divide-y divide-border/70 rounded-2xl border border-border bg-card"
            items={faqs.map((f) => ({
              title: f.title,
              content: f.content,
            }))}
            iconMode="rotate"
            iconRotation={135}
          />
        </div>

        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-5 rounded-2xl border border-border bg-card px-6 py-12 text-center">
          <RevealHeading className="text-2xl font-bold tracking-tight text-foreground">
            Still have questions?
          </RevealHeading>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            We're here to help. Contact our team and get an answer within 24 hours.
          </p>
          <CtaButton href="/contact" size="lg">
            Contact Us
          </CtaButton>
        </div>
      </Section>
    </>
  )
}
