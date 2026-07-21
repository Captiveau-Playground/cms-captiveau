import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-24 md:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/4 rounded-full bg-gold-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
            🚀 Creative Tech Studio
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Transform Your Ideas Into{' '}
            <span className="text-blue-500">Digital Reality</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl max-w-2xl mx-auto">
            Kami membantu startup, korporasi, dan UMKM menciptakan produk digital
            yang powerful — dari MVP hingga platform berskala besar.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#"
              className="inline-flex h-12 items-center rounded-xl bg-blue-500 px-8 text-base font-medium text-white hover:bg-blue-600 transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/25"
            >
              Konsultasi Gratis
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center rounded-xl border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              Lihat Layanan
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-gray-100 pt-10">
            {[
              { number: '50+', label: 'Project Selesai' },
              { number: '30+', label: 'Klien Puas' },
              { number: '4+', label: 'Tahun Pengalaman' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-blue-500 sm:text-4xl">
                  {stat.number}
                </div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
