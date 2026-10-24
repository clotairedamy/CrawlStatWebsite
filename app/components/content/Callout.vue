<script setup lang="ts">
withDefaults(defineProps<{ type?: 'tip' | 'note' | 'warning' }>(), { type: 'note' })
const labels = { tip: 'Tip', note: 'Note', warning: 'Heads up' }
</script>

<template>
  <aside class="callout" :class="type">
    <span class="label">{{ labels[type] }}</span>
    <div class="body"><slot /></div>
  </aside>
</template>

<style scoped>
.callout {
  position: relative;
  padding: 22px 26px 22px 28px;
  border-radius: 18px;
  box-shadow: var(--inset-sm);
  overflow: hidden;
}

.callout::before {
  content: '';
  position: absolute;
  left: 0;
  top: 18px;
  bottom: 18px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
}

.tip {
  --accent: var(--copper);
}

.note {
  --accent: var(--notice);
}

.warning {
  --accent: var(--warning);
}

.label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 500;
}

.body :deep(> * + *) {
  margin-top: 0.8em;
}

.body :deep(p) {
  margin: 0;
}
</style>
