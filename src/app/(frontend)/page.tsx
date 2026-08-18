import type { CmsHomepage } from '@/lib/cms-data'
import { HeroBentoSection } from '@/components/hero-bento-section'
import { FeaturesBentoSection } from '@/components/features-bento-section'
import { FeaturesSeraSection } from '@/components/features-section'
import { GalleryColumnsSection } from '@/components/gallery-section'
import SocialProof from '@/components/frontend/home/social-proof'
import { BlogSection } from '@/components/blog-section'
import { TestimonialsSeraSection } from '@/components/testimonials-section'
import { CtaSeraSection } from '@/components/cta-section'
import Faq from '@/components/frontend/home/faq'
import ContactSection from '@/components/frontend/home/contact'
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
