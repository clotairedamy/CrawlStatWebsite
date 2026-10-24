---
title: Watching a crawl
description: What the Crawl screen shows while a crawl runs, what each counter means, and how to pause, resume, stop and pick up an interrupted crawl.
section: Using CrawlStat
order: 4
---

## The Crawl screen

When you start a crawl, CrawlStat opens the **Crawl** screen. This is the live view: counters update as URLs are fetched, and a table shows the newest URLs as they come in.

::screenshot{src="/screenshots/crawl-dark.png" alt="The Crawl screen showing live counters, a speed gauge, a progress bar and a table of recently fetched URLs" caption="A crawl in progress, with live counters, speed and the latest URLs."}
::

The header shows the site's host, a status pill and the start URL. If the crawl was resumed, it says so. It also shows how many URLs were seeded at the start, which includes any URLs from a sitemap.

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

When the audits have run, the **Failed** tile becomes **Issues**, showing the number of errors and warnings found. Click it to go straight to the [Issues screen](/docs/issues).

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

**Live URLs** lists the most recently fetched URLs, newest first, with their status code, title, depth, response time and any error. To keep the screen fast, it holds only the latest 300. Nothing is lost: every URL is in the crawl file, and the [Results](/docs/results-table) screen shows them all.

## Pause, resume and stop

| Action | How | What happens |
| --- | --- | --- |
| **Pause** | Click **Pause**, or press :kbd[⌘Space] (macOS) | New requests stop. Requests already in flight finish. |
| **Resume** | Click **Resume**, or press :kbd[⌘Space] again | The crawl carries on from where it paused. |
| **Stop** | Click **Stop** | Requests in flight finish, then the crawl ends. |

A stopped crawl is still audited (if audits are on), so you get findings for everything fetched so far. The URLs that were still queued stay in the file, and you can carry on later with **Resume** on the [Projects screen](/docs/projects).

When the crawl is over, the header shows **See results**, which takes you to the results table, and **Clear**, which clears the Crawl screen. Clearing doesn't delete anything.

## You can leave the screen

A crawl keeps running when you switch to another screen. While it runs, the **Crawl** item in the sidebar shows a progress ring and a Live or Paused badge, so you can keep an eye on it while you look at other things.

::callout{type="tip"}
You can open **Results** while a crawl is still running to look at what's been fetched so far. When the crawl finishes, click **See results** to load the complete set.
::

## When a crawl is interrupted

CrawlStat keeps its queue in the crawl file and saves results in small batches as it goes. If the app quits or your computer restarts mid-crawl, you lose at most the last few URLs, and those are simply fetched again. Go to **Projects**, find the crawl, and click **Resume**. CrawlStat picks up with the URLs that were still queued, using the same settings and limits the crawl started with.

## Reaching the URL limit

When a crawl reaches its URL limit (your own, or the 500-URL free-tier limit), it stops fetching, finishes up and runs its audits as normal. A warning tells you how many discovered URLs were not crawled. Those URLs are recorded as skipped, so they won't be picked up by **Resume**. To crawl further, start a new crawl with a higher limit, or [upgrade to Pro](/docs/licensing) for unlimited URLs.
