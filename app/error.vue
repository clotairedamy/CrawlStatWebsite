<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)
useSeoMeta({ title: notFound.value ? 'Page not found' : 'Something went wrong', robots: 'noindex, follow' })
</script>

<template>
  <NuxtLayout>
    <section class="err">
      <div class="orb" aria-hidden="true"><div class="ring"><span /></div></div>
      <span class="eyebrow">{{ error.statusCode }}</span>
      <h1 class="h2 copper-text">{{ notFound ? 'This page returned a 404.' : 'Something went wrong.' }}</h1>
      <p class="lead">{{ notFound ? 'CrawlStat would flag this one. Let’s get you somewhere useful.' : error.message }}</p>
      <div class="buttons">
        <button class="btn btn-copper" @click="clearError({ redirect: '/' })">Back home</button>
        <NuxtLink to="/docs" class="btn btn-ghost">Help centre</NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.err {
  min-height: 70vh;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 22px;
  text-align: center;
  padding: 60px 28px;
}

.orb {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: var(--raised);
  margin-bottom: 20px;
}

.ring {
  width: 56%;
  height: 56%;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: var(--inset);
}

.ring span {
  width: 26%;
  height: 26%;
  border-radius: 50%;
  background: var(--copper-grad);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
}

.buttons {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}
</style>
