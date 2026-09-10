import Link from 'next/link'
import { ArrowUpRight, MonitorPlay } from 'lucide-react'
import { Section } from '@/components/frontend/section'
import { Reveal } from '@/components/frontend/reveal'
import type { EventItem } from '@/lib/content'
import { cn } from '@/lib/utils'

const MODE_LABEL: Record<string, string> = {
  offline: 'Offline',
  online: 'Online',
  hybrid: 'Hybrid',
}

/** Kelas aspect-ratio cover — sama persis dengan halaman /events. 'auto' = rasio asli gambar (tidak dipress). */
const ASPECT_CLASS: Record<string, string> = {
  auto: 'aspect-auto',
  '21/9': 'aspect-[21/9]',
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
}

function aspectClass(event: EventItem): string {
  return ASPECT_CLASS[event.imageAspect] || 'aspect-auto'
}

/**
 * Section kecil "Acara terdekat" untuk homepage — maksimal 3 kartu upcoming.
 * Kalau datanya kurang dari 3 (mis. hanya 2), slot sisa diisi kartu "Lihat
 * semua acara" supaya grid tetap rapi, bukan kosong.
 */
export function EventsSection({ events }: { events: EventItem[] }) {
  if (!events.length) return null

  return (
    <Section className="py-16 sm:py-20">
      <div className="mb-10 flex items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Events
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-foreground md:text-3xl">
            Acara terdekat
          </h2>
        </div>
        <Link
          href="/events"
          className="group hidden w-fit shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary sm:inline-flex"
        >
          Semua acara
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.slice(0, 3).map((event, i) => (
          <Reveal key={event.slug} delay={i * 0.05}>
            <Link
              href={`/events/${event.slug}`}
              className="group flex h-full flex-col border border-border bg-background transition-colors duration-300 hover:border-primary/40"
            >
              <div className="relative overflow-hidden border-b border-border bg-muted">
                {event.image ? (
                  <img
                    loading="lazy"
                    decoding="async"
                    src={event.image}
                    alt={event.title}
                    className={cn(
                      'w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]',
                      aspectClass(event)
                    )}
                  />
                ) : (
                  <div
                    className={cn(
                      'flex w-full items-center justify-center bg-gradient-to-br from-primary/10 to-transparent',
                      ASPECT_CLASS[event.imageAspect === 'auto' ? '16/9' : event.imageAspect] || 'aspect-[16/9]'
                    )}
                  >
                    <MonitorPlay className="size-10 text-primary/40" />
                  </div>
                )}
                <span className="pointer-events-none absolute bottom-3 right-3 border border-border bg-background/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {MODE_LABEL[event.mode] || event.mode}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-medium leading-snug tracking-[-0.03em] text-foreground">
                  {event.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">
                    {event.venue || event.mode}
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 font-medium text-primary'
                    )}
                  >
                    Detail
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}

        {/* Slot sisa — data < 3 → kartu arahkan ke halaman events */}
        {events.length < 3 && (
          <Reveal delay={events.length * 0.05}>
            <Link
              href="/events"
              className="group flex h-full flex-col justify-between gap-6 border border-dashed border-border bg-muted/20 p-6 text-left transition-colors duration-300 hover:border-primary/40"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Upcoming
                </p>
                <h3 className="mt-3 text-lg font-medium leading-snug tracking-[-0.03em] text-foreground">
                  Lihat jadwal lengkap & arsip acara
                </h3>
              </div>
              <span className="inline-flex w-fit items-center gap-2 font-medium text-primary">
                Jelajahi di /events
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </Section>
  )
}