"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Sparkles
} from "lucide-react";

const projects = [
  {
    slug: "amertavana",
    image: "/client/amertavana.webp",
    title: "Amertavana",
    tags: ["Web Development", "Brand Identity"],
    desc: "Website company profile modern untuk brand lifestyle premium dengan desain elegan dan performa optimal.",
    gradient: "from-blue-500 to-blue-600",
    size: "large",
  },
  {
    slug: "cogan",
    image: "/client/cogan.webp",
    title: "Cogan",
    tags: ["UI/UX Design", "Mobile App"],
    desc: "Aplikasi mobile dengan pengalaman pengguna yang intuitif dan desain visual yang memukau.",
    gradient: "from-indigo-500 to-indigo-600",
    size: "small",
  },
  {
    slug: "emerintek",
    image: "/client/emerintek.webp",
    title: "Emerintek",
    tags: ["Web Platform", "Dashboard"],
    desc: "Platform dashboard analitik dengan visualisasi data real-time dan sistem manajemen komprehensif.",
    gradient: "from-cyan-500 to-blue-600",
    size: "small",
  },
  {
    slug: "indomaja",
    image: "/client/indomaja.webp",
    title: "Indomaja",
    tags: ["E-Commerce", "Digital Strategy"],
    desc: "Platform e-commerce dengan fitur lengkap, payment gateway terintegrasi, dan inventory management.",
    gradient: "from-amber-500 to-orange-500",
    size: "large",
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* ===== HERO — Minimal ===== */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-8">
              <span className="w-8 h-px bg-primary" />
              Portfolio
            </div>
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-foreground">
              Karya &{" "}
              <span className="text-primary">Project</span>
              <br />
              Terbaru
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Setiap project adalah bukti komitmen kami terhadap kualitas dan kepuasan klien.
              Dari startup hingga korporasi — kami wujudkan visi digital mereka.
            </p>
            <Link href="/contact">
              <Button className="mt-8 bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 h-auto text-base shadow-lg shadow-primary/20 group">
                Mulai Project <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== PROJECTS — Masonry-esque ===== */}
      <section className="py-16 pb-28 relative">
        <div className="absolute inset-0 bg-muted/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">
            {projects.map((project, i) => {
              const isLarge = project.size === "large";
              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={isLarge ? "md:col-span-7" : "md:col-span-5"}
                >
                  <Link href={`/portfolio/${project.slug}`} className="block h-full group">
                    <Card className="p-0 ring-0 overflow-hidden border border-border/30 hover:shadow-xl transition-all duration-500 h-full">
                      <div className="flex flex-col h-full">
                        {/* Image */}
                        <div className={`overflow-hidden bg-muted ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                        </div>
                        {/* Content */}
                        <div className="p-5 sm:p-6 flex flex-col flex-1">
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {project.tags.map((tag) => (
                              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed flex-1">
                            {project.desc}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-4 group-hover:gap-3 transition-all">
                            Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { count: "50+", label: "Project Selesai" },
              { count: "30+", label: "Klien Terpercaya" },
              { count: "4.9", label: "Rating Klien" },
              { count: "35%", label: "Rata-rata Peningkatan" },
            ].map((s) => (
              <Card key={s.label} className="border-0 ring-0 bg-background p-5 text-center">
                <CardContent className="p-0">
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{s.count}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-28 relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-6 h-6 text-white/40 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.05] tracking-[-0.03em] mb-4">
              Punya Project untuk Kami?
            </h2>
            <p className="text-white/60 max-w-sm mx-auto mb-8">
              Jadilah klien berikutnya. Konsultasi gratis, tanpa komitmen.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-foreground hover:bg-white/90 rounded-full px-10 py-6 h-auto text-base shadow-xl group">
                Hubungi Kami <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
