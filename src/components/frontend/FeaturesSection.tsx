import { Building2, MessageCircle, Trophy, Monitor, Users, Lightbulb } from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: 'Tim Ahli Berpengalaman',
    desc: 'Dikerjakan langsung oleh developer & designer senior dengan pengalaman 4+ tahun di industri digital.',
  },
  {
    icon: MessageCircle,
    title: 'Konsultasi Gratis',
    desc: 'Diskusikan ide Anda secara gratis dengan tim kami sebelum memutuskan untuk memulai project.',
  },
  {
    icon: Trophy,
    title: 'Garansi Kualitas',
    desc: 'Kami berikan garansi bug-fix dan maintenance untuk memastikan produk Anda berjalan optimal.',
  },
  {
    icon: Monitor,
    title: 'Proses Transparan',
    desc: 'Pantau progress project Anda secara real-time dengan update mingguan.',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    desc: 'Setiap project mendapatkan tim khusus yang fokus 100% untuk mengerjakan produk Anda.',
  },
  {
    icon: Lightbulb,
    title: 'Solusi End-to-End',
    desc: 'Dari ide awal hingga maintenance, kami handle semua: design, development, testing, hingga deployment.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-28" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
            Keunggulan
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Mengapa Pilih Captiveau?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Software house Indonesia yang mengutamakan kualitas, kecepatan, dan kepuasan klien
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
