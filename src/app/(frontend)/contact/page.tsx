import { getCmsSiteSettings } from '@/lib/cms-data'
import { PageHero } from '@/components/frontend/page-hero'
import ContactClient from '@/components/frontend/contact-client'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
  title: 'Hubungi Kami — Konsultasi Gratis',
  description:
    'Diskusikan ide digital kamu dengan tim Captiveau. Konsultasi gratis — dari landing page hingga platform kompleks.',
  path: '/contact',
  keywords: ['hubungi software house', 'konsultasi gratis', 'kontak captiveau'],
})
}

export default async function ContactPage() {
  const settings = await getCmsSiteSettings()

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Discuss Your Project"
        description="Tell us your vision — we'll help turn it into a real product. First consultation is free, no commitment."
      />
      <ContactClient settings={settings} />
    </>
  )
}
