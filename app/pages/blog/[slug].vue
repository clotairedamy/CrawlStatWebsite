<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first(),
)
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })

const { data: more } = await useAsyncData(`blog-more-${route.path}`, () =>
  queryCollection('blog').select('title', 'path', 'date', 'tag', 'readingTime').order('date', 'DESC').all(),
)
const others = computed(() => (more.value ?? []).filter((p) => p.path !== route.path).slice(0, 2))

usePageSeo({ title: post.value.title, description: post.value.description, type: 'article' })
useSeoMeta({ articlePublishedTime: post.value.date, articleSection: post.value.tag })

const sd = useStructuredData()
useJsonLd(
  {
    '@type': 'BlogPosting',
    headline: post.value.title,
    description: post.value.description,
    datePublished: post.value.date,
    dateModified: post.value.date,
    articleSection: post.value.tag,
    inLanguage: 'en',
    url: sd.url(route.path),
    mainEntityOfPage: sd.url(route.path),
    image: sd.url('/screenshots/pages.png'),
    author: { '@type': 'Organization', name: post.value.author, url: sd.url('/') },
    publisher: sd.organization,
  },
  sd.breadcrumbs([['Home', '/'], ['Blog', '/blog'], [post.value.title, route.path]]),
)
</script>

<template>
  <div v-if="post">
    <article class="container post">
      <header class="head">
        <NuxtLink to="/blog" class="back muted"><Icon name="arrow-left" :size="15" /> All posts</NuxtLink>
        <BlogMeta :post="post" />
        <h1 class="display copper-text">{{ post.title }}</h1>
        <p class="lead">{{ post.description }}</p>
        <span class="author muted">
          <BrandOwl variant="wordmark" :height="24" /> {{ post.author }}
        </span>
      </header>
      <ContentRenderer :value="post" class="prose" />
    </article>

    <section v-if="others.length" class="section-tight">
      <div class="container more">
        <span class="eyebrow">Keep reading</span>
        <div class="more-grid">
          <NuxtLink v-for="p in others" :key="p.path" :to="p.path" class="card m-card">
            <BlogMeta :post="p" />
            <h3 class="h3">{{ p.title }}</h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.post {
  max-width: 780px;
  padding-top: 64px;
}

.head {
  display: grid;
  gap: 22px;
  margin-bottom: 56px;
  padding-bottom: 44px;
  border-bottom: 1px solid var(--line);
}

.head h1 {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.86rem;
}

.back:hover {
  color: var(--copper-hi);
}

.author {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
}

.author img {
  border-radius: 7px;
}

.more {
  max-width: 980px;
  display: grid;
  gap: 24px;
  padding-top: 40px;
}

.more-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.m-card {
  display: grid;
  gap: 14px;
}

.m-card:hover h3 {
  color: var(--copper-hi);
}

@media (max-width: 700px) {
  .more-grid {
    grid-template-columns: 1fr;
  }
}
</style>
