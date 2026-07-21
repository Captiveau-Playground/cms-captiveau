// ===== SEED DATA for Captiveau CMS =====
// Source: docs.md - Captiveau Landing Page

export const siteSettings = {
  companyName: 'Captiveau',
  tagline: 'Transform Your Ideas Into Digital Reality',
  description: 'Captiveau — Creative Tech Studio. Transform Your Ideas Into Digital Reality.',
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/captiveau' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/captiveau' },
  ],
  contacts: [
    { type: 'email', value: 'hello@captiveau.id' },
    { type: 'whatsapp', value: '+6281234567890' },
  ],
  address: {
    street: 'Jl. Kuningan Barat No. 8',
    city: 'Jakarta Selatan',
    region: 'DKI Jakarta',
    postalCode: '12710',
    country: 'Indonesia',
  },
  analytics: {
    ga4Id: 'G-3GP16JG3ED',
    gtmId: 'GTM-NBX8VZ3C',
    clarityId: 'tdbejr36nn',
  },
}

export const mainMenu = {
  items: [
    { label: 'Beranda', href: '/', order: 1 },
    { label: 'Layanan', href: '/services', order: 2 },
    { label: 'Portofolio', href: '/portfolios', order: 3 },
    { label: 'Artikel', href: '/articles', order: 4 },
    { label: 'Tentang Kami', href: '/about-us', order: 5 },
    { label: 'Karir', href: '/career', order: 6 },
  ],
}

