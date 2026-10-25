<script setup lang="ts">
usePageSeo({
  title: 'Features',
  description: 'A live crawl view, a results table that keeps up at 500,000 rows, 45 audits with fixes, UX testing for any page, and an engine that keeps memory flat at any crawl size.',
})

const sd = useStructuredData()
useJsonLd(sd.software, sd.breadcrumbs([['Home', '/'], ['Features', '/features']]))

const rows = [
  {
    shot: 'crawl',
    eyebrow: 'Crawl',
    title: 'Watch every response land.',
    body: 'Live counters for crawled, queued and discovered URLs, client and server errors, speed and elapsed time. robots.txt notices show up as they happen. Pause, resume or stop at any time — Ctrl-C safe, and resumable after a crash.',
    points: ['Pause, resume, stop', 'Live URLs/sec and in-flight count', 'Crawl from a URL, a sitemap or a list'],
  },
  {
    shot: 'results',
    eyebrow: 'Results',
    title: 'A table built for the long haul.',
    body: 'Eleven tabs — Internal, External, Response codes, Titles, Meta description, H1, Canonicals, Hreflang, Structured data, Images, Documents — over one fast table. Filter, sort, choose columns and export, all from the keyboard.',
    points: ['Loads 200 rows at a time as you scroll', 'Status filters: 2xx, 3xx, 4xx, 5xx', 'URL detail: issues, inlinks, outlinks, images, headers'],
  },
  {
    shot: 'plan',
    eyebrow: 'Plan',
    title: 'Ten thousand rows is not a to-do list.',
    body: 'Every crawler ends with a table sorted by severity and no answer to the only question you have. CrawlStat ranks the findings by how much of your site’s internal link value they touch and by how many pages a single change fixes — then separates the two template edits from the three hundred individual ones.',
    points: ['Impact from link value, not just severity', 'Tells template fixes apart from page-by-page work', 'A local model can write it up — nothing is uploaded'],
  },
  {
    shot: 'ux-testing',
    eyebrow: 'UX testing',
    title: 'Does this page do its job?',
    body: 'Give CrawlStat one URL. It reads what the page is — a local business, a product, a SaaS signup, a lead form — and what it is asking visitors to do, then tests it against that goal: clarity, hierarchy, navigation, forms, trust, accessibility and the journey to the goal. Findings are ranked by impact, reach, confidence and effort, each with evidence and a fix. For the marketer asking why a landing page does not convert, and the designer who needs evidence rather than opinion.',
    points: ['62 checks, tailored to nine page types', 'Every finding ranked, evidenced and given a fix', 'Retest after the change and see what now passes'],
  },
  {
    shot: 'accessibility',
    eyebrow: 'Accessibility',
    title: 'WCAG 2.2 AA, automated and manual.',
    body: 'The rules a crawler can check — unnamed links and buttons, unlabelled fields, broken ARIA references, missing lang, skipped heading levels, positive tabindex — run over every page. The ones that need a human get a checklist you work through, saved in the crawl file. Test a staging URL before it ships.',
    points: ['Automated checks on every crawled page', 'Manual WCAG 2.2 AA checklist, tracked per crawl', 'Check a single URL without a full crawl'],
  },
  {
    shot: 'compare',
    eyebrow: 'Compare',
    title: 'Did the fix actually work?',
    body: 'Crawl, fix, crawl again. CrawlStat matches pages across the two files and tells you what was fixed, what regressed and which pages started failing. A page that simply stopped being crawled is reported as gone, never as fixed — otherwise the way to a perfect score would be to delete your site.',
    points: ['Pages matched across crawls, not by row id', 'Regressions and newly broken pages first', 'crawlstat-cli compare --fail-on-regression for CI'],
  },
  {
    shot: 'issues',
    eyebrow: 'Issues',
    title: 'A to-do list, not a wall of red.',
    body: 'Findings grouped by severity with a plain-English explanation and how to fix it. Show the affected URLs in one click, export them for whoever owns the fix, or copy a link to the audit’s reference page.',
    points: ['45 SEO & accessibility audits', 'Re-run audits without re-crawling', 'Thresholds tuned to real-world advice'],
  },
  {
    shot: 'projects',
    eyebrow: 'Projects',
    title: 'Every crawl, a file you own.',
    body: 'Each crawl is a single file on your disk. See status mix, errors, warnings and size at a glance — then open, resume or delete. Upgrading CrawlStat improves what an old crawl reports, because the audits live in the app.',
    points: ['One file per crawl, ~2 KB per URL', 'Resume exactly where you stopped', 'Nothing uploaded, ever'],
  },
]

