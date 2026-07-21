import { getPayload } from 'payload'
import config from '@payload-config'
import type {
  Service,
  Article,
  Testimonial,
  TeamMember,
  JobListing,
  Faq,
  Page,
  SiteSetting,
  MainMenu,
} from '@/payload-types'

let _payload: Awaited<ReturnType<typeof getPayload>> | null = null

async function getPayloadClient() {
  if (!_payload) {
    _payload = await getPayload({ config })
  }
  return _payload
}

// ===== Site Settings =====
export async function getSiteSettings(): Promise<SiteSetting | null> {
  const payload = await getPayloadClient()
  try {
    const data = await payload.findGlobal({ slug: 'site-settings' })
    return data as unknown as SiteSetting
  } catch {
    return null
  }
}

// ===== Main Menu =====
export async function getMainMenu(): Promise<MainMenu | null> {
  const payload = await getPayloadClient()
  try {
    const data = await payload.findGlobal({ slug: 'main-menu' })
    return data as unknown as MainMenu
  } catch {
    return null
  }
}

// ===== Services =====
export async function getServices(): Promise<Service[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    sort: 'order',
    depth: 1,
  })
  return docs as unknown as Service[]
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    depth: 2,
  })
  return (docs[0] as unknown as Service) || null
}

// ===== Articles =====
export async function getArticles(limit = 10): Promise<Article[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'articles',
    where: { published: { equals: true } },
    sort: '-publishedDate',
    limit,
    depth: 1,
  })
  return docs as unknown as Article[]
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug }, published: { equals: true } },
    depth: 2,
  })
  return (docs[0] as unknown as Article) || null
}

// ===== Testimonials =====
export async function getTestimonials(): Promise<Testimonial[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'testimonials',
    sort: 'order',
    depth: 1,
  })
  return docs as unknown as Testimonial[]
}

// ===== Team Members =====
export async function getTeamMembers(): Promise<TeamMember[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'team-members',
    sort: 'order',
    depth: 1,
  })
  return docs as unknown as TeamMember[]
}

// ===== Job Listings =====
export async function getJobListings(): Promise<JobListing[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'job-listings',
    where: { isActive: { equals: true } },
    sort: '-postedDate',
  })
  return docs as unknown as JobListing[]
}

// ===== FAQs =====
export async function getFAQs(): Promise<Faq[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'faqs',
    sort: 'order',
  })
  return docs as unknown as Faq[]
}

// ===== Pages =====
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 2,
  })
  return (docs[0] as unknown as Page) || null
}
