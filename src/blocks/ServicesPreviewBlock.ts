import type { Block } from 'payload'

export const ServicesPreviewBlock: Block = {
  slug: 'services-preview',
  labels: {
    singular: 'Services Preview Section',
    plural: 'Services Preview Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Layanan Kami',
    },
    {
      name: 'description',
      label: 'Section Description',
      type: 'textarea',
    },
    {
      name: 'services',
      label: 'Featured Services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
  ],
}