const grid = [
  { icon: 'graph', title: 'Link score', body: 'PageRank over your internal links, scaled 0–100. Find the pages your site actually promotes.' },
  { icon: 'compass', title: 'Journeys', body: 'Walks your site from the home page as a simulated visitor hunting for pricing, support or sign-up — and shows the path, or where it gave up.' },
  { icon: 'graph', title: 'Link graph', body: 'Your whole site as a node-link diagram: rings are clicks from home, size is inlinks, red is broken.' },
  { icon: 'sparkles', title: 'Local AI summaries', body: 'A model running on your machine turns the ranked plan into a client-ready write-up. The exact brief is shown before it is sent, and nothing leaves the machine.' },
  { icon: 'compare', title: 'Redirect chains, hop by hop', body: 'Redirects are followed by hand, so every hop and every loop is recorded — the chain is the finding.' },
  { icon: 'layers', title: 'Near-duplicate detection', body: 'Finds pages that say the same thing in slightly different words, even across a very large site.' },
  { icon: 'globe', title: 'Hreflang validation', body: 'Missing return links, missing self-references and invalid language codes across every alternate.' },
  { icon: 'accessibility', title: 'Accessibility checks', body: 'Links and buttons without names, unlabeled fields, broken ARIA, missing lang, skipped headings and more.' },
  { icon: 'keyboard', title: 'Keyboard first', body: 'Arrows, Page Up/Down, Home/End, ⌘F to filter, ⌘E to export, ⌘N to crawl, ⌘Space to pause.' },
  { icon: 'feather', title: 'Polite by default', body: 'Honours robots.txt and Crawl-delay, paces requests per host and identifies itself as CrawlStatBot.' },
  { icon: 'file', title: 'Structured data & social tags', body: 'JSON-LD, Open Graph and Twitter tags extracted per page, ready to filter and export.' },
  { icon: 'lock', title: 'Offline licence', body: 'Signed entitlements verified on your machine. Works on a plane for 14 days at a time.' },
]

const perf = [
  ['2,000', '5', '8,200', '22 MiB'],
  ['30,000', '10', '9,600', '111 MiB'],
  ['50,000', '20', '11,700', '128 MiB'],
  ['60,000', '10', '10,600', '131 MiB'],
]

