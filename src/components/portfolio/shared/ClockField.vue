<template>
    <canvas ref="canvasEl" class="clock-field" aria-hidden="true"></canvas>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

import { useTheme } from '@/composables/useTheme'
import { blendAngle, easeInOut } from './clockMath'

const { theme } = useTheme()

const props = defineProps({
    gridSpacing: { type: Number, default: 36 },
    // 'still' | 'calm' | 'lively'
    motion: { type: String, default: 'calm' },
})

const canvasEl = ref(null)

// A 2D canvas can't resolve custom properties, so the palette is read off the
// element with getComputedStyle and cached — never per frame, which would cost
// a style recalc on every tick. Keys map to --clock-face / --clock-hand /
// --clock-accent in portfolio.scss. These values are the dark theme's, and are
// only reached if the component is ever mounted outside .portfolio, where the
// tokens don't exist.
const FALLBACK = {
    // Clock outlines: the quiet texture the whole field is made of.
    face: 'rgb(139 148 158 / 0.06)',
    // Hands away from the cursor. The ones near it take the accent instead.
    hand: 'rgb(156 165 175 / 0.26)',
    accent: '#7aa2f7',
}
const palette = { ...FALLBACK }

function readPalette() {
    if (!canvasEl.value) return
    const cs = getComputedStyle(canvasEl.value)
    for (const key of Object.keys(FALLBACK)) {
        // Computed custom properties keep their leading whitespace.
        const v = cs.getPropertyValue(`--clock-${key}`).trim()
        if (v) palette[key] = v
    }
}

const mouse = { x: -9999, y: -9999 }
const view = { w: 0, h: 0, dpr: 1 }
let ctx = null
let raf = null
let startedAt = 0
let speed = 0.8
let reduceMotion = false
let motionQuery = null

const MOUSE_RADIUS = 250
const PATTERN_COUNT = 5
const PATTERN_DURATION = 11

function resize() {
    const cv = canvasEl.value
    if (!cv) return
    view.dpr = Math.min(window.devicePixelRatio || 1, 2)
    // clientWidth, not innerWidth: the page reserves a scrollbar gutter, and a
    // mismatch here stretches the grid horizontally.
    view.w = cv.clientWidth || window.innerWidth
    view.h = cv.clientHeight || window.innerHeight
    cv.width = Math.floor(view.w * view.dpr)
    cv.height = Math.floor(view.h * view.dpr)
    ctx = cv.getContext('2d')
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0)
}

// Two hand angles (radians) for a clock at (cx,cy) under choreography pattern p.
function patAngles(p, cx, cy, t) {
    const dxc = cx - view.w / 2, dyc = cy - view.h / 2
    const ang = Math.atan2(dyc, dxc)
    const r = Math.hypot(dxc, dyc)
    const sp = speed
    if (p === 0) { const ph = (cx + cy) * 0.013, base = t * sp * 0.6; return [base + ph, base * 0.72 + ph * 1.4 + Math.PI / 2] }
    if (p === 1) { const wv = Math.sin(t * sp - r * 0.028) * 0.95; return [ang + wv, ang + Math.PI + wv] }
    if (p === 2) { const s = t * sp * 0.8; return [ang + s, ang + s + Math.PI / 2] }
    if (p === 3) { const a = Math.sin(cx * 0.02 + t * sp) * Math.PI; return [a, a + Math.PI / 2] }
    const s = t * sp * 0.9
    return [s, s + Math.PI / 2]
}

