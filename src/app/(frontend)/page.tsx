import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { CmsHomepage } from '@/lib/cms-data'

const HeroBentoSection = dynamic(() => import('@/components/blocks/hero-bento').then((m) => m.HeroBentoSection), { ssr: true })
const FeaturesBentoSection = dynamic(() => import('@/components/blocks/features-bento').then((m) => m.FeaturesBentoSection), { ssr: true })
const FeaturesSeraSection = dynamic(() => import('@/components/blocks/why-us').then((m) => m.FeaturesSeraSection), { ssr: true })
const GalleryColumnsSection = dynamic(() => import('@/components/blocks/gallery').then((m) => m.GalleryColumnsSection), { ssr: true })
const SocialProof = dynamic(() => import('@/components/frontend/home/social-proof'), { ssr: true })
const BlogSection = dynamic(() => import('@/components/blocks/blog').then((m) => m.BlogSection), { ssr: true })
const TestimonialsSeraSection = dynamic(() => import('@/components/blocks/testimonials').then((m) => m.TestimonialsSeraSection), { ssr: true })
const CtaSeraSection = dynamic(() => import('@/components/blocks/cta').then((m) => m.CtaSeraSection), { ssr: true })
const Faq = dynamic(() => import('@/components/frontend/home/faq'), { ssr: true })
const ContactSection = dynamic(() => import('@/components/frontend/home/contact'), { ssr: true })
import { getHomeData } from '@/lib/cms-data'
import { formatDateLong } from '@/lib/date'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getHomeData()
  return buildMetadata({
    title: `${settings?.companyName || 'Captiveau'} — Creative Tech Studio`,
    description:
      settings?.description ||
      'Software house Indonesia spesialis digital product design & development.',
    path: '/',
    type: 'website',
    keywords: [
      'software house indonesia',
      'jasa pembuatan website',
      'digital product agency',
      'ui ux design indonesia',
    ],
  })
}
export default async function HomePage() {
  const data = await getHomeData()

  return (
    <>
      <HeroBentoSection homepage={data.homepage} cal={data.settings.cal} />
      {/* Client logos — right under the hero */}
      <SocialProof homepage={data.homepage} />
      <FeaturesBentoSection
        services={data.services.filter((svc: any) => svc.category !== 'managed')}
      />
      <FeaturesSeraSection features={data.homepage.advantages} />
      {/* Managed & ongoing services */}
      {data.services.some((svc: any) => svc.category === 'managed') && (
        <section className="bg-primary">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground/80">
                Managed & Ongoing
              </p>
              <h2 className="mt-3 text-balance font-medium text-2xl tracking-tight text-white md:text-3xl">
                Butuh kelola website, server, email, atau Google Workspace?
              </h2>
              <p className="mt-3 text-sm text-white/85 md:text-base">
                Layanan langganan bulanan — kami urus infrastruktur & komunikasi
                kamu berkelanjutan.
              </p>
            </div>
            <Link
              href="/services"
              className="group inline-flex w-fit shrink-0 items-center gap-1.5 border border-white/40 bg-white px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-background active:scale-[0.98]"
            >
              Lihat layanan managed
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>
      )}

      <GalleryColumnsSection
        projects={data.projects}
        metrics={data.homepage.stats.slice(0, 3).map((s) => ({
          value: `${s.value}${s.suffix}`,
          label: s.label,
        }))}
      />
      <BlogSection
        posts={data.articles.map((a: any) => ({
          title: a.title,
          slug: a.slug || '',
          category: a.category,
          date: a.date ? formatDateLong(a.date) : '',
          excerpt: a.excerpt,
          image: a.image,
        }))}
      />
      <TestimonialsSeraSection testimonials={data.testimonials} />
      <CtaSeraSection
        cal={data.settings.cal}
        title={data.homepage.ctaTitle}
        subtitle={data.homepage.ctaSubtitle}
        buttonText={data.homepage.ctaButtonText}
      />
      <Faq faqs={data.faqs} categories={data.faqCategories} cal={data.settings.cal} />
      <ContactSection settings={data.settings} />
    </>
  )
}
