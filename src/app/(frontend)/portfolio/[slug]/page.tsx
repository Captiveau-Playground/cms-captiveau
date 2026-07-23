import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, CheckCircle, Globe, Smartphone, Palette, Zap, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const projectDetails: Record<string, {
  title: string;
  image: string;
  tags: string[];
  desc: string;
  challenge: string;
  solution: string;
  results: { icon: typeof CheckCircle; text: string }[];
  features: string[];
  tech: string[];
  url?: string;
}> = {
  "amertavana": {
    title: "Amertavana",
    image: "/client/amertavana.webp",
    tags: ["Web Development", "Brand Identity"],
    desc: "Website company profile modern untuk brand lifestyle premium dengan desain elegan dan performa optimal.",
    challenge: "Amertavana membutuhkan website yang bisa merepresentasikan identitas brand premium mereka dengan desain yang elegan, namun tetap fungsional dan cepat diakses.",
    solution: "Kami membangun website company profile dengan pendekatan visual storytelling, mengutamakan tipografi yang bersih, palet warna yang hangat, dan animasi halus yang menciptakan pengalaman browsing yang premium.",
    results: [
      { icon: Zap, text: "Loading time di bawah 1.5 detik" },
      { icon: Globe, text: "SEO score 95+ di Lighthouse" },
      { icon: Smartphone, text: "100% responsive di semua perangkat" },
      { icon: TrendingUp, text: "Bounce rate turun 40%" },
    ],
    features: ["Visual storytelling dengan hero video", "Animasi scroll yang halus", "Galeri produk interaktif", "Blog terintegrasi", "Contact form dengan CRM integration", "Multi-language support"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
  },
  "cogan": {
    title: "Cogan",
    image: "/client/cogan.webp",
    tags: ["UI/UX Design", "Mobile App"],
    desc: "Aplikasi mobile dengan pengalaman pengguna yang intuitif dan desain visual yang memukau.",
    challenge: "Cogan ingin menghadirkan aplikasi mobile yang tidak hanya fungsional tetapi juga memberikan pengalaman pengguna yang menyenangkan dan mudah digunakan oleh target audiens yang beragam.",
    solution: "Kami melakukan riset pengguna mendalam, membuat wireframe hingga high-fidelity prototype, dan mengembangkan aplikasi dengan pendekatan user-centered design yang memprioritaskan kemudahan navigasi.",
    results: [
      { icon: Users, text: "User satisfaction score 4.8/5" },
      { icon: TrendingUp, text: "Retention rate meningkat 60%" },
      { icon: Zap, text: "App launch time di bawah 2 detik" },
      { icon: Smartphone, text: "Rating 4.8 di Play Store" },
    ],
    features: ["Onboarding flow yang interaktif", "Dashboard personalisasi", "Push notification", "Offline mode", "Dark mode", "Analytics terintegrasi"],
    tech: ["Flutter", "Dart", "Firebase", "Figma", "Mixpanel"],
  },
  "emerintek": {
    title: "Emerintek",
    image: "/client/emerintek.webp",
    tags: ["Web Platform", "Dashboard"],
    desc: "Platform dashboard analitik dengan visualisasi data real-time dan sistem manajemen yang komprehensif.",
    challenge: "Emerintek membutuhkan platform dashboard yang bisa menampilkan data kompleks secara real-time dengan visualisasi yang mudah dipahami oleh tim manajemen non-teknis.",
    solution: "Kami merancang arsitektur data yang scalable, membangun dashboard interaktif dengan grafik real-time, dan menyederhanakan navigasi agar informasi kritis bisa diakses dalam 3 klik.",
    results: [
      { icon: TrendingUp, text: "Efisiensi pelaporan meningkat 70%" },
      { icon: Users, text: "Diadopsi oleh 50+ pengguna internal" },
      { icon: Zap, text: "Real-time update di bawah 1 detik" },
      { icon: Globe, text: "99.9% uptime sejak launch" },
    ],
    features: ["Real-time data visualization", "Custom report generator", "Multi-role access control", "Export ke PDF/Excel", "Alert & notification system", "Audit log"],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Chart.js", "Docker"],
  },
  "indomaja": {
    title: "Indomaja",
    image: "/client/indomaja.webp",
    tags: ["E-Commerce", "Digital Strategy"],
    desc: "Platform e-commerce dengan fitur lengkap, payment gateway terintegrasi, dan inventory management.",
    challenge: "Indomaja ingin membangun platform e-commerce dari nol yang bisa menyaingi marketplace besar dengan pengalaman belanja yang unggul dan operasional yang efisien.",
    solution: "Kami membangun platform e-commerce end-to-end dengan arsitektur microservices, integrasi multi-payment gateway, sistem manajemen inventaris real-time, dan dashboard admin yang komprehensif.",
    results: [
      { icon: TrendingUp, text: "Konversi meningkat 35% dalam 3 bulan" },
      { icon: Users, text: "Pelanggan aktif 10.000+" },
      { icon: Zap, text: "Checkout completion rate 85%" },
      { icon: Globe, text: "Page load time di bawah 2 detik" },
    ],
    features: ["Multi-payment gateway", "Inventory management real-time", "Order tracking system", "Vendor management", "Promo & coupon engine", "Analytics dashboard"],
    tech: ["Next.js", "Node.js", "MongoDB", "Redis", "Midtrans", "AWS"],
  },
};

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails[slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">
            ← Kembali ke Portfolio
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground">{project.desc}</p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:underline"
                >
                  Kunjungi Website <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-border/50 ring-0 p-8">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold text-foreground mb-3">Tantangan</h3>
                <p className="text-muted-foreground">{project.challenge}</p>
              </CardContent>
            </Card>
            <Card className="border border-border/50 ring-0 p-8 bg-primary/5">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold text-foreground mb-3">Solusi Kami</h3>
                <p className="text-muted-foreground">{project.solution}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-3 py-1 text-sm font-normal mb-4">
              Hasil
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Dampak yang Kami Berikan
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {project.results.map((r) => {
              const RIcon = r.icon;
              return (
                <Card key={r.text} className="border-0 ring-0 bg-card p-6 text-center">
                  <CardContent className="p-0">
                    <RIcon className="w-8 h-8 text-primary mx-auto mb-3" strokeWidth={1.5} />
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features & Tech */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Fitur Unggulan</h3>
              <ul className="space-y-3">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Teknologi</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t) => (
                  <span key={t} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ingin Hasil Serupa untuk Project Anda?
          </h2>
          <p className="text-white/80 max-w-md mx-auto mb-8">
            Konsultasikan kebutuhan Anda dengan tim kami. Gratis tanpa komitmen.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 h-auto text-base font-medium">
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
