import { queryCollection } from '@nuxt/content/server'
import audits from '../../app/data/audits.json'

// /llms.txt (https://llmstxt.org): the site as a Markdown index for language
// models. Built from the same collections as the sitemap, so a new guide or
// audit shows up here without anyone remembering to add it.
export default defineEventHandler(async (event) => {
  const { site, pricing } = useAppConfig(event)
  const url = (path: string) => `${site.url}${path}`

  const [docs, posts] = await Promise.all([
    queryCollection(event, 'docs').select('title', 'path', 'description', 'section', 'order').order('order', 'ASC').all(),
    queryCollection(event, 'blog').select('title', 'path', 'description', 'date').order('date', 'DESC').all(),
  ])

  const link = (title: string, path: string, note?: string) => `- [${title}](${url(path)})${note ? `: ${note}` : ''}`

  const sections: string[] = []
  for (const d of docs) {
    const heading = `## Docs: ${d.section}`
    if (!sections.includes(heading)) sections.push(heading)
  }
  const docsBlocks = sections.map((heading) =>
    [heading, '', ...docs.filter((d) => `## Docs: ${d.section}` === heading).map((d) => link(d.title, d.path, d.description))].join('\n'),
  )

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.name} is a desktop SEO crawler for macOS, Windows and Linux. It runs ${audits.length} SEO and accessibility audits, ranks what to fix first by how much of a site each problem touches, UX-tests any page against what it is for, and compares crawls to prove a fix worked. Crawls run and stay on the user's machine; there is no server and no account.`,
    '',
    `Free up to ${pricing.freeUrlLimit} URLs per crawl with every audit included. Pro is $${pricing.proYearly}/year for unlimited URLs. Contact: ${site.email}.`,
    '',
    '## Product',
    '',
    link('Features', '/features', 'What the app does: crawl, results, plan, UX testing, accessibility, compare, issues, projects'),
    link('Pricing', '/pricing', 'Free and Pro plans'),
    link('Download', '/download', 'Installers for macOS, Windows and Linux'),
    link('CrawlStatBot', '/bot', 'How the crawler identifies itself and how to control it with robots.txt'),
    '',
    ...docsBlocks.flatMap((b) => [b, '']),
    '## Audit reference',
    '',
    ...audits.map((a) => link(a.title, `/docs/audits/${a.slug}`, a.description)),
    '',
    '## Optional',
    '',
    ...posts.map((p) => link(p.title, p.path, p.description)),
    '',
  ].join('\n')

  setHeader(event, 'content-type', 'text/markdown; charset=utf-8')
  return body
})
