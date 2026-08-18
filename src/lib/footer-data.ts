export const footerBrand = {
	name: "Nusaiba",
	tagline:
		"Motion-first shadcn sections — preview live, install into your repo, keep every file.",
} as const;

export type FooterLinkItem = {
	label: string;
	href: string;
	badge?: string;
};

export type FooterColumn = {
	title: string;
	links: FooterLinkItem[];
};

export const footerColumns = {
	registry: {
		title: "Registry",
		links: [
			{ label: "Blocks", href: "/blocks", badge: "New" },
			{ label: "Motion", href: "/motion" },
			{ label: "Pricing", href: "/pricing" },
			{ label: "Docs", href: "/docs" },
		],
	},
	install: {
		title: "Install",
		links: [
			{ label: "CLI guide", href: "/docs" },
			{ label: "Copy prompt", href: "/docs" },
			{ label: "Pro registry", href: "/pricing", badge: "Pro" },
			{ label: "Changelog", href: "/blocks" },
		],
	},
	developers: {
		title: "Developers",
		links: [
			{ label: "Motion patterns", href: "/motion" },
			{ label: "Registry token", href: "/pricing" },
			{ label: "components.json", href: "/docs" },
			{ label: "Account", href: "/account" },
		],
	},
	company: {
		title: "Company",
		links: [
			{ label: "About", href: "/docs" },
			{ label: "Contact", href: "/contact" },
			{ label: "Commercial license", href: "/pricing" },
			{ label: "GitHub", href: "https://github.com" },
		],
	},
	legal: {
		title: "Legal",
		links: [
			{ label: "Privacy", href: "#" },
			{ label: "Terms", href: "#" },
			{ label: "Security", href: "#" },
			{ label: "License", href: "/pricing" },
		],
	},
	product: {
		title: "Product",
		links: [
			{ label: "Hero sections", href: "/blocks/hero" },
			{ label: "Pricing blocks", href: "/blocks/pricing" },
			{ label: "Logo clouds", href: "/blocks/logo-cloud" },
			{ label: "CTA bands", href: "/blocks/cta" },
		],
	},
	solutions: {
		title: "Solutions",
		links: [
			{ label: "SaaS landing", href: "/blocks/hero" },
			{ label: "Startup sites", href: "/blocks/cta" },
			{ label: "Agency builds", href: "/blocks/pricing" },
			{ label: "AI workflows", href: "/docs" },
		],
	},
	support: {
		title: "Support",
		links: [
			{ label: "Help center", href: "/docs" },
			{ label: "Getting started", href: "/docs" },
			{ label: "FAQs", href: "/docs" },
			{ label: "Report issue", href: "https://github.com" },
		],
	},
	resources: {
		title: "Resources",
		links: [
			{ label: "Motion gallery", href: "/motion" },
			{ label: "Block catalog", href: "/blocks" },
			{ label: "Copy prompt", href: "/docs" },
			{ label: "Registry API", href: "/docs" },
		],
	},
} satisfies Record<string, FooterColumn>;

export const footerSocials = [
	{ label: "GitHub", href: "https://github.com", icon: "github" as const },
	{ label: "X", href: "https://x.com", icon: "x" as const },
	{ label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
	{ label: "YouTube", href: "https://youtube.com", icon: "youtube" as const },
] as const;

export const footerLegalLinks: FooterLinkItem[] = [
	{ label: "Privacy", href: "#" },
	{ label: "Terms", href: "#" },
	{ label: "License", href: "/pricing" },
];

export const footerLegalInline = [
	{ label: "Terms of Service", href: "#" },
	{ label: "Privacy Policy", href: "#" },
	{ label: "Cookie Notice", href: "#" },
] as const;
