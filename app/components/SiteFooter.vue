<script setup lang="ts">
const { site } = useAppConfig()
const year = new Date().getFullYear()

const columns = [
  {
    title: 'Product',
    links: [
      { to: '/features', label: 'Features' },
      { to: '/pricing', label: 'Pricing' },
      { to: '/download', label: 'Download' },
      { to: '/docs/audits', label: 'Audit reference' },
    ],
  },
  {
    title: 'Help',
    links: [
      { to: '/docs', label: 'Help centre' },
      { to: '/docs/getting-started', label: 'Getting started' },
      { to: '/docs/keyboard-shortcuts', label: 'Keyboard shortcuts' },
      { to: '/docs/licensing', label: 'Licensing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/blog', label: 'Blog' },
      { to: '/bot', label: 'CrawlStatBot' },
      { to: '/docs/privacy-and-data', label: 'Privacy' },
      { to: `mailto:${site.email}`, label: 'Contact' },
    ],
  },
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="grid">
        <div class="about">
          <NuxtLink to="/" class="brand">
            <img src="/brand/app-icon-64.png" alt="" width="40" height="40">
            <span>CrawlStat</span>
          </NuxtLink>
          <p class="muted">
            The SEO crawler that runs on your machine. Built in Rust and Flutter, for macOS, Windows and Linux.
          </p>
          <div class="social">
            <a :href="`mailto:${site.email}`" aria-label="Email"><Icon name="mail" :size="18" /></a>
            <a href="/blog/rss.xml" aria-label="Blog RSS feed"><Icon name="rss" :size="18" /></a>
          </div>
        </div>

        <div v-for="col in columns" :key="col.title" class="col">
          <span class="eyebrow">{{ col.title }}</span>
          <NuxtLink v-for="l in col.links" :key="l.to" :to="l.to">{{ l.label }}</NuxtLink>
        </div>
      </div>

      <hr class="divider">

      <div class="legal">
        <span>© {{ year }} CrawlStat</span>
        <span class="pill"><span class="dot" /> Your crawl data never leaves your machine</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 96px 0 40px;
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-deep) 100%);
}

.grid {
  display: grid;
  grid-template-columns: 1.6fr repeat(3, 1fr);
  gap: 48px;
  padding-bottom: 64px;
}

.about {
  display: grid;
  gap: 20px;
  align-content: start;
  max-width: 320px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.15rem;
}

.brand img {
  border-radius: 10px;
  box-shadow: var(--raised-sm);
}

.about p {
  font-size: 0.94rem;
  font-weight: 300;
}

.social {
  display: flex;
  gap: 14px;
}

.social a {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--text-soft);
  box-shadow: var(--raised-sm);
  transition: color 0.2s;
}

.social a:hover {
  color: var(--copper);
}

.col {
  display: grid;
  gap: 12px;
  align-content: start;
}

.col .eyebrow {
  margin-bottom: 8px;
}

.col a {
  color: var(--text-soft);
  font-size: 0.94rem;
  font-weight: 300;
  transition: color 0.2s;
}

.col a:hover {
  color: var(--copper-hi);
}

.legal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding-top: 32px;
  font-size: 0.86rem;
  color: var(--muted);
}

@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }

  .about {
    grid-column: 1 / -1;
  }
}
</style>
