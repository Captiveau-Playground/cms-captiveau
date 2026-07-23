import { Badge } from "@/components/ui/badge";
import Faq from "@/components/shadcn-space/blocks/faq-01/faq";

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-normal mb-4">
              FAQ
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Pertanyaan yang{" "}
              <span className="text-primary">Sering Diajukan</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan umum tentang Captiveau dan layanan pengembangan digital kami.
              Jika tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi kami.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Faq />
        </div>
      </section>
    </>
  );
}
