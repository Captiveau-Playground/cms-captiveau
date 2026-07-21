import type { Block } from 'payload'

export const RichContentBlock: Block = {
  slug: 'rich-content',
  labels: {
    singular: 'Rich Content',
    plural: 'Rich Content Blocks',
  },
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
    },
  ],
}
