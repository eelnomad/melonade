export default {
  data () {
    return {
      recursiveGrid: [],
      stack: []
    }
  },
  methods: {
    possible: function (index) {
      var values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      for (var r of this.grid[index].related) {
        if (this.grid[r].value) {
          values.splice(values.indexOf(this.grid[r].value), 1)
        }
      }
      this.$set(this.recursiveGrid, index, values)
    },
    recursive: function () {
      var initial = 0
      for (var i = 0; i < this.grid.length; i++) {
        this.possible(i)
        if (this.grid[i].value) {
          this.stack.push(i)
          initial++
        }
      }
      this.stack.push(this.fewestPossible())
      while (this.stack.length > initial && this.stack.length !== 81) {
        var newest = this.stack[this.stack.length - 1]
        if (this.recursiveGrid[newest].length === 0) {
          this.stack.pop()
        } else {
          this.setRecursiveValue(newest)
          this.stack.push(this.fewestPossible())
        }
      }
    },
    fewestPossible: function () {
      var min = 10
      var index
      for (var i = 0; i < this.grid.length; i++) {
        if (this.stack.indexOf(i) === -1) {
          if (this.recursiveGrid[i].length <= min) {
            index = i
          }
        }
      }
      return index
    },
    setRecursiveValue: function (index) {
      var newVal = this.recursiveGrid[index].splice(Math.floor(Math.random() * this.recursiveGrid[index]))[0]
      this.setValue(index, newVal)
      for (var r of this.grid[index].related) {
        if (this.stack.indexOf(r) === -1) {
          this.possible(r)
        }
      }
    }
  }
}
