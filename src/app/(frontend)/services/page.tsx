"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";
import {
  AppWindowMac, SwatchBook, BarChart3, Image, WandSparkles,
  ArrowRight, ArrowUpRight, Sparkles, CheckCircle,
  ClipboardList, Palette, Code, Shield, Zap
} from "lucide-react";

const services = [
  {
    icon: AppWindowMac,
    title: "Landing Page",
    slug: "landing-page",
    tagline: "Konversi Maksimal",
    desc: "Landing page powerfull dengan desain menarik dan copy persuasif untuk tingkatkan konversi.",
    highlights: ["High Conversion Rate", "Super Cepat", "SEO Optimized"],
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: BarChart3,
    title: "E-Commerce",
    slug: "e-commerce",
    tagline: "Platform Jual Beli",
    desc: "Toko online dengan fitur lengkap, payment gateway, dan inventory management.",
    highlights: ["Conversion Optimization", "Secure Payment", "Inventory System"],
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Image,
    title: "Company Profile",
    slug: "company-profile",
    tagline: "Brand Kredibel",
    desc: "Website company profile profesional yang membangun kepercayaan dan kredibilitas.",
    highlights: ["Professional Branding", "Lead Generation", "Multi-halaman"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: SwatchBook,
    title: "UI/UX Design",
    slug: "uiux-design",
    tagline: "Pengalaman Premium",
    desc: "Desain interface yang indah, intuitif, dan conversion-focused.",
    highlights: ["User-Centered Design", "Conversion Focused", "Design System"],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: WandSparkles,
    title: "Web Development",
    slug: "web-development",
    tagline: "Teknologi Modern",
    desc: "Aplikasi web performa tinggi dengan Next.js, React, dan TypeScript.",
    highlights: ["Next.js & React", "TypeScript", "API Integration"],
    gradient: "from-purple-500 to-purple-600",
  },
];

const process = [
  { icon: ClipboardList, step: "01", title: "Konsultasi & Analisis", desc: "Diskusi kebutuhan, riset, dan strategi" },
  { icon: Palette, step: "02", title: "Desain & Prototype", desc: "Wireframe hingga high-fidelity prototype" },
  { icon: Code, step: "03", title: "Development", desc: "Coding dengan standar kualitas tinggi" },
  { icon: Shield, step: "04", title: "Testing & QA", desc: "Quality assurance menyeluruh" },
  { icon: Zap, step: "05", title: "Launch & Maintenance", desc: "Deploy dan dukungan berkelanjutan" },
];

export default function ServicesPage() {
  return (
    <>
      {/* ===== HERO — Asymmetric Grid ===== */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-8">
                <span className="w-8 h-px bg-primary" />
                Layanan
              </div>
              <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-foreground">
                Solusi Digital
                <br />
                <span className="text-primary">End-to-End</span>
              </h1>
              <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Dari landing page hingga platform kompleks — kami hadirkan solusi teknologi
                yang tepat untuk setiap tahap pertumbuhan bisnis Anda.
              </p>
            </motion.div>

            {/* Right — Tag cloud */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-4 lg:col-start-9 lg:self-end pb-4"
            >
              <div className="flex flex-wrap gap-3">
                {["Landing Page", "E-Commerce", "UI/UX Design", "Web App", "Company Profile", "Dashboard", "Mobile App", "Brand Identity"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                    className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm text-primary font-medium hover:bg-primary/10 transition-colors cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES — Editorial Grid ===== */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isFeatured = i === 0;

              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={isFeatured ? "md:col-span-2 lg:col-span-2" : ""}
                >
                  <Link href={`/services/${service.slug}`} className="block h-full group">
                    <Card className="border-0 ring-0 bg-card p-0 h-full overflow-hidden hover:shadow-xl transition-all duration-500">
                      <div className={`p-6 sm:p-8 h-full flex flex-col ${isFeatured ? 'lg:flex-row lg:items-center lg:gap-8' : ''}`}>
                        <div className={isFeatured ? 'lg:flex-1' : ''}>
                          <div className="flex items-start justify-between mb-5">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                              <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                            </div>
                            <span className="text-[11px] text-muted-foreground font-medium bg-muted/50 px-2.5 py-1 rounded-full">
                              {service.tagline}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                            {service.desc}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {service.highlights.map((h) => (
                              <span key={h} className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-primary/5 text-muted-foreground">
                                <CheckCircle className="w-2.5 h-2.5 text-primary" />
                                {h}
                              </span>
                            ))}
                          </div>

                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                            Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>

                        {isFeatured && (
                          <div className="hidden lg:block lg:w-48 h-48 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center shrink-0">
                            <div className="text-center">
                              <p className="text-4xl font-bold text-primary/30">#1</p>
                              <p className="text-xs text-muted-foreground mt-1">Most Requested</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PROCESS — Horizontal Flow ===== */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6">
              <span className="w-8 h-px bg-primary" />
              Proses
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.05] tracking-[-0.03em] max-w-2xl">
              Bagaimana Kami <span className="text-primary">Bekerja</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {process.map((p, i) => {
              const PIcon = p.icon;
              return (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="border border-border/30 ring-0 p-5 h-full bg-transparent hover:border-primary/20 transition-colors duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold text-primary tracking-wider">{p.step}</span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      <PIcon className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                      <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{p.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-28 relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-6 h-6 text-white/40 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.05] tracking-[-0.03em] mb-4">
              Siap Mulai Project?
            </h2>
            <p className="text-white/60 max-w-sm mx-auto mb-8">
              Konsultasi gratis. Tidak ada komitmen, hanya diskusi.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-white text-foreground hover:bg-white/90 rounded-full px-10 py-6 h-auto text-base shadow-xl group">
                  Konsultasi Gratis <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button className="bg-transparent text-white border border-white/20 hover:bg-white/10 rounded-full px-10 py-6 h-auto text-base">
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
