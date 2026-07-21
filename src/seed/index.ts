import { getPayload } from 'payload'
import config from '@payload-config'

async function seed() {
  const payload = await getPayload({ config })

  // Check if admin user already exists
  const { docs: existingUsers } = await payload.find({
    collection: 'users',
    where: {
      email: { equals: 'admin@captiveau.id' },
    },
  })

  if (existingUsers.length > 0) {
    console.log('Admin user already exists.')
    return
  }

  // Create admin user (bypasses access control via Local API)
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

seed()
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
  .then(() => process.exit(0))
