<script setup lang="ts">
useSeoMeta({
  title: '',
  ogTitle: 'CrawlStat — the SEO crawler that runs on your machine',
  ogDescription: 'Fast, local-first desktop SEO crawler. 45 audits with fix-it guidance, flat memory at any size, and no server — ever.',
})

const dl = useDownloadCta()

const stats = [
  { to: 11700, suffix: '', unit: 'URLs / sec', note: 'engine throughput, 50k-URL benchmark' },
  { to: 128, suffix: ' MiB', unit: 'peak memory', note: 'for a 50,000-URL crawl' },
  { to: 45, suffix: '', unit: 'audits', note: 'SEO and accessibility, with fixes' },
  { to: 0, suffix: '', unit: 'servers', note: 'your crawl never leaves your machine' },
]

const pillars = [
  {
    icon: 'lock',
    title: 'Local first',
    body: 'Crawls run on your machine and land in a single file on your disk. No upload, no account, no quota on someone else’s server.',
  },
  {
    icon: 'layers',
    title: 'Flat memory',
    body: 'The crawl frontier lives in SQLite, not RAM. Doubling a crawl from 30k to 60k URLs costs 1.19× the memory. Size is a question of time, not of RAM.',
  },
  {
    icon: 'sparkle',
    title: 'Fixes, not just flags',
    body: 'Every one of the 45 audits explains what is wrong, why it matters and exactly how to fix it — in plain English, right next to the affected URLs.',
  },
] as const
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="pill intro"><span class="dot dot-pulse" /> {{ dl.available ? 'Now available for' : 'Coming soon to' }} macOS, Windows & Linux</span>
          <h1 class="display copper-text">Crawl it all.<br>Fix what matters.</h1>
          <p class="lead">
            CrawlStat is a desktop SEO crawler built in Rust. It finds broken links, redirect chains, duplicate
            content and 40-odd other problems — and tells you how to fix each one.
          </p>
          <div class="hero-cta">
            <NuxtLink to="/download" class="btn btn-copper">
              <Icon :name="dl.icon" /> {{ dl.label('Download free') }}
            </NuxtLink>
            <NuxtLink to="/features" class="btn btn-ghost">
              Take the tour <Icon name="arrow" :size="18" />
            </NuxtLink>
          </div>
          <p class="hero-note muted">Free up to 500 URLs per crawl · No account · No card</p>
        </div>
        <HeroArt class="hero-art" />
      </div>
    </section>

    <!-- Product shot -->
    <section class="showcase">
      <div class="container">
        <AppWindow src="/screenshots/results-dark.png" alt="The CrawlStat results table" tilt eager />
      </div>
    </section>

    <!-- Numbers -->
    <section class="section-tight">
      <div class="container">
        <div class="stats">
          <div v-for="(s, i) in stats" :key="s.unit" v-reveal="i * 90" class="stat">
            <div class="stat-num copper-text"><CountUp :to="s.to" />{{ s.suffix }}</div>
            <div class="stat-unit">{{ s.unit }}</div>
            <div class="stat-note muted">{{ s.note }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pillars -->
    <section class="section">
      <div class="container">
        <div v-reveal class="section-head">
          <span class="eyebrow">Why CrawlStat</span>
          <h2 class="h2">Faster, lighter, and kinder to your laptop.</h2>
          <p class="lead">The incumbents were built for a different decade. CrawlStat starts from a blank page.</p>
        </div>
        <div class="pillars">
          <article v-for="(p, i) in pillars" :key="p.title" v-reveal="i * 120" class="card pillar">
            <span class="pillar-icon"><Icon :name="p.icon" :size="24" /></span>
            <h3 class="h3">{{ p.title }}</h3>
            <p class="muted">{{ p.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Tour -->
    <section class="section tour-section">
      <div class="container">
        <div v-reveal class="section-head">
          <span class="eyebrow">Inside the app</span>
          <h2 class="h2">Designed for the hour you spend in it.</h2>
          <p class="lead">Keyboard-driven, monospaced where it counts, and calm enough to read for an afternoon.</p>
        </div>
        <ScreenTour v-reveal />
      </div>
    </section>

    <!-- Audits -->
    <section class="section">
      <div class="container">
        <div v-reveal class="section-head">
          <span class="eyebrow">45 audits</span>
          <h2 class="h2">Every check, explained.</h2>
          <p class="lead">
            From 5xx errors to missing hreflang return links to buttons a screen reader can’t name. Each audit has its own
            reference page — the same text you see in the app.
          </p>
        </div>
      </div>
      <AuditMarquee v-reveal />
      <div class="container center">
        <NuxtLink to="/docs/audits" class="btn btn-ghost audits-link">
          Browse the audit reference <Icon name="arrow" :size="18" />
        </NuxtLink>
      </div>
    </section>

    <!-- Privacy band -->
    <section class="section-tight">
      <div class="container">
        <div v-reveal class="privacy neu-inset">
          <div>
            <span class="eyebrow">Private by design</span>
            <h2 class="h2">Your crawl is yours.</h2>
          </div>
          <ul class="check-list">
            <li>Crawl data never leaves your machine — one SQLite file per crawl.</li>
            <li>Works on a plane: the licence is verified offline for 14 days at a time.</li>
            <li>Polite by default: honours robots.txt and identifies itself as CrawlStatBot.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="section">
      <div class="container">
        <div v-reveal class="section-head">
          <span class="eyebrow">Pricing</span>
          <h2 class="h2">Free to start. One plan when you grow.</h2>
          <p class="lead">Every audit is in the free tier. Pro lifts the URL limit and adds the tools teams use weekly.</p>
        </div>
        <PricingCards />
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.hero {
  padding: 56px 0 40px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;
}

.hero-copy {
  display: grid;
  gap: 28px;
  justify-items: start;
}

.hero-copy > * {
  animation: up 1s var(--ease) both;
}

.hero-copy > :nth-child(2) {
  animation-delay: 0.08s;
}

.hero-copy > :nth-child(3) {
  animation-delay: 0.16s;
}

.hero-copy > :nth-child(4) {
  animation-delay: 0.24s;
}

.hero-copy > :nth-child(5) {
  animation-delay: 0.32s;
}

@keyframes up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

.hero-copy .lead {
  max-width: 500px;
}

.hero-cta {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.hero-note {
  font-size: 0.84rem;
  letter-spacing: 0.02em;
}

.hero-art {
  max-width: 560px;
  justify-self: end;
}

.showcase {
  padding: 40px 0 40px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

.stat {
  padding: 32px 28px;
  border-radius: var(--radius);
  box-shadow: var(--inset);
  display: grid;
  gap: 4px;
}

.stat-num {
  font-size: clamp(2.2rem, 3.6vw, 3rem);
  font-weight: 450;
  letter-spacing: -0.04em;
  line-height: 1.1;
}

.stat-unit {
  font-size: 1rem;
}

.stat-note {
  font-size: 0.82rem;
  font-weight: 300;
}

.pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.pillar {
  display: grid;
  gap: 18px;
  align-content: start;
  padding: 40px 34px;
}

.pillar p {
  font-weight: 300;
  line-height: 1.7;
}

.pillar-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--copper);
  box-shadow: var(--inset-sm);
  margin-bottom: 8px;
}

.tour-section {
  background: radial-gradient(ellipse at 50% 30%, rgba(227, 173, 123, 0.05), transparent 60%);
}

.audits-link {
  margin-top: 40px;
}

.privacy {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 56px;
  align-items: center;
  padding: 64px;
  border-radius: 32px;
}

.privacy .eyebrow {
  margin-bottom: 18px;
}

@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-art {
    justify-self: center;
    max-width: 480px;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
  }

  .pillars {
    grid-template-columns: 1fr;
  }

  .privacy {
    grid-template-columns: 1fr;
    padding: 44px 32px;
    gap: 32px;
  }
}

@media (max-width: 520px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 88px 0;
  }
}
</style>
