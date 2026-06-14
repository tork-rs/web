<script setup lang="ts">
// Shared with the sidebar so the mobile toggle controls its visibility.
const navOpen = useState<boolean>('docsNavOpen')

// Same social set as the landing header.
const social = [
  { href: 'https://github.com/tork-rs/tork', label: 'GitHub', icon: 'simple-icons:github' },
  { href: 'https://discord.gg/tork', label: 'Discord', icon: 'simple-icons:discord' },
  { href: 'https://www.linkedin.com/company/tork-rs', label: 'LinkedIn', icon: 'simple-icons:linkedin' },
]
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur supports-[backdrop-filter]:bg-ink/70"
  >
    <div class="mx-auto flex h-12 max-w-[1400px] items-center gap-6 px-4 sm:px-6">
      <NuxtLink to="/" class="group flex items-center gap-2" aria-label="Tork home">
        <img
          src="/logo.png"
          alt="Tork fox logo"
          width="26"
          height="26"
          class="h-[26px] w-[26px] shrink-0 object-contain drop-shadow-[0_0_18px_rgba(226,86,42,.35)]"
        >
        <span class="font-mono text-[14px] font-semibold tracking-tight">tork</span>
      </NuxtLink>

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

        <button
          type="button"
          class="border border-line2 p-1.5 text-ash md:hidden"
          aria-label="Toggle navigation"
          :aria-expanded="navOpen"
          @click="navOpen = !navOpen"
        >
          <Icon name="lucide:menu" size="14" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
</template>
