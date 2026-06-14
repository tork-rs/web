import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// One collection for all documentation. Files live under `content/docs/**`.
// Folder = menu group, markdown file = menu item. Numeric filename prefixes
// (`1.`, `2.` …) only control ordering — they are stripped from the URL.
export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: 'docs/**',
      schema: z.object({
        description: z.string().optional(),
        // Optional short label for the sidebar (falls back to `title`).
        navTitle: z.string().optional(),
      }),
    }),
  },
})
