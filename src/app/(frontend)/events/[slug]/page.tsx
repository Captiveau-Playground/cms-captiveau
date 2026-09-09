import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Play,
  Users,
} from 'lucide-react'
import { Section } from '@/components/frontend/section'
import { Reveal } from '@/components/frontend/reveal'
import { AnimatedHeading } from '@/components/frontend/animated-heading'
import { EventShare } from '@/components/frontend/event-share'
import { getCmsEventBySlug, getCmsEvents } from '@/lib/cms-data'
import { formatDateLong } from '@/lib/date'
import { buildMetadata, getSiteUrl } from '@/lib/seo'
import { JsonLd } from '@/components/frontend/jsonld'
import { cn } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const event = await getCmsEventBySlug(slug)
  if (!event) return {}
  return buildMetadata({
    title: event.title,
    description: event.description,
    image: event.image || undefined,
    path: `/events/${slug}`,
    keywords: ['acara', 'events', event.venue],
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

function formatTime(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function formatDateTime(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })} · ${formatTime(iso)}`
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getCmsEventBySlug(slug)

  if (!event) notFound()

  const others = (await getCmsEvents()).filter((e) => e.slug !== slug).slice(0, 3)
  const siteUrl = await getSiteUrl()
  const eventUrl = `${siteUrl}/events/${event.slug}`
  const hasForm = !!event.googleFormEmbed?.trim()
  const isPast = event.status === 'past'
  const registrationUrl = event.registrationUrl
  const canRegister = !isPast && (hasForm || !!registrationUrl)
  const showSessions = event.sessions.length > 0
  const showOutline = event.materialOutline.length > 0
  const showSpeakers = event.speakers.length > 0

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: event.title,
          description: event.description || undefined,
          startDate: event.startDate || undefined,
          endDate: event.endDate || undefined,
          location: {
            '@type': 'Place',
            name: event.venue || 'Online',
          },
          organizer: {
            '@type': 'Organization',
            name: event.organizer || 'Captiveau',
            url: siteUrl,
          },
          url: eventUrl,
          image: event.image || undefined,
        }}
      />

      {/* Header */}
      <header className="border-b border-border bg-background pb-12 pt-10 sm:pb-14 sm:pt-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Semua acara
          </Link>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
            <span className="border border-border px-2.5 py-1">{MODE_LABEL[event.mode] || event.mode}</span>
            {event.status === 'ongoing' && (
              <span className="inline-flex items-center gap-1.5 border border-primary/30 bg-primary/5 px-2.5 py-1 text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Berlangsung
              </span>
            )}
            {isPast && <span className="border border-border px-2.5 py-1 text-muted-foreground">Selesai</span>}
          </div>

          <AnimatedHeading
            as="h1"
            className="max-w-3xl text-balance font-medium text-3xl tracking-[-0.04em] sm:text-4xl lg:text-[3rem] lg:leading-[1.08]"
            text={event.title}
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-border/70 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Calendar className="size-4 text-primary" />
              <span className="font-medium text-foreground">{formatDateTime(event.startDate)}</span>
            </div>
            {event.endDate && (
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock className="size-4 text-primary" />
                <span className="font-medium text-foreground">
                  Selesai {formatDateLong(event.endDate)} · {formatTime(event.endDate)}
                </span>
              </div>
            )}
            {event.venue && (
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                <span className="font-medium text-foreground">{event.venue}</span>
              </div>
            )}
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Users className="size-4 text-primary" />
              {event.organizer ? (
                <span className="font-medium text-foreground">
                  {event.organizer}
                  {event.capacity ? ` · kuota ${event.capacity}` : ''}
                </span>
              ) : event.capacity ? (
                <span className="font-medium text-foreground">Kuota {event.capacity} peserta</span>
              ) : (
                <span className="font-medium text-foreground">Terbuka untuk umum</span>
              )}
            </div>
          </div>

          {/* Share */}
          <div className="mt-1 flex flex-wrap items-center gap-4 border-t border-border/70 pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Bagikan acara ini
            </span>
            <EventShare url={eventUrl} title={event.title} />
          </div>
        </div>
      </header>

      {/* Cover */}
      {event.image && (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-none border border-border">
            <img
              loading="lazy"
              decoding="async"
              src={event.image}
              alt={event.title}
              className={cn('w-full object-cover', ASPECT_CLASS[event.imageAspect] || 'aspect-auto')}
            />
          </div>
        </div>
      )}

      {/* Body: description + agenda + outline + speakers + sidebar */}
      <Section className="py-12 sm:py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Tentang acara
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground sm:text-xl">
              {event.description}
            </p>

            {/* Agenda — timeline */}
            {showSessions && (
              <section className="mt-12">
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
                  <h2 className="text-xl font-medium tracking-[-0.04em] text-foreground sm:text-2xl">
                    Agenda
                  </h2>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {event.sessions.length} sesi
                  </span>
                </div>
                <ol className="border-l border-border">
                  {event.sessions.map((s, i) => (
                    <li
                      key={i}
                      className="group relative grid grid-cols-1 gap-1 border-b border-border/60 py-5 pl-8 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
                    >
                      <span
                        aria-hidden
                        className="absolute -left-[3px] top-6 size-[5px] rounded-full bg-foreground/25 transition-colors group-hover:bg-primary"
                      />
                      <time className="self-start whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        {s.time}
                      </time>
                      <div>
                        <h3 className="text-base font-medium tracking-[-0.02em] text-foreground">
                          {s.title}
                        </h3>
                        {s.description && (
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {s.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Outline materi */}
            {showOutline && (
              <section className="mt-12">
                <div className="mb-6 border-b border-border pb-4">
                  <h2 className="text-xl font-medium tracking-[-0.04em] text-foreground sm:text-2xl">
                    Outline Materi
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pokok bahasan yang akan dibahas dalam acara ini.
                  </p>
                </div>
                <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {event.materialOutline.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 border border-border bg-muted/30 px-4 py-3.5"
                    >
                      <span className="mt-0.5 size-6 shrink-0 font-mono text-[11px] font-semibold text-primary">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm leading-relaxed text-foreground">{item}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Pembicara */}
            {showSpeakers && (
              <section className="mt-12">
                <div className="mb-6 border-b border-border pb-4">
                  <h2 className="text-xl font-medium tracking-[-0.04em] text-foreground sm:text-2xl">
                    Pembicara
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {event.speakers.map((sp, i) => (
                    <Reveal key={sp.name + i} delay={i * 0.06}>
                      <div className="group flex items-center gap-4 border border-border bg-background p-5 transition-colors duration-300 hover:border-primary/40">
                        {sp.photo ? (
                          <img
                            src={sp.photo}
                            alt={sp.name}
                            className="size-14 shrink-0 rounded-full border border-border object-cover"
                          />
                        ) : (
                          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                            {sp.name.trim().charAt(0).toUpperCase()}
                          </span>
                        )}
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-semibold tracking-[-0.02em] text-foreground">
                            {sp.name}
                          </h3>
                          {sp.role && (
                            <p className="truncate text-sm text-muted-foreground">{sp.role}</p>
                          )}
                          {sp.position && (
                            <span className="mt-1 inline-block border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary">
                              {sp.position}
                            </span>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar: registrasi + rekaman */}
          <aside className="w-full shrink-0 lg:w-96">
            <div className="flex flex-col gap-4 lg:sticky lg:top-6">
              {canRegister ? (
                <div className="border border-border bg-background">
                  <div className="flex flex-col gap-4 border-b border-border px-6 py-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-base font-semibold tracking-[-0.03em] text-foreground">
                        Daftar Sekarang
                      </h2>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {hasForm
                          ? 'Isi formulir di bawah ini, atau buka di tab baru agar lebih lega.'
                          : 'Klik tombol di bawah untuk membuka formulir pendaftaran.'}
                      </p>
                    </div>
                    {registrationUrl && (
                      <a
                        href={registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex shrink-0 items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                      >
                        <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Buka Formulir
                      </a>
                    )}
                  </div>
                  {hasForm && (
                    <div
                      className="google-form-embed overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: event.googleFormEmbed || '' }}
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-4 border border-border bg-muted/40 p-6">
                  <h2 className="text-base font-semibold tracking-[-0.03em] text-foreground">
                    {isPast ? 'Acara telah selesai' : 'Pendaftaran'}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {isPast
                      ? 'Terima kasih sudah berpartisipasi. Pantau acara berikutnya di halaman events.'
                      : 'Formulir pendaftaran belum tersedia. Hubungi kami untuk informasi lebih lanjut.'}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex w-fit items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
                  >
                    Hubungi Kami
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              )}

              {event.recordingUrl && (
                <div className="flex flex-col gap-3 border border-border bg-background p-6">
                  <h2 className="text-base font-semibold tracking-[-0.03em] text-foreground">
                    Rekaman acara
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Tidak sempat hadir? Tonton rekaman lengkapnya di YouTube.
                  </p>
                  <a
                    href={event.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                  >
                    <Play className="size-4 fill-current" />
                    Tonton Rekaman
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Section>

      {/* Related */}
      {others.length > 0 && (
        <Section muted className="py-16 sm:py-20">
          <div className="mb-10 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Jangan lewatkan
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-foreground md:text-3xl">
                Acara lainnya
              </h2>
            </div>
            <Link
              href="/events"
              className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary"
            >
              Semua acara
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {others.map((e, i) => (
              <Reveal key={e.slug} delay={i * 0.06}>
                <Link
                  href={`/events/${e.slug}`}
                  className={cn(
                    'group flex h-full flex-col border border-border bg-background p-5 transition-colors duration-300 hover:border-primary/40'
                  )}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-secondary">
                    {formatDateLong(e.startDate)}
                  </span>
                  <h3 className="mt-3 text-base font-medium leading-snug tracking-[-0.03em] text-foreground">
                    {e.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <span className="text-xs text-muted-foreground">{e.venue || e.mode}</span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}