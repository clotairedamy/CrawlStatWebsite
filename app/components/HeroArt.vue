<script setup lang="ts">
// The hero sculpture: soft shapes pressed out of the page, with a copper core
// that sweeps like radar. Every size is in container units (cqw) so the whole
// composition scales as one piece. Pointer movement shifts each shape by its
// own depth for a gentle parallax.
const root = ref<HTMLElement>()
const ticker = [
  { code: 200, path: '/', ms: 74 },
  { code: 200, path: '/features', ms: 112 },
  { code: 301, path: '/blog/old-post', ms: 41 },
  { code: 200, path: '/pricing', ms: 96 },
  { code: 404, path: '/careers/2019', ms: 58 },
  { code: 200, path: '/docs/getting-started', ms: 131 },
  { code: 200, path: '/about', ms: 88 },
]
const tick = ref(0)
const crawled = ref(1284)

onMounted(() => {
  const el = root.value!
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let frame = 0
  const onMove = (e: PointerEvent) => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      el.style.setProperty('--mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3))
      el.style.setProperty('--my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3))
    })
  }
  if (!reduced) window.addEventListener('pointermove', onMove, { passive: true })
  const timer = setInterval(() => {
    tick.value = (tick.value + 1) % ticker.length
    crawled.value += 37 + Math.floor(Math.random() * 14)
  }, 1700)
  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onMove)
    clearInterval(timer)
  })
})

const row = computed(() => ticker[tick.value]!)
</script>

<template>
  <div ref="root" class="art" aria-hidden="true">
    <div class="canvas">
      <div class="shape leaf-a" style="--d: 10; --i: 1">
        <span class="well" style="left: 46%; top: 44%"><i /></span>
      </div>

      <div class="shape circle-b" style="--d: 16; --i: 2">
        <span class="ring"><i /></span>
      </div>

      <div class="shape leaf-c" style="--d: 7; --i: 3">
        <span class="well" style="left: 52%; top: 48%"><i /></span>
      </div>

      <div class="shape quarter" style="--d: 12; --i: 4">
        <span class="well small" style="left: 58%; top: 58%"><i /></span>
      </div>

      <div class="shape disc" style="--d: 20; --i: 5">
        <div class="disc-ring">
          <div class="sweep" />
          <span class="pulse" />
          <span class="pulse" style="animation-delay: 1.4s" />
          <span class="core" />
        </div>
      </div>

      <div class="chip" style="--d: 28">
        <span class="dot dot-pulse" />
        <span class="chip-label">Crawling</span>
        <Transition name="tick" mode="out-in">
          <span :key="tick" class="chip-row mono">
            <b :class="row.code >= 400 ? 'bad' : row.code >= 300 ? 'warn' : 'ok'">{{ row.code }}</b>
            {{ row.path }}
            <em>{{ row.ms }} ms</em>
          </span>
        </Transition>
        <span class="chip-count mono">{{ crawled.toLocaleString('en-US') }} URLs</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.art {
  --mx: 0;
  --my: 0;
  container-type: inline-size;
  width: 100%;
}

.canvas {
  position: relative;
  width: 100cqw;
  height: 104cqw;
}

.shape,
.chip {
  position: absolute;
  transform: translate3d(calc(var(--mx) * var(--d) * -1px), calc(var(--my) * var(--d) * -1px), 0);
  transition: transform 0.9s var(--ease);
}

