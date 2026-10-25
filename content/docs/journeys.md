---
title: Journeys
description: Simulate a visitor hunting for your pricing, support or sign-up page — and find out whether your navigation actually gets them there.
section: Using CrawlStat
order: 8
---

## The question this answers

*Can a first-time visitor get from your front door to the pricing page without help, and how many clicks does it cost?*

That is a question people usually answer by watching someone try, which is slow and expensive, or by assuming it is fine, which is free and often wrong. Journeys gives you a cheap first pass.

## How it works

CrawlStat starts at your home page and walks the crawled site the way a visitor would. At each page it reads the link text on offer, clicks whatever looks most like what it came for, and repeats — until it finds the page, runs out of patience, or goes round in circles.

Each result separates three cases that need completely different fixes:

- **Found** — the path is signposted the whole way. The number of clicks tells you how expensive it is.
- **The page exists but was not found** — this is the finding that matters. The page is there; nothing on the way points to it. The fix is navigation, not content.
- **No such page** — nothing on the site looks like it. Only a problem if it ought to exist.

## Who is visiting

The same site is navigated differently depending on why someone arrived, so each journey runs as a persona with its own patience:

| Persona | Clicks before giving up |
|---|---|
| On a phone, in a hurry | 3 |
| Task-oriented | 5 |
| Sceptical | 7 |
| Explorer | 8 |

A path that works for an explorer and fails for a rushed visitor is a real finding about your navigation depth.

## Reading a journey

Expand any result to see the path. Each step shows the link text that was clicked, where it led, and **what else was on offer at that moment** — which is the evidence you need when the simulated visitor went somewhere you did not expect. If it clicked "Our Results" when you expected "Pricing", the alternatives list tells you what it was choosing between.

## What it is, and what it is not

The simulated visitor reads link text, not pixels. It never uses site search, never uses the back button, and picks greedily rather than planning ahead — except for one step of foresight, which models glancing at a menu or a landing page before committing.

So: **a journey that succeeds is good evidence the path exists.** A journey that fails is a **hypothesis worth testing**, not proof that nobody can get there. It does not replace watching a real person use your site; it tells you which page to watch them try to find.

One more limitation worth knowing: a journey is only as good as the crawl underneath it. If a crawl stopped early, many links point at pages CrawlStat never fetched, and the map has roads missing. The screen warns you when that is the case — finish the crawl before trusting the answer.

## From the command line

```bash
crawlstat-cli journey crawl.db --persona task_oriented
crawlstat-cli journey crawl.db --goal pricing --persona mobile_rushed
```
