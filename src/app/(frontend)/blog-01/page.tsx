"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
    title: "Cara Memilih Teknologi yang Tepat untuk Startup Anda di 2026",
    category: "Tech",
    date: "2026-07-15",
    readTime: "5 min read",
    excerpt: "Memilih stack teknologi yang tepat adalah keputusan krusial yang akan memengaruhi skalabilitas dan biaya pengembangan produk digital Anda.",
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
    title: "Mengapa UI/UX Design adalah Investasi, Bukan Biaya",
    category: "Design",
    date: "2026-07-08",
    readTime: "4 min read",
    excerpt: "Desain yang baik bukan hanya soal estetika — ini tentang menciptakan pengalaman yang mengkonversi pengunjung menjadi pelanggan setia.",
  },
  {
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1470&auto=format&fit=crop",
    title: "Landing Page vs Website Multi-Halaman: Mana yang Tepat?",
    category: "Strategy",
    date: "2026-06-28",
    readTime: "6 min read",
    excerpt: "Tidak semua bisnis membutuhkan website multi-halaman. Pelajari kapan landing page cukup dan kapan Anda perlu website yang lebih kompleks.",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    title: "7 Metrik Kunci untuk Mengukur Kesuksesan Digital Product",
    category: "Analytics",
    date: "2026-06-20",
    readTime: "7 min read",
    excerpt: "Jangan hanya menebak — ukur. Berikut metrik-metrik penting yang harus Anda pantau untuk memastikan produk digital Anda sukses.",
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop",
    title: "Proses Development Produk Digital: Dari Ide ke Launch",
    category: "Development",
    date: "2026-06-12",
    readTime: "8 min read",
    excerpt: "Memahami siklus pengembangan produk digital membantu Anda merencanakan anggaran, timeline, dan ekspektasi dengan lebih baik.",
  },
  {
    image: "https://images.unsplash.com/photo-1432889821006-3149403b3c5a?q=80&w=1474&auto=format&fit=crop",
    title: "SEO untuk Website Bisnis: Panduan Lengkap 2026",
    category: "Marketing",
    date: "2026-06-05",
    readTime: "10 min read",
    excerpt: "SEO bukan magic — ini strategi. Pelajari cara membuat website bisnis Anda muncul di halaman pertama Google.",
  },
];

const categories = ["Semua", "Tech", "Design", "Strategy", "Development", "Marketing", "Analytics"];

export default function BlogPage() {
  return (
    <>
      {/* ===== HERO — Clean Blog Header ===== */}
      <section className="relative pt-36 pb-20">
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
              Blog
            </div>
            <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
              Wawasan &{" "}
              <span className="text-primary">Inspirasi</span>
              <br />
              Digital
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Artikel, panduan, dan insights seputar teknologi, desain, dan strategi digital
              untuk membantu bisnis Anda bertumbuh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== ARTICLES ===== */}
      <section className="pb-28 relative">
        <div className="absolute inset-0 bg-muted/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-border/40"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  cat === "Semua"
                    ? "bg-primary text-white"
                    : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <Link href="#" className="group block">
              <Card className="p-0 ring-0 overflow-hidden border border-border/30 hover:shadow-xl transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div className="lg:col-span-3 aspect-[16/10] lg:aspect-auto overflow-hidden bg-muted">
                    <img
                      src={articles[0].image}
                      alt={articles[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-center">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      {articles[0].category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-2 group-hover:text-primary transition-colors">
                      {articles[0].title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {articles[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(articles[0].date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {articles[0].readTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-5 group-hover:gap-3 transition-all">
                      Baca Artikel <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.slice(1).map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href="#" className="group block h-full">
                  <Card className="p-0 ring-0 overflow-hidden border border-border/30 hover:shadow-lg transition-all duration-500 h-full">
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mt-4 group-hover:gap-3 transition-all">
                        Baca Artikel <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Load more */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <button className="px-8 py-3 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
              Muat Artikel Lainnya
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
