import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.string(),
        author: z.string().default('The CrawlStat team'),
        tag: z.string().default('Product'),
        cover: z.string().optional(),
        readingTime: z.number().optional(),
      }),
    }),
    docs: defineCollection({
      type: 'page',
      source: 'docs/*.md',
      schema: z.object({
        // Sidebar group and order. Lower numbers come first.
        section: z.string(),
        order: z.number(),
      }),
    }),
  },
})
