---
title: Local AI
description: Have a language model on your own machine write up a crawl, with nothing uploaded and the exact brief shown before it is sent, then put it in a client report.
section: Account & data
order: 17
---

## Why local

CrawlStat's promise is that crawl data never leaves your machine. A report written by a cloud model would break that promise in the most literal way possible: it would post your client's site structure, page titles and problems to someone else's computer.

So the model runs on your machine, through [Ollama](https://ollama.com). The default endpoint is `http://127.0.0.1:11434` — a loopback address, which means the request cannot leave the host.

## Setting it up

1. Install Ollama from [ollama.com](https://ollama.com).
2. Pull a model: `ollama pull qwen3:8b`
3. In CrawlStat, open **Settings → Local AI** and press **Test**. CrawlStat lists the models you have installed; pick one.

Then open a crawl's **Plan** tab and click **Write the report**.

## Using what it writes

The written report stays with the crawl until you quit CrawlStat. From the Plan tab you can copy it, save it as **Markdown**, or click **Export PDF** to put it in a [client report](/docs/client-reports), where it becomes the summary page straight after the cover. The **Export report** dialog also offers **Include the written report** whenever one exists for the crawl.

## Nothing here is required

The ranked plan is computed in full without any model involved. The only thing this adds is prose on top of numbers that already exist. With Ollama absent, you lose a paragraph, not a feature — and CrawlStat never needs a network connection to crawl or to audit.

## What is actually sent

A compact brief: the ranked jobs, their counts and scores, and one example URL each. Not page bodies, not the crawl database.

The **What is sent** button shows you that brief, in full, before you send it. A privacy claim nobody can check is worth very little.

## If you point it somewhere else

The endpoint is editable, because some people run Ollama on a machine under their desk. If you set it to anything that is not loopback, CrawlStat says so plainly in Settings — at that moment crawl summaries do leave your computer, and you should know it.
