<script setup lang="ts">
const route = useRoute()
const url = useAbsoluteUrl()
const canonical = computed(() => url(route.path))

useHead({
  titleTemplate: (title?: string) =>
    title ? `${title} · CrawlStat` : 'CrawlStat — the SEO crawler that runs on your machine',
  link: [{ rel: 'canonical', href: canonical }],
})
useSeoMeta({ ogUrl: canonical })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
