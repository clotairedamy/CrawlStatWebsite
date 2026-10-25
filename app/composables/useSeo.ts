// Page-level SEO in one call: title, description, and the matching social tags.
// Canonical and og:url are set once for every page in app.vue.
export const usePageSeo = (o: {
  title: string
  description: string
  socialTitle?: string
  type?: 'website' | 'article'
}) => {
  const social = o.socialTitle ?? (o.title ? `${o.title} · CrawlStat` : 'CrawlStat — the SEO crawler that runs on your machine')
  useSeoMeta({
    title: o.title,
    description: o.description,
    ogTitle: social,
    ogDescription: o.description,
    ogType: o.type ?? 'website',
    twitterTitle: social,
    twitterDescription: o.description,
  })
}

// Absolute URL on the live site, for structured data and social tags.
export const useAbsoluteUrl = () => {
  const { site } = useAppConfig()
  return (path = '/') => site.url + (path === '/' ? '/' : path.replace(/\/$/, ''))
}

// JSON-LD blocks. `</` is escaped so page text can never close the script tag.
export const useJsonLd = (...items: Record<string, unknown>[]) => {
  useHead({
    script: items.map((item) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...item }).replace(/<\//g, '<\\/'),
    })),
  })
}

export const useStructuredData = () => {
  const { site, pricing, downloads } = useAppConfig()
  const url = useAbsoluteUrl()

  const organization = {
    '@type': 'Organization',
    '@id': url('/') + '#organization',
    name: site.name,
    url: url('/'),
    logo: url('/brand/app-icon.png'),
  }

  const website = {
    '@type': 'WebSite',
    '@id': url('/') + '#website',
    name: site.name,
    url: url('/'),
    inLanguage: 'en',
    publisher: { '@id': organization['@id'] },
  }

  const availability = downloads.platforms.some((p) => p.available) ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder'
  const software = {
    '@type': 'SoftwareApplication',
    '@id': url('/') + '#software',
    name: site.name,
    url: url('/'),
    description:
      'A fast, local-first desktop SEO crawler for macOS, Windows and Linux. 45 SEO and accessibility audits with fix-it guidance, flat memory at any crawl size, and no server — crawl data never leaves your machine.',
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'SEO crawler',
    operatingSystem: 'macOS, Windows, Linux',
    softwareVersion: downloads.version,
    image: url('/brand/app-icon.png'),
    screenshot: ['results', 'crawl', 'issues', 'projects'].map((s) => url(`/screenshots/${s}-dark.png`)),
    publisher: { '@id': organization['@id'] },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        description: `Up to ${pricing.freeUrlLimit} URLs per crawl, every audit included.`,
        price: '0',
        priceCurrency: 'USD',
        availability,
        url: url('/pricing'),
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        description: 'Unlimited URLs per crawl, plus crawl comparison, custom extraction, scheduled crawls and reports.',
        price: String(pricing.proYearly),
        priceCurrency: 'USD',
        availability,
        url: url('/pricing'),
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: String(pricing.proYearly),
          priceCurrency: 'USD',
          billingDuration: 'P1Y',
          unitCode: 'ANN',
        },
      },
    ],
  }

  const breadcrumbs = (trail: [name: string, path: string][]) => ({
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: url(path),
    })),
  })

  return { organization, website, software, breadcrumbs, url }
}
