"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Mail, X } from "lucide-react"

const faqs = [
  {
    q: "Apa itu Captiveau?",
    a: "Captiveau adalah software house Indonesia yang mengkhususkan diri dalam desain dan pengembangan produk digital end-to-end. Kami membantu startup, korporasi, dan UMKM mewujudkan ide digital mereka menjadi aplikasi nyata.",
  },
  {
    q: "Berapa lama waktu untuk membuat aplikasi?",
    a: "MVP biasanya 8-12 minggu. Aplikasi kompleks bisa 3-6 bulan tergantung fitur. Kami berikan timeline detail setelah konsultasi gratis.",
  },
  {
    q: "Apakah saya perlu skill teknis?",
    a: "Tidak perlu! Tim kami akan memandu Anda dari awal hingga akhir dengan bahasa yang mudah dipahami.",
  },
  {
    q: "Bagaimana proses kerja dengan Captiveau?",
    a: "Konsultasi gratis → analisis kebutuhan → wireframe & design → development → testing → deployment → maintenance. Ada update mingguan.",
  },
  {
    q: "Apakah ada garansi setelah launching?",
    a: "Ya, kami berikan garansi bug-fix setelah launching. Tersedia juga paket maintenance jangka panjang.",
  },
  {
    q: "Bagaimana cara memulai kerja sama?",
    a: "Klik tombol Konsultasi Gratis, isi form, atau WhatsApp ke +62-851-1770-5910. Kami jadwalkan meeting dalam 24 jam.",
  },
]

export default function Faq() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="flex w-full items-center justify-center bg-muted py-16 text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.6fr] md:gap-16">
          {/* Left panel */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                FAQ
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Temukan jawaban tentang Captiveau dan layanan kami. Jika tidak
                ada, tim support kami siap membantu.
              </p>
            </div>

            <div className="flex flex-col gap-4 border border-border bg-card p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center border border-border bg-background">
                  <Mail className="size-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">
                    Masih ada pertanyaan?
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Kami respon dalam beberapa jam.
                  </span>
                </div>
              </div>

              <Button
                className="w-full justify-between rounded-xl"
                onClick={() => setModalOpen(true)}
              >
                Hubungi Support
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Right panel — Accordion */}
          <Accordion defaultValue={[faqs[0].q]}>
            {faqs.map(({ q, a }) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="py-3.5 text-sm font-medium">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="pb-3.5 text-sm text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Contact Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Hubungi Support</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="size-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Ceritakan pertanyaan Anda, kami akan merespon dalam beberapa jam.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setModalOpen(false)
              }}
              className="flex flex-col gap-4"
            >
              <Input
                type="email"
                placeholder="Email Anda"
                required
                className="rounded-xl"
              />
              <Textarea
                required
                rows={4}
                className="min-h-24 resize-none rounded-xl"
                placeholder="Tulis pertanyaan Anda..."
              />
              <div className="flex justify-end gap-3 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setModalOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" className="rounded-xl">
                  Kirim Pesan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
