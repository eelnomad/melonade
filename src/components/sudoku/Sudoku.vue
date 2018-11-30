<!-- League.vue
     Will contain Sudoku Solving amazingness.-->

<template>
  <div class="flex-row" id="sudoku">
    <table class="grid flex-row">
      <td v-for="key in grid" class="grid-block">
        <input type="number" v-model="key.value">
        </td>
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
  methods: {
    checkValid: function (index) {
      return this.grid[index].conflicts.length > 0
    },
    setValue: function (index, input) {
      // Check if input is an integer
      var value = isNaN(input) ? null : parseInt(input)

      // Check if input is a valid value
      value = (value > 9 || value < 1) ? null : value

      // Set value
      this.$set(this.grid[index], 'value', value)

      // Update conflicts
      for (var col in this.grid[index].related) {
        if (this.grid[col].value === null) {
          continue
        } else if (this.grid[index].value !== '' && this.grid[index].value === this.grid[col].value) {
          this.grid[index].conflicts.add(col)
          this.grid[col].conflicts.add(index)
        } else {
          this.grid[index].conflicts.delete(col)
          this.grid[col].conflicts.delete(index)
        }
      }
    }
  },
  watch: {
  },
  created () {
    console.log('010020300002003040050000006004700050000100003070068000300004090000600104006000000')

    // Setting up grid
    for (var i = 0; i < 81; i++) {
      var related = new Set()
      var val
      for (var j = 0; j < 9; j++) {
        val = (Math.floor(i / 9) * 9) + j
        if (val !== i) {
          related.add(val)
        }
      }
      for (var k = 0; k < 9; k++) {
        val = (i % 9) + 9 * k
        if (val !== i) {
          related.add(val)
        }
      }
      for (var l = 0; l < 9; l++) {
        val = (Math.floor(i / 27) * 27 + Math.floor((i % 9) / 3) * 3) + (Math.floor(l / 3) * 9) + (l % 3)
        if (val !== i) {
          related.add(val)
        }
      }

      this.$set(this.grid, i, {
        value: null,
        related: [...related],
        conflicts: new Set(),
        locked: false
      })
    }
    this.setValue(1, 5)
    console.log(this.grid)
    console.log(this.grid[1])
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
    font-size: 2vmin;
    text-align: center;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
</style>
