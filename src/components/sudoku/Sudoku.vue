<!-- League.vue
     Will contain Sudoku Solving amazingness.-->

<template>
  <div class="flex-row" id="sudoku">
    <router-link id="home-button" :to="{name: 'home'}">Home</router-link>
    <span></span>
    <div id="sudoku-grid">
      <input id="sudoku-box" v-for="i in grid" maxlength="1" v-model="i.value">
      <button id="solve-button" @click="clear()">Clear</button>
      <button id="solve-button" @click="solve()">Solve</button>
      <button id="solve-button" @click="currentState()">Get State</button>
      <input v-model="state">
    </div>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'sudoku',
  data () {
    return {
      grid: {},
      invalid: false,
      state: ''
    }
  },
  methods: {
    recursiveSolve: function (key) {
      if (key === '') return true
      while (this.grid[key].possible.length !== 0) {
        this.grid[key].value = this.grid[key].possible[Math.floor(Math.random() * this.grid[key].possible.length)]
        this.grid[key].possible = this.grid[key].possible.replace(this.grid[key].value, '')
        this.possibilitiesGrid()
        if (this.recursiveSolve(this.unassignedFewestPossibilities())) return true
      }
      this.grid[key].value = ''
      return false
    },
    solve: function () {
      if (this.isValidGrid()) {
        this.possibilitiesGrid()
        if (!this.recursiveSolve(this.unassignedFewestPossibilities())) {
          alert('No solution found')
        }
      }
      this.$forceUpdate()
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
        this.grid[key].possible = possible
      }
    },
    isValidGrid: function () {
      var values = {}
      for (var key in this.grid) {
        if (this.grid[key].value !== '') {
          if (!this.isValid(key)) {
            alert('Invalid Grid: ' + key)
            return false
          }
          values[this.grid[key].value] = true
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
          if (validValues.indexOf(this.grid[key].value) === -1) return false
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
        this.grid[key].value = ''
      }
      this.state = ''
      this.$forceUpdate()
    }
  },
  watch: {
    state: function (newState) {
      var i = 0
      for (var key in this.grid) {
        if (isNaN(parseInt(newState[i]))) {
          this.grid[key].value = ''
          i++
        } else if (newState[i] === '0') {
          this.grid[key].value = ''
          i++
        } else {
          this.grid[key].value = newState[i]
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
        this.grid[cols[i].concat(rows[j])] = {
          value: '',
          possible: []
        }
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
      this.grid[key].related = [set1, set2, set3]
    }
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
  text-align: center;
  height: 100vmin;
  width: 100vmin;
  margin-top: 10px;
}

#sudoku-box {
  height: 10vmin;
  width: 10vmin;
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
  margin-right: 1px;
}
#sudoku-box:nth-child(3n + 1) {
  border-left-width: 1.5px;
  margin-left: 1px;
}
#sudoku-box:nth-child(n) {
  border-top-width: 1.5px;
}
#sudoku-box:nth-child(n + 10) {
  border-top-width: 1px;
}
#sudoku-box:nth-child(n + 19) {
  border-bottom-width: 1.5px;
  margin-bottom: 1px;
}
#sudoku-box:nth-child(n + 28) {
  border-bottom-width: 1px;
  border-top-width: 1.5px;
  margin-bottom: 0px;
  margin-top: 1px;
}
#sudoku-box:nth-child(n + 37) {
  border-top-width: 1px;
  margin-top: 0px;
}
#sudoku-box:nth-child(n + 46) {
  border-bottom-width: 1.5px;
  margin-bottom: 1px;
}
#sudoku-box:nth-child(n + 55) {
  border-bottom-width: 1px;
  border-top-width: 1.5px;
  margin-bottom: 0px;
  margin-top: 1px;
}
#sudoku-box:nth-child(n + 64) {
  border-top-width: 1px;
  margin-top: 0px;
}
#sudoku-box:nth-child(n + 73) {
  border-bottom-width: 1.5px;
}
#home-button {
  bottom: 0;
  right: 0;
  margin: 20px 50px;
  padding: 10px 20px;
  position: absolute;
  background-color: transparent;
  background-repeat: no-repeat;
  border-style: solid;
  border-width: 1px;
  border-bottom-width: 3px;
  border-color: white;
  color: white;
  float: right;
  outline-width: 1px;
  outline-color: white;
  cursor: pointer;
  z-index: 2;
}
#home-button:hover {
  border-bottom-width: 2px;
  outline: none;
}
</style>
