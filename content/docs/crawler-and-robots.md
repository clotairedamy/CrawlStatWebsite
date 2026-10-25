---
title: The crawler and robots.txt
description: How CrawlStat identifies itself, how it reads and obeys robots.txt, how hard it works a server, and what site owners can do if they see CrawlStatBot in their logs.
section: Account & data
order: 16
---

## How CrawlStat identifies itself

Every request CrawlStat makes carries this user agent:

```text
CrawlStatBot/1.0 (+https://crawlstat.com/bot)
```

`CrawlStatBot` is the name it answers to in robots.txt. The URL in brackets tells anyone reading their server logs where to find out what it is.

CrawlStat is a desktop app. When you see CrawlStatBot in your logs, it's a person running CrawlStat on their own computer, from their own internet connection, not a central service crawling the web. The requests come from that person's IP address.

## robots.txt

CrawlStat respects robots.txt by default.

- **One robots.txt per site.** Before fetching anything from a host, CrawlStat requests its `/robots.txt` and keeps it for the rest of the crawl. Each origin (scheme, host and port) gets its own, including external sites whose links are being checked.
- **Disallow rules are obeyed.** A URL that robots.txt disallows isn't fetched. It's recorded as blocked, so it shows up in your results and in the [Pages blocked by robots.txt](/docs/audits/pages-blocked-by-robots-txt) audit when your own pages link to it.
- **The most specific group wins.** If robots.txt has a group for `CrawlStatBot`, CrawlStat follows that group. Otherwise it follows the `*` group.
- **Crawl-delay is honoured.** If the group CrawlStat follows sets a `Crawl-delay`, requests to that host are spaced at least that far apart, even if your own delay setting is shorter.
- **Sitemap lines are used.** `Sitemap:` lines in robots.txt are read and their URLs added to the crawl. That's what lets CrawlStat find [orphan pages](/docs/audits/orphan-pages).

### When robots.txt can't be read

| robots.txt returns | CrawlStat does |
| --- | --- |
| 200 | Follows the rules in it. |
| 404 or 410 | Treats the site as having no rules, and crawls everything. This is the standard behaviour. |
| A 5xx error, or no response | Crawls anyway, and shows a warning. |

The last row is a deliberate choice. The robots.txt standard (RFC 9309) says a server error should be treated as "disallow everything". CrawlStat is usually pointed at a site by the person who runs it, and refusing to crawl because their server hiccuped on one file wouldn't help anyone. The warning tells you it happened.

### Turning robots.txt off

You can turn off **Respect robots.txt** in [Settings](/docs/settings). CrawlStat then ignores Disallow rules and Crawl-delay. It still reads `Sitemap:` lines only while robots.txt is respected, so orphan detection works best with this left on.

This option exists for sites you own, for example a staging server that blocks every crawler with `Disallow: /`. It isn't for getting around someone else's rules.

## How hard CrawlStat works a server

The defaults are modest:

| Setting | Default |
| --- | --- |
| Simultaneous requests per host | 5 |
| Delay between requests | None (unless robots.txt sets a Crawl-delay) |
| Request timeout | 20 seconds |
| Retries on a timeout or connection error | 2, waiting 0.5 s and then 1 s |
| Redirects followed per URL | Up to 10 |

Error status codes such as 404 or 503 aren't retried. They're recorded as they are.

A few other behaviours keep the load down:

- **Pages are fetched with GET. Everything else is checked with HEAD.** Images, documents, stylesheets, scripts and external links only need a status and a size, so CrawlStat asks for headers, not the whole file. If a server doesn't support HEAD, it falls back to GET.
- **External links are fetched once and never followed.** CrawlStat checks that a link to another site works, then stops.
- **Large responses are cut off.** CrawlStat reads up to 10 MB of any response and stops there. The URL is marked as truncated, and links in the part that was read are still used.
- **Each URL is fetched once.** CrawlStat normalises URLs and remembers what it's seen, so a link that appears on every page is fetched a single time.
- **No JavaScript.** CrawlStat reads the HTML the server sends and never runs scripts, so it doesn't trigger the extra requests a browser would.

If you're crawling a site you don't run, consider lowering **Simultaneous requests** and adding a delay in [Settings](/docs/settings). Your crawl will be slower, but it will be kinder to the site.

## Changing the user agent

You can set a different user agent in [Settings](/docs/settings). CrawlStat then matches robots.txt using the first word of your new user agent, which is the part before the first `/` or space. For example, `MyAuditBot/2.0` is matched against rules for `MyAuditBot`.

We recommend keeping the default for sites you don't run. An honest user agent lets site owners recognise the crawler and set rules for it.

## For site owners

If you've found CrawlStatBot in your logs, someone has used CrawlStat to check your site. Often it's someone on your own team, or an agency working for you.

To stop CrawlStat crawling your site, add this to your robots.txt:

```text
User-agent: CrawlStatBot
Disallow: /
```

To slow it down instead:

```text
User-agent: CrawlStatBot
Crawl-delay: 5
```

CrawlStat obeys these rules by default. Because CrawlStat runs on each user's own computer, the user can change its settings, so for a hard guarantee use your server's normal access controls. If you're seeing behaviour that seems wrong, [let us know](mailto:hello@crawlstat.com).
