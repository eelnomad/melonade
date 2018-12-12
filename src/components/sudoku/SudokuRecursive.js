export default {
  data () {
    return {
      recursiveGrid: [],
      recursiveStack: []
    }
  },
  methods: {
    possible: function (index) {
      var values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      for (var r of this.grid[index].related) {
        if (values.indexOf(this.grid[r].value) !== -1) {
          values.splice(values.indexOf(this.grid[r].value), 1)
        }
      }
      this.$set(this.recursiveGrid, index, values)
    },
    recursiveSolve: function () {
      this.recursiveInit()
      this.recursiveInterval = setInterval(() => {
        if (this.recursiveStack.length > this.initial && this.recursiveStack[this.recursiveStack.length - 1]) {
          this.recursiveStack.push(this.fewestPossible())
          this.recursiveStep()
        } else {
          console.log(this.recursiveGrid)
          clearInterval(this.recursiveInterval)
        }
        this.$forceUpdate()
      }, 10)
    },
    recursiveStep: function () {
      var newest = this.recursiveStack[this.recursiveStack.length - 1]
      if (this.recursiveGrid[newest].length === 0) {
        this.setRecursiveValue(this.recursiveStack.pop())
      } else {
        var newVal = this.recursiveGrid[newest].splice(Math.floor(Math.random() * this.recursiveGrid[newest].length), 1)[0]
        this.setRecursiveValue(newest, newVal)
        this.recursiveStack.push(this.fewestPossible())
      }
    },
    recursiveInit: function () {
      // Set up the initial stack of filled items and the possibility grid
      this.initial = 0
      for (var i = 0; i < this.grid.length; i++) {
        this.possible(i)
        if (this.grid[i].value) {
          this.recursiveStack.push(i)
          this.initial++
        }
      }
    },
    setRecursiveValue: function (index, input = null) {
      // this.$set(this.grid[index], 'value', newVal)
      this.setValue(index, input)
      if (!input) {
        this.possible(index)
      }
      for (var r of this.grid[index].related) {
        if (this.recursiveStack.indexOf(r) === -1) {
          this.possible(r)
        }
      }
    },
    fewestPossible: function () {
      var min = 10
      var index = []
      for (var i = 0; i < this.grid.length; i++) {
        if (this.recursiveStack.indexOf(i) === -1) {
          if (this.recursiveGrid[i].length < min) {
            min = this.recursiveGrid[i].length
            index = [i]
          } else if (this.recursiveGrid[i].length === min) {
            index.push(i)
          }
        }
      }
      return index.length === 0 ? null : index[Math.floor(Math.random() * index.length)]
    }
  }
}
