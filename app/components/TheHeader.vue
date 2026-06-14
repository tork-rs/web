<script setup lang="ts">
const navbar = ref<HTMLElement | null>(null)

const nav = [
  { href: '#install', label: 'install' },
  { href: '#orm', label: 'orm' },
  { href: '#bench', label: 'benchmarks' },
  { href: '#sponsors', label: 'sponsors' },
  { href: '#faq', label: 'faq' },
]

const social = [
  { href: 'https://github.com/tork-rs/tork', label: 'GitHub', icon: 'simple-icons:github' },
  { href: 'https://discord.gg/tork', label: 'Discord', icon: 'simple-icons:discord' },
  { href: 'https://www.linkedin.com/company/tork-rs', label: 'LinkedIn', icon: 'simple-icons:linkedin' },
]

onMounted(() => {
  let ticking = false
  const sync = () => {
    navbar.value?.classList.toggle('nav-shrunk', window.scrollY > 20)
    ticking = false
  }
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(sync)
      ticking = true
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  sync()
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <header class="sticky top-2 z-40 mt-2 px-3 sm:px-4">
    <div
      id="navbar"
      ref="navbar"
      class="mx-auto flex items-center gap-6 px-6"
    >
      <nuxt-link to="/" class="group flex items-center gap-2" aria-label="Tork home">
        <img
          src="/logo.png"
          alt="Tork fox logo"
          width="26"
          height="26"
          class="h-[26px] w-[26px] shrink-0 object-contain drop-shadow-[0_0_18px_rgba(226,86,42,.35)]"
        >
        <span class="font-mono text-[14px] font-semibold tracking-tight">tork</span>
      </nuxt-link>

      <nav
        class="ml-2 hidden items-center gap-1 font-mono text-[12px] text-ash md:flex"
        aria-label="Primary"
      >
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="px-2.5 py-1 transition-colors hover:text-bone"
          >{{ item.label }}</a
        >
        <nuxt-link to="/docs" class="px-2.5 py-1 transition-colors hover:text-bone">docs</nuxt-link>
      </nav>

      <div class="ml-auto flex items-center gap-3 font-mono text-[11px]">
        <span class="hidden items-center gap-1.5 text-ash sm:flex">
          <span class="h-1.5 w-1.5 rounded-full bg-patina shadow-[0_0_8px_#6FB3A3]" /> stable
        </span>
        <span class="border border-line2 px-2 py-0.5 text-ash">v0.8.2</span>

        <div class="flex items-center gap-0.5">
          <a
            v-for="s in social"
            :key="s.label"
            :href="s.href"
            :aria-label="s.label"
            rel="noopener"
            class="grid h-7 w-7 place-items-center text-ash transition-colors hover:text-bone"
          >
            <Icon :name="s.icon" size="15" aria-hidden="true" />
          </a>
        </div>

        <nuxt-link
          to="/docs"
          class="bg-rust px-3 py-1.5 font-mono text-[11px] font-semibold text-ink transition-colors hover:bg-[#f06436]"
          >get started</nuxt-link
        >
      </div>
    </div>
  </header>
</template>
