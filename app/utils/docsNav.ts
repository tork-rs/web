import type { ContentNavigationItem } from '@nuxt/content'

// Docs are split into top-level sections (folders directly under `docs/`):
// `framework` and `orm`. Each section contains menu groups, each group its
// pages. The sidebar tab switches the active section.

// `queryCollectionNavigation('docs')` may nest everything under a single
// `/docs` wrapper — descend it so we always work with the section list.
function topLevel(
  nav: ContentNavigationItem[] | null | undefined,
): ContentNavigationItem[] {
  const items = nav ?? []
  if (items.length === 1 && items[0]?.path === '/docs' && items[0].children) {
    return items[0].children
  }
  return items
}

// Top-level sections (framework, orm) — folders that contain groups.
export function docsSections(
  nav: ContentNavigationItem[] | null | undefined,
): ContentNavigationItem[] {
  return topLevel(nav).filter((s) => (s.children?.length ?? 0) > 0)
}

// The menu groups inside one section, e.g. sectionGroups(nav, 'framework').
export function sectionGroups(
  nav: ContentNavigationItem[] | null | undefined,
  key: string | undefined,
): ContentNavigationItem[] {
  if (!key) return []
  const section = docsSections(nav).find((s) => s.path === `/docs/${key}`)
  return section?.children ?? []
}

// First actual page (a node with no children) under a list — depth first.
function firstLeaf(items: ContentNavigationItem[] | undefined): string | undefined {
  for (const it of items ?? []) {
    if (it.children?.length) {
      const found = firstLeaf(it.children)
      if (found) return found
    } else if (it.page !== false) {
      return it.path
    }
  }
  return undefined
}

// First page in the whole docs tree — used to resolve a bare `/docs` visit.
export function firstDocLeaf(
  nav: ContentNavigationItem[] | null | undefined,
): string | undefined {
  return firstLeaf(topLevel(nav))
}

// First page of a given section — where its tab navigates to.
export function firstLeafOfSection(
  nav: ContentNavigationItem[] | null | undefined,
  key: string,
): string | undefined {
  return firstLeaf(sectionGroups(nav, key))
}

// The section a path belongs to: /docs/<section>/… → '<section>'.
export function activeSectionKey(path: string): string | undefined {
  return path.split('/').filter(Boolean)[1]
}
