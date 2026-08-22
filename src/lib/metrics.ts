/**
 * Parses metric strings like "+120%", "98", "<1s", "4.8", "1,200+" into
 * CountUp-friendly parts while preserving the original text as fallback.
 */
export function parseMetric(raw: string) {
  const m = raw.trim().match(/^([+\-<>≈]?)\s*([\d.,]+)\s*(.*)$/)
  if (!m) return { text: raw, prefix: '', value: null as number | null, suffix: '', decimals: 0 }
  const numStr = m[2]
  const decimals = numStr.includes('.') ? Math.min(2, numStr.split('.')[1].length) : 0
  const value = parseFloat(numStr.replace(/,/g, ''))
  if (Number.isNaN(value)) return { text: raw, prefix: '', value: null, suffix: '', decimals: 0 }
  return { text: raw, prefix: m[1] || '', value, suffix: m[3] || '', decimals }
}