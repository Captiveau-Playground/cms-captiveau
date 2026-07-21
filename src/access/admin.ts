import type { Access } from 'payload'

export const adminOnly: Access = ({ req: { user } }) => {
  // Return true if user is logged in (any admin user)
  return !!user
}

export const adminOrPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    _status: {
      equals: 'published',
    },
  }
}
