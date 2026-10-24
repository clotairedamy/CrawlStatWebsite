---
title: Licensing without a database
description: How CrawlStat verifies a Pro licence offline with signed tokens, so a crawl never waits on a server, and the revocation window we accepted on purpose to get there.
date: 2026-09-30
author: The CrawlStat team
tag: Engineering
readingTime: 5
---

Licensing is the part of a desktop app that users notice only when it breaks. It usually breaks at the worst moment: on a plane, on hotel Wi-Fi, or when the vendor's licence server is having a bad day and suddenly *your* afternoon is too.

We had one rule for CrawlStat: **a crawl never waits on our server, and never fails because of it.** We also didn't want to run a licence database. That means no table of activations, no backups, no migrations, and no on-call rotation for a service whose only job is to say yes.

Here's how both turned out to be possible, and what we gave up to get there.

## The payment provider already knows who paid

Every licensing system needs a source of truth for "has this person paid?". We already have one: the merchant of record that takes the payment. It stores the customer, the subscription, refunds and cancellations. Copying that into our own database would only give us a second copy that can disagree with the first.

So our side is deliberately thin. A small licence service sits in front of the provider and answers one question. When the provider confirms a licence is valid, the service issues a short-lived, digitally signed **entitlement token**. The app knows how to check that signature by itself, without asking anyone.

```txt
  app ──activate(key)──▶ licence service ──▶ merchant of record
                                │
                       signs an entitlement
                                ▼
  app ◀───── token (14 days) ───┘        app verifies offline from here on
```

After that, a verified token is proof on its own.

## What's in a token

A token carries a small set of facts about your licence, plus a signature that proves we issued it. Roughly:

```json
{
  "plan": "pro",
  "issued_at": 1790000000,
  "expires_at": 1791209600,
  "key_fingerprint": "3f9a1c07",
  "features": ["unlimited_urls", "crawl_comparison", "xlsx_export", "…"]
}
```

One detail saved us a class of bugs. The signature covers the token *exactly as it was sent*, byte for byte, not a re-built copy of its contents. If it covered a re-built copy, any tiny difference in formatting between the side that signs and the side that checks would invalidate every token. Signing the exact bytes that travel means nothing can be reformatted on the way.

We still don't trust it blindly. Our test suite checks a real token produced by the real signing code. If the two sides ever drift, the build fails instead of every customer's activation.

## A fortnight of offline, by design

Here's how the timing works:

- A token is valid for **14 days**.
- The app refreshes it **about once a day**.
- If a refresh fails, it retries with increasing gaps, at most once a day.
- **A crawl that's already running is never re-checked.**
- Only after fourteen days of failed refreshes does the install fall back to the free tier.

"Falls back" means exactly that. CrawlStat keeps working, with the free 500-URL limit. Nothing gets locked, nothing gets deleted, and your crawl files stay yours. A paying customer on a long-haul flight, or in an office with an aggressive firewall, keeps their features the whole time.

Who protects the customer during an outage matters here. The licence service **fails closed**: if the payment provider can't be reached, it answers "not valid", never "probably fine". The app's grace period is what protects a paying customer during an outage, not a server guessing optimistically.

## Enforcement lives in the crawler

The URL limit isn't enforced by the interface hiding a button. The crawler itself caps the number of URLs for each crawl, by reading the licence state as the crawl is set up. Every way of starting a crawl hits the same limit, because they all go through the same code.

Two defaults are worth calling out:

- **The default state is the free tier.** If something goes wrong loading a licence, the app ends up limited, not accidentally unlimited. When this goes wrong, it should go wrong in that direction.
- **The cap is saved with the crawl**, so resuming a crawl doesn't get around the limit either.

Tokens grant **features**, not plan names. The app checks for `unlimited_urls`, not whether the plan is called "Pro". So a downgraded or partially refunded licence can't grant more than it should. The licence service can also grant a capability an older version of the app has never heard of, and that version won't break.

## Secrets stay locked away

The licence key and the signed token live in your operating system's secure keychain. Only the core of the app, the part that crawls, ever reads them. The interface asks "am I licensed?" and gets a yes or no back. A bug in the interface can't leak either secret, and neither one can turn up in a crash report from it.

## What it costs to run

Very little, and that was the point. Each install checks in about once a day. Ten thousand customers works out to a few hundred thousand small requests a month, comfortably inside a free hosting allowance.

There's no database to back up, because there's no database. The payment provider sits behind a small interface, so switching providers is a configuration change, not a rewrite.

## The trade-off we chose

This design has a real cost, and it's worth spelling out: **revocation isn't instant.**

If someone gets a refund, their install finds out at its next check-in. Usually that's within a day. If the machine stays offline the whole time, it can take up to the full fourteen days. During that window, a refunded install can keep Pro features.

The only way to close that window is a revocation list the app checks. A revocation list is a database, plus a server the app has to reach, which brings back exactly the dependency we set out to remove. For a tool at this price, we think that's the wrong trade. So we accepted the window deliberately, not by accident. If that ever changes, there's a natural place for a revocation list to plug in.

::callout{type="note"}
Rate limiting gets the same honesty. It's deliberately simple, so a determined attacker could get more requests through than the configured limit. What it reliably stops is the realistic failure: an app stuck in a retry loop, or a script hammering one key until it turns into a bill. If the numbers ever justify something stricter, it can be swapped in without changing the app.
::

Can someone patch a desktop app to skip all of this? With enough effort, people can patch any desktop software. We'd rather build licensing that never gets in an honest customer's way than one that punishes every customer to slow down the few who'd never pay anyway.

## The result

When you open CrawlStat and start a crawl, nothing talks to our servers first. There's no spinner while a licence gets checked, and no "unable to verify" dialog. The free tier needs no token at all. Pro needs one, and it renews quietly in the background.

[See what Pro includes](/pricing), or [download CrawlStat](/download) and start on the free tier. Either way, your crawls never depend on our servers being up.
