import './globals.css'
import type { Metadata, Viewport } from 'next'
import { getSiteSettings, getServices } from '@/lib/cms'
import { getCmsMainMenu, type CmsNavItem } from '@/lib/cms-data'
import Navbar from '@/components/frontend/navbar'
import { FooterPromptHandoffSection, type FooterSectionProps } from '@/components/blocks/footer'
import Banner from '@/components/frontend/banner'
import Integrations from '@/components/frontend/integrations'
import { getSiteUrl } from '@/lib/seo'
import { JsonLd } from '@/components/frontend/jsonld'

// CMS-driven site: render on demand (Payload+D1 config can't be evaluated at
// build-time, so no ISR/prerender). Speed comes from in-worker data caching
// (see cms-data TTL cache) which serves repeats ~instantly.
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
      'jasa pembuatan website',
      'software house indonesia',
      'software house jakarta',
      'jasa pembuatan aplikasi',
      'jasa pembuatan company profile',
      'jasa pembuatan landing page',
      'web development indonesia',
      'jasa buat website',
      'digital agency indonesia',
      'ui ux design indonesia',
      'pembuatan e-commerce',
      'pengembangan aplikasi mobile',
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
    services: services.map((s) => ({ title: s.title, slug: s.slug, category: s.category })),
    quote: settings?.footer?.quote || undefined,
    statusLabel: settings?.footer?.statusLabel || undefined,
  }
  const footerPropsWithCal = { ...footerProps, cal: settings?.cal }

  const siteUrl = await getSiteUrl()

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings?.companyName || 'Captiveau',
    alternateName: 'Captiveau — Creative Tech Studio',
    description: settings?.description || undefined,
    url: siteUrl,
    logo: `${siteUrl}/logo.webp`,
    email: email || undefined,
    telephone: phone || undefined,
    address:
      settings?.address && settings.address.city
        ? {
            '@type': 'PostalAddress',
            streetAddress: settings.address.street || undefined,
            addressLocality: settings.address.city || undefined,
            addressRegion: settings.address.region || undefined,
            postalCode: settings.address.postalCode || undefined,
            addressCountry: settings.address.country || 'ID',
          }
        : undefined,
    areaServed: 'ID',
    contactPoint: email
      ? {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: email || undefined,
          telephone: phone || undefined,
          availableLanguage: ['Indonesian', 'English'],
        }
      : undefined,
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
      <head>
        <link rel="preload" href="/fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <JsonLd data={orgSchema} />
        <JsonLd data={websiteSchema} />
        <Integrations analytics={settings?.analytics} cal={settings?.cal} />
        <div className="min-h-screen flex flex-col">
          {/* Banner + navbar as one sticky unit — banner sits ABOVE the nav,
              never overlapping it (navbar is in-flow, not fixed). */}
          <div className="sticky top-0 z-50">
            <Banner banner={settings?.banner} />
            <Navbar navData={navData} serviceItems={services} />
          </div>
          <main className="flex-1">{children}</main>
          <FooterPromptHandoffSection {...footerPropsWithCal} />
        </div>
      </body>
    </html>
  )
}
