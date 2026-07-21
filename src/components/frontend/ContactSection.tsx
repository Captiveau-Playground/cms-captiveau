import { getSiteSettings } from '@/lib/cms'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default async function ContactSection() {
  const settings = await getSiteSettings()
  if (!settings) return null

  const email = settings.contacts?.find((c) => c.type === 'email')?.value
  const phone = settings.contacts?.find((c) => c.type === 'whatsapp' || c.type === 'phone')?.value
  const addr = settings.address

  return (
    <section className="py-20 md:py-28 bg-gray-50" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
            Kontak
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Hubungi Kami
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Diskusikan project Anda dengan tim kami
          </p>
        </div>

        <div className="mt-16 mx-auto max-w-5xl grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{email}</p>
                </div>
              </a>
            )}
            {phone && (
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-green-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-500">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="text-sm font-medium text-gray-900">{phone}</p>
                </div>
              </a>
            )}
            {addr && (
              <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500 shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kantor</p>
                  <p className="text-sm font-medium text-gray-900">
                    {addr.street}, {addr.city}, {addr.region} {addr.postalCode}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              action="https://wa.me/6285117705910"
              className="rounded-2xl border border-gray-200 bg-white p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nama
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    className="h-12 w-full rounded-xl border border-gray-300 px-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@anda.com"
                    className="h-12 w-full rounded-xl border border-gray-300 px-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Pesan
                  </label>
                  <textarea
                    placeholder="Ceritakan project Anda..."
                    rows={4}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-500 text-sm font-medium text-white hover:bg-blue-600 transition-all"
              >
                <Send size={16} />
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
