import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { Section, RevealHeading } from '@/components/frontend/section'
import IntegrationScatter from '@/components/frontend/integration-scatter'
import { CtaButton } from '@/components/frontend/cta-button'
import CaseStudyScroll, { type CaseChapter } from '@/components/frontend/case-study-scroll'
import CoverReveal from '@/components/frontend/cover-reveal'
import OutcomeFinale from '@/components/frontend/outcome-finale'
import { Reveal } from '@/components/frontend/reveal'
import type { CaseStudy, Project as ProjectItem } from '@/lib/content'
import { getCmsProjects, getCmsPageCta } from '@/lib/cms-data'
import type { Metadata } from 'next'
import { buildMetadata, getSiteUrl } from '@/lib/seo'
import { JsonLd } from '@/components/frontend/jsonld'
import { AnimatedHeading } from '@/components/frontend/animated-heading'
import { SeraBlurReveal, SeraMaskRule } from '@/lib/sera-motion'
import { cn } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const projects = await getCmsProjects()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return buildMetadata({
    title: `${project.title} — Portofolio`,
    description: project.description || `Studi kasus proyek ${project.title} oleh Captiveau.`,
    image: project.image,
    path: `/portfolio/${slug}`,
    keywords: [project.title, project.category || '', 'portofolio'],
  })
}

/**
 * Builds the pinned case-study journey. Case-study chapters (objective →
 * approach → challenge → outcome) take priority; without one, the legacy
 * story chapters are used so the page always tells a narrative.
 */
function buildCaseChapters(p: ProjectItem): CaseChapter[] {
  const cs = p.caseStudy
  const fromCase: CaseChapter[] = [
    cs && (cs.objective?.title || cs.objective?.description)
      ? {
          key: 'objective',
          eyebrow: 'Objectives',
          title: cs.objective?.title || 'Objectives',
          description: cs.objective!.description,
          image: cs.objective?.image || p.image,
        }
      : null,
    cs && (cs.approach?.title || cs.approach?.description)
      ? {
          key: 'approach',
          eyebrow: 'Our approach',
          title: cs.approach?.title || 'Our approach',
          description: cs.approach!.description,
          image: cs.approach?.image || p.image,
        }
      : null,
    cs && (cs.challenge?.title || cs.challenge?.description)
      ? {
          key: 'challenge',
          eyebrow: 'The challenge',
          title: cs.challenge?.title || 'The challenge',
          description: cs.challenge!.description,
          image: cs.challenge?.image || p.image,
        }
      : null,
    cs && (cs.outcome?.title || cs.outcome?.description)
      ? {
          key: 'outcome',
          eyebrow: 'Outcome',
          title: cs.outcome?.title || 'Outcome',
          description: cs.outcome!.description,
          image: cs.outcome?.image || p.image,
        }
      : null,
  ].filter(Boolean) as CaseChapter[]

  if (fromCase.length >= 2) return fromCase

  // No case-study data: synthesize the full narrative arc for every project.
  return [
    {
      key: 'objective',
      eyebrow: 'Objectives',
      title: 'Set a clear goal',
      description:
        p.description ||
        'Menentukan tujuan yang terukur sejak awal — setiap keputusan desain berangkat dari target bisnis yang jelas.',
      image: p.image,
    },
    {
      key: 'approach',
      eyebrow: 'Our approach',
      title: 'Designed around the objective',
      description: p.services.length
        ? `Lingkup kerja mencakup ${p.services.join(', ')} — disusun untuk hasil yang terukur.`
        : 'Arsitektur, alur pengguna, dan desain disusun untuk mencapai hasil terbaik.',
      image: p.image,
    },
    {
      key: 'challenge',
      eyebrow: 'The challenge',
      title: 'Constraints that sharpened the work',
      description:
        'Menyeimbangkan kualitas, kecepatan, dan budget — batasan justru mengarahkan keputusan desain menjadi lebih tajam.',
      image: p.image,
    },
    {
      key: 'outcome',
      eyebrow: 'Outcome',
      title: 'Measurable results',
      description: p.results.length
        ? `Sejak peluncuran hasilnya terukur: ${p.results.map((r) => `${r.value} ${r.label}`).join(', ')}.`
        : 'Rilis tepat waktu dengan standar engineering dan analitik yang terpasang sejak hari pertama.',
      image: p.image,
    },
  ]
}

/** Parses metric strings like "+120%", "98", "<1s", "4.8" into CountUp parts. */

const INTEGRATION_LABELS: Record<string, string> = {
  ga4: 'GA4 Analytics',
  gsc: 'Google Search Console',
  clarity: 'Microsoft Clarity',
  gtm: 'Google Tag Manager',
  'meta-pixel': 'Meta Pixel',
  hotjar: 'Hotjar',
  seo: 'SEO & Open Graph',
  schema: 'Schema.org structured data',
  performance: 'Performance optimization',
  zapier: 'Zapier',
  semrush: 'SEMrush',
  intercom: 'Intercom',
  mailchimp: 'Mailchimp',
  n8n: 'n8n',
}