export const services = [
  {
    title: 'Landing Page',
    slug: 'landing-page',
    subtitle: 'Landing Page Professional',
    description: 'Landing page konversi tinggi dengan desain modern yang siap membantu bisnis Anda berkembang.',
    icon: 'layout',
    introduction: [
      { children: [{ text: 'Kami menciptakan landing page yang tidak hanya cantik secara visual, tetapi juga dioptimalkan untuk konversi. Dengan pendekatan data-driven dan prinsip UX terkini, setiap elemen dirancang untuk memandu pengunjung menjadi pelanggan.' }] },
    ],
    keyBenefits: [
      { icon: 'zap', title: 'Fast Load Time', description: 'Optimasi performa dengan skor PageSpeed 90+' },
      { icon: 'search', title: 'SEO Optimized', description: 'Struktur semantic HTML + JSON-LD schema' },
      { icon: 'smartphone', title: 'Mobile First', description: 'Responsive sempurna di semua device' },
      { icon: 'bar-chart', title: 'Conversion Ready', description: 'CTA strategis, form terintegrasi, analytics' },
    ],
    process: [
      { step: 1, title: 'Konsultasi & Brief', description: 'Diskusi kebutuhan, target audiens, dan goals landing page', icon: 'file-text' },
      { step: 2, title: 'Wireframe', description: 'Struktur halaman, copywriting, dan user flow', icon: 'layout' },
      { step: 3, title: 'Desain Visual', description: 'UI/UX design sesuai brand identity', icon: 'palette' },
      { step: 4, title: 'Development', description: 'Coding dengan Next.js + Tailwind CSS', icon: 'code' },
      { step: 5, title: 'Testing & Deploy', description: 'QA, performance test, dan go-live', icon: 'rocket' },
    ],
    usp: [
      { icon: 'gauge', title: 'Performa Tinggi', description: 'Skor Lighthouse 90+ untuk mobile & desktop' },
      { icon: 'pencil', title: 'Copywriting Profesional', description: 'Kata-kata yang meyakinkan dan mengkonversi' },
      { icon: 'line-chart', title: 'Analytics Terintegrasi', description: 'GA4, GTM, dan conversion tracking' },
    ],
    pricingPlans: {
      basic: { name: 'Basic', price: 'Rp 3,499,000', description: 'Landing page 1 halaman', features: [{ feature: '1 Halaman Utama' }, { feature: 'Desain Responsif' }, { feature: 'Form Contact' }, { feature: 'Basic SEO' }, { feature: 'Social Media Integration' }] },
      bestDeal: { name: 'Professional', price: 'Rp 5,499,000', description: 'Landing page multi-section', features: [{ feature: '3-5 Section Halaman' }, { feature: 'Animasi & Interaksi' }, { feature: 'Form + Integrasi CRM' }, { feature: 'SEO Lanjutan + JSON-LD' }, { feature: 'Analytics Setup' }, { feature: 'Optimasi Performa' }] },
      enterprise: { name: 'Enterprise', price: 'Rp 7,499,000', description: 'Landing page + microsite', features: [{ feature: 'Multi-page Microsite' }, { feature: 'Custom Animations' }, { feature: 'A/B Testing Ready' }, { feature: 'CMS Integration' }, { feature: 'Priority Support' }, { feature: 'Performance SLA 99.9%' }] },
    },
    technologies: [{ name: 'Next.js' }, { name: 'TypeScript' }, { name: 'Tailwind CSS' }, { name: 'shadcn/ui' }, { name: 'Framer Motion' }],
    order: 1,
  },
  {
    title: 'E-Commerce',
    slug: 'e-commerce',
    subtitle: 'Toko Online Siap Jual',
    description: 'Solusi e-commerce end-to-end dengan fitur lengkap untuk memulai dan mengembangkan bisnis online Anda.',
    icon: 'shopping-cart',
    introduction: [
      { children: [{ text: 'Kami membangun toko online yang scalable dan user-friendly. Dari katalog produk hingga checkout, setiap langkah dirancang untuk memaksimalkan konversi dan kepuasan pelanggan.' }] },
    ],
    keyBenefits: [
      { icon: 'credit-card', title: 'Payment Gateway', description: 'Midtrans, Xendit, atau custom payment' },
      { icon: 'package', title: 'Inventory Management', description: 'Manajemen stok real-time' },
      { icon: 'truck', title: 'Shipping Integration', description: 'RajaOngkir, JNE, J&T, SiCepat' },
      { icon: 'bar-chart', title: 'Dashboard Penjualan', description: 'Analytics & laporan penjualan' },
    ],
    process: [
      { step: 1, title: 'Consultation', description: 'Analisis kebutuhan bisnis dan target pasar', icon: 'file-text' },
      { step: 2, title: 'UX Design', description: 'User flow, wireframe, dan mockup', icon: 'palette' },
      { step: 3, title: 'Development', description: 'Frontend + Backend + Payment Integration', icon: 'code' },
      { step: 4, title: 'Testing', description: 'QA, payment testing, dan security audit', icon: 'check-circle' },
      { step: 5, title: 'Launch', description: 'Deploy, monitoring, dan maintenance', icon: 'rocket' },
    ],
    usp: [
      { icon: 'bolt', title: 'Fast Performance', description: 'Optimasi kecepatan untuk konversi maksimal' },
      { icon: 'shield', title: 'Keamanan Terjamin', description: 'SSL, enkripsi data, dan proteksi fraud' },
      { icon: 'mobile', title: 'Mobile Optimized', description: 'Pengalaman belanja mulus di smartphone' },
    ],
    pricingPlans: {
      basic: { name: 'Starter', price: 'Rp 26,999,000', description: 'Toko online basic', features: [{ feature: 'Up to 100 Produk' }, { feature: '1 Payment Gateway' }, { feature: '1 Expedition' }, { feature: 'Mobile Responsive' }, { feature: 'Basic Report' }] },
      bestDeal: { name: 'Business', price: 'Rp 34,999,000', description: 'Toko online lengkap', features: [{ feature: 'Unlimited Produk' }, { feature: 'Multi Payment' }, { feature: 'Multi Expedition' }, { feature: 'Admin Dashboard' }, { feature: 'Inventory Management' }, { feature: 'Sales Report' }] },
      enterprise: { name: 'Enterprise', price: 'Rp 49,999,000', description: 'E-commerce platform', features: [{ feature: 'Custom Feature' }, { feature: 'Multi Warehouse' }, { feature: 'CRM Integration' }, { feature: 'Dedicated Server' }, { feature: 'Priority Support 24/7' }, { feature: 'SLA 99.9%' }] },
    },
    technologies: [{ name: 'Next.js' }, { name: 'Medusa.js' }, { name: 'PostgreSQL' }, { name: 'Tailwind CSS' }, { name: 'Midtrans' }],
    order: 2,
  },
  {
    title: 'UI/UX Design',
    slug: 'uiux-design',
    subtitle: 'Desain yang Memikat',
    description: 'Desain UI/UX yang engaging dan user-centric untuk produk digital Anda.',
    icon: 'palette',
    introduction: [
      { children: [{ text: 'Kami merancang pengalaman digital yang intuitif dan estetis. Dari riset pengguna hingga prototyping, setiap keputusan desain didasarkan pada data dan best practice industri.' }] },
    ],
    keyBenefits: [
      { icon: 'users', title: 'User Research', description: 'Riset mendalam tentang kebutuhan user' },
      { icon: 'layout', title: 'Wireframe & Prototype', description: 'Interactive prototype untuk validasi' },
      { icon: 'eye', title: 'Visual Design', description: 'Desain modern dengan prinsip Gestalt' },
      { icon: 'check-circle', title: 'Usability Testing', description: 'Test dengan real user untuk hasil optimal' },
    ],
    process: [
      { step: 1, title: 'Research', description: 'User research, competitor analysis, dan goal definition', icon: 'search' },
      { step: 2, title: 'Wireframe', description: 'Information architecture dan user flow', icon: 'sitemap' },
      { step: 3, title: 'Prototype', description: 'High-fidelity interactive prototype (Figma)', icon: 'figma' },
      { step: 4, title: 'Visual Design', description: 'UI design system, iconography, typography', icon: 'palette' },
      { step: 5, title: 'Handoff', description: 'Developer handoff dengan design spec lengkap', icon: 'code' },
    ],
    usp: [
      { icon: 'figma', title: 'Figma Native', description: 'Design system yang terstruktur dan reusable' },
      { icon: 'users', title: 'User Centered', description: 'Setiap desain berdasarkan riset dan validasi' },
      { icon: 'zap', title: 'Rapid Prototyping', description: 'Cepat dari konsep ke interactive prototype' },
    ],
    pricingPlans: {
      basic: { name: 'UI Package', price: 'Rp 1,999,000', description: 'Desain UI landing page', features: [{ feature: '1 Page Design' }, { feature: 'Wireframe' }, { feature: 'UI Design' }, { feature: '1x Revisi' }, { feature: 'Figma Source' }] },
      bestDeal: { name: 'UX Package', price: 'Rp 4,499,000', description: 'Desain UI/UX lengkap', features: [{ feature: '5 Page Design' }, { feature: 'User Flow' }, { feature: 'Wireframe + Prototype' }, { feature: 'UI Design System' }, { feature: '3x Revisi' }, { feature: 'Developer Handoff' }] },
      enterprise: { name: 'Full Package', price: 'Rp 7,499,000', description: 'End-to-end design', features: [{ feature: '10+ Page Design' }, { feature: 'User Research' }, { feature: 'Usability Testing' }, { feature: 'Full Design System' }, { feature: 'Unlimited Revisi' }, { feature: 'Priority Support' }] },
    },
    technologies: [{ name: 'Figma' }, { name: 'Adobe Creative Suite' }, { name: 'Principle' }, { name: 'Maze' }, { name: 'Hotjar' }],
    order: 3,
  },
  {
    title: 'Company Profile',
    slug: 'company-profile',
    subtitle: 'Profil Perusahaan Profesional',
    description: 'Website company profile yang mencerminkan identitas dan kredibilitas bisnis Anda.',
    icon: 'building2',
    introduction: [
      { children: [{ text: 'Company profile website adalah wajah digital perusahaan Anda. Kami menciptakan website yang tidak hanya informatif tetapi juga membangun kepercayaan dan kredibilitas di mata klien potensial.' }] },
    ],
    keyBenefits: [
      { icon: 'building', title: 'Brand Identity', description: 'Desain yang mencerminkan brand value' },
      { icon: 'file-text', title: 'Company Profile', description: 'Visi, misi, tim, dan pencapaian' },
      { icon: 'briefcase', title: 'Portfolio Gallery', description: 'Showcase project dengan detail' },
      { icon: 'message-circle', title: 'Contact & Inquiry', description: 'Form contact, WhatsApp, dan maps' },
    ],
    process: [
      { step: 1, title: 'Brand Discovery', description: 'Memahami brand value dan target audiens', icon: 'compass' },
      { step: 2, title: 'Content Strategy', description: 'Struktur informasi dan copywriting', icon: 'file-text' },
      { step: 3, title: 'Visual Design', description: 'UI design sesuai brand guidelines', icon: 'palette' },
      { step: 4, title: 'Development', description: 'Frontend + CMS integration', icon: 'code' },
      { step: 5, title: 'Launch', description: 'Deploy dengan performance optimal', icon: 'rocket' },
    ],
    usp: [
      { icon: 'award', title: 'Professional Look', description: 'Kesan profesional dan terpercaya' },
      { icon: 'grid', title: 'CMS Ready', description: 'Mudah update konten sendiri' },
      { icon: 'globe', title: 'Multi Language', description: 'Siap untuk audiens global' },
    ],
    pricingPlans: {
      basic: { name: 'Starter', price: 'Rp 3,499,000', description: 'Company profile basic', features: [{ feature: '5 Halaman' }, { feature: 'Desain Responsif' }, { feature: 'Contact Form' }, { feature: 'Google Maps' }, { feature: 'Basic SEO' }] },
      bestDeal: { name: 'Professional', price: 'Rp 5,999,000', description: 'Company profile lengkap', features: [{ feature: '10 Halaman' }, { feature: 'CMS Integration' }, { feature: 'Portfolio Gallery' }, { feature: 'Team & Career Page' }, { feature: 'Blog/Articles' }, { feature: 'SEO Lanjutan' }] },
      enterprise: { name: 'Enterprise', price: 'Rp 9,999,000', description: 'Company profile premium', features: [{ feature: 'Unlimited Halaman' }, { feature: 'Custom CMS' }, { feature: 'Multi Language' }, { feature: 'Advanced Analytics' }, { feature: 'Priority Support' }, { feature: 'Performance SLA 99.9%' }] },
    },
    technologies: [{ name: 'Next.js' }, { name: 'Payload CMS' }, { name: 'TypeScript' }, { name: 'Tailwind CSS' }, { name: 'Framer Motion' }],
    order: 4,
  },
]

