'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RollingText } from '@/components/sora-ui/texts/rolling-text'
import { Wordmark } from './navbar'
import { BrandIcon } from './social-icons'

export type FooterProps = {
  companyName?: string
  email?: string
  phone?: string
  address?: string
  socialLinks?: { platform?: string | null; url?: string | null }[]
  navData?: { label: string; href: string }[]
  services?: { title: string; slug: string }[]
}

const defaultServices = [
  { title: 'Landing Page', slug: 'landing-page' },
  { title: 'E-Commerce', slug: 'e-commerce' },
  { title: 'Company Profile', slug: 'company-profile' },
  { title: 'UI/UX Design', slug: 'uiux-design' },
]

export default function Footer({
  companyName = 'Captiveau',
  email = 'hello@captiveau.id',
  phone,
  address,
  socialLinks = [],
  navData = [
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Career', href: '/career' },
    { label: 'About Us', href: '/about' },
  ],
  services = defaultServices,
}: FooterProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative overflow-hidden bg-foreground text-foreground">
      {/* top accent bar — solid blue */}
      <div className="h-1 w-full bg-primary" />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.webp" alt="Logo Captiveau" className="size-9 object-contain" width={36} height={36} />
              <span className="flex flex-col leading-none text-white">
                <span className="text-lg font-bold tracking-tight">Captiveau</span>
                <span className="-mt-0.5 text-[11px] text-white/60">
                  Creative Tech Studio
                </span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              We build beautiful, functional web experiences with modern
              technology — helping startups and businesses create their
              digital presence.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((s) => (
                <Link
                  key={s.platform}
                  href={s.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.platform ?? undefined}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/15 text-white/60 transition-all hover:border-primary hover:text-white"
                >
                  <BrandIcon name={s.platform || ''} />
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-semibold text-white">Our Services</h3>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-semibold text-white">Useful Links</h3>
            <ul className="flex flex-col gap-3">
              {navData.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <h3 className="text-sm font-semibold text-white">Get in Touch</h3>
            <div className="flex flex-col gap-4 text-sm text-white/60">
              <Link
                href={`mailto:${email}`}
                className="group inline-flex items-start gap-2.5 transition-colors hover:text-primary"
              >
                <Mail className="mt-0.5 size-4 shrink-0" />
                <span className="break-all">{email}</span>
              </Link>
              {phone && (
                <Link
                  href={`https://wa.me/${phone.replace(/\D/g, '')}`}
                  className="group inline-flex items-start gap-2.5 transition-colors hover:text-primary"
                >
                  <Phone className="mt-0.5 size-4 shrink-0" />
                  <span>{phone}</span>
                </Link>
              )}
              {address && (
                <span className="inline-flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span>{address}</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group mt-2 flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-white/60 transition-all hover:border-primary hover:text-white"
            >
              Back to top
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with <span className="text-secondary">♥</span> in Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}
