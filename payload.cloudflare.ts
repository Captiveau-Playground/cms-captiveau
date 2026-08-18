import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  LinkFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { getCloudflareContext, type CloudflareContext } from '@opennextjs/cloudflare'
import { r2Storage } from '@payloadcms/storage-r2'
import type { GetPlatformProxyOptions } from 'wrangler'

import { SiteSettings } from './src/globals/SiteSettings'
import { MainMenu } from './src/globals/MainMenu'
import { Homepage } from './src/globals/Homepage'
import { Services } from './src/collections/Services'
import { Articles } from './src/collections/Articles'
import { Testimonials } from './src/collections/Testimonials'
import { TeamMembers } from './src/collections/TeamMembers'
import { JobListings } from './src/collections/JobListings'
import { FAQs } from './src/collections/FAQs'
import { Pages } from './src/collections/Pages'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'
import { Redirects } from './src/collections/Redirects'
import { Projects } from './src/collections/Projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) =>
  fs.existsSync(value) ? fs.realpathSync(value) : undefined

const isCLI =
  process.env.PAYLOAD_SEED === 'true' ||
  process.argv.some((value) => realpath(value)?.endsWith(path.join('payload', 'bin.js')))
const isProduction = process.env.NODE_ENV === 'production'

function getPlatformProxyOptions(): GetPlatformProxyOptions {
  return {
    environment: process.env.CLOUDFLARE_ENV,
    remoteBindings: isProduction,
  } satisfies GetPlatformProxyOptions
}

// Loads real bindings via wrangler's platform proxy for CLI/build time.
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) => getPlatformProxy(getPlatformProxyOptions()),
  )
}

/**
 * SMTP email adapter — enabled only when SMTP_HOST is set.
 * Inside the Cloudflare Worker there is no raw SMTP connectivity, so every
 * email still falls back to the console transporter. For real sends on CF
 * production, set SMTP_* (self-hosted) or swap this for a CF-friendly
 * adapter (e.g. @payloadcms/email-resend) with a provider key.
 */
async function getEmailAdapter() {
  if (!process.env.SMTP_HOST) return undefined
  const { nodemailerAdapter } = await import('@payloadcms/email-nodemailer')
  return nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM_EMAIL || 'no-reply@captiveau.id',
    defaultFromName: process.env.SMTP_FROM_NAME || 'Captiveau CMS',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    },
  })
}

async function getConfig() {
  const cloudflare = isCLI
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cfEnv = cloudflare.env as Record<string, any>

  return buildConfig({
    admin: {
      user: 'users',
      dateFormat: 'dd/MM/yyyy HH:mm',
      meta: {
        titleSuffix: ' | Captiveau CMS',
      },
      importMap: {
        baseDir: path.resolve(dirname),
      },
    },
    collections: [
      Users,
      Services,
      Articles,
      Testimonials,
      TeamMembers,
      JobListings,
      FAQs,
      Pages,
      Media,
      Redirects,
      Projects,
    ],
    globals: [SiteSettings, MainMenu, Homepage],
    // Full-featured rich text: headings, internal/external links, embedded
    // media, tables, horizontal rules + fixed/inline toolbars on top of the
    // default inline formatting, lists and alignment.
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => [
        ...defaultFeatures,
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        LinkFeature({
          enabledCollections: ['pages', 'services', 'articles', 'projects'],
        }),
        UploadFeature({
          collections: {
            media: {
              fields: [
                {
                  name: 'caption',
                  type: 'text',
                  label: 'Caption',
                  admin: {
                    description: 'Optional caption shown under the image.',
                  },
                },
              ],
            },
          },
        }),
        EXPERIMENTAL_TableFeature(),
        HorizontalRuleFeature(),
      ],
    }),
    email: await getEmailAdapter(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
      outputFile: path.resolve(dirname, 'src/payload-types.ts'),
    },
    // Hardened defaults for production
    cookiePrefix: 'captiveau',
    maxDepth: 5,
    db: sqliteD1Adapter({ binding: cfEnv.D1, push: !isProduction }),
    plugins: [
      r2Storage({
        bucket: cfEnv.R2,
        collections: {
          media: true,
        },
      }),
    ],
  })
}

export default getConfig()