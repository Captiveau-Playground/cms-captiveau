export type GalleryCategory = "Motion" | "Light" | "Texture";

export type GalleryItem = {
	id: string;
	title: string;
	location: string;
	date: string;
	category: GalleryCategory;
	image: string;
	alt: string;
	summary: string;
};

export const galleryFilters = ["All", "Motion", "Light", "Texture"] as const;
export type GalleryFilter = (typeof galleryFilters)[number];

export const galleryItems: GalleryItem[] = [
	{
		id: "hyperspeed",
		title: "Velocity study",
		location: "Motion lab",
		date: "Mar 2026",
		category: "Motion",
		image: "/images/visuals/hyperspeed.png",
		alt: "Neon light trails flowing through a dark space",
		summary:
			"Directional light trails for hero backgrounds — high contrast without stock-photo noise.",
	},
	{
		id: "floating-lines",
		title: "Line field",
		location: "Motion lab",
		date: "Mar 2026",
		category: "Motion",
		image: "/images/visuals/floating-lines.png",
		alt: "Floating luminous lines on black",
		summary:
			"Weightless line fields that read as motion even in a still frame — ideal for product rails.",
	},
	{
		id: "plasma",
		title: "Plasma drift",
		location: "Motion lab",
		date: "Feb 2026",
		category: "Motion",
		image: "/images/visuals/plasma.png",
		alt: "Plasma smoke on a dark field",
		summary:
			"Soft plasma drift for atmospheric sections — pairs with serif headlines and sparse copy.",
	},
	{
		id: "light-rays",
		title: "Spotlight field",
		location: "Light series",
		date: "Feb 2026",
		category: "Light",
		image: "/images/visuals/light-rays.png",
		alt: "Soft white light rays on a black background",
		summary:
			"Spotlight cones for launch pages — editorial drama without gradient overload.",
	},
	{
		id: "orb",
		title: "Orbital glow",
		location: "Light series",
		date: "Feb 2026",
		category: "Light",
		image: "/images/visuals/orb.png",
		alt: "Glowing cyan and violet ring on black",
		summary:
			"Orbital glow for feature callouts — a single focal ring that scales from card to hero.",
	},
	{
		id: "dark-veil",
		title: "Veil bloom",
		location: "Light series",
		date: "Jan 2026",
		category: "Light",
		image: "/images/visuals/dark-veil.png",
		alt: "Purple light veil across darkness",
		summary:
			"Veil bloom for premium covers — depth without competing with foreground UI.",
	},
	{
		id: "color-bends",
		title: "Color bend",
		location: "Light series",
		date: "Jan 2026",
		category: "Light",
		image: "/images/visuals/color-bends.png",
		alt: "Smooth color bends on a dark canvas",
		summary:
			"Smooth spectral bends for brand moments — reads modern without neon cliché.",
	},
	{
		id: "silk",
		title: "Silk fold",
		location: "Texture study",
		date: "Jan 2026",
		category: "Texture",
		image: "/images/visuals/silk.png",
		alt: "Dark silk fabric with soft diagonal highlights",
		summary:
			"Silk folds for texture-led layouts — tactile contrast against flat UI chrome.",
	},
	{
		id: "pixel-blast",
		title: "Pixel scatter",
		location: "Texture study",
		date: "Jan 2026",
		category: "Texture",
		image: "/images/visuals/pixel-blast.png",
		alt: "Glowing pixel clusters on a dark field",
		summary:
			"Pixel scatter for dev-tool aesthetics — precise glow clusters on a dark field.",
	},
	{
		id: "ripple-grid",
		title: "Ripple grid",
		location: "Texture study",
		date: "Dec 2025",
		category: "Texture",
		image: "/images/visuals/ripple-grid.png",
		alt: "Distorted white grid on black",
		summary:
			"Ripple grid for motion marketing — distortion that hints at scroll without animation.",
	},
	{
		id: "threads",
		title: "Thread weave",
		location: "Texture study",
		date: "Dec 2025",
		category: "Texture",
		image: "/images/visuals/threads.png",
		alt: "Fine luminous threads crossing a dark plane",
		summary:
			"Thread weave for fine-detail backgrounds — subtle structure behind dense copy.",
	},
	{
		id: "beams",
		title: "Column light",
		location: "Motion lab",
		date: "Dec 2025",
		category: "Motion",
		image: "/images/visuals/beams.png",
		alt: "Vertical metallic light columns on black",
		summary:
			"Column light for architectural heroes — vertical rhythm that frames centered type.",
	},
];

export const gallerySpotlightCopy = {
	eyebrow: "Featured visual",
	title: "One frame, many moods",
	description: "Cycle through motion studies — hover a thumbnail or let the reel advance.",
} as const;

export const galleryMarqueeCopy = {
	title: "Rolling visual library",
	description: "Abstract covers for heroes, blog posts, and product storytelling.",
} as const;

export const gallerySplitCopy = {
	eyebrow: "Visual library",
	title: "Index rail for motion covers",
	description:
		"Typography-first list with a live preview panel — hover a row to swap the featured visual without leaving the section.",
} as const;

export const galleryBentoCopy = {
	title: "Bento exhibition",
	description: "Asymmetric wall — one hero tile with supporting studies around it.",
} as const;

export const galleryColumnsCopy = {
	eyebrow: "Visual library",
	title: "Staggered columns",
	description:
		"Offset masonry columns inside a framed wall — directional blur reveal and hover focus per column.",
} as const;

export const galleryMetricsCopy = {
	title: "Library at a glance",
	description: "Stats beside a compact grid of motion-ready covers.",
} as const;

export const galleryFilmstripCopy = {
	title: "Scroll the lineup",
	description: "Horizontal filmstrip with scroll-snap focus — blur fades on the active frame.",
} as const;

export const galleryRevealCopy = {
	title: "Reveal wall",
	description: "Directional blur stagger as tiles enter — each visual earns its moment.",
} as const;

export const galleryFramedCopy = {
	eyebrow: "Exhibition",
	title: "Framed visual cycle",
	description:
		"Decor-framed panel with grid pattern, centered metadata, and labeled selector chips — pauses on hover.",
} as const;

export const galleryMetrics = [
	{ value: "12", label: "Visual sets" },
	{ value: "4K", label: "Ready covers" },
	{ value: "Free", label: "In public/" },
] as const;
