---
title: The plan
description: How CrawlStat ranks findings by impact — link value, leverage and severity — so you know what to fix first instead of staring at ten thousand rows.
section: Using CrawlStat
order: 7
---

## Why a plan and not just a list

The Issues screen tells you what is wrong. It cannot tell you what to do on Monday morning, because severity alone does not say that: a missing title on your home page and a missing title on a page nobody links to are the same finding and emphatically not the same problem.

The Plan screen ranks every finding against the others in the same crawl, so the list reads top to bottom as the order to work in.

## What the ranking is made of

Three numbers, none of them invented.

**Severity** decides the band — an error outranks a warning outranks a notice. It is deliberately coarse. It sets the order of magnitude, not the order.

**Reach** is the share of your site's internal link value sitting on the affected pages, taken from the link score CrawlStat already computes. This is the number that separates a problem on your home page from the same problem on an orphan at depth seven.

**Leverage** is how many pages one change fixes, measured as affected pages divided by *distinct* findings. Thirty-four pages sharing one duplicated title is one job. Thirty-four pages with thirty-four different missing titles is thirty-four jobs. Sorting by severity buries the first behind the second, which is exactly backwards.

## Reading the effort label

Every job is marked with how much work it is, inferred from the data rather than guessed:

- **One template** — many pages, a handful of distinct findings. Almost certainly one include, one component or one setting. The best work on the list.
- **Batch** — several pages per distinct finding. A section, a pattern or a bad import.
- **Page by page** — one fix per page. Honest work, usually last.

On a real 1,929-page crawl the top job was an accessibility error affecting 823 pages that turned out to be **two template changes**, while near-duplicate content touched more of the site and ranked ninth, because it was 278 separate pieces of work.

### Where the effort label is weaker than it looks

It reads the detail CrawlStat recorded for each finding as a *cause*, and for most audits it is one — the duplicate's partner URL, a broken link's target, the offending template. For the handful where the detail is a *measurement*, such as a character count or a response time, two pages sharing a value share nothing, so the count understates the work. Jobs with more than ten distinct findings are kept out of the "one template" category for that reason.

## What the score is not

Impact is **relative to one crawl**. The best job scores 100 and everything else is measured against it. Re-crawl after fixing the top item and the scores redistribute, which is the point.

It is **not a traffic forecast**. CrawlStat has never seen your analytics, and a number dressed up as "+1,200 visits a month" would be a guess wearing a lab coat.

## Writing it up

If you have [Ollama](https://ollama.com) running on your machine, the Plan screen can turn the ranking into a short client-ready write-up. The model runs locally, so no crawl data is uploaded anywhere, and **What was sent** shows you the exact brief before it goes. Nothing here is required: the ranking is computed without it.

See [Settings](/docs/settings) to point CrawlStat at your Ollama endpoint and pick a model.

## From the command line

```bash
crawlstat-cli plan crawl.db
crawlstat-cli plan crawl.db --fail-above 60
```

`--fail-above` exits non-zero when any job scores higher than the threshold, which is how a deploy can be gated on "this change introduced nothing serious".
