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
      <HeroBentoSection homepage={data.homepage} />
      {/* Client logos — right under the hero */}
      <SocialProof homepage={data.homepage} />
      <FeaturesBentoSection services={data.services} />
      <FeaturesSeraSection features={data.homepage.advantages} />
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
        title={data.homepage.ctaTitle}
        subtitle={data.homepage.ctaSubtitle}
        buttonText={data.homepage.ctaButtonText}
      />
      <Faq faqs={data.faqs} categories={data.faqCategories} />
      <ContactSection settings={data.settings} />
    </>
  )
}
