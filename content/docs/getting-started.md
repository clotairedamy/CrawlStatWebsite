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
2. **Start a crawl.** Click **New crawl**, the **+** at the top of the sidebar (or press :kbd[⌘N] on macOS). Type the site's address, for example `example.com`, and click **Start crawl**.
3. **Read the issues.** When the crawl finishes, CrawlStat runs its audits automatically. Open the crawl's **Issues** tab to see what it found, ranked within errors, warnings and notices, each with a "How to fix" note.
4. **Share it.** Click **Export a client report** in the crawl's header for a branded PDF you can send as it is.
::

That's all you need for a first look. The rest of this guide covers each step in more detail.

## Finding your way around

The sidebar on the left holds the things that aren't about one crawl:

| Item | What it's for |
| --- | --- |
| **Projects** | Every crawl you've run, as cards or one row per site, with health, history and issue counts. Open, recrawl, compare, resume or delete crawls here. |
| *The live crawl* | Only while a crawl runs: its site, progress and a Live or Paused badge. Click it to get back to the crawl. |
| **Accessibility** | Check pages against WCAG. See [Accessibility](/docs/accessibility). |
| **UX Testing** | Test a page against what it's for. A [Pro](/docs/licensing) feature. See [UX Testing](/docs/ux-testing). |
| **Settings** | Defaults for new crawls, the theme and colour, your licence, and where your files are kept. |

Everything about one crawl lives on that crawl's own page, which you open from Projects. Its header says which crawl it is and has **Export a client report**, **Compare** and **Recrawl**. Its tabs are:

| Tab | What it's for |
| --- | --- |
| **Overview** | The live view while the crawl runs; afterwards, its health, headline figures and top issues. |
| **Issues** | The audit findings, ranked, with why each one ranks where it does and the pages it affects. |
| **Pages** | Every URL in the crawl, in a sortable, filterable table with eleven tabs and quick lenses. |
| **Plan** | What to fix first, and a written report. |
| **Visualise** | How the site is structured and linked. |
| **UX Testing** | Testing the crawl's pages for the people who use them. |
| **Accessibility** | The crawl against WCAG 2.1 AA. |

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

CrawlStat is free to use for crawls of up to 500 URLs, with every audit, JavaScript rendering, client reports and CSV export included. If you crawl a bigger site on the free tier, the crawl stops at 500 URLs and keeps everything found up to that point.

Pro removes the URL limit and adds UX Testing, crawl comparison, and progress since the last crawl in client reports. See [Licensing](/docs/licensing) and [pricing](/pricing).

::callout{type="note"}
By default CrawlStat reads the HTML the server sends, which is also the first thing a search engine sees. For sites that build their pages in the browser, turn on **Render JavaScript** when you start the crawl. See [Your first crawl](/docs/your-first-crawl#render-javascript).
::

## Where to go next

- [Your first crawl](/docs/your-first-crawl): every option in the New crawl dialog, explained.
- [Watching a crawl](/docs/watching-a-crawl): what the live counters mean.
- [The Pages table](/docs/results-table): finding your way through the data.
- [Issues](/docs/issues): reading and acting on audit findings.
- [Client reports](/docs/client-reports): sending it all to a client.
