import './globals.css'
import type { Metadata, Viewport } from 'next'
import { getSiteSettings, getServices } from '@/lib/cms'
import { getCmsMainMenu, type CmsNavItem } from '@/lib/cms-data'
import Navbar from '@/components/frontend/navbar'
import { FooterPromptHandoffSection, type FooterSectionProps } from '@/components/footer-section'
import Banner from '@/components/frontend/banner'
import Integrations from '@/components/frontend/integrations'
import { getSiteUrl } from '@/lib/seo'
import { JsonLd } from '@/components/frontend/jsonld'

// CMS-driven site: always render on demand so admin edits & new content show
// immediately (no build-time prerendering is cached).
export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ff6600',
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const siteUrl = await getSiteUrl()
  const title = `${settings?.companyName || 'Captiveau'} — Creative Tech Studio`
  const description =
    settings?.description ||
    'Software house Indonesia spesialis digital product design & development.'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${settings?.companyName || 'Captiveau'}`,
    },
    description,
    alternates: { canonical: '/' },
    verification:
      settings?.analytics?.gscVerification
        ? { google: settings.analytics.gscVerification }
        : undefined,
    keywords: [
      'software house indonesia',
      'jasa pembuatan website',
      'jasa pembuatan aplikasi',
      'web development indonesia',
      'ui ux design',
      'e-commerce development',
      'digital product agency',
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: siteUrl,
      siteName: settings?.companyName || 'Captiveau',
      title,
      description,
      images: [{ url: `${siteUrl}/logo.webp`, width: 512, height: 512, alt: 'Captiveau' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/logo.webp`],
    },
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [settings, , services, navData] = await Promise.all([
    getSiteSettings(),
    Promise.resolve(null),
    getServices().catch(() => []),
    getCmsMainMenu(),
  ])

  // Contact info from settings
  const email =
    settings?.contacts?.find((c) => c.type === 'email')?.value ??
    'hello@captiveau.id'
  const phone =
    settings?.contacts?.find(
      (c) => c.type === 'whatsapp' || c.type === 'phone'
    )?.value ?? undefined
  const address =
    settings?.address &&
    [settings.address.street, settings.address.city, settings.address.region]
      .filter(Boolean)
      .join(', ')

  const footerProps: FooterSectionProps = {
    companyName: settings?.companyName || undefined,
    email,
    phone,
    address,
    socialLinks: settings?.socialLinks || [],
    navData,
    services: services.map((s) => ({ title: s.title, slug: s.slug })),
    quote: settings?.footer?.quote || undefined,
    statusLabel: settings?.footer?.statusLabel || undefined,
  }

  const siteUrl = await getSiteUrl()

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings?.companyName || 'Captiveau',
    description: settings?.description || undefined,
    url: siteUrl,
    logo: `${siteUrl}/logo.webp`,
    email: email || undefined,
    sameAs: (settings?.socialLinks || []).map((s) => s.url).filter(Boolean),
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings?.companyName || 'Captiveau',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="id">
      <body>
        <JsonLd data={orgSchema} />
        <JsonLd data={websiteSchema} />
        <Integrations analytics={settings?.analytics} />
        <div className="min-h-screen flex flex-col">
          {/* Banner + navbar as one sticky unit — banner sits ABOVE the nav,
              never overlapping it (navbar is in-flow, not fixed). */}
          <div className="sticky top-0 z-50">
            <Banner banner={settings?.banner} />
            <Navbar navData={navData} />
          </div>
          <main className="flex-1">{children}</main>
          <FooterPromptHandoffSection {...footerProps} />
        </div>
      </body>
    </html>
  )
}
