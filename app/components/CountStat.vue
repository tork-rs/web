<script setup lang="ts">
const props = withDefaults(
  defineProps<{ to: number; dec?: number }>(),
  { dec: 0 },
)

const el = ref<HTMLElement | null>(null)
const display = ref((0).toFixed(props.dec)) // SSR-stable start

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    display.value = props.to.toFixed(props.dec)
    return
  }

  const run = () => {
    const dur = 1600
    const t0 = performance.now()
    const frame = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const e = p >= 1 ? 1 : 1 - Math.pow(2, -10 * p) // easeOutExpo
      display.value = (props.to * e).toFixed(props.dec)
      if (p < 1) requestAnimationFrame(frame)
      else display.value = props.to.toFixed(props.dec)
    }
    requestAnimationFrame(frame)
  }

  const obs = new IntersectionObserver(
    (entries) => {
      for (const ent of entries) {
        if (ent.isIntersecting) {
          obs.disconnect()
          run()
        }
      }
    },
    { threshold: 0.6 },
  )
  if (el.value) obs.observe(el.value)
})
</script>

<template>
  <span ref="el">{{ display }}</span>
</template>
