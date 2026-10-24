---
title: Issues
description: How CrawlStat's 45 audits work, how to read the Issues screen, and how to go from a finding to the URLs that need fixing.
section: Using CrawlStat
order: 6
---

## What the audits do

When a crawl finishes, CrawlStat runs 45 audits over everything it collected: 35 SEO checks and 10 accessibility checks. Each audit looks for one specific problem, such as a broken internal link, a duplicate title or an image without alt text, and records every URL it affects.

Findings come in three severities:

| Severity | Meaning | Examples |
| --- | --- | --- |
| **Errors** | Something is broken. Fix these first. | Server errors, broken internal links, redirect loops, mixed content, links without accessible names |
| **Warnings** | Something is likely hurting you and is worth fixing. | Redirect chains, missing or duplicate titles, missing H1, orphan pages, images missing alt text |
| **Notices** | Worth knowing about, but often intentional. | Noindex pages, canonicalised pages, slow responses, oversized images, pages buried deep in the site |

Audits are smart about context. For example, CrawlStat works out once whether each page can be indexed, and checks like title length are only applied to pages that can. You won't be told off for the title of a page that says `noindex`.

## The Issues screen

Open **Issues** from the sidebar. The header sums up the crawl, for example "3 errors, 12 warnings, 9 notices".

::screenshot{src="/screenshots/issues-dark.png" alt="The Issues screen with a list of issues grouped by severity on the left and the details of the selected issue on the right" caption="Issues grouped by severity, with an explanation and fix for the selected one."}
::

**On the left** is every issue the crawl has, grouped under **Errors**, **Warnings** and **Notices**. Each group shows a count, and each issue shows how many URLs it affects.

**On the right** is the selected issue:

- Its severity and the number of URLs affected.
- A description of the problem and why it matters.
- A **How to fix** box with practical advice. It's the same text as the issue's page in these docs.
- Three actions:
  - **Show N URLs** opens the [results table](/docs/results-table) on the Internal tab, filtered to just the affected URLs.
  - **Export affected** saves the affected URLs to a CSV file.
  - **Copy docs link** copies a link to the issue's page on crawlstat.com, which is handy for sending to a developer.

## From issue to fix

A typical workflow:

::steps
1. Start with **Errors**. Select an issue and read the description and **How to fix**.
2. Click **Show N URLs** to see the affected pages in the results table.
3. Click a URL to open the detail panel. Its **Issues** tab lists everything wrong with that page. For link problems, its **Inlinks** tab shows which pages link to it.
4. Fix the problem on your site, or export the list and hand it to whoever can.
5. Crawl again to confirm the fix.
::

::callout{type="tip"}
For broken links, the URL that's broken is rarely the page you need to edit. Open the broken URL's **Inlinks** tab to find the pages that link to it, and fix the links there.
::

## Re-running the audits

Click **Re-run audits** in the header to run every audit again over the open crawl. The button shows "Auditing…" while it works. Re-running doesn't fetch anything from the site. It re-reads what's already in the crawl file.

This is useful in two situations:

- **You turned off "Run audits when a crawl finishes"** in [Settings](/docs/settings). The Issues screen will be empty until you run them.
- **You've updated CrawlStat.** The checks are built into the app rather than stored in the crawl file, so re-running the audits on an old crawl gives you the newest version of every check.

If a crawl has no issues listed, the screen says **No issues found**: either the site is in good shape, or the audits haven't run yet. Click **Run the audits** to make sure.

## Exporting issues

- **Export CSV** in the header exports a summary with one row per issue: its name, severity, number of URLs affected, description, how to fix it, and a link to its docs page. It makes a ready-made to-do list.
- **Export affected** on a single issue exports that issue's URLs, along with a detail column (for example, how many hops a redirect chain has).

Files go to your export folder (Downloads by default), just like [results exports](/docs/results-table#exporting-to-csv).

## Thresholds

A few audits use thresholds. These are the defaults:

| Audit | Flagged when |
| --- | --- |
| [Titles too short](/docs/audits/titles-too-short) / [too long](/docs/audits/titles-too-long) | Under 30 or over 60 characters |
| [Meta descriptions too short](/docs/audits/meta-descriptions-too-short) / [too long](/docs/audits/meta-descriptions-too-long) | Under 70 or over 155 characters |
| [Redirect chains](/docs/audits/redirect-chains) | More than 2 redirects in a row |
| [Slow server response](/docs/audits/slow-server-response) | Over 1 second |
| [Oversized images](/docs/audits/oversized-images) | Over 100 KB |
| [Crawl depth](/docs/audits/crawl-depth) | More than 5 clicks from the start URL |

Character limits for titles and descriptions are a guide. Search engines actually truncate by pixel width, which varies with the characters used.

## A few notes on specific audits

- **[Near-duplicate content](/docs/audits/near-duplicate-content)** compares pages by their text. Pages with fewer than 200 words are skipped, because the comparison is unreliable on thin content. Exact duplicates of any length are still caught by [Duplicate content](/docs/audits/duplicate-content).
- **[Orphan pages](/docs/audits/orphan-pages)** are pages CrawlStat knows about, usually from your sitemap, that nothing on the site links to. Orphan detection relies on reading the sitemap, so it works best on a full Spider crawl of a site that publishes one.
- **[Oversized images](/docs/audits/oversized-images)** needs images to be crawled so it knows their real sizes. Image crawling is on by default.
- **[Pages blocked by robots.txt](/docs/audits/pages-blocked-by-robots-txt)** lists URLs that your own pages link to, but that robots.txt stops CrawlStat (and search engines) from fetching.

## Every audit

Each audit has its own page with a full explanation and fix. A few to start with:

- Errors: [Server errors (5xx)](/docs/audits/server-errors-5xx), [Client errors (4xx)](/docs/audits/client-errors-4xx), [Broken internal links](/docs/audits/broken-internal-links), [Redirect loops](/docs/audits/redirect-loops), [Mixed content](/docs/audits/mixed-content)
- Warnings: [Missing page titles](/docs/audits/missing-page-titles), [Duplicate page titles](/docs/audits/duplicate-page-titles), [Missing H1](/docs/audits/missing-h1), [Images missing alt text](/docs/audits/images-missing-alt-text)
- Accessibility: [Links without accessible names](/docs/audits/links-without-accessible-names), [Form fields without labels](/docs/audits/form-fields-without-labels), [Pages without a language](/docs/audits/pages-without-a-language)
