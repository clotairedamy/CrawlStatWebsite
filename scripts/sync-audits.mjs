// Copies the audit catalogue out of the engine so the site's audit pages use
// the exact text the app shows in its Issues panel. The two cannot drift as
// long as this is re-run after the catalogue changes:
//
//   npm run sync:audits                       # expects ../CrawlStat next to this repo
//   CRAWLSTAT_REPO=/path/to/CrawlStat npm run sync:audits
//
// The output is committed, so CI never needs the engine repository.

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repo = process.env.CRAWLSTAT_REPO ?? resolve(here, '../../CrawlStat')
const source = readFileSync(resolve(repo, 'engine/src/audit/catalog.rs'), 'utf8')
const out = resolve(here, '../app/data/audits.json')

// A Rust string literal, with `\` + newline continuations folded the way rustc
// does: the backslash, the newline and the next line's leading whitespace go.
const str = (name) => new RegExp(`${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's')
const unescape = (s) => s.replace(/\\\n\s*/g, '').replace(/\\"/g, '"').replace(/\\\\/g, '\\')

// The defaults from `AuditConfig::default()` in engine/src/audit/mod.rs, which
// the app substitutes the same way before showing the text.
const thresholds = {
  title_min_chars: 30,
  title_max_chars: 60,
  description_min_chars: 70,
  description_max_chars: 155,
  max_redirect_hops: 2,
  slow_response_ms: 1000,
  large_image_kb: 100,
  max_depth_notice: 5,
  near_duplicate_similarity: Math.round(100 - (6 / 64) * 100),
}
const fill = (s) =>
  s.replace(/\{(\w+)\}/g, (marker, key) => {
    if (!(key in thresholds)) throw new Error(`Unknown threshold ${marker} in: ${s}`)
    return String(thresholds[key])
  })

const blocks = source.split(/\n\s*Audit \{/).slice(1)
const audits = blocks.map((block) => {
  const field = (name) => {
    const m = block.match(str(name))
    if (!m) throw new Error(`Missing ${name} in:\n${block.slice(0, 200)}`)
    return unescape(m[1])
  }
  const severity = block.match(/severity:\s*Severity::(\w+)/)[1].toLowerCase()
  const id = field('id')
  return {
    id,
    slug: field('docs_slug'),
    title: field('title'),
    severity,
    category: id.startsWith('a11y_') ? 'Accessibility' : 'SEO',
    description: fill(field('description')),
    howToFix: fill(field('how_to_fix')),
  }
})

writeFileSync(out, JSON.stringify(audits, null, 2) + '\n')
console.log(`Wrote ${audits.length} audits to ${out}`)
