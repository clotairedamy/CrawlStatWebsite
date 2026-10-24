---
title: Licensing without a database
description: How CrawlStat verifies a Pro licence offline with Ed25519-signed tokens, so a crawl never waits on a server, and the revocation window we accepted on purpose to get there.
date: 2026-09-30
author: The CrawlStat team
tag: Engineering
readingTime: 6
---

Licensing is the part of a desktop app that users notice only when it breaks. It usually breaks at the worst moment: on a plane, on hotel Wi-Fi, or when the vendor's licence server is having a bad day and suddenly *your* afternoon is too.

We had one rule for CrawlStat: **a crawl never waits on our server, and never fails because of it.** We also didn't want to run a licence database. That means no table of activations, no backups, no migrations, and no on-call rotation for a service whose only job is to say yes.

Here's how both turned out to be possible, and what we gave up to get there.

## The payment provider already knows who paid

Every licensing system needs a source of truth for "has this person paid?". We already have one: the merchant of record that takes the payment. It stores the customer, the subscription, refunds and cancellations. Copying that into our own database would only give us a second copy that can disagree with the first.

So our server side is a thin proxy. A few serverless functions sit in front of the provider and answer one question. When the provider confirms a licence is valid, the function signs a short-lived **entitlement token** with an Ed25519 private key. The app ships with the matching public key and verifies tokens itself.

```txt
  app ──activate(key)──▶ /api/license/activate ──▶ merchant of record
                                  │
                         signs an entitlement
                                  ▼
  app ◀────── token (14 days) ────┘        app verifies offline from here on
```

After that, a verified token is proof on its own. The app doesn't need to ask anyone.

## What's in a token

A token is two base64url strings joined by a dot: the encoded payload and an Ed25519 signature. The payload looks something like this:

```json
{
  "version": 1,
  "plan": "pro",
  "issued_at": 1790000000,
  "expires_at": 1791209600,
  "key_fingerprint": "3f9a1c07",
  "instance_id": "…",
  "features": ["unlimited_urls", "crawl_comparison", "xlsx_export", "…"]
}
```

One detail saved us a class of bugs. The signature covers the *encoded payload string*, not the JSON object. Tokens are signed in TypeScript and verified in Rust, so that's two JSON serialisers and two base64 implementations. If the signature covered re-serialised JSON, any difference in key order or whitespace between the two would invalidate every token. Signing the exact bytes that travel means nothing can be reformatted on the way.

We still don't trust it blindly. A test in the Rust engine verifies a committed token that the real Node signing code produced. If the two sides' formats ever drift, the build fails instead of every customer's activation.

## A fortnight of offline, by design

Here's how the timing works:

- A token is valid for **14 days**.
- The app refreshes it **about once a day**.
- If a refresh fails, it retries with exponential backoff, capped at one retry a day.
- **A crawl that's already running is never re-checked.**
- Only after fourteen days of failed refreshes does the install fall back to the free tier.

"Falls back" means exactly that. CrawlStat keeps working, with the free 500-URL limit. Nothing gets locked, nothing gets deleted, and your crawl files stay yours. A paying customer on a long-haul flight, or in an office with an aggressive firewall, keeps their features the whole time.

Who protects the customer during an outage matters here. Every provider integration **fails closed**: if the provider can't be reached, the server answers `valid: false`, never "probably fine". The app's grace period is what protects a paying customer during an outage, not a server guessing optimistically.

## Enforcement lives in the engine

The URL limit isn't enforced by the UI hiding a button. The Rust engine clamps the maximum URLs for each crawl by reading its own licence state as the crawl is set up. The desktop app, the command-line tool and any future CI runner all hit the same limit, because they all go through the same code.

Two defaults are worth calling out:

- **The default state is the free tier.** If a build forgets to load a licence, it ends up limited, not accidentally unlimited. When this goes wrong, it should go wrong in that direction.
- **The clamped value is saved with the crawl**, so resuming a crawl doesn't get around the limit either.

Tokens grant **features**, not plan names. The code checks for `unlimited_urls`, not whether the plan is called "Pro". So a downgraded or partially refunded licence can't grant more than it should. The server can also grant a capability a shipped build has never heard of, and that build won't break.

## Secrets stay in Rust

The licence key and the signed token live in the operating system's keychain, and only the Rust side ever reads them. The Flutter UI asks "am I licensed?" and gets a status back. A UI bug can't leak either secret, neither one can turn up in a crash dump from the UI layer, and the app doesn't need a native plugin to store them.

## What it costs to run

Very little, and that was the point. Each install calls `validate` about once a day. Ten thousand customers works out to a few hundred thousand function invocations a month, comfortably inside the hosting free allowance. The update manifest is cached at the edge, so it barely counts.

There's no database to back up, because there's no database. The provider integration sits behind a small interface (we have implementations for Lemon Squeezy, Polar and Paddle), and switching between them takes one environment variable.

## The trade-off we chose

This design has a real cost, and it's worth spelling out: **revocation isn't instant.**

If someone gets a refund, their install finds out at its next validation. Usually that's within a day. If the machine stays offline the whole time, it can take up to the full fourteen days. During that window, a refunded install can keep Pro features.

The only way to close that window is a revocation list the app checks. A revocation list is a database, plus a server the app has to reach, which brings back exactly the dependency we set out to remove. For a tool at this price, we think that's the wrong trade. So we accepted the window deliberately, not by accident. The payments webhook already verifies signatures, and it's the place a revocation list will plug in if that ever becomes worth it.

::callout{type="note"}
Rate limiting gets the same honesty. It's an in-memory sliding window on each serverless instance, so a determined attacker spread across instances gets more requests than the configured limit. What it reliably stops is the realistic failure: an app stuck in a retry loop, or a script hammering one key until it turns into a bill. If the numbers ever justify it, a shared store can replace it behind the same interface.
::

Can someone patch a desktop binary to skip all of this? With enough effort, people can patch any desktop software. We'd rather build licensing that never gets in an honest customer's way than one that punishes every customer to slow down the few who'd never pay anyway.

## The result

When you open CrawlStat and start a crawl, nothing talks to our servers first. There's no spinner while a licence gets checked, and no "unable to verify" dialog. The free tier needs no token at all. Pro needs one, and it renews quietly in the background.

[See what Pro includes](/pricing), or [download CrawlStat](/download) and start on the free tier. Either way, your crawls never depend on our servers being up.
