<!-- League.vue
     Will contain Sudoku Solving amazingness.-->

<template>
  <div class="flex-col" id="sudoku">
    <button @click='recursiveSolve()'>Yo</button>
    <button @click='mcSolve()'>Wasup</button>
    <button @click='mcFitness = 0'>cry</button>
    <div>
      {{ mcFitness }}
      {{ mcTemp }}
    </div>
    <!-- <table class="grid flex-row"> -->
    <table>
      <td v-for="(key, index) in grid" class="grid-block">
        <input 
        :class="[ key.conflicts.length > 0 ? 'error' : 'normal']"
        :value="key.value" 
        @keyup.delete="userInput(index, $event)" 
        @keypress.prevent="userInput(index, $event)">
        </input>
      </td>
    </table>
  </div>
</template>

<script>
import sudokuRecursive from './SudokuRecursive.js'
import sudokuMonteCarlo from './SudokuMonteCarlo.js'
import sudokuGenetic from './SudokuGenetic.js'

export default {
  name: 'sudoku',
  mixins: [sudokuMonteCarlo, sudokuRecursive, sudokuGenetic],
  data () {
    return {
      grid: []
    }
  },
  created () {
    // Setting up grid
    for (var i = 0; i < 81; i++) {
      var related = []
      var val
      for (var j = 0; j < 9; j++) {
        // Rows
        val = Math.floor(i / 9) * 9 + j
        if (val !== i) {
          if (related.indexOf(val) === -1) {
            related.push(val)
          }
        }
        // Columns
        val = (i % 9) + 9 * j
        if (val !== i) {
          if (related.indexOf(val) === -1) {
            related.push(val)
          }
        }
        // Boxes
        val = (Math.floor(i / 27) * 27 + Math.floor((i % 9) / 3) * 3) + (Math.floor(j / 3) * 9) + (j % 3)
        if (val !== i) {
          if (related.indexOf(val) === -1) {
            related.push(val)
          }
        }
      }

      this.grid.push({
        value: null,
        related: related,
        conflicts: [],
        locked: false
      })
      var premade = ' 1  2 3    2  3 4  5      6  47   5    1    3 7  68   3    4 9    6  1 4  6      '
      for (var z = 0; z < this.grid.length; z++) {
        var p = parseInt(premade[z]) > 0 || parseInt(premade[z]) < 10 ? parseInt(premade[z]) : null
        this.$set(this.grid[z], 'value', p)
      }
    }
  },
  methods: {
    checkValid: function (index) {
      // Check if value is valid
      // console.log(this.grid[index].conflicts)
      return this.grid[index].conflicts.length > 0
    },
    setValue: function (index, input = null) {
      // Set value
      this.$set(this.grid[index], 'value', input)
      // Update conflicts
      for (var r of this.grid[index].related) {
        if (this.grid[r].value === null) {
          continue
        } else if (this.grid[index].value !== null && this.grid[index].value === this.grid[r].value) {
          if (this.grid[index].conflicts.indexOf(r) === -1) {
            // console.log('Adding: ' + r)
            this.grid[index].conflicts.push(r)
            this.grid[r].conflicts.push(index)
          }
        } else {
          if (this.grid[index].conflicts.indexOf(r) !== -1) {
            // console.log('Removing: ' + r)
            this.grid[index].conflicts.splice(this.grid[index].conflicts.indexOf(r), 1)
            this.grid[r].conflicts.splice(this.grid[r].conflicts.indexOf(index), 1)
          }
        }
      }
      this.$forceUpdate()
      // console.log('Index: ' + index)
      // console.log(this.grid[index].conflicts)
    },
    userInput: function (index, event) {
      // console.log(index)
      var input = parseInt(event.key)
      // Check if input is an integer
      if (input <= 9 && input >= 1) {
        this.setValue(index, input)
      } else {
        this.setValue(index)
      }
    }
  },
  computed: {
    state: function () {
      var result = ''
      for (var i = 0; i < this.grid.length; i++) {
        result += this.grid[i].value ? this.grid[i].value : ' '
      }
      return result
    }
  },
  watch: {
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #sudoku {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    align-items: center;
    /*background-image: url('https://lh3.googleusercontent.com/UqrZHJ0MVurefzgefF9zCzR3cUGkOQY97ZSx6yiZJycfSLNAy9fpK0VzfmPXZiib9JA459-cPcxke699A8Ovy3Nh4bM8xVv5NsatsBL4gyF6Q3Gp0Xn1ZZshnz4MzSmmCRP4vI2g8dqys0jqOUIDzz2B28ia1AYKPd4NN7_gu2e5sLyD-0X2Pbb_Zi6LNIt20nl15dJjuLI-QaMnYH9EjtBp1qPMLwJFG5q5l3tTbOFgA-Tws1rRJ6sfLNYfywnEKtwzt6_C-uqSfdPlzu_0btVpI3aRZz2zfSr13tkJ3mYAVSnRuG_23laoaG4fhOEIaZGqOUPzNVtDyWojZ2ORWu48YoOM_EpxGAWQ_1S2AH51eiqB-wJaPSZVpkdy_RqBz0_oRePLAfkIVNF-DzNg0qfmYfjn1wMkRXkwRwp0xny0oMh6FCpYbfbC1D4rnSWW_nfCE9CbwhOM-oQfDPzqv4Bwwf3DVqCltLROzgjOa_j9bW_23kop1wK80QeXnFCd506eXKqb_GtHmViQ1Z_KU1lSjF36wbsRsA0Dql5YojNBEnMR_ZsJHNNXYM8mwRSEBOxfgzDEEEwE9rKwNem3oerhJfF8WY6vwDCum23B7aPqZckO8jmq1b7dCxGWNUwsJhqjRKX53De50Gun_NxMQqgnf7OV0JQ-5OA=w1980-h1320-no?.jpg');*/
  }

  .grid {
    flex-wrap: wrap;
    height: 81vmin;
    width: 81vmin;
  }

  .grid-block {
    box-sizing: border-box;
    height: 9vmin;
    width: 9vmin;
  }

  .grid-block > input {
    height: 100%;
    width: 100%;
    font-size: 7vmin;
    text-align: center;
    caret-color: transparent;
  }

  .grid-block > input:focus {
    background-color: whitesmoke;
    outline: none;
    border-width: 1px;
    border-color: whitesmoke;
  }

  .error {
    color: red;
    background-color: pink;
  }
  .normal {
    color: black;
  }

</style>
