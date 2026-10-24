---
title: "The database is the frontier: how CrawlStat keeps memory flat"
description: CrawlStat has no in-memory crawl queue. The crawl file is the queue, the seen-set and the results, which is why 50,000 URLs fit in 128 MiB and doubling a crawl barely moves peak memory.
date: 2026-10-14
author: The CrawlStat team
tag: Engineering
readingTime: 6
---

Most crawlers have a memory problem, and it's built into how they're designed.

A crawler has to keep track of three things: the URLs it still has to visit (the *frontier*), the URLs it has already seen (so it doesn't fetch them twice), and everything it learned from the pages it has fetched. The obvious way to build one keeps all three in RAM. A queue, a set, and a growing pile of page records.

That works fine until it doesn't. Every one of those structures grows with the size of the crawl. The link graph grows even faster, because a page has many links. Crawl a big enough site and you're watching the memory graph, tuning heap sizes, and wondering whether the crawl will finish before the machine starts swapping.

We wanted crawl size to depend on time and disk space, not on RAM. Here's how CrawlStat does that.

## There is no queue

CrawlStat has no in-memory queue and no in-memory list of URLs it has already seen. Both of those jobs belong to the crawl file on your disk.

Every URL the crawler discovers is written to that file with a *dedup key*, and the file refuses to store the same key twice. When the crawler finds links on a page, it simply writes them all down and lets the file reject the ones it already knows about. Nothing has to be checked in memory first.

Taking work off the frontier is just as simple. The crawl loop claims a batch of waiting URLs, shallowest first, and marks them as in progress in the same step. Ordering by depth makes the crawl breadth-first, and a stable tiebreaker makes the order repeatable for a given site. The lookup stays fast however large the crawl gets.

The dedup key is deliberately not the URL itself. The URL we fetch only gets changes that are safe and don't alter meaning: a lowercased host, no fragment, no default port, resolved dot segments. Your policy choices (trailing slashes, tracking parameters, `index.html`) only affect the *key*. So the first version of a URL the crawler sees is the version it fetches and shows you, and later variants of the same page are skipped.

## One writer, one save per batch

Pages are fetched concurrently, but all writing happens in one place. The fetchers hand their results to a single writer, which saves them in batches.

Each batch is saved **all at once**. It holds the finished pages *and* the URLs discovered on them, so either both are saved or neither is. A crash can never leave a page marked done while the links it found are missing. That's what makes a crawl resumable: open it from the Projects screen and press Resume, and it carries on exactly where it stopped.

You get crash safety without any recovery step, because the state you'd need to recover was never in memory in the first place.

## Why memory plateaus

If the crawl state lives on disk, what's using RAM? Mostly a fixed-size cache that keeps the busiest part of the frontier close at hand. We cap it at 64 MiB.

That cache is a **fixed** cost. A crawl fills it, and from then on it doesn't grow, however many URLs you add. That's the plateau you see in the benchmarks.

A few other decisions protect that property:

- **Big sorts happen on disk.** Building lookups over a few hundred thousand rows involves a lot of sorting. Doing that sorting in RAM is exactly the growth we're trying to avoid.
- **Analysis lookups are built at the end.** The crawl only builds what it needs while it runs. Everything used for analysis gets built once the crawl finishes, so it doesn't slow down hundreds of thousands of writes.
- **Links point at the target's dedup key.** A page's links can be saved in one go, without first looking up targets that may not have been discovered yet.
- **Link score is computed on disk.** CrawlStat's link score is PageRank (damping 0.85, rescaled so the strongest page is 100). It runs in passes over the saved links, not over an in-memory graph. The link list grows with the crawl, so holding it in memory would break everything above.
- **Reading never blocks writing.** The app can show you results while the crawler is still saving new ones.

The interface follows the same rule. The results table fetches 200 rows at a time as you scroll and keeps at most 20 pages in memory. While a crawl runs, the live view keeps only the last 300 URLs, since every one of them is already on disk.

## The numbers

We measured on an Apple Silicon laptop against a local test site served over loopback. That makes these engine-bound numbers, not network-bound ones:

| Crawl | Concurrency | Throughput | Peak memory | Crawl file |
|---|---|---|---|---|
| 2,000 | 1 | 3,900 URLs/sec | 21 MiB | 4.6 MiB |
| 2,000 | 5 | 8,200 URLs/sec | 22 MiB | 4.6 MiB |
| 2,000 | 20 | 11,000 URLs/sec | 25 MiB | 4.7 MiB |
| 30,000 | 10 | 9,600 URLs/sec | 111 MiB | 69 MiB |
| **50,000** | **20** | **11,700 URLs/sec** | **128 MiB** | **100 MiB** |
| 60,000 | 10 | 10,600 URLs/sec | 131 MiB | 114 MiB |

Our acceptance bar was 50,000 URLs in under roughly 500 MB. It uses **128 MiB**.

The row we care about most is the comparison between 30,000 and 60,000. Doubling the crawl costs **1.19×** the peak memory, or about 717 bytes of RAM per extra URL. On disk, a crawl costs about 2 KB per URL.

To be fair to the numbers: 717 bytes isn't zero, and we won't claim the line is perfectly flat. It's flat in the sense that matters: the cache fills up early and then stays put, and the growth after that is small enough that disk space and patience run out before memory does. We also only claim what we've measured.

::callout{type="note"}
Real sites won't crawl at 11,700 URLs a second, and that's by design. A real crawl is limited by the network and by politeness settings. With the default five concurrent requests and no crawl delay, expect tens of URLs per second against a typical server. Engine throughput matters because it means CrawlStat is never the slow part.
::

## Measuring it honestly

Peak memory is easy to measure wrong. The usual measurement is a high-water mark for the whole process, so two crawls run one after the other can't be compared: the second inherits the first one's peak. Each of our measurements runs in its own fresh process.

The flatness test does exactly that. It runs the crawler twice, at two crawl sizes, each in a fresh process, and compares the peaks. So flat memory is a design goal with a test behind it. If a change makes memory grow with crawl size, the test fails and the change doesn't ship.

## The trade-off

Nothing is free. Writing every URL to disk costs more than keeping it in a list in memory, and having a single writer puts an upper limit on how fast results can be saved. In practice, that limit is the five-figure URLs-per-second throughput in the table above, far beyond what any polite crawl of a real server will reach. We pay some CPU so that crawl size never depends on RAM, and we think that's the right trade for a tool that runs on a laptop.

We get two bonuses out of it as well. Every crawl is a single file you can keep, copy or open later. And a crash only costs you the batch that hadn't been saved yet, not the whole afternoon.

## Try it on something big

The free tier crawls up to 500 URLs with every audit included. To see the memory graph stay flat on a big site, [Pro](/pricing) removes the limit. Either way, start by [downloading CrawlStat](/download).
