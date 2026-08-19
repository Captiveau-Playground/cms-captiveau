import type { LucideIcon } from 'lucide-react'
import {
  AppWindowMac,
  ShoppingCart,
  Building2,
  Palette,
  Code2,
  Smartphone,
  LayoutDashboard,
  Zap,
  Search,
  Smartphone as Mobile,
  BarChart3,
  PenTool,
  LineChart,
  Gauge,
  CreditCard,
  Package,
  Truck,
  Shield,
  Rocket,
  FileText,
  CheckCircle2,
  Lightbulb,
  Leaf,
  Target,
  Bolt,
  Brain,
  ClipboardList,
  Wand2,
  Layers,
  Sparkles,
  Heart,
  Users,
} from 'lucide-react'

// ═══════════════════════════════════════════════════════
// Statis content — source of truth mencerminkan isi CMS.
// ═══════════════════════════════════════════════════════

export const site = {
  companyName: 'Captiveau',
  tagline: 'Transform Your Ideas Into Digital Reality',
  description:
    'Captiveau — an Indonesian software house building digital products end-to-end: research, design, development, and maintenance.',
  email: 'hello@captiveau.id',
  phone: '+62-851-1770-5910',
  whatsapp: '+6285117705910',
  address: 'Tebet, South Jakarta, Indonesia',
  socials: [
    { platform: 'instagram', url: 'https://instagram.com/captiveau' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/captiveau' },
  ],
  cal: {
    enabled: false,
    link: 'captiveau/konsultasi-pengembangan-web',
    namespace: 'konsultasi-pengembangan-web',
  },
  contactOptions: {
    deliveryEmail: true,
    deliveryWhatsapp: true,
    whatsappNumber: '6285117705910',
  },
}

export type ServiceItem = {
  slug: string
  title: string
  category?: 'project' | 'managed' | string
  index: string
  image: string
  tagline: string
  description: string
  icon: string
  highlights: string[]
  intro: string
  /** Raw Payload lexical richText of the introduction (rendered when present) */
  introductionRichText?: unknown
  benefits: { icon: string; title: string; description: string }[]
  process: { step: string; title: string; description: string; icon: string }[]
  technologies: string[]
  pricing: {
    basic: { name: string; price: string; description: string; features: string[] }
    best: { name: string; price: string; description: string; features: string[] }
    enterprise: { name: string; price: string; description: string; features: string[] }
  }
}

export const services: ServiceItem[] = [
  {
    slug: 'landing-page',
    index: '01',
    title: 'Landing Page',
    image: '/images/landing.jpg',
    icon: 'layout',
    tagline: 'Single-Page Website',
    description:
      'High-converting landing pages with compelling design and persuasive copy that turn visitors into customers.',
    highlights: ['High Conversion Rate', 'Blazing Fast', 'SEO Optimized'],
    intro:
      'We craft landing pages that are not only visually stunning but also engineered for conversion. With a data-driven approach and modern UX principles, every element guides visitors toward becoming customers.',
    benefits: [
      { icon: 'zap', title: 'Fast Load Time', description: 'Performance tuned for 90+ PageSpeed scores' },
      { icon: 'search', title: 'SEO Optimized', description: 'Semantic HTML structure + JSON-LD schema' },
      { icon: 'smartphone', title: 'Mobile First', description: 'Pixel-perfect responsive on every device' },
      { icon: 'bar-chart', title: 'Conversion Ready', description: 'Strategic CTAs, integrated forms, analytics' },
    ],
    process: [
      { step: '01', title: 'Consult & Brief', description: 'Discuss needs, audience, and landing page goals', icon: 'file-text' },
      { step: '02', title: 'Wireframe', description: 'Page structure, copywriting, and user flow', icon: 'layers' },
      { step: '03', title: 'Visual Design', description: 'UI/UX design aligned to brand identity', icon: 'palette' },
      { step: '04', title: 'Development', description: 'Built with Next.js + Tailwind CSS', icon: 'code' },
      { step: '05', title: 'Testing & Deploy', description: 'QA, performance testing, and go-live', icon: 'rocket' },
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Motion'],
    pricing: {
      basic: {
        name: 'Basic',
        price: 'Rp 3,499,000',
        description: 'Single-page landing site',
        features: ['1 Main Page', 'Responsive Design', 'Contact Form', 'Basic SEO', 'Social Media Integration'],
      },
      best: {
        name: 'Professional',
        price: 'Rp 5,499,000',
        description: 'Multi-section landing site',
        features: ['3–5 Page Sections', 'Animations & Interactions', 'Form + CRM Integration', 'Advanced SEO + JSON-LD', 'Analytics Setup', 'Performance Optimization'],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Rp 7,499,000',
        description: 'Landing page + microsite',
        features: ['Multi-page Microsite', 'Custom Animations', 'A/B Testing Ready', 'CMS Integration', 'Priority Support', 'Performance SLA 99.9%'],
      },
    },
  },
  {
    slug: 'e-commerce',
    index: '02',
    title: 'E-Commerce',
    image: '/images/ecommerce.jpg',
    icon: 'shopping-cart',
    tagline: 'Online Selling Platform',
    description:
      'End-to-end e-commerce solutions with complete features to launch and scale your online business.',
    highlights: ['Conversion Optimized', 'Secure Payments', 'Inventory System'],
    intro:
      'We build scalable, user-friendly online stores. From product catalog to checkout, every step is designed to maximize conversion and customer satisfaction.',
    benefits: [
      { icon: 'credit-card', title: 'Payment Gateway', description: 'Midtrans, Xendit, or custom payments' },
      { icon: 'package', title: 'Inventory Management', description: 'Real-time stock management' },
      { icon: 'truck', title: 'Shipping Integration', description: 'RajaOngkir, JNE, J&T, SiCepat' },
      { icon: 'bar-chart', title: 'Sales Dashboard', description: 'Analytics & sales reporting' },
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Business needs & market analysis', icon: 'clipboard-list' },
      { step: '02', title: 'UX Design', description: 'User flows, wireframes, and mockups', icon: 'pen-tool' },
      { step: '03', title: 'Development', description: 'Frontend + Backend + Payment Integration', icon: 'code' },
      { step: '04', title: 'Testing', description: 'QA, payment testing, security audit', icon: 'shield' },
      { step: '05', title: 'Launch', description: 'Deploy, monitoring & maintenance', icon: 'rocket' },
    ],
    technologies: ['Next.js', 'Medusa.js', 'PostgreSQL', 'Tailwind CSS', 'Midtrans'],
    pricing: {
      basic: {
        name: 'Starter',
        price: 'Rp 26,999,000',
        description: 'Basic online store',
        features: ['Up to 100 Products', '1 Payment Gateway', '1 Courier', 'Mobile Responsive', 'Basic Reports'],
      },
      best: {
        name: 'Business',
        price: 'Rp 34,999,000',
        description: 'Complete online store',
        features: ['Unlimited Products', 'Multiple Payments', 'Multiple Couriers', 'Admin Dashboard', 'Inventory Management', 'Sales Reports'],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Rp 49,999,000',
        description: 'E-commerce platform',
        features: ['Custom Features', 'Multi-warehouse', 'CRM Integration', 'Dedicated Server', '24/7 Priority Support', 'SLA 99.9%'],
      },
    },
  },
  {
    slug: 'company-profile',
    index: '03',
    title: 'Company Profile',
    image: '/images/corporate.jpg',
    icon: 'building2',
    tagline: 'Corporate Website',
    description:
      'Professional company profile websites that build trust and credibility for your brand.',
    highlights: ['Professional Branding', 'Lead Generation', 'Multi-page'],
    intro:
      'We build company profile websites that reflect your business identity and credibility. With clear structure and strong visuals, your website becomes a 24/7 marketing asset.',
    benefits: [
      { icon: 'target', title: 'Lead Generation', description: 'Purpose-built forms, CTAs, and funnels' },
      { icon: 'sparkles', title: 'Brand Identity', description: 'Visually consistent with your brand' },
      { icon: 'layers', title: 'Multi-page', description: 'About, services, portfolio, contact' },
      { icon: 'line-chart', title: 'Analytics Integrated', description: 'GA4, GTM, and conversion tracking' },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Brand audit & competitor analysis', icon: 'search' },
      { step: '02', title: 'Information Architecture', description: 'Page structure & user journey', icon: 'layers' },
      { step: '03', title: 'Design', description: 'Visual identity & UI design', icon: 'palette' },
      { step: '04', title: 'Development', description: 'Build & CMS integration', icon: 'code' },
      { step: '05', title: 'Launch', description: 'Deploy & optimasi performa', icon: 'rocket' },
    ],
    technologies: ['Next.js', 'Payload CMS', 'Tailwind CSS', 'Vercel', 'GA4'],
    pricing: {
      basic: {
        name: 'Essential',
        price: 'Rp 8,999,000',
        description: '5-page company profile',
        features: ['5 Main Pages', 'Responsive Design', 'Contact Form', 'Basic SEO', 'Social Media Links'],
      },
      best: {
        name: 'Professional',
        price: 'Rp 12,999,000',
        description: 'Company profile + CMS',
        features: ['10+ Pages', 'CMS for Content Updates', 'Blog Section', 'Advanced SEO + JSON-LD', 'Analytics Setup', 'Performance Optimization'],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Rp 18,999,000',
        description: 'Company profile + microsite',
        features: ['Multi-language', 'CRM Integration', 'Custom Animations', 'CMS + Team Training', 'Priority Support', 'SLA 99.9%'],
      },
    },
  },
  {
    slug: 'uiux-design',
    index: '04',
    title: 'UI/UX Design',
    image: '/images/design.jpg',
    icon: 'palette',
    tagline: 'Interface Design',
    description:
      'Beautiful, intuitive, conversion-focused interface design for your digital product.',
    highlights: ['User-Centered Design', 'Conversion Focused', 'Design Systems'],
    intro:
      'We design intuitive, aesthetic digital experiences. From user research to prototyping, every design decision is grounded in data and industry best practices.',
    benefits: [
      { icon: 'search', title: 'User Research', description: 'Interviews, surveys, usability tests' },
      { icon: 'pen-tool', title: 'Wireframe & Prototype', description: 'Rapid prototyping in Figma' },
      { icon: 'wand', title: 'Design System', description: 'Reusable, consistent components' },
      { icon: 'line-chart', title: 'Conversion Focus', description: 'Every design decision driven by data' },
    ],
    process: [
      { step: '01', title: 'Research', description: 'Understand users & business needs', icon: 'search' },
      { step: '02', title: 'Ideation', description: 'Wireframes & user flows', icon: 'lightbulb' },
      { step: '03', title: 'UI Design', description: 'High-fidelity design & design systems', icon: 'palette' },
      { step: '04', title: 'Prototype', description: 'Interactive prototype & testing', icon: 'layers' },
      { step: '05', title: 'Handoff', description: 'Developer-ready specs & assets', icon: 'code' },
    ],
    technologies: ['Figma', 'Design Tokens', 'User Testing', 'Prototyping', 'Design Systems'],
    pricing: {
      basic: {
        name: 'UI Kit',
        price: 'Rp 9,999,000',
        description: 'Design of 1 core screen',
        features: ['1 Core Screen', 'Basic Design System', 'Interactive Prototype', '2 Rounds of Revisions', 'Handoff Files'],
      },
      best: {
        name: 'Full Flow',
        price: 'Rp 15,999,000',
        description: 'Complete user flow design',
        features: ['5–10 Screens', 'User Research', 'Full Design System', 'Usability Testing', 'Developer Handoff', '4 Rounds of Revisions'],
      },
      enterprise: {
        name: 'Product Suite',
        price: 'Rp 24,999,000',
        description: 'Full product design',
        features: ['Unlimited Screens', 'Multi-platform', 'Design Tokens + Docs', 'Design System Library', 'Dedicated Designer', 'Priority Support'],
      },
    },
  },
  {
    slug: 'web-development',
    index: '05',
    title: 'Web Development',
    image: '/images/code.jpg',
    icon: 'code',
    tagline: 'Modern Technology',
    description:
      'High-performance web applications with Next.js, React, and TypeScript — built to scale.',
    highlights: ['Next.js & React', 'TypeScript', 'API Integration'],
    intro:
      'We build fast, secure, scalable web applications. With a modern stack — Next.js, React, and TypeScript — your product is ready to grow alongside your business.',
    benefits: [
      { icon: 'gauge', title: 'High Performance', description: 'Lighthouse 90+ on mobile & desktop' },
      { icon: 'shield', title: 'Security First', description: 'SSL, encryption, security best practices' },
      { icon: 'layers', title: 'Scalable Architecture', description: 'Architecture ready to grow with you' },
      { icon: 'code', title: 'Clean Code', description: 'Structured, maintainable codebase' },
    ],
    process: [
      { step: '01', title: 'Requirements', description: 'Technical discovery & architecture', icon: 'clipboard-list' },
      { step: '02', title: 'Setup', description: 'Project scaffolding & CI/CD', icon: 'code' },
      { step: '03', title: 'Development', description: 'Feature iteration in sprints', icon: 'layers' },
      { step: '04', title: 'Testing', description: 'Automated & manual QA', icon: 'shield' },
      { step: '05', title: 'Maintenance', description: 'Monitoring & ongoing support', icon: 'rocket' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Vercel / AWS'],
    pricing: {
      basic: {
        name: 'MVP',
        price: 'Rp 19,999,000',
        description: 'Web app MVP',
        features: ['3 Core Modules', 'Responsive Design', 'Authentication', 'Database Setup', 'Production Deploy'],
      },
      best: {
        name: 'Business',
        price: 'Rp 34,999,000',
        description: 'Complete web app',
        features: ['10+ Modules', 'Roles & Permissions', 'Admin Dashboard', 'API Integration', 'Payment Gateway', 'CI/CD Pipeline'],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Rp 69,999,000',
        description: 'Complex platform',
        features: ['Custom Architecture', 'Microservices Ready', 'Multi-tenant', 'Dedicated Team', '24/7 Monitoring', 'SLA 99.9%'],
      },
    },
  },
  {
    slug: 'mobile-app',
    index: '06',
    title: 'Mobile App',
    image: '/images/mobile.jpg',
    icon: 'smartphone',
    tagline: 'Reach Further',
    description:
      'Smooth, fast, delightful iOS & Android mobile apps for your business.',
    highlights: ['iOS & Android', 'Offline Ready', 'Push Notifications'],
    intro:
      'We develop cross-platform mobile apps with React Native and Expo — one codebase for iOS and Android, without sacrificing native performance.',
    benefits: [
      { icon: 'smartphone', title: 'Cross-platform', description: 'One codebase for iOS & Android' },
      { icon: 'bolt', title: 'Fast & Smooth', description: '60fps animations, responsive interaction' },
      { icon: 'shield', title: 'Secure Auth', description: 'Biometric & OAuth integration' },
      { icon: 'rocket', title: 'OTA Updates', description: 'Ship updates without store review' },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Scope definition & platform strategy', icon: 'search' },
      { step: '02', title: 'UX/UI', description: 'Mobile-first design & prototype', icon: 'palette' },
      { step: '03', title: 'Development', description: 'React Native + backend integration', icon: 'code' },
      { step: '04', title: 'Testing', description: 'Device matrix & QA', icon: 'shield' },
      { step: '05', title: 'Store Launch', description: 'Submission & release management', icon: 'rocket' },
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Supabase'],
    pricing: {
      basic: {
        name: 'Starter',
        price: 'Rp 24,999,000',
        description: 'Mobile app MVP',
        features: ['3 Core Screens', 'Authentication', 'Push Notifications', 'API Integration', 'Store Submission'],
      },
      best: {
        name: 'Growth',
        price: 'Rp 44,999,000',
        description: 'Complete mobile app',
        features: ['10+ Screens', 'Offline Mode', 'In-app Payments', 'Admin Dashboard', 'Analytics', '2 Iterations'],
      },
      enterprise: {
        name: 'Scale',
        price: 'Rp 79,999,000',
        description: 'Complex mobile platform',
        features: ['Custom Features', 'Real-time Sync', 'Multi-language', 'Dedicated Team', '24/7 Support', 'SLA 99.9%'],
      },
    },
  },
]

export type Project = {
  slug: string
  title: string
  image: string
  tags: string[]
  description: string
  size: 'large' | 'small'
  category: string
  year: string
  services: string[]
  results: { value: string; label: string }[]
  stack: string[]
  story?: { heading: string; description: string; image: string | null }[]
  integrations?: string[]
}

export const projects: Project[] = [
  {
    slug: 'amertavana',
    title: 'Amertavana',
    image: '/client/amertavana.webp',
    tags: ['Web Development', 'Brand Identity'],
    description:
      'A modern company profile website for a premium lifestyle brand — elegant design, optimal performance.',
    size: 'large',
    category: 'Company Profile',
    year: '2026',
    services: ['Web Development', 'UI/UX Design', 'Brand Identity'],
    results: [
      { value: '+120%', label: 'Organic traffic' },
      { value: '98', label: 'Lighthouse score' },
      { value: '<1s', label: 'Load time' },
    ],
    stack: ['Next.js', 'Tailwind CSS', 'Payload CMS', 'Vercel'],
  },
  {
    slug: 'cogan',
    title: 'Cogan',
    image: '/client/cogan.webp',
    tags: ['UI/UX Design', 'Mobile App'],
    description:
      'A mobile app with an intuitive user experience and stunning visual design.',
    size: 'small',
    category: 'Mobile App',
    year: '2026',
    services: ['UI/UX Design', 'Mobile Development'],
    results: [
      { value: '4.8', label: 'App rating' },
      { value: '50K+', label: 'Downloads' },
      { value: '+35%', label: 'Retention' },
    ],
    stack: ['React Native', 'Figma', 'Firebase'],
  },
  {
    slug: 'emerintek',
    title: 'Emerintek',
    image: '/client/emerintek.webp',
    tags: ['Web Platform', 'Dashboard'],
    description:
      'An analytics dashboard platform with real-time data visualization and comprehensive management systems.',
    size: 'small',
    category: 'Dashboard',
    year: '2025',
    services: ['Web Development', 'Data Visualization'],
    results: [
      { value: '-40%', label: 'Manual workload' },
      { value: '24/7', label: 'Real-time monitoring' },
      { value: '99.9%', label: 'Uptime' },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Recharts'],
  },
  {
    slug: 'indomaja',
    title: 'Indomaja',
    image: '/client/indomaja.webp',
    tags: ['E-Commerce', 'Digital Strategy'],
    description:
      'A full-featured e-commerce platform with integrated payment gateway and inventory management.',
    size: 'large',
    category: 'E-Commerce',
    year: '2025',
    services: ['E-Commerce', 'Web Development', 'Digital Strategy'],
    results: [
      { value: '+85%', label: 'Online sales' },
      { value: '3x', label: 'Conversion rate' },
      { value: '1,200+', label: 'Products managed' },
    ],
    stack: ['Next.js', 'Medusa.js', 'Midtrans', 'PostgreSQL'],
  },
]

export const stats: {
  value: number
  suffix: string
  decimals?: number
  label: string
}[] = [
  { value: 50, suffix: '+', label: 'Projects delivered' },
  { value: 30, suffix: '+', label: 'Trusted clients' },
  { value: 4.9, suffix: '', decimals: 1, label: 'Client rating' },
  { value: 8, suffix: ' yrs', label: 'Experience' },
]

export type TestimonialItem = {
  name: string
  role: string
  company: string
  quote: string
  avatar: string
}

export const testimonials: TestimonialItem[] = [
  {
    name: 'Budi Santoso',
    role: 'CEO',
    company: 'TechStart Indonesia',
    quote:
      'Captiveau completely transformed how we build digital products. Their team shipped our MVP in just 8 weeks. Now we can focus on business strategy instead of technical problems.',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    name: 'Sari Dewi',
    role: 'Founder',
    company: 'EduTech Solutions',
    quote:
      'I was hesitant about local software houses at first, but Captiveau proved their quality. Our e-learning app hit 4.8 on the Play Store. Their team is professional and responsive.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Ahmad Rizki',
    role: 'CTO',
    company: 'FinanceApp',
    quote:
      'As a non-technical founder, Captiveau helped bring my idea to life. We launched 3 months ahead of schedule. Their transparent development process kept me updated at every step.',
    avatar: 'https://i.pravatar.cc/150?img=60',
  },
  {
    name: 'Maya Putri',
    role: 'Product Manager',
    company: 'RetailTech',
    quote:
      'Captiveau’s attention to UI/UX detail is impressive. Our marketplace app saw a 35% higher conversion rate. They truly understand Indonesian users.',
    avatar: 'https://i.pravatar.cc/150?img=45',
  },
  {
    name: 'Doni Pratama',
    role: 'Direktur IT',
    company: 'Bank Digital',
    quote:
      'Our financial dashboard needed a complete overhaul, and Captiveau delivered flawlessly. Real-time analytics boosted user engagement by 47%. Their security implementation is rock solid.',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    name: 'Rina Sari',
    role: 'Head of Digital',
    company: 'UMKM Hub',
    quote:
      'Captiveau’s documentation and support are outstanding. Our SME platform onboarded 1,000+ merchants in 2 months. Their team is always ready to help with troubleshooting.',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
]

export const faqCategories = [
  'All',
  'General',
  'Technical',
  'Pricing',
  'Support',
] as const

export type FaqCategory = (typeof faqCategories)[number]

export const faqs: { title: string; content: string; category: Exclude<FaqCategory, 'Semua'> }[] = [
  {
    title: 'What is Captiveau?',
    content:
      'Captiveau is an Indonesian software house specializing in end-to-end digital product design and development. We help startups, corporations, and SMEs bring their digital ideas to life with modern technology and an experienced team.',
    category: 'General',
  },
  {
    title: 'How long does it take to build an app?',
    content:
      'It depends on project complexity. Landing pages typically take 1–2 weeks, company profile websites 2–4 weeks, and web/mobile apps 1–3 months. We always provide a clear timeline before starting.',
    category: 'General',
  },
  {
    title: 'Do I need technical skills to work with Captiveau?',
    content:
      'No. Our team guides you from start to finish — from requirement consultation and planning to launch. You focus on your business vision; we handle the rest.',
    category: 'General',
  },
  {
    title: 'How does the process with Captiveau work?',
    content:
      'Our process is transparent: consultation & analysis → design & prototype → development → testing & QA → launch & maintenance. You get weekly updates and access to the development board.',
    category: 'Technical',
  },
  {
    title: 'Can I request revisions during development?',
    content:
      'Yes. Every package includes a set number of revisions. For scope changes beyond your package, we provide a transparent additional estimate before starting work.',
    category: 'Technical',
  },
  {
    title: 'Do the apps support both Android and iOS?',
    content:
      'Yes. We use React Native / Flutter for cross-platform development — one codebase for Android and iOS without sacrificing native performance.',
    category: 'Technical',
  },
  {
    title: 'How does payment work at Captiveau?',
    content:
      'We use a milestone system: 50% upfront (deposit), 40% at 50% development progress, and 10% on completion. Bank transfer accepted, official invoices always provided.',
    category: 'Pricing',
  },
  {
    title: 'Is there a warranty for the apps you build?',
    content:
      'Yes. We provide a bug-fix and maintenance guarantee to keep your product running optimally after launch. Monthly maintenance packages are also available for ongoing support.',
    category: 'Support',
  },
  {
    title: 'How do I get started working with Captiveau?',
    content:
      'Simple. Reach out via the contact form or WhatsApp, tell us your needs, and we will schedule a free consultation to map out the right solution.',
    category: 'Support',
  },
]

export const trustPoints = [
  {
    title: 'Senior Expert Team',
    desc: 'Delivered directly by senior developers & designers with 4+ years in the digital industry.',
    icon: 'users',
  },
  {
    title: 'Free Consultation',
    desc: 'Discuss your idea with our team for free before deciding to start your project.',
    icon: 'message',
  },
  {
    title: 'Quality Guarantee',
    desc: 'Bug-fix and maintenance guarantee to keep your product running optimally.',
    icon: 'shield',
  },
] as const

export const advantages = [
  {
    title: 'Transparent Process',
    desc: 'Track your project in real time with weekly updates and access to the development board.',
    icon: 'eye',
  },
  {
    title: 'Dedicated Team',
    desc: 'Every project gets a dedicated team focused 100% on building your product.',
    icon: 'users',
  },
  {
    title: 'End-to-End Solutions',
    desc: 'From first idea to maintenance — we handle design, development, testing, and deployment.',
    icon: 'layers',
  },
] as const

export const articles = [
  {
    title: 'How to Choose the Right Tech Stack for Your Startup in 2026',
    category: 'Tech',
    date: '2026-07-15',
    readTime: '5 min read',
    excerpt:
      'Choosing the right tech stack is a critical decision that shapes your product scalability, cost, and development speed.',
    image:
      '/images/landing.jpg',
  },
  {
    title: 'Why UI/UX Design is an Investment, Not a Cost',
    category: 'Design',
    date: '2026-07-08',
    readTime: '4 min read',
    excerpt:
      'Good design is not just aesthetics — it creates experiences that turn visitors into loyal customers.',
    image:
      '/images/design.jpg',
  },
  {
    title: 'Landing Page vs Multi-Page Website: Which Is Right?',
    category: 'Strategy',
    date: '2026-06-28',
    readTime: '6 min read',
    excerpt:
      'Not every business needs a multi-page website. Learn when a landing page is enough — and when you need something more complex.',
    image:
      '/images/office.jpg',
  },
  {
    title: '7 Key Metrics to Measure Digital Product Success',
    category: 'Analytics',
    date: '2026-06-20',
    readTime: '7 min read',
    excerpt:
      'Stop guessing — start measuring. Here are the essential metrics to track for a successful digital product.',
    image:
      '/images/code.jpg',
  },
  {
    title: 'The Digital Product Development Journey: From Idea to Launch',
    category: 'Development',
    date: '2026-06-12',
    readTime: '8 min read',
    excerpt:
      'Understanding the product development cycle helps you plan budget, timelines, and expectations better.',
    image:
      '/images/meeting.jpg',
  },
  {
    title: 'SEO for Business Websites: The Complete 2026 Guide',
    category: 'Marketing',
    date: '2026-06-05',
    readTime: '10 min read',
    excerpt:
      'SEO is not magic — it is strategy. Learn how to get your business website on Google’s first page.',
    image:
      '/images/team.jpg',
  },
]

export const values = [
  {
    icon: 'lightbulb',
    title: 'Creative',
    desc: 'Creative, innovative solutions for every digital challenge — functional and inspiring.'
  },
  {
    icon: 'leaf',
    title: 'Lean',
    desc: 'Efficient and agile in every process. Cut the waste, maximize the value.'
  },
  {
    icon: 'target',
    title: 'Effective',
    desc: 'Focused on measurable outcomes. Every strategy is designed to hit your business goals.'
  },
  {
    icon: 'bolt',
    title: 'Active',
    desc: 'Proactive and responsive. We move fast, communicate clearly, and stay a step ahead.'
  },
  {
    icon: 'brain',
    title: 'Rational',
    desc: 'Decisions built on data, logic, and deep analysis. Sensible, sustainable solutions.'
  },
]

export type TeamMember = {
  name: string
  role: string
  initials: string
  color: string
}

export const team: TeamMember[] = [
  { name: 'Andi Pratama', role: 'Founder & CEO', initials: 'AP', color: 'bg-blue-600' },
  { name: 'Bella Kusuma', role: 'Head of Design', initials: 'BK', color: 'bg-amber-500' },
  { name: 'Candra Wijaya', role: 'Lead Engineer', initials: 'CW', color: 'bg-purple-600' },
  { name: 'Dewi Lestari', role: 'Product Manager', initials: 'DL', color: 'bg-emerald-600' },
  { name: 'Eko Prasetyo', role: 'Frontend Engineer', initials: 'EP', color: 'bg-cyan-600' },
  { name: 'Fina Rahma', role: 'UI/UX Designer', initials: 'FR', color: 'bg-rose-600' },
]

export const process = [
  { step: '01', title: 'Consult & Analyze', desc: 'Discover needs, research, and strategy', icon: 'clipboard-list' },
  { step: '02', title: 'Design & Prototype', desc: 'From wireframes to high-fidelity prototypes', icon: 'palette' },
  { step: '03', title: 'Development', desc: 'Built to high engineering standards', icon: 'code' },
  { step: '04', title: 'Testing & QA', desc: 'Comprehensive quality assurance', icon: 'shield' },
  { step: '05', title: 'Launch & Maintain', desc: 'Deploy and ongoing support', icon: 'rocket' },
]

export const jobs = [
  {
    title: 'Frontend Developer',
    type: 'Full-time',
    location: 'Remote / Jakarta',
    salary: 'IDR 8–15M',
    desc: 'React, Next.js, TypeScript — building fast, beautiful interfaces.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'UI/UX Designer',
    type: 'Full-time',
    location: 'Remote / Jakarta',
    salary: 'IDR 7–12M',
    desc: 'Designing intuitive user experiences with stunning visuals.',
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    title: 'Backend Developer',
    type: 'Full-time',
    location: 'Remote / Jakarta',
    salary: 'IDR 9–16M',
    desc: 'Building scalable, secure APIs and infrastructure.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    title: 'Project Manager',
    type: 'Full-time',
    location: 'Jakarta',
    salary: 'IDR 8–14M',
    desc: 'Managing timelines, scope, and client communication.',
    tags: ['Agile', 'Scrum', 'Jira', 'Stakeholders'],
  },
  {
    title: 'Intern — Software Engineer',
    type: 'Internship',
    location: 'Remote',
    salary: 'IDR 2–4M',
    desc: 'Learn while contributing to real, shipped projects.',
    tags: ['Mentorship', 'Real Projects', 'Flexible'],
  },
]

export const careerBenefits = [
  { icon: 'heart', title: 'Supportive Culture', desc: 'A collaborative culture that lifts each other up' },
  { icon: 'lightbulb', title: 'Learn & Grow', desc: 'Access to courses, conferences, and resources' },
  { icon: 'zap', title: 'Modern Tech', desc: 'Cutting-edge stack on every project' },
  { icon: 'users', title: 'Strong Team', desc: 'Join a passionate, expert-driven team' },
] as const
