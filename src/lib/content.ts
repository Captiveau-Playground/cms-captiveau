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
    'Captiveau — software house Indonesia yang membangun produk digital secara end-to-end: riset, desain, pengembangan, dan maintenance.',
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
      'Landing page konversi tinggi dengan desain yang memikat dan copywriting persuasif yang mengubah pengunjung menjadi pelanggan.',
    highlights: ['High Conversion Rate', 'Blazing Fast', 'SEO Optimized'],
    intro:
      'Kami merancang landing page yang tidak hanya indah secara visual tetapi juga dioptimalkan untuk konversi. Dengan pendekatan berbasis data dan prinsip UX modern, setiap elemen dirancang untuk memandu pengunjung menjadi pelanggan.',
    benefits: [
      { icon: 'zap', title: 'Fast Load Time', description: 'Performa dioptimalkan untuk skor PageSpeed 90+' },
      { icon: 'search', title: 'SEO Optimized', description: 'Struktur HTML semantik + skema JSON-LD' },
      { icon: 'smartphone', title: 'Mobile First', description: 'Responsif sempurna di semua perangkat' },
      { icon: 'bar-chart', title: 'Conversion Ready', description: 'CTA strategis, form terintegrasi, dan analitik' },
    ],
    process: [
      { step: '01', title: 'Consult & Brief', description: 'Diskusi kebutuhan, target audiens, dan tujuan landing page', icon: 'file-text' },
      { step: '02', title: 'Wireframe', description: 'Struktur halaman, copywriting, dan alur pengguna', icon: 'layers' },
      { step: '03', title: 'Visual Design', description: 'Desain UI/UX yang selaras dengan identitas brand', icon: 'palette' },
      { step: '04', title: 'Development', description: 'Dibangun dengan Next.js + Tailwind CSS', icon: 'code' },
      { step: '05', title: 'Testing & Deploy', description: 'QA, pengujian performa, dan go-live', icon: 'rocket' },
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Motion'],
    pricing: {
      basic: {
        name: 'Basic',
        price: 'Rp 3,499,000',
        description: 'Landing page satu halaman',
        features: ['1 Halaman Utama', 'Desain Responsif', 'Form Kontak', 'SEO Dasar', 'Integrasi Media Sosial'],
      },
      best: {
        name: 'Professional',
        price: 'Rp 5,499,000',
        description: 'Landing page multi-section',
        features: ['3–5 Section Halaman', 'Animasi & Interaksi', 'Form + Integrasi CRM', 'SEO Lanjutan + JSON-LD', 'Setup Analitik', 'Optimasi Performa'],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Rp 7,499,000',
        description: 'Landing page + microsite',
        features: ['Microsite Multi-halaman', 'Animasi Kustom', 'Siap A/B Testing', 'Integrasi CMS', 'Dukungan Prioritas', 'SLA Performa 99.9%'],
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
      'Solusi e-commerce end-to-end dengan fitur lengkap untuk meluncurkan dan mengembangkan bisnis online Anda.',
    highlights: ['Conversion Optimized', 'Secure Payments', 'Inventory System'],
    intro:
      'Kami membangun toko online yang scalable dan mudah digunakan. Dari katalog produk hingga checkout, setiap langkah dirancang untuk memaksimalkan konversi dan kepuasan pelanggan.',
    benefits: [
      { icon: 'credit-card', title: 'Payment Gateway', description: 'Midtrans, Xendit, atau pembayaran kustom' },
      { icon: 'package', title: 'Inventory Management', description: 'Manajemen stok real-time' },
      { icon: 'truck', title: 'Shipping Integration', description: 'RajaOngkir, JNE, J&T, SiCepat' },
      { icon: 'bar-chart', title: 'Sales Dashboard', description: 'Analitik & laporan penjualan' },
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Analisis kebutuhan bisnis & pasar', icon: 'clipboard-list' },
      { step: '02', title: 'UX Design', description: 'Alur pengguna, wireframe, dan mockup', icon: 'pen-tool' },
      { step: '03', title: 'Development', description: 'Frontend + Backend + Integrasi Pembayaran', icon: 'code' },
      { step: '04', title: 'Testing', description: 'QA, pengujian pembayaran, dan audit keamanan', icon: 'shield' },
      { step: '05', title: 'Launch', description: 'Deploy, monitoring & maintenance', icon: 'rocket' },
    ],
    technologies: ['Next.js', 'Medusa.js', 'PostgreSQL', 'Tailwind CSS', 'Midtrans'],
    pricing: {
      basic: {
        name: 'Starter',
        price: 'Rp 26,999,000',
        description: 'Toko online dasar',
        features: ['Hingga 100 Produk', '1 Payment Gateway', '1 Ekspedisi', 'Responsif Mobile', 'Laporan Dasar'],
      },
      best: {
        name: 'Business',
        price: 'Rp 34,999,000',
        description: 'Toko online lengkap',
        features: ['Produk Tanpa Batas', 'Multi Pembayaran', 'Multi Ekspedisi', 'Admin Dashboard', 'Manajemen Inventori', 'Laporan Penjualan'],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Rp 49,999,000',
        description: 'Platform e-commerce',
        features: ['Fitur Kustom', 'Multi-gudang', 'Integrasi CRM', 'Server Khusus', 'Dukungan Prioritas 24/7', 'SLA 99.9%'],
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
      'Website company profile profesional yang membangun kepercayaan dan kredibilitas untuk brand Anda.',
    highlights: ['Professional Branding', 'Lead Generation', 'Multi-page'],
    intro:
      'Kami membangun website company profile yang mencerminkan identitas dan kredibilitas bisnis Anda. Dengan struktur yang jelas dan visual yang kuat, website Anda menjadi aset pemasaran 24/7.',
    benefits: [
      { icon: 'target', title: 'Lead Generation', description: 'Form, CTA, dan funnel yang dirancang khusus' },
      { icon: 'sparkles', title: 'Brand Identity', description: 'Konsisten secara visual dengan brand Anda' },
      { icon: 'layers', title: 'Multi-page', description: 'Tentang, layanan, portofolio, kontak' },
      { icon: 'line-chart', title: 'Analytics Integrated', description: 'GA4, GTM, dan conversion tracking' },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Audit brand & analisis kompetitor', icon: 'search' },
      { step: '02', title: 'Information Architecture', description: 'Struktur halaman & perjalanan pengguna', icon: 'layers' },
      { step: '03', title: 'Design', description: 'Identitas visual & desain UI', icon: 'palette' },
      { step: '04', title: 'Development', description: 'Build & integrasi CMS', icon: 'code' },
      { step: '05', title: 'Launch', description: 'Deploy & optimasi performa', icon: 'rocket' },
    ],
    technologies: ['Next.js', 'Payload CMS', 'Tailwind CSS', 'Vercel', 'GA4'],
    pricing: {
      basic: {
        name: 'Essential',
        price: 'Rp 8,999,000',
        description: 'Company profile 5 halaman',
        features: ['5 Halaman Utama', 'Desain Responsif', 'Form Kontak', 'SEO Dasar', 'Tautan Media Sosial'],
      },
      best: {
        name: 'Professional',
        price: 'Rp 12,999,000',
        description: 'Company profile + CMS',
        features: ['10+ Halaman', 'CMS untuk Update Konten', 'Section Blog', 'SEO Lanjutan + JSON-LD', 'Setup Analitik', 'Optimasi Performa'],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Rp 18,999,000',
        description: 'Company profile + microsite',
        features: ['Multi-bahasa', 'Integrasi CRM', 'Animasi Kustom', 'CMS + Pelatihan Tim', 'Dukungan Prioritas', 'SLA 99.9%'],
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
      'Desain antarmuka yang indah, intuitif, dan berfokus pada konversi untuk produk digital Anda.',
    highlights: ['User-Centered Design', 'Conversion Focused', 'Design Systems'],
    intro:
      'Kami merancang pengalaman digital yang intuitif dan estetis. Dari riset pengguna hingga prototyping, setiap keputusan desain didasarkan pada data dan praktik terbaik industri.',
    benefits: [
      { icon: 'search', title: 'User Research', description: 'Wawancara, survei, dan usability test' },
      { icon: 'pen-tool', title: 'Wireframe & Prototype', description: 'Prototyping cepat di Figma' },
      { icon: 'wand', title: 'Design System', description: 'Komponen yang reusable dan konsisten' },
      { icon: 'line-chart', title: 'Conversion Focus', description: 'Setiap keputusan desain didorong data' },
    ],
    process: [
      { step: '01', title: 'Research', description: 'Memahami pengguna & kebutuhan bisnis', icon: 'search' },
      { step: '02', title: 'Ideation', description: 'Wireframe & alur pengguna', icon: 'lightbulb' },
      { step: '03', title: 'UI Design', description: 'Desain high-fidelity & design system', icon: 'palette' },
      { step: '04', title: 'Prototype', description: 'Prototipe interaktif & pengujian', icon: 'layers' },
      { step: '05', title: 'Handoff', description: 'Spesifikasi & aset siap developer', icon: 'code' },
    ],
    technologies: ['Figma', 'Design Tokens', 'User Testing', 'Prototyping', 'Design Systems'],
    pricing: {
      basic: {
        name: 'UI Kit',
        price: 'Rp 9,999,000',
        description: 'Desain 1 layar inti',
        features: ['1 Layar Inti', 'Design System Dasar', 'Prototipe Interaktif', '2x Revisi', 'File Handoff'],
      },
      best: {
        name: 'Full Flow',
        price: 'Rp 15,999,000',
        description: 'Desain alur pengguna lengkap',
        features: ['5–10 Layar', 'Riset Pengguna', 'Design System Lengkap', 'Usability Testing', 'Developer Handoff', '4x Revisi'],
      },
      enterprise: {
        name: 'Product Suite',
        price: 'Rp 24,999,000',
        description: 'Desain produk lengkap',
        features: ['Layar Tanpa Batas', 'Multi-platform', 'Design Tokens + Docs', 'Design System Library', 'Designer Khusus', 'Dukungan Prioritas'],
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
      'Aplikasi web berperforma tinggi dengan Next.js, React, dan TypeScript — dibangun untuk berskala.',
    highlights: ['Next.js & React', 'TypeScript', 'API Integration'],
    intro:
      'Kami membangun aplikasi web yang cepat, aman, dan scalable. Dengan teknologi modern — Next.js, React, dan TypeScript — produk Anda siap tumbuh seiring bisnis Anda.',
    benefits: [
      { icon: 'gauge', title: 'High Performance', description: 'Skor Lighthouse 90+ di mobile & desktop' },
      { icon: 'shield', title: 'Security First', description: 'SSL, enkripsi, dan praktik keamanan terbaik' },
      { icon: 'layers', title: 'Scalable Architecture', description: 'Arsitektur siap tumbuh bersama Anda' },
      { icon: 'code', title: 'Clean Code', description: 'Codebase yang terstruktur dan mudah dirawat' },
    ],
    process: [
      { step: '01', title: 'Requirements', description: 'Discovery teknis & arsitektur', icon: 'clipboard-list' },
      { step: '02', title: 'Setup', description: 'Scaffolding project & CI/CD', icon: 'code' },
      { step: '03', title: 'Development', description: 'Iterasi fitur dalam sprint', icon: 'layers' },
      { step: '04', title: 'Testing', description: 'QA otomatis & manual', icon: 'shield' },
      { step: '05', title: 'Maintenance', description: 'Monitoring & dukungan berkelanjutan', icon: 'rocket' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Vercel / AWS'],
    pricing: {
      basic: {
        name: 'MVP',
        price: 'Rp 19,999,000',
        description: 'MVP aplikasi web',
        features: ['3 Modul Inti', 'Desain Responsif', 'Autentikasi', 'Setup Database', 'Deploy Produksi'],
      },
      best: {
        name: 'Business',
        price: 'Rp 34,999,000',
        description: 'Aplikasi web lengkap',
        features: ['10+ Modul', 'Role & Permission', 'Admin Dashboard', 'Integrasi API', 'Payment Gateway', 'CI/CD Pipeline'],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Rp 69,999,000',
        description: 'Platform kompleks',
        features: ['Arsitektur Kustom', 'Siap Microservices', 'Multi-tenant', 'Tim Khusus', 'Monitoring 24/7', 'SLA 99.9%'],
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
      'Aplikasi mobile iOS & Android yang mulus, cepat, dan menyenangkan untuk bisnis Anda.',
    highlights: ['iOS & Android', 'Offline Ready', 'Push Notifications'],
    intro:
      'Kami mengembangkan aplikasi mobile cross-platform dengan React Native dan Expo — satu codebase untuk iOS dan Android, tanpa mengorbankan performa native.',
    benefits: [
      { icon: 'smartphone', title: 'Cross-platform', description: 'Satu codebase untuk iOS & Android' },
      { icon: 'bolt', title: 'Fast & Smooth', description: 'Animasi 60fps, interaksi responsif' },
      { icon: 'shield', title: 'Secure Auth', description: 'Integrasi biometrik & OAuth' },
      { icon: 'rocket', title: 'OTA Updates', description: 'Update tanpa menunggu review toko' },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Definisi scope & strategi platform', icon: 'search' },
      { step: '02', title: 'UX/UI', description: 'Desain & prototipe mobile-first', icon: 'palette' },
      { step: '03', title: 'Development', description: 'React Native + integrasi backend', icon: 'code' },
      { step: '04', title: 'Testing', description: 'Matrix perangkat & QA', icon: 'shield' },
      { step: '05', title: 'Store Launch', description: 'Submit & manajemen rilis', icon: 'rocket' },
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Supabase'],
    pricing: {
      basic: {
        name: 'Starter',
        price: 'Rp 24,999,000',
        description: 'MVP aplikasi mobile',
        features: ['3 Layar Inti', 'Autentikasi', 'Push Notifications', 'Integrasi API', 'Submit ke App Store'],
      },
      best: {
        name: 'Growth',
        price: 'Rp 44,999,000',
        description: 'Aplikasi mobile lengkap',
        features: ['10+ Layar', 'Mode Offline', 'Pembayaran In-app', 'Admin Dashboard', 'Analitik', '2 Iterasi'],
      },
      enterprise: {
        name: 'Scale',
        price: 'Rp 79,999,000',
        description: 'Platform mobile kompleks',
        features: ['Fitur Kustom', 'Sinkronisasi Real-time', 'Multi-bahasa', 'Tim Khusus', 'Dukungan 24/7', 'SLA 99.9%'],
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
  integrations?: string[]
  caseStudy?: CaseStudy | null
}

export type CaseStudyChapter = {
  title: string
  description: string
  image: string | null
}

export type CaseStudyClient = {
  name: string
  industry: string
  location: string
  photo: string | null
  about: string
  needs: string
}

export type CaseStudyTestimonial = {
  quote: string
  name: string
  role: string
  photo: string | null
}

export type CaseStudy = {
  client: CaseStudyClient | null
  objective: CaseStudyChapter | null
  approach: CaseStudyChapter | null
  challenge: CaseStudyChapter | null
  outcome: CaseStudyChapter | null
  reflection: CaseStudyChapter | null
  testimonials: CaseStudyTestimonial[]
}

export const projects: Project[] = [
  {
    slug: 'amertavana',
    title: 'Amertavana',
    image: '/client/amertavana.webp',
    tags: ['Web Development', 'Brand Identity'],
    description:
      'Website company profile modern untuk brand lifestyle premium — desain elegan, performa optimal.',
    size: 'large',
    category: 'Company Profile',
    year: '2026',
    services: ['Web Development', 'UI/UX Design', 'Brand Identity'],
    results: [
      { value: '+120%', label: 'Trafik organik' },
      { value: '98', label: 'Skor Lighthouse' },
      { value: '<1s', label: 'Waktu muat' },
    ],
    stack: ['Next.js', 'Tailwind CSS', 'Payload CMS', 'Vercel'],
    caseStudy: {
      client: {
        name: 'Amertavana',
        industry: 'Lifestyle & Retail',
        location: 'Jakarta, Indonesia',
        photo: '/client/amertavana.webp',
        about:
          'Merek lifestyle premium yang menjual produk skincare dan apparel melalui kanal retail serta online. Menjelang peluncuran seri kedua, mereka menyadari situs lama tidak lagi mewakili kelas brand-nya.',
        needs:
          'Situs company profile yang elegan dan cepat sebagai pusat cerita brand, katalog produk yang mudah dikelola tim non-teknis, serta fondasi analitik untuk mengukur trafik organik sejak hari pertama.',
      },
      objective: {
        title: 'Mereposisi brand secara digital',
        description:
          'Membangun presence digital yang mencerminkan posisi premium Amertavana — dari first impression hingga detail interaksi terkecil — tanpa mengorbankan performa.',
        image: '/client/amertavana.webp',
      },
      approach: {
        title: 'Design system tipis, konten bernafas',
        description:
          'Kami memulai dari audit konten dan arsitektur informasi, lalu merancang design system yang tipis: tipografi editorial, whitespace lebar, satu warna aksen. Setiap keputusan visual kembali ke strategi brand.',
        image: '/client/amertavana.webp',
      },
      challenge: {
        title: 'Elegansi vs. kecepatan',
        description:
          'Foto produk beresolusi tinggi sering bentrok dengan target Lighthouse 90+. Kami membangun pipeline gambar modern (WebP, srcset, lazy-load) dan menulis komponen yang ringan — tanpa menurunkan standar visual.',
        image: '/client/amertavana.webp',
      },
      outcome: {
        title: 'Trafik organik naik 120%',
        description:
          'Situs baru diluncurkan dalam enam minggu. Hasilnya terukur sejak bulan pertama: trafik organik naik 120%, skor Lighthouse 98, dan waktu muat di bawah satu detik.',
        image: '/client/amertavana.webp',
      },
      reflection: {
        title: 'Batasan adalah arah',
        description:
          'Justru karena kami menetapkan batas performa sejak awal, maka setiap keputusan desain jadi lebih tajam dan cepat. Constraints mengarahkan, bukan membatasi.',
        image: '/client/amertavana.webp',
      },
      testimonials: [
        {
          quote:
            'Mereka benar-benar memahami positioning brand kami. Hasilnya elegan, cepat, dan terasa "kami" sejak detik pertama dibuka.',
          name: 'Andini Putri',
          role: 'Founder, Amertavana',
          photo: null,
        },
      ],
    },
  },
  {
    slug: 'cogan',
    title: 'Cogan',
    image: '/client/cogan.webp',
    tags: ['UI/UX Design', 'Mobile App'],
    description:
      'Aplikasi mobile dengan pengalaman pengguna yang intuitif dan desain visual yang memukau.',
    size: 'small',
    category: 'Mobile App',
    year: '2026',
    services: ['UI/UX Design', 'Mobile Development'],
    results: [
      { value: '4.8', label: 'Rating aplikasi' },
      { value: '50K+', label: 'Unduhan' },
      { value: '+35%', label: 'Retensi' },
    ],
    stack: ['React Native', 'Figma', 'Firebase'],
    caseStudy: {
      client: {
        name: 'Cogan',
        industry: 'F&B Loyalty',
        location: 'Bandung, Indonesia',
        photo: '/client/cogan.webp',
        about:
          'Ekosistem minuman lokal yang membangun program loyalitas antar gerai. Mereka butuh aplikasi mobile yang mudah dipakai semua kalangan dan tampil beda dari kompetitor.',
        needs:
          'Aplikasi yang intuitif dengan onboarding mulus, sistem poin yang jelas, dan visual yang membuat pelanggan bangga memakainya setiap hari.',
      },
      objective: {
        title: 'Loyalitas lewat desain yang menyenangkan',
        description:
          'Merancang pengalaman mobile yang membuat pengguna kembali setiap hari — bukan lewat notifikasi, tapi lewat alur yang jelas dan momen visual yang memuaskan.',
        image: '/client/cogan.webp',
      },
      approach: {
        title: 'Prototipe di minggu pertama',
        description:
          'Kami membuat prototipe interaktif sejak minggu pertama dan mengujinya dengan pelanggan nyata di gerai. Feedback langsung membentuk ulang alur poin dan klaim hadiah.',
        image: '/client/cogan.webp',
      },
      challenge: {
        title: 'Poin yang adil untuk semua umur',
        description:
          'Desain harus tetap sederhana untuk pengguna baru, tapi tetap menantang bagi pengguna harian. Kami menyelesaikannya dengan hierarki visual dan microcopy yang tegas di tiap langkah.',
        image: '/client/cogan.webp',
      },
      outcome: {
        title: 'Rating 4.8 dan retensi naik',
        description:
          'Lebih dari 50 ribu unduhan pada bulan pertama dengan rating 4.8 dan retensi bulanan naik 35% dibanding program sebelumnya.',
        image: '/client/cogan.webp',
      },
      reflection: {
        title: 'Uji dengan pengguna sejak awal',
        description:
          'Prototipe yang diuji lebih awal menyelamatkan kami dari dua iterasi besar. Waktu riset adalah investasi yang kembali berkali-kali lipat.',
        image: '/client/cogan.webp',
      },
      testimonials: [
        {
          quote:
            'Aplikasinya terasa seperti produk dari tim internal sendiri. Pengguna kami nyaman, dan itu terlihat dari ulasan harian.',
          name: 'Raka Wirawan',
          role: 'COO, Cogan Group',
          photo: null,
        },
      ],
    },
  },
  {
    slug: 'emerintek',
    title: 'Emerintek',
    image: '/client/emerintek.webp',
    tags: ['Web Platform', 'Dashboard'],
    description:
      'Platform dashboard analitik dengan visualisasi data real-time dan sistem manajemen yang menyeluruh.',
    size: 'small',
    category: 'Dashboard',
    year: '2025',
    services: ['Web Development', 'Data Visualization'],
    results: [
      { value: '-40%', label: 'Beban kerja manual' },
      { value: '24/7', label: 'Monitoring real-time' },
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
      'Platform e-commerce lengkap dengan payment gateway terintegrasi dan manajemen inventori.',
    size: 'large',
    category: 'E-Commerce',
    year: '2025',
    services: ['E-Commerce', 'Web Development', 'Digital Strategy'],
    results: [
      { value: '+85%', label: 'Penjualan online' },
      { value: '3x', label: 'Tingkat konversi' },
      { value: '1,200+', label: 'Produk dikelola' },
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
  { value: 50, suffix: '+', label: 'Proyek selesai' },
  { value: 30, suffix: '+', label: 'Klien terpercaya' },
  { value: 4.9, suffix: '', decimals: 1, label: 'Rating klien' },
  { value: 8, suffix: ' thn', label: 'Pengalaman' },
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
      'Captiveau benar-benar mengubah cara kami membangun produk digital. Tim mereka menyelesaikan MVP kami hanya dalam 8 minggu. Sekarang kami bisa fokus pada strategi bisnis, bukan masalah teknis.',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    name: 'Sari Dewi',
    role: 'Founder',
    company: 'EduTech Solutions',
    quote:
      'Awalnya saya ragu dengan software house lokal, tapi Captiveau membuktikan kualitasnya. Aplikasi e-learning kami tembus rating 4.8 di Play Store. Tim mereka profesional dan responsif.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Ahmad Rizki',
    role: 'CTO',
    company: 'FinanceApp',
    quote:
      'Sebagai founder non-teknis, Captiveau membantu mewujudkan ide saya. Kami meluncur 3 bulan lebih cepat dari jadwal. Proses pengembangan yang transparan membuat saya selalu update di setiap langkah.',
    avatar: 'https://i.pravatar.cc/150?img=60',
  },
  {
    name: 'Maya Putri',
    role: 'Product Manager',
    company: 'RetailTech',
    quote:
      'Perhatian Captiveau terhadap detail UI/UX sangat mengesankan. Aplikasi marketplace kami mengalami kenaikan konversi 35%. Mereka benar-benar memahami pengguna Indonesia.',
    avatar: 'https://i.pravatar.cc/150?img=45',
  },
  {
    name: 'Doni Pratama',
    role: 'Direktur IT',
    company: 'Bank Digital',
    quote:
      'Dashboard keuangan kami butuh overhaul total, dan Captiveau menyelesaikannya dengan sempurna. Analitik real-time meningkatkan engagement pengguna sebesar 47%. Implementasi keamanannya sangat solid.',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    name: 'Rina Sari',
    role: 'Head of Digital',
    company: 'UMKM Hub',
    quote:
      'Dokumentasi dan dukungan Captiveau luar biasa. Platform UMKM kami berhasil mengonboard 1.000+ merchant dalam 2 bulan. Tim mereka selalu siap membantu troubleshooting.',
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
    title: 'Apa itu Captiveau?',
    content:
      'Captiveau adalah software house Indonesia yang berspesialisasi dalam desain dan pengembangan produk digital secara end-to-end. Kami membantu startup, korporasi, dan UMKM mewujudkan ide digital mereka dengan teknologi modern dan tim yang berpengalaman.',
    category: 'General',
  },
  {
    title: 'Berapa lama waktu pengerjaan aplikasi?',
    content:
      'Tergantung kompleksitas project. Landing page biasanya memakan waktu 1–2 minggu, website company profile 2–4 minggu, dan aplikasi web/mobile 1–3 bulan. Kami selalu memberikan timeline yang jelas sebelum memulai.',
    category: 'General',
  },
  {
    title: 'Apakah saya perlu skill teknis untuk bekerja dengan Captiveau?',
    content:
      'Tidak. Tim kami memandu Anda dari awal hingga selesai — dari konsultasi kebutuhan dan perencanaan hingga peluncuran. Anda fokus pada visi bisnis; kami yang mengurus sisanya.',
    category: 'General',
  },
  {
    title: 'Bagaimana proses kerja dengan Captiveau?',
    content:
      'Proses kami transparan: konsultasi & analisis → desain & prototipe → pengembangan → pengujian & QA → peluncuran & maintenance. Anda mendapat update mingguan dan akses ke papan pengembangan.',
    category: 'Technical',
  },
  {
    title: 'Bisakah saya meminta revisi selama pengembangan?',
    content:
      'Bisa. Setiap paket sudah termasuk sejumlah revisi. Untuk perubahan scope di luar paket Anda, kami memberikan estimasi tambahan yang transparan sebelum mulai mengerjakan.',
    category: 'Technical',
  },
  {
    title: 'Apakah aplikasinya mendukung Android dan iOS?',
    content:
      'Ya. Kami menggunakan React Native / Flutter untuk pengembangan cross-platform — satu codebase untuk Android dan iOS tanpa mengorbankan performa native.',
    category: 'Technical',
  },
  {
    title: 'Bagaimana sistem pembayaran di Captiveau?',
    content:
      'Kami menggunakan sistem milestone: 50% di muka (DP), 40% saat progres pengembangan 50%, dan 10% saat selesai. Transfer bank diterima, invoice resmi selalu diberikan.',
    category: 'Pricing',
  },
  {
    title: 'Apakah ada garansi untuk aplikasi yang dibuat?',
    content:
      'Ya. Kami memberikan garansi perbaikan bug dan maintenance agar produk Anda tetap berjalan optimal setelah peluncuran. Paket maintenance bulanan juga tersedia untuk dukungan berkelanjutan.',
    category: 'Support',
  },
  {
    title: 'Bagaimana cara mulai bekerja dengan Captiveau?',
    content:
      'Sangat mudah. Hubungi kami melalui form kontak atau WhatsApp, ceritakan kebutuhan Anda, dan kami akan menjadwalkan konsultasi gratis untuk menyusun solusi yang tepat.',
    category: 'Support',
  },
]

export const trustPoints = [
  {
    title: 'Senior Expert Team',
    desc: 'Dikerjakan langsung oleh developer & designer senior dengan pengalaman 4+ tahun di industri digital.',
    icon: 'users',
  },
  {
    title: 'Free Consultation',
    desc: 'Diskusikan ide Anda dengan tim kami secara gratis sebelum memutuskan memulai project.',
    icon: 'message',
  },
  {
    title: 'Quality Guarantee',
    desc: 'Garansi perbaikan bug dan maintenance agar produk Anda tetap berjalan optimal.',
    icon: 'shield',
  },
] as const

export const advantages = [
  {
    title: 'Transparent Process',
    desc: 'Pantau project Anda secara real-time dengan update mingguan dan akses ke papan pengembangan.',
    icon: 'eye',
  },
  {
    title: 'Dedicated Team',
    desc: 'Setiap project mendapat tim khusus yang fokus 100% membangun produk Anda.',
    icon: 'users',
  },
  {
    title: 'End-to-End Solutions',
    desc: 'Dari ide pertama hingga maintenance — kami menangani desain, pengembangan, pengujian, dan deployment.',
    icon: 'layers',
  },
] as const

export const articles = [
  {
    title: 'How to Choose the Right Tech Stack for Your Startup in 2026',
    category: 'Tech',
    date: '2026-07-15',
    readTime: '5 menit baca',
    excerpt:
      'Memilih tech stack yang tepat adalah keputusan krusial yang menentukan skalabilitas produk, biaya, dan kecepatan pengembangan Anda.',
    image:
      '/images/landing.jpg',
  },
  {
    title: 'Why UI/UX Design is an Investment, Not a Cost',
    category: 'Design',
    date: '2026-07-08',
    readTime: '4 menit baca',
    excerpt:
      'Desain yang baik bukan sekadar estetika — ia menciptakan pengalaman yang mengubah pengunjung menjadi pelanggan setia.',
    image:
      '/images/design.jpg',
  },
  {
    title: 'Landing Page vs Multi-Page Website: Which Is Right?',
    category: 'Strategy',
    date: '2026-06-28',
    readTime: '6 menit baca',
    excerpt:
      'Tidak semua bisnis membutuhkan website multi-halaman. Pelajari kapan landing page sudah cukup — dan kapan Anda butuh sesuatu yang lebih kompleks.',
    image:
      '/images/office.jpg',
  },
  {
    title: '7 Key Metrics to Measure Digital Product Success',
    category: 'Analytics',
    date: '2026-06-20',
    readTime: '7 menit baca',
    excerpt:
      'Berhenti menebak — mulailah mengukur. Berikut metrik penting yang perlu dilacak untuk produk digital yang sukses.',
    image:
      '/images/code.jpg',
  },
  {
    title: 'The Digital Product Development Journey: From Idea to Launch',
    category: 'Development',
    date: '2026-06-12',
    readTime: '8 menit baca',
    excerpt:
      'Memahami siklus pengembangan produk membantu Anda merencanakan budget, timeline, dan ekspektasi dengan lebih baik.',
    image:
      '/images/meeting.jpg',
  },
  {
    title: 'SEO for Business Websites: The Complete 2026 Guide',
    category: 'Marketing',
    date: '2026-06-05',
    readTime: '10 menit baca',
    excerpt:
      'SEO bukan sihir — ini strategi. Pelajari cara membuat website bisnis Anda tampil di halaman pertama Google.',
    image:
      '/images/team.jpg',
  },
]

export const values = [
  {
    icon: 'lightbulb',
    title: 'Creative',
    desc: 'Solusi kreatif dan inovatif untuk setiap tantangan digital — fungsional dan menginspirasi.'
  },
  {
    icon: 'leaf',
    title: 'Lean',
    desc: 'Efisien dan lincah dalam setiap proses. Kurangi pemborosan, maksimalkan nilai.'
  },
  {
    icon: 'target',
    title: 'Effective',
    desc: 'Fokus pada hasil yang terukur. Setiap strategi dirancang untuk mencapai tujuan bisnis Anda.'
  },
  {
    icon: 'bolt',
    title: 'Active',
    desc: 'Proaktif dan responsif. Kami bergerak cepat, berkomunikasi dengan jelas, dan selangkah lebih maju.'
  },
  {
    icon: 'brain',
    title: 'Rational',
    desc: 'Keputusan dibangun di atas data, logika, dan analisis mendalam. Solusi yang masuk akal dan berkelanjutan.'
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
  { step: '01', title: 'Consult & Analyze', desc: 'Menemukan kebutuhan, riset, dan strategi', icon: 'clipboard-list' },
  { step: '02', title: 'Design & Prototype', desc: 'Dari wireframe hingga prototipe high-fidelity', icon: 'palette' },
  { step: '03', title: 'Development', desc: 'Dibangun dengan standar engineering tinggi', icon: 'code' },
  { step: '04', title: 'Testing & QA', desc: 'Quality assurance yang menyeluruh', icon: 'shield' },
  { step: '05', title: 'Launch & Maintain', desc: 'Deploy dan dukungan berkelanjutan', icon: 'rocket' },
]

export const jobs = [
  {
    title: 'Frontend Developer',
    type: 'Full-time',
    location: 'Remote / Jakarta',
    salary: 'IDR 8–15M',
    desc: 'React, Next.js, TypeScript — membangun antarmuka yang cepat dan indah.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'UI/UX Designer',
    type: 'Full-time',
    location: 'Remote / Jakarta',
    salary: 'IDR 7–12M',
    desc: 'Merancang pengalaman pengguna yang intuitif dengan visual yang memukau.',
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    title: 'Backend Developer',
    type: 'Full-time',
    location: 'Remote / Jakarta',
    salary: 'IDR 9–16M',
    desc: 'Membangun API dan infrastruktur yang scalable dan aman.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    title: 'Project Manager',
    type: 'Full-time',
    location: 'Jakarta',
    salary: 'IDR 8–14M',
    desc: 'Mengelola timeline, scope, dan komunikasi klien.',
    tags: ['Agile', 'Scrum', 'Jira', 'Stakeholders'],
  },
  {
    title: 'Intern — Software Engineer',
    type: 'Internship',
    location: 'Remote',
    salary: 'IDR 2–4M',
    desc: 'Belajar sambil berkontribusi pada project nyata yang sudah rilis.',
    tags: ['Mentorship', 'Real Projects', 'Flexible'],
  },
]

export type EventItem = {
  slug: string
  title: string
  description: string
  image: string | null
  imageAspect: 'auto' | '21/9' | '16/9' | '4/3' | '1/1'
  startDate: string
  endDate: string | null
  venue: string
  mode: 'offline' | 'online' | 'hybrid'
  organizer: string
  capacity: number | null
  status: 'upcoming' | 'ongoing' | 'past' | 'archived'
  googleFormEmbed: string | null
  registrationUrl: string | null
  sessions: { time: string; title: string; description?: string }[]
  materialOutline: string[]
  speakers: { name: string; position: string; role: string; photo: string | null }[]
  recordingUrl: string | null
}

/**
 * Acara contoh — digunakan sebagai fallback saat CMS kosong dan sebagai source
 * seed. Google Form embed memakai URL placeholder; ganti lewat CMS admin.
 */
export const events: EventItem[] = [
  {
    slug: 'workshop-landing-page-konversi-tinggi',
    title: 'Workshop: Landing Page Konversi Tinggi',
    description:
      'Workshop praktis 3 jam — belajar struktur, copywriting, dan optimasi landing page yang benar-benar mengonversi pengunjung menjadi pelanggan.',
    image: null,
    imageAspect: 'auto',
    startDate: '2026-10-15T09:00:00.000Z',
    endDate: '2026-10-15T12:00:00.000Z',
    venue: 'Zoom Meeting (online)',
    mode: 'online',
    organizer: 'Captiveau',
    capacity: 50,
    status: 'upcoming',
    googleFormEmbed:
      '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSewpEo4M6AuKX8ZWfqH9md7wGMewmylTDwSbTO6eB1Rav3qzg/viewform?embedded=true" width="640" height="2431" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSewpEo4M6AuKX8ZWfqH9md7wGMewmylTDwSbTO6eB1Rav3qzg/viewform',
    sessions: [
      { time: '09.00 – 09.15', title: 'Pembukaan & perkenalan' },
      {
        time: '09.15 – 10.30',
        title: 'Prinsip landing page berkonversi: struktur, hierarki, dan psikologi pengunjung',
      },
      { time: '10.30 – 10.45', title: 'Istirahat' },
      { time: '10.45 – 11.45', title: 'Copywriting praktis + studi kasus nyata' },
      { time: '11.45 – 12.00', title: 'Q&A dan penutup' },
    ],
    materialOutline: [
      'Anatomi landing page: hero, value proposition, social proof, CTA',
      'Hierarki visual: apa yang dilihat pengunjung pertama kali',
      'Psikologi konversi: FOMO, scarcity, dan prinsip persuasi',
      'Copywriting: headline, sub-headline, dan microcopy',
      'Studi kasus: landing page sebelum vs sesudah optimasi',
    ],
    speakers: [
      {
        name: 'Andi Pratama',
        position: 'Pembicara utama',
        role: 'Founder & CEO, Captiveau',
        photo: null,
      },
      {
        name: 'Fina Rahma',
        position: 'Fasilitator',
        role: 'UI/UX Designer, Captiveau',
        photo: null,
      },
    ],
    recordingUrl: null,
  },
  {
    slug: 'webinar-uiux-desain-berbasis-data',
    title: 'Webinar: UI/UX Desain Berbasis Data',
    description:
      'Bagaimana riset pengguna dan data mengarahkan setiap keputusan desain — dari wireframe hingga design system, tanpa menebak-nebak.',
    image: null,
    imageAspect: '4/3',
    startDate: '2026-11-05T14:00:00.000Z',
    endDate: '2026-11-05T16:00:00.000Z',
    venue: 'Zoom Meeting (online)',
    mode: 'online',
    organizer: 'Captiveau',
    capacity: 100,
    status: 'upcoming',
    googleFormEmbed:
      '<iframe src="https://docs.google.com/forms/d/e/2FAIpQLSdNb3jXwqZ4VhY7T9lReX8gYmECbSAMPLE/webform?embedded=true" width="640" height="900" frameborder="0" marginheight="0" marginwidth="0">Memuat…</iframe>',
    registrationUrl:
      'https://docs.google.com/forms/d/e/2FAIpQLSdNb3jXwqZ4VhY7T9lReX8gYmECbSAMPLE/webform',
    sessions: [
      { time: '14.00 – 14.10', title: 'Pembukaan' },
      { time: '14.10 – 15.00', title: 'Riset pengguna: wawancara, survei, usability test' },
      { time: '15.00 – 15.50', title: 'Dari data ke keputusan desain (studi kasus)' },
      { time: '15.50 – 16.00', title: 'Q&A' },
    ],
    materialOutline: [
      'Metode riset pengguna untuk produk baru vs produk berjalan',
      'Membaca data analitik dan hasil usability test',
      'Mengubah insight menjadi prinsip desain',
      'Contoh design system yang lahir dari data',
    ],
    speakers: [
      {
        name: 'Bella Kusuma',
        position: 'Pembicara utama',
        role: 'Head of Design, Captiveau',
        photo: null,
      },
    ],
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    slug: 'talkshow-luncurkan-toko-online-umkm',
    title: 'Talkshow: Meluncurkan Toko Online untuk UMKM',
    description:
      'Sesi tanya-jawab hangat bersama praktisi e-commerce — dari pilihan platform, payment gateway, hingga strategi pemasaran pertama.',
    image: null,
    imageAspect: 'auto',
    startDate: '2026-09-12T13:00:00.000Z',
    endDate: '2026-09-12T15:00:00.000Z',
    venue: 'M Bloc Space, Jakarta Selatan',
    mode: 'offline',
    organizer: 'Captiveau × Komunitas UMKM',
    capacity: 60,
    status: 'past',
    googleFormEmbed: null,
    registrationUrl: null,
    sessions: [
      { time: '13.00 – 13.15', title: 'Registrasi ulang' },
      { time: '13.15 – 14.15', title: 'Diskusi: memilih platform & payment gateway' },
      { time: '14.15 – 15.00', title: 'Q&A terbuka & networking' },
    ],
    materialOutline: [],
    speakers: [
      {
        name: 'Dewi Lestari',
        position: 'Panelis',
        role: 'Product Manager, Captiveau',
        photo: null,
      },
    ],
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
]
