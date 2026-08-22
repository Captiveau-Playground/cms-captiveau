import { getPayload } from 'payload'
import config from '@payload-config'
import type {
  Service,
  Project,
  Article,
  Testimonial,
  TeamMember,
  JobListing,
  Faq,
  Homepage,
  SiteSetting,
  MainMenu,
} from '@/payload-types'

// ── Fallback static data (same shapes, used when CMS is empty/unavailable) ──
import {
  site as siteFallback,
  services as servicesFallback,
  projects as projectsFallback,
  articles as articlesFallback,
  testimonials as testimonialsFallback,
  values as valuesFallback,
  team as teamFallback,
  process as processFallback,
  faqs as faqsFallback,
  jobs as jobsFallback,
  trustPoints as trustPointsFallback,
  advantages as advantagesFallback,
  stats as statsFallback,
  type ServiceItem,
  type Project as ProjectItem,
  type TestimonialItem,
  type TeamMember as TeamMemberItem,
} from './content'


let _payload: Awaited<ReturnType<typeof getPayload>> | null = null

// ── TTL cache ─────────────────────────────────────────
// Cheap in-request/process cache so repeated renders of the same data within
// TTL_MS skip the Payload/D1 query — gives ISR-like latency on a warm worker
// without any build-time static generation (which Payload config can't do).
const DATA_TTL_MS = 60_000
const cacheStore = new Map<string, { value: unknown; expires: number }>()

async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const now = Date.now()
  const hit = cacheStore.get(key)
  if (hit && hit.expires > now) return hit.value as T
  const value = await fn()
  cacheStore.set(key, { value, expires: now + DATA_TTL_MS })
  return value
}

export function clearCmsCache() {
  cacheStore.clear()
}


async function getPayloadClient() {
  if (!_payload) {
    _payload = await getPayload({ config })
  }
  return _payload
}

function isMedia(obj: any): obj is { url?: string | null; sizes?: any } {
  return obj && typeof obj === 'object' && 'url' in obj
}

/**
 * Strips dev/localhost origins that can leak into runtime via a baked
 * PAYLOAD_PUBLIC_SERVER_URL — always serve media same-origin so images load
 * regardless of environment/env baking mistakes.
 */
function normalizeMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url, 'https://cms-captiveau.mulaiplus.workers.dev')
    if (
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1' ||
      parsed.hostname === '0.0.0.0' ||
      parsed.port === '4000'
    ) {
      return parsed.pathname + parsed.search + parsed.hash
    }
    return url
  } catch {
    return url
  }
}

function mediaUrl(media: any, size?: string): string | null {
  if (!media) return null
  if (typeof media === 'number') return null
  const sizes = (media as any)?.sizes
  const target = size ? sizes?.[size] : null
  return normalizeMediaUrl(target?.url) || normalizeMediaUrl(media?.url) || null
}

// ═══════════════════════════════════════════════════════
// Main Menu (nav)
// ═══════════════════════════════════════════════════════
export type CmsNavItem = {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

const defaultMenu: CmsNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
]

async function _cached_getCmsMainMenu(): Promise<CmsNavItem[]> {
  try {
    const payload = await getPayloadClient()
    const data = (await payload.findGlobal({
      slug: 'main-menu',
    })) as unknown as MainMenu | null
    const items = (data?.items ?? [])
      .filter((item) => item.label && item.href)
      .slice()
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
      .map((item) => ({
        label: item.label,
        href: item.href,
        children: (item.children ?? [])
          .filter((c) => c.label && c.href)
          .map((c) => ({
            label: c.label,
            href: c.href,
            description: c.description || undefined,
          })),
      }))
    if (items.length > 0) return items
  } catch {
    // fall through to default
  }
  return defaultMenu
}

