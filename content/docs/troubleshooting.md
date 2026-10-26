---
title: Troubleshooting
description: Fixes for the most common problems, from crawls that find too few pages or hit lots of errors to empty issue lists, report exports, failed exports and licence trouble.
section: Help
order: 18
---

## The crawl finds only one page, or very few

CrawlStat follows the links in the HTML the server sends. If it stops early, one of these is usually the cause:

- **The site builds its links with JavaScript.** Unless you turn on rendering, CrawlStat reads the page as the server sent it. If the menu and links only appear after scripts run, there's nothing in that HTML to follow. Open the start URL's detail panel and check its **Outlinks** tab. If it's nearly empty, this is the likely reason: use **Recrawl with changes…** on the Projects screen and turn on [Render JavaScript](/docs/your-first-crawl#render-javascript).
- **robots.txt blocks CrawlStat.** Check the Internal tab for URLs marked as blocked, and the [Pages blocked by robots.txt](/docs/audits/pages-blocked-by-robots-txt) issue. If it's your own site, you can turn off **Respect robots.txt** in [Settings](/docs/settings).
- **The start URL redirects to another host.** If `example.com` redirects to `shop.example.com` or a different domain, the destination counts as a different site. Start the crawl from the address the site actually ends up on, or turn on **Crawl subdomains**.
- **The links point at a subdomain.** With **Crawl subdomains** off, `blog.example.com` is treated as external and only checked, not crawled.
- **Your patterns are too narrow.** If you used **Only crawl URLs matching**, the URLs the start page links to must match one of your patterns.
- **A depth limit is set.** A small **Maximum depth** stops the crawl close to the start URL.
- **The links are nofollow.** Links marked `rel="nofollow"` aren't followed by default.
- **The server is blocking the crawler.** See the next section.

## Lots of 403s, 429s or 503s

These usually mean the server, or a firewall or bot-protection service in front of it, is refusing or rate-limiting CrawlStat:

- **429 Too Many Requests, or 503s that start partway through:** you're crawling faster than the server allows. In [Settings](/docs/settings), lower **Simultaneous requests** to 1 or 2 and add a **Delay between requests** of 500–1000 ms, then crawl again.
- **403 Forbidden on everything:** a firewall may be blocking unfamiliar user agents. If it's your site, ask whoever runs it to allow `CrawlStatBot`. Changing the user agent may also get through, but only do that on sites you control.

## Lots of failed URLs or timeouts

URLs counted as **Failed** couldn't be fetched at all. The **Error** column on the Response codes tab says why.

- **Timeouts:** the server is slow to respond. Raise **Request timeout** in Settings, and lower **Simultaneous requests** so the server isn't handling as many at once.
- **Connection or DNS errors:** check your internet connection, VPN or proxy. If only external links fail, the problem may be on those sites.

CrawlStat already retries timeouts and connection errors twice before marking a URL as failed.

## The crawl is slow

Crawl speed is mostly decided by the server. Things that slow it down:

- **A Crawl-delay in robots.txt.** CrawlStat honours it, and a delay of even a few seconds makes a big difference.
- **Your own delay setting,** or a low number of simultaneous requests.
- **Slow pages.** Check the **Time** column for responses over a second, or the **Slow** lens in the Pages table.
- **Render JavaScript is on.** Running every page in a browser makes a crawl several times slower. If the site's links and content are in the HTML the server sends, crawl without it.

On your own site, you can raise **Simultaneous requests** in Settings. Watch for server errors, because they mean it's too high.

## The crawl stopped at 500 URLs

That's the free-tier limit. The crawl keeps everything it found up to that point, and a warning shows how many URLs weren't crawled. [Pro](/docs/licensing) removes the limit. On the free tier, you can make the 500 go further by turning off **Images** and **Check external links**, or by narrowing the crawl with patterns.

## The Issues tab is empty

If a crawl's Issues tab says **No issues found**, either the site is in good shape or the audits haven't run for this crawl. That happens when **Run audits when a crawl finishes** is off in Settings. Click **Run the audits** or **Re-run audits** to make sure.

Some issues are deliberately not reported for certain pages. For example, title and description checks skip pages that can't be indexed, such as noindex pages, redirects and error pages.

## Render JavaScript is greyed out

CrawlStat renders pages with a browser you already have: Chrome, Chromium, Edge or Brave. If it can't find one, the switch is greyed out and says so. Install one of them and reopen the New crawl dialog. If yours is installed somewhere unusual, set the `CRAWLSTAT_CHROME` environment variable to the browser's full path before starting CrawlStat.

## The PDF option is greyed out when exporting a report

[Client reports](/docs/client-reports) are printed to PDF by Chrome, Edge or Brave, and the PDF option needs one of them installed. Without one, choose **Web page**: it's the same report as a single file, and any browser's **Print** dialog turns it into an A4 PDF.

## The client report has no progress section

The progress section compares the crawl with an earlier crawl of the same site, so it's only offered when there is one, and it needs [Pro](/docs/licensing). Recrawl the site from [Projects](/docs/projects#recrawling), then export the report from the new crawl.

## "CrawlStat is not allowed to write to…" when exporting

Exports are written to your Downloads folder (or your home folder if there's no Downloads folder). This message means the operating system refused to let CrawlStat write there. Check that the folder exists and that you have permission to write to it, then try again. On macOS, check whether CrawlStat has been denied access to Downloads in **System Settings → Privacy & Security → Files and Folders**.

## A crawl has disappeared from Projects

The Projects screen lists your 20 most recent crawls. Crawls also drop off the list if their file has been moved or deleted. If you still have the file, put it back in CrawlStat's `projects` folder. You can find the path in the Projects header and in [Settings](/docs/settings). Then click **Refresh**.

## A crawl was interrupted

If CrawlStat quit or your computer restarted during a crawl, go to **Projects** and click **Resume** on that crawl's card, or open the crawl and click **Resume** in its header. It picks up where it left off. See [Projects](/docs/projects#resuming-a-crawl).

## Licence problems

**Activation fails.** The Licence card shows the reason given by the licence service. Common causes:

- **The key is already active on as many computers as it allows.** Deactivate it on a computer you no longer use (**Settings → Licence → Deactivate**), then try again.
- **No connection to crawlstat.com.** Activation needs to reach the licence service once. Check your connection, and any firewall or proxy that might block it.
- **Too many attempts.** The licence service limits how often a key can be tried. Wait a little while and try again.

**"Pro · offline, N days left before it needs checking."** CrawlStat hasn't reached the licence service recently. Everything still works. Connect to the internet and click **Check now**, or just keep using the app while online.

**"Your licence needs re-checking."** Fourteen days passed without a successful check, so the app has fallen back to the free tier. Your crawls are untouched. Connect to the internet and restart CrawlStat, or activate your key again in Settings.

**On Linux, the licence won't save.** CrawlStat stores the key in the Secret Service, which is provided by GNOME Keyring, KWallet or similar. Make sure one of these is installed and unlocked. The free tier works without it.

## Still stuck?

[Send us a message](/contact) and choose *Something is not working*. It helps to include:

- Your operating system and its version.
- The engine version from **Settings → About**.
- What you were doing, and the exact text of any error or warning.
- If it's about a particular site, its address, if you're able to share it.
