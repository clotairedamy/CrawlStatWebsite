<script setup lang="ts">
import audits from '~/data/audits.json'

// The app's Issues panel links here ("Copy docs link"), so these URLs are part
// of the product and must keep matching `docs_slug` in the engine.
const route = useRoute()
const audit = audits.find((a) => a.slug === route.params.slug)
if (!audit) throw createError({ statusCode: 404, statusMessage: 'Audit not found', fatal: true })

const related = audits.filter((a) => a.severity === audit.severity && a.id !== audit.id).slice(0, 4)
const label = { error: 'Error', warning: 'Warning', notice: 'Notice' }[audit.severity]

useSeoMeta({
  title: `${audit.title} — how to fix it`,
  description: audit.description,
})
</script>

<template>
  <DocsShell v-if="audit">
    <article>
      <NuxtLink to="/docs/audits" class="back muted"><Icon name="arrow-left" :size="15" /> Audit reference</NuxtLink>
      <header class="head">
        <div class="tags">
          <span class="pill"><span class="sev" :class="`sev-${audit.severity}`">{{ label }}</span></span>
          <span class="pill">{{ audit.category }}</span>
        </div>
        <h1 class="h2">{{ audit.title }}</h1>
      </header>

      <div class="prose">
        <h2>What it means</h2>
        <p v-html="inlineCode(audit.description)" />
        <h2>How to fix it</h2>
        <div class="fix">
          <p v-html="inlineCode(audit.howToFix)" />
        </div>
        <h2>Finding it in CrawlStat</h2>
        <p>
          After a crawl, open <strong>Issues</strong> and pick <strong>{{ audit.title }}</strong>. Press
          <strong>Show URLs</strong> to filter the results table to the affected pages, or <strong>Export affected</strong>
          to hand the list to whoever owns the fix. Audit ID: <code>{{ audit.id }}</code>.
        </p>
      </div>

      <section class="related">
        <span class="eyebrow">Related {{ label.toLowerCase() }}s</span>
        <div class="rel-list">
          <NuxtLink v-for="r in related" :key="r.id" :to="`/docs/audits/${r.slug}`" class="neu-sm">
            {{ r.title }} <Icon name="arrow" :size="15" />
          </NuxtLink>
        </div>
      </section>
    </article>
  </DocsShell>
</template>

<style scoped>
.back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.86rem;
  transition: color 0.2s;
}

.back:hover {
  color: var(--copper-hi);
}

.head {
  display: grid;
  gap: 20px;
  margin: 28px 0 8px;
}

.tags {
  display: flex;
  gap: 10px;
}

.fix {
  padding: 24px 28px;
  border-radius: 18px;
  box-shadow: var(--raised-sm);
  color: var(--text);
}

.related {
  margin-top: 72px;
  display: grid;
  gap: 18px;
}

.rel-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.rel-list a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  font-size: 0.94rem;
  transition: color 0.2s;
}

.rel-list a:hover {
  color: var(--copper-hi);
}

@media (max-width: 600px) {
  .rel-list {
    grid-template-columns: 1fr;
  }
}
</style>
