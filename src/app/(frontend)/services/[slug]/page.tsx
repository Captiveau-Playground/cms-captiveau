import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check, AppWindowMac, CheckCircle2, ArrowRight } from 'lucide-react'
import { Section, RevealHeading } from '@/components/frontend/section'
import { CtaButton } from '@/components/frontend/cta-button'
import { Reveal } from '@/components/frontend/reveal'
import { TiltCard } from '@/components/sora-ui/effects/tilt-card'
import { resolveIcon } from '@/lib/icons'
import RichText from '@/components/frontend/rich-text'
import { getCmsServices, getCmsProjects, getCmsSiteSettings } from '@/lib/cms-data'
import { handleRedirectOrNotFound } from '@/lib/redirects'
import type { Metadata } from 'next'
import { buildMetadata, getSiteUrl } from '@/lib/seo'
import { JsonLd } from '@/components/frontend/jsonld'
import { PricingSection } from '@/components/pricing-section'
import IntegrationScatter from '@/components/frontend/integration-scatter'
import { AnimatedHeading } from '@/components/frontend/animated-heading'
import RelatedWork from '@/components/frontend/related-work'
import ManagedServiceDetail from '@/components/frontend/managed-service-detail'
import { ConsultCta } from '@/components/frontend/consult-cta'

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

  // Related portfolio: match projects whose services/category align with this service
  const allProjects = await getCmsProjects().catch(() => [])
  const serviceTokens = service.title.toLowerCase().split(/[\s-]+/)
  const matches = allProjects.filter((project) => {
    const projectTokens = [...project.services, project.category]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return serviceTokens.some((token) => token.length > 2 && projectTokens.includes(token))
  })
  // Prefer matches, then pad with other projects so the grid never looks empty
  const relatedProjects = [
    ...matches,
    ...allProjects.filter((project) => !matches.includes(project)),
  ].slice(0, 3)

  const cal = (await getCmsSiteSettings().catch(() => null))?.cal

  // Managed services use a distinct subscription-style layout
  if (service.category === 'managed') {
    return <ManagedServiceDetail service={service} cal={cal} />
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
      <section className="border-b border-border bg-background pb-14 pt-12 sm:pb-16 sm:pt-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Back to services
          </Link>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
              {service.tagline}
            </p>
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center border border-border bg-muted/50 text-foreground/80">
                <Icon className="size-5" strokeWidth={1.6} />
              </span>
              <AnimatedHeading
                as="h1"
                className="max-w-3xl text-balance font-medium text-4xl tracking-[-0.04em] md:text-5xl"
                text={service.title}
              />
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
      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-none border border-border shadow-xl shadow-black/10">
            <img loading="lazy" decoding="async"
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
                className="flex flex-col rounded-none border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
              >
                <span className="flex size-10 items-center justify-center rounded-none bg-primary/10">
                  <BIcon className="size-5 text-primary" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 text-sm font-medium tracking-[-0.04em] text-foreground">
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
          <RevealHeading className="text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-3xl">
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
                className="group flex flex-col rounded-none border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">[{p.step}]</span>
                  <PIcon
                    className="size-5 text-muted-foreground transition-colors group-hover:text-primary"
                    strokeWidth={1.6}
                  />
                </div>
                <h3 className="mt-4 text-sm font-medium tracking-[-0.04em] text-foreground">
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

      {/* Pricing — @efferd/pricing-4 block (no monthly/yearly toggle) */}
      <Section className="py-16 sm:py-24">
        <PricingSection
          plans={[
            {
              name: service.pricing.basic.name,
              info: service.pricing.basic.description,
              price: service.pricing.basic.price,
              features: service.pricing.basic.features,
              btn: { text: 'Pilih Paket', href: '/contact' },
            },
            {
              name: service.pricing.best.name,
              info: service.pricing.best.description,
              price: service.pricing.best.price,
              features: service.pricing.best.features,
              btn: { text: 'Pilih Paket', href: '/contact' },
              highlighted: true,
            },
            {
              name: service.pricing.enterprise.name,
              info: service.pricing.enterprise.description,
              price: service.pricing.enterprise.price,
              features: service.pricing.enterprise.features,
              btn: { text: 'Hubungi Kami', href: '/contact' },
            },
          ]}
          title={"Pricing " + service.title}
          description="Final pricing is tailored to your project's scope and specific needs. This is a transparent starting point."
        />
      </Section>

      {/* Technology & integrations — same treatment as portfolio */}
      <Section muted className="py-16 sm:py-24">
        <IntegrationScatter
          title={`Teknologi & integrasi ${service.title}`}
          description="Stack modern dan fondasi analitik yang kami sertakan dalam paket layanan ini."
          items={[
            ...(service.technologies.length > 0 ? service.technologies : ['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
            'ga4', 'gsc', 'clarity', 'performance',
          ]}
        />
      </Section>

      {/* Related work */}
      {relatedProjects.length > 0 && (
        <RelatedWork projects={relatedProjects} serviceTitle={service.title} />
      )}

      {/* Other services */}
      <Section className="py-16 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <RevealHeading className="text-2xl font-medium tracking-[-0.04em] text-foreground">
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
                  className="group flex flex-col gap-3 rounded-none border border-border bg-card p-5 transition-all hover:shadow-lg hover:shadow-black/5 hover:border-primary/30"
                >
                  <span className="flex size-10 items-center justify-center rounded-none bg-primary/10">
                    <SIcon className="size-5 text-primary" strokeWidth={1.7} />
                  </span>
                  <span className="text-sm font-medium tracking-[-0.04em] text-foreground">
                    {s.title}
                  </span>
                </Link>
              )
            })}
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-border bg-primary px-4 py-16 md:px-6 sm:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 text-center">
          <AnimatedHeading
            as="h2"
            className="max-w-2xl text-balance font-medium text-3xl tracking-[-0.04em] text-white md:text-4xl"
            text={`Mau mulai proyek ${service.title}?`}
          />
          <p className="max-w-xl text-pretty text-white/85">
            Konsultasi gratis — ceritakan ide kamu, kami kasih estimasi & rencana
            kerja yang jelas.
          </p>
          <div className="mt-1">
            <ConsultCta
              label="Konsultasi Gratis"
              cal={cal}
              className="bg-white text-foreground hover:bg-background"
            />
          </div>
        </div>
      </section>
    </>
  )
}
