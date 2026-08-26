/**
 * Stub that replaces `drizzle-kit` inside the app/worker bundle.
 *
 * drizzle-kit is migration tooling used ONLY by the Payload CLI on Node via
 * `@payloadcms/drizzle`'s lazy `requireDrizzleKit`. It must never enter the
 * Next.js/OpenNext bundle: bundling it drags esbuild-register → esbuild
 * native platform binaries and dynamic `@libsql/${target}` requires, which
 * breaks Turbopack builds (Linux) and OpenNext's esbuild bundling. Aliasing
 * the request to this stub keeps every bundler self-contained. The real
 * package is still resolved normally when the Payload CLI runs outside Next.
 */
export function generateSQLiteDrizzleJson(): never {
  throw new Error(
    'drizzle-kit is not available in this bundle — run migrations via the Payload CLI (`payload migrate`).',
  )
}

export function generateSQLiteMigration(): never {
  throw new Error(
    'drizzle-kit is not available in this bundle — run migrations via the Payload CLI (`payload migrate`).',
  )
}

export function pushSQLiteSchema(): never {
  throw new Error(
    'drizzle-kit is not available in this bundle — push schema via the Payload CLI.',
  )
}