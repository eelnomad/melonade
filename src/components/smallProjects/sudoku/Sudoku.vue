<template>
    <div id="sudoku">
        <div class="page-layout">
            <!-- Left: Board -->
            <div class="board-area">
                <div class="grid">
                    <div v-for="(cell, index) in grid" :key="index" class="grid-block" :class="boxBorderClass(index)">
                        <input :class="{
                                locked: cell.locked,
                                error: cell.conflicts.length > 0 && !cell.locked,
                                active: index === activeCell,
                                'swap-flash': swapCells.includes(index) && !cell.locked
                            }" :value="cell.value" @keyup.delete="userInput(index, $event)" @keypress.prevent="userInput(index, $event)" />
                    </div>
                </div>
            </div>
            <!-- Right: Controls + Stats -->
            <div class="right-panel">
                <!-- Algorithm -->
                <div class="panel-section">
                    <div class="section-label">Algorithm</div>
                    <div class="algo-slider" :class="{ 'algo-slider--disabled': isRunning }" :data-algo="selectedAlgo">
                        <div class="algo-slider-thumb" :style="{ transform: `translateY(${algoIndex * 100}%)` }"></div>
                        <button v-for="algo in algoOptions" :key="algo.value" class="algo-slider-item" :class="'algo-slider-item--' + algo.value.toLowerCase()" :disabled="isRunning" @click="selectedAlgo = algo.value">{{ algo.label }}</button>
                    </div>
                </div>
                <!-- Controls -->
                <div class="controls-row">
                    <button @click="isRunning ? handlePause() : handleStart()" class="btn-ctrl" :class="isRunning && !paused ? 'btn-pause' : 'btn-start'">
                        {{ isRunning ? (paused ? 'Resume' : 'Pause') : 'Start' }}
                    </button>
                    <button @click="stop" :disabled="!isRunning" class="btn-ctrl btn-stop">Stop</button>
                </div>
                <!-- Board string -->
                <div class="panel-section">
                    <div class="section-label">Board String</div>
                    <input type="text" v-model="customPuzzle" class="puzzle-string" spellcheck="false" />
                    <div class="io-row">
                        <button @click="get" class="btn-card">Get State</button>
                        <button @click="load" class="btn-card btn-card--primary">Load</button>
                    </div>
                </div>
                <hr class="section-divider" />
                <!-- Stats -->
                <div class="panel-section stats-section">
                    <div class="section-label">Statistics</div>
                    <template v-if="statsVisible && lastAlgo === 'Recursion'">
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-label">Stack Depth</div>
                                <div class="stat-value">{{ recursiveStackDepth }}</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Backtracks</div>
                                <div class="stat-value">{{ recursiveBacktracks }}</div>
                            </div>
                            <div class="stat-card stat-card--wide">
                                <div class="stat-label">Active Cell</div>
                                <div class="stat-value">{{ activeCellLabel }}</div>
                            </div>
                            <div class="stat-card stat-card--wide">
                                <svg class="fitness-chart" viewBox="0 0 360 125">
                                    <defs>
                                        <linearGradient id="depthGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stop-color="#10b981" stop-opacity="0.25" />
                                            <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <line x1="40" y1="5" x2="40" y2="105" class="chart-axis" />
                                    <line x1="40" y1="105" x2="340" y2="105" class="chart-axis" />
                                    <text x="35" y="9" class="axis-label" text-anchor="end">{{ chartMaxDepth }}</text>
                                    <text x="35" y="109" class="axis-label" text-anchor="end">0</text>
                                    <text x="40" y="122" class="axis-label" text-anchor="middle">0</text>
                                    <text x="340" y="122" class="axis-label" text-anchor="end">{{ chartMaxRecSteps != null ? chartMaxRecSteps.toLocaleString() : '' }}</text>
                                    <g transform="translate(40, 5)">
                                        <line x1="0" y1="25" x2="300" y2="25" class="chart-grid" />
                                        <line x1="0" y1="50" x2="300" y2="50" class="chart-grid" />
                                        <line x1="0" y1="75" x2="300" y2="75" class="chart-grid" />
                                        <polygon :points="depthAreaPoints" fill="url(#depthGrad)" />
                                        <polyline :points="depthChartPoints" class="depth-line" />
                                    </g>
                                </svg>
                                <div class="chart-legend">
                                    <span class="legend-depth">Stack Depth</span>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="statsVisible && lastAlgo === 'Monte'">
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-label">Fitness</div>
                                <div class="stat-value">{{ mcFitness }}</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Temperature</div>
                                <div class="stat-value">{{ mcTemp != null ? mcTemp.toFixed(3) : '—' }}</div>
                            </div>
                            <div class="stat-card stat-card--wide">
                                <div class="stat-label">Steps</div>
                                <div class="stat-value">{{ mcTotalSteps != null ? mcTotalSteps.toLocaleString() : '—' }}</div>
                            </div>
                            <div class="stat-card stat-card--wide">
                                <svg class="fitness-chart" viewBox="0 0 360 125">
                                    <defs>
                                        <linearGradient id="fitGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25" />
                                            <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
                                        </linearGradient>
                                        <linearGradient id="tmpGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.18" />
                                            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <!-- Axes -->
                                    <line x1="40" y1="5" x2="40" y2="105" class="chart-axis" />
                                    <line x1="40" y1="105" x2="340" y2="105" class="chart-axis" />
                                    <!-- Y-axis labels -->
                                    <text x="35" y="9" class="axis-label" text-anchor="end">{{ chartMaxFit }}</text>
                                    <text x="35" y="109" class="axis-label" text-anchor="end">0</text>
                                    <!-- X-axis labels -->
                                    <text x="40" y="122" class="axis-label" text-anchor="middle">0</text>
                                    <text x="340" y="122" class="axis-label" text-anchor="end">{{ chartMaxSteps != null ? chartMaxSteps.toLocaleString() : '' }}</text>
                                    <!-- Chart plot area -->
                                    <g transform="translate(40, 5)">
                                        <line x1="0" y1="25" x2="300" y2="25" class="chart-grid" />
                                        <line x1="0" y1="50" x2="300" y2="50" class="chart-grid" />
                                        <line x1="0" y1="75" x2="300" y2="75" class="chart-grid" />
                                        <polygon :points="fitnessAreaPoints" fill="url(#fitGrad)" />
                                        <polygon :points="tempAreaPoints" fill="url(#tmpGrad)" />
                                        <polyline :points="fitnessChartPoints" class="fitness-line" />
                                        <polyline :points="tempChartPoints" class="temp-line" />
                                    </g>
                                </svg>
                                <div class="chart-legend">
                                    <span class="legend-fitness">Fitness</span>
                                    <span class="legend-temp">Temperature</span>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="statsVisible && lastAlgo === 'Genetic'">
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-label">Generation</div>
                                <div class="stat-value">{{ gaGeneration != null ? gaGeneration.toLocaleString() : '—' }}</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Best Fitness</div>
                                <div class="stat-value">{{ gaFitness != null ? gaFitness : '—' }}</div>
                            </div>
                            <div class="stat-card stat-card--wide">
                                <div class="stat-label">Total Generations</div>
                                <div class="stat-value">{{ gaGeneration != null ? gaGeneration.toLocaleString() : '—' }}</div>
                            </div>
                            <div class="stat-card stat-card--wide">
                                <svg class="fitness-chart" viewBox="0 0 360 125">
                                    <defs>
                                        <linearGradient id="gaFitGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stop-color="#ec4899" stop-opacity="0.25" />
                                            <stop offset="100%" stop-color="#ec4899" stop-opacity="0" />
                                        </linearGradient>
                                        <linearGradient id="gaDivGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.18" />
                                            <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <line x1="40" y1="5" x2="40" y2="105" class="chart-axis" />
                                    <line x1="40" y1="105" x2="340" y2="105" class="chart-axis" />
                                    <text x="35" y="9" class="axis-label" text-anchor="end">{{ gaChartMaxFit }}</text>
                                    <text x="35" y="109" class="axis-label" text-anchor="end">0</text>
                                    <text x="40" y="122" class="axis-label" text-anchor="middle">0</text>
                                    <text x="340" y="122" class="axis-label" text-anchor="end">{{ gaChartMaxGen != null ? gaChartMaxGen.toLocaleString() : '' }}</text>
                                    <g transform="translate(40, 5)">
                                        <line x1="0" y1="25" x2="300" y2="25" class="chart-grid" />
                                        <line x1="0" y1="50" x2="300" y2="50" class="chart-grid" />
                                        <line x1="0" y1="75" x2="300" y2="75" class="chart-grid" />
                                        <polygon :points="gaFitnessAreaPoints" fill="url(#gaFitGrad)" />
                                        <polygon :points="gaDiversityAreaPoints" fill="url(#gaDivGrad)" />
                                        <polyline :points="gaFitnessChartPoints" class="ga-fitness-line" />
                                        <polyline :points="gaDiversityChartPoints" class="ga-diversity-line" />
                                    </g>
                                </svg>
                                <div class="chart-legend">
                                    <span class="legend-ga-fitness">Fitness</span>
                                    <span class="legend-ga-diversity">Diversity</span>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="stats-empty">Run an algorithm to see statistics.</div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sudokuRecursive from './SudokuRecursive.js'
