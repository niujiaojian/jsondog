import { cpSync, existsSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const nuxtClient = resolve(root, '.nuxt/dist/client')
const outPublic = resolve(root, '.output/public')
const publicDir = resolve(root, 'public')

if (!existsSync(outPublic)) {
  console.error('postbuild: .output/public not found, run nuxt build first')
  process.exit(1)
}

if (existsSync(resolve(nuxtClient, '_nuxt'))) {
  cpSync(resolve(nuxtClient, '_nuxt'), resolve(outPublic, '_nuxt'), { recursive: true })
  console.log('postbuild: copied _nuxt assets')
}

if (existsSync(publicDir)) {
  for (const f of readdirSync(publicDir)) {
    const src = resolve(publicDir, f)
    const dest = resolve(outPublic, f)
    copyFileSync(src, dest)
  }
  console.log('postbuild: copied public/ files')
}

console.log('postbuild: done')