import { withPayload } from '@payloadcms/next/withPayload'

// Cloudflare build uses payload.cloudflare.ts (D1 + R2); local dev uses
// payload.config.ts (PostgreSQL). `turbopack.resolveAlias` overrides the
// `@payload-config` tsconfig path so the right adapter is bundled.
const isCloudflareBuild = process.env.PAYLOAD_CONFIG_PATH === 'payload.cloudflare.ts'

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
          },
        },
      }
    : {}),
}

export default withPayload(nextConfig)

import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev())