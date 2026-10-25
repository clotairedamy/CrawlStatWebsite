import { queryCollection } from '@nuxt/content/server'
import audits from '../../app/data/audits.json'

const SITE = 'https://crawlstat.com'

export default defineEventHandler(async (event) => {
  const [posts, docs] = await Promise.all([
    queryCollection(event, 'blog').select('path', 'date').all(),
    queryCollection(event, 'docs').select('path').all(),
  ])

  const urls: { loc: string; lastmod?: string }[] = [
    ...['/', '/features', '/pricing', '/download', '/contact', '/blog', '/docs', '/docs/audits', '/bot'].map((loc) => ({ loc })),
    ...posts.map((p) => ({ loc: p.path, lastmod: p.date })),
    ...docs.map((d) => ({ loc: d.path })),
    ...audits.map((a) => ({ loc: `/docs/audits/${a.slug}` })),
  ]

  const body = urls
    .map((u) => `  <url><loc>${SITE}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
})