import sudokuMonteCarlo from './SudokuMonteCarlo.js'
import sudokuGenetic from './SudokuGenetic.js'

export default {
    name: 'sudoku',
    mixins: [sudokuMonteCarlo, sudokuRecursive, sudokuGenetic],
    data() {
        return {
            current: null,
            grid: [],
            customPuzzle: ' 1  2 3    2  3 4  5      6  47   5    1    3 7  68   3    4 9    6  1 4  6      ',
            selectedAlgo: 'Recursion',
            algoOptions: [
                { value: 'Recursion', label: 'Backtracking Search' },
                { value: 'Monte', label: 'Monte Carlo Annealing' },
                { value: 'Genetic', label: 'Genetic Algorithm' },
            ],
            paused: false,
            lastAlgo: null,
            statsVisible: false,
            activeCell: null,
            swapCells: [],
            recursiveBacktracks: 0,
            recursiveStackDepth: 0,
        }
    },
    created() {
        for (var i = 0; i < 81; i++) {
            var related = []
            var val
            for (var j = 0; j < 9; j++) {
                val = Math.floor(i / 9) * 9 + j
                if (val !== i && related.indexOf(val) === -1) related.push(val)
                val = (i % 9) + 9 * j
                if (val !== i && related.indexOf(val) === -1) related.push(val)
                val = (Math.floor(i / 27) * 27 + Math.floor((i % 9) / 3) * 3) + (Math.floor(j / 3) * 9) + (j % 3)
                if (val !== i && related.indexOf(val) === -1) related.push(val)
            }
            this.grid.push({ value: null, related: related, conflicts: [], locked: false })
        }
    },
    methods: {
        handleStart() {
            this.lastAlgo = this.selectedAlgo
            this.statsVisible = true
            this.paused = false
            this.recursiveBacktracks = 0
            this.recursiveStackDepth = 0
            this.start(this.selectedAlgo)
        },
        handlePause() {
            this.paused = !this.paused
        },
        stop() {
            if (this.current === 'Recursion') this.recursiveStop()
            if (this.current === 'Monte') this.mcStop()
            if (this.current === 'Genetic') this.gaStop()
            this.current = null
            this.paused = false
        },
        start(type) {
            this.lockGrid()
            if (type === 'Recursion') {
                this.recursiveSolve()
                this.current = type
            } else if (type === 'Monte') {
                this.mcSolve()
                this.current = type
            } else if (type === 'Genetic') {
                this.gaSolve()
                this.current = type
            }
        },
        load() {
            var premade = this.customPuzzle
            this.swapCells = []
            this.activeCell = null
            this.grid.forEach((grid, i) => {
                grid.locked = false
                grid.conflicts = []
                grid.value = parseInt(premade[i]) > 0 && parseInt(premade[i]) < 10 ? parseInt(premade[i]) : null
            })
        },
        get() {
            var temp = ''
            this.grid.forEach((grid) => {
                temp += grid.value?.toString() ?? ' '
            })
            this.customPuzzle = temp
        },
        userInput(index, event) {
            var input = parseInt(event.key)
            if (input <= 9 && input >= 1) {
                this.setValue(index, input)
            } else {
                this.setValue(index)
            }
        },
        lockGrid() {
            this.grid.forEach((grid) => { grid.locked = (grid.value != null) })
        },
        unlockGrid() {
            this.grid.forEach((grid) => { grid.locked = false })
        },
        setValue(index, input = null) {
            this.grid[index].value = input
            for (var r of this.grid[index].related) {
                if (this.grid[r].value === null) {
                    continue
                } else if (this.grid[index].value !== null && this.grid[index].value === this.grid[r].value) {
                    if (this.grid[index].conflicts.indexOf(r) === -1) {
                        this.grid[index].conflicts.push(r)
                        this.grid[r].conflicts.push(index)
                    }
                } else {
                    if (this.grid[index].conflicts.indexOf(r) !== -1) {
                        this.grid[index].conflicts.splice(this.grid[index].conflicts.indexOf(r), 1)
                        this.grid[r].conflicts.splice(this.grid[r].conflicts.indexOf(index), 1)
                    }
                }
            }
        },
        boxBorderClass(index) {
            const col = index % 9
            const row = Math.floor(index / 9)
            return {
                'border-right-thick': col === 2 || col === 5,
                'border-bottom-thick': row === 2 || row === 5,
            }
        },
    },
    computed: {
        isRunning() {
            return this.current !== null
        },
        algoIndex() {
            return this.algoOptions.findIndex(a => a.value === this.selectedAlgo)
        },
        activeCellLabel() {
            if (this.activeCell === null) return '—'
            return `R${Math.floor(this.activeCell / 9) + 1} C${(this.activeCell % 9) + 1}`
        },
        fitnessChartPoints() {
            const data = this.mcFitnessTracker
            if (!data || data.length < 2) return ''
            const maxSteps = data[data.length - 1][0] || 1
            const maxFit = Math.max(...data.map(d => d[1]))
            if (maxFit === 0) return ''
            return data.map(([s, f]) =>
                `${((s / maxSteps) * 300).toFixed(1)},${(100 - (f / maxFit) * 95).toFixed(1)}`
            ).join(' ')
        },
        tempChartPoints() {
            const data = this.mcTempTracker
            if (!data || data.length < 2) return ''
            const maxSteps = data[data.length - 1][0] || 1
            const maxTemp = Math.max(...data.map(d => d[1]))
            if (maxTemp === 0) return ''
            return data.map(([s, t]) =>
                `${((s / maxSteps) * 300).toFixed(1)},${(100 - (t / maxTemp) * 95).toFixed(1)}`
            ).join(' ')
        },
        chartMaxFit() {
            const data = this.mcFitnessTracker
            if (!data || data.length < 2) return 0
            return Math.max(...data.map(d => d[1]))
        },
        chartMaxSteps() {
            const data = this.mcFitnessTracker
            if (!data || data.length < 2) return null
            return data[data.length - 1][0]
        },
        fitnessAreaPoints() {
            const pts = this.fitnessChartPoints
            if (!pts) return ''
            return `${pts} 300,100 0,100`
        },
        tempAreaPoints() {
            const pts = this.tempChartPoints
            if (!pts) return ''
            return `${pts} 300,100 0,100`
        },
        depthChartPoints() {
            const data = this.recursiveDepthTracker
            if (!data || data.length < 2) return ''
            const maxSteps = data[data.length - 1][0] || 1
            const maxDepth = Math.max(...data.map(d => d[1]))
            if (maxDepth === 0) return ''
            return data.map(([s, d]) =>
                `${((s / maxSteps) * 300).toFixed(1)},${(100 - (d / maxDepth) * 95).toFixed(1)}`
            ).join(' ')
        },
        depthAreaPoints() {
            const pts = this.depthChartPoints
            if (!pts) return ''
            return `${pts} 300,100 0,100`
        },
        chartMaxDepth() {
            const data = this.recursiveDepthTracker
            if (!data || data.length < 2) return 0
            return Math.max(...data.map(d => d[1]))
        },
        chartMaxRecSteps() {
            const data = this.recursiveDepthTracker
            if (!data || data.length < 2) return null
            return data[data.length - 1][0]
        },
        gaFitnessChartPoints() {
            const data = this.gaFitnessTracker
            if (!data || data.length < 2) return ''
            const maxGen = data[data.length - 1][0] || 1
            const maxFit = Math.max(...data.map(d => d[1]))
            if (maxFit === 0) return ''
            return data.map(([g, f]) =>
                `${((g / maxGen) * 300).toFixed(1)},${(100 - (f / maxFit) * 95).toFixed(1)}`
            ).join(' ')
        },
        gaDiversityChartPoints() {
            const data = this.gaDiversityTracker
            if (!data || data.length < 2) return ''
            const maxGen = data[data.length - 1][0] || 1
            const maxDiv = Math.max(...data.map(d => d[1]))
            if (maxDiv === 0) return ''
            return data.map(([g, d]) =>
                `${((g / maxGen) * 300).toFixed(1)},${(100 - (d / maxDiv) * 95).toFixed(1)}`
            ).join(' ')
        },
        gaChartMaxFit() {
            const data = this.gaFitnessTracker
            if (!data || data.length < 2) return 0
            return Math.max(...data.map(d => d[1]))
        },
        gaChartMaxGen() {
            const data = this.gaFitnessTracker
            if (!data || data.length < 2) return null
            return data[data.length - 1][0]
        },
        gaFitnessAreaPoints() {
            const pts = this.gaFitnessChartPoints
            if (!pts) return ''
            return `${pts} 300,100 0,100`
        },
        gaDiversityAreaPoints() {
            const pts = this.gaDiversityChartPoints
            if (!pts) return ''
            return `${pts} 300,100 0,100`
        },
        state() {
            var result = ''
            for (var i = 0; i < this.grid.length; i++) {
                result += this.grid[i].value ? this.grid[i].value : ' '
            }
            return result
        }
    },
}
</script>
<style scoped lang="scss">
#sudoku {
    background-color: whitesmoke;
    color: black;
    min-height: 100vh;
}

