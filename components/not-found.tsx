import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import { HomeIcon, CompassIcon } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden py-16">
      <Empty>
        <EmptyHeader>
          <EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-8xl sm:text-9xl">
            404
          </EmptyTitle>
          <EmptyDescription className="-mt-8 text-nowrap text-foreground/80">
            Halaman yang kamu cari mungkin sudah <br />
            dipindahkan atau tidak ada.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/">
                <HomeIcon data-icon="inline-start" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/portfolio">
                <CompassIcon data-icon="inline-start" />
                Lihat Portofolio
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}