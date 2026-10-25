// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },

  modules: ['@nuxt/content'],

  css: [
    '@fontsource-variable/outfit',
    '@fontsource-variable/jetbrains-mono',
    '~/assets/css/main.css',
  ],

  content: {
    // Node 22+ ships SQLite, so no native module has to compile in CI.
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['bash', 'json', 'yaml', 'html', 'sql'],
        },
      },
    },
  },

  app: {
    // GitHub Pages serves crawlstat.com from the domain root (see public/CNAME).
    baseURL: '/',
    buildAssetsDir: '/assets/',
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#25272c' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
        { name: 'description', content: 'CrawlStat is a fast, local-first desktop SEO crawler for macOS, Windows and Linux. 45 audits, flat memory, no server — your crawl data never leaves your machine.' },
        { property: 'og:site_name', content: 'CrawlStat' },
        { property: 'og:image', content: 'https://crawlstat.com/screenshots/results-dark.png' },
        { property: 'og:image:alt', content: 'The CrawlStat results table' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      // Lets CSS hide not-yet-revealed sections only when JS will reveal them.
      script: [{ innerHTML: "document.documentElement.classList.add('js')" }],
      link: [
        { rel: 'icon', type: 'image/png', href: '/brand/app-icon-64.png' },
        { rel: 'apple-touch-icon', href: '/brand/app-icon.png' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'CrawlStat blog', href: '/blog/rss.xml' },
      ],
    },
  },

  nitro: {
    // Static output only: GitHub Pages cannot run functions.
    preset: 'github_pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/blog/rss.xml', '/llms.txt'],
      failOnError: true,
      // Write /pricing as pricing.html rather than pricing/index.html, so GitHub
      // Pages answers /pricing with a 200 instead of redirecting to /pricing/.
      autoSubfolderIndex: false,
    },
  },
})
