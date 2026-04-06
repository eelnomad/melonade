<template>
    <div id="about">
        <!-- Fixed background: stars, sky, moon -->
        <div id="animation">
            <div id="sky">
                <div v-for="(i, index) in stars" :style="i" :key="index"></div>
                <div id="star-effect"></div>
            </div>
            <div id="sky-color"></div>
            <div id="moon">
                <div id="crater"></div>
            </div>
        </div>
        <!-- City silhouette layers (fixed, scroll left continuously) -->
        <!-- FAR layer -->
        <div class="city-layer" id="city-far" :style="{ transform: parallaxFar }">
            <div class="city-track">
                <svg v-for="svgIndex in 2" :key="svgIndex" viewBox="0 0 1000 169" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
                    <g v-for="(b, bi) in buildingsFar" :key="bi">
                        <rect :x="b.x" :y="b.y" :width="b.width" :height="b.height" fill="#000C1E" />
                        <rect v-if="b.chimney" :x="b.chimney.x" :y="b.chimney.y" :width="b.chimney.width" :height="b.chimney.height" fill="#000C1E" />
                        <g class="windows-group">
                            <rect v-for="(win, wi) in b.windows" :key="wi" :x="win.x" :y="win.y" :width="farConfig.winW" :height="farConfig.winH" fill="#FFEB85" class="window" :style="{ opacity: win.on ? 1 : 0 }" />
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <!-- MID layer -->
        <div class="city-layer" id="city-landmarks" :style="{ transform: parallaxMid }">
            <div class="city-track">
                <svg v-for="svgIndex in 2" :key="svgIndex" viewBox="0 0 1000 281" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
                    <g v-for="(b, bi) in buildingsMid" :key="bi">
                        <rect :x="b.x" :y="b.y" :width="b.width" :height="b.height" fill="#000510" />
                        <rect v-if="b.chimney" :x="b.chimney.x" :y="b.chimney.y" :width="b.chimney.width" :height="b.chimney.height" fill="#000510" />
                        <g class="windows-group">
                            <rect v-for="(win, wi) in b.windows" :key="wi" :x="win.x" :y="win.y" :width="midConfig.winW" :height="midConfig.winH" fill="#FFEB85" class="window" :style="{ opacity: win.on ? 1 : 0 }" />
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <!-- NEAR layer: chunky foreground buildings -->
        <div class="city-layer" id="city-near" :style="{ transform: parallaxNear }">
            <div class="city-track">
                <svg v-for="svgIndex in 2" :key="svgIndex" viewBox="0 0 1000 338" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
                    <g v-for="(b, bi) in buildingsNear" :key="bi">
                        <rect :x="b.x" :y="b.y" :width="b.width" :height="b.height" fill="#000000" />
                        <rect v-if="b.chimney" :x="b.chimney.x" :y="b.chimney.y" :width="b.chimney.width" :height="b.chimney.height" fill="#000000" />
                        <g class="windows-group">
                            <rect v-for="(win, wi) in b.windows" :key="wi" :x="win.x" :y="win.y" :width="nearConfig.winW" :height="nearConfig.winH" fill="#FFEB85" class="window" :style="{ opacity: win.on ? 1 : 0 }" />
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <!-- Ground layer: lightposts -->
        <div class="city-layer" id="city-ground" :style="{ transform: parallaxGround }">
            <div class="city-track">
                <svg v-for="svgIndex in 2" :key="svgIndex" viewBox="0 0 1000 113" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" overflow="visible">
                    <!-- Ground strip -->
                    <rect x="0" y="60" width="1000" height="100" fill="#0a0a0a" />
                    <!-- Lightposts -->
                    <g v-for="(lamp, i) in lampsGround" :key="i">
                        <rect :x="lamp.x" y="2" width="4" height="59" fill="#1a1a1a" />
                        <rect :x="lamp.x - 14" y="6" width="16" height="3" fill="#1a1a1a" />
                        <ellipse :cx="lamp.x - 14" cy="6" rx="9" ry="5" :fill="lamp.on ? '#FFF5AA' : '#2a2a2a'" :style="lamp.on ? 'filter: drop-shadow(0 0px 8px #FFE066)' : ''" />
                        <polygon v-if="lamp.on" :points="`${lamp.x-23},11 ${lamp.x-5},11 ${lamp.x+2},60 ${lamp.x-30},60`" fill="rgba(255,240,150,0.04)" />
                    </g>
                </svg>
            </div>
            <div id="city-body"></div>
        </div>
        <!-- Car layer: drifts right slightly faster than city scrolls left -->
        <div id="city-car" :style="{ transform: parallaxGround }">
            <div id="car">
                <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" height="100%" width="auto">
                    <!-- Body -->
                    <rect x="8" y="18" width="76" height="14" rx="3" fill="#0d1420" />
                    <!-- Cabin -->
                    <path d="M24,18 L30,7 L66,7 L73,18 Z" fill="#080e1a" />
                    <!-- Rear window -->
                    <path d="M31,9 L44,9 L44,18 L26,18 Z" fill="#1a3a6e" opacity="0.8" />
                    <!-- Front window -->
                    <path d="M48,9 L63,18 L48,18 Z" fill="#1a3a6e" opacity="0.8" />
                    <!-- Wheels -->
                    <circle cx="24" cy="33" r="7" fill="#0a0a0a" />
                    <circle cx="24" cy="33" r="3.5" fill="#171717" />
                    <circle cx="24" cy="33" r="1.5" fill="#2a2a2a" />
                    <circle cx="72" cy="33" r="7" fill="#0a0a0a" />
                    <circle cx="72" cy="33" r="3.5" fill="#171717" />
                    <circle cx="72" cy="33" r="1.5" fill="#2a2a2a" />
                    <!-- Headlights (front = right, driving right) -->
                    <rect x="81" y="21" width="9" height="5" rx="1" fill="#FFF5AA" style="filter: drop-shadow(0 0 5px #FFE066);" />
                    <!-- Headlight beam -->
                    <polygon points="90,21 112,15 112,32 90,26" fill="rgba(255,245,170,0.07)" />
                    <!-- Tail lights (back = left) -->
                    <rect x="7" y="22" width="5" height="5" rx="1" fill="#cc1111" style="filter: drop-shadow(0 0 3px #ff2222);" />
                </svg>
            </div>
        </div>
        <!-- Water layer: rises on scroll -->
        <div id="water" :style="{ transform: waterTranslateY }">
            <div id="water-wave-wrap">
                <svg id="water-wave" viewBox="0 0 1440 80" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <path fill="rgb(5,13,33, .6)" d="M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40 L1440,80 L0,80 Z" />
                    <path fill="rgba(5,20,45,0.6)" d="M0,50 C240,30 480,70 720,50 C960,30 1200,70 1440,50 L1440,80 L0,80 Z" />
                </svg>
            </div>
            <div id="water-body"></div>
        </div>
        <!-- Hero section: full viewport with bio text -->
        <section id="hero">
            <div class="hero-content t-center">
                <h1>About Me</h1>
                <p class="hero-bio">I'm a data engineer and technologist now building data infrastructure at scale. Whether it's designing pipelines, wrangling APIs, or making sense of complex datasets, I'm energized by work that has real impact.</p>
                <div class="scroll-hint">
                    <v-icon name="fa-chevron-down" class="chevron-bounce" />
                </div>
            </div>
        </section>
        <!-- Bio section: revealed on scroll, covers city layers -->
        <section id="bio">
            <div class="bio-content">
                <div class="bio-block">
                    <h2>The Story</h2>
                    <p>I believe that software, at its best, doesn't just solve problems — it creates moments of delight. Whether it's a smooth animation, a clever interaction, or a tool that genuinely makes someone's day easier, that's the kind of work I'm drawn to.</p>
                </div>
                <div class="bio-block">
                    <h2>What I Do</h2>
                    <p>I design and build products and infrastructure that power business decisions at scale. My core stack is Python and SQL, with a lot of time spent on RESTful APIs, data modeling, and systems that need to be both reliable and fast. I've carried a consulting mindset into my engineering work — caring as much about whether a system actually gets used as whether it's technically elegant.</p>
                </div>
                <div class="bio-block">
                    <h2>Outside the Code</h2>
                    <p>When I'm not at a keyboard, I'm probably thinking about things I'd like to build at a keyboard. This site is a living sketchbook — some pages are polished, some are experiments, all are a work in progress.</p>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ─── Stars ───
