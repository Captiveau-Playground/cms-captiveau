import type { CollectionConfig } from 'payload'
import { editorCreateAdminDelete } from '../access'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    group: 'Content',
    defaultColumns: ['question', 'category', 'order'],
  },
  access: editorCreateAdminDelete,
  fields: [
    {
      name: 'question',
      label: 'Question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      label: 'Answer',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Technical', value: 'technical' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Support', value: 'support' },
      ],
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
    },
  ],
}
