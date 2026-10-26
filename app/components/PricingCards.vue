<script setup lang="ts">
const { pricing } = useAppConfig()
const proLink = computed(() => pricing.checkoutUrl || '/download?plan=pro')
const dl = useDownloadCta()

const free = [
  `Up to ${pricing.freeUrlLimit} URLs per crawl`,
  'All 45 SEO & accessibility audits',
  'Fix-it guidance for every issue',
  'Live crawl view, Pages table & URL detail',
  'JavaScript rendering in your own browser',
  'Branded client reports — PDF or web page',
  'CSV & Markdown export',
  'Recrawl & resume interrupted crawls',
  'macOS, Windows & Linux',
]

const pro = [
  'Unlimited URLs per crawl',
  'Everything in Free',
  'UX Testing — page audits, findings workflow, retests',
  'Crawl comparison',
  'Progress since the last crawl in client reports',
  'Coming: custom extraction, scheduled crawls & BYOK integrations',
  'Priority email support',
]
</script>

<template>
  <div class="pricing">
    <div class="cards">
      <article v-reveal class="plan">
        <header>
          <span class="eyebrow">Free</span>
          <div class="price"><span class="amount">$0</span><span class="per">forever</span></div>
          <p class="muted">Everything you need to audit a small site or try CrawlStat on a big one.</p>
        </header>
        <ul class="check-list">
          <li v-for="f in free" :key="f">{{ f }}</li>
        </ul>
        <NuxtLink to="/download" class="btn btn-ghost">{{ dl.label('Download free') }}</NuxtLink>
      </article>

      <article v-reveal="120" class="plan pro">
        <span class="badge"><span class="dot" /> Most popular</span>
        <header>
          <span class="eyebrow copper-text">Pro</span>
          <div class="price">
            <span class="amount copper-text">${{ pricing.proYearly }}</span>
            <span class="per">/ year</span>
          </div>
          <p class="muted">No URL limit, plus the tools agencies and in-house teams lean on every week.</p>
        </header>
        <ul class="check-list">
          <li v-for="f in pro" :key="f">{{ f }}</li>
        </ul>
        <NuxtLink :to="proLink" class="btn btn-copper">
          Go Pro <Icon name="arrow" :size="18" />
        </NuxtLink>
        <p class="fine">Cancel anytime. Your licence works offline for 14 days at a time.</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.pricing {
  display: grid;
  justify-items: center;
}

.cards {
  width: 100%;
  max-width: 920px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  align-items: stretch;
}

.plan {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 44px 40px 40px;
  border-radius: 28px;
  background: linear-gradient(145deg, #2b2d33, #24262a);
  box-shadow: var(--raised-lg);
}

.plan header {
  display: grid;
  gap: 14px;
}

.plan header p {
  font-weight: 300;
  font-size: 0.96rem;
}

.price {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.amount {
  font-size: 3.6rem;
  font-weight: 450;
  letter-spacing: -0.04em;
  line-height: 1;
}

.per {
  color: var(--muted);
}

.check-list {
  flex: 1;
  font-size: 0.96rem;
}

.plan .btn {
  width: 100%;
}

.pro {
  box-shadow:
    var(--raised-lg),
    inset 0 0 0 1px rgba(227, 173, 123, 0.22);
}

.badge {
  position: absolute;
  top: 22px;
  right: 22px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  box-shadow: var(--inset-sm);
  font-size: 0.74rem;
  color: var(--copper-hi);
}

.fine {
  margin-top: -16px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--muted);
}

@media (max-width: 820px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
