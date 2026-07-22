import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_DATA = [
  {
    question: "Apa itu Captiveau?",
    answer:
      "Captiveau adalah software house Indonesia yang mengkhususkan diri dalam desain dan pengembangan produk digital end-to-end. Kami membantu startup, korporasi, dan UMKM mewujudkan ide digital mereka menjadi aplikasi nyata.",
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk membuat aplikasi?",
    answer:
      "Untuk MVP (Minimum Viable Product) biasanya membutuhkan 8-12 minggu. Untuk aplikasi kompleks bisa 3-6 bulan tergantung fitur dan skala project. Kami akan berikan timeline detail setelah konsultasi gratis.",
  },
  {
    question: "Apakah saya perlu punya skill teknis untuk bekerja dengan Captiveau?",
    answer:
      "Tidak perlu! Tim kami akan memandu Anda dari awal hingga akhir. Kami akan menjelaskan setiap tahap dengan bahasa yang mudah dipahami dan memastikan Anda selalu update dengan perkembangan project.",
  },
  {
    question: "Bagaimana proses kerja dengan Captiveau?",
    answer:
      "Mulai dengan konsultasi gratis → analisis kebutuhan → wireframe & design → development → testing → deployment → maintenance. Anda akan dapat update mingguan selama proses berlangsung.",
  },
  {
    question: "Apakah saya bisa request revisi selama development?",
    answer:
      "Tentu! Kami menyediakan sesi revisi di setiap tahap development. Kami ingin memastikan hasil akhir sesuai dengan ekspektasi Anda. Perubahan kecil bisa langsung dilakukan, sementara perubahan besar akan didiskusikan terlebih dahulu.",
  },
  {
    question: "Apakah aplikasi yang dibuat support Android dan iOS?",
    answer:
      "Ya! Kami develop aplikasi yang bisa berjalan di Android dan iOS menggunakan teknologi cross-platform seperti Flutter atau React Native untuk efisiensi biaya dan waktu.",
  },
  {
    question: "Apakah ada garansi untuk aplikasi yang dibuat?",
    answer:
      "Ya, kami memberikan garansi bug-fix dalam periode tertentu setelah launching. Untuk maintenance jangka panjang, kami juga menyediakan paket pemeliharaan yang bisa disesuaikan dengan kebutuhan Anda.",
  },
  {
    question: "Bagaimana cara memulai kerja sama dengan Captiveau?",
    answer:
      "Cukup klik tombol \"Konsultasi Gratis\" di website, isi form singkat, atau langsung WhatsApp ke +6285-156-265-910. Kami akan jadwalkan meeting dalam 24 jam.",
  },
];

export default function Faq() {
  return (
    <section className="bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:py-24 py-8 flex flex-col gap-16">
        <div className="flex flex-col gap-4 items-center">
          <Badge
            variant="outline"
            className="text-sm h-auto py-1 px-3 border-0 outline outline-border"
          >
            FAQs
          </Badge>
          <h2 className="text-5xl font-medium text-center max-w-lg">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>
        <div>
          <Accordion className="w-full flex flex-col gap-6">
            {FAQ_DATA.map((faq, index) => (
              <AccordionItem
                key={`item-${index}`}
                value={`item-${index}`}
                className={cn(
                  "p-6 border border-border rounded-2xl flex flex-col gap-3 group/item data-[open]:bg-accent/5 data-[open]:border-accent transition-colors",
                  index === 0 && "delay-100",
                  index === 1 && "delay-200",
                  index === 2 && "delay-300",
                  index === 3 && "delay-400",
                  index === 4 && "delay-500",
                )}
              >
                <AccordionTrigger className="p-0 text-xl font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden cursor-pointer">
                  {faq.question}
                  <PlusIcon className="w-6 h-6 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45" />
                </AccordionTrigger>
                <AccordionContent className="p-0 text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
