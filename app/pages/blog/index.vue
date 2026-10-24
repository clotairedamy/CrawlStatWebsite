<script setup lang="ts">
useJsonLd(useStructuredData().breadcrumbs([['Home', '/'], ['Blog', '/blog']]))
usePageSeo({
  title: 'Blog',
  description: 'Engineering notes, SEO guides and product news from the team building CrawlStat.',
})

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').select('title', 'path', 'description', 'date', 'tag', 'readingTime').order('date', 'DESC').all(),
)
const featured = computed(() => posts.value?.[0])
const rest = computed(() => posts.value?.slice(1) ?? [])
</script>

<template>
  <div>
    <PageHero eyebrow="Blog" title="Notes from the crawl." lead="How CrawlStat is built, and how to fix what it finds." />

    <section class="section-tight">
      <div class="container">
        <NuxtLink v-if="featured" v-reveal :to="featured.path" class="featured card">
          <div class="f-art" aria-hidden="true"><div class="f-ring"><span /></div></div>
          <div class="f-copy">
            <BlogMeta :post="featured" />
            <h2 class="h2">{{ featured.title }}</h2>
            <p class="lead">{{ featured.description }}</p>
            <span class="read">Read the post <Icon name="arrow" :size="16" /></span>
          </div>
        </NuxtLink>

        <div class="grid">
          <NuxtLink v-for="(p, i) in rest" :key="p.path" v-reveal="i * 90" :to="p.path" class="card post">
            <BlogMeta :post="p" />
            <h3 class="h3">{{ p.title }}</h3>
            <p class="muted">{{ p.description }}</p>
            <span class="read">Read <Icon name="arrow" :size="16" /></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.featured {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 56px;
  align-items: center;
  padding: 56px;
  margin-bottom: 40px;
}

.f-art {
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: var(--raised);
}

.f-ring {
  width: 56%;
  height: 56%;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: var(--inset);
}

.f-ring span {
  width: 28%;
  height: 28%;
  border-radius: 50%;
  background: var(--copper-grad);
  box-shadow: 0 0 24px rgba(227, 173, 123, 0.5);
}

.f-copy {
  display: grid;
  gap: 18px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
}

.post {
  display: grid;
  gap: 14px;
  align-content: start;
  transition: transform 0.4s var(--ease);
}

.post:hover,
.featured:hover {
  transform: translateY(-4px);
}

.featured {
  transition: transform 0.4s var(--ease);
}

.post p {
  font-weight: 300;
}

.read {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--copper);
  font-size: 0.92rem;
  margin-top: 6px;
}

@media (max-width: 860px) {
  .featured {
    grid-template-columns: 1fr;
    padding: 36px;
    gap: 32px;
  }

  .f-art {
    width: 160px;
  }
}
</style>
