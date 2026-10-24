<script setup lang="ts">
import audits from '~/data/audits.json'

// Two rows of audit names drifting in opposite directions: a quiet way to show
// the breadth of the catalogue. Each pill links to its reference page.
const half = Math.ceil(audits.length / 2)
const rows = [audits.slice(0, half), audits.slice(half)]
</script>

<template>
  <div class="marquee">
    <div v-for="(row, r) in rows" :key="r" class="track" :class="{ reverse: r === 1 }">
      <div v-for="copy in 2" :key="copy" class="lane" :aria-hidden="copy === 2">
        <NuxtLink
          v-for="a in row"
          :key="a.id"
          :to="`/docs/audits/${a.slug}`"
          class="item"
          :tabindex="copy === 2 ? -1 : undefined"
        >
          <span class="sev" :class="`sev-${a.severity}`" />
          {{ a.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  display: grid;
  gap: 22px;
  /* The lanes are `width: max-content` — about 5,000px each — so without this
     the whole document scrolled sideways. The mask below fades the edges but
     clips nothing: it is paint, not layout. This was the mobile bug. */
  overflow: hidden;
  mask: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  padding: 20px 0;
}

.track {
  display: flex;
  width: max-content;
  animation: slide 80s linear infinite;
}

.track.reverse {
  animation-direction: reverse;
  animation-duration: 90s;
}

.marquee:hover .track {
  animation-play-state: paused;
}

/* A permanently moving band is exactly what this setting is for, and a
   vestibular trigger is not worth a decorative flourish. */
@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
  }
}

.lane {
  display: flex;
  gap: 20px;
  padding-right: 20px;
}

.item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  border-radius: 999px;
  background: var(--bg);
  box-shadow: var(--raised-sm);
  font-size: 0.92rem;
  color: var(--text-soft);
  white-space: nowrap;
  transition:
    color 0.2s,
    box-shadow 0.3s var(--ease);
}

.item:hover {
  color: var(--text);
  box-shadow: var(--inset-sm);
}

.item .sev::before {
  margin: 0;
}

@keyframes slide {
  to {
    transform: translateX(-50%);
  }
}
</style>
