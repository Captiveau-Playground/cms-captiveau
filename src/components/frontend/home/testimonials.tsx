'use client'

import { Section, SectionHeader } from '../section'
import { InlineTestimonials } from '@/components/sora-ui/disclosure/inline-testimonials'
import type { TestimonialItem } from '@/lib/content'

export default function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  return (
    <Section className="py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="Testimoni"
              title={
                <>
                  What Our{' '}
                  <span className="text-primary">Klien Kami</span>
                </>
              }
              description="Don't just take our word for it — here's what real clients say about Captiveau. Hover the avatars to read their stories."
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <InlineTestimonials
            fontSize={26}
            avatarSize={44}
            blurAmount={5}
            blurOpacity={0.25}
            label={{ accentColor: 'hsl(var(--primary))' }}
            testimonials={testimonials.map((t, i) => ({
              id: String(i),
              text: `"${t.quote}"`,
              author: {
                name: t.name,
                role: `${t.role}, ${t.company}`,
                avatar: t.avatar,
              },
            }))}
          />
        </div>
      </div>
    </Section>
  )
}
