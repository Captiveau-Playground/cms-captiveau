import { BlogGrid } from '@/components/frontend/blog-grid'
import { getCmsArticles } from '@/lib/cms-data'
import { formatDateLong } from '@/lib/date'
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
  const blogs = (articles as any[]).map((a: any) => ({
    title: a.title,
    slug: a.slug || '',
    description: a.excerpt || '',
    author: a.author,
    date: a.date ? formatDateLong(a.date) : '',
    readTime: a.readTime,
    image: a.image,
  }))

  return (
    <>
      <BlogGrid
        blogs={blogs}
        title="Insights & Digital Inspiration"
        description="Artikel, panduan, dan wawasan seputar teknologi, desain, dan strategi digital — ditulis oleh tim yang mengerjakan langsung."
      />
    </>
  )
}