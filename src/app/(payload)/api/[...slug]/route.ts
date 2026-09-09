/* Custom Payload API routes.
 * Catatan: file ini menggantikan template `[...slug]/route.ts` bawaan Payload.
 * Tujuan: memperbaiki upload file (multipart) di Cloudflare Worker — parser
 * busboy bawaan Payload gagal menerjemahkan field non-file saat ada file
 * (lihat kasus "The following field is invalid: Alt"). Di sini upload media
 * ditangani lewat `request.formData()` (parser Worker yang benar) + Local API,
 * sehingga admin (Paste/Upload media) berfungsi normal di worker.
 *
 * Jika file ini di-regenerate oleh Payload, sesuaikan kembali di sini.
 */
import { createPayloadRequest } from 'payload'
import config from '@payload-config'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

// ── Upload media (multipart) via Local API ───────────────────────────────
async function handleMediaUpload(req: Request) {
  // Ambil token: header Authorization (edukasi admin/API) atau cookie sesi admin.
  let token: string | null = null
  const authHeader = req.headers.get('authorization')
  if (authHeader?.toLowerCase().startsWith('jwt ') || authHeader?.toLowerCase().startsWith('bearer ')) {
    token = authHeader
  } else {
    const cookie = req.headers.get('cookie') || ''
    for (const part of cookie.split(';')) {
      const eq = part.indexOf('=')
      const key = part.slice(0, eq).trim()
      const value = part.slice(eq + 1).trim()
      if (key === 'captiveau-token' && value) {
        token = `JWT ${value}`
        break
      }
    }
  }
  if (!token) {
    return Response.json({ errors: [{ message: 'Unauthorized, you must be logged in to make this request.' }] }, { status: 401 })
  }

  // Bangun PayloadRequest dengan token via header JWT (jalur yang stabil di Worker),
  // sambil tetap meneruskan request asli untuk body-nya.
  const headers = new Headers(req.headers)
  headers.set('authorization', token)
  const authReq = new Request(req.url, {
    method: req.method,
    headers,
    body: req.body,
    duplex: 'half',
  } as RequestInit)
  const payloadReq = await createPayloadRequest({ config, request: authReq, canSetHeaders: false })
  const user = payloadReq.user
  if (!user) {
    return Response.json({ errors: [{ message: 'Unauthorized, you must be logged in to make this request.' }] }, { status: 401 })
  }
  const role = (user as { role?: string }).role
  if (role !== 'admin' && role !== 'editor') {
    return Response.json({ errors: [{ message: 'You are not allowed to perform this action.' }] }, { status: 403 })
  }
  const payload = payloadReq.payload

  const form = await req.formData()

  // Field non-file → data dokumen media (JSON string sesuai konvensi Payload)
  const data: Record<string, unknown> = {}
  form.forEach((value, key) => {
    if (key === 'file') return
    try {
      data[key] = JSON.parse(String(value))
    } catch {
      data[key] = String(value)
    }
  })
  const alt = String(data.alt || '')

  const filePart = form.get('file')
  if (!(filePart instanceof File)) {
    return Response.json({ errors: [{ message: 'No files were uploaded.' }] }, { status: 400 })
  }

  // Upload via admin sering mengirim multipart tanpa `alt` dulu (draft),
  // lalu metadata diisi setelahnya. Fallback dari nama file agar lolos required.
  const effectiveAlt = alt.trim() || filePart.name.replace(/\.[^.]+$/, '') || 'Upload'

  const file = {
    data: Buffer.from(await filePart.arrayBuffer()),
    name: filePart.name,
    mimetype: filePart.type || 'application/octet-stream',
    size: filePart.size,
  }

  const override = { req: payloadReq } as const

  try {
    // POST /api/media → create; PATCH /api/media/:id → update (replace file)
    const urlPath = new URL(req.url).pathname.split('/').filter(Boolean)
    const id = urlPath.length > 2 ? urlPath[2] : undefined
    const doc = id
      ? await payload.update({ collection: 'media', id, data: { alt: effectiveAlt }, file, ...override })
      : await payload.create({ collection: 'media', data: { alt: effectiveAlt }, file, ...override })
    return Response.json({ doc, message: 'Upload success.' }, { status: id ? 200 : 201 })
  } catch (e: any) {
    const message = e?.message || 'Something went wrong.'
    const status = e?.status || e?.statusCode || 500
    return Response.json({ errors: [{ message }] }, { status })
  }
}

// GET/DELETE/PUT/OPTIONS tetap memakai route bawaan Payload.
export const GET = REST_GET(config)
export const DELETE = REST_DELETE(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)

// POST & PATCH: khusus untuk upload media → handler kita; selain itu default.
export async function POST(req: Request, ctx: Parameters<typeof REST_POST>[0] extends never ? never : any) {
  const url = new URL(req.url)
  const isMedia = url.pathname === '/api/media' || /^\/api\/media\/[^/]+$/.test(url.pathname)
  const isMultipart = (req.headers.get('content-type') || '').includes('multipart/form-data')
  if (isMedia && isMultipart) {
    return handleMediaUpload(req)
  }
  return REST_POST(config)(req, ctx)
}

export async function PATCH(req: Request, ctx: any) {
  const url = new URL(req.url)
  const isMedia = /^\/api\/media\/[^/]+$/.test(url.pathname)
  const isMultipart = (req.headers.get('content-type') || '').includes('multipart/form-data')
  if (isMedia && isMultipart) {
    return handleMediaUpload(req)
  }
  return REST_PATCH(config)(req, ctx)
}