---
title: Your first crawl
description: Start a crawl from the New crawl dialog, choose between Spider, Sitemap and List modes, render JavaScript for script-built sites, and use limits and URL patterns to crawl exactly what you need.
section: Start here
order: 3
---

## Open the New crawl dialog

::screenshot{src="/screenshots/new-crawl-dark-ember.png" alt="The New crawl dialog in dark mode: Spider, Sitemap and List modes, a start URL, a URL limit, maximum depth and a Render JavaScript switch" caption="Pick a mode, paste a URL, press Start. Everything else has a sensible default."}
::

There are three ways to open it:

- Click **New crawl**: the **+** at the top of the sidebar, or the button in the Projects header.
- Press :kbd[⌘N] on macOS. See [Keyboard shortcuts](/docs/keyboard-shortcuts) for Windows and Linux.
- On the Projects screen, when you have no crawls yet, click **Start your first crawl**.

The dialog has a mode selector at the top, an address field, two limits, a **Render JavaScript** switch and, under **More options**, URL patterns.

::callout{type="tip"}
To crawl a site again with the same settings, you don't need this dialog: use **Recrawl** on its card in [Projects](/docs/projects). **Recrawl with changes…** opens this dialog filled in with the earlier crawl's settings.
::

## Choose a mode

| Mode | What it does | Use it when |
| --- | --- | --- |
| **Spider** | Starts at one URL and follows links outwards across the site. | You want to see a site the way a search engine discovers it. This is the usual choice. |
| **Sitemap** | Starts from every URL a sitemap declares, then follows links from those pages. | You want to make sure everything you've told search engines about is crawled, for example to find sitemap URLs that redirect or return errors. |
| **List** | Fetches exactly the URLs you paste, and nothing else. | You have a specific set of pages to check, such as URLs from a migration spreadsheet. |

### Spider

Type a **Start URL**. You can leave out the scheme: `example.com` works, as does `https://www.example.com/blog/`. CrawlStat crawls outwards from there, staying on the same site. `www.` and the bare domain count as the same site. Subdomains such as `blog.example.com` are left out unless you turn on **Crawl subdomains** in [Settings](/docs/settings).

Links to other sites are checked once to see whether they work, but never followed.

If the site's robots.txt advertises a sitemap, CrawlStat reads that too and adds its URLs to the crawl. That's how it finds pages that are in your sitemap but that nothing links to (see [Orphan pages](/docs/audits/orphan-pages)).

### Sitemap

Type a **Sitemap URL**, for example `https://example.com/sitemap.xml`. Sitemap indexes, which list other sitemaps, are followed. Gzipped sitemaps (`.xml.gz`) are handled too. Every URL in the sitemap is queued, and links found on those pages are followed as in a Spider crawl.

### List

Paste your URLs into **URLs to fetch**, one per line. Blank lines are ignored. In this mode links aren't followed: CrawlStat records what each page links to but doesn't crawl those links. Redirects are still followed, so you can see where each URL ends up.

If some lines aren't usable URLs, CrawlStat skips them and lists them as warnings on the Crawl screen. If none of them are usable, the crawl won't start and the dialog tells you why.

## Set limits

Both limits are optional:

- **URL limit:** the most URLs the crawl will fetch. Leave it blank for no limit.
- **Maximum depth:** how many clicks from the start URL the crawl will go. The start URL is depth 0, pages it links to are depth 1, and so on. Leave it blank for no limit.

A depth limit is a quick way to sample a large site: a depth of 3 shows you the pages that matter most to its navigation.

::callout{type="note"}
On the free tier, a crawl can fetch up to 500 URLs. If you leave **URL limit** blank or enter a higher number, the crawl stops at 500 and keeps everything found up to that point. A lower limit still works as you'd expect. [Pro](/docs/licensing) removes the cap.
::

## Render JavaScript

Some sites send an almost empty page and build everything in the browser with JavaScript: React, Vue, Angular and similar. Crawled as served, they look like one blank page with no links. Turn on **Render JavaScript** and CrawlStat runs each page in a real browser first, then reads the page as a visitor would see it: the title, headings, text and links that the scripts put there.

- **It uses a browser you already have.** Chrome, Chromium, Edge or Brave. Nothing is downloaded. The switch names the browser it found. If there isn't one, the switch is greyed out and says so.
- **The server's answer still counts.** The status code, headers, redirects and response time come from the normal request, exactly as without rendering. Only the page's content comes from the browser.
- **It's several times slower.** Each page opens in its own short-lived browser, four at a time, with up to four seconds for its scripts to run. Images aren't loaded during rendering.
- **It never loses a page.** If the browser fails on a page, CrawlStat keeps the HTML the server sent instead, so the crawl carries on.

It's off by default, because most sites don't need it and crawls are much faster without it. If you're not sure, crawl once without it: if pages show almost no words and almost no links, turn it on and recrawl. A [client report](/docs/client-reports) notes on its cover when JavaScript was rendered.

::callout{type="note"}
If your browser is installed somewhere unusual, set the `CRAWLSTAT_CHROME` environment variable to its full path before starting CrawlStat.
::

Rendering JavaScript is included on the free tier.

## Narrow the crawl with patterns

Click **More options** to restrict which URLs are crawled. Both fields take regular expressions, one per line:

- **Only crawl URLs matching:** if you add any patterns, a URL must match at least one of them to be crawled. Leave it blank to crawl everything.
- **Never crawl URLs matching:** any URL matching one of these is skipped. These rules are applied after the include rules, so an exclude always wins.

Patterns are matched against the full URL, so it helps to anchor them. The URL you start from is always fetched. The patterns apply to everything found after it, including sitemap entries and links to other sites. Some examples:

```text
^https://example\.com/blog/
```

Only crawls the blog. Because links to other sites don't match this pattern either, they won't be checked.

```text
/cart
\?page=
/tag/
```

Skips the cart, paginated listings and tag archives. Each line is a separate pattern.

If a pattern isn't a valid regular expression, the dialog shows the error when you click **Start crawl**, and nothing is started.

Below the patterns, a summary line shows the defaults this crawl will use. For example: "5 at a time · robots.txt respected · external links checked · audits on finish". Click **Change** to go to [Settings](/docs/settings) and adjust them. Settings apply to new crawls only.

## Start the crawl

Click **Start crawl**, or press :kbd[Enter] in the address field. CrawlStat creates a new crawl file and takes you to that crawl's page, where the **Overview** tab shows it running live. See [Watching a crawl](/docs/watching-a-crawl).

The bottom of the dialog shows where the file is saved. Each crawl gets its own file, named after the site and the time it started, for example `example-com-20260224-1432.db`. Crawling the same site again creates a new file rather than overwriting the old one, so you keep a history.

## Before you crawl someone else's site

CrawlStat is polite by default. It reads robots.txt and obeys it, honours any Crawl-delay it asks for, and identifies itself as `CrawlStatBot`. If you're crawling a site you don't run, keep those defaults, and consider adding a delay between requests if the site seems slow. See [The crawler and robots.txt](/docs/crawler-and-robots).

## What happens next

1. The crawl runs. You can pause, resume or stop it at any time. See [Watching a crawl](/docs/watching-a-crawl).
2. When it finishes, CrawlStat runs its audits automatically.
3. The crawl's page fills in: **Overview** for the headline figures, **Issues** for what needs fixing ([Issues](/docs/issues)), **Pages** to explore every URL ([the Pages table](/docs/results-table)), and **Plan** for what to fix first ([The plan](/docs/the-plan)).
4. When you're ready to share it, [export a client report](/docs/client-reports).
