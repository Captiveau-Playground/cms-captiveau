import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Section, RevealHeading } from '@/components/frontend/section'
import IntegrationScatter from '@/components/frontend/integration-scatter'
import { CtaButton } from '@/components/frontend/cta-button'
import StoryScroll from '@/components/frontend/story-scroll'
import { getCmsProjects, getCmsPageCta } from '@/lib/cms-data'
import type { Metadata } from 'next'
import { buildMetadata, getSiteUrl } from '@/lib/seo'
import { JsonLd } from '@/components/frontend/jsonld'
import { AnimatedHeading } from '@/components/frontend/animated-heading'

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

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description || undefined,
          image: project.image || undefined,
          creator: { '@type': 'Organization', name: 'Captiveau', url: await getSiteUrl() },
          url: `${await getSiteUrl()}/portfolio/${slug}`,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Beranda', item: await getSiteUrl() },
            { '@type': 'ListItem', position: 2, name: 'Portofolio', item: `${await getSiteUrl()}/portfolio` },
            { '@type': 'ListItem', position: 3, name: project.title, item: `${await getSiteUrl()}/portfolio/${slug}` },
          ],
        }}
      />
      {/* Hero */}
      <section className="border-b border-border bg-background pb-14 pt-12 sm:pb-16 sm:pt-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
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

          <AnimatedHeading
            as="h1"
            className="max-w-3xl text-balance font-medium text-4xl tracking-[-0.04em] md:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
            text={project.title}
          />

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Cover */}
      <Section className="py-12 sm:py-16">
        <div className="group relative overflow-hidden rounded-none border border-border">
          <img loading="lazy" decoding="async"
            src={project.image}
            alt={project.title}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </Section>

      {/* Overview */}
      <Section className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {project.description}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="flex flex-col divide-y divide-border border-y border-border">
              <div className="flex items-center justify-between py-3.5">
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Year</dt>
                <dd className="text-sm font-semibold text-foreground">{project.year}</dd>
              </div>
              <div className="flex items-center justify-between py-3.5">
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Category</dt>
                <dd className="text-sm font-semibold text-foreground">{project.category}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Services</dt>
                <dd className="text-right text-sm font-semibold text-foreground">
                  {project.services.join(' · ')}
                </dd>
              </div>
            </dl>

          </div>
        </div>
      </Section>

      {/* Project story — scroll-telling chapters (auto-built when empty) */}
      <div className="bg-background">
        <StoryScroll
          chapters={
            project.story && project.story.length > 0
              ? project.story
              : [
                  {
                    heading: 'Research & Discovery',
                    description:
                      'Kami memulai dengan memahami kebutuhan dan tujuan bisnis — setiap keputusan desain berangkat dari konteks nyata klien.',
                    image: project.image,
                  },
                  {
                    heading: 'Strategy & Design',
                    description:
                      project.services.length > 0
                      ? `Lingkup kerja mencakup ${project.services.join(', ')} — dirancang untuk hasil yang terukur.`
                      : 'Arsitektur, alur pengguna, dan desain disusun untuk mencapai hasil terbaik.',
                    image: null,
                  },
                  {
                    heading: 'Build & Launch',
                    description:
                      project.stack.length > 0
                      ? `Dibangun dengan ${project.stack.slice(0, 4).join(', ')} — diuji menyeluruh dan siap diluncurkan.`
                      : 'Pengembangan dengan standar engineering modern, QA menyeluruh, lalu peluncuran.',
                    image: project.image,
                  },
                ]
          }
        />
      </div>

      {/* Results */}
      <Section muted className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {project.results.map((r, i) => (
            <div
              key={r.label}
              className="group relative overflow-hidden rounded-none border border-border bg-card p-6 sm:p-8"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                result {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 text-4xl font-medium tracking-[-0.04em] text-secondary sm:text-5xl">
                {r.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{r.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tech Stack — scattered brand logos */}
      {project.stack.length > 0 && (
        <Section muted className="py-16 sm:py-24">
          <IntegrationScatter
            title="Tech stack"
            description="Teknologi modern yang kami pakai untuk membangun proyek ini — dipilih berdasarkan kebutuhan, bukan tren."
            items={project.stack}
          />
        </Section>
      )}

      {/* Digital integrations included (GA4, GSC, Clarity, ...) */}
      {project.integrations && project.integrations.length > 0 && (
        <Section className="py-16 sm:py-24">
          <IntegrationScatter
            title="Digital integrations included"
            description="Setiap proyek kami lengkapi dengan fondasi analitik & verifikasi — pengukuran konversi, indeks pencarian, hingga wawasan perilaku pengunjung."
            items={project.integrations}
          />
        </Section>
      )}

      {/* CTA — managed dynamically via the `page-ctas` CMS global */}
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

      {/* Other projects */}
      <Section className="py-16 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <RevealHeading className="text-2xl font-medium tracking-[-0.04em] text-foreground">
            Other projects
          </RevealHeading>
          <Link
            href="/portfolio"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
          >
            All works
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="group overflow-hidden rounded-none border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-sm font-medium tracking-[-0.04em] text-foreground">
                  {p.title}
                </span>
                <span className="text-xs text-muted-foreground">{p.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
