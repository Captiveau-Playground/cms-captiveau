"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";
import {
  AppWindowMac, SwatchBook, BarChart3, Image, WandSparkles,
  ArrowRight, CheckCircle, ArrowUpRight, Sparkles,
  ClipboardList, Palette, Code, Zap, TrendingUp, Smartphone,
  Shield, Search, Users, Clock
} from "lucide-react";

const services = [
  {
    icon: AppWindowMac,
    title: "Landing Page",
    slug: "landing-page",
    tagline: "Website Satu Halaman",
    desc: "Buat landing page yang powerful untuk meningkatkan konversi dan penjualan dengan desain yang menarik dan copy yang persuasif.",
    highlights: ["High Conversion Rate", "Loading Super Cepat", "Mobile Responsive", "SEO Optimized"],
    gradient: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: BarChart3,
    title: "E-Commerce",
    slug: "e-commerce",
    tagline: "Platform Jual Beli Online",
    desc: "Bangun toko online yang powerful dengan fitur lengkap untuk meningkatkan penjualan dan memberikan pengalaman berbelanja terbaik.",
    highlights: ["Conversion Optimization", "Secure Payment", "User Management", "Inventory System"],
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-indigo-50 dark:bg-indigo-950/20",
  },
  {
    icon: Image,
    title: "Company Profile",
    slug: "company-profile",
    tagline: "Website Profil Perusahaan",
    desc: "Bangun kredibilitas dan kepercayaan dengan website company profile yang profesional dan informatif.",
    highlights: ["Kredibilitas Tinggi", "Professional Branding", "Lead Generation", "Multi-halaman"],
    gradient: "from-cyan-500 to-blue-600",
    lightBg: "bg-cyan-50 dark:bg-cyan-950/20",
  },
  {
    icon: SwatchBook,
    title: "UI/UX Design",
    slug: "uiux-design",
    tagline: "Web Desain Interface",
    desc: "Ciptakan pengalaman pengguna yang luar biasa dengan desain interface yang indah dipandang, intuitif, dan mudah digunakan.",
    highlights: ["User-Centered Design", "Conversion Focused", "Responsive Design", "Design System"],
    gradient: "from-amber-500 to-orange-500",
    lightBg: "bg-amber-50 dark:bg-amber-950/20",
  },
  {
    icon: WandSparkles,
    title: "Web Development",
    slug: "web-development",
    tagline: "Website Aplikasi Modern",
    desc: "Website performa tinggi dengan teknologi modern seperti Next.js, React, dan TypeScript. Dibangun scalable dan siap masa depan.",
    highlights: ["Next.js & React", "TypeScript", "API Integration", "Performance Optimized"],
    gradient: "from-blue-500 to-purple-600",
    lightBg: "bg-purple-50 dark:bg-purple-950/20",
  },
];

const process = [
  { icon: ClipboardList, step: "01", title: "Konsultasi & Analisis", desc: "Diskusi gratis untuk memahami kebutuhan, riset kompetitor, dan strategi" },
  { icon: Palette, step: "02", title: "Desain & Prototype", desc: "Wireframe hingga high-fidelity prototype yang siap di-review" },
  { icon: Code, step: "03", title: "Development", desc: "Coding dengan standar kualitas tinggi dan teknologi modern" },
  { icon: Shield, step: "04", title: "Testing & QA", desc: "Quality assurance menyeluruh sebelum launch" },
  { icon: Zap, step: "05", title: "Launch & Maintenance", desc: "Deploy ke production dan dukungan berkelanjutan" },
];

export default function ServicesPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-28 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-normal mb-6 border-primary/20 bg-primary/5">
              Layanan
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Solusi Digital Lengkap{" "}
              <span className="text-primary">untuk Bisnis Anda</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Dari landing page hingga platform kompleks — kami hadirkan solusi teknologi
              yang tepat untuk setiap tahap pertumbuhan bisnis Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["Landing Page", "E-Commerce", "UI/UX", "Web App"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm text-primary font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
                >
                  <Link href={`/services/${service.slug}`} className="block h-full group">
                    <Card className={`${service.lightBg} border-0 ring-0 p-8 h-full relative overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                      {/* Gradient hover effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      
                      <CardContent className="p-0 relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                          </div>
                          <span className="text-xs text-muted-foreground font-medium bg-background/80 px-3 py-1 rounded-full">
                            {service.tagline}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {service.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.highlights.map((h) => (
                            <span key={h} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-background/80 text-muted-foreground">
                              <CheckCircle className="w-3 h-3 text-primary" />
                              {h}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                          Selengkapnya <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="px-3 py-1 text-sm font-normal mb-4 border-primary/20">
              Proses
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Bagaimana Kami{" "}
              <span className="text-primary">Bekerja</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Metodologi terbukti yang memastikan setiap project selesai tepat waktu dan sesuai ekspektasi
            </p>
          </motion.div>

          {/* Process Flow - Desktop horizontal, Mobile vertical */}
          <div className="hidden lg:grid grid-cols-5 gap-6 relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary via-primary/50 to-primary/10" />
            
            {process.map((p, i) => {
              const PIcon = p.icon;
              return (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center relative"
                >
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20 relative z-10">
                    <PIcon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{p.step}</span>
                  <h3 className="text-base font-bold text-foreground mt-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Process */}
          <div className="lg:hidden space-y-6">
            {process.map((p, i) => {
              const PIcon = p.icon;
              return (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 pl-8 relative before:absolute before:left-[19px] before:top-14 before:bottom-[-24px] before:w-[2px] before:bg-gradient-to-b before:from-primary before:to-transparent last:before:hidden"
                >
                  <div className="absolute left-0 w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <PIcon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="pt-1">
                    <span className="text-xs font-bold text-primary">{p.step}</span>
                    <h3 className="text-base font-bold text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-blue-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-8 h-8 text-white/60 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Siap Mulai Project Anda?
            </h2>
            <p className="text-lg text-white/80 max-w-md mx-auto mb-8">
              Konsultasikan ide Anda secara gratis dengan tim kami. Tidak ada komitmen, hanya diskusi.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-6 h-auto text-base font-medium shadow-xl">
                  Konsultasi Gratis <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button className="bg-transparent text-white border border-white/30 hover:bg-white/10 rounded-full px-10 py-6 h-auto text-base">
                  Lihat Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
