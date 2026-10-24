---
title: FAQ
description: Short answers to the questions people ask most about CrawlStat, including what it costs, what it crawls, where data goes, and what it doesn't do yet.
section: Help
order: 14
---

## The basics

### Is CrawlStat really free?

Yes. The free tier crawls up to 500 URLs per crawl, with all 45 audits and CSV export. There's no time limit and you don't need an account. [Pro](/docs/licensing) removes the URL limit.

### Which platforms does it run on?

macOS (11 or later, Apple Silicon and Intel), Windows 10 and 11 (64-bit), and Linux (x86-64, as an AppImage or `.deb`). See [Installing](/docs/installing).

### Do I need an account?

No. You download it and use it. If you buy Pro, you get a licence key to paste into Settings, but there's still no account to sign in to in the app.

## Crawling

### Does CrawlStat render JavaScript?

No. CrawlStat reads the HTML your server sends and doesn't run scripts. That's also what a search engine sees first, so it's a useful view. But on sites that build their content or navigation in the browser, CrawlStat will find less than a visitor does. If a crawl finds only a page or two, see [Troubleshooting](/docs/troubleshooting#the-crawl-finds-only-one-page-or-very-few).

### How big a site can it crawl?

Big ones. Crawl data is written to disk as it's collected rather than held in memory, so memory use stays roughly flat as a crawl grows. In our benchmark, a 50,000-URL crawl used about 128 MB of memory. On disk, expect roughly 2 KB per URL. In practice the limit is your patience and the site's server, not CrawlStat. On the free tier, it's 500 URLs per crawl.

### How fast is it?

Mostly as fast as the site's server allows. With the defaults (5 simultaneous requests, no delay) expect tens of URLs per second from a typical site. A Crawl-delay in robots.txt, or a slow server, will make it slower. That's on purpose.

### Can I crawl a site I don't own?

Yes, and CrawlStat is built to do it politely. It respects robots.txt, honours Crawl-delay, identifies itself honestly as `CrawlStatBot`, and keeps the number of simultaneous requests low by default. See [The crawler and robots.txt](/docs/crawler-and-robots).

### Can I crawl just part of a site?

Yes. Use **Only crawl URLs matching** and **Never crawl URLs matching** under **More options** in the New crawl dialog, or set a **Maximum depth**. To check a fixed set of pages, use **List** mode. See [Your first crawl](/docs/your-first-crawl).

### Does it follow nofollow links, canonicals and hreflang?

By default it doesn't follow `rel="nofollow"` links, which matches what search engines do. You can change this in [Settings](/docs/settings). It does add canonical and hreflang targets to the crawl, and reads sitemaps listed in robots.txt, so that pages only reachable that way are still checked.

### Does it measure page speed or Core Web Vitals?

No. CrawlStat measures how long the server takes to respond, which is shown in the **Time** column and checked by the [slow server response](/docs/audits/slow-server-response) audit. It doesn't load pages in a browser, so it doesn't measure rendering metrics like Core Web Vitals.

### Can I pause a crawl and come back to it later?

Yes. Pause it from the Crawl screen, or stop it and later click **Resume** on the Projects screen. Even if CrawlStat quits unexpectedly, the crawl can be resumed where it left off. See [Watching a crawl](/docs/watching-a-crawl).

## Results and audits

### What does CrawlStat check?

45 audits: 35 for SEO and 10 for accessibility. They cover broken links and pages, redirects, titles, descriptions, headings, canonicals, hreflang, indexing, duplicate content, images, mixed content and common accessibility problems. See [Issues](/docs/issues).

### If I update CrawlStat, do my old crawls benefit?

Yes. The audits are part of the app, not saved in your crawl files. Open an old crawl and click **Re-run audits** on the Issues screen to check it with the latest version of every audit.

### Why isn't a page's title flagged when it's obviously wrong?

Title, description and similar checks only apply to pages that can be indexed. If a page is noindex, redirects, returns an error or is canonicalised elsewhere, CrawlStat doesn't report problems with its title, because search engines won't show it anyway.

### Can I export my results?

Yes. Every results tab can be exported to CSV, respecting your current filter, as can the issue list and each issue's affected URLs. XLSX export and an HTML audit report are rolling out to Pro.

### Can I compare two crawls?

Not yet. Crawl comparison is rolling out to Pro. In the meantime, each crawl is kept as its own file, so your history is there to compare when it arrives.

### Can I extract custom data from pages?

Custom extraction with CSS selectors, XPath and regular expressions is rolling out to Pro.

### Can I schedule crawls?

Scheduled crawls are rolling out to Pro.

## Files and data

### Is my crawl data uploaded anywhere?

No. Crawls are stored as files on your computer and never leave it. The only network traffic is the crawl itself, licence checks if you use Pro (your key and a random install ID, nothing about your crawls), and update checks. See [Privacy and your data](/docs/privacy-and-data).

### Where are my crawls saved?

In the `projects` folder inside CrawlStat's application data folder. The path is shown on the Projects screen and in Settings. Each crawl is one file. See [Projects](/docs/projects).

### Can I change where crawls and exports are saved?

Not from within the app at the moment. Settings shows both locations so you can find them. Crawls go to CrawlStat's `projects` folder and exports to your Downloads folder.

### Can I share a crawl with a colleague?

You can copy the crawl's `.db` file and send it, for example to archive it or open it with any SQLite tool. CrawlStat itself lists the crawls it has run, and doesn't currently have a way to open a crawl file from elsewhere.

## Pro and licensing

### What does Pro cost?

$99 a year. See [pricing](/pricing).

### Does Pro need an internet connection?

Only to activate, and for a check roughly once a day when you open the app. If you're offline, Pro keeps working for 14 days. If a check is overdue after that, CrawlStat falls back to the free tier until it can reconnect. It never stops working. See [Licensing](/docs/licensing#working-offline).

### Can I use Pro on more than one computer?

A licence allows a set number of installations. To move Pro to a new computer, deactivate it on the old one first, in **Settings → Licence → Deactivate**.

### What happens to my crawls if I cancel Pro?

Nothing. They stay on your computer and remain fully readable. CrawlStat goes back to the free tier, so new crawls are limited to 500 URLs.
