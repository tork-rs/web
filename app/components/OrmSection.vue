<template>
  <section id="orm" class="border-b border-line scroll-mt-16" aria-labelledby="orm-title">
    <div class="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 md:py-24">
      <div class="reveal max-w-2xl">
        <p class="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">The ORM</p>
        <h2 id="orm-title" class="text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold tracking-[-0.02em]">
          Models that feel native
        </h2>
        <p class="mt-4 text-[14.5px] leading-relaxed text-ash">
          Derive <span class="font-mono text-[12.5px] text-bone">Model</span> on a plain Rust struct.
          The field attributes are the schema — <span class="text-bone">tork-orm</span> forges the
          table, the constraints, and a reversible migration from the same source of truth.
        </p>
      </div>

      <div
        class="reveal mt-9 overflow-hidden border border-line bg-ink2 shadow-[0_30px_80px_-50px_rgba(0,0,0,.9)]"
      >
        <div class="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr]">
          <!-- left: the model -->
          <div class="border-b border-line lg:border-b-0 lg:border-r">
            <div
              class="flex items-center justify-between shrink-0 border-b border-line bg-ink3 px-3.5 py-2 font-mono text-[11px] text-ash"
            >
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-rust2/80" />
                <span class="h-2 w-2 rounded-full bg-line2" />
                <span class="h-2 w-2 rounded-full bg-line2" />
                <span class="ml-2">src/models/user.rs</span>
              </div>
              <span class="font-mono text-[10px] uppercase tracking-wider text-faint">rust</span>
            </div>
            <pre
              class="thin overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.75]"
            ><code><span class="ln">1</span><span class="tok-at">#[derive(Debug, Clone, Model)]</span>
<span class="ln">2</span><span class="tok-at">#[table(</span>name <span class="tok-pn">=</span> <span class="tok-st">"users"</span><span class="tok-at">)]</span>
<span class="ln">3</span><span class="tok-kw">pub struct</span> <span class="tok-ty">User</span> <span class="tok-pn">{</span>
<span class="ln">4</span>    <span class="tok-at">#[field(</span><span class="tok-fn">primary_key</span><span class="tok-pn">,</span> <span class="tok-fn">auto</span><span class="tok-at">)]</span>
<span class="ln">5</span>    <span class="tok-kw">pub</span> id<span class="tok-pn">:</span> <span class="tok-ty">i64</span><span class="tok-pn">,</span>
<span class="ln">6</span>    <span class="tok-at">#[field(</span><span class="tok-fn">varchar</span><span class="tok-pn">(</span>length <span class="tok-pn">=</span> <span class="tok-nm">50</span><span class="tok-pn">),</span> <span class="tok-fn">unique</span><span class="tok-at">)]</span>
<span class="ln">7</span>    <span class="tok-kw">pub</span> username<span class="tok-pn">:</span> <span class="tok-ty">String</span><span class="tok-pn">,</span>
<span class="ln">8</span>    <span class="tok-at">#[field(</span><span class="tok-fn">varchar</span><span class="tok-pn">(</span>length <span class="tok-pn">=</span> <span class="tok-nm">255</span><span class="tok-pn">),</span> <span class="tok-fn">unique</span><span class="tok-at">)]</span>
<span class="ln">9</span>    <span class="tok-kw">pub</span> email<span class="tok-pn">:</span> <span class="tok-ty">String</span><span class="tok-pn">,</span>
<span class="ln">10</span>    <span class="tok-kw">pub</span> is_active<span class="tok-pn">:</span> <span class="tok-ty">bool</span><span class="tok-pn">,</span>
<span class="ln">11</span><span class="tok-pn">}</span></code></pre>
          </div>

          <!-- right: what it forges -->
          <div class="bg-ink2">
            <div
              class="flex items-center justify-between shrink-0 border-b border-line bg-ink3 px-3.5 py-2 font-mono text-[11px]"
            >
              <div class="flex items-center gap-2.5">
                <span class="grid h-3.5 w-3.5 place-items-center bg-rust"><span class="h-1 w-1 bg-ink" /></span>
                <span class="text-bone">FORGED SCHEMA</span>
              </div>
              <span class="text-faint">table · users</span>
            </div>
            <div class="font-mono text-[12px]">
              <div class="flex items-baseline justify-between gap-3 border-b border-line px-4 py-3">
                <span class="text-bone">id</span>
                <span class="text-right"
                  ><span class="text-patina">BIGSERIAL</span> <span class="text-ash">PRIMARY KEY</span></span
                >
              </div>
              <div class="flex items-baseline justify-between gap-3 border-b border-line px-4 py-3">
                <span class="text-bone">username</span>
                <span class="text-right"
                  ><span class="text-brass">VARCHAR(50)</span>
                  <span class="text-ash">UNIQUE · NOT NULL</span></span
                >
              </div>
              <div class="flex items-baseline justify-between gap-3 border-b border-line px-4 py-3">
                <span class="text-bone">email</span>
                <span class="text-right"
                  ><span class="text-brass">VARCHAR(255)</span>
                  <span class="text-ash">UNIQUE · NOT NULL</span></span
                >
              </div>
              <div class="flex items-baseline justify-between gap-3 border-b border-line px-4 py-3">
                <span class="text-bone">is_active</span>
                <span class="text-right"
                  ><span class="text-patina">BOOLEAN</span> <span class="text-ash">NOT NULL</span></span
                >
              </div>
              <div class="flex items-center gap-2 px-4 py-3 text-[11px] text-faint">
                <span class="text-patina">›</span> generated migration ·
                <span class="text-ash">0001_add_users</span> · reversible
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- query line -->
      <div class="reveal mt-5 overflow-hidden border border-line bg-ink2">
        <div
          class="flex items-center justify-between shrink-0 border-b border-line bg-ink3 px-3.5 py-2 font-mono text-[11px] text-ash"
        >
          <span>and the query is type-checked too</span>
          <span class="font-mono text-[10px] uppercase tracking-wider text-faint">rust</span>
        </div>
        <pre
          class="thin overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-[1.75]"
        ><code><span class="tok-kw">let</span> active <span class="tok-pn">=</span> <span class="tok-ty">User</span><span class="tok-pn">::</span><span class="tok-fn">query</span><span class="tok-pn">()</span>
    <span class="tok-pn">.</span><span class="tok-fn">filter</span><span class="tok-pn">(</span><span class="tok-ty">User</span><span class="tok-pn">::</span>is_active<span class="tok-pn">.</span><span class="tok-fn">eq</span><span class="tok-pn">(</span><span class="tok-kw">true</span><span class="tok-pn">))</span>
    <span class="tok-pn">.</span><span class="tok-fn">order_by</span><span class="tok-pn">(</span><span class="tok-ty">User</span><span class="tok-pn">::</span>username<span class="tok-pn">)</span>
    <span class="tok-pn">.</span><span class="tok-fn">all</span><span class="tok-pn">(&amp;</span>db<span class="tok-pn">).</span><span class="tok-kw">await</span><span class="tok-pn">?;</span>  <span class="tok-cm">// Vec&lt;User&gt; — columns checked at compile time</span></code></pre>
      </div>
    </div>
  </section>
</template>
