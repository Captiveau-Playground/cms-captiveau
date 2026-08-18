"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BrandFonts, BrandWordmark } from "@/lib/brand-typography";
import { motionStagger, motionViewport } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";
import { heroAnnouncement, heroCopy } from "./hero-data";

const springPress = "active:scale-[0.96] transition-transform";

const logoIconClass =
	"size-5 shrink-0 object-contain outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10";

function getLogoDevUrl(domain: string) {
	const token = process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY;
	if (!token) return null;
	const params = new URLSearchParams({
		token,
		size: "80",
		format: "png",
		retina: "true",
		fallback: "monogram",
	});
	return `https://img.logo.dev/${domain}?${params}`;
}

export function HeroAnnouncement({
	className,
	detail = heroAnnouncement.detail,
	label = heroAnnouncement.label,
}: {
	className?: string;
	detail?: string;
	label?: string;
}) {
	return (
		<div className={cn("flex flex-wrap items-center gap-2", className)}>
			<Badge variant="outline">{label}</Badge>
			<span className="text-muted-foreground text-xs tracking-wide">{detail}</span>
		</div>
	);
}

export function HeroCtaRow({
	className,
	primary = heroCopy.primaryCta,
	secondary = heroCopy.secondaryCta,
}: {
	className?: string;
	primary?: { label: string; href: string };
	secondary?: { label: string; href: string };
}) {
	return (
		<div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>
			<Link className={cn(buttonVariants(), springPress)} href={primary.href}>
				{primary.label}
				<ArrowRightIcon data-icon="inline-end" />
			</Link>
			<Link
				className={cn(buttonVariants({ variant: "outline" }), springPress)}
				href={secondary.href}
			>
				{secondary.label}
			</Link>
		</div>
	);
}

export function MotionShowcaseFrame({
	children,
	className,
	label,
}: {
	children: React.ReactNode;
	className?: string;
	label?: string;
}) {
	return (
		<div
			className={cn(
				"relative overflow-hidden border border-border bg-background shadow-[0_1px_0_rgba(0,0,0,0.03)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]",
				className,
			)}
		>
			{label ? (
				<p className="absolute top-3 left-3 z-10 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
					{label}
				</p>
			) : null}
			{children}
		</div>
	);
}

export function BlockStripChip({
	label,
	pattern,
}: {
	label: string;
	pattern: string;
}) {
	return (
		<div className="flex w-[11rem] shrink-0 flex-col justify-between border border-border bg-card/60 p-4">
			<p className="font-medium text-sm tracking-tight">{label}</p>
			<p className="mt-8 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
				{pattern}
			</p>
		</div>
	);
}

export function SwissRule({ className }: { className?: string }) {
	return <div aria-hidden className={cn("h-px w-full bg-border", className)} />;
}

export function HeroInlineLogoStrip({
	brands,
	className,
	label,
}: {
	brands: readonly { name: string; domain: string }[];
	className?: string;
	label: string;
}) {
	const reduceMotion = useReducedMotion();
	const listRef = useRef<HTMLUListElement>(null);
	const inView = useInView(listRef, motionViewport);
	const [focused, setFocused] = useState<string | null>(null);

	const itemVariants = reduceMotion
		? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
		: {
				hidden: { opacity: 0, filter: "blur(4px)", y: 6 },
				visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { type: "spring" as const, duration: 0.35, bounce: 0 } },
			};

	return (
		<div className={cn("max-w-md", className)}>
			<BrandFonts id="hero-inline-logo-strip-fonts" />
			<p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
				{label}
			</p>
			<motion.ul
				animate={inView ? "visible" : "hidden"}
				className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6"
				initial="hidden"
				onMouseLeave={() => setFocused(null)}
				ref={listRef}
				variants={{
					hidden: {},
					visible: {
						transition: { staggerChildren: motionStagger.item, delayChildren: 0.04 },
					},
				}}
			>
				{brands.map((brand) => {
					const src = getLogoDevUrl(brand.domain);
					const isFocused = focused === brand.domain;
					const dimmed = focused !== null && !isFocused;

					return (
						<motion.li key={brand.domain} variants={itemVariants}>
							<motion.button
								animate={
									reduceMotion
										? undefined
										: {
												opacity: dimmed ? 0.42 : 1,
												filter: dimmed ? "blur(3px)" : "blur(0px)",
												scale: isFocused ? 1.04 : 1,
											}
								}
								aria-label={brand.name}
								className="flex h-6 items-center gap-2 rounded-sm outline-none transition-colors active:scale-[0.96]"
								onBlur={() => setFocused((current) => (current === brand.domain ? null : current))}
								onFocus={() => setFocused(brand.domain)}
								onMouseEnter={() => setFocused(brand.domain)}
								transition={{ type: "spring", duration: 0.3, bounce: 0 }}
								type="button"
							>
								{src ? (
									<img
										alt=""
										aria-hidden
										className={logoIconClass}
										height={20}
										loading="lazy"
										referrerPolicy="origin"
										src={src}
									/>
								) : null}
								<BrandWordmark
									className={cn(
										"text-[0.75rem] leading-none sm:text-[0.8125rem]",
										isFocused ? "text-foreground" : "text-foreground/75",
										!src && "opacity-80",
									)}
									domain={brand.domain}
									name={brand.name}
								/>
							</motion.button>
						</motion.li>
					);
				})}
			</motion.ul>
		</div>
	);
}
