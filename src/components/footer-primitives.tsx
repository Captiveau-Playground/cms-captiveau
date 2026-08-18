"use client";

import Link from "next/link";
import { useRef } from "react";
import {
	ArrowUpRightIcon,
	MonitorIcon,
	MoonIcon,
	SunIcon,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { motionStagger, motionViewport } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";
import type { FooterColumn, FooterLinkItem } from "@/lib/footer-data";
import { footerBrand, footerLegalLinks, footerSocials } from "@/lib/footer-data";

const linkClass = cn(
	"relative inline-flex min-h-10 items-center text-muted-foreground text-sm transition-[color,transform] hover:text-foreground",
	"after:absolute after:top-1/2 after:left-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2",
	"active:scale-[0.96]",
);

function SocialIcon({ icon }: { icon: (typeof footerSocials)[number]["icon"] }) {
	const className = "size-4 shrink-0";
	switch (icon) {
		case "github":
			return (
				<svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
				</svg>
			);
		case "linkedin":
			return (
				<svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
				</svg>
			);
		case "youtube":
			return (
				<svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
					<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
				</svg>
			);
		default:
			return (
				<svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
				</svg>
			);
	}
}

export function FooterLink({
	href,
	children,
	inverse,
	className,
	external,
}: {
	href: string;
	children: React.ReactNode;
	inverse?: boolean;
	className?: string;
	external?: boolean;
}) {
	const isExternal = external ?? href.startsWith("http");

	return (
		<Link
			className={cn(
				linkClass,
				inverse && "text-background/65 hover:text-background",
				className,
			)}
			href={href}
			{...(isExternal ? { rel: "noopener noreferrer", target: "_blank" } : {})}
		>
			{children}
		</Link>
	);
}

export function FooterBrand({
	inverse,
	size = "default",
	showTagline = true,
	className,
}: {
	inverse?: boolean;
	size?: "default" | "large" | "display";
	showTagline?: boolean;
	className?: string;
}) {
	const titleClass = cn(
		"font-semibold tracking-[-0.04em] text-balance",
		size === "display" && "text-4xl md:text-6xl",
		size === "large" && "text-2xl md:text-3xl",
		size === "default" && "text-lg md:text-xl",
		inverse ? "text-background" : "text-foreground",
	);

	return (
		<div className={cn("max-w-xs", className)}>
			<Link className={cn(titleClass, "transition-transform active:scale-[0.98]")} href="/">
				{footerBrand.name}
			</Link>
			{showTagline ? (
				<p
					className={cn(
						"mt-3 text-pretty text-sm leading-relaxed",
						inverse ? "text-background/65" : "text-muted-foreground",
					)}
				>
					{footerBrand.tagline}
				</p>
			) : null}
		</div>
	);
}

export function FooterOutlineWordmark({ className }: { className?: string }) {
	return (
		<p
			aria-hidden
			className={cn(
				"pointer-events-none select-none font-bold text-[clamp(3.5rem,14vw,9rem)] leading-[0.85] tracking-[-0.06em] text-transparent",
				"[-webkit-text-stroke:1px_color-mix(in_oklab,var(--foreground)_18%,transparent)]",
				className,
			)}
		>
			{footerBrand.name}
		</p>
	);
}

export function FooterColumnHeading({
	children,
	variant = "default",
	inverse,
}: {
	children: React.ReactNode;
	variant?: "default" | "caps";
	inverse?: boolean;
}) {
	return (
		<p
			className={cn(
				"text-balance",
				variant === "caps"
					? "font-medium text-[11px] uppercase tracking-[0.14em]"
					: "font-medium text-sm",
				inverse
					? variant === "caps"
						? "text-background/55"
						: "text-background"
					: variant === "caps"
						? "text-muted-foreground"
						: "text-foreground",
			)}
		>
			{children}
		</p>
	);
}

export function FooterLinkColumn({
	column,
	inverse,
	headingVariant = "default",
	showBadges = false,
	compact = false,
}: {
	column: FooterColumn;
	inverse?: boolean;
	headingVariant?: "default" | "caps";
	showBadges?: boolean;
	compact?: boolean;
}) {
	return (
		<div>
			<FooterColumnHeading inverse={inverse} variant={headingVariant}>
				{column.title}
			</FooterColumnHeading>
			<ul className={cn("space-y-0.5", compact ? "mt-3" : "mt-4")}>
				{column.links.map((link) => (
					<li key={link.label}>
						<FooterLink href={link.href} inverse={inverse}>
							<span className="inline-flex items-center gap-2">
								{link.label}
								{showBadges && link.badge ? (
									<span className="rounded-full border border-border bg-muted/50 px-1.5 py-px font-medium text-[10px] text-muted-foreground uppercase tracking-wide">
										{link.badge}
									</span>
								) : null}
							</span>
						</FooterLink>
					</li>
				))}
			</ul>
		</div>
	);
}

export function FooterSocialIcons({
	className,
	inverse,
	variant = "icon",
}: {
	className?: string;
	inverse?: boolean;
	variant?: "icon" | "boxed";
}) {
	return (
		<nav aria-label="Social" className={cn("flex flex-wrap items-center gap-2", className)}>
			{footerSocials.map((social) => (
				<Link
					className={cn(
						"relative inline-flex min-h-10 min-w-10 items-center justify-center transition-[color,transform,border-color,background-color]",
						"active:scale-[0.96]",
						variant === "boxed"
							? cn(
									"rounded-md border shadow-[0_1px_0_rgba(0,0,0,0.04)]",
									inverse
										? "border-background/20 text-background/70 hover:border-background/35 hover:text-background"
										: "border-border text-muted-foreground hover:border-foreground/15 hover:text-foreground",
								)
							: inverse
								? "text-background/55 hover:text-background"
								: "text-muted-foreground hover:text-foreground",
					)}
					href={social.href}
					key={social.label}
					rel="noopener noreferrer"
					target="_blank"
				>
					<SocialIcon icon={social.icon} />
					<span className="sr-only">{social.label}</span>
				</Link>
			))}
		</nav>
	);
}

export function FooterSocialRow({
	className,
	inverse,
}: {
	className?: string;
	inverse?: boolean;
}) {
	return (
		<nav
			aria-label="Social"
			className={cn(
				"grid grid-cols-2 divide-x divide-y border border-border sm:grid-cols-4",
				inverse && "divide-background/15 border-background/15",
				className,
			)}
		>
			{footerSocials.map((social) => (
				<Link
					className={cn(
						"group relative flex min-h-12 items-center justify-between gap-3 px-4 py-3 transition-[background-color,transform]",
						"active:scale-[0.99]",
						inverse
							? "text-background/80 hover:bg-background/5"
							: "text-foreground hover:bg-muted/40",
					)}
					href={social.href}
					key={social.label}
					rel="noopener noreferrer"
					target="_blank"
				>
					<span className="inline-flex items-center gap-2.5">
						<SocialIcon icon={social.icon} />
						<span className="font-medium text-sm">{social.label}</span>
					</span>
					<ArrowUpRightIcon
						className={cn(
							"size-3.5 transition-[transform,opacity]",
							inverse ? "text-background/40" : "text-muted-foreground/70",
							"group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
						)}
					/>
				</Link>
			))}
		</nav>
	);
}

export function FooterStatusPill({
	inverse,
	className,
}: {
	inverse?: boolean;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs",
				inverse
					? "border-background/20 text-background/70"
					: "border-border text-muted-foreground shadow-[0_1px_0_rgba(0,0,0,0.03)]",
				className,
			)}
		>
			<span
				aria-hidden
				className="size-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
			/>
			<span className="tabular-nums">All systems normal</span>
		</div>
	);
}

