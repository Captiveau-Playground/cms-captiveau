import Link from 'next/link'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'
import type { SiteSetting } from '@/payload-types'

export default function Footer({ settings }: { settings: SiteSetting | null }) {
  if (!settings) return null

  const email = settings.contacts?.find((c) => c.type === 'email')?.value
  const phone = settings.contacts?.find((c) => c.type === 'whatsapp' || c.type === 'phone')?.value
  const address = settings.address

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-8 sm:px-6 lg:px-8 lg:pt-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <span className="text-xl font-bold">{settings.companyName}</span>
            </div>
            <p className="mt-4 max-w-md text-gray-400 leading-relaxed">
              {settings.tagline}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://linkedin.com/company/captiveau"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-blue-500 hover:text-white transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a
                href="https://instagram.com/captiv.eau"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-blue-500 hover:text-white transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Layanan
            </h3>
            <ul className="mt-6 space-y-3">
              {['Landing Page', 'E-Commerce', 'UI/UX Design', 'Company Profile'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Hubungi Kami
            </h3>
            <ul className="mt-6 space-y-4">
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <Mail size={16} className="shrink-0" />
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <Phone size={16} className="shrink-0" />
                    {phone}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-2 text-gray-400 text-sm">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>
                    {address.street}, {address.city}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {settings.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
