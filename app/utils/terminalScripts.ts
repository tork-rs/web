// Terminal playback scripts for the Tork CLI demos.
// Each step is one printed line: a typed command (`cmd`), a plain output
// line (`out` + optional colour `cls`), or a rich line (`html`). `d` is the
// pause in ms after the line before the next one plays.
export interface TermStep {
  cmd?: string
  out?: string
  html?: string
  cls?: string
  d?: number
}

export const TERMINAL_SCRIPTS: Record<string, TermStep[]> = {
  install: [
    { cmd: 'cargo install tork-cli' },
    { out: '    Updating crates.io index', cls: 'c-faint', d: 260 },
    { out: '  Installing tork-cli v0.8.2', cls: 'c-ash', d: 240 },
    { out: '   Compiling tork-core v0.8.2', cls: 'c-faint', d: 200 },
    { out: '   Compiling tork-cli v0.8.2', cls: 'c-faint', d: 320 },
    { out: '    Finished `release` profile [optimized]', cls: 'c-ash', d: 240 },
    { out: '   Installed `tork` (binary) → ~/.cargo/bin', cls: 'c-patina', d: 120 },
  ],
  cargo: [
    { cmd: 'tork --version' },
    { out: 'tork 0.8.2  ·  tork-orm 0.8.2', cls: 'c-bone', d: 160 },
    { out: '✓ toolchain ready', cls: 'c-patina', d: 120 },
  ],
  new: [
    { cmd: 'tork new myproject' },
    { html: '<span class="c-patina">✓</span> <span class="c-ash">created</span> <span class="c-bone">myproject/</span>', d: 200 },
    { html: '  <span class="c-faint">├─</span> Cargo.toml', cls: 'c-ash', d: 90 },
    { html: '  <span class="c-faint">├─</span> src/main.rs', cls: 'c-ash', d: 90 },
    { html: '  <span class="c-faint">├─</span> src/models/', cls: 'c-ash', d: 90 },
    { html: '  <span class="c-faint">└─</span> migrations/', cls: 'c-ash', d: 140 },
    { html: '<span class="c-patina">✓</span> <span class="c-faint">cd myproject &amp;&amp; tork dev</span>', d: 120 },
  ],
  m1: [
    { cmd: 'tork-orm migrate init' },
    { html: '<span class="c-patina">✓</span> <span class="c-ash">initialized</span> migrations/', d: 200 },
    { html: '<span class="c-patina">✓</span> <span class="c-ash">created</span> <span class="c-bone">_tork_migrations</span>', d: 120 },
  ],
  m2: [
    { cmd: 'tork-orm migrate create add_users' },
    { html: '<span class="c-patina">✓</span> <span class="c-ash">wrote</span> <span class="c-bone">0001_add_users.rs</span>', d: 220 },
    { html: '  <span class="c-faint">up()</span> + <span class="c-faint">down()</span> stubs ready', cls: 'c-ash', d: 120 },
  ],
  m3: [
    { cmd: 'tork-orm migrate up' },
    { html: '<span class="c-brass">→</span> 0001_add_users  <span class="c-faint">applying…</span>', d: 360 },
    { html: '<span class="c-patina">✓</span> 0001_add_users  <span class="c-ash">migrated</span> <span class="c-faint">(12ms)</span>', d: 120 },
  ],
  m4: [
    { cmd: 'tork-orm migrate status' },
    { html: '<span class="c-faint">id</span>             <span class="c-faint">state</span>', d: 120 },
    { html: '0001_add_users  <span class="c-patina">● applied</span>', cls: 'c-bone', d: 120 },
  ],
  m5: [
    { cmd: 'tork-orm migrate down' },
    { html: '<span class="c-rust">←</span> 0001_add_users  <span class="c-faint">reverting…</span>', d: 360 },
    { html: '<span class="c-patina">✓</span> <span class="c-ash">rolled back to</span> <span class="c-bone">base</span>', d: 120 },
  ],
}

// Order used to cascade the migration-lifecycle cards as they scroll in.
export const LIFECYCLE_ORDER: Record<string, number> = {
  m1: 0,
  m2: 1,
  m3: 2,
  m4: 3,
  m5: 4,
}
