export default {
  data () {
    return {
      recursiveRunning: false
    }
  },
  methods: {
    recursiveInit: function () {
      this.recursiveGrid = []
      this.recursiveStack = []
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
    recursiveSolve: function () {
      this.recursiveInit()
      this.recursiveStack.push(this.fewestPossible())
      this.recursiveInterval = setInterval(() => {
        if (!this.recursiveRunning) {
          this.recursiveRunning = true
          if (this.recursiveStack.length > this.initial && this.recursiveStack[this.recursiveStack.length - 1] !== null) {
            this.recursiveStep()
          } else {
            clearInterval(this.recursiveInterval)
            this.recursiveRunning = false
          }
          // this.$forceUpdate()
          this.recursiveRunning = false
        }
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
    recursiveStop: function () {
      clearInterval(this.recursiveInterval)
    },
    possible: function (index) {
      var values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      for (var r of this.grid[index].related) {
        if (values.indexOf(this.grid[r].value) !== -1) {
          values.splice(values.indexOf(this.grid[r].value), 1)
        }
      }
      this.recursiveGrid[index] = values
    },
    setRecursiveValue: function (index, input = null) {
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
