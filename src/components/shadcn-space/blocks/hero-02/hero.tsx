"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import SeamlessCloud from "@/components/shadcn-space/blocks/hero-02/seamless-cloud";
import { Code, Palette, Rocket, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion, useInView } from "motion/react";

const stats = [
  {
    icon: Code,
    label: "Project Selesai",
    count: "50+",
    className: "border-r border-b",
  },
  {
    icon: Palette,
    label: "Klien Puas",
    count: "30+",
    className: "border-b",
  },
  {
    icon: ShoppingCart,
    label: "Tech Stack",
    count: "15+",
    className: "border-r",
  },
  {
    icon: Rocket,
    label: "Tahun Pengalaman",
    count: "4+",
    className: "",
  },
];

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef}>
      <div className="bg-[url(https://images.shadcnspace.com/assets/backgrounds/real-estate-bg.webp)] bg-cover bg-center bg-no-repeat overflow-hidden relative flex flex-col xl:h-screen justify-center z-10 xl:gap-0 gap-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full xl:pt-0 pt-32">
          <div className="relative text-white text-start z-30">
            <p className="text-white/70 text-xs font-normal tracking-widest uppercase">Creative Tech Studio</p>
            <h1 className="text-white !text-5xl md:!text-6xl lg:!text-7xl !font-normal max-w-3xl mt-2 mb-6">
              Transform Your Ideas Into{" "}
              <span className="!font-semibold">Digital Reality</span>
            </h1>
            <p className="text-white/80 text-lg max-w-xl mb-8">
              Kami membantu startup, korporasi, dan UMKM menciptakan produk digital
              yang powerful — dari MVP hingga platform berskala besar.
            </p>
            <div className="flex gap-4">
              <Button className="px-8 py-3.5 bg-accent border-0 text-white duration-300 hover:bg-accent/90 font-medium rounded-full cursor-pointer h-auto text-base shadow-lg shadow-accent/30">
                <a href="#">Konsultasi Gratis</a>
              </Button>
              <Button className="px-8 py-3.5 bg-transparent border border-white/30 text-white duration-300 hover:bg-white/10 font-medium rounded-full cursor-pointer h-auto text-base">
                <a href="/services">Lihat Layanan</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="xl:absolute bottom-0 right-0 z-30 xl:w-auto lg:w-4/5 w-full lg:ms-auto">
          <div className="relative">
            <div className="xl:absolute bottom-24 w-full z-0">
              <img
                src="https://images.shadcnspace.com/assets/backgrounds/hero-4-banner.webp"
                alt="hero illustration"
                width={956}
                height={897}
                className="w-full opacity-80"
              />
            </div>
            <div className="bg-background rounded-t-2xl xl:rounded-none xl:rounded-tl-2xl sm:py-10 py-6 sm:ps-12 ps-4 sm:pe-12 pe-4 xl:pe-60 z-1 relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.05, ease: "easeInOut" }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-0 sm:flex sm:items-center justify-center sm:gap-10 sm:text-center"
              >
                {stats.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.05, delay: 0.02 + index * 0.2, ease: "easeInOut" }}
                    className="flex sm:gap-10"
                  >
                    <div className={`flex flex-col items-center gap-3 sm:py-0 sm:px-0 py-5 px-8 sm:border-0 border-gray-200 dark:border-gray-700 w-full ${item.className}`}>
                      <item.icon size={28} className="text-primary font-light" />
                      <div>
                        <p className="sm:text-xl text-lg font-semibold text-gold-500">
                          {item.count}
                        </p>
                        <p className="text-sm font-normal text-muted-foreground">
                          {item.label}
                        </p>
                      </div>
                    </div>
                    {index < stats.length - 1 && (
                      <Separator orientation="vertical" className="h-12 my-auto hidden sm:block" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <SeamlessCloud
          cloudCount={2}
          minSize={400}
          maxSize={678}
          opacity="opacity-30"
          gapMin={100}
          gapMax={500}
          top="top-56 sm:top-40 left-0"
        />
      </div>
    </section>
  );
};

export default HeroSection;
