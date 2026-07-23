"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { Lightbulb, Leaf, Target, Bolt, Brain } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Creative",
    desc: "Kami menghadirkan solusi kreatif dan inovatif untuk setiap tantangan digital, menciptakan produk yang tidak hanya fungsional tetapi juga menginspirasi.",
    color: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/20",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: Leaf,
    title: "Lean",
    desc: "Efisien dan tangkas dalam setiap proses. Kami meminimalkan pemborosan, memaksimalkan value, dan deliver tepat waktu tanpa mengorbankan kualitas.",
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/20",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    icon: Target,
    title: "Effective",
    desc: "Fokus pada hasil yang terukur. Setiap strategi dan eksekusi dirancang untuk mencapai tujuan bisnis Anda secara optimal.",
    color: "bg-amber-500",
    lightBg: "bg-amber-50 dark:bg-amber-950/20",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    icon: Bolt,
    title: "Active",
    desc: "Proaktif dan responsif. Kami tidak menunggu masalah — kami bergerak cepat, komunikatif, dan selalu selangkah lebih maju.",
    color: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/20",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    border: "border-purple-200 dark:border-purple-800",
  },
  {
    icon: Brain,
    title: "Rational",
    desc: "Setiap keputusan didasarkan pada data, logika, dan analisis mendalam. Kami membangun solusi yang masuk akal dan berkelanjutan.",
    color: "bg-cyan-500",
    lightBg: "bg-cyan-50 dark:bg-cyan-950/20",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
    border: "border-cyan-200 dark:border-cyan-800",
  },
];

export default function ValuesClearSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="px-3 py-1 text-sm font-normal mb-4 border-primary/20">
            CLEAR Values
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Filosofi{" "}
            <span className="text-primary">Kami</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Prinsip yang menjadi landasan dalam setiap produk dan layanan yang kami berikan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`${v.lightBg} ${v.border} ring-0 p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
                  <CardContent className="p-0 text-center">
                    <div className={`w-14 h-14 rounded-2xl ${v.iconBg} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>

                    {/* Letter badge */}
                    <div className={`mt-5 inline-flex items-center justify-center w-8 h-8 rounded-full ${v.color} text-white text-xs font-bold`}>
                      {v.title.charAt(0)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CLEAR Acronym */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/10">
            {["C", "L", "E", "A", "R"].map((letter, i) => (
              <span
                key={letter}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                  ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500", "bg-cyan-500"][i]
                }`}
              >
                {letter}
              </span>
            ))}
            <span className="text-sm font-medium text-muted-foreground ml-2">
              = Creative · Lean · Effective · Active · Rational
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
