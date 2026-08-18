import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check, AppWindowMac, CheckCircle2, ArrowRight } from 'lucide-react'
import { Section, RevealHeading } from '@/components/frontend/section'
import { CtaButton } from '@/components/frontend/cta-button'
import { Reveal } from '@/components/frontend/reveal'
import { TiltCard } from '@/components/sora-ui/effects/tilt-card'
import { resolveIcon } from '@/lib/icons'
import RichText from '@/components/frontend/rich-text'
import { getCmsServices } from '@/lib/cms-data'
import { handleRedirectOrNotFound } from '@/lib/redirects'
import type { Metadata } from 'next'
import { buildMetadata, getSiteUrl } from '@/lib/seo'
import { JsonLd } from '@/components/frontend/jsonld'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const services = await getCmsServices()
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return buildMetadata({
    title: `${service.title} — Layanan`,
    description: service.description || service.intro.slice(0, 160),
    image: service.image,
    path: `/services/${slug}`,
    type: 'website',
    keywords: [service.title, 'jasa ' + service.title.toLowerCase(), 'software house indonesia'],
  })
}
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const services = await getCmsServices()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    await handleRedirectOrNotFound(`/services/${slug}`)
    return null // unreachable — satisfies the type checker
  }

  const Icon = resolveIcon(service.icon, AppWindowMac)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description || service.intro.slice(0, 160),
          provider: { '@type': 'Organization', name: 'Captiveau', url: await getSiteUrl() },
          url: `${await getSiteUrl()}/services/${slug}`,
          serviceType: service.title,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Beranda', item: await getSiteUrl() },
            { '@type': 'ListItem', position: 2, name: 'Layanan', item: `${await getSiteUrl()}/services` },
            { '@type': 'ListItem', position: 3, name: service.title, item: `${await getSiteUrl()}/services/${slug}` },
          ],
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-50 pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to services
          </Link>

          <div className="flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="size-7 text-primary" strokeWidth={1.6} />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-secondary">{service.tagline}</p>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {service.title}
              </h1>
            </div>
          </div>

          {service.introductionRichText ? (
            <RichText
              data={service.introductionRichText}
              className="max-w-2xl text-base sm:text-lg"
            />
          ) : (
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {service.intro}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {service.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-border shadow-xl shadow-black/10">
            <img
              src={service.image}
              alt={service.title}
              className="aspect-[16/8] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Key benefits */}
      <Section className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.benefits.map((b, i) => {
            const BIcon = resolveIcon(b.icon, CheckCircle2)
            return (
              <Reveal
                key={b.title}
                delay={i * 0.07}
                className="flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <BIcon className="size-5 text-primary" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 text-sm font-semibold tracking-tight text-foreground">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {b.description}
                </p>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* Process */}
      <Section muted className="py-16 sm:py-24">
        <div className="mb-10">
          <RevealHeading className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            How <span className="text-primary">{service.title}</span> works
          </RevealHeading>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {service.process.map((p, i) => {
            const PIcon = resolveIcon(p.icon, ArrowRight)
            return (
              <Reveal
                key={p.step}
                delay={i * 0.08}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">[{p.step}]</span>
                  <PIcon
                    className="size-5 text-muted-foreground transition-colors group-hover:text-primary"
                    strokeWidth={1.6}
                  />
                </div>
                <h3 className="mt-4 text-sm font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* Pricing */}
      <Section className="py-16 sm:py-24">
        <div className="mb-12 flex flex-col gap-4 text-center">
          <RevealHeading className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pricing <span className="text-primary">Estimate</span>
          </RevealHeading>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
            Final pricing is tailored to your project's scope and specific needs. This is a transparent starting point.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {(
            [
              { plan: service.pricing.basic, featured: false },
              { plan: service.pricing.best, featured: true },
              { plan: service.pricing.enterprise, featured: false },
            ] as const
          ).map(({ plan, featured }, i) => (
            <Reveal key={plan.name} delay={i * 0.08} className="h-full">
              <TiltCard
                rotationFactor={2}
                className={`relative flex h-full flex-col overflow-hidden rounded-xl border p-6 sm:p-7 ${
                  featured
                    ? 'border-primary/40 bg-primary/5 shadow-lg shadow-primary/10'
                    : 'border-border bg-card'
                }`}
              >
                {featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                  {plan.price}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-border/70 pt-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-foreground/85"
                    >
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <Check className="size-2.5 text-primary" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <CtaButton
                    href="/contact"
                    variant={featured ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    Get a Quote
                  </CtaButton>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Technologies */}
      <Section muted className="pb-16 sm:pb-20">
        <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Technology
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">
              Our tech stack
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Other services */}
      <Section className="pb-24 sm:pb-32">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <RevealHeading className="text-2xl font-bold tracking-tight text-foreground">
            Other services
          </RevealHeading>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            All services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services
            .filter((s) => s.slug !== service.slug)
            .map((s) => {
              const SIcon = resolveIcon(s.icon, AppWindowMac)
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <SIcon className="size-5 text-primary" strokeWidth={1.7} />
                  </span>
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    {s.title}
                  </span>
                </Link>
              )
            })}
        </div>
      </Section>
    </>
  )
}
