export default {
  data () {
    return {
      recursiveGrid: {}
    }
  },
  methods: {
    possible: function (index) {
    },
    recursive: function (stack) {
      this.recursiveInProgress = true
      if (stack.length === 0) {
        alert('No solution found')
        this.stop()
      } else {
        var key = stack[stack.length - 1]
        if (key === '') {
          return this.stop()
        } else if (this.grid[key].possible.length === 0) {
          this.$set(this.grid[key], 'value', '')
          this.recursiveStack.pop()
        } else {
          this.$set(this.grid[key], 'value', this.grid[key].possible[Math.floor(Math.random() * this.grid[key].possible.length)])
          this.$set(this.grid[key], 'possible', this.grid[key].possible.replace(this.grid[key].value, ''))
          this.possibilitiesGrid()
          this.recursiveStack.push(this.recursiveUnassignedFewestPossibilities())
        }
      }
      this.recursiveInProgress = false
      return false
    },
    recursiveSolve: function () {
      if (!this.start()) return false
      this.recursiveStack = [this.recursiveUnassignedFewestPossibilities()]
      this.recursiveInterval = setInterval(function () {
        if (!this.pause && !this.recursiveInProgress) this.solving = !this.recursiveImmitation()
      }.bind(this), this.displayInterval)
    },
    recursiveUnassignedFewestPossibilities: function () {
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
    recursiveStart: function () {
      if (!this.isValidGrid()) return false
      this.solving = true
      var stack = ['hi']
      console.log('stack: ' + stack)
    }
  }
}
