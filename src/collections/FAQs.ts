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
        { label: 'Layanan', value: 'layanan' },
        { label: 'Pembayaran', value: 'pembayaran' },
        { label: 'Proyek', value: 'proyek' },
        { label: 'Dukungan', value: 'dukungan' },
      ],
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
    },
  ],
}
