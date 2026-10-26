---
title: Client reports
description: Turn a crawl into a branded PDF or web page for someone who will never open CrawlStat — health, a ranked action plan, accessibility, progress since last time, and every issue.
section: Using CrawlStat
order: 10.5
---

## What it is

A client report is a crawl written up for someone who will never open CrawlStat: a client, a manager, a developer on another team. It's one file, either an A4 PDF or a self-contained web page, with your name on the cover and your colour throughout.

::screenshot{src="/screenshots/report-cover.png" alt="The cover of a CrawlStat client report: the site name, a health score, four headline figures and the name of the agency that prepared it" caption="The cover: the site, its health, the headline figures and who it's from."}
::

Exporting a report is included on the free tier. The only part that needs [Pro](/docs/licensing) is the progress section, because it compares two crawls.

## Exporting one

::screenshot{src="/screenshots/export-report-dialog.png" alt="The Export report dialog with a live cover preview, a Prepared by field, brand colour swatches, PDF or Web page, and a progress option" caption="Add your name, pick a colour, choose PDF or web page. The cover updates as you go."}
::

Open the crawl, then either:

- Click the report button in the crawl's header (its tooltip reads **Export a client report**), or
- On the [Plan](/docs/the-plan) tab, click **Export PDF** under the written report.

Both open the **Export report** dialog. A small sketch of the cover updates as you fill it in.

| Option | What it does |
| --- | --- |
| **Prepared by** | Your name or agency, printed on the cover. Optional. |
| **Brand colour** | The accent used for headings, figures and charts. Pick a swatch (Indigo, Ember, Ocean, Teal, Forest, Rose or Graphite) or type any hex colour, such as `#0F9F8F`. |
| **Format** | **PDF**: A4, ready to attach or print. **Web page**: one self-contained file that opens in any browser and prints to A4 from there. |
| **Include the written report** | Only offered once you've written one on the Plan tab. It goes in as a summary page straight after the cover. |
| **Include progress since the last crawl** | Only offered when you've crawled the same site before. On by default with Pro. |

CrawlStat remembers your name and colour for next time. Click **Export** and the file is saved to your export folder (Downloads by default), named after the site, for example `report-example-com.pdf`, and opened straight away.

::callout{type="note"}
The PDF is drawn by a browser you already have: Chrome, Edge or Brave. If CrawlStat can't find one, the PDF option is greyed out and **Web page** is selected instead. The web page prints to the same A4 layout from any browser's **Print** dialog.
::

## What's in it

The report reads top to bottom, the same way you'd explain the crawl in a meeting. Sections are numbered in order; the ones you leave out simply aren't there.

### Cover

The site, the date of the crawl, a health score (the share of crawled URLs that answered with a success or a redirect) with a one-line verdict, and four figures: **URLs crawled**, **Broken or failed**, **Pages with issues** and **Link value at risk** (the share of internal link value sitting on pages with errors). If the crawl [rendered JavaScript](/docs/your-first-crawl#render-javascript), the cover says so.

### Summary

If you included the written report, it comes next, exactly as the local model wrote it on the Plan tab. See [Local AI](/docs/local-ai).

::screenshot{src="/screenshots/report-summary.png" alt="The summary page of a client report, with a written overview of the site's state and its three most important problems" caption="The written report, set as a summary page after the cover."}
::

### Overview: where things stand

How the URLs answered, how many kinds of error, warning and notice were found, how many pages can appear in search results (and why the rest can't), the median response time, and how many clicks pages sit from the home page.

### Action plan: what to fix first

The top of [the plan](/docs/the-plan), in order. Each job shows its impact score, how many pages it touches, how much work it is (one template change, a batch, or page by page), how to fix it, and a few example URLs.

::screenshot{src="/screenshots/report-plan.png" alt="The action plan section of a client report: ranked jobs with impact bars, page counts, effort labels and fix instructions" caption="The action plan: what to fix first, and how much work each job is."}
::

### Progress: since the last crawl

With Pro, when you've crawled the site before: how many issue instances were fixed, how many are new, and which issues got better or worse. It uses the same rules as [Comparing crawls](/docs/comparing-crawls), so a page that simply disappeared never counts as fixed.

::screenshot{src="/screenshots/report-progress.png" alt="The progress section of a client report: fixed and new counts, pages with issues before and after, and a list of issues that got better" caption="Progress since the previous crawl of the same site."}
::

### Accessibility: against WCAG 2.1 AA

The [accessibility check](/docs/accessibility)'s verdict, then the biggest barriers: what each one is, how many pages it affects, and how to fix it.

### Appendix: every issue found

Every kind of issue in the crawl, worst first, with how many pages it affects. The full lists of URLs stay in CrawlStat; use **Export affected** on the [Issues](/docs/issues) tab when a developer needs them.

The report closes with a short note on how it was made: that every figure comes from one crawl, that impact scores aren't a traffic forecast, and that automated accessibility checks don't replace a person.

## Tips

- **Recrawl before you send.** The report describes the crawl you have open. If you've fixed things since, use **Recrawl** on the [Projects](/docs/projects) screen first, and the report gains a progress section.
- **Write the summary yourself if you prefer.** The written report is optional. Without it, the report starts at the overview.
- **Need the raw data too?** CSV exports from the [Pages](/docs/results-table#exporting-to-csv) and [Issues](/docs/issues#exporting-issues) tabs sit happily alongside a report.
