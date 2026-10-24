<script setup lang="ts">
defineProps<{ items: { q: string; a: string }[] }>()
</script>

<template>
  <div class="faq">
    <details v-for="(item, i) in items" :key="i" v-reveal="i * 40" class="item">
      <summary>
        <span>{{ item.q }}</span>
        <span class="plus" aria-hidden="true" />
      </summary>
      <p v-html="item.a" />
    </details>
  </div>
</template>

<style scoped>
.faq {
  display: grid;
  gap: 18px;
  max-width: 820px;
  margin: 0 auto;
}

.item {
  border-radius: 20px;
  background: var(--bg);
  box-shadow: var(--raised-sm);
  transition: box-shadow 0.35s var(--ease);
}

.item[open] {
  box-shadow: var(--inset-sm);
}

summary {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 24px 28px;
  cursor: pointer;
  font-size: 1.04rem;
}

summary::-webkit-details-marker {
  display: none;
}

.plus {
  position: relative;
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: var(--raised-sm);
}

.plus::before,
.plus::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 11px;
  height: 1.6px;
  background: var(--copper);
  transform: translate(-50%, -50%);
  transition: transform 0.35s var(--ease);
}

.plus::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.item[open] .plus::after {
  transform: translate(-50%, -50%) rotate(0deg);
}

.item p {
  padding: 0 28px 26px;
  color: var(--text-soft);
  font-weight: 300;
  line-height: 1.75;
}

.item p :deep(a) {
  color: var(--copper-hi);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