const stars = ref([])

function setStars() {
    const total = Math.random() * 300 + 200
    for (let i = 0; i < total; i++) {
        const size = Math.max(Math.floor((Math.random() + Math.random()) * 2), 1)
        stars.value.push({
            'position': 'absolute',
            'width': size + 'px',
            'height': size + 'px',
            'left': (Math.random() * 100) + '%',
            'top': (Math.random() * 100) + '%',
            'background': 'white',
            'z-index': '2',
            'border-radius': '50%'
        })
    }
}

setStars()

// ─── Building generator ───
function generateBuildingsLayer(config) {
    const buildings = []
    const allWindows = []
    let x = 0
    while (x < config.svgWidth) {
        const w = config.minW + Math.floor(Math.random() * (config.maxW - config.minW))
        const h = config.minH + Math.floor(Math.random() * (config.maxH - config.minH))
        const top = config.baseline - h
        const windows = []
        for (let wy = top + config.winPadY; wy + config.winH <= config.baseline - config.winPadY; wy += config.winStepY) {
            for (let wx = x + config.winPadX; wx + config.winW <= x + w - config.winPadX; wx += config.winStepX) {
                const win = { x: wx, y: wy, on: Math.random() < config.winOnChance }
                windows.push(win)
                allWindows.push(win)
            }
        }
        let chimney = null
        const chimneyRoom = w - 2 * config.winPadX
        if (Math.random() < config.chimneyChance && chimneyRoom > 6) {
            const cw = 4 + Math.floor(Math.random() * 5)
            const ch = 12 + Math.floor(Math.random() * 20)
            const cx = x + config.winPadX + Math.floor(Math.random() * Math.max(1, chimneyRoom - cw))
            chimney = { x: cx, y: top - ch, width: cw, height: ch }
        }
        buildings.push({ x, y: top, width: w, height: config.svgHeight - top, windows, chimney })
        x += w + (config.gap ?? 0)
    }
    // Extend the last building to reach exactly svgWidth so the tiled loop has no gap
    if (buildings.length > 0) {
        const last = buildings[buildings.length - 1]
        last.width = config.svgWidth - last.x
    }
    return { buildings, allWindows }
}

