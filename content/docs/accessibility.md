---
title: Accessibility
description: The WCAG 2.2 checks CrawlStat runs automatically on every page, the manual checklist it tracks for you, and the honest line between the two.
section: Using CrawlStat
order: 9
---

## Two halves of the same job

Accessibility conformance splits cleanly into rules a machine can check and rules it cannot, and pretending otherwise is how tools end up claiming a green tick for a site nobody can use.

CrawlStat runs the first half over every page it crawls. The second half is a checklist you work through, stored in the crawl file so your notes travel with the evidence.

## What is checked automatically

These run on every crawled page as part of the audit pass, with no extra step:

- **Links and buttons with no accessible name** — nothing for a screen reader to announce, and nothing for voice control to target.
- **Form fields with no label** — no `<label for>`, no `aria-label`, no `aria-labelledby`. A placeholder is not a label: it vanishes on focus and several screen readers ignore it.
- **Broken ARIA references** — `aria-labelledby` or `aria-describedby` pointing at an id that is not on the page.
- **Invalid ARIA roles** — a role that is not in the ARIA 1.2 vocabulary, which browsers simply ignore.
- **Duplicate element ids** — which quietly break every ARIA reference that points at them.
- **Positive `tabindex`** — forces an artificial tab order that almost never matches the visual one.
- **Missing `lang`** — screen readers guess the pronunciation language without it.
- **Iframes with no title** — announced as "frame" and nothing else.
- **Skipped heading levels** — an `h2` followed by an `h4` breaks the outline people navigate by.

These are the checks that static markup can support honestly. Contrast, focus order, reading order against the visual layout and anything that depends on rendering are **not** checked, because CrawlStat has no browser — and a tool that guessed at them would be worse than one that says so.

## The manual checklist

The Accessibility screen lists the WCAG 2.2 AA success criteria that need a person, with space to record a pass, a fail or a note against each. The state is saved in the crawl file, so re-opening a crawl six months later brings your reasoning with it, and the exported report carries both halves.

## Checking a single page

You do not always want a full crawl. **Test a page now** takes any URL — including a staging build or a page behind a link you have not published — and runs the automated rules against it on its own.

One caveat: this fetches the HTML the server sends. A page that builds its interface in JavaScript after load will show very little, because there is nothing in the markup yet to check.

## Exporting

**Export report** writes the automated findings and your manual results together. The audits each carry a plain-English explanation and a fix, so the export is readable by whoever owns the change rather than only by whoever ran the crawl.
