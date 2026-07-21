import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { SiteSettings } from './src/globals/SiteSettings'
import { MainMenu } from './src/globals/MainMenu'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' | Captiveau CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
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
  ],
  globals: [
    SiteSettings,
    MainMenu,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})
