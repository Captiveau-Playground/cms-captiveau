'use client'

import { useState } from 'react'
import { Check, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Section } from '../section'
import { Eyebrow } from '../eyebrow'
import { RevealHeading } from '../section'
import { BrandIcon } from '../social-icons'
import type { CmsSiteSettings } from '@/lib/cms-data'



const inputClass =
  'w-full rounded-none border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/20'

export default function ContactSection({ settings }: { settings: CmsSiteSettings }) {
  const site = settings
  const channels = [
    { icon: Mail, label: 'Email us', value: site.email || '', href: `mailto:${site.email || ''}`, desc: 'Replies within 1 business day' },
    { icon: Phone, label: 'Call / WhatsApp', value: site.phone || site.whatsapp || '', href: `https://wa.me/${(site.whatsapp || '').replace(/\D/g, '')}`, desc: 'Mon – Fri, 09:00–18:00 WIB' },
    { icon: MapPin, label: 'Visit us', value: site.address || 'Tebet, South Jakarta', href: 'https://www.google.com/maps/search/Tebet,+Jakarta+Selatan', desc: 'Indonesia' },
  ]
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(
      `Project inquiry — ${data.get('name')} (${data.get('email')})`
    )
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\nBudget: ${data.get('budget')}\n\n${data.get('message')}`
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <Section className="py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left — info */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="flex flex-col gap-3">
            <Eyebrow label="Contact" />
            <RevealHeading className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Let's talk about{' '}
              <span className="text-primary">your project</span>
            </RevealHeading>
            <p className="text-base leading-relaxed text-muted-foreground">
              Tell us about your idea — we'll get back to you within one
              business day with the next steps. No pressure, no commitment.
            </p>
          </div>

          {/* channels */}
          <div className="flex flex-col gap-3">
            {channels.map((c) => {
              const Icon = c.icon
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-start gap-4 rounded-none border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 hover:border-primary/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-none bg-primary/10">
                    <Icon className="size-5 text-primary" strokeWidth={1.7} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {c.value}
                    </span>
                    <span className="text-xs text-muted-foreground">{c.desc}</span>
                  </span>
                </a>
              )
            })}
          </div>

          {/* office image + socials */}
          <div className="overflow-hidden rounded-none border border-border">
            <img
              src="/images/office.jpg"
              alt="Captiveau studio"
              className="aspect-[16/8] w-full object-cover"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Follow us
            </span>
            <div className="flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.platform ?? undefined}
                  className="flex size-9 items-center justify-center rounded-none border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                >
                  <BrandIcon name={s.platform || ''} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-none border border-border bg-card p-6 shadow-lg shadow-black/5 sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                  Tell us about your project
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We usually reply within 24 hours.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                <span className="size-1.5 rounded-full bg-secondary animate-pulse" />
                Online
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">Name</span>
                <input required name="name" placeholder="Your name" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">Email</span>
                <input required type="email" name="email" placeholder="you@company.com" className={inputClass} />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">Service needed</span>
                <select name="service" className={inputClass} defaultValue="Landing Page">
                  {['Landing Page', 'E-Commerce', 'Company Profile', 'UI/UX Design', 'Web Development', 'Mobile App', 'Other'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">Budget range</span>
                <select name="budget" className={inputClass} defaultValue="Rp 5–20 juta">
                  {['Under Rp 5 juta', 'Rp 5–20 juta', 'Rp 20–50 juta', 'Rp 50+ juta'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">Project details</span>
              <textarea
                required
                name="message"
                rows={5}
                placeholder="Describe your project, timeline, and goals..."
                className={`${inputClass} resize-none`}
              />
            </label>

            <button
              type="submit"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-none bg-primary px-8 text-sm font-medium text-white transition-all hover:bg-primary-600 active:scale-[0.98]"
            >
              {sent ? (
                <>
                  Sent — check your email <Check className="size-4" />
                </>
              ) : (
                <>
                  Send Message
                  <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </Section>
  )
}
