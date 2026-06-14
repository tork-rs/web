// Shared FAQ source — rendered visibly in FaqSection and emitted as
// FAQPage JSON-LD on the homepage. Keeping one source keeps the structured
// data and the on-page answers identical, which is what GEO / AI engines
// reward when citing the page.
export interface FaqItem {
  q: string
  a: string
}

export const FAQ: FaqItem[] = [
  {
    q: 'What is Tork?',
    a: 'Tork is an async web framework for Rust built on Tokio. It pairs a typed routing layer with a built-in CLI and ORM, so routes, queries, and database migrations are verified by the Rust compiler instead of failing at runtime.',
  },
  {
    q: 'What does the Tork CLI do?',
    a: 'A single binary named `tork` scaffolds projects, runs the dev server, and drives schema migrations. The tork-orm crate derives database tables directly from your Rust structs, so the schema and a reversible migration come from the same source of truth.',
  },
  {
    q: 'How do I install the Tork CLI?',
    a: 'Install it from crates.io with `cargo install tork-cli`. This produces one optimized binary, `tork`, in ~/.cargo/bin. The minimum supported Rust version (MSRV) is 1.75.',
  },
  {
    q: 'How does the Tork ORM define database schemas?',
    a: 'You derive `Model` on a plain Rust struct and annotate fields with attributes such as primary_key, varchar(length = N), and unique. Tork-orm forges the table, its constraints, and a reversible migration from that single source of truth.',
  },
  {
    q: 'Are Tork migrations reversible?',
    a: 'Yes. Every migration ships both an up() and a down() function. Applied state is tracked in a _tork_migrations table, so `tork-orm migrate status` always reflects the true schema version and `migrate down` rolls back cleanly.',
  },
  {
    q: 'How fast is Tork?',
    a: 'On a single 4-core instance with a JSON echo workload, Tork sustains about 142,000 requests per second at a p50 latency of 0.21 ms, idles at roughly 4.8 MB resident memory, and cold-starts in about 11 ms. The core contains zero unsafe blocks.',
  },
  {
    q: 'What license is Tork released under?',
    a: 'Tork is open source, dual-licensed under MIT and Apache-2.0, and sustained by the community and sponsors who build on it.',
  },
]
