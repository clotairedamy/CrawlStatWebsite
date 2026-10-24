<script setup lang="ts">
useSeoMeta({
  title: 'CrawlStatBot',
  description: 'CrawlStatBot is the crawler inside the CrawlStat desktop app. How it behaves, and how to control it with robots.txt.',
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="For site owners"
      title="About CrawlStatBot."
      lead="If you saw CrawlStatBot in your logs, someone ran the CrawlStat desktop app against your site — usually to audit their own."
    />
    <section class="section-tight">
      <div class="container prose body">
        <p>The user agent looks like this:</p>
        <pre><code>CrawlStatBot/1.0 (+https://crawlstat.com/bot)</code></pre>
        <h2>How it behaves</h2>
        <ul>
          <li>It honours <code>robots.txt</code> — both <code>Disallow</code> rules and <code>Crawl-delay</code> — by default.</li>
          <li>It paces requests per host, with 5 simultaneous requests by default.</li>
          <li>It runs on the user’s own computer. There is no CrawlStat server crawling the web, and no data is collected by us.</li>
        </ul>
        <h2>Blocking or slowing it</h2>
        <p>Add a group for CrawlStatBot to your <code>robots.txt</code>:</p>
        <pre><code>User-agent: CrawlStatBot
Disallow: /

# or, to slow it down instead:
User-agent: CrawlStatBot
Crawl-delay: 2</code></pre>
        <p>
          Questions or a problem? Email <a href="mailto:hello@crawlstat.com">hello@crawlstat.com</a>. For more, read
          <NuxtLink to="/docs/crawler-and-robots">The crawler and robots.txt</NuxtLink>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.body {
  max-width: 760px;
  padding-bottom: 100px;
}
</style>
