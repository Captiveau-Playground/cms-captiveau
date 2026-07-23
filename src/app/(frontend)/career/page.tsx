import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Lightbulb, Heart, Zap, MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const benefits = [
  { icon: Heart, title: "Lingkungan Kerja Suportif", desc: "Budaya kerja yang kolaboratif dan saling mendukung" },
  { icon: Lightbulb, title: "Belajar & Berkembang", desc: "Akses ke kursus, conference, dan learning resources" },
  { icon: Zap, title: "Teknologi Modern", desc: "Bekerja dengan stack teknologi terkini" },
  { icon: Users, title: "Tim Solid", desc: "Bergabung dengan tim yang passionate dan expert" },
];

const openPositions = [
  {
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote / Jakarta",
    desc: "Mengembangkan antarmuka pengguna dengan React, Next.js, dan TypeScript.",
  },
  {
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Remote / Jakarta",
    desc: "Merancang pengalaman pengguna yang intuitif dan visual yang memukau.",
  },
  {
    title: "Backend Developer",
    type: "Full-time",
    location: "Remote / Jakarta",
    desc: "Membangun API dan sistem backend yang scalable dengan Node.js.",
  },
  {
    title: "Project Manager",
    type: "Full-time",
    location: "Jakarta",
    desc: "Mengelola timeline project, komunikasi klien, dan koordinasi tim.",
  },
];

export default function CareerPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-normal mb-4">
              Karir
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Bergabung dengan{" "}
              <span className="text-primary">Tim Captiveau</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami selalu mencari talenta terbaik yang passionate dalam menciptakan produk digital
              berkualitas. Jadilah bagian dari perjalanan kami.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Mengapa Bekerja di Captiveau?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const BIcon = b.icon;
              return (
                <Card key={b.title} className="border border-border/50 ring-0 p-6 text-center">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <BIcon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-3 py-1 text-sm font-normal mb-4">
              Posisi Tersedia
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Lowongan Pekerjaan
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Kami mencari talenta terbaik untuk bergabung dalam tim kami
            </p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {openPositions.map((pos) => (
              <Card key={pos.title} className="border border-border/50 ring-0 p-6 hover:shadow-md transition-all">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{pos.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{pos.desc}</p>
                      <div className="flex flex-wrap gap-3 mt-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Briefcase className="w-3.5 h-3.5" /> {pos.type}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" /> {pos.location}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all shrink-0"
                    >
                      Lamar <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Tidak menemukan posisi yang cocok? Tetap kirim CV Anda ke{" "}
              <a href="mailto:hello@captiveau.id" className="text-primary hover:underline">hello@captiveau.id</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