export const teamMembers = [
  {
    name: 'Ahmad Rizki',
    role: 'Founder & CEO',
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'instagram', url: '#' },
    ],
    order: 1,
  },
  {
    name: 'Sarah Wijaya',
    role: 'Lead Designer',
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'instagram', url: '#' },
    ],
    order: 2,
  },
  {
    name: 'Dimas Pratama',
    role: 'Full Stack Developer',
    socialLinks: [
      { platform: 'github', url: '#' },
      { platform: 'linkedin', url: '#' },
    ],
    order: 3,
  },
  {
    name: 'Maya Indah',
    role: 'Project Manager',
    socialLinks: [
      { platform: 'linkedin', url: '#' },
    ],
    order: 4,
  },
]

export const testimonials = [
  { name: 'Budi Santoso', role: 'CEO, StartupXYZ', text: 'Captiveau membantu kami membuat landing page yang meningkatkan conversion rate hingga 40%! Sangat profesional dan responsif.', rating: 5, order: 1 },
  { name: 'Dewi Lestari', role: 'Marketing Manager, TokoMaju', text: 'Tim Captiveau sangat memahami kebutuhan kami. Hasil desain UI/UX-nya超出 ekspektasi!', rating: 5, order: 2 },
  { name: 'Rudi Hermawan', role: 'Founder, EduLearn', text: 'Company profile website kami jadi lebih profesional setelah dirework oleh Captiveau. Banyak klien baru yang datang dari website.', rating: 5, order: 3 },
  { name: 'Ani Wulandari', role: 'Owner, FashionIndo', text: 'Toko online kami berhasil diluncurkan tepat waktu. Sistem payment dan shippingnya lengkap!', rating: 5, order: 4 },
  { name: 'Fajar Nugroho', role: 'CTO, TechSolusi', text: 'Kualitas kode yang bersih dan performa website yang cepat. Tim teknis Captiveau sangat kompeten.', rating: 5, order: 5 },
  { name: 'Rina Marlina', role: 'CEO, KreasiIndo', text: 'Pelayanan luar biasa! Dari konsultasi sampai launching, semuanya terstruktur dengan baik.', rating: 5, order: 6 },
  { name: 'Adi Saputra', role: 'Founder, GreenEarth', text: 'Website company profile kami jadi lebih engaging. Banyak fitur interaktif yang bikin pengunjung betah.', rating: 5, order: 7 },
  { name: 'Sari Indah', role: 'Marketing Lead, FreshFood', text: 'Captiveau mengerti betul target pasar kami. Landing page yang mereka buat sangat efektif.', rating: 5, order: 8 },
  { name: 'Tono Prasetyo', role: 'Owner, BangunProperti', text: 'Proses pengerjaan cepat dan komunikasi lancar. Hasilnya melebihi ekspektasi!', rating: 5, order: 9 },
  { name: 'Mega Putri', role: 'CEO, DigitalAsia', text: 'Tim Captiveau sangat profesional dan kreatif. Mereka benar-benar mendengarkan kebutuhan kami.', rating: 5, order: 10 },
]

