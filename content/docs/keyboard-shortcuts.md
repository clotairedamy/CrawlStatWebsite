---
title: Keyboard shortcuts
description: The keyboard shortcuts CrawlStat supports, where each one works, and a note for Windows and Linux users.
section: Using CrawlStat
order: 13
---

## Shortcuts

CrawlStat is built to be usable from the keyboard, especially the Pages table, where you'll spend most of your time.

### Anywhere in the app

| Shortcut | Action |
| --- | --- |
| :kbd[⌘N] | Start a new crawl (opens the New crawl dialog) |
| :kbd[⌘Space] | Pause the running crawl, or resume a paused one |

:kbd[⌘Space] works from any screen, so you can pause a crawl without going back to it. If no crawl is running or paused, it does nothing.

### In the Pages table

| Shortcut | Action |
| --- | --- |
| :kbd[⌘F] | Jump to the **Filter by URL…** box |
| :kbd[⌘E] | Export the current tab and filter to CSV |
| :kbd[Esc] | Close the URL detail panel |
| :kbd[↑] / :kbd[↓] | Move up or down one row |
| :kbd[PgUp] / :kbd[PgDn] | Move up or down 20 rows |
| :kbd[Home] / :kbd[End] | Jump to the first or last row |

Click the table once to give it focus before using the arrow keys. As you move, the URL detail panel follows the selected row, so you can step through pages and read each one's details without using the mouse.

### In the New crawl dialog

| Shortcut | Action |
| --- | --- |
| :kbd[Enter] | Start the crawl (from the Start URL or Sitemap URL field) |

In **List** mode, :kbd[Enter] adds a new line to the URL list instead. Click **Start crawl** when you're ready.

## Windows and Linux

The shortcuts above are shown with the macOS :kbd[⌘] key. In the current version, CrawlStat binds them to the same physical modifier on every platform, which on Windows and Linux is the Windows key (called Super on most Linux desktops), not :kbd[Ctrl].

Some of those combinations are reserved by the operating system. For example, Windows uses :kbd[Win+E] to open File Explorer and :kbd[Win+Space] to switch keyboard layouts. If a shortcut doesn't work, use the button on screen instead: **New crawl** (the **+** in the sidebar), **Pause** / **Resume** in the crawl's live view, **Export CSV** in the Pages header, or click into the filter box.

The arrow keys, :kbd[PgUp], :kbd[PgDn], :kbd[Home], :kbd[End], :kbd[Esc] and :kbd[Enter] work the same on every platform.

::callout{type="note"}
The **New crawl** button's tooltip shows :kbd[Ctrl+N] on Windows and Linux. In the current version, that combination doesn't open the dialog, so click the button instead.
::

## Mouse and pointer

A few things that are quicker with the mouse:

- **Sort** by clicking a column header. Click again to reverse.
- **Resize** a column by dragging the edge of its header.
- **Collapse the sidebar** to icons with the button at the bottom of the sidebar. On narrow windows it collapses automatically.

## See also

- [The Pages table](/docs/results-table)
- [Watching a crawl](/docs/watching-a-crawl)
- The **Keyboard** section of [Settings](/docs/settings) lists the shortcuts inside the app.