/* ── Page layout ── */
.page-layout {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 3rem 2rem;
    min-height: 100vh;
    box-sizing: border-box;
}

/* ── Board ── */
.board-area {
    flex: 0 0 auto;
}

.grid {
    display: grid;
    grid-template-columns: repeat(9, 9vmin);
    grid-template-rows: repeat(9, 9vmin);
    border: 2px solid black;
}

.grid-block {
    border-right: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
    overflow: hidden;

    &.border-right-thick {
        border-right: 2px solid black;
    }

    &.border-bottom-thick {
        border-bottom: 2px solid black;
    }
}

.grid-block>input {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 7vmin;
    text-align: center;
    caret-color: transparent;
    border: none;
    outline: none;
    background: white;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    transition: background-color 0.15s ease;
    box-sizing: border-box;
    padding: 0;

    &:focus {
        background-color: #f9f9f9;
    }

    &.locked {
        background-color: #d6eaf8;
    }

    &.error {
        background-color: #fde8e8;
        color: #c0392b;
    }

    &.active {
        background-color: #fff9c4;
    }

    &.swap-flash {
        background-color: #d5f5e3;
    }
}

/* ── Right panel ── */
.right-panel {
    flex: 1 1 280px;
    max-width: 420px;
    height: calc(81vmin + 4px);
    background: #e8e8e8;
    border-radius: 18px;
    padding: 1.25rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* ── Section containers ── */
.panel-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.section-label {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #999;
}

/* ── Algorithm slider ── */
.algo-slider {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #d8d8d8;
    border-radius: 14px;
    padding: 4px;
    gap: 0;

    &--disabled {
        opacity: 0.45;
        pointer-events: none;
    }
}

.algo-slider-thumb {
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    height: calc((100% - 8px) / 3);
    background: white;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12);
    transition: transform 0.25s cubic-bezier(0.34, 1.2, 0.64, 1);
    pointer-events: none;
}

