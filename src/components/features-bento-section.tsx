import type React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/decor-icon";
import { GridPattern } from "@/components/ui/grid-pattern";
import { SectionShell, ContentRail } from "@/components/layout-contract";
import { resolveIcon } from "@/lib/icons";
import type { ServiceItem } from "@/lib/content";

function ServiceCard({
  title,
  description,
  icon,
  href,
  className,
}: {
  title: string;
  description: string;
  icon: string;
  href: string;
  className?: string;
}) {
  const Icon = resolveIcon(icon)
  return (
    <a
      href={href}
      className={cn(
        "group relative flex flex-col bg-background p-6 transition-colors hover:bg-muted/30",
        className
      )}
    >
      <DecorIcon position="top-left" />
      <DecorIcon position="top-right" />
      <div className="mb-4 flex size-10 items-center justify-center rounded-[var(--radius-md)] border bg-muted/50 text-foreground/80">
        {Icon && <Icon className="size-5" />}
      </div>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-base">{title}</h3>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </a>
  );
}

export function FeaturesBentoSection({
  services,
}: {
  services: ServiceItem[]
}) {
  const featured = services[0]
  const rest = services.slice(1, 5)
  const FeaturedIcon = featured ? resolveIcon(featured.icon) : null

  return (
    <SectionShell spacingMode="section">
      <ContentRail maxWidth="max-w-5xl" className="space-y-10">
        <div className="max-w-2xl">
          <p className="font-medium text-primary text-xs uppercase tracking-[0.25em]">
            Digital Services
          </p>
          <h2 className="mt-3 text-balance font-medium text-2xl tracking-tight md:text-4xl">
            Layanan digital yang siap membawa bisnismu naik kelas
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base">
            Dari landing page hingga platform kompleks — kami kerjakan end-to-end
            dengan satu standar kualitas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-4 md:grid-rows-2">
          {featured && (
            <a
              href={`/services/${featured.slug}`}
              className="group relative overflow-hidden bg-background p-6 md:col-span-2 md:row-span-2 md:p-8"
            >
              <DecorIcon position="bottom-left" />
              <DecorIcon position="bottom-right" />
              <GridPattern
                className="absolute inset-0 stroke-foreground/[0.05]"
                height={32}
                width={32}
              />
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent" />
              <div className="relative flex h-full min-h-56 flex-col justify-between">
                <div>
                  <div className="mb-4 flex size-10 items-center justify-center rounded-[var(--radius-md)] border bg-background/80 text-foreground/80">
                    {FeaturedIcon && <FeaturedIcon className="size-5" />}
                  </div>
                  <p className="font-medium text-primary text-xs uppercase tracking-[0.2em]">
                    {featured.tagline || "Featured service"}
                  </p>
                  <h3 className="mt-3 font-medium text-xl md:text-2xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-md text-muted-foreground text-sm leading-relaxed">
                    {featured.description}
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-px bg-border min-[20rem]:grid-cols-3">
                  {(featured.benefits || []).slice(0, 3).map((b) => (
                    <div className="space-y-1 bg-background p-3" key={b.title}>
                      <p className="font-medium text-sm tracking-tight">{b.title}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {b.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          )}

          {rest.map((service) => (
            <ServiceCard
              description={service.description}
              href={`/services/${service.slug}`}
              icon={service.icon}
              key={service.slug}
              title={service.title}
            />
          ))}
        </div>
      </ContentRail>
    </SectionShell>
  );
}