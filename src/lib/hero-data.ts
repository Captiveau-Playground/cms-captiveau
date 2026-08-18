export const heroSite = {
	name: "Nusaiba",
	namespace: "@nusaiba",
	domain: "nusaiba.dev",
} as const;

export const heroAnnouncement = {
	label: "Open registry",
	detail: "Motion-first shadcn blocks",
} as const;

export const heroCopy = {
	headline: "Sections built for motion.",
	subhead:
		"Preview every block live, install with the CLI, and keep source in your repo — no runtime lock-in.",
	primaryCta: { label: "Browse blocks", href: "/blocks" },
	secondaryCta: { label: "View docs", href: "/docs" },
} as const;

export const heroPosterCopy = {
	headline: ["Compose", "landing", "pages", "with", "intent."],
	subhead:
		"Editorial sections for developers who care about rhythm, type, and installable motion — not another SaaS template.",
} as const;

export const heroArchitectureCopy = {
	eyebrow: "Registry",
	headline: "Invisible grid. Visible craft.",
	subhead:
		"Each block ships as files you own. Wire copy, tokens, and motion to the product story you are telling.",
} as const;

export const heroMagazineCopy = {
	issue: "Vol. 03",
	headline: "Motion is the interface.",
	pullQuote: "Less decoration. More composition.",
	subhead:
		"Heroes, pricing, FAQs, footers — staged for scroll-reveal, stagger, and purposeful negative space.",
	trustLabel: "Installs beside",
} as const;

export const heroMagazineTrustBrands = [
	{ name: "Next.js", domain: "nextjs.org" },
	{ name: "Vercel", domain: "vercel.com" },
	{ name: "Linear", domain: "linear.app" },
	{ name: "Notion", domain: "notion.so" },
] as const;

export const heroFilmCopy = {
	headline: "A library that reads like a magazine.",
	subhead:
		"Scan live previews, copy a prompt, or pull a section with one command. Every layout is a distinct archetype.",
} as const;

export const heroPerspectiveCopy = {
	headline: "Depth before decoration.",
	subhead:
		"Layers imply movement before animation runs — perspective, overlap, and reveal composition baked into the layout.",
} as const;

export const heroGalleryCopy = {
	headline: "Ten families. One install path.",
	subhead:
		"From heroes to footers, each category explores a different visual narrative for landing pages.",
} as const;

export const heroDiagonalCopy = {
	headline: "Cut against the grid.",
	subhead:
		"Diagonal rhythm and masked stages — editorial tension without gradients, blobs, or stock dashboards.",
} as const;

export const heroFramedCopy = {
	headline: "Framed for the fold.",
	subhead:
		"Museum-grade spacing, decor corners, and a motion stage that feels exhibition-ready on first paint.",
} as const;

export const heroShowcaseBlocks = [
	{ id: "hero", label: "Hero", pattern: "scroll-reveal" },
	{ id: "pricing", label: "Pricing", pattern: "focus-shift" },
	{ id: "faqs", label: "FAQs", pattern: "blur-focus" },
	{ id: "cta", label: "CTA", pattern: "expand-grid" },
	{ id: "footer", label: "Footer", pattern: "fade-mask" },
] as const;

export const heroGalleryTiles = [
	{ id: "motion", title: "Motion patterns", caption: "Linked to live blocks" },
	{ id: "cli", title: "shadcn CLI", caption: "npx shadcn@latest add" },
	{ id: "prompt", title: "Copy prompt", caption: "Registry-native handoff" },
	{ id: "pro", title: "Pro license", caption: "Commercial client work" },
] as const;