export function FooterLegalBar({
	inverse,
	extraLinks,
	centered,
}: {
	inverse?: boolean;
	extraLinks?: FooterLinkItem[];
	centered?: boolean;
}) {
	const year = new Date().getFullYear();
	const links = extraLinks ?? footerLegalLinks;

	return (
		<div
			className={cn(
				"flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center",
				centered ? "sm:justify-center" : "sm:justify-between",
				inverse ? "border-background/15" : "border-border",
			)}
		>
			<p
				className={cn(
					"text-sm tabular-nums",
					centered && "text-center sm:text-left",
					inverse ? "text-background/55" : "text-muted-foreground",
				)}
			>
				© {year} {footerBrand.name}
				{centered ? ". All rights reserved." : null}
			</p>
			{centered ? null : (
				<nav
					aria-label="Legal"
					className="flex flex-wrap items-center gap-x-4 gap-y-1"
				>
					{links.map((link) => (
						<FooterLink href={link.href} inverse={inverse} key={link.label}>
							<span className="text-xs">{link.label}</span>
						</FooterLink>
					))}
				</nav>
			)}
		</div>
	);
}

export function FooterContentShell({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, motionViewport);

	return (
		<div className={cn("px-4 py-8 md:py-12", className)} ref={ref}>
			<motion.div
				animate={inView ? "visible" : "hidden"}
				className="mx-auto w-full max-w-5xl space-y-10 md:space-y-12"
				initial="hidden"
				variants={{
					hidden: {},
					visible: {
						transition: {
							staggerChildren: motionStagger.item,
							delayChildren: 0.04,
						},
					},
				}}
			>
				{children}
			</motion.div>
		</div>
	);
}

