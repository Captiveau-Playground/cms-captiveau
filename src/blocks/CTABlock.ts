import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA Section',
    plural: 'CTA Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Mari Mulai Kolaborasi',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'cta',
      label: 'CTA Button',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Hubungi Kami' },
        { name: 'href', type: 'text', defaultValue: '#' },
      ],
    },
  ],
}
