import type { GlobalConfig } from 'payload'
import { publicRead, adminOnly } from '../access'

export const MainMenu: GlobalConfig = {
  slug: 'main-menu',
  label: 'Main Menu',
  admin: {
    group: 'Settings',
  },
  access: {
    read: publicRead,
    update: adminOnly,
  },
  fields: [
    {
      name: 'items',
      label: 'Menu Items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          label: 'URL',
          type: 'text',
          required: true,
        },
        {
          name: 'order',
          label: 'Order',
          type: 'number',
        },
        {
          name: 'children',
          label: 'Dropdown Items',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
            { name: 'description', type: 'text', admin: { description: 'Short description shown in mega menu' } },
          ],
        },
      ],
    },
  ],
}
