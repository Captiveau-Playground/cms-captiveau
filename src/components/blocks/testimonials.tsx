"use client";

import { SectionShell, ContentRail } from "@/components/layout-contract";
import { SeraMarquee, SeraStagger, SeraStaggerItem } from "@/lib/sera-motion";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string | null;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function MarqueeCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <figure className="flex w-[min(80vw,20rem)] shrink-0 flex-col justify-between gap-6 border border-border bg-background p-6">
      <p className="text-sm leading-relaxed">“{testimonial.quote}”</p>
      <figcaption className="flex items-center gap-3">
        {testimonial.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            className="size-8 shrink-0 rounded-full object-cover"
            src={testimonial.avatar}
          />
        ) : (
          <span
            className="flex size-8 shrink-0 items-center justify-center border border-border font-mono text-xs"
            aria-hidden
          >
            {initials(testimonial.name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium tracking-[-0.04em]">{testimonial.name}</p>
          <p className="text-muted-foreground text-xs">
            {testimonial.role}
            {testimonial.company && ` · ${testimonial.company}`}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Testimonials (adapted from @nusaiba/testimonials-11) — featured quote +
 * marquee of client testimonials from the CMS.
 */
export function TestimonialsSeraSection({
  testimonials,
}: {
  testimonials: TestimonialItem[]
}) {
  if (!testimonials.length) return null
  const [featured, ...rest] = testimonials
  const marqueeItems = rest.length ? rest : testimonials
  const marquee = [...marqueeItems, ...marqueeItems]

  return (
    <SectionShell spacingMode="section">
      <ContentRail maxWidth="max-w-7xl" className="space-y-10">
        <SeraStagger className="space-y-10">
          <SeraStaggerItem>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Testimoni
              </p>
              <p className="font-mono text-[11px] text-muted-foreground" aria-hidden>
                03
              </p>
            </div>
          </SeraStaggerItem>

          <SeraStaggerItem>
            <blockquote className="border border-border p-6 md:p-10">
              <p className="text-balance text-xl tracking-tight md:text-2xl">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3">
                {featured.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt=""
                    className="size-8 shrink-0 rounded-full object-cover"
                    src={featured.avatar}
                  />
                ) : (
                  <span
                    className="flex size-8 shrink-0 items-center justify-center border border-border font-mono text-xs"
                    aria-hidden
                  >
                    {initials(featured.name)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium tracking-[-0.04em]">{featured.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {featured.role}
                    {featured.company && ` · ${featured.company}`}
                  </p>
                </div>
              </footer>
            </blockquote>
          </SeraStaggerItem>

          <SeraStaggerItem>
            <SeraMarquee className="border-y border-border py-5">
              <div className="flex gap-6 px-1">
                {marquee.map((testimonial, index) => (
                  <MarqueeCard
                    key={`${testimonial.name}-${index}`}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </SeraMarquee>
          </SeraStaggerItem>
        </SeraStagger>
      </ContentRail>
    </SectionShell>
  );
}