'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DrawUnderlineLink } from '@/components/sora-ui/texts/draw-underline-link'
import { CtaButton } from './cta-button'

export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Captiveau — home"
      className={cn('flex items-center gap-2.5', className)}
    >
      <img
        src="/logo.webp"
        alt="Logo Captiveau"
        className="size-8 shrink-0 object-contain"
        width={32}
        height={32}
      />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Captiveau
        </span>
        <span className="-mt-0.5 text-[11px] text-muted-foreground">
          Creative Tech Studio
        </span>
      </span>
    </Link>
  )
}

export default function Navbar({
  navData,
  ctaLabel = 'Start Now',
}: {
  navData: NavItem[]
  ctaLabel?: string
}) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [openSub, setOpenSub] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setOpenSub(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'relative w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/80 bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-background'
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Wordmark />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Utama">
          {navData.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            // Items with children → dropdown (hover/focus)
            if (item.children?.length) {
              return (
                <div key={item.href + item.label} className="group relative">
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium',
                      active
                        ? 'text-primary'
                        : 'text-foreground/80 hover:text-foreground'
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className="size-3.5 transition-transform duration-200 group-hover:rotate-180"
                      aria-hidden
                    />
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="w-64 rounded-xl border border-border bg-background p-2 shadow-xl shadow-black/10">
                      {item.children.map((child) => {
                        const childActive =
                          child.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(child.href)
                        return (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className={cn(
                              'flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted',
                              childActive && 'text-primary'
                            )}
                          >
                            <span className="text-sm font-medium">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="text-xs text-muted-foreground">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <DrawUnderlineLink
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium',
                  active ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                )}
              >
                {item.label}
              </DrawUnderlineLink>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <CtaButton href="/contact" size="sm" variant="accent">
            {ctaLabel}
          </CtaButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-[55] flex flex-col bg-background px-4 pb-8 pt-24 transition-all duration-300 lg:hidden',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        <nav className="flex flex-col gap-1" aria-label="Utama (mobile)">
          {navData.map((item, i) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            // Items with children → expandable accordion
            if (item.children?.length) {
              const isOpen = openSub === item.href
              return (
                <div key={item.href + item.label}>
                  <button
                    type="button"
                    onClick={() => setOpenSub(isOpen ? null : item.href)}
                    style={{ transitionDelay: `${i * 40}ms` }}
                    className={cn(
                      'flex w-full items-center justify-between border-b border-border/60 py-4 text-xl font-semibold tracking-tight transition-all duration-300',
                      open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                      active ? 'text-primary' : 'text-foreground'
                    )}
                    aria-expanded={isOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'size-5 transition-transform duration-300',
                        isOpen && 'rotate-180'
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-300',
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-1 pb-2 pt-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className={cn(
                              'flex flex-col gap-0.5 rounded-lg px-4 py-3 transition-colors',
                              pathname.startsWith(child.href)
                                ? 'text-primary'
                                : 'text-foreground/70'
                            )}
                          >
                            <span className="text-base font-medium">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="text-xs text-muted-foreground">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                style={{ transitionDelay: `${i * 40}ms` }}
                className={cn(
                  'flex items-center justify-between border-b border-border/60 py-4 text-xl font-semibold tracking-tight transition-all duration-300',
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                  active ? 'text-primary' : 'text-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-8">
          <CtaButton href="/contact" size="lg" variant="accent" className="w-full">
            Mulai Sekarang
          </CtaButton>
        </div>
      </div>
    </header>
  )
}