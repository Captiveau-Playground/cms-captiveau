'use client'

import { useState } from 'react'
import { Check, Mail, MapPin, Phone, Send } from 'lucide-react'
import { SectionShell, ContentRail } from '@/components/layout-contract'
import { SeraStagger, SeraStaggerItem } from '@/lib/sera-motion'
import { AnimatedHeading } from '@/components/frontend/animated-heading'
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
  const [delivery, setDelivery] = useState<'email' | 'whatsapp'>('email')

  const options = site.contactOptions || { deliveryEmail: true, deliveryWhatsapp: true, whatsappNumber: null }
  const waNumber = options.whatsappNumber || (site.whatsapp || '').replace(/\D/g, '')
  const showEmail = options.deliveryEmail !== false
  const showWhatsapp = options.deliveryWhatsapp !== false && !!waNumber

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const service = String(data.get('service') || '')
    const budget = String(data.get('budget') || '')
    const message = String(data.get('message') || '')
    const subject = `Project inquiry — ${name} (${email})`
    const body = `Name: ${name}\nEmail: ${email}\nService: ${service}\nBudget: ${budget}\n\n${message}`

    if (delivery === 'whatsapp' && waNumber) {
      const text = encodeURIComponent(`${subject}\n\n${body}`)
      window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank')
    } else {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
    setSent(true)
  }

  return (
    <SectionShell spacingMode="section">
      <ContentRail maxWidth="max-w-7xl" className="space-y-10">
        <SeraStagger className="space-y-10">
          <SeraStaggerItem>
            <div className="border-b border-border pb-4">
              <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
                Contact
              </p>
            </div>
          </SeraStaggerItem>

          <SeraStaggerItem>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left — info */}
              <div className="flex flex-col gap-6 lg:col-span-5">
                <AnimatedHeading
                  className="max-w-lg text-balance font-medium text-3xl tracking-tight md:text-4xl"
                  highlightWords={['project']}
                  text="Let's talk about your project"
                />
                <p className="max-w-lg text-muted-foreground text-sm leading-relaxed md:text-base">
                  Tell us about your idea — we'll get back to you within one
                  business day with the next steps. No pressure, no commitment.
                </p>

                <div className="flex flex-col gap-3">
                  {channels.map((c) => {
                    const Icon = c.icon
                    return (
                      <a
                        key={c.label}
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="group flex items-start gap-4 border border-border bg-background p-4 transition-colors hover:bg-muted/30"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center border border-border bg-muted/50 text-foreground/80">
                          <Icon className="size-5" />
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
                        className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
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
                  className="flex flex-col gap-5 border border-border bg-background p-6 sm:p-8"
                >
                  <div className="border-b border-border pb-5">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
                      Start a project
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="name">
                        Name
                      </label>
                      <input id="name" name="name" required placeholder="Your name" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="email">
                        Email
                      </label>
                      <input id="email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="service">
                        Service
                      </label>
                      <select id="service" name="service" className={inputClass} defaultValue="Landing Page">
                        <option>Landing Page</option>
                        <option>E-Commerce</option>
                        <option>Company Profile</option>
                        <option>UI/UX Design</option>
                        <option>Web Development</option>
                        <option>Mobile App</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="budget">
                        Budget
                      </label>
                      <select id="budget" name="budget" className={inputClass} defaultValue="Rp 5 – 15 juta">
                        <option>Rp 5 – 15 juta</option>
                        <option>Rp 15 – 40 juta</option>
                        <option>Rp 40 – 100 juta</option>
                        <option>Rp 100 juta+</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="message">
                      Message
                    </label>
                    <textarea id="message" name="message" required rows={4} placeholder="Tell us about your project…" className={inputClass} />
                  </div>

                  {(showEmail || showWhatsapp) && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Kirim via
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {showEmail && (
                          <button
                            type="button"
                            onClick={() => setDelivery('email')}
                            className={`border px-4 py-2 text-xs font-medium transition-colors active:scale-[0.97] ${
                              delivery === 'email'
                                ? 'border-foreground bg-foreground text-background'
                                : 'border-border bg-background text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            Email
                          </button>
                        )}
                        {showWhatsapp && (
                          <button
                            type="button"
                            onClick={() => setDelivery('whatsapp')}
                            className={`border px-4 py-2 text-xs font-medium transition-colors active:scale-[0.97] ${
                              delivery === 'whatsapp'
                                ? 'border-foreground bg-foreground text-background'
                                : 'border-border bg-background text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            WhatsApp
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/85 active:scale-[0.98]"
                  >
                    {sent ? (
                      <>
                        <Check className="size-4" /> {delivery === 'whatsapp' ? 'WhatsApp dibuka' : 'Email dibuka'} — kami balas segera
                      </>
                    ) : (
                      <>
                        Send via {delivery === 'whatsapp' ? 'WhatsApp' : 'Email'} <Send className="size-4" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Dengan mengirim form, kamu setuju dihubungi tim kami via email/WhatsApp.
                  </p>
                </form>
              </div>
            </div>
          </SeraStaggerItem>
        </SeraStagger>
      </ContentRail>
    </SectionShell>
  )
}