// `/llms-full.txt` — the full text of every documentation page as one Markdown
// file, for AI / generative engines. Sits next to `/llms.txt`. Generated from
// the docs content, prerendered.
//
// Each page is preceded by a metadata block (title, description, last_updated,
// source) fenced by an 80-character rule, the same shape Vercel uses.

const RULE = '-'.repeat(80)

export default defineEventHandler(async (event) => {
  const docs = await collectDocs()

  const blocks = docs.map((doc) => {
    const front = [
      RULE,
      `title: ${JSON.stringify(doc.title)}`,
      `description: ${JSON.stringify(doc.description)}`,
      `last_updated: ${JSON.stringify(doc.lastModified)}`,
      `source: ${JSON.stringify(doc.url)}`,
      RULE,
    ].join('\n')
    return `${front}\n\n${doc.body}`
  })

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `${blocks.join('\n\n\n')}\n`
})
