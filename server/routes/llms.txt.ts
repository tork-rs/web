// `/llms.txt` — an index of the documentation for AI / generative engines,
// in the llmstxt.org format (https://llmstxt.org). The full text lives at
// `/llms-full.txt`. Generated from the docs content, prerendered.

export default defineEventHandler(async (event) => {
  const docs = await collectDocs()

  const lines: string[] = [
    '# Tork',
    '',
    '> Tork is an async web framework for Rust with a built-in CLI and ORM. ' +
      'Routes, queries, and migrations are checked the moment you compile. ' +
      'Install the CLI with `cargo install tork-cli`.',
    '',
    'The full text of every page is at https://torkframework.dev/llms-full.txt.',
    '',
  ]

  const sections = [...new Set(docs.map((doc) => doc.section))]
  for (const section of sections) {
    lines.push(`## ${sectionLabel(section)}`, '')
    for (const doc of docs.filter((doc) => doc.section === section)) {
      const description = doc.description ? `: ${doc.description}` : ''
      lines.push(`- [${doc.title}](${doc.url})${description}`)
    }
    lines.push('')
  }

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return lines.join('\n')
})
