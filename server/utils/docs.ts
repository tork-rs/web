// Reads the docs markdown files straight from `content/docs/**` at build time.
//
// The sitemap, llms.txt, and llms-full.txt routes are prerendered, so this runs
// during the build when the content files are on disk. It is the single source
// of truth for those three artifacts, so they never drift from the docs.

import { promises as fs } from 'node:fs'
import { join, relative } from 'node:path'

/** The canonical site origin, used to build absolute URLs. */
export const SITE_URL = 'https://torkframework.dev'

export interface DocEntry {
  /** Absolute path to the markdown file. */
  file: string
  /** Site path, e.g. `/docs/framework/techniques/redis`. */
  path: string
  /** Absolute URL. */
  url: string
  /** Top-level section: `framework` or `orm`. */
  section: string
  /** Menu group, e.g. `techniques`. */
  group: string
  title: string
  description: string
  /** Markdown body with the frontmatter block removed. */
  body: string
}

/** Strips a leading ordering prefix (`3.techniques` -> `techniques`). */
function stripPrefix(segment: string): string {
  return segment.replace(/^\d+\./, '')
}

/** The numeric ordering prefix of a segment, or a large number when absent. */
function order(segment: string): number {
  const match = segment.match(/^(\d+)\./)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

interface Parsed {
  title: string
  description: string
  body: string
}

/** Minimal frontmatter parse for our controlled `key: value` blocks. */
function parse(raw: string): Parsed {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  const data: Record<string, string> = {}
  let body = raw
  if (match) {
    body = raw.slice(match[0].length)
    for (const line of match[1].split('\n')) {
      const colon = line.indexOf(':')
      if (colon > 0) {
        const key = line.slice(0, colon).trim()
        const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '')
        data[key] = value
      }
    }
  }
  return {
    title: data.title ?? '',
    description: data.description ?? '',
    body: body.trim(),
  }
}

async function walk(dir: string): Promise<string[]> {
  const out: string[] = []
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...(await walk(full)))
    } else if (entry.name.endsWith('.md')) {
      out.push(full)
    }
  }
  return out
}

/** Collects every doc in sidebar order. */
export async function collectDocs(): Promise<DocEntry[]> {
  const root = join(process.cwd(), 'content', 'docs')
  const files = await walk(root)

  const entries: DocEntry[] = []
  for (const file of files) {
    const rel = relative(root, file).replace(/\.md$/, '')
    const segments = rel.split('/')
    const slug = segments.map(stripPrefix)
    const path = `/docs/${slug.join('/')}`
    const raw = await fs.readFile(file, 'utf8')
    const parsed = parse(raw)
    entries.push({
      file,
      path,
      url: `${SITE_URL}${path}`,
      section: slug[0] ?? '',
      group: slug[1] ?? '',
      ...parsed,
    })
  }

  // Sort by the numeric ordering prefixes, segment by segment, so `10.x` sorts
  // after `2.x` rather than lexicographically.
  entries.sort((a, b) => {
    const av = relative(root, a.file).split('/')
    const bv = relative(root, b.file).split('/')
    for (let i = 0; i < Math.max(av.length, bv.length); i += 1) {
      const diff = order(av[i] ?? '') - order(bv[i] ?? '')
      if (diff !== 0) return diff
      const lex = (av[i] ?? '').localeCompare(bv[i] ?? '')
      if (lex !== 0) return lex
    }
    return 0
  })

  return entries
}

/** Human label for a top-level section. */
export function sectionLabel(section: string): string {
  if (section === 'framework') return 'Framework'
  if (section === 'orm') return 'ORM'
  return section.charAt(0).toUpperCase() + section.slice(1)
}
