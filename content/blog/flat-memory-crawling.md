---
title: "The database is the frontier: how CrawlStat keeps memory flat"
description: CrawlStat has no in-memory crawl queue. The SQLite file is the queue, the seen-set and the results, which is why 50,000 URLs fit in 128 MiB and doubling a crawl barely moves peak memory.
date: 2026-10-14
author: The CrawlStat team
tag: Engineering
readingTime: 7
---

Most crawlers have a memory problem, and it's built into how they're designed.

A crawler has to keep track of three things: the URLs it still has to visit (the *frontier*), the URLs it has already seen (so it doesn't fetch them twice), and everything it learned from the pages it has fetched. The obvious way to build one keeps all three in RAM. A queue, a hash set, and a growing pile of page records.

That works fine until it doesn't. Every one of those structures grows with the size of the crawl. The link graph grows even faster, because a page has many links. Crawl a big enough site and you're watching the memory graph, tuning heap sizes, and wondering whether the crawl will finish before the machine starts swapping.

We wanted crawl size to depend on time and disk space, not on RAM. Here's how CrawlStat does that.

## There is no queue

The CrawlStat engine has no in-memory queue and no in-memory seen-set. Both of those jobs belong to the `urls` table in the crawl's SQLite file.

A unique index on a *dedup key* handles deduplication. When the engine finds links on a page, it inserts them all and lets the index reject any it has already seen:

```sql
INSERT INTO urls
    (url, dedup_key, depth, state, kind, is_internal, discovered_from, discovered_via)
VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)
ON CONFLICT (dedup_key) DO NOTHING
```

Taking work off the frontier is a single statement too. The crawl loop claims a batch of queued URLs, lowest depth first, and marks them as in progress in the same step:

```sql
UPDATE urls SET state = ?1, attempts = attempts + 1
WHERE id IN (
    SELECT id FROM urls WHERE state = ?2 ORDER BY depth, id LIMIT ?3
)
RETURNING id, url, depth, kind, is_internal, attempts
```

Ordering by `depth` makes the crawl breadth-first. Using `id` as the tiebreaker makes the order deterministic for a given discovery sequence. An index on `(state, depth, id)` keeps the claim cheap however large the table gets.

The dedup key is deliberately not the URL itself. The URL we fetch only gets changes that are safe and don't alter meaning: a lowercased host, no fragment, no default port, resolved dot segments. Your policy choices (trailing slashes, tracking parameters, `index.html`) only affect the *key*. So the first version of a URL the engine sees is the version it fetches and shows you, and later variants of the same page are skipped.

## One writer, one transaction per batch

All database work happens on a single blocking thread. The async workers fetch pages concurrently on tokio and send their results to that thread, which writes them in batches.

Each batch is **one transaction**. It holds the finished pages *and* the URLs discovered on them, so either both are written or neither is. A crash can never leave a page marked done while the links it found are missing. That's what makes a crawl resumable:

```bash
crawlstat-cli resume crawl.db
```

You get crash safety without writing any recovery code, because the state you'd need to recover was never in memory in the first place.

## Why memory plateaus

If the crawl state lives on disk, what's using RAM? Mostly SQLite's page cache, and we set its size explicitly:

```sql
PRAGMA journal_mode = WAL;
PRAGMA temp_store = FILE;
PRAGMA cache_size = -65536;  -- 64 MiB
```

That 64 MiB cache keeps the frontier's hot index in memory. It's a **fixed** cost. A crawl fills it, and from then on the cache doesn't grow, however many URLs you add. That's the plateau you see in the benchmarks.

A few other decisions protect that property:

- **`temp_store = FILE`.** Building indexes over a few hundred thousand rows involves a lot of sorting. With `temp_store = MEMORY`, those sorts happen in RAM, which is exactly the growth we're trying to avoid.
- **Analysis indexes are built at the end.** The crawl only creates the indexes it needs while it runs. The ones used for analysis get built once the crawl finishes, so they don't slow down hundreds of thousands of inserts.
- **Links store the target's dedup key, not its row id.** A page's links can be written in one batch without first looking up ids for targets that may not exist yet.
- **Link score runs in SQL.** CrawlStat's link score is PageRank (damping 0.85, rescaled so the strongest page is 100). It runs as indexed passes over an edge table on disk, not over an in-memory graph. The edge list grows with the crawl, so holding it in memory would break everything above.
- **WAL mode** lets the app read the crawl while the engine writes to it.

The UI follows the same rule. The results table fetches 200 rows at a time as you scroll and keeps at most 20 pages in memory. While a crawl runs, the live view keeps only the last 300 URLs, since every one of them is already on disk.

## The numbers

We measured on an Apple Silicon laptop against a local test site served over loopback. That makes these engine-bound numbers, not network-bound ones:

| Crawl | Concurrency | Throughput | Peak RSS | Database |
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

Measuring peak memory turned out to be easy to get wrong. `ru_maxrss` is a per-process high-water mark, so two crawls in the same process can't be compared: the second inherits the first one's peak. Each measurement runs in its own fresh process.

The flatness test does exactly that. It runs a profiling binary twice as subprocesses, at two crawl sizes, and compares the peaks:

```bash
cargo test --release --test perf_memory     -- --ignored --nocapture
cargo test --release --test perf_throughput -- --ignored --nocapture
cargo test --release --test perf_flatness   -- --ignored --nocapture

# One crawl in a fresh process, with a memory curve over time
cargo run --release --example memory_profile -- 50000 20
```

So flat memory is a design goal with a test behind it. If a change makes memory grow with crawl size, a test fails.

## The trade-off

Nothing is free. Writing every URL to SQLite costs more than pushing it onto a `VecDeque`, and having a single writer thread puts an upper limit on how fast you can commit. In practice, that limit is the five-figure URLs-per-second throughput in the table above, far beyond what any polite crawl of a real server will reach. We pay some CPU so that crawl size never depends on RAM, and we think that's the right trade for a tool that runs on a laptop.

We get two bonuses out of it as well. Every crawl is a single file you can keep, copy or open later. And a crash only costs you the batch that hadn't been committed yet, not the whole afternoon.

## Try it on something big

The free tier crawls up to 500 URLs with every audit included. To see the memory graph stay flat on a big site, [Pro](/pricing) removes the limit. Either way, start by [downloading CrawlStat](/download).
