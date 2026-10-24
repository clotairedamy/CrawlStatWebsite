<script setup lang="ts">
defineProps<{ src: string; alt: string; caption?: string }>()
</script>

<template>
  <figure class="screenshot">
    <AppWindow :src="src" :alt="alt" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.screenshot {
  margin: 2.4em 0;
}

.screenshot :deep(img) {
  border-radius: 10px;
}

figcaption {
  margin-top: 18px;
  text-align: center;
  font-size: 0.86rem;
  color: var(--muted);
}
</style>
