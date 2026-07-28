"use client"

import { ArrowUpRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const columns = [
  {
    title: "Layanan",
    links: [
      { label: "Landing Page", href: "/services/landing-page" },
      { label: "E-Commerce", href: "/services/e-commerce" },
      { label: "Company Profile", href: "/services/company-profile" },
      { label: "UI/UX Design", href: "/services/uiux-design" },
      { label: "Web Development", href: "/services/web-development" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog-01" },
      { label: "Career", href: "/career" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Kontak",
    links: [
      { label: "hello@captiveau.id", href: "mailto:hello@captiveau.id" },
      { label: "+62-851-1770-5910", href: "tel:+6285117705910" },
      { label: "Tebet, Jakarta Selatan", href: "#" },
    ],
  },
]

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/company/captiveau" },
  { label: "Instagram", href: "https://instagram.com/captiv.eau" },
  { label: "GitHub", href: "#" },
]

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center bg-foreground px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <span className="text-xl font-bold tracking-tight text-white">
              Captiveau
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
              Creative tech studio yang membantu startup dan bisnis menciptakan
              produk digital yang indah, fungsional, dan berdampak.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <span className="text-sm text-white/40 transition-colors hover:text-white">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((column) => (
            <nav key={column.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[0.15em]">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Captiveau. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <a href="/contact">
              <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 h-9 px-4 text-xs font-medium gap-1.5">
                Hubungi Kami <ArrowUpRight className="size-3" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