// ═══════════════════════════════════════════════════════
// Site settings
// ═══════════════════════════════════════════════════════
async function _cached_getCmsSiteSettings() {
  try {
    const payload = await getPayloadClient()
    const data = (await payload.findGlobal({ slug: 'site-settings' })) as unknown as SiteSetting
    const email = data?.contacts?.find((c) => c.type === 'email')?.value ?? siteFallback.email
    const whatsapp =
      data?.contacts?.find((c) => c.type === 'whatsapp')?.value ?? siteFallback.whatsapp
    const phone = data?.contacts?.find((c) => c.type === 'phone')?.value ?? siteFallback.phone
    return {
      companyName: data?.companyName || siteFallback.companyName,
      tagline: data?.tagline || siteFallback.tagline,
      description: data?.description || siteFallback.description,
      email,
      phone,
      whatsapp,
      socials: (data?.socialLinks || []).map((s) => ({ platform: s.platform, url: s.url || '' })),
      address:
        data?.address && data.address.city
          ? `${data.address.street || ''}, ${data.address.city || ''}${data.address.region ? ', ' + data.address.region : ''}`.replace(/^,\s/, '')
          : siteFallback.address,
      banner: data?.banner || null,
      analytics: data?.analytics || null,
      footer: data?.footer || null,
      cal: data?.cal || null,
      contactOptions: data?.contactOptions || null,
    }
  } catch {
    return siteFallback
  }
}

export type CmsSiteSettings = Awaited<ReturnType<typeof getCmsSiteSettings>>

// ═══════════════════════════════════════════════════════
// Services
// ═══════════════════════════════════════════════════════
async function _cached_getCmsServices(): Promise<ServiceItem[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'services',
      sort: 'order',
      depth: 1,
    })
    if (!docs.length) return servicesFallback
    return docs.map((s: any) => ({
      slug: s.slug,
      category: s.category || 'project',
      index: String(s.order ?? 0).padStart(2, '0'),
      title: s.title,
      tagline: s.subtitle || '',
      description: s.description || '',
      icon: s.icon || 'layout',
      image: mediaUrl(s.image) || '/images/landing.jpg',
      highlights: (s.usp || []).slice(0, 3).map((u: any) => u.title).filter(Boolean),
      intro: s.introduction?.root?.children?.map((n: any) =>
        n.children?.map((c: any) => c.text).join(''),
      ).join('\n') || s.description || '',
      introductionRichText: s.introduction || null,
      benefits: (s.keyBenefits || []).map((b: any) => ({
        icon: b.icon || 'check-circle',
        title: b.title,
        description: b.description || '',
      })),
      process: (s.process || []).map((p: any, i: number) => ({
        step: String(p.step ?? i + 1).padStart(2, '0'),
        title: p.title,
        description: p.description || '',
        icon: p.icon || 'arrow-right',
      })),
      technologies: (s.technologies || []).map((t: any) => t.name).filter(Boolean),
      pricing: {
        basic: mapPlan(s.pricingPlans?.basic),
        best: mapPlan(s.pricingPlans?.bestDeal),
        enterprise: mapPlan(s.pricingPlans?.enterprise),
      },
    }))
  } catch {
    return servicesFallback
  }
}

function mapPlan(plan: any) {
  return {
    name: plan?.name || 'Plan',
    price: plan?.price || '',
    description: plan?.description || '',
    features: (plan?.features || []).map((f: any) => f.feature).filter(Boolean),
  }
}

export async function getCmsServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const all = await getCmsServices()
  return all.find((s) => s.slug === slug) || null
}

// ═══════════════════════════════════════════════════════
// Projects (portfolio)
// ═══════════════════════════════════════════════════════
async function _cached_getCmsProjects(): Promise<ProjectItem[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'projects',
      sort: 'order',
      depth: 1,
    })
    if (!docs.length) return projectsFallback
    return docs.map((p: any) => ({
      slug: p.slug,
      title: p.title,
      image: mediaUrl(p.image) || '/client/amertavana.webp',
      tags: (p.tags || []).map((t: any) => t.tag).filter(Boolean),
      description: p.description || '',
      size: p.size === 'large' ? 'large' : 'small',
      category: p.category || '',
      year: p.year || '',
      services: (p.services || []).map((s: any) => s.service).filter(Boolean),
      results: (p.results || []).map((r: any) => ({ value: r.value || '', label: r.label || '' })),
      stack: (p.stack || []).map((t: any) => t.tech).filter(Boolean),
      integrations: (p.integrations || []).map((i: any) => i.name).filter(Boolean),
      story: (p.story || [])
        .filter((s: any) => s.heading)
        .map((s: any) => ({
          heading: s.heading,
          description: s.description || '',
          image: mediaUrl(s.image, 'hero') || mediaUrl(s.image) || null,
        })),
    }))
  } catch {
    return projectsFallback
  }
}

export async function getCmsProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const all = await getCmsProjects()
  return all.find((p) => p.slug === slug) || null
}

