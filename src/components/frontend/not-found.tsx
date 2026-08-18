import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

/**
 * Branded 404 page (adapted from @efferd/not-found-2) — boxy, matches the
 * design system.
 */
export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl border border-border bg-background p-8 text-center sm:p-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Error · 404
        </p>
        <h1 className="mt-4 font-medium text-7xl tracking-[-0.04em] sm:text-9xl">404</h1>
        <p className="mx-auto mt-4 max-w-sm text-pretty text-muted-foreground text-sm md:text-base">
          Halaman yang kamu cari mungkin sudah dipindahkan atau tidak ada.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link className={buttonVariants()} href="/">
            Kembali ke Beranda
            <ArrowUpRight data-icon="inline-end" />
          </Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/portfolio">
            Lihat Portofolio
          </Link>
        </div>
      </div>
    </div>
  );
}
