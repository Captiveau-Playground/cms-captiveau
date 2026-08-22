"use client";
import { ConsultCta, type CalSettings } from '@/components/frontend/consult-cta'

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContentRail, SectionShell } from "@/components/layout-contract";
import { buttonVariants } from "@/components/ui/button";
import { SeraBlurReveal, SeraStagger, SeraStaggerItem } from "@/lib/sera-motion";
import { AnimatedHeading } from "@/components/frontend/animated-heading";

/**
 * Shape mirrors `CmsPageCta` from lib/cms-data (kept local to avoid importing
 * a server module into this client component).
 */
export type PageCtaProps = {
  enabled: boolean
  title: string
  subtitle: string
  primary: { label: string; href: string; useCal: boolean }
  secondary: { label: string; href: string } | null
}

/**
 * CTA (adapted from @nusaiba/cta-11) — driven by the per-page CTA settings
 * managed in the `page-ctas` CMS global.
 */
export function CtaSeraSection({
  cta,
  cal,
}: {
  cta: PageCtaProps
  cal?: CalSettings | null
}) {
  const primaryActive = cta.primary.useCal && cal?.enabled && cal.link && cal.namespace

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
                    text={cta.title}
                  />
                  <p className="mt-4 text-pretty text-muted-foreground text-sm leading-relaxed md:text-base">
                    {cta.subtitle}
                  </p>
                </div>
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row lg:shrink-0">
                  {primaryActive ? (
                    <ConsultCta label={cta.primary.label} cal={cal} />
                  ) : (
                    <Link
                      className={buttonVariants({ size: "lg" })}
                      href={cta.primary.href}
                    >
                      {cta.primary.label}
                      <ArrowUpRight data-icon="inline-end" />
                    </Link>
                  )}
                  {cta.secondary?.label && (
                    <Link
                      className={buttonVariants({ variant: "ghost", size: "lg" })}
                      href={cta.secondary.href}
                    >
                      {cta.secondary.label}
                    </Link>
                  )}
                </div>
              </div>

              <div className="border-t border-border px-6 py-4 font-mono text-[11px] text-muted-foreground md:px-10">
                <span>Konsultasi gratis — tanpa komitmen</span>
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
