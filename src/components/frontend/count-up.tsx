'use client'

import { useEffect, useState } from 'react'
import { NumberFlow } from '@/components/sora-ui/texts/number-flow'

/**
 * SSR-safe animated counter. Renders the static value on the server,
 * then swaps in the scrolling NumberFlow once mounted — avoids the
 * hydration mismatch that scroll-triggered counters can cause in the
 * initial viewport.
 */
export default function CountUp({
  value,
  suffix,
  decimals,
}: {
  value: number
  suffix?: string
  decimals?: number
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const formatted = decimals
    ? value.toFixed(decimals)
    : value.toLocaleString('id-ID')

  if (!mounted) {
    return (
      <span className="tabular-nums">
        {formatted}
        {suffix}
      </span>
    )
  }

  return (
    <NumberFlow
      value={value}
      suffix={suffix}
      format={
        decimals
          ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
          : undefined
      }
      scrollTrigger
    />
  )
}
