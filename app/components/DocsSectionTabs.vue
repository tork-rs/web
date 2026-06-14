<script setup lang="ts">
// Borderless segmented switch at the top of the docs sidebar. A single rust
// pill slides horizontally toward the active section.
const route = useRoute()

const { data: nav } = await useDocsNav()

const sections = [
  { key: 'framework', label: 'Framework' },
  { key: 'orm', label: 'ORM' },
]

const active = computed(() => activeSectionKey(route.path) ?? 'framework')

async function go(key: string) {
  if (key === active.value) return
  const target = firstLeafOfSection(nav.value, key)
  if (target) await navigateTo(target)
}
</script>

<template>
  <div class="mb-2 flex gap-1 bg-ink2 p-1 font-mono text-[0.625rem]">
    <button
      v-for="s in sections"
      :key="s.key"
      type="button"
      class="flex-1 py-1.5 font-semibold uppercase tracking-[0.14em] transition-colors duration-200 cursor-pointer select-none"
      :class="active === s.key ? 'bg-white/5 text-rust' : 'text-ash hover:text-bone'"
      :aria-current="active === s.key ? 'true' : undefined"
      @click="go(s.key)"
    >
      {{ s.label }}
    </button>
  </div>
</template>
