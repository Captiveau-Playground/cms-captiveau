"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Quote, Check,
  Lightbulb, Leaf, Target, Bolt, Brain,
} from "lucide-react";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import CTAVideo from "@/components/shadcn-space/blocks/cta-02/cta";

// ─── Data ───────────────────────────────────────────────

const selectedWorks = [
  { slug: "amertavana", image: "/client/amertavana.webp", title: "Amertavana", tag: "Web Development" },
  { slug: "cogan", image: "/client/cogan.webp", title: "Cogan", tag: "UI/UX Design" },
  { slug: "emerintek", image: "/client/emerintek.webp", title: "Emerintek", tag: "Dashboard" },
];

const brandLogos = [
  { src: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-1.svg", name: "Brand 1" },
  { src: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-2.svg", name: "Brand 2" },
  { src: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-3.svg", name: "Brand 3" },
  { src: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-4.svg", name: "Brand 4" },
  { src: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-5.svg", name: "Brand 5" },
];

// ─── Page ───────────────────────────────────────────────

export default function AboutPage() {


  return (
    <>
      {/* ══════ HERO — Full-bleed editorial minimal ══════ */}
      <section className="relative min-h-[85vh] flex items-end pb-24">
        <div className="absolute inset-0 bg-[url('/housess.webp')] bg-cover bg-center bg-no-repeat scale-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-2xl"
          >
            <p className="text-white/40 text-xs font-medium tracking-[0.25em] uppercase mb-4">
              Tentang Kami
            </p>
            <h1 className="text-white text-[clamp(2.8rem,7vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
              Kami adalah apa
              <br />
              yang kami bangun.
            </h1>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="bg-white text-foreground hover:bg-white/90 rounded-full px-8 py-3.5 h-auto text-sm font-medium shadow-xl group">
                  Mulai Diskusi
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ STORY + STATS ══════ */}
      <section className="flex w-full items-center justify-center bg-background py-16 md:py-24 text-foreground">
        <div className="mx-auto grid w-full max-w-7xl px-4 sm:px-6 lg:px-8 items-center gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative overflow-hidden rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="Tim Captiveau"
              className="aspect-[4/3] w-full object-cover grayscale"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-background/5 to-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col"
          >
            <Badge variant="outline" className="mb-4 w-fit text-sm font-normal py-1 px-3 h-7">
              Our Story
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-semibold text-foreground leading-tight">
              Dari side project
              <br />
              <span className="text-primary">jadi platform</span> yang
              <br />
              dipercaya tim
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[15px]/relaxed text-muted-foreground">
              <p>
                Berawal dari kegelisahan dua engineer yang bosan membangun ulang
                antarmuka yang sama di setiap project. Kami mulai mengumpulkan
                pola-pola yang berhasil dan membentuknya menjadi sesuatu yang
                bisa digunakan siapa pun.
              </p>
              <p>
                Tujuh tahun kemudian, koleksi itu tumbuh menjadi platform yang
                digunakan oleh tim di lebih dari empat puluh negara — dari
                solo founder hingga enterprise yang shipping di scale.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                { value: "12K+", label: "Tim onboard" },
                { value: "99.9%", label: "Uptime" },
                { value: "40+", label: "Negara" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="order-2 text-xs text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-2xl font-bold tracking-tight tabular-nums text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* ══════ VALUES — CLEAR ══════ */}
      <section className="flex w-full items-center justify-center bg-background py-16 md:py-24 text-foreground">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-xl"
          >
            <Badge variant="outline" className="text-sm font-normal py-1 px-3 h-7 mb-4">
              CLEAR Values
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Filosofi yang{" "}
              <span className="text-primary">Kami Pegang</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Prinsip yang menjadi landasan dalam setiap produk dan layanan yang kami berikan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { icon: Lightbulb, title: "Creative", desc: "Kami menghadirkan solusi kreatif dan inovatif untuk setiap tantangan digital, menciptakan produk yang tidak hanya fungsional tetapi juga menginspirasi." },
              { icon: Leaf, title: "Lean", desc: "Efisien dan tangkas dalam setiap proses. Kami meminimalkan pemborosan, memaksimalkan value, dan deliver tepat waktu." },
              { icon: Target, title: "Effective", desc: "Fokus pada hasil yang terukur. Setiap strategi dan eksekusi dirancang untuk mencapai tujuan bisnis Anda secara optimal." },
              { icon: Bolt, title: "Active", desc: "Proaktif dan responsif. Kami tidak menunggu masalah — kami bergerak cepat, komunikatif, dan selalu selangkah lebih maju." },
              { icon: Brain, title: "Rational", desc: "Setiap keputusan didasarkan pada data, logika, dan analisis mendalam. Kami membangun solusi yang masuk akal dan berkelanjutan." },
            ].map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="gap-0 border-0 bg-card p-6 transition-colors duration-200 hover:bg-muted"
              >
                <CardContent className="flex flex-col gap-3 p-0">
                  <Icon className="size-6 text-primary" aria-hidden="true" strokeWidth={1.5} />
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ SELECTED WORK — Mini Showcase ══════ */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-muted/30">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Badge variant="outline" className="text-sm font-normal py-1 px-3 h-7 mb-4">
              Selected Work
            </Badge>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl sm:text-5xl font-semibold text-foreground leading-tight">
                Beberapa yang{" "}
                <span className="text-primary">Kami Bangun</span>
              </h2>
              <Link
                href="/portfolio"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all shrink-0"
              >
                Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {selectedWorks.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group"
              >
                <Link href={`/portfolio/${project.slug}`}>
                  <Card className="p-0 ring-0 overflow-hidden shadow-none border-0">
                    <CardContent className="p-0 flex flex-col gap-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 px-2 pb-2">
                        <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-sm text-muted-foreground font-normal">
                          {project.tag}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="sm:hidden mt-6 text-center"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Lihat Semua Project <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════ CLIENT LOGOS ══════ */}
      <section className="py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-center mb-10"
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">
              Dipercaya oleh
            </p>
          </motion.div>
          <Marquee pauseOnHover className="[--duration:30s] p-0">
            {brandLogos.map((brand) => (
              <div key={brand.name} className="mx-8">
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="h-8 w-auto opacity-40 grayscale hover:opacity-70 transition-opacity"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="flex w-full items-center justify-center bg-background py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mx-auto max-w-xl text-center"
          >
            <Badge variant="outline" className="text-sm font-normal py-1 px-3 h-7 mb-4">
              Testimonials
            </Badge>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
            Apa Kata Mereka
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Dengarkan dari klien yang telah membangun produk digital bersama Captiveau.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-14 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3"
          >
            {[
              { quote: "Captiveau benar-benar mengubah cara kami mengembangkan produk digital. Tim mereka berhasil membangun MVP kami dalam 8 minggu.", name: "Budi Santoso", role: "CEO", company: "TechStart Indonesia", avatar: "https://i.pravatar.cc/150?img=11" },
              { quote: "Aplikasi e-learning kami mendapat rating 4.8 di Play Store. Tim Captiveau sangat profesional dan responsif.", name: "Sari Dewi", role: "Founder", company: "EduTech Solutions", avatar: "https://i.pravatar.cc/150?img=5" },
              { quote: "Desain dan kualitas kode mereka luar biasa. Kami sangat puas dengan hasil akhir yang melampaui ekspektasi kami.", name: "Adi Pratama", role: "CTO", company: "Inovasi Digital", avatar: "https://i.pravatar.cc/150?img=60" },
            ].map(({ quote, name, role, company, avatar }) => (
              <Card
                key={name}
                className="flex flex-col gap-0 border-0 bg-card p-8 transition-colors duration-200 hover:bg-muted"
              >
                <CardContent className="flex flex-1 flex-col gap-5 p-0">
                  <Quote className="size-8 text-primary/20" aria-hidden="true" />
                  <blockquote className="flex-1 text-base leading-relaxed text-foreground">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                </CardContent>

                <CardFooter className="mt-8 gap-4 border-t border-border px-0 pt-6 pb-0 flex items-center">
                  <Avatar className="size-10">
                    <AvatarImage src={avatar} alt={name} className="grayscale" />
                    <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                      {name.split(" ").map(p => p[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground">
                      {name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {role}, <span className="font-medium text-foreground">{company}</span>
                    </span>
                  </span>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ CTA — Video ══════ */}
      <CTAVideo />
    </>
  );
}
