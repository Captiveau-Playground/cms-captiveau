import type { CmsHomepage } from '@/lib/cms-data'
import { HeroBentoSection } from '@/components/blocks/hero-bento'
import { FeaturesBentoSection } from '@/components/blocks/features-bento'
import { FeaturesSeraSection } from '@/components/blocks/why-us'
import { GalleryColumnsSection } from '@/components/blocks/gallery'
import SocialProof from '@/components/frontend/home/social-proof'
import { BlogSection } from '@/components/blocks/blog'
import { TestimonialsSeraSection } from '@/components/blocks/testimonials'
import { CtaSeraSection } from '@/components/blocks/cta'
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
