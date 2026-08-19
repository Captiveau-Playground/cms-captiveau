"use client";
import { ConsultCta, type CalSettings } from '@/components/frontend/consult-cta'

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FooterMotionSection, FooterMotionShell } from "@/components/footer-primitives";
import { BrandIcon } from "@/components/frontend/social-icons";

export type FooterSectionProps = {
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
  { title: "Landing Page", slug: "landing-page" },
  { title: "E-Commerce", slug: "e-commerce" },
  { title: "Company Profile", slug: "company-profile" },
  { title: "UI/UX Design", slug: "uiux-design" },
]

const defaultCompany = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Career", href: "/career" },
  { label: "FAQ", href: "/faq" },
]

/**
 * Footer (adapted from @nusaiba/footer-6) — CMS-driven services, company,
 * contact & social columns.
 */
export function FooterPromptHandoffSection({
  companyName = "Captiveau",
  email = "hello@captiveau.id",
  phone,
  address,
  socialLinks = [],
  navData,
  services = defaultServices,
  quote = "We build the kind of digital products we wish more software shipped — calm, opinionated, ready for the real world.",
  statusLabel = "Now accepting new projects",
  cal,
}: FooterSectionProps & { cal?: CalSettings | null }) {
  const year = new Date().getFullYear()
  const companyLinks = navData && navData.length ? navData : defaultCompany

  return (
    <FooterMotionShell>
      <FooterMotionSection>
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="border-border pb-8 pr-0 sm:pr-8 lg:border-r lg:pb-0">
            <p className="font-semibold text-foreground text-xl tracking-[-0.04em]">
              <Link href="/">{companyName}</Link>
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              {quote}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {socialLinks.map((s) => (
                <Link
                  aria-label={s.platform ?? undefined}
                  className="relative inline-flex size-10 items-center justify-center border border-border text-muted-foreground transition-[color,transform,border-color] hover:border-foreground/15 hover:text-foreground active:scale-[0.96]"
                  href={s.url || "#"}
                  key={s.platform ?? s.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <BrandIcon name={s.platform || ""} />
                </Link>
              ))}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {statusLabel}
            </div>
          </div>

          {/* Services */}
          <div className="border-border py-8 sm:px-8 lg:border-r lg:py-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Services
            </p>
            <ul className="mt-4 space-y-0.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    className="relative inline-flex min-h-10 items-center text-sm text-muted-foreground transition-[color,transform] hover:text-foreground active:scale-[0.96]"
                    href={`/services/${s.slug}`}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="border-border py-8 sm:px-8 lg:border-r lg:py-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Company
            </p>
            <ul className="mt-4 space-y-0.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="relative inline-flex min-h-10 items-center text-sm text-muted-foreground transition-[color,transform] hover:text-foreground active:scale-[0.96]"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="border-border py-8 sm:px-8 lg:py-0 lg:last:border-r-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Contact
            </p>
            <ul className="mt-4 space-y-0.5">
              {email && (
                <li>
                  <Link
                    className="relative inline-flex min-h-10 items-center gap-2 text-sm text-muted-foreground transition-[color,transform] hover:text-foreground active:scale-[0.96]"
                    href={`mailto:${email}`}
                  >
                    <Mail className="size-3.5 shrink-0" />
                    {email}
                  </Link>
                </li>
              )}
              {phone && (
                <li>
                  <Link
                    className="relative inline-flex min-h-10 items-center gap-2 text-sm text-muted-foreground transition-[color,transform] hover:text-foreground active:scale-[0.96]"
                    href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                  >
                    <Phone className="size-3.5 shrink-0" />
                    {phone}
                  </Link>
                </li>
              )}
              {address && (
                <li className="inline-flex min-h-10 items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" />
                  {address}
                </li>
              )}
              <li>
                <ConsultCta
                  label="Start a project"
                  cal={cal}
                  className="relative inline-flex min-h-10 gap-1.5 border-0 bg-transparent p-0 text-sm font-medium text-foreground hover:text-primary"
                />
              </li>
            </ul>
          </div>
        </div>
      </FooterMotionSection>

      <FooterMotionSection>
        <div className="flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
          <span className="tabular-nums">
            © {year} {companyName}. All rights reserved.
          </span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <span>Creative Tech Studio — Jakarta, Indonesia.</span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/blog">
            Insights
          </Link>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/faq">
            FAQ
          </Link>
        </div>
      </FooterMotionSection>
    </FooterMotionShell>
  );
}