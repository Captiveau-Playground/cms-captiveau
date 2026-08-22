'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Locomotive Scroll (v5, built on Lenis) — buttery native-scroll smoothing.
 *
 * - Uses the real scrollbar, so `position: sticky` and framer-motion's
 *   `useScroll` keep working untouched.
 * - `data-scroll`/`data-scroll-speed` give scroll-driven parallax anywhere.
 * - Re-inits after route changes so freshly mounted `data-scroll` elements
 *   are picked up; disables smoothing for `prefers-reduced-motion`.
 */
export default function SmoothScroll() {
  const pathname = usePathname()
  const locoRef = useRef<{ destroy: () => void } | null>(null)

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      const { default: LocomotiveScroll } = await import('locomotive-scroll')

      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const scroll = new LocomotiveScroll({
        autoStart: !reduced,
        lenisOptions: {
          lerp: reduced ? 1 : 0.085,
          smoothWheel: !reduced,
          syncTouch: false,
          wheelMultiplier: 1,
          touchMultiplier: 1.4,
        },
      })
      if (cancelled) {
        scroll.destroy()
        return
      }
      locoRef.current = scroll
    }

    // Let the freshly routed content mount before scanning `data-scroll`.
    const t = setTimeout(init, reducedPreferenceCheck() ? 0 : 90)
    return () => {
      cancelled = true
      clearTimeout(t)
      locoRef.current?.destroy()
      locoRef.current = null
    }
  }, [pathname])

  return null
}

function reducedPreferenceCheck() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}