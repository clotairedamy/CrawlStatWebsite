<script setup lang="ts">
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
      { to: '/contact', label: 'Contact' },
    ],
  },
]

const dl = useDownloadCta()
const letters = [...'CrawlStat']

// The letters rise as soon as the name starts to come into view. It sits at
// the very bottom of the page, below where `v-reveal` would ever fire.
const word = ref<HTMLElement>()
const shown = ref(false)
onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (!e?.isIntersecting) return
    shown.value = true
    io.disconnect()
  })
  io.observe(word.value!)
  onBeforeUnmount(() => io.disconnect())
})

function toTop() {
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="grid">
        <div class="about">
          <NuxtLink to="/" class="brand">
            <BrandOwl variant="wordmark" :height="46" />
            <span>CrawlStat</span>
          </NuxtLink>
          <p class="muted">
            The SEO crawler that runs on your machine, for macOS, Windows and Linux.
          </p>
          <div class="actions">
            <NuxtLink to="/download" class="btn btn-copper btn-sm">
              <Icon :name="dl.icon" :size="16" /> {{ dl.label('Download free') }}
            </NuxtLink>
            <NuxtLink to="/contact" class="round" aria-label="Contact"><Icon name="mail" :size="18" /></NuxtLink>
            <a href="/blog/rss.xml" class="round" aria-label="Blog RSS feed"><Icon name="rss" :size="18" /></a>
          </div>
        </div>

        <nav v-for="col in columns" :key="col.title" class="col" :aria-label="col.title">
          <span class="eyebrow">{{ col.title }}</span>
          <NuxtLink v-for="l in col.links" :key="l.to" :to="l.to">{{ l.label }}</NuxtLink>
        </nav>
      </div>

      <div class="legal">
        <span>© {{ year }} CrawlStat</span>
        <span class="pill"><span class="dot" /> Your crawl data never leaves your machine</span>
        <button type="button" class="top" @click="toTop">
          Back to top <span class="round"><Icon name="arrow" :size="16" /></span>
        </button>
      </div>
    </div>

    <!-- The owl and the name, pressed into the page. Decorative: the brand
         link above already says it to screen readers. -->
    <div ref="word" class="sign" :class="{ shown }" aria-hidden="true">
      <div class="crest">
        <BrandOwl variant="wordmark" :height="220" />
      </div>
      <div class="word">
        <span v-for="(c, i) in letters" :key="i" class="ch" :style="{ '--i': i }">{{ c }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 96px 0 0;
  overflow: hidden;
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-deep) 100%);
  border-top: 1px solid var(--line);
}

.grid {
  display: grid;
  grid-template-columns: 1.6fr repeat(3, 1fr);
  gap: 48px;
  padding-bottom: 56px;
}

.about {
  display: grid;
  gap: 20px;
  align-content: start;
  max-width: 340px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.15rem;
  font-weight: 500;
}

.about p {
  font-size: 0.94rem;
  font-weight: 300;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.round {
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--text-soft);
  background: var(--bg);
  box-shadow: var(--raised-sm);
  transition:
    color 0.2s,
    box-shadow 0.3s var(--ease),
    translate 0.3s var(--ease);
}

a.round:hover {
  color: var(--text);
  translate: 0 -2px;
}

a.round:active {
  box-shadow: var(--inset-sm);
}

.col {
  display: grid;
  gap: 12px;
  align-content: start;
  justify-items: start;
}

.col .eyebrow {
  margin-bottom: 8px;
}

/* The underline draws in from the left. */
.col a {
  padding-bottom: 2px;
  color: var(--text-soft);
  font-size: 0.94rem;
  font-weight: 300;
  background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat;
  transition:
    color 0.2s,
    background-size 0.35s var(--ease);
}

.col a:hover,
.col a.router-link-active {
  color: var(--text);
  background-size: 100% 1px;
}

.legal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 28px 0;
  border-top: 1px solid var(--line-strong);
  font-size: 0.86rem;
  color: var(--muted);
}

.top {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border: 0;
  padding: 0;
  background: none;
  font: inherit;
  color: var(--text-soft);
  cursor: pointer;
}

.top .round .icon {
  rotate: -90deg;
}

.top:hover {
  color: var(--text);
}

.top:hover .round {
  translate: 0 -3px;
}

.top:active .round {
  box-shadow: var(--inset-sm);
}

/* The owl, embossed the same way as the name below it. It spreads its
   wings as it rises, just before the letters come up. */
.sign {
  margin-top: 56px;
}

.crest {
  display: flex;
  justify-content: center;
}

.crest :deep(.owl) {
  height: clamp(96px, 18vw, 230px) !important;
}

.js .crest :deep(.owl) {
  opacity: 0;
  scale: 0.55 0.9;
  translate: 0 40px;
  transition:
    opacity 1s var(--ease),
    scale 1.4s var(--ease),
    translate 1.2s var(--ease);
}

.js .shown .crest :deep(.owl) {
  opacity: 1;
  scale: 1;
  translate: 0 0;
}

/* Embossed: the letters are the page colour, lit from the top left like
   every other raised surface on the site. */
.word {
  display: flex;
  justify-content: center;
  margin: 8px 0 -0.12em;
  font-size: clamp(64px, 17.5vw, 250px);
  font-weight: 600;
  letter-spacing: -0.055em;
  line-height: 1;
  color: var(--bg-deep);
  text-shadow:
    -2px -2px 2px var(--shade-light),
    4px 5px 9px var(--shade-dark);
  user-select: none;
}

.js .word .ch {
  display: inline-block;
  transform: translateY(70%);
  opacity: 0;
  transition:
    transform 1.1s var(--ease),
    opacity 1.1s var(--ease);
  transition-delay: calc(var(--i) * 55ms + 150ms);
}

.js .shown .ch {
  transform: none;
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .js .crest :deep(.owl) {
    opacity: 1;
    scale: none;
    translate: none;
    transition: none;
  }

  .js .word .ch {
    transform: none;
    opacity: 1;
    transition: none;
  }
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
