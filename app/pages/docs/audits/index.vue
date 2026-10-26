<script setup lang="ts">
import audits from '~/data/audits.json'

useJsonLd(useStructuredData().breadcrumbs([['Home', '/'], ['Help centre', '/docs'], ['Audit reference', '/docs/audits']]))
usePageSeo({
  title: 'Audit reference',
  description: `All ${audits.length} SEO and accessibility checks CrawlStat runs, with what each means and how to fix it.`,
})

const severities = [
  { id: 'error', label: 'Errors', blurb: 'Broken for visitors or search engines. Fix these first.' },
  { id: 'warning', label: 'Warnings', blurb: 'Costing you rankings or crawl budget.' },
  { id: 'notice', label: 'Notices', blurb: 'Worth a look; often intentional.' },
] as const

const filter = ref<'all' | 'SEO' | 'Accessibility'>('all')
const shown = (sev: string) =>
  audits.filter((a) => a.severity === sev && (filter.value === 'all' || a.category === filter.value))
</script>

<template>
  <DocsShell>
    <header class="head">
      <span class="eyebrow">Reference</span>
      <h1 class="h2">Audit reference</h1>
      <p class="lead">
        The {{ audits.length }} checks CrawlStat runs after every crawl. This is the same text you see in the app’s
        Issues panel.
      </p>
      <div class="filters" role="group" aria-label="Category">
        <button v-for="f in ['all', 'SEO', 'Accessibility'] as const" :key="f" :class="{ on: filter === f }" @click="filter = f">
          {{ f === 'all' ? 'All' : f }}
        </button>
      </div>
    </header>

    <section v-for="s in severities" :key="s.id" class="sev-group">
      <div class="sev-head">
        <h2 class="sev" :class="`sev-${s.id}`">{{ s.label }}</h2>
        <span class="muted">{{ s.blurb }}</span>
      </div>
      <div class="list">
        <NuxtLink v-for="a in shown(s.id)" :key="a.id" :to="`/docs/audits/${a.slug}`" class="item">
          <span class="title">{{ a.title }}</span>
          <span class="cat">{{ a.category }}</span>
          <Icon name="arrow" :size="16" />
        </NuxtLink>
      </div>
    </section>
  </DocsShell>
</template>

<style scoped>
.head {
  display: grid;
  gap: 16px;
  margin-bottom: 48px;
}

.filters {
  display: inline-flex;
  justify-self: start;
  margin-top: 8px;
  padding: 5px;
  border-radius: 999px;
  box-shadow: var(--inset-sm);
}

.filters button {
  border: 0;
  background: transparent;
  color: var(--muted);
  font: inherit;
  font-size: 0.86rem;
  padding: 8px 18px;
  border-radius: 999px;
  cursor: pointer;
}

.filters button.on {
  color: var(--copper-hi);
  background: linear-gradient(145deg, #f4f4f6, #e3e3e6);
  box-shadow: var(--raised-sm);
}

.sev-group {
  margin-top: 48px;
}

.sev-head {
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.sev-head h2 {
  font-size: 0.8rem;
}

.sev-head .muted {
  font-size: 0.88rem;
  font-weight: 300;
}

.list {
  display: grid;
  border-radius: 20px;
  box-shadow: var(--inset-sm);
  padding: 8px;
}

.item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  border-radius: 14px;
  transition:
    box-shadow 0.3s var(--ease),
    color 0.2s;
}

.item:hover {
  box-shadow: var(--raised-sm);
  color: var(--copper-hi);
}

.title {
  flex: 1;
}

.cat {
  font-size: 0.75rem;
  color: var(--muted);
}

.item .icon {
  color: var(--muted);
}
</style>