.algo-slider-item {
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 0.55rem 0.9rem;
    border: none;
    background: transparent;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    color: #999;
    text-align: left;
    border-radius: 10px;
    transition: color 0.2s ease;

    &:hover:not(:disabled) {
        color: #666;
    }
}

/* active label colour per algo */
.algo-slider-item--recursion {

    &:has(~ .algo-slider-thumb),
    .algo-slider--active & {
        color: #059669;
    }
}

/* simpler: use JS-driven active class via the thumb position — colour the label when thumb aligns */
/* We drive colour via a data attribute on the container instead */
.algo-slider[data-algo="Recursion"] .algo-slider-item--recursion {
    color: #059669;
    font-weight: 800;
}

.algo-slider[data-algo="Monte"] .algo-slider-item--monte {
    color: #4f46e5;
    font-weight: 800;
}

.algo-slider[data-algo="Genetic"] .algo-slider-item--genetic {
    color: #db2777;
    font-weight: 800;
}

/* ── Control buttons ── */
.controls-row {
    display: flex;
    gap: 0.5rem;
}

.btn-ctrl {
    flex: 1;
    padding: 0.65rem 0.25rem;
    border: none;
    border-radius: 50px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: filter 0.15s ease;

    &:hover:not(:disabled) {
        filter: brightness(0.88);
    }

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
}

