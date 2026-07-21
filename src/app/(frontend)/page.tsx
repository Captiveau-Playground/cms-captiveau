import HeroSection from '@/components/shadcn-space/blocks/hero-02/hero'
import AboutAndStats01 from '@/components/shadcn-space/blocks/about-us-01/index'
import Services from '@/components/shadcn-space/blocks/services-01/services'
import Feature01 from '@/components/shadcn-space/blocks/feature-01/index'
import Testimonial01 from '@/components/shadcn-space/blocks/testimonial-02'
import Portfolio from '@/components/shadcn-space/blocks/portfolio-01/portfolio'
import Blog from '@/components/shadcn-space/blocks/blog-01/blog'
import CTA from '@/components/shadcn-space/blocks/cta-02/cta'
import Faq from '@/components/shadcn-space/blocks/faq-01/faq'
import Contact from '@/components/shadcn-space/blocks/contact-01/index'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutAndStats01 />
      <Services />
      <Feature01 />
      <Testimonial01/>
      <Portfolio />
      <Blog />
      <CTA />
      <Faq />
      <Contact />
    </>
  )
}
