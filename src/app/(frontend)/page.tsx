import type { CmsHomepage } from '@/lib/cms-data'
import Hero from '@/components/frontend/home/hero'
import Trust from '@/components/frontend/home/trust'
import Services from '@/components/frontend/home/services'
import Advantages from '@/components/frontend/home/advantages'
import PortfolioShowcase from '@/components/frontend/home/portfolio'
import SocialProof from '@/components/frontend/home/social-proof'
import BlogPreview from '@/components/frontend/home/blog'
import Testimonials from '@/components/frontend/home/testimonials'
import Cta from '@/components/frontend/home/cta'
import Faq from '@/components/frontend/home/faq'
import ContactSection from '@/components/frontend/home/contact'
import { getHomeData } from '@/lib/cms-data'
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
      <Hero homepage={data.homepage} />
      <Trust points={data.homepage.trustPoints} />
      <Services services={data.services} />
      <Advantages advantages={data.homepage.advantages} />
      <PortfolioShowcase projects={data.projects} />
      <SocialProof homepage={data.homepage} />
      <BlogPreview articles={data.articles} />
      <Testimonials testimonials={data.testimonials} />
      <Cta homepage={data.homepage} />
      <Faq faqs={data.faqs} categories={data.faqCategories} />
      <ContactSection settings={data.settings} />
    </>
  )
}
