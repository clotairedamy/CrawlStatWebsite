<script setup lang="ts">
const dl = useDownloadCta()

withDefaults(defineProps<{ title?: string; body?: string }>(), {
  title: 'Start crawling in a minute.',
  body: 'Download CrawlStat, paste a URL, press Enter. Free up to 500 URLs per crawl — no account, no card.',
})
</script>

<template>
  <section class="section">
    <div class="container">
      <div v-reveal class="cta">
        <div class="orb" aria-hidden="true">
          <div class="orb-ring"><span class="orb-core" /></div>
        </div>
        <div class="copy">
          <h2 class="h2">{{ title }}</h2>
          <p class="lead">{{ body }}</p>
          <div class="buttons">
            <NuxtLink to="/download" class="btn btn-copper">
              <Icon :name="dl.icon" /> {{ dl.label('Download free') }}
            </NuxtLink>
            <NuxtLink to="/pricing" class="btn btn-ghost">See pricing</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 72px;
  align-items: center;
  padding: 72px;
  border-radius: 36px;
  background: linear-gradient(145deg, #f4f4f6, #e3e3e6);
  box-shadow: var(--raised-lg);
}

.copy {
  display: grid;
  gap: 20px;
}

.buttons {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.orb {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #f4f4f6, #e3e3e6);
  box-shadow: var(--raised);
}

.orb-ring {
  width: 54%;
  height: 54%;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: var(--inset);
}

.orb-core {
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background: var(--copper-grad);
  box-shadow:
    0 0 26px rgba(0, 0, 0, 0.25),
    inset 0 2px 0 rgba(255, 255, 255, 0.4);
  animation: breathe 3.6s ease-in-out infinite;
}

@keyframes breathe {
  50% {
    transform: scale(1.12);
    box-shadow:
      0 0 40px rgba(0, 0, 0, 0.35),
      inset 0 2px 0 rgba(255, 255, 255, 0.4);
  }
}

@media (max-width: 860px) {
  .cta {
    grid-template-columns: 1fr;
    padding: 48px 32px;
    gap: 40px;
    justify-items: center;
    text-align: center;
  }

  .buttons {
    justify-content: center;
  }

  .orb {
    width: 160px;
    height: 160px;
  }
}
</style>
