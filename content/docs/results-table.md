---
title: The Pages table
description: Find your way around a crawl's Pages tab, including its eleven tabs, the lenses, the filter bar, sorting, choosing columns, the URL detail panel, and exporting to CSV.
section: Using CrawlStat
order: 5
---

## Overview

The **Pages** tab of a crawl shows every URL it found. (Earlier versions called it **Results**, with its own place in the sidebar.) It's a table you can sort, filter and export, split into tabs that each focus on one part of the site, such as titles, canonicals or images.

::screenshot{src="/screenshots/results-dark.png" alt="The Pages table with the Internal tab open, a filter bar, and a table of URLs with status codes, titles and link scores" caption="The Pages table. Click any row to see everything CrawlStat knows about that URL."}
::

The table reads directly from the crawl file on disk and loads rows as you scroll, so it stays fast whether the crawl has 500 URLs or 500,000. The header shows how many rows the current tab contains, followed by "matching the filter" when a filter is active.

Pages is available as soon as a crawl is open. If you open it while a crawl is running, you'll see what's been fetched so far. Use **See pages** in the live view when it finishes to load the full set.

## The tabs

Each tab shows a subset of URLs with the columns that suit it:

| Tab | Shows | Default columns |
| --- | --- | --- |
| **Internal** | Every URL on the site: pages, images and documents | Code, URL, Indexability, Title, Words, Depth, Inlinks, Score, Size, Time |
| **External** | Links to other sites, checked once for their status | Code, URL, Type, Inlinks, Time |
| **Response codes** | Internal URLs, sorted by status code | Code, Final, URL, Hops, Type, Time, Error |
| **Titles** | Internal HTML pages | Code, URL, Title, Length, Indexability |
| **Meta description** | Internal HTML pages | Code, URL, Meta description, Length, Indexability |
| **H1** | Internal HTML pages | Code, URL, H1, H1s, Words |
| **Canonicals** | Internal HTML pages | Code, URL, Canonical, Self, Indexability |
| **Hreflang** | Internal HTML pages | Code, URL, Lang, Canonical, Indexability |
| **Structured data** | Internal HTML pages | Code, URL, Structured data, Indexability |
| **Images** | Images, on your site or elsewhere, sorted by size | Code, URL, Size, Type, Inlinks |
| **Documents** | PDFs and other linked documents | Code, URL, Size, Type, Inlinks |

Images and documents only appear if they were crawled. Both are on by default in [Settings](/docs/settings).

## Lenses

Under the tabs, a strip of lenses asks the common questions of the pages, each with its answer already counted, so you can see how many pages are slow before you click:

| Lens | Keeps |
| --- | --- |
| **All rows** | Everything in the tab. |
| **Has issues** | URLs with at least one audit finding. |
| **Broken** | URLs that returned 4xx or 5xx, or couldn't be fetched. |
| **Redirects** | URLs that redirect. |
| **Slow** | Responses that took a second or more. |
| **Title problems** | Pages whose title is missing or outside 30–60 characters. |
| **Description problems** | Pages whose meta description is missing or outside 70–155 characters. |
| **Thin content** | Pages with fewer than 200 words. |
| **Not indexable** | Pages a search engine can't index. |

Click a lens to narrow the table to it, and **All rows** to go back. The counts are worked out within the current tab and filter, and a lens with nothing in it stays visible: zero broken pages is worth knowing.

## What the columns mean

| Column | Meaning |
| --- | --- |
| **Code** | The HTTP status the URL itself returned. A redirect shows its 3xx code here. It's coloured green for 2xx, amber for 3xx, red for 4xx and 5xx, and grey when there was no response at all. |
| **Final** | The status at the end of the redirect chain. Hidden by default. |
| **URL** | The address, exactly as CrawlStat fetched it. |
| **Indexability** | Whether a search engine could index the page and, if not, why not: blocked by robots.txt, redirected, an error status, noindex (in a meta tag or an `X-Robots-Tag` header), or a canonical pointing at another URL. It's worked out when the audits run, and applies to internal HTML pages only. |
| **Title** / **Length** | The page title, and its length in characters as a small gauge against the recommended range (30–60). |
| **Meta description** / **Length** | The meta description, and its length as a gauge against 70–155. |
| **Issues** | How many audit findings the URL has, with a dot coloured by the worst one. |
| **H1** / **H1s** | The first H1 heading and how many H1s the page has. |
| **Canonical** | The canonical URL the page declares. |
| **Self** | Whether the canonical points at the page itself. "no" is shown in amber when it points somewhere else. |
| **Lang** | The `lang` attribute on the page's `<html>` element. |
| **Structured data** | The structured data types found on the page. |
| **Words** | The word count of the page's text, not counting scripts and styles. |
| **Depth** | Clicks from the start URL. |
| **Inlinks** | References from other pages on the site. |
| **Outlinks** | Links from this page. Hidden by default. |
| **Score** | The internal link score, from 0 to 100 (see below). |
| **Hops** | Redirects traversed. It turns amber above 2. |
| **Type** | The content type the server reported. |
| **Size** | The response size. |
| **Time** | The response time. It turns amber above one second. |
| **Error** | Why a URL couldn't be fetched, for example a timeout or a connection failure. |

