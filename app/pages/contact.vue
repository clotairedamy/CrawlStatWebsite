<script setup lang="ts">
usePageSeo({
  title: 'Contact',
  description: 'Get in touch with the CrawlStat team: questions, licence and billing help, bug reports, or a note when CrawlStat launches on your platform.',
})
useJsonLd(useStructuredData().breadcrumbs([['Home', '/'], ['Contact', '/contact']]))

const { contact } = useAppConfig()
const route = useRoute()

const topics = {
  question: 'A question',
  licence: 'Licence or billing',
  bug: 'Something is not working',
  crawler: 'CrawlStatBot visited my site',
  launch: 'Tell me when CrawlStat launches',
} as const
type Topic = keyof typeof topics

const topic = ref<Topic>('question')
// Applied after hydration: the page is prerendered once, without the query, so
// a ?topic= link has to change it in the browser for the change to render.
onMounted(() => {
  const asked = String(route.query.topic ?? '')
  if (asked in topics) topic.value = asked as Topic
})
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const problem = ref('')

// Posts to the form service from the browser: the site is static, so there
// is no server of our own to send mail from. A hidden `botcheck` box catches
// the bots that fill in every field.
async function onSubmit(e: Event) {
  const form = e.target as HTMLFormElement
  if (!contact.accessKey) {
    state.value = 'error'
    problem.value = 'The contact form is not connected yet. Please try again soon.'
    return
  }
  const data = Object.fromEntries(new FormData(form))
  state.value = 'sending'
  try {
    const res = await fetch(contact.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...data,
        access_key: contact.accessKey,
        subject: `CrawlStat: ${topics[topic.value]}`,
        from_name: 'crawlstat.com',
      }),
    })
    const out = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
    if (!res.ok || !out.success) throw new Error(out.message || `The form service answered ${res.status}.`)
    state.value = 'sent'
    form.reset()
  } catch (err) {
    state.value = 'error'
    problem.value = err instanceof Error ? err.message : 'The message could not be sent.'
  }
}
</script>

<template>
  <div>
    <PageHero
      eyebrow="Contact"
      title="Get in touch."
      lead="Questions, licence help, bug reports or a note when CrawlStat launches on your platform. A person reads every message."
    />

    <section class="section-tight">
      <div class="container body">
        <div v-if="state === 'sent'" class="sent neu">
          <Icon name="check" :size="26" />
          <h2 class="h3">Message sent.</h2>
          <p class="muted">Thanks — we will reply to the address you gave.</p>
          <button type="button" class="btn btn-ghost" @click="state = 'idle'">Send another</button>
        </div>

        <!-- Also a WebMCP tool. No toolautosubmit: an agent can fill it in,
             but a person reviews it and presses Send. -->
        <form
          v-else
          class="form neu"
          toolname="contact_crawlstat"
          tooldescription="Send a message to the CrawlStat team. The visitor reviews the message and sends it themselves."
          @submit.prevent="onSubmit"
        >
          <label class="field">
            <span>Name</span>
            <input name="name" type="text" autocomplete="name" required toolparamdescription="The sender's name.">
          </label>
          <label class="field">
            <span>Email</span>
            <input name="email" type="email" autocomplete="email" required toolparamdescription="Where the reply should go.">
          </label>
          <label class="field">
            <span>About</span>
            <select v-model="topic" name="topic" toolparamdescription="What the message is about.">
              <option v-for="(label, key) in topics" :key="key" :value="key">{{ label }}</option>
            </select>
          </label>
          <label class="field">
            <span>Message</span>
            <textarea
              name="message"
              rows="7"
              :required="topic !== 'launch'"
              :placeholder="topic === 'launch' ? 'Optional. Which platform are you waiting for?' : topic === 'bug' ? 'What you did, what happened, your OS and CrawlStat version.' : ''"
              toolparamdescription="The message itself."
            />
          </label>
          <input type="checkbox" name="botcheck" class="trap" tabindex="-1" autocomplete="off" aria-hidden="true">

          <p v-if="state === 'error'" class="problem" role="alert">{{ problem }}</p>
          <button type="submit" class="btn btn-copper" :disabled="state === 'sending'">
            <Icon name="mail" :size="18" /> {{ state === 'sending' ? 'Sending…' : 'Send' }}
          </button>
        </form>

        <p class="muted aside">
          Something not working? <NuxtLink to="/docs/troubleshooting">Troubleshooting</NuxtLink> may have the answer
          already.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.body {
  max-width: 680px;
  padding-bottom: 100px;
}

.form,
.sent {
  display: grid;
  gap: 22px;
  padding: 36px;
  border-radius: 28px;
}

.sent {
  justify-items: center;
  text-align: center;
  color: var(--copper);
}

.sent h2 {
  color: var(--text);
}

.field {
  display: grid;
  gap: 8px;
}

.field span {
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.field input,
.field select,
.field textarea {
  width: 100%;
  border: 0;
  border-radius: 16px;
  padding: 14px 18px;
  background: transparent;
  box-shadow: var(--inset);
  color: var(--text);
  font: inherit;
  font-size: 1rem;
  outline: none;
}

.field select {
  appearance: none;
  cursor: pointer;
}

.field select option {
  background: var(--surface);
}

.field textarea {
  resize: vertical;
  line-height: 1.6;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  box-shadow:
    var(--inset),
    0 0 0 1px rgba(227, 173, 123, 0.4);
}

.trap {
  position: absolute;
  left: -9999px;
}

.problem {
  color: var(--error);
  font-size: 0.92rem;
}

.form .btn {
  justify-self: start;
}

.aside {
  margin-top: 28px;
  text-align: center;
  font-size: 0.92rem;
}

.aside a {
  color: var(--copper);
}

@media (max-width: 560px) {
  .form,
  .sent {
    padding: 26px 20px;
  }
}
</style>
