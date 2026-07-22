"use client";
import AboutUs from "@/components/shadcn-space/blocks/about-us-01/about-us";
import { Target, WandSparkles, Zap } from "lucide-react";

const aboutusData = [
    {
      icon: WandSparkles,
      title: "Creativity",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Zap,
      title: "Innovation",
      color: "bg-primary/5 text-primary"
    },
    {
      icon: Target,
      title: "Strategy",
      color: "bg-accent/10 text-accent"
    }
];

const statisticsCounter = [
    {
        title: "Produk Diluncurkan",
        count: 10
    },
    {
        title: "Pengguna Puas",
        count: 50
    },
    {
        title: "Klien Terpercaya",
        count: 15
    },
]

const AboutAndStats01 = () => {
  return (
    <>
      <AboutUs aboutusData={aboutusData} statisticsCounter={statisticsCounter} />
    </>
  );
};

export default AboutAndStats01;
