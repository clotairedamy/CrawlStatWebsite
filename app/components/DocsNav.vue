<script setup lang="ts">
// Help-centre sidebar: the markdown pages grouped by their `section`, then the
// audit reference.
const route = useRoute()
const { data: pages } = await useAsyncData('docs-nav', () =>
  queryCollection('docs').select('title', 'path', 'section', 'order').order('order', 'ASC').all(),
)

const groups = computed(() => {
  const out: { section: string; pages: { title: string; path: string }[] }[] = []
  for (const p of pages.value ?? []) {
    let g = out.find((x) => x.section === p.section)
    if (!g) out.push((g = { section: p.section, pages: [] }))
    g.pages.push(p)
  }
  return out
})
</script>

<template>
  <nav class="docs-nav" aria-label="Help centre">
    <NuxtLink to="/docs" class="home" :class="{ on: route.path === '/docs' }">
      <Icon name="book" :size="18" /> Help centre
    </NuxtLink>
    <div v-for="g in groups" :key="g.section" class="group">
      <span class="eyebrow">{{ g.section }}</span>
      <NuxtLink v-for="p in g.pages" :key="p.path" :to="p.path" :class="{ on: route.path === p.path }">
        {{ p.title }}
      </NuxtLink>
    </div>
    <div class="group">
      <span class="eyebrow">Reference</span>
      <NuxtLink to="/docs/audits" :class="{ on: route.path.startsWith('/docs/audits') }">Audit reference</NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.docs-nav {
  display: grid;
  gap: 28px;
  align-content: start;
}

.group {
  display: grid;
  gap: 2px;
}

.group .eyebrow {
  font-size: 0.64rem;
  margin-bottom: 8px;
}

a {
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 300;
  color: var(--text-soft);
  transition:
    color 0.2s,
    box-shadow 0.3s var(--ease);
}

a:hover {
  color: var(--text);
}

a.on {
  color: var(--copper-hi);
  box-shadow: var(--inset-sm);
  font-weight: 400;
}

.home {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 400;
  color: var(--text);
}
</style>
