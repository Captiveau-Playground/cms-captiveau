import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'

import {
  site,
  services,
  projects,
  articles,
  testimonials,
  values,
  team,
  process,
  faqs,
  jobs,
  careerBenefits,
  trustPoints,
  advantages,
  stats,
} from '../lib/content'

async function uploadImage(payload: any, filePath: string, alt: string) {
  // Media uploads don't work through the wrangler proxy for D1 seeding —
  // skip them (image fields stay null; can be added via the admin panel).
  const skipMedia =
    typeof globalThis.process !== 'undefined' &&
    (globalThis.process.env?.SKIP_MEDIA === 'true')
  if (skipMedia || !filePath || !fs.existsSync(filePath)) {
    return null
  }
  const fileName = path.basename(filePath)
  const data = fs.readFileSync(filePath)
  try {
    const media = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data,
        mimetype: 'image/' + path.extname(fileName).replace('.', ''),
        name: fileName,
        size: data.length,
      },
    })
    return media.id
  } catch (e: any) {
    console.warn(`  ⚠ upload failed for ${fileName}: ${e.message}`)
    return null
  }
}

function textToLexical(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: null,
          children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
          textFormat: 0,
        },
      ],
      textFormat: 0,
    },
  } as any
}

const iconNames: Record<string, string> = {
  layout: 'layout',
  'shopping-cart': 'shopping-cart',
  palette: 'palette',
  'building2': 'building2',
  code: 'code',
  smartphone: 'smartphone',
  'landing-page': 'layout',
  ecommerce: 'shopping-cart',
  'company-profile': 'building2',
  uiux: 'palette',
  'web-development': 'code',
  'mobile-app': 'smartphone',
}

