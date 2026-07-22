"use client";
import Feature from "@/components/shadcn-space/blocks/feature-01/feature";
import { Eye, RefreshCw, Users, Lightbulb } from "lucide-react"

const featureData = [
    {
      icon: Eye,
      content: "Pantau progress project Anda secara real-time dengan update mingguan dan akses ke development board.",
    },
    {
      icon: RefreshCw,
      content: "Kami berikan garansi bug-fix dan maintenance untuk memastikan produk Anda berjalan optimal.",
    },
    {
      icon: Users,
      content: "Setiap project mendapatkan tim khusus yang fokus 100% untuk mengerjakan produk Anda.",
    },
    {
      icon: Lightbulb,
      content: "Dari ide awal hingga maintenance, kami handle semua: design, development, testing, hingga deployment.",
    },
];

const Feature01 = () => {
  return (
    <>
      <Feature featureData={featureData} />
    </>
  );
};

export default Feature01;
