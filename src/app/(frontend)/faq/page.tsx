"use client";

import { motion } from "motion/react";
import Faq from "@/components/shadcn-space/blocks/faq-01/faq";

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-8">
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
              FAQ
            </div>
            <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
              Pertanyaan yang{" "}
              <span className="text-primary">Sering Diajukan</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Temukan jawaban tentang Captiveau dan layanan kami. Jika tidak ada, hubungi kami langsung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Faq />
        </div>
      </section>
    </>
  );
}