export const jobListings = [
  {
    title: 'Frontend Developer (Next.js)',
    department: 'Engineering',
    location: 'Jakarta Selatan (Hybrid)',
    type: 'full-time',
    salary: 'Rp 5,000,000 – Rp 8,000,000',
    description: [{ children: [{ text: 'Kami mencari Frontend Developer yang berpengalaman dengan Next.js untuk mengerjakan project website klien kami.' }] }],
    requirements: [{ requirement: 'Pengalaman 2+ tahun dengan React/Next.js' }, { requirement: 'Menguasai TypeScript' }, { requirement: 'Pengalaman dengan Tailwind CSS' }, { requirement: 'Familiar dengan Git dan CI/CD' }],
    benefits: [{ benefit: 'Gaji kompetitif' }, { benefit: 'BPJS Kesehatan & Ketenagakerjaan' }, { benefit: 'Working dari kantor/hybrid' }, { benefit: 'Peluang berkembang' }],
    isActive: true,
    isUrgent: true,
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Jakarta Selatan (Hybrid)',
    type: 'full-time',
    salary: 'Rp 4,000,000 – Rp 7,000,000',
    description: [{ children: [{ text: 'Kami mencari UI/UX Designer kreatif yang bisa menciptakan desain engaging untuk berbagai project klien.' }] }],
    requirements: [{ requirement: 'Pengalaman 2+ tahun sebagai UI/UX Designer' }, { requirement: 'Mahir menggunakan Figma' }, { requirement: 'Memahami design system' }, { requirement: 'Portofolio yang kuat' }],
    benefits: [{ benefit: 'Gaji kompetitif' }, { benefit: 'BPJS Kesehatan & Ketenagakerjaan' }, { benefit: 'Working dari kantor/hybrid' }, { benefit: 'Peluang berkembang' }],
    isActive: true,
    isUrgent: false,
  },
]

