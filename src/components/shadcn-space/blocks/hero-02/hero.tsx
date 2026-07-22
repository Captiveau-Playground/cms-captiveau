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
    label: "Project Diluncurkan",
    count: "10+",
    className: "border-r border-b",
  },
  {
    icon: Palette,
    label: "Pengguna Puas",
    count: "50+",
    className: "border-b",
  },
  {
    icon: ShoppingCart,
    label: "Klien Terpercaya",
    count: "15+",
    className: "border-r",
  },
  {
    icon: Rocket,
    label: "Teknologi Dikuasai",
    count: "15+",
    className: "",
  },
];

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef}>
      <div className="overflow-hidden relative flex flex-col xl:h-screen justify-center xl:gap-0 gap-12">
        {/* Background image with blur */}
        <div className="absolute inset-0 bg-[url('/housess.webp')] bg-cover bg-center bg-no-repeat blur-xs scale-105" />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full xl:pt-0 pt-32 relative z-10">
          <div className="text-white text-start">
            <p className="text-white/70 text-xs font-normal tracking-widest uppercase">Creative Tech Studio</p>
            <h1 className="text-white !text-5xl md:!text-6xl lg:!text-7xl !font-normal max-w-3xl mt-2 mb-6">
              Transform Your Ideas Into{" "}
              <span className="!font-semibold">Digital Reality</span>
            </h1>
            <p className="text-white/80 text-lg max-w-xl mb-8">
              Captiveau adalah software house Indonesia yang mengkhususkan diri dalam desain dan pengembangan produk digital end-to-end. Kami membantu startup, korporasi, dan UMKM mewujudkan ide digital mereka dengan teknologi terkini dan tim berpengalaman.
            </p>
            <div className="flex gap-4">
              <Button className="px-8 py-3.5 bg-primary border-0 text-white duration-300 hover:bg-primary/90 font-medium rounded-full cursor-pointer h-auto text-base shadow-lg shadow-primary/30">
                <a href="#">Mulai Project</a>
              </Button>
              <Button className="px-8 py-3.5 bg-transparent border border-white/30 text-white duration-300 hover:bg-white/10 font-medium rounded-full cursor-pointer h-auto text-base">
                <a href="#">Konsultasi Gratis</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="xl:absolute bottom-0 right-0 z-30 xl:w-auto lg:w-4/5 w-full lg:ms-auto">
          <div className="relative">
            <div className="xl:absolute bottom-24 w-full z-0">

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
        {/*<SeamlessCloud
          cloudCount={2}
          minSize={400}
          maxSize={678}
          opacity="opacity-30"
          gapMin={100}
          gapMax={500}
          top="top-56 sm:top-40 left-0"
        />*/}
      </div>
    </section>
  );
};

export default HeroSection;
