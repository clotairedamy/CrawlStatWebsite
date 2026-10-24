<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(`docs-${route.path}`, () =>
  queryCollection('docs').path(route.path).first(),
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

const { data: siblings } = await useAsyncData(`docs-sib-${route.path}`, () =>
  queryCollection('docs').select('title', 'path', 'order').order('order', 'ASC').all(),
)
const index = computed(() => siblings.value?.findIndex((p) => p.path === route.path) ?? -1)
const prev = computed(() => siblings.value?.[index.value - 1])
const next = computed(() => siblings.value?.[index.value + 1])

usePageSeo({ title: page.value.title, description: page.value.description, type: 'article' })

const sd = useStructuredData()
useJsonLd(
  {
    '@type': 'TechArticle',
    headline: page.value.title,
    description: page.value.description,
    articleSection: page.value.section,
    inLanguage: 'en',
    url: sd.url(route.path),
    mainEntityOfPage: sd.url(route.path),
    about: { '@id': sd.software['@id'] },
    publisher: sd.organization,
  },
  sd.breadcrumbs([['Home', '/'], ['Help centre', '/docs'], [page.value.title, route.path]]),
)
</script>

<template>
  <DocsShell v-if="page">
    <article>
      <header class="head">
        <span class="eyebrow">{{ page.section }}</span>
        <h1 class="h2">{{ page.title }}</h1>
        <p class="lead">{{ page.description }}</p>
      </header>
      <ContentRenderer :value="page" class="prose" />
      <nav class="pager">
        <NuxtLink v-if="prev" :to="prev.path" class="neu-sm">
          <span class="muted"><Icon name="arrow-left" :size="14" /> Previous</span>{{ prev.title }}
        </NuxtLink>
        <span v-else />
        <NuxtLink v-if="next" :to="next.path" class="neu-sm right">
          <span class="muted">Next <Icon name="arrow" :size="14" /></span>{{ next.title }}
        </NuxtLink>
      </nav>
    </article>
  </DocsShell>
</template>

<style scoped>
.head {
  display: grid;
  gap: 16px;
  margin-bottom: 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--line);
}

.head h1 {
  color: var(--text);
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 80px;
}

.pager a {
  display: grid;
  gap: 4px;
  padding: 20px 24px;
  transition: color 0.2s;
}

.pager a:hover {
  color: var(--copper-hi);
}

.pager .muted {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
}

.pager .right {
  text-align: right;
  justify-items: end;
}
</style>
