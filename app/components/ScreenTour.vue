<script setup lang="ts">
import { shots, shotAlts } from '~/utils/shots'
// The app, one screen at a time: a pressed-in segmented control picks the
// screen, and the screenshot cross-fades.
const screens = [
  {
    id: 'crawl',
    label: 'Crawl',
    title: 'Watch it work',
    body: 'A speed gauge ticking past ten URLs a second, counters for every status, and each page streaming into the table the moment it answers. Pause, resume or stop whenever you like.',
  },
  {
    id: 'results',
    label: 'Pages',
    title: 'Every URL, already sorted',
    body: 'Lenses count the problem pages before you click: 6 title problems, 15 description problems, 2 not indexable. Eleven tabs over one table, and half a million rows scroll like fifty.',
  },
  {
    id: 'ux-testing',
    label: 'UX Testing',
    title: 'Does this page do its job?',
    body: 'It reads the page, works out it is a local business that wants bookings, then tells you what gets in the way: no tap-to-call link, a button that says “Send it” instead of “Book”. Ranked, with the evidence.',
  },
  {
    id: 'plan',
    label: 'Plan',
    title: 'What to fix on Monday',
    body: 'Every job ranked by how much of the site it touches and how many changes it takes. One template edit can clear 82 pages, and the Plan tells you which edit that is. A local AI can write the summary for you.',
  },
  {
    id: 'visualise',
    label: 'Visualise',
    title: 'See the shape of the site',
    body: 'A section tree, a link graph and a click-depth chart show how link value flows through the site, and which pages it never reaches.',
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    title: 'WCAG 2.2, fix first',
    body: 'Barriers ranked by how badly they block people. When the same markup is on 217 of 217 pages, it says so: fix it once in the template. Then work through the manual checklist and keep the results in the crawl.',
  },
  {
    id: 'compare',
    label: 'Compare',
    title: 'Did the fix work?',
    body: 'Two crawls side by side, with Pro: what was fixed, what broke, and which pages started failing. Deleting a page never counts as fixing it.',
  },
  {
    id: 'issues',
    label: 'Issues',
    title: 'Fixes, not just flags',
    body: 'Impact 100, reach 92%, effort: one change. Each issue tells you what it costs, how to fix it, and which best-linked pages to check first, in the theme you prefer.',
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Every site, at a glance',
    body: 'One row per site with its health, its crawl history and what is left in the queue. Recrawl in one click, or resume a stopped crawl exactly where it left off.',
  },
] as const

const active = ref(2)
const current = computed(() => screens[active.value]!)
</script>

<template>
  <div class="tour">
    <div class="tabs" role="tablist" aria-label="App screens">
      <button
        v-for="(s, i) in screens"
        :key="s.id"
        role="tab"
        :aria-selected="i === active"
        :class="{ on: i === active }"
        @click="active = i"
      >
        {{ s.label }}
      </button>
    </div>

    <div class="stage">
      <div class="copy">
        <Transition name="fade" mode="out-in">
          <div :key="current.id">
            <h3 class="h3">{{ current.title }}</h3>
            <p class="muted">{{ current.body }}</p>
          </div>
        </Transition>
      </div>
      <div class="shot">
        <AppWindow
          v-for="(s, i) in screens"
          v-show="i === active"
          :key="s.id"
          :src="shots[s.id]"
          :alt="shotAlts[s.id]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tour {
  display: grid;
  gap: 48px;
  justify-items: center;
}

.tabs {
  display: inline-flex;
  gap: 4px;
  padding: 6px;
  border-radius: 999px;
  box-shadow: var(--inset);
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs button {
  border: 0;
  background: transparent;
  color: var(--muted);
  font: inherit;
  font-size: 0.9rem;
  padding: 11px 24px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    color 0.25s,
    box-shadow 0.35s var(--ease),
    background 0.35s var(--ease);
}

.tabs button:hover {
  color: var(--text);
}

.tabs button.on {
  color: var(--copper-hi);
  background: linear-gradient(145deg, #f4f4f6, #e3e3e6);
  box-shadow: var(--raised-sm);
}

.stage {
  width: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 56px;
  align-items: center;
}

.copy {
  min-height: 160px;
}

.copy h3 {
  margin-bottom: 14px;
}

.copy p {
  font-weight: 300;
  line-height: 1.7;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.35s var(--ease),
    transform 0.35s var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.shot :deep(.window) {
  animation: in 0.6s var(--ease);
}

@keyframes in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.99);
  }
}

@media (max-width: 960px) {
  .stage {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .copy {
    min-height: 0;
    text-align: center;
  }
}
</style>
