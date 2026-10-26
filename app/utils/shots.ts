// Which screenshot illustrates each product area on the home tour and Features page.
export const shots: Record<string, string> = {
  crawl: '/screenshots/crawl-progress.png',
  results: '/screenshots/pages.png',
  'ux-testing': '/screenshots/ux-testing.png',
  plan: '/screenshots/plan.png',
  accessibility: '/screenshots/accessibility-fix-first.png',
  compare: '/screenshots/compare-dark.png',
  issues: '/screenshots/issues-dark-ember.png',
  projects: '/screenshots/projects-list.png',
  visualise: '/screenshots/site-structure.png',
}

// What each of those screenshots shows, for screen readers and image search.
export const shotAlts: Record<string, string> = {
  crawl: 'A live crawl in CrawlStat: a speed gauge at 10.7 URLs a second, counters for crawled, queued and discovered URLs, and a table of pages streaming in',
  results: 'The Pages table with lenses counting title, description and indexability problems above a sortable list of every crawled URL',
  'ux-testing': 'UX Testing on a local business home page: summary tiles, what the page is for, and the findings to fix first, led by visitors who can’t tap to call',
  plan: 'The Plan tab: a written summary followed by jobs ranked by impact, reach and the number of changes each one takes',
  visualise: 'The Visualise tab: structure tiles, a section tree comparing pages with link value, a section link matrix and a clicks-from-home chart',
  accessibility: 'The Accessibility tab ranking WCAG 2.2 barriers to fix first, with before and after markup for a form field with no label',
  compare: 'Two crawls compared side by side, with fixed, new and regressed issues',
  issues: 'The Issues tab in dark mode with the Ember theme: an error affecting 82 URLs scored impact 100, reach 92% and effort one change',
  projects: 'The Projects screen with one row per site, each showing its health, response breakdown, crawl history and issue counts',
  report: 'The cover of a CrawlStat client report with a health score and headline figures',
}
