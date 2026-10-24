---
title: Introducing CrawlStat
description: A desktop SEO crawler that is fast, light on memory and pleasant to spend an afternoon in. Local-first, with a free tier that includes every audit.
date: 2026-10-21
author: The CrawlStat team
tag: Announcement
readingTime: 6
---

Today we're releasing CrawlStat, a desktop SEO crawler for macOS, Windows and Linux.

Point it at a site and it fetches every page it can reach, parses each one, and turns what it found into a prioritised list of things to fix: broken links, redirect chains, duplicate titles, orphan pages, hreflang mistakes, missing alt text and a lot more. There are 45 checks in all. It does that on your machine. You don't create an account before your first crawl, there's no cloud project, and nothing gets uploaded.

## Why another crawler?

Fair question. Desktop crawlers have been around for over a decade, and the good ones are genuinely good. We used them for years. But after using them every day, three things kept bothering us.

**They get heavy.** Crawl a big site and watch memory climb until you're tuning heap sizes or closing browser tabs to make room. How big a site you can crawl ends up depending on how much RAM your laptop has.

**They feel like 2009.** A crawler is where an SEO spends whole afternoons. It deserves the same care as any other tool people live in: a table you can read, sensible defaults, and keyboard control that actually works.

**The free tiers are an afterthought.** Usually it's a demo with the useful parts greyed out.

So we built the crawler we wanted to use ourselves.

## Fast, and light

The engine keeps crawl state on disk instead of in RAM. The crawl file *is* the queue. There's no in-memory list of URLs to visit and no in-memory set of URLs already seen. That one decision is why memory stays flat as a crawl grows.

We measured it on an Apple Silicon laptop against a local test site, so these numbers reflect the engine and not the network:

| Crawl | Throughput | Peak memory |
|---|---|---|
| 2,000 URLs | 11,000 URLs/sec | 25 MiB |
| 50,000 URLs | 11,700 URLs/sec | 128 MiB |
| 60,000 URLs | 10,600 URLs/sec | 131 MiB |

Doubling a crawl from 30,000 to 60,000 URLs costs 1.19× the peak memory. Past a certain point, a bigger crawl costs you time and disk (about 2 KB per URL) rather than RAM.

An honest caveat: you won't see 11,700 URLs a second against a real website, and you shouldn't want to. Real crawls are limited by the network and by politeness. With the default five concurrent requests, expect tens of URLs per second against a typical server. A fast engine isn't for hammering servers. It means the crawler is never the bottleneck, and your laptop stays usable while it runs.

We wrote up how the flat-memory design works in [The database is the frontier](/blog/flat-memory-crawling).

## Designed to be lived in

::screenshot{src="/screenshots/results-dark.png" alt="The CrawlStat results table showing crawled URLs with status codes, titles and response times" caption="The results table: eleven tabs over one table, with sortable columns, a filter bar and a column chooser."}
::

The app runs natively on all three desktop platforms. A few deliberate choices:

- **Borders, not shadows.** A dense data grid needs crisp, flat separation.
- **Monospaced numbers and URLs**, so you can scan a column top to bottom.
- **One accent colour.** In CrawlStat, colour means something: severity and status class. If we spent it on decoration, the meaningful uses would get lost.

You'll spend most of your time in the results table, so it's fully keyboard-driven. Arrow keys and Page Up/Down move the cursor, :kbd[Enter] opens the detail panel and :kbd[Esc] closes it. :kbd[⌘F] focuses the filter, :kbd[⌘E] exports, :kbd[⌘N] starts a crawl, and :kbd[⌘Space] pauses or resumes one.

The table reads straight from the crawl file instead of holding its own copy. It fetches 200 rows at a time as you scroll, so a 500,000-row crawl scrolls in the same memory as a small one. Leaving the crawl screen doesn't cancel a crawl either, so you can dig through last week's results while this week's crawl runs.

## Audits that explain themselves

CrawlStat ships **45 audits**: 35 SEO checks and 10 accessibility checks. Each one has a severity, a plain description of the problem, and fix instructions meant to be read by someone who has to act on them. The same text appears in the app and in [our docs](/docs), so the two can't drift apart.

A few details we're proud of:

- **Indexability is computed once.** Half the audits only make sense for pages a search engine could actually index. CrawlStat won't nag you about the title of a `noindex` page.
- **Link score is PageRank.** It runs over the followed internal links between your HTML pages. The strongest page on the site scores 100.
- **Near-duplicates are grouped.** Pages that are almost the same get grouped. Exact duplicates are reported as exact duplicates.
- **Accessibility is in the default crawl.** It checks for links and buttons with no accessible name, form fields with no label, ARIA references that point at nothing, pages with no declared language, duplicate ids, invalid roles, positive `tabindex`, untitled frames and skipped heading levels.

The audit logic ships in the app, not in the crawl file. So when you upgrade CrawlStat, re-running the audits on an old crawl uses the improved checks.

## Local-first, actually

Your crawl data never leaves your machine, except through integrations you trigger yourself. Each crawl is a single file on your disk.

The licence check never stands between you and a crawl either. Pro licences are signed tokens that the app verifies offline, so CrawlStat works on a plane and keeps working if our servers are down. We explain how in [Licensing without a database](/blog/licensing-without-a-database).

CrawlStat is also polite by default. It respects `robots.txt`, paces requests per host, and identifies itself honestly:

```txt
CrawlStatBot/1.0 (+https://crawlstat.com/bot)
```

You can stop a crawl at any time, and it finishes the requests already in flight before it stops. If your laptop dies halfway through, you can resume the crawl from where it left off.

## A free tier that's actually useful

**Free** covers up to 500 URLs per crawl, with every audit and CSV export. There's no trial clock and no account. That's enough for many small-business sites, a landing-page audit, or a spot check of one section of a bigger site.

**Pro** is $99/year and removes the URL limit. It also adds crawl comparison, custom extraction, scheduled crawls, XLSX and HTML reports, and bring-your-own-key integrations.

::callout{type="note"}
To be straight with you: unlimited URLs works today. Crawl comparison, custom extraction, scheduled crawls, the XLSX and HTML reports, and BYOK integrations are still rolling out over the coming releases. We'd rather tell you that here than hide it in small grey type.
::

## What isn't there yet

- **JavaScript rendering.** CrawlStat fetches and parses HTML as the server sends it. On server-rendered sites that's everything. On client-rendered apps it isn't. The engine was built so a headless-browser renderer can slot in later. It's planned, not shipped.
- **A site architecture graph.** The link graph data is already there. The visual graph isn't built yet.
- **The Pro features above** that are still rolling out.

## Try it

CrawlStat is free to [download](/download) for macOS, Windows and Linux. Point it at your own site. There's a decent chance it finds a redirect chain you didn't know about.

If you want to see everything it checks first, the [features page](/features) has the full list, and [pricing](/pricing) has the details on Pro.
