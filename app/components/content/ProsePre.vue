<script setup lang="ts">
// Custom MDC <pre> renderer: keeps the Shiki output, adds a copy button.
// `code` carries the raw source; `class` carries the Shiki theme classes.
const props = defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>()

const copied = ref(false)
async function copy() {
  if (!props.code) return
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="code-block group relative">
    <button
      type="button"
      class="absolute right-2.5 top-2.5 z-10 grid h-7 w-7 place-items-center border border-line2 bg-ink3/85 text-ash opacity-0 backdrop-blur transition-all hover:border-rust2 hover:text-bone focus-visible:opacity-100 group-hover:opacity-100"
      :class="copied ? '!opacity-100 text-patina' : ''"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      @click="copy"
    >
      <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" size="14" aria-hidden="true" />
    </button>
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>
