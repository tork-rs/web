<script setup lang="ts">
import { TERMINAL_SCRIPTS } from '~/utils/terminalScripts'

const status = ref<'idle' | 'busy' | 'done'>('idle')
</script>

<template>
  <section class="relative overflow-hidden border-b border-line" aria-labelledby="hero-title">
    <div class="grid-bg pointer-events-none absolute inset-0" />
    <div class="relative mx-auto max-w-[1200px] px-4 sm:px-6 pt-16 pb-14 md:pt-24 md:pb-20">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.04fr_1fr]">
        <!-- left: the thesis -->
        <div>
          <p
            class="rise mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-rust"
            style="animation-delay: 0.05s"
          >
            <span class="h-px w-6 bg-rust2" /> The Tork toolchain · v0.8.2
          </p>
          <h1
            id="hero-title"
            class="rise text-[clamp(2.4rem,6.2vw,4.1rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
            style="animation-delay: 0.1s"
          >
            Torque,<br >applied to <span class="text-rust">types</span>.
          </h1>
          <p
            class="rise mt-6 max-w-md text-[14.5px] leading-relaxed text-ash"
            style="animation-delay: 0.18s"
          >
            Tork is the async web framework for Rust — with a
            <span class="text-bone">command line</span> and ORM built right in. Routes, queries, and
            migrations are checked the moment your code compiles — never in production.
          </p>

          <div
            class="rise mt-8 flex flex-wrap items-center gap-3"
            style="animation-delay: 0.26s"
          >
            <a
              href="#install"
              class="group flex items-center gap-2 bg-rust px-4 py-2.5 font-mono text-[12px] font-semibold text-ink transition-colors hover:bg-[#f06436]"
            >
              Install tork-cli
              <span class="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#orm"
              class="border border-line2 px-4 py-2.5 font-mono text-[12px] text-ash transition-colors hover:border-rust2 hover:text-bone"
              >See the ORM</a
            >
          </div>

          <!-- trust strip -->
          <div
            class="rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-faint"
            style="animation-delay: 0.34s"
          >
            <span class="flex items-center gap-1.5"
              ><span class="h-1.5 w-1.5 rounded-full bg-patina shadow-[0_0_8px_#6FB3A3]" /> stable
              channel</span
            >
            <span>MSRV <span class="text-ash">1.75</span></span>
            <span>MIT / Apache-2.0</span>
            <span><span class="text-patina">0</span> unsafe in core</span>
          </div>
        </div>

        <!-- right: live install terminal -->
        <div class="rise" style="animation-delay: 0.3s">
          <div
            class="flex h-[273px] flex-col overflow-hidden border border-line bg-ink2 shadow-[0_30px_80px_-40px_rgba(0,0,0,.9)]"
          >
            <div
              class="flex items-center justify-between shrink-0 border-b border-line bg-ink3 px-3.5 py-2 font-mono text-[11px]"
            >
              <div class="flex items-center gap-2 text-ash">
                <span class="h-2 w-2 rounded-full bg-rust2/80" />
                <span class="h-2 w-2 rounded-full bg-line2" />
                <span class="h-2 w-2 rounded-full bg-line2" />
                <span class="ml-2">zsh — install</span>
              </div>
              <StatusDot :status="status" />
            </div>
            <TerminalPlayer
              term-key="install"
              :steps="TERMINAL_SCRIPTS.install"
              show-final-prompt
              aria-label="Terminal installing tork-cli with cargo"
              class="text-[12.5px]"
              @status="status = $event"
            />
          </div>
          <p class="mt-3 pl-1 font-mono text-[11px] text-faint">
            One binary, named <span class="text-ash">tork</span>. It scaffolds, runs, and migrates.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
