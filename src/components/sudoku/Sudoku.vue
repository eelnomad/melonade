<!-- League.vue
     Will contain Sudoku Solving amazingness.-->

<template>
  <div class="flex-row" id="sudoku">
    <span></span>
    <highstock v-cloak id="sudoku-chart" v-show="showChart" :options="mcChartOptions" ref="highstock"></highstock>
    <div id="sudoku-grid" v-show="!showChart">
      <input id="sudoku-box" v-for="i in grid" maxlength="1" v-model="i.value" :disabled="solving">
    </div>
    <span></span>
    <button id="sudoku-options-toggle" @click="toggleOptions()">Show/Hide</button>
    <transition name="fade">
      <div class="flex-column" id="sudoku-controls" v-show="showOptions">
        <label>Grid Controls</label>
        <button @click="toggleChart()">{{ showChart ? 'Hide' : 'Show' }} Chart</button>
        <button @click="clear()" :disabled="solving">Clear Grid</button>
        <button @click="togglePause()" :disabled="!solving">{{ pause ? 'Resume' : 'Pause' }}</button>
        <button @click="stop()" :disabled="!solving">Stop</button>
        <button @click="currentState()">Get State</button>
        <input v-model="state" placeholder="Load Custom State Here">
        <label>Solve</label>
        <input type="number" v-model.number="displayInterval" min="0" max="10">
        <button @click="recursiveSolve()" :disabled="solving">Recurssion</button>
        <button @click="mcSolve()" :disabled="solving">MonteCarlo</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'sudoku',
  data () {
    return {
      grid: {},
      solving: false,
      saveState: '',
      state: '',
      displayInterval: 0,
      recursiveStack: [],
      recursiveInProgress: false,
      pause: false,
      mcVariableSquares: [],
      mcIndex: 0,
      mcInProgress: false,
      mcChartOptions: {},
      mcTemperature: 0.6,
      mcLoop: 0,
      showOptions: false,
      showChart: true
    }
  },
  methods: {
    toggleOptions: function () {
      this.showOptions = !this.showOptions
    },
    toggleChart: function () {
      this.showChart = !this.showChart
    },
    mcChangeCost: function (key, oldVal, newVal) {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 9; j++) {
          if (key !== this.grid[key].related[i][j]) {
            if (oldVal === this.grid[this.grid[key].related[i][j]].value) {
              this.grid[key].cost--
              this.grid[this.grid[key].related[i][j]].cost--
            } else if (newVal === this.grid[this.grid[key].related[i][j]].value) {
              this.grid[key].cost++
              this.grid[this.grid[key].related[i][j]].cost++
            }
          }
        }
      }
      this.$set(this.grid[key], 'value', newVal)
    },
    mcStep: function () {
      this.mcInProgress = true
      this.mcLoop++
      while (this.mcLoop % 25 !== 0) {
        while (this.mcIndex !== this.mcVariableSquares.length) {
          var key = this.mcVariableSquares[this.mcIndex]
          var newVal = this.mcRandomValue(key)
          // If value didn't change, skip logic
          if (newVal !== this.grid[key].value) {
            // If new cost is less than old cost, keep changes
            var newCost = this.mcIndividualCost(key, newVal)
            if (newCost <= this.grid[key].cost) {
              this.mcChangeCost(key, this.grid[key].value, newVal)
            } else {
              if (Math.random() < Math.exp((this.grid[key].cost - newCost) / this.mcTemperature)) {
                this.mcChangeCost(key, this.grid[key].value, newVal)
              }
            }
          }
          // Push new cost to end of list and check if === 0
          var cost = this.mcTotalCost()
          if (cost === 0) {
            this.$refs.highstock.chart.redraw()
            this.$refs.highstock.chart.series[0].addPoint([Date.now(), cost], false)
            this.$refs.highstock.chart.series[1].addPoint([Date.now(), this.mcTemperature], false)
            return this.stop()
          }
          // Increment Index for next run and implement loopback
          this.mcIndex++
        }
        this.$refs.highstock.chart.series[0].addPoint([Date.now(), cost], false)
        this.$refs.highstock.chart.series[1].addPoint([Date.now(), this.mcTemperature], false)
        this.mcIndex = 0
        this.mcLoop++
      }
      if (this.mcLoop % 100 === 0) {
        this.mcTemperature *= 0.98
      }
      if (this.mcTemperature <= 0.3) this.mcTemperature = 0.6 * Math.pow(0.8, this.mcLoop / 4000)
      if (this.mcTemperature <= 0.3) this.mcLoop = 0
      this.mcInProgress = false
      return false
    },
    mcSolve: function () {
      if (!this.start()) return false
      // Reinit MonteCarlo Setup
      this.$refs.highstock.chart.series[0].setData([])
      this.$refs.highstock.chart.series[1].setData([])
      this.mcVariableSquares = []
      this.mcIndex = 0
      this.mcLoop = 0
      // Collect all squares that need to be filled in and fill them in
      for (var key in this.grid) {
        if (this.grid[key].value === '') {
          this.mcVariableSquares.push(key)
          this.$set(this.grid[key], 'value', this.mcRandomValue(key))
        }
      }
      if (this.mcVariableSquares.length === 0) return this.stop()
      // Calculate cost for all squares
      for (key in this.grid) {
        this.$set(this.grid[key], 'cost', this.mcIndividualCost(key, this.grid[key].value))
      }
      this.mcInterval = setInterval(function () {
        if (!this.pause && !this.mcInProgress) this.solving = !this.mcStep()
      }.bind(this), this.displayInterval)
      this.mcGraphInterval = setInterval(function () {
        this.$refs.highstock.chart.redraw()
      }.bind(this), 3000)
    },
    mcTotalCost: function () {
      var cost = 0
      for (var key in this.grid) {
        cost += this.grid[key].cost
      }
      return cost
    },
    mcRandomValue: function (key) {
      return this.grid[key].possible[Math.floor(Math.random() * this.grid[key].possible.length)]
      // return '123456789'[Math.floor(Math.random() * 9)]
    },
    mcIndividualCost: function (key, value) {
      var cost = 0
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 9; j++) {
          if (value === this.grid[this.grid[key].related[i][j]].value && key !== this.grid[key].related[i][j]) cost++
        }
      }
      return cost
    },
    togglePause: function () {
      this.pause = !this.pause
    },
    recursiveImmitation: function () {
      this.recursiveInProgress = true
      if (this.recursiveStack.length === 0) {
        alert('No solution found')
        this.stop()
      } else {
        var key = this.recursiveStack[this.recursiveStack.length - 1]
        if (key === '') {
          return this.stop()
        } else if (this.grid[key].possible.length === 0) {
          this.$set(this.grid[key], 'value', '')
          this.recursiveStack.pop()
        } else {
          this.$set(this.grid[key], 'value', this.grid[key].possible[Math.floor(Math.random() * this.grid[key].possible.length)])
          this.$set(this.grid[key], 'possible', this.grid[key].possible.replace(this.grid[key].value, ''))
          this.possibilitiesGrid()
          this.recursiveStack.push(this.unassignedFewestPossibilities())
        }
      }
      this.recursiveInProgress = false
      return false
    },
    recursiveSolve: function () {
      if (!this.start()) return false
      this.recursiveStack = [this.unassignedFewestPossibilities()]
      this.recursiveInterval = setInterval(function () {
        if (!this.pause && !this.recursiveInProgress) this.solving = !this.recursiveImmitation()
      }.bind(this), this.displayInterval)
    },
    unassignedFewestPossibilities: function () {
      var min = 10
      var minKey = ''
      for (var key in this.grid) {
        if (this.grid[key].value === '' && this.grid[key].possible.length < min) {
          min = this.grid[key].possible.length
          minKey = key
        }
      }
      return minKey
    },
    possibilitiesGrid: function () {
      for (var key in this.grid) {
        this.possibilities(key)
      }
    },
    possibilities: function (key) {
      if (this.grid[key].value === '') {
        var possible = '123456789'
        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 9; j++) {
            possible = possible.replace(this.grid[this.grid[key].related[i][j]].value.toString(), '')
          }
        }
        this.$set(this.grid[key], 'possible', possible)
      }
    },
    isValidGrid: function () {
      // var values = {}
      for (var key in this.grid) {
        if (this.grid[key].value !== '') {
          if (!this.isValid(key)) {
            alert('Invalid Grid: ' + key)
            return false
          }
          // values[this.grid[key].value] = true
        }
      }
      // if (Object.keys(values).length < 8) {
      //   alert('Not enough unique values present.')
      //   return false
      // }
      return true
    },
    isValid: function (key) {
      var validValues = '123456789'
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 9; j++) {
          // To check that the value is actually a number between 1-9
          if (validValues.indexOf(this.grid[key].value) === -1) return false
          // To check that the value doesn't conflict with any other related squares
          if (this.grid[key].value === this.grid[this.grid[key].related[i][j]].value && key !== this.grid[key].related[i][j]) return false
        }
      }
      return true
    },
    containsBlanks: function () {
      for (var key in this.grid) {
        if (this.grid[key].value === '') return true
      }
      return false
    },
    currentState: function () {
      var state = ''
      for (var key in this.grid) {
        state += this.grid[key].value === '' ? ' ' : this.grid[key].value
      }
      this.state = state
    },
    clear: function () {
      for (var key in this.grid) {
        this.$set(this.grid[key], 'value', '')
      }
    },
    start: function () {
      if (!this.isValidGrid()) {
        return false
      }
      this.solving = true
      this.possibilitiesGrid()
      return true
    },
    stop: function () {
      clearInterval(this.mcGraphInterval)
      clearInterval(this.recursiveInterval)
      clearInterval(this.mcInterval)
      this.pause = false
      this.recursiveInProgress = false
      this.mcInProgress = false
      return true
    }
  },
  watch: {
    state: function (newState) {
      var i = 0
      for (var key in this.grid) {
        if (isNaN(parseInt(newState[i]))) {
          this.$set(this.grid[key], 'value', '')
          i++
        } else if (newState[i] === '0') {
          this.$set(this.grid[key], 'value', '')
          i++
        } else {
          this.$set(this.grid[key], 'value', newState[i])
          i++
        }
      }
    }
  },
  created () {
    var rows = '012345678'
    var cols = 'ABCDEFGHI'
    // Setting up grid
    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < cols.length; j++) {
        this.$set(this.grid, cols[i].concat(rows[j]), {
          value: '',
          possible: [],
          cost: 0
        })
      }
    }
    // Setting up related squares for each square
    for (var key in this.grid) {
      var set1 = []
      for (i = 0; i < rows.length; i++) {
        set1.push(key[0].concat(rows[i]))
      }
      var set2 = []
      for (i = 0; i < cols.length; i++) {
        set2.push(cols[i].concat(key[1]))
      }
      var set3 = []
      var xquad = Math.floor(cols.indexOf(key[0]) / 3)
      var yquad = Math.floor(rows.indexOf(key[1]) / 3)
      for (i = xquad * 3; i < xquad * 3 + 3; i++) {
        for (j = yquad * 3; j < yquad * 3 + 3; j++) {
          set3.push(cols[i].concat(rows[j]))
        }
      }
      this.$set(this.grid[key], 'related', [set1, set2, set3])
    }
    this.mcChartOptions = {
      chart: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        shadow: {
          color: 'rgba(0, 0, 0, 0.5)',
          opacity: 0.2,
          width: 10
        },
        marginRight: 40,
        spacingTop: 20
      },
      rangeSelector: {
        buttons: [
          {
            count: 10,
            type: 'second',
            text: '10S'
          }, {
            count: 1,
            type: 'minute',
            text: '1M'
          }, {
            count: 5,
            type: 'minute',
            text: '5M'
          }, {
            type: 'all',
            text: 'All'
          }
        ],
        inputEnabled: false,
        selected: 3
      },
      title: {
        text: 'MonteCarlo Cost History',
        style: {
          color: 'white',
          'margin-top': '20px'
        }
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Cost',
        data: [],
        yAxis: 0
      }, {
        name: 'Temperature',
        data: [],
        dashStyle: 'shortdash',
        yAxis: 1,
        color: 'orange'
      }],
      xAxis: [{
        labels: {
          style: {
            color: 'white'
          }
        }
      }],
      yAxis: [{
        opposite: true,
        labels: {
          style: {
            color: 'white'
          }
        },
        offset: 25
      }, {
        opposite: false,
        inside: true,
        labels: {
          style: {
            color: 'white'
          }
        },
        offset: -10
      }]
    }
  },
  mounted () {
    this.showChart = false
  },
  beforeDestroy () {
    clearInterval(this.recursiveInterval)
    clearInterval(this.mcInterval)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sudoku {
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://lh3.googleusercontent.com/UqrZHJ0MVurefzgefF9zCzR3cUGkOQY97ZSx6yiZJycfSLNAy9fpK0VzfmPXZiib9JA459-cPcxke699A8Ovy3Nh4bM8xVv5NsatsBL4gyF6Q3Gp0Xn1ZZshnz4MzSmmCRP4vI2g8dqys0jqOUIDzz2B28ia1AYKPd4NN7_gu2e5sLyD-0X2Pbb_Zi6LNIt20nl15dJjuLI-QaMnYH9EjtBp1qPMLwJFG5q5l3tTbOFgA-Tws1rRJ6sfLNYfywnEKtwzt6_C-uqSfdPlzu_0btVpI3aRZz2zfSr13tkJ3mYAVSnRuG_23laoaG4fhOEIaZGqOUPzNVtDyWojZ2ORWu48YoOM_EpxGAWQ_1S2AH51eiqB-wJaPSZVpkdy_RqBz0_oRePLAfkIVNF-DzNg0qfmYfjn1wMkRXkwRwp0xny0oMh6FCpYbfbC1D4rnSWW_nfCE9CbwhOM-oQfDPzqv4Bwwf3DVqCltLROzgjOa_j9bW_23kop1wK80QeXnFCd506eXKqb_GtHmViQ1Z_KU1lSjF36wbsRsA0Dql5YojNBEnMR_ZsJHNNXYM8mwRSEBOxfgzDEEEwE9rKwNem3oerhJfF8WY6vwDCum23B7aPqZckO8jmq1b7dCxGWNUwsJhqjRKX53De50Gun_NxMQqgnf7OV0JQ-5OA=w1980-h1320-no?.jpg');
}
#sudoku-grid {
  margin-top: 10vmin;
  height: 90vmin;
  width: 90vmin;
  align-self: center;
  transition: all 0.5s ease;
}
#sudoku-chart {
  margin-top: 10vmin;
  margin-bottom: 10vmin;
  width: 80%;
  transition: all 0.5s ease;
}
#sudoku-options-toggle {
  position: absolute;
  height: 50px;
  z-index: 1;
}
#sudoku-controls {
  box-sizing: border-box;
  padding-top: 50px;
  position: absolute;
  height: 100%;
  width: 300px;
  background: rgba(0,0,0,.5);
}
#sudoku-box {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 11%;
  width: 11%;
  text-align: center;
  color: white;
  font-size: 4vmin;
  border: solid;
  border-color: black;
  border-width: 1px;
  background: rgba(0,0,0,.5);
  transition: all 0.25s ease;
  cursor: default;
}
#sudoku-box:hover, #sudoku-box:focus {
  outline: none;
  color: black;
  background-color: #ffd993;
  transition: all 0.25s ease;
}
#sudoku-box:nth-child(3n) {
  border-right-width: 1.5px;
}
#sudoku-box:nth-child(3n + 1) {
  border-left-width: 1.5px;
}
#sudoku-box:nth-child(n) {
  border-top-width: 1.5px;
}
#sudoku-box:nth-child(n + 10) {
  border-top-width: 1px;
}
#sudoku-box:nth-child(n + 19) {
  border-bottom-width: 1.5px;
}
#sudoku-box:nth-child(n + 28) {
  border-bottom-width: 1px;
  border-top-width: 1.5px;
}
#sudoku-box:nth-child(n + 37) {
  border-top-width: 1px;
}
#sudoku-box:nth-child(n + 46) {
  border-bottom-width: 1.5px;
}
#sudoku-box:nth-child(n + 55) {
  border-bottom-width: 1px;
  border-top-width: 1.5px;
}
#sudoku-box:nth-child(n + 64) {
  border-top-width: 1px;
}
#sudoku-box:nth-child(n + 73) {
  border-bottom-width: 1.5px;
}
button {
  position: relative;
  width: 300px;
  flex: 1 1 auto;
}
</style>
