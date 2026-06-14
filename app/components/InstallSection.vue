<script setup lang="ts">
import { TERMINAL_SCRIPTS, LIFECYCLE_ORDER } from '~/utils/terminalScripts'

const lifecycle = [
  { index: '01', title: 'migrate init', key: 'm1' },
  { index: '02', title: 'migrate create', key: 'm2' },
  { index: '03', title: 'migrate up', key: 'm3' },
  { index: '04', title: 'migrate status', key: 'm4' },
  { index: '05', title: 'migrate down', key: 'm5' },
]
</script>

<template>
  <section id="install" class="border-b border-line scroll-mt-16" aria-labelledby="install-title">
    <div class="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 md:py-24">
      <div class="reveal max-w-2xl">
        <p class="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Installation</p>
        <h2
          id="install-title"
          class="text-[clamp(1.7rem,3.2vw,2.3rem)] font-semibold tracking-[-0.02em]"
        >
          Forge a project in five commands
        </h2>
        <p class="mt-4 text-[14.5px] leading-relaxed text-ash">
          Install once with cargo, scaffold a service, then drive the schema with
          <span class="font-mono text-[12.5px] text-bone">tork-orm</span>. Each card below plays the
          real command and its output — watch the migration lifecycle run start to finish.
        </p>
      </div>

      <!-- install + scaffold -->
      <div class="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ReplayTerminalCard
          tag="install"
          subtitle="crates.io"
          term-key="cargo"
          :steps="TERMINAL_SCRIPTS.cargo"
        />
        <ReplayTerminalCard
          tag="scaffold"
          subtitle="tork new"
          term-key="new"
          :steps="TERMINAL_SCRIPTS.new"
        />
      </div>

      <!-- migration lifecycle -->
      <div class="reveal mt-12 mb-5 flex items-center gap-4">
        <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-faint"
          >The migration lifecycle</span
        >
        <span class="h-px flex-1 bg-line" />
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <LifecycleCard
          v-for="step in lifecycle"
          :key="step.key"
          :index="step.index"
          :title="step.title"
          :term-key="step.key"
          :steps="TERMINAL_SCRIPTS[step.key]"
          :cascade-delay="LIFECYCLE_ORDER[step.key] * 620"
        />

        <!-- note card -->
        <div
          class="reveal flex h-[126px] flex-col justify-center border border-line2/60 bg-ink2/60 px-4 py-3"
        >
          <span class="font-mono text-[10px] uppercase tracking-[0.16em] text-patina"
            >› reversible by design</span
          >
          <p class="mt-2 text-[12px] leading-relaxed text-ash">
            Every migration ships an <span class="text-bone">up</span> and a
            <span class="text-bone">down</span>. State lives in
            <span class="font-mono text-[11px] text-bone">_tork_migrations</span>, so
            <span class="font-mono text-[11px] text-bone">status</span> never lies.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
