import type { CollectionConfig } from 'payload'
import { adminOnlyMutate, publicRead } from '../access'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    group: 'Settings',
    defaultColumns: ['from', 'to', 'statusCode'],
  },
  access: {
    read: publicRead,
    create: adminOnlyMutate,
    update: adminOnlyMutate,
    delete: adminOnlyMutate,
  },
  fields: [
    {
      name: 'from',
      label: 'From URL',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., /old-page',
      },
    },
    {
      name: 'to',
      label: 'To URL',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., /new-page',
      },
    },
    {
      name: 'statusCode',
      label: 'Status Code',
      type: 'select',
      options: [
        { label: '301 (Moved Permanently)', value: '301' },
        { label: '302 (Found / Temporary)', value: '302' },
      ],
      defaultValue: '301',
    },
  ],
}
