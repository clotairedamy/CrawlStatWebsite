// Values you will want to change without touching templates.
export default defineAppConfig({
  site: {
    name: 'CrawlStat',
    url: 'https://crawlstat.com',
    email: 'hello@crawlstat.com',
  },

  pricing: {
    proYearly: 99,
    freeUrlLimit: 500,
    // Your merchant-of-record checkout link (Lemon Squeezy, Polar or Paddle).
    // Until it is set, "Go Pro" buttons send people to the download page.
    checkoutUrl: '',
  },

  downloads: {
    // Flip to true at launch: download buttons stop saying "Coming soon"
    // and the download page links to the installers.
    available: false,
    // GitHub Releases is where signed installers are published (Phase 7).
    releases: 'https://github.com/clotairedamy/CrawlStat/releases/latest',
    version: '1.0',
    platforms: [
      { id: 'macos', name: 'macOS', detail: 'Apple Silicon & Intel · macOS 11+', file: '.dmg' },
      { id: 'windows', name: 'Windows', detail: 'Windows 10 & 11 · 64-bit', file: '.exe' },
      { id: 'linux', name: 'Linux', detail: 'x86-64 · AppImage & .deb', file: '.AppImage' },
    ],
  },
})
