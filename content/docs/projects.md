---
title: Projects
description: How CrawlStat stores your crawls, and how to browse, open, recrawl, compare, resume and delete them from the Projects screen.
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

**Projects** is where you land when you open CrawlStat, and the first item in the sidebar. Its header shows how many crawls you have and where they're stored, with **Refresh** and **New crawl** buttons.

::screenshot{src="/screenshots/projects-dark.png" alt="The Projects screen with overview tiles and a grid of recent crawl cards" caption="Overview tiles across the top, then your recent crawls."}
::

### Overview

Four tiles add up figures across your recent crawls: **Crawls**, **URLs crawled**, **Broken URLs** (everything that returned 4xx or 5xx) and **Issues**.

### Two views

Below the tiles, a bar holds a **Filter by site…** field and a toggle between two views. CrawlStat remembers the one you picked.

**Cards** (titled **Recent crawls**) show one card per crawl, newest first:

- The site, its start URL and its state: **Finished**, **Running**, **Paused**, **Stopped** or **Failed**. The crawl you have open is marked **Open**.
- A health ring with the share of URLs that answered with a success or a redirect, and a verdict: **Healthy**, **Some problems**, **Needs work** or **Not started**.
- **Crawled**, **Errors**, **Warnings** and the file **Size**.
- A **Compare** button and either **Resume** (for a crawl that didn't finish, with how many URLs are still queued) or **Recrawl**.

**One row per site** (titled **Sites**) groups every crawl of the same site into a single row. `www.` and the bare domain count as one site. The columns are:

| Column | What it shows |
| --- | --- |
| **Site** | The site and its latest start URL. |
| **Health** | The latest crawl's health, and how many points it moved since the crawl before. |
| **Responses** | The mix of 2xx, 3xx, 4xx and 5xx answers and failures in the latest crawl, with a caption in plain words. |
| **History** | A bar for each crawl of the site, oldest to newest, so a trend is visible at a glance. Click a bar to open that crawl. |
| **Crawled** | URLs crawled in the latest crawl. |
| **Issues** | Errors and warnings in the latest crawl. |
| **Last crawl** | When the site was last crawled. |

Click a column header to sort by it, and again to reverse. Click the chevron at the end of a row (**Show earlier crawls**) to list every crawl of that site underneath it.

Click a card or a row to open that crawl's page (see below). The list keeps your 20 most recent crawls. If a crawl file has been moved or deleted outside CrawlStat, it drops off the list automatically. Click **Refresh** to re-check.

## A crawl's page

Opening a crawl takes you to its own page. The header says which crawl it is: the site, its state, and a line with the start URL, when it ran, how many URLs it crawled, how healthy it is and the file size. **All projects** (the back arrow) returns to Projects.

The header's buttons work on this crawl:

- **Export a client report:** a branded PDF or web page, once the crawl has finished. See [Client reports](/docs/client-reports).
- **Compare:** compare this crawl with another. See below.
- **Resume** or **Recrawl**, as on its card.

Below the header are the crawl's tabs:

| Tab | What it's for |
| --- | --- |
| **Overview** | While the crawl runs, its live progress ([Watching a crawl](/docs/watching-a-crawl)). Afterwards, its health, an accessibility verdict, Crawled, Broken, Errors and Warnings, and the top issues. |
| **Issues** | Every problem found, ranked, with why it ranks and which pages it affects. See [Issues](/docs/issues). |
| **Pages** | Every URL, in a table you can filter, sort and export. See [The Pages table](/docs/results-table). |
| **Plan** | What to fix first, and a written report. See [The plan](/docs/the-plan). |
| **Visualise** | How the site is structured: which sections hold the pages, and which link to which. |
| **UX Testing** | Test a page against what it's for. See [UX Testing](/docs/ux-testing). |
| **Accessibility** | The site against WCAG. See [Accessibility](/docs/accessibility). |

The accessibility check starts in the background as soon as you open a finished crawl, so its verdict is usually waiting on the Overview by the time you look.

If a crawl stopped before finishing, the Overview says how many URLs are still queued and suggests resuming it.

## Recrawling

**Recrawl** (on a card, in a crawl's header, or in the **⋯** menu) crawls the site again with exactly the same settings: the same mode, start URL, limits, patterns and JavaScript rendering. It writes a new crawl file, so the earlier crawl is kept for comparison.

**Recrawl with changes…** in the **⋯** menu opens the [New crawl dialog](/docs/your-first-crawl) filled in with the earlier crawl's settings, with a summary that starts "As before:". Change what you need, then start it.

## Comparing from Projects

The **Compare** button lists the crawls you can compare this one with. Crawls of the same site come first, with the one just before it marked **Previous crawl**; crawls of other sites follow. Pick one and the comparison runs straight away, with the older crawl on the left. See [Comparing crawls](/docs/comparing-crawls). Comparing crawls is part of [Pro](/docs/licensing).

## Resuming a crawl

If a crawl didn't finish because you stopped it, the app quit, or your computer restarted, its card shows a **Resume** button and tells you how many URLs are still queued.

Click **Resume** and CrawlStat continues from where it left off. It uses the settings the crawl originally started with, not your current defaults, and that includes its URL limit.

::callout{type="tip"}
Resuming is safe after a crash. URLs that were in flight when the crawl was interrupted are simply put back in the queue and fetched again.
::

## Removing and deleting

On the Projects screen, each crawl has a **⋯** menu:

| Option | What it does |
| --- | --- |
| **Recrawl** | Crawls the site again with the same settings, into a new file. |
| **Recrawl with changes…** | Opens the New crawl dialog with this crawl's settings filled in. |
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
