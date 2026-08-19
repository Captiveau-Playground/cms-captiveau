"use client";

import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { defaultSpring, motionStagger, motionViewport } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";
import type { GalleryFilter, GalleryItem } from "./gallery-data";
import { galleryFilters } from "./gallery-data";

const spring = { type: "spring" as const, duration: 0.3, bounce: 0 };

export function useGalleryItemVariants() {
	const reduceMotion = useReducedMotion();

	return reduceMotion
		? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
		: {
				hidden: { opacity: 0, filter: "blur(4px)", y: 8 },
				visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: spring },
			};
}

export function GalleryStagger({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, motionViewport);

	return (
		<motion.div
			animate={inView ? "visible" : "hidden"}
			className={className}
			initial="hidden"
			ref={ref}
			variants={{
				hidden: {},
				visible: { transition: { staggerChildren: motionStagger.item, delayChildren: 0.04 } },
			}}
		>
			{children}
		</motion.div>
	);
}

export function GalleryStaggerItem({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const itemVariants = useGalleryItemVariants();

	return (
		<motion.div className={className} variants={itemVariants}>
			{children}
		</motion.div>
	);
}

export function GallerySectionHeader({
	eyebrow,
	title,
	description,
	className,
	align = "center",
}: {
	eyebrow?: string;
	title: string;
	description?: string;
	className?: string;
	align?: "center" | "left";
}) {
	return (
		<GalleryStagger
			className={cn(
				"max-w-2xl",
				align === "center" ? "mx-auto text-center" : "text-left",
				className,
			)}
		>
			{eyebrow ? (
				<GalleryStaggerItem>
					<p className="text-muted-foreground text-sm">{eyebrow}</p>
				</GalleryStaggerItem>
			) : null}
			<GalleryStaggerItem>
				<h2 className="mt-2 text-balance font-medium text-2xl tracking-tight md:text-3xl">
					{title}
				</h2>
			</GalleryStaggerItem>
			{description ? (
				<GalleryStaggerItem>
					<p className="mt-3 text-pretty text-muted-foreground text-sm leading-relaxed md:text-base">
						{description}
					</p>
				</GalleryStaggerItem>
			) : null}
		</GalleryStagger>
	);
}

export function GalleryImageFrame({
	item,
	className,
	sizes = "(max-width: 768px) 100vw, 50vw",
	priority,
	hoverZoom = true,
}: {
	item: GalleryItem;
	className?: string;
	sizes?: string;
	priority?: boolean;
	hoverZoom?: boolean;
}) {
	const [loaded, setLoaded] = useState(false);
	return (
		<div className={cn("absolute inset-0 overflow-hidden bg-muted", className)}>
			<div
				className={cn(
					"absolute inset-0 transition-opacity duration-500",
					loaded ? "opacity-100" : "opacity-0",
					hoverZoom && "transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.04]",
				)}
			>
				<Image
					alt={item.alt}
					className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
					fill
					onLoad={() => setLoaded(true)}
					priority={priority}
					sizes={sizes}
					src={item.image}
				/>
			</div>
		</div>
	);
}

export function GalleryTileCaption({
	item,
	className,
	compact,
}: {
	item: GalleryItem;
	className?: string;
	compact?: boolean;
}) {
	return (
		<figcaption
			className={cn(
				"absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-foreground/55 via-foreground/10 to-transparent p-4",
				className,
			)}
		>
			<div>
				<p
					className={cn(
						"font-medium text-white tracking-tight",
						compact ? "text-xs" : "text-sm",
					)}
				>
					{item.title}
				</p>
				<p className="mt-0.5 text-white/70 text-[10px] md:text-xs">
					{item.location} · {item.date}
				</p>
			</div>
			<span className="flex size-8 shrink-0 translate-y-1 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
				<ArrowUpRightIcon className="size-3.5" />
			</span>
		</figcaption>
	);
}

export function GalleryCategoryBadge({
	category,
	className,
}: {
	category: GalleryItem["category"];
	className?: string;
}) {
	return (
		<span
			className={cn(
				"absolute top-3 left-3 rounded-full border border-white/20 bg-black/20 px-2 py-0.5 font-medium text-[10px] text-white/90 uppercase tracking-[0.14em] backdrop-blur-sm",
				className,
			)}
		>
			{category}
		</span>
	);
}

export function GalleryTile({
	item,
	className,
	compact,
	hoverZoom = true,
}: {
	item: GalleryItem;
	className?: string;
	compact?: boolean;
	hoverZoom?: boolean;
}) {
	return (
		<figure className={cn("group relative overflow-hidden bg-muted", className)}>
			<GalleryImageFrame hoverZoom={hoverZoom} item={item} />
			<GalleryCategoryBadge category={item.category} />
			<GalleryTileCaption compact={compact} item={item} />
		</figure>
	);
}

export function GalleryFilterChips({
	active,
	onChange,
	className,
}: {
	active: GalleryFilter;
	onChange: (filter: GalleryFilter) => void;
	className?: string;
}) {
	return (
		<div className={cn("flex flex-wrap gap-2", className)}>
			{galleryFilters.map((filter) => {
				const isActive = active === filter;

				return (
					<button
						className={cn(
							"min-h-11 rounded-full border px-3.5 py-2 font-medium text-xs transition-[background-color,border-color,color,transform] active:scale-[0.96]",
							isActive
								? "border-foreground bg-foreground text-background"
								: "border-border bg-background text-muted-foreground hover:border-foreground/25 hover:text-foreground",
						)}
						key={filter}
						onClick={() => onChange(filter)}
						type="button"
					>
						{filter}
					</button>
				);
			})}
		</div>
	);
}

export function GalleryThumbButton({
	item,
	active,
	onSelect,
	className,
}: {
	item: GalleryItem;
	active: boolean;
	onSelect: () => void;
	className?: string;
}) {
	return (
		<button
			aria-label={`Show ${item.title}`}
			aria-pressed={active}
			className={cn(
				"relative min-h-11 min-w-11 shrink-0 overflow-hidden rounded-lg transition-[opacity,transform,box-shadow] active:scale-[0.96]",
				active
					? "opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.08)] ring-2 ring-foreground/80 ring-offset-2 ring-offset-background"
					: "opacity-55 hover:opacity-90",
				className,
			)}
			onClick={onSelect}
			type="button"
		>
			<Image
				alt=""
				className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
				fill
				sizes="64px"
				src={item.image}
			/>
		</button>
	);
}

export function GalleryImageReveal({
	item,
	className,
}: {
	item: GalleryItem;
	className?: string;
}) {
	return (
		<motion.figure
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			className={cn(
				"group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted md:aspect-[16/10]",
				className,
			)}
			exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
			initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
			key={item.id}
			transition={defaultSpring}
		>
			<GalleryImageFrame hoverZoom={false} item={item} sizes="(max-width: 768px) 100vw, 60vw" />
			<GalleryCategoryBadge category={item.category} />
			<GalleryTileCaption item={item} />
		</motion.figure>
	);
}

export function GalleryCaptionListItem({
	item,
	active,
	onSelect,
}: {
	item: GalleryItem;
	active: boolean;
	onSelect: () => void;
}) {
	return (
		<button
			className={cn(
				"flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-[background-color,opacity,transform] active:scale-[0.96]",
				active ? "bg-muted/50" : "opacity-70 hover:bg-muted/30 hover:opacity-100",
			)}
			onClick={onSelect}
			type="button"
		>
			<span className="relative size-10 shrink-0 overflow-hidden rounded-md">
				<Image
					alt=""
					className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
					fill
					sizes="40px"
					src={item.image}
				/>
			</span>
			<span className="min-w-0">
				<span className="block font-medium text-sm">{item.title}</span>
				<span className="block truncate text-muted-foreground text-xs">
					{item.location} · {item.date}
				</span>
			</span>
		</button>
	);
}

export function GalleryPresenceStage({
	item,
	className,
}: {
	item: GalleryItem;
	className?: string;
}) {
	return (
		<div className={cn("relative", className)}>
			<AnimatePresence initial={false} mode="wait">
				<GalleryImageReveal item={item} />
			</AnimatePresence>
		</div>
	);
}
