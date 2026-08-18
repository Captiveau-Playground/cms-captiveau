"use client";

import { useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { motionStagger, motionViewport } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, duration: 0.3, bounce: 0 };

export function useSeraItemVariants() {
	const reduceMotion = useReducedMotion();

	return reduceMotion
		? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
		: {
				hidden: { opacity: 0, filter: "blur(4px)", y: 12 },
				visible: {
					opacity: 1,
					filter: "blur(0px)",
					y: 0,
					transition: spring,
				},
			};
}

export function SeraStagger({
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
				visible: {
					transition: { staggerChildren: motionStagger.item, delayChildren: 0.04 },
				},
			}}
		>
			{children}
		</motion.div>
	);
}

export function SeraStaggerItem({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const itemVariants = useSeraItemVariants();

	return (
		<motion.div className={className} variants={itemVariants}>
			{children}
		</motion.div>
	);
}

/** Word reveal — signature text motion for Sera hero/headlines. */
export function SeraRevealWord({
	word,
	index,
	className,
}: {
	word: string;
	index: number;
	className?: string;
}) {
	const reduceMotion = useReducedMotion();

	return (
		<span className="inline-flex overflow-hidden pb-[0.08em]">
			<motion.span
				className={className}
				initial={
					reduceMotion ? false : { opacity: 0, y: "100%", filter: "blur(4px)" }
				}
				transition={{
					...spring,
					delay: reduceMotion ? 0 : 0.08 + index * 0.06,
				}}
				viewport={{ once: true, margin: "-5%" }}
				whileInView={
					reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
				}
			>
				{word}
			</motion.span>
		</span>
	);
}

export function SeraWordReveal({
	text,
	className,
}: {
	text: string;
	className?: string;
}) {
	const words = text.split(" ");

	return (
		<span className={cn("flex flex-wrap gap-x-[0.28em]", className)}>
			{words.map((word, index) => (
				<SeraRevealWord index={index} key={`${word}-${index}`} word={word} />
			))}
		</span>
	);
}

/** Subtle ledger cell lift on hover. */
export function SeraHoverLift({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			transition={spring}
			whileHover={reduceMotion ? undefined : { y: -2 }}
		>
			{children}
		</motion.div>
	);
}

/** Monochrome infinite marquee — quotes, wordmarks, rows. */
export function SeraMarquee({
	children,
	className,
	duration = 42,
}: {
	children: ReactNode;
	className?: string;
	duration?: number;
}) {
	const reduceMotion = useReducedMotion();

	return (
		<div
			className={cn(
				"overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
				className,
			)}
		>
			<motion.div
				animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
				className="flex w-max"
				transition={{ duration, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
			>
				{children}
				{children}
			</motion.div>
		</div>
	);
}

/** Blur settle reveal for inverse strips and panels. */
export function SeraBlurReveal({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, motionViewport);
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			animate={
				inView && !reduceMotion
					? { opacity: 1, y: 0, filter: "blur(0px)" }
					: undefined
			}
			className={className}
			initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
			ref={ref}
			transition={spring}
		>
			{children}
		</motion.div>
	);
}

/** Hairline rule draws in from the left. */
export function SeraMaskRule({ className }: { className?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, motionViewport);
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			animate={inView ? { scaleX: 1 } : reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
			aria-hidden
			className={cn("h-px w-full origin-left bg-border", className)}
			initial={reduceMotion ? false : { scaleX: 0 }}
			ref={ref}
			transition={spring}
		/>
	);
}

/** Sharp-corner billing toggle for Sera pricing. */
export function SeraBillingToggle({
	period,
	onChange,
	layoutId = "sera-billing-pill",
}: {
	period: "monthly" | "annual";
	onChange: (period: "monthly" | "annual") => void;
	layoutId?: string;
}) {
	const reduceMotion = useReducedMotion();

	return (
		<div
			aria-label="Billing period"
			className="inline-flex border border-border p-0.5"
			role="group"
		>
			{(["monthly", "annual"] as const).map((option) => {
				const isActive = period === option;
				return (
					<button
						aria-pressed={isActive}
						className={cn(
							"relative px-4 py-2 font-medium text-[11px] uppercase tracking-[0.2em] transition-colors active:scale-[0.96]",
							isActive ? "text-foreground" : "text-muted-foreground",
						)}
						key={option}
						onClick={() => onChange(option)}
						type="button"
					>
						{isActive ? (
							reduceMotion ? (
								<span className="absolute inset-0 -z-10 bg-muted" />
							) : (
								<motion.span
									className="absolute inset-0 -z-10 bg-muted"
									layoutId={layoutId}
									transition={spring}
								/>
							)
						) : null}
						{option === "monthly" ? "Monthly" : "Annual"}
					</button>
				);
			})}
		</div>
	);
}

/** Cross-fade price when billing period changes. */
export function SeraPriceReveal({
	amount,
	className,
}: {
	amount: string;
	className?: string;
}) {
	const reduceMotion = useReducedMotion();

	return (
		<AnimatePresence initial={false} mode="popLayout">
			<motion.span
				animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
				className={cn("font-medium tabular-nums tracking-tight", className)}
				exit={
					reduceMotion
						? undefined
						: {
								opacity: 0,
								y: -6,
								filter: "blur(4px)",
								transition: { duration: 0.15, ease: "easeIn" },
							}
				}
				initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
				key={amount}
				transition={spring}
			>
				{amount}
			</motion.span>
		</AnimatePresence>
	);
}

/** Menu / close icon cross-fade for Sera header mobile toggle. */
export function SeraIconToggle({
	open,
	children,
}: {
	open: boolean;
	children: [ReactNode, ReactNode];
}) {
	const reduceMotion = useReducedMotion();
	const transition = reduceMotion ? { duration: 0 } : spring;

	return (
		<span className="relative inline-flex size-4 items-center justify-center">
			<motion.span
				animate={
					open
						? { opacity: 0, scale: 0.25, filter: "blur(4px)" }
						: { opacity: 1, scale: 1, filter: "blur(0px)" }
				}
				aria-hidden={open}
				className="absolute inset-0 inline-flex items-center justify-center"
				transition={transition}
			>
				{children[0]}
			</motion.span>
			<motion.span
				animate={
					open
						? { opacity: 1, scale: 1, filter: "blur(0px)" }
						: { opacity: 0, scale: 0.25, filter: "blur(4px)" }
				}
				aria-hidden={!open}
				className="absolute inset-0 inline-flex items-center justify-center"
				transition={transition}
			>
				{children[1]}
			</motion.span>
		</span>
	);
}

/** Stagger children when mobile drawer opens. */
export function SeraDrawerStagger({
	open,
	children,
	className,
}: {
	open: boolean;
	children: ReactNode;
	className?: string;
}) {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			animate={open ? "visible" : "hidden"}
			className={className}
			initial="hidden"
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: reduceMotion ? 0 : motionStagger.item,
						delayChildren: 0.06,
					},
				},
			}}
		>
			{children}
		</motion.div>
	);
}

export function SeraDrawerItem({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			variants={
				reduceMotion
					? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
					: {
							hidden: { opacity: 0, x: -8, filter: "blur(4px)" },
							visible: {
								opacity: 1,
								x: 0,
								filter: "blur(0px)",
								transition: spring,
							},
						}
			}
		>
			{children}
		</motion.div>
	);
}
