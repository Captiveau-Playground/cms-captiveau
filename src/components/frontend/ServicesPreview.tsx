import Link from 'next/link'
import { getServices } from '@/lib/cms'
import { Layout, ShoppingCart, Palette, Building2 } from 'lucide-react'

const iconMap: Record<string, typeof Layout> = {
  layout: Layout,
  'shopping-cart': ShoppingCart,
  palette: Palette,
  building2: Building2,
}

export default async function ServicesPreview() {
  const services = await getServices()

  return (
    <section className="py-20 md:py-28 bg-gray-50" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
            Layanan
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Layanan Kami
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Solusi lengkap untuk kebutuhan digital bisnis Anda
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon as string] || Layout
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Icon size={28} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>
                <p className="mt-6 text-sm font-medium text-blue-500 group-hover:translate-x-1 transition-transform">
                  Pelajari更多 →
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
