'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalSettings = {
  enabled?: boolean | null
  link?: string | null
  namespace?: string | null
}

/**
 * Consultation CTA — opens the Cal.com booking widget when enabled (CMS),
 * otherwise falls back to the /contact page.
 */
export function ConsultCta({
  label,
  cal,
  className,
}: {
  label: string
  cal?: CalSettings | null
  className?: string
}) {
  const active = Boolean(cal?.enabled && cal.link && cal.namespace)
  const classes = cn(buttonVariants({ size: 'lg' }), className)

  if (active) {
    return (
      <button
        type="button"
        data-cal-link={cal!.link}
        data-cal-namespace={cal!.namespace}
        data-cal-config={JSON.stringify({ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' })}
        className={classes}
      >
        {label}
        <ArrowUpRight data-icon="inline-end" />
      </button>
    )
  }

  return (
    <Link href="/contact" className={classes}>
      {label}
      <ArrowUpRight data-icon="inline-end" />
    </Link>
  )
}