---
title: Getting started
description: What CrawlStat is, what it does on your machine, and how to go from a fresh install to your first list of issues in a few minutes.
section: Start here
order: 1
---

## What CrawlStat is

CrawlStat is a desktop SEO crawler. You give it a website and it works through the site the way a search engine would. It follows links, records what each URL returns, and reads each page's titles, descriptions, headings, canonicals, hreflang, structured data, images and links. When the crawl finishes, it runs 45 audits over everything it found and gives you a list of problems, each with an explanation and a fix.

It runs on macOS, Windows and Linux. Everything happens on your own computer:

- **Your crawl data stays local.** Each crawl is saved as a single file on your disk. Nothing about the sites you crawl is uploaded anywhere.
- **It is polite by default.** CrawlStat respects robots.txt, identifies itself honestly, and keeps the number of simultaneous requests modest.
- **It handles big sites.** Crawl data goes to disk rather than memory, so a large crawl doesn't slow your machine down. An interrupted crawl can pick up where it stopped.

::screenshot{src="/screenshots/projects-dark.png" alt="The CrawlStat Projects screen listing recent crawls with their status and issue counts" caption="The Projects screen, where every crawl you've run is listed."}
::

## Quick start

::steps
1. **Install CrawlStat.** Download the build for your operating system from [the downloads page](/download) and install it. See [Installing CrawlStat](/docs/installing) if you need platform-specific help.
2. **Start a crawl.** Click **New crawl** in the sidebar (or press :kbd[⌘N] on macOS). Type the site's address, for example `example.com`, and click **Start crawl**.
3. **Read the issues.** When the crawl finishes, CrawlStat runs its audits automatically. Open **Issues** to see what it found, grouped into errors, warnings and notices, each with a "How to fix" note.
::

That's all you need for a first look. The rest of this guide covers each step in more detail.

## The screens at a glance

The sidebar on the left takes you between CrawlStat's main screens:

| Screen | What it's for |
| --- | --- |
| **Projects** | Every crawl you've run, with its status, size and issue counts. Open, resume or delete crawls here. |
| **Crawl** | The live view of the crawl that's running: counters, speed, progress and the URLs being fetched right now. |
| **Results** | Every URL in the crawl, in a sortable, filterable table split into eleven tabs. |
| **Issues** | The audit findings, grouped by severity, with explanations and one click to the affected URLs. |
| **Settings** | Defaults for new crawls, the theme, your licence, and where your files are kept. |

Results and Issues are available once a crawl is open. Until then they're greyed out with the hint "open a crawl first".

## What CrawlStat checks

The 45 audits cover the things that usually go wrong on a website:

- **Responses:** server errors, broken pages, fetch failures, redirect chains and loops, and slow responses.
- **Links:** broken internal links, links that point at redirects, orphan pages, and pages buried deep in the site.
- **On-page:** missing, duplicate, too-long or too-short titles and meta descriptions; missing or multiple H1s.
- **Indexing:** noindex pages, pages blocked by robots.txt, canonical problems, and hreflang errors.
- **Content:** exact and near-duplicate pages.
- **Images:** missing alt text and oversized files.
- **Security:** mixed content and HTTP links on HTTPS sites.
- **Accessibility:** links and buttons without accessible names, unlabelled form fields, broken ARIA references, missing page language, and more.

Each audit has its own page under `/docs/audits/`, with the same explanation and fix that you see in the app. For example, see [Broken internal links](/docs/audits/broken-internal-links) or [Duplicate page titles](/docs/audits/duplicate-page-titles).

## Free and Pro

CrawlStat is free to use for crawls of up to 500 URLs, with every audit and CSV export included. If you crawl a bigger site on the free tier, the crawl stops at 500 URLs and keeps everything found up to that point.

Pro removes the URL limit. Crawl comparison, custom extraction, scheduled crawls, XLSX export, an HTML audit report and bring-your-own-key integrations are rolling out to Pro. See [Licensing](/docs/licensing) and [pricing](/pricing).

::callout{type="note"}
CrawlStat doesn't run JavaScript. It reads the HTML the server sends, which is also the first thing a search engine sees. Pages that only build their content in the browser will look thin to CrawlStat. See the [FAQ](/docs/faq) for more.
::

## Where to go next

- [Your first crawl](/docs/your-first-crawl): every option in the New crawl dialog, explained.
- [Watching a crawl](/docs/watching-a-crawl): what the live counters mean.
- [The results table](/docs/results-table): finding your way through the data.
- [Issues](/docs/issues): reading and acting on audit findings.
