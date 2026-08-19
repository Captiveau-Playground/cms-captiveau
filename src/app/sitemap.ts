import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getSiteUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const SITE_URL = await getSiteUrl()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/career`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/faq`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Dynamic: services
  const services = await payload.find({
    collection: 'services',
    limit: 100,
    select: { slug: true, updatedAt: true },
  })
  const serviceRoutes: MetadataRoute.Sitemap = services.docs.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: s.updatedAt || undefined,
  }))

  // Dynamic: projects
  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
    select: { slug: true, updatedAt: true },
  })
  const projectRoutes: MetadataRoute.Sitemap = projects.docs.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: p.updatedAt || undefined,
  }))

  // Dynamic: published articles
  const articles = await payload.find({
    collection: 'articles',
    where: { published: { equals: true } },
    limit: 100,
    select: { slug: true, publishedDate: true, updatedAt: true },
  })
  const articleRoutes: MetadataRoute.Sitemap = articles.docs.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    lastModified: a.updatedAt || a.publishedDate || undefined,
  }))

  // Dynamic: published promotions
  const promotions = await payload.find({
    collection: 'promotions',
    where: { status: { equals: 'published' } },
    limit: 100,
    select: { slug: true, updatedAt: true },
  })
  const promoRoutes: MetadataRoute.Sitemap = promotions.docs.map((p) => ({
    url: `${SITE_URL}/promo/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: p.updatedAt || undefined,
  }))

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...articleRoutes,
    ...promoRoutes,
  ]
}