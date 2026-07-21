import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Pertanyaan Umum',
    },
    {
      name: 'description',
      label: 'Section Description',
      type: 'textarea',
    },
    {
      name: 'faqs',
      label: 'Featured FAQs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
    },
  ],
}
