import type { CollectionConfig } from 'payload'
import { editorCreateAdminDelete } from '../access'
import { generatePreviewPath } from '../lib/generatePreviewPath'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'year', 'order'],
    preview: (data) =>
      generatePreviewPath({ collection: 'projects', slug: (data as { slug?: string })?.slug }),
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({ collection: 'projects', slug: (data as { slug?: string })?.slug }),
    },
  },
  access: editorCreateAdminDelete,
  fields: [
    {
      name: 'title',
      label: 'Project Title',
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
      name: 'image',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'category',
      label: 'Category',
      type: 'text',
      admin: {
        description: 'e.g., Company Profile, E-Commerce, Mobile App',
      },
    },
    {
      name: 'year',
      label: 'Year',
      type: 'text',
    },
    {
      name: 'services',
      label: 'Services Rendered',
      type: 'array',
      fields: [{ name: 'service', type: 'text' }],
    },
    {
      name: 'stack',
      label: 'Tech Stack',
      type: 'array',
      fields: [{ name: 'tech', type: 'text' }],
    },
    {
      name: 'results',
      label: 'Key Results',
      type: 'array',
      fields: [
        { name: 'value', type: 'text' },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'story',
      label: 'Project Story',
      type: 'array',
      admin: {
        description:
          'Bab cerita proyek — tampil sebagai scroll-reveal di halaman detail. Gunakan 3–5 bab untuk ritme terbaik.',
      },
      fields: [
        {
          name: 'heading',
          label: 'Chapter Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Chapter Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          label: 'Chapter Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'size',
      label: 'Card Size',
      type: 'select',
      options: [
        { label: 'Large', value: 'large' },
        { label: 'Small', value: 'small' },
      ],
      defaultValue: 'small',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      label: 'Featured on Home',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
