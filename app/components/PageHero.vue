<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; lead?: string }>()
</script>

<template>
  <section class="page-hero">
    <div class="container inner">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h1 class="display copper-text">{{ title }}</h1>
      <p v-if="lead" class="lead">{{ lead }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  padding: 96px 0 72px;
}

.inner {
  display: grid;
  gap: 24px;
  justify-items: center;
  text-align: center;
  max-width: 860px;
}

h1 {
  animation: up 1s var(--ease) both;
}

.lead {
  max-width: 640px;
  animation: up 1s var(--ease) 0.1s both;
}

@keyframes up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}
</style>
