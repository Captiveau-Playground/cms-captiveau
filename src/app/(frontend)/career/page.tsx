import Link from 'next/link'
import { ArrowUpRight, Briefcase, MapPin, Sparkles } from 'lucide-react'
import { PageHero } from '@/components/frontend/page-hero'
import { Section, SectionHeader, RevealHeading } from '@/components/frontend/section'
import { CtaButton } from '@/components/frontend/cta-button'
import { Reveal } from '@/components/frontend/reveal'
import { resolveIcon } from '@/lib/icons'
import { getCmsJobs, getCmsHomepage } from '@/lib/cms-data'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
  title: 'Karir — Bergabung dengan Tim',
  description:
    'Bangun karier yang bermakna bersama Captiveau. Remote-friendly, learning-first, dan dikelilingi tim yang membangun produk digital berkualitas.',
  path: '/career',
  keywords: ['lowongan kerja it', 'karir software house', 'kerja di jakarta', 'karir teknologi indonesia'],
})
}

export default async function CareerPage() {
  const [jobs, homepage] = await Promise.all([getCmsJobs(), getCmsHomepage()])
  const careerBenefits = homepage?.careerBenefits || []

  return (
    <>
      <PageHero
        eyebrow="Career"
        title="Build a Career That Matters"
        description="Join a passionate team building quality digital products. Remote-friendly, learning-first."
      />

      {/* Image band */}
      <Section className="py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { src: '/images/team.jpg', alt: 'Captiveau team' },
            { src: '/images/office.jpg', alt: 'Studio space' },
            { src: '/images/meeting.jpg', alt: 'Collaboration' },
          ].map((img) => (
            <div key={img.src} className="overflow-hidden rounded-xl border border-border">
              <img src={img.src} alt={img.alt} className="aspect-[4/3] w-full object-cover" />
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      {careerBenefits.length > 0 && (
        <Section className="pb-12 sm:pb-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {careerBenefits.map((b, i) => {
              const Icon = resolveIcon(b.icon)
              return (
                <Reveal
                  key={b.title}
                  delay={i * 0.07}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {b.desc}
                  </p>
                </Reveal>
              )
            })}
          </div>
        </Section>
      )}

      {/* Open positions */}
      <Section muted className="py-14 sm:py-20">
        <SectionHeader
          eyebrow="Open Positions"
          title={
            <>
              Positions we&rsquo;re{' '}
              <span className="text-primary">hiring for</span>
            </>
          }
        />

        <div className="mt-10 flex flex-col divide-y divide-border/70 rounded-2xl border border-border bg-card px-5 sm:px-8">
          {jobs.map((job, i) => (
            <Reveal key={job.title} delay={i * 0.05} className="">
              <Link
                href={`mailto:hello@captiveau.id?subject=${encodeURIComponent(`Application — ${job.title}`)}`}
                className="group grid grid-cols-1 items-center gap-4 py-6 transition-all sm:grid-cols-12 sm:gap-6"
              >
                <div className="sm:col-span-7">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {job.title}
                    </h3>
                    {job.type === 'Internship' && (
                      <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                        intern
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="size-3.5" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-secondary" />
                      {job.salary}
                    </span>
                  </div>
                </div>
                <div className="hidden gap-1.5 sm:col-span-3 sm:flex sm:flex-wrap">
                  {job.tags.slice(0, 3).map((t: string) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2 sm:col-span-2 sm:justify-end">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:hidden">
                    apply
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-24 sm:pb-32">
        <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-2xl border border-border bg-card px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-12">
          <div className="relative z-10">
            <RevealHeading className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Can&rsquo;t find the right fit?
            </RevealHeading>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              We&rsquo;re always open to great talent. Send your portfolio —
              we&rsquo;ll keep it for the next hiring round.
            </p>
          </div>
          <div className="relative z-10">
            <CtaButton href="mailto:hello@captiveau.id?subject=Open%20Application" size="lg">
              Send Application
            </CtaButton>
          </div>
        </div>
      </Section>
    </>
  )
}
