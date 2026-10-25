// Values you will want to change without touching templates.
export default defineAppConfig({
  site: {
    name: 'CrawlStat',
    url: 'https://crawlstat.com',
  },

  contact: {
    // The /contact form posts to Web3Forms, which emails the message on. The
    // key is public by design: it can only send to the inbox it was issued
    // for, so the address itself never appears in the site. Get one free at
    // https://web3forms.com. Until it is set, the form says it is not
    // connected rather than pretending to send.
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: 'a8e448c1-dd12-4f4d-8889-d5a5a1d3e692',
  },

  pricing: {
    proYearly: 99,
    freeUrlLimit: 500,
    // Your merchant-of-record checkout link (Lemon Squeezy, Polar or Paddle).
    // Until it is set, "Go Pro" buttons send people to the download page.
    checkoutUrl: '',
  },

  downloads: {
    // GitHub Releases is where installers are published: pushing the tag
    // `v<version>` in the app repo runs the release workflow, which uploads
    // the files named below.
    releases: 'https://github.com/clotairedamy/CrawlStat/releases/latest',
    download: 'https://github.com/clotairedamy/CrawlStat/releases/download',
    // Must match the released tag, without the leading v.
    version: '1.0.0',
    // Each platform goes live on its own: flip `available` once its installer
    // is on the release. `{v}` in a file name becomes the version; the names
    // must match what packaging/ in the app repo produces.
    platforms: [
      {
        id: 'macos',
        name: 'macOS',
        detail: 'Apple Silicon & Intel · macOS 11+',
        available: false,
        files: [{ label: '.dmg', name: 'CrawlStat-{v}-macos.dmg' }],
      },
      {
        id: 'windows',
        name: 'Windows',
        detail: 'Windows 10 & 11 · 64-bit',
        available: false,
        files: [{ label: '.exe', name: 'CrawlStat-{v}-windows-setup.exe' }],
      },
      {
        id: 'linux',
        name: 'Linux',
        detail: 'x86-64 · .deb for Debian & Ubuntu, AppImage for any distro',
        available: true,
        files: [
          { label: '.deb', name: 'CrawlStat-{v}-amd64.deb' },
          { label: '.AppImage', name: 'CrawlStat-{v}-x86_64.AppImage' },
        ],
      },
    ],
  },
})
