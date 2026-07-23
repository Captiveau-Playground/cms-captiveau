import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppWindowMac, SwatchBook, BarChart3, Image, WandSparkles, ArrowRight, CheckCircle, Clock, Users, Shield, TrendingUp, Smartphone, Search, Palette, Code, Zap, Award } from "lucide-react";
import Link from "next/link";

const serviceDetails: Record<string, {
  icon: typeof AppWindowMac;
  title: string;
  tagline: string;
  desc: string;
  benefits: { icon: typeof Clock; label: string; desc: string }[];
  highlights: { icon: typeof CheckCircle; text: string }[];
  process: string[];
}> = {
  "landing-page": {
    icon: AppWindowMac,
    title: "Landing Page",
    tagline: "Website Satu Halaman",
    desc: "Buat landing page yang powerful untuk meningkatkan konversi dan penjualan dengan desain yang menarik dan copy yang persuasif. Dibangun dengan teknologi terkini untuk performa maksimal.",
    benefits: [
      { icon: Zap, label: "High Conversion Rate", desc: "Desain yang dioptimalkan untuk mengubah pengunjung menjadi pelanggan" },
      { icon: Clock, label: "Loading Super Cepat", desc: "Optimasi performa hingga di bawah 2 detik waktu muat" },
      { icon: Smartphone, label: "Mobile Responsive", desc: "Tampil sempurna di semua perangkat, dari desktop hingga smartphone" },
      { icon: Search, label: "SEO Optimized", desc: "Struktur kode yang ramah mesin pencari untuk visibilitas maksimal" },
    ],
    highlights: [
      { icon: CheckCircle, text: "High Conversion Rate — desain dioptimalkan untuk konversi" },
      { icon: CheckCircle, text: "Loading Super Cepat — performa di bawah 2 detik" },
      { icon: CheckCircle, text: "Mobile Responsive — sempurna di semua perangkat" },
      { icon: CheckCircle, text: "SEO Optimized — ramah mesin pencari" },
      { icon: CheckCircle, text: "Animasi engaging — micro-interactions yang memukau" },
      { icon: CheckCircle, text: "Integration Ready — siap integrasi dengan CRM & analytics" },
    ],
    process: ["Konsultasi & Analisis Kebutuhan", "Wireframe & Copywriting", "Desain Visual", "Development & Integrasi", "Testing & Optimasi", "Launch & Maintenance"],
  },
  "e-commerce": {
    icon: BarChart3,
    title: "E-Commerce",
    tagline: "Platform Jual Beli Online",
    desc: "Bangun toko online yang powerful dengan fitur lengkap untuk meningkatkan penjualan dan memberikan pengalaman berbelanja terbaik bagi pelanggan Anda.",
    benefits: [
      { icon: TrendingUp, label: "Conversion Optimization", desc: "Fitur-fitur yang dirancang untuk meningkatkan rasio konversi penjualan" },
      { icon: Shield, label: "Secure Payment", desc: "Integrasi payment gateway aman dengan berbagai metode pembayaran" },
      { icon: Users, label: "User Management", desc: "Sistem manajemen pengguna, roles, dan permissions yang lengkap" },
      { icon: Zap, label: "Inventory System", desc: "Manajemen stok, varian produk, dan tracking otomatis" },
    ],
    highlights: [
      { icon: CheckCircle, text: "Multi-payment gateway — banyak opsi pembayaran" },
      { icon: CheckCircle, text: "Manajemen produk & inventaris real-time" },
      { icon: CheckCircle, text: "Sistem keranjang & checkout yang mulus" },
      { icon: CheckCircle, text: "Dashboard admin yang intuitif" },
      { icon: CheckCircle, text: "SEO untuk produk & kategori" },
      { icon: CheckCircle, text: "Integrasi expedisi & tracking otomatis" },
    ],
    process: ["Konsultasi & Analisis Kebutuhan", "Information Architecture", "Desain UX/UI", "Backend & Frontend Development", "Payment Integration & Testing", "Launch & Maintenance"],
  },
  "company-profile": {
    icon: Image,
    title: "Company Profile",
    tagline: "Website Profil Perusahaan",
    desc: "Bangun kredibilitas dan kepercayaan dengan website company profile yang profesional dan informatif untuk menampilkan identitas perusahaan Anda.",
    benefits: [
      { icon: Award, label: "Kredibilitas Tinggi", desc: "Tampilan profesional yang membangun kepercayaan pengunjung" },
      { icon: Palette, label: "Professional Branding", desc: "Desain yang merefleksikan identitas dan nilai perusahaan Anda" },
      { icon: TrendingUp, label: "Lead Generation", desc: "Fitur-fitur strategis untuk mengubah pengunjung menjadi prospek" },
      { icon: Smartphone, label: "Multi-halaman", desc: "Struktur halaman lengkap: tentang, layanan, portofolio, kontak" },
    ],
    highlights: [
      { icon: CheckCircle, text: "Desain eksklusif sesuai brand perusahaan" },
      { icon: CheckCircle, text: "Multi-page: beranda, tentang, layanan, galeri, kontak" },
      { icon: CheckCircle, text: "CMS siap pakai — update konten mudah" },
      { icon: CheckCircle, text: "Integrasi Google Maps & contact form" },
      { icon: CheckCircle, text: "SEO & performa optimal" },
      { icon: CheckCircle, text: "Blog/artikel siap untuk content marketing" },
    ],
    process: ["Konsultasi Brand & Kebutuhan", "Sitemap & Wireframe", "Desain Visual & Branding", "Development & CMS Setup", "Testing & Konten Filling", "Launch & Training"],
  },
  "uiux-design": {
    icon: SwatchBook,
    title: "UI/UX Design",
    tagline: "Web Desain Interface",
    desc: "Ciptakan pengalaman pengguna yang luar biasa dengan desain interface yang tidak hanya indah dipandang, tetapi juga intuitif dan mudah digunakan.",
    benefits: [
      { icon: Users, label: "User-Centered Design", desc: "Setiap keputusan desain didasarkan pada riset dan kebutuhan pengguna" },
      { icon: TrendingUp, label: "Conversion Focused", desc: "Desain yang dioptimalkan untuk mencapai tujuan bisnis" },
      { icon: Smartphone, label: "Responsive Design", desc: "Pengalaman konsisten di semua perangkat dan ukuran layar" },
      { icon: Palette, label: "Design System", desc: "Sistem desain yang scalable dan konsisten untuk produk Anda" },
    ],
    highlights: [
      { icon: CheckCircle, text: "User Research & Analysis — memahami pengguna Anda" },
      { icon: CheckCircle, text: "Wireframe & Prototype interaktif — uji sebelum develop" },
      { icon: CheckCircle, text: "Visual Design — estetika yang memukau" },
      { icon: CheckCircle, text: "Design System — konsisten dan scalable" },
      { icon: CheckCircle, text: "Usability Testing — validasi dengan pengguna nyata" },
      { icon: CheckCircle, text: "Handoff siap pakai untuk developer" },
    ],
    process: ["Discovery & Research", "Information Architecture", "Wireframe & Prototype", "Visual Design", "Usability Testing", "Design Handoff"],
  },
  "web-development": {
    icon: WandSparkles,
    title: "Web Development",
    tagline: "Website Aplikasi Modern",
    desc: "Website performa tinggi dengan teknologi modern seperti Next.js, React, dan TypeScript. Dibangun dengan arsitektur scalable dan siap untuk masa depan.",
    benefits: [
      { icon: Code, label: "Next.js & React", desc: "Framework modern untuk performa dan SEO terbaik" },
      { icon: Shield, label: "TypeScript", desc: "Kode yang aman, maintainable, dan scalable" },
      { icon: Zap, label: "API Integration", desc: "Siap integrasi dengan berbagai layanan dan API eksternal" },
      { icon: TrendingUp, label: "Performance Optimized", desc: "Core Web Vitals optimal untuk pengalaman dan ranking terbaik" },
    ],
    highlights: [
      { icon: CheckCircle, text: "Next.js 16 + React 19 — teknologi terbaru" },
      { icon: CheckCircle, text: "Responsive & mobile-first design" },
      { icon: CheckCircle, text: "Server-side rendering untuk SEO maksimal" },
      { icon: CheckCircle, text: "API & database integration" },
      { icon: CheckCircle, text: "Optimasi Core Web Vitals" },
      { icon: CheckCircle, text: "CI/CD & deployment siap produksi" },
    ],
    process: ["Konsultasi & Technical Planning", "System Architecture", "UI Implementation", "Backend & API Development", "Testing & QA", "Deployment & Maintenance"],
  },
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceDetails[slug];
  
  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">
              ← Kembali ke Layanan
            </Link>
            <Badge variant="outline" className="px-3 py-1 text-sm font-normal mb-4">
              {service.tagline}
            </Badge>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{service.title}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {service.desc}
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/contact">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 h-auto text-base">
                  Konsultasi Gratis
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="rounded-full px-8 py-6 h-auto text-base">
                  Lihat Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Kenapa Memilih Layanan Ini?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Manfaat yang akan Anda dapatkan dengan layanan {service.title} dari Captiveau
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((b) => {
              const BIcon = b.icon;
              return (
                <Card key={b.label} className="border border-border/50 ring-0 p-6 text-center">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <BIcon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{b.label}</h3>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="px-3 py-1 text-sm font-normal mb-4">
                Highlights
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Yang Akan Anda Dapatkan
              </h2>
              <ul className="space-y-4">
                {service.highlights.map((h) => (
                  <li key={h.text} className="flex items-start gap-3">
                    <h.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{h.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Badge variant="outline" className="px-3 py-1 text-sm font-normal mb-4">
                Proses Pengerjaan
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Tahapan Pengerjaan
              </h2>
              <div className="space-y-4">
                {service.process.map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-medium flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Tertarik dengan Layanan {service.title}?
            </h2>
            <p className="text-white/80 max-w-md mx-auto mb-8">
              Diskusikan kebutuhan Anda dengan tim kami. Konsultasi gratis tanpa komitmen.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 h-auto text-base font-medium">
                Konsultasi Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
