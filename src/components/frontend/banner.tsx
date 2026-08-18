import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export type BannerData = {
  enabled?: boolean | null
  text?: string | null
  linkLabel?: string | null
  linkHref?: string | null
}

/**
 * Announcement banner — rendered above the navbar, content managed in CMS
 * (Site Settings → Announcement Banner).
 */
export default function Banner({ banner }: { banner?: BannerData | null }) {
  if (!banner?.enabled || !banner.text) return null

  return (
    <div className="w-full bg-primary px-4 py-3 text-primary-foreground">
      <p className="text-center text-sm font-medium">
        {banner.text}
        {banner.linkLabel && banner.linkHref && (
          <>
            {' '}
            <Link
              href={banner.linkHref}
              className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:no-underline"
            >
              {banner.linkLabel}
              <ArrowRight className="size-3.5" />
            </Link>
          </>
        )}
      </p>
    </div>
  )
}