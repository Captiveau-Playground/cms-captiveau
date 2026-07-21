import 'payload'

export default async function () {
  const { getPayload } = await import('payload')
  const config = await import('@payload-config').then(m => m.default)
  const payload = await getPayload({ config })

  const { docs: existing } = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@captiveau.id' } },
  })

  if (existing.length > 0) {
    console.log('✅ Admin user already exists.')
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
