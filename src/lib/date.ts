/**
 * Date formatting helpers (Indonesian locale).
 */

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

/** 2026-07-15 → 15 Juli 2026 */
export function formatDateLong(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

/** 2026-07-15 → "3 hari lalu" (relative elapsed time) */
export function formatRelativeTime(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  if (Number.isNaN(d.getTime())) return ''

  let diff = now.getTime() - d.getTime()
  if (diff < 0) diff = 0
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (minutes < 1) return 'baru saja'
  if (minutes < 60) return `${minutes} menit lalu`
  if (hours < 24) return `${hours} jam lalu`
  if (days < 7) return `${days} hari lalu`
  if (weeks < 5) return `${weeks} minggu lalu`
  if (months < 12) return `${months} bulan lalu`
  return `${years} tahun lalu`
}