---
title: FAQ
description: Short answers to the questions people ask most about CrawlStat, including what it costs, what it crawls, JavaScript, client reports, where data goes, and what it doesn't do yet.
section: Help
order: 19
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

Yes, when you ask it to. By default CrawlStat reads the HTML your server sends, which is also what a search engine sees first, and that's fast. For sites built with React, Vue and the like, turn on **Render JavaScript** in the New crawl dialog: each page is run in the Chrome, Chromium, Edge or Brave you already have before CrawlStat reads it. It's several times slower, and it's included on the free tier. See [Your first crawl](/docs/your-first-crawl#render-javascript).

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

No. CrawlStat measures how long the server takes to respond, which is shown in the **Time** column and checked by the [slow server response](/docs/audits/slow-server-response) audit. Even with **Render JavaScript** on, the browser is only used to read the finished page, so rendering metrics like Core Web Vitals aren't measured.

### Can I pause a crawl and come back to it later?

Yes. Pause it from its live view, or stop it and later click **Resume** on the Projects screen. Even if CrawlStat quits unexpectedly, the crawl can be resumed where it left off. See [Watching a crawl](/docs/watching-a-crawl).

## Results and audits

### What does CrawlStat check?

45 audits: 35 for SEO and 10 for accessibility. They cover broken links and pages, redirects, titles, descriptions, headings, canonicals, hreflang, indexing, duplicate content, images, mixed content and common accessibility problems. See [Issues](/docs/issues).

### If I update CrawlStat, do my old crawls benefit?

Yes. The audits are part of the app, not saved in your crawl files. Open an old crawl and click **Re-run audits** on its Issues tab to check it with the latest version of every audit.

### Why isn't a page's title flagged when it's obviously wrong?

Title, description and similar checks only apply to pages that can be indexed. If a page is noindex, redirects, returns an error or is canonicalised elsewhere, CrawlStat doesn't report problems with its title, because search engines won't show it anyway.

### Can I export my results?

Yes. Every tab of the Pages table can be exported to CSV, respecting your current filter, as can the issue list and each issue's affected URLs. The plan's written report can be saved as Markdown. XLSX export is planned for Pro.

### Can I send the results to a client?

Yes. **Export a client report** in a crawl's header makes a branded A4 PDF, or a single self-contained web page, with your name on the cover and your colour throughout: the site's health, a ranked action plan, accessibility and every issue. It's included on the free tier; adding progress since the last crawl needs Pro. See [Client reports](/docs/client-reports).

### Can I compare two crawls?

Yes, with Pro. Recrawl the site, then click **Compare** on the crawl, or **Compare with previous crawl** when the recrawl finishes. You'll see what was fixed, what's new, and which pages started failing. See [Comparing crawls](/docs/comparing-crawls).

### Can I extract custom data from pages?

Not yet. Custom extraction with CSS selectors, XPath and regular expressions is planned for Pro.

### Can I schedule crawls?

Not yet. Scheduled crawls are planned for Pro. In the meantime, **Recrawl** on the Projects screen repeats a crawl with the same settings in one click.

## Files and data

### Is my crawl data uploaded anywhere?

No. Crawls are stored as files on your computer and never leave it. The only network traffic is the crawl itself, licence checks if you use Pro (your key and a random install ID, nothing about your crawls), and update checks. See [Privacy and your data](/docs/privacy-and-data).

### Where are my crawls saved?

In the `projects` folder inside CrawlStat's application data folder. The path is shown on the Projects screen and in Settings. Each crawl is one file. See [Projects](/docs/projects).

### Can I change where crawls and exports are saved?

Not from within the app at the moment. Settings shows both locations so you can find them. Crawls go to CrawlStat's `projects` folder and exports to your Downloads folder.

### Can I share a crawl with a colleague?

You can copy the crawl's `.db` file and send it, for example to archive it. CrawlStat itself lists the crawls it has run, and doesn't currently have a way to open a crawl file from elsewhere.

## Pro and licensing

### What does Pro cost?

$99 a year. See [pricing](/pricing).

### Does Pro need an internet connection?

Only to activate, and for a check roughly once a day when you open the app. If you're offline, Pro keeps working for 14 days. If a check is overdue after that, CrawlStat falls back to the free tier until it can reconnect. It never stops working. See [Licensing](/docs/licensing#working-offline).

### Can I use Pro on more than one computer?

A licence allows a set number of installations. To move Pro to a new computer, deactivate it on the old one first, in **Settings → Licence → Deactivate**.

### What happens to my crawls if I cancel Pro?

Nothing. They stay on your computer and remain fully readable. CrawlStat goes back to the free tier, so new crawls are limited to 500 URLs.