function lexicalText(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [{
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [{ mode: 'normal', text, type: 'text', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
      }],
      direction: 'ltr',
    },
  }
}

export const faqs = [
  { question: 'Apa itu Captiveau?', answer: lexicalText('Captiveau adalah Creative Tech Studio yang berfokus pada pengembangan website, landing page, e-commerce, dan UI/UX design untuk startup, korporasi, dan UMKM di Indonesia.'), category: 'general', order: 1 },
  { question: 'Berapa lama waktu pengerjaan project?', answer: lexicalText('Waktu pengerjaan bervariasi tergantung kompleksitas project. Landing page biasanya 1-2 minggu, company profile 2-3 minggu, dan e-commerce 4-8 minggu.'), category: 'proyek', order: 2 },
  { question: 'Apakah saya bisa request fitur custom?', answer: lexicalText('Tentu! Kami selalu mendengarkan kebutuhan spesifik klien. Setiap project bisa dikustomisasi sesuai requirements Anda.'), category: 'layanan', order: 3 },
  { question: 'Bagaimana metode pembayarannya?', answer: lexicalText('Kami menerima transfer bank (BCA, Mandiri, BRI) dan payment gateway. Pembayaran bisa dicicil 50:50 (50% DP, 50% setelah selesai).'), category: 'pembayaran', order: 4 },
  { question: 'Apakah domain dan hosting sudah termasuk?', answer: lexicalText('Domain dan hosting bisa diuruskan oleh kami atau Anda bisa menggunakan penyedia favorit Anda. Kami akan assist setup-nya.'), category: 'layanan', order: 5 },
  { question: 'Apakah saya bisa minta revisi?', answer: lexicalText('Ya, setiap paket sudah termasuk revisi. Jumlah revisi tergantung paket yang Anda pilih. Kami pastikan hasil akhir sesuai keinginan Anda.'), category: 'proyek', order: 6 },
  { question: 'Bagaimana dengan SEO?', answer: lexicalText('Semua website yang kami buat sudah dioptimasi untuk SEO dengan struktur semantic HTML, meta tags, JSON-LD schema, dan optimasi performa.'), category: 'layanan', order: 7 },
  { question: 'Apakah ada garansi?', answer: lexicalText('Kami memberikan garansi 30 hari setelah launching untuk bug fixing dan minor adjustment. Untuk maintenance lanjutan tersedia paket tersendiri.'), category: 'dukungan', order: 8 },
]