function draw(time) {
    if (!ctx) return
    const spacing = Number(props.gridSpacing)
    const motion = reduceMotion ? 'still' : props.motion
    speed = motion === 'still' ? 0 : motion === 'lively' ? 1.6 : 0.8

    const rFace = spacing * 0.46
    const lenA = spacing * 0.5, lenB = spacing * 0.33
    ctx.clearRect(0, 0, view.w, view.h)
    ctx.lineCap = 'round'
    const cols = Math.ceil(view.w / spacing) + 1
    const rows = Math.ceil(view.h / spacing) + 1
    const mx = mouse.x, my = mouse.y

    // Pattern cycling: hold a pattern, then blend into the next.
    const cyc = speed === 0 ? 0 : time / PATTERN_DURATION
    const pIdx = Math.floor(cyc) % PATTERN_COUNT
    const pNext = (pIdx + 1) % PATTERN_COUNT
    const pf = cyc - Math.floor(cyc)
    const pb = easeInOut(pf > 0.82 ? (pf - 0.82) / 0.18 : 0)

    // Faces.
    ctx.strokeStyle = palette.face
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const cx = i * spacing, cy = j * spacing
            ctx.moveTo(cx + rFace, cy)
            ctx.arc(cx, cy, rFace, 0, Math.PI * 2)
        }
    }
    ctx.stroke()

    // Hands: batch the calm field in one stroke, collect highlighted clocks.
    const hi = []
    ctx.strokeStyle = palette.hand
    ctx.lineWidth = 1.4
    ctx.beginPath()
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const cx = i * spacing, cy = j * spacing
            let [A, B] = patAngles(pIdx, cx, cy, time)
            if (pb > 0) { const [nA, nB] = patAngles(pNext, cx, cy, time); A = blendAngle(A, nA, pb); B = blendAngle(B, nB, pb) }
            let highlight = false, alpha = 0
            const dist = Math.hypot(cx - mx, cy - my)
            if (dist < MOUSE_RADIUS) {
                const f = 1 - dist / MOUSE_RADIUS
                if (f > 0.02) { const p = Math.atan2(my - cy, mx - cx); A = blendAngle(A, p, f); B = blendAngle(B, p + Math.PI, f); highlight = true; alpha = 0.26 + f * 0.55 }
            }
            if (highlight) { hi.push([cx, cy, A, B, alpha]); continue }
            ctx.moveTo(cx, cy)
            ctx.lineTo(cx + Math.cos(A) * lenA, cy + Math.sin(A) * lenA)
            ctx.moveTo(cx, cy)
            ctx.lineTo(cx + Math.cos(B) * lenB, cy + Math.sin(B) * lenB)
        }
    }
    ctx.stroke()

    // Only the alpha varies per clock, so the color is set once and globalAlpha
    // carries the ramp. That also means --clock-accent can be any notation the
    // canvas parses, rather than the hex a build-the-rgba-string helper needed.
    ctx.strokeStyle = palette.accent
    ctx.lineWidth = 1.7
    for (const [cx, cy, A, B, alpha] of hi) {
        ctx.globalAlpha = Math.min(0.9, alpha)
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(A) * lenA, cy + Math.sin(A) * lenA)
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(B) * lenB, cy + Math.sin(B) * lenB)
        ctx.stroke()
    }
    // Unconditional: the next frame's face and hand batches assume 1.
    ctx.globalAlpha = 1
}

function loop(t) {
    draw((t - startedAt) / 1000)
    raf = requestAnimationFrame(loop)
}

function start() {
    if (raf !== null) return
    startedAt = performance.now()
    raf = requestAnimationFrame(loop)
}

function stop() {
    if (raf === null) return
    cancelAnimationFrame(raf)
    raf = null
}

function onMove(e) { mouse.x = e.clientX; mouse.y = e.clientY }
function onLeave() { mouse.x = -9999; mouse.y = -9999 }
function onResize() { resize() }
function onMotionChange(e) { reduceMotion = e.matches }

// Safe by construction: applyTheme sets the data-theme attribute before it
// assigns theme.value, so the new tokens are already computed by the time this
// flushes. Custom properties are not interpolated either, so the read lands on
// the final value rather than somewhere mid-cross-fade.
watch(theme, readPalette)

onMounted(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotion = motionQuery.matches
    motionQuery.addEventListener('change', onMotionChange)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('resize', onResize)
    resize()
    readPalette()
    start()
})

onUnmounted(() => {
    stop()
    motionQuery?.removeEventListener('change', onMotionChange)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseout', onLeave)
    window.removeEventListener('resize', onResize)
})
</script>

<style lang="scss" scoped>
.clock-field {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}
</style>
