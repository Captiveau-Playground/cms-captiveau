import type { CollectionConfig } from 'payload'
import { editorCreateAdminDelete } from '../access'
import { toWebP } from '../lib/media-format'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
  access: editorCreateAdminDelete,
  upload: {
    staticDir: 'media',
    // Convert every uploaded image to WebP (original + each size).
    formatOptions: toWebP(),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: toWebP(),
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
        formatOptions: toWebP(),
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
        formatOptions: toWebP(),
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility and SEO',
      },
    },
  ],
}
