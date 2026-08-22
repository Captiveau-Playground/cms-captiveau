import { PageHero } from '@/components/frontend/page-hero'
import { Section, SectionHeader } from '@/components/frontend/section'
import { CtaButton } from '@/components/frontend/cta-button'
import { Reveal } from '@/components/frontend/reveal'
import CountUp from '@/components/frontend/count-up'
import { resolveIcon } from '@/lib/icons'
import { getCmsHomepage, getCmsPageCta } from '@/lib/cms-data'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { AnimatedHeading } from '@/components/frontend/animated-heading'

const storyStats = [
  { value: 12, suffix: 'K+', label: 'Project hours' },
  { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime' },
  { value: 40, suffix: '+', label: 'Happy clients' },
]

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
  title: 'Tentang Kami — Creative Tech Studio',
  description:
    'Captiveau — creative tech studio dari Jakarta. Kami membantu bisnis membangun produk digital end-to-end: riset, desain, pengembangan, hingga maintenance.',
  path: '/about',
  keywords: ['tentang captiveau','software house jakarta','tim web developer indonesia','company profile digital agency'],
})
}

export default async function AboutPage() {
  const [homepage, cta] = await Promise.all([getCmsHomepage(), getCmsPageCta('about')])
  const values = homepage?.values || []

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="We are what we build."
        description="Captiveau — a creative tech studio from Jakarta. We help businesses build digital products end-to-end: research, design, development, and maintenance."
      />

      {/* Story */}
      <Section className="py-12 sm:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="overflow-hidden rounded-none border border-border lg:col-span-5">
            <img loading="lazy" decoding="async"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="Captiveau team"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <AnimatedHeading
              className="max-w-2xl text-balance font-medium text-3xl tracking-[-0.04em] sm:text-4xl"
              highlightWords={['studio']}
              text="From two restless engineers, to a trusted studio"
            />
            <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                It started with two engineers tired of rebuilding the same
                interfaces in every project. We began collecting what worked
                and shaping it into something anyone could use.
              </p>
              <p>
                Seven years later, that collection grew into a studio trusted by
                teams across industries — from solo founders to enterprises
                shipping at scale.
              </p>
            </div>

            <dl className="mt-2 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {storyStats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <dt className="order-2 text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="order-1 text-2xl font-medium tracking-[-0.04em] text-primary sm:text-3xl">
                    <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Values — CLEAR */}
      {values.length > 0 && (
        <Section muted className="py-16 sm:py-24">
          <SectionHeader
            eyebrow="Our Values"
            title={
              <>
                The <span className="text-primary">C.L.E.A.R</span> Philosophy
              </>
            }
            description="The principles behind every product and service we deliver."
          />

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => {
              const Icon = resolveIcon(v.icon)
              return (
                <Reveal
                  key={v.title}
                  delay={i * 0.06}
                  className="group relative overflow-hidden rounded-none border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
                >
                  <Icon className="size-6 text-primary" strokeWidth={1.6} />
                  <h3 className="mt-4 text-base font-medium tracking-[-0.04em] text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {v.desc}
                  </p>
                </Reveal>
              )
            })}
          </div>
        </Section>
      )}

      {/* CTA — managed dynamically via the `page-ctas` CMS global */}
      {cta.enabled && (
        <Section className="py-16 sm:py-24">
          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-none border border-border bg-card px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-12">
            <div className="relative z-10">
              <h2 className="text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-3xl">
                {cta.title}
              </h2>
              {cta.subtitle && (
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {cta.subtitle}
                </p>
              )}
            </div>
            <div className="relative z-10 flex flex-wrap gap-3">
              <CtaButton href={cta.primary.href} size="lg">
                {cta.primary.label}
              </CtaButton>
              {cta.secondary?.label && (
                <CtaButton href={cta.secondary.href} size="lg" variant="outline" icon={false}>
                  {cta.secondary.label}
                </CtaButton>
              )}
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