// ─── Layer configs ───
// ViewBox heights match each div's proportion at 16:9 so buildings fill the full layer with no clipping.
// far=169 (30vh), mid=281 (50vh), near=338 (60vh), ground=113 (20vh) — all at 1000 wide.
const farConfig = { svgWidth: 1000, svgHeight: 169, baseline: 140, minW: 20, maxW: 38, minH: 40, maxH: 95, gap: 2, winW: 4, winH: 3, winPadX: 5, winPadY: 8, winStepX: 10, winStepY: 9, winOnChance: 0.55, chimneyChance: 0.12 }
const midConfig = { svgWidth: 1000, svgHeight: 281, baseline: 230, minW: 45, maxW: 95, minH: 70, maxH: 170, gap: 6, winW: 6, winH: 5, winPadX: 7, winPadY: 10, winStepX: 14, winStepY: 12, winOnChance: 0.50, chimneyChance: 0.22 }
const nearConfig = { svgWidth: 1000, svgHeight: 338, baseline: 290, minW: 55, maxW: 110, minH: 100, maxH: 220, gap: 12, winW: 8, winH: 6, winPadX: 9, winPadY: 12, winStepX: 18, winStepY: 15, winOnChance: 0.60, chimneyChance: 0.28 }

// ─── Buildings ───
const buildingsFar = ref([])
const buildingsMid = ref([])
const buildingsNear = ref([])
const windowsFarFlat = ref([])
const windowsMidFlat = ref([])
const windowsNearFlat = ref([])

const { buildings: _bF, allWindows: _wF } = generateBuildingsLayer(farConfig)
buildingsFar.value = _bF;
windowsFarFlat.value = _wF

const { buildings: _bM, allWindows: _wM } = generateBuildingsLayer(midConfig)
buildingsMid.value = _bM;
windowsMidFlat.value = _wM

const { buildings: _bN, allWindows: _wN } = generateBuildingsLayer(nearConfig)
buildingsNear.value = _bN;
windowsNearFlat.value = _wN

// ─── Ground lamps ───
const lampsGround = ref([])

function generateLampsGround() {
    const lamps = []
    let x = 40
    while (x < 970) {
        lamps.push({ x, on: Math.random() > 0.2 })
        x += 80 + Math.floor(Math.random() * 40)
    }
    return lamps
}

lampsGround.value = generateLampsGround()

// ─── Parallax ───
const parallaxFar = ref('translateY(0vh)')
const parallaxMid = ref('translateY(0vh)')
const parallaxNear = ref('translateY(0vh)')
const parallaxGround = ref('translateY(0vh)')

