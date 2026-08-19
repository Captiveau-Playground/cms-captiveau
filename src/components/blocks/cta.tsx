"use client";
import { ConsultCta, type CalSettings } from '@/components/frontend/consult-cta'

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { ContentRail, SectionShell } from "@/components/layout-contract";
import { buttonVariants } from "@/components/ui/button";
import { SeraBlurReveal, SeraStagger, SeraStaggerItem } from "@/lib/sera-motion";
import { AnimatedHeading } from "@/components/frontend/animated-heading";

/**
 * CTA (adapted from @nusaiba/cta-11) — driven by the homepage CTA settings.
 */
export function CtaSeraSection({
  title,
  subtitle,
  buttonText,
  cal,
}: {
  title: string
  subtitle: string
  buttonText: string
  cal?: CalSettings | null
}) {
  return (
    <SectionShell spacingMode="section">
      <ContentRail>
        <SeraStagger>
          <SeraStaggerItem>
            <div className="border border-border">
              <div className="flex flex-col gap-8 p-6 md:p-10 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0 max-w-xl">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
                    Get started
                  </p>
                  <AnimatedHeading
                    className="mt-4 max-w-xl text-balance font-medium text-3xl tracking-tight md:text-4xl"
                    text={title}
                  />
                  <p className="mt-4 text-pretty text-muted-foreground text-sm leading-relaxed md:text-base">
                    {subtitle}
                  </p>
                </div>
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row lg:shrink-0">
                  <ConsultCta label={buttonText} cal={cal} />
                  <Link className={buttonVariants({ variant: "ghost", size: "lg" })} href="/portfolio">
                    Lihat Portofolio
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-border px-6 py-4 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10">
                <span>Konsultasi gratis — tanpa komitmen</span>
                <span>04</span>
              </div>

              <SeraBlurReveal className="bg-primary px-6 py-3 text-primary-foreground md:px-10">
                <p className="text-[11px] uppercase tracking-[0.2em]">
                  Captiveau — clean studio, sharp corners, honest numbers
                </p>
              </SeraBlurReveal>
            </div>
          </SeraStaggerItem>
        </SeraStagger>
      </ContentRail>
    </SectionShell>
  );
}
