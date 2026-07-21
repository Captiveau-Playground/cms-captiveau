import { getPayload } from 'payload'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const config = await buildConfig({
    admin: {
      user: 'users',
    },
    collections: [
      // minimal config just for user creation
      (await import(path.resolve(__dirname, '../src/collections/Users.ts'))).Users,
    ],
    editor: lexicalEditor(),
    secret: 'temp-secret-for-setup',
    db: postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI || 'postgres://captiveau:captiveau123@localhost:5432/captiveau',
      },
    }),
    typescript: {
      outputFile: path.resolve(__dirname, '../src/payload-types.ts'),
    },
  })

  const payload = await getPayload({ config })

  const { docs: existing } = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@captiveau.id' } },
  })

  if (existing.length > 0) {
    console.log('Admin user already exists.')
    return
  }

  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@captiveau.id',
      password: 'Admin123!',
      name: 'Admin Captiveau',
      role: 'admin',
    },
  })

  console.log('✅ Admin user created: admin@captiveau.id / Admin123!')
}

main().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
