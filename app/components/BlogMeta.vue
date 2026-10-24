<script setup lang="ts">
defineProps<{ post: { date: string; tag: string; readingTime?: number } }>()

const fmt = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
</script>

<template>
  <div class="meta">
    <span class="tag">{{ post.tag }}</span>
    <time :datetime="post.date">{{ fmt(post.date) }}</time>
    <span v-if="post.readingTime">· {{ post.readingTime }} min read</span>
  </div>
</template>

<style scoped>
.meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.8rem;
  color: var(--muted);
}

.tag {
  padding: 4px 12px;
  border-radius: 999px;
  box-shadow: var(--inset-sm);
  color: var(--copper-hi);
  letter-spacing: 0.04em;
}
</style>