.shape {
  background: linear-gradient(145deg, #2d2f35 0%, #24262b 100%);
  box-shadow:
    1.6cqw 1.6cqw 4cqw var(--shade-dark),
    -1.4cqw -1.4cqw 3.6cqw var(--shade-light);
  animation: rise 1.4s var(--ease) both;
  animation-delay: calc(var(--i) * 110ms);
}

@keyframes rise {
  from {
    opacity: 0;
    scale: 0.92;
  }
}

.leaf-a {
  left: 4cqw;
  top: 2cqw;
  width: 54cqw;
  height: 30cqw;
  border-radius: 0 100% 0 100%;
}

.circle-b {
  left: 66cqw;
  top: 2cqw;
  width: 30cqw;
  height: 30cqw;
  border-radius: 50%;
}

.leaf-c {
  left: 0;
  top: 44cqw;
  width: 46cqw;
  height: 28cqw;
  border-radius: 100% 0 100% 0;
  z-index: 1;
}

.quarter {
  left: 10cqw;
  top: 76cqw;
  width: 26cqw;
  height: 26cqw;
  border-radius: 100% 0 0 0;
}

.disc {
  left: 38cqw;
  top: 36cqw;
  width: 60cqw;
  height: 60cqw;
  border-radius: 50%;
  display: grid;
  place-items: center;
  z-index: 2;
}

.well {
  position: absolute;
  width: 9cqw;
  height: 9cqw;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow:
    inset 0.6cqw 0.6cqw 1.2cqw var(--shade-dark),
    inset -0.6cqw -0.6cqw 1.2cqw var(--shade-light);
  display: grid;
  place-items: center;
}

.well.small {
  width: 7cqw;
  height: 7cqw;
}

.well i,
.ring i {
  width: 45%;
  height: 45%;
  border-radius: 50%;
  background: linear-gradient(145deg, #2e3036, #24262a);
  box-shadow:
    0.3cqw 0.3cqw 0.7cqw var(--shade-dark),
    -0.3cqw -0.3cqw 0.7cqw var(--shade-light);
}

.ring {
  position: absolute;
  inset: 22%;
  border-radius: 50%;
  box-shadow:
    inset 0.8cqw 0.8cqw 1.6cqw var(--shade-dark),
    inset -0.8cqw -0.8cqw 1.6cqw var(--shade-light);
  display: grid;
  place-items: center;
}

.disc-ring {
  position: relative;
  width: 52%;
  height: 52%;
  border-radius: 50%;
  box-shadow:
    inset 1.2cqw 1.2cqw 2.4cqw var(--shade-dark),
    inset -1.2cqw -1.2cqw 2.4cqw var(--shade-light);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.sweep {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, rgba(227, 173, 123, 0.22), rgba(227, 173, 123, 0) 22%, transparent);
  animation: sweep 5s linear infinite;
  mask: radial-gradient(circle, transparent 18%, #000 19%);
}

@keyframes sweep {
  to {
    transform: rotate(360deg);
  }
}

.pulse {
  position: absolute;
  width: 26%;
  height: 26%;
  border-radius: 50%;
  border: 1px solid rgba(227, 173, 123, 0.55);
  animation: ping 2.8s var(--ease) infinite;
}

@keyframes ping {
  from {
    transform: scale(1);
    opacity: 0.9;
  }
  to {
    transform: scale(3.6);
    opacity: 0;
  }
}

.core {
  position: relative;
  width: 24%;
  height: 24%;
  border-radius: 50%;
  background: var(--copper-grad);
  box-shadow:
    0.5cqw 0.5cqw 1.2cqw rgba(0, 0, 0, 0.5),
    0 0 3cqw rgba(227, 173, 123, 0.45),
    inset 0 0.25cqw 0 rgba(255, 255, 255, 0.45);
}

.chip {
  left: 2cqw;
  top: 90cqw;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-radius: 16px;
  background: rgba(42, 44, 49, 0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow:
    10px 14px 30px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  font-size: 0.78rem;
  white-space: nowrap;
  animation: rise 1.4s var(--ease) 0.8s both;
}

.chip-label {
  color: var(--copper);
  font-weight: 500;
}

.chip-row {
  display: inline-flex;
  gap: 10px;
  min-width: 15.5em;
  color: var(--text);
}

.chip-row b {
  font-weight: 500;
}

.chip-row em {
  font-style: normal;
  color: var(--muted);
  margin-left: auto;
}

.ok {
  color: var(--ok);
}

.warn {
  color: var(--warning);
}

.bad {
  color: var(--error);
}

.chip-count {
  padding-left: 12px;
  border-left: 1px solid var(--line-strong);
  color: var(--text-soft);
}

.tick-enter-active,
.tick-leave-active {
  transition:
    opacity 0.3s var(--ease),
    transform 0.3s var(--ease);
}

.tick-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.tick-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 560px) {
  .chip-count {
    display: none;
  }

  .chip-row {
    min-width: 12em;
  }
}
</style>
