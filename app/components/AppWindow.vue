<script setup lang="ts">
// A screenshot in a soft window frame. `tilt` lays it back in 3D and lets it
// rise flat as it scrolls into view.
const props = defineProps<{ src: string; alt: string; tilt?: boolean; eager?: boolean }>()

const webp = computed(() => props.src.replace(/\.png$/, '.webp'))

const el = ref<HTMLElement>()
const progress = ref(props.tilt ? 0 : 1)

onMounted(() => {
  if (!props.tilt) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    progress.value = 1
    return
  }
  let frame = 0
  const update = () => {
    const rect = el.value!.getBoundingClientRect()
    const vh = window.innerHeight
    // 0 when the top edge enters the bottom of the viewport, 1 at 35% from the top.
    const p = (vh - rect.top) / (vh * 0.65)
    progress.value = Math.min(1, Math.max(0, p))
  }
  const onScroll = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(update)
  }
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })
})

const style = computed(() => {
  if (!props.tilt) return undefined
  const p = progress.value
  return {
    transform: `perspective(1800px) rotateX(${(1 - p) * 22}deg) scale(${0.9 + p * 0.1})`,
    opacity: String(0.35 + p * 0.65),
  }
})
</script>

<template>
  <figure ref="el" class="window" :style="style">
    <div class="chrome">
      <span /><span /><span />
    </div>
    <!-- WebP with a PNG fallback. The screenshots are flat UI, which WebP
         compresses about 63% smaller than PNG with no visible difference —
         1.5 MB of this page was screenshots. `width`/`height` stay on the
         img so the box is reserved before the bytes arrive and nothing
         shifts underneath the reader. -->
    <picture>
      <source :srcset="webp" type="image/webp">
      <img
        :src="src"
        :alt="alt"
        width="1440"
        height="900"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        decoding="async"
      >
    </picture>
  </figure>
</template>

<style scoped>
.window {
  margin: 0;
  padding: 12px;
  padding-top: 0;
  border-radius: 24px;
  background: linear-gradient(145deg, #2c2e34, #232529);
  box-shadow:
    24px 30px 70px rgba(10, 11, 13, 0.6),
    -14px -14px 40px var(--shade-light),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transform-origin: 50% 0%;
  will-change: transform;
  transition: transform 0.08s linear;
}

.chrome {
  display: flex;
  gap: 8px;
  padding: 14px 6px 12px;
}

.chrome span {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: var(--inset-sm);
}

.chrome span:first-child {
  background: var(--copper-grad);
  box-shadow: 0 0 8px rgba(227, 173, 123, 0.4);
}

picture {
  display: contents;
}

img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
}
</style>