/** Consistent mono kicker — the reading rhythm that holds the beats together. */
function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mb-5 flex items-center gap-3', className)}>
      <span className="h-px w-8 shrink-0 bg-primary/40" />
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        {children}
      </span>
    </div>
  )
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [projects, cta] = await Promise.all([getCmsProjects(), getCmsPageCta('projectDetail')])
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const others = projects.filter((p) => p.slug !== slug).slice(0, 3)
  const chapters = buildCaseChapters(project)
  const cs: CaseStudy | null = project.caseStudy || null
  const siteUrl = await getSiteUrl()

  // Reflection always closes the story — facts when the CMS provides them,
  // otherwise a safe, on-voice default.
  const reflection = cs?.reflection ?? {
    title: 'Constraints make the work sharper',
    description:
      'Batasan — anggaran, waktu, atau teknis — jarang menjadi musuh. Justru mereka yang memaksa keputusan lebih cepat, lebih tajam, dan benar-benar terukur.',
    image: null,
  }

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description || undefined,
          image: project.image || undefined,
          creator: { '@type': 'Organization', name: 'Captiveau', url: siteUrl },
          url: `${siteUrl}/portfolio/${slug}`,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Portofolio', item: `${siteUrl}/portfolio` },
            { '@type': 'ListItem', position: 3, name: project.title, item: `${siteUrl}/portfolio/${slug}` },
          ],
        }}
      />

      {/* 01 · Opening credits (compact — keeps the cover in the first viewport) */}
      <section className="border-b border-border bg-background pb-8 pt-8 sm:pb-10 sm:pt-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <Link
              href="/portfolio"
              className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              Back to portfolio
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
              {project.category} · {project.year}
            </p>
          </div>

          <AnimatedHeading
            as="h1"
            className="max-w-2xl text-balance font-medium text-3xl tracking-[-0.04em] sm:text-4xl lg:text-5xl lg:leading-[1.08]"
            text={project.title}
          />

          <div data-scroll data-scroll-speed="-0.04">
            <SeraMaskRule />
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 02 · Establishing shot */}
      <Section className="pt-4 pb-10 sm:pb-12">
        <div data-scroll data-scroll-speed="-0.06">
          <CoverReveal
            src={project.image}
            alt={project.title}
            left="the cover"
            right={`${project.category || 'case study'} — ${project.year || ''}`}
          />
        </div>
      </Section>

      {/* 03 · Logline — the brief in one breath */}
      <Section className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Kicker>The brief</Kicker>
            <p className="max-w-xl text-balance text-2xl font-medium leading-[1.25] tracking-[-0.03em] text-foreground sm:text-3xl lg:text-[2.5rem] lg:leading-[1.18]">
              {project.description}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="flex flex-col">
              <MetaRow label="Year" value={project.year} />
              <MetaRow label="Category" value={project.category} />
              <MetaRow label="Services" value={project.services.join(' · ')} />
              {project.stack.length > 0 && (
                <MetaRow label="Stack" value={project.stack.slice(0, 4).join(', ')} />
              )}
            </dl>
          </div>
        </div>
      </Section>

      {/* 04 · Character intro — who they are and what they needed */}
      {cs?.client && (
        <Section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div data-scroll data-scroll-speed="-0.07" className="relative w-full overflow-hidden border border-border bg-muted">
                <img
                  src={cs.client.photo || project.image}
                  alt={cs.client.name}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full scale-[1.2]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  the client
                </span>
                {cs.client.industry && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">
                    {cs.client.industry}
                  </span>
                )}
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Kicker>Client overview</Kicker>
              <h2 className="text-3xl font-medium tracking-[-0.04em] text-foreground md:text-4xl">
                {cs.client.name}
                {cs.client.location && (
                  <span className="text-muted-foreground"> — {cs.client.location}</span>
                )}
              </h2>
              {cs.client.about && (
                <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-muted-foreground">
                  {cs.client.about}
                </p>
              )}
              {cs.client.needs && (
                <div className="mt-9 border border-border bg-muted/40">
                  <div className="flex items-center justify-between border-b border-border px-6 py-3.5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-secondary">
                      What they needed
                    </span>
                    <span className="text-lg leading-none text-secondary">“</span>
                  </div>
                  <p className="px-6 py-6 text-lg font-medium leading-relaxed tracking-[-0.02em] text-foreground sm:text-xl">
                    {cs.client.needs}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* 05 · Proof — what they said */}
      {cs && cs.testimonials.length > 0 && (
        <Section muted className="py-16 sm:py-24">
          <div className="mb-10 border-b border-border pb-8">
            <Kicker className="mb-0">What they said</Kicker>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-foreground">
              In their own words
            </h2>
          </div>
          <div
            className={cn(
              'grid gap-4',
              cs.testimonials.length === 1 ? 'mx-auto max-w-3xl grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
            )}
          >
            {cs.testimonials.map((t, i) => (
              <Reveal key={t.name + i} delay={i * 0.1}>
                <figure className="group flex h-full flex-col justify-between border border-border bg-card p-8 transition-colors duration-300 hover:border-primary/30">
                  <div>
                    <span aria-hidden className="text-5xl font-medium leading-none text-secondary">
                      “
                    </span>
                    <blockquote className="mt-2 max-w-[58ch] text-lg font-medium leading-relaxed tracking-[-0.02em] text-foreground md:text-xl">
                      {t.quote}
                    </blockquote>
                  </div>
                  <figcaption className="mt-8 flex items-center gap-3.5 border-t border-border pt-5">
                    {t.photo ? (
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="size-11 rounded-full border border-border object-cover"
                      />
                    ) : (
                      <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {(t.name || 'C').trim().charAt(0).toUpperCase()}
                      </span>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name || 'Client'}</p>
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {t.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 06 · The story — pinned film glide */}
      {chapters.length >= 2 && <CaseStudyScroll chapters={chapters} />}

      {/* 07 · The finale — outcome scoreboard */}
      {project.results.length > 0 && (
        <OutcomeFinale
          results={project.results}
          year={project.year}
          headline={cs?.outcome?.title || undefined}
        />
      )}

      {/* 08 · Afterword — quiet editorial close */}
      {reflection && (
        <Section className="py-24 sm:py-32">
          <SeraMaskRule className="mb-12" />
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Kicker>Reflection</Kicker>
              <SeraBlurReveal>
                <h2 className="max-w-xl text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-foreground sm:text-4xl">
                  {reflection.title || 'Reflection'}
                </h2>
              </SeraBlurReveal>
              {reflection.description && (
                <SeraBlurReveal>
                  <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {reflection.description}
                  </p>
                </SeraBlurReveal>
              )}
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <SeraBlurReveal>
                <div className="relative overflow-hidden border border-border bg-muted">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={reflection.image || project.image}
                    alt={reflection.title}
                    data-scroll
                    data-scroll-speed="-0.08"
                    className="h-auto w-full"
                  />
                  <span className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white mix-blend-difference">
                    reflection
                  </span>
                </div>
              </SeraBlurReveal>
            </div>
          </div>
        </Section>
      )}

      {/* 09 · Recipe — tech stack */}
      {project.stack.length > 0 && (
        <Section muted className="py-16 sm:py-24">
          <IntegrationScatter
            title="Tech stack"
            description="Teknologi modern yang kami pakai untuk membangun proyek ini — dipilih berdasarkan kebutuhan, bukan tren."
            items={project.stack}
          />
        </Section>
      )}

      {/* 10 · Ops checklist — digital integrations */}
      {project.integrations && project.integrations.length > 0 && (
        <Section className="py-16 sm:py-24">
          <div className="mb-10 border-b border-border pb-8">
            <Kicker className="mb-0">Digital integrations included</Kicker>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-foreground">
              Fondasi analitik & verifikasi
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Setiap proyek kami lengkapi dengan instrumen pengukuran, indeks pencarian, hingga
              wawasan perilaku pengunjung — siap terukur sejak hari pertama.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {project.integrations.map((name, i) => (
              <Reveal key={name + i} delay={i * 0.04}>
                <div className="flex items-center gap-2.5 border border-border bg-card px-4 py-3 transition-colors duration-300 hover:border-primary/40">
                  <Check className="size-4 text-secondary" strokeWidth={2.2} />
                  <span className="text-sm font-medium text-foreground">
                    {INTEGRATION_LABELS[name] || name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 11 · Call to action */}
      {cta.enabled && (
        <Section className="py-16 sm:py-24">
          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-none border border-border bg-card px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-12">
            <div className="relative z-10">
              <RevealHeading className="text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-3xl">
                {cta.title}
              </RevealHeading>
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

      {/* 12 · Closing credits — other projects */}
      <Section className="py-16 sm:py-24">
        <div className="mb-10 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Kicker className="mb-0">More work</Kicker>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-foreground">
              Other projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary"
          >
            All works
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {others.map((p, i) => (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group block">
              <div className="relative overflow-hidden border border-border bg-muted">
                <span className="pointer-events-none absolute left-4 top-4 z-10 font-mono text-[11px] tabular-nums text-white mix-blend-difference">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="overflow-hidden">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={p.image}
                    alt={p.title}
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 border border-t-0 border-border px-4 py-3.5">
                <span className="text-sm font-medium tracking-[-0.03em] text-foreground">
                  {p.title}
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {p.category}
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="group flex items-center justify-between gap-4 border-t border-border py-3.5 transition-colors duration-300 last:border-b hover:bg-muted/40">
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-right text-sm font-semibold text-foreground">{value}</dd>
    </div>
  )
}