import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Section, RevealHeading } from '@/components/frontend/section'
import { CtaButton } from '@/components/frontend/cta-button'
import { getCmsProjects } from '@/lib/cms-data'
import type { Metadata } from 'next'
import { buildMetadata, getSiteUrl } from '@/lib/seo'
import { JsonLd } from '@/components/frontend/jsonld'

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
  const projects = await getCmsProjects()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const others = projects.filter((p) => p.slug !== slug)

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
      <section className="relative overflow-hidden bg-gray-50 pt-32 pb-10 sm:pt-40 sm:pb-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to portfolio
          </Link>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            {project.category}
          </span>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

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
        <div className="group relative overflow-hidden rounded-2xl border border-border">
          <img
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
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Stack</dt>
                <dd className="text-right text-sm font-semibold text-foreground">
                  {project.stack.join(' · ')}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      {/* Results */}
      <Section muted className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {project.results.map((r, i) => (
            <div
              key={r.label}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                result {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
                {r.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{r.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16 sm:py-24">
        <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-2xl border border-border bg-card px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-12">
          <div className="relative z-10">
            <RevealHeading className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Want similar results for your business?
            </RevealHeading>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Tell us what you need — we're ready to help from idea to launch.
            </p>
          </div>
          <div className="relative z-10">
            <CtaButton href="/contact" size="lg">
              Start Your Project
            </CtaButton>
          </div>
        </div>
      </Section>

      {/* Other projects */}
      <Section className="py-16 sm:py-24">
        <RevealHeading className="text-2xl font-bold tracking-tight text-foreground">
          Other projects
        </RevealHeading>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-sm font-semibold tracking-tight text-foreground">
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
