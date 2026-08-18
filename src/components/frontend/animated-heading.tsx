"use client";

import { SeraRevealWord } from "@/lib/sera-motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word heading reveal (adapted from Nusaiba's SeraWordReveal) with
 * optional highlight words, used for every section heading on the homepage.
 */
export function AnimatedHeading({
  text,
  highlightWords = [],
  className,
  as: Tag = "h2",
}: {
  text: string;
  highlightWords?: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="flex flex-wrap gap-x-[0.28em]">
        {words.map((word, index) => {
          const isHighlight = highlightWords.some((h) =>
            word.toLowerCase().includes(h.toLowerCase())
          );
          return (
            <SeraRevealWord
              className={cn(isHighlight && "text-primary")}
              index={index}
              key={`${word}-${index}`}
              word={word}
            />
          );
        })}
      </span>
    </Tag>
  );
}