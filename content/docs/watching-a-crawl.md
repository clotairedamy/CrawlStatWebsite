---
title: Watching a crawl
description: What a crawl's Overview shows while it runs, what each counter means, and how to pause, resume, stop and pick up an interrupted crawl.
section: Using CrawlStat
order: 4
---

## The live view

When you start a crawl, CrawlStat opens that crawl's page on its **Overview** tab. While the crawl runs, the Overview is the live view, titled **Progress**: counters update as URLs are fetched, and a table shows the newest URLs as they come in. When the crawl is over, the Overview turns into the crawl's summary. See [Projects](/docs/projects#a-crawls-page) for the rest of the page.

::screenshot{src="/screenshots/crawl-progress.png" alt="A crawl in progress: six counters, a speed gauge at 10.7 URLs a second, a progress bar and a live table of fetched URLs with status codes and response times" caption="37 pages in, 742 discovered, 10.7 a second. Every URL lands in the live table the moment it answers."}
::

Under **Progress** you'll see a status pill and the start URL. If the crawl was resumed, it says so. It also shows how many URLs were seeded at the start, which includes any URLs from a sitemap.

The status pill is one of:

| Status | Meaning |
| --- | --- |
| **Starting** | Reading robots.txt and sitemaps and seeding the queue. |
| **Crawling** | Fetching URLs. |
| **Paused** | Waiting for you to resume. Nothing is being fetched. |
| **Auditing** | The crawl is over and the audits are running. |
| **Finished** | Everything is done. |
| **Stopped** | You stopped the crawl before it finished. |
| **Failed** | Something went wrong. The error is shown at the top of the screen. |

## The counters

The tiles along the top count every URL the crawl knows about:

- **Crawled:** fetched and stored.
- **Queued:** waiting to be fetched.
- **Discovered:** every URL the crawl knows about so far, fetched or not.
- **Client errors:** URLs that returned a 4xx status, such as 404 Not Found.
- **Server errors:** URLs that returned a 5xx status, such as 500 or 503.
- **Failed:** URLs that couldn't be fetched at all, for example because of a timeout, a DNS failure or a refused connection.

When the audits have run, the **Failed** tile becomes **Issues**, showing the number of errors and warnings found. Click it to go straight to the [Issues](/docs/issues) tab.

## Speed and progress

The progress card shows:

- **URL/s:** a gauge of how many URLs per second are being fetched, scaled against the fastest rate seen so far in this crawl.
- **A progress bar.** Early on, CrawlStat can't know how big the site is, so the bar is indeterminate and says it's finding the size of the site. Once it has a sense of scale, it shows a percentage of what's known. That percentage can go down as new links are discovered. This is normal, because the site keeps getting bigger as CrawlStat finds more of it.
- **Readouts** for Discovered, Queued, In flight (requests happening right now), Elapsed time and Peak speed.

Speed depends mostly on the server and your connection. With the default of 5 simultaneous requests and no delay, expect tens of URLs per second from a typical site. A delay between requests, or a Crawl-delay in the site's robots.txt, slows things down on purpose. See [Settings](/docs/settings).

## Warnings

If anything unusual happens, a **Warnings** panel appears. It's collapsed by default, so click it to expand. Typical warnings include a sitemap that couldn't be fetched, a URL in a pasted list that couldn't be used, a redirect loop, or reaching your URL limit.

The panel shows the most recent 100 warnings. Every warning is also written to the crawl's own log inside the crawl file.

## The live table

**Live URLs** lists the most recently fetched URLs, newest first, with their status code, title, depth, response time and any error. To keep the screen fast, it holds only the latest 300. Nothing is lost: every URL is in the crawl file, and the [Pages](/docs/results-table) tab shows them all.

## Pause, resume and stop

| Action | How | What happens |
| --- | --- | --- |
| **Pause** | Click **Pause**, or press :kbd[⌘Space] (macOS) | New requests stop. Requests already in flight finish. |
| **Resume** | Click **Resume**, or press :kbd[⌘Space] again | The crawl carries on from where it paused. |
| **Stop** | Click **Stop** | Requests in flight finish, then the crawl ends. |

A stopped crawl is still audited (if audits are on), so you get findings for everything fetched so far. The URLs that were still queued stay in the file, and you can carry on later with **Resume** on the [Projects screen](/docs/projects).

When the crawl is over, the live view offers:

- **See pages**, which opens the complete [Pages table](/docs/results-table).
- **Compare with previous crawl**, if you've crawled the same site before. It opens the comparison straight away. See [Comparing crawls](/docs/comparing-crawls).
- **Clear**, which clears the live view. Clearing doesn't delete anything.

## You can leave the screen

A crawl keeps running when you switch to another tab, another crawl or another screen. While it runs, the sidebar gains a tile for it, under **Projects**, with the site's name, a progress ring and a **Live** or **Paused** badge. Click it to come back to the crawl from wherever you are.

::callout{type="tip"}
You can open the **Pages** tab while a crawl is still running to look at what's been fetched so far. When the crawl finishes, click **See pages** to load the complete set.
::

## When a crawl is interrupted

CrawlStat keeps its queue in the crawl file and saves results in small batches as it goes. If the app quits or your computer restarts mid-crawl, you lose at most the last few URLs, and those are simply fetched again. Go to **Projects**, find the crawl, and click **Resume** (or open the crawl and use **Resume** in its header). CrawlStat picks up with the URLs that were still queued, using the same settings and limits the crawl started with.

## Reaching the URL limit

When a crawl reaches its URL limit (your own, or the 500-URL free-tier limit), it stops fetching, finishes up and runs its audits as normal. A warning tells you how many discovered URLs were not crawled. Those URLs are recorded as skipped, so they won't be picked up by **Resume**. To crawl further, start a new crawl with a higher limit, or [upgrade to Pro](/docs/licensing) for unlimited URLs.
