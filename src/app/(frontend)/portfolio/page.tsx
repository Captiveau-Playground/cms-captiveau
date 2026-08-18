import { PageHero } from '@/components/frontend/page-hero'
import { Section } from '@/components/frontend/section'
import { CtaButton } from '@/components/frontend/cta-button'
import { TextRevealBlock } from '@/components/sora-ui/texts/text-reveal-block'
import CountUp from '@/components/frontend/count-up'
import { ScrollGallery } from '@/components/sora-ui/effects/scroll-gallery'
import { getCmsProjects } from '@/lib/cms-data'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Trusted Clients' },
  { value: 4.9, suffix: '', decimals: 1, label: 'Client Rating' },
  { value: 35, suffix: '%', label: 'Avg. Improvement' },
]

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
  title: 'Portofolio — Karya & Studi Kasus',
  description:
    'Lihat karya dan studi kasus proyek digital yang telah kami kerjakan — dari company profile, e-commerce, hingga aplikasi mobile.',
  path: '/portfolio',
  keywords: ['portofolio software house', 'studi kasus digital', 'hasil karya web development'],
})
}

export default async function PortfolioPage() {
  const projects = await getCmsProjects()
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Recent Work & Projects"
        description="Every project is proof of our commitment to quality and client satisfaction. Scroll to explore our work."
      />

      {/* Scroll-driven image gallery */}
      <div className="bg-background">
        <ScrollGallery
          slides={projects.map((p) => ({
            image: p.image,
            title: p.title,
            url: `/portfolio/${p.slug}`,
          }))}
          prefixLabel="Project"
          linkLabel="View case study"
          showInfoBand
          showPrefix
          showLink
        />
      </div>

      {/* Stats */}
      <Section muted className="py-16 md:py-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 rounded-xl border border-border bg-card p-6 text-center"
            >
              <p className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16 md:py-24">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center sm:px-12">
          <div className="relative z-10 flex flex-col items-center gap-5">
            <TextRevealBlock blockColor="hsl(var(--primary))" animateOnScroll direction="left">
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Have a project for us?
              </h2>
            </TextRevealBlock>
            <p className="max-w-md text-base leading-relaxed text-white/85">
              Be our next client. Free consultation, no commitment.
            </p>
            <CtaButton href="/contact" size="lg" variant="white">
              Contact Us
            </CtaButton>
          </div>
        </div>
      </Section>
    </>
  )
}
