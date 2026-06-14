<template>
  <section id="bench" class="border-b border-line scroll-mt-16" aria-labelledby="bench-title">
    <div class="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 md:py-24">
      <div class="reveal max-w-3xl">
        <p class="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Benchmarks</p>
        <h2 id="bench-title" class="text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold tracking-[-0.02em]">
          Forged for the hot path
        </h2>
      </div>
      <p class="reveal mt-4 max-w-xl text-[14.5px] leading-relaxed text-ash">
        Measured on a single 4-core instance, release build, keep-alive connections, JSON echo
        workload. Numbers are medians over a 60-second window.
      </p>

      <!-- animated counters -->
      <div
        class="reveal mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line lg:grid-cols-4"
      >
        <div class="bg-ink2 p-5 sm:p-6">
          <div class="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Throughput</div>
          <div class="mt-3 flex items-baseline gap-0.5">
            <CountStat
              :to="142"
              class="font-mono text-[clamp(2rem,4.4vw,2.9rem)] font-medium leading-none text-bone"
            />
            <span class="font-mono text-[clamp(2rem,4.4vw,2.9rem)] font-medium leading-none text-rust"
              >k</span
            >
          </div>
          <div class="mt-2.5 font-mono text-[11px] text-ash">requests / second</div>
        </div>
        <div class="bg-ink2 p-5 sm:p-6">
          <div class="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Latency p50</div>
          <div class="mt-3 flex items-baseline gap-1">
            <CountStat
              :to="0.21"
              :dec="2"
              class="font-mono text-[clamp(2rem,4.4vw,2.9rem)] font-medium leading-none text-bone"
            />
            <span class="font-mono text-[15px] font-medium leading-none text-patina">ms</span>
          </div>
          <div class="mt-2.5 font-mono text-[11px] text-ash">per request</div>
        </div>
        <div class="bg-ink2 p-5 sm:p-6">
          <div class="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Idle memory</div>
          <div class="mt-3 flex items-baseline gap-1">
            <CountStat
              :to="4.8"
              :dec="1"
              class="font-mono text-[clamp(2rem,4.4vw,2.9rem)] font-medium leading-none text-bone"
            />
            <span class="font-mono text-[15px] font-medium leading-none text-brass">MB</span>
          </div>
          <div class="mt-2.5 font-mono text-[11px] text-ash">resident, at rest</div>
        </div>
        <div class="bg-ink2 p-5 sm:p-6">
          <div class="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Cold start</div>
          <div class="mt-3 flex items-baseline gap-1">
            <CountStat
              :to="11"
              class="font-mono text-[clamp(2rem,4.4vw,2.9rem)] font-medium leading-none text-bone"
            />
            <span class="font-mono text-[15px] font-medium leading-none text-patina">ms</span>
          </div>
          <div class="mt-2.5 font-mono text-[11px] text-ash">process to first byte</div>
        </div>
      </div>

      <!-- chart + datasheet -->
      <div class="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
        <!-- throughput chart -->
        <div class="reveal overflow-hidden border border-line bg-ink2">
          <div
            class="shrink-0 flex items-center justify-between border-b border-line bg-ink3 px-3.5 py-2 font-mono text-[11px]"
          >
            <div class="flex items-center gap-2.5">
              <span class="grid h-3.5 w-3.5 place-items-center bg-rust"><span class="h-1 w-1 bg-ink" /></span>
              <span class="text-bone">SUSTAINED LOAD</span>
              <span class="text-faint">60s window</span>
            </div>
            <span class="text-faint">req / s</span>
          </div>
          <div class="px-3 pt-3 pb-1.5">
            <BenchChart />
          </div>
        </div>

        <!-- material datasheet -->
        <div class="reveal overflow-hidden border border-line bg-ink2">
          <div
            class="shrink-0 flex items-center justify-between border-b border-line bg-ink3 px-3.5 py-2 font-mono text-[11px]"
          >
            <div class="flex items-center gap-2.5">
              <span class="grid h-3.5 w-3.5 place-items-center bg-rust"><span class="h-1 w-1 bg-ink" /></span>
              <span class="text-bone">MATERIAL DATASHEET</span>
            </div>
            <span class="text-faint">rev 0.8.2</span>
          </div>
          <div class="font-mono text-[12px]">
            <div class="flex items-center justify-between border-b border-line px-4 py-3">
              <span class="text-ash">Latency p99</span><span class="text-bone">1.9 <span class="text-patina">ms</span></span>
            </div>
            <div class="flex items-center justify-between border-b border-line px-4 py-3">
              <span class="text-ash">Release binary</span><span class="text-bone">3.1 <span class="text-brass">MB</span></span>
            </div>
            <div class="flex items-center justify-between border-b border-line px-4 py-3">
              <span class="text-ash">Runtime</span><span class="text-bone">async / tokio</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3">
              <span class="text-ash">Unsafe blocks in core</span><span class="text-patina">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
