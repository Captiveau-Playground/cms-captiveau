'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

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
        <span className="text-lg font-semibold tracking-[-0.02em] text-foreground">
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
  const [open, setOpen] = useState(false)
  const [openSub, setOpenSub] = useState<string | null>(null)

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
    <header className="relative w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Wordmark />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Utama">
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
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'text-primary'
                        : 'text-foreground/75 hover:text-foreground'
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className="size-3.5 transition-transform duration-200 group-hover:rotate-180"
                      aria-hidden
                    />
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="w-64 border border-border bg-background p-1.5 shadow-lg shadow-black/5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          className="group/child flex items-center justify-between gap-2 px-3 py-2.5 transition-colors hover:bg-muted/40"
                        >
                          <span className="flex min-w-0 flex-col">
                            <span className="text-sm font-medium text-foreground">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="text-xs text-muted-foreground">
                                {child.description}
                              </span>
                            )}
                          </span>
                          <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground/50 transition-all group-hover/child:translate-x-0.5 group-hover/child:-translate-y-0.5 group-hover/child:text-primary" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors',
                  'after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-primary',
                  active ? 'text-primary' : 'text-foreground/75 hover:text-foreground',
                  !active && 'after:scale-x-0 after:opacity-0 after:transition-all hover:after:scale-x-100 hover:after:opacity-100'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact" className={buttonVariants({ size: 'lg' })}>
            {ctaLabel}
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex size-10 items-center justify-center border border-border bg-background text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-[55] flex flex-col bg-background px-4 pb-8 pt-20 transition-all duration-300 lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <nav className="flex flex-col gap-0" aria-label="Utama (mobile)">
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
                      'flex w-full items-center justify-between border-b border-border py-4 text-lg font-medium tracking-[-0.04em] transition-all duration-300',
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
                      <div className="flex flex-col gap-0.5 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className="flex flex-col gap-0.5 border-b border-border/60 px-3 py-3 transition-colors hover:bg-muted/40"
                          >
                            <span className="text-base font-medium text-foreground">
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
                  'flex items-center justify-between border-b border-border py-4 text-lg font-medium tracking-[-0.04em] transition-all duration-300',
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
          <Link href="/contact" className={cn(buttonVariants({ size: 'lg' }), 'w-full')}>
            Mulai Sekarang
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </div>
      </div>
    </header>
  )
}