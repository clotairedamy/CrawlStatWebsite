<script setup lang="ts">
const route = useRoute()
const dl = useDownloadCta()
const open = ref(false)
const scrolled = ref(false)

// Split either side of the owl. The mark is the brand here — there is no
// wordmark beside it — so it sits in the middle and the navigation balances
// around it.
const leftLinks = [
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
]
const rightLinks = [
  { to: '/docs', label: 'Help' },
  { to: '/blog', label: 'Blog' },
]
const links = [...leftLinks, ...rightLinks]

watch(() => route.path, () => (open.value = false))

onMounted(() => {
  const onScroll = () => (scrolled.value = window.scrollY > 12)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <header class="header" :class="{ scrolled, open }">
    <div class="container bar">
      <nav class="nav nav-left" aria-label="Main">
        <NuxtLink v-for="l in leftLinks" :key="l.to" :to="l.to" class="nav-link">{{ l.label }}</NuxtLink>
      </nav>

      <NuxtLink to="/" class="brand" aria-label="CrawlStat home">
        <BrandOwl variant="wordmark" :height="40" />
      </NuxtLink>

      <nav class="nav nav-right" aria-label="More">
        <NuxtLink v-for="l in rightLinks" :key="l.to" :to="l.to" class="nav-link">{{ l.label }}</NuxtLink>
        <NuxtLink to="/download" class="btn btn-copper btn-sm">
          <Icon :name="dl.icon" :size="16" /> {{ dl.label('Download') }}
        </NuxtLink>
      </nav>

      <button class="burger" :aria-expanded="open" aria-label="Menu" @click="open = !open">
        <Icon :name="open ? 'close' : 'menu'" />
      </button>
    </div>

    <Transition name="drop">
      <nav v-if="open" class="mobile" aria-label="Mobile">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to">{{ l.label }}</NuxtLink>
        <NuxtLink to="/download" class="btn btn-copper">{{ dl.label('Download free') }}</NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  transition:
    background 0.4s var(--ease),
    box-shadow 0.4s var(--ease);
}

.header.scrolled,
.header.open {
  background: rgba(38, 40, 45, 0.82);
  backdrop-filter: blur(18px) saturate(1.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
  box-shadow: 0 1px 0 var(--line);
}

.bar {
  height: 84px;
  /* Three tracks with equal outer columns, so the owl is centred on the page
     rather than on whatever the links happen to measure. */
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 28px;
}

.brand {
  display: flex;
  justify-content: center;
  color: var(--text);
  transition: opacity 0.25s var(--ease);
}

.brand:hover {
  opacity: 0.78;
}

.nav {
  display: flex;
  align-items: center;
  gap: 38px;
}

.nav-right {
  justify-content: flex-end;
}

.nav-link {
  position: relative;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-soft);
  padding: 8px 0;
  white-space: nowrap;
  transition: color 0.25s;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--copper-grad);
  transform: translateX(calc(-50% - 0.15em)) scale(0);
  transition: transform 0.35s var(--ease);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text);
}

.nav-link.router-link-active::after {
  transform: translateX(calc(-50% - 0.15em)) scale(1);
}

.nav-right .btn {
  margin-left: 10px;
}

.burger {
  display: none;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  color: var(--text);
  background: var(--bg);
  box-shadow: var(--raised-sm);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  justify-self: end;
}

.mobile {
  display: grid;
  gap: 4px;
  padding: 8px 28px 28px;
}

.mobile a:not(.btn) {
  padding: 14px 0;
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--line);
}

.mobile .btn {
  margin-top: 18px;
}

.drop-enter-active,
.drop-leave-active {
  transition:
    opacity 0.3s var(--ease),
    transform 0.3s var(--ease);
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 980px) {
  .nav {
    display: none;
  }

  /* Two tracks now: the owl takes the first and centres itself in it, the
     burger takes the second. Centring the mark against a 44px button on one
     side only would sit it visibly off-axis. */
  .bar {
    grid-template-columns: 1fr 44px;
    height: 72px;
  }

  .brand {
    justify-content: start;
    margin-left: 44px;
  }

  .burger {
    display: inline-flex;
  }
}

@media (max-width: 420px) {
  /* The wingspan is 2:1, so on a small phone it would crowd the burger.
     Shrink it rather than swapping artwork: the whole owl is the mark. */
  .brand {
    margin-left: 0;
  }

  .brand :deep(.owl) {
    height: 30px !important;
  }
}
</style>

