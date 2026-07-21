import type { Access } from 'payload'

type Role = 'admin' | 'editor'

/**
 * Check if user has a specific role
 */
export const hasRole = (user: unknown, role: Role): boolean => {
  if (!user) return false
  const u = user as { role?: string }
  return u?.role === role
}

/**
 * Check if user has admin role
 */
export const isAdmin = (user: unknown): boolean => hasRole(user, 'admin')

/**
 * Check if user has editor role or above
 */
export const isEditorOrAbove = (user: unknown): boolean => {
  if (!user) return false
  return hasRole(user, 'editor') || hasRole(user, 'admin')
}

// ===== ACCESS FUNCTIONS =====

/**
 * Public read — anyone can read
 */
export const publicRead: Access = () => true

/**
 * Admin only — full access
 */
export const adminOnly: Access = ({ req: { user } }) => {
  return isAdmin(user)
}

/**
 * Admin only for create/update/delete, public for read
 */
export const adminOnlyMutate: Access = ({ req: { user } }) => {
  if (!user) return false
  return isAdmin(user)
}

/**
 * Editor+ can create, update; admin only for delete
 */
export const editorOrAdmin: Access = ({ req: { user } }) => {
  return isEditorOrAbove(user)
}

/**
 * Editor+ for create, admin only for delete
 */
export const editorCreateAdminDelete = {
  read: publicRead,
  create: ({ req: { user } }: { req: { user: unknown } }) => isEditorOrAbove(user),
  update: ({ req: { user } }: { req: { user: unknown } }) => isEditorOrAbove(user),
  delete: ({ req: { user } }: { req: { user: unknown } }) => isAdmin(user),
}

/**
 * Admin only for everything including read
 */
export const adminFullAccess = {
  read: adminOnly,
  create: adminOnly,
  update: adminOnly,
  delete: adminOnly,
}
