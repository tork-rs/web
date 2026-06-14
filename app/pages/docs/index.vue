<script setup lang="ts">
definePageMeta({ layout: 'docs' })

// Bare /docs → redirect to the first page in the menu order.
const { data: nav } = await useDocsNav()
const target = firstDocLeaf(nav.value) || '/docs/getting-started/introduction'
await navigateTo(target, { replace: true, redirectCode: 301 })
</script>

<template>
  <div />
</template>
