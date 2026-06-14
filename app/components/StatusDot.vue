<script setup lang="ts">
// A small status indicator used in terminal card headers.
// idle → dim · busy → brass glow · done → patina glow
const props = defineProps<{ status?: 'idle' | 'busy' | 'done' }>()

const style = computed(() => {
  if (props.status === 'busy')
    return { background: '#C9A24B', boxShadow: '0 0 8px #C9A24B' }
  if (props.status === 'done')
    return { background: '#6FB3A3', boxShadow: '0 0 8px #6FB3A3' }
  return {}
})
</script>

<template>
  <span
    class="h-1.5 w-1.5 rounded-full bg-line2"
    :style="style"
    aria-hidden="true"
  />
</template>
