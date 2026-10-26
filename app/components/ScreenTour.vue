<script setup lang="ts">
// The app, one screen at a time: a pressed-in segmented control picks the
// screen, and the screenshot cross-fades.
const screens = [
  {
    id: 'crawl',
    label: 'Crawl',
    title: 'Watch it work',
    body: 'Live counters, URLs per second and every response as it lands. Pause, resume or stop, and render JavaScript in your own browser when a site needs it.',
  },
  {
    id: 'results',
    label: 'Pages',
    title: 'A table that keeps up',
    body: 'Eleven tabs over one table, lenses that count the broken, slow and thin pages before you click, and a detail panel. Half a million rows scroll in the same memory as fifty.',
  },
  {
    id: 'ux-testing',
    label: 'UX Testing',
    title: 'Does this page do its job?',
    body: 'Give it one URL. It works out what the page is for, runs up to 62 UX checks against that goal and ranks what to fix first — with the evidence, and a plain note on what it could not test.',
  },
  {
    id: 'plan',
    label: 'Plan',
    title: 'What to fix on Monday',
    body: 'Findings ranked by how much of your site each one actually touches and how many pages a single change fixes. 823 pages with one problem is often two template edits — the list says which.',
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    title: 'WCAG 2.2, tracked',
    body: 'Automated checks across every page, plus a manual checklist you work through and keep in the crawl file. Test a staging URL before it ships.',
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
    body: 'Findings grouped by severity and ranked by impact, reach and effort, each with a plain-English explanation and how to fix it. One click opens the affected pages.',
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Every crawl, on this machine',
    body: 'Recent crawls as cards, or one row per site with its health and history. Recrawl in one click, or resume an interrupted crawl exactly where it stopped.',
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
          :src="`/screenshots/${s.id}-dark.png`"
          :alt="`CrawlStat ${s.label} screen`"
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
