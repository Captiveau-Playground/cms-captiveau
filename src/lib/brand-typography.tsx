"use client";

/**
 * Brand typography/wordmark helpers — adapted to Captiveau.
 * We keep the site's own type system (Satoshi), so BrandFonts is a no-op,
 * and BrandWordmark renders the brand name as a text wordmark (used by
 * logo-cloud fallbacks when Logo.dev images are unavailable).
 */

export function BrandFonts({ id }: { id?: string }) {
  // Captiveau uses its own @font-face stack — nothing to inject.
  return null;
}

export function BrandWordmark({
  name,
  className,
}: {
  name: string;
  domain?: string;
  className?: string;
}) {
  return <span className={className}>{name}</span>;
}
