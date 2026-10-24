---
title: Settings
description: Every option on the Settings screen, covering appearance, politeness, user agent, scope, resources and storage, with the defaults and when to change them.
section: Using CrawlStat
order: 8
---

## How settings work

The Settings screen holds the **defaults for new crawls**, plus a few app preferences. Changes are saved as you make them.

Each crawl keeps the settings it started with. Changing a setting affects the next crawl you start, not the crawls you already have, and not a crawl you resume.

::screenshot{src="/screenshots/settings-dark.png" alt="The Settings screen showing the licence card, appearance, politeness and scope options" caption="Settings, with your licence at the top and crawl defaults below."}
::

Your licence is managed at the top of the screen. See [Licensing](/docs/licensing).

## Appearance

**Theme:** System, Light or Dark. **System** follows your operating system's setting.

## Politeness

These settings control how hard CrawlStat works the site's server. The defaults are deliberately gentle.

| Setting | Default | What it does |
| --- | --- | --- |
| **Respect robots.txt** | On | Obeys the site's Disallow rules and Crawl-delay. |
| **Simultaneous requests** | 5 | How many URLs are in flight at once, per host. Range 1–50. |
| **Delay between requests** | 0 ms | A pause between requests. Zero means as fast as the server answers. Range 0–10,000 ms. |
| **Request timeout** | 20,000 ms | How long to wait for a response before giving up. Range 1,000–120,000 ms. |

### When to change them

- **The site is slow or returns 503s or 429s.** Lower **Simultaneous requests** to 1 or 2, and add a **Delay between requests** of a few hundred milliseconds.
- **It's your own site, on capable hosting.** You can raise **Simultaneous requests** to speed things up. Watch the Crawl screen for server errors, which mean you've gone too far.
- **Pages take a long time to generate.** Raise the **Request timeout** so slow pages aren't recorded as failures.

If the site's robots.txt sets a Crawl-delay, CrawlStat honours it while **Respect robots.txt** is on, even if your own delay is shorter.

::callout{type="warning"}
Turning off **Respect robots.txt** is meant for sites you own, for example to audit a staging server that blocks all crawlers. It isn't a licence to hammer someone else's site. See [The crawler and robots.txt](/docs/crawler-and-robots).
::

## User agent

This is the name CrawlStat sends with every request. The default is:

```text
CrawlStatBot/1.0 (+https://crawlstat.com/bot)
```

The user agent is also what robots.txt rules are matched against. CrawlStat uses the first word of your user agent (the part before the first `/` or space) as its robots.txt name. With the default, rules addressed to `CrawlStatBot` apply, or the rules for `*` if there are none for `CrawlStatBot`.

You can change it, for example to see how a site responds to a different client. Click **Reset** to go back to the default. Identifying the crawler honestly is what keeps it welcome, so we recommend keeping the default for sites you don't run.

## Scope

| Setting | Default | What it does |
| --- | --- | --- |
| **Crawl subdomains** | Off | Treats subdomains as part of the site, so `blog.example.com` is crawled along with `example.com`. `www.` is always treated as the same site. |
| **Check external links** | On | Fetches links to other sites once to see whether they work. They're never followed any further. |
| **Follow nofollow links** | Off | Follows links marked `rel="nofollow"`. Off by default, which is what a search engine does. |

Turning off **Check external links** makes crawls faster and keeps CrawlStat entirely on your site, but you won't find broken outbound links.

## Resources to crawl

HTML pages are always crawled. These settings decide which other files are fetched as well. Resources are fetched to check that they load and to record their size. CrawlStat never looks inside them for more links.

| Resource | Default | Why you'd want it |
| --- | --- | --- |
| **Images** | On | Needed for the [oversized images](/docs/audits/oversized-images) audit to know real file sizes, and to find broken images. |
| **Documents** | On | Checks PDFs and office files linked from the site. |
| **Stylesheets** | Off | Checks that CSS files load. This adds URLs to every crawl. |
| **JavaScript** | Off | Checks that script files load. They're never executed. |

::callout{type="note"}
Every URL CrawlStat fetches counts towards a crawl's URL limit, including resources and external link checks. On the free tier, a site with lots of images can reach 500 URLs sooner than you'd expect. Turn off **Images** or **Check external links** if you only want to check pages.
::

## Storage

| Setting | Default | What it does |
| --- | --- | --- |
| **Run audits when a crawl finishes** | On | Runs all 45 audits automatically. On a large crawl this takes a moment. If it's off, you can run them at any time from the [Issues screen](/docs/issues). |
| **Keep raw HTML** | Off | Stores every page's source in the crawl file. This takes a lot of disk space. Custom extraction, which is rolling out to Pro, works from stored HTML. |

Below these, Settings shows where crawls are saved and where exports are written. These locations are shown for reference. See [Installing](/docs/installing#where-crawlstat-keeps-its-files) for the paths on each platform.

## Keyboard

A reference list of shortcuts. See [Keyboard shortcuts](/docs/keyboard-shortcuts).

## About

Shows the version of CrawlStat's crawl engine, the free-tier limit (500 URLs per crawl) and the crawl data folder. Include the version if you [get in touch about a problem](/docs/troubleshooting).

## Where settings are stored

Settings are saved in a small `settings.json` file in CrawlStat's application data folder. If the file is ever damaged, CrawlStat ignores it and starts with the defaults. Your licence key isn't kept there. It's stored in your operating system's secure credential store.