// ─── Water ───
// Derive the initial water level from the ground layer's geometry so it
// always aligns with the ground strip regardless of future tweaks.
// GROUND_LAYER_VH must match #city-ground { height: 20vh } in the CSS below.
const GROUND_LAYER_VH = 20 // mirrors #city-ground height
const GROUND_SVG_H = 113 // ground SVG viewBox height
const GROUND_STRIP_Y = 60 // y where the ground rect starts in the SVG
// Viewport % at which the ground strip's top edge sits (where wave should rest)
const WATER_LEVEL_VH = parseFloat((100 - GROUND_LAYER_VH + (GROUND_STRIP_Y / GROUND_SVG_H) * GROUND_LAYER_VH).toFixed(2))

const waterTranslateY = ref(`translateY(${WATER_LEVEL_VH}vh)`)

// ─── Interval / handler handles ───
let farWindowInterval = null
let midWindowInterval = null
let nearWindowInterval = null
let groundLampInterval = null
let scrollHandler = null
let rafPending = false

// ─── Lifecycle ───
onMounted(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reducedMotion) {
        farWindowInterval = setInterval(() => {
            const count = 2 + Math.floor(Math.random() * 3)
            for (let i = 0; i < count; i++) {
                const idx = Math.floor(Math.random() * windowsFarFlat.value.length)
                windowsFarFlat.value[idx].on = !windowsFarFlat.value[idx].on
            }
        }, 3000 + Math.random() * 3000)

        midWindowInterval = setInterval(() => {
            const count = 2 + Math.floor(Math.random() * 3)
            for (let i = 0; i < count; i++) {
                const idx = Math.floor(Math.random() * windowsMidFlat.value.length)
                windowsMidFlat.value[idx].on = !windowsMidFlat.value[idx].on
            }
        }, 2000 + Math.random() * 3000)

        nearWindowInterval = setInterval(() => {
            const count = 3 + Math.floor(Math.random() * 3)
            for (let i = 0; i < count; i++) {
                const idx = Math.floor(Math.random() * windowsNearFlat.value.length)
                windowsNearFlat.value[idx].on = !windowsNearFlat.value[idx].on
            }
        }, 1000 + Math.random() * 2000)

        groundLampInterval = setInterval(() => {
            const idx = Math.floor(Math.random() * lampsGround.value.length)
            lampsGround.value[idx].on = Math.random() > 0.1
        }, 2000 + Math.random() * 2000)
    }

    scrollHandler = () => {
        if (!rafPending) {
            rafPending = true
            requestAnimationFrame(() => {
                const progress = Math.min(Math.max(window.scrollY, 0) / window.innerHeight, 1)
                waterTranslateY.value = `translateY(${(1 - progress) * WATER_LEVEL_VH}vh)`
                parallaxFar.value = `translateY(${(-progress * 30).toFixed(2)}vh)`
                parallaxMid.value = `translateY(${(-progress * 40).toFixed(2)}vh)`
                parallaxNear.value = `translateY(${(-progress * 50).toFixed(2)}vh)`
                parallaxGround.value = `translateY(${(-progress * 70).toFixed(2)}vh)`
                rafPending = false
            })
        }
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
    clearInterval(farWindowInterval)
    clearInterval(midWindowInterval)
    clearInterval(nearWindowInterval)
    clearInterval(groundLampInterval)
    if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler)
    }
})
</script>
<style scoped>
#about {
    position: relative;
    min-height: 200vh;
}

/* ─── Fixed background ─── */
#animation {
    position: fixed;
    background: black;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
}

#sky {
    position: absolute;
    height: 100%;
    width: 100%;
    mask-image: url("@/assets/images/star_effect.png");
    -webkit-mask-image: url("@/assets/images/star_effect.png");
    animation: star-effect 500s linear infinite;
}

#moon {
    position: absolute;
    left: 75%;
    top: 10%;
    width: 15vw;
    height: 15vw;
    border-radius: 50%;
    background: #EEE;
    box-shadow: 0 0 120px 40px rgb(255, 255, 255, 0.25);
    z-index: 6;
}

#crater {
    left: 85vw;
    top: 10vw;
    width: 1vw;
    height: 1vw;
    background: none;
    border-radius: 50%;
    box-shadow:
        4vw 3vw 0 0.2vw rgba(0, 0, 0, .1),
        8vw 7vw 0 -0.1vw rgba(0, 0, 0, .1),
        5vw 7vw 0 0.5vw rgba(0, 0, 0, .1),
        12vw 6vw 0 0.05vw rgba(0, 0, 0, .1),
        9vw 9vw 0 0.7vw rgba(0, 0, 0, .1),
        4vw 11vw 0 0.1vw rgba(0, 0, 0, .1);
    z-index: 6;
}

