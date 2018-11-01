<!-- League.vue
     Will contain Sudoku Solving amazingness.-->

<template>
  <div class="flex-row" id="sudoku">
    <div id="sudoku-options-toggle" @click="toggleOptions()">
      <icon name="angle-right" scale="2" color="white" v-if="!showOptions"></icon>
      <icon name="angle-right" scale="2" color="white" flip="horizontal" v-else></icon>
    </div>
    <transition name="fade">
      <div class="flex-column" id="sudoku-options" v-show="showOptions">
        <span></span>
        <div id="logo">
          <router-link to="/" id="logo">
          Melonade
          </router-link>
        </div>
        <span></span>
        <label>
          <h1>
            Controls
          </h1>
        </label>
        <div class="sudoku-options-button" @click="toggleChart()">{{ showChart ? 'Hide' : 'Show' }} Chart</div>
        <div class="sudoku-options-button" @click="clear()" :disabled="solving">Clear Grid</div>
        <div class="sudoku-options-button" @click="togglePause()" :disabled="!solving">{{ pause ? 'Resume' : 'Pause' }}</div>
        <div class="sudoku-options-button" @click="stop()" :disabled="!solving">Stop</div>
        <span></span>
        <label>
          <h1>
            Solve
          </h1>
        </label>
        <div class="sudoku-options-button" @click="recursiveStart()" :disabled="solving">Recurssion</div>
        <div class="sudoku-options-button" @click="mcSolve()" :disabled="solving">MonteCarlo</div>
        <div class="sudoku-options-button" @click="gaSolve()" :disabled="solving">Genetic Algorithm</div>
        <span></span>
        <label>
          <h1>
            Configuration
          </h1>
        </label>
        <div class="sudoku-options-button" @click="currentState()">Get State</div>
        <input class="sudoku-options-button" v-model="state" placeholder="Load Custom State Here" :disabled="solving">
        <span></span>
      </div>
    </transition>
    <span></span>
    <highstock v-cloak id="sudoku-chart" v-show="showChart" :options="mcChartOptions" ref="highstock"></highstock>
    <div id="sudoku-grid" v-show="!showChart">
      <input id="sudoku-box" v-for="(i, index) in grid" maxlength="1" v-model="i.value" v-on:keyup="validateInput(i, index)" :disabled="solving">
    </div>
    <span></span>
  </div>
</template>

<script>
import sudokuMonteCarlo from './SudokuMonteCarlo.js'
import sudokuRecursive from './SudokuRecursive.js'
import sudokuGenetic from './SudokuGenetic.js'

