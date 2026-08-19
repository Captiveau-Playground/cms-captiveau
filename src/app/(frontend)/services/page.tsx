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
import { getCmsServices, getCmsSiteSettings } from '@/lib/cms-data'
import { process } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import IntegrationScatter from '@/components/frontend/integration-scatter'
import HowItWorks from '@/components/frontend/how-it-works'
import { AnimatedHeading } from '@/components/frontend/animated-heading'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
  title: 'Layanan — Jasa Pembuatan Website & Aplikasi',
  description:
    'Dari landing page hingga platform kompleks — kami memberikan solusi teknologi yang tepat untuk setiap tahap pertumbuhan bisnis Anda.',
  path: '/services',
  keywords: [
    'jasa pembuatan website',
    'jasa pembuatan aplikasi',
    'jasa pembuatan company profile',
    'jasa pembuatan landing page',
    'jasa pembuatan toko online',
    'web development indonesia',
  ],
})
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getCmsServices(), getCmsSiteSettings()])
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="End-to-End Digital Solutions"
        description="From landing pages to complex platforms — we deliver the right technology solutions for every stage of your business growth."
      />

      {/* Services grid */}
      <Section className="py-16 sm:py-24">
        <div className="mb-12 flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Services · 01
            </p>
            <AnimatedHeading
              className="mt-3 text-balance font-medium text-2xl tracking-tight md:text-4xl"
              text="End-to-End Digital Solutions"
            />
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Dari landing page hingga platform kompleks — teknologi yang tepat
            untuk setiap tahap bisnis.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = resolveIcon(service.icon, AppWindowMac)
            return (
              <Reveal key={service.slug} delay={(i % 3) * 0.08} className="h-full">
                <TiltCard
                  rotationFactor={2.5}
                  className="group h-full overflow-hidden rounded-none border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex h-full flex-col"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img loading="lazy" decoding="async"
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <span className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-none bg-background/90 backdrop-blur-sm">
                        <Icon className="size-5 text-primary" strokeWidth={1.8} />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium tracking-[-0.04em] text-foreground">
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

      {/* How it works — @blockus/how-it-works-01 */}
      <HowItWorks
        cal={settings.cal}
        steps={process.map((p) => ({
          n: p.step,
          icon: p.icon,
          title: p.title,
          body: p.desc,
        }))}
        title={
          <>
            How We <span className="text-primary">Work</span>
          </>
        }
        description="A proven method from 50+ projects. Transparent at every stage."
      />

      {/* Technology & integrations */}
      <Section className="py-16 sm:py-24">
        <IntegrationScatter
          title="Teknologi & integrasi"
          description="Dari Next.js hingga Microsoft Clarity — setiap proyek dibangun dengan stack modern dan fondasi analitik yang terukur."
          items={[
            'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js',
            'PostgreSQL', 'Payload CMS', 'Vercel', 'Cloudflare', 'Figma',
            'ga4', 'gsc', 'clarity',
          ]}
        />
      </Section>

      {/* CTA */}
      <Section className="py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-none bg-primary px-6 py-16 text-center sm:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-5">
            <TextRevealBlock blockColor="hsl(var(--primary))" animateOnScroll direction="left">
              <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
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
