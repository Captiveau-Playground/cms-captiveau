"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import {
  Mail, Phone, MapPin, Clock, ArrowUpRight, Sparkles,
  MessageSquare, Send, CheckCircle
} from "lucide-react";
import ContactForm from "@/components/shadcn-space/blocks/contact-01/contact-form";

const contacts = [
  { icon: Mail, label: "Email", value: "hello@captiveau.id", href: "mailto:hello@captiveau.id", desc: "Respon dalam 1x24 jam" },
  { icon: Phone, label: "Telepon / WA", value: "+62-851-1770-5910", href: "tel:+6285117705910", desc: "Senin - Jumat, 09:00 - 18:00" },
  { icon: MapPin, label: "Lokasi", value: "Tebet, South Jakarta", href: "https://www.google.com/maps/search/Tebet, South Jakarta", desc: "Indonesia" },
  { icon: Clock, label: "Jam Kerja", value: "Senin - Jumat", href: undefined, desc: "09:00 - 18:00 WIB" },
];

const faqHighlights = [
  "Berapa lama proses pembuatan aplikasi?",
  "Bagaimana sistem pricingnya?",
  "Apakah ada garansi setelah launch?",
];

export default function ContactPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-28 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-normal mb-6 border-primary/20 bg-primary/5">
              Kontak
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Mari{" "}
              <span className="text-primary">Diskusikan</span> Project Anda
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Punya ide atau project yang ingin diwujudkan? Jangan ragu untuk menghubungi kami.
              Tim kami siap membantu Anda dari konsultasi hingga eksekusi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT GRID ===== */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="px-3 py-1 text-sm font-normal mb-4 border-primary/20">
                Info Kontak
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Hubungi Kami
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
                Isi form di samping atau hubungi kami langsung melalui kontak di bawah ini.
                Kami akan merespon dalam 1x24 jam.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contacts.map((c, i) => {
                  const CIcon = c.icon;
                  const content = (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <Card className="border border-border/50 ring-0 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full group">
                        <CardContent className="p-0">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <CIcon className="w-5 h-5 text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                          </div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{c.label}</p>
                          <p className="text-sm font-semibold text-foreground mt-0.5">{c.value}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
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

              {/* Quick FAQ */}
              <div className="mt-8 p-5 rounded-xl bg-muted/50 border border-border/50">
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Pertanyaan Umum
                </p>
                <ul className="space-y-2">
                  {faqHighlights.map((q) => (
                    <li key={q} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                      {q}
                    </li>
                  ))}
                </ul>
                <a href="/faq" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 hover:gap-2 transition-all">
                  Lihat semua FAQ <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Lebih Cepat? Hubungi Langsung
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Kirim pesan langsung ke WhatsApp kami untuk respon lebih cepat
            </p>
            <a
              href="https://wa.me/6285117705910"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-10 py-6 h-auto text-base shadow-lg shadow-green-600/20">
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
