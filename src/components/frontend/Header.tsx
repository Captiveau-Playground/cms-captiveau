'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { MainMenu } from '@/payload-types'

export default function Header({ menu }: { menu: MainMenu | null }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const items = menu?.items || []

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
              C
            </div>
            <span className="text-xl font-bold text-gray-900">Captiveau</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {items
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.href || '#'}
                  className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#"
              className="inline-flex h-12 items-center rounded-xl bg-blue-500 px-6 text-sm font-medium text-white hover:bg-blue-600 transition-all hover:scale-[1.02]"
            >
              Konsultasi Gratis
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="space-y-1 px-4 py-4">
            {items
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.href || '#'}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-500"
                >
                  {item.label}
                </Link>
              ))}
            <Link
              href="#"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex h-12 items-center justify-center rounded-xl bg-blue-500 px-6 text-sm font-medium text-white"
            >
              Konsultasi Gratis
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
