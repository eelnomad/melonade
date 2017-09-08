<!-- League.vue
     Will contain League of Legends analytics.-->

<template>
  <div id="sudoku">
    <div id="sudoku-grid">
      <input id="sudoku-box" v-for="i in grid" maxlength="1" v-model="i.value">
    </div>
    <button id="solve-button" @click="solve()">Hint</button>
  </div>
</template>

<script>
// Replace with rest call that returns 10 posts (title, preview, bg_image, date) for that type
export default {
  name: 'sudoku',
  data () {
    return {
      rows: '012345678',
      cols: 'ABCDEFGHI',
      grid: {},
      sets: []
    }
  },
  created () {
    // Setting up grid
    for (var i = 0; i < this.rows.length; i++) {
      for (var j = 0; j < this.cols.length; j++) {
        this.grid[this.cols[i].concat(this.rows[j])] = {
          'value': null,
          'possible': [],
          'related': []
        }
      }
    }
    // Setting Related Boxes
    for (var key in this.grid) {
      var set1 = []
      for (i = 0; i < this.rows.length; i++) {
        set1.push(key[0].concat(this.rows[i]))
      }
      var set2 = []
      for (i = 0; i < this.cols.length; i++) {
        set2.push(this.cols[i].concat(key[1]))
      }
      var set3 = []
      var xquad = Math.floor(this.cols.indexOf(key[0]) / 3)
      var yquad = Math.floor(this.rows.indexOf(key[1]) / 3)
      for (i = xquad * 3; i < xquad * 3 + 3; i++) {
        for (j = yquad * 3; j < yquad * 3 + 3; j++) {
          set3.push(this.cols[i].concat(this.rows[j]))
        }
      }
      this.grid[key].related = [set1, set2, set3]
    }
    // Creating sets to check
  },
  methods: {
    solve: function () {
      for (var key in this.grid) {
        if (this.grid[key].value != null) this.grid[key].possible = [this.grid[key].value]
      }
      this.available()
      this.setValues()
      this.$forceUpdate()
      console.log(this.grid)
    },
    available: function () {
      for (var key in this.grid) {
        var possible = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        if (this.grid[key].value == null) {
          for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 9; j++) {
              var index = possible.indexOf(parseInt(this.grid[this.grid[key].related[i][j]].value))
              if (index > -1) possible.splice(index, 1)
            }
          }
          this.grid[key].possible = possible
        }
      }
    },
    setValues: function () {
      for (var key in this.grid) {
        if (this.grid[key].value == null && this.grid[key].possible.length === 1) this.grid[key].value = this.grid[key].possible[0]
      }
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
  text-align: center;
}
#sudoku-grid {

}

#sudoku-box {
  height: 10vmin;
  width: 10vmin;
  text-align: center;
  font-size: 4vmin;
  border: solid;
  border-width: 1px;
}
.error {
  background-color: red;
}
#sudoku-box:hover, #sudoku-box:focus {
  outline: none;
  background-color: #ffd993;
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
</style>
