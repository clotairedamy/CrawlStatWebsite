<script setup lang="ts">
const { downloads, pricing } = useAppConfig()
const route = useRoute()
const wantsPro = computed(() => route.query.plan === 'pro')
const dl = useDownloadCta()

useJsonLd(useStructuredData().breadcrumbs([['Home', '/'], ['Download', '/download']]))
usePageSeo({
  title: 'Download',
  description: 'Download CrawlStat for macOS, Windows or Linux. Free up to 500 URLs per crawl, no account needed.',
})

// Highlight the visitor's own platform once we can see it.
const detected = ref<string>()
onMounted(() => {
  const ua = navigator.userAgent
  detected.value = /Mac/.test(ua) ? 'macos' : /Win/.test(ua) ? 'windows' : /Linux/.test(ua) ? 'linux' : undefined
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Download"
      :title="dl.available ? 'Get CrawlStat.' : 'Coming soon.'"
      :lead="dl.available
        ? `Version ${downloads.version} · Free up to ${pricing.freeUrlLimit} URLs per crawl · No account needed`
        : `CrawlStat is almost ready for macOS, Windows and Linux. Free up to ${pricing.freeUrlLimit} URLs per crawl, no account needed.`"
    >
      <NuxtLink v-if="!dl.all" to="/contact?topic=launch" class="btn btn-ghost">
        <Icon name="mail" :size="18" /> {{ dl.available ? 'Email me when macOS & Windows are ready' : 'Email me at launch' }}
      </NuxtLink>
    </PageHero>

    <section class="section-tight">
      <div class="container">
        <p v-if="wantsPro && dl.available" v-reveal class="pro-note pill">
          <span class="dot" /> Download CrawlStat, then paste your Pro licence key in Settings → Licence.
        </p>
        <div class="platforms">
          <div
            v-for="(p, i) in downloads.platforms"
            :key="p.id"
            v-reveal="i * 100"
            class="platform card"
            :class="{ mine: detected === p.id, soon: !p.available }"
          >
            <span class="p-icon"><Icon :name="p.id === 'macos' ? 'apple' : (p.id as any)" :size="34" /></span>
            <h2 class="h3">{{ p.name }}</h2>
            <p class="muted">{{ p.detail }}</p>
            <template v-if="p.available">
              <a
                v-for="(f, j) in p.files"
                :key="f.name"
                :href="dl.url(f.name)"
                class="btn btn-sm"
                :class="detected === p.id && j === 0 ? 'btn-copper' : 'btn-ghost'"
                download
              >
                <Icon name="download" :size="16" /> Download {{ f.label }}
              </a>
              <code v-if="p.id === 'linux'" class="install">sudo apt install ./{{ p.files[0].name.replaceAll('{v}', downloads.version) }}</code>
            </template>
            <span v-else class="pill soon-pill"><Icon name="clock" :size="14" /> Coming soon</span>
            <span v-if="detected === p.id" class="yours">Your platform</span>
          </div>
        </div>
      </div>
    </section>

    <section v-if="dl.available" class="section-tight">
      <div class="container next">
        <h2 v-reveal class="h3 center">Then, in under a minute</h2>
        <ol class="steps">
          <li v-reveal><b>1</b><span>Open CrawlStat and press <kbd>⌘N</kbd> for a new crawl.</span></li>
          <li v-reveal="100"><b>2</b><span>Paste your site’s address and press Enter.</span></li>
          <li v-reveal="200"><b>3</b><span>Open <strong>Issues</strong> when it finishes, and start fixing.</span></li>
        </ol>
        <p class="center muted">
          Need a hand? Read <NuxtLink to="/docs/installing" class="link">Installing CrawlStat</NuxtLink> and
          <NuxtLink to="/docs/your-first-crawl" class="link">Your first crawl</NuxtLink>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pro-note {
  display: flex;
  width: fit-content;
  margin: 0 auto 40px;
}

.platforms {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.platform {
  position: relative;
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 14px;
  padding: 48px 28px 40px;
  transition: transform 0.4s var(--ease);
}

.platform:hover {
  transform: translateY(-4px);
}

.platform.soon:hover {
  transform: none;
}

.install {
  font-size: 0.72rem;
  color: var(--text-soft);
  padding: 8px 12px;
  border-radius: 10px;
  box-shadow: var(--inset);
  user-select: all;
  overflow-wrap: anywhere;
}

.soon-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--copper-hi);
}

.platform p {
  font-size: 0.88rem;
  font-weight: 300;
  margin-bottom: 12px;
}

.p-icon {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: var(--inset);
  color: var(--text);
  margin-bottom: 8px;
}

.mine .p-icon {
  color: var(--copper);
}

.yours {
  position: absolute;
  top: 18px;
  right: 20px;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--copper);
}

.next {
  max-width: 760px;
  display: grid;
  gap: 32px;
  padding-bottom: 80px;
}

.section-tight:last-child .platforms {
  margin-bottom: 100px;
}

.steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

.steps li {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border-radius: 18px;
  box-shadow: var(--raised-sm);
  color: var(--text-soft);
}

.steps b {
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 500;
  color: #fff;
  background: var(--copper-grad);
}

.link {
  color: var(--copper-hi);
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 860px) {
  .platforms {
    grid-template-columns: 1fr;
  }
}
</style>
