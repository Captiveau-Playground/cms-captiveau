import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

// Cloudflare build uses payload.cloudflare.ts (D1 + R2); local dev uses
// payload.config.ts (PostgreSQL). `turbopack.resolveAlias` overrides the
// `@payload-config` tsconfig path so the right adapter is bundled.
const isCloudflareBuild = process.env.PAYLOAD_CONFIG_PATH === 'payload.cloudflare.ts'

// drizzle-kit is migration-only tooling (Payload CLI). It must never be
// bundled into the app: bundlers trace the D1 adapter's lazy
// `require('drizzle-kit/api')` into esbuild native binaries and dynamic
// `@libsql/${target}` requires. Alias it to a stub for both bundlers so the
// bundle stays self-contained (the real package is only needed on Node).
const drizzleKitStub = path.join(process.cwd(), 'src/lib/drizzle-kit-stub.ts')

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig = {
  output: 'standalone',
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  images: {
    // Media is served directly by Payload from R2 (which pre-generates its
    // own thumbnail/card/hero size variants), so skip the Next.js optimizer.
    // The optimizer's internal fetch of `/api/media/file/*` is blocked on
    // Cloudflare Workers by `global_fetch_strictly_public`. Keep remotePatterns
    // so external hosts remain allowed when unoptimized images are referenced.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  ...(isCloudflareBuild
    ? {
        turbopack: {
          resolveAlias: {
            '@payload-config': './payload.cloudflare.ts',
            'drizzle-kit': drizzleKitStub,
            'drizzle-kit/api': drizzleKitStub,
          },
        },
      }
    : {}),
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'drizzle-kit': drizzleKitStub,
      'drizzle-kit/api': drizzleKitStub,
    }
    return config
  },
}

export default withPayload(nextConfig)

import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev())
