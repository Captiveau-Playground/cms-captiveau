"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Sparkles, Eye, TrendingUp,
  Star, Zap, Users
} from "lucide-react";

const projects = [
  {
    slug: "amertavana",
    image: "/client/amertavana.webp",
    title: "Amertavana",
    tags: ["Web Development", "Brand Identity"],
    desc: "Website company profile modern dengan desain elegan dan performa optimal untuk brand lifestyle premium.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    slug: "cogan",
    image: "/client/cogan.webp",
    title: "Cogan",
    tags: ["UI/UX Design", "Mobile App"],
    desc: "Aplikasi mobile dengan pengalaman pengguna yang intuitif dan desain visual yang memukau.",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    slug: "emerintek",
    image: "/client/emerintek.webp",
    title: "Emerintek",
    tags: ["Web Platform", "Dashboard"],
    desc: "Platform dashboard analitik dengan visualisasi data real-time dan sistem manajemen yang komprehensif.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    slug: "indomaja",
    image: "/client/indomaja.webp",
    title: "Indomaja",
    tags: ["E-Commerce", "Digital Strategy"],
    desc: "Platform e-commerce dengan fitur lengkap, payment gateway terintegrasi, dan inventory management.",
    gradient: "from-amber-500 to-orange-500",
  },
];

const stats = [
  { icon: Eye, count: "50+", label: "Project Selesai" },
  { icon: Users, count: "30+", label: "Klien Terpercaya" },
  { icon: Star, count: "4.9", label: "Rating Klien" },
  { icon: TrendingUp, count: "35%", label: "Rata-rata Peningkatan" },
];

export default function PortfolioPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-28 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="px-4 py-1.5 text-sm font-normal mb-6 border-primary/20 bg-primary/5">
                Portfolio
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Karya &{" "}
                <span className="text-primary">Project Terbaru</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Berikut adalah beberapa project yang telah kami kerjakan. Setiap project
                adalah bukti komitmen kami terhadap kualitas dan kepuasan klien.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact">
                  <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 h-auto text-base shadow-lg shadow-primary/20">
                    Mulai Project <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <Card className="border border-border/50 ring-0 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <s.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-foreground">{s.count}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="px-3 py-1 text-sm font-normal mb-4 border-primary/20">
              Project
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Yang Telah{" "}
              <span className="text-primary">Kami Kerjakan</span>
            </h2>
          </motion.div>

          <div className="space-y-8 lg:space-y-12">
            {projects.map((project, i) => {
              const isReversed = i % 2 === 1;
              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <Link href={`/portfolio/${project.slug}`} className="block group">
                    <Card className="p-0 ring-0 overflow-hidden border border-border/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                      <div className={`grid grid-cols-1 lg:grid-cols-2 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                        {/* Image */}
                        <div className={`aspect-[16/10] lg:aspect-auto overflow-hidden bg-muted ${isReversed ? 'lg:order-2' : ''}`}>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        {/* Content */}
                        <div className={`p-8 sm:p-10 lg:p-12 flex flex-col justify-center ${isReversed ? 'lg:order-1' : ''}`}>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mt-3 leading-relaxed">
                            {project.desc}
                          </p>
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-6 group-hover:gap-3 transition-all">
                            Lihat Detail Project <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-blue-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-8 h-8 text-white/60 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Punya Project untuk Kami?
            </h2>
            <p className="text-lg text-white/80 max-w-md mx-auto mb-8">
              Jadilah klien kami berikutnya. Konsultasikan ide Anda secara gratis!
            </p>
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-6 h-auto text-base font-medium shadow-xl">
                Hubungi Kami <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
