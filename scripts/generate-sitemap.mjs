import { writeFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const SITE = 'https://jsondog.chatools.cn'

const staticRoutes = [
  '/',
  '/about',
  '/privacy',
  '/changelog',
  '/cheatsheet',
  '/examples',
  '/blog',
  '/format',
  '/minify',
  '/validate',
  '/tree',
  '/editor',
  '/diff',
  '/mock',
  '/flatten',
  '/transform',
  '/visualize',
  '/encode'
]

const blogSlugs = readdirSync(resolve(root, 'content/blog'))
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''))

const today = new Date().toISOString().slice(0, 10)

function url(loc, changefreq = 'weekly', priority = '0.7') {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

const lines = ['<?xml version="1.0" encoding="UTF-8"?>']
lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">')

for (const r of staticRoutes) {
  lines.push(url(`${SITE}${r}`, r === '/' ? 'daily' : 'weekly', r === '/' ? '1.0' : '0.8'))
}
for (const slug of blogSlugs) {
  lines.push(url(`${SITE}/blog/${slug}`, 'monthly', '0.6'))
}
for (const r of staticRoutes) {
  if (r === '/') {
    lines.push(url(`${SITE}/en`, 'daily', '0.9'))
  } else {
    lines.push(url(`${SITE}/en${r}`, 'weekly', '0.6'))
  }
}
lines.push(url(`${SITE}/en/blog`, 'weekly', '0.6'))

lines.push('</urlset>')

writeFileSync(resolve(root, 'public/sitemap.xml'), lines.join('\n'), 'utf8')
console.log(`sitemap.xml generated: ${staticRoutes.length + blogSlugs.length + staticRoutes.length + 1} urls`)