export function FooterMotionShell({
	children,
	className,
	inverse,
	wide,
}: {
	children: React.ReactNode;
	className?: string;
	inverse?: boolean;
	wide?: boolean;
}) {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, motionViewport);

	return (
		<footer
			className={cn(
				"border-t px-4 py-8 shadow-[0_-1px_0_rgba(0,0,0,0.03)] md:py-12 dark:shadow-[0_-1px_0_rgba(255,255,255,0.04)]",
				inverse
					? "border-background/10 bg-foreground text-background"
					: "border-border bg-background",
				className,
			)}
			ref={ref}
		>
			<motion.div
				animate={inView ? "visible" : "hidden"}
				className={cn(
					"mx-auto w-full space-y-10 md:space-y-12",
					wide ? "max-w-7xl" : "max-w-7xl",
				)}
				initial="hidden"
				variants={{
					hidden: {},
					visible: {
						transition: {
							staggerChildren: motionStagger.item,
							delayChildren: 0.04,
						},
					},
				}}
			>
				{children}
			</motion.div>
		</footer>
	);
}

export function FooterMotionSection({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const reduceMotion = useReducedMotion();
	const itemVariants = reduceMotion
		? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
		: {
				hidden: { opacity: 0, filter: "blur(4px)", y: 6 },
				visible: {
					opacity: 1,
					filter: "blur(0px)",
					y: 0,
					transition: { type: "spring" as const, duration: 0.3, bounce: 0 },
				},
			};

	return (
		<motion.div className={className} variants={itemVariants}>
			{children}
		</motion.div>
	);
}

export function FooterGridCell({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("p-5 md:p-6", className)}>
			{children}
		</div>
	);
}

export function FooterThemePill({ inverse }: { inverse?: boolean }) {
	const modes = [
		{ id: "system", icon: MonitorIcon, label: "System" },
		{ id: "light", icon: SunIcon, label: "Light" },
		{ id: "dark", icon: MoonIcon, label: "Dark" },
	] as const;

	return (
		<div
			className={cn(
				"inline-flex rounded-full border p-1",
				inverse ? "border-background/20" : "border-border shadow-[0_1px_0_rgba(0,0,0,0.03)]",
			)}
			role="group"
			aria-label="Theme"
		>
			{modes.map((mode, index) => (
				<button
					aria-label={mode.label}
					className={cn(
						"relative inline-flex size-8 items-center justify-center rounded-full transition-[background-color,transform]",
						"active:scale-[0.96]",
						index === 1
							? inverse
								? "bg-background/15 text-background"
								: "bg-muted text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
							: inverse
								? "text-background/50"
								: "text-muted-foreground",
					)}
					key={mode.id}
					type="button"
				>
					<mode.icon className="size-3.5" />
				</button>
			))}
		</div>
	);
}
