import { getTestimonials } from '@/lib/cms'
import { Star } from 'lucide-react'

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials()

  if (testimonials.length === 0) return null

  return (
    <section className="py-20 md:py-28" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
            Testimonial
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Apa Kata Klien Kami
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-gray-50 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