// ═══════════════════════════════════════════════════════
// Articles
// ═══════════════════════════════════════════════════════
async function _cached_getCmsArticles() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'articles',
      where: { published: { equals: true } },
      sort: '-publishedDate',
      limit: 12,
      depth: 1,
    })
    if (!docs.length) return articlesFallback
    return docs.map((a: any) => ({
      title: a.title,
      slug: a.slug,
      category: (a.tags || [])[0]?.tag || 'Blog',
      author: a.author || null,
      date: a.publishedDate?.slice(0, 10) || a.createdAt?.slice(0, 10) || '',
      readTime: `${a.readingTime || 5} min read`,
      excerpt: a.description || '',
      image: mediaUrl(a.coverImage, 'card') || mediaUrl(a.coverImage) || '/images/office.jpg',
    }))
  } catch {
    return articlesFallback
  }
}

/**
 * Full article document (rich text preserved) for the detail page.
 * `draft: true` (enabled by preview mode) returns the latest version even
 * when the article has not been published yet.
 */
export async function getCmsArticleBySlug(
  slug: string,
  opts: { draft?: boolean } = {},
) {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'articles',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
      draft: opts.draft,
      ...(opts.draft ? { overrideAccess: true } : {}),
    })
    const a = docs[0] as any
    if (!a) return null
    return {
      title: a.title,
      description: a.description || '',
      slug: a.slug,
      category: (a.tags || [])[0]?.tag || 'Blog',
      date: a.publishedDate?.slice(0, 10) || a.createdAt?.slice(0, 10) || '',
      readTime: a.readingTime || null,
      image: mediaUrl(a.coverImage, 'hero') || mediaUrl(a.coverImage) || null,
      author: a.author || null,
      content: a.content || null,
    }
  } catch {
    return null
  }
}

// ═══════════════════════════════════════════════════════
// Testimonials
// ═══════════════════════════════════════════════════════
async function _cached_getCmsTestimonials(): Promise<TestimonialItem[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'testimonials',
      sort: 'order',
      depth: 1,
    })
    if (!docs.length) return testimonialsFallback
    return docs.map((t: any, i: number) => {
      const [name, company = ''] = (t.role || '').split(' di ')
      return {
        name: t.name,
        role: name.trim(),
        company: company.trim() || 'Client',
        quote: t.text,
        avatar: mediaUrl(t.avatar, 'thumbnail') || `https://i.pravatar.cc/150?img=${10 + i}`,
      }
    })
  } catch {
    return testimonialsFallback
  }
}

// ═══════════════════════════════════════════════════════
// Team
// ═══════════════════════════════════════════════════════
const teamColors = ['bg-blue-600', 'bg-amber-500', 'bg-purple-600', 'bg-emerald-600', 'bg-cyan-600', 'bg-rose-600']

async function _cached_getCmsTeam(): Promise<TeamMemberItem[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'team-members',
      sort: 'order',
      depth: 1,
    })
    if (!docs.length) return teamFallback
    return docs.map((m: any, i: number) => ({
      name: m.name,
      role: m.role || '',
      initials: m.name.split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase(),
      color: teamColors[i % teamColors.length],
    }))
  } catch {
    return teamFallback
  }
}

// ═══════════════════════════════════════════════════════
// Jobs
// ═══════════════════════════════════════════════════════
async function _cached_getCmsJobs() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'job-listings',
      where: { isActive: { equals: true } },
      sort: '-postedDate',
    })
    if (!docs.length) return jobsFallback
    return docs.map((j: any) => ({
      title: j.title,
      type: j.type === 'internship' ? 'Internship' : 'Full-time',
      location: j.location || 'Remote / Jakarta',
      salary: j.salary || '',
      desc: j.description?.root?.children?.map((n: any) =>
        n.children?.map((c: any) => c.text).join(''),
      ).join(' ') || '',
      tags: (j.requirements || []).slice(0, 4).map((r: any) => r.requirement).filter(Boolean),
    }))
  } catch {
    return jobsFallback
  }
}

// ═══════════════════════════════════════════════════════
// FAQs
// ═══════════════════════════════════════════════════════
const faqCategoryLabel: Record<string, string> = {
  general: 'General',
  technical: 'Technical',
  pricing: 'Pricing',
  support: 'Support',
}

