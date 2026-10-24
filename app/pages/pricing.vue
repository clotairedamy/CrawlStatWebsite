<script setup lang="ts">
usePageSeo({
  title: 'Pricing',
  description: 'CrawlStat is free up to 500 URLs per crawl with every audit included. Pro is $99/year for unlimited URLs and team tools.',
})

const rows: [string, string | boolean, string | boolean][] = [
  ['URLs per crawl', '500', 'Unlimited'],
  ['SEO & accessibility audits', 'All 45', 'All 45'],
  ['Fix-it guidance & audit reference', true, true],
  ['Live crawl view & results table', true, true],
  ['URL detail: inlinks, outlinks, headers', true, true],
  ['Resume interrupted crawls', true, true],
  ['CSV export', true, true],
  ['XLSX export & HTML audit report', false, true],
  ['Crawl comparison', false, true],
  ['Custom extraction (CSS, XPath, regex)', false, true],
  ['Scheduled crawls', false, true],
  ['Bring-your-own-key integrations', false, true],
  ['Support', 'Help centre', 'Priority email'],
]

const faq = [
  {
    q: 'Do I need an account to use the free tier?',
    a: 'No. Download CrawlStat and start crawling. There is no sign-up, no email and no card — the free tier is a product, not a trial.',
  },
  {
    q: 'What happens when a crawl reaches 500 URLs on the free tier?',
    a: 'The crawl stops at 500 URLs and everything it found is yours to explore and export, with every audit run on it. Upgrade to Pro to crawl the rest — the limit lifts for the next crawl.',
  },
  {
    q: 'Does my licence work offline?',
    a: 'Yes. Activating contacts crawlstat.com once; after that the licence is verified on your machine and stays valid for 14 days at a time, refreshed quietly in the background. A crawl is never interrupted by a network problem.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Pro is billed yearly and you can cancel whenever you like. When the subscription ends, CrawlStat falls back to the free tier — it never stops working, and your crawls stay on your disk.',
  },
  {
    q: 'Are the Pro tools all available today?',
    a: 'Unlimited URLs works today. Crawl comparison, custom extraction, scheduled crawls, XLSX/HTML reports and BYOK integrations are rolling out to Pro through updates, at no extra cost to subscribers.',
  },
  {
    q: 'Is my crawl data sent anywhere?',
    a: 'No. Crawls are stored in a file on your own machine. The only thing CrawlStat ever sends is your licence key, when you activate or refresh it. See <a href="/docs/privacy-and-data">Privacy and your data</a>.',
  },
]

const sd = useStructuredData()
useJsonLd(
  sd.software,
  {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/href="\//g, `href="${sd.url('/')}`) },
    })),
  },
  sd.breadcrumbs([['Home', '/'], ['Pricing', '/pricing']]),
)
</script>

<template>
  <div>
    <PageHero
      eyebrow="Pricing"
      title="Simple, honest pricing."
      lead="Every audit is free. Pay only when your sites outgrow 500 URLs — or your team needs the power tools."
    />

    <section class="section-tight">
      <div class="container">
        <PricingCards />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-reveal class="section-head">
          <span class="eyebrow">Compare plans</span>
          <h2 class="h2">Everything, side by side.</h2>
        </div>
        <div v-reveal class="table-wrap neu-inset">
          <table>
            <thead>
              <tr>
                <th />
                <th>Free</th>
                <th class="copper-text">Pro · $99/yr</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rows" :key="r[0]">
                <td>{{ r[0] }}</td>
                <td v-for="(v, i) in [r[1], r[2]]" :key="i">
                  <span v-if="v === true" class="yes"><Icon name="check" :size="16" /></span>
                  <span v-else-if="v === false" class="no">—</span>
                  <span v-else>{{ v }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-reveal class="section-head">
          <span class="eyebrow">Questions</span>
          <h2 class="h2">Frequently asked.</h2>
        </div>
        <FaqList :items="faq" />
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.table-wrap {
  max-width: 920px;
  margin: 0 auto;
  padding: 16px 28px;
  border-radius: 28px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 520px;
}

th,
td {
  padding: 18px 12px;
  text-align: center;
  border-bottom: 1px solid var(--line);
}

th:first-child,
td:first-child {
  text-align: left;
}

tr:last-child td {
  border-bottom: 0;
}

th {
  font-weight: 500;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-soft);
}

td {
  color: var(--text-soft);
  font-weight: 300;
}

td:first-child {
  color: var(--text);
  font-weight: 400;
}

.yes {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--copper-grad);
  color: #2a1c10;
}

.no {
  color: var(--muted);
}
</style>
