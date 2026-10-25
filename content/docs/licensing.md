---
title: Licensing
description: What's free, what Pro adds, how activation works, why CrawlStat keeps working offline, and how to move your licence to another computer.
section: Account & data
order: 14
---

## Free and Pro

CrawlStat is free to download and use. You don't need an account, and the free tier has no time limit.

| | Free | Pro |
| --- | --- | --- |
| URLs per crawl | Up to 500 | Unlimited |
| All 45 audits | Yes | Yes |
| Results table, issues, URL details | Yes | Yes |
| CSV export | Yes | Yes |
| Crawl comparison | — | Rolling out to Pro |
| Custom extraction (CSS, XPath, regex) | — | Rolling out to Pro |
| Scheduled crawls | — | Rolling out to Pro |
| XLSX export | — | Rolling out to Pro |
| HTML audit report | — | Rolling out to Pro |
| Bring-your-own-key integrations | — | Rolling out to Pro |

Pro costs $99 a year. See [pricing](/pricing) for current details.

"Rolling out to Pro" means these features are on the way and are included in a Pro licence when they arrive. The thing Pro unlocks in the app today is unlimited URLs per crawl.

### How the free limit works

On the free tier, a crawl fetches up to 500 URLs. If a site is bigger, the crawl stops at 500 and keeps everything it found up to that point, then runs the audits as normal. A warning on the Crawl screen tells you how many discovered URLs weren't crawled. You can still set a lower limit of your own in the New crawl dialog.

Everything CrawlStat fetches counts towards the 500, including images, documents and external link checks. See [Settings](/docs/settings#resources-to-crawl) if you want to spend the allowance on pages only.

The limit is stored with each crawl, so resuming a crawl that started on the free tier keeps the 500-URL cap even if you've since upgraded. Start a new crawl to use your Pro allowance.

## Activating Pro

::steps
1. Buy Pro from [the pricing page](/pricing). Your licence key is sent to you by email.
2. In CrawlStat, open **Settings**. The **Licence** card is at the top. You can also get there from **Upgrade to Pro** in the sidebar, or **Upgrade** in the New crawl dialog.
3. Paste your key into **Paste your licence key** and click **Activate**.
::

When it works, you'll see "Thank you — Pro is active on this machine." The card then shows **Pro**, how many days until the licence next renews, and a short fingerprint of the key ("Key ending …") so you can tell which key is in use.

If activation fails, the card shows the reason given by the licence service, for example that the key has already been activated on as many computers as it allows.

## Working offline

Activation contacts crawlstat.com once. After that, CrawlStat works offline for a fortnight at a time.

Here's how that works. When you activate, the licence service gives CrawlStat a signed token that's valid for 14 days. CrawlStat checks that token itself, on your computer, every time it starts. It doesn't need to ask the server. When you open the app and the token is more than a day old, CrawlStat quietly asks for a fresh one in the background. If that fails because you're on a plane, behind a firewall, or the service is down, nothing happens. You keep Pro, and CrawlStat tries again later.

The Licence card reflects where things stand:

| What you see | What it means |
| --- | --- |
| **Pro · renews in N days** | Everything is normal. |
| **Pro · offline, N days left before it needs checking** | CrawlStat hasn't been able to reach the licence service recently. Everything still works. Connect to the internet within that time and it sorts itself out. |
| **Your licence needs re-checking — connect and try again** | Fourteen days passed without a successful check. Pro features are paused until it's re-checked. Nothing has been lost. |
| **Free · up to 500 URLs per crawl** | No licence is active. |

::callout{type="note"}
CrawlStat never stops working because of the licence. If a check is overdue, the app falls back to the free tier, and your crawls, results and settings are untouched. A crawl that's already running is never interrupted by a licence check.
::

### Checking now

When Pro is active, the Licence card has a **Check now** button that contacts the licence service straight away. Use it after you've been offline for a while, or after changing your subscription, rather than waiting for the next automatic check.

## Moving to another computer

A licence is activated per installation. To move it:

::steps
1. On the old computer, open **Settings** and click **Deactivate** on the Licence card. Confirm with **Deactivate**.
2. On the new computer, install CrawlStat and activate with the same key.
::

Deactivating removes the licence from that computer and frees its seat for another one. Your crawls and their results are untouched, and that computer goes back to the free tier.

If you can't reach the old computer any more, for example because it was lost or wiped, [contact us](mailto:hello@crawlstat.com) and we'll help.

## Cancelling and refunds

Payments are handled by our payment provider, which acts as the merchant of record. Manage or cancel your subscription through the link in your purchase email, or [contact us](mailto:hello@crawlstat.com).

When a subscription ends or is refunded, the change reaches CrawlStat at its next licence check. That's usually within a day, or up to 14 days if the computer stays offline. The app then returns to the free tier. Your crawls stay on your computer and remain fully readable.

## Where the key is kept

Your licence key and token are stored in your operating system's secure credential store: Keychain on macOS, Credential Manager on Windows, and the Secret Service (for example GNOME Keyring or KWallet) on Linux. They aren't written to CrawlStat's settings file or to your crawl files.

For exactly what's sent when CrawlStat activates or checks a licence, see [Privacy and your data](/docs/privacy-and-data).
