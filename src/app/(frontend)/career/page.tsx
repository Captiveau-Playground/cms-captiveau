"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Heart, Lightbulb, Zap, Users, Briefcase, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const benefits = [
  { icon: Heart, title: "Lingkungan Suportif", desc: "Budaya kolaboratif yang saling mendukung" },
  { icon: Lightbulb, title: "Belajar & Berkembang", desc: "Akses kursus, conference, dan resources" },
  { icon: Zap, title: "Teknologi Modern", desc: "Stack teknologi terkini untuk setiap project" },
  { icon: Users, title: "Tim Solid", desc: "Bergabung dengan tim yang passionate dan expert" },
];

const openPositions = [
  {
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote / Jakarta",
    desc: "React, Next.js, TypeScript — membangun UI yang cepat dan indah.",
  },
  {
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Remote / Jakarta",
    desc: "Merancang pengalaman pengguna yang intuitif dan visual memukau.",
  },
  {
    title: "Backend Developer",
    type: "Full-time",
    location: "Remote / Jakarta",
    desc: "API dan sistem backend yang scalable dengan Node.js & PostgreSQL.",
  },
  {
    title: "Project Manager",
    type: "Full-time",
    location: "Jakarta",
    desc: "Mengelola timeline, komunikasi klien, dan koordinasi tim.",
  },
];

export default function CareerPage() {
  return (
    <>
      {/* ===== HERO ===== */}
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
              Karir
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
              Bergabung dengan{" "}
              <span className="text-primary">Tim Captiveau</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Kami mencari talenta terbaik yang passionate dalam menciptakan produk digital
              berkualitas. Jadilah bagian dari perjalanan kami.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-muted/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6">
              <span className="w-8 h-px bg-primary" />
              Mengapa Kami
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-[1.05] tracking-[-0.03em] mb-10">
              Mengapa Bekerja di Captiveau?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => {
              const BIcon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="border-0 ring-0 bg-card p-6 h-full hover:shadow-md transition-all">
                    <CardContent className="p-0">
                      <BIcon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                      <h3 className="text-base font-semibold text-foreground mb-1.5">{b.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== OPEN POSITIONS ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6">
              <span className="w-8 h-px bg-primary" />
              Lowongan
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-[1.05] tracking-[-0.03em]">
              Posisi Tersedia
            </h2>
          </motion.div>

          <div className="space-y-3 max-w-3xl">
            {openPositions.map((pos, i) => (
              <motion.div
                key={pos.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <Card className="border border-border/30 ring-0 p-5 hover:border-primary/20 transition-all group">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{pos.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{pos.desc}</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Briefcase className="w-3 h-3" strokeWidth={1.5} /> {pos.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" strokeWidth={1.5} /> {pos.location}
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary shrink-0 group-hover:gap-3 transition-all"
                      >
                        Lamar <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Tidak cocok? Tetap kirim CV ke{" "}
              <a href="mailto:hello@captiveau.id" className="text-primary hover:underline underline-offset-2">hello@captiveau.id</a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
