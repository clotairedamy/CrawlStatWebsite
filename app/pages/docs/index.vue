<script setup lang="ts">
import audits from '~/data/audits.json'

useJsonLd(useStructuredData().breadcrumbs([['Home', '/'], ['Help centre', '/docs']]))
usePageSeo({
  title: 'Help centre',
  description: 'Guides for installing CrawlStat, running your first crawl, reading results and fixing every issue it finds.',
})

const { data: pages } = await useAsyncData('docs-all', () =>
  queryCollection('docs').select('title', 'path', 'section', 'description', 'order').order('order', 'ASC').all(),
)

const q = ref('')
function search(text: string) {
  const term = text.trim().toLowerCase()
  if (!term) return []
  const docs = (pages.value ?? [])
    .filter((p) => `${p.title} ${p.description}`.toLowerCase().includes(term))
    .map((p) => ({ to: p.path, title: p.title, kind: 'Guide' }))
  const refs = audits
    .filter((a) => `${a.title} ${a.description}`.toLowerCase().includes(term))
    .map((a) => ({ to: `/docs/audits/${a.slug}`, title: a.title, kind: 'Audit' }))
  return [...docs, ...refs].slice(0, 8)
}
const matches = computed(() => search(q.value))

// The search is also a WebMCP tool (see the attributes on the form): an agent
// fills `q` and submits, and gets the matches back as data instead of a page
// change. A person pressing Enter goes to the top match. The term is read
// from the form rather than `q`, because an agent may set the field's value
// without firing the input event v-model listens for.
type AgentSubmitEvent = SubmitEvent & { agentInvoked?: boolean; respondWith?: (result: Promise<unknown>) => void }
function onSubmit(e: Event) {
  const event = e as AgentSubmitEvent
  const found = search(String(new FormData(event.target as HTMLFormElement).get('q') ?? ''))
  if (event.agentInvoked && event.respondWith) {
    event.respondWith(
      Promise.resolve(found.map((m) => ({ title: m.title, kind: m.kind, url: new URL(m.to, location.origin).href }))),
    )
    return
  }
  if (found[0]) navigateTo(found[0].to)
}

const icons: Record<string, string> = {
  'Start here': 'bolt',
  'Using CrawlStat': 'radar',
  'Account & data': 'lock',
  Help: 'book',
}
const groups = computed(() => {
  const out: { section: string; pages: NonNullable<typeof pages.value> }[] = []
  for (const p of pages.value ?? []) {
    let g = out.find((x) => x.section === p.section)
    if (!g) out.push((g = { section: p.section, pages: [] }))
    g.pages.push(p)
  }
  return out
})

// One-tap searches for the questions people arrive with.
const popular = ['Client reports', 'Render JavaScript', 'Redirect chain', 'Hreflang', 'Licence']

// `/` jumps to the search from anywhere on the page, as on most docs sites.
const field = ref<HTMLInputElement>()
onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
    const t = e.target as HTMLElement
    if (t.closest('input, textarea, select, [contenteditable]')) return
    e.preventDefault()
    field.value?.focus()
  }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})
function ask(term: string) {
  q.value = term
  field.value?.focus()
}
</script>

<template>
  <div>
    <PageHero eyebrow="Help centre" title="How can we help?" lead="Everything from installing CrawlStat to fixing the last redirect chain.">
      <form
        class="search"
        role="search"
        toolname="search_docs"
        tooldescription="Search the CrawlStat docs: guides to using the desktop app, and the reference page for each SEO and accessibility audit. Returns up to 8 matching pages with their title, kind (Guide or Audit) and URL."
        toolautosubmit
        @submit.prevent="onSubmit"
      >
        <Icon name="search" :size="20" />
        <input
          ref="field"
          v-model="q"
          name="q"
          type="search"
          required
          placeholder="Search guides and audits…"
          aria-label="Search the help centre"
          aria-keyshortcuts="/"
          toolparamdescription="Words to find in guide and audit titles and descriptions, such as 'redirect chain', 'hreflang' or 'UX testing'."
        >
        <kbd v-if="!q" class="kbd" aria-hidden="true">/</kbd>
        <Transition name="drop">
          <ul v-if="matches.length" class="results">
            <li v-for="m in matches" :key="m.to">
              <NuxtLink :to="m.to"><span>{{ m.title }}</span><em>{{ m.kind }}</em></NuxtLink>
            </li>
          </ul>
        </Transition>
      </form>
      <div class="popular">
        <span class="muted">Popular:</span>
        <button v-for="t in popular" :key="t" type="button" class="chip" @click="ask(t)">{{ t }}</button>
      </div>
    </PageHero>

    <section class="section-tight">
      <div class="container">
        <section v-for="g in groups" :key="g.section" class="group" :aria-labelledby="`g-${g.section}`">
          <header v-reveal class="g-head">
            <span class="g-icon"><Icon :name="(icons[g.section] ?? 'book') as any" :size="20" /></span>
            <div>
              <h2 :id="`g-${g.section}`" class="h3">{{ g.section }}</h2>
              <span class="g-count">{{ g.pages.length }} {{ g.pages.length === 1 ? 'guide' : 'guides' }}</span>
            </div>
          </header>
          <div class="g-links">
            <NuxtLink v-for="(p, j) in g.pages" :key="p.path" v-reveal="(j % 3) * 70" :to="p.path" class="g-link spot">
              <span class="g-title">{{ p.title }} <Icon name="arrow" :size="15" /></span>
              <span class="g-desc">{{ p.description }}</span>
            </NuxtLink>
          </div>
        </section>

        <div v-reveal class="audits neu spot">
          <div class="audits-head">
            <div>
              <span class="eyebrow">Reference</span>
              <h2 class="h3">The audit reference</h2>
              <p class="muted">All {{ audits.length }} checks CrawlStat runs: what each one means and exactly how to fix it.</p>
            </div>
            <NuxtLink to="/docs/audits" class="btn btn-copper btn-sm">Browse audits <Icon name="arrow" :size="16" /></NuxtLink>
          </div>
          <AuditMarquee />
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="container center contact">
        <p class="lead">Can’t find what you need?</p>
        <NuxtLink to="/contact" class="btn btn-ghost"><Icon name="mail" /> Get in touch</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.search {
  position: relative;
  width: 100%;
  max-width: 560px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 24px;
  height: 62px;
  border-radius: 999px;
  box-shadow: var(--inset);
  color: var(--muted);
}

