"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import {
  Mail, Phone, MapPin, ArrowUpRight, MessageSquare, Send
} from "lucide-react";

const contacts = [
  { icon: Mail, label: "Email", value: "hello@captiveau.id", href: "mailto:hello@captiveau.id", desc: "Respon dalam 1×24 jam" },
  { icon: Phone, label: "Telepon / WA", value: "+62-851-1770-5910", href: "tel:+6285117705910", desc: "Senin – Jumat, 09:00–18:00" },
  { icon: MapPin, label: "Lokasi", value: "Tebet, Jakarta Selatan", href: "https://www.google.com/maps/search/Tebet,+Jakarta+Selatan", desc: "Indonesia" },
];

export default function ContactPage() {
  return (
    <>
      {/* ===== HERO — Centered, Clean ===== */}
      <section className="relative pt-36 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6">
              <span className="w-8 h-px bg-primary" />
              Kontak
            </div>
            <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
              Mari{" "}
              <span className="text-primary">Diskusikan</span>
              <br />
              Project Anda
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Punya ide atau project yang ingin diwujudkan? Tim kami siap membantu Anda
              dari konsultasi hingga eksekusi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT — Two Column ===== */}
      <section className="pb-28 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">Hubungi Kami</h2>
              <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
                Isi form di samping atau hubungi langsung. Kami respon dalam 1×24 jam.
              </p>

              <div className="space-y-4">
                {contacts.map((c, i) => {
                  const CIcon = c.icon;
                  const content = (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <Card className="border border-border/30 ring-0 bg-transparent p-5 hover:bg-muted/20 transition-colors duration-300 group">
                        <CardContent className="p-0 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <CIcon className="w-5 h-5 text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{c.label}</p>
                            <p className="text-sm font-semibold text-foreground truncate">{c.value}</p>
                            <p className="text-xs text-muted-foreground">{c.desc}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                  return c.href ? (
                    <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <div key={c.label}>{content}</div>
                  );
                })}
              </div>

              {/* Quick action */}
              <div className="mt-8">
                <a
                  href="https://wa.me/6285117705910"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 h-auto text-sm font-medium shadow-lg shadow-green-600/20 group">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat via WhatsApp
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 lg:col-start-7"
            >
              <Card className="border border-border/30 ring-0 bg-card p-6 sm:p-8">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-primary rounded-full" />
                    <h3 className="text-lg font-semibold text-foreground">Kirim Pesan</h3>
                  </div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nama depan"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Nama belakang"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Anda"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-border bg-transparent text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                      }}
                    >
                      <option value="">Pilih layanan</option>
                      <option value="landing-page">Landing Page</option>
                      <option value="e-commerce">E-Commerce</option>
                      <option value="company-profile">Company Profile</option>
                      <option value="ui-ux">UI/UX Design</option>
                      <option value="web-development">Web Development</option>
                      <option value="other">Lainnya</option>
                    </select>
                    <textarea
                      rows={4}
                      placeholder="Ceritakan tentang project Anda..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 w-4 h-4 rounded border-border accent-primary"
                      />
                      <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                        Saya setuju dengan{" "}
                        <a href="#" className="text-primary underline underline-offset-2">Ketentuan & Privasi</a>
                      </label>
                    </div>
                    <Button className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl py-6 h-auto text-sm font-medium group">
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Pesan
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
