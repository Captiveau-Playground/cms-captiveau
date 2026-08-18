import { getCmsArticles } from '@/lib/cms-data'
import BlogList from '@/components/frontend/blog-list'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
  title: 'Blog — Insights & Artikel Teknologi',
  description:
    'Artikel, panduan, dan wawasan tentang teknologi, desain, dan strategi digital untuk membantu bisnis Anda berkembang.',
  path: '/blog',
  keywords: ['blog teknologi', 'tips web development', 'insight digital', 'artikel teknologi indonesia'],
})
}

export default async function BlogPage() {
  const articles = await getCmsArticles()
  return <BlogList articles={articles} />
}
