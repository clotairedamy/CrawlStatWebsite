<script setup lang="ts">
import sizes from '~/data/screenshots.json'

// A screenshot in a soft window frame. `tilt` lays it back in 3D and lets it
// rise flat as it scrolls into view.
const props = defineProps<{ src: string; alt: string; tilt?: boolean; eager?: boolean }>()

const webp = computed(() => props.src.replace(/\.png$/, '.webp'))
// Real pixel size where known, so the reserved box matches the image.
const size = computed(() => (sizes as Record<string, number[]>)[props.src] ?? [1440, 900])

const el = ref<HTMLElement>()
const progress = ref(props.tilt ? 0 : 1)
// Flat windows reveal each time they scroll into view, from either direction
// (or, in the tour, each time their tab is shown). They reset only once fully
// off screen, so the reader never sees one un-reveal.
const shown = ref(false)

onMounted(() => {
  if (!props.tilt) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shown.value = true
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e!.intersectionRatio >= 0.12) shown.value = true
        else if (!e!.isIntersecting) shown.value = false
      },
      { threshold: [0, 0.12] },
    )
    io.observe(el.value!)
    onBeforeUnmount(() => io.disconnect())
    return
  }
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
  <figure ref="el" class="window" :class="{ rev: !tilt, in: shown }" :style="style">
    <div class="chrome">
      <span /><span /><span />
    </div>
    <!-- WebP with a PNG fallback. The screenshots are flat UI, which WebP
         compresses about 63% smaller than PNG with no visible difference —
         1.5 MB of this page was screenshots. `width`/`height` stay on the
         img so the box is reserved before the bytes arrive and nothing
         shifts underneath the reader. -->
    <div class="pane">
      <picture>
        <source :srcset="webp" type="image/webp">
        <img
          :src="src"
          :alt="alt"
          :width="size[0]"
          :height="size[1]"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : 'auto'"
          decoding="async"
        >
      </picture>
    </div>
  </figure>
</template>

<style scoped>
.window {
  margin: 0;
  padding: 12px;
  padding-top: 0;
  border-radius: 24px;
  background: linear-gradient(145deg, #f4f4f6, #e3e3e6);
  box-shadow:
    24px 30px 70px rgba(0, 0, 0, 0.16),
    -14px -14px 40px var(--shade-light),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
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
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

picture {
  display: contents;
}

.pane {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
}

img {
  display: block;
  width: 100%;
  height: auto;
}

/* Scroll reveal: the window rises, the screenshot unrolls top to bottom
   while settling from a slight zoom, then a band of light crosses it. */
.js .rev {
  opacity: 0;
  translate: 0 56px;
  scale: 0.96;
  transition:
    opacity 0.9s var(--ease),
    translate 1.2s var(--ease),
    scale 1.2s var(--ease),
    transform 0.08s linear;
}

.js .rev .pane {
  clip-path: inset(0 0 100% 0 round 12px);
  transition: clip-path 1.3s var(--ease) 0.2s;
}

.js .rev img {
  scale: 1.14;
  transform-origin: 50% 0%;
  transition: scale 1.8s var(--ease) 0.2s;
}

.js .rev .pane::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.55) 50%, transparent 65%);
  translate: -110% 0;
  pointer-events: none;
}

.js .rev.in {
  opacity: 1;
  translate: 0 0;
  scale: 1;
}

.js .rev.in .pane {
  clip-path: inset(0 0 0 0 round 12px);
}

.js .rev.in img {
  scale: 1;
}

.js .rev.in .pane::after {
  translate: 110% 0;
  transition: translate 1.4s var(--ease) 1s;
}

@media (prefers-reduced-motion: reduce) {
  .js .rev,
  .js .rev .pane,
  .js .rev img {
    opacity: 1;
    translate: none;
    scale: none;
    clip-path: none;
    transition: none;
  }

  .js .rev .pane::after {
    display: none;
  }
}
</style>
