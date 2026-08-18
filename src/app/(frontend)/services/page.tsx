import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/frontend/page-hero'
import { Section, SectionHeader } from '@/components/frontend/section'
import { CtaButton } from '@/components/frontend/cta-button'
import { TextRevealBlock } from '@/components/sora-ui/texts/text-reveal-block'
import { TiltCard } from '@/components/sora-ui/effects/tilt-card'
import { Reveal } from '@/components/frontend/reveal'
import { resolveIcon } from '@/lib/icons'
import { AppWindowMac, ClipboardList } from 'lucide-react'
import { getCmsServices } from '@/lib/cms-data'
import { process } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
  title: 'Layanan — Jasa Pembuatan Website & Aplikasi',
  description:
    'Dari landing page hingga platform kompleks — kami memberikan solusi teknologi yang tepat untuk setiap tahap pertumbuhan bisnis Anda.',
  path: '/services',
  keywords: [
    'jasa pembuatan website',
    'jasa pembuatan aplikasi',
    'landing page',
    'e-commerce',
    'company profile',
    'ui ux design',
  ],
})
}

export default async function ServicesPage() {
  const services = await getCmsServices()
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="End-to-End Digital Solutions"
        description="From landing pages to complex platforms — we deliver the right technology solutions for every stage of your business growth."
      />

      {/* Services grid */}
      <Section className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = resolveIcon(service.icon, AppWindowMac)
            return (
              <Reveal key={service.slug} delay={(i % 3) * 0.08} className="h-full">
                <TiltCard
                  rotationFactor={2.5}
                  className="group h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex h-full flex-col"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <span className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-lg bg-background/90 backdrop-blur-sm">
                        <Icon className="size-5 text-primary" strokeWidth={1.8} />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold tracking-tight text-foreground">
                        {service.title}
                      </h2>
                      <span className="font-mono text-xs text-muted-foreground/60">
                        {service.index}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {service.tagline}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* Process */}
      <Section muted className="py-16 sm:py-24">
        <SectionHeader
          eyebrow="Process"
          title={
            <>
              How We <span className="text-primary">Work</span>
            </>
          }
          description="A proven method from 50+ projects. Transparent at every stage."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((p, i) => {
            const Icon = resolveIcon(p.icon, ClipboardList)
            return (
              <Reveal
                key={p.step}
                delay={i * 0.08}
                className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">
                    {p.step}
                  </span>
                  <Icon
                    className="size-5 text-muted-foreground transition-colors group-hover:text-primary"
                    strokeWidth={1.6}
                  />
                </div>
                <h3 className="mt-4 text-sm font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center sm:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-5">
            <TextRevealBlock blockColor="hsl(var(--primary))" animateOnScroll direction="left">
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Not sure where to start?
              </h2>
            </TextRevealBlock>
            <p className="max-w-md text-base leading-relaxed text-white/80">
              Get a free consultation to map out your needs — no strings attached.
            </p>
            <CtaButton href="/contact" size="lg" variant="white">
              Free Consultation
            </CtaButton>
          </div>
        </div>
      </Section>
    </>
  )
}
