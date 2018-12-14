export default {
  data () {
    return {
      mcInitial: [],
      mcEmpty: [],
      mcFitness: null,
      mcTemp: 0.5
    }
  },
  methods: {
    mcStep: function () {
      var first = this.mcEmpty[Math.floor(Math.random() * this.mcEmpty.length)]
      var second = this.mcEmpty[Math.floor(Math.random() * this.mcEmpty.length)]
      if (first !== second) {
        var firstVal = this.grid[first].value
        var secondVal = this.grid[second].value
        var mcRelated = this.grid[first].related.concat(this.grid[second].related).concat([first, second])
        mcRelated = mcRelated.filter((v, i, a) => a.indexOf(v) === i)
        var currentFit = 0
        for (var curr of mcRelated) {
          currentFit += this.grid[curr].conflicts.length
        }
        this.setValue(first, secondVal)
        this.setValue(second, firstVal)
        var newFit = 0
        for (var newr of mcRelated) {
          newFit += this.grid[newr].conflicts.length
        }
        if (1 / (1 + Math.exp((newFit - currentFit) / this.mcTemp)) > Math.random()) {
          this.mcFitness += (newFit - currentFit)
        } else {
          this.setValue(first, firstVal)
          this.setValue(second, secondVal)
        }
      }
    },
    mcSolve: function () {
      this.mcInit()
      this.mcInterval = setInterval(() => {
        if (!this.mcRunning) {
          this.mcRunning = 1
          if (this.mcFitness !== 0) {
            var i = 0
            while (i !== 300) {
              this.mcStep()
              i++
            }
            console.log(this.mcFitness)
          } else {
            console.log('done')
            clearInterval(this.mcInterval)
          }
          this.$forceUpdate()
          this.mcRunning = 0
        }
      }, 10)
    },
    mcInit: function () {
      // Tracking unset values and counts of each number in the system
      var blanks = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (var i = 0; i < this.grid.length; i++) {
        if (this.grid[i].value) {
          blanks[this.grid[i].value - 1]++
          this.mcInitial.push(i)
        } else {
          this.mcEmpty.push(i)
        }
      }
      var empty = JSON.parse(JSON.stringify(this.mcEmpty))
      for (var j = 0; j < 9; j++) {
        while (blanks[j] !== 9) {
          var random = empty.splice([Math.floor(Math.random() * empty.length)], 1)
          this.setValue(random, j + 1)
          blanks[j]++
        }
      }
      this.mcFitness = 0
      for (var k = 0; k < this.grid.length; k++) {
        this.mcFitness += this.grid[k].conflicts.length
      }
    }
  }
}
