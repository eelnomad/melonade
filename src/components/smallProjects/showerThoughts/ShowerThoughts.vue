<!-- ShowerThoughts.vue
         This is the page that shows Shower Thoughts.-->
<template>
    <div>
        <div id="shower-thoughts" class="main f-col f-center f-grow">
            <!-- Off-screen pass: rendered with correct width/font so getBoundingClientRect gives real height -->
            <a
                v-for="thought in unmeasuredThoughts"
                :key="'measure-' + thought.id"
                :ref="el => setThoughtEl(thought.id, el)"
                :style="thought.measureStyle"
                class="thought-bubble"
            >{{ thought.title }}</a>

            <!-- Visible thoughts with fade transition -->
            <TransitionGroup name="thought">
                <a
                    v-for="thought in activeThoughts"
                    :key="thought.id"
                    :href="thought.url"
                    :style="thought.style"
                    class="thought-bubble"
                    target="_blank"
                >{{ thought.title }}</a>
            </TransitionGroup>
        </div>
    </div>
</template>
<script>
const POOL_MAX = 100

export default {
    name: 'shower-thoughts',
    inject: ['$http'],
    data() {
        return {
            alignments: ['left', 'right', 'center'],
            isVisible: true,
            pool: [],        // permanent store, capped at POOL_MAX
            thoughts: {},    // working set drawn from pool
            thoughtQueue: {},
            thoughtInterval: null,
            fetchingThoughts: false,
        }
    },
    computed: {
        // Thoughts waiting for DOM measurement — rendered off-screen, invisible
        unmeasuredThoughts() {
            return Object.values(this.thoughtQueue).filter(t => !t.measured)
        },
        // Thoughts with confirmed positions — rendered visibly with TransitionGroup fade
        activeThoughts() {
            return Object.values(this.thoughtQueue).filter(t => t.active)
        },
    },
    created() {
        this.thoughtEls = {}  // non-reactive map: thought id → DOM element
        document.addEventListener("visibilitychange", this.handleVisibilityChange)
        this.thoughtInterval = setInterval(() => {
            if (this.isVisible) {
                this.queueThought()
                this.processThoughts()
            }
        }, 2000)
    },
    beforeUnmount() {
        document.removeEventListener("visibilitychange", this.handleVisibilityChange)
        clearInterval(this.thoughtInterval)
    },
    methods: {
        setThoughtEl(id, el) {
            if (el) this.thoughtEls[id] = el
            else delete this.thoughtEls[id]
        },
        handleVisibilityChange() {
            this.isVisible = !document.hidden
        },
        queueThought: function() {
            if (Math.random() < 0.3 - Object.keys(this.thoughtQueue).length * 0.05) {
                const thoughtKeys = Object.keys(this.thoughts)
                if (thoughtKeys.length < 5) {
                    if (this.pool.length < POOL_MAX && !this.fetchingThoughts) {
                        this.getThoughts()
                    } else if (this.pool.length > 0) {
                        this.refillFromPool()
                    }
                }
                if (thoughtKeys.length === 0) return

                const key = thoughtKeys[Math.random() * thoughtKeys.length << 0]
                const temp = this.thoughts[key]

                // Pick width and font size now so the off-screen element renders at the
                // right size — height will be measured from the actual DOM next tick.
                const width = Math.floor(Math.random() * 50 + 15)  // 15–65% viewport width
                const rows = Math.ceil(Math.random() + Math.random() + Math.random())
                const fontSize = Math.floor(Math.max(0.8, Math.min(3.5, width * Math.max(1.25, rows) / temp.title.length / 0.65)) * 100) / 100
                const lineHeight = Math.floor(fontSize * (Math.random() * 0.6 + 1.2) * 100) / 100

                this.thoughtQueue[key] = {
                    id: key,
                    title: temp.title,
                    url: temp.url || 'https://en.wikipedia.org',
                    active: false,
                    measured: false,
                    // Dimensions in viewport % — heightPct filled in after DOM measurement
                    widthPct: width,
                    heightPct: 0,
                    leftPct: 0,
                    topPct: 0,
                    timer: 0,
                    // Style used while measuring: off-screen but rendered so height is readable
                    measureStyle: {
                        'position': 'absolute',
                        'visibility': 'hidden',
                        'left': '-9999px',
                        'top': '0',
                        'width': width + '%',
                        'font-size': fontSize + 'vw',
                        'line-height': lineHeight + 'vw',
                    },
                    // Style used when visible — filled in by activateThought
                    style: {},
                    _fontSize: fontSize,
                    _lineHeight: lineHeight,
                }
                delete this.thoughts[key]
            }
        },
        // Try up to 100 random positions; return the first one that doesn't overlap any
        // active thought. Uses exact pixel-accurate dimensions from DOM measurement.
        findPosition: function(thought) {
            const w = thought.widthPct
            const h = thought.heightPct
            const margin = 2  // % gap from viewport edges

            for (let attempt = 0; attempt < 100; attempt++) {
                const left = margin + Math.random() * (100 - w - margin * 2)
                const top  = margin + Math.random() * (100 - h - margin * 2)

                let overlaps = false
                for (const other of Object.values(this.thoughtQueue)) {
                    if (!other.active || other.id === thought.id) continue
                    const gap = 1  // minimum % gap between thoughts
                    const clearH = left + w + gap <= other.leftPct || left >= other.leftPct + other.widthPct + gap
                    const clearV = top  + h + gap <= other.topPct  || top  >= other.topPct  + other.heightPct + gap
                    if (!clearH && !clearV) { overlaps = true; break }
                }

                if (!overlaps) return { left, top }
            }
            return null  // screen is full — retry next tick
        },
        activateThought: function(thought) {
            const position = this.findPosition(thought)
            if (!position) return  // couldn't place, will retry next tick

            const { left, top } = position
            thought.leftPct = left
            thought.topPct  = top
            thought.style = {
                'width':       thought.widthPct + '%',
                'left':        left + '%',
                'top':         top + '%',
                'font-size':   thought._fontSize + 'vw',
                'line-height': thought._lineHeight + 'vw',
                'text-align':  this.alignments[Math.floor(Math.random() * this.alignments.length)],
            }

            const wordCount = thought.title.trim().split(/\s+/).length
            thought.timer = Math.max(6, Math.min(25, Math.ceil(wordCount / 3.5))) + Math.floor(Math.random() * 4)
            thought.active = true
        },
        processThoughts: function() {
            let activated = false
            Object.values(this.thoughtQueue).forEach(thought => {
                if (thought.active) {
                    thought.timer--
                    if (thought.timer < 0) delete this.thoughtQueue[thought.id]
                } else if (!thought.measured) {
                    // Read the real rendered height from the off-screen element
                    const el = this.thoughtEls[thought.id]
                    if (el) {
                        const rect = el.getBoundingClientRect()
                        thought.heightPct = rect.height / window.innerHeight * 100
                        thought.measured = true
                    }
                } else if (!activated) {
                    // One activation per tick keeps thoughts appearing gradually
                    this.activateThought(thought)
                    if (thought.active) activated = true
                }
            })
        },
        refillFromPool: function() {
            const inQueue = new Set(Object.keys(this.thoughtQueue))
            const candidates = this.pool.filter(item => !inQueue.has(String(item.pageid)))
            const shuffled = [...candidates].sort(() => Math.random() - 0.5)
            shuffled.slice(0, 10).forEach(item => {
                this.thoughts[item.pageid] = { title: item.title, url: item.url }
            })
        },
        getThoughts: function() {
            this.fetchingThoughts = true
            this.$http.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    generator: 'random',
                    grnnamespace: 0,
                    grnlimit: 20,
                    prop: 'extracts|info',
                    exintro: true,
                    explaintext: true,
                    exsentences: 1,
                    inprop: 'url',
                    format: 'json',
                    origin: '*'
                },
                headers: { 'Api-User-Agent': 'MelonadeWebsite/1.0' }
            }).then(response => {
                Object.values(response.data.query.pages).forEach(page => {
                    if (page.extract && !page.extract.includes('may refer to') && this.pool.length < POOL_MAX) {
                        const item = { pageid: page.pageid, title: page.extract, url: page.fullurl }
                        this.pool.push(item)
                        this.thoughts[page.pageid] = { title: page.extract, url: page.fullurl }
                    }
                })
                this.fetchingThoughts = false
            }).catch(error => {
                this.fetchingThoughts = false
                console.log(error)
            })
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#shower-thoughts {
    color: white;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://lh3.googleusercontent.com/PRZt9UFlJ3EVyk1S-kC7gwbBHEkG06sjG2aVlCiabI_hNqncSI4fnHLFcaAFBoJHceoB6hZwQZYOD8kyHqxWBNf3Zkuk-qf8q6Kv6zgNwsBQouo-1xlKS5BT6uN-jBEB9K3ARzktZNTeRGqBJwzk8OikCdlk2qAm0jSbKSwXw_4zmMqGQQG-GKw1WDDmXmF7gJ4aCbjBJ4_WQqjssh66jQoZ6hga0kyAul4eF_I3oCRZFOeQDs3YtPvvKEvEmgPO374VcwBl_AIzkyTZTUVVZAB8_AHu8uJ8pYsENSRNSeBuv8Pea_d11wI3ySZtwBx7n_jh7r7B6VqfknPJhWrIynpKjtvvivaoSxnJXiCFxm99cuSe_7Wr8sNZ3qRHjCs8GPW81POCcEpRpkWT2Tf86AXaPwTfolSPAxspLtxwMg4RYM412lrUkQwafsO9M5jpewanID-wfxFwUgidEMx_oXap4rqb5RuK-bHkdgxaBDB_MLyF1TCog2BSany4Q9q2QT0DaQ307L2x_J4uc2X8H2OaU8esEOiFRhJN3rHYi6xh54PLcjipIJQXHoDnIiS9A1c8EjVBekjBqr9GsGBlfbRAUN_hMkWmEs80yBt368Lalz5W_uPHE9A3AE4v5bfLIB0HSXjewlFuUii3UEg4NwCQRYr6WgqTT8c=w1980-h1320-no?.jpg');
    font-size: 40px;
    height: 100vh;
    width: 100%;
    overflow-y: hidden;
}


.thought-bubble {
    position: absolute;
    overflow: hidden;
    margin: 0px 0px;
    cursor: pointer;
}

.thought-enter-active {
    transition: opacity 2.5s ease-in;
}
.thought-leave-active {
    transition: opacity 2s ease-out;
}
.thought-enter-from,
.thought-leave-to {
    opacity: 0;
}
</style>
