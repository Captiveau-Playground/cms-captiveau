import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { cache } from 'react'

const SITE_NAME = 'Captiveau'
const DEFAULT_HOST = 'https://cms-captiveau.mulaiplus.workers.dev'

export const DEFAULT_OG_IMAGE = '/logo.webp'

/**
 * Resolves the site origin from the incoming request host so canonical / OG /
 * Twitter URLs are correct on any domain (workers.dev or a custom domain).
 * Falls back to NEXT_PUBLIC_SERVER_URL (dev) or the default production host.
 */
export const getSiteUrl = cache(async (): Promise<string> => {
  try {
    const h = await headers()
    const host = h.get('host')
    if (host) {
      const proto = h.get('x-forwarded-proto') || 'https'
      return `${proto}://${host}`
    }
  } catch {
    // Outside request context (e.g. build-time) — fall through
  }
  return process.env.NEXT_PUBLIC_SERVER_URL || DEFAULT_HOST
})

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