import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'richText',
    },
    {
      name: 'primaryCta',
      label: 'Primary CTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Mulai Konsultasi' },
        { name: 'href', type: 'text', defaultValue: '#' },
      ],
    },
    {
      name: 'secondaryCta',
      label: 'Secondary CTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Lihat Portofolio' },
        { name: 'href', type: 'text', defaultValue: '/portfolios' },
      ],
    },
    {
      name: 'stats',
      label: 'Statistics',
      type: 'array',
      fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'suffix', type: 'text', defaultValue: '+' },
      ],
    },
    {
      name: 'backgroundStyle',
      label: 'Background Style',
      type: 'select',
      options: [
        { label: 'Gradient', value: 'gradient' },
        { label: 'Solid', value: 'solid' },
        { label: 'Image', value: 'image' },
      ],
      defaultValue: 'gradient',
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundStyle === 'image',
      },
    },
  ],
}