async function _cached_getCmsFaqs() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'faqs',
      sort: 'order',
    })
    if (!docs.length) return { faqs: faqsFallback, categories: ['All', 'General', 'Technical', 'Pricing', 'Support'] }
    const mapped = docs.map((f: any) => ({
      title: f.question,
      content: f.answer?.root?.children?.map((n: any) =>
        n.children?.map((c: any) => c.text).join(''),
      ).join('\n') || '',
      category: faqCategoryLabel[f.category] || 'General',
    }))
    const cats = Array.from(new Set(['All', ...mapped.map((m) => m.category)]))
    return { faqs: mapped, categories: cats }
  } catch {
    return { faqs: faqsFallback, categories: ['All', 'General', 'Technical', 'Pricing', 'Support'] }
  }
}

// ═══════════════════════════════════════════════════════
// Homepage global
// ═══════════════════════════════════════════════════════
async function _cached_getCmsHomepage() {
  try {
    const payload = await getPayloadClient()
    const data = (await payload.findGlobal({ slug: 'homepage', depth: 1 })) as unknown as Homepage
    if (!data?.heroTitlePrefix) return null

    const logos = (data.socialProofLogos || [])
      .map((l: any) => mediaUrl(l.logo))
      .filter(Boolean)

    return {
      heroBadge: data.heroBadge || 'Now accepting new projects',
      heroTitlePrefix: data.heroTitlePrefix || 'We build',
      heroSpecialties: (data.heroSpecialties || []).map((s: any) => s.text).filter(Boolean),
      heroTitleSuffix: data.heroTitleSuffix || 'that convert.',
      heroSubtitle: data.heroSubtitle || '',
      heroImage: mediaUrl(data.heroImages),
      stats: (data.stats || []).map((s: any) => ({ value: s.value, suffix: s.suffix || '', label: s.label })),
      techStack: (data.techStack || []).map((t: any) => t.name).filter(Boolean),
      trustPoints: (data.trustPoints || []).map((t: any) => ({ icon: t.icon || 'users', title: t.title, desc: t.description || '' })),
      advantages: (data.advantages || []).length
        ? (data.advantages || []).map((a: any) => ({ icon: a.icon || 'eye', title: a.title, desc: a.description || '' }))
        : advantagesFallback.map((a: any) => ({ icon: a.icon, title: a.title, desc: a.desc })),
      process: (data.process || []).map((p: any, i: number) => ({
        step: p.step || String(i + 1).padStart(2, '0'),
        title: p.title,
        desc: p.description || '',
        icon: p.icon || 'arrow-right',
      })),
      socialProofLabel: data.socialProofLabel || 'Dipercaya klien di berbagai industri',
      socialProofDescription: data.socialProofDescription || '',
      socialProofLogos: logos,
      values: (data.values || []).map((v: any) => ({ icon: v.icon || 'star', title: v.title, desc: v.description || '' })),
    }
  } catch {
    return null
  }
}

export type CmsHomepage = NonNullable<Awaited<ReturnType<typeof getCmsHomepage>>>

// ══════════════════════════════════════════════════════
// Page CTAs (per-page Call-to-Action, managed in CMS via the `page-ctas` global)
// ══════════════════════════════════════════════════════
export type CmsPageCta = {
  enabled: boolean
  title: string
  subtitle: string
  primary: { label: string; href: string; useCal: boolean }
  secondary: { label: string; href: string } | null
}

