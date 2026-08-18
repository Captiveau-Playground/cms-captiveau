import type { CollectionConfig } from 'payload'
import { editorCreateAdminDelete } from '../access'
import { generatePreviewPath } from '../lib/generatePreviewPath'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'published', 'createdAt'],
    preview: (data) =>
      generatePreviewPath({ collection: 'articles', slug: (data as { slug?: string })?.slug }),
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({ collection: 'articles', slug: (data as { slug?: string })?.slug }),
    },
  },
  access: editorCreateAdminDelete,
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      fields: [
        { name: 'tag', type: 'text' },
      ],
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
    },
    {
      name: 'readingTime',
      label: 'Reading Time (minutes)',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      label: 'Published Date',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
