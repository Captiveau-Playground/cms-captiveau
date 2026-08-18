'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
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
  quote?: string | null
  statusLabel?: string | null
}

const defaultServices = [
  { title: 'Landing Page', slug: 'landing-page' },
  { title: 'E-Commerce', slug: 'e-commerce' },
  { title: 'Company Profile', slug: 'company-profile' },
  { title: 'UI/UX Design', slug: 'uiux-design' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Career', href: '/career' },
  { label: 'FAQ', href: '/faq' },
]

export default function Footer({
  companyName = 'Captiveau',
  email = 'hello@captiveau.id',
  phone,
  address,
  socialLinks = [],
  services = defaultServices,
  quote = 'We build the kind of digital products we wish more software shipped — calm, opinionated, ready for the real world.',
  statusLabel = 'Now accepting new projects',
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Brand / editorial */}
          <div className="flex flex-col gap-6">
            <Wordmark />

            <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="size-1.5 rounded-full bg-secondary" />
              {companyName} — Creative Tech Studio
            </span>

            <p
              className="max-w-xl text-balance text-2xl leading-tight text-foreground sm:text-3xl"
              style={{
                fontFamily: "ui-serif, Georgia, 'Times New Roman', serif",
                letterSpacing: '-0.01em',
              }}
            >
              {quote}
            </p>

            <Link
              href="/about"
              className="group inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground"
            >
              <span className="underline-offset-4 group-hover:underline">
                Read our story
              </span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <div className="mt-2 flex items-center gap-1.5">
              {socialLinks.map((s) => (
                <Link
                  key={s.platform}
                  href={s.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.platform ?? undefined}
                  className="grid size-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <BrandIcon name={s.platform || ''} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Services
              </h4>
              <ul className="flex flex-col gap-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Company
              </h4>
              <ul className="flex flex-col gap-2">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
              <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Contact
              </h4>
              <ul className="flex flex-col gap-2">
                {email && (
                  <li>
                    <Link
                      href={`mailto:${email}`}
                      className="inline-flex items-start gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      <Mail className="mt-0.5 size-3.5 shrink-0" />
                      <span className="break-all">{email}</span>
                    </Link>
                  </li>
                )}
                {phone && (
                  <li>
                    <Link
                      href={`https://wa.me/${phone.replace(/\D/g, '')}`}
                      className="inline-flex items-start gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      <Phone className="mt-0.5 size-3.5 shrink-0" />
                      <span>{phone}</span>
                    </Link>
                  </li>
                )}
                {address && (
                  <li className="inline-flex items-start gap-2 text-sm text-foreground/80">
                    <MapPin className="mt-0.5 size-3.5 shrink-0" />
                    <span>{address}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative grid size-2 place-items-center">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping rounded-full bg-emerald-500/50"
                />
              </span>
              {statusLabel}
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="font-mono uppercase tracking-widest">
              Jakarta · Indonesia
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}