const defaultPageCtas: Record<string, CmsPageCta> = {
  home: {
    enabled: true,
    title: "Let's Start Collaborating.",
    subtitle: 'Your digital idea is ready to become a real product. Get a free consultation with our team.',
    primary: { label: 'Free Consultation', href: '/contact', useCal: true },
    secondary: { label: 'Lihat Portofolio', href: '/portfolio' },
  },
  about: {
    enabled: true,
    title: 'Interested in working together?',
    subtitle: "Let's discuss your project — the first consultation is free.",
    primary: { label: 'Contact Us', href: '/contact', useCal: false },
    secondary: null,
  },
  services: {
    enabled: true,
    title: 'Not sure where to start?',
    subtitle: 'Get a free consultation to map out your needs — no strings attached.',
    primary: { label: 'Free Consultation', href: '/contact', useCal: false },
    secondary: null,
  },
  serviceDetail: {
    enabled: true,
    title: '',
    subtitle: 'Konsultasi gratis — ceritakan ide kamu, kami kasih estimasi & rencana kerja yang jelas.',
    primary: { label: 'Konsultasi Gratis', href: '/contact', useCal: true },
    secondary: null,
  },
  portfolio: {
    enabled: true,
    title: 'Punya proyek serupa?',
    subtitle: 'Jadilah klien berikutnya. Konsultasi gratis, tanpa komitmen.',
    primary: { label: 'Hubungi Kami', href: '/contact', useCal: false },
    secondary: null,
  },
  projectDetail: {
    enabled: true,
    title: 'Want similar results for your business?',
    subtitle: "Tell us what you need — we're ready to help from idea to launch.",
    primary: { label: 'Start Your Project', href: '/contact', useCal: false },
    secondary: null,
  },
  blogPost: {
    enabled: true,
    title: 'Punya proyek serupa?',
    subtitle: 'Ceritakan ide kamu — tim kami siap membantu dari riset hingga rilis.',
    primary: { label: 'Konsultasi Gratis', href: '/contact', useCal: false },
    secondary: null,
  },
  faq: {
    enabled: true,
    title: 'Still have questions?',
    subtitle: "We're here to help. Contact our team and get an answer within 24 hours.",
    primary: { label: 'Contact Us', href: '/contact', useCal: false },
    secondary: null,
  },
}

async function _cached_getPageCtas(): Promise<Record<string, CmsPageCta>> {
  try {
    const payload = await getPayloadClient()
    const data = (await payload.findGlobal({ slug: 'page-ctas' })) as any
    const map: Record<string, CmsPageCta> = {}
    for (const item of data?.items || []) {
      if (!item?.pageKey) continue
      map[item.pageKey] = {
        enabled: item.enabled !== false,
        title: item.title || '',
        subtitle: item.subtitle || '',
        primary: {
          label: item.primaryCta?.label || 'Hubungi Kami',
          href: item.primaryCta?.href || '/contact',
          useCal: !!item.primaryCta?.useCal,
        },
        secondary: item.secondaryCta?.label
          ? { label: item.secondaryCta.label, href: item.secondaryCta.href || '/contact' }
          : null,
      }
    }
    return map
  } catch {
    return {}
  }
}

// ═══════════════════════════════════════════════════════
// Combined fallback resolver: returns CMS data or the static source
// ═══════════════════════════════════════════════════════
export async function getHomeData() {
  const [homepage, services, projects, articles, testimonials, team, jobs, faq, settings] =
    await Promise.all([
      getCmsHomepage(),
      getCmsServices(),
      getCmsProjects(),
      getCmsArticles(),
      getCmsTestimonials(),
      getCmsTeam(),
      getCmsJobs(),
      getCmsFaqs(),
      getCmsSiteSettings(),
    ])

  return {
    homepage:
      homepage ??
      ({
        heroBadge: 'Now accepting new projects',
        heroTitlePrefix: 'We build',
        heroSpecialties: ['digital products', 'company profiles', 'e-commerce platforms', 'web & mobile apps', 'SaaS dashboards'],
        heroTitleSuffix: 'that convert.',
        heroSubtitle: siteFallback.description,
        heroImage: '/images/team.jpg',
        stats: statsFallback,
        techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
        trustPoints: trustPointsFallback.map((t) => ({ icon: t.icon, title: t.title, desc: t.desc })),
        advantages: advantagesFallback.map((a) => ({ icon: a.icon, title: a.title, desc: a.desc })),
        process: processFallback,
        socialProofLabel: 'Dipercaya klien di berbagai industri',
        socialProofDescription: 'The modern stack our team uses to ship world-class digital products.',
        socialProofLogos: ['/logos/nvidia.svg', '/logos/supabase.svg', '/logos/github.svg', '/logos/openai.svg', '/logos/turso.svg', '/logos/clerk.svg', '/logos/claude.svg', '/logos/vercel.svg'],
        values: valuesFallback.map((v) => ({ icon: v.icon, title: v.title, desc: v.desc })),
      } as unknown as CmsHomepage),
    services,
    projects,
    articles,
    testimonials,
    team,
    jobs,
    faqs: faq.faqs,
    faqCategories: faq.categories,
    settings,
  }
}

export type HomeData = Awaited<ReturnType<typeof getHomeData>>

