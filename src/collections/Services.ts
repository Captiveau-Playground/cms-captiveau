import type { CollectionConfig } from 'payload'
import { editorCreateAdminDelete } from '../access'
import { generatePreviewPath } from '../lib/generatePreviewPath'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (data) =>
      generatePreviewPath({ collection: 'services', slug: (data as { slug?: string })?.slug }),
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({ collection: 'services', slug: (data as { slug?: string })?.slug }),
    },
  },
  access: editorCreateAdminDelete,
  fields: [
    {
      name: 'title',
      label: 'Service Name',
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
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'icon',
      label: 'Icon (Lucide icon name)',
      type: 'text',
      admin: {
        description: 'e.g., layout, shopping-cart, palette, building2',
      },
    },
    {
      name: 'image',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'introduction',
      label: 'Introduction',
      type: 'richText',
    },
    {
      name: 'keyBenefits',
      label: 'Key Benefits',
      type: 'array',
      fields: [
        {
          name: 'icon',
          label: 'Icon (Lucide)',
          type: 'text',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'process',
      label: 'Process Steps',
      type: 'array',
      fields: [
        {
          name: 'step',
          label: 'Step Number',
          type: 'number',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          name: 'icon',
          label: 'Icon (Lucide)',
          type: 'text',
        },
      ],
    },
    {
      name: 'usp',
      label: 'Unique Selling Points',
      type: 'array',
      fields: [
        {
          name: 'icon',
          label: 'Icon (Lucide)',
          type: 'text',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'pricingPlans',
      label: 'Pricing Plans',
      type: 'group',
      fields: [
        {
          name: 'basic',
          label: 'Basic Plan',
          type: 'group',
          fields: [
            { name: 'name', type: 'text', defaultValue: 'Basic' },
            { name: 'price', type: 'text', admin: { description: 'e.g., Rp 3,499,000' } },
            { name: 'description', type: 'textarea' },
            { name: 'features', type: 'array', fields: [{ name: 'feature', type: 'text' }] },
            { name: 'ctaText', type: 'text', defaultValue: 'Pilih Basic' },
          ],
        },
        {
          name: 'bestDeal',
          label: 'Best Deal Plan',
          type: 'group',
          fields: [
            { name: 'name', type: 'text', defaultValue: 'Professional' },
            { name: 'price', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'features', type: 'array', fields: [{ name: 'feature', type: 'text' }] },
            { name: 'ctaText', type: 'text', defaultValue: 'Pilih Professional' },
          ],
        },
        {
          name: 'enterprise',
          label: 'Enterprise Plan',
          type: 'group',
          fields: [
            { name: 'name', type: 'text', defaultValue: 'Enterprise' },
            { name: 'price', type: 'text', admin: { description: 'e.g., Rp 9,999,000' } },
            { name: 'description', type: 'textarea' },
            { name: 'features', type: 'array', fields: [{ name: 'feature', type: 'text' }] },
            { name: 'ctaText', type: 'text', defaultValue: 'Hubungi Kami' },
          ],
        },
      ],
    },
    {
      name: 'technologies',
      label: 'Technologies',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
      ],
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
