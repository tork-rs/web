<script setup lang="ts">
// Reveal-on-scroll: observe every `.reveal` element once on the client.
// SSR ships them visible-by-CSS-fallback; only motion-capable clients hide
// then reveal them, so content is always present for crawlers.
onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
  if (reduced) {
    els.forEach((el) => el.classList.add('in'))
    return
  }
  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          obs.unobserve(e.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  els.forEach((el) => obs.observe(el))
})
</script>

<template>
  <div class="relative min-h-screen bg-ink text-bone font-sans text-[13px] leading-relaxed antialiased">
    <!-- ambient warm vignette -->
    <div
      class="pointer-events-none fixed inset-0 z-0"
      style="background: radial-gradient(120% 80% at 72% -12%, rgba(226, 86, 42, 0.07), transparent 55%)"
    />

    <TheHeader />

    <slot />
  </div>
</template>
