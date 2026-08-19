import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import type { Metadata } from 'next'
import { getPromotionBySlug } from '@/lib/cms-data'
import { buildMetadata } from '@/lib/seo'
import { AnimatedHeading } from '@/components/frontend/animated-heading'
import { ConsultCta } from '@/components/frontend/consult-cta'
import { getCmsSiteSettings } from '@/lib/cms-data'

export const generateStaticParams = async () => []

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const promo = await getPromotionBySlug(slug)
  if (!promo) return {}
  return buildMetadata({
    title: promo.metaTitle || `${promo.headline} — Promo Captiveau`,
    description: promo.metaDescription || promo.offerDescription || promo.subheadline,
    path: `/promo/${slug}`,
    keywords: promo.keywords ? promo.keywords.split(',').map((k) => k.trim()) : undefined,
    image: promo.ogImage,
  })
}

export default async function PromoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const promo = await getPromotionBySlug(slug)
  if (!promo) notFound()

  const settings = await getCmsSiteSettings().catch(() => null)
  const cal = settings?.cal

  // Decide CTA: cal / whatsapp / contact
  const ctaType = promo.cta.type || 'cal'
  const waNumber = settings?.contactOptions?.whatsappNumber || (settings?.whatsapp || '').replace(/\D/g, '')
  const ctaLabel = promo.cta.label || 'Klaim Promo'

  const renderCta = (label: string, onDark = false) => {
    const primary = onDark
      ? 'inline-flex items-center gap-1.5 bg-white px-5 py-3 text-sm font-medium text-foreground transition-all hover:bg-background active:scale-[0.98]'
      : 'inline-flex items-center gap-1.5 bg-primary px-5 py-3 text-sm font-medium text-white transition-all hover:bg-primary/85 active:scale-[0.98]'
    if (ctaType === 'whatsapp' && waNumber) {
      const text = encodeURIComponent(`Halo, saya tertarik promo "${promo.headline}"`)
      return (
        <a href={`https://wa.me/${waNumber}?text=${text}`} target="_blank" rel="noreferrer" className={primary}>
          {label}
          <ArrowUpRight className="size-4" />
        </a>
      )
    }
    if (ctaType === 'contact') {
      return (
        <Link href="/contact" className={primary}>
          {label}
          <ArrowUpRight className="size-4" />
        </Link>
      )
    }
    return (
      <ConsultCta
        label={label}
        cal={cal}
        className={onDark
          ? 'bg-white text-foreground hover:bg-background'
          : ''}
      />
    )
  }

  const numSteps = promo.steps.length

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-background pb-16 pt-12 sm:pt-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-4 sm:px-6 lg:px-8">
          {promo.eyebrow && (
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
              {promo.eyebrow}
            </p>
          )}
          {promo.badge && (
            <span className="inline-flex w-fit items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              {promo.badge}
            </span>
          )}
          <AnimatedHeading
            as="h1"
            className="max-w-4xl text-balance font-medium text-4xl tracking-[-0.04em] md:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
            text={promo.headline}
          />
          {promo.subheadline && (
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              {promo.subheadline}
            </p>
          )}
          <div className="mt-1 flex flex-wrap gap-3">
            {renderCta(ctaLabel)}
            <a
              href="#offer"
              className="inline-flex items-center gap-1.5 border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/40 active:scale-[0.98]"
            >
              Lihat penawaran
            </a>
          </div>
        </div>
      </section>

      {/* Offer */}
      {(promo.offerTitle || promo.offerDescription) && (
        <section id="offer" className="bg-background py-16 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Penawaran
                </p>
                <AnimatedHeading
                  className="mt-3 max-w-md text-balance font-medium text-2xl tracking-tight md:text-3xl"
                  text={promo.offerTitle || 'Apa yang kamu dapat'}
                />
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {promo.offerDescription}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {promo.benefits.length > 0 && (
        <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 border-b border-border pb-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Benefit
              </p>
              <AnimatedHeading
                className="mt-3 text-balance font-medium text-2xl tracking-tight md:text-3xl"
                highlightWords={['termasuk']}
                text="Semua yang termasuk"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {promo.benefits.map((b, i) => (
                <div key={b.title} className="flex h-full flex-col gap-3 border border-border bg-background p-6">
                  <span className="flex size-8 items-center justify-center border border-border bg-muted/40 text-primary">
                    <Check className="size-4" />
                  </span>
                  <h3 className="font-medium tracking-[-0.02em] text-foreground">{b.title}</h3>
                  {b.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                  )}
                  <span className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      {promo.steps.length > 0 && (
        <section className="bg-background py-16 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 border-b border-border pb-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Cara kerja
              </p>
              <AnimatedHeading
                className="mt-3 text-balance font-medium text-2xl tracking-tight md:text-3xl"
                text="Gimana cara klaimnya"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {promo.steps.map((s) => (
                <div key={s.title} className="flex flex-col gap-3 border border-border bg-background p-6">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(s.step || 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-medium tracking-[-0.02em] text-foreground">{s.title}</h3>
                  {s.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="border-t border-border bg-primary px-4 py-14 md:px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 text-center">
          <AnimatedHeading
            as="h2"
            className="max-w-2xl text-balance font-medium text-3xl tracking-[-0.04em] text-white md:text-4xl"
            text={promo.finalCtaTitle || promo.headline}
          />
          {promo.finalCtaSubtitle && (
            <p className="max-w-xl text-pretty text-white/85">
              {promo.finalCtaSubtitle}
            </p>
          )}
          <div className="mt-1">{renderCta(promo.finalCtaLabel, true)}</div>
        </div>
      </section>
    </>
  )
}