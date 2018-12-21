export default {
  data () {
    return {
      mcInitial: [],
      mcEmpty: [],
      mcFitness: null,
      mcTemp: 0.3,
      mcRunning: false
    }
  },
  methods: {
    mcStep: function () {
      var first = this.mcEmpty[Math.floor(Math.random() * this.mcEmpty.length)]
      var second = this.mcEmpty[Math.floor(Math.random() * this.mcEmpty.length)]
      var firstVal = this.grid[first].value
      var secondVal = this.grid[second].value
      if (firstVal !== secondVal) {
        var currentFit = this.mcIndividualCost(first) + this.mcIndividualCost(second)
        // var currentFit = this.grid[first].conflicts.length + this.grid[second].conflicts.length
        this.setValue(first, secondVal)
        this.setValue(second, firstVal)
        var newFit = this.mcIndividualCost(first) + this.mcIndividualCost(second)
        // var newFit = this.grid[first].conflicts.length + this.grid[second].conflicts.length
        if (newFit < currentFit || 1 / (1 + Math.exp((newFit - currentFit) / this.mcTemp)) > Math.random()) {
          this.mcFitness += (newFit - currentFit)
        } else {
          this.setValue(first, firstVal)
          this.setValue(second, secondVal)
        }
      }
    },
    mcSolve: function () {
      this.mcInit()
      this.mcInterval = setInterval(() => {
        if (!this.mcRunning) {
          this.mcRunning = true
          var startFitness = this.mcFitness
          var i = 0
          while (i !== 2000) {
            this.mcStep()
            if (this.mcFitness === 0) {
              clearInterval(this.mcInterval)
              break
            }
            i++
          }
          var tempModifier = Math.abs(startFitness - this.mcFitness) / startFitness < 0.005 ? 1.05 : 0.9
          this.mcTemp = this.mcTemp * tempModifier
          // console.log(startFitness + ':' + this.mcFitness)
          this.$forceUpdate()
          this.mcRunning = false
        }
      }, 10)
    },
    mcInit: function () {
      // Tracking unset values and counts of each number in the system
      var blanks = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (var i = 0; i < this.grid.length; i++) {
        if (this.grid[i].value) {
          blanks[this.grid[i].value - 1]++
          this.mcInitial.push(i)
        } else {
          this.mcEmpty.push(i)
        }
      }
      var empty = JSON.parse(JSON.stringify(this.mcEmpty))
      for (var j = 0; j < 9; j++) {
        while (blanks[j] !== 9) {
          var random = empty.splice([Math.floor(Math.random() * empty.length)], 1)[0]
          this.setValue(random, j + 1)
          blanks[j]++
        }
      }
      this.mcFitness = this.mcTotalCost()
    },
    mcTotalCost: function () {
      var totalFitness = 0

      // Conflicts between nodes
      // for (var k = 0; k < this.grid.length; k++) {
      //   totalFitness += (this.grid[k].conflicts.length / 2)
      // }

      // Unique Values per set
      var keyNodes = [0, 12, 24, 28, 40, 52, 56, 68, 80]
      for (var i of keyNodes) {
        totalFitness += this.mcIndividualCost(i)
      }
      return totalFitness
    },
    mcIndividualCost: function (index) {
      var fitness
      // Conflicts between nodes
      // fitness = this.grid[index].conflicts.length

      // Unique Values per set
      var rowTracker = []
      var colTracker = []
      var boxTracker = []
      for (var i = 0; i < 9; i++) {
        // Rows
        var row = Math.floor(index / 9) * 9 + i
        if (rowTracker.indexOf(this.grid[row].value) === -1) {
          rowTracker.push(this.grid[row].value)
        }
        // Columns
        var col = (index % 9) + 9 * i
        if (colTracker.indexOf(this.grid[col].value) === -1) {
          colTracker.push(this.grid[col].value)
        }
        // Boxes
        var box = (Math.floor(index / 27) * 27 + Math.floor((index % 9) / 3) * 3) + (Math.floor(i / 3) * 9) + (i % 3)
        if (boxTracker.indexOf(this.grid[box].value) === -1) {
          boxTracker.push(this.grid[box].value)
        }
      }
      fitness = 27 - rowTracker.length - colTracker.length - boxTracker.length

      return fitness
    }
  }
}