const pro = [
  { icon: 'code', title: 'Unlimited URLs', body: 'The free tier crawls 500 URLs per crawl. Pro removes the cap entirely.' },
  { icon: 'code', title: 'Custom extraction', body: 'Pull any value out of every page with CSS, XPath or regex.' },
  { icon: 'clock', title: 'Scheduled crawls', body: 'Crawl on a schedule and come back to fresh results.' },
  { icon: 'file', title: 'XLSX & HTML reports', body: 'Client-ready audit reports and spreadsheets in one click.' },
  { icon: 'plug', title: 'BYOK integrations', body: 'Bring your own API keys; data moves only when you trigger it.' },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Features"
      title="Everything an SEO crawler should be."
      lead="A crawler that keeps memory flat, an app that stays smooth at half a million rows, and 45 audits that tell you what to do next."
    >
      <div class="hero-cta">
        <NuxtLink to="/download" class="btn btn-copper"><Icon name="download" /> Download free</NuxtLink>
        <NuxtLink to="/pricing" class="btn btn-ghost">See pricing</NuxtLink>
      </div>
    </PageHero>

    <section class="section-tight">
      <div class="container rows">
        <div v-for="(r, i) in rows" :key="r.shot" class="row" :class="{ flip: i % 2 === 1 }">
          <div v-reveal class="row-copy">
            <span class="eyebrow">{{ r.eyebrow }}</span>
            <h2 class="h2">{{ r.title }}</h2>
            <p class="muted">{{ r.body }}</p>
            <ul class="check-list">
              <li v-for="p in r.points" :key="p">{{ p }}</li>
            </ul>
          </div>
          <div v-reveal="120" class="row-shot">
            <AppWindow :src="`/screenshots/${r.shot}-dark.png`" :alt="`CrawlStat ${r.eyebrow} screen`" />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-reveal class="section-head">
          <span class="eyebrow">Under the hood</span>
          <h2 class="h2">The details that add up.</h2>
        </div>
        <div class="grid">
          <article v-for="(g, i) in grid" :key="g.title" v-reveal="(i % 3) * 90" class="card g">
            <span class="g-icon"><Icon :name="g.icon as any" :size="22" /></span>
            <h3>{{ g.title }}</h3>
            <p class="muted">{{ g.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container perf">
        <div v-reveal class="perf-copy">
          <span class="eyebrow">Performance</span>
          <h2 class="h2">Memory that plateaus.</h2>
          <p class="muted">
            The crawl queue lives on disk, not in RAM. Doubling a crawl from 30,000 to 60,000 URLs costs 1.19× the
            peak memory — about 717 bytes per extra URL. Crawl size becomes a question of time and disk.
          </p>
          <p class="fine muted">
            Engine benchmark on an Apple Silicon laptop against a loopback test site. On real sites, throughput is bounded
            by the network and politeness settings.
          </p>
        </div>
        <div v-reveal="120" class="perf-table neu-inset">
          <table>
            <thead>
              <tr><th>URLs</th><th>Concurrency</th><th>URLs/sec</th><th>Peak RAM</th></tr>
            </thead>
            <tbody>
              <tr v-for="p in perf" :key="p[0]" :class="{ hi: p[0] === '50,000' }">
                <td v-for="(c, i) in p" :key="i" class="mono">{{ c }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-reveal class="section-head">
          <span class="eyebrow copper-text">Pro</span>
          <h2 class="h2">More power when you need it.</h2>
          <p class="lead">Pro lifts the 500-URL limit today, and these tools roll out to subscribers through updates.</p>
        </div>
        <div class="pro">
          <article v-for="(p, i) in pro" :key="p.title" v-reveal="i * 70" class="pro-item neu-sm">
            <span class="g-icon"><Icon :name="p.icon as any" :size="20" /></span>
            <div>
              <h3>{{ p.title }}</h3>
              <p class="muted">{{ p.body }}</p>
            </div>
          </article>
        </div>
        <div class="center pro-cta">
          <NuxtLink to="/pricing" class="btn btn-copper">Pro is $99/year <Icon name="arrow" :size="18" /></NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.hero-cta {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
}

.rows {
  display: grid;
  gap: 140px;
}

.row {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 72px;
  align-items: center;
}

.row.flip .row-copy {
  order: 2;
}

.row-copy {
  display: grid;
  gap: 20px;
}

.row-copy p {
  font-weight: 300;
  line-height: 1.75;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.g {
  display: grid;
  gap: 12px;
  align-content: start;
  padding: 32px;
}

.g h3,
.pro-item h3 {
  font-size: 1.1rem;
}

.g p,
.pro-item p {
  font-weight: 300;
  font-size: 0.95rem;
  line-height: 1.7;
}

.g-icon {
  width: 48px;
  height: 48px;
  flex: none;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--copper);
  box-shadow: var(--inset-sm);
  margin-bottom: 6px;
}

.perf {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 64px;
  align-items: center;
}

.perf-copy {
  display: grid;
  gap: 20px;
}

.perf-copy p {
  font-weight: 300;
  line-height: 1.75;
}

.fine {
  font-size: 0.82rem;
}

.perf-table {
  padding: 16px 24px;
  border-radius: 26px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 16px 10px;
  text-align: right;
  border-bottom: 1px solid var(--line);
}

th:first-child,
td:first-child {
  text-align: left;
}

th {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

td {
  font-size: 0.92rem;
  color: var(--text-soft);
}

tr:last-child td {
  border-bottom: 0;
}

tr.hi td {
  color: var(--copper-hi);
}

.pro {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.pro-item {
  display: flex;
  gap: 18px;
  padding: 26px;
}

.pro-item h3 {
  margin-bottom: 6px;
}

.pro-cta {
  margin-top: 48px;
}

@media (max-width: 960px) {
  .row,
  .perf {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .row.flip .row-copy {
    order: 0;
  }

  .rows {
    gap: 96px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
