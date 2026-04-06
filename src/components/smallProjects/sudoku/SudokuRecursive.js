export default {
  data () {
    return {
      recursiveRunning: false,
      recursiveTotalSteps: 0,
      recursiveDepthTracker: [],
    }
  },
  methods: {
    recursiveInit: function () {
      this.recursiveGrid = []
      this.recursiveStack = []
      this.recursiveBacktracks = 0
      this.recursiveStackDepth = 0
      this.activeCell = null
      this.initial = 0
      this.recursiveTotalSteps = 0
      this.recursiveDepthTracker.splice(0)
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
        if (this.paused) return
        if (!this.recursiveRunning) {
          this.recursiveRunning = true
          if (this.recursiveStack.length > this.initial && this.recursiveStack[this.recursiveStack.length - 1] !== null) {
            this.recursiveTotalSteps++
            this.recursiveStep()
            this.recursiveDepthTracker.push([this.recursiveTotalSteps, this.recursiveStackDepth])
          } else {
            this.recursiveDepthTracker.push([this.recursiveTotalSteps, 0])
            clearInterval(this.recursiveInterval)
            this.recursiveRunning = false
            this.activeCell = null
            this.current = null
          }
          this.recursiveRunning = false
        }
      }, 10)
    },
    recursiveStep: function () {
      var newest = this.recursiveStack[this.recursiveStack.length - 1]
      this.activeCell = newest
      if (this.recursiveGrid[newest].length === 0) {
        this.recursiveBacktracks++
        this.setRecursiveValue(this.recursiveStack.pop())
      } else {
        var newVal = this.recursiveGrid[newest].splice(Math.floor(Math.random() * this.recursiveGrid[newest].length), 1)[0]
        this.setRecursiveValue(newest, newVal)
        this.recursiveStack.push(this.fewestPossible())
      }
      this.recursiveStackDepth = this.recursiveStack.length - this.initial
    },
    recursiveStop: function () {
      clearInterval(this.recursiveInterval)
      this.activeCell = null
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
