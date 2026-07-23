"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Users, Award, Briefcase, Zap,
  Quote, ArrowUpRight, Sparkles, MapPin, Mail, Phone,
  CheckCircle, Rocket, Lightbulb, Star
} from "lucide-react";
import AboutSection1 from "@/components/ui/about-section-1";
import AboutSection2 from "@/components/ui/about-section-2";
import ValuesClearSection from "@/components/ui/values-clear-section";

const journey = [
  { year: "2025", title: "Captiveau Didirikan", desc: "Berdiri dengan misi mewujudkan ide digital menjadi produk nyata bagi startup, korporasi, dan UMKM Indonesia." },
  { year: "2025", title: "Project Pertama", desc: "Menuntaskan project pertama dan mendapatkan kepercayaan dari klien awal." },
];





const testimonials = [
  { quote: "Captiveau benar-benar mengubah cara kami mengembangkan produk digital. Tim mereka berhasil membangun MVP kami dalam 8 minggu.", name: "Budi Santoso", role: "CEO, TechStart Indonesia" },
  { quote: "Aplikasi e-learning kami mendapat rating 4.8 di Play Store. Tim Captiveau sangat profesional dan responsif.", name: "Sari Dewi", role: "Founder, EduTech Solutions" },
];

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-28 md:pb-36 overflow-hidden">
        {/* Decorative bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="outline" className="px-4 py-1.5 text-sm font-normal mb-6 border-primary/20 bg-primary/5">
                  Tentang Kami
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Lebih dari Sekadar{" "}
                  <span className="text-primary relative">
                    Software House
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                      <path d="M1 10C100 2 200 2 299 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30"/>
                    </svg>
                  </span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Captiveau adalah mitra transformasi digital Anda. Kami mengkhususkan diri dalam
                  desain dan pengembangan produk digital end-to-end — dari konsultasi, strategi,
                  design, pengembangan, hingga maintenance.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link href="/services">
                    <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 h-auto text-base shadow-lg shadow-primary/20">
                      Lihat Layanan Kami
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="rounded-full px-8 py-6 h-auto text-base border-border">
                      Hubungi Kami
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Briefcase, count: "50+", label: "Project Selesai", color: "from-blue-500 to-blue-600" },
                { icon: Users, count: "30+", label: "Klien Puas", color: "from-blue-600 to-indigo-600" },
                { icon: Star, count: "4.9", label: "Rating Klien", color: "from-amber-500 to-orange-500" },
                { icon: Zap, count: "4+", label: "Tahun Pengalaman", color: "from-blue-500 to-cyan-500" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <Card className="border-0 ring-0 overflow-hidden relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <CardContent className="p-6 sm:p-8">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-3xl sm:text-4xl font-bold text-foreground">{stat.count}</p>
                      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION 1 - Animated Hero ===== */}
      <AboutSection1 />

      {/* ===== JOURNEY ===== */}
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
              Perjalanan
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Perjalanan{" "}
              <span className="text-primary">Kami</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Tonggak penting dalam perjalanan Captiveau sejak awal berdiri
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative space-y-10 pl-10 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
              {journey.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative"
                >
                  <div className="absolute -left-10 top-1 w-8 h-8 rounded-full bg-primary border-4 border-background flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <Card className="border border-border/50 ring-0 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-0">
                      <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLEAR VALUES ===== */}
      <ValuesClearSection />

      {/* ===== ABOUT SECTION 2 - Highlight ===== */}
      <AboutSection2 />


      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="px-3 py-1 text-sm font-normal mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
              Testimonial
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Apa Kata{" "}
              <span className="text-white/80">Klien Kami</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/10 ring-0 p-8 h-full">
                  <CardContent className="p-0">
                    <Quote className="w-8 h-8 text-white/30 mb-4" />
                    <p className="text-white/90 leading-relaxed text-sm md:text-base italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-white/60 text-xs mt-0.5">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Siap Bekerja Sama dengan Kami?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Jadilah klien berikutnya. Konsultasikan ide Anda secara gratis — tidak ada komitmen, hanya diskusi.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-6 h-auto text-base shadow-lg shadow-primary/20">
                  Mulai Diskusi <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="rounded-full px-10 py-6 h-auto text-base border-border">
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
