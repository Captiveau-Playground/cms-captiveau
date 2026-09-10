/* Custom Payload API routes.
 * Catatan: file ini menggantikan template `[...slug]/route.ts` bawaan Payload.
 *
 * Kenapa ada handler custom?
 * Payload mem-parsing multipart dengan `busboy` (lihat
 * payload/dist/uploads/fetchAPI-multipart/processMultipart.js). Busboy tidak
 * jalan di runtime Cloudflare Worker, sehingga upload media via REST bawaan
 * gagal ("The following field is invalid: Alt"). Di sini multipart di-parsing
 * memakai `request.formData()` (parser native Worker) lalu diteruskan ke Local
 * API Payload.
 *
 * Kontrak FormData dari admin Payload:
 *   - `_payload` : JSON string berisi SEMUA field non-file (alt, focalX, …)
 *   - `file`     : File (atau string JSON untuk client upload)
 * Handler harus membaca `_payload`; kalau tidak, `alt` dsb. hilang dan update
 * metadata (PATCH tanpa file) ikut rusak.
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

// Worker punya limit memori/CPU: mem-parsing + memproses request multipart
// yang terlalu besar memicu error 1102 (bertahap mulai ~40MB). Tolak lebih awal
// dengan pesan yang jelas daripada membiarkan Cloudflare mengembalikan 503.
const MAX_UPLOAD_BYTES = 40 * 1024 * 1024

function getAuthToken(req: Request): string | null {
  const authHeader = req.headers.get('authorization')
  if (
    authHeader?.toLowerCase().startsWith('jwt ') ||
    authHeader?.toLowerCase().startsWith('bearer ')
  ) {
    return authHeader
  }

  const cookie = req.headers.get('cookie') || ''
  for (const part of cookie.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    const key = part.slice(0, eq).trim()
    const value = part.slice(eq + 1).trim()
    if (key === 'captiveau-token' && value) return `JWT ${value}`
  }

  return null
}

/** Gabungkan `_payload` (JSON) + field top-level lain menjadi data dokumen. */
function extractData(form: FormData): Record<string, unknown> {
  const data: Record<string, unknown> = {}

  const payloadField = form.get('_payload')
  if (typeof payloadField === 'string' && payloadField.trim()) {
    try {
      Object.assign(data, JSON.parse(payloadField))
    } catch {
      // Abaikan _payload yang tidak valid — field top-level tetap diproses.
    }
  }

  form.forEach((value, key) => {
    if (key === 'file' || key === '_payload') return
    if (typeof value === 'string') {
      try {
        data[key] = JSON.parse(value)
      } catch {
        data[key] = value
      }
    }
  })

  return data
}

// ── Upload media (multipart) via Local API ───────────────────────────────
async function handleMediaUpload(req: Request) {
  // 1) Parse multipart SEKALI dari request asli. Jangan mengoper `req.body` ke
  //    Request lain — di runtime Worker stream body jadi terpakai dan
  //    `formData()` berikutnya gagal ("Body is unusable").
  let form: FormData
  try {
    form = await req.formData()
  } catch (err) {
    console.error('[media-upload] gagal parse multipart body', err)
    return Response.json(
      { errors: [{ message: 'Berkas tidak bisa dibaca. Coba unggah ulang.' }] },
      { status: 400 },
    )
  }

  const data = extractData(form)

  // 2) Bangun PayloadRequest hanya dari headers (auth), tanpa body.
  const token = getAuthToken(req)
  if (!token) {
    return Response.json(
      { errors: [{ message: 'Unauthorized, you must be logged in to make this request.' }] },
      { status: 401 },
    )
  }
  const headers = new Headers(req.headers)
  headers.set('authorization', token)
  const payloadReq = await createPayloadRequest({
    config,
    request: new Request(req.url, { method: req.method, headers }),
    canSetHeaders: false,
  })

  const user = payloadReq.user
  if (!user) {
    return Response.json(
      { errors: [{ message: 'Unauthorized, you must be logged in to make this request.' }] },
      { status: 401 },
    )
  }
  const role = (user as { role?: string }).role
  if (role !== 'admin' && role !== 'editor') {
    return Response.json(
      { errors: [{ message: 'You are not allowed to perform this action.' }] },
      { status: 403 },
    )
  }
  const payload = payloadReq.payload

  // 3) Ambil file (opsional untuk PATCH; wajib untuk create).
  const filePart = form.get('file')
  const file =
    filePart instanceof File
      ? {
          data: Buffer.from(await filePart.arrayBuffer()),
          name: filePart.name,
          mimetype: filePart.type || 'application/octet-stream',
          size: filePart.size,
        }
      : undefined

  const urlPath = new URL(req.url).pathname.split('/').filter(Boolean)
  const id = urlPath.length > 2 ? urlPath[2] : undefined

  if (file && file.size > MAX_UPLOAD_BYTES) {
    return Response.json(
      {
        errors: [
          {
            message: `Ukuran berkas melebihi batas ${Math.round(
              MAX_UPLOAD_BYTES / (1024 * 1024),
            )} MB. Kompres dulu atau unggah lewat R2.`,
          },
        ],
      },
      { status: 413 },
    )
  }

  // Saat membuat media, `alt` wajib. Admin mengisi alt, tapi kalau kosong
  // (upload cepat) pakai nama file supaya validasi lolos.
  if (!id && file) {
    const alt = typeof data.alt === 'string' ? data.alt.trim() : ''
    if (!alt) data.alt = file.name.replace(/\.[^.]+$/, '') || 'Upload'
  }

  try {
    // POST /api/media → create; PATCH /api/media/:id → update (dengan atau
    // tanpa file pengganti). `uploadEdits` (crop/focal) sudah ada di query
    // string yang ikut diteruskan lewat `req`.
    // `as any`: Payload mengetik create/update sebagai discriminated union
    // (draft vs non-draft) yang tidak bisa di-resolve di sini.
    const doc = id
      ? await payload.update({ collection: 'media', id, data, file, req: payloadReq } as any)
      : await payload.create({ collection: 'media', data, file, req: payloadReq } as any)
    return Response.json({ doc, message: 'Upload success.' }, { status: id ? 200 : 201 })
  } catch (e: any) {
    console.error('[media-upload] payload error', e)
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

// POST & PATCH: multipart media → handler kita; selain itu default Payload.
export async function POST(req: Request, ctx: any) {
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
