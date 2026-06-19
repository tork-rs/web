// `/docs/llms-full.txt` — the full text of every documentation page as one
// Markdown file, for AI / generative engines. Generated from the docs content,
// prerendered.

export default defineEventHandler(async (event) => {
  const docs = await collectDocs()

  const parts: string[] = [
    '# Tork documentation',
    '',
    '> The complete text of https://tork.rs/docs. Each page below is preceded ' +
      'by its source URL.',
    '',
  ]

  for (const doc of docs) {
    parts.push(`<!-- Source: ${doc.url} -->`, '', doc.body, '')
  }

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return parts.join('\n')
})
