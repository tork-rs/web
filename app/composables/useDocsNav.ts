// Single source for the docs navigation tree, shared by the sidebar, the
// section tabs, and the /docs redirect. Centralising the call keeps the
// useAsyncData key + options identical everywhere (no "incompatible options"
// warning) and fetches once.
export function useDocsNav() {
  return useAsyncData('docs-nav', () => queryCollectionNavigation('docs'))
}
