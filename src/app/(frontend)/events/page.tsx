import Link from 'next/link'
import { ArrowUpRight, Calendar, MapPin, MonitorPlay, Users } from 'lucide-react'
import { PageHero } from '@/components/frontend/page-hero'
import { Section } from '@/components/frontend/section'
import { Reveal } from '@/components/frontend/reveal'
import { getCmsEvents } from '@/lib/cms-data'
import { formatDateLong } from '@/lib/date'
import type { EventItem } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Acara & Workshop — Captiveau',
    description:
      'Workshop, webinar, dan talkshow seputar pengembangan web, desain produk, dan digital marketing — gratis dan terbuka untuk umum.',
    path: '/events',
    keywords: ['acara', 'workshop', 'webinar', 'talkshow', 'events captiveau'],
  })
}

const MODE_LABEL: Record<string, string> = {
  offline: 'Offline',
  online: 'Online',
  hybrid: 'Hybrid',
}

/** Kelas aspect-ratio untuk cover — dipakai di kartu & halaman detail. 'auto' = ikut rasio asli gambar. */
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

function EventCard({ event, index, dim }: { event: EventItem; index: number; dim?: boolean }) {
  return (
    <Reveal key={event.slug} delay={index * 0.05}>
      <Link
        href={`/events/${event.slug}`}
        className={cn(
          'group flex h-full flex-col border border-border bg-background transition-colors duration-300 hover:border-primary/40',
          dim && 'opacity-70 hover:opacity-100'
        )}
      >
        <div className="relative overflow-hidden border-b border-border bg-muted">
          <span className="pointer-events-none absolute left-4 top-4 z-10 border border-border bg-background/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-foreground">
            {formatDateLong(event.startDate)}
          </span>
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
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-secondary">
            <span>{event.organizer || 'Captiveau'}</span>
            {event.status === 'ongoing' && (
              <span className="inline-flex items-center gap-1.5 text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Berlangsung
              </span>
            )}
          </div>
          <h3 className="text-lg font-medium leading-snug tracking-[-0.03em] text-foreground">
            {event.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              {event.venue && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {event.venue}
                </span>
              )}
              {event.capacity && (
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  Kuota {event.capacity} peserta
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1 font-medium text-primary">
              Detail
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default async function EventsPage() {
  const events = await getCmsEvents()
  const upcoming = events.filter((e) => e.status === 'upcoming' || e.status === 'ongoing')
  const past = events.filter((e) => e.status === 'past')

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Acara & Workshop Kami"
        description="Workshop, webinar, dan talkshow praktis seputar pengembangan web, desain produk, dan strategi digital — gratis, terbuka untuk umum, dan bisa diikuti online maupun offline."
      />

      {/* Upcoming */}
      <Section className="py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Akan datang
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-foreground md:text-3xl">
              Jadwal acara berikutnya
            </h2>
          </div>
          <Calendar className="hidden size-6 text-muted-foreground md:block" />
        </div>

        {upcoming.length === 0 ? (
          <div className="flex flex-col items-start gap-3 border border-border bg-muted/40 px-6 py-12">
            <h3 className="text-lg font-medium text-foreground">Belum ada acara mendatang</h3>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              Pantau terus halaman ini — kami rutin mengadakan workshop dan webinar gratis. Untuk
              kolaborasi atau undangan berbicara, hubungi kami kapan saja.
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
            >
              Hubungi Kami
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e, i) => (
              <EventCard key={e.slug} event={e} index={i} />
            ))}
          </div>
        )}
      </Section>

      {/* Past */}
      {past.length > 0 && (
        <Section muted className="py-16 sm:py-20">
          <div className="mb-10 border-b border-border pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Arsip
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-foreground md:text-3xl">
              Acara yang sudah selesai
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {past.map((e, i) => (
              <EventCard key={e.slug} event={e} index={i} dim />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}