Hover over a column header to see a short description.

### Link score

**Score** shows how much internal linking points at a page compared with the rest of the site. CrawlStat runs a PageRank-style calculation over the followed internal links between your HTML pages that returned 200, then rescales it so the strongest page scores 100. It's calculated when the audits run. A low score on a page you care about usually means it needs more, or more prominent, internal links.

### Redirects

CrawlStat follows redirects one hop at a time and records each step, so chains and loops are visible rather than hidden. **Code** is what the URL you linked to returned, **Final** is where the chain ended, and **Hops** is how many redirects it took to get there. The full chain is shown in the URL detail panel.

## Filtering

The filter bar sits above the table:

- **Filter by URL…** keeps only the URLs that contain what you type, anywhere in the address. It isn't case-sensitive. Press :kbd[⌘F] (macOS) to jump to it.
- **2xx, 3xx, 4xx, 5xx** keep only URLs with a status in that range. Click the chip again to clear it. URLs that couldn't be fetched have no status code, so they don't appear under any of these chips.
- **Issue: …** appears when you've come from the [Issues](/docs/issues) tab with **Show all N in Pages**. It limits the table to the URLs affected by that issue. Click × to remove it.
- **Clear all** removes every filter at once.

Filters stay in place when you switch tabs, so you can, for example, filter to `/blog/` and then look at Titles, then H1, then Canonicals for just those pages.

If nothing matches, the table says **Nothing matches** and offers a **Clear filter** button.

## Sorting

Click a column header to sort by it, and click again to reverse the order. You can sort by Code, URL, Title, both Length columns, Issues, Words, Depth, Inlinks, Score, Size and Time. Sorting happens in the crawl file, so it covers every row, not just the ones on screen.

## Choosing columns

Use the column chooser in the header to show or hide columns. Every column is available on every tab, so you can add **Score** to the Titles tab or **Final** to the Internal tab. Your choices apply to that tab only. Drag the edge of a column header to resize it.

::callout{type="note"}
Column choices and widths last for the current session. They reset to the defaults when you restart CrawlStat.
::

## The URL detail panel

Click a row to open the detail panel on the right. You can also move through the rows with the arrow keys, and the panel follows the selected row. Press :kbd[Esc] or click the close button to hide it.

The panel's header shows the status, whether the page is indexable, and the full URL. Use **Copy URL** to copy the URL. Below that are six tabs:

| Tab | What's in it |
| --- | --- |
| **Overview** | The redirect chain (if any), title and its length, meta description, H1 and count, canonical, meta robots, language, structured data, content type, size, response time, word count, crawl depth, inlinks, outlinks (internal and external), link score and any error. |
| **Issues** | Every audit finding for this URL. |
| **Inlinks** | Every page that links here, with the anchor text, the kind of link, where it sits on the page, and whether it's nofollow. |
| **Outlinks** | Every link on this page, with the same details. |
| **Images** | Images on the page, with their alt text, size and declared dimensions. Missing alt attributes are flagged, and an empty `alt=""` is shown as decorative. |
| **Headers** | The HTTP response headers CrawlStat stored for this URL. |

If a page has no inlinks, the Inlinks tab tells you it's an orphan: nothing on the site links to it. It was probably found through the sitemap.

## Keyboard

| Key | Action |
| --- | --- |
| :kbd[↑] :kbd[↓] | Move one row |
| :kbd[PgUp] :kbd[PgDn] | Move 20 rows |
| :kbd[Home] :kbd[End] | Jump to the first or last row |
| :kbd[⌘F] | Focus the filter |
| :kbd[⌘E] | Export the current table |
| :kbd[Esc] | Close the detail panel |

See [Keyboard shortcuts](/docs/keyboard-shortcuts) for the full list, including notes for Windows and Linux.

## Exporting to CSV

Click **Export CSV**, or press :kbd[⌘E] (macOS). The export contains **every row the current tab and filter match**, not just the rows you've scrolled past. It's a quick way to get, for example, every 4xx image or every page in `/blog/` with a missing H1.

CrawlStat writes the file straight to your export folder (your Downloads folder by default) with a name like:

```text
crawlstat-internal-2026-02-24-143210.csv
```

A message confirms how many rows were exported, with a button to show the file in Finder or your file manager. You can see the export folder at the bottom of [Settings](/docs/settings).

CSV export is included on the free tier. To hand the findings to a client rather than a spreadsheet, [export a client report](/docs/client-reports).

## Tips

- **Find broken links fast:** on the Internal tab, click the **Broken** lens, then open a row's **Inlinks** to see which pages link to it.
- **Find the pages with the most problems:** click the **Has issues** lens and sort by **Issues**.
- **Find redirecting links:** on Response codes, click **3xx** and sort by **Hops**.
- **Find heavy images:** on the Images tab, click the **Size** header until the largest files come first.
- **Find weakly linked pages:** on Internal, sort by **Score** in ascending order.