.search input {
  flex: 1;
  height: 100%;
  border: 0;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 1rem;
  outline: none;
}

.search:focus-within {
  box-shadow:
    var(--inset),
    0 0 0 1px rgba(0, 0, 0, 0.2);
}

.results {
  position: absolute;
  z-index: 10;
  top: calc(100% + 14px);
  left: 0;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 10px;
  border-radius: 22px;
  background: var(--surface);
  box-shadow: 20px 24px 60px rgba(0, 0, 0, 0.14);
  text-align: left;
}

.results a {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 12px;
  color: var(--text);
}

.results a:hover {
  box-shadow: var(--inset-sm);
  color: var(--copper-hi);
}

.results em {
  font-style: normal;
  font-size: 0.75rem;
  color: var(--muted);
}

.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.2s;
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
}

.kbd {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  font: 500 0.8rem var(--mono, ui-monospace, monospace);
  color: var(--muted);
  box-shadow: var(--raised-sm);
}

.popular {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 0.86rem;
  animation: up 0.5s var(--ease) 0.2s both;
}

.chip {
  padding: 7px 14px;
  border: 0;
  border-radius: 999px;
  background: var(--bg);
  box-shadow: var(--raised-sm);
  font: inherit;
  color: var(--text-soft);
  cursor: pointer;
  transition:
    box-shadow 0.25s var(--ease),
    color 0.2s,
    translate 0.25s var(--ease);
}

.chip:hover {
  color: var(--text);
  translate: 0 -2px;
}

.chip:active {
  box-shadow: var(--inset-sm);
  translate: none;
}

@keyframes up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

/* Each section is a row: its name on the left, held in view while its
   guides scroll past, and the guides as tiles that size to their content. */
.group {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
  padding: 44px 0;
  border-top: 1px solid var(--line-strong);
}

.group:first-child {
  border-top: 0;
  padding-top: 12px;
}

.g-head {
  position: sticky;
  top: 112px;
  align-self: start;
  display: flex;
  align-items: center;
  gap: 16px;
}

.g-head h2 {
  margin: 0;
  font-size: 1.15rem;
}

.g-count {
  font-size: 0.8rem;
  color: var(--muted);
}

.g-icon {
  width: 46px;
  height: 46px;
  flex: none;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--copper);
  box-shadow: var(--inset-sm);
}

.g-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}

.g-link {
  display: grid;
  gap: 6px;
  align-content: start;
  padding: 18px 20px 20px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    background 0.35s var(--ease),
    box-shadow 0.35s var(--ease),
    translate 0.35s var(--ease);
}

.g-link:hover,
.g-link:focus-visible {
  background: var(--bg);
  box-shadow: var(--raised-sm);
  translate: 0 -3px;
}

.g-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  color: var(--text);
}

.g-title .icon {
  flex: none;
  opacity: 0.25;
  transition:
    opacity 0.25s,
    translate 0.3s var(--ease);
}

.g-link:hover .g-title .icon {
  opacity: 1;
  translate: 3px 0;
}

.g-desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  font-size: 0.86rem;
  font-weight: 300;
  line-height: 1.55;
  color: var(--muted);
}

.audits {
  margin-top: 36px;
  padding: 40px 0 16px;
  overflow: hidden;
}

.audits-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  padding: 0 44px;
}

.audits h2 {
  margin: 10px 0 8px;
}

@media (max-width: 860px) {
  .group {
    grid-template-columns: 1fr;
    gap: 22px;
    padding: 32px 0;
  }

  .g-head {
    position: static;
  }

  .audits-head {
    padding: 0 26px;
  }
}

.contact {
  display: grid;
  gap: 20px;
  justify-items: center;
  padding-bottom: 60px;
}
</style>
