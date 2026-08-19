import Link from 'next/link'
import { ArrowUpRight, Check, Gauge, Headphones, ShieldCheck, DatabaseBackup } from 'lucide-react'
import { AnimatedHeading } from '@/components/frontend/animated-heading'
import { ConsultCta, type CalSettings } from '@/components/frontend/consult-cta'
import { PricingSection } from '@/components/pricing-section'
import type { ServiceItem } from '@/lib/content'

const guarantees = [
  { icon: Gauge, title: 'Uptime 99.9%', desc: 'Monitoring 24/7 dengan notifikasi dini dan respons cepat.' },
  { icon: DatabaseBackup, title: 'Backup Rutin', desc: 'Backup terjadwal + restore cepat jika ada kendala.' },
  { icon: ShieldCheck, title: 'Keamanan', desc: 'Patch, sertifikat TLS, dan proteksi aktif.' },
  { icon: Headphones, title: 'Support Prioritas', desc: 'Tim teknis siap membantu kapan pun dibutuhkan.' },
]

const howItWorks = [
  { n: '01', title: 'Konsultasi gratis', desc: 'Ceritakan kebutuhan — kami sesuaikan paket & biaya.' },
  { n: '02', title: 'Setup & migrasi', desc: 'Kami pasang, setel, dan pindahkan data tanpa downtime.' },
  { n: '03', title: 'Kelola & pantau', desc: 'Bulanan aktif: pantau, update, dan support berkelanjutan.' },
]

/**
 * Managed / subscription service detail — SaaS-style layout, intentionally
 * different from project services (no portfolio, cover, build process).
 */
export default function ManagedServiceDetail({
  service,
  cal,
}: {
  service: ServiceItem
  cal?: CalSettings | null
}) {
  const pricingPlans = [
    { name: service.pricing.basic.name, info: service.pricing.basic.description, price: service.pricing.basic.price, features: service.pricing.basic.features, btn: { text: 'Pilih Paket', href: '/contact' } },
    { name: service.pricing.best.name, info: service.pricing.best.description, price: service.pricing.best.price, features: service.pricing.best.features, btn: { text: 'Pilih Paket', href: '/contact' }, highlighted: true },
    { name: service.pricing.enterprise.name, info: service.pricing.enterprise.description, price: service.pricing.enterprise.price, features: service.pricing.enterprise.features, btn: { text: 'Hubungi Kami', href: '/contact' } },
  ]

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-background pb-14 pt-12 sm:pb-16 sm:pt-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowUpRight className="size-3.5 rotate-180 transition-transform group-hover:translate-x-1" />
            Back to services
          </Link>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
            Managed Service · Per Bulan
          </p>
          <div className="flex items-center gap-4">
            <AnimatedHeading
              as="h1"
              className="max-w-3xl text-balance font-medium text-4xl tracking-[-0.04em] md:text-5xl"
              text={service.title}
            />
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {service.description}
          </p>
          <div className="mt-1 flex flex-wrap gap-3">
            <ConsultCta label="Konsultasi gratis" cal={cal} />
            <a
              href="#paket"
              className="inline-flex items-center gap-1.5 border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/40 active:scale-[0.98]"
            >
              Lihat paket
            </a>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section id="paket" className="bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 border-b border-border pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Paket sudah termasuk
            </p>
            <AnimatedHeading
              className="mt-3 text-balance font-medium text-2xl tracking-tight md:text-3xl"
              highlightWords={['termasuk']}
              text={`Semua yang sudah termasuk`}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((b, i) => (
              <div key={b.title} className="flex h-full flex-col gap-3 border border-border bg-background p-6">
                <span className="flex size-9 items-center justify-center border border-border bg-muted/40 text-foreground/80">
                  <Check className="size-4" />
                </span>
                <h3 className="font-medium tracking-[-0.02em] text-foreground">{b.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                <span className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing (per month) */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
        <PricingSection
          plans={pricingPlans}
          title={`Paket ${service.title}`}
          description="Harga berlangganan bulanan — transparan, tanpa biaya tersembunyi."
        />
      </section>

      {/* SLA guarantees */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 border-b border-border pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Jaminan layanan
            </p>
            <AnimatedHeading
              className="mt-3 text-balance font-medium text-2xl tracking-tight md:text-3xl"
              text="SLA yang kami pegang"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => (
              <div key={g.title} className="flex h-full flex-col gap-3 border border-border bg-background p-6">
                <g.icon className="size-5 text-primary" />
                <h3 className="font-medium tracking-[-0.02em] text-foreground">{g.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to start */}
      <section className="border-t border-border bg-background py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 border-b border-border pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Cara mulai
            </p>
            <AnimatedHeading
              className="mt-3 text-balance font-medium text-2xl tracking-tight md:text-3xl"
              text="Mulai dalam 3 langkah"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {howItWorks.map((step) => (
              <div key={step.n} className="flex flex-col gap-3 border border-border bg-background p-6">
                <span className="font-mono text-[11px] text-muted-foreground">{step.n}</span>
                <h3 className="font-medium tracking-[-0.02em] text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <ConsultCta label="Coba konsultasi gratis" cal={cal} />
          </div>
        </div>
      </section>
    </>
  )
}