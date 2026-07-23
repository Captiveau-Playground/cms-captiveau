'use client'

import { useState } from 'react'
import { getFAQs } from '@/lib/cms'
import { ChevronDown } from 'lucide-react'
import type { Faq } from '@/payload-types'

function renderRichText(content: any): string {
  if (!content?.root?.children) return ''
  return content.root.children
    .map((child: any) =>
      child.children?.map((c: any) => c.text).join('') || ''
    )
    .join(' ')
}

export default function FAQSection({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<number | null>(null)

  if (faqs.length === 0) return null

  // Group by category
  const categories = Array.from(new Set(faqs.map((f) => f.category || 'general')))
  const [activeCategory, setActiveCategory] = useState(categories[0])

  const filtered = faqs.filter((f) => (f.category || 'general') === activeCategory)

  return (
    <section className="py-20 md:py-28" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
            FAQ
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Pertanyaan Umum
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="mt-8 space-y-3">
          {filtered.map((faq) => (
            <div
              key={faq.id}
              className="rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id as number)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gray-400 transition-transform ${
                    openId === faq.id as number ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openId === faq.id as number && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-gray-600">
                    {renderRichText(faq.answer)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
