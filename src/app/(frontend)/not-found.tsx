import Link from 'next/link'
import { CtaButton } from '@/components/frontend/cta-button'

export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        404 — Halaman tidak ditemukan
      </p>
      <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Halaman yang kamu cari tidak ada.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Mungkin sudah dipindahkan atau dihapus. Kembali ke beranda untuk
        menjelajahi layanan dan portofolio kami.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <CtaButton href="/" variant="accent">
          Kembali ke Beranda
        </CtaButton>
        <Link
          href="/contact"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
        >
          Hubungi Kami
        </Link>
      </div>
    </section>
  )
}