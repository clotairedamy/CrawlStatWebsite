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
          v-model="q"
          name="q"
          type="search"
          required
          placeholder="Search guides and audits…"
          aria-label="Search the help centre"
          toolparamdescription="Words to find in guide and audit titles and descriptions, such as 'redirect chain', 'hreflang' or 'UX testing'."
        >
        <Transition name="drop">
          <ul v-if="matches.length" class="results">
            <li v-for="m in matches" :key="m.to">
              <NuxtLink :to="m.to"><span>{{ m.title }}</span><em>{{ m.kind }}</em></NuxtLink>
            </li>
          </ul>
        </Transition>
      </form>
    </PageHero>

    <section class="section-tight">
      <div class="container">
        <div class="groups">
          <article v-for="(g, i) in groups" :key="g.section" v-reveal="i * 90" class="card group">
            <span class="g-icon"><Icon :name="(icons[g.section] ?? 'book') as any" :size="22" /></span>
            <h2 class="h3">{{ g.section }}</h2>
            <NuxtLink v-for="p in g.pages" :key="p.path" :to="p.path" class="g-link">
              {{ p.title }} <Icon name="arrow" :size="15" />
            </NuxtLink>
          </article>
        </div>

        <NuxtLink v-reveal to="/docs/audits" class="audits neu">
          <div>
            <span class="eyebrow">Reference</span>
            <h2 class="h3">The audit reference</h2>
            <p class="muted">All {{ audits.length }} checks CrawlStat runs: what each one means and exactly how to fix it.</p>
          </div>
          <span class="btn btn-copper btn-sm">Browse audits <Icon name="arrow" :size="16" /></span>
        </NuxtLink>
      </div>
    </section>

    <section class="section-tight">
      <div class="container center contact">
        <p class="lead">Can’t find what you need?</p>
        <a href="mailto:hello@crawlstat.com" class="btn btn-ghost"><Icon name="mail" /> hello@crawlstat.com</a>
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
    0 0 0 1px rgba(227, 173, 123, 0.4);
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
  box-shadow: 20px 24px 60px rgba(0, 0, 0, 0.45);
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

.groups {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 28px;
}

.group {
  display: grid;
  gap: 6px;
  align-content: start;
}

.group h2 {
  margin: 10px 0 10px;
}

.g-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--copper);
  box-shadow: var(--inset-sm);
}

.g-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  font-weight: 300;
  color: var(--text-soft);
  transition: color 0.2s;
}

.g-link .icon {
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.25s var(--ease);
  color: var(--copper);
}

.g-link:hover {
  color: var(--text);
}

.g-link:hover .icon {
  opacity: 1;
  transform: none;
}

.audits {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  padding: 40px 44px;
}

.audits h2 {
  margin: 10px 0 8px;
}

.contact {
  display: grid;
  gap: 20px;
  justify-items: center;
  padding-bottom: 60px;
}
</style>
