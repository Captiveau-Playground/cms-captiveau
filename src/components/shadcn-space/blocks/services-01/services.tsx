"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  LucideIcon,
  AppWindowMac,
  Image,
  SwatchBook,
  WandSparkles,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";

type ServiceData = {
  service_icon: LucideIcon;
  service_title: string;
  service_bg_color: string;
  service_text_color: string;
};

const serviceData: ServiceData[] = [
  {
    service_icon: AppWindowMac,
    service_title: "Landing Page",
    service_bg_color: "bg-primary/10",
    service_text_color: "text-primary",
  },
  {
    service_icon: SwatchBook,
    service_title: "UI/UX Design",
    service_bg_color: "bg-accent/10",
    service_text_color: "text-accent",
  },
  {
    service_icon: BarChart3,
    service_title: "E-Commerce",
    service_bg_color: "bg-primary/5",
    service_text_color: "text-primary",
  },
  {
    service_icon: Image,
    service_title: "Company Profile",
    service_bg_color: "bg-primary/10",
    service_text_color: "text-primary",
  },
  {
    service_icon: WandSparkles,
    service_title: "Web Development",
    service_bg_color: "bg-primary/10",
    service_text_color: "text-primary",
  },
];

const Services = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.3,
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-16 justify-center items-center w-full">
          <div className="flex flex-col gap-4 justify-center items-center">
            <Badge
              variant={"outline"}
              className="text-sm font-normal py-1 px-3 h-7"
            >
              Layanan
            </Badge>
            <div className="max-w-3xs sm:max-w-lg mx-auto text-center">
              <h2 className="text-foreground text-3xl sm:text-5xl font-medium">
                Layanan Digital Kami
              </h2>
            </div>
          </div>
          <div className="w-full flex flex-col gap-8 sm:gap-12 justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
              {serviceData.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <Card className={cn("ring-0 p-8", service.service_bg_color)}>
                    <CardContent className="p-0 flex flex-col items-start justify-between gap-12 sm:gap-16">
                      <service.service_icon
                        size={32}
                        className={cn(service.service_text_color)}
                      />
                      <p
                        className={cn(
                          "text-2xl font-medium max-w-36",
                          service.service_text_color
                        )}
                      >
                        {service.service_title}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="bg-primary rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
              <div className="text-center md:text-start">
                <p className="text-2xl font-medium text-white">
                  Siap Wujudkan Ide Digital Anda?
                </p>
                <p className="text-2xl font-medium text-white">
                  Konsultasikan Gratis dengan Tim Kami!
                </p>
              </div>
              <div className="flex md:flex-row flex-col items-center gap-4">
                <Button className="group text-sm font-medium text-primary bg-white hover:text-primary hover:bg-white/90 rounded-full flex items-center gap-4 p-1 ps-5 w-fit h-12 cursor-pointer">
                  <a href="#" className="flex items-center gap-4">
                    <span>Mulai Kolaborasi</span>
                    <div className="p-3 bg-secondary text-white rounded-full group-hover:rotate-45 transition-transform duration-300 ease-in-out">
                      <ArrowUpRight size={16} />
                    </div>
                  </a>
                </Button>
                <Button className="group text-sm font-medium text-white bg-primary/20 hover:text-white hover:bg-primary/30 rounded-full border border-white/30 flex items-center gap-4 p-1 ps-5 w-fit h-12 cursor-pointer">
                  <a href="#" className="flex items-center gap-4">
                    <span>Lihat Portfolio</span>
                    <div className="p-3 bg-secondary text-white rounded-full group-hover:rotate-45 transition-transform duration-300 ease-in-out">
                      <ArrowUpRight size={16} />
                    </div>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
