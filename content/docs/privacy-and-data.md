---
title: Privacy and your data
description: What CrawlStat stores on your computer, the little it ever sends over the network, and how to back up or delete your data.
section: Account & data
order: 11
---

## The short version

CrawlStat is a local app. Your crawls run on your computer, are stored on your computer, and stay there. There's no CrawlStat account, no cloud sync, and no analytics or tracking inside the app.

The only things that leave your machine are:

1. **The requests CrawlStat makes to the sites you crawl**, which is the point of a crawler.
2. **Licence checks**, if you've activated Pro. They contain your licence key and a random install ID, and nothing about your crawls.
3. **Update checks**, which ask crawlstat.com for the latest version number. They contain nothing about you or your crawls.

The rest of this page explains each of these in detail.

## What's stored on your computer

| What | Where | Contains |
| --- | --- | --- |
| **Crawls** | One `.db` file per crawl in the `projects` folder | Every URL crawled, status codes, response headers, titles, descriptions, headings, links, images, structured data, the crawl's settings and log, and audit results. Page source too, if you turned on **Keep raw HTML**. |
| **Settings** | `settings.json` | Your crawl defaults, theme and window preferences. |
| **Recent crawls** | `recent.json` | The paths of your 20 most recent crawls. |
| **Exports** | Your Downloads folder, by default | The CSV files you've exported. |
| **Licence** | Your OS's secure credential store | Your licence key, the signed licence token, and a random install ID. |

The `projects` folder, `settings.json` and `recent.json` live in CrawlStat's application data folder. See [Installing](/docs/installing#where-crawlstat-keeps-its-files) for the path on each platform.

By default, CrawlStat stores a fixed set of response headers rather than all of them: `content-type`, `content-length`, `content-encoding`, `content-language`, `cache-control`, `etag`, `expires`, `last-modified`, `location`, `link`, `server`, `vary`, `x-robots-tag`, `strict-transport-security`, `x-frame-options` and `content-security-policy`. It doesn't store cookies.

## What's sent over the network

### To the sites you crawl

CrawlStat sends ordinary HTTP requests to the sites you point it at, identifying itself as `CrawlStatBot/1.0 (+https://crawlstat.com/bot)` unless you change the user agent. If **Check external links** is on, it also requests each external URL your site links to, once, to see whether it works. See [The crawler and robots.txt](/docs/crawler-and-robots).

### To crawlstat.com, for licensing

If you activate Pro, CrawlStat contacts `crawlstat.com` once to activate the key. After that, when you open the app and its licence token is more than a day old, it contacts the service again to refresh it. Each request contains exactly two things:

- **Your licence key**, so the service can confirm it's valid.
- **A random install ID**, generated the first time it's needed and stored in your credential store. It's used to count how many computers a licence is active on. It's random, not derived from your hardware.

The signed token CrawlStat receives back contains the plan, the dates it's valid between, a short fingerprint of your key, the install ID and the list of features it grants. It doesn't contain your name, email address or any payment details.

Licence checks never include anything about your crawls: no URLs, no site names, no results.

If you use the free tier, CrawlStat makes no licence requests at all.

### Update checks

Information about the latest release (its version number, release notes and download links) is published as a small file on `crawlstat.com`. Fetching it sends nothing about you or your crawls beyond what any web request carries, such as your IP address.

### Nothing else

The app has no telemetry, usage analytics or crash reporting. The Settings screen puts it plainly: crawls run entirely on this machine.

::callout{type="note"}
Bring-your-own-key integrations are rolling out to Pro. They'll let you connect services you choose, using your own API keys. Data will only go to those services when you trigger an integration yourself, never automatically.
::

## Payments

When you buy Pro, the payment is handled by our payment provider, which acts as the merchant of record. Your payment details go to the provider, not to CrawlStat, and never touch the app.

## Backing up your data

Each crawl is a single file, so backing up is simple:

- Copy individual `.db` files from the `projects` folder to keep particular crawls.
- Back up the whole application data folder to keep everything, including settings and your recent list.

Copy crawl files while CrawlStat isn't using them. Your licence isn't in these folders. On a new computer, activate again with your key (see [Licensing](/docs/licensing#moving-to-another-computer)).

## Deleting your data

- **One crawl:** on the [Projects screen](/docs/projects), use **⋯ → Delete crawl file…**. This deletes the file and its `-wal` and `-shm` companions.
- **Exports:** delete the CSV files from your Downloads folder as you would any other file.
- **Everything:** deactivate your licence in Settings if you have one, quit CrawlStat, then delete the application data folder.

There's nothing to delete on our side for your crawl data, because we never had it.
