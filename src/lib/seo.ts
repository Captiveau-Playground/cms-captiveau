import type { Metadata } from 'next'

const SITE_NAME = 'Captiveau'
const DEFAULT_HOST = 'https://cms-captiveau.mulaiplus.workers.dev'

export const DEFAULT_OG_IMAGE = '/logo.webp'

/**
 * Stable site origin. Kept constant (not request-header based) so metadata
 * generation is safe during build-time static generation — which lets us use
 * ISR edge caching. Set NEXT_PUBLIC_SERVER_URL at build to override the host.
 */
export const getSiteUrl = () =>
  Promise.resolve(process.env.NEXT_PUBLIC_SERVER_URL || DEFAULT_HOST)

type SeoInput = {
  title: string
  description?: string
  image?: string | null
  path?: string
  type?: 'website' | 'article'
  publishedTime?: string
  authors?: string[]
  keywords?: string[]
  noindex?: boolean
}

/** Builds complete, production-grade Next.js metadata (OG, Twitter, canonical, robots). */
export async function buildMetadata(input: SeoInput): Promise<Metadata> {
  const {
    title,
    description,
    image = DEFAULT_OG_IMAGE,
    path = '/',
    type = 'website',
    publishedTime,
    authors,
    keywords,
    noindex,
  } = input

  const siteUrl = await getSiteUrl()
  const canonical = path === '/' ? siteUrl : `${siteUrl}${path}`
  const absolute = (u: string) => (u.startsWith('http') ? u : `${siteUrl}${u}`)
  const images = image
    ? [{ url: absolute(image), width: 1200, height: 630, alt: title }]
    : undefined

  return {
    title,
    description,
    alternates: { canonical },
    keywords: keywords?.length ? keywords : undefined,
    robots: {
      index: !noindex,
      follow: true,
      googleBot: { index: !noindex, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      type,
      locale: 'id_ID',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description: description || undefined,
      images,
      ...(type === 'article' && publishedTime ? { article: { publishedTime } } : {}),
      ...(authors?.length ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || undefined,
      images: image ? [absolute(image)] : undefined,
    },
  }
}

export { SITE_NAME }