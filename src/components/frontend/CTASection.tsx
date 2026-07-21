import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 md:py-28" id="cta">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-blue-500 px-8 py-16 sm:px-16 sm:py-20 md:px-20">
          {/* Decorative circles */}
          <div className="absolute top-1/2 right-[-20%] aspect-square h-[500px] w-[500px] -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-white/5" />
            <div className="absolute inset-[15%] rounded-full bg-gold-500/10" />
            <div className="absolute inset-[30%] rounded-full bg-gold-500/15" />
            <div className="absolute inset-[45%] rounded-full bg-white/10" />
          </div>

          <div className="relative z-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Mari Mulai Kolaborasi
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Ide digital Anda siap menjadi produk nyata. Konsultasikan gratis
                dengan tim kami dan wujudkan solusi yang tepat untuk bisnis Anda.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-12 items-center rounded-xl bg-white px-8 text-base font-medium text-blue-500 hover:bg-blue-50 transition-all hover:scale-[1.02]"
                >
                  Konsultasi Gratis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
