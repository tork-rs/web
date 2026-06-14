<script setup lang="ts">
// Shared open-state for the mobile sidebar drawer.
useState<boolean>('docsNavOpen', () => false)

// The sidebar and the on-this-page rail live in the LAYOUT so they persist
// across doc navigations (no remount, no scroll/open-state reset). The layout
// resolves the current page once to feed the table of contents; it refetches
// whenever the path changes.
const route = useRoute()
const { data: page } = await useAsyncData(
  'docs-layout-page',
  () => queryCollection('docs').path(route.path).first(),
  { watch: [() => route.path] },
)
const tocLinks = computed(() => page.value?.body?.toc?.links ?? [])
</script>

<template>
  <div class="relative min-h-screen bg-ink text-bone font-sans text-[13px] leading-relaxed antialiased">
    <!-- ambient warm vignette -->
    <div
      class="pointer-events-none fixed inset-0 z-0"
      style="background: radial-gradient(120% 80% at 70% -10%, rgba(226, 86, 42, 0.06), transparent 55%)"
    />

    <DocsHeader />

    <div
      class="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 px-4 sm:px-6 md:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_288px]"
    >
      <DocsSidebar />
      <slot />
      <DocsToc :links="tocLinks" />
    </div>
  </div>
</template>
