import type { GlobalConfig } from 'payload'
import { publicRead, adminOnly } from '../access'

/**
 * Per-page Call-to-Action sections — editors manage the title, subtitle, and
 * buttons for every page's CTA from one place. Each custom frontend page
 * looks up its CTA by `pageKey` (see `getCmsPageCta` in lib/cms-data).
 */
export const PageCTAs: GlobalConfig = {
  slug: 'page-ctas',
  label: 'Page CTAs',
  admin: {
    group: 'Content',
    description:
      'Kelola CTA (Call to Action) di tiap halaman secara dinamis. Pilih halaman lalu atur judul, subtitle, dan tombol.',
  },
  access: {
    read: publicRead,
    update: adminOnly,
  },
  fields: [
    {
      name: 'items',
      label: 'Page CTAs',
      type: 'array',
      labels: { singular: 'Page CTA', plural: 'Page CTAs' },
      fields: [
        {
          name: 'pageKey',
          label: 'Page',
          type: 'select',
          required: true,
          admin: {
            description:
              'Pilih halaman yang CTA-nya ingin diatur. Tiap halaman hanya boleh muncul sekali.',
          },
          options: [
            { label: 'Home', value: 'home' },
            { label: 'About', value: 'about' },
            { label: 'Services', value: 'services' },
            { label: 'Service Detail', value: 'serviceDetail' },
            { label: 'Portfolio', value: 'portfolio' },
            { label: 'Project Detail', value: 'projectDetail' },
            { label: 'Blog Post', value: 'blogPost' },
            { label: 'FAQ', value: 'faq' },
            { label: 'Contact', value: 'contact' },
          ],
        },
        {
          name: 'enabled',
          label: 'Show CTA',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Matikan untuk menyembunyikan section CTA di halaman ini.',
          },
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'textarea',
        },
        {
          name: 'primaryCta',
          label: 'Primary Button',
          type: 'group',
          fields: [
            { name: 'label', label: 'Label', type: 'text', required: true },
            {
              name: 'href',
              label: 'URL',
              type: 'text',
              defaultValue: '/contact',
              admin: { description: 'e.g., /contact atau URL eksternal.' },
            },
            {
              name: 'useCal',
              label: 'Use Cal.com booking',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description:
                  'Buka widget booking Cal.com alih-alih mengikuti URL di atas. aktifkan Cal.com di Site Settings.',
              },
            },
          ],
        },
        {
          name: 'secondaryCta',
          label: 'Secondary Button (optional)',
          type: 'group',
          fields: [
            { name: 'label', label: 'Label', type: 'text' },
            { name: 'href', label: 'URL', type: 'text', defaultValue: '/portfolio' },
          ],
        },
      ],
    },
  ],
}
