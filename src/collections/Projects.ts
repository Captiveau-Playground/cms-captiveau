import type { CollectionConfig } from 'payload'
import { editorCreateAdminDelete } from '../access'
import { generatePreviewPath } from '../lib/generatePreviewPath'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'year', 'order'],
    preview: (data) =>
      generatePreviewPath({ collection: 'projects', slug: (data as { slug?: string })?.slug }),
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({ collection: 'projects', slug: (data as { slug?: string })?.slug }),
    },
  },
  access: editorCreateAdminDelete,
  fields: [
    {
      name: 'title',
      label: 'Project Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'category',
      label: 'Category',
      type: 'text',
      admin: {
        description: 'e.g., Company Profile, E-Commerce, Mobile App',
      },
    },
    {
      name: 'year',
      label: 'Year',
      type: 'text',
    },
    {
      name: 'services',
      label: 'Services Rendered',
      type: 'array',
      fields: [{ name: 'service', type: 'text' }],
    },
    {
      name: 'stack',
      label: 'Tech Stack',
      type: 'array',
      admin: {
        description: 'Teknologi yang dipakai — pilih dari daftar, ikon logo otomatis tampil.',
      },
      fields: [
        {
          name: 'tech',
          type: 'select',
          required: true,
          options: [
            { label: 'Next.js', value: 'Next.js' },
            { label: 'React', value: 'React' },
            { label: 'React Native', value: 'React Native' },
            { label: 'TypeScript', value: 'TypeScript' },
            { label: 'JavaScript', value: 'JavaScript' },
            { label: 'Tailwind CSS', value: 'Tailwind CSS' },
            { label: 'Node.js', value: 'Node.js' },
            { label: 'PostgreSQL', value: 'PostgreSQL' },
            { label: 'MySQL', value: 'MySQL' },
            { label: 'MongoDB', value: 'MongoDB' },
            { label: 'Prisma', value: 'Prisma' },
            { label: 'Drizzle', value: 'Drizzle' },
            { label: 'Payload CMS', value: 'Payload CMS' },
            { label: 'Medusa.js', value: 'Medusa.js' },
            { label: 'Stripe', value: 'Stripe' },
            { label: 'Midtrans', value: 'Midtrans' },
            { label: 'Xendit', value: 'Xendit' },
            { label: 'Firebase', value: 'Firebase' },
            { label: 'Supabase', value: 'Supabase' },
            { label: 'Vercel', value: 'Vercel' },
            { label: 'Cloudflare', value: 'Cloudflare' },
            { label: 'AWS', value: 'AWS' },
            { label: 'Docker', value: 'Docker' },
            { label: 'Figma', value: 'Figma' },
            { label: 'GSAP', value: 'GSAP' },
            { label: 'Framer Motion', value: 'Framer Motion' },
            { label: 'WordPress', value: 'WordPress' },
            { label: 'Laravel', value: 'Laravel' },
            { label: 'Go', value: 'Go' },
            { label: 'Python', value: 'Python' },
            { label: 'GraphQL', value: 'GraphQL' },
            { label: 'Recharts', value: 'Recharts' },
            { label: 'shadcn/ui', value: 'shadcn/ui' },
            { label: 'Vue.js', value: 'Vue.js' },
            { label: 'Svelte', value: 'Svelte' },
            { label: 'NestJS', value: 'NestJS' },
            { label: 'Express', value: 'Express' },
            { label: 'tRPC', value: 'tRPC' },
            { label: 'Zod', value: 'Zod' },
            { label: 'Redux', value: 'Redux' },
            { label: 'TanStack Query', value: 'TanStack Query' },
            { label: 'Three.js', value: 'Three.js' },
            { label: 'Chart.js', value: 'Chart.js' },
            { label: 'Redis', value: 'Redis' },
            { label: 'Hetzner', value: 'Hetzner' },
            { label: 'DigitalOcean', value: 'DigitalOcean' },
            { label: 'Vultr', value: 'Vultr' },
            { label: 'Nginx', value: 'Nginx' },
            { label: 'Apache', value: 'Apache' },
            { label: 'Git', value: 'Git' },
            { label: 'GitHub', value: 'GitHub' },
            { label: 'ESLint', value: 'ESLint' },
            { label: 'Prettier', value: 'Prettier' },
            { label: 'n8n', value: 'n8n' },
          ],
        },
      ],
    },
    {
      name: 'results',
      label: 'Key Results',
      type: 'array',
      fields: [
        { name: 'value', type: 'text' },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'integrations',
      label: 'Digital Integrations Included',
      type: 'array',
      admin: {
        description:
          'Paket integrasi analitik & verifikasi yang disertakan dalam proyek (GA4, GSC, Clarity, dll).',
      },
      fields: [
        {
          name: 'name',
          label: 'Integration',
          type: 'select',
          required: true,
          options: [
            { label: 'GA4 (Google Analytics 4)', value: 'ga4' },
            { label: 'Google Search Console', value: 'gsc' },
            { label: 'Microsoft Clarity', value: 'clarity' },
            { label: 'Google Tag Manager', value: 'gtm' },
            { label: 'Meta Pixel', value: 'meta-pixel' },
            { label: 'Hotjar', value: 'hotjar' },
            { label: 'SEO & Open Graph', value: 'seo' },
            { label: 'Schema.org Structured Data', value: 'schema' },
            { label: 'Performance Optimization', value: 'performance' },
            { label: 'Zapier', value: 'zapier' },
            { label: 'SEMrush', value: 'semrush' },
            { label: 'Intercom', value: 'intercom' },
            { label: 'Mailchimp', value: 'mailchimp' },
            { label: 'n8n', value: 'n8n' },
          ],
        },
      ],
    },
    {
      name: 'story',
      label: 'Project Story',
      type: 'array',
      admin: {
        description:
          'Bab cerita proyek — tampil sebagai scroll-reveal di halaman detail. Gunakan 3–5 bab untuk ritme terbaik.',
      },
      fields: [
        {
          name: 'heading',
          label: 'Chapter Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Chapter Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          label: 'Chapter Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'caseStudy',
      label: 'Case Study',
      type: 'group',
      admin: {
        description:
          'Narasi scrollytelling untuk halaman detail — client overview, bab cerita, dan testimoni. Kosongkan untuk memakai story otomatis.',
      },
      fields: [
        {
          name: 'client',
          label: 'Client Overview',
          type: 'group',
          fields: [
            { name: 'name', label: 'Client Name', type: 'text' },
            { name: 'industry', label: 'Industry', type: 'text' },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'photo', label: 'Client Photo / Logo', type: 'upload', relationTo: 'media' },
            { name: 'about', label: 'About the Client', type: 'textarea' },
            { name: 'needs', label: 'Client Needs', type: 'textarea' },
          ],
        },
        {
          name: 'objective',
          label: 'Objectives',
          type: 'group',
          fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'Image / Mockup', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'approach',
          label: 'Our Approach',
          type: 'group',
          fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'Image / Mockup', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'challenge',
          label: 'Challenges',
          type: 'group',
          fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'Image / Mockup', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'outcome',
          label: 'Outcome',
          type: 'group',
          fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'Image / Mockup', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'reflection',
          label: 'Reflection',
          type: 'group',
          fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'Image / Mockup', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'testimonials',
          label: 'Testimonials',
          type: 'array',
          fields: [
            { name: 'quote', label: 'Quote', type: 'textarea', required: true },
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'role', label: 'Position / Company', type: 'text' },
            { name: 'photo', label: 'Photo / Avatar', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'size',
      label: 'Card Size',
      type: 'select',
      options: [
        { label: 'Large', value: 'large' },
        { label: 'Small', value: 'small' },
      ],
      defaultValue: 'small',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      label: 'Featured on Home',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
