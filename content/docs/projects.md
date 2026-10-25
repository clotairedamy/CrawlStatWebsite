---
title: Projects
description: How CrawlStat stores your crawls, and how to open, resume, remove and delete them from the Projects screen.
section: Using CrawlStat
order: 11
---

## One crawl, one file

Every crawl you run is saved as a single file on your computer, in CrawlStat's `projects` folder. The file holds everything: every URL, its status, headers, titles and links, the crawl's settings and log, the queue of URLs still to fetch, and the audit results.

Files are named after the site and the time the crawl started, for example `example-com-20260224-1432.db`. Each crawl gets a new file, so crawling the same site again never overwrites an earlier crawl.

While a crawl is open you may see two small companion files next to it, with the same name plus a short suffix. They're a normal part of how crawl files are saved, and CrawlStat cleans them up along with the crawl if you delete it.

::callout{type="note"}
Disk use is roughly 2 KB per URL, so a 50,000-URL crawl takes about 100 MB. Turning on **Keep raw HTML** in [Settings](/docs/settings) makes crawl files much bigger.
::

## The Projects screen

**Projects** is where you land when you open CrawlStat. Its header shows how many crawls you have and where they're stored, with **Refresh** and **New crawl** buttons.

::screenshot{src="/screenshots/projects-dark.png" alt="The Projects screen with overview tiles and a grid of recent crawl cards" caption="Overview tiles across the top, then a card for each recent crawl."}
::

### Overview

Four tiles add up figures across your recent crawls: **Crawls**, **URLs crawled**, **Broken URLs** (everything that returned 4xx or 5xx) and **Issues**.

### Recent crawls

Each crawl has a card showing:

- The site, its start URL and when the crawl ran.
- Its state: **Finished**, **Running**, **Paused**, **Stopped** or **Failed**. The crawl you currently have open is marked **Open**.
- A bar showing the mix of 2xx, 3xx, 4xx and 5xx responses and failures.
- Counts of URLs crawled, errors and warnings, and the file size.

Click a card to open that crawl in [Results](/docs/results-table). From there, **Results** and **Issues** in the sidebar show that crawl until you open another.

The list keeps your 20 most recent crawls. If a crawl file has been moved or deleted outside CrawlStat, it drops off the list automatically. Click **Refresh** to re-check.

## Resuming a crawl

If a crawl didn't finish because you stopped it, the app quit, or your computer restarted, its card shows a **Resume** button and tells you how many URLs are still queued.

Click **Resume** and CrawlStat continues from where it left off, on the [Crawl screen](/docs/watching-a-crawl). It uses the settings the crawl originally started with, not your current defaults, and that includes its URL limit.

::callout{type="tip"}
Resuming is safe after a crash. URLs that were in flight when the crawl was interrupted are simply put back in the queue and fetched again.
::

## Removing and deleting

Each card has a **⋯** menu:

| Option | What it does |
| --- | --- |
| **Copy file path** | Copies the full path of the crawl file, for example so you can find it in Finder or back it up. |
| **Remove from list** | Takes the crawl off the Projects screen. The file stays on disk. |
| **Delete crawl file…** | Permanently deletes the crawl file and everything in it, after you confirm. |

::callout{type="warning"}
Deleting a crawl can't be undone. The file is removed from disk, not moved to the Bin. If you might want it later, use **Remove from list** instead, or copy the file somewhere safe first.
::

## Where the files are

| Platform | Crawl folder |
| --- | --- |
| macOS | `~/Library/Application Support/CrawlStat/projects` |
| Windows | `%APPDATA%\CrawlStat\projects` |
| Linux | `~/.local/share/crawlstat/projects` (or `$XDG_DATA_HOME/crawlstat/projects`) |

You'll also find the path in the Projects header, at the bottom of the New crawl dialog, and in [Settings](/docs/settings).

### Backing up and sharing crawls

Because a crawl is one file, you can back it up, archive it, or send it to a colleague by copying the `.db` file. Copy it when CrawlStat isn't using it, so everything has been saved into the main file.

CrawlStat lists the crawls it has run on this machine. There isn't currently a way to open a crawl file from elsewhere from inside the app.
