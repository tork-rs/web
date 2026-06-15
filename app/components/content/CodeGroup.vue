<script setup lang="ts">
// MDC `::code-group` renderer: turns the nested fenced code blocks into a
// tabbed view, one tab per file. Each child code block keeps its Shiki output
// (rendered by ProsePre); we only read its `filename`/`language` for the label
// and toggle which pane is visible. All panes stay in the DOM (v-show) so the
// content remains crawlable and copyable.
import { computed, ref, useSlots, type VNode } from 'vue'

const slots = useSlots()

function flatten(nodes: VNode[]): VNode[] {
  const out: VNode[] = []
  for (const node of nodes) {
    if (!node || typeof node !== 'object') continue
    if (Array.isArray(node.children)) {
      out.push(...flatten(node.children as VNode[]))
    } else if (node.props) {
      out.push(node)
    }
  }
  return out
}

const tabs = computed(() => {
  const children = slots.default ? slots.default() : []
  return flatten(children)
    .filter((n) => n.props && (n.props.code || n.props.filename || n.props.language))
    .map((node, i) => ({
      label: (node.props?.filename as string) || (node.props?.language as string) || `Tab ${i + 1}`,
      node,
    }))
})

const active = ref(0)
</script>

<template>
  <div class="code-group">
    <div class="code-group-tabs" role="tablist">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        type="button"
        role="tab"
        :aria-selected="active === i"
        class="code-group-tab"
        :class="active === i ? 'is-active' : ''"
        @click="active = i"
      >
        {{ tab.label }}
      </button>
    </div>
    <div v-for="(tab, i) in tabs" :key="i" v-show="active === i" class="code-group-panel">
      <component :is="tab.node" />
    </div>
  </div>
</template>

<style scoped>
.code-group {
  margin: 0 0 1.25rem;
}
.code-group-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  border: 1px solid var(--color-line);
  border-bottom: 0;
  background: var(--color-ink3);
}
.code-group-tab {
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1;
  color: var(--color-ash);
  padding: 0.6rem 0.9rem;
  border-right: 1px solid var(--color-line);
  background: transparent;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}
.code-group-tab:hover {
  color: var(--color-bone);
}
.code-group-tab.is-active {
  color: var(--color-bone);
  background: var(--color-ink2);
  box-shadow: inset 0 -2px 0 var(--color-rust);
}
/* The pane's <pre> sits flush under the tab strip. */
.code-group-panel :deep(pre) {
  margin: 0;
}
.code-group-panel :deep(.code-block) {
  margin: 0;
}
</style>
