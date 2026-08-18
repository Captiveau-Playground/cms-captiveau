import type { CollectionConfig } from 'payload'
import { adminFullAccess, publicRead } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 60 * 60 * 12, // 12 hours
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes
  },
  admin: {
    useAsTitle: 'email',
    group: 'Settings',
  },
  access: {
    // Admin only — editor cannot manage users
    read: ({ req: { user } }) => {
      const u = user as { role?: string } | null;
      return u?.role === 'admin';
    },
    create: ({ req: { user } }) => {
      const u = user as { role?: string } | null;
      return u?.role === 'admin';
    },
    update: ({ req: { user } }) => {
      const u = user as { role?: string } | null;
      return u?.role === 'admin';
    },
    delete: ({ req: { user } }) => {
      const u = user as { role?: string } | null;
      return u?.role === 'admin';
    },
    admin: ({ req: { user } }) => {
      const u = user as { role?: string } | null
      return u?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      saveToJWT: true,
    },
  ],
}
