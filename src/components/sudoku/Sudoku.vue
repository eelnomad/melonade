<!-- League.vue
     Will contain Sudoku Solving amazingness.-->

<template>
  <div class="flex-row" id="sudoku">
    <button @click='recursive()'>Yo</button>
    <table class="grid flex-row">
      <td v-for="(key, index) in grid" class="grid-block">
        <input 
        :class="[ key.conflicts.length > 0 ? 'error' : 'normal']"
        :value="key.value" 
        @keyup.delete="setValue(index)" 
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
      grid: {}
    }
  },
  created () {
    console.log('010020300002003040050000006004700050000100003070068000300004090000600104006000000')

    // Setting up grid
    for (var i = 0; i < 81; i++) {
      var related = []
      var val
      // Rows
      for (var j = 0; j < 9; j++) {
        val = (Math.floor(i / 9) * 9) + j
        if (val !== i) {
          if (related.indexOf(val) === -1) {
            related.push(val)
          }
        }
      }
      // Columns
      for (var k = 0; k < 9; k++) {
        val = (i % 9) + 9 * k
        if (val !== i) {
          if (related.indexOf(val) === -1) {
            related.push(val)
          }
        }
      }
      // 9x9 Grid
      for (var l = 0; l < 9; l++) {
        val = (Math.floor(i / 27) * 27 + Math.floor((i % 9) / 3) * 3) + (Math.floor(l / 3) * 9) + (l % 3)
        if (val !== i) {
          if (related.indexOf(val) === -1) {
            related.push(val)
          }
        }
      }

      this.$set(this.grid, i, {
        value: null,
        related: related,
        conflicts: [],
        locked: false
      })
    }
    console.log(this.grid)
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
      for (var col of this.grid[index].related) {
        if (this.grid[col].value === null) {
          continue
        } else if (this.grid[index].value !== null && this.grid[index].value === this.grid[col].value) {
          if (this.grid[index].conflicts.indexOf(parseInt(col)) === -1) {
            // console.log('Adding: ' + col)
            this.grid[index].conflicts.push(parseInt(col))
            this.grid[col].conflicts.push(parseInt(index))
          }
        } else {
          if (this.grid[index].conflicts.indexOf(parseInt(col)) !== -1) {
            // console.log('Removing: ' + col)
            this.grid[index].conflicts.slice(this.grid[index].conflicts.indexOf(parseInt(col)), 1)
            this.grid[col].conflicts.slice(this.grid[col].conflicts.indexOf(parseInt(index)), 1)
          }
        }
      }
      this.$forceUpdate()
      // console.log('Index: ' + index)
      // console.log(this.grid[index].conflicts)
    },
    userInput: function (index, event) {
      var input = parseInt(event.key)
      // Check if input is an integer
      if (input <= 9 && input >= 1) {
        this.setValue(index, event.key)
      } else {
        this.setValue(index)
      }
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
