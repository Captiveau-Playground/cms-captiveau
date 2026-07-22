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
        title: "Total Projects Completed",
        count: 40
    },
    {
        title: "Years of Experience",
        count: 15
    },
    {
        title: "Design Awards",
        count: 12
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