async function main() {
  const payload = await getPayload({ config })
  console.log('✓ payload connected')

  const [, logoId] = await Promise.all([
    uploadImage(payload, 'public/logo.png', 'Captiveau logo'),
    uploadImage(payload, 'public/logo.png', 'Captiveau logo'),
  ])

  // ── Services ──
  console.log('Seeding services...')
  const svcMedia = await Promise.all(
    services.map((s) => uploadImage(payload, `public${s.image}`, s.title)),
  )
  for (let i = 0; i < services.length; i++) {
    const s = services[i]
    const existing = await payload.find({ collection: 'services', where: { slug: { equals: s.slug } } })
    const data = {
      title: s.title,
      slug: s.slug,
      subtitle: s.tagline,
      description: s.description,
      icon: iconNames[s.slug] || 'layout',
      image: svcMedia[i],
      introduction: textToLexical(s.intro),
      keyBenefits: s.benefits.map((b) => ({ title: b.title, description: b.description, icon: 'check' })),
      process: s.process.map((p, idx) => ({
        step: idx + 1,
        title: p.title,
        description: p.description,
        icon: 'arrow-right',
      })),
      usp: s.benefits.slice(0, 3).map((b) => ({ title: b.title, description: b.description })),
      pricingPlans: {
        basic: { name: s.pricing.basic.name, price: s.pricing.basic.price, description: s.pricing.basic.description, features: s.pricing.basic.features.map((f) => ({ feature: f })) },
        bestDeal: { name: s.pricing.best.name, price: s.pricing.best.price, description: s.pricing.best.description, features: s.pricing.best.features.map((f) => ({ feature: f })) },
        enterprise: { name: s.pricing.enterprise.name, price: s.pricing.enterprise.price, description: s.pricing.enterprise.description, features: s.pricing.enterprise.features.map((f) => ({ feature: f })) },
      },
      technologies: s.technologies.map((t) => ({ name: t })),
      order: i + 1,
    }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'services', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'services', data })
    }
  }
  console.log(`✓ ${services.length} services`)

  // ── Projects ──
  console.log('Seeding projects...')
  const projMedia = await Promise.all(
    projects.map((p) => uploadImage(payload, `public${p.image}`, p.title)),
  )
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i]
    const existing = await payload.find({ collection: 'projects', where: { slug: { equals: p.slug } } })
    const data = {
      title: p.title,
      slug: p.slug,
      image: projMedia[i],
      tags: p.tags.map((t) => ({ tag: t })),
      description: p.description,
      category: p.category,
      year: p.year,
      services: p.services.map((s) => ({ service: s })),
      stack: p.stack.map((t) => ({ tech: t })),
      results: p.results.map((r) => ({ value: r.value, label: r.label })),
      size: p.size,
      order: i + 1,
    }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'projects', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'projects', data })
    }
  }
  console.log(`✓ ${projects.length} projects`)

  // ── Articles ──
  console.log('Seeding articles...')
  const artMedia = await Promise.all(
    articles.map((a) => uploadImage(payload, `public${a.image}`, a.title)),
  )
  for (let i = 0; i < articles.length; i++) {
    const a = articles[i]
    const existing = await payload.find({ collection: 'articles', where: { slug: { equals: a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') } } })
    const data = {
      title: a.title,
      slug: a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: a.excerpt,
      content: textToLexical(a.excerpt + '\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. This placeholder content can be edited from the CMS admin panel.'),
      coverImage: artMedia[i],
      tags: [{ tag: a.category }],
      author: 'Captiveau',
      readingTime: parseInt(a.readTime) || 5,
      published: true,
      publishedDate: a.date,
    }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'articles', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'articles', data })
    }
  }
  console.log(`✓ ${articles.length} articles`)

  // ── Testimonials ──
  console.log('Seeding testimonials...')
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i]
    const existing = await payload.find({ collection: 'testimonials', where: { name: { equals: t.name } } })
    const data = {
      name: t.name,
      role: `${t.role} di ${t.company}`,
      text: t.quote,
      rating: 5,
      order: i + 1,
    }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'testimonials', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'testimonials', data })
    }
  }
  console.log(`✓ ${testimonials.length} testimonials`)

  // ── Team Members ──
  console.log('Seeding team...')
  for (let i = 0; i < team.length; i++) {
    const m = team[i]
    const existing = await payload.find({ collection: 'team-members', where: { name: { equals: m.name } } })
    const data = {
      name: m.name,
      role: m.role,
      order: i + 1,
    }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'team-members', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'team-members', data })
    }
  }
  console.log(`✓ ${team.length} team members`)

  // ── Job Listings ──
  console.log('Seeding jobs...')
  for (let i = 0; i < jobs.length; i++) {
    const j = jobs[i]
    const existing = await payload.find({ collection: 'job-listings', where: { title: { equals: j.title } } })
    const data = {
      title: j.title,
      location: j.location,
      type: (j.type === 'Internship' ? 'internship' : 'full-time') as 'full-time' | 'internship',
      salary: j.salary,
      description: textToLexical(j.desc),
      postedDate: new Date().toISOString(),
      isActive: true,
    }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'job-listings', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'job-listings', data })
    }
  }
  console.log(`✓ ${jobs.length} jobs`)

  // ── FAQs ──
  console.log('Seeding FAQs...')
  const faqCategoryMap: Record<string, string> = {
    General: 'general',
    Technical: 'technical',
    Pricing: 'pricing',
    Support: 'support',
  }
  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i]
    const existing = await payload.find({ collection: 'faqs', where: { question: { equals: f.title } } })
    const data = {
      question: f.title,
      answer: textToLexical(f.content),
      category: (faqCategoryMap[f.category] || 'general') as 'general' | 'technical' | 'pricing' | 'support',
      order: i + 1,
    }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'faqs', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'faqs', data })
    }
  }
  console.log(`✓ ${faqs.length} FAQs`)

  // ── Site Settings ──
  console.log('Seeding site settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: site.companyName,
      tagline: site.tagline,
      description: site.description,
      logo: logoId,
      socialLinks: site.socials.map((s) => ({ platform: s.platform as any, url: s.url })),
      contacts: [
        { type: 'email', value: site.email },
        { type: 'whatsapp', value: site.whatsapp },
      ],
      address: { street: 'Jl. Kuningan Barat No. 8', city: 'Jakarta Selatan', region: 'DKI Jakarta', postalCode: '12710', country: 'Indonesia' },
    },
  })
  console.log('✓ site settings')

  // ── Main Menu ──
  console.log('Seeding main menu...')
  await payload.updateGlobal({
    slug: 'main-menu',
    data: {
      items: [
        { label: 'Home', href: '/', order: 1 },
        {
          label: 'Services',
          href: '/services',
          order: 2,
          children: [
            { label: 'Landing Page', href: '/services/landing-page', description: 'Halaman konversi tinggi untuk bisnis Anda' },
            { label: 'E-Commerce', href: '/services/e-commerce', description: 'Platform toko online end-to-end' },
            { label: 'Company Profile', href: '/services/company-profile', description: 'Profil perusahaan yang profesional' },
            { label: 'UI/UX Design', href: '/services/uiux-design', description: 'Desain produk digital yang tepat' },
          ],
        },
        { label: 'Portfolio', href: '/portfolio', order: 3 },
        { label: 'Blog', href: '/blog', order: 4 },
        { label: 'About Us', href: '/about', order: 5 },
        { label: 'Career', href: '/career', order: 6 },
        { label: 'FAQ', href: '/faq', order: 7 },
      ],
    },
  })
  console.log('✓ main menu')

  // ── Homepage global ──
  console.log('Seeding homepage...')
  const heroMedia =
    (typeof globalThis.process !== 'undefined' &&
      globalThis.process.env?.SKIP_MEDIA === 'true')
      ? null
      : await uploadImage(payload, 'public/images/team.jpg', 'Hero image')
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      heroBadge: 'Now accepting new projects',
      heroTitlePrefix: 'We build',
      heroSpecialties: ['digital products', 'company profiles', 'e-commerce platforms', 'web & mobile apps', 'SaaS dashboards'].map((t) => ({ text: t })),
      heroTitleSuffix: 'that convert.',
      heroSubtitle: 'An Indonesian software house crafting end-to-end digital products — research, design, development, and launch. Startups to enterprises trust us to ship.',
      heroImages: heroMedia,
      stats: stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label })),
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind'].map((t) => ({ name: t })),
      trustPoints: trustPoints.map((t) => ({ icon: t.icon, title: t.title, description: t.desc })),
      advantages: advantages.map((a) => ({ icon: a.icon, title: a.title, description: a.desc })),
      process: process.map((p) => ({ step: p.step, title: p.title, description: p.desc, icon: 'arrow-right' })),
      socialProofLabel: 'We build with trusted technology',
      socialProofDescription: 'The modern stack our team uses to ship world-class digital products.',
      values: values.map((v) => ({ icon: 'star', title: v.title, description: v.desc })),
      careerBenefits: careerBenefits.map((b) => ({ icon: 'heart', title: b.title, description: b.desc })),
      ctaTitle: "Let's Start Collaborating.",
      ctaSubtitle: 'Your digital idea is ready to become a real product. Get a free consultation with our team.',
      ctaButtonText: 'Free Consultation',
    },
  })
  console.log('✓ homepage')

  console.log('\n✅ Seed complete!')
}

main().catch((err) => { console.error('Seed failed:', err); throw err })
