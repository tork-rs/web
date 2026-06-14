<script setup lang="ts">
import { FAQ } from '~/utils/faq'

const site = {
  url: 'https://tork.rs',
  name: 'Tork',
  title: 'Tork — The async web framework for Rust',
  description:
    'Tork is an async web framework for Rust with a built-in CLI and ORM — routes, queries, and migrations checked the moment you compile. Install with cargo install tork-cli.',
  ogImage: 'https://tork.rs/og.png',
}

// ── Classic SEO: title, description, Open Graph, Twitter, canonical ──
useSeoMeta({
  title: site.title,
  description: site.description,
  keywords:
    'Tork, Rust web framework, async Rust, Rust ORM, tork-cli, tork-orm, Rust migrations, compile-time checked queries, Tokio web framework',
  author: 'The Tork project',
  ogType: 'website',
  ogSiteName: site.name,
  ogTitle: site.title,
  ogDescription: site.description,
  ogUrl: site.url,
  ogImage: site.ogImage,
  ogImageAlt: 'Tork — Torque, applied to types.',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: site.title,
  twitterDescription: site.description,
  twitterImage: site.ogImage,
  twitterSite: '@tork_rs',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  themeColor: '#0E0C0A',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: site.url }],
})

// ── GEO / structured data: give engines clean, citable facts ──
const ldSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Tork',
  alternateName: 'tork-cli',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Web Framework, ORM, CLI',
  operatingSystem: 'Linux, macOS, Windows',
  description: site.description,
  url: site.url,
  softwareVersion: '0.8.2',
  programmingLanguage: 'Rust',
  downloadUrl: 'https://crates.io/crates/tork-cli',
  license: 'https://opensource.org/license/mit',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '128',
  },
  author: {
    '@type': 'Organization',
    name: 'The Tork project',
    url: site.url,
  },
}

const ldFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const ldBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'Install', item: `${site.url}#install` },
    { '@type': 'ListItem', position: 3, name: 'ORM', item: `${site.url}#orm` },
    { '@type': 'ListItem', position: 4, name: 'Benchmarks', item: `${site.url}#bench` },
    { '@type': 'ListItem', position: 5, name: 'FAQ', item: `${site.url}#faq` },
  ],
}

const ldWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  description: site.description,
}

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(ldSoftware) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(ldFaq) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(ldBreadcrumb) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(ldWebsite) },
  ],
})
</script>

<template>
  <main id="top" class="relative z-10">
    <HeroSection />
    <InstallSection />
    <OrmSection />
    <BenchmarksSection />
    <FaqSection />
    <SponsorsSection />
    <CtaSection />
  </main>
</template>
