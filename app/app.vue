<script setup lang="ts">
useHead({
  titleTemplate: (title?: string) =>
    title ? `${title} · CrawlStat` : 'CrawlStat — the SEO crawler that runs on your machine',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
