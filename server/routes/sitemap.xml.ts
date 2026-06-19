// A sitemap generated from the docs content at build time, so it never goes
// stale. Prerendered (see nuxt.config `nitro.prerender.routes`).

export default defineEventHandler(async (event) => {
  const docs = await collectDocs()
  const lastmod = new Date().toISOString().slice(0, 10)

  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0' },
    { loc: `${SITE_URL}/docs`, priority: '0.7' },
    ...docs.map((doc) => ({
      loc: doc.url,
      priority: doc.path.endsWith('/introduction') ? '0.9' : '0.8',
    })),
  ]

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (url) =>
          `  <url><loc>${url.loc}</loc><changefreq>weekly</changefreq>` +
          `<priority>${url.priority}</priority><lastmod>${lastmod}</lastmod></url>`,
      )
      .join('\n') +
    '\n</urlset>\n'

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
