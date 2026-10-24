---
title: "Redirect chains: the chain is the finding"
description: How redirect chains and loops build up, why CrawlStat follows every redirect by hand instead of letting the HTTP client do it, and a practical routine for collapsing them.
date: 2026-10-07
author: The CrawlStat team
tag: SEO guide
readingTime: 6
---

Nobody sets out to build a redirect chain. They build up over time.

The site moves to HTTPS, so someone adds a rule. Later the `www` subdomain becomes canonical, so someone adds another. A redesign standardises on trailing slashes. A CMS migration brings its own redirect table. Each rule made sense on the day it was written. Put them together and an old link takes this route:

```txt
http://example.com/pricing
  → 301  https://example.com/pricing
  → 301  https://www.example.com/pricing
  → 301  https://www.example.com/pricing/
  → 200
```

That's three hops before the visitor gets a page. Every one of them is a full round trip.

## Why chains matter

- **Latency.** Every hop is another request and response before the page can even start loading. On a slow mobile connection, you feel it.
- **Crawlers give up.** Search engine crawlers follow redirects, but not forever. A long chain risks being abandoned before the destination is reached.
- **Link value leaks.** A link that goes through redirects still works, but some of its value gets diluted along the way.
- **They hide mistakes.** A chain that ends in a 404 is a broken link that looks like it works until you follow it all the way.

A **redirect loop** is the extreme case: A redirects to B, and B redirects back to A. Nothing is ever served. Browsers show an error after a few hops, and search engines give up on the URL.

## Why CrawlStat follows redirects by hand

This part sounds like an implementation detail, but it's the heart of the matter.

Every decent HTTP client can follow redirects for you. You ask for a URL and get back the final response. That's exactly what a browser wants. For an SEO crawler, it's useless, because the client quietly throws away the hops it went through. You learn where you ended up, but not how you got there.

For an SEO crawler, **the chain is the finding**. "This URL takes three hops to reach a 200" is an audit. "These two URLs redirect to each other" is an audit. So CrawlStat's HTTP client has redirect following turned off, and the engine walks the chain itself:

1. Request the URL. If the response is a 3xx with a `Location` header, resolve that location (relative ones are legal and common).
2. Record the hop: hop number, from, to, and status code.
3. If the next URL has already appeared in this chain, stop and mark it as a **loop** instead of spinning forever.
4. Otherwise, follow it and repeat. After 10 redirects, give up and report the URL as unfetchable.

Every hop gets stored in the crawl database. Each URL row then carries two status codes: `status_code`, the 3xx the URL itself returned, and `final_status_code`, what the end of the chain returned. That difference is the point. A crawler that only reports "200" for `http://example.com/pricing` is hiding your problem from you.

## What CrawlStat reports

Three audits cover redirects:

| Audit | Severity | Triggers when |
|---|---|---|
| [Redirect loop](/docs/audits/redirect-loops) | Error | A URL's redirects come back to a URL already in the chain |
| [Redirect chain](/docs/audits/redirect-chains) | Warning | A URL takes more than two hops to reach its destination |
| [Internal link to a redirect](/docs/audits/internal-links-to-redirects) | Warning | One of your own pages links to a URL that redirects |

The third one is often the most valuable. The first two tell you which redirects are bad. The third tells you which pages are sending traffic into them.

::screenshot{src="/screenshots/issues-dark.png" alt="The CrawlStat Issues screen listing audit findings grouped by severity" caption="Issues are grouped by severity, each with its fix text. Click one to filter the results table to the affected URLs."}
::

## Finding them in the app

1. After a crawl, open **Issues** and click **Redirect chain** or **Redirect loop**. The results table filters down to the affected URLs.
2. Select a row and press :kbd[Enter]. The detail panel shows the **redirect chain** hop by hop, with the status of each one.
3. Open the **Inlinks** panel to see which pages link to that URL. Those are the pages you'll edit.
4. For an overview, the **Response codes** tab shows status, final status and the number of redirects followed side by side. Any count above two is highlighted.

## How to fix them

### Collapse chains to one hop

Change each redirect so it points straight at the final destination, not at the next hop. The cleanest way is to put all canonicalisation (scheme, host, trailing slash) in **one rule in one place**, so every URL is rewritten at most once:

```txt
# Before: three rules, applied in sequence
http://example.com/pricing    → https://example.com/pricing
https://example.com/pricing   → https://www.example.com/pricing
https://www.example.com/pricing → https://www.example.com/pricing/

# After: every variant goes straight to the canonical form
http://example.com/pricing      → https://www.example.com/pricing/
https://example.com/pricing     → https://www.example.com/pricing/
http://www.example.com/pricing  → https://www.example.com/pricing/
https://www.example.com/pricing → https://www.example.com/pricing/
```

When you migrate URLs, update the *old* redirect rules to point at the new destination. Don't add a new hop on top of them.

### Then stop linking to redirects at all

A redirect should only ever serve external traffic and old bookmarks. Everything you control should name the destination directly:

- **Internal links**, especially in templates. A single navigation or footer link to an old URL can account for thousands of wasted requests across a site, which makes this one of the cheapest wins there is.
- **Your XML sitemap.** It should list final URLs that return 200, nothing else.
- **Canonical tags.** A canonical pointing at a redirect sends search engines a mixed signal. Point it at the URL that returns 200 directly.

### Break loops at the source

Loops nearly always come from two rules that disagree. The classic is an HTTP→HTTPS rule fighting a trailing-slash rule, or a CMS redirect duplicating one already on the server. Find the rules that point at each other, decide which layer owns canonicalisation, and remove the duplicate.

::callout{type="tip"}
If your CDN, your web server and your CMS can all issue redirects, choose one of them to own canonicalisation (scheme, host, trailing slash) and turn it off in the other two. Most loops we've seen come from two layers each trying to be helpful.
::

### Re-crawl to confirm

Redirect rules are easy to get almost right. After you deploy a fix, crawl again and check that the chain and loop counts went to zero, and that the internal-link-to-redirect list got shorter.

## Try it on your site

Redirect audits are part of every crawl, including on the free tier, which covers up to 500 URLs per crawl. [Download CrawlStat](/download), crawl your site, and open Issues. And if you'd like the full explanation for each audit, the docs for [redirect chains](/docs/audits/redirect-chains) and [redirect loops](/docs/audits/redirect-loops) have it.
