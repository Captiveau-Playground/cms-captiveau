import { getPayload } from 'payload'
import config from '@payload-config'
import {
  siteSettings,
  mainMenu,
  services,
  teamMembers,
  testimonials,
  jobListings,
  faqs,
  articles,
} from './data'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding Captiveau CMS...\n')

  // 1. SiteSettings (Global)
  console.log('📌 Site Settings...')
  try {
    await payload.updateGlobal({ slug: 'site-settings', data: siteSettings })
    console.log('   ✅ Site Settings updated')
  } catch (e) {
    console.log('   ❌ Site Settings failed:', (e as Error).message)
  }

  // 2. MainMenu (Global)
  console.log('📌 Main Menu...')
  try {
    await payload.updateGlobal({ slug: 'main-menu', data: mainMenu })
    console.log('   ✅ Main Menu updated')
  } catch (e) {
    console.log('   ❌ Main Menu failed:', (e as Error).message)
  }

  // 3. Services
  console.log('📌 Services...')
  for (const service of services) {
    try {
      const existing = await payload.find({ collection: 'services', where: { slug: { equals: service.slug } } })
      if (existing.docs.length > 0) {
        await payload.update({ collection: 'services', id: existing.docs[0].id, data: service })
        console.log(`   ✅ ${service.title} updated`)
      } else {
        await payload.create({ collection: 'services', data: service })
        console.log(`   ✅ ${service.title} created`)
      }
    } catch (e) {
      console.log(`   ❌ ${service.title} failed:`, (e as Error).message)
    }
  }

  // 4. Team Members
  console.log('📌 Team Members...')
  for (const member of teamMembers) {
    try {
      const existing = await payload.find({ collection: 'team-members', where: { name: { equals: member.name } } })
      if (existing.docs.length > 0) {
        await payload.update({ collection: 'team-members', id: existing.docs[0].id, data: member })
        console.log(`   ✅ ${member.name} updated`)
      } else {
        await payload.create({ collection: 'team-members', data: member })
        console.log(`   ✅ ${member.name} created`)
      }
    } catch (e) {
      console.log(`   ❌ ${member.name} failed:`, (e as Error).message)
    }
  }

  // 5. Testimonials
  console.log('📌 Testimonials...')
  for (const testimonial of testimonials) {
    try {
      await payload.create({ collection: 'testimonials', data: testimonial })
      console.log(`   ✅ ${testimonial.name} created`)
    } catch (e) {
      console.log(`   ❌ ${testimonial.name} failed:`, (e as Error).message)
    }
  }

  // 6. Job Listings
  console.log('📌 Job Listings...')
  for (const job of jobListings) {
    try {
      const existing = await payload.find({ collection: 'job-listings', where: { title: { equals: job.title } } })
      if (existing.docs.length > 0) {
        await payload.update({ collection: 'job-listings', id: existing.docs[0].id, data: job })
        console.log(`   ✅ ${job.title} updated`)
      } else {
        await payload.create({ collection: 'job-listings', data: job })
        console.log(`   ✅ ${job.title} created`)
      }
    } catch (e) {
      console.log(`   ❌ ${job.title} failed:`, (e as Error).message)
    }
  }

  // 7. FAQs
  console.log('📌 FAQs...')
  for (const faq of faqs) {
    try {
      await payload.create({ collection: 'faqs', data: faq })
      console.log(`   ✅ ${faq.question.substring(0, 30)}... created`)
    } catch (e) {
      console.log(`   ❌ ${faq.question.substring(0, 30)}... failed:`, (e as Error).message)
    }
  }

  // 8. Articles
  console.log('📌 Articles...')
  for (const article of articles) {
    try {
      const existing = await payload.find({ collection: 'articles', where: { slug: { equals: article.slug } } })
      if (existing.docs.length > 0) {
        await payload.update({ collection: 'articles', id: existing.docs[0].id, data: article })
        console.log(`   ✅ ${article.title} updated`)
      } else {
        await payload.create({ collection: 'articles', data: article })
        console.log(`   ✅ ${article.title} created`)
      }
    } catch (e) {
      console.log(`   ❌ ${article.title} failed:`, (e as Error).message)
    }
  }

  console.log('\n✅ Seeding complete!')
  process.exit(0)
}

seed().catch((e) => {
  console.error('\n❌ Seeding failed:', e)
  process.exit(1)
})
