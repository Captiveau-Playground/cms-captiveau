import Link from 'next/link'
import { getArticles } from '@/lib/cms'
import { Calendar, Clock } from 'lucide-react'

export default async function ArticlesPreview() {
  const articles = await getArticles(3)

  if (articles.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-gray-50" id="articles">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
            Blog
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Artikel Terbaru
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Tips, tutorial, dan insight seputar teknologi digital
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <div className="text-4xl text-blue-300 font-bold">
                  {article.title.charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-500 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {article.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                  {article.publishedDate && (
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(article.publishedDate).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                  {article.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {article.readingTime} min read
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/articles"
            className="inline-flex h-12 items-center rounded-xl border border-gray-300 px-8 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            Lihat Semua Artikel →
          </Link>
        </div>
      </div>
    </section>
  )
}