export default {
  name: 'sudoku',
  mixins: [sudokuMonteCarlo, sudokuRecursive, sudokuGenetic],
  data () {
    return {
      // General Variables
      grid: {},
      gridBackup: {},
      solving: false,
      saveState: '',
      state: '',
      showOptions: false,
      showChart: true,
      pause: false,
      // Recursive Variables
      recursiveStack: [],
      recursiveInProgress: false,
      mcVariableSquares: [],
      // MonteCarlo Variables
      mcLoop: 0,
      mcInProgress: false,
      mcChartOptions: {},
      mcTemperature: 0,
      // MonteCarlo Options
      mcTemperatureThreshold: 0.25,
      mcTemperatureMax: 0.4
    }
  },
  methods: {
    start: function () {
      if (!this.isValidGrid) return false
      this.gridBackup = Object.assign({}, this.grid)
      this.solving = true
      return true
    },
    stop: function (solved) {
      if (!solved) {
        this.grid = Object.assign({}, this.gridBackup)
        return true
      }
      return false
    },
    validateInput: function (input, index) {
      if (parseInt(input.value) > 0 && parseInt(input.value) < 10) {
        if (document.activeElement.nextSibling) {
          document.activeElement.nextSibling.focus()
        }
      } else {
        input.value = ''
      }
    },
    possibilities: function () {
      for (var key in this.grid) {
        var possible = '123456789'
        if (this.grid[key].value === '') {
          for (var relatedSet in this.grid[key].related) {
            for (var relatedKey in relatedSet) {
              possible = possible.replace(this.grid[relatedKey].value.toString(), '')
            }
          }
          this.$set(this.grid[key], 'possible', possible)
        } else {
          this.$set(this.grid[key], 'possible', '')
        }
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
      console.log('valid check')
      var validValues = '123456789'
      if (validValues.indexOf(this.grid[key].value) === -1) {
        return false
      }
      for (var relatedSet in this.grid[key].related) {
        for (var i = 0; i < this.grid[key].related[relatedSet].length; i++) {
          // To check that the value is actually a number between 1-9
          // To check that the value doesn't conflict with any other related squares
          if (this.grid[key].value === this.grid[this.grid[key].related[relatedSet][i]].value) {
            return false
          }
        }
      }
      console.log('yay')
      return true
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
    toggleOptions: function () {
      this.showOptions = !this.showOptions
    },
    toggleChart: function () {
      this.showChart = !this.showChart
    },
    togglePause: function () {
      if (this.solving) {
        this.pause = !this.pause
        this.currentState()
      }
    }
  },
  watch: {
    state: function (newState) {
      var i = 0
      for (var key in this.grid) {
        if (isNaN(parseInt(newState[i]))) {
          this.$set(this.grid[key], 'value', '')
        } else if (newState[i] === '0') {
          this.$set(this.grid[key], 'value', '')
        } else {
          this.$set(this.grid[key], 'value', newState[i])
        }
        i++
      }
    }
  },
  created () {
    this.$store.dispatch('hideHeader')
    console.log('010020300002003040050000006004700050000100003070068000300004090000600104006000000')

    // Setting up grid
    for (var i = 0; i < 81; i++) {
      var row = []
      var col = []
      var box = []
      var val
      for (var j = 0; j < 9; j++) {
        val = (Math.floor(i / 9) * 9) + j
        if (val !== i) {
          row.push(val)
        }
      }
      for (var k = 0; k < 9; k++) {
        val = (i % 9) + 9 * k
        if (val !== i) {
          col.push(val)
        }
      }
      for (var l = 0; l < 9; l++) {
        val = (Math.floor(i / 27) * 27 + Math.floor((i % 9) / 3) * 3) + (Math.floor(l / 3) * 9) + (l % 3)
        if (val !== i) {
          box.push(val)
        }
      }

      this.$set(this.grid, i, {
        value: '',
        related: {row, col, box}
      })
    }
  },
  mounted () {
    this.showChart = false
  },
  beforeDestroy () {
    this.stop()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sudoku {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /*background-image: url('https://lh3.googleusercontent.com/UqrZHJ0MVurefzgefF9zCzR3cUGkOQY97ZSx6yiZJycfSLNAy9fpK0VzfmPXZiib9JA459-cPcxke699A8Ovy3Nh4bM8xVv5NsatsBL4gyF6Q3Gp0Xn1ZZshnz4MzSmmCRP4vI2g8dqys0jqOUIDzz2B28ia1AYKPd4NN7_gu2e5sLyD-0X2Pbb_Zi6LNIt20nl15dJjuLI-QaMnYH9EjtBp1qPMLwJFG5q5l3tTbOFgA-Tws1rRJ6sfLNYfywnEKtwzt6_C-uqSfdPlzu_0btVpI3aRZz2zfSr13tkJ3mYAVSnRuG_23laoaG4fhOEIaZGqOUPzNVtDyWojZ2ORWu48YoOM_EpxGAWQ_1S2AH51eiqB-wJaPSZVpkdy_RqBz0_oRePLAfkIVNF-DzNg0qfmYfjn1wMkRXkwRwp0xny0oMh6FCpYbfbC1D4rnSWW_nfCE9CbwhOM-oQfDPzqv4Bwwf3DVqCltLROzgjOa_j9bW_23kop1wK80QeXnFCd506eXKqb_GtHmViQ1Z_KU1lSjF36wbsRsA0Dql5YojNBEnMR_ZsJHNNXYM8mwRSEBOxfgzDEEEwE9rKwNem3oerhJfF8WY6vwDCum23B7aPqZckO8jmq1b7dCxGWNUwsJhqjRKX53De50Gun_NxMQqgnf7OV0JQ-5OA=w1980-h1320-no?.jpg');*/
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
  margin: 10px;
  position: absolute;
  height: 50px;
  width: 50px;
  z-index: 2;
}
#sudoku-options {
  box-sizing: border-box;
  z-index: 1;
  padding-top: 50px;
  position: absolute;
  height: 100%;
  width: 300px;
  background: rgba(0,0,0,.65);
}
#sudoku-options div {
  width: 100%;
  flex: 1 1 auto;
}
.sudoku-options-button {
  font-family: 'Quicksand', sans-serif;
  height: 40px;
  display:flex;
  color: grey;
  align-items: center;
  justify-content: center;
}
.sudoku-options-button[disabled] {
  color: black;
}
.sudoku-options-button[disabled]:hover {
  color: black;
  background: rgba(0,0,0,0);
  height: 40px;
}
.sudoku-options-button:hover, .sudoku-options-button:focus {
  outline: none;
  height: 50px;
  color: white;
  background: rgba(0,0,0,.75);
  transition: all 0.25s ease;
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

h1 {
  color: white;
  margin-left: 10px;
  font-size: 25px;
}
input {
  background: transparent;
  color: white;
  border-style: none;
}
input#sudoku-options-button,
input#sudoku-options-button:focus,
input#sudoku-options-button[disabled],
input#sudoku-options-button[disabled]:focus {
  color: grey;
  height: 30px;
  text-align: center;
}
input#sudoku-options-button:hover,
input#sudoku-options-button[disabled]:hover {
  color: grey;
  height: 30px;
}
input::placeholder {
  color: grey;
  text-align: center;
}

label {
  display:flex;
  align-items: center;
  justify-content: center;
}

#logo a {
  font-family: 'Sacramento', cursive;
  color: white;
  font-size: 75px;
  text-align: center;
  margin-top: 5%;
  padding-left: 5%;
  transition: opacity 1s;
}
</style>
