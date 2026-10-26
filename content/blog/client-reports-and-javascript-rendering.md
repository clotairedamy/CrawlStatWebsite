---
title: "Client reports, JavaScript rendering and a new way around a crawl"
description: CrawlStat now turns a crawl into a branded PDF for your client, renders JavaScript-heavy sites in the browser you already have, and gives every crawl its own page. Here's what changed.
date: 2026-10-26
author: The CrawlStat team
tag: Announcement
readingTime: 4
---

The most common question since launch has been some version of *"how do I send this to my client?"* The answer used to be a CSV and a lot of explaining. This update fixes that, along with a few other things you asked for.

## Client reports

Open a crawl and click the report button in its header. CrawlStat writes the crawl up as a branded A4 PDF, or a self-contained web page, for someone who will never open CrawlStat.

::screenshot{src="/screenshots/report-cover.png" alt="The cover of a CrawlStat client report with a health score and four headline figures" caption="Your name and colour on the cover, and the four figures a client asks about first."}
::

It reads top to bottom, the way you'd explain the crawl in a meeting:

- a **health score** and the headline figures,
- the **written summary** from the Plan tab, if you've had the local model write one,
- **where things stand**: responses, indexable pages, response times and click depth,
- the **action plan**, with how much work each fix is (one template change or page by page),
- **accessibility** barriers against WCAG 2.1 AA,
- and **every issue found**, worst first.

With Pro, and an earlier crawl of the same site, the report also shows **progress**: what was fixed, what is new, and which issues got better or worse. It uses the same matching as [Comparing crawls](/docs/comparing-crawls), so a page that disappeared never counts as fixed.

Client reports are included on the free tier. Everything is made on your machine. See [Client reports](/docs/client-reports) for the details.

## JavaScript rendering

Some sites send an almost empty page and build the content in the browser. CrawlStat used to read only what the server sent, which made those sites look thin and broken.

There's now a **Render JavaScript** switch in the New crawl dialog. Turn it on and each page is run in the Chrome, Edge or Brave you already have before CrawlStat reads it. Nothing extra to install. It's several times slower, so it stays off unless you need it. See [Render JavaScript](/docs/your-first-crawl#render-javascript).

## Every crawl has its own page

The sidebar is simpler. **Projects** lists your crawls, either as recent cards or as one row per site with its health and the history of every crawl. Open one and everything about it is a tab away: Overview, Issues, Pages, Plan, Visualise, UX Testing and Accessibility. **Recrawl** runs it again with the same settings; **Recrawl with changes** opens them pre-filled. See [Projects](/docs/projects).

## Smaller things

- **Pages** (formerly Results) has **lenses** that count the broken, slow, thin and non-indexable pages before you click, and an **Issues** column with each page's worst severity. See [The Pages table](/docs/results-table#lenses).
- **Issues** are now ranked within each severity by what they cost you, with three figures: impact, reach and effort. Issues one template change can fix are marked. See [Issues](/docs/issues).
- The **Plan** tab exports the written report as Markdown, or straight into a client report.
- A new **Monochrome** colour theme sits alongside Ember, Gold on graphite and Graphite in [Settings](/docs/settings).
- **Comparing crawls** is now part of Pro, along with UX Testing.

[Download the latest version](/download) to try it.
