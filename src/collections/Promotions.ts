import type { CollectionConfig } from 'payload'
import { editorCreateAdminDelete } from '../access'

/**
 * Promo / landing-page offers (e.g. "Captiveau Teman Konsultan").
 * Each doc renders as a standalone landing page at /promo/[slug].
 */
export const Promotions: CollectionConfig = {
  slug: 'promotions',
  admin: {
    useAsTitle: 'headline',
    group: 'Content',
    defaultColumns: ['headline', 'slug', 'status', 'updatedAt'],
  },
  access: editorCreateAdminDelete,
  fields: [
    {
      name: 'headline',
      label: 'Judul Utama (Headline)',
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
        description: 'URL halaman: /promo/[slug] — mis. teman-konsultan',
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      defaultValue: 'Promo Terbatas',
      admin: { description: 'Label kecil di atas judul.' },
    },
    {
      name: 'badge',
      label: 'Badge',
      type: 'text',
      admin: { description: 'Contoh: Teman Konsultan' },
    },
    {
      name: 'subheadline',
      label: 'Subheadline',
      type: 'textarea',
      admin: { description: 'Kalimat pengantar di bawah judul.' },
    },
    {
      name: 'cta',
      label: 'Tombol Aksi (Hero)',
      type: 'group',
      fields: [
        {
          name: 'type',
          label: 'Tipe',
          type: 'select',
          options: [
            { label: 'Cal.com Booking', value: 'cal' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Halaman Contact', value: 'contact' },
          ],
          defaultValue: 'cal',
        },
        { name: 'label', label: 'Label Tombol', type: 'text', defaultValue: 'Klaim Promo' },
      ],
    },
    {
      name: 'offerTitle',
      label: 'Judul Offer',
      type: 'text',
    },
    {
      name: 'offerDescription',
      label: 'Deskripsi Offer',
      type: 'textarea',
      admin: { description: 'Isi utama penawaran — jelaskan apa yang didapat.' },
    },
    {
      name: 'benefits',
      label: 'Benefit',
      type: 'array',
      admin: { description: 'Poin keunggulan / apa saja yang termasuk.' },
      fields: [
        { name: 'title', label: 'Judul', type: 'text', required: true },
        { name: 'description', label: 'Deskripsi', type: 'textarea' },
      ],
    },
    {
      name: 'steps',
      label: 'Cara Kerja',
      type: 'array',
      fields: [
        { name: 'step', label: 'Nomor Langkah', type: 'number' },
        { name: 'title', label: 'Judul', type: 'text' },
        { name: 'description', label: 'Deskripsi', type: 'textarea' },
      ],
    },
    {
      name: 'finalCtaTitle',
      label: 'CTA Akhir — Judul',
      type: 'text',
    },
    {
      name: 'finalCtaSubtitle',
      label: 'CTA Akhir — Subjudul',
      type: 'textarea',
    },
    {
      name: 'finalCtaLabel',
      label: 'CTA Akhir — Label Tombol',
      type: 'text',
      defaultValue: 'Konsultasi Gratis',
    },
    // SEO
    {
      name: 'metaTitle',
      label: 'Meta Title (SEO)',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'metaDescription',
      label: 'Meta Description (SEO)',
      type: 'textarea',
      admin: { position: 'sidebar' },
    },
    {
      name: 'keywords',
      label: 'Keywords (SEO)',
      type: 'text',
      admin: { position: 'sidebar', description: 'Pisahkan dengan koma.' },
    },
    {
      name: 'ogImage',
      label: 'OG Image',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
  ],
}
