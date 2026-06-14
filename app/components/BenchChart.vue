<script setup lang="ts">
const svg = ref<SVGSVGElement | null>(null)

function buildPaths() {
  const padL = 10, padR = 10, padT = 16, padB = 26, W = 600, H = 220
  const plotW = W - padL - padR
  const top = padT
  const bot = H - padB
  const plotH = bot - top
  const N = 64
  const pts: [number, number][] = []
  for (let i = 0; i <= N; i++) {
    const x = padL + (i / N) * plotW
    let lvl =
      i <= 3 ? (i / 3) * 0.92 : 0.9 + Math.sin(i * 0.6) * 0.02 + Math.sin(i * 0.17) * 0.015
    lvl = Math.max(0, Math.min(0.97, lvl))
    pts.push([+x.toFixed(1), +(top + (1 - lvl) * plotH).toFixed(1)])
  }
  const linePath = 'M' + pts.map((p) => p[0] + ' ' + p[1]).join(' L')
  const areaPath = `${linePath} L ${padL + plotW} ${bot} L ${padL} ${bot} Z`
  return { linePath, areaPath }
}

onMounted(() => {
  const el = svg.value
  if (!el) return
  const line = el.querySelector<SVGPathElement>('.chart-line')
  const area = el.querySelector<SVGPathElement>('.chart-area')
  const dot = el.querySelector<SVGCircleElement>('.chart-dot')
  if (!line || !area || !dot) return

  const { linePath, areaPath } = buildPaths()
  line.setAttribute('d', linePath)
  area.setAttribute('d', areaPath)

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    area.style.opacity = '1'
    return
  }

  const draw = () => {
    const len = line.getTotalLength()
    line.style.strokeDasharray = String(len)
    line.style.strokeDashoffset = String(len)
    const dur = 1900
    const t0 = performance.now()
    const frame = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3) // easeOutCubic
      line.style.strokeDashoffset = String(len * (1 - e))
      area.style.opacity = String(e)
      const pt = line.getPointAtLength(len * e)
      dot.setAttribute('cx', String(pt.x))
      dot.setAttribute('cy', String(pt.y))
      dot.style.opacity = p < 1 ? '1' : '0'
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }

  const obs = new IntersectionObserver(
    (entries) => {
      for (const ent of entries) {
        if (ent.isIntersecting) {
          obs.disconnect()
          draw()
        }
      }
    },
    { threshold: 0.4 },
  )
  obs.observe(el)
})
</script>

<template>
  <svg
    ref="svg"
    class="bench-chart w-full"
    viewBox="0 0 600 220"
    role="img"
    aria-label="Throughput holding steady near 142k requests per second over a 60 second window"
  >
    <defs>
      <linearGradient id="bgrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#E2562A" stop-opacity="0.30" />
        <stop offset="1" stop-color="#E2562A" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g stroke="#272320" stroke-width="1">
      <line x1="10" y1="16" x2="590" y2="16" />
      <line x1="10" y1="75" x2="590" y2="75" />
      <line x1="10" y1="134" x2="590" y2="134" />
      <line x1="10" y1="194" x2="590" y2="194" />
    </g>
    <g font-family="'JetBrains Mono', monospace" font-size="10" fill="#6A645B">
      <text x="12" y="13">142k</text>
      <text x="12" y="206">0</text>
      <text x="10" y="216">0s</text>
      <text x="290" y="216">30s</text>
      <text x="566" y="216">60s</text>
    </g>
    <path class="chart-area" fill="url(#bgrad)" opacity="0" />
    <path
      class="chart-line"
      fill="none"
      stroke="#E2562A"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <circle
      class="chart-dot"
      r="3.5"
      fill="#E9E4DA"
      opacity="0"
      style="filter: drop-shadow(0 0 6px #e2562a)"
    />
  </svg>
</template>
