"use client";

import type { LucideIcon } from "lucide-react";
import { ContentRail, SectionShell } from "@/components/layout-contract";
import { SeraHoverLift, SeraStagger, SeraStaggerItem } from "@/lib/sera-motion";
import { resolveIcon } from "@/lib/icons";
import { Sparkles } from "lucide-react";

export type WhyUsFeature = {
  title: string;
  desc: string;
  icon: string;
}

/**
 * "Why Choose Captiveau?" — adapted from @nusaiba/features-12 (numbered
 * capability grid with hover lift + stagger motion).
 */
export function FeaturesSeraSection({
  features,
}: {
  features: WhyUsFeature[]
}) {
  const items = features.slice(0, 6).map((f) => ({
    title: f.title,
    desc: f.desc,
    icon: f.icon,
    Icon: resolveIcon(f.icon, Sparkles),
  }))

  return (
    <SectionShell spacingMode="section">
      <ContentRail>
        <SeraStagger>
          <SeraStaggerItem>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
                Why Us
              </p>
              <span className="font-mono text-[11px] text-muted-foreground">
                {String(items.length).padStart(2, "0")} poin
              </span>
            </div>
          </SeraStaggerItem>

          <SeraStaggerItem>
            <div className="mt-10 max-w-2xl">
              <h2 className="text-balance font-medium text-3xl tracking-tight md:text-4xl">
                Why Choose <span className="text-primary">Captiveau?</span>
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground text-sm leading-relaxed md:text-base">
                Tim senior yang bekerja langsung, proses yang transparan, dan
                hasil yang terukur — dari ide hingga peluncuran.
              </p>
            </div>
          </SeraStaggerItem>

          <SeraStaggerItem>
            <SeraStagger className="mt-12 grid grid-cols-1 border-y border-l border-border sm:grid-cols-2 lg:grid-cols-3">
              {items.map((feature, index) => (
                <SeraStaggerItem
                  className="min-w-0 border-r border-b border-border"
                  key={feature.title}
                >
                  <SeraHoverLift className="h-full p-6 transition-colors hover:bg-muted/20">
                    <div className="flex items-center justify-between gap-3">
                      <feature.Icon aria-hidden className="size-4 text-foreground" />
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-sm font-medium tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.desc}
                    </p>
                  </SeraHoverLift>
                </SeraStaggerItem>
              ))}
            </SeraStagger>
          </SeraStaggerItem>
        </SeraStagger>
      </ContentRail>
    </SectionShell>
  );
}