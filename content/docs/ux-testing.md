---
title: UX testing
description: Point CrawlStat at one page and get a UX audit built around what that page is for — what kind of page it is, what it asks visitors to do, what gets in their way, and what to fix first.
section: Using CrawlStat
order: 8.5
---

::callout{type="note"}
UX Testing is part of **CrawlStat Pro**. On the free plan the tab is visible with a preview of what it does; activate a Pro licence in **Settings › Licence** to run audits. See [Licensing](/docs/licensing).
::

## The question this answers

*Does this page do its job?*

Not "is the markup valid" or "is the title too long", although those come up. The question is whether a visitor who lands here can work out what is on offer, trust it, and do the one thing the page exists for — book, buy, sign up, get in touch.

That is normally answered in a usability session or a design review, which is slow, or by opinion, which is fast and unconvincing. UX testing gives you a structured first pass in seconds, with the evidence attached to every finding, so the review starts from facts rather than taste.

::screenshot{src="/screenshots/ux-testing-dark.png" alt="The UX Testing screen showing summary tiles for critical and high findings, passed checks, coverage and confidence, then what the page is, and a ranked list of findings to fix first" caption="UX Testing on a local law firm's home page: what the page is, how it scored, and what to fix first."}
::

## What it reads first

Before judging anything, CrawlStat works out what the page is. The **Overview** opens with *What this page is*: the intent, the goal under test, the title, main heading and offer, the main call to action and the other actions competing with it, the forms, the navigation, the trust signals on show and the word count.

It then places the page in one of nine types, each defined by the thing it exists to get a visitor to do:

| Page type | What it is for |
|---|---|
| SaaS product | Start a trial, sign up or book a demo |
| Local business or service | Call, book or request a quote |
| Ecommerce product | Add to cart and check out |
| Agency or freelancer | Get in touch about a project |
| Lead generation | Submit the form |
| Waitlist or launch | Join the list |
| Content or campaign | Read, then take the next step |
| Marketplace or directory | Search, then open a listing |
| Other | Take the page's main action |

The type is a vote over signals in the markup — structured data, call-to-action wording, click-to-call links, an address, opening hours, a byline, a search box, the shape of the forms. **Why this type** lists the signals that won, and the confidence figure says how far ahead of the runner-up the winner was. A page with nothing pointing clearly anywhere is called *Other* rather than forced into a type.

If CrawlStat has it wrong, override the type and the goal in **Setup**. Everything downstream — which checks run, which journey is tested — follows your choice.

## Setting up a test

**Setup** is where you describe the visit you care about:

- **Page type** and **goal** — detected for you, or chosen.
- **Audience** — who they are, whether they are new, returning or expert, and where they came from: search, ads, social, email, a referral or directly.
- **Device** — desktop, mobile, tablet or all of them.
- **Depth** — *Quick*, *Standard* or *Deep*. Deep includes everything Standard does, and more.
- **Constraints and context** — anything a reviewer should know, in your own words.

The page itself comes from the open crawl if the crawl kept its HTML. If it did not, or the URL is not in the crawl at all, CrawlStat can make a single live fetch — and still honours `robots.txt` while doing it.

## The checks

There are 62 checks across ten areas: clarity and content, visual hierarchy, navigation, forms, responsive, accessibility, trust and risk, performance signals, journey completion and consistency.

Thirty-eight apply to every page. The other 24 only run on the page type they belong to, because the questions differ: a product page has to show a price, stock and returns; a local business has to say where it works, when it is open and how to call; a SaaS page has to make pricing findable and the trial terms clear; a waitlist needs a launch date and a no-spam promise.

Depth decides how many of the baseline checks run — 13 at Quick, 31 at Standard, all 38 at Deep.

Each check also says *how* it was decided, because that is how much you should believe it: from the markup, from crawl data, by a heuristic worth confirming, or not at all because it needs a real browser or a person.

## Five results, never one score

Every check ends in one of five states, and they are counted separately on purpose:

- **Pass** and **Fail**.
- **Needs review** — the evidence points one way, but a person should confirm it.
- **Not tested** — the check needs something CrawlStat does not have. Contrast, reflow at 320 px, tap target size, keyboard use, hover and focus states, and script errors all need a rendered page, so they are always here.
- **Blocked** — stopped by a guardrail. CrawlStat never submits your forms, so their error and success messages are never seen. Test those with synthetic data on a staging site.

The tiles at the top of the screen are deliberately several numbers rather than one:

- **Coverage** — the share of selected checks that actually ran.
- **Confidence** — of the checks that ran, the share whose evidence is verified rather than inferred.
- **Retest pass rate** — how many findings passed when you tested the page again. Empty until you have retested.

A page cannot reach a perfect score by having most of its checks skipped. Low coverage is visible right next to the pass count.

## Fix these first

Every finding is scored from 1 to 5 on four things — **impact**, **reach**, **confidence** and **effort** — and ranked by

> priority = impact × reach × confidence ÷ effort

so a large, certain, widespread problem that is cheap to fix comes first, and a speculative one that needs a rebuild sinks. The maximum is 125. **Critical findings escalate**: a page that does not load, a product page with no price or no way to buy goes straight to the top whatever the arithmetic says.

Severity is kept separate from confidence and effort, so a critical problem you are not sure about still reads as critical — and still tells you it needs confirming.

Open any finding in **Findings** for the user goal it gets in the way of, the consequence, where on the page it is and which devices it affects, the evidence and how far that evidence was verified, and a recommendation: the problem, why it matters, the change to make, acceptance criteria and how to check the fix worked. Before-and-after copy is labelled as a template, not presented as the answer.

## Journeys

The **Journeys** tab runs the page's goal as a [journey](/docs/journeys) over the crawl: a simulated visitor starts at the home page and follows link text towards contact, sign-up, checkout or booking. A *Deep* test also checks that pricing, contact and privacy are reachable. A goal more than three clicks away is reported as buried.

Journeys need the page's site in the open crawl. Without one there is no map to walk.

## Retest

Each finding has a status you can move along as the work happens: *Open*, *Planned*, *In progress*, *Ready to retest*, *Resolved*, or *Accepted as known limitation* for the ones you have decided to live with.

When the change ships, **Retest** tests the page again and links the new run to the original, so you can see what now passes rather than assuming it does. Runs are saved, and the history menu at the top of the screen reopens any of them.

## Export

**Export** writes the audit out as a report for whoever owns the change — the findings, their evidence and recommendations, and the limitations of the run. Email addresses and token-like query parameters are masked before anything is written.

## What it is, and what it is not

UX testing reads the HTML. It does not open a browser, so there are no screenshots of the page, no rendered layout, no measured colour contrast and no JavaScript. Checks that need those are marked *Not tested*, never guessed.

- **Forms are inspected, never submitted.** Their error and success states are unverified.
- **Automated accessibility checks catch only a fraction of WCAG failures.** This is not an accessibility audit — see [Accessibility](/docs/accessibility) for the checklist that is.
- **Page type, severity and priority are estimates made by rules**, and they are labelled as estimates.
- **A live fetch is one view of the page.** A visitor who is signed in, in another country or on a phone may be served something different.
- **A page with very little text was probably built by JavaScript**, so most of what a visitor sees was not there to check. The run says so.

And it never promises a conversion lift. It tells you what is in the way and how sure it is; whether removing it moves the numbers is still a job for your analytics.