.btn-start {
    background: #10b981;
    color: white;
}

.btn-pause {
    background: #f59e0b;
    color: white;
}

.btn-stop {
    background: #ef4444;
    color: white;
}

/* ── Puzzle string ── */
.puzzle-string {
    width: 100%;
    border: none;
    border-radius: 12px;
    background: white;
    font-family: monospace;
    font-size: 0.7rem;
    padding: 0.65rem 0.9rem;
    box-sizing: border-box;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    color: #555;
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ── I/O buttons ── */
.io-row {
    display: flex;
    gap: 0.5rem;
}

.btn-card {
    flex: 1;
    padding: 0.6rem 0.5rem;
    border: none;
    border-radius: 12px;
    background: white;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    transition: filter 0.15s ease;
    color: black;

    &:hover {
        filter: brightness(0.93);
    }
}

.btn-card--primary {
    background: #6366f1;
    color: white;
}

/* ── Divider ── */
.section-divider {
    border: none;
    border-top: 1px solid #d0d0d0;
    margin: 0;
    flex-shrink: 0;
}

/* ── Stats section ── */
.stats-section {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    gap: 0.5rem;
}

.stats-empty {
    color: #aaa;
    font-size: 0.8rem;
    padding-top: 0.25rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
}

.stat-card {
    background: white;
    border-radius: 12px;
    padding: 0.75rem 0.85rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

    &.stat-card--wide {
        grid-column: 1 / -1;
    }
}

.stat-label {
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #999;
    margin-bottom: 0.2rem;
}

.stat-value {
    font-size: 1.15rem;
    font-weight: 700;
    color: black;
    font-variant-numeric: tabular-nums;
}

/* ── SVG chart ── */
.fitness-chart {
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: 0.5rem;
    border-radius: 6px;
}

.chart-axis {
    stroke: #ccc;
    stroke-width: 1;
}

.chart-grid {
    stroke: #ececec;
    stroke-width: 0.8;
}

.axis-label {
    font-size: 8px;
    fill: #aaa;
    font-family: 'Quicksand', sans-serif;
}

.fitness-line {
    fill: none;
    stroke: #6366f1;
    stroke-width: 1.5;
    stroke-linejoin: round;
    stroke-linecap: round;
}

.temp-line {
    fill: none;
    stroke: #f59e0b;
    stroke-width: 1.5;
    stroke-linejoin: round;
    stroke-linecap: round;
}

.depth-line {
    fill: none;
    stroke: #10b981;
    stroke-width: 1.5;
    stroke-linejoin: round;
    stroke-linecap: round;
}

.chart-legend {
    text-align: center;
    width: 100%;
}

.chart-legend span {
    font-size: 0.85rem;
}

.legend-fitness {
    color: #6366f1;
}

.legend-fitness::before {
    content: '— ';
}

.legend-temp {
    color: #f59e0b;
}

.legend-temp::before {
    content: '— ';
}

.legend-depth {
    color: #10b981;
}

.legend-depth::before {
    content: '— ';
}

.ga-fitness-line {
    fill: none;
    stroke: #ec4899;
    stroke-width: 1.5;
    stroke-linejoin: round;
    stroke-linecap: round;
}

.ga-diversity-line {
    fill: none;
    stroke: #8b5cf6;
    stroke-width: 1.5;
    stroke-linejoin: round;
    stroke-linecap: round;
}

.legend-ga-fitness {
    color: #ec4899;
}

.legend-ga-fitness::before {
    content: '— ';
}

.legend-ga-diversity {
    color: #8b5cf6;
}

.legend-ga-diversity::before {
    content: '— ';
}
</style>