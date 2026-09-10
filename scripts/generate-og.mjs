/**
 * Render social share (OG) image 1200×630 dari scripts/og-template.html ke
 * public/og-default.jpg memakai Chromium via Playwright.
 *
 * Run: node scripts/generate-og.mjs
 * (membutuhkan playwright + Chromium; gunakan executablePath bila ada).
 */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const html = readFileSync(path.join(here, 'og-template.html'), 'utf8')
const out = path.join(here, '..', 'public', 'og-default.jpg')

const execPath = process.env.CHROME_PATH || undefined
const browser = await chromium.launch({ headless: true, executablePath: execPath })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: out, type: 'jpeg', quality: 82 })
await browser.close()
console.log('written:', out)