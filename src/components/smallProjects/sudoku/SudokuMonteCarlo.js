export default {
  data () {
    return {
      mcRunning: false,
      mcFitness: null,
      mcTemp: null,
      mcTotalSteps: null,
    }
  },
  methods: {
    mcInit: function () {
      this.mcInitial = []
      this.mcEmpty = []
      this.mcTempTracker = []
      this.mcFitnessTracker = []
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
          for (var j = 0; j < this.mcEmpty[emptyIndex].length; j++) {
            this.setValue(this.mcEmpty[emptyIndex][j], available[j])
          }
        }
      }
      this.mcTotalSteps = 0
      this.mcTemp = 0.5
      this.mcFitness = this.mcTotalCost()
    },
    mcSolve: function () {
      this.mcInit()
      this.mcInterval = setInterval(() => {
        if (!this.mcRunning) {
          this.mcRunning = true
          var startFitness = this.mcFitness
          this.mcFitnessTracker.push([this.mcTotalSteps, this.mcFitness])
          this.mcTempTracker.push([this.mcTotalSteps, this.mcTemp])
          var i = 0
          while (i !== 500) {
            i++
            this.mcTotalSteps++
            this.mcStep()
            if (this.mcFitness === 0) {
              clearInterval(this.mcInterval)
              this.mcRunning = false
              this.mcFitnessTracker.push([this.mcTotalSteps, this.mcFitness])
              this.mcTempTracker.push([this.mcTotalSteps, this.mcTemp])
              this.mcChart()
              break
            }
          }
          var tempModifier = Math.abs(startFitness - this.mcFitness) < 1 ? 1.002 : 0.999
          this.mcTemp = this.mcTemp * tempModifier
          // this.$forceUpdate()
          this.mcRunning = false
        }
      }, 100)
    },
    mcStep: function () {
      var row = Math.floor(Math.random() * 9)
      var first = this.mcEmpty[row][Math.floor(Math.random() * this.mcEmpty[row].length)]
      var second = this.mcEmpty[row][Math.floor(Math.random() * this.mcEmpty[row].length)]
      var firstVal = this.grid[first].value
      var secondVal = this.grid[second].value
      if (firstVal !== secondVal) {
        var currentFit = this.mcIndividualCost(first) + this.mcIndividualCost(second)
        // var currentFit = this.grid[first].conflicts.length + this.grid[second].conflicts.length
        this.setValue(first, secondVal)
        this.setValue(second, firstVal)
        var newFit = this.mcIndividualCost(first) + this.mcIndividualCost(second)
        // var newFit = this.grid[first].conflicts.length + this.grid[second].conflicts.length
        if (Math.exp((currentFit - newFit) / this.mcTemp) > Math.random()) {
          this.mcFitness += (newFit - currentFit)
        } else {
          this.setValue(first, firstVal)
          this.setValue(second, secondVal)
        }
      }
    },
    mcStop: function () {
      clearInterval(this.mcInterval)
      this.mcChart()
    },
    mcChart: function () {
      // Setting up Chart
      this.chartOptions = {
        title: {
          text: 'MonteCarlo'
        },
        chart: {
          type: 'line'
        },
        rangeSelector: {
          buttons: [{
            count: 20000,
            type: 'millisecond',
            text: '20K'
          }, {
            count: 60000,
            type: 'millisecond',
            text: '60K'
          }, {
            type: 'all',
            text: 'All'
          }],
          inputEnabled: false,
          selection: 0
        },
        series: [
          {
            title: 'Fitness',
            data: this.mcFitnessTracker
          },
          {
            title: 'Temperature',
            data: this.mcTempTracker
          }
        ],
        xAxis: {
          type: 'linear'
        }
      }
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
