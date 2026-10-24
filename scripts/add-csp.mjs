#!/usr/bin/env node
/**
 * Add a Content-Security-Policy to every prerendered page.
 *
 * ## Why a meta tag and not a header
 *
 * The site is static on GitHub Pages, which serves a fixed set of response
 * headers and gives us no way to add our own — no `_headers` file, no edge
 * function, nothing. A `<meta http-equiv>` policy is the only CSP available,
 * and the browser enforces it exactly like a header with two exceptions that
 * are worth naming rather than quietly shipping:
 *
 * * `frame-ancestors` is ignored in meta, so this cannot stop the site being
 *   framed. On a brochure site with no session and no authenticated action
 *   there is nothing for a clickjacker to steal, which is the only reason that
 *   is acceptable here.
 * * The policy applies from the point the parser reads it, so anything in the
 *   `<head>` above it is not covered. Nuxt puts its scripts after the meta
 *   block, and the check at the bottom of this file fails the build if that
 *   ever stops being true.
 *
 * ## Why the hashes are computed here
 *
 * Nuxt emits three inline scripts, one of which is its hydration bootstrap and
 * changes with the content of the page. Hard-coding hashes in `nuxt.config`
 * would mean a policy that silently breaks the site on the next build. So the
 * hashes are taken from the HTML that was actually generated.
 *
 * A hash in `script-src` makes the browser ignore `'unsafe-inline'`, which is
 * the point: no injected `<script>` can run, even though the page has inline
 * scripts of its own.
 *
 * `style-src` keeps `'unsafe-inline'`, because Vue writes `style="..."`
 * attributes and attribute styles cannot be hashed. Injected CSS is a far
 * smaller problem than injected JavaScript, and the alternative is rewriting
 * every component to avoid inline styles for very little gain.
 */
import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = '.output/public'
const MARKER = 'http-equiv="Content-Security-Policy"'

/** Every `<script>` / `<style>` body in the document, as CSP source hashes. */
function hashesFor(html, tag) {
  const pattern = new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)</${tag}>`, 'g')
  const hashes = new Set()
  for (const [, attrs, body] of html.matchAll(pattern)) {
    // External files are covered by 'self'; JSON payloads never execute.
    if (/\ssrc=/.test(attrs)) continue
    if (/type=["']application\/json["']/.test(attrs)) continue
    if (!body) continue
    hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`)
  }
  return [...hashes]
}

function policyFor(html) {
  const scripts = hashesFor(html, 'script')
  return [
    "default-src 'self'",
    // Nothing is loaded from anywhere else: the fonts are self-hosted through
    // @fontsource and there is no analytics, no tag manager and no CDN.
    `script-src 'self' ${scripts.join(' ')}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    // `data:` because Vite inlines small font subsets as data URIs; without it
    // the typeface silently falls back to the system stack.
    "font-src 'self' data:",
    // No XHR targets at all. If a form or an API ever appears, widen this
    // deliberately rather than leaving it open now.
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ')
}

/** The rest of what a header would carry, as far as meta allows. */
const EXTRA_META = [
  '<meta name="referrer" content="strict-origin-when-cross-origin">',
].join('')

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* htmlFiles(path)
    else if (entry.name.endsWith('.html')) yield path
  }
}

let count = 0
let failures = 0

for await (const file of htmlFiles(ROOT)) {
  const html = await readFile(file, 'utf8')
  if (html.includes(MARKER)) continue

  const policy = policyFor(html)
  const meta = `<meta ${MARKER} content="${policy}">${EXTRA_META}`

  // Straight after <head> so the policy covers everything that follows.
  const at = html.indexOf('<head>')
  if (at === -1) {
    console.error(`  no <head> in ${file}`)
    failures++
    continue
  }
  const patched = html.slice(0, at + 6) + meta + html.slice(at + 6)

  // A script above the meta tag would not be covered by the policy, and a
  // policy that silently covers less than it claims is worse than none.
  const beforeMeta = patched.slice(0, patched.indexOf(MARKER))
  if (/<script\b/i.test(beforeMeta)) {
    console.error(`  a script precedes the CSP in ${file}`)
    failures++
    continue
  }

  await writeFile(file, patched)
  count++
}

console.log(`CSP added to ${count} page(s)`)
if (failures) {
  console.error(`${failures} page(s) could not be secured`)
  process.exit(1)
}
