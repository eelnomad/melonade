export default {
    data() {
        return {
            mcRunning: false,
            mcFitness: null,
            mcTemp: null,
            mcTotalSteps: null,
            mcFitnessTracker: [],
            mcTempTracker: [],
        }
    },
    methods: {
        mcInit: function() {
            this.mcInitial = []
            this.mcEmpty = []
            this.mcFitnessTracker.splice(0)
            this.mcTempTracker.splice(0)
            this.swapCells = []
            // Tracking set and unset values in the grid
            for (var i = 0; i < this.grid.length; i++) {
                // Things to do at the start of every row
                if (i % 9 === 0) {
                    var emptyIndex = Math.floor(i / 9)
                    var available = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                    this.mcEmpty[emptyIndex] = []
                }
                // If the grid box has a value add to fixed list, otherwise, add to corresponding row list
                if (this.grid[i].value) {
                    available.splice(available.indexOf(this.grid[i].value), 1)
                    this.mcInitial.push(i)
                } else {
                    this.mcEmpty[emptyIndex].push(i)
                }
                // Things to do at the end of every row
                if (i % 9 === 8) {
                    for (var k = available.length - 1; k > 0; k--) {
                        var m = Math.floor(Math.random() * (k + 1));
                        [available[k], available[m]] = [available[m], available[k]]
                    }
                    for (var j = 0; j < this.mcEmpty[emptyIndex].length; j++) {
                        this.setValue(this.mcEmpty[emptyIndex][j], available[j])
                    }
                }
            }
            this.mcSwappableRows = this.mcEmpty.reduce((acc, cells, idx) => {
                if (cells.length >= 2) acc.push(idx)
                return acc
            }, [])
            this.mcTotalSteps = 0
            this.mcTemp = 0.5
            this.mcFitness = this.mcTotalCost()
        },
        mcSolve: function() {
            this.mcInit()
            this.mcInterval = setInterval(() => {
                if (this.paused) return
                if (!this.mcRunning) {
                    this.mcRunning = true
                    var startFitness = this.mcFitness
                    this.mcFitnessTracker.push([this.mcTotalSteps, this.mcFitness])
                    this.mcTempTracker.push([this.mcTotalSteps, this.mcTemp])
                    var lastFirst = null
                    var lastSecond = null
                    var i = 0
                    while (i !== 500) {
                        i++
                        this.mcTotalSteps++
                        var pair = this.mcStep()
                        if (pair) {
                            lastFirst = pair[0];
                            lastSecond = pair[1]
                        }
                        if (this.mcFitness === 0) {
                            clearInterval(this.mcInterval)
                            this.mcRunning = false
                            this.current = null
                            this.mcFitnessTracker.push([this.mcTotalSteps, this.mcFitness])
                            this.mcTempTracker.push([this.mcTotalSteps, this.mcTemp])
                            this.swapCells = []
                            break
                        }
                    }
                    if (lastFirst !== null) {
                        this.swapCells = [lastFirst, lastSecond]
                    }
                    var tempModifier = startFitness - this.mcFitness < 1 ? 1.01 : 0.95
                    this.mcTemp = Math.min(this.mcTemp * tempModifier, 0.5)
                    this.mcRunning = false
                }
            }, 100)
        },
        mcStep: function() {
            if (this.mcSwappableRows.length === 0) return null
            var row = this.mcSwappableRows[Math.floor(Math.random() * this.mcSwappableRows.length)]
            var emptyInRow = this.mcEmpty[row]
            var firstIdx = Math.floor(Math.random() * emptyInRow.length)
            var secondIdx = Math.floor(Math.random() * (emptyInRow.length - 1))
            if (secondIdx >= firstIdx) secondIdx++
            var first = emptyInRow[firstIdx]
            var second = emptyInRow[secondIdx]
            var firstVal = this.grid[first].value
            var secondVal = this.grid[second].value
            if (firstVal !== secondVal) {
                var currentFit = this.mcIndividualCost(first) + this.mcIndividualCost(second)
                this.setValue(first, secondVal)
                this.setValue(second, firstVal)
                var newFit = this.mcIndividualCost(first) + this.mcIndividualCost(second)
                if (Math.exp((currentFit - newFit) / this.mcTemp) > Math.random()) {
                    this.mcFitness += (newFit - currentFit)
                } else {
                    this.setValue(first, firstVal)
                    this.setValue(second, secondVal)
                }
                return [first, second]
            }
            return null
        },
        mcStop: function() {
            clearInterval(this.mcInterval)
            this.swapCells = []
        },
        mcChart: function() {},
        mcTotalCost: function() {
            var totalFitness = 0
            var keyNodes = [0, 12, 24, 28, 40, 52, 56, 68, 80]
            for (var i of keyNodes) {
                totalFitness += this.mcIndividualCost(i)
            }
            return totalFitness
        },
        mcIndividualCost: function(index) {
            var rowSet = new Set()
            var colSet = new Set()
            var boxSet = new Set()
            for (var i = 0; i < 9; i++) {
                rowSet.add(this.grid[Math.floor(index / 9) * 9 + i].value)
                colSet.add(this.grid[(index % 9) + 9 * i].value)
                var box = (Math.floor(index / 27) * 27 + Math.floor((index % 9) / 3) * 3) + (Math.floor(i / 3) * 9) + (i % 3)
                boxSet.add(this.grid[box].value)
            }
            return 27 - rowSet.size - colSet.size - boxSet.size
        }
    }
}