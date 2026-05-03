/**
 * Renders Lumina home-screen icons: soft glow orb on mist background.
 * Run: npm install -D sharp   (once, locally)   then   npm run icons
 *
 * Sharp is not a default dependency so Vercel/npm installs stay light and reliable.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

function iconSvg(size) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.36
  const hiR = size * 0.09
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="orb" cx="38%" cy="32%" r="72%">
      <stop offset="0%" stop-color="#fef9c3"/>
      <stop offset="35%" stop-color="#c4b5fd"/>
      <stop offset="70%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#312e81"/>
    </radialGradient>
    <radialGradient id="shine" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#f5f3ff"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#orb)"/>
  <ellipse cx="${cx - r * 0.35}" cy="${cy - r * 0.35}" rx="${hiR * 1.4}" ry="${hiR}" fill="url(#shine)"/>
</svg>`
}

async function main() {
  let sharp
  try {
    ;({ default: sharp } = await import('sharp'))
  } catch {
    console.error(
      'Missing dependency: sharp. Install locally to regenerate PNGs:\n  npm install -D sharp\n  npm run icons\n\nCommitted files in public/ are used as-is for deploys.',
    )
    process.exit(1)
  }

  async function writePng(size, filename) {
    const buf = await sharp(Buffer.from(iconSvg(size), 'utf8')).png().toBuffer()
    const out = join(publicDir, filename)
    writeFileSync(out, buf)
    console.log('wrote', out)
  }

  await writePng(192, 'pwa-192.png')
  await writePng(512, 'pwa-512.png')
  await writePng(180, 'apple-touch-icon.png')
  console.log('Done.')
}

await main()