export const articles = [
  {
    title: 'Getting Started with Next.js 16',
    slug: 'getting-started-with-nextjs',
    description: 'Pelajari cara memulai project dengan Next.js 16, framework React terbaru untuk production-grade aplikasi web.',
    tags: [{ tag: 'Next.js' }, { tag: 'React' }, { tag: 'Web Development' }],
    author: 'Tim Captiveau',
    readingTime: 5,
    published: true,
    publishedDate: '2026-06-15T00:00:00.000Z',
    content: [
      { children: [{ text: 'Next.js 16 hadir dengan berbagai fitur baru yang membuat pengembangan web semakin powerful dan efisien. Dalam artikel ini, kita akan membahas cara memulai project dengan Next.js 16 dan fitur-fitur unggulannya.' }] },
    ],
  },
  {
    title: 'React Hooks: Panduan Lengkap',
    slug: 'react-hooks-guide',
    description: 'Panduan lengkap tentang React Hooks dari useState sampai custom hooks untuk pemula hingga expert.',
    tags: [{ tag: 'React' }, { tag: 'JavaScript' }, { tag: 'Frontend' }],
    author: 'Tim Captiveau',
    readingTime: 8,
    published: true,
    publishedDate: '2026-06-10T00:00:00.000Z',
    content: [
      { children: [{ text: 'React Hooks telah mengubah cara kita menulis komponen React. Dari useState yang sederhana hingga useReducer yang kompleks, hooks memberikan fleksibilitas dan reusability yang luar biasa.' }] },
    ],
  },
  {
    title: 'TypeScript untuk JavaScript Developers',
    slug: 'typescript-for-javascript-developers',
    description: 'Transition dari JavaScript ke TypeScript dengan mudah. Pelajari tipe, interface, dan best practices.',
    tags: [{ tag: 'TypeScript' }, { tag: 'JavaScript' }, { tag: 'Programming' }],
    author: 'Tim Captiveau',
    readingTime: 7,
    published: true,
    publishedDate: '2026-05-28T00:00:00.000Z',
    content: [
      { children: [{ text: 'TypeScript telah menjadi standar industri untuk pengembangan aplikasi web skala besar. Jika Anda sudah familiar dengan JavaScript, belajar TypeScript adalah langkah alami selanjutnya.' }] },
    ],
  },
]
