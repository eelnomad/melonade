export default {
    data() {
        return {
            gaRunning: false,
            gaGeneration: null,
            gaFitness: null,
            gaTotalSteps: null,
            gaFitnessTracker: [],
            gaDiversityTracker: [],
        }
    },
    methods: {
        gaInit: function () {
            const POPULATION_SIZE = 50

            this.gaFitnessTracker.splice(0)
            this.gaDiversityTracker.splice(0)
            this.gaGeneration = 0
            this.gaTotalSteps = 0
            this.gaFitness = null

            this.gaLockedInRow = []
            this.gaSwappableInRow = []
            this.gaAvailableInRow = []

            for (var r = 0; r < 9; r++) {
                var locked = {}
                var available = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                var swappable = []
                for (var c = 0; c < 9; c++) {
                    var idx = r * 9 + c
                    if (this.grid[idx].locked) {
                        locked[c] = this.grid[idx].value
                        available.splice(available.indexOf(this.grid[idx].value), 1)
                    } else {
                        swappable.push(c)
                    }
                }
                this.gaLockedInRow[r] = locked
                this.gaSwappableInRow[r] = swappable
                this.gaAvailableInRow[r] = available
            }

            this.gaPopulation = []
            for (var i = 0; i < POPULATION_SIZE; i++) {
                this.gaPopulation.push(this.gaCreateIndividual())
            }

            this.gaPopulation.sort(function (a, b) { return a.fitness - b.fitness })
            this.gaBestIndividual = this.gaCloneIndividual(this.gaPopulation[0])
            this.gaFitness = this.gaBestIndividual.fitness
            this.gaStagnationCount = 0

            // Push initial state so the chart has a starting anchor point
            var initFitnessVals = this.gaPopulation.map(function (ind) { return ind.fitness })
            this.gaFitnessTracker.push([0, this.gaFitness])
            this.gaDiversityTracker.push([0, new Set(initFitnessVals).size])
        },

        gaCreateIndividual: function () {
            var individual = { rows: [], fitness: 0 }
            for (var r = 0; r < 9; r++) {
                var row = new Array(9)
                var locked = this.gaLockedInRow[r]
                for (var c in locked) {
                    row[parseInt(c)] = locked[c]
                }
                var available = this.gaAvailableInRow[r].slice()
                var swappable = this.gaSwappableInRow[r]
                for (var k = available.length - 1; k > 0; k--) {
                    var m = Math.floor(Math.random() * (k + 1))
                    var tmp = available[k]; available[k] = available[m]; available[m] = tmp
                }
                for (var j = 0; j < swappable.length; j++) {
                    row[swappable[j]] = available[j]
                }
                individual.rows[r] = row
            }
            individual.fitness = this.gaComputeFitness(individual)
            return individual
        },

        gaComputeFitness: function (individual) {
            var cost = 0
            for (var c = 0; c < 9; c++) {
                var colMask = 0
                for (var r = 0; r < 9; r++) {
                    colMask |= (1 << individual.rows[r][c])
                }
                // Count bits set in positions 1-9; missing bits = duplicates
                var bits = colMask >> 1
                var unique = 0
                while (bits) { unique += bits & 1; bits >>= 1 }
                cost += 9 - unique
            }
            for (var br = 0; br < 3; br++) {
                for (var bc = 0; bc < 3; bc++) {
                    var boxMask = 0
                    for (var dr = 0; dr < 3; dr++) {
                        for (var dc = 0; dc < 3; dc++) {
                            boxMask |= (1 << individual.rows[br * 3 + dr][bc * 3 + dc])
                        }
                    }
                    var boxBits = boxMask >> 1
                    var boxUnique = 0
                    while (boxBits) { boxUnique += boxBits & 1; boxBits >>= 1 }
                    cost += 9 - boxUnique
                }
            }
            return cost
        },

        // Compute cost for a single column
        gaColCost: function (individual, col) {
            var mask = 0
            for (var r = 0; r < 9; r++) mask |= (1 << individual.rows[r][col])
            var bits = mask >> 1; var unique = 0
            while (bits) { unique += bits & 1; bits >>= 1 }
            return 9 - unique
        },

        // Compute cost for the 3x3 box containing (row, col)
        gaBoxCost: function (individual, row, col) {
            var br = Math.floor(row / 3), bc = Math.floor(col / 3)
            var mask = 0
            for (var dr = 0; dr < 3; dr++)
                for (var dc = 0; dc < 3; dc++)
                    mask |= (1 << individual.rows[br * 3 + dr][bc * 3 + dc])
            var bits = mask >> 1; var unique = 0
            while (bits) { unique += bits & 1; bits >>= 1 }
            return 9 - unique
        },

        gaSelect: function (k) {
            k = k || 3
            var best = null
            for (var i = 0; i < k; i++) {
                var idx = Math.floor(Math.random() * this.gaPopulation.length)
                var candidate = this.gaPopulation[idx]
                if (best === null || candidate.fitness < best.fitness) {
                    best = candidate
                }
            }
            return best
        },

        gaCrossover: function (parentA, parentB) {
            var child = { rows: [], fitness: 0 }
            for (var r = 0; r < 9; r++) {
                child.rows[r] = (Math.random() < 0.5 ? parentA : parentB).rows[r].slice()
            }
            child.fitness = this.gaComputeFitness(child)
            return child
        },

        gaMutate: function (individual) {
            var swappableRows = []
            for (var r = 0; r < 9; r++) {
                if (this.gaSwappableInRow[r].length >= 2) swappableRows.push(r)
            }
            if (swappableRows.length === 0) return

            var row = swappableRows[Math.floor(Math.random() * swappableRows.length)]
            var swappable = this.gaSwappableInRow[row]

            var i = Math.floor(Math.random() * swappable.length)
            var j = Math.floor(Math.random() * (swappable.length - 1))
            if (j >= i) j++

            var c1 = swappable[i]
            var c2 = swappable[j]

            // Incremental fitness: only the 2 columns and 2 boxes touched by the swap can change
            var costBefore = this.gaColCost(individual, c1) + this.gaColCost(individual, c2)
            // Only count box cost twice if c1 and c2 are in different boxes
            var sameBox = Math.floor(c1 / 3) === Math.floor(c2 / 3)
            if (!sameBox) costBefore += this.gaBoxCost(individual, row, c1) + this.gaBoxCost(individual, row, c2)
            else costBefore += this.gaBoxCost(individual, row, c1)

            var tmp = individual.rows[row][c1]
            individual.rows[row][c1] = individual.rows[row][c2]
            individual.rows[row][c2] = tmp

            var costAfter = this.gaColCost(individual, c1) + this.gaColCost(individual, c2)
            if (!sameBox) costAfter += this.gaBoxCost(individual, row, c1) + this.gaBoxCost(individual, row, c2)
            else costAfter += this.gaBoxCost(individual, row, c1)

            individual.fitness += costAfter - costBefore
        },

        gaCloneIndividual: function (individual) {
            return {
                rows: individual.rows.map(function (r) { return r.slice() }),
                fitness: individual.fitness
            }
        },

        gaStep: function () {
            const POPULATION_SIZE = 50
            const ELITES = 2
            const MUTATION_RATE = 0.3
            const STAGNATION_LIMIT = 200

            this.gaTotalSteps++
            this.gaGeneration++

            this.gaPopulation.sort(function (a, b) { return a.fitness - b.fitness })

            var nextGen = []
            for (var e = 0; e < ELITES; e++) {
                nextGen.push(this.gaCloneIndividual(this.gaPopulation[e]))
            }

            // Adaptive mutation: ramp up as stagnation increases
            var effectiveMutation = MUTATION_RATE + (this.gaStagnationCount / STAGNATION_LIMIT) * 0.4

            while (nextGen.length < POPULATION_SIZE) {
                var parentA = this.gaSelect()
                var parentB = this.gaSelect()
                var child = this.gaCrossover(parentA, parentB)
                if (Math.random() < effectiveMutation) {
                    this.gaMutate(child)
                }
                nextGen.push(child)
            }

            this.gaPopulation = nextGen

            // Population is not sorted after building nextGen; find best with linear scan
            var bestThisGen = this.gaPopulation[0]
            for (var i = 1; i < this.gaPopulation.length; i++) {
                if (this.gaPopulation[i].fitness < bestThisGen.fitness) {
                    bestThisGen = this.gaPopulation[i]
                }
            }

            if (bestThisGen.fitness < this.gaFitness) {
                this.gaFitness = bestThisGen.fitness
                this.gaBestIndividual = this.gaCloneIndividual(bestThisGen)
                this.gaStagnationCount = 0
            } else {
                this.gaStagnationCount++
            }

            this.gaApplyToGrid(this.gaBestIndividual)

            if (this.gaGeneration % 5 === 0 || this.gaFitness === 0) {
                this.gaFitnessTracker.push([this.gaGeneration, this.gaFitness])
                var fitnessVals = this.gaPopulation.map(function (ind) { return ind.fitness })
                this.gaDiversityTracker.push([this.gaGeneration, new Set(fitnessVals).size])
            }

            if (this.gaFitness === 0) return true

            if (this.gaStagnationCount >= STAGNATION_LIMIT) {
                this.gaHandleStagnation()
            }

            return false
        },

        gaHandleStagnation: function () {
            const ELITES_KEEP = 5
            const POPULATION_SIZE = 50

            this.gaStagnationCount = 0
            this.gaPopulation.sort(function (a, b) { return a.fitness - b.fitness })
            var elites = this.gaPopulation.slice(0, ELITES_KEEP).map(ind => this.gaCloneIndividual(ind))

            this.gaPopulation = elites.slice()
            while (this.gaPopulation.length < POPULATION_SIZE) {
                this.gaPopulation.push(this.gaCreateIndividual())
            }
        },

        gaApplyToGrid: function (individual) {
            for (var r = 0; r < 9; r++) {
                for (var c = 0; c < 9; c++) {
                    var index = r * 9 + c
                    if (!this.grid[index].locked) {
                        this.setValue(index, individual.rows[r][c])
                    }
                }
            }
        },

        gaSolve: function () {
            const GENERATIONS_PER_TICK = 10

            this.gaInit()
            this.gaInterval = setInterval(() => {
                if (this.paused) return
                if (!this.gaRunning) {
                    this.gaRunning = true
                    for (var i = 0; i < GENERATIONS_PER_TICK; i++) {
                        var solved = this.gaStep()
                        if (solved) {
                            clearInterval(this.gaInterval)
                            this.gaRunning = false
                            this.current = null
                            return
                        }
                    }
                    this.gaRunning = false
                }
            }, 100)
        },

        gaStop: function () {
            clearInterval(this.gaInterval)
        },
    }
}
