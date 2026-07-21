import type { Block } from 'payload'

export const ArticlesPreviewBlock: Block = {
  slug: 'articles-preview',
  labels: {
    singular: 'Articles Preview Section',
    plural: 'Articles Preview Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Artikel Terbaru',
    },
    {
      name: 'description',
      label: 'Section Description',
      type: 'textarea',
    },
    {
      name: 'count',
      label: 'Number of Articles to Show',
      type: 'number',
      defaultValue: 3,
    },
  ],
}
