import type { ImageUploadFormatOptions } from 'payload'

/**
 * Media-format adapter — forces every uploaded raster image to be stored as
 * WebP (original + each image size). Backed by Payload's sharp integration in
 * `generateFileData`, so files are converted server-side at upload time.
 *
 * The stored `filename`/`mimeType` are updated automatically (e.g. `a.png`
 * becomes `a.webp`), and the sharp output is uploaded to whatever storage
 * adapter is configured (local disk, R2, S3, …) — no extra plugin needed.
 *
 * Usage:
 *   upload: {
 *     formatOptions: toWebP(),          // converts the original
 *     imageSizes: [{ name, width, height, position, formatOptions: toWebP() }], // each size too
 *   }
 *
 * Non-raster uploads (video, pdf, svg without adjustments, animated gif) are
 * left untouched — Payload only runs format conversion when sharp can resize.
 */
export function toWebP(quality = 82): ImageUploadFormatOptions {
  return {
    format: 'webp',
    options: { quality },
  }
}
