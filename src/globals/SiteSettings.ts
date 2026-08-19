import type { GlobalConfig } from 'payload'
import { publicRead, adminOnly } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: publicRead,
    update: adminOnly,
  },
  fields: [
    // ... fields tetap sama
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: true,
      defaultValue: 'Captiveau',
    },
    {
      name: 'tagline',
      label: 'Tagline',
      type: 'text',
      defaultValue: 'Transform Your Ideas Into Digital Reality',
    },
    {
      name: 'description',
      label: 'Site Description',
      type: 'textarea',
      defaultValue: 'Captiveau — Creative Tech Studio. Transform Your Ideas Into Digital Reality.',
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'GitHub', value: 'github' },
            { label: 'Behance', value: 'behance' },
          ],
        },
        { name: 'url', label: 'URL', type: 'text' },
      ],
    },
    {
      name: 'contacts',
      label: 'Contact Information',
      type: 'array',
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          options: [
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        { name: 'value', label: 'Value', type: 'text' },
      ],
    },
    {
      name: 'address',
      label: 'Address',
      type: 'group',
      fields: [
        { name: 'street', label: 'Street', type: 'text', defaultValue: 'Jl. Kuningan Barat No. 8' },
        { name: 'city', label: 'City', type: 'text', defaultValue: 'Jakarta Selatan' },
        { name: 'region', label: 'Region', type: 'text', defaultValue: 'DKI Jakarta' },
        { name: 'postalCode', label: 'Postal Code', type: 'text', defaultValue: '12710' },
        { name: 'country', label: 'Country', type: 'text', defaultValue: 'Indonesia' },
      ],
    },
    {
      name: 'foundingDate',
      label: 'Founding Date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'founders',
      label: 'Founders',
      type: 'array',
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'title', label: 'Title', type: 'text' },
      ],
    },
    {
      name: 'banner',
      label: 'Announcement Banner',
      type: 'group',
      admin: {
        description: 'Banner promo yang muncul di atas halaman.',
      },
      fields: [
        { name: 'enabled', label: 'Show Banner', type: 'checkbox', defaultValue: false },
        { name: 'text', label: 'Banner Text', type: 'text', admin: { description: 'e.g., Promo akhir tahun 2025 — diskon 20%' } },
        { name: 'linkLabel', label: 'Link Label', type: 'text' },
        { name: 'linkHref', label: 'Link URL', type: 'text', admin: { description: 'e.g., /contact atau URL eksternal' } },
      ],
    },
    {
      name: 'analytics',
      label: 'Analytics & Integrations',
      type: 'group',
      fields: [
        { name: 'ga4Id', label: 'GA4 Measurement ID', type: 'text', admin: { description: 'e.g., G-XXXXXXXXXX' } },
        { name: 'gtmId', label: 'GTM Container ID', type: 'text', admin: { description: 'e.g., GTM-XXXXXXXX' } },
        { name: 'clarityId', label: 'Microsoft Clarity Project ID', type: 'text', admin: { description: 'e.g., xxxxxxxx' } },
        { name: 'gscVerification', label: 'Google Search Console Verification', type: 'text', admin: { description: 'Isi kode di dalam content="..." dari meta tag verifikasi GSC' } },
      ],
    },
    {
      name: 'footer',
      label: 'Footer Settings',
      type: 'group',
      fields: [
        {
          name: 'quote',
          label: 'Footer Quote',
          type: 'textarea',
          defaultValue:
            'We build the kind of digital products we wish more software shipped — calm, opinionated, ready for the real world.',
        },
        { name: 'statusLabel', label: 'Status Text', type: 'text', defaultValue: 'Now accepting new projects' },
      ],
    },
    {
      name: 'cal',
      label: 'Cal.com Booking',
      type: 'group',
      admin: {
        description:
          'Tombol konsultasi membuka jadwal Cal.com. Matikan untuk fallback ke halaman contact.',
      },
      fields: [
        { name: 'enabled', label: 'Aktifkan Cal.com', type: 'checkbox', defaultValue: true },
        {
          name: 'link',
          label: 'Cal.com Link',
          type: 'text',
          defaultValue: 'captiveau/konsultasi-pengembangan-web',
          admin: { description: 'Contoh: captiveau/konsultasi-pengembangan-web' },
        },
        { name: 'namespace', label: 'Namespace', type: 'text', defaultValue: 'konsultasi-pengembangan-web' },
      ],
    },
    {
      name: 'contactOptions',
      label: 'Contact Options',
      type: 'group',
      admin: { description: 'Opsi pengiriman form contact.' },
      fields: [
        { name: 'deliveryEmail', label: 'Kirim via Email (mailto)', type: 'checkbox', defaultValue: true },
        { name: 'deliveryWhatsapp', label: 'Kirim via WhatsApp', type: 'checkbox', defaultValue: true },
        {
          name: 'whatsappNumber',
          label: 'Nomor WhatsApp (untuk form)',
          type: 'text',
          admin: { description: 'Format internasional, contoh: 6281234567890' },
        },
      ],
    },
  ],
}
