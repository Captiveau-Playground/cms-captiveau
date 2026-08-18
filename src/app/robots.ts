import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const SITE_URL = await getSiteUrl()
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/next/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}