// ═══════════════════════════════════════════════════════
// Promotions (promo landing pages)
// ═══════════════════════════════════════════════════════
export type CmsPromotion = {
  slug: string
  eyebrow: string
  badge?: string
  headline: string
  subheadline?: string
  cta: { type?: string | null; label?: string | null }
  offerTitle?: string
  offerDescription?: string
  benefits: { title: string; description?: string }[]
  steps: { step?: number | null; title?: string; description?: string }[]
  finalCtaTitle?: string
  finalCtaSubtitle?: string
  finalCtaLabel: string
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  ogImage?: string | null
}

async function _cached_getPromotions(): Promise<CmsPromotion[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'promotions',
      where: { status: { equals: 'published' } },
      sort: 'createdAt',
      depth: 1,
    })
    return docs.map((p: any) => ({
      slug: p.slug,
      eyebrow: p.eyebrow || 'Promo',
      badge: p.badge || undefined,
      headline: p.headline,
      subheadline: p.subheadline || undefined,
      cta: p.cta || {},
      offerTitle: p.offerTitle || undefined,
      offerDescription: p.offerDescription || undefined,
      benefits: (p.benefits || []).map((b: any) => ({ title: b.title, description: b.description || undefined })),
      steps: (p.steps || []).map((s: any) => ({ step: s.step, title: s.title, description: s.description })),
      finalCtaTitle: p.finalCtaTitle || undefined,
      finalCtaSubtitle: p.finalCtaSubtitle || undefined,
      finalCtaLabel: p.finalCtaLabel || 'Konsultasi Gratis',
      metaTitle: p.metaTitle || undefined,
      metaDescription: p.metaDescription || undefined,
      keywords: p.keywords || undefined,
      ogImage: mediaUrl(p.ogImage, 'hero') || mediaUrl(p.ogImage) || undefined,
    }))
  } catch {
    return []
  }
}

export async function getPromotionBySlug(slug: string): Promise<CmsPromotion | null> {
  const promotions = await getPromotions()
  return promotions.find((p) => p.slug === slug) || null
}


// ── Cache-wrapped exports (TTL) ──
export async function getCmsSiteSettings(...args: Parameters<typeof _cached_getCmsSiteSettings>) {
  return cached('getCmsSiteSettings', () => _cached_getCmsSiteSettings(...args))
}
export async function getCmsMainMenu(...args: Parameters<typeof _cached_getCmsMainMenu>) {
  return cached('getCmsMainMenu', () => _cached_getCmsMainMenu(...args))
}
export async function getCmsServices(...args: Parameters<typeof _cached_getCmsServices>) {
  return cached('getCmsServices', () => _cached_getCmsServices(...args))
}
export async function getCmsProjects(...args: Parameters<typeof _cached_getCmsProjects>) {
  return cached('getCmsProjects', () => _cached_getCmsProjects(...args))
}
export async function getCmsArticles(...args: Parameters<typeof _cached_getCmsArticles>) {
  return cached('getCmsArticles', () => _cached_getCmsArticles(...args))
}
export async function getCmsTestimonials(...args: Parameters<typeof _cached_getCmsTestimonials>) {
  return cached('getCmsTestimonials', () => _cached_getCmsTestimonials(...args))
}
export async function getCmsHomepage(...args: Parameters<typeof _cached_getCmsHomepage>) {
  return cached('getCmsHomepage', () => _cached_getCmsHomepage(...args))
}
export async function getCmsTeam(...args: Parameters<typeof _cached_getCmsTeam>) {
  return cached('getCmsTeam', () => _cached_getCmsTeam(...args))
}
export async function getCmsJobs(...args: Parameters<typeof _cached_getCmsJobs>) {
  return cached('getCmsJobs', () => _cached_getCmsJobs(...args))
}
export async function getCmsFaqs(...args: Parameters<typeof _cached_getCmsFaqs>) {
  return cached('getCmsFaqs', () => _cached_getCmsFaqs(...args))
}
export async function getPromotions(...args: Parameters<typeof _cached_getPromotions>) {
  return cached('getPromotions', () => _cached_getPromotions(...args))
}
export async function getCmsPageCta(pageKey: string): Promise<CmsPageCta> {
  const map = await cached('pageCtas', () => _cached_getPageCtas())
  return map[pageKey] || defaultPageCtas[pageKey] || defaultPageCtas.home
}
