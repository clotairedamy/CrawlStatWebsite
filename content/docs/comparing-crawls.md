---
title: Comparing crawls
description: Crawl, fix, crawl again — and see exactly what moved, what regressed, and which pages started failing.
section: Using CrawlStat
order: 10
---

## Closing the loop

A crawl on its own tells you what is wrong today. It cannot tell you whether yesterday's work helped, which is the question that justifies running the tool a second time.

Compare takes two crawls of the same site and reports what actually changed. It's part of [Pro](/docs/licensing).

## Starting a comparison

There are three ways in:

- **Compare** on a crawl's card in [Projects](/docs/projects), or in a crawl's header. It lists crawls of the same site first, with the one just before it marked **Previous crawl**, then crawls of other sites.
- **Compare with previous crawl** at the end of a [live crawl](/docs/watching-a-crawl), when you've crawled the same site before. This is the quickest way to check a fix: recrawl, then compare.
- **Include progress since the last crawl** in a [client report](/docs/client-reports), which puts the comparison in front of your client.

The comparison runs straight away, with the older crawl on the left. **Projects** takes you back.

## What it reports

- **Fixed** — pages that had a problem, no longer do, and are still in the crawl.
- **Introduced** — pages that did not have it and now do.
- **Pages that started failing** — worked before, return an error or nothing now. Shown first, because this is almost always the most urgent thing on the screen.
- **Impact before and after**, per issue, from [the plan's](/docs/the-plan) ranking.
- **Link value at risk** before and after.

## One rule worth knowing

**A page that simply stopped being crawled is reported as gone, never as fixed.** If deleting a page counted as fixing its problems, the shortest route to a perfect score would be to delete your site, and a tool that rewards that is worse than no tool at all.

## How pages are matched

On the normalised dedup key, not on the row id and not on the raw URL. Row ids are per-file and meaningless across crawls. Raw URLs differ by tracking parameters, trailing slashes and case that the crawler already knows to ignore — matching on them would report cosmetic URL changes as pages appearing and disappearing.

## In CI

```bash
crawlstat-cli compare before.db after.db --fail-on-regression
```

Exits non-zero when any issue got worse or any page started failing, so a release can be gated on "this change broke nothing".