#sky-color {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: .5;
    background: #0F002E;
    background: linear-gradient(to bottom right, black, #0F001C, #1F084C);
    z-index: 1;
}

@keyframes star-effect {
    from {
        mask-position: 0 0;
        -webkit-mask-position: 0 0;
    }

    to {
        mask-position: -10000px 5000px;
        -webkit-mask-position: -10000px 5000px;
    }
}

/* ─── City layers ─── */
.city-layer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    overflow: hidden;
    pointer-events: none;
}

.city-track {
    display: flex;
    flex-direction: row;
    width: 200vw;
    will-change: transform;
}

.city-track svg {
    width: 100vw;
    flex-shrink: 0;
}

#city-far {
    height: 30vh;
    z-index: 7;
}

#city-far .city-track {
    animation: city-scroll 200s linear infinite;
    opacity: 0.35;
}

#city-landmarks {
    height: 50vh;
    z-index: 8;
}

#city-landmarks .city-track {
    animation: city-scroll 130s linear infinite;
    opacity: 0.85;
}

#city-near {
    height: 60vh;
    z-index: 9;
}

#city-near .city-track {
    animation: city-scroll 60s linear infinite;
    opacity: 1;
}

#city-ground {
    height: 20vh;
    z-index: 10;
    overflow: visible;
}

#city-body {
    top: 79px;
    left: 0;
    width: 100%;
    bottom: 0;
    height: 10000%;
    background: linear-gradient(#0a0a0a 25%, rgba(5, 20, 45));
    overflow: hidden;
}

#city-ground .city-track {
    animation: city-scroll 25s linear infinite;
    opacity: 1;
}

@keyframes city-scroll {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

/* ─── Car ─── */
/* Ground strip sits at (53/113)*20vh ≈ 9.38vh from the viewport bottom */
#city-car {
    position: fixed;
    bottom: calc(20vh * 45 / 113);
    left: 0;
    width: 100vw;
    height: 0;
    z-index: 9;
    pointer-events: none;
    overflow: visible;
    will-change: transform;
}

#car {
    position: absolute;
    bottom: 0;
    height: 3.2vh;
    width: auto;
    animation: car-drive 44s linear infinite;
    will-change: transform;
}

@keyframes car-drive {
    from {
        transform: translateX(-15vw);
    }

    to {
        transform: translateX(115vw);
    }
}

/* ─── Windows ─── */
.windows-group {
    filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.55));
}

.window {
    transition: opacity 0.9s ease;
}

/* ─── Water layer ─── */
#water {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 11;
    pointer-events: none;
    will-change: transform;
    transition: transform 0.08s linear;
}

#water-wave-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    overflow: hidden;
}

#water-wave {
    width: 200%;
    height: 100%;
    animation: wave-shift 8s linear infinite;
}

@keyframes wave-shift {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

#water-body {
    position: absolute;
    top: 79px;
    left: 0;
    width: 100%;
    bottom: 0;
    background: rgba(5, 20, 45, 0.9);
    overflow: hidden;
}

@keyframes shimmer-drift {
    from {
        background-position: 0 0;
    }

    to {
        background-position: 200px 0;
    }
}

/* ─── Hero section ─── */
#hero {
    position: relative;
    height: 100vh;
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-content {
    color: white;
    max-width: 700px;
    padding: 0 2rem;
}

.hero-content h1 {
    font-size: 3em;
    margin-bottom: 1rem;
}

.hero-bio {
    font-size: 1.3em;
    line-height: 2em;
    opacity: 0.9;
}

.scroll-hint {
    margin-top: 3rem;
    opacity: 0.6;
    font-size: 1.5rem;
}

.chevron-bounce {
    animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(8px);
    }
}

/* ─── Bio section ─── */
#bio {
    position: relative;
    z-index: 20;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
}

.bio-content {
    max-width: 700px;
    width: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 4rem;
}

.bio-block h2 {
    font-size: 1.8em;
    margin-bottom: 1rem;
    opacity: 0.7;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.bio-block p {
    font-size: 1.2em;
    line-height: 2em;
    opacity: 0.85;
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
    .window {
        transition: none;
    }

    #water-wave {
        animation: none;
    }

    #water-body::after {
        animation: none;
    }

    #city-far .city-track,
    #city-landmarks .city-track,
    #city-near .city-track,
    #city-ground .city-track,
    #car {
        animation-play-state: paused;
    }
}
</style>