import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact',
  labels: {
    singular: 'Contact Section',
    plural: 'Contact Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Hubungi Kami',
    },
    {
      name: 'description',
      label: 'Section Description',
      type: 'textarea',
    },
    {
      name: 'calendlyUrl',
      label: 'Calendly / Cal.com URL',
      type: 'text',
      admin: {
        description: 'Link untuk booking konsultasi',
      },
    },
  ],
}
