import { queryCollection } from '@nuxt/content/server'

const SITE = 'https://crawlstat.com'

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .select('title', 'path', 'description', 'date')
    .order('date', 'DESC')
    .all()

  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}${p.path}</link>
      <guid>${SITE}${p.path}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`,
    )
    .join('\n')

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CrawlStat blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Engineering notes, SEO guides and product news from the team building CrawlStat.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`
})
