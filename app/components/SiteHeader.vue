<script setup lang="ts">
const route = useRoute()
const dl = useDownloadCta()
const open = ref(false)
const scrolled = ref(false)

const links = [
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/docs', label: 'Help' },
  { to: '/blog', label: 'Blog' },
]

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
      <NuxtLink to="/" class="brand" aria-label="CrawlStat home">
        <img src="/brand/app-icon-64.png" alt="" width="34" height="34">
        <span>Crawl<b>Stat</b></span>
      </NuxtLink>

      <nav class="nav" aria-label="Main">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="nav-link">{{ l.label }}</NuxtLink>
      </nav>

      <div class="actions">
        <NuxtLink to="/download" class="btn btn-copper btn-sm">
          <Icon :name="dl.icon" :size="16" /> {{ dl.label('Download') }}
        </NuxtLink>
        <button class="burger" :aria-expanded="open" aria-label="Menu" @click="open = !open">
          <Icon :name="open ? 'close' : 'menu'" />
        </button>
      </div>
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
  display: flex;
  align-items: center;
  gap: 40px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.12rem;
  font-weight: 450;
  letter-spacing: -0.01em;
}

.brand img {
  border-radius: 9px;
  box-shadow: var(--raised-sm);
}

.brand b {
  font-weight: 450;
  color: var(--muted);
}

.nav {
  display: flex;
  gap: 44px;
  margin-left: 28px;
}

.nav-link {
  position: relative;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-soft);
  padding: 8px 0;
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

.actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 14px;
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

@media (max-width: 860px) {
  .nav,
  .actions > .btn {
    display: none;
  }

  .burger {
    display: inline-flex;
  }

  .bar {
    height: 72px;
  }
}
